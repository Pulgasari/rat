# rat :: ideas

explorations, not plans. nothing here is built. what needs a call from you is
collected in [decisions.md](decisions.md).

- [1. a pipe family](#1-a-pipe-family)
- [2. inspiration](#2-inspiration)
- [3. style languages](#3-style-languages)

---

## 1. a pipe family

`|>` with `#` already covers every case: `users |> #.filter(u => u.active)`. further
operators would only be shorter spellings of the common list operations. the question
is whether they earn their place.

### the hard constraint: `a |X b` must not be valid js already

`|` is bitwise or. any second character that can start an operand turns the "operator"
into plain js that already means something else:

| candidate | idea | `a \|X b` is valid js? | verdict |
|---|---|---|---|
| `\|>` | pipe | no | **built** |
| `\|:` | map | no | free |
| `\|?` | filter | no | free |
| `\|*` | reduce | no | free |
| `\|^` | sort / flat? | no | free, but no obvious meaning |
| `\|@` | each (side effect) | practically no (only a decorated class expression could follow) | free |
| `\|.name` | pluck | no, as long as a name follows (`\|.5` is valid) | free, with that limit |
| `\|!` | reject | **yes**: `a \| !b` | taken |
| `\|~` | ? | **yes**: `a \| ~b` | taken |
| `\|+` `\|-` | ? | **yes**: `a \| +b` | taken |
| `\|1` | find | **yes**: `a \| 1` | taken |
| `\|$` | ? | **yes**: `a \| $x` | taken |
| `\|#` | ? | **yes**: `a \| #x in obj` (brand check) | taken |
| `\|=` | ? | **yes**: compound assignment | taken |
| `\|` | map | **yes**: bitwise or | taken |

### a coherent set (proposal)

`#` stays the placeholder; in the list operators it is the **item**:

```js
users |? #.active |: #.name                  // users.filter(u => u.active).map(u => u.name)
users |.name                                 // users.map(u => u.name)
1..10 |? # % 2 |* (sum, #) => sum + #, 0     // reduce: (accumulator, item), initial value
items |@ console.log(#)                      // forEach, returns items (for chaining)
```

| operator | meaning | rewrite |
|---|---|---|
| `\|:` | map | `.map($$item => …)` |
| `\|?` | filter | `.filter($$item => …)` |
| `\|.name` | pluck | `.map($$item => $$item.name)` |
| `\|*` | reduce | `.reduce(…)`, needs an initial value: the open spot of this set |
| `\|@` | each | `(list => (list.forEach(…), list))` |

the reject / find slots are taken by js (`|!`, `|1`). alternatives: `|?!` (reject) and
`|?1` (find), both free, both a bit cryptic.

### for and against

- **for**: data flow reads left to right in one line, markup holes stay short
  (`{$users |? #.active |.name}`), ranges get useful at once (`1..10 |? # % 3`).
- **against**: five new operators to learn, `|?` and `|:` look alike, `|*` needs a second
  argument, and `|> #.filter(…)` is only a few characters longer.
- **middle ground**: only `|:` and `|?` (the 90 % case), everything else through `|>`.

the call is [d-10](decisions.md#d-10).

---

## 2. inspiration

what each source could give rat, concretely. not a wish list, a filter.

| source | idea | for rat |
|---|---|---|
| haskell | ranges `[1..10]`, list comprehensions | ranges are built. a comprehension is `@for` with a guard: `@for (x of xs if x > 2)` |
| haskell | `where` clauses | `@let` after a block head: names that only exist in the body |
| haskell | guards | `@if` chains already read like guards in the one-line form |
| php / latte | filters `{$name\|upper}` | is the pipe in holes: `{name \|> upper}` |
| latte | `{first}`, `{last}`, `{sep}` in loops | loop metadata in `@for`: `$first`, `$last`, `$index`, or `@sep { , }` between items |
| latte | `n:class`, `n:attr` | `class:x` exists. `attr:x={cond && value}` for optional attributes |
| latte / laravel blade | layouts with named blocks | named slots: `<slot name="head" />` ↔ `<div slot="head">` |
| laravel blade | `@props([...])`, `$attributes->merge()` | a props declaration with defaults, and rest attributes merged onto the root element |
| laravel | artisan generators | a `rat` cli: `rat new component todo-list`, `rat build`, `rat check` |
| svelte | `{#await}` | `@await (promise) … @then (value) … @catch (error)` |
| svelte | `{@const}` | `@let x = expr` in markup |
| svelte | `transition:fade`, `animate:flip` | a `transition:` directive on top of the web animations api and view transitions |
| svelte | snippets | markup fragments as values: `@fragment row (item) { … }`, used as `{row(item)}` |
| lit | directives (`repeat`, `classMap`, `until`) | the runtime blocks already are directives. user-defined ones: `use:tooltip={text}` |
| lit | `css` tag + adopted sheets | the same mechanism as `<style>` → `@scope`, already built |
| jquery | chaining, event delegation | `@domina` chains. delegation as a modifier: `on:click.delegate`? |
| rescript | exhaustive pattern matching | `@match` with destructuring patterns: `@case { type: 'error', message }` |
| rescript | pipe-first `->` vs pipe-last | the reason `#` exists: the value goes where it is written |
| vue | `v-model.trim`, `.number`, `.lazy` | modifiers on bindings: `bind:value.number={$age}` |
| solid | stores, `<For>`, `<Show>` | fine-grained lists are built (`each`). stores = `@rat/types` reactive records |
| astro | islands, `client:visible` | a lazy directive: a component that loads and mounts when visible (`@domina/observer` has `onVisible`) |
| htmx | behavior through attributes | the aufbau "controller" concept (`pattern=`, `filter=`, `hotkey=`) as rat directives |
| elm | no runtime exceptions, one model | schemas validate at the boundaries: `@rat/types` as the contract |

the most promising for the next round: loop metadata (`$first` / `$last` / `$index`),
`@let`, `@await`, binding modifiers and `use:` directives. each is small, local and
fits the existing syntax.

---

## 3. style languages

### what native css covers now

| scss feature | native today |
|---|---|
| nesting | css nesting (baseline 2023) |
| variables | custom properties, plus `@property` for typed ones |
| color functions | `color-mix()`, relative colors (`oklch(from var(--c) l c h)`) |
| scoping | `@scope` (the rat compiler emits it) |
| math | `calc()`, `min()`, `max()`, `clamp()`, `round()`, trig functions |
| functions | `@function` (custom functions, chromium 2025, others in progress) |
| conditionals | `if()` (chromium 2025), container and style queries |
| mixins | `@mixin` / `@apply`: specified, not shipped |
| loops, maps | none |

so the remaining reasons for scss are mixins, loops and maps, and existing scss code.

### options for rat

| option | cost | note |
|---|---|---|
| preprocessor hook | nothing in the compiler | **built**: `compile(source, { styles: { scss } })`. the build passes sass, the browser playground could lazy-load it |
| bundled sass | the `sass` package is large (dart compiled to js, several hundred kb) | wrong for a browser-first compiler |
| `<style lang="ass">` | own | your `@aufbau/ass` as a preprocessor: same hook, one line to wire |
| native only | nothing | the nesting example from scss works unchanged as css |

the call is [d-20](decisions.md#d-20).
