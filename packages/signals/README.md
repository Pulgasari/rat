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
| `reactive(Class, { reads, writes })` | a subclass whose reading methods subscribe and whose writing methods notify |
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

a signal only notices reassignment; a container changed in place needs a variant:

```js
const $Map = reactive(Map, {
  reads  : ['get', 'has', 'size', 'keys', 'values', 'entries', 'forEach', Symbol.iterator],
  writes : { set: (map, key, value) => !map.has(key) || !Object.is(map.get(key), value), delete: (map, key) => map.has(key), clear: map => map.size > 0 },
});

register(Map, $Map);
$(new Map).value.set('a', 1);   // whatever read the map updates
```

- a `writes` entry is `true` or a check `(target, ...args) => changes?`, run untracked before
  the write; when it says no, nothing is notified.
- the version signal is created on first use, so built-ins whose constructor calls the
  overridden method (`new Map(entries)` calls `set`) work.
- `@rat/types` brings `$List`, `$Map` and `$Set` and registers them for `Array`, `Map` and `Set`.

## needs

an import map entry for `alien-signals/system` (the playground uses
`https://cdn.jsdelivr.net/npm/alien-signals@3.2.1/esm/system.mjs`, a single file without
imports).
