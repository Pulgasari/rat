// @rat/signals :: core

/*
the graph is alien-signals' (createReactiveSystem): links in two doubly linked
lists, push of dirty / pending marks, pull with checkDirty, a cutoff when a
computed recomputes to the same value. this file is the facade around it, in
the shape rat's compiler and runtime use: nodes with .value, an owner tree for
@if / @for, onCleanup, batch, untrack, schema checked writes.

two things are kept apart that alien-signals' own api ties together:

  observer  the node that is currently reading: reads link to it
  owner     the node that new effects and scopes belong to

a component body runs in a scope: it owns what it creates, but it reads
untracked, so a signal read while setting up never re-runs anything.

ownership goes through the graph: a child effect is linked as a dependency of
its owner. when the owner runs again or is disposed, the child loses its last
subscriber, alien-signals reports it as unwatched, and it is disposed. the
same report lets a computed nobody reads anymore drop its sources.
*/

import { createReactiveSystem } from './system.js';

// ::: flags (alien-signals' ReactiveFlags, plus one of its index)

const MUTABLE         = 1;
const WATCHING        = 2;
const RECURSED_CHECK  = 4;
const RECURSED        = 8;
const DIRTY           = 16;
const PENDING         = 32;
const HAS_CHILD       = 64;

// ::: state

let observer   = undefined; // the node reads link to
let owner      = null;      // the node new effects and scopes belong to
let batchDepth = 0;
let runDepth   = 0;
let cycle      = 0;

const queued = [];
let queuedLength = 0;
let notifyIndex  = 0;

// ::: nodes

class Node {
  deps     = undefined;
  depsTail = undefined;
  subs     = undefined;
  subsTail = undefined;
  flags    = 0;
}

class Signal extends Node {
  flags = MUTABLE;
  schema;
  currentValue;
  pendingValue;

  constructor (value) {
    super();
    if (isSchema(value)) { this.schema = value; value = value.initial; }
    this.currentValue = this.pendingValue = value;
  }

  get value () {
    if (this.flags & DIRTY && commit(this) && this.subs) shallowPropagate(this.subs);
    if (observer) link(this, observer, cycle);
    return this.currentValue;
  }

  set value (next) {
    if (this.schema) {
      const checked = check(this.schema, next);
      if (!checked.ok) return;
      next = checked.value;
    }
    if (Object.is(this.pendingValue, next)) return;
    this.pendingValue = next;
    this.flags = MUTABLE | DIRTY;
    if (this.subs) {
      propagate(this.subs, runDepth > 0);
      if (!batchDepth) flush();
    }
  }

  peek     () { return untrack(() => this.value); }
  toString () { return String(this.value); }
}

class Computed extends Node {
  getter;
  current = undefined;

  constructor (getter) {
    super();
    this.getter = getter;
  }

  get value () {
    const flags = this.flags;
    if (flags & DIRTY || (flags & PENDING && (checkDirty(this.deps, this) || (this.flags = flags & ~PENDING, false)))) {
      if (recompute(this) && this.subs) shallowPropagate(this.subs);
    }
    else if (!flags) {
      this.flags = MUTABLE | RECURSED_CHECK;
      const previous = observer;
      observer = this;
      try     { this.current = this.getter(); }
      finally { observer = previous; this.flags &= ~RECURSED_CHECK; }
    }
    if (observer) link(this, observer, cycle);
    return this.current;
  }

  peek     () { return untrack(() => this.value); }
  toString () { return String(this.value); }
}

class Effect extends Node {
  fn;
  cleanups = [];
  flags    = WATCHING | RECURSED_CHECK;

  constructor (fn) {
    super();
    this.fn = fn;
  }
}

// a scope owns what is created in it and never runs again
class Scope extends Node {
  cleanups = [];
  flags    = MUTABLE;
}

// ::: the graph

const { link, unlink, propagate, checkDirty, shallowPropagate } = createReactiveSystem({
  update (node) {
    if (node instanceof Computed) return recompute(node);
    if (node instanceof Signal)   return commit(node);
    node.flags = MUTABLE;
    return true;
  },

  // queues the effect and its watching owners, outermost first
  notify (effect) {
    let insert = queuedLength;
    const first = insert;
    do {
      queued[insert++] = effect;
      effect.flags &= ~WATCHING;
      effect = effect.subs?.sub;
    } while (effect !== undefined && effect.flags & WATCHING);
    queuedLength = insert;
    for (let left = first, right = insert - 1; left < right; left++, right--) {
      [queued[left], queued[right]] = [queued[right], queued[left]];
    }
  },

  // the last subscriber is gone: a computed lets go of its sources, an effect or scope is disposed
  unwatched (node) {
    if (node instanceof Computed) {
      if (node.depsTail !== undefined) {
        node.flags = MUTABLE | DIRTY;
        unlinkAll(node);
      }
    }
    else if (node instanceof Effect || node instanceof Scope) dispose(node);
  },
});

function commit (signal) {
  signal.flags = MUTABLE;
  const changed = !Object.is(signal.currentValue, signal.pendingValue);
  signal.currentValue = signal.pendingValue;
  return changed;
}

