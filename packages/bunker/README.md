# @rat/bunker

persistent data in four parts, the platform apis behind one interface each. here for now, on its
way to `@bunker` once it has proven itself in the apps (`rat/apps`).

| | what | drivers |
|---|---|---|
| **Store** | keys and values | `memory`, `local`, `session`, `cookie`, `indexeddb`, `cache` |
| **Database** | tables of records with a schema, each table a store | `indexeddb`, or any store driver |
| **Files** | a tree of entries | `opfs`, a granted folder, any directory handle |
| **memo** | no place of its own: ttl and stale-while-revalidate around a store | – |

every call is async, the same for every driver. a driver that can answer at once (`local`,
`session`, `cookie`, `memory`) also has `getSync`, `setSync`, `deleteSync`, `keysSync`: for what
has to be read before the first paint (theme, skin).

## Store

```js
import { createStore } from '@rat/bunker';

const prefs = createStore({ driver: 'local', name: 'notes' });

await prefs.set('theme', 'dark');
await prefs.get('theme');              // 'dark', undefined without one
await prefs.get('zoom', 100);          // with a fallback
await prefs.has('theme');  await prefs.delete('theme');  await prefs.clear();
await prefs.keys();  await prefs.values();  await prefs.entries();

prefs.getSync('theme');                // a sync driver only
prefs.on('change', ({ type, keys }) => …);   // returns its stop. local and session: other tabs too
```

| option | |
|---|---|
| `driver` | a name or a driver object (`{ holds, sync, get, set, delete, keys, clear, watch? }`) |
| `name` | where it lives: the key prefix (`local`, `session`, `cookie`), the database (`indexeddb`), the cache (`cache`) |
| `table` | `indexeddb` only, the object store (default `store`) |
| `schema` | any standard schema (`@rat/types`, zod …): every value set is checked, a failing one throws |
| `codec` | `json`, `text`, `raw`, `response` or `{ encode, decode }`. the driver picks one: strings get `json`, structured clone `raw`, the cache `response` |

the `cache` driver is the Cache API: keys are urls, a value is stored as a `Response` (a string as
text, anything else as json) and read back as what it was.

## Database

```js
import { createDatabase } from '@rat/bunker';
import { Id, Ref, Enum }  from '@rat/types';

const db = createDatabase({
  name   : 'podcasts',
  schema : {
    podcasts : { id: Id, title: String, url: URL },
    episodes : { id: Id, title: String, url: URL, podcast: Ref('podcasts') },
    progress : { episode: Ref('episodes'), point: Number },
    counted  : { id: Id.counter, kind: Enum('a', 'b') },
  },
});

const show = await db.podcasts.add({ title: 'rat talk', url: 'https://…' });   // gets its id
await db.podcasts.update(show.id, { title: 'rat talks' });
await db.podcasts.find({ title: 'rat talks' });   // a matcher object or a function
await db.podcasts.count();
db.table('podcasts');                             // the same as db.podcasts
```

- a table is a store: `get`, `set`, `delete`, `keys`, `values`, `on('change')`, `as()` … work on it.
- a field is a schema, or `String`, `Number`, `Boolean`, `URL`, `Object`, `Array` for the plain
  ones. the record is checked as a whole on every write.
- the key is the field with `Id`, else the first `Ref` (a record that belongs to one other), else
  `id`. `Id` makes a uuid when a record has none, `Id.counter` the next number.
- `driver: 'indexeddb'` (default) puts every table into one IndexedDB database `name`, a table
  missing there is created with the next version. any store driver works as well, a table is
  then the keys under `name:table`: a database in localStorage, or in 100k cookies.

## as(Type), $items

```js
await table.as(Array);   await table.as(Object);   await table.as(Map);
await table.as('keys');  await table.as('values');  await table.as('entries');
await table.as(List);                  // a List of the values, a snapshot

table.as($List);                       // a $List that follows the table: every change reads it anew
table.$items;                          // the same, one per table, for markup:

// @for (podcast of RAT.app.database.podcasts.$items) …
```

a form of your own: `register(Type, store => …)`. `List`, `$List` and `$items` come from `rat.js`,
the one file that knows rat: the rest moves to `@bunker` without it.

## Files

```js
import { createFiles, Files } from '@rat/bunker';

const files = createFiles({ driver: 'opfs' });     // the origin private file system
const files = await Files.pick({ id: 'notes' });   // a folder the user grants, inside a click (null when cancelled)
const files = createFiles({ root: handle });       // any directory handle, a stored one too

await files.write('notes/hello.md', '# hello');    // folders on the way are made
await files.read('notes/hello.md');                // 'text' (default), 'json', 'blob', 'bytes'
await files.list('notes');                         // [Entry], folders first, by name
await files.tree('', { accept: name => name.endsWith('.md') });   // { entry, children }, no empty folders
await files.entry(path);  await files.exists(path);  await files.mkdir(path);  await files.remove(path);
```

a path says where, an **entry** is what is handed around: it holds the handle the platform gave,
stays pinned to its file or folder and carries its permission. the content is read when asked
for.

```js
entry.kind  entry.name  entry.path  entry.handle
await entry.read('text');  await entry.write(data);  await entry.list();  await entry.remove();
await entry.info();                  // { size, modified, type }
await entry.permission('read');      // 'granted' | 'prompt' | 'denied', never asks
await entry.request('read');         // asks, inside a click
```

a handle is structured-clonable: `(await files.root()).handle` goes into a database table and gives
the same files on the next visit.

## memo

```js
import { createStore, memo } from '@rat/bunker';

const api = memo(createStore({ driver: 'cache', name: 'icons-api' }), { ttl: DAY, stale: true });

await api.get('collections', () => fetch(…).then(response => response.json()));
```

`ttl`: how long a value is fresh. `stale`: an old value comes back at once and is loaded anew
behind it. one load per key at a time. the store holds `{ at, value }`.

## in a rat app

`config.rat.js` makes them mods of the app (see `@rat/app`):

```js
export default {
  RAT     : true,
  mods    : {
    database : { schema: { favs: { name: Id } } },   // RAT.app.database
    files    : true,                                  // RAT.app.files, opfs
    store    : { driver: 'local' },                   // RAT.app.store
  },
};
```
