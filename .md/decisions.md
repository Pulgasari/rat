# rat :: decisions

calls that are yours to make. tick one box per decision (`- [x]`), add a note below it
if needed, and i build it that way. **(v0)** marks what the prototype does today,
**(rec)** my recommendation. a decided entry moves to [decided](#decided) at the end,
with what was built.

open: [syntax](#syntax) · [pipe](#pipe) · [components](#components) · [app](#app) · [styles](#styles) · [decided](#decided)

---

## syntax

<a id="d-26"></a>
### d-26 · behaviors: `@name` or `use:name`

both are built, as you asked, until practice decides.

- [ ] a) `@tooltip={…}` only
- [ ] b) `use:tooltip={…}` only
- [ ] c) both stay

<a id="d-28"></a>
### d-28 · async blocks: the syntax ([ideas.md 2.3](ideas.md#23-async-blocks-svelte))

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

<a id="d-29"></a>
### d-29 · filters on loops: the syntax ([ideas.md 2.4](ideas.md#24-filters-on-loops-haskell))

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

<a id="d-30"></a>
### d-30 · pattern matching ([ideas.md 2.5](ideas.md#25-pattern-matching-rescript), [named cases](ideas.md#5-named-cases))

two parts: the block, and whether patterns can be named and reused.

- [ ] a) `@match` with object patterns, as in ideas 2.5
- [ ] b) `@switch` learns patterns (no new keyword): a `@case` with `{ … }` or `[ … ]` is a pattern, anything else compares with `===` **(rec)**
- [ ] c) both, `@match` exhaustive (warns about unhandled cases), `@switch` not

named cases, your idea: **yes, built.** `case Name = pattern if guard` in scripts, `x is Name`
in scripts and conditions, `@case Name` in `@switch` with the parts handed to the branch.
details in [syntax.md](syntax.md#named-cases), your question in [ideas.md 5](ideas.md#5-named-cases).
what stays open here is only the block: patterns written straight into a `@case` (a, b or c).

---

## pipe

<a id="d-10"></a>
### d-10 · further pipe operators ([ideas.md 1](ideas.md#1-a-pipe-family))

your note: more operators, since `filter(…)` / `map(…)` chains read badly. your shapes
are checked in [ideas.md 1](ideas.md#your-shapes): `>>` and `>>>` are js shift
operators; `|?>`, `|?:`, `|!:`, `|?|`, `|!|` are free.

- [ ] a) none, `|>` with `#` covers it
- [ ] b) the `|X>` family: `|>` pipe, `|:>` map, `|?>` filter, `|!>` reject, `|*>` reduce, `|.>` pluck **(rec)**: one visual rule, every member ends in `>` ("flows into"), the middle character is the operation, all free in js
- [ ] c) two-character forms: `|:` map, `|?` filter, `|*` reduce, `|.name` pluck
- [ ] d) other: …

Anm. glaube bei so viele wäre es auch wieddr unleserllch, wenn name nicht 100pro perfekt. aber ich frag mich grade ob zumindest bei map `<|` eigtl logisch wäre?

**reply:** `<|` is free in js (`a <| b` is a syntax error), but it already has a meaning
elsewhere: in f#, elm and haskell (`<|`, `$`) it is backward application, `f <| x` is
`f(x)`, the mirror of `|>`. the arrow points left, so it reads as "flows from right to
left", while map in a chain flows on to the right like every other step. as map it would
fight both the precedent and its own picture. on "too many": agreed, six operators only pay
off if they are all used daily. a smaller set is a real option:

- [ ] e) two only: `|>` pipe and `|?>` filter; map stays `|> map(#, fn)` or a function

---

## components

<a id="d-13"></a>
### d-13 · props

- [ ] a) `props.title`, reactive through getters **(v0)**
- [ ] b) destructuring with `$`: `let { $title, size = 'm' } = props` → `$title` stays reactive **(rec)**: the same `$` rule as everywhere
- [ ] c) a block: `@props { title, size = 'm' }`

<a id="d-15"></a>
### d-15 · the index in `@for`

- [ ] a) a plain number, stale after a reorder **(v0)**
- [ ] b) a signal when the body uses it
- [ ] c) `$loop` instead ([ideas.md 2.1](ideas.md#21-loop-metadata-latte)): `$loop.index`, `.number`, `.first`, `.last`, `.length`, always current **(rec)**

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

---

## styles

<a id="d-19"></a>
### d-19 · `@scope` lower boundary

- [ ] a) none: styles reach into children, closer components win >**(v0) (rec)**: css-like, slotted content keeps the parent's styles

question: there is a `>` in front of **(v0) (rec)** now. a slip, or a mark you meant
(a tick for a)?
- [ ] b) donut scope: `to ([data-rat])`, styles stop at child components

