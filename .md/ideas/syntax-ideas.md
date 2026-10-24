# rat :: syntax ideas

## markup shorthands

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
