# rat :: reactivity

status: **idea**, the plan for the signal layer. 

today `@rat/runtime/signals.js` is a first draft (push-pull with a cutoff, `Set`s per dependency).

decisions: [d-31](#d-31) package name, [d-32](#d-32) the core, [d-23](#d-23) mutation (moved here from its own file).

see also: 
- [alien-signals.md][alien-signals] (how the core works, and the comparison with the current draft)
- [types](types.md)
- [causa_types.md](../causa_types.md)
- [immer.md][immer]
- [mobx.md][mobx]
- [svelte.md][svelte]
  
## the plan in one picture

```
@rat/signals    (or @rat/reactivity, d-31)
├── core        alien-signals' graph (createReactiveSystem), behind rat's own facade
├── facade      signal / computed / effect / scope / batch / untrack / onCleanup, .value
├── $()         "make this reactive", the explicit short form, picks the form by value
├── registry    $.register(Map, $Map): which reactive variant belongs to which kind of value
└── reactive()  derives a reactive variant from a class: reactive(Map, { reads, writes })

@rat/types      the schemas, and the variants ($List, $Map, $Set, $Enum …), registered in the registry
@rat/runtime    dom and events (@domina/render), imports @rat/signals
```

rat is a framework and picks its core for itself. `@aufbau/signals` (a fork of
`@preact/signals`, used in zugriff) is a separate library and stays as it is; nothing here
depends on it or changes it. aufbau packages work with rat the way they work with anything
else: through plain interfaces at the border (a `subscribe(fn)` that returns an
unsubscribe, standard schema, custom elements and attributes), with the adapter on rat's
side (a behavior), not inside the library.

## the core: alien-signals behind a facade

**why not an own algorithm.** the hard part of a signal system is the graph: what is stale,
what really changed, in which order effects run, how links are stored. alien-signals is the
fastest and leanest answer to that so far (1.9 kb, no allocations in the steady state, a
cutoff when a computed recomputes to the same value), and it separates the algorithm
(`alien-signals/system`) from the api on purpose. vue 3.6, xstate and datastar use it the
same way: their own surface on its graph.

**why a facade.** inside `.rat` files nobody sees the api: the compiler turns `$count` into
`count.value`. the facade is for three readers only: the runtime, `@rat/types`, and people
who use rat from plain `.js`. so it can be shaped for them:

| rat needs | alien-signals has | in the facade |
|---|---|---|
| `signal`, `computed`, `effect` | yes, as functions (`count()`, `count(5)`) | classes with `.value` getters and setters, built on `createReactiveSystem` directly, not wrapped around the function api |
| cutoff on equal values | yes | as is |
| owners for `@if` / `@for` | nested effects, `effectScope` | `scope(fn)` returning `[result, dispose]`, as today |
| `onCleanup` | an effect may return its cleanup | `onCleanup(fn)` that registers on the current owner |
| `batch`, `untrack` | `startBatch` / `endBatch`, `setActiveSub` | `batch(fn)`, `untrack(fn)` |
| typed writes (d-14) | no | a signal made from a schema checks every write |
| peek, `toString` | no | yes |

**risks.** alien-signals had three major versions with breaking changes in two years: pin
the version, and keep every call to it inside the facade, so an update touches one file.
it is a dependency of 1.9 kb; the alternative (porting its ~300 lines of graph into rat) is
possible later if the dependency ever gets in the way.

<a id="d-32"></a>
## d-32 · the core

- [ ] a) keep an own algorithm, improve the draft (cutoff done, links and allocation next)
- [ ] b) alien-signals' graph (`createReactiveSystem`) behind rat's facade, version pinned **(rec)**
- [ ] c) a copy of alien-signals' graph inside rat (no dependency, updates by hand)

## the problem behind "reactive variants"

a signal only notices **reassignment**:

```js
const map = signal(new Map);
map.value.set('a', 1);   // the same map object: nothing updates
```

containers can be reactive in three ways, by granularity:

| | how | who reacts to what | examples |
|---|---|---|---|
| a) replace immutably | `$todos = [...$todos, x]` | everything that reads `$todos`, on every change | rat today, [immer](https://github.com/pulgasari/pulgasari.github.io/blob/main/md/webdev/libs/immer.md) |
| b) a wrapper with a version | reading methods subscribe to one version signal, writing methods bump it | everything that reads the container, on every change | alien-signals' `trigger`, `@aufbau/store` |
| c) one signal per key | `get('a')` depends on key `a` only | only who reads that key | svelte's `SvelteMap`, vue's `reactive(new Map)`, solid's stores |

b is short and enough almost always; c pays off for large collections where single entries
change often. both can live behind the same class interface, so a variant can start as b
and become c without its users noticing.

## a variant by hand

```js
// a reactive map: reads subscribe to one version signal, writes bump it
class $Map extends Map {
  #version = signal(0);

  constructor (entries) {
    super();                                      // NOT super(entries), see the trap below
    if (entries) for (const [key, value] of entries) super.set(key, value);
  }

  get  (key) { this.#version.value; return super.get(key); }
  has  (key) { this.#version.value; return super.has(key); }
  get size () { this.#version.value; return super.size; }

  set (key, value) {
    if (super.has(key) && Object.is(super.get(key), value)) return this;   // no change, no update
    super.set(key, value);
    this.#version.value++;
    return this;
  }

  delete (key) { const done = super.delete(key); if (done) this.#version.value++; return done; }
  clear  ()    { if (super.size) { super.clear(); this.#version.value++; } }
  // keys, values, entries, forEach, Symbol.iterator: read #version first, then super
}
```

