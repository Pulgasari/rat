// @rat/signals :: reactive variants and $()

/*
a signal only notices reassignment. a container that is changed in place (a
map that gets set(), a list that gets push()) needs a variant whose methods
report what they do: reading methods subscribe to a version signal, writing
methods bump it.

  const $Map = reactive(Map, {
    reads  : ['get', 'has', 'size', 'keys', 'values', 'entries', 'forEach', Symbol.iterator],
    writes : { set: (map, key, value) => !map.has(key) || !Object.is(map.get(key), value), delete: true, clear: true },
  });

a getter is a read, a setter is a write (value on $Enum).

the version signal is created on first use, not in a field: a built-in like
Map calls the overridden set() from its own constructor, before any field of
a subclass exists.

$() is the explicit form of what the compiler does with `let $x = …`: it
always returns a signal (the compiler adds .value to every $name), and the
registry decides which variant its value gets, now and on every write:

  $(0)                  a signal of 0
  $(Enum('a', 'b'))     a signal checked by the schema
  $(new Map)            a signal holding a $Map, once a variant for Map is registered
  $(signal)             the signal itself
*/

import { Signal, batch, isSchema, isSignal, untrack } from './core.js';

const REACTIVE = Symbol.for('rat.reactive');
const VERSION  = Symbol('rat.version');

const versionOf = target => target[VERSION] ??= new Signal(0);
const track     = target => { versionOf(target).value; };
const bump      = target => { versionOf(target).value++; };

const isReactive = value => isSignal(value) || value?.[REACTIVE] === true;

// ::: reactive(Class, { reads, writes })

// a descriptor up the prototype chain, for getters like size
function descriptorOf (prototype, name) {
  for (let current = prototype; current; current = Object.getPrototypeOf(current)) {
    const descriptor = Object.getOwnPropertyDescriptor(current, name);
    if (descriptor) return descriptor;
  }
  return null;
}

// writes: a list of names, or { name: true | (target, ...args) => changes? }
const entriesOf = writes => Array.isArray(writes) ? writes.map(name => [name, true]) : Reflect.ownKeys(writes).map(name => [name, writes[name]]);

function reactive (Base, { reads = [], writes = [] } = {}) {
  const Reactive = class extends Base {};
  Object.defineProperty(Reactive, 'name', { value: `$${Base.name}` });
  Object.defineProperty(Reactive.prototype, REACTIVE, { value: true });

  for (const name of reads) {
    const descriptor = descriptorOf(Base.prototype, name);
    if (!descriptor) throw new TypeError(`[rat] ${Base.name} has no ${String(name)} to read`);
    if (descriptor.get) {
      const get = descriptor.get;
      Object.defineProperty(Reactive.prototype, name, { configurable: true, get () { track(this); return get.call(this); }, set: descriptor.set });
    }
    else {
      const method = descriptor.value;
      Object.defineProperty(
        Reactive.prototype, 
        name,
        { 
          configurable: true, 
          writable: true, 
          value: function (...args) { 
            track(this); 
            return method.apply(this, args); 
          }
        }
      );
    }
    
  }

  for (const [name, changes] of entriesOf(writes)) {
    const descriptor = descriptorOf(Base.prototype, name);
    const method     = descriptor?.value ?? descriptor?.set;
    if (typeof method !== 'function') throw new TypeError(`[rat] ${Base.name} has no method or setter ${String(name)} to write with`);

    const write = function (...args) {
      // the check reads the target: untracked, or an effect that writes would subscribe to its own write
      if (changes !== true && !untrack(() => changes(this, ...args))) return method.apply(this, args);
      return batch(() => { const result = method.apply(this, args); bump(this); return result; });
    };

    // a setter keeps its getter, the tracking one when the name is a read as well
    if (descriptor.set) Object.defineProperty(Reactive.prototype, name, { configurable: true, get: descriptorOf(Reactive.prototype, name).get, set: write });
    else Object.defineProperty(Reactive.prototype, name, { configurable: true, writable: true, value: write });
  }

  return Reactive;
}

// ::: $() and its registry

const registry = []; // [test, make], the latest registration first

// $.register(Map, $Map): a class as kind means instanceof, a function is a test.
// a variant made by reactive() is constructed from the value, any other make is called with it
function register (kind, make) {
  const test  = kind.prototype ? value => value instanceof kind : kind;
  const build = make.prototype?.[REACTIVE] ? value => new make(value) : make;
  registry.unshift([test, build]);
}

// the variant for a value, or the value itself
function wrap (value) {
  if (value == null || typeof value !== 'object' || isReactive(value)) return value;
  for (const [test, build] of registry) if (test(value)) return build(value);
  return value;
}

// a signal whose value goes through the registry, on creation and on every write
class Holder extends Signal {
  constructor (value) { super(wrap(value)); }
  get value ()     { return super.value; }
  set value (next) { super.value = wrap(next); }
}

function $ (value) {
  if (isSignal(value)) return value;
  if (isSchema(value)) return new Signal(value);
  return new Holder(value);
}

$.register = register;

// :::::: EXPORT

export { $, REACTIVE, isReactive, reactive, register, wrap };
