# @rat/signals

based on [alien-signals](https://github.com/stackblitz/alien-signals) (pinned to 3.2.1) behind a facade in the shape rat's compiler and runtime use.

```js
import { $, computed, effect, signal } from '@rat/signals';

const $count  = signal(0);
const $double = computed(() => $count.value * 2);

const stop = effect(() => console.log($double.value)); // logs 0
$count.value = 2;                                      // logs 4
stop();
```

in a `.rat` file none of this is written by hand: `let $count = 0` compiles to
`$$.$(0)`, every `$count` to `count.value`.

## api

| | |
|---|---|
| `signal(value)` | a node with `.value`; a schema as value starts at its initial value and checks every write |
| `computed(fn)` | derived, lazy, cached; recomputing to the same value stops the update there |
| `effect(fn, parent?)` | runs now and on every change; `fn` may return a cleanup. returns `dispose` |
| `scope(fn, parent?)` | runs `fn` untracked as owner of what it creates, returns `[result, dispose]` |
| `batch(fn)`, `untrack(fn)` | one update for many writes; reads that subscribe to nothing |
| `onCleanup(fn)` | runs when the current owner runs again or is disposed |
| `peek()` | the value without subscribing |
| `$(value)` | the explicit form of `let $x = …`: always a signal, its value through the registry |
| `reactive(Class)` | a subclass whose reading methods subscribe and whose writing methods notify, told apart by name |
| `register(kind, variant)`, `$.register` | which variant `$()` gives a kind of value |

`parent` is the owner that disposes the node: the current owner unless given, `null` for no
one (the caller disposes it, as `@domina/render` does).

## how it differs from alien-signals' own api

- **`.value`** instead of calls (`count()`, `count(5)`), because the compiler writes `.value`.
- **observer and owner are separate.** alien-signals ties "who reads" and "who owns new
  effects" to one active subscriber. a component body here runs in a `scope`: it owns what it
  creates but reads untracked, so a signal read while setting up never re-runs a parent.
- **ownership through the graph:** a child effect is linked as a dependency of its owner.
  when the owner runs again or is disposed, the child loses its last subscriber and is
  disposed (alien-signals' `unwatched`). the same report lets a computed nobody reads anymore
  let go of its sources.
- **`Object.is`** for equality, so `NaN` counts as unchanged.
- **schema checked writes** (d-14) and **`onCleanup`**.

## reactive variants

a signal only notices reassignment; a container changed in place needs a variant. a variant
is a plain subclass, used like the original:

```js
import { $Map } from '@rat/types';

const $bla = new $Map;
effect(() => console.log($bla.get('a')));   // logs undefined
$bla.set('a', 1);                           // logs 1
```

`reactive()` is how such a variant is made, `@rat/types` does it for every data type:

```js
const $Map = reactive(Map);
```

what reads and what writes comes from the names, the same for every class (`WRITES` in
`reactive.js`):

| | |
|---|---|
| a getter | a read: `size`, `length`, `value`, `hex` |
| a setter | a write: `value = …`, `r = …` |
| a method named in `WRITES` | a write: `add`, `assign`, `clear`, `cycle`, `dec`, `delete`, `drop`, `inc`, `off`, `on`, `pop`, `push`, `remove`, `replace`, `reverse`, `set`, `shift`, `sort`, `sortBy`, `splice`, `toggle`, `unshift`, `update`, `[SET]` |
| any other method | a read |

a new method that changes its target needs its name in `WRITES`, else it reads. a write
notifies every time, also when nothing changed (`set(key, sameValue)`).

the same code works unchanged in `.js`, `.rat.js` and `.rat`: the compiler leaves a `$name`
made with `new $Variant(…)` as written, no signal, no `.value`.

`$()` and the registry are the other way in, for a value of any kind: `$(new Map)` is a
signal whose value becomes a `$Map`. in a `.rat` script `let $bla = new Map` compiles to that,
and lets `$bla` be reassigned (`$bla = new Map(entries)` gives a new `$Map`).

- a write runs untracked: what it reads of its target (`update` reads `at()`) does not subscribe
  the effect that writes.
- the version signal is created on first use, so built-ins whose constructor calls the
  overridden method (`new Map(entries)` calls `set`) work.
- `@rat/types` brings the variants (`$List`, `$Map`, `$Set`, `$Record` …) and registers them for `Array`, `Map` and `Set`.

## stored

a signal kept beyond the page (`stored.js`): read back when it is made, written on every change.
`let $x! = …` compiles to it, the key is the name.

```js
let   $theme = stored('theme', Enum('zombie', 'oled'));     // a signal, checked by its schema
const $tabs  = stored('tabs', $List(Tab).create());          // a reactive variant, kept in place
```

options: `key`, `in` (the place), `scope`, `debounce`, `sync`, `version`, `migrate`. the full list and
how they behave: [persistence.md](../../.md/persistence.md), `@rat/types`' readme.

it knows neither types nor storage, only what a place, a schema or a value can say:

| | |
|---|---|
| a place | `{ peek? (key), get? (key), set (key, value), delete (key), on? ('change', fn), load? () }`: a `@rat/bunker` store is one. `stored.place(name, place)` adds one, `@rat/app` sets `store` (`RAT.app.store`) and `database`. without it: `store` localStorage, `session` sessionStorage, `memory` |
| `schema['~standard']` | a standard schema checks what is read |
| `schema.fit (value)` | where a schema has it, it reads leniently (`@rat/types`: a record field by field) |
| `schema[STORED]` | the options of `.stored()` on a schema (`@rat/types`), a `Table` says `in: 'database'` |
| `value[SCHEMA]` | the schema a data type was made by (`$List(Tab).create()`) |

## system.js

alien-signals' `system.mjs` (3.2.1), vendored: a single file without imports, so the package
needs no import map entry and no dependency.
