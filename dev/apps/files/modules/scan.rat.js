// files :: modules/scan.rat.js

/*
the whole granted folder, walked in the background: what the dashboard shows (categories, recent
files) and what its search goes through. a walk reads every file's size, type and modification time,
which takes a while in a big folder: the last index is kept in the app's files (RAT.app.files) and
shown at once, a fresh walk replaces it when it is done. one walk at a time, a new one aborts the
running one. dot folders and node_modules are skipped.

  restore(folder)        the stored index of that folder, into index
  scan(root, folder)     walks, then stores and publishes the new index
  search(query, limit)   the indexed files whose name contains the query

  $index      { scannedAt, total, size, categories: { [id]: { count, size } }, recent: [entry], files: [entry] }
  $scanning   null, or { files } while a walk runs
  entry       { name, path: ['a', 'b'], size, lastModified, type }
*/

// :::::: CATEGORIES

export const CATEGORIES = [
  { icon: 'lucide:image',        id: 'images',    label: 'Images'    },
  { icon: 'lucide:music',        id: 'audio',     label: 'Audio'     },
  { icon: 'lucide:film',         id: 'video',     label: 'Videos'    },
  { icon: 'lucide:file-text',    id: 'documents', label: 'Documents' },
  { icon: 'lucide:file-archive', id: 'archives',  label: 'Archives'  },
  { icon: 'lucide:file',         id: 'other',     label: 'Other'     },
];

const DOCUMENTS = /^(pdf|txt|md|rtf|odt|doc|docx|xls|xlsx|ods|ppt|pptx|odp|csv|epub|html?|json|xml)$/;
const ARCHIVES  = /^(zip|rar|7z|tar|gz|bz2|xz|zst)$/;

const extOf = name => { const dot = name.lastIndexOf('.'); return dot > 0 ? name.slice(dot + 1).toLowerCase() : ''; };

// by its mime type and, where that is empty, its extension
export function categoryOf ({ name, type = '' }) {
  const ext = extOf(name);
  if (type.startsWith('image/')) return 'images';
  if (type.startsWith('audio/')) return 'audio';
  if (type.startsWith('video/')) return 'video';
  if (type.startsWith('text/') || DOCUMENTS.test(ext)) return 'documents';
  if (ARCHIVES.test(ext)) return 'archives';
  return 'other';
}

// :::::: STATE

export let $index    = null;
export let $scanning = null;

const { files } = RAT.app;

const RECENT = 24;
const SKIP   = name => name.startsWith('.') || name === 'node_modules';

const pathOf = folder => `index/${folder.addedAt ?? folder.name}.json`;

let running = null;

// :::::: WALK

async function walk (handle, path, found, signal) {
  const dirs  = [];
  const reads = [];

  for await (const child of handle.values()) {
    if (signal.aborted) throw new DOMException('scan aborted', 'AbortError');
    if (SKIP(child.name)) continue;
    if (child.kind === 'directory') dirs.push(child);
    else reads.push(Promise.resolve(child.peekFile?.() ?? child.getFile()).then(
      file => ({ lastModified: file.lastModified, name: child.name, path, size: file.size, type: file.type }),
      ()   => null,   // gone or unreadable meanwhile
    ));
  }

  // the files of one folder side by side, the folders one after the other
  for (const entry of await Promise.all(reads)) if (entry) found.push(entry);
  $scanning = { files: found.length };

  for (const dir of dirs) await walk(dir, [...path, dir.name], found, signal);
}

function summarize (files) {
  const categories = Object.fromEntries(CATEGORIES.map(({ id }) => [id, { count: 0, size: 0 }]));
  let size = 0;

  for (const file of files) {
    const category = categories[categoryOf(file)];
    category.count++;
    category.size += file.size;
    size          += file.size;
  }

  const recent = files.toSorted((a, b) => b.lastModified - a.lastModified).slice(0, RECENT);
  return { categories, files, recent, scannedAt: Date.now(), size, total: files.length };
}

// :::::: API

export async function restore (folder) {
  $index = folder ? await files.read(pathOf(folder), 'json').catch(() => null) : null;
  return $index;
}

export async function scan (root, folder) {
  running?.abort();
  const controller = new AbortController();
  running = controller;

  const found = [];
  $scanning = { files: 0 };

  try {
    await walk(root, [], found, controller.signal);
    $index = summarize(found);
    await files.write(pathOf(folder), JSON.stringify($index));
    return $index;
  }
  catch (error) {
    if (error?.name !== 'AbortError') throw error;
    return null;
  }
  finally {
    if (running === controller) { running = null; $scanning = null; }
  }
}

export const stop = () => running?.abort();

export async function forget (folder) {
  stop();
  $index = null;
  if (folder) await files.remove(pathOf(folder)).catch(() => {});
}

export function search (query, limit = 100) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  const hits = [];
  for (const file of $index?.files ?? []) {
    if (file.name.toLowerCase().includes(needle)) hits.push(file);
    if (hits.length >= limit) break;
  }
  return hits;
}
