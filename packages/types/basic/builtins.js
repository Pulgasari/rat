// @rat/types :: $Array, $Map, $Set

// the reactive variants of js' own containers, registered: `let $x = []`, `new Map`, `new Set` in a .rat
// script is a signal holding one. $Map and $Set are subclasses (reactive()), $Array a proxy: index access
// and length are no methods, only a proxy sees them, and Array.isArray stays true

// :::::: IMPORT

import { REACTIVE, Signal, WRITES, reactive, register, untrack } from '@rat/signals';

// ::: $Array

// these return the array itself: the proxy, not the raw one
const SELF = new Set(['copyWithin', 'fill', 'purge', 'reverse', 'sort', 'sortBy', 'swap']);

function $Array (items = []) {
  const target  = [...items];
  const version = new Signal(0);
  const methods = new Map;   // key -> the tracking or notifying form of an array method

  const track = () => { version.value; };
  const bump  = () => { version.value = untrack(() => version.value) + 1; };

  const tracking  = method => (...args) => { track(); return method.apply(target, args); };
  const notifying = (key, method) => (...args) => {
    const result = untrack(() => method.apply(target, args));
    bump();
    return SELF.has(key) ? proxy : result;
  };

  const methodOf = (key, method) => {
    if (!methods.has(key)) methods.set(key, WRITES.has(key) ? notifying(key, method) : tracking(method));
    return methods.get(key);
  };

  const proxy = new Proxy(target, {
    get (target, key) {
      if (key === REACTIVE) return true;
      const value = target[key];
      if (typeof value === 'function' && key !== 'constructor' && value === Array.prototype[key]) return methodOf(key, value);
      track();
      return value;
    },
    set            (target, key, value) { target[key] = value; bump(); return true; },
    deleteProperty (target, key)        { delete target[key]; bump(); return true; },
    has            (target, key)        { track(); return key in target; },
    ownKeys        (target)             { track(); return Reflect.ownKeys(target); },
  });

  return proxy;
}

Object.defineProperty($Array, Symbol.hasInstance, { value: value => Array.isArray(value) && value[REACTIVE] === true });

// ::: $Map + $Set

const $Map = reactive(Map);
const $Set = reactive(Set);

register(Array, $Array);
register(Map,   $Map);
register(Set,   $Set);

// :::::: EXPORT

export { $Array, $Map, $Set };
