// @rat/signals :: reactive variants and $()

/*
a signal only notices reassignment. a container that is changed in place (a
map that gets set(), a list that gets push()) needs a variant whose methods
report what they do: reading methods subscribe to a version signal, writing
methods bump it.

  const $Map = reactive(Map);

what is which comes from the names, the same for every class:

  a getter         a read (size, length, value, hex)
  a setter         a write (value = …, r = …)
  a method         a write when its name is one of WRITES (set, push, toggle …), else a read

a write runs untracked: what it reads of its target (Table's update reads at())
does not subscribe the effect that writes.

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
  $(value with [SIGNAL]) the signal it makes: a schema with .stored() gives one that is kept
*/

import { Signal, batch, isSchema, isSignal, untrack } from './core.js';

const REACTIVE = Symbol.for('rat.reactive');
const SIGNAL   = Symbol.for('rat.signal');

// outside the target, so a sealed or frozen instance works too (a Record is sealed)
const versions  = new WeakMap;
const versionOf = target => versions.get(target) ?? versions.set(target, new Signal(0)).get(target);
const track     = target => { versionOf(target).value; };
const bump      = target => { versionOf(target).value++; };

const isReactive = value => isSignal(value) || value?.[REACTIVE] === true;

// ::: reactive(Class)

// the names that change their target, in every class. SET writes one field (a Record's, a scalar's value)
const SET    = Symbol.for('rat.set');
const WRITES = new Set([
  'add', 'assign', 'clear', 'cycle', 'dec', 'delete', 'drop', 'inc', 'off', 'on', 'pop', 'push',
  'remove', 'replace', 'reverse', 'set', 'shift', 'sort', 'sortBy', 'splice', 'toggle', 'unshift', 'update',
  SET,
]);

// the own names of a class and its parents, the nearest first, Object's own left out
function namesOf (prototype) {
  const found = new Map;
  for (let current = prototype; current && current !== Object.prototype; current = Object.getPrototypeOf(current)) {
    for (const name of Reflect.ownKeys(current)) if (name !== 'constructor' && !found.has(name)) found.set(name, Object.getOwnPropertyDescriptor(current, name));
  }
  return found;
}

function reactive (Base) {
  const Reactive = class extends Base {};
  Object.defineProperty(Reactive, 'name', { value: `$${Base.name}` });
  Object.defineProperty(Reactive.prototype, REACTIVE, { value: true });

  const read  = fn => function (...args) { track(this); return fn.apply(this, args); };
  const write = fn => function (...args) { return batch(() => { const result = untrack(() => fn.apply(this, args)); bump(this); return result; }); };

  for (const [name, descriptor] of namesOf(Base.prototype)) {
    if (descriptor.get || descriptor.set) {
      Object.defineProperty(Reactive.prototype, name, { configurable: true, get: descriptor.get && read(descriptor.get), set: descriptor.set && write(descriptor.set) });
    }
    else if (typeof descriptor.value === 'function') {
      Object.defineProperty(Reactive.prototype, name, { configurable: true, value: (WRITES.has(name) ? write : read)(descriptor.value), writable: true });
    }
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
  if (typeof value?.[SIGNAL] === 'function') return value[SIGNAL]();
  if (isSchema(value)) return new Signal(value);
  return new Holder(value);
}

$.register = register;

// :::::: EXPORT

export { $, REACTIVE, SET, SIGNAL, isReactive, reactive, register, wrap };
