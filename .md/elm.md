# rat :: elm

status: **idea**, not decided.

can rat run elm, and is it worth it? and the haskell question behind it: a typed, pure, functional
language in a rat app.

- [what elm is](#what-elm-is)
- [three ways](#three-ways)
  - [a: elm as an island](#a-elm-as-an-island)
  - [b: elm as a language of rat files](#b-elm-as-a-language-of-rat-files)
  - [c: elm's ideas in rat](#c-elms-ideas-in-rat)
- [the haskell question: purescript, gleam](#the-haskell-question-purescript-gleam)
- [verdict](#verdict)

## what elm is

a pure functional language for web uis, haskell-like syntax, no runtime exceptions in practice. an elm
program is closed: it brings its own virtual dom, its own runtime and its own architecture (tea: model,
update, view). the outside world talks to it only through three doors:

| door | direction | what goes through |
|---|---|---|
| flags | js -> elm, once | the start values |
| ports | both ways, async | messages, json-like values |
| custom elements | elm -> js | an element elm renders, js runs |

no js function can be called from elm and no elm function from js (since 0.19). the compiler is a
haskell binary (`elm make`), there is none for the browser. the last release is 0.19.1 (2019): stable,
also standing still.

## three ways

### a: elm as an island

an elm module compiled by the build, mounted by a rat component into an element. rat's signals and
elm's ports meet at the edge: a port elm sends on writes a signal, a signal elm listens to is sent on.

```html
<script>
  import Counter from './Counter.elm';   // the build runs elm make, the module is Elm.Counter

  let $count = 0;
</script>

<Elm program={Counter} flags={{ start: 0 }} ports={{
  counted  : n => $count = n,   // elm -> rat: a function subscribes
  setCount : $count,            // rat -> elm: a signal is sent whenever it changes
}} />

<p>rat sees {$count}</p>
```

```elm
port module Counter exposing (main)

port counted  : Int -> Cmd msg
port setCount : (Int -> msg) -> Sub msg

-- init, update, view as in any elm program, update sends `counted model.count`
```

`<Elm>` would be a small runtime component (`@rat/elm`): `Elm[name].init({ node, flags })`, then per
port `subscribe` or `send` inside an effect, the cleanup unsubscribes. the vite plugin of the build
compiles `.elm` (as `vite-plugin-elm` does).

**cost:**

- build only. the no-build mode of rat (the browser loads `.rat` files itself) can not compile elm.
- the elm binary in the toolchain: npm's `elm` package downloads it on install.
- two renderers on one page. elm's part is opaque: rat's scoped styles, behaviors (`@tooltip`),
  `bind:`, transitions and devtools stop at its edge.
- the ports are stringly typed on the js side and async: a value goes through json and a tick.
- elm's runtime on top of rat's: roughly 10 kb gzip for a small program.

**gain:** a part with elm's guarantees (exhaustive cases, no null, no exceptions) inside a rat app. for a
self-contained piece with a lot of logic: a parser, an editor, a game.

### b: elm as a language of rat files

`<script lang="elm">` and the markup reading elm values. **not possible in a useful way**: elm compiles
whole programs only, its values never leave the program (no exports to js), its view is its own virtual
dom. rat would have to rebuild the elm compiler. no.

### c: elm's ideas in rat

a lot of elm already is in rat, without elm:

| elm | rat |
|---|---|
| `x \|> f`, `f <\| x` | the same two operators (`<\|` also as `::`) |
| custom types, `case … of` | `case` declarations, `@match`, `match()` of `@rat/types` |
| decoders at the edge | schemas of `@rat/types` (`Record`, `List`, `Dict` … with `parse`) |
| no null | not in rat: `?.` all over (cleanup.md a11) |
| exhaustive matching | not in rat: a missing `@case` is not reported |
| the architecture: model, msg, update | could be a small helper, see below |

the architecture as a helper, messages as named cases:

```js
case Increment = { type: 'increment' };
case SetTo     = { type: 'set', value };

let $model = { count: 0 };

const update = (model, msg) => match(msg, [
  [Increment, () => ({ ...model, count: model.count + 1 })],
  [SetTo,     ({ value }) => ({ ...model, count: value })],
]);

const send = msg => $model = update($model, msg);
```

worth taking from it:

- **exhaustive `@match`**: a `@match` over a union of cases (or an `Enum`) without `@else` warns about
  the cases it misses. the compiler knows the named cases of a file.
- **messages for actions**: the files app has actions spread over state.rat.js; a `send(msg)` with
  `update` in one place is easier to log, test and replay (undo).

not worth it: a full tea runtime. signals already do what tea's re-render does, finer.

## the haskell question: purescript, gleam

the "haskellscript" that exists is not elm, it is **purescript** (haskell's type classes, `do`, effects)
and, closer to elm, **gleam** (javascript target). both differ from elm where it matters for rat: they
compile to plain es modules that export functions. no closed program, no runtime of their own.

```js
// a rat file imports a purescript or gleam module like any js module
import { parseQuery } from './Query.purs';   // the build compiles it
const $hits = parseQuery($text) |> search;
```

that fits rat: the typed, pure part (parsing, validation, the logic of a domain) in purescript or gleam,
the ui, the signals and the markup in rat. no ports, no second renderer. a vite plugin per language
in the build, again build only.

| | elm | purescript | gleam |
|---|---|---|---|
| output | a closed program | es modules | es modules |
| call from rat | no, ports | yes, functions | yes, functions |
| renders ui | yes, its own | no (libraries do) | no (libraries do) |
| closeness to haskell | syntax | syntax and type classes | ml-like, simpler |
| fit for rat | island | logic modules | logic modules |

## verdict

- **possible**: yes, as an island (a). a few hundred lines: the `<Elm>` component and a vite plugin.
- **sensible**: only for a self-contained, logic-heavy piece, and only in the build. as a language rat
  files are written in, no (b).
- **more useful**: take elm's best ideas into rat itself (c): an exhaustive `@match`, messages for
  actions. and for the haskell friend: purescript or gleam modules imported by rat files, the cheaper and
  closer fit.
