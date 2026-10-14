// @rat/runtime :: signals

/*
push-pull core. a write marks everything downstream stale (push), computeds
recompute lazily on read (pull), effects are queued and flushed once the
outermost write or batch is done, so an effect never sees half an update.

ownership: every effect and scope belongs to the owner it was created in and
is disposed with it. that is what lets @if / @for throw away a whole branch.
*/

let observer = null; // the computed or effect currently reading
let owner    = null; // the effect or scope new effects belong to
let depth    = 0;    // batch depth

const queue = new Set;

// ::: nodes

class Signal {
  #value;
  observers = new Set;

  constructor (value) { this.#value = value; }

  get value () {
    if (observer) link(this, observer);
    return this.#value;
  }

  set value (next) {
    if (Object.is(next, this.#value)) return;
    this.#value = next;
    batch(() => { for (const node of [...this.observers]) node.stale(); });
  }

  peek () { return this.#value; }
  toString () { return String(this.value); }
}

class Computed {
  #fn;
  #value;
  dirty     = true;
  observers = new Set;
  sources   = new Set;

  constructor (fn) { this.#fn = fn; }

  get value () {
    if (observer) link(this, observer);
    if (this.dirty) {
      unlink(this);
      this.#value = track(this, this.#fn);
      this.dirty  = false;
    }
    return this.#value;
  }

  stale () {
    if (this.dirty) return;
    this.dirty = true;
    for (const node of [...this.observers]) node.stale();
  }

  peek () { return untrack(() => this.value); }
  toString () { return String(this.value); }
}

class Effect {
  #fn;
  cleanups = [];
  children = new Set;
  disposed = false;
  sources  = new Set;

  constructor (fn, parent = owner) {
    this.#fn    = fn;
    this.parent = parent;
    parent?.children.add(this);
  }

  run () {
    if (this.disposed) return;
    this.reset();
    const previous = owner;
    owner = this;
    try     { track(this, this.#fn); }
    finally { owner = previous; }
  }

  stale () { queue.add(this); }

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
  target.sources.add(source);
}

function unlink (target) {
  for (const source of target.sources) source.observers.delete(target);
  target.sources.clear();
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

// ::: api

const signal   = value => new Signal(value);
const computed = fn    => new Computed(fn);

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

const getOwner = () => owner;
const isSignal = value => value instanceof Signal || value instanceof Computed;

export { Computed, Signal, batch, computed, effect, getOwner, isSignal, onCleanup, scope, signal, untrack };
