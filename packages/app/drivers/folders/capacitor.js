// @rat/app :: drivers :: folders, capacitor (android, ios): @capawesome/capacitor-file-picker picks, the
// folder is read through @capacitor/filesystem by its path

import { plugin } from '../_capacitor.js';
import { Handle, revive as handleOf } from '../_fs.js';
import { fsOf } from '../files/capacitor.js';

const FilePicker = () => plugin('FilePicker', '@capawesome/capacitor-file-picker');

const fs = fsOf(null);

export async function pick () {
  try   { const { path } = await (await FilePicker()).pickDirectory(); return path ? new Handle(fs, path) : null; }
  catch (error) { if (/cancel/i.test(error?.message ?? '')) return null; throw error; }
}

export const keep   = handle => handle.toJSON();
export const revive = stored => handleOf(fs, stored);
