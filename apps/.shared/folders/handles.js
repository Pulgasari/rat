// apps/.shared/folders/handles.js (a copy of zugriff's .shared/js/modules/filesystem/handles.js)
//
// everything you can do given a root FileSystemDirectoryHandle — the shared File
// System Access handle interface that a browser handle, the OPFS root and the
// Capacitor shim (platform.js) all implement alike. so one set of helpers drives
// a folder the user granted off their disk AND the private OPFS; only *where the
// root comes from* differs (platform.pick for a grant, navigator.storage for OPFS).
//
// two path conventions live here, matching how each kind of caller thinks:
//   - the recursive walk (scanTree) uses a forward-slash string path relative to
//     the root, e.g. "journal/2026/entry.md"; the root itself is "".
//   - the tree CRUD (dirAt/list/…) uses an array of segment names, e.g.
//     ['projects', 'src']; the root itself is [].
//
// no picker, no storage, no ui — that is platform.js / FolderLibrary / the apps.

// :::::: PERMISSIONS
// query never prompts; request must run inside a user gesture (transient
// activation), so call it as the FIRST awaited thing in a click handler — an
// intervening await can consume the activation and make the prompt silently
// reject. request already returns 'granted' without a prompt when permission is
// still held, so there is no need to query first.

/** the current permission state without prompting: 'granted' | 'prompt' | 'denied' */
async function queryPermission (handle, mode = 'read') {
  if (!handle?.queryPermission) return 'granted';   // no gate on this platform
  try   { return await handle.queryPermission({ mode }); }
  catch { return 'denied'; }
}

/**
 * request read (or readwrite) access, reporting exactly what happened so a caller
 * can show the real reason a re-grant failed. returns { granted, state?, error? }
 * — `state` is the raw permission string, `error` is set only if the call threw.
 */
async function requestRead (handle, mode = 'read') {
  if (!handle?.requestPermission) return { granted: true, state: 'granted' };
  try {
    const state = await handle.requestPermission({ mode });
    return { granted: state === 'granted', state };
  } catch (error) {
    console.warn('[fs/handles] requestPermission threw:', error);
    return { granted: false, error };
  }
}

/** make sure we may read `handle`, prompting if needed. returns a boolean. */
async function ensurePermission (handle, mode = 'read') {
  return (await requestRead(handle, mode)).granted;
}

// :::::: WALKING (forward-slash string paths)

const extOf = name => {
  const dot = name.lastIndexOf('.');
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : '';
};

const byName = (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });

/**
 * walk `dirHandle` recursively into a tree that mirrors the folder structure.
 * only files for which `accept(name)` is true are kept, and a directory with no
 * accepted file anywhere beneath it is pruned — so the tree is exactly the shape
 * of the content, never an empty scaffold. dot-files and dot-folders are skipped.
 *
 * node shapes:
 *   dir  : { kind:'dir',  name, path, handle, children:[…] }
 *   file : { kind:'file', name, path, ext, handle }
 *
 * children are directories first, then files, each sorted naturally by name.
 */
async function scanTree (dirHandle, { accept = () => true, signal } = {}) {
  const walk = async (handle, prefix) => {
    const dirs = [], files = [];

    for await (const [name, child] of handle.entries()) {
      if (signal?.aborted) throw new DOMException('scan aborted', 'AbortError');
      if (name.startsWith('.')) continue;
      const path = prefix ? `${prefix}/${name}` : name;

      if (child.kind === 'directory') {
        const node = await walk(child, path);
        if (node.children.length) dirs.push(node);
      } else if (accept(name)) {
        files.push({ kind: 'file', name, path, ext: extOf(name), handle: child });
      }
    }

    dirs.sort(byName); files.sort(byName);
    return { kind: 'dir', name: handle.name, path: prefix, handle, children: [...dirs, ...files] };
  };

  return walk(dirHandle, '');
}

/** every file node in a tree, depth-first, as a flat array */
function flatten (node, out = []) {
  if (!node) return out;
  if (node.kind === 'file') out.push(node);
  else for (const child of node.children ?? []) flatten(child, out);
  return out;
}

/** count the file nodes beneath a tree */
const countFiles = node => flatten(node).length;

/**
 * resolve a relative path (as written inside a file, e.g. "../img/cover.png")
 * against the directory that holds `fromPath`, returning the file handle or null.
 * used to load a note's sibling images from the same granted folder.
 */
