# cleanup

the codebase as it is, step by step towards nice code. per spot: the code as it is now, and a direction
it could go. a direction is no decision, each one is discussed first.

`rat` framework, runtime, compiler · `lib` bunker, types, aufbau, .shared · `app` the app's own code ·
`quick` needs no concept

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

// two ways to import the toast
import toast from '../../.shared/toast.js';     // Sync
import { toast } from '../.shared/toast.js';    // the rest

// state.rat.js: imported, not used
import dom from '@domina/dom';

// Thumb.rat.html: the thumbnail id inline, from five parts
const id = isImage(entry) ? `${from ?? …?.addedAt}/${at.join('/')}/${entry.name}:${entry.size}:${entry.lastModified}` : null;
```
