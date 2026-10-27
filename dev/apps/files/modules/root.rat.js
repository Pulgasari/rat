// files :: modules/root.rat.js

/*
the one folder the user grants, the root of the app. its handle is kept in the database (table root),
a returning visit asks for permission again instead of picking anew. nothing on disk is copied.
picking and keeping a handle are the shell's (@rat/app's folders driver): chromium's picker in the
browser, the system's on android and the desktop, with real paths there.

  $folder   { addedAt, handle, name } | null
  $perm     'granted' | 'prompt' | 'denied' | null
  $ready    true once load() knows the folder
*/

import { driverOf } from '@rat/app/drivers.js';

const KEY = 'root';

const { database } = RAT.app;
const folders      = await driverOf('folders');

export let $folder = null;
export let $perm   = null;
export let $ready  = false;

// without a permission api (a native root) there is nothing to ask
async function ask (handle, method, mode) {
  try   { return handle[method] ? await handle[method]({ mode }) : 'granted'; }
  catch { return 'denied'; }
}

export const supported = () => RAT.platform !== 'web' || typeof globalThis.showDirectoryPicker === 'function';

export async function load () {
  const row = await database.root.get(KEY);
  if (row) {
    const handle = folders.revive(row.handle);
    $folder = { addedAt: row.addedAt, handle, name: row.name };
    $perm   = await ask(handle, 'queryPermission', 'read');
  }
  $ready = true;
}

// the picker, inside a click. null when cancelled
export async function grant () {
  const handle = await folders.pick({ id: 'files' });
  if (!handle) return null;
  const row = { addedAt: Date.now(), handle: folders.keep(handle), name: handle.name };
  await database.root.set(KEY, row);
  $folder = { addedAt: row.addedAt, handle, name: row.name };
  $perm   = 'granted';
  return $folder;
}

export async function reconnect () {
  if (!$folder) return { granted: false };
  $perm = await ask($folder.handle, 'requestPermission', 'read');
  return { granted: $perm === 'granted' };
}

// the handle only, never the files on disk
export async function forget () {
  await database.root.delete(KEY);
  $folder = null;
  $perm   = null;
}
