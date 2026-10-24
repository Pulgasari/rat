# rat :: event modifiers

status: **built**: key filters, `!`, `:once` / `:N`, `once:` (d-24, d-25). word modifiers like `.stop`, `.self`, `.outside`, `.debounce`: idea.

see also: [syntax.md: event modifiers](../syntax.md#event-modifiers), alpinejs.md in `pulgasari.github.io/md/webdev/libs/` (the most common modifier names)

## idea (from vue)

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

<a id="d-24"></a>
## d-24 · `preventDefault()` on an event → **`!` after the event name**

your note: `prevent` says nothing about what is prevented. → `on:submit!={add}` stays,
no word form.

<a id="d-25"></a>
## d-25 · once / n times → **all three forms for now (d)**

built: `on:click:once`, `on:click:3` (and so `on:click:1`) and now `once:click={…}`, which
compiles to `on:click:once`. `once:click:3` is an error (counted twice). marked for later:
one more look at the attribute syntax as a whole, so that prefixes, modifiers and suffixes
follow one rule.

## notes

### preventDefault()

entwurf, nich sicher.

```html
<form on:submit!={add}>
```

**reply:** built as drafted, provisional: [d-24](#d-24).

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
[d-25](#d-25). the modifiers combine in the order key, `!`, count:
`on:keydown[escape]!:once`.
