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

ideas from other languages and frameworks that could fit rat. each one shows where it
comes from (with the original code), what problem it solves, how it could look in rat
and what it would cost. nothing here is built.

overview:
[markup and control flow](#markup-and-control-flow) ·
[attributes and events](#attributes-and-events) ·
[components](#components) ·
[tooling](#tooling) ·
[shortlist](#shortlist)

### markup and control flow

#### 2.1 loop metadata (latte)

**origin.** latte's `{foreach}` hands every loop an `$iterator` that knows where it is,
and `{sep}` renders something between items, but not after the last:

```latte
{foreach $users as $user}
  <li class="{$iterator->first ? 'first'}">{$iterator->counter}. {$user->name}</li>
{/foreach}

{foreach $tags as $tag}{$tag}{sep}, {/sep}{/foreach}
```

**problem.** "is this the first / last item?" and "a comma between items" come up in
almost every list. without help, you compare the index against `list.length - 1` by
hand, every time.

**in rat.**

```html
@for (user of $users)
  <li class:first={$loop.first}>{$loop.number}. {user.name}</li>

@for (tag of $tags)
  {tag}
  @sep: ,
```

- `$loop` exists inside every `@for` body: `index` (0-based), `number` (1-based),
  `first`, `last`, `length`. it starts with `$` because it changes when the list does.
- `@sep` renders between items only.

**cost.** small. the runtime's `each()` knows all of this already, it only has to hand
it over. `$loop` replaces the open question about a reactive index ([d-15](decisions.md#d-15)).

#### 2.2 local names in markup (svelte)

**origin.** svelte's `{@const}` declares a name inside a block:

```svelte
{#each boxes as box}
  {@const area = box.width * box.height}
  <p>{box.width} × {box.height} = {area}</p>
{/each}
```

**problem.** a value computed per item (inside `@for`) has no place to live: the
`<script>` runs once per component, not once per item. so the expression gets repeated
in several holes.

**in rat.**

```html
@for (box of $boxes)
  @let area = box.width * box.height
  <p>{box.width} × {box.height} = {area}</p>
  <meter value={area} max="100"></meter>
```

**cost.** small. the compiler turns it into a `const` at the start of the body function.

#### 2.3 async blocks (svelte)

**origin.** svelte renders the three states of a promise directly in markup:

```svelte
{#await fetchUser(id)}
  <p>loading …</p>
{:then user}
  <p>hello {user.name}</p>
{:catch error}
  <p>failed: {error.message}</p>
{/await}
```

**problem.** loading, success and error otherwise need three signals and an `@if`
chain, written by hand for every fetch.

**in rat.** in all three body forms, like `@if`:

```html
@await (fetchUser($id))
  <p>loading …</p>
@then (user)
  <p>hello {user.name}</p>
@catch (error)
  <p>failed: {error.message}</p>
```

because the promise expression reads `$id`, a new id starts a new request
automatically, and an outdated answer is dropped.

**cost.** medium: a new runtime block (`$$.wait`) that keeps track of which promise is
the current one.

#### 2.4 filters on loops (haskell)

**origin.** haskell's list comprehension builds a list from another, with a condition:

```haskell
[ x * 2 | x <- [1..10], even x ]   -- [4, 8, 12, 16, 20]
```

read: "x times 2, for x from 1 to 10, where x is even".

**problem.** "show only the open todos" otherwise needs a computed or a `.filter()`
inside the `@for` head.

**in rat.**

```html
@for (todo of $todos if !todo.done)
  <li>{todo.title}</li>
@else
  <li>all done</li>
```

**cost.** small. `if …` becomes a `.filter()` around the list. `@else` then means
"nothing left after filtering", which is usually what you want.

#### 2.5 pattern matching (rescript)

**origin.** rescript's `switch` compares a value against **shapes**, not only against
fixed values, and takes parts of it out in the same step:

```rescript
switch result {
| Ok(user)       => "hello " ++ user.name
| Error(message) => "failed: " ++ message
}
```

**problem.** `@switch` only compares with `===`. data often comes as objects of
different shapes (`{ status: 'ok', user }` vs `{ status: 'error', message }`), and
then you need `@if` chains plus property access everywhere.

**in rat.**

```html
@match ($result)
  @case { status: 'ok', user }
    <p>hello {user.name}</p>
  @case { status: 'error', message }
    <p>failed: {message}</p>
  @default
    <p>…</p>
```

a case matches when every literal in it is equal (`status: 'ok'`), and the plain names
(`user`, `message`) become variables inside its body.

**cost.** medium. the compiler turns each case into a check plus a destructuring.

#### 2.6 markup fragments as values (svelte)

**origin.** svelte 5's snippets: a piece of markup with parameters, defined once and
rendered in several places:

```svelte
{#snippet row(item)}
  <tr><td>{item.name}</td><td>{item.price}</td></tr>
{/snippet}

{#each fruits as fruit}{@render row(fruit)}{/each}
```

**problem.** a small repeated piece of markup is not worth its own `.rat` file, but
copying it three times is worse.

**in rat.**

```html
@fragment row (item)
  <tr><td>{item.name}</td><td>{item.price}</td></tr>

<table>
  @for (fruit of $fruits): {row(fruit)}
</table>
```

a fragment is a plain function that returns markup, so it can also be passed to a
child component as a prop.

**cost.** small. it compiles to a function inside the component.

### attributes and events

#### 2.7 event modifiers (vue)

**origin.** vue attaches the routine parts of event handling to the event name:

```vue
<form @submit.prevent="save">
<input @keydown.enter="send">
<button @click.once="init">
```

**problem.** the todos example has `event.preventDefault()` as the first line of
`add()`. code like that is noise in the function and easy to forget.

**in rat.**

```html
<form on:submit.prevent={add}>
<input on:keydown.enter={send} />
<button on:click.once={init}>
```

| modifier | effect |
|---|---|
| `.prevent` | `event.preventDefault()` |
| `.stop` | `event.stopPropagation()` |
| `.once` | the listener removes itself after the first call |
| `.self` | only when the event starts at this element, not a child |
| `.enter`, `.escape`, `.space` … | key events: only for that key |

**cost.** small, in the runtime's event setup. one decision: rat writes events as
`onclick` and `on:click`; modifiers would only work with `on:`.

#### 2.8 binding modifiers (vue)

**origin.** vue's `v-model` takes modifiers that convert the value:

```vue
<input v-model.number="age">   <!-- a number, not "42" -->
<input v-model.trim="name">    <!-- without surrounding spaces -->
<input v-model.lazy="query">   <!-- updates on change, not on every key -->
```

**problem.** an `<input>` always gives a string. `bind:value={$size}` in the
syntax-tour example therefore needs `Number($size)` wherever the value is used.

**in rat.**

```html
<input type="range" bind:value.number={$size} />
<input bind:value.trim={$name} />
<input bind:value.lazy={$query} />
```

**cost.** small, in the runtime's `bind:`.

#### 2.9 rest attributes (laravel blade)

**origin.** a blade component declares its props; everything else the caller writes on
the tag lands in `$attributes` and can be merged onto an element:

```blade
{{-- button.blade.php --}}
@props(['variant' => 'primary'])
<button {{ $attributes->merge(['class' => 'btn btn-' . $variant]) }}>{{ $slot }}</button>

{{-- usage --}}
<x-button variant="danger" class="wide" id="delete">delete</x-button>
{{-- <button class="btn btn-danger wide" id="delete">delete</button> --}}
```

**problem.** a component like `<Button>` cannot know every attribute a caller might
want (`id`, `title`, `aria-*`, `data-*`, more classes). without rest attributes, each
one needs its own prop.

**in rat.**

```html
<!-- button.rat -->
<script>
  let { variant = 'primary', ...rest } = props;
</script>

<button.btn class="btn-{variant}" {...rest}><slot /></button>

<!-- usage -->
<Button variant="danger" class="wide" id="delete">delete</Button>
```

htx already merges `class` and `style` instead of overwriting them, so `class="wide"`
from the caller adds to `btn btn-danger`.

**cost.** small. it depends on how props are declared ([d-13](decisions.md#d-13)).

#### 2.10 element behaviors (svelte actions, lit directives)

**origin.** svelte's `use:` hands an element to a function when it appears, and calls
its cleanup when it goes:

```svelte
<script>
  function tooltip (node, text) {
    const tip = createTip(node, text);
    return { update: next => tip.set(next), destroy: () => tip.remove() };
  }
</script>

<button use:tooltip={'save the file'}>save</button>
```

**problem.** behavior that is not markup (a tooltip, drag and drop, focus trapping,
autosizing a textarea) otherwise needs a `ref` plus manual setup and teardown in the
script.

**in rat.**

```html
<button use:tooltip={'save the file'}>save</button>
<textarea use:autosize></textarea>
<section use:pattern={'dots 8%'}>…</section>
```

a behavior is a function `(element, value) => cleanup`. it runs again when the value
changes. this is the same idea as the aufbau controller concept (`pattern=`, `filter=`,
`hotkey=` as attributes on any element), so `@aufbau/patterns`, `@aufbau/filters` and
`@aufbau/gestures` could ship rat behaviors directly.

**cost.** small in the runtime. the larger work is writing the behaviors.

#### 2.11 enter and leave animations (svelte)

**origin.** svelte animates an element when an `{#if}` adds or removes it:

```svelte
{#if visible}
  <p transition:fade={{ duration: 200 }}>hello</p>
{/if}
```

**problem.** css cannot animate an element that is removed from the dom: it is gone
before the animation could run. the code that removes it has to wait.

**in rat.**

```html
@if ($visible)
  <p transition:fade>hello</p>
```

the runtime's `when()` and `each()` already decide when nodes leave. with a
`transition:`, they play an animation (web animations api) and remove the node
afterwards.

**cost.** medium: leaving nodes have to stay in place for the duration, and a
quick toggle must not leave two copies behind.

### components

#### 2.12 named slots (web components, latte blocks)

**origin.** web components fill several places in a template by name:

```html
<!-- in the template of <app-card> -->
<header><slot name="title"></slot></header>
<main><slot></slot></main>

<!-- usage -->
<app-card>
  <h2 slot="title">weather</h2>
  <p>sunny</p>
</app-card>
```

latte's layouts do the same with `{block title}…{/block}`.

**problem.** rat's `<slot />` takes all children as one piece. a layout component with
a header, a sidebar and a main area cannot tell them apart.

**in rat.** the same notation as the platform:

```html
<!-- card.rat -->
<article>
  <header><slot name="title" /></header>
  <slot />
</article>

<!-- usage -->
<Card>
  <h2 slot="title">weather</h2>
  <p>sunny</p>
</Card>
```

**cost.** small. the compiler sorts children by their `slot` attribute into
`props.slots.title` and `props.children`.

#### 2.13 lazy components (astro islands)

**origin.** astro renders a page as html and loads the javascript of a component only
when it is needed:

```astro
<Chart client:visible />    <!-- loads when it scrolls into view -->
<Comments client:idle />    <!-- loads when the browser is idle -->
```

**problem.** a heavy component (a chart, an editor) far down the page costs loading
time for everyone, also for those who never scroll there.

**in rat.**

```html
<Chart lazy:visible data={$points} />
<Editor lazy:idle />
```

the compiler turns the import of `Chart` into an `import()` that runs when the element
becomes visible (`@domina/observer` has `onVisible`) or when the browser is idle.
until then, a placeholder takes its place.

**cost.** medium. it needs the build adapters for code splitting; in the browser
without a build it works as is, since every module is its own file anyway.

### tooling

#### 2.14 generators and checks (laravel artisan)

**origin.** laravel's command line creates files with the right structure and runs
project tasks:

```sh
php artisan make:component Alert
php artisan route:list
```

**problem.** a new component means copying a file and adjusting names. checks (compile
every file, find unknown `$` names) need a place to live.

**in rat.**

```sh
rat new component todo-list    # src/todo-list.rat with a <script> and a <style>
rat check                      # compiles every .rat / .rat.js, reports errors with file:line:column
rat build                      # the build adapters
```

**cost.** small to start, grows with the build.

### shortlist

small, local, and they fit the existing syntax. a good next round:

1. event modifiers (2.7) and binding modifiers (2.8): they remove code from the
   existing examples right away
2. loop metadata and `@sep` (2.1), with `$loop` replacing the index question
3. `@let` (2.2)
4. filters on loops (2.4)
5. named slots (2.12)

worth it, but larger: `@await` (2.3), `use:` behaviors (2.10), `@match` (2.5).

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


---

# notes

```
2.3 async blocks
2.4 filters on loops
2.5 pattern matching
2.6 fragments
2.7 event modifiers
```
