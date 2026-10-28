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

---

# addendum: messages for actions

the verdict above says "messages for actions" without saying what it means. here it is in full: what
it is, what it would change in the files app, what it costs, and what is left of it for rat.

- [the idea in one sentence](#the-idea-in-one-sentence)
- [how the files app works now](#how-the-files-app-works-now)
- [the same with messages](#the-same-with-messages)
- [what it gives](#what-it-gives)
- [what it costs](#what-it-costs)
- [what rat already has: commands](#what-rat-already-has-commands)
- [three levels for rat](#three-levels-for-rat)
- [recommendation](#recommendation)

## the idea in one sentence

a view does not change the state itself, it **reports what happened** as a plain value (a *message*),
and **one function** decides what that means for the state.

```
now        click -> a function that changes signals (any of many, anywhere)
messages   click -> a message { what happened } -> update(state, message) -> the new state
```

that is the core of elm's architecture (tea: model, update, view) and of redux. elm calls the value a
`Msg`, redux an *action*. nothing more is meant by it.

## how the files app works now

the state is a set of signals. everyone who wants to change it, changes it directly:

```js
// state.rat.js: actions are functions that write signals
export function about (entry) {
  $sheet    = null;
  $selected = entry;
  RAT.app.toggle('context', true);
}

export function openTasks () {
  $selected = null;
  $sheet    = 'tasks';
  RAT.app.toggle('context', true);
}
```

```html
<!-- and the views write signals too -->
<btn-icon onclick={() => $category = null} />          <!-- Dashboard -->
<Searchbar onsearch={text => $query = text} />          <!-- Dashboard -->
const info = () => { $selected = null; … };            <!-- Preview -->
```

this is direct and short, and for a small app it is fine. three things get hard as the app grows:

1. **who changed it?** `$selected` is written in `about`, `openTasks`, `manageRemotes`, `goTo`,
   `openTab`, `switchTab`, `renameEntry`, `deleteEntry`, `onEntryClick` and in `Preview`. when it has a
   wrong value, any of ten places may be the cause.
2. **what happened?** there is no record. after a bug, nobody can say "the user opened a tab, then
   picked a file, then pressed delete".
3. **what belongs together?** "show the tasks" means three writes (`$selected`, `$sheet`, the area). a
   view that does two of three leaves the state half changed.

## the same with messages

**1. the messages: what can happen.** in rat, named cases fit:

```js
// messages.rat.js
export case ShowDetails = { type: 'show-details', entry };
export case ShowTasks   = { type: 'show-tasks' };
export case ShowRemotes = { type: 'show-remotes' };
export case PickCategory = { type: 'pick-category', id };
export case Search      = { type: 'search', text };
export case CloseSheet  = { type: 'close-sheet' };
```

**2. the update: what each one means.** pure: the old state and a message in, the new state out. no
signal, no dom, no await:

```js
// update.js
export function update (state, msg) {
  return match(msg, [
    [ShowDetails,  ({ entry }) => ({ ...state, selected: entry, sheet: null, context: true })],
    [ShowTasks,    ()          => ({ ...state, selected: null,  sheet: 'tasks', context: true })],
    [ShowRemotes,  ()          => ({ ...state, selected: null,  sheet: 'remotes', context: true })],
    [PickCategory, ({ id })    => ({ ...state, category: id })],
    [Search,       ({ text })  => ({ ...state, query: text })],
    [CloseSheet,   ()          => ({ ...state, sheet: null })],
  ]);
}
```

**3. one place applies it:**

```js
// state.rat.js
export let $state = INITIAL;

export function send (msg) {
  $state = update($state, msg);
}

effect(() => RAT.app.toggle('context', $state.context));   // the area follows the state
```

**4. the views only send:**

```html
<btn-icon onclick={() => send({ type: 'pick-category', id: null })} />
<Searchbar onsearch={text => send({ type: 'search', text })} />
<btn-icon label='more' onclick={() => send({ type: 'show-details', entry })} />
```

now `$state.selected` changes in exactly one place: the `ShowDetails`, `ShowTasks` and `ShowRemotes`
lines of `update`. "show the tasks" is one message, never half done.

### and the side effects?

`update` must stay pure, but `deleteEntry` asks a dialog, asks for permission and writes to the disk.
elm solves that with *commands*: `update` returns the new state **and** a description of the effect,
the runtime carries it out and sends the result back as another message:

```js
[DeleteEntry, ({ entry }) => [state, confirmDelete(entry)]]   // the effect, described
[Deleted,     ({ entry }) => [{ ...state, selected: null }, refresh()]]
```

in javascript that is awkward. the usual way (redux "thunks", or simply an async function) keeps
effects outside: an async action does its effects and sends messages for the state changes:

```js
export async function deleteEntry (entry) {
  if (!await dialogs.confirm({ … })) return;
  send({ type: 'deleted', entry });              // the state change goes through update
  await write(entry, (handle, at) => fs.remove(handle, at, entry.name));
}
```

## what it gives

**a log of everything.** `send` is the one door, so one line records every change:

```js
export function send (msg) {
  console.debug('[files]', msg.type, msg);
  $state = update($state, msg);
}
```

a bug report then reads: `show-details a.txt`, `show-tasks`, `search "x"`, `pick-category images`. that
is the sequence that led there, and it can be replayed.

**undo, for the state.** the states are values, the old one is still there:

```js
const past = [];

export function send (msg) {
  past.push($state);
  $state = update($state, msg);
}

export const undo = () => { if (past.length) $state = past.pop(); };
```

honest limit: this undoes **the state**, not the disk. a deleted file is gone. undo of file operations
needs an inverse operation per action (move back, restore from a trash folder), messages do not give
that for free.

**tests without a browser.** `update` is a plain function:

```js
const state = update(INITIAL, { type: 'show-tasks' });
assert(state.sheet === 'tasks' && state.selected === null);
```

**one vocabulary for every input.** a click, a key, the menu, a command palette and a message from
another tab send the same messages. the update does not know or care where it came from.

**serializable.** a message is plain data: it can be stored, sent to another device, synced. a
function call can not.

## what it costs

**boilerplate.** every change needs a message, a line in `update` and a `send`. redux became known for
exactly this: action types, action creators, reducers, three files for one button.

**indirection.** "what does this button do?" was one jump to a function. now it is: the message, then
search `update` for its case. editors follow a function call, not a message.

**effects stay awkward.** the clean part (pure `update`) covers the simple changes. the hard part of the
files app, the async actions with dialogs, permissions and disk writes, stays async code either way.

**overkill for local state.** whether a menu in one component is open is nobody else's business. it
stays a local `$open`. messages pay off for **shared** state only.

**fine-grained signals become one coarse value.** `$state` as one object means every change replaces
it; whatever reads any field re-runs. with computeds per field (`$selected = $state.selected`) or a
`$Record` this is solved, but it is one more layer.

## what rat already has: commands

rat has half of this already. a command is a **named action**, fired from the markup as a string:

```html
<button onclick='save'>save</button>                    <!-- fires rat:command { name: 'save' } -->
<button onclick='go[settings]'>settings</button>        <!-- with an argument -->
```

```js
RAT.app.commands.assign({
  save : () => …,
  go   : route => …,
});
```

that is: a name for what happened, one registry that decides what it means, the markup only says the
name. what commands lack compared to messages: they run a function instead of computing a new state,
so there is no single update, no log of state and no undo. but the door is the same one.

## three levels for rat

**level 1: actions through one door** · small, no new concept

keep the action functions as they are, but call them through a wrapper that logs, catches errors (that
is cleanup.md 8, the toast in one place) and can be shown in devtools:

```js
export const actions = defineActions({ about, deleteEntry, openTasks, paste, … });

actions.deleteEntry(entry);   // logged: deleteEntry a.txt, an error ends in the toast
```

gives: the log and one error handler. does not give: one update, undo.

**level 2: commands with arguments for the app's actions** · uses what exists

the app's actions become commands. the markup names them, the registry is the one place that maps
names to code, and the commands get the log and the error handling from level 1 in one spot:

```html
<btn-icon label='more' onclick={send('about', entry)} />
<Action label='delete' onclick={send('delete', $entry)} />
```

gives: one vocabulary for clicks, keys, the menu and a palette. still functions behind the names.

**level 3: messages and update for the shared ui state** · the elm way, only where it pays

selection, sheet, category, query, tabs: the state several views share, as one value changed by
messages through a pure `update`. the async work (disk, dialogs, servers) stays async functions that
send messages for their state changes.

gives: one place per change, the log of state, undo of the ui state, tests of `update` without a
browser. costs: the boilerplate, for this part of the app.

## recommendation

- **level 1 now**: it is small, and it solves a real problem the app has today (errors to the toast
  everywhere, no record of what happened).
- **level 2 when commands get arguments and a palette**: the vocabulary is there anyway.
- **level 3 only if undo or a replayable log become goals**: it is the only level that pays for its
  boilerplate, and only for shared ui state. for everything else, signals written directly stay simpler.

so "messages for actions" in the verdict above means mainly level 1 and 2 for rat: **one door for the
app's actions**. the full elm architecture (level 3) is an option, not a recommendation.
