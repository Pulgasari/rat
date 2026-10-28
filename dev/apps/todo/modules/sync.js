// todo :: modules/sync.js
// the tasks as one json file in a place the user chose: a granted folder or a
// webdav place. written a moment after a change, read at the start and when the
// app comes back to the front, merged task by task (the newer one wins).
//
//   await sync.connect({ kind: 'folder' });                          // asks for a folder
//   await sync.connect({ kind: 'webdav', url, username, password, path: 'todo.json' });
//   await sync.pull();
//
// the place is kept (settings.rat.js), a folder's handle by RAT.app.folders.

import { effect, signal } from '@rat/signals';

import * as dav   from '../../.shared/webdav/client.js';
import * as store from './store.js';

import { $sync } from '../settings.rat.js';

const FILE = 'todo.json';

const folders = () => RAT.app.folders;

// the granted folder's handle, write access asked for (a click that synced asks the user)
async function folderHandle () {
  const source = folders().sources.value[0];
  const handle = source && folders().handleOf(source.id);
  if (!handle || await handle.requestPermission?.({ mode: 'readwrite' }) === 'denied') throw new Error('No access to the folder, open it again.');
  return handle;
}

export const place  = signal(null);   // { kind, name, … } without secrets for the ui
export const status = signal('');     // '', 'syncing', 'synced', an error message

let target = null;   // the full place, a folder with its live handle
let timer  = null;

// :::::: PLACES ::::::::::::::::::::::::::::::::::::::::::::::

const describe = target => target && ({ kind: target.kind, name: target.kind === 'folder' ? folders().sources.value[0]?.name ?? 'a folder' : `${target.url} ${target.path ?? FILE}` });

async function read () {
  if (target.kind === 'folder') {
    const handle = await folderHandle();
    try   { return await (await (await handle.getFileHandle(FILE)).getFile()).text(); }
    catch { return null; }
  }
  const path = target.path || FILE;
  if (!await dav.stat(target, path)) return null;
  return (await dav.read(target, path)).text();
}

async function write (text) {
  if (target.kind === 'folder') {
    const writable = await (await (await folderHandle()).getFileHandle(FILE, { create: true })).createWritable();
    await writable.write(text);
    return writable.close();
  }
  return dav.write(target, target.path || FILE, text);
}

// :::::: API :::::::::::::::::::::::::::::::::::::::::::::::::

export async function restore () {
  const saved = $sync.value;
  if (!saved) return;
  target      = saved;
  place.value = describe(target);
}

// a folder through the picker of RAT.app.folders, the one there before goes
export async function connect (options) {
  if (options.kind === 'folder') {
    const before = folders().sources.value.map(source => source.id);
    if (!await folders().add()) return false;
    for (const id of before) await folders().remove(id);
    target = { kind: 'folder' };
  }
  else {
    target = { kind: 'webdav', password: options.password ?? '', path: options.path || FILE, url: options.url, username: options.username ?? '' };
    await dav.test(target);
  }
  $sync.value = target;
  place.value = describe(target);
  await pull();
  return true;
}

export async function disconnect () {
  target       = null;
  place.value  = null;
  status.value = '';
  $sync.value  = null;
}

// read the file, merge, write back what this side knows more
export async function pull () {
  if (!target) return;
  status.value = 'syncing';
  try {
    const text = await read();
    if (text) await store.merge(JSON.parse(text));
    await write(JSON.stringify(store.snapshot()));
    status.value = 'synced';
  }
  catch (error) { status.value = error.message; }
}

export async function push () {
  if (!target) return;
  status.value = 'syncing';
  try   { await write(JSON.stringify(store.snapshot())); status.value = 'synced'; }
  catch (error) { status.value = error.message; }
}

// after a local change a short pause, then one write for all of it
export function watch () {
  let first = true;
  effect(() => {
    store.changed.value;
    if (first) { first = false; return; }
    clearTimeout(timer);
    timer = setTimeout(push, 1500);
  });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') pull(); });
}

export default { connect, disconnect, place, pull, push, restore, status, watch };