function recompute (computed) {
  if (computed.flags & HAS_CHILD) dropChildren(computed);
  computed.depsTail = undefined;
  computed.flags    = MUTABLE | RECURSED_CHECK;
  const previous = observer;
  observer = computed;
  try {
    cycle++;
    const old = computed.current;
    computed.current = computed.getter(old);
    return !Object.is(old, computed.current);
  }
  finally {
    observer = previous;
    computed.flags &= ~RECURSED_CHECK;
    purge(computed);
  }
}

function run (effect) {
  const flags = effect.flags;
  if (flags & DIRTY || (flags & PENDING && checkDirty(effect.deps, effect))) {
    if (flags & HAS_CHILD) dropChildren(effect);
    runCleanups(effect);
    if (!effect.flags) return;   // disposed by its own cleanup
    effect.depsTail = undefined;
    effect.flags    = WATCHING | RECURSED_CHECK;
    execute(effect);
    purge(effect);
  }
  else if (effect.deps !== undefined) {
    effect.flags = WATCHING | (flags & HAS_CHILD);
  }
}

// runs the effect's function as observer and owner
function execute (effect) {
  const previousObserver = observer;
  const previousOwner    = owner;
  observer = effect;
  owner    = effect;
  try {
    cycle++;
    runDepth++;
    const result = effect.fn();
    if (typeof result === 'function') effect.cleanups.push(result);
  }
  finally {
    runDepth--;
    observer = previousObserver;
    owner    = previousOwner;
    effect.flags &= ~RECURSED_CHECK;
  }
}

function flush () {
  try {
    while (notifyIndex < queuedLength) {
      const effect = queued[notifyIndex];
      queued[notifyIndex++] = undefined;
      run(effect);
    }
  }
  finally {
    // an effect threw: the rest is marked to run on the next flush
    while (notifyIndex < queuedLength) {
      const effect = queued[notifyIndex];
      queued[notifyIndex++] = undefined;
      effect.flags |= WATCHING | RECURSED;
    }
    notifyIndex  = 0;
    queuedLength = 0;
  }
}

// ::: ownership

function adopt (node, parent) {
  if (!parent) return;
  link(node, parent, 0);
  parent.flags |= HAS_CHILD;
}

// unlinks child effects and scopes before a re-run: they get disposed through unwatched
function dropChildren (node) {
  for (let current = node.depsTail; current !== undefined;) {
    const previous = current.prevDep;
    if (current.dep instanceof Effect || current.dep instanceof Scope) unlink(current, node);
    current = previous;
  }
}

// the links after depsTail are the sources not read in the last run
function purge (node) {
  for (let current = node.depsTail !== undefined ? node.depsTail.nextDep : node.deps; current !== undefined;) {
    current = unlink(current, node);
  }
}

function unlinkAll (node) {
  for (let current = node.depsTail; current !== undefined;) {
    const previous = current.prevDep;
    unlink(current, node);
    current = previous;
  }
}

function runCleanups (node) {
  if (!node.cleanups.length) return;
  const previous = observer;
  observer = undefined;
  try     { for (const fn of node.cleanups.splice(0)) fn(); }
  finally { observer = previous; }
}

function dispose (node) {
  if (!node.flags && !node.deps && !node.subs) return;
  node.flags = 0;
  unlinkAll(node);
  if (node.subs !== undefined) unlink(node.subs);
  runCleanups(node);
}

// ::: schemas

const isSchema = value => typeof value?.['~standard']?.validate === 'function';

// a schema check, { ok, value }. an async schema can not guard a synchronous write
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

const signal   = value  => new Signal   (value);
const computed = getter => new Computed (getter);
const getOwner = ()     => owner;
const isSignal = value  => value instanceof Signal || value instanceof Computed;

// runs fn now and again on every change. parent: who disposes it, the current
// owner unless given, null for no one (the caller disposes it)
function effect (fn, parent = owner) {
  const node = new Effect(fn);
  adopt(node, parent);
  execute(node);
  return () => dispose(node);
}

// runs fn untracked as owner of everything created inside, returns [result, dispose].
// parent: who disposes the scope, the current owner unless given
function scope (fn, parent = owner) {
  const node = new Scope;
  adopt(node, parent);
  const previousObserver = observer;
  const previousOwner    = owner;
  observer = undefined;
  owner    = node;
  try     { return [fn(), () => dispose(node)]; }
  finally { observer = previousObserver; owner = previousOwner; }
}

function batch (fn) {
  batchDepth++;
  try     { return fn(); }
  finally { if (!--batchDepth) flush(); }
}

function untrack (fn) {
  const previous = observer;
  observer = undefined;
  try     { return fn(); }
  finally { observer = previous; }
}

// fn runs when the current owner is disposed or runs again
function onCleanup (fn) {
  owner?.cleanups.push(fn);
}

// :::::: EXPORT

export {
  Computed, Signal,
  batch, computed, effect, getOwner, isSchema, isSignal, onCleanup, scope, signal, untrack,
};
