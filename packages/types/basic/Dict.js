// @rat/types :: Dict, $Dict

// :::::: IMPORT

import './Map.js';   // $Map registered first: a Dict is a Map too, the later registration is asked first
import { Record } from './Record.js';
import { Schema, issue, schemaOf, typed, variant } from './../schema.js';
import { isObject, isSymbol } from './../_shared.js';

// ::: SCHEMA

const valueOf = value => schemaOf(value) instanceof Schema ? schemaOf(value) : Record(value);

// a Map or a plain object, every key and value checked and coerced, a Map out
function dictOf (keyed, value) {
  const key    = schemaOf(keyed);
  const values = valueOf(value);
  return new Schema({
    describe : { key: key.describe, value: values.describe },
    initial  : {},
    kind     : 'dict',
    parts    : { key, value: values },
    run      : (input, path) => {
      if (!(input instanceof Map) && !isObject(input)) return issue('expected a dict', path);
      
      const issues  = [];
      const out     = new Map;
      const entries = input instanceof Map ? input : Object.entries(input);
      
      for (const [rawKey, rawValue] of entries) {
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

// ::: ENTRIES AS PROPERTIES

// a dict -> its methods, called on it: a Map method needs the Map, not the proxy. what gives the dict back gives the proxy
const bound = new WeakMap;

function boundOf (target, key, method, proxy) {
  if (!bound.has(target)) bound.set(target, new Map);
  const methods = bound.get(target);
  if (!methods.has(key)) methods.set(key, (...args) => { const result = method.apply(target, args); return result === target ? proxy : result; });
  return methods.get(key);
}

const isMember = (target, key) => isSymbol(key) || key in target;
const member   = key => new TypeError(`[rat] ${String(key)} is a member of the Dict: an entry of that name goes through set() and delete()`);

const ENTRIES = {
  deleteProperty (target, key)        { if (isMember(target, key)) throw member(key); return target.delete(key); },
  has            (target, key)        { return isMember(target, key) || target.has(key); },
  set            (target, key, value) { if (isMember(target, key)) throw member(key); target.set(key, value); return true; },

  get (target, key, proxy) {
    if (!isMember(target, key)) return target.read(target.get(key));
    const value = Reflect.get(target, key, target);
    return typeof value === 'function' && key !== 'constructor' ? boundOf(target, key, value, proxy) : value;
  },
};

// ::: DATA TYPE

class DictType extends Map {
  // new Dict(schema, entries?), new Dict(other): a copy
  constructor (source, entries = []) {
    super();
    const copy   = source instanceof DictType;
    const schema = copy ? source.schema : source;
    if (!(schema instanceof Schema) || schema.kind !== 'dict') throw new TypeError('[rat] a Dict needs a Dict schema: new Dict(Dict(Key, Value))');
    Object.defineProperty(this, 'schema', { value: schema });
    for (const [key, value] of copy ? source : entries instanceof Map ? entries : Object.entries(entries)) this.set(key, value);
    return new Proxy(this, ENTRIES);
  }

  // what an entry read as a property gives: the value, another view of it in a subclass
  read (value) { return value; }

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

// ::: Dict + $Dict

const  Dict = typed(DictType, dictOf, { kind: 'dict', name: 'Dict' });
const $Dict = variant(Dict);

// :::::: EXPORT

export { Dict, $Dict };