**the trap.** `super(entries)` makes the built-in constructor call the **overridden**
`this.set()` for every entry, before the private fields of the subclass exist: a
`TypeError`. a variant of a built-in is constructed empty and filled afterwards.

## deriving variants: `reactive(Class, { reads, writes })`

writing every variant by hand repeats the same pattern. the pattern itself can be a
function: given a class and which methods read and which write, it returns the subclass
with the version signal.

```js
const $Map = reactive(Map,   { reads: ['get', 'has', 'size', 'keys', 'values', 'entries', 'forEach', Symbol.iterator], writes: ['set', 'delete', 'clear'] });
const $Set = reactive(Set,   { reads: ['has', 'size', 'values', 'forEach', Symbol.iterator], writes: ['add', 'delete', 'clear'] });
const $Arr = reactive(Array, { reads: ['at', 'length', 'map', 'filter', 'find', 'includes', Symbol.iterator /* … */], writes: ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse', 'fill' /* … */] });
```

- the same works for own classes: `List`, `Dict`, `Color` from `@rat/types`, or anything
  with a clear split into reading and writing methods.
- a write that changes nothing should not bump the version; a generic wrapper can not know
  that, so `writes` may take a function instead of a name (`set: (map, key, value) => !Object.is(map.get(key), value)`).
- arrays have one gap: index assignment (`list[0] = x`) is not a method call and can only
  be caught with a proxy. for `$List` from `@rat/types` this does not matter: it is an own
  class with its own methods.
- getters (`size`, `length`) are wrapped as getters, symbols (`Symbol.iterator`) as methods.

## `$()`: the explicit short form

in a `.rat` script the compiler already does it: `let $bla = [1, 2, 3]` becomes a signal.
`$()` is the same thing written out, for plain `.js` without a compiler, and the one place
that decides which reactive form a value gets:

```js
$(0)                         // a plain signal
$(Enum('grid', 'list'))      // a typed signal (d-14)
$(new Map([['a', 1]]))       // a $Map: the registry knows Map
$([1, 2, 3])                 // a $List, if one is registered, else a plain signal
$(reactiveThing)             // returned as it is, never wrapped twice

$.register(Map, $Map);       // @rat/types fills the registry
```

`let $bla = [1, 2, 3]` and `let $bla = $([1, 2, 3])` would then mean exactly the same,
because the compiler emits `$(…)` instead of `signal(…)`. this is dispatch by kind of value,
the same pattern as `@pulgasari/shift`.

a factory for a variant becomes a one-liner on top: `const $Map = (...args) => $(new Map(...args))`.
(a sketch like `() => $(Map(...args))` fails twice: `Map()` without `new` throws, and it
returns a function that makes a new signal on every call instead of one reactive map.)

open: what `$()` does with a plain object. a signal (reassign only, cheap), a deep proxy
(every property a signal, like vue's `reactive` or svelte's `$state`), or a `$Record` from
`@rat/types` when the object has a schema.

## what it means for d-23

with `$()` in the compiler, `let $todos = []` makes `$todos` a `$List`, and
`$todos.push(x)` is **really** reactive. that does not break rat's visibility rule, it fulfils
it: the `$` is on the name, so a mutation through `$todos` looks reactive and is. mobx's
problem is the opposite case, mutation that is reactive without showing it.

<a id="d-23"></a>
## d-23 · mutating `$` arrays and objects (`$todos.push(x)`)

- [ ] a) reassign only: `$todos = [...$todos, x]` **(v0)**
- [ ] b) the compiler turns known mutating calls into updates (`push`, `splice`, `sort` …)
- [ ] c) reactive types from `@rat/types` (`$List`) take care of it **(rec)**: with `$()` and its registry, the compiler picks the variant by the initial value, see above

## the package name

the package holds the core, the facade, `$()`, the registry and `reactive()`. the variants
themselves live in `@rat/types`, the dom side in `@rat/runtime`.

<a id="d-31"></a>
## d-31 · the package name

- [ ] a) `@rat/signals` **(rec)**: says what it is, and it is the word the ecosystem uses for this layer (`@preact/signals`, `@solidjs/signals`, angular signals, the tc39 proposal). `$()` and the variants are signals too
- [ ] b) `@rat/reactivity`: broader, like `@vue/reactivity`, which also holds deep proxies (`reactive()`); fits if plain objects become deep proxies by default
- [ ] c) it stays inside `@rat/runtime` as `signals.js`, no package of its own

## open questions

- **granularity per variant:** b (one version) as the default, c (per key) where it pays
  off? `$Map` with many keys and fine readers is the typical c case.
- **plain objects in `$()`:** see above.
- **equality:** `Object.is` for signals; should a schema be able to bring its own (a `Color`
  that compares by value, not by object)?
- **interop at the border:** a `from(source)` that turns anything with `subscribe(fn)` into a
  signal, and a `subscribe` on rat signals for libraries that expect one.
- **devtools:** alien-signals keeps its graph in links and flags; a debug build of the facade
  could name nodes and expose the graph.

[alien-signals]: https://github.com/pulgasari/pulgasari.github.io/main/tree/md/webdev/libs/alien-signals.md
[immer]: /pulgasari.github.io/md/webdev/libs/immer.md
[mobx]: /pulgasari.github.io/md/webdev/libs/mobx.md
[svelte]: /pulgasari.github.io/md/webdev/libs/svelte.md
