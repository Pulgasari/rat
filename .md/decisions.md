# rat :: decisions

calls that are yours to make. tick one box per decision (`- [x]`), add a note below it
if needed, and i build it that way. **(v0)** marks what the prototype does today,
**(rec)** my recommendation. a decided entry moves to [decided](#decided) at the end.

overview: [syntax](#syntax) · [pipe](#pipe) · [ranges](#ranges) · [components](#components) · [app](#app) · [styles](#styles) · [packages](#packages)

---

## syntax

<a id="d-01"></a>
### d-01 · one-line blocks: is the `:` needed?

```html
@for (todo of $shown): <li>…</li>     a) with colon
@for (todo of $shown) <li>…</li>      b) without
```

- [x] a) colon required **(v0) (rec)**: the head ends visibly, and the colon is what tells a one-line body from an indented one
- [ ] b) no colon: the body starts after the head
- [ ] c) both

<a id="d-02"></a>
### d-02 · one-line blocks: where does the body end?

- [x] a) at the end of the line, or where `@else` / `@case` / `@default` starts on the same line **(v0) (rec)**
- [ ] b) at the end of the line only, `@else` always on its own line
- [ ] c) an explicit end marker (`;` or `@end`)

<a id="d-03"></a>
### d-03 · several directives on one line

`@if ($a): @for (x of $xs): <li>{x}</li>`

- [x] a) allowed, each takes the rest of the line **(v0) (rec)**
- [ ] b) one directive per line

<a id="d-04"></a>
### d-04 · indentation: tabs and spaces

- [ ] a) every space and tab counts as one **(v0)**
- [ ] b) a tab counts as 2 spaces
- [x] c) mixing tabs and spaces in one block is an error **(rec)**: no guessing, and the editor setting does not change the meaning

notiz bzgl d-01 bis d-04: ich bin aber nich sicher, ob sich in der praxis zeigt, dass das derartig taug tbzw 100pro stimmig ist. war auch insb. nich sicher ob mit/ohne colon oder mit/ohne eol-marker usw.

<a id="d-11"></a>
### d-11 · the template tag in `.rat.js`

- [ ] a) ``html`…` `` **(v0) (rec)**: the same tag as htx, a file reads the same with and without the compiler
- [ ] b) ``rat`…` ``: shows that it is compiled
- [ ] c) both
- [x] d) hier sollten wir temporär sogar ersma `htx`, `html`, `rat` machen

<a id="d-12"></a>
### d-12 · `{…}` holes in runtime templates (plain `.js`, no compiler)

- [ ] a) no, at runtime it stays `${…}` **(v0) (rec)**: no string parsing at runtime, the difference is what the compiler buys
- [ ] b) yes, the runtime parses `{…}` too (cached, like htm)

anmerkung: wo? in `.js` files? in `.rat.js` files? in `.rat` files? die frage is iwie ungenau.

---

## pipe

<a id="d-08"></a>
### d-08 · the placeholder

- [ ] a) `#` **(v0) (rec)**: your proposal, reads well, free in js (except `#private`, which stays untouched)
- [ ] b) `%` (the tc39 hack proposal), clashes with modulo
- [ ] c) `^^` or `@`

<a id="d-09"></a>
### d-09 · a call without placeholder: `x |> f()`

- [ ] a) an error with a hint **(v0) (rec)**: your note, it would call `f()` first
- [ ] b) `f()(x)`: pipe into the result of the call
- [ ] c) `f(x)`: insert as first argument (elixir style)

<a id="d-10"></a>
### d-10 · further pipe operators ([ideas.md](ideas.md#1-a-pipe-family))

- [ ] a) none, `|>` with `#` covers it
- [ ] b) `|:` map and `|?` filter only **(rec)**: the 90 % case, both free in js
- [ ] c) the full set: `|:` `|?` `|.name` `|*` `|@`
- [ ] d) other: …

---

## ranges

<a id="d-05"></a>
### d-05 · range forms

- [ ] inclusive `1..5` **(v0)**
- [ ] exclusive `1..<5`
- [ ] step `1..10 by 2` or `1..10..2`
- [ ] bare letters `a..d` (clash with variables `a`, `d`; v0 needs `'a'..'d'`)

(several boxes allowed here)

<a id="d-06"></a>
### d-06 · where ranges work

- [ ] a) everywhere script sugar works: holes, `<script>`, `.rat.js` **(v0) (rec)**
- [ ] b) only in markup holes and `@for` heads

<a id="d-07"></a>
### d-07 · what a range is

- [ ] a) an array **(v0) (rec)**: works with every array method and the pipe
- [ ] b) a lazy iterable: no allocation for `0..1e9`, but no array methods without `[...]`

---

## components

<a id="d-13"></a>
### d-13 · props

- [ ] a) `props.title`, reactive through getters **(v0)**
- [ ] b) destructuring with `$`: `let { $title, size = 'm' } = props` → `$title` stays reactive **(rec)**: the same `$` rule as everywhere
- [ ] c) a block: `@props { title, size = 'm' }`

<a id="d-14"></a>
### d-14 · type notation in scripts

- [ ] a) schema as initial value: `let $view = Enum('grid', 'list')` **(rec)**: plain js, no new syntax
- [ ] b) annotation: `let $view : Enum('grid', 'list') = 'grid'`

<a id="d-15"></a>
### d-15 · the index in `@for`

- [ ] a) a plain number, stale after a reorder **(v0)**
- [ ] b) a signal when the body uses it **(rec)**: correct, and only costs where used

<a id="d-23"></a>
### d-23 · mutating `$` arrays and objects (`$todos.push(x)`)

- [ ] a) reassign only: `$todos = [...$todos, x]` **(v0)**
- [ ] b) the compiler turns known mutating calls into updates (`push`, `splice`, `sort` …)
- [ ] c) reactive types from `@rat/types` (`$List`) take care of it **(rec)**

---

## app

<a id="d-16"></a>
### d-16 · commands with arguments in markup

- [ ] a) `onclick='open:settings'` (name, colon, argument)
- [ ] b) `onclick={['open', 'settings']}`
- [ ] c) a `command` attribute next to the handler: `command='open' value='settings'` (closer to the invoker commands api)

<a id="d-17"></a>
### d-17 · router

- [ ] a) file based (`views/*.rat`) in a build, a registry in the browser **(rec)**
- [ ] b) a registry only

---

## styles

<a id="d-19"></a>
### d-19 · `@scope` lower boundary

- [ ] a) none: styles reach into children, closer components win **(v0) (rec)**: css-like, slotted content keeps the parent's styles
- [ ] b) donut scope: `to ([data-rat])`, styles stop at child components

<a id="d-20"></a>
### d-20 · style languages ([ideas.md](ideas.md#3-style-languages))

- [ ] a) preprocessor hook only, nothing bundled **(v0) (rec)**
- [ ] b) the hook plus `lang="ass"` wired to `@aufbau/ass` out of the box
- [ ] c) native css only, no `lang` at all

---

## packages

<a id="d-18"></a>
### d-18 · `@rat/core` and `@rat/runtime`

- [ ] a) separate **(rec)**: the runtime works without an app
- [ ] b) one package

---

## decided

nothing yet.
