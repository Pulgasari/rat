// @rat/app :: drivers :: folders

import { Handle, revive as handleOf } from '../_fs.js';
import { fs } from '../files/deno.js';

export async function pick () {
  const path = await globalThis.bindings['rat:dialogs.folder']();
  return path ? new Handle(fs, path) : null;
}

export const
keep   = (handle) => handle.toJSON(),
revive = (stored) => handleOf(fs, stored);
