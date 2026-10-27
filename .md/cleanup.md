# cleanup

the codebase as it is, step by step towards nice code: every ugly, messy or boilerplate spot gets a remedy
(a util, a library api, compiler sugar, or just better code). per spot: where, what is ugly, what is missing,
a direction. a direction is no decision: each one is discussed before anything changes.

kinds: **rat** (framework, runtime, compiler) · **lib** (bunker, types, aufbau, .shared) · **app** (the app's own code).
**quick** marks a spot that needs no concept.

## files (`dev/apps/files`)

### state and persistence

1. **persistence by hand** · rat/lib
   `state.rat.js` settings and tabs, `places.rat.js` (three values, three effects), `sync.rat.js` (`persist()`
   by hand), `tasks.rat.js` (`write(STORAGE, …)`), `remotes.rat.js` (`files.write(FILE, JSON.stringify(…))`).
   `read`/`write` of `.shared/storage.js` with a hand-made prefix, the `fromEntries(entries(…).map(…))` bridge
   between defaults and keys. `RAT.app.store` exists (named after the app) and is unused.
   direction: a value or object bound to the store, `await RAT.app.store.bind('settings', defaults)`: one key,
   one json value, written on change. later maybe `@stored('settings')` as notation (ideas.md, property wrappers).

2. **objects in signals, changed by copying** · rat/lib
   `setting()` (`{ ...$settings, [name]: value }`), `setTabs`, `places.setType` (copy, delete, assign),
   `transfer.pasted`, `sync.pickSyncFolder` (`{ ...$autoSync, … }`), `tasks.patch` (map over the queue).
   a signal only sees a new object. direction: reactive records and lists (`$Record`, `$List`) as the
   default for object state: `$settings.viewmode = 'grid'`, `$queue.find(…).state = 'running'`.

3. **`untrack(() => $x)`** · rat
   `tasks.rat.js` (two), `state.rat.js` (pattern check, scroll restore), `Entry`, `Thumb`.
   Entry and Thumb need it only because a component's script may run inside a tracking scope: component
   setup should run untracked by itself. the rest: see 4 and 6, what is left gets a notation or stays.

4. **async state by hand** · rat
   the listing effect: a request counter (`request`, `mine`), `$entries = []`, `$loading`, a catch, a
   `finally` that checks the counter again. `Preview` and `Thumb`: an `alive` flag each.
   direction: an async computed (resource) with loading, error, reload and the late answer dropped by
   itself: `const $listing = resource(() => fs.list(rootHandle(), $path))`.

5. **"once per change of x"** · rat
   the index effect guards itself with `scanned` (and `closeFolder` resets it by hand). direction: a watch on
   one value, `watch($folder, folder => …)`, runs when it changes, not when anything inside reads.

6. **a signal bridged into a callback** · app
   `indexFolder`: an effect follows `$scanning` to call `progress()`. `scan()` should take `onProgress`
   like `transfer()` does, `$scanning` stays for the views.

7. **`goTo([...at])` as a refresh** · app
   `writeTask`, `paste`: re-setting the path to list again. with 4 this is `$listing.reload()`.

### actions

8. **the write pattern** · app
   newFolder, renameEntry, deleteEntry, paste: ask, `writable()`, `if (!handle) return`, a task in the write
   lane, list again. direction: one `write(task, (handle, at) => …)` that asks for permission, runs the task
   and lists again; the actions keep the dialog and the work.

9. **errors to the toast** · rat/lib
   `.catch(toast.error)` and `try … catch (error) { toast.error(error) }` all over, `Sync`'s
   `run = work => Promise.resolve().then(work).catch(toast.error)`. direction: a failed event handler or
   action ends in one place the app names (`RAT.app.on('error', toast.error)`), the code just awaits.

10. **abort handling** · app · quick
    `error?.name !== 'AbortError'` (three), `throw new DOMException('… aborted', 'AbortError')` (three).
    the platform has `signal.throwIfAborted()`; one `isAbort(error)` for the checks.

11. **the dialogs' calls** · lib
    `dialogs.prompt({ message, ok, title, value })` eight times, the same shape. naming (`ok` is a button
    label) and maybe a shorter form for the common case. see the question on `ok`.

12. **context area by name** · rat
    `RAT.app.toggle('context', true|false)` seven times. direction: the areas as named handles,
    `const { context } = RAT.app.areas; context.show()`, or `show`/`hide` by name.

### data and paths

13. **paths as arrays, compared as strings** · app
    `a.join('/') === b.join('/')` in state (three), `samePath` in transfer and places, `keyOf`, `where`, the
    thumbnail id, `'/' + path.join('/')` in four views. decide: a path is a string `'a/b'` (compare with
    `===`, `split('/')` where a handle is walked), or a small `Path` with `equals`, `inside`, `toString`.

14. **counting by category, three times** · app/lib
    `factsOf`, `places.suggest`, `scan.summarize`: `counts[x] = (counts[x] ?? 0) + 1`, and "mostly" twice.
    `Object.groupBy` or one `countBy`; one `mostly(entries)` that both use.

15. **tabs** · app
    `Math.min(Math.max(…))` twice, `[{ path: [] }]` four times. with 1 and 2 the tabs are a record that keeps
    itself in range; a `HOME` tab and a `resetTabs()`.

16. **ids** · app · quick
    `task-${Date.now().toString(36)}-${++counter}`, `dav-…`, `custom-…`: `crypto.randomUUID()`.

17. **move with a fallback, twice** · app · quick
    `fs.rename` and `transfer.transfer`: `typeof handle.move === 'function'`, try, else copy and delete. one
    `move()` in fs.js.

18. **json through the files mod** · lib
    `files.write(path, JSON.stringify(value))` in scan and remotes, `files.read(path, 'json')` to read. the
    write side could take a value the way the read side gives one.

### views

19. **reading inputs** · app/rat
    `event.detail?.value ?? event.target.value` (Preferences, Sync), `event.target.value ?? ''` (Sync three
    times), `RemoteManager` reads its form with `querySelector`. `bind:value={$x}` exists; does it work on the
    aufbau inputs, and on a field of a reactive record (`bind:value={$settings[name]}`)? the form: `FormData`.

20. **`$tabs.indexOf(tab)` four times** · app · quick
    `@for (tab, index of $tabs)` exists.

21. **formatting in markup** · rat/lib
    `fmt.bytes(…)`, `fmt.date(…)` and `a + ' · ' + b` in seven views, `noteOf` joins optional parts.
    direction: pipes in holes (`{entry.size |> bytes}`), a `parts(a, b, c)` that drops the empty ones.

22. **`$index?.categories?.[item.id]` three times in one tile** · rat/app
    a binding local to the loop body (`@for (item of SORTED) @let stats = …`), or a fragment with the stats
    as its argument.

23. **`Context` does five things** · app
    one if/else chain: tasks, servers, an entry, the open file, the folder. a component each.

24. **`Sync` knows the protocol** · app · quick
    `53317` three times (the module has `PORT`), `hostOf`, `device.port ?? …`, `protocol ?? 'https'`. a
    `targetOf(device)` in sync.rat.js.

25. **the thumbnail id** · app · quick
    `Thumb` builds it inline from five parts. a function next to `keyOf`.

### config and imports

26. **autoImport lists every component** · app · quick
    `{ './components/': [20 names] }` while `'../.shared/components/'` is a plain folder. check why, else the
    folder.

27. **two ways to import the toast** · lib · quick
    `import toast from` (Sync) and `import { toast } from` (the rest). one.

28. **`import dom from '@domina/dom'` in state.rat.js** · app
    imported, not used yet.