---

## decided

<a id="d-01"></a>
### d-01 · one-line blocks need the `:` → **yes**

<a id="d-02"></a>
### d-02 · a one-line body ends at the line end or at `@else` / `@case` / `@default` → **yes**

<a id="d-03"></a>
### d-03 · several directives on one line → **allowed**

<a id="d-04"></a>
### d-04 · tabs and spaces mixed in one indented block → **an error**

built: the compiler names the line and what the block uses instead.

your note on d-01 to d-04: not sure yet that this holds up in practice, especially
colon or not and an end marker or not. → they stay easy to change: all of it lives in
`body()` and `nodes()` in `packages/compiler/parse.js`, plus `blockHead` in the syntax spec.

<a id="d-05"></a>
### d-05 · range forms → **inclusive `a..b` only**

<a id="d-06"></a>
### d-06 · ranges work everywhere script sugar works → **yes**

<a id="d-07"></a>
### d-07 · what a range is → **a lazy range type with array methods; `[a..b]` is an array**

built: `a..b` is a `Span` from `@rat/runtime`'s `range()` (iterable, `length`, `at`, `includes`,
plus `map`, `filter`, `reduce`, `join` … on a fresh array). `[1..5]` alone in brackets
compiles to `[...$$.range(1, 5)]`. the class is not exported (`Range` is the dom's),
`isRange()` tells one apart.

<a id="d-08"></a>
### d-08 · the pipe placeholder → **`#`, provisionally**

your note: `$` is taken by reactivity, `_` usually means "skip", `@` looks good too.
→ `@` is now the behavior marker in markup and a decorator in js, which would make it
ambiguous inside holes. `#` stays until something better shows up. worth knowing: gleam
uses `_` exactly like this (`list |> map(_, double)`), so `_` has a precedent
([ideas.md 4.7](ideas.md#47-gleam)).

<a id="d-09"></a>
### d-09 · `x |> f()` → **`f()(x)`: whatever the right side evaluates to is called**

your note: with the two existing forms only this is consistent. → agreed and built. the
rule is now simple: with `#` the value goes where `#` is; without `#` the right side is
evaluated and called with the value.

<a id="d-11"></a>
### d-11 · the template tag in `.rat.js` → **`html`, `htx` and `rat`, all three for now**

<a id="d-17"></a>
### d-17 · router → **a registry now, file based later (scheme open)**

<a id="d-18"></a>
### d-18 · `@rat/core` and `@rat/runtime` → **separate**

<a id="d-20"></a>
### d-20 · style languages → **`scss` and `ass` out of the box**

built: `scss`, `sass` and `ass` load on demand (`compileAsync()`, `loadStyles()`), any
other language through `options.styles`. still to do: browser-only setups through a
service worker that compiles `.rat` files on request. your own css sugar comes later.

<a id="d-12"></a>
### d-12 · `{…}` holes in plain `.js` files → **no, `${…}` stays**

your note: what would it be good for at all? → nothing, which is why it was the
recommendation. it only came up because `.rat.js` reads `{…}`; a plain `.js` file has no
compiler that could know the local names, so it keeps `${…}`.

<a id="d-14"></a>
### d-14 · type notation in scripts → **a schema as the initial value**

built: `let $view = Enum('grid', 'list')`. `signal()` takes anything with a standard schema
interface (`~standard`): it starts at the schema's initial value and checks every write
(rejected: dropped with a warning, coerced: stored coerced). the schemas are `@rat/types`
v0 (`Bool`, `Num`, `Str`, `Enum`, `List`, `Record`); zod and valibot schemas work as well.

<a id="d-24"></a>
### d-24 · `preventDefault()` on an event → **`!` after the event name**

your note: `prevent` says nothing about what is prevented. → `on:submit!={add}` stays,
no word form.

<a id="d-25"></a>
### d-25 · once / n times → **all three forms for now (d)**

built: `on:click:once`, `on:click:3` (and so `on:click:1`) and now `once:click={…}`, which
compiles to `on:click:once`. `once:click:3` is an error (counted twice). marked for later:
one more look at the attribute syntax as a whole, so that prefixes, modifiers and suffixes
follow one rule.

<a id="d-27"></a>
### d-27 · the name for markup fragments with parameters → **`@fragment`**

your note: `@snippet` promises too much, and the thing really is a function that makes a
document fragment. → built as `@fragment row (item)`, top level of a `.rat` file, compiled
to a hoisted function in the component ([syntax.md](syntax.md#fragment)).
