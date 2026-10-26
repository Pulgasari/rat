// files :: modules/root.js

/*
the one folder the user grants, the root of the app. its handle is kept in the database (table root),
a returning visit asks for permission again instead of picking anew. nothing on disk is copied.
picking and keeping a handle are the shell's (@rat/app's folders driver): chromium's picker in the
browser, the system's on android and the desktop, with real paths there.

  folder   { addedAt, handle, name } | null
  perm     'granted' | 'prompt' | 'denied' | null
  ready    true once load() knows the folder
*/

import { driverOf } from '@rat/app/drivers.js';
import { signal }   from '@rat/signals';

const KEY = 'root';

export const folder = signal(null);
export const perm   = signal(null);
export const ready  = signal(false);

const table = () => RAT.app.database.root;

let driver = null;
const folders = async () => driver ??= await driverOf('folders');

// without a permission api (a native root) there is nothing to ask
const ask = async (handle, method, mode) => {
  try   { return handle[method] ? await handle[method]({ mode }) : 'granted'; }
  catch { return 'denied'; }
};

export const supported = () => RAT.platform !== 'web' || typeof globalThis.showDirectoryPicker === 'function';

export async function load () {
  const row = await table().get(KEY);
  if (row) {
    const handle = (await folders()).revive(row.handle);
    folder.value = { addedAt: row.addedAt, handle, name: row.name };
    perm.value   = await ask(handle, 'queryPermission', 'read');
  }
  ready.value = true;
}

// the picker, inside a click. null when cancelled
export async function grant () {
  const { keep, pick } = await folders();
  const handle = await pick({ id: 'files' });
  if (!handle) return null;
  const row = { addedAt: Date.now(), handle: keep(handle), name: handle.name };
  await table().set(KEY, row);
  folder.value = { addedAt: row.addedAt, handle, name: row.name };
  perm.value   = 'granted';
  return folder.value;
}

export async function reconnect () {
  const handle = folder.value?.handle;
  if (!handle) return { granted: false };
  perm.value = await ask(handle, 'requestPermission', 'read');
  return { granted: perm.value === 'granted' };
}

// the handle only, never the files on disk
export async function forget () {
  await table().delete(KEY);
  folder.value = null;
  perm.value   = null;
}

// write access, asked on the click that wants it: the root, or null
export async function writable () {
  const handle = folder.value?.handle;
  if (!handle) return null;
  return await ask(handle, 'requestPermission', 'readwrite') === 'granted' ? handle : null;
}
