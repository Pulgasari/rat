// files :: modules/root.rat.js

/*
the one folder the user grants, the root of the app: the folders mod of @rat/app (RAT.app.folders) with
one source. it keeps the handle, asks for permission again on a returning visit and picks through the
shell (chromium's picker in the browser, the system's on android and the desktop). it reads nothing
itself (scan: false), the app walks the folder (scan.rat.js).

  $folder   { id, name } | null
  $perm     'granted' | 'prompt' | 'denied' | null
  $handle   the folder's directory handle once it is granted, else null
  $ready    true once load() knows the folder
*/

const { folders } = RAT.app;
const { $perms, $ready, $sources } = folders;

export const
$folder = $sources.at(-1) ?? null,
$perm   = $folder ? $perms[$folder.id] ?? null : null,
$handle = $perm === 'granted' ? folders.handleOf($folder.id) : null;

export { $ready };

export const supported = RAT.platform !== 'web' || typeof globalThis.showDirectoryPicker === 'function';

export const load = () => folders.load();

// the picker, inside a click: the new folder replaces the old one. null when cancelled
export async function grant () {
  const before = $sources.map(source => source.id);
  const row    = await folders.add();
  if (row) for (const id of before) await folders.remove(id);
  return row;
}

export async function reconnect () {
  if (!$folder) return { granted: false };
  return folders.reconnect($folder.id);
}

// the handle only, never the files on disk
export async function forget () {
  if ($folder) await folders.remove($folder.id);
}
