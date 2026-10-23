# notes

web: <https://zugriff.dev/notes/>

A Markdown notebook that reads a folder straight off your disk. You grant one
or more folders with the browser's **File System Access API**; each folder is
walked recursively and its **folder structure becomes the outline** in the
menu (a sidebar where there is room, a drawer on phones). Selecting a `.md`
file opens it in the note view.

Nothing is uploaded or copied. The only thing kept in the database is the
directory *handle* — a permission token — so the app can re-open the same
folder next time instead of asking you to pick it again.

## features

- **Open a folder** — `showDirectoryPicker()`. Add several; each is its own
  root in the tree. Your files are never modified.
- **Foldered outline** — the tree mirrors the directory structure exactly.
  Empty branches (no Markdown beneath them) are pruned away.
- **Live rendering** — notes are read on demand and rendered through
  `@aufbau/import`'s Markdown pipeline (`renderMD`). GFM tables, task lists,
  code, blockquotes and a generated *On this page* table of contents.
- **Vault-friendly** — relative images (`![](img/pic.png)`) are resolved back
  against the same granted folder and shown from a blob URL; relative
  `.md` links open the sibling note in-app, so an Obsidian-style vault reads
  as one connected document.
- **Filter** — type to narrow the tree to matching paths.
- **Persistent** — the open note, expanded folders and granted folders survive
  a reload. Coming back re-grants silently when the browser still remembers the
  permission; when it doesn't, *Reconnect* re-requests it, and *Choose folder*
  re-picks the same folder (the picker reopens at the remembered location) — a
  reliable fallback for browsers that won't re-grant a stored handle. The new
  handle replaces the old; open note and expanded folders are keyed by path, so
  nothing is lost.

## Files

| file            | what it is |
|-----------------|------------|
| `index.html`    | static shell — links `../base.css`, `app.css` and the importmap |
| `app.js`        | the app: an `app-root` with start/note views, the tree in a `menu` area, settings in a `config` area |
| `library.js`    | the granted directory handles (folder-library data layer), bound to `app.lib` |
| `app.css`       | the app's own look |
| `app.config.js` | registry entry + aufbau runtime options |
| `manifest.json` | PWA manifest |
| `sw.js`         | one-liner, pulls in `shared/js/sw-core.js` |
| `app.svg`       | the app icon |

The folder-picking, permission handling and recursive walk live in the shared
[`shared/js/lib/fsaccess.js`](../../shared/js/lib/fsaccess.js), which the
eBooks app reuses.

## Browser support

Needs the File System Access API (`window.showDirectoryPicker`) — Chrome, Edge
and other Chromium browsers. The app says so plainly where it isn't available.

### Keeping folders connected (installing)

A folder's permission only persists across sessions once the app is **installed
as a PWA** — then the browser grants "Allow on every visit" and the tree just
loads on return, no reconnect. In a plain tab the permission is dropped when the
tab's session ends and has to be re-granted each visit (by design, for
security). The app shows an **Install** button / hint while folders are open and
it isn't installed; `shared/js/lib/pwa.js` drives it. See
[Chrome's persistent permissions](https://developer.chrome.com/blog/persistent-permissions-for-the-file-system-access-api).
