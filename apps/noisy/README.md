# noisy

the audio files in folders the user grants, by genre, artist, release and track. a test of
rat on an app built with tauri before. it goes to zugriff later.

| file | |
|---|---|
| `library.js` | the folders (`RAT.app.folders`), the tracks (table `tracks`), their tags (music-metadata), covers into the thumbnails |
| `browse.js` | the four panels: what each shows follows what is picked before it. multiselect |
| `player.js` | one audio element, a queue, the media session |
| `components/` | `Panel`, `Cover`, `Menu`, `Player`, `Folders` (in the settings) |

- nothing picked: every genre and artist, no releases, no tracks
- genres picked: their artists. artists picked: their releases. releases picked: their tracks
- a click picks one, ctrl/meta toggles, shift a range, a long press toggles (touch). a pick clears the panels after it
- a click on a track plays the tracks shown from there
- wide: menu, four panels of the same width, player. narrow: menu, tabs, one panel to swipe through, player

## friction

what was more work in rat than it should be, while building this:

1. **no import map entries per app.** music-metadata is imported by its full esm.sh url in `library.js`. `config.rat.js` can not add entries (ebooks has an `imports` key for it that nothing reads, so its `epubjs` and `pdfjs` imports are not mapped).
2. **a dock can not change with the width.** the menu is beside the panels wide and above them narrow, the player beside and below. `<rat-area dock>` is one side, a drawer below the breakpoint. so the layout is a grid of its own in the main area, the app's grid is not used.
3. **a folder index is written again.** granted folders -> a table of files with a size+date signature -> a queue that reads a few files at a time for what is in them. `library.js` is mostly `ebooks/lib.js` with other fields. a mod or helper (files, signature, extract queue, removal) would leave only the extract function to the app.
4. **no selection in `<data-index>`.** picking one, toggling, ranges, the anchor of a range: `browse.js` holds it by hand. `selectable='multiple'` with a change event (and keys: arrows, space, shift) would remove most of it.
5. **`item-size` of `<data-index viewmode='list'>` is no row height.** rows of text only collapse, `.row` sets a min height.
6. **no tabs that swipe.** narrow, the panels are a strip that snaps. which one is in view and moving to one is a behavior and a scroll listener in `app.rat.html`.
7. **nothing persists.** what is picked, the queue and where in a track it was are gone on a reload (ebooks has the same "should persist" notes).
8. **a cover from the thumbnails without a fallback.** `Cover` asks with `requestFile(id, () => null)`: there is no "give me what you have for this id".
9. **two writes to a $Set notify twice.** a pick is `clear()` then `add()`, so `pick` runs in `batch()`. a `replace(values)` on `$Set` would say it at once.
10. **commands live in code, the hotkeys that run them in the config.** `toggle-play`, `next`, `previous` are registered in `app.rat.html`, the keys for them in `config.rat.js`. it works, but the two halves are in two places.

11. **autoImport looks by fetching.** a component of `../.shared/components/` is first asked for in `./components/` as `.rat.html`, `.rat`, `.rat.js`: three 404s in the console for every shared one. the config names this app's own components now. without a build a folder has no listing, so the fix is a list (the names form) or a manifest of the folder.

what was easy: the panels follow the picks through `computed` alone, `let { $time, $queue } = player` in a component, `@gestures={{ onLongPress }}` as a behavior, the config mods (database, folders, thumbnails, hotkeys, offline) as one block.
