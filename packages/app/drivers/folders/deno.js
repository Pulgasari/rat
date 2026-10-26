// @rat/app :: drivers :: folders, deno desktop: the system's folder dialog, any folder by its path.
// the deno side is host/deno.js

import { Handle, revive as handleOf } from '../_fs.js';
import { fs } from '../files/deno.js';

export async function pick () {
  const path = await globalThis.bindings['rat:dialogs.folder']();
  return path ? new Handle(fs, path) : null;
}

export const keep   = handle => handle.toJSON();
export const revive = stored => handleOf(fs, stored);
