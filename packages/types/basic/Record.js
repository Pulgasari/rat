// @rat/types :: Record, $Record

// :::::: IMPORT

import { GET, SET, Schema, dataTypes, issue, partsIn, schemaOf } from './../schema.js';
import { isObject, isSchema } from './../_shared.js';

// :::::: CONSTANTS

const RESERVED = new Set (['assign', 'schema', 'toJSON']);

// ::::::

const defineProp = Object.defineProperty;
const toEntries  = Object.entries;
const toObject   = Object.fromEntries;

// ::: SCHEMA

// '?title': Str is title: Str.optional()
const shapeOf = fields => toObject(toEntries(fields).map(([key, field]) => {
  const schema = schemaOf(field);
  return key.startsWith('?') ? [key.slice(1), schema.optional()] : [key, schema];
}));

// an object with known fields; unknown fields are kept as they are
function recordOf (fields) {
  const shape = shapeOf(fields);
  const keys  = Object.keys(shape);
  return new Schema({
    describe : { fields: toObject(keys.map(key => [key, shape[key].describe])) },
    initial  :           toObject(keys.map(key => [key, shape[key].initial])),
    kind     : 'record',
    parts    : shape,
    run      : (value, path) => {
      if (!isObject(value)) return issue('expected a record', path);
      const result = partsIn(keys.map(key => [key, shape[key], value[key]]), path);
      if (result.issues || !result.changed) return result.issues ? result : { value };
      return { value: { ...value, ...toObject(keys.map((key, index) => [key, result.values[index]])) } };
    },
  });
}

// ::: DATA TYPE

class RecordType {
  #values;

  // new Record(schema, values?), new Record(values) without a schema, new Record(other): a copy
  constructor (source, values = {}) {
    const copy   = source instanceof RecordType;
    const schema = copy ? source.schema : isSchema(source) ? source : null;
    if (schema && schema.kind !== 'record') throw new TypeError('[rat] a Record needs fields or a Record schema');

    const data = copy ? source.toJSON() : schema ? schema.parse({ ...schema.initial, ...values }) : source;
    const keys = schema ? Object.keys(schema.parts) : Object.keys(data);

    defineProp(this, 'schema', { value: schema });
    this.#values = toObject(keys.map(key => [key, data[key]]));

    for (const key of keys) {
      if (RESERVED.has(key)) throw new TypeError(`[rat] ${key} can not be a Record field`);
      defineProp(this, key, {
        enumerable: true, 
        get: ()    => this[GET](key), 
        set: value => this[SET](key, value)j
      });
    }

    Object.seal(this);
  }

  [GET] (key)        { return this.#values[key]; }
  [SET] (key, value) { this.#values[key] = this.schema ? this.schema.parts[key].parse(value) : value; }

  assign (values) {
    for (const key of Object.keys(values)) this[key] = values[key];
    return this;
  }

  toJSON () { return { ...this.#values }; }
}

// ::: Record + $Record

// one version for the whole record: a field write updates whatever read any field
const [Record, $Record] = dataTypes(RecordType, recordOf, { kind: 'record', name: 'Record' });

// :::::: EXPORT

export { Record, $Record };
