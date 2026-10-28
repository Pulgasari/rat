// files :: modules/transfer.rat.js

/*
copying and moving inside the granted folder and between it and the servers. the pickboard holds what
was picked to copy or to move (not the system's clipboard, that is RAT.app.clipboard), transfer() puts
it into the folder on screen.

  $pickboard   null, or a $Record { items: $List of { kind, name, path (a Path), root }, mode: 'copy' | 'move', placed }
  pick(mode, entry, path, root)   puts an entry on it, the same mode adds to it
  placed()                        a copy was put somewhere: it stays to put again, the next pick starts anew

a name that is taken in the target gets a number: 'a.txt' -> 'a (2).txt'. a folder can not go into
itself or below itself. a move uses the handle's own move() where it has one and falls back to copy
and delete. files are copied as streams.
*/

// :::::: IMPORT

import { $List, $Record } from '@rat/types';
import { copyFile, copyTree, dirAt } from '../../.shared/fs.js';

// ::::::

export let $pickboard = null;


// :::::: PICKBOARD

export function pick (mode, entry, path, root) {
  if ($pickboard?.mode !== mode || $pickboard.placed) $pickboard = new $Record({ items: new $List, mode, placed: false });
  $pickboard.items.drop({ name: entry.name, path });
  $pickboard.items.push({ kind: entry.kind, name: entry.name, path, root });
}

export const
placed = () => { if ($pickboard) $pickboard.placed = true; },
clear  = () => { $pickboard = null; };

// :::::: NAMES

async function exists (dir, name) {
  try { await dir.getFileHandle      (name); return true; } catch {}
  try { await dir.getDirectoryHandle (name); return true; } catch {}
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

async function handleOf (root, item) {
  const dir = await dirAt(root, item.path);
  return item.kind === 'directory' ? dir.getDirectoryHandle(item.name) : dir.getFileHandle(item.name);
}

// the handle's own move, false where it has none or it fails for this handle
async function moved (handle, targetDir, name) {
  if (typeof handle.move !== 'function') return false;
  try   { await handle.move(targetDir, name); return true; }
  catch { return false; }
}

export async function transfer (root, picked, mode, target, { onProgress = () => {}, signal } = {}) {
  const items = [...picked];
  const into  = items.find(item => item.kind === 'directory' && target.startsWith(item.path.child(item.name)));
  if (into) throw new Error(`“${into.name}” can not go into itself`);

  const targetDir = await dirAt(root, target);
  const handles   = await Promise.all(items.map(item => handleOf(item.root ?? root, item)));
  const counts    = await Promise.all(handles.map(countFiles));
  const total     = counts.reduce((sum, count) => sum + count, 0);

  let done = 0;
  const report = (count = 1) => onProgress(done += count, total);
  onProgress(0, total);

  for (const [position, item] of items.entries()) {
    signal?.throwIfAborted();

    const handle = handles [position];
    const count  = counts  [position];

    // a move within the same folder changes nothing
    if (mode === 'move' && item.path === target) {
      report(count);
      continue;
    }

    const name = await freeName(targetDir, item.name, item.kind);

    if (mode === 'move' && await moved(handle, targetDir, name)) {
      report(count);
      continue;
    }

    if (item.kind === 'directory') await copyTree(handle, targetDir, name, signal, report);
    else {
      await copyFile(handle, targetDir, name, signal);
      report();
    }

    if (mode === 'move') {
      const source = await dirAt(item.root ?? root, item.path);
      await source.removeEntry(item.name, { recursive: true });
    }
  }
}
