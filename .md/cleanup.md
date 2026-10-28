# cleanup

the codebase as it is, step by step towards nice code. two parts:

- **[the code itself](#part-1-the-code-itself)**: how it is written. dense expressions, data that does not know
  itself, tuples instead of names. fixable with plain js, no new building block needed.
- **[building blocks](#part-2-building-blocks)**: what is missing in rat or a library, so the apps build it by hand.

per spot: the code as it is now, and how it could read. a direction is no decision, each one is discussed first.

`rat` framework, runtime, compiler · `lib` bunker, types, aufbau, .shared · `app` the app's own code ·
`quick` needs no concept

## part 1: the code itself

- [A1 one expression does everything](#a1-one-expression-does-everything)
- [A2 data that does not know itself](#a2-data-that-does-not-know-itself)
- [A3 lookups by id through find](#a3-lookups-by-id-through-find)
- [A4 several things in one line](#a4-several-things-in-one-line)
- [A5 return as a jump](#a5-return-as-a-jump)
- [A6 tuples instead of names](#a6-tuples-instead-of-names)
- [A7 the same string built in several places](#a7-the-same-string-built-in-several-places)
- [A8 derived values as functions](#a8-derived-values-as-functions)
- [A9 long positional parameters](#a9-long-positional-parameters)
- [A10 nested awaits, walking from the root](#a10-nested-awaits-walking-from-the-root)
- [A11 null as the default, ?. everywhere](#a11-null-as-the-default--everywhere)
- [A12 logic in markup the syntax already has](#a12-logic-in-markup-the-syntax-already-has)

### A1 one expression does everything

ternaries in ternaries, `&&` and `||` as control flow, `?.` and `??` mixed in. the reader evaluates it in
the head to find out what comes back.

```js
// files/state.rat.js
export const iconOf = (entry, at) => entry.kind === 'directory'
  ? (at && places.typeOf([...at, entry.name])?.icon) || 'lucide:folder'
  : CATEGORIES.find(item => item.id === categoryOf(entry))?.icon ?? 'lucide:file';

// files/state.rat.js, writable()
const state = handle?.requestPermission ? await handle.requestPermission({ mode: 'readwrite' }).catch(() => 'denied') : handle ? 'granted' : 'denied';

// files/components/TaskList.rat.html
return task.state === 'running' && done != null ? (total ? `${Math.round(done / total * 100)}%` : `${done}`) : STATES[task.state];
```

```html
<!-- files/components/Dashboard.rat.html -->
<h2>{$hits.length ? 'Found ' + ($hits.length >= 100 ? '100+' : $hits.length) : 'Nothing found'}</h2>

<!-- files/components/Context.rat.html -->
['kind', $selected.kind === 'directory' ? 'folder' : $selected.type || 'file'],
```

elsewhere:

```js
// noisy/browse.js
export const modeOf = event => event?.shiftKey ? 'range' : event?.ctrlKey || event?.metaKey ? 'toggle' : 'one';

// .shared/components/Picker.rat.html
const normalize = option => Array.isArray(option) ? { label: String(option[1] ?? option[0]), title: String(option[1] ?? option[0]), value: option[0] }
  : isObject(option) ? { icon: option.icon, label: option.label ?? (option.icon ? '' : String(option.value)), title: option.title ?? option.label ?? String(option.value), value: option.value }
  : …;

// packages/bunker/codecs.js
decode : async stored => !stored ? undefined : (stored.headers.get('content-type') ?? '').includes('json') ? stored.json() : stored.text(),
```

could read: one case per line, early returns, the fallback where the data is made (A2, A3)

```js
export function iconOf (entry) {
  if (isFile(entry)) return CATEGORY[categoryOf(entry)].icon;
  return places.typeOf(entry)?.icon ?? 'lucide:folder';
}

async function writable () {
  const handle = rootHandle();
  if (!handle) return null;
  if (await permission(handle, 'readwrite') === 'granted') return handle;
  toast.error('No permission to change this folder');
  return null;
}

export function modeOf (event) {
  if (event?.shiftKey) return 'range';
  if (event?.ctrlKey || event?.metaKey) return 'toggle';
  return 'one';
}
```

### A2 data that does not know itself

`app` · an entry of a listing does not know where it lies or which source it comes from. so every use
puts it together again: `entry.path ?? at`, `sourceOf(entry)`, `[...at, entry.name]`, an `at` parameter and
`at`/`from` props passed along, `{ ...entry, kind: 'file' }` to fix up an index entry. `entry.kind ===
'directory'` 21 times.

```js
// files/state.rat.js
export function open (entry, at = $path) {
  if (entry.kind === 'directory') { goTo([...at, entry.name]); return router.go('/library'); }
  $file = { ...entry, kind: 'file', path: entry.path ?? at, source: sourceOf(entry) };
  router.go('/preview');
}

export const sourceOf = entry => entry.source !== undefined ? entry.source : entry.path ? null : $source;

const at = entry.path ?? $path;   // renameEntry, deleteEntry, pick, download, sendEntry

// files/components/FileRow.rat.html
onclick={() => about({ ...entry, kind: 'file' })}

// files/components/Entry.rat.html, Thumb.rat.html
const at   = untrack(() => $path);
const from = untrack(() => $source);
<Thumb entry={entry} at={at} from={from} />
```

could read: an entry is complete when it is made (in `fs.list` and the scan): its folder, its source, its
kind. then nothing needs `at`, `from` or a fix-up

```js
// { kind, name, folder: ['a', 'b'], source: null, size, … }
export const isFolder = entry => entry.kind === 'directory';
export const pathOf   = entry => [...entry.folder, entry.name];

export function open (entry) {
  if (isFolder(entry)) return browse(entry);
  $file = entry;
  router.go('/preview');
}
```

```html
<Thumb entry={entry} />
```

### A3 lookups by id through find

`app` · lists searched by id, then `?.`, then a fallback for "not found" that cannot happen.

```js
// files/state.rat.js
CATEGORIES.find(item => item.id === categoryOf(entry))?.icon ?? 'lucide:file'
CATEGORIES.find(item => item.id === mostly[0])?.label

// files/components/Dashboard.rat.html
const $label = SORTED.find(item => item.id === $category)?.label ?? $category;

// files/modules/places.rat.js
return id ? types().find(type => type.id === id) ?? null : null;
return … ? BUILTIN.find(type => type.id === id) ?? null : null;
```

could read: an object by id, the list where an order is needed

```js
export const CATEGORY = {
  archives  : { icon: 'lucide:file-archive', label: 'Archives'  },
  audio     : { icon: 'lucide:music',        label: 'Audio'     },
  …
};

CATEGORY[categoryOf(entry)].icon
CATEGORY[$category].label
```

### A4 several things in one line

`app` · a branch that does two things, a callback with a declaration and a condition inside, an
assignment chain. one-liners are fine for one thing (code.md), not for three.

```js
// files/state.rat.js
if (entry.kind === 'directory') { goTo([...at, entry.name]); return router.go('/library'); }
requestAnimationFrame(() => { const element = scroller(); if (element) element.scrollTop = scrollTop.get(untrack(() => $tabIndex)) ?? 0; });

// files/modules/scan.rat.js
finally { if (running === controller) { running = null; $scanning = null; } }

// files/components/Preview.rat.html
fs.readFile(…).then(blob => { if (alive) $src = url = URL.createObjectURL(blob); });
```

```html
<!-- icons/app.rat.js -->
<button.linkish onclick={() => { const [prefix] = $detail.split(':'); closeDetail(); openSet(prefix); }}>{$detail.split(':')[0]}</button.linkish>
<rat-area … on:toggle={event => { if (!event.detail?.open) $detail = null; }}>

<!-- files/components/Sync.rat.html -->
<input-text … oninput={event => { $address = event.target.value ?? ''; $chosen = null; }} />
```

could read: a named function for anything with more than one step

```js
function restoreScroll () {
  const element = scroller();
  if (element) element.scrollTop = scrollTop.get($tabIndex) ?? 0;
}

requestAnimationFrame(restoreScroll);
```

```html
<button.linkish onclick={openDetailSet}>{setOf($detail)}</button.linkish>
```

### A5 return as a jump

`app` · `return something()` in a function that returns nothing: the value is meaningless, `return` is
used to save a line.

```js
// files/state.rat.js
if (entry.kind === 'directory') { goTo([...at, entry.name]); return router.go('/library'); }
if ($tabs.length === 1) return goTo([]);
if (!root.supported()) return toast.error('This browser can’t open folders: …');
if (!granted) return chooseFolder();
if (opensOnTap()) return open(entry);
```

could read: the call, then the return, or an else

```js
if (!root.supported()) {
  toast.error('This browser can’t open folders: …');
  return;
}

if (opensOnTap()) open(entry);
else $selected = entry;
```

### A6 tuples instead of names

`app` `lib` · arrays where an object with names belongs, read back by index.

```js
// files/state.rat.js factsOf, places.rat.js suggest
const mostly = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
mostly && mostly[1] / files.length >= 0.6 ? … mostly[0] …

// files/components/Preferences.rat.html
values: [['auto', 'auto'], ['single', 'a tap'], ['double', 'a double click']]
<input-option value={choice[0]}>{choice[1]}</input-option>

// files/components/Context.rat.html, Facts.rat.html
<Facts rows={[['name', $selected.name], ['kind', …], …]} />
<dt>{row[0]}</dt> <dd>{row[1]}</dd>

// icons/app.rat.js
$detail.split(':')[0]                          // twice
// noisy/browse.js
key => key.split('\u0000')[1]
```

could read: names

```js
const [top] = Object.entries(counts).map(([id, count]) => ({ count, id })).sort(byCount);
if (top && top.count / files.length >= 0.6) …

values: { auto: 'auto', single: 'a tap', double: 'a double click' }
@for ([value, label] of Object.entries(CHOICES[name].values)) …

<Facts rows={{ name: $selected.name, kind: kindOf($selected), … }} />
```

### A7 the same string built in several places

`app` · each place builds it again, slightly differently.

```js
// "a.txt" or "3 items": state.rat.js paste, PasteBar, sync.rat.js send
const what = count === 1 ? board.items[0].name : `${count} items`;
const what = files.length === 1 ? files[0].name : `${files.length} files`;

// a path for people: FileRow, Context (three), state.rat.js labels
'/' + entry.path.join('/')
'/' + (entry.path ?? $path).join('/')

// host:port: sync.rat.js labelOf, Sync.rat.html keyOf, the device row
`${target.host}:${target.port}`
```

could read: one function each, next to the data

```js
export const describe = (items, noun = 'items') => items.length === 1 ? items[0].name : `${items.length} ${noun}`;
export const shown    = entry => '/' + entry.folder.join('/');
```

### A8 derived values as functions

`app` · some derived values are `$computed`, others functions called in the markup, some constants written
as functions. which one a name is, the reader has to look up.

```js
// files/state.rat.js
export const localRoot  = () => $perm === 'granted' ? $folder?.handle ?? null : null;
export const rootHandle = () => rootOfSource($source);
export const folderName = () => sourceName($source);
export const $visible   = matches($entries, $filter);      // a computed, next to them

// files/modules/places.rat.js
export const types     = () => [...BUILTIN, ...$folderTypes];
export const bookmarks = () => $bookmarked.filter(…);

// files/modules/root.rat.js: never changes after the page loaded
export const supported = () => RAT.platform !== 'web' || typeof globalThis.showDirectoryPicker === 'function';
```

```html
@if ($route === '/library' && rootHandle()) …
<h2>{sourceName(null)}</h2>
```

could read: state that changes is a `$computed`, what never changes a constant, functions take arguments

```js
export const $root       = $perm === 'granted' ? $folder?.handle ?? null : null;
export const $folderName = sourceName($source);
export const $types      = [...BUILTIN, ...$folderTypes];
export const supported   = RAT.platform !== 'web' || typeof globalThis.showDirectoryPicker === 'function';
```

### A9 long positional parameters

`app` · four or five arguments by position, several of them only there because the entry does not know
itself (A2).

```js
transfer.pick(mode, entry, entry.path ?? $path, rootOfSource(sourceOf(entry)));
fs.rename(handle, at, entry.name, name, entry.kind);
copyTree(handle, targetDir, name, signal, onFile);
transfer.transfer(handle, board.items, board.mode, target, { onProgress: progress, signal });
writeTask({ … }, at, () => …);
sync.send(target(), $files, $pin);
```

could read: with complete entries (A2)

```js
transfer.pick(mode, entry);
fs.rename(entry, name);
transfer.run(board, $path, { onProgress, signal });
```

### A10 nested awaits, walking from the root

`app` · `(await (await …).x()).y()` reads inside out. and every operation walks the path from the root
again: one `getDirectoryHandle` per level, each a request on a webdav server (`dav.stat`, a PROPFIND).
renaming a file five folders deep costs five requests before the rename. **performance**.

```js
// files/modules/fs.js
return (await (await dirAt(root, path)).getFileHandle(name)).getFile();
await (await dirAt(root, path)).getDirectoryHandle(name, { create: true });
await (await dirAt(root, path)).removeEntry(name, { recursive: true });

// files/modules/sync.rat.js
const handle = await (await dirAt(root, path)).getFileHandle(entry.name);
```

could read: one step per line; the listing keeps the folder handle it read, its entries refer to it

```js
const folder = await dirAt(root, path);
const handle = await folder.getFileHandle(name);
return handle.getFile();

// or with the handle kept: entry.handle.getFile(), entry.parent.removeEntry(entry.name)
```

### A11 null as the default, ?. everywhere

`app` · state starts as `null`, so every read guards. an empty value of the right shape would need none.

```js
// files/components/Dashboard.rat.html
$index?.categories?.[item.id]?.count
$index?.categories?.[item.id] ? $index.categories[item.id].count + ' · ' + … : '…'
$index?.recent?.length

// files/components/Sync.rat.html, TaskList.rat.html
const $auto = $autoSync ?? {};
const { done, total } = task.progress ?? {};

// files/modules/sync.rat.js
const plugin = () => globalThis.Capacitor?.Plugins?.FileSync ?? null;
```

could read: an empty index that has every category at zero, read without guards

```js
export let $index = EMPTY_INDEX;   // { categories: { images: { count: 0, size: 0 }, … }, files: [], recent: [], … }

$index.categories[item.id].count
```

### A12 logic in markup the syntax already has

**status:** done in the components: `class:` everywhere, the tabs through `positionOf` (the loop index is no option yet, see 26).

`app` `quick` · class strings by ternary while `class:` exists, `indexOf` while `@for` has the index.

```html
<!-- files/components/Tabs.rat.html -->
<div class={$tabs.indexOf(tab) === $index ? 'tab active' : 'tab'}>
<!-- files/components/Searchbar.rat.html -->
<button class={$busy ? 'tasks-button busy' : 'tasks-button'} …>
<!-- files/components/Sync.rat.html -->
<li class={isChosen(device) ? 'row selected' : 'row'}>
<!-- icons/app.rat.js -->
<btn-push class={isFav(props.name) ? 'heart on' : 'heart'} …>
```

could read:

```html
<div.tab class:active={index === $tabIndex}>
<button.tasks-button class:busy={$busy} …>
<li.row class:selected={isChosen(device)}>
<btn-push.heart class:on={isFav(props.name)} …>
```

## part 2: building blocks

- [files](#files-devappsfiles)
  - [1 persistence by hand](#1-persistence-by-hand)
  - [2 objects in signals, changed by copying](#2-objects-in-signals-changed-by-copying)
  - [3 untrack](#3-untrack)
  - [4 async state by hand](#4-async-state-by-hand)
  - [5 once per change](#5-once-per-change)
  - [6 a signal bridged into a callback](#6-a-signal-bridged-into-a-callback)
  - [7 the write pattern](#7-the-write-pattern)
  - [8 errors to the toast](#8-errors-to-the-toast)
  - [9 abort handling](#9-abort-handling)
  - [10 dialogs](#10-dialogs)
  - [11 the context area](#11-the-context-area)
  - [12 paths](#12-paths)
  - [13 counting by category](#13-counting-by-category)
  - [14 tabs](#14-tabs)
  - [15 ids](#15-ids)
  - [16 move with a fallback](#16-move-with-a-fallback)
  - [17 json through the files mod](#17-json-through-the-files-mod)
  - [18 reading inputs](#18-reading-inputs)
  - [19 the loop index](#19-the-loop-index)
  - [20 formatting in markup](#20-formatting-in-markup)
  - [21 repeated lookups in a loop](#21-repeated-lookups-in-a-loop)
  - [22 Context does five things](#22-context-does-five-things)
  - [23 Sync knows the protocol](#23-sync-knows-the-protocol)
  - [24 small ones](#24-small-ones)

## files (`dev/apps/files`)

### 1 persistence by hand

`rat` `lib` · six places store something, each by hand:
- a prefix per key,
- an effect per value,
- a `persist()`to remember to call.

`RAT.app.store` exists, is named after the app, and is unused.

```js
// state.rat.js
export let $settings = Object.fromEntries(Object.entries(DEFAULTS).map(([name, fallback]) => [name, read(`files:${name}`, fallback)]));

effect(() => { for (const [name, value] of Object.entries($settings)) write(`files:${name}`, value); });

let $tabState = read('files:tabs', { index: 0, list: [{ path: [] }] });

effect(() => write('files:tabs', $tabState));

// places.rat.js
let $bookmarked  = read('files:bookmarks',   []);
let $folderTyped = read('files:folderTyped', {});
let $folderTypes = read('files:folderTypes', []);

effect(() => write('files:bookmarks',   $bookmarked));
effect(() => write('files:folderTyped', $folderTyped));
effect(() => write('files:folderTypes', $folderTypes));

// sync.rat.js
const persist = () => write(STORAGE, { folderName, targets: $targets });
// … and persist() after every change

// remotes.rat.js
const persist = () => files.write(FILE, JSON.stringify($connections));
```

could be: a value bound to the store, one key, one json value, written when it changes

```js
const { store } = RAT.app;

export const $settings = await store.bind('settings', {
  open           : 'auto',
  'pattern-bg'   : '',
  'pattern-tile' : '',
  searchbar      : 'bottom',
  tabbar         : 'bottom',
  viewmode       : 'list',
});

export const $bookmarks = await store.bind('bookmarks', []);
```

later maybe as notation (ideas.md, property wrappers):

```js
let $bookmarks = [] @stored('bookmarks');
```

### 2 objects in signals, changed by copying

**status:** partly: places (`$Table`, `$Dict`), tasks (`$Record`s in `$List`s), the pickboard and the settings (`$Record`) are done. the tabs and sync's `$autoSync` are left.

`rat` `lib` · a signal only notices a new object, so changing one field means copying the whole.

```js
// state.rat.js
export const setting = (name, value) => { $settings = { ...$settings, [name]: value }; };

// places.rat.js
export function setType (path, id) {
  const typed = { ...$folderTyped };
  if (id) typed[keyOf(path)] = id;
  else delete typed[keyOf(path)];
  $folderTyped = typed;
}

// tasks.rat.js
function patch (id, changes) {
  $queue = tasks().map(task => task.id === id ? { ...task, ...changes } : task);
}

// sync.rat.js
$autoSync = { ...$autoSync, name: folderName, tree: uri };
```

could be: reactive records and lists (`$Record`, `$List` of @rat/types) as the default for object state

```js
$settings.viewmode = 'grid';

if (id) $folderTyped[keyOf(path)] = id;
else delete $folderTyped[keyOf(path)];

Object.assign($queue.find(task => task.id === id), changes);

Object.assign($autoSync, { name, tree: uri });
```

### 3 untrack

`rat` · six times. in `Entry` and `Thumb` only because a component's script may run inside a tracking scope.

```js
// Entry.rat.html
const at   = untrack(() => $path);
const from = untrack(() => $source);

// Thumb.rat.html
const id = isImage(entry) ? `${from ?? untrack(() => $folder)?.addedAt}/${at.join('/')}/…` : null;

// tasks.rat.js
const tasks = () => untrack(() => $queue);
```

could be: a component's setup runs untracked by itself, then the views need nothing

```js
// Entry.rat.html
const at   = $path;     // a plain const: read once
const from = $source;
```

what is left (tasks, see 2 and 6) gets a notation or stays.

### 4 async state by hand

`rat` · a request counter so a late answer is dropped, loading and error by hand. `Preview` and `Thumb`
do the same with an `alive` flag.

```js
// state.rat.js
let request = 0;
effect(() => {
  const handle = rootHandle();
  const at     = $path;
  const mine   = ++request;

  $entries = [];
  $loading = Boolean(handle);
  if (!handle) return;

  fs.list(handle, at)
    .then(list => {
      if (mine !== request) return;
      $entries = list;
      requestAnimationFrame(() => { … });
    })
    .catch(error => { if (mine === request) toast.error(error); })
    .finally(() => { if (mine === request) $loading = false; });
});

// after a write: set the path again, so the effect lists again
.then(() => { if (same()) goTo([...at]); })
```

could be: an async computed (a resource) with loading, error and reload, the late answer dropped by itself

```js
export const $listing = resource(() => rootHandle() && fs.list(rootHandle(), $path));

// views
@if ($listing.loading) …
@for (entry of $listing.value) …

// after a write
$listing.reload();
```

### 5 once per change

`rat` · an effect that should run when the folder changes, guarded by hand, the guard reset by hand.

```js
// state.rat.js
let scanned = null;
effect(() => {
  const handle = localRoot();
  const folder = $folder;
  if (!handle || !folder || scanned === folder) return;
  scanned = folder;
  scan.restore(folder).then(() => indexFolder(handle, folder));
});

// closeFolder()
scanned = null;
```

could be: a watch on one value

```js
watch($folder, folder => {
  if (folder && localRoot()) scan.restore(folder).then(() => indexFolder(localRoot(), folder));
});
```

### 6 a signal bridged into a callback

`app` · the task's progress follows `$scanning` through an effect.

```js
// state.rat.js
return run({ … }, ({ progress, signal }) => {
  signal.addEventListener('abort', () => scan.stop());
  const follow = effect(() => { if ($scanning) progress($scanning.files, null); });
  return scan.scan(handle, folder).finally(follow);
});
```

could be: `scan()` takes what `transfer()` already takes

```js
return run({ … }, ({ progress, signal }) => scan.scan(handle, folder, { onProgress: progress, signal }));
```

### 7 the write pattern

`app` · four actions, the same steps: ask, permission, guard, a task in the write lane, list again.

```js
export async function newFolder () {
  const name = await dialogs.prompt({ message: 'Name of the new folder', ok: 'Create', title: 'New folder' });
  if (!name) return;
  const handle = await writable();
  if (!handle) return;
  const at = $path;
  writeTask({ icon: 'lucide:folder-plus', label: `New folder ${name}` }, at, () => fs.mkdir(handle, at, name));
}

export async function deleteEntry (entry) {
  if (!await dialogs.confirm({ … })) return;
  const handle = await writable();
  if (!handle) return;
  const at = entry.path ?? $path;
  $selected = null;
  RAT.app.toggle('context', false);
  writeTask({ icon: 'lucide:trash-2', label: `Delete ${entry.name}` }, at, () => fs.remove(handle, at, entry.name));
}
```

could be: one `write()` asks for permission, runs the task and lists again; the actions keep only what is theirs

```js
export async function newFolder () {
  const name = await dialogs.prompt({ … });
  if (name) write({ icon: 'lucide:folder-plus', label: `New folder ${name}` }, (handle, at) => fs.mkdir(handle, at, name));
}
```

### 8 errors to the toast

**status:** done. an error of an event handler or command is raised with `source: 'handler'`, views and parts let it pass, `<rat-app>` hands it to `RAT.app.on('error', fn)` (files: `toast.error`). a promise nobody awaited and one given to `app.hold()` land there too, an `AbortError` nowhere. the actions in files catch nothing anymore.

`rat` `lib` · every action catches for itself.

```js
.catch(toast.error);
catch (error) { toast.error(error); }
.catch(error => { if (error?.name !== 'AbortError') toast.error(error); done(); });

// Sync.rat.html
const run = work => Promise.resolve().then(work).catch(toast.error);
onclick={() => run(sync.pickFiles)}
```

could be: a failed handler or action ends in one place the app names

```js
// app.rat.html
RAT.app.on('error', toast.error);

// Sync.rat.html
onclick={sync.pickFiles}
```

### 9 abort handling

`app` `quick`

```js
if (signal.aborted) throw new DOMException('scan aborted', 'AbortError');   // three times
if (error?.name !== 'AbortError') …                                          // three times
```

could be: what the platform has, and one check

```js
signal.throwIfAborted();
if (!isAbort(error)) …
```

### 10 dialogs

`lib` · eight calls, the same shape. `ok` is a button label, the name does not say so.

```js
await dialogs.prompt({ message: 'Name of the new folder', ok: 'Create', title: 'New folder' });
await dialogs.confirm({ message: `Delete “${entry.name}”? This removes it from your disk.`, ok: 'Delete', title: 'Delete' });
```

could be: naming open (`yes`/`no`, `accept`/`cancel`, `buttons`), maybe a short form

```js
await dialogs.prompt('New folder', { yes: 'Create' });
await dialogs.confirm(`Delete “${entry.name}”?`, { yes: 'Delete', message: 'This removes it from your disk.' });
```

### 11 the context area

`rat` · seven times by name and a flag.

```js
RAT.app.toggle('context', true);
RAT.app.toggle('context', false);
```

could be: the areas as named handles

```js
const { context } = RAT.app.areas;

context.show();
context.hide();
```

### 12 paths

**status:** started: `Segments`, `Path` (`@rat/types/Path`, one instance per path) and `FileExt` (`@rat/types/FileExt`) exist. files uses `FileExt` in scan.rat.js; the paths of the app are still arrays.

`app` · a path is an array, compared as a string everywhere.

```js
const same = () => at.join('/') === $path.join('/');                // state.rat.js
if (target.join('/') === $path.join('/')) goTo([...target]);        // state.rat.js
const samePath = (a, b) => a.join('/') === b.join('/');             // transfer.rat.js, places.rat.js
export const keyOf = entry => `${(entry.path ?? []).join('/')}/${entry.name}`;
<small>{'/' + entry.path.join('/') + ' · ' + fmt.bytes(entry.size)}</small>
```

could be, a: a path is a string

```js
if (at === $path) $listing.reload();
<small>{'/' + entry.path} · {entry.size |> bytes}</small>
```

could be, b: a small `Path`

```js
if (at.equals($path)) …
if (target.inside(source)) …
```

### 13 counting by category

`app` `lib` · three times the same loop, "mostly" twice.

```js
// state.rat.js factsOf, places.rat.js suggest, scan.rat.js summarize
const counts = {};
for (const entry of files) counts[categoryOf(entry)] = (counts[categoryOf(entry)] ?? 0) + 1;
const mostly = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
… mostly && mostly[1] / files.length >= 0.6 ? … : null
```

could be: one `mostly()` that both use, counting through `Object.groupBy`

```js
const mostly = (files, share = 0.6) => { … };

const facts = { files: files.length, mostly: mostly(files)?.label, … };
```

### 14 tabs

`app` · the clamp twice, the home tab four times.

```js
$tabIndex = Math.min(Math.max(0, $tabState.index ?? 0), $tabs.length - 1),
$tabState = { index: Math.min(Math.max(0, index), list.length - 1), list };

setTabs([{ path: [] }], 0);   // four times
```

could be: with 1 and 2 the tabs are a record that keeps itself in range

```js
export const $tabs = await store.bind('tabs', { index: 0, list: [HOME] });

$tabs.reset();
$tabs.index = position;
```

### 15 ids

`app` `quick`

```js
const id = `task-${Date.now().toString(36)}-${++counter}`;
id : `dav-${Date.now().toString(36)}`,
const id = `custom-${Date.now().toString(36)}`;
```

could be:

```js
const id = crypto.randomUUID();
```

### 16 move with a fallback

`app` `quick` · twice the same try.

```js
// fs.js rename, transfer.rat.js transfer
if (typeof handle.move === 'function') {
  try   { await handle.move(to); return; }
  catch { /* not for this handle: copied below */ }
}
if (kind === 'directory') await copyTree(handle, dir, to);
else await copyFile(handle, dir, to);
await dir.removeEntry(from, { recursive: true });
```

could be: one `move()` in fs.js

```js
await fs.move(handle, targetDir, name);
```

### 17 json through the files mod

`lib` · reading gives a value, writing wants a string.

```js
await files.read(FILE, 'json');
await files.write(FILE, JSON.stringify($connections));
```

could be:

```js
await files.write(FILE, $connections, 'json');
```

### 18 reading inputs

**status:** done: `bind:value` for the pin and the ssid, `event.target.value` elsewhere (aufbau inputs fire `input` and `change` and have `.value`), `RemoteManager` reads its form through `FormData` (they are form-associated).

`app` `rat` · the value out of the event, by hand. the form by `querySelector`.

```js
// Preferences.rat.html, Sync.rat.html
const change = (name, event) => setting(name, event.detail?.value ?? event.target.value);
oninput={event => $pin = event.target.value ?? ''}

// RemoteManager.rat.html
const field = name => form.querySelector(`[name="${name}"]`)?.value ?? '';
await connect({ name: field('name'), password: field('password'), url: field('url'), username: field('username') });
```

could be: `bind:value` (exists: does it work on the aufbau inputs, and on a record field?), and `FormData`

```html
<input-password bind:value={$pin} />
<input-value bind:value={$settings[name]}>…</input-value>
```

```js
await connect(Object.fromEntries(new FormData(event.target)));
```

### 19 the loop index

**status:** the index is no option: rows are kept by identity, their index is the one they were made with (26). the tabs use `positionOf(tab)` at the moment of the click.

`app` `quick` · `indexOf` four times, while `@for` has the index.

```html
@for (tab of $tabs)
  <div class={$tabs.indexOf(tab) === $index ? 'tab active' : 'tab'}>
    <button … onclick={() => switchTab($tabs.indexOf(tab))}>…</button>
```

could be:

```html
@for (tab, index of $tabs)
  <div.tab class:active={index === $tabIndex}>
    <button … onclick={() => switchTab(index)}>…</button>
```

### 20 formatting in markup

`rat` `lib` · `fmt.x(…)` and `' · '` glued in seven views.

```html
<small>{entry.kind === 'file' ? fmt.date(entry.lastModified) + ' · ' + fmt.bytes(entry.size) : 'folder'}</small>
<p.status>{$index.total} files · {fmt.bytes($index.size)} · read {fmt.date($index.scannedAt)}</p.status>
```

```js
const noteOf = task => task.error ?? [stateOf(task), task.endedAt && fmt.date(task.endedAt)].filter(Boolean).join(' · ');
```

could be: pipes in holes, and one helper that drops the empty parts

```html
<small>{entry.lastModified |> date} · {entry.size |> bytes}</small>
```

```js
const noteOf = task => task.error ?? parts(stateOf(task), task.endedAt |> date);
```

### 21 repeated lookups in a loop

`rat` `app` · the same lookup three times in one tile.

```html
@for (item of SORTED)
  <button.tile disabled={!$index?.categories?.[item.id]?.count} …>
    <small>{$index?.categories?.[item.id] ? $index.categories[item.id].count + ' · ' + fmt.bytes($index.categories[item.id].size) : '…'}</small>
```

could be: a binding local to the loop body, or a fragment with the stats as its argument

```html
@for (item of SORTED)
  @let stats = $index?.categories?.[item.id];
  <button.tile disabled={!stats?.count} …>
    <small>{stats ? `${stats.count} · ${stats.size |> bytes}` : '…'}</small>
```

### 22 Context does five things

**status:** done: `Context` only picks, `EntryDetails`, `FileDetails`, `FolderDetails` and `RootDetails` do the rest. the bookmark button is `BookmarkAction`, the dashboard tiles `Tile`.

`app` · one chain: the tasks, the servers, an entry, the open file, the folder.

```html
@if ($sheet === 'tasks') …
@else if ($sheet === 'remotes') …
@else if ($selected) …           <!-- 20 lines -->
@else if ($route === '/preview' && $file) …
@else if ($route === '/library' && rootHandle()) …   <!-- 20 lines -->
@else …
```

could be: a component each, `Context` only picks

```html
@if ($sheet === 'tasks'): <TaskList />
@else if ($sheet === 'remotes'): <RemoteManager />
@else if ($selected): <EntryFacts entry={$selected} />
@else if ($route === '/preview' && $file): <FileFacts file={$file} />
@else if ($route === '/library' && rootHandle()): <FolderFacts />
@else: <IndexFacts />
```

### 23 Sync knows the protocol

**status:** done: `targetOf(device)` and `sameTarget` in sync.rat.js, the view works with targets only.

`app` `quick` · the view normalizes devices itself, the port three times (the module has `PORT`).

```js
// Sync.rat.html
const hostOf   = device => device.ip ?? device.host;
const isChosen = device => Boolean($current) && keyOf($current) === keyOf({ host: hostOf(device), port: device.port ?? 53317 });
$chosen = { alias: device.alias, fingerprint: device.fingerprint ?? '', host: hostOf(device), port: device.port ?? 53317, protocol: device.protocol ?? 'https' };
```

could be: `targetOf(device)` in sync.rat.js

```js
const isChosen = device => sync.sameTarget($current, sync.targetOf(device));
$chosen = sync.targetOf(device);
```

### 24 small ones

`quick`

```js
// config.rat.js: every component by name, while the shared ones are a folder
{ './components/': ['Action', 'Bar', 'Context', … 20 names] },
'../.shared/components/',

// two ways to import the toast (done: all named now)
import toast from '../../.shared/toast.js';     // Sync
import { toast } from '../.shared/toast.js';    // the rest

// state.rat.js: imported, not used
import dom from '@domina/dom';

// Thumb.rat.html: the thumbnail id inline, from five parts
const id = isImage(entry) ? `${from ?? …?.addedAt}/${at.join('/')}/${entry.name}:${entry.size}:${entry.lastModified}` : null;
```

### 25 an imported variant gets .value

**status:** done: an imported `$name` is renamed in the import and read through `$$.imported()`: a signal as before, a reactive variant as itself. `$settings` (a `$Record`) is imported by the views that way. remotes and tasks still export a computed of their lists, they could export the lists now.

`rat` · an imported `$name` is read as a signal (`$x.value`). a `$Table`, `$Dict` … exported from a module
is no signal, so the module that imports it reads `.value` of it. for now `remotes.rat.js` keeps its
`$Table` to itself and exports a computed of it.

```js
// remotes.rat.js
const $rows = $Table(Connection).create(…);

// what the views read: a signal, as every $name another module imports
export const $connections = $rows.toArray();
```

could be: the importer asks at runtime instead of assuming, `$$.read($x)` (a signal's value, a variant as it
is) and `$$.write($x, value)`; or the compiler reads the exporting module's declarations where it has it
(a build, the dev server), and falls back to the runtime check.

## part 3: what the components ask of rat

found while cleaning `dev/apps/files/components`. each is a proposal, not decided.

- [26 the loop index follows the row](#26-the-loop-index-follows-the-row)
- [27 attributes fall through to the root element](#27-attributes-fall-through-to-the-root-element)
- [28 aria booleans](#28-aria-booleans)
- [29 the library's place in the url](#29-the-librarys-place-in-the-url)
- [30 a component's events](#30-a-components-events)
- [31 bind to a field](#31-bind-to-a-field)
- [32 a fixed bug: holes in an attribute string](#32-a-fixed-bug-holes-in-an-attribute-string)

### 26 the loop index follows the row

**status:** done: `@for (item, $index of list)` compiles to `$$.indexed(…)`, the index a signal per row. a plain `index` stays as it was. the tabs use it.

`rat` · `@for (tab, index of $tabs)` compiles to `each(…, item => item, (tab, index) => …)`: rows are kept by
identity, the index is a number from the time the row was made. close the first tab and the second row still
says 1. so the index is only safe in a list that never reorders.

```html
<!-- Tabs.rat.html, now -->
const positionOf = tab => $tabs.indexOf(tab);
<button onclick={() => switchTab(positionOf(tab))}>
```

could be: the index as a signal of the row, read like any `$name`

```html
@for (tab, $index of $tabs)
  <div.tab class:active={$index === $tabIndex}>
    <button onclick={() => switchTab($index)}>
```

### 27 attributes fall through to the root element

`rat` · a small component hands every attribute on by hand, and the ones it forgets are gone.

```html
<!-- Tile.rat.html, Action.rat.html -->
<button.tile type='button' disabled={props.disabled} title={props.title} onclick={props.onclick}>
```

could be: what the component does not read lands on its root element (vue's `$attrs`), or an explicit spread

```html
<button.tile type='button' {...props.rest}>
```

### 28 aria booleans

**status:** done: the compiler wraps an `aria-*` expression in `$$.aria()`, a boolean becomes `"true"` / `"false"`.

`rat` · `aria-pressed`, `aria-selected`, `aria-expanded` want the strings `"true"` and `"false"`, a boolean attribute
would drop `false`. so every one is wrapped.

```html
<button aria-pressed={String($picked)}>
<button role='tab' aria-selected={String(isActive(tab))}>
```

could be: on an `aria-*` attribute a boolean is written as `"true"` / `"false"`

```html
<button aria-pressed={$picked}>
```

### 29 the library's place in the url

`rat` `app` · the path of the library lives in a stored signal, the route is only `/library`. every way into a
folder sets both: `goTo(path)` and `router.go('/library')`. the back button does not go up, a folder can not
be linked.

```js
// Dashboard.rat.html, state.rat.js open(), showInFolder(), openRemote()
goTo(path, null);
RAT.app.router.go('/library');
```

could be: the path in the route, the tabs keep their paths as routes

```js
router.go(`/library/${path.join('/')}`);   // <rat-view route='/library/*'>, router.params the rest
```

### 30 a component's events

`rat` · a component that reports something takes a callback prop and calls it by hand, with `?.` because it may
not be there.

```html
<!-- Searchbar.rat.html -->
const search = event => props.onsearch?.(event.detail.query);

<!-- Library.rat.html -->
<Searchbar … onsearch={search} />
```

could be: a component dispatches an event on its root, the parent listens like on an element

```js
emit('search', query);                     // in the component
<Searchbar on:search={event => …} />       // the same on:… as on an element, with its modifiers
```

### 31 bind to a field

`rat` · `bind:value` takes a signal. a setting is a field of `$settings`, so it is written by hand.

```html
<!-- Preferences.rat.html -->
const change = name => event => setting(name, event.target.value);
<input-value value={$settings[name]} onchange={change(name)}>
```

could be: with the settings a `$Record` (2), a field of a reactive variant can be bound

```html
<input-value bind:value={$settings[name]}>
```

### 32 a fixed bug: holes in an attribute string

`rat` · **fixed**. the syntax has `class="card {size}"`, the generator turned its holes into text: `card size`.
`literal()` took a hole's code for a string, the holes are `{ code }` now (compiler/generate.js).
