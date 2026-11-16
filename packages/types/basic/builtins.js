// @rat/types :: $Array, $Map, $Set

/*
the reactive variants of js' own containers, registered: `let $x = []`, `new Map`, `new Set` in a .rat
script is a signal holding one. $Map and $Set are subclasses (reactive()), $Array a proxy: index access
and length are no methods, only a proxy sees them, and Array.isArray stays true.

$Array is one name in two forms, as every data type here:

  new $Array(items)          a reactive array
  $Array(Str)                the schema of an array of strings, with more than [Str] has: .min(1), .stored() …
  $Array(Tab).create([{}])   a reactive array that keeps to its schema: what comes in (push, splice,
                             array[i] = …) goes through the schema of an item, an item that is a data
                             type (a Record) is made one. array.schema is the schema
*/

// :::::: IMPORT

import { REACTIVE, Signal, WRITES, reactive, register, untrack } from '@rat/signals';

import { arrayOf }    from './../schema.js';
import { isSchemaOf } from './../_shared.js';

// :::::: HELPERS

const isArraySchema = isSchemaOf('array');
const isIndex       = key => typeof key === 'string' && /^(0|[1-9]\d*)$/.test(key);

// the arguments of a write that are items, as [from, to) of the arguments. replace takes a list of them
const ITEMS = { fill: [0, 1], push: [0, Infinity], splice: [2, Infinity], toggle: [0, 1], unshift: [0, Infinity] };

// an item as it comes in: through its schema, made a data type when the schema is one
const coerceBy = item => !item ? null
  : item.factory ? value => value?.schema === item ? value : item.create(value)
  : value => item.parse(value);

// :::::: $Array

/*
the proxy. options, all optional:
  schema    what array.schema gives
  coerce    what an item goes through on its way in
  members   an object of methods and getters the array has besides those of Array, called on the proxy
*/
function reactiveArray (items = [], { coerce = null, members = null, schema = null } = {}) {
  const target  = coerce ? [...items].map(coerce) : [...items];
  const version = new Signal(0);
  const methods = new Map;   // key -> the tracking or notifying form of a method

  const track = () => { version.value; };
  const bump  = () => { version.value = untrack(() => version.value) + 1; };

  function incoming (key, args) {
    if (!coerce) return args;
    if (key === 'replace') return [[...args[0]].map(coerce)];
    const range = ITEMS[key];
    return range ? args.map((value, index) => index >= range[0] && index < range[1] ? coerce(value) : value) : args;
  }

  const tracking  = method => (...args) => { track(); return method.apply(target, args); };
  const notifying = (key, method) => (...args) => {
    const result = untrack(() => method.apply(target, incoming(key, args)));
    bump();
    return result === target ? proxy : result;
  };

  const methodOf = (key, method) => {
    if (!methods.has(key)) methods.set(key, WRITES.has(key) ? notifying(key, method) : tracking(method));
    return methods.get(key);
  };

  const proxy = new Proxy(target, {
    get (target, key) {
      if (key === REACTIVE) return true;
      if (key === 'schema') return schema;

      const member = members && Object.getOwnPropertyDescriptor(members, key);
      if (member?.get) return member.get.call(proxy);
      if (member) return (...args) => member.value.apply(proxy, args);

      const value = target[key];
      if (typeof value === 'function' && key !== 'constructor' && value === Array.prototype[key]) return methodOf(key, value);
      track();
      return value;
    },
    set            (target, key, value) { target[key] = coerce && isIndex(key) ? coerce(value) : value; bump(); return true; },
    deleteProperty (target, key)        { delete target[key]; bump(); return true; },
    has            (target, key)        { track(); return key in target; },
    ownKeys        (target)             { track(); return Reflect.ownKeys(target); },
  });

  return proxy;
}

// new $Array(items), new $Array(schema, items): the array. $Array(Str), $Array(schema): the schema
function $Array (first, second) {
  if (new.target) {
    if (!isArraySchema(first)) return reactiveArray(first);
    return reactiveArray(second ?? first.initial, { coerce: coerceBy(first.parts.item), schema: first });
  }
  const schema = isArraySchema(first) ? first : arrayOf(first);
  return schema.derive({ factory: (schema, items) => new $Array(schema, items) });
}

Object.defineProperty($Array, Symbol.hasInstance, { value: value => Array.isArray(value) && value[REACTIVE] === true });

// ::: $Map + $Set

const $Map = reactive(Map);
const $Set = reactive(Set);

register(Array, items => new $Array(items));
register(Map,   $Map);
register(Set,   $Set);

// :::::: EXPORT

export { $Array, $Map, $Set, reactiveArray };
