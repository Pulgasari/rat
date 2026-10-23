# apps/ebooks

A library **manager + reader** for the EPUB and PDF files already sitting in
folders on your disk. You grant one or more folders with the browser's **File
System Access API**; the app scans them for books, pulls covers and metadata,
and opens each one in an in-app reader that remembers your place.

Nothing is uploaded. What's stored on the device is: the granted folder
*handles*, a small metadata record per book (title, author, a downscaled cover
image) and your reading position — never a copy of the book.

## What it does

- **Add folders** — `showDirectoryPicker()`. One is enough; add several and
  filter between them. Files are read-only and never modified.
- **Two-phase scan** — the shelf appears immediately with filename titles, then
  a bounded background pool (`shared/js/lib/pool.js`) opens a few new or changed
  books at once to read the real title/author and render a cover. Results are
  cached against a size+mtime signature, so a second visit is instant and only
  changed files re-scan.
- **Covers** — extracted from the EPUB package or the PDF's first page,
  downscaled to WebP so a big library stays light in IndexedDB. Books without
  one get a coloured, titled placeholder.
- **Reader**
  - **PDF** — a lazily-rendered continuous column of pages (pdf.js), zoom,
    page jump and an outline. Only pages near the viewport are rasterised.
  - **EPUB** — reflowable rendering (epub.js), paginated or scrolled, with
    adjustable text size, tap/click page edges, chapter contents and a theme
    that follows the app's colours.
- **Remembers your place** — PDF page or EPUB CFI is saved as you read and
  restored next time; a *Continue reading* shelf lists what you had open.
- **Reconnecting** — when the browser won't silently re-grant a stored folder
  handle, *Reconnect* re-requests permission and *Choose folder* re-picks the
  same folder as a reliable fallback. Books are keyed by path, so covers,
  metadata and progress survive the swap.
- **Search & sort** — by title, author, most-recent or date added.

## Files

| file            | what it is |
|-----------------|------------|
| `app.js`             | the library grid + reader chrome on `zugriff.app` (the shared `index.html` shell serves the page) |
| `modules/db.js`      | three `@bunker/db` stores: sources, books, progress; scan + queue |
| `modules/library.js` | title / author / cover extraction (epub.js + pdf.js) |
| `modules/reader.js`  | the two reading engines (PDF continuous canvas, EPUB rendition) |
| `app.css`            | the app's own look |
| `app.config.js` | registry entry + aufbau runtime options |
| `manifest.json` | PWA manifest |
| `sw.js`         | one-liner, pulls in `shared/js/sw-core.js` |
| `app.svg`       | the app icon |

Folder picking, permissions and the recursive walk are shared with the Notes
app via [`shared/js/lib/fsaccess.js`](../../shared/js/lib/fsaccess.js). EPUB and
PDF rendering come from `epubjs` and `pdfjs`, both already in the shared
[`importmap`](../../shared/js/boot.js).

## Browser support

Needs the File System Access API (`window.showDirectoryPicker`) — Chrome, Edge
and other Chromium browsers. The app says so plainly where it isn't available.

### Keeping folders connected (installing)

Folder permission only persists across sessions once the app is **installed as a
PWA** — then the browser grants "Allow on every visit" and the library loads on
return without a reconnect. In a plain tab the permission is dropped at the end
of the session and must be re-granted each visit (by design). The app surfaces
an **Install** button / hint (`shared/js/lib/pwa.js`) while folders are in use
and it isn't installed. See
[Chrome's persistent permissions](https://developer.chrome.com/blog/persistent-permissions-for-the-file-system-access-api).
