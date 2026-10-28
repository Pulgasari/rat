// images :: files.js
//
// the file lists of convert and batch: an entry per dropped image, its preview, its state and, once
// done, its result. a list is a signal of entries, these make and change them
//
//   entry   { error?, file, id, outName?, outUrl?, preview, status: pending | busy | done | error }

import { download, isImageFile } from './tray.rat.js';

export const entriesOf = files => [...files].filter(isImageFile).map(file => ({ file, id: crypto.randomUUID(), preview: URL.createObjectURL(file), status: 'pending' }));

export function release (entry) {
  URL.revokeObjectURL(entry.preview);
  if (entry.outUrl) URL.revokeObjectURL(entry.outUrl);
}

export const patch = (list, id, changes) => list.map(entry => entry.id === id ? { ...entry, ...changes } : entry);

export const downloadAll = list => { for (const entry of list) if (entry.status === 'done') download(entry.outUrl, entry.outName); };

// each pending entry through work (file -> { blob, outName }), the list kept in step by set
export async function runAll (get, set, work, parallel) {
  const one = async entry => {
    set(patch(get(), entry.id, { status: 'busy' }));
    try {
      const { blob, outName } = await work(entry.file);
      set(patch(get(), entry.id, { outName, outUrl: URL.createObjectURL(blob), status: 'done' }));
    }
    catch (error) { set(patch(get(), entry.id, { error: error.message, status: 'error' })); }
  };
  const pending = get().filter(entry => entry.status === 'pending');
  if (parallel) await Promise.all(pending.map(one));
  else for (const entry of pending) await one(entry);
}
