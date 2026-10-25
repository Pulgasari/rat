# rat :: concept

status: draft v0. everything here is a proposal, not a decision. what the prototype
already does is marked **(v0)**. open questions live in [ideas/](ideas/README.md),
each section points to its entries.

- [1. stance](#1-stance)
- [2. three entrances](#2-three-entrances)
- [3. architecture](#3-architecture)
- [4. reactivity: `$` is the signal](#4-reactivity--is-the-signal)
- [5. types are values](#5-types-are-values)
- [6. app: commands, hotkeys, router](#6-app-commands-hotkeys-router)
- [7. what comes from existing work](#7-what-comes-from-existing-work)
- [8. roadmap](#8-roadmap)

---

## 1. stance

| principle | consequence |
|---|---|
| browser first | compiler and runtime run natively in the browser, no build. a build is an optimization, not a requirement |
| build power anyway | the same compiler runs as esbuild / vite / node hook. in a build it may do more: static analysis, template cloning, tree shaking |
| compiler over runtime magic | what can be decided at compile time is decided there. the runtime stays small and dumb |
| syntax is the product | the notation is not a side effect but the core. every rule must read without knowing the docs |
| visible semantics | no hidden reactivity. what is reactive shows in its name (`$count`), not only where it is declared |
| platform over abstraction | native apis where they suffice: `@scope` for css, custom elements, invoker commands, `adoptedStyleSheets` |
| types without typescript | schemas are runtime values. they validate, coerce, persist and can be read by the compiler |

explicitly **not** the goal: compatibility with react / svelte ecosystems, a vdom,
jsx parity, typescript as a first class citizen.

---

## 2. three entrances

one core, three notations. all end up in the same ast and the same codegen.

| entrance | file | build needed | what it does |
|---|---|---|---|
| vanilla | `.js` | no | ``html`…` `` through htx at runtime. the gateway drug, nothing is transformed |
| sugar | `.rat.js` | yes (or compile in the browser) | plain js plus sugar: `\|>`, `..`, implicit `const` in `for…of`, `$` signals. ``html`…` `` with `{…}` holes is compiled **(v0)** |
| component | `.rat` | yes (or compile in the browser) | markup first: `<script>`, `<script module>`, `<style>`, control flow in the markup **(v0)** |

the difference to "a framework with a compiler": `.js` stays a full way in. whoever does
not want the compiler loses the sugar, not the framework.

decided: [d-11](ideas/templates-in-js.md#d-11) template tag name, [d-12](ideas/templates-in-js.md#d-12) `{…}` holes in vanilla.

---

## 3. architecture

```
           ┌──────────── @rat/compiler ───────────┐
.rat —————►│ parse      markup → ast (+ scripts)     │
.rat.js ——►│ script     |>, for…of, $ signals         |
           │ analyze    reactive names, scopes        │
           │ generate   ast → htx template (dom)      │──► es module
           │ style      <style> → @scope (native)    │
           └───────────────────────────────────┘
                                                   │ imports
                                                   ▼
                 ┌──────────── @rat/runtime ─────────────┐
                 │ signals    signal computed effect     │
                 │            batch untrack scope        │
                 │ dom        html render each when      │
                 │            match use bind on mount    │
                 └───────────────────────────────────────┘
                                   │ renders through
                                   ▼
                 ┌──────────── @domina/render ───────────┐
                 │ template   cloned once per program    │
                 │ parts      live holes, each when match│
                 └───────────────────────────────────────┘
                                   ▲
                 ┌──────── @rat/app modules ─────────────┐
                 │ commands   registry ← 'rat:command'   │
                 │ hotkeys    combos → commands          │
                 │ router     <rat-app>                  │
                 └───────────────────────────────────────┘
                                   ▲
                 ┌──────────── @rat/types ───────────────┐
                 │ schemas    Bool Enum Num Str List …   │
                 │ reactive   $Bool $List $Dict $Tree …  │
                 └───────────────────────────────────────┘
```

### packages

| package | role | status |
|---|---|---|
| `@rat/compiler` | `.rat` / `.rat.js` → es module. runs in browser, node, deno, bun | v0 |
| `@rat/signals` | the signal layer: alien-signals' graph behind rat's facade, `$()`, `reactive()` ([reactivity](ideas/reactivity.md)) | v0 |
| `@rat/runtime` | `@rat/signals` plus `@domina/render` with effect and scope: fine-grained, no vdom, no tree diffing | v0 |
| `@rat/syntax` | highlighting from one spec: hljs, monaco, codemirror/acode, zed, textmate | v0 |
| `@rat/app` | no build: `run.js`, `<rat-app>`, `<rat-part>` | v0 |
| `@rat/import` | files of any format as values | v0 |
| `@rat/types` | data types with their schemas (`Color`, `Enum`, `List`, `Record`, `Tuple`), schemas (`Str`, `Num`, `Union` …), reactive variants (`$Color`, `$Enum`, `$List`, `$Map`, `$Record`, `$Set`) | v0 |
| `@rat/dev` | one build plugin (unplugin: vite, rollup, rolldown, esbuild, webpack): compiles .rat files, resolves through `importmap.json` of `@rat/app` | built |
| `@rat/elements` | bridge to `@aufbau/elements`, components as custom elements | planned |

### codegen targets

| target | output | when |
|---|---|---|
| `dom` | an htx template (``$$.html`…` ``) with live holes, rendered by `@domina/render`: static markup is parsed once per template and cloned, only the holes bind | **(v0)**, default |
| `ssr` | string output, hydration markers | later |
| `htx` | ``html`…` `` output for existing htx/preact projects (migration, zugriff): the `dom` target is htx already | covered |

decided: [d-18](ideas/app.md#d-18), core and runtime stay separate.

---

## 4. reactivity: `$` is the signal

the existing pattern (`$bool`, `$Bool`, "syntax from god") becomes a language rule:

```html
<script>
  let   $count  = 0;            // signal
  const $double = $count * 2;   // computed (derived)
  const step    = 1;            // plain js

  function inc () { $count += step; }
</script>

<button onclick={inc}>{$count} × 2 = {$double}</button>
```

| written | compiled to |
|---|---|
| `let $x = v` | `let $x = $$.$(v)`: a signal, its value through the registry of reactive variants ([reactivity](ideas/reactivity.md)) |
| `const $x = expr` | `const $x = $$.computed(() => expr)` |
| `let $x = new $Map` (any `new $Variant(…)`, `let` or `const`) | unchanged: the variant reports its own reads and writes, no `.value`, no reassignment |
| reading `$x` | `$x.value` |
| `$x = v`, `$x++`, `$x += v` | `$x.value = v` etc. |
| `{expr}` in markup | `() => expr`, the runtime binds fine-grained |
| `bind:value={$x}` | the signal itself, not its value |

**why `$` and not svelte's `let`:** reactivity is visible at every read and write, not
only at the declaration. one line tells whether it triggers an update. and it is the
same convention as in `@aufbau/signals`.

**rules (v0):**
- only declared `$` names are rewritten. an imported `$bool` or jquery's `$` stays as is.
- `$` signals in `<script module>` are shared module wide: a store for every instance,
  without a store api.
- mutation in place (`$todos.push(x)`) does not notify. v0: reassign
  (`$todos = [...$todos, x]`). later: reactive types from `@rat/types` (`$List`).

open: [d-13](ideas/props.md#d-13) props, [d-15](ideas/loop-metadata.md#d-15) `@for` index,
[d-23](ideas/reactivity.md#d-23) mutation. shadowing (a parameter `$x` in an inner function is
still rewritten in v0) needs scope analysis in the compiler, no decision needed.

---

## 5. types are values

no typescript. schemas instead, which exist at runtime and which the compiler can read
when they are static.

```js
import { Bool, Enum, List, Num, Record, Str } from '@rat/types';

export const Todo = Record({
  id    : Str.uuid,
  title : Str.min(1),
  done  : Bool,
});

export const Settings = Record({
  view : Enum('grid', 'list'),
  zoom : Num.range(50, 200).default(100),
  tags : List(Str),
});
```

what a schema should do:

| ability | purpose |
|---|---|
| `validate` / `coerce` | input, storage, network |
| `default` | initial values, reset |
| `reactive()` | turns the schema into a reactive type (`$Record`, `$List` …) with fitting verbs (`toggle`, `cycle`, `push`) |
| `persist` | through `@bunker` |
| `describe` | introspection: generate forms, devtools, `@aufbau/gui` controls |
| statically readable | the compiler knows the shape: completion, warnings, targeted updates |

notation in a `.rat` script, decided ([d-14](ideas/types.md#d-14)) and built in v0: the
schema is the initial value, the signal starts at its initial value and checks every write.

```js
let $view = Enum('grid', 'list');
```

further open points (no decision yet, need more design first):
- relation to `@aufbau/store` (typed multi-key store) and `@aufbau/signals` (typed
  signals): `@rat/types` as the unification of both?
- data flow across boundaries (worker, server, storage): the schema as a contract that is
  checked the same way everywhere.

---

## 6. app: commands, hotkeys, router

taken from the readme, compiler and runtime already have the entry points:

- a **string** as event handler is a command: `<button onclick='toggleSidebar'>` fires
  `rat:command` with `{ name, event }` (bubbling). **(v0)**
- a registry (`Commands`, `@rat/app/modules/commands.js`, a `$Dict`) listens for it (`commands.listen(root)`) and runs it. firing and the key notation are `@rat/runtime`'s.
- hotkeys (`Hotkeys`, `@rat/app/modules/hotkeys.js`) reference commands: `hotkeys.assign({ 'ctrl+b': 'toggle-sidebar' })`.
- native `command` / `commandfor` (invoker commands api) is heard as well,
  `--toggle-sidebar` ↔ `toggleSidebar`.

```js
import { Commands } from '@rat/app/modules/commands.js';
import { Hotkeys }  from '@rat/app/modules/hotkeys.js';

const commands = new Commands({ toggleSidebar: () => $sidebar = !$sidebar });
commands.listen(document);

new Hotkeys({ 'ctrl+b': 'toggle-sidebar' }).listen(globalThis, { commands });
```

open: [d-16](ideas/app.md#d-16) commands with arguments. decided: [d-17](ideas/app.md#d-17) router.

---

## 7. what comes from existing work

| source | taken over |
|---|---|
| htx | tag selectors (`<div#id.a.b>`), prop groups (`a\|b=`), `class:` props, merge instead of overwrite **(v0, in the compiler)**. positional values and shorthand tags follow |
| htx compiler | block split (`<script module>`, `<script>`, `<style>`), import lifting, errors with line/column **(v0)** |
| latte | `{foreach}…{else}` → `@for … @else` **(v0)**. the `n:` attribute form (`@if` on an element) was tried and removed |
| svelte | single file component, compiler instead of vdom |
| preact/signals | fine-grained reactivity, the `.value` model (hidden by the compiler) |
| php | pragmatism, markup and logic may stand side by side |
| `@aufbau/elements` | ui building blocks, `<write-code>` in the playground |
| `@aufbau/store`, `@aufbau/signals` | basis for `@rat/types` |
| `@domina` | dom helpers for runtime and core, where sensible |
| `@bunker` | persistence for types and app state |

more inspiration, sorted by what rat could take: [ideas/](ideas/README.md).

---

## 8. roadmap

1. ~~v0: compiler (`dom` target), runtime, playground in `demos/`~~
2. ~~editor support~~ → `@rat/syntax` (one spec, derived for hljs, monaco, codemirror/acode, zed, textmate)
3. scope analysis in the compiler (shadowing, warn on unknown `$` names), source maps.
4. ~~commands, hotkeys~~ (modules of `@rat/app`), router: `<app-root>` from aufbau is tried first.
5. `@rat/types` v1: schemas + reactive variants, wired to `$` declarations. ~~schemas, wired
   to `$` declarations~~ (v0); reactive variants, persist and static reading are next.
6. build adapters (vite, esbuild, node hook). ~~`dom:clone` target~~: the `dom` target clones since it renders through `@domina/render`.
7. a first real app (candidate: a small zugriff tool) entirely in rat.
