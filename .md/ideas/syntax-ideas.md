# rat :: syntax ideads

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

## ruby: postfix conditions

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

