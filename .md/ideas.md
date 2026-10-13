# rat :: ideas

explorations, not plans. nothing here is built. what needs a call from you is
collected in [decisions.md](decisions.md).

- [1. a pipe family](#1-a-pipe-family)
- [2. inspiration](#2-inspiration)
- [3. style languages](#3-style-languages)
- [4. inspiration, round 2](#4-inspiration-round-2)
- [5. named cases](#5-named-cases)
- [notes](#notes) (yours, with replies)

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

### your shapes

checked against the same rule (is `a XX b` valid js already?):

| shape | valid js today? | note |
|---|---|---|
| `>>` | **yes**: shift right | taken |
| `>>>` | **yes**: unsigned shift right | taken |
| `\|?>` | no | free |
| `\|?:` | no | free |
| `\|!:` | no (`a \| !:` has no operand after `!`) | free |
| `\|?\|` | no | free |
| `\|!\|` | no | free |

### the `|X>` family (proposal)

your `|?>` suggests a rule: every list operator ends in `>` like the pipe ("flows
into"), the character in the middle names the operation. all of them are free in js,
because `|` followed by `?`, `!`, `:`, `*`, `.` or `@` and then `>` never forms valid code.

```js
users |?> #.active |:> #.name                  // filter, then map
users |!> #.banned                             // reject: the ones where it is false
users |.> name                                 // pluck
1..10 |*> (sum, #) => sum + #, 0               // reduce (still the open spot: the start value)
$todos |?> !#.done |> #.length                 // mixes with the plain pipe
```

| operator | meaning | why this character |
|---|---|---|
| `\|>` | pipe | built |
| `\|?>` | filter | `?`: "is it?" |
| `\|!>` | reject | `!`: "is it not?" |
| `\|:>` | map | `:`: "becomes" (like `key: value`) |
| `\|*>` | reduce | `*`: "all into one" |
| `\|.>` | pluck | `.`: property access |
| `\|@>` | each (side effect, passes the list on) | `@`: "at each" |

compared to the two-character set (`|?`, `|:`) it is one character longer, but the
family is recognizable at a glance, and `|?` vs. `|:` no longer look alike. find (the
first match) is still without a slot: `|?1>` would be free, but reads poorly.

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

**problem.** behavior that is not markup (a tooltip, drag and drop, focus trapping, autosizing a textarea) otherwise needs a `ref` plus manual setup and teardown in the script.

**in rat.**

```html
<button use:tooltip={'save the file'}>save</button>
<textarea use:autosize></textarea>
<section use:pattern={'dots 8%'}>…</section>
```

a behavior is a function `(element, value) => cleanup`. it runs again when the value changes. this is the same idea as the aufbau controller concept (`pattern=`, `filter=`, `hotkey=` as attributes on any element), so `@aufbau/patterns`, `@aufbau/filters` and `@aufbau/gestures` could ship rat behaviors directly.

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

**decided** ([d-20](decisions.md#d-20)): `scss` and `ass` ship with rat. your point
stands: css can do a lot by now, but writing it is the problem, and that is what a
preprocessor (and later your own css sugar) is for.

### built

```html
<style lang="scss"> … </style>
<style lang="ass"> … </style>
```

- `compileAsync()` loads `sass` / `@aufbau/ass` the first time a file uses them,
  `loadStyles('scss', 'ass')` does it ahead of time. any other language still goes
  through `compile(source, { styles: { less: code => … } })`.
- a loader tries the bare specifier first (import map, `node_modules`), then a pinned
  url: `sass@1.70.0` on esm.sh (the version `@aufbau/import` pins) and `@aufbau/ass`
  on code.pulgasari.dev.

### `@aufbau/import`, helpful?

partly. it knows how to fetch and cache vendors (`sass` included) and compiles scss
*files* by path (`importSCSS(path)`). the compiler needs to compile *source text* that
it already has, and it needs a fixed sass version, so it resolves `sass` itself, the
same way. what would really help: a small `compile(text, lang)` export in
`@aufbau/import` next to the path based ones; then rat could use it and the two would
share one vendor cache (indexeddb via `@bunker`).

### next: browser only, through a service worker

```js
// a page without a build
import Card from './card.rat';
```

a service worker answers the request for `card.rat` with the compiled module. relative
imports inside it (`./item.rat`) go through the worker as well, bare ones
(`@rat/runtime`) through the page's import map. the one blocker: workers have no import
maps, so the compiler's own `import 'acorn'` fails there. the fix is a bundled
`sw.js` (esbuild, the way the acode plugin is built), with acorn inside.

---

## 4. inspiration, round 2

ten more languages, chosen for ideas that fit rat, not for popularity. same format as
round 1: origin with the original code, problem, rat form, cost.

[elixir](#41-elixir) · [clojure](#42-clojure) · [f#](#43-f) · [swift](#44-swift) ·
[kotlin](#45-kotlin) · [raku](#46-raku) · [gleam](#47-gleam) · [zig](#48-zig) ·
[imba](#49-imba) · [ruby](#410-ruby) · [shortlist](#round-2-shortlist)

#### 4.1 elixir

a functional language on the erlang vm, known for the pipe operator that made `|>`
popular, and for pattern matching everywhere.

**idea: `with`, a chain of steps that stops at the first failure.**

```elixir
with {:ok, user}  <- fetch_user(id),
     {:ok, posts} <- fetch_posts(user),
     {:ok, html}  <- render(posts) do
  html
else
  {:error, reason} -> "failed: #{reason}"
end
```

each line only continues if its result matches the pattern on the left. the first one
that does not match jumps to `else`.

**problem.** loading data in several dependent steps (user, then their posts, then a
render) ends up as nested ifs or a try/catch around everything, where it is unclear
which step failed.

**in rat.** in a script, as a block that reads top to bottom:

```js
with {
  user  of fetchUser($id);
  posts of fetchPosts(user);
} then {
  $posts = posts;
} else (error) {
  $error = error.message;
}
```

`of` awaits the promise, a rejection or a `null` jumps to `else`.

**cost.** medium: new script syntax, compiled to an async function with early returns.

**idea: sigils, short tags for literals.** `~r/\d+/` is a regex, `~D[2026-10-13]` a
date, and you can define your own (`~css"…"`). rat already has the same mechanism:
tagged templates (``html`…` ``, ``ass`…` ``). nothing new needed, but a reminder that
custom tags (``date`2026-10-13` ``, ``re`\d+` ``) are a cheap way to make literals
readable.

#### 4.2 clojure

a lisp on the jvm and in the browser (clojurescript). code is data, and data flows
through functions.

**idea: threading with a named placeholder (`as->`).**

```clojure
(-> user :address :city)              ; thread first:  (:city (:address user))
(->> numbers (filter even?) (map inc)) ; thread last
(as-> user u                           ; thread with a name: u is the value, anywhere
  (assoc u :seen true)
  (save db u))
```

**problem.** rat's `#` is anonymous. in a long pipe, `#` means something different in
every step, which can get hard to follow.

**in rat.** an optional name for the value of one pipe step:

```js
$order
  |> (order) => total(order.items)
  |> (sum) => format(sum, $currency)
```

this already works today: an arrow function on the right is called with the value.
so there is nothing to build, only to document as the "named" form next to `#`.

**idea: nil-safe threading (`some->`).** `(some-> user :address :city)` stops at the
first `nil` instead of throwing.

```js
$user ?|> #.address ?|> #.city ?|> format    // stops at the first null / undefined
```

**cost.** small, one more operator in the pipe rewrite. `?|>` is free in js.

#### 4.3 f#

the functional language of .net. rat's `|>` comes from here, via elixir.

**idea: active patterns, named patterns you define yourself.**

```fsharp
let (|Even|Odd|) n = if n % 2 = 0 then Even else Odd

match 7 with
| Even -> "even"
| Odd  -> "odd"

let (|Email|_|) (s: string) = if s.Contains "@" then Some (s.Split '@') else None

match input with
| Email [| user; domain |] -> $"{user} at {domain}"
| _                        -> "not an email"
```

a pattern is a function: it decides whether a value matches, and it can hand out parts
of it (`user`, `domain`).

**problem.** your idea of reusable "named cases" ([5](#5-named-cases)) is exactly
this. f# shows it scales: patterns become a vocabulary of the program.

**in rat.** see [5. named cases](#5-named-cases).

**idea: computation expressions.** `async { … }`, `seq { … }`, `result { … }`: one
block syntax, the meaning of `let!` inside depends on the builder. too large for rat,
but it explains why a single `with` (4.1) block can cover promises, nulls and errors
alike.

#### 4.4 swift

apple's language. swiftui builds interfaces in plain swift, without a template language.

**idea: property wrappers, a marker on a variable that changes how it behaves.**

```swift
struct Counter: View {
  @State private var count = 0           // reactive: changing it redraws the view
  @AppStorage("theme") var theme = "dark" // persisted in user defaults

  var body: some View {
    Button("\(count)") { count += 1 }
  }
}
```

**problem.** rat has `$` for "reactive". but "reactive and stored in localStorage" or
"reactive and synced to the url" each need code by hand.

**in rat.** a wrapper after the `$` declaration, using `@` like the behaviors, since it
attaches behavior to a value:

```js
let $theme  = 'dark'  @stored('theme');     // localStorage, through @bunker
let $page   = 1       @query('page');       // ?page=… in the url
let $filter = ''      @debounced(300);      // updates at most every 300 ms
```

**cost.** medium. it fits `@rat/types` (`persist`) and needs a decision on the notation.

**idea: key paths.** `\.name` is a function that reads `name`: `users.map(\.name)`.
rat's pluck (`|.> name`, [1](#the-x-family-proposal)) is the same idea for pipes.

#### 4.5 kotlin

the main language for android, with a strong taste for small conveniences.

**idea: `it`, the implicit name of a one-parameter lambda.**

```kotlin
users.filter { it.active }.map { it.name }
```

**problem.** `users.filter(user => user.active)` names the same thing twice.

**in rat.** `#` already is rat's `it`. the idea would be to allow it in plain callbacks
too, not only in pipes:

```js
$users.filter(#.active).map(#.name)    // users.filter(x => x.active).map(x => x.name)
```

the rule: a `#` directly inside the arguments of a call makes that argument a function
of `#`.

**cost.** small in the compiler, but it changes what `#` means outside of pipes, which
is an error today. a decision, not a technical problem.

**idea: type-safe builders.** kotlinx.html writes html as nested function calls with
lambdas (`div { p { +"hello" } }`). rat goes the other way (markup is markup), so this is
a confirmation more than an idea: both end up as nested calls, rat's compiler writes them.

#### 4.6 raku

the language formerly known as perl 6. experimental, dense, full of ideas.

**idea: junctions, one value that stands for several.**

```raku
if $answer eq any('yes', 'y', 'ok') { … }
if $age > all(@limits) { … }
```

**problem.** `if (['yes', 'y', 'ok'].includes(answer))` reads backwards: the list comes
first, the thing you check comes last.

**in rat.**

```html
@if ($status == any('error', 'failed', 'timeout')): <p.alert>…</p>
```

**cost.** small: `any(…)` / `all(…)` as runtime helpers whose `==` the compiler
rewrites to `.includes()` / `.every()`.

**idea: the whatever-star.** `@numbers.map(* * 2)` makes a function from an expression
with a `*` in it. it is the same idea as rat's `#`, which confirms the choice: a
placeholder that turns an expression into a function is a proven concept.

**idea: smart matching with `given` / `when`.** a `when` compares by type: a number
against a range, a string against a regex, a value against a list.

```raku
given $score {
  when 90..100 { 'A' }
  when 80..^90 { 'B' }
  when /^\d+$/ { 'a number' }
}
```

**in rat.** `@switch` with ranges, regexes and lists as cases:

```html
@switch ($score)
  @case 90..100: <b>A</b>
  @case 80..89:  <b>B</b>
  @default:      <b>C</b>
```

**cost.** small, and rat has ranges already: a case that is a `Range` uses `includes`.

#### 4.7 gleam

a young, friendly functional language for the erlang vm and javascript.

**idea: the pipe placeholder `_`.**

```gleam
list
|> list.map(_, double)
|> string.join(_, ", ")
```

**problem.** this is d-08: you liked `_` but worried it means "skip". gleam uses it for
exactly rat's purpose and nobody gets confused, because inside a pipe step it can only
mean "the value". worth a second look at [d-08](decisions.md#d-08).

**idea: `use`, flattening callbacks.**

```gleam
use user <- try(fetch_user(id))
use posts <- try(fetch_posts(user))
render(posts)
```

each `use` line turns everything below it into the callback of the call on its right.
no nesting, no pyramid.

**in rat.** the same problem as elixir's `with` (4.1), a second shape for it. for
promises, js's own `await` already does this, so the value for rat is in the
non-promise cases (results, nulls).

**cost.** medium, as 4.1.

#### 4.8 zig

a systems language that wants to replace c.

**idea: `comptime`, code that runs at compile time, in the same language.**

```zig
const table = comptime blk: {
  var values: [256]u8 = undefined;
  for (&values, 0..) |*value, index| value.* = @intCast(index * 2);
  break :blk values;
};
```

the table is computed while compiling and lands in the program as finished data.

**problem.** a page often renders data that never changes at runtime: a list of icons,
a navigation from a json file, a changelog from markdown. today that is fetched and
rendered in the browser, every time.

**in rat.** a script block that runs in the compiler, its results are baked in:

```html
<script comptime>
  const icons = await readJson('./icons.json');
</script>

<ul>
  @for (icon of icons): <li>{icon.name}</li>
</ul>
```

the compiled module contains the finished list, no fetch, no json, no loop at runtime.

**cost.** large: the compiler has to execute code (in node: easy, in the browser: a
worker), and it fits the build adapters and the `dom:clone` target. but it is the
strongest form of "compiler over runtime magic".

#### 4.9 imba

a language for web apps that compiles to js, with markup built into the language.
of all ten, the closest relative of rat.

**idea: tags and their selectors are part of the language.**

```imba
tag todo-item
  prop todo
  <self.item .done=todo.done>
    <input type='checkbox' bind=todo.done>
    <span> todo.title
    <button @click.stop=remove> 'x'
```

- `<self.item>`: the tag's own element, with a class, like htx's `<div.card>`
- `.done=todo.done`: a class toggled by a value, like rat's `class:done={…}`
- `@click.stop`: event modifiers, chained with dots
- indentation instead of closing tags (rat's syntax 2, for markup)

**problem.** none new, but imba is proof that rat's direction works in practice:
selector tags, class toggles, modifiers and indentation-based markup in one language,
used in production for years.

**idea: the `.class` shorthand as an attribute.** `<div .active=$isActive>` toggles a
class with a single character instead of `class:active={…}`.

```html
<li .done={todo.done} .active={todo === $current}>…</li>
```

**cost.** small, in the parser: an attribute starting with `.` is `class:`. it fits the
selector syntax rat already has (`<li.item>`).

**idea: closing tags by indentation.** in imba a tag ends where its indentation ends,
no `</li>`. rat has this for blocks (syntax 2); the same for elements would be the next
step:

```html
<ul
  <li> first
  <li> second
```

**cost.** large: it changes the markup parser fundamentally. worth a decision of its
own, not now.

#### 4.10 ruby

the language of rails, built around reading like prose.

**idea: postfix conditions.**

```ruby
send_mail if user.subscribed?
retry unless attempts > 3
```

**problem.** `@if ($error): <p>{$error}</p>` puts the condition first, even when the
element is the main thing and the condition a detail. this is also what `@if={…}` on
the element tried to solve, which you removed.

**in rat.** after the element, on the same line:

```html
<p.error>{$error}</p> @if ($error)
<li>{item}</li> @for (item of $items)
```

**cost.** small in the parser. but it brings back the "condition on the element" in a
different place; maybe that is exactly what you did not like. listed for completeness.

**idea: symbol to proc, `&:name`.** `users.map(&:name)` is `users.map { |u| u.name }`.
the third language in this list (after swift and kotlin) with a short form for "read
this property", which makes pluck (`|.> name`) a safe bet.

### round 2 shortlist

1. `@switch` with ranges, lists and regexes as cases (raku, 4.6): small, uses ranges
2. `.class={…}` as the short class toggle (imba, 4.9)
3. `?|>`, the nil-safe pipe (clojure, 4.2)
4. `any(…)` / `all(…)` (raku, 4.6)
5. named cases (f#, 4.3 and [5](#5-named-cases))

larger, but the most interesting: `comptime` (zig, 4.8), `with` (elixir, 4.1), value
wrappers like `@stored` (swift, 4.4).

---

## 5. named cases

your idea: a `case` as a declaration, so a pattern has a name and can be reused in
`@switch`, `@if` and anywhere a condition goes. f# has it as *active patterns* (4.3),
haskell as *pattern synonyms*, scala as *extractors*.

### a case is a pattern with a name

```js
// <script> or .rat.js
case Loading = { status: 'loading' };
case Failed  = { status: 'error', message };          // message: a part handed out
case Adult   = { age } if age >= 18;                  // a pattern plus a guard
case Email   = string if #.includes('@');             // a type plus a guard on the value
```

a case answers two things at once: does a value match, and which parts does it hand out.

### where it is used

```html
@switch ($state)
  @case Loading: <p>loading …</p>
  @case Failed:  <p.alert>{message}</p>          <!-- message comes from the case -->
  @default:      <app-view />

@if ($user is Adult): <a href="/shop">shop</a>
```

```js
if (input is Email) send(input);
const adults = $users |?> # is Adult;
```

- `is` is the operator for "matches the case" (raku and kotlin use the same word).
- a case is a value: it can be exported, imported and shared between components
  (`import { Failed } from './states.js'`).

### what it compiles to

```js
const Failed = $$.pattern(value => value?.status === 'error' ? { message: value.message } : null);

// @case Failed: <p>{message}</p>
const match = Failed(state);
if (match) { const { message } = match; … }
```

a case is a function that returns `null` (no match) or the parts it hands out. the
runtime needs nothing beyond that; the work is in the compiler.

### open questions

- `case` as a keyword clashes with `switch` / `case` in plain js. `@case` already is a
  rat keyword in markup; in scripts the name could be `pattern` or `when` instead.
- exhaustiveness: should `@switch` warn when a known set of cases is not fully covered?
- how far patterns go: objects and guards are easy, arrays and nested patterns follow.

the call is [d-30](decisions.md#d-30).

---

# notes

```
2.3 async blocks
2.4 filters on loops
2.5 pattern matching
2.6 fragments
2.7 event modifiers
```

## 2.3 async blocks

ja, aber genaue syntax mir noch unklar.

**reply:** three variants side by side in [d-28](decisions.md#d-28).

## 2.4 filters on loops

ja, aber genaue syntax mir noch unklar.

**reply:** four variants in [d-29](decisions.md#d-29).

## 2.5 pattern matching

ja, aber genaue syntax mir noch unklar. habe in `@pulgasari/shift` und `@pulgasari/typeshift` mit derartigem auch schon etwas experimentiert. aber bin mir da ingesamt unklar.

so ein mechanismus fehlt ja aber sehr.

n weiter ansatz/gedanke von mir diesbzgl. war mal `case` (ausserhalb von switch) in den stand zum declaration zu erheben, um so globale oder im jeweiligen scope referenzierbare/wiederverwendbare case-muster definieren zu können (quasi benannte cases). nutzbar dann auch in `if` und generell conditional contexten. habs nie richtig ausprobiert, aber rein gefühlsmäßig denk ich mir stets, sowas müsste es eigtl geben.

**reply:** your feeling is right, it exists: f# calls them *active patterns*, scala
*extractors*, haskell *pattern synonyms*. worked out for rat in
[5. named cases](#5-named-cases), the block syntax is [d-30](decisions.md#d-30).

## 2.6 fragments

find ich gut, auch den namen. aber bin mir unsicher, ob evtl bissl dirty, weil gemeinhin dom-fragments eben keine args haben können?

**reply:** a fair point. the thing itself is a function that returns a fragment, not a
fragment. names to choose from in [d-27](decisions.md#d-27).

## 2.7 event modifiers

### preventDefault()

entwurf, nich sicher.

```html
<form on:submit!={add}>
```

**reply:** built as drafted, provisional: [d-24](decisions.md#d-24).

### key events

die shape hab ich schon lang im sinn. können wa umsetzen:

```html
<input on:keydown[enter]={send} />
<input onkeydown[ctrl+c|space+a]={send} />
```

**reply:** built, both forms (`on:keydown[…]` and `onkeydown[…]`). `|` separates
alternatives, `+` combines; in `space+a` space has to be held when a is pressed (a small
key tracker in the runtime). a `|` inside `[ … ]` is never read as a prop group.

### once

unklar. spricht hier was dagegen?

```html
<button once:click={init}>
<!-- oder evtl. -->
<button on:click:once={doSth}>
<button on:click:1={doSth}>
<button on:click:5={doSth}>
```

**reply:** nothing against it. built: `on:click:once` and `on:click:5`, provisional:
[d-25](decisions.md#d-25). the modifiers combine in the order key, `!`, count:
`on:keydown[escape]!:once`.

## 2.9

das kann HTX doch bereits, dafür brauchte es keine ugly variante von laravel als inspiration. aber ja, das in `rat` auch gehen.

**reply:** right, htx's merge was the model. built in rat now: a `{...rest}` on an
element merges, `class` and `style` add up, everything else follows source order.

## 2.10 use

`use` kenn ich von svelte und mochte das sehr. aber wenn ich mich recht erinnere, war die konstruktion dieser behaviours teilweise unnötig kompliziert. (?)

hier hatte ich schon den gedanken `@` hierfür zu verwenden. so wäre "sonderlogik"/"logik außerhalb" wie auch "verknüpfung" markiert. bei `use` denkt man sich dasverhältnis eigtl eher anders(rum): als würde dem element was reingegeben.

können wkr aber unter vorbehalt mal in beiden formen (also `use:` und `@`) umsetzen (was sich in der praxis besser anfühlt, wird sich dann herausstellen).

**reply:** built in both forms ([d-26](decisions.md#d-26)). on "unnecessarily
complicated": in svelte a behavior had to return `{ update, destroy }`. in rat the
simplest behavior is a function that returns its cleanup, and it simply runs again when
the value changes; `{ update, destroy }` is optional, for behaviors that can update in
place. `@x:arg` passes the part after the colon as the third argument. the demo:
`demos/examples/behaviors.rat` with `@pattern`, `use:filter` and `@flash:click`.

`<div @gestures:swipeable on:swipeLeft={...} />` works as written, if a `gestures`
behavior exists that dispatches `swipeleft` events: event names are lowercased.

```html
<button @tooltip={'save the file'}>save</button>
<textarea @autosize></textarea>
<section @pattern='dots 8%'>…</section>
<div @gestures:swipeable on:swipeLeft={...} />
<div @swipeable:swipeLeft={...} />
```

## 2.11

proper transition handling wäre nice, aber vllt reicht bereits use/@` in kombi mit transitionlib?

**reply:** for entering, yes: a behavior can animate the element when it appears. for
leaving, no: when an `@if` turns false, the runtime removes the node right away, and a
behavior only gets its cleanup call when the node is already gone. leave animations need
the runtime to wait (2.11). a small hook would do: a behavior may return
`{ leave (done) }`, and the runtime removes the node when `done` is called.

## 3.

das hinkt völlig. css kann zwar alles mögliche mittlerweile, und das sogar live, aber lässt sich absolut beschissen schreiben und ist schwer lesbar usw.

scss/ass, sowas sollte out-of-the-box mitgeliefert werden. (`@aufbau/import`) hilfreich?

**reply:** done, see [3. style languages](#3-style-languages), which also answers the
`@aufbau/import` question.
