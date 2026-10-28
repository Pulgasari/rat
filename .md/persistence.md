# rat :: persistence

status: **built**: the store reads ahead, `stored` in `@rat/types`, `$name!` in the compiler, keys per view.
later: `in: 'url'`, a table by rows, keys as functions, `in: 'secure'`.

a value that outlives the page: a setting, the open tabs, bookmarks, a draft. before, every app did it by
hand (`cleanup.md` 1): a key, a read, an effect that writes, a revive for what JSON can not carry. this
paper collects what persistence has to answer, what rat has for it, the forms it takes, and what is built.

the frame: **no compiler magic for the mechanism**. everything works as plain runtime api; syntax only on
top, where it is really good (`$theme!`).

- [what it has to answer](#what-it-has-to-answer)
- [what rat has](#what-rat-has)
- [the hard part: sync or async](#the-hard-part-sync-or-async)
- [one word, three ways](#one-word-three-ways)
- [where the options live](#where-the-options-live)
- [the `!`](#the-)
- [variants: records, lists, tables](#variants-records-lists-tables)
- [the rest: timing, tabs, migration, reset](#the-rest)
- [the files app with it](#the-files-app-with-it)
- [later](#later)

---

## what it has to answer

| question | examples |
|---|---|
| **where** | localStorage, sessionStorage, indexeddb, android preferences, a file, the url, a server |
| **under which key** | `theme`, `settings`, `bookmarks` |
| **in which form** | the value as json, and how it comes back: a `Path` from `'a/b'`, an `Enum` from `'oled'` |
| **when written** | on every change, debounced, batched, on leaving the page |
| **when read** | before the first paint (a theme), or whenever it arrives (a big table) |
| **what if it changed elsewhere** | another tab, another device |
| **what if its shape changed** | an older version stored `path: ['a', 'b']` |
| **for whom** | the app, a view, a folder, a user, a server connection |
| **how sensitive** | a theme is not, a server password is |

## what rat has

| piece | gives |
|---|---|
| `RAT.app.store` (`@rat/bunker` `createStore`) | keys and values, named after the app (the prefix), one driver per platform: localStorage in the browser, preferences on android and ios, sqlite on the desktop. `load()` / `peek()`, `on('change')` incl. other tabs |
| `RAT.app.database` | tables with schemas, indexeddb / sqlite |
| schemas of `@rat/types` | `validate` (coerce, check, fill defaults) and `toJSON` on the types: the codec in both directions |
| typed signals | `let $view = Enum('grid', 'list')`: the signal knows its schema |
| reactive variants | `$Record`, `$List`, `$Table`, `$Dict`: change in place, report every change |

a place (store), a codec (schema), a change signal (signals, variants). `stored` is the glue.

## the hard part: sync or async

localStorage answers at once: a value read at module start is there before the first paint. preferences
on android, indexeddb and files answer later. a kept value that arrives later has two bad options:

- start with the default and switch when the stored value arrives: the theme flashes, the tabs jump.
- `await` at module start: works (`.rat.js` has top-level await), but every module that persists
  something gets async. not the `await` costs (a microtask), but what it does to the module graph: a
  module with top-level await holds back every module that imports it, so the reads line up one after
  the other along the imports instead of running once, together. each read pays its own round trip (an
  indexeddb transaction, a crossing of the native bridge: a few ms each), and the first paint waits for
  the whole chain.

the way out: **the store reads ahead**. `configure()` runs, and is awaited, before the app's modules load.
the store loads every key there into memory (one read, not one per key), every read after is sync on every
platform, writes go to memory at once and to the driver behind it:

```js
// @rat/app, configure(): after the mods, before the app's modules (stored.js)
await RAT.app.store.load();          // every key into memory

// then, anywhere, on every platform
RAT.app.store.peek('theme');         // sync, from memory
RAT.app.store.set('theme', 'oled');  // memory at once, the driver after
```

it fits what a store holds (settings, tabs, small lists). the database place is read on first use: a table
arrives a moment later, its writes wait until it has.

## one word, three ways

one vocabulary: **`stored`**, from the primitive to the sugar.

```js
// the primitive (the core): a key and a value, plain js
let   $theme = stored('theme', Enum('zombie', 'oled', 'rainbow'));    // a signal
const $tabs  = stored('tabs', $List(Tab).create());                  // the variant, kept in place

// the mature way: on the schema, the options travel with the type
let   $theme    = Enum.from(gestalt.themes).stored({ key: 'custom-key', in: 'session' });   // $() makes the signal
const $settings = $Record(Settings).stored('settings').create();                           // create() the variant

// the magic way: in a declaration, the key is the name
let   $theme!    = Enum('zombie', 'oled', 'rainbow');
const $settings! = $Record(Settings).create();
```

in practice the declaration and the schema, combined where the options matter:

```js
let $theme! = Enum.from(gestalt.themes).stored({ in: 'session' });   // the key from the name, the rest from the schema
```

| way | key | options | compiler |
|---|---|---|---|
| `stored(key, init)` | written | argument | no |
| `schema.stored(…)` | written or from `!` | on the schema | no |
| `$name!` | the name | from the schema or the defaults | one rewrite |

what `stored` takes and gives:

| init | gives |
|---|---|
| a value | a signal (`$()` of it: an array becomes a `$List` as always) |
| a schema | a typed signal |
| a variant (`$Record`, `$List`, `$Table`, `$Dict` …) | the variant itself, restored in place and written on change |
| a signal | the signal, kept |

## where the options live

one place answers each question, in this order:

1. **the call**: `stored({ key, in, debounce, sync, version, migrate }, …)`, or `schema.stored(…)`
2. **the type**: a `Table` is many rows, it goes to the database. everything else to the store
3. **the app**: `config.rat.js`, `stored: { in: 'store' }`, the default for all
4. **rat**: `'store'`

`in` names the place:

| `in` | where | answers | for |
|---|---|---|---|
| `'store'` (default) | `RAT.app.store`: localStorage / preferences / sqlite | at once, read ahead | settings, tabs, small lists |
| `'database'` | the table `stored` of the app's database: indexeddb / sqlite | after its first read | tables |
| `'session'` | sessionStorage | at once | per tab, gone with it |
| `'memory'` | a Map | at once | tests |

`stored.place(name, place)` adds one: a `@rat/bunker` store is a place, or any `{ peek | get, set, delete,
on? }`. without `@rat/app`: `'store'` is localStorage, `'session'` sessionStorage, `'database'` falls back to
`'store'` with a warning.

## the `!`

```js
let $theme!         = Enum('zombie', 'oled', 'rainbow');   // key 'theme'
export let $tabs!   = …;                                   // key 'tabs'
$draft!             = '';                                  // .rat: an implicit let, key 'draft'
let $theme!         = Enum(…).stored({ in: 'session' });   // the options from the schema, the key from the name
let $theme!         = Enum(…).stored({ key: 'look' });     // a written key wins
```

what the compiler does, and nothing more:

```js
let $theme! = Enum('zombie', 'oled', 'rainbow');
// ->
let $theme = $$.stored('theme', Enum('zombie', 'oled', 'rainbow'));
```

rules:

- only in a declaration of the top level: after `let` / `const` / `var` or a comma of one, or at the start
  of an implicit `let` line in a `.rat` file. a read is `$theme`, never `$theme!`.
- `$theme!=` at such a place is a kept declaration, not `!=`: a comparison as a whole statement does
  nothing anyway. anywhere else `$x!= y` is the comparison.
- `const $x! = …` is a variant, or an error: a computed is made from others, there is nothing to keep.
- the key is the name without `$`. the same key in the same place twice is the same signal (two modules,
  two instances of a component). a variant can not be shared that way: both are kept and warned about.

**keys per view.** views, parts and areas have names. a kept value made in a component inside named ones
gets their names in its key, the outermost first:

```html
<rat-view name='podcasts'><Feed /></rat-view>   <!-- let $tabs! in Feed: myapp:podcasts:tabs -->
<rat-view name='search'><Feed /></rat-view>     <!-- myapp:search:tabs -->
```

one made in a module (`state.rat.js`) or in the app's own component keeps its name as it is.
`scope: false` keeps it as it is anywhere. how it finds the names: `@domina/render` hands `scope(fn,
anchor)` the comment a part starts at, the runtime keeps those of what is being built (`building()`), and
`@rat/app` walks from them to the named `rat-view`, `rat-part` and `rat-area` around (`stored.scope()`).
the anchor of a nested component lies in a fragment not in the page yet, the anchors before it say
where that fragment goes.

## variants: records, lists, tables

a variant changes in place, so "on change" is its version signal.

```js
export const $settings! = $Record(Settings).create();
// read:  the stored value field by field through the schema, assigned into the record
// write: on every change, toJSON
```

- the schema of the variant is the codec: a `Path` field comes back as a `Path`, an older array included.
  `create()` remembers the schema a variant was made by.
- a record takes field by field: a field that is gone is dropped, a new one starts at its initial value, a
  value that no longer fits as well.
- a list whose items are a data type (`$List(Tab)`) gets them back as one: `$Record`s, not plain objects.
- how it is put back: `assign` (a record), `replace` (a list, a table), `clear` + `set` (a dict, a map),
  `value` (an enum, a color).
- a table goes to the database as a whole value under its key. by rows is later: it needs the table to
  report which rows changed.

## the rest

**timing.** a change is written once per microtask; `debounce` for values that change fast (a slider).
pending writes run on `pagehide` and when the page is hidden (android does not always fire `pagehide`).
an unchanged value is not written, the initial one neither.

**other tabs.** `sync: true` follows `on('change')` of the place: another tab sets the theme, this one
follows. off by default (two tabs writing the same list fight).

**migration.** most of it is the schema: defaults fill new fields, coercion reads old shapes (`Path` from
arrays). for real breaks `version` and `migrate(old, version)`: kept as `{ '~version': n, value }`, an
older one goes through `migrate`, the result is written back.

**reset.** `stored.forget('theme')`: back to the initial value, gone from its place.

**secrets.** not in the store: a password in localStorage is readable by every script of the origin.
`in: 'secure'` (keychain / keystore) is later; the remotes of files keep their own file until then.

## the files app with it

before (`state.rat.js`, `places.rat.js`, `tasks.rat.js`, `sync.rat.js`):

```js
export const $settings = $Record(Settings).create(read('files:settings', {}));
effect(() => write('files:settings', $settings));

const stored = read('files:tabs', { index: 0, list: [] });
export const $tabs = new $List(stored.list.map(tabOf));
…
effect(() => write('files:tabs', { index: $tabs.indexOf($tab), list: $tabs }));

$bookmarks = $Table(Bookmark).create :: storage.read('files:bookmarks', []),
effect(() => storage.write('files:bookmarks', $bookmarks));

const persist = () => write(STORAGE, { folderName, targets: $targets });   // and persist() after every change
```

now:

```js
export const $settings! = $Record(Settings).create();

export const $tabs! = $List(Tab).create([tabOf()]);
let $tabIndex! = 0;
export const $tab = $tabs.at($tabIndex) ?? $tabs.at(0);   // the tab on screen, a computed of the index

$bookmarks!      = $Table(Bookmark).create(),             // a table: in the database
$folderTyped!    = $Dict(Str, Str).create(),
$ownFolderTypes! = $Dict(Str, Foldertype).create();

$ended! = new $List;

export let $targets! = [];
let $folderName!     = '';
```

the reads, the effects, the keys, `persist()` and `.shared/storage.js` are gone. what is left to decide in
an app: which values are worth keeping.

## later

1. **`in: 'url'`**: state worth a link (the open folder, a filter), or the router's business (`cleanup.md` 29).
2. **a table by rows** in the database, instead of one value.
3. **keys as functions**, followed like a computed: `stored({ key: () => `bookmarks:${$folderId}` }, …)`.
4. **`in: 'secure'`**: keychain / keystore drivers.
5. **devtools**: every kept value with key, place and size.
