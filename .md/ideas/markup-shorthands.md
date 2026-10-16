# rat :: markup shorthands

status: **ideas**.

## imba: tags and selectors in the language

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

## imba: `.class` as an attribute

**idea: the `.class` shorthand as an attribute.** `<div .active=$isActive>` toggles a
class with a single character instead of `class:active={…}`.

```html
<li .done={todo.done} .active={todo === $current}>…</li>
```

**cost.** small, in the parser: an attribute starting with `.` is `class:`. it fits the
selector syntax rat already has (`<li.item>`).

## imba: closing tags by indentation

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

## kotlin: type-safe builders

**idea: type-safe builders.** kotlinx.html writes html as nested function calls with
lambdas (`div { p { +"hello" } }`). rat goes the other way (markup is markup), so this is
a confirmation more than an idea: both end up as nested calls, rat's compiler writes them.
