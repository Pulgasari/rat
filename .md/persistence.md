# rat :: persistence

status: **concept**, nothing built.

a value that outlives the page: a setting, the open tabs, bookmarks, a draft. today every app does it by hand (`cleanup.md` 1): a key, a read, an effect that writes, a revive for what JSON can not carry. this.paper collects what persistence has to answer, what rat already has for it, the forms it could take, and a proposal.

the frame: **no compiler magic for the mechanism**. everything works as plain runtime api; syntax is only allowed on top, where it is really good (`$theme!`).

- [what it has to answer](#what-it-has-to-answer)
- [what rat already has](#what-rat-already-has)
- [the hard part: sync or async](#the-hard-part-sync-or-async)
- [the forms](#the-forms)
- [where the options live](#where-the-options-live)
- [the `!`](#the-)
- [variants: records, lists, tables](#variants-records-lists-tables)
- [the rest: timing, tabs, migration, scope, secrets, reset](#the-rest)
- [proposal](#proposal)
- [the files app with it](#the-files-app-with-it)
- [open questions](#open-questions)

---

## what it has to answer

| question | examples |
|---|---|
| **where** | localStorage, sessionStorage, indexeddb, android preferences, a file, the url, a server |
| **under which key** | `theme`, `files:settings`, `bookmarks:<folder>` |
| **in which form** | the value as json, and how it comes back: a `Path` from `'a/b'`, an `Enum` from `'oled'` |
| **when written** | on every change, debounced, batched, on leaving the page |
| **when read** | before the first paint (a theme), or whenever it arrives (a big table) |
| **what if it changed elsewhere** | another tab, another device |
| **what if its shape changed** | an older version stored `path: ['a', 'b']` |
| **for whom** | the app, a folder, a user, a server connection |
| **how sensitive** | a theme is not, a server password is |

## what rat already has

| piece | gives |
|---|---|
| `RAT.app.store` (`@rat/bunker` `createStore`) | keys and values, named after the app (the prefix), one driver per platform: localStorage in the browser, preferences on android and ios, sqlite on the desktop. `getSync` / `setSync` for sync drivers, `on('change')` incl. other tabs |
| `RAT.app.database` | tables with schemas, indexeddb / sqlite |
| `RAT.app.files` | files of the app (json, text) |
| schemas of `@rat/types` | `parse` (coerce, check, fill defaults) and `toJSON` on the types: the codec in both directions. `Path` comes back as a `Path`, a record gets missing fields from its defaults |
| typed signals | `let $view = Enum('grid', 'list')`: the signal knows its schema |
| reactive variants | `$Record`, `$List`, `$Table`, `$Dict`: change in place, report every change |

the pieces are all there: a place (store), a codec (schema), a change signal (signals, variants). what is missing is the glue, and that glue is what every app writes by hand today.

## the hard part: sync or async

localStorage answers at once: a value read at module start is there before the first paint. preferences on android, indexeddb and files answer later. a persisted value that arrives later has two bad options:

- start with the default and switch when the stored value arrives: the theme flashes, the tabs jump.
- `await` at module start: works (`.rat.js` has top-level await), but every module that persists something gets async, and slow.

the way out: **the store reads ahead**. `configure()` already runs, and is awaited, before the app's code loads (the mods). if the store loads its keys there into memory, every read after is sync on every platform, and writes go through to the driver in the background:

```js
// @rat/app, configure(): before the app's modules run
await RAT.app.store.load();          // every key into a cache

// then, anywhere, on every platform
RAT.app.store.peek('theme');         // sync, from the cache
RAT.app.store.set('theme', 'oled');  // the cache at once, the driver after
```

this is the one change that makes everything below simple. it fits values a store holds (settings, tabs, small lists). big data (a table of thousands of rows) stays async and belongs in the database.

## the forms

### a) a function, no syntax

```js
import { stored } from '@rat/app';

let $theme = stored('theme', Enum('zombie', 'oled', 'rainbow'));
```

the key is written out. honest, explicit, works in plain js.

### b) on the schema

```js
let $theme = Enum('zombie', 'oled', 'rainbow').persist('theme');
let $theme = Enum.from(gestalt.themes).persist({ key: 'theme', in: 'session' });
```

the schema carries where and how; the signal made from it (a typed signal, `$$.$(schema)`) reads and writes. fits `@rat/types` (`todo.md`: "extend schema for persistence") and `concept.md` ("schemas … persist"). a schema does not know the variable's name: the key is written out, or comes from the `!`.

### c) on a variant

```js
export const $settings = $Record(Settings).create().persist('settings');
```

the instance persists itself: reads what is stored over its defaults, writes on every change.

### d) the `!`

```js
let $theme! = Enum('zombie', 'oled', 'rainbow');
```

the compiler hands the name over as the key, nothing else. see [below](#the-).

### e) in the config

```js
// config.rat.js
persist : { theme: 'local', tabs: 'local', bookmarks: 'database' },
```

the app lists what it keeps. good as an overview, bad as the only place: a module's value and its persistence are written in two files.

### f) a decorator after the declaration (ideas.md, property wrappers)

```js
let $theme = 'zombie' @stored('theme');
```

needs its own syntax for every kind of wrapper; `!` and `.persist()` cover the same with less.

| form | key | driver and options | compiler | fits |
|---|---|---|---|---|
| a) `stored(key, init)` | written | argument | no | every file |
| b) `schema.persist(…)` | written or from `!` | on the schema | no | typed signals |
| c) `variant.persist(…)` | written or from `!` | on the call | no | records, lists, tables |
| d) `$name!` | the name | from b), c) or the default | one rewrite | declarations |
| e) config | the config key | config | no | overview |

they are not exclusive: **b and c are the mechanism, d is the sugar, a is the escape hatch.**

## where the options live

one place answers each question, in this order:

1. **the call**: `.persist({ key, in, debounce, sync, version, migrate })`
2. **the type**: a default a type brings. a `$Table` is big, it could default to the database; a scalar
   to the store
3. **the app**: `config.rat.js`, `persist: { in: 'store' }`, the default for all
4. **rat**: `RAT.app.store`

`in` names the place:

| `in` | where | sync | for |
|---|---|---|---|
| `'store'` (default) | `RAT.app.store`: localStorage / preferences / sqlite | yes, with read-ahead | settings, tabs, small lists |
| `'session'` | sessionStorage | yes | per tab, gone with it |
| `'database'` | a table of `RAT.app.database` | no | many rows |
| `'files'` | a json file of `RAT.app.files` | no | documents, an index |
| `'url'` | the query or the hash | yes | state worth a link: the open folder, a filter (`cleanup.md` 29) |
| `'secure'` | keychain / keystore (a native driver) | no | passwords, tokens |

## the `!`

```js
let $theme!         = Enum('zombie', 'oled', 'rainbow');   // key 'theme'
export let $tabs!   = …;                                   // key 'tabs'
$draft!             = '';                                  // .rat: an implicit let, key 'draft'
let $theme!         = Enum(…).persist({ in: 'session' });   // the options from the schema, the key from the name
let $theme!         = Enum(…).persist({ key: 'look' });     // a written key wins
```

what the compiler does, and nothing more:

```js
let $theme! = Enum('zombie', 'oled', 'rainbow');
// ->
let $theme = $$.$(Enum('zombie', 'oled', 'rainbow'), { persist: 'theme' });
```

`$$.$` already picks the variant of a value and checks a schema; with `persist` it asks the store for the key, parses what it finds through the schema (or takes the initial value), and writes on change. the same call is open to plain js: `$(Enum(…), { persist: 'theme' })`.

rules:

- only in a declaration: after `let` / `const` / `export let`, or at the start of an implicit `let` line in a `.rat` file. a read is `$theme`, never `$theme!`.
- `$theme!=` at such a place is a persisted declaration, not `!=`: a comparison as a whole statement does nothing anyway.
- the key is the name without `$`. collisions between modules: two `$tabs!` in one app share one key. either that is the point (the same value), or one of them writes its key out.

alternatives to `!`, if it reads too loud:

| | reads |
|---|---|
| `$theme!` | "keep this", short, unambiguous in a declaration |
| `$theme^` | "lifted out", but `^` is xor |
| `$theme@` | "at a place", but `@` is the behaviors' sign |
| `let! $theme` | on the keyword: `let!` "a let that stays", one place for all names of the line |

## variants: records, lists, tables

a variant changes in place, so "on change" is its version signal. persisted:

```js
export const $settings! = $Record(Settings).create();
// $$.persist($Record(Settings).create(), 'settings'):
//   read:  the stored value parsed over the defaults, assigned into the record
//   write: on every change, toJSON
```

- the schema of the variant is the codec: a `Path` field comes back as a `Path`, an older array included.
- a variant that comes from somewhere else (a computed, a parameter) is not persisted: only declarations.
- big tables: `.persist({ in: 'database' })` writes rows, not the whole list. that is more than "write on change", it needs the table to report which rows changed: later.

## the rest

**timing.** writes batched per microtask; `debounce` for values that change fast (a slider); a flush on `pagehide` so nothing is lost when the tab closes.

**other tabs.** `sync: true` subscribes to `store.on('change')`: another tab sets the theme, this one follows. off by default (two tabs writing the same list fight).

**migration.** most of it is the schema: defaults fill new fields, coercion reads old shapes (`Path` from arrays). for real breaks: `version` and `migrate(old, version)`.

**scope.** a key may depend on state: the bookmarks of the open folder. a function as key, followed like a computed; when it changes the value is read anew under the new key:

```js
let $bookmarks = $Table(Bookmark).create().persist({ key: () => `bookmarks:${$folderId}` });
```

**secrets.** `in: 'secure'` or not at all. a password in localStorage is readable by every script of the origin. today `remotes.json` holds them in plain text.

**reset.** `$$.forget($theme)`: the stored value goes, the signal goes back to its initial value. and `RAT.app.store.clear()` for all.

**devtools.** every persisted value is known to the runtime: a list of them with key, place and size is a small panel.

## proposal

three layers, each usable without the next:

1. **the store reads ahead** (`@rat/app`, `configure()`): `RAT.app.store.load()`, then `peek()` / `set()` sync on every platform. the precondition for everything else.
3. **the mechanism, plain runtime**:
   - `$(init, { persist })` in `@rat/signals` / `@rat/app`: a signal, typed or not, read from and written to
     the store
   - `schema.persist(options)` in `@rat/types`: the options on the schema, the codec is the schema itself
   - `variant.persist(options)`: records, lists, dicts, tables
4. **the sugar**: `$name!` in declarations, the compiler only adds `{ persist: 'name' }`.

later, each on its own: `in: 'url'`, `in: 'database'` by rows, `sync: true`, keys as functions,
`in: 'secure'`.

## the files app with it

today (`state.rat.js`, `places.rat.js`, `tasks.rat.js`):

```js
export const $settings = $Record(Settings).create(read('files:settings', {}));
effect(() => write('files:settings', $settings));

const stored = read('files:tabs', { index: 0, list: [] });
export const $tabs = new $List(stored.list.map(tabOf));
…
effect(() => write('files:tabs', { index: $tabs.indexOf($tab), list: $tabs }));

$bookmarks = $Table(Bookmark).create :: storage.read('files:bookmarks', []),
effect(() => storage.write('files:bookmarks', $bookmarks));
```

with it:

```js
export const $settings!  = $Record(Settings).create();
export const $tabs!      = $List(Tab).create([Tab.create()]);
export let   $tab!       = 0;                                   // the index, a tab can not be stored as itself
const        $bookmarks! = $Table(Bookmark).create();
const        $history!   = $List(Task).create().persist({ debounce: 500 });
```

the reads, the effects, the keys and `.shared/storage.js` are gone. what stays to decide in the app:
which values are worth keeping.

## open questions

1. **the sign**: `$theme!`, `let! $theme`, or another?
2. **the default place**: `RAT.app.store` for everything small, or a type-based default (tables to the database)?
3. **read-ahead**: all keys of the store at `configure()`, or only the ones declared persisted (they are known only once the modules run, after `configure()`)?
4. **collisions**: a shared key for equal names across modules on purpose, or a prefix per module?
5. **`in: 'url'`** as part of this, or the router's business (`cleanup.md` 29)?

---

# anmerkungen

(1) grundsätzlich würde ich sagen 
- `b` und `c` sind quasi der "mature" weg
- `d` ist der "magic" weg
- `a` ist der "primitive" weg (vielleicht auch quasi der "core" bzzgl implementierung)

in der praxis nimmt meistens sicherlich d, b, c

(2) wenn es `!=` gibt,  wäre `$theme! = ...` zumindest suboptimal.
  - `$$theme = ...`
  - `#$theme = ...`

(3) also das is sicherlich nicht die beste lösung ^^

> "the key is the name without $. collisions between modules: two $tabs! in one app share one key. either that is the point (the same value), or one of them writes its key out."

für den anfang ist das sicherlich okay.

für ne höhere stufe wäre hier vermutlich erster nutzen für wasich schon so halbim hinterkopf hatte, als ich bei views, panels usw direkt `name` props zum weg machte:

so könnten `$tabs!` in mehrere views automatisch keys bekommen:

```
<rat-view name='podcasts' /> // myapp:podcasts:tabs
<rat-view name='search'   /> // myapp:search:tabs
```