async function resolveRelative (rootHandle, fromPath, relative) {
  if (!relative || /^([a-z]+:)?\/\//i.test(relative) || relative.startsWith('data:')) return null;

  const base  = fromPath.split('/').slice(0, -1);            // the file's own directory
  const segs  = decodeURI(relative.split(/[?#]/)[0]).split('/');
  const parts = [...base];
  for (const seg of segs) {
    if (!seg || seg === '.') continue;
    if (seg === '..') parts.pop();
    else parts.push(seg);
  }
  if (!parts.length) return null;

  try {
    let dir = rootHandle;
    for (const seg of parts.slice(0, -1)) dir = await dir.getDirectoryHandle(seg);
    return await dir.getFileHandle(parts.at(-1));
  }
  catch { return null; }
}

// :::::: TREE CRUD (array segment paths)
// writes need a writable root — OPFS always is, a granted on-disk folder only when
// it was picked with mode:'readwrite'. the FileExplorer gates its write ui on
// backend.writable, so these are never reached read-only.

/** the directory handle at `path`, walking down from `root` */
async function dirAt (root, path = []) {
  let dir = root;
  for (const name of path) dir = await dir.getDirectoryHandle(name, { create: false });
  return dir;
}

/** the entries in `path`, directories first then files, each sorted by name */
async function list (root, path = []) {
  const dir     = await dirAt(root, path);
  const handles = [];
  for await (const [name, handle] of dir.entries()) handles.push([name, handle]);

  // the files are read side by side, one after the other took twice as long in a big folder
  // peekFile() is the metadata without the content, for handles where reading a
  // file means downloading it (webdav/handles.js)
  const rows = await Promise.all(handles.map(async ([name, handle]) => {
    if (handle.kind === 'directory') return { name, kind: 'directory' };
    const file = handle.peekFile?.() ?? await handle.getFile();
    return { name, kind: 'file', size: file.size, lastModified: file.lastModified, type: file.type };
  }));

  return rows.sort((a, b) =>
    a.kind !== b.kind
      ? (a.kind === 'directory' ? -1 : 1)
      : a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
  );
}

/** true if `name` already exists in `path` (either kind) */
async function exists (root, path, name) {
  const dir = await dirAt(root, path);
  try { await dir.getFileHandle(name);      return true; } catch {}
  try { await dir.getDirectoryHandle(name); return true; } catch {}
  return false;
}

async function mkdir (root, path, name) {
  const dir = await dirAt(root, path);
  await dir.getDirectoryHandle(name, { create: true });
}

/** create an empty file (no-op if it already exists) */
async function touch (root, path, name) {
  const dir = await dirAt(root, path);
  await dir.getFileHandle(name, { create: true });
}

/** write `data` (Blob | ArrayBuffer | string) to a file, creating it */
async function writeFile (root, path, name, data) {
  const dir      = await dirAt(root, path);
  const handle   = await dir.getFileHandle(name, { create: true });
  const writable = await handle.createWritable();
  await writable.write(data);
  await writable.close();
}

/** remove an entry; directories are removed recursively */
async function remove (root, path, name) {
  const dir = await dirAt(root, path);
  await dir.removeEntry(name, { recursive: true });
}

// rename — the handle interface has no move, so a rename is a copy then a delete.
// files copy in one write; directories are walked and rebuilt entry by entry.

async function copyDirInto (srcHandle, dstHandle) {
  for await (const [name, handle] of srcHandle.entries()) {
    if (handle.kind === 'directory') {
      const child = await dstHandle.getDirectoryHandle(name, { create: true });
      await copyDirInto(handle, child);
    } else {
      const file     = await handle.getFile();
      const target   = await dstHandle.getFileHandle(name, { create: true });
      const writable = await target.createWritable();
      await writable.write(await file.arrayBuffer());
      await writable.close();
    }
  }
}

async function rename (root, path, from, to, kind) {
  const dir = await dirAt(root, path);

  if (kind === 'directory') {
    const src = await dir.getDirectoryHandle(from);
    const dst = await dir.getDirectoryHandle(to, { create: true });
    await copyDirInto(src, dst);
  } else {
    const handle   = await dir.getFileHandle(from);
    const file     = await handle.getFile();
    const dst      = await dir.getFileHandle(to, { create: true });
    const writable = await dst.createWritable();
    await writable.write(await file.arrayBuffer());
    await writable.close();
  }

  await dir.removeEntry(from, { recursive: true });
}

/** the File object at path/name */
async function readFile (root, path, name) {
  const dir    = await dirAt(root, path);
  const handle = await dir.getFileHandle(name);
  return handle.getFile();
}

// :::::: EXPORT

export {
  copyDirInto,
  countFiles,
  dirAt,
  ensurePermission,
  exists,
  extOf,
  flatten,
  list,
  mkdir,
  queryPermission,
  readFile,
  remove,
  rename,
  requestRead,
  resolveRelative,
  scanTree,
  touch,
  writeFile,
};
