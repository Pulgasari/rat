// code :: modules/tree.rat.js

/*
what a tree does with its entries, the same for every source: a granted folder, a webdav server and a
github branch are all directory handles. an entry is { handle, id, parent }: id names the source and
the path ('local:<id>/src/app.js'), parent is the folder it lies in.

a cut and a paste stay one move where the source can (a native or a server's move(), one commit on
github), else they copy and delete. copy and paste work across sources. after a change $version bumps:
every open folder lists again.

  entries(dir)        its handles, folders first, by name
  create(kind, dir, id), rename(entry), remove(entry)
  pick(mode, entry)   'copy' or 'cut' into $clipboard, paste(dir, id) puts it there
*/

import { copyFile, copyTree } from '../../.shared/fs.js';

import { closeUnder } from './documents.rat.js';

const { dialogs } = RAT.app;

export let $clipboard = null;   // { entry, mode }
export let $version   = 0;

const changed = () => { $version++; };

const byName = (a, b) => a.kind !== b.kind ? (a.kind === 'directory' ? -1 : 1) : a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });

export async function entries (dir) {
  const handles = [];
  for await (const handle of dir.values()) handles.push(handle);
  return handles.sort(byName);
}

// :::::: NAMES

const valid = name => Boolean(name) && !/[\\/\0]/.test(name) && name !== '.' && name !== '..';

const ask = (title, value = '') => dialogs.prompt({ message: title, ok: 'OK', title, value });

async function taken (dir, name) {
  for await (const handle of dir.values()) if (handle.name === name) return true;
  return false;
}

// name, or another one asked for while it is taken. null when cancelled
async function free (dir, name) {
  while (valid(name) && await taken(dir, name)) name = await ask(`“${name}” exists, another name`, name);
  return valid(name) ? name : null;
}

// :::::: CHANGES

export async function create (kind, dir) {
  const name = await free(dir, await ask(kind === 'directory' ? 'New folder' : 'New file'));
  if (!name) return;
  if (kind === 'directory') await dir.getDirectoryHandle(name, { create: true });
  else await dir.getFileHandle(name, { create: true });
  changed();
}

// move() where the handle has one (a native one takes a folder and a name), else a copy and a delete
async function moveTo ({ handle, parent }, dir, name) {
  try   { await handle.move(dir, name); return; }
  catch { /* no move here: copied below */ }
  if (handle.kind === 'directory') await copyTree(handle, dir, name);
  else await copyFile(handle, dir, name);
  await parent.removeEntry(handle.name, { recursive: true });
}

export async function rename (entry) {
  const name = await ask('Rename', entry.handle.name);
  if (!valid(name) || name === entry.handle.name) return;
  if (!await free(entry.parent, name)) return;
  await moveTo(entry, entry.parent, name);
  closeUnder(entry.id);
  changed();
}

export async function remove (entry) {
  if (!await dialogs.confirm({ message: `Delete “${entry.handle.name}”?`, ok: 'Delete', title: 'Delete' })) return;
  await entry.parent.removeEntry(entry.handle.name, { recursive: true });
  closeUnder(entry.id);
  changed();
}

export const pick = (mode, entry) => { $clipboard = { entry, mode }; };

export async function paste (dir) {
  if (!$clipboard) return;
  const { entry, mode } = $clipboard;
  const name = await free(dir, entry.handle.name);
  if (!name) return;
  if (mode === 'cut') {
    await moveTo(entry, dir, name);
    closeUnder(entry.id);
    $clipboard = null;
  }
  else if (entry.handle.kind === 'directory') await copyTree(entry.handle, dir, name);
  else await copyFile(entry.handle, dir, name);
  changed();
}
