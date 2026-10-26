// files :: modules/fs.js

/*
what the app does with a folder, given its root handle: a browser's FileSystemDirectoryHandle, the one
a native folders driver of @rat/app gives (drivers/_fs.js), or a webdav server's (.shared/webdav). a path is the array of names below the
root, [] the root itself.

  dirAt(root, path)                 the folder handle at path
  list(root, path)                  [{ kind, name, size, lastModified, type }], folders first, by name
  readFile(root, path, name)        a File
  mkdir, remove, rename             a new folder, an entry gone (folders with what is in them), a new name
  copyFile, copyTree                a file, a folder with everything in it, into another folder
*/

const byName = (a, b) => a.kind !== b.kind ? (a.kind === 'directory' ? -1 : 1) : a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });

export async function dirAt (root, path = []) {
  let dir = root;
  for (const name of path) dir = await dir.getDirectoryHandle(name);
  return dir;
}

// the files are read side by side: one after the other takes twice as long in a big folder
export async function list (root, path = []) {
  const dir     = await dirAt(root, path);
  const handles = [];
  for await (const handle of dir.values()) handles.push(handle);

  const rows = await Promise.all(handles.map(async handle => {
    if (handle.kind === 'directory') return { kind: 'directory', name: handle.name };
    const file = handle.peekFile?.() ?? await handle.getFile();   // a server's handle knows it without downloading
    return { kind: 'file', lastModified: file.lastModified, name: handle.name, size: file.size, type: file.type };
  }));

  return rows.sort(byName);
}

export async function readFile (root, path, name) {
  return (await (await dirAt(root, path)).getFileHandle(name)).getFile();
}

export async function mkdir (root, path, name) {
  await (await dirAt(root, path)).getDirectoryHandle(name, { create: true });
}

export async function remove (root, path, name) {
  await (await dirAt(root, path)).removeEntry(name, { recursive: true });
}

// move() where the handle has it, else a copy and a delete
export async function rename (root, path, from, to, kind) {
  const dir    = await dirAt(root, path);
  const handle = kind === 'directory' ? await dir.getDirectoryHandle(from) : await dir.getFileHandle(from);

  if (typeof handle.move === 'function') {
    try   { await handle.move(to); return; }
    catch { /* not for this handle: copied below */ }
  }

  if (kind === 'directory') await copyTree(handle, dir, to);
  else await copyFile(handle, dir, to);
  await dir.removeEntry(from, { recursive: true });
}

// as a stream where the writable is one, a big file never sits in memory. a native driver's writable takes data
export async function copyFile (source, targetDir, name, signal) {
  const file     = await source.getFile();
  const target   = await targetDir.getFileHandle(name, { create: true });
  const writable = await target.createWritable();

  if (typeof WritableStream === 'undefined' || !(writable instanceof WritableStream)) {
    await writable.write(await file.arrayBuffer());
    await writable.close();
    return;
  }

  try   { await file.stream().pipeTo(writable, { signal }); }
  catch (error) { await writable.abort?.().catch(() => {}); throw error; }
}

export async function copyTree (source, targetDir, name, signal, onFile = () => {}) {
  const dir = await targetDir.getDirectoryHandle(name, { create: true });
  for await (const child of source.values()) {
    if (signal?.aborted) throw new DOMException('copy aborted', 'AbortError');
    if (child.kind === 'directory') await copyTree(child, dir, child.name, signal, onFile);
    else { await copyFile(child, dir, child.name, signal); onFile(); }
  }
}
