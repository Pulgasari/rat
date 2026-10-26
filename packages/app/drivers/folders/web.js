// @rat/app :: drivers :: folders, web: the directory picker, only chromium. a handle is kept as it is,
// indexeddb clones it

export async function pick ({ id } = {}) {
  if (typeof showDirectoryPicker !== 'function') throw new TypeError('[rat] folders: this browser can not open a folder');
  try   { return await showDirectoryPicker({ id, mode: 'read' }); }
  catch (error) { if (error?.name === 'AbortError') return null; throw error; }
}

export const keep   = handle => handle;
export const revive = handle => handle;
