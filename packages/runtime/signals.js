// @rat/runtime :: signals

/*
push-pull core. a write marks everything downstream stale (push), computeds
recompute lazily on read (pull), effects are queued and flushed once the
outermost write or batch is done, so an effect never sees half an update.

two marks: the direct dependents of a written signal are dirty, everything
further down is only maybe stale (check). a maybe stale node first asks its
sources whether one of them really changed (each value carries a version),
so a computed that recomputes to the same value stops the update there.

ownership: every effect and scope belongs to the owner it was created in and
is disposed with it. that is what lets @if / @for throw away a whole branch.

a signal created from a schema (anything with a standard schema interface,
'~standard', e.g. from @rat/types) starts at the schema's initial value and checks
every write: a value the schema rejects is dropped with a warning, a value it
coerces is stored coerced. d-14 a: let $view = Enum('grid', 'list').
*/

let observer = null; // the computed or effect currently reading
let owner    = null; // the effect or scope new effects belong to
let depth    = 0;    // batch depth

const queue = new Set;

// ::: nodes

class Signal {
  #value;
  observers = new Set;
  schema    = null;
  version   = 0;

  constructor (value) {
    if (isSchema(value)) { this.schema = value; value = value.initial; }
    this.#value = value;
  }

  get value () {
    if (observer) link(this, observer);
    return this.#value;
  }

  set value (next) {
    if (this.schema) {
      const checked = check(this.schema, next);
      if (!checked.ok) return;
      next = checked.value;
    }
    if (Object.is(next, this.#value)) return;
    this.#value = next;
    this.version++;
    batch(() => { for (const node of [...this.observers]) node.stale(true); });
  }

  peek     () { return this.#value; }
  toString () { return String(this.value); }
}

class Computed {
  #fn;
  #value;
  check     = false; // a source of a source changed: maybe stale
  dirty     = true;  // a source changed: stale
  observers = new Set;
  sources   = new Map; // source -> the version read
  version   = 0;

  constructor (fn) { this.#fn = fn; }

  get value () {
    this.refresh();
    if (observer) link(this, observer);
    return this.#value;
  }

  // recomputes when stale, bumps the version only when the value changed
  refresh () {
    if (this.check && !this.dirty) this.dirty = changed(this);
    this.check = false;
    if (!this.dirty) return;

    const first = this.version === 0;
    unlink(this);
    const next  = track(this, this.#fn);
    this.dirty  = false;
    if (first || !Object.is(next, this.#value)) { this.#value = next; this.version++; }
  }

  stale (direct) {
    const clean = !this.dirty && !this.check;
    if (direct) this.dirty = true;
    else        this.check = true;
    if (clean) for (const node of [...this.observers]) node.stale(false);
  }

  peek () { return untrack(() => this.value); }
  toString () { return String(this.value); }
}

class Effect {
  #fn;
  cleanups = [];
  children = new Set;
  disposed = false;
  forced   = true; // runs without asking its sources: the first time, or after a direct write
  sources  = new Map;

  constructor (fn, parent = owner) {
    this.#fn    = fn;
    this.parent = parent;
    parent?.children.add(this);
  }

  run () {
    if (this.disposed) return;
    if (!this.forced && !changed(this)) return;
    this.forced = false;
    this.reset();
    const previous = owner;
    owner = this;
    try     { track(this, this.#fn); }
    finally { owner = previous; }
  }

  stale (direct) {
    if (direct) this.forced = true;
    queue.add(this);
  }

  reset () {
    unlink(this);
    for (const child of this.children) child.dispose();
    this.children.clear();
    for (const fn of this.cleanups.splice(0)) fn();
  }

  dispose () {
    if (this.disposed) return;
    this.reset();
    this.disposed = true;
    this.parent?.children.delete(this);
    queue.delete(this);
  }
}

// a scope is an effect that never re-runs: only an owner for what is created in it
class Scope extends Effect {
  stale () {}
}

// ::: tracking

function link (source, target) {
  source.observers.add(target);
  target.sources.set(source, source.version);
}

function unlink (target) {
  for (const source of target.sources.keys()) source.observers.delete(target);
  target.sources.clear();
}

// true if a source has a newer value than the one the target last read
function changed (target) {
  for (const [source, version] of target.sources) {
    if (source instanceof Computed) source.refresh();
    if (source.version !== version) return true;
  }
  return false;
}

function track (node, fn) {
  const previous = observer;
  observer = node;
  try     { return fn(); }
  finally { observer = previous; }
}

function flush () {
  while (queue.size) {
    const [next] = queue;
    queue.delete(next);
    next.run();
  }
}

// ::: schemas

const isSchema = value => typeof value?.['~standard']?.validate === 'function';

// a schema check, { ok, value }. async schemas can not guard a synchronous write
function check (schema, value) {
  const result = schema['~standard'].validate(value);
  if (typeof result?.then === 'function') {
    console.warn('[rat] an async schema can not check a signal write, the value is taken as it is');
    return { ok: true, value };
  }
  if (result.issues) {
    console.warn(`[rat] ${JSON.stringify(value)} rejected: ${result.issues.map(issue => issue.message).join(', ')}`);
    return { ok: false };
  }
  return { ok: true, value: result.value };
}

// :::::: API

const signal   = value => new Signal (value);
const computed = fn    => new Computed (fn);

// parent: who disposes the effect, the current owner unless given (null: no one)
function effect (fn, parent = owner) {
  const node = new Effect(fn, parent);
  node.run();
  return () => node.dispose();
}

function batch (fn) {
  depth++;
  try     { return fn(); }
  finally { if (--depth === 0) flush(); }
}

function untrack (fn) {
  const previous = observer;
  observer = null;
  try     { return fn(); }
  finally { observer = previous; }
}

// runs fn as owner of everything created inside, returns [result, dispose].
// parent: who disposes the scope, the current owner unless given
function scope (fn, parent = owner) {
  const node     = new Scope(null, parent);
  const previous = owner;
  owner = node;
  try     { return [untrack(fn), () => node.dispose()]; }
  finally { owner = previous; }
}

function onCleanup (fn) {
  owner?.cleanups.push(fn);
}

const getOwner = ()    => owner;
const isSignal = value => value instanceof Signal || value instanceof Computed;

// :::::: EXPORT

export {
  Computed, Signal,
  computed, effect, signal,
  batch,  getOwner, isSchema, isSignal, onCleanup, scope, untrack
};
