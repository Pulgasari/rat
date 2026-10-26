# ideas

[htx](#htx) -
[rat](#rat) -
[types](#types) -
[tooling](#tooling) -
[misc](#misc)

---

# htx

these ones would/should be more likely an enhancement of `htx` directly.

### multi-attributes by `+`

```html
<div name+id='example'>...</div>
```

### pseudo-elements | generic element tags

```html
<input:number id|name='amount' value='666' />
```

the names are generic tag names which gets mapped to the real tagnames relating to the current context a project runs in or builds for.

### indentation instead of closing tags

```imba
<self.item .done=todo.done>
  <input type='checkbox' bind=todo.done>
  <span> todo.title
  <button @click.stop=remove> 'x'
```

**cost.** large: it changes the markup parser fundamentally.

inspired by: imba

### imba: `.class` as an attribute

```html
<li .done={todo.done} .active={todo === $current}>…</li>
```

**idea: the `.class` shorthand as an attribute.** `<div .active=$isActive>` toggles a class with a single character instead of `class:active={…}`.

**cost.** small, in the parser: an attribute starting with `.` is `class:`. it fits the selector syntax rat already has (`<li.item>`).

inspired by: imba

## binding modifiers

```html
<input type="range" bind:value.number={$size} />
<input bind:value.trim={$name} />
<input bind:value.lazy={$query} />
```

**problem.** an `<input>` always gives a string. `bind:value={$size}` in the syntax-tour example therefore needs `Number($size)` wherever the value is used.

**cost.** small, in the runtime's `bind:`.

inspired by: vue

---

# `.rat`

## keywords

create a bunch of keywords for all the core features.

```md
# reactivity
signal
computed
effect

# other
cmd | command
```

## local names in markup: `@let` (from svelte)

```html
@for (box of $boxes)
  @let area = box.width * box.height
  <p>{box.width} × {box.height} = {area}</p>
  <meter value={area} max="100"></meter>
```

**problem.** a value computed per item (inside `@for`) has no place to live: the `<script>` runs once per component, not once per item. so the expression gets repeated in several holes.

**cost.** small. the compiler turns it into a `const` at the start of the body function.

inspired by: svelte


# rat :: async blocks

## async blocks | `@await`

```html
@await (fetchUser($id))
  <p>loading …</p>
@then (user)
  <p>hello {user.name}</p>
@catch (error)
  <p>failed: {error.message}</p>
```

render the three states of a promise directly in markup.

**problem.** loading, success and error otherwise need three signals and an `@if` chain, written by hand for every fetch.

because the promise expression reads `$id`, a new id starts a new request automatically, and an outdated answer is dropped.

**cost.** medium: a new runtime block (`$$.wait`) that keeps track of which promise is
the current one.

inspired by: svelte

note: svelte and solidjs both move towards `await` in the reactive graph instead of a block.

## d-28 · async blocks: the syntax

```html
<!-- a) three keywords, like @if / @else -->
@await (load($id))
  <p>loading …</p>
@then (user)
  <p>{user.name}</p>
@catch (error)
  <p>{error.message}</p>

<!-- b) the value named in the head, pending and failure as clauses -->
@await (user of load($id))
  <p>{user.name}</p>
@pending
  <p>loading …</p>
@catch (error)
  <p>{error.message}</p>

<!-- c) a for-like head, no pending branch: shows nothing until the value is there -->
@await (user of load($id)): <p>{user.name}</p>
```

- [ ] a) `@await` / `@then` / `@catch`
- [ ] b) the value in the head, `@pending` and `@catch` as clauses **(rec)**: the main case comes first, and `user of …` reads like `@for`
- [ ] c) only the short form
- [ ] d) b, with c as the one-line form

---

# misc

random other stuff

## sigils (short tags for literals)

- `~r/\d+/` is a regex,
- `~D[2026-10-13]` a date,
- and you can define your own (`~css"…"`).

rat already has the same mechanism: tagged templates (``html`…` ``). nothing new needed, but a reminder that custom tags (``date`2026-10-13` ``, ``re`\d+` ``) are a cheap way to make literals readable.

inspired by: elixir

## property wrappers

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

inspired by: swift

# rat :: junctions

status: **idea**.

## idea: `any(…)` / `all(…)` (from raku)

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

# rat :: filters on loops

status: **idea**, syntax is an **open decision** ([d-29](#d-29)).

## idea: a condition in the `@for` head (from haskell)

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

<a id="d-29"></a>
## d-29 · filters on loops: the syntax

```html
@for (todo of $todos if !todo.done)       a) if in the head
@for (todo of $todos where !todo.done)    b) where (sql, haskell, swift)
@for (todo of $todos |? !#.done)          c) the pipe filter (if d-10 brings |?)
@for (todo of $todos, !todo.done)         d) a comma, like a comprehension
```

- [ ] a) `if` **(rec)**: a word every js reader knows, no new keyword
- [ ] b) `where`
- [ ] c) only through the pipe family
- [ ] d) comma

## notes

ja, aber genaue syntax mir noch unklar.

**reply:** four variants in [d-29](#d-29).

## `comptime` :: code that runs in the compiler

status: **done** in `.rat` files (`<script comptime>`, [syntax](syntax/rat.md#comptime)). plain `.js` (a
`with { type: 'comptime' }` import, as bun's macros) is open.

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

inspired by: `zig`

---

# types

maybe gonna add one of those?

```md
Interface
Struct
URL
```

---

# tooling

## idea: generators and checks (from laravel artisan)

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
