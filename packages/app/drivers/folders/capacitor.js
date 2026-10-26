// @rat/app :: drivers :: folders, capacitor (android): the storage access framework through rat's Saf plugin.
// the system's folder picker, the grant persisted across restarts. a folder is kept as its uri

import { pickTree, revive as folderOf } from '../_saf.js';

export const pick   = () => pickTree();
export const keep   = handle => handle.toJSON();
export const revive = stored => folderOf(stored);
