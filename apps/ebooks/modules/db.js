// apps/ebooks/db.js
//
// storage for the library. the granted-folder lifecycle (the `sources` store,
// permissions, scanning) is the shared FolderLibrary
// (shared/js/modules/folders.js); this module owns the two app stores it
// scans into:
//
//   books     one record per book file — path, extracted title/author, a cover
//             Blob and a size+mtime signature so we re-extract only when a file
//             actually changes
//   progress  per-book reading position (pdf page or epub cfi) + last-opened
//
// scanning is two-phase: syncSource() lists the files and shows the shelf right
// away with filename titles, then a bounded MetaQueue opens each new or changed
// book to pull real metadata and a cover, updating the grid as each one lands.

import { signal, computed }      from '@aufbau/signals';
import { accept, kindOf, prettyName, extractMeta } from './library.js';
import FolderLibrary, { MetaQueue, syncSource } from '/.shared/js/modules/folders.js';

// the filesystem layer, uniformly via the runtime
const fs = zugriff.fs;

const SEP   = '/';   // key = sourceId + '/' + path; sourceIds are UUIDs, so this never collides
const keyOf = (sourceId, path) => sourceId + SEP + path;

// ── signals ────────────────────────────────────────────────────────────────
// sources / perms / scanning / ready come from the library below; these are the
// book-specific stores mirrored into signals.

export const
books    = signal([]),        // [{ key, sourceId, path, name, kind, title, author, cover, sig, metaDone, pages, addedAt }]
progress = signal({});        // key -> { location, page, pages, percent, updatedAt, lastOpenedAt }

// extraction (unzip / pdf-parse / cover render) is the slow part of a scan, so a
// few books go at once through a bounded gate while the fast listing is already
// on screen. see shared/js/modules/folders.js.
const meta = new MetaQueue(3);
export const pending = meta.pending;   // books still queued for metadata extraction

export const bookByKey  = key => books.value.find(b => b.key === key) ?? null;
export const booksBySource = computed(() => {
  const map = {};
  for (const b of books.value) (map[b.sourceId] ??= []).push(b);
  return map;
});

// ── the library ──────────────────────────────────────────────────────────

const lib = new FolderLibrary({
  db:       'zugriff-ebooks',
  pickerId: 'zugriff-ebooks',
  stores:   { sources: {}, books: {}, progress: {} },

  onLoad: async (db) => {
    const [bookRows, progRows] = await Promise.all([db.getAll('books'), db.getAll('progress')]);
    books.value    = Object.values(bookRows);
    progress.value = progRows;
  },

  scan: async (s, { db }) => {
    const files = fs.flatten(await fs.scanTree(s.handle, { accept }));
    const next  = await syncSource({
      db, store: 'books', sourceId: s.id, files, rows: books.value, keyOf,
      makeRecord: (f, { key, sourceId, sig, prev }) => ({
        key, sourceId, path: f.path, name: f.name, kind: kindOf(f.name),
        title: prettyName(f.name), author: '', cover: prev?.cover ?? null,
        sig, metaDone: false, pages: null, addedAt: prev?.addedAt ?? Date.now(),
      }),
    });
    books.value = next;
    meta.enqueue(next.filter(b => b.sourceId === s.id && !b.metaDone), extractOne);
  },

  cascade: async (id, db) => {
    const doomed = books.value.filter(b => b.sourceId === id).map(b => b.key);
    await db.task('books',    'readwrite', store => { for (const k of doomed) store.delete(k); });
    await db.task('progress', 'readwrite', store => { for (const k of doomed) store.delete(k); });
    books.value = books.value.filter(b => b.sourceId !== id);
    const p = { ...progress.value }; for (const k of doomed) delete p[k]; progress.value = p;
  },
});

export const { sources, perms, scanning, ready } = lib;
export const sourceById = lib.sourceById;

export const load         = lib.load;
export const addFolder    = lib.addFolder;
export const reconnect    = lib.reconnect;
export const repick       = lib.repick;
export const removeFolder = lib.removeFolder;
export const scan         = lib.scan;
export const rescanAll    = lib.rescanAll;

// ── background metadata ──────────────────────────────────────────────────────

async function extractOne (b) {
  const cur = bookByKey(b.key);
  if (!cur || cur.metaDone || cur.sig !== b.sig) return;   // superseded by a rescan

  const source = lib.sourceById(b.sourceId);
  if (!source) return;

  try {
    const handle = await lib.fileHandle(source, b.path);
    const info   = await extractMeta(b.kind, handle);
    const merged = {
      ...cur,
      title  : info.title  || cur.title,
      author : info.author || cur.author,
      cover  : info.cover  ?? cur.cover,
      pages  : info.pages  ?? cur.pages,
      metaDone: true,
    };
    await lib.db.set('books', merged.key, merged);
    books.value = books.value.map(x => x.key === merged.key ? merged : x);
  } catch {
    const merged = { ...cur, metaDone: true };   // don't retry a broken file every load
    await lib.db.set('books', merged.key, merged);
    books.value = books.value.map(x => x.key === merged.key ? merged : x);
  }
}

// ── file access ────────────────────────────────────────────────────────────

/** walk a stored path to its file handle, live from a granted folder root */
export async function fileHandleFor (rootHandle, path) {
  const segs = path.split('/');
  let dir = rootHandle;
  for (const seg of segs.slice(0, -1)) dir = await dir.getDirectoryHandle(seg);
  return dir.getFileHandle(segs.at(-1));
}

/** the live File for a book, opened fresh from disk */
export async function openFile (book) {
  const source = lib.sourceById(book.sourceId);
  if (!source) throw new Error('This book’s folder is no longer open.');
  // opening happens after the click (in an effect), so there's no user gesture
  // to prompt with — if the folder isn't already granted, send them back to
  // reconnect it in the library rather than silently failing to prompt
  if (await fs.queryPermission(source.handle, 'read') !== 'granted') {
    lib.perms.value = { ...lib.perms.value, [source.id]: 'prompt' };
    throw new Error('Reconnect this book’s folder in the library first.');
  }
  return lib.fileAt(source, book.path);
}

// ── progress ─────────────────────────────────────────────────────────────────

export const progressOf = key => progress.value[key] ?? null;

export async function saveProgress (key, patch) {
  const next = { ...progress.value[key], ...patch, updatedAt: Date.now() };
  progress.value = { ...progress.value, [key]: next };
  await lib.db.set('progress', key, next);
  return next;
}

export const markOpened = key => saveProgress(key, { lastOpenedAt: Date.now() });

export async function clearProgress (key) {
  const p = { ...progress.value }; delete p[key]; progress.value = p;
  await lib.db.delete('progress', key);
}
