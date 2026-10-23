// @rat/types :: $Array

/*
$Array: a plain js array whose reads subscribe and whose writes notify. a
proxy, not a subclass: index access and length are no methods, only a proxy
sees them. Array.isArray is true, every array method works.

  const $todos = new $Array([]);   // or $Array([])
  $todos.push(todo);               // whatever read $todos updates
  $todos[0] = other;               // the same
  $todos.length;                   // reading subscribes

registered for Array, so `let $todos = []` in a .rat script is a signal
holding a $Array. the items are copied, the array handed in stays as it is.

a mutating method runs on the array itself and notifies once. every other
read (index, length, a method, iteration) subscribes to one version for the
whole array, like $Map and $Set.
*/

import { REACTIVE, Signal, register, untrack } from '@rat/signals';

// mutating methods: whether a call changed the array (length before, result, args)
const MUTATORS = {
  copyWithin : () => true,
  fill       : () => true,
  pop        : (length, result, array) => array.length !== length,
  push       : (length, result, array) => array.length !== length,
  reverse    : () => true,
  shift      : (length, result, array) => array.length !== length,
  sort       : () => true,
  splice     : (length, result, array, args) => result.length > 0 || args.length > 2,
  unshift    : (length, result, array) => array.length !== length,
};

// these return the array itself: the proxy, not the raw one
const SELF = new Set(['copyWithin', 'fill', 'reverse', 'sort']);

function $Array (items = []) {
  const target  = [...items];
  const version = new Signal(0);
  const methods = new Map; // key -> the tracking or notifying form of an array method

  const track = () => { version.value; };
  const bump  = () => { version.value = untrack(() => version.value) + 1; };

  const tracking  = method => (...args) => { track(); return method.apply(target, args); };
  const notifying = (key, method) => (...args) => {
    const length = target.length;
    const result = method.apply(target, args);
    if (MUTATORS[key](length, result, target, args)) bump();
    return SELF.has(key) ? proxy : result;
  };

  const methodOf = (key, method) => {
    if (!methods.has(key)) methods.set(key, Object.hasOwn(MUTATORS, key) ? notifying(key, method) : tracking(method));
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
    set (target, key, value) {
      const changed = !Object.is(target[key], value);
      target[key] = value;
      if (changed) bump();
      return true;
    },
    deleteProperty (target, key) {
      const had = Object.hasOwn(target, key);
      delete target[key];
      if (had) bump();
      return true;
    },
    has     (target, key) { track(); return key in target; },
    ownKeys (target)      { track(); return Reflect.ownKeys(target); },
  });

  return proxy;
}

Object.defineProperty($Array, Symbol.hasInstance, { value: value => Array.isArray(value) && value[REACTIVE] === true });

register(Array, $Array);

// :::::: EXPORT

export { $Array };
