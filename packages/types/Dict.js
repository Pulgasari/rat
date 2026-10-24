// @rat/types :: Dict

/*
Dict is a Map whose keys and values follow a schema each. called, it is the
schema:

  const Commands = Dict(Str.to(KebabCase), Record({ exec: Fn, title: Str.optional() }));
  // or with fields for the value: Dict(Str.to(KebabCase), { exec: Fn, '?title': Str })

  const commands = Commands.create();              // or new Dict(Commands), entries as the argument
  commands.set('togglePlay', { exec: () => … });   // the key becomes 'toggle-play', the value is checked
  commands.get('toggle_play').exec();              // a key is read through the key schema too
  commands.has('Toggle Play');                     // true

a key the key schema refuses is not there (get: undefined, has: false), set
throws. $Dict, its reactive variant, is below: reads subscribe, writes notify,
like $Map. called, it is the schema as well, whose create() makes a $Dict:

  const commands = $Dict(Str.to(KebabCase), { exec: Fn }).create({ save: { exec: save } });
*/

import { reactive, register } from '@rat/signals';

import './Map.js';   // $Map registered first: a Dict is a Map too, the later registration is asked first

import { Record }                  from './Record.js';
import { Schema, isObject, typed } from './schema.js';

// ::: the schema

const valueOf = value => value instanceof Schema ? value : Record(value);

// a Map or a plain object, every key and value checked and coerced, a Map out
function dictOf (key, value) {
  const values = valueOf(value);
  return new Schema({
    describe : { key: key.describe, value: values.describe },
    initial  : {},
    kind     : 'dict',
    parts    : { key, value: values },
    run      : (input, path) => {
      if (!(input instanceof Map) && !isObject(input)) return { issues: [{ message: 'expected a dict', path }] };
      const issues = [];
      const out    = new Map;
      for (const [rawKey, rawValue] of input instanceof Map ? input : Object.entries(input)) {
        const keyed = key.validate(rawKey, [...path, rawKey]);
        const value = values.validate(rawValue, [...path, rawKey]);
        if (keyed.issues) issues.push(...keyed.issues);
        if (value.issues) issues.push(...value.issues);
        if (!keyed.issues && !value.issues) out.set(keyed.value, value.value);
      }
      return issues.length ? { issues } : { value: out };
    },
  });
}

// ::: the data type

class DictType extends Map {
  // new Dict(schema, entries?), new Dict(other): a copy
  constructor (source, entries = []) {
    super();
    const copy   = source instanceof DictType;
    const schema = copy ? source.schema : source;
    if (!(schema instanceof Schema) || schema.kind !== 'dict') throw new TypeError('[rat] a Dict needs a Dict schema: new Dict(Dict(Key, Value))');
    Object.defineProperty(this, 'schema', { value: schema });
    for (const [key, value] of copy ? source : entries instanceof Map ? entries : Object.entries(entries)) this.set(key, value);
  }

  // the key as the key schema makes it, or undefined when it refuses it
  keyOf (key) {
    const result = this.schema.parts.key.validate(key);
    return result.issues ? undefined : result.value;
  }

  set (key, value) { return super.set(this.schema.parts.key.parse(key), this.schema.parts.value.parse(value)); }

  get    (key) { const own = this.keyOf(key); return own === undefined ? undefined : super.get(own); }
  has    (key) { const own = this.keyOf(key); return own !== undefined && super.has(own); }
  delete (key) { const own = this.keyOf(key); return own !== undefined && super.delete(own); }

  toJSON () { return Object.fromEntries(this); }
}

Object.defineProperty(DictType, 'name', { value: 'Dict' });

const Dict = typed(DictType, dictOf);

// ::: $Dict

const $Dict = typed(reactive(Dict, {
  reads  : ['get', 'has', 'size', 'keys', 'values', 'entries', 'forEach', 'toJSON', Symbol.iterator],
  writes : {
    clear  : dict => dict.size > 0,
    delete : (dict, key) => dict.has(key),
    set    : true,
  },
}), dictOf);

register(Dict, $Dict);

// :::::: EXPORT

export { Dict, $Dict };
