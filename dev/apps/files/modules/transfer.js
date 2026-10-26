// files :: modules/transfer.js

/*
copying and moving inside the granted folder. a clipboard holds what was picked (copy or cut),
transfer() runs it into the folder on screen.

  clipboard   null, or { mode: 'copy' | 'move', items: [{ kind, name, path, root }], pasted }
  pick(mode, entry, path, root)   puts an entry on it, the same mode adds to it

a name that is taken in the target gets a number: 'a.txt' -> 'a (2).txt'. a folder can not go into
itself or below itself. a move uses the handle's own move() where it has one and falls back to copy
and delete. files are copied as streams.
*/

import { signal } from '@rat/signals';

import { copyFile, copyTree, dirAt } from './fs.js';

export const clipboard = signal(null);

const samePath = (a, b) => a.join('/') === b.join('/');
const isInside = (inner, outer) => inner.length >= outer.length && samePath(inner.slice(0, outer.length), outer);

// :::::: CLIPBOARD

// once pasted, a copy stays to paste again, but the next pick starts anew
export function pick (mode, entry, path, root) {
  const item    = { kind: entry.kind, name: entry.name, path: entry.path ?? path, root };
  const current = clipboard.value;
  const known   = current?.mode === mode && !current.pasted ? current.items.filter(other => !(other.name === item.name && samePath(other.path, item.path))) : [];
  clipboard.value = { items: [...known, item], mode };
}

export const pasted = () => { if (clipboard.value) clipboard.value = { ...clipboard.value, pasted: true }; };
export const clear  = () => { clipboard.value = null; };

// :::::: NAMES

async function exists (dir, name) {
  try { await dir.getFileHandle(name);      return true; } catch {}
  try { await dir.getDirectoryHandle(name); return true; } catch {}
  return false;
}

// 'a.txt' -> 'a (2).txt', a folder or a dot file keeps the whole name as its stem
async function freeName (dir, name, kind) {
  if (!await exists(dir, name)) return name;

  const dot  = kind === 'file' ? name.lastIndexOf('.') : -1;
  const stem = dot > 0 ? name.slice(0, dot) : name;
  const ext  = dot > 0 ? name.slice(dot) : '';

  for (let number = 2; ; number++) {
    const candidate = `${stem} (${number})${ext}`;
    if (!await exists(dir, candidate)) return candidate;
  }
}

// :::::: TRANSFER

// the files below a handle, for the progress total
async function countFiles (handle) {
  if (handle.kind === 'file') return 1;
  let count = 0;
  for await (const child of handle.values()) count += await countFiles(child);
  return count;
}

const handleOf = async (root, item) => {
  const dir = await dirAt(root, item.path);
  return item.kind === 'directory' ? dir.getDirectoryHandle(item.name) : dir.getFileHandle(item.name);
};

export async function transfer (root, items, mode, target, { onProgress = () => {}, signal } = {}) {
  for (const item of items) {
    if (item.kind === 'directory' && isInside(target, [...item.path, item.name])) throw new Error(`“${item.name}” can not go into itself`);
  }

  const targetDir = await dirAt(root, target);
  const handles   = await Promise.all(items.map(item => handleOf(item.root ?? root, item)));
  const total     = (await Promise.all(handles.map(countFiles))).reduce((sum, count) => sum + count, 0);
  let   done      = 0;
  const onFile    = () => onProgress(++done, total);
  onProgress(0, total);

  for (const [position, item] of items.entries()) {
    if (signal?.aborted) throw new DOMException('transfer aborted', 'AbortError');

    const handle = handles[position];
    const source = await dirAt(item.root ?? root, item.path);

    // a move within the same folder changes nothing
    if (mode === 'move' && samePath(item.path, target)) { done += await countFiles(handle); onProgress(done, total); continue; }

    const name = await freeName(targetDir, item.name, item.kind);

    if (mode === 'move' && typeof handle.move === 'function') {
      try {
        await handle.move(targetDir, name);
        done += await countFiles(handle);
        onProgress(done, total);
        continue;
      }
      catch { /* not for this handle: copy and delete below */ }
    }

    if (item.kind === 'directory') await copyTree(handle, targetDir, name, signal, onFile);
    else { await copyFile(handle, targetDir, name, signal); onFile(); }

    if (mode === 'move') await source.removeEntry(item.name, { recursive: true });
  }
}
