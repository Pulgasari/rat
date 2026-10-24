# htx

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

**idea: the `.class` shorthand as an attribute.** `<div .active=$isActive>` toggles a
class with a single character instead of `class:active={…}`.

**cost.** small, in the parser: an attribute starting with `.` is `class:`. it fits the
selector syntax rat already has (`<li.item>`).
inspired by: imba

---

# `.rat`

# rat :: local names in markup

status: **idea**.

## idea: `@let` (from svelte)

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

---

# misc

random other stuff

## sigils (short tags for literals)

- `~r/\d+/` is a regex,
- `~D[2026-10-13]` a date,
- and you can define your own (`~css"…"`).

rat already has the same mechanism: tagged templates (``html`…` ``, ``ass`…` ``). nothing new needed, but a reminder that custom tags (``date`2026-10-13` ``, ``re`\d+` ``) are a cheap way to make literals readable.

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
