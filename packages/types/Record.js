// @rat/types :: Record, $Record

/*
Record is a data type and, called, its schema:

  const Settings = Record({ view: Enum('grid', 'list'), zoom: Num.range(50, 200).default(100) });
  const Command  = Record({ exec: Fn, '?title': Str });   // ? before a name: optional, Str.optional()

  const settings = new Record(Settings);                  // { view: 'grid', zoom: 100 }
  const custom   = new Record(Settings, { zoom: 120 });   // the rest at its initial value
  const point    = new Record({ x: 0, y: 0 });            // no schema: fixed fields, any value

  settings.zoom = 150;       // checked by the field's schema
  settings.zoom = 'big';     // TypeError: expected a number
  settings.size = 3;         // TypeError: no such field, a record is sealed
  settings.assign({ view: 'list', zoom: 80 });

fields are accessors on the instance, the values sit behind GET / SET, 
so a field may be called anything but assign, schema and toJSON. 

$Record, its reactive variant, is below.
*/

import { GET, SET, Schema, isObject, issue, partsIn, schemaOf, typed, variant } from './schema.js';

const RESERVED = new Set(['assign', 'schema', 'toJSON']);

// ::: SCHEMA

// '?title': Str is title: Str.optional()
const shapeOf = fields => Object.fromEntries(Object.entries(fields).map(([key, field]) => {
  const schema = schemaOf(field);
  return key.startsWith('?') ? [key.slice(1), schema.optional()] : [key, schema];
}));

// an object with known fields; unknown fields are kept as they are
function recordOf (fields) {
  const shape = shapeOf(fields);
  const keys  = Object.keys(shape);
  return new Schema({
    describe : { fields: Object.fromEntries(keys.map(key => [key, shape[key].describe])) },
    initial  : Object.fromEntries(keys.map(key => [key, shape[key].initial])),
    kind     : 'record',
    parts    : shape,
    run      : (value, path) => {
      if (!isObject(value)) return issue('expected a record', path);
      const result = partsIn(keys.map(key => [key, shape[key], value[key]]), path);
      if (result.issues || !result.changed) return result.issues ? result : { value };
      return { value: { ...value, ...Object.fromEntries(keys.map((key, index) => [key, result.values[index]])) } };
    },
  });
}

// ::: DATA TYPE

class RecordType {
  #values;

  // new Record(schema, values?), new Record(values) without a schema, new Record(other): a copy
  constructor (source, values = {}) {
    const copy   = source instanceof RecordType;
    const schema = copy ? source.schema : source instanceof Schema ? source : null;
    if (schema && schema.kind !== 'record') throw new TypeError('[rat] a Record needs fields or a Record schema');

    const data = copy ? source.toJSON() : schema ? schema.parse({ ...schema.initial, ...values }) : source;
    const keys = schema ? Object.keys(schema.parts) : Object.keys(data);

    Object.defineProperty(this, 'schema', { value: schema });
    this.#values = Object.fromEntries(keys.map(key => [key, data[key]]));

    for (const key of keys) {
      if (RESERVED.has(key)) throw new TypeError(`[rat] ${key} can not be a Record field`);
      Object.defineProperty(this, key, { enumerable: true, get: () => this[GET](key), set: value => this[SET](key, value) });
    }

    Object.seal(this);
  }

  [GET] (key) { return this.#values[key]; }
  [SET] (key, value) { this.#values[key] = this.schema ? this.schema.parts[key].parse(value) : value; }

  assign (values) {
    for (const key of Object.keys(values)) this[key] = values[key];
    return this;
  }

  toJSON () { return { ...this.#values }; }
}

// ::: Record + $Record

const Record = typed(RecordType, recordOf, { kind: 'record', name: 'Record' });

// one version for the whole record: a field write updates whatever read any field
const $Record = variant(Record, {
  reads  : [GET, 'toJSON'],
  writes : {
    [SET]  : (record, key, value) => !Object.is(record[GET](key), value),
    assign : true,
  },
});

// :::::: EXPORT

export { Record, $Record };
