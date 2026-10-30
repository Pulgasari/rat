// @rat/bunker :: files

/*
a tree of entries. a path says where, an entry is what is handed around: it
holds the handle the platform gave for the file or folder, so it stays pinned
to it and carries its permission. the content is read only when asked for.

  const files = createFiles({ driver: 'opfs' });     // the origin private file system
  const files = await Files.pick({ id: 'notes' });   // a folder the user grants (null when cancelled)
  const files = createFiles({ root: handle });       // any directory handle, a stored one too
  const files = createFiles({ driver: () => root });  // a function giving a directory handle (or a promise of one)

  await files.write('notes/hello.md', '# hello');    // folders on the way are made
  await files.read('notes/hello.md');                // 'text' (default), 'json', 'blob', 'bytes'
  await files.list('notes');                         // [Entry], folders first, by name
  await files.tree('', { accept: name => name.endsWith('.md') });   // { entry, children } without empty folders
  await files.entry('notes/hello.md');               // an Entry or null
  await files.exists(path);  await files.remove(path);

  entry.kind, entry.name, entry.path, entry.handle
  await entry.read('text');  await entry.write(data);  await entry.list();  await entry.remove();
  await entry.slice(0, 1 << 20)                       // a Blob of the first MiB, the rest stays unread
  await entry.info()                                  // { size, modified, type } of a file
  await entry.permission('read')                      // 'granted' | 'prompt' | 'denied', never asks
  await entry.request('read')                         // asks, inside a click

anything shaped like a FileSystemDirectoryHandle works as a root: the native
drivers of @rat/app hand one over a file system of their own.

a handle is structured-clonable: files.root.handle goes into a database table
and makes the same files on the next visit (createFiles({ root })).
*/

const byName = (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
const split  = path => String(path ?? '').split('/').filter(Boolean);

class Entry {
  constructor (files, handle, path) {
    Object.assign(this, { files, handle, kind: handle.kind === 'directory' ? 'folder' : 'file', name: handle.name, path });
  }

  // peekFile(): a handle that has it (a server's, android's) knows this without reading the file
  async info () {
    if (this.kind !== 'file') return null;
    const file = await this.handle.peekFile?.() ?? await this.handle.getFile();
    return { modified: file.lastModified, size: file.size, type: file.type };
  }

  async read (as = 'text') {
    const file = await this.handle.getFile();
    if (as === 'blob')  return file;
    if (as === 'bytes') return new Uint8Array(await file.arrayBuffer());
    if (as === 'json')  return JSON.parse(await file.text());
    return file.text();
  }

  // a range of the file as a Blob: a handle that reads ranges itself (android's) is asked, a File slices lazily
  async slice (start, end) {
    return this.handle.readSlice?.(start, end) ?? (await this.handle.getFile()).slice(start, end);
  }

  async write (data) {
    const writable = await this.handle.createWritable();
    await writable.write(typeof data === 'string' || data instanceof Blob || ArrayBuffer.isView(data) || data instanceof ArrayBuffer ? data : JSON.stringify(data));
    await writable.close();
    this.files.emit({ paths: [this.path], type: 'write' });
    return this;
  }

  list   () { return this.files.list(this.path); }
  remove () { return this.files.remove(this.path); }

  // without a permission api (opfs) there is nothing to ask
  async permission (mode = 'read') {
    try   { return this.handle.queryPermission ? await this.handle.queryPermission({ mode }) : 'granted'; }
    catch { return 'denied'; }
  }

  async request (mode = 'read') {
    try   { return this.handle.requestPermission ? await this.handle.requestPermission({ mode }) : 'granted'; }
    catch { return 'denied'; }
  }
}

class Files {
  #listeners = new Set;
  #root;

  constructor ({ driver = 'opfs', root = null } = {}) {
    this.#root = root ? Promise.resolve(root)
      : typeof driver === 'function' ? Promise.resolve(driver())
      : driver === 'opfs' ? navigator.storage.getDirectory()
      : null;
    if (!this.#root) throw new TypeError(`[bunker] files: no driver "${driver}", 'opfs', a function or a root handle`);
  }

  // a folder the user picks, inside a click. null when they cancel
  static async pick ({ id, mode = 'read', startIn } = {}) {
    if (typeof showDirectoryPicker !== 'function') throw new TypeError('[bunker] this browser can not open a folder');
    try   { return new Files({ root: await showDirectoryPicker({ id, mode, startIn }) }); }
    catch (error) { if (error?.name === 'AbortError') return null; throw error; }
  }

  async root () { return new Entry(this, await this.#root, ''); }

  // the handle at path, folders made on the way when create says so
  async #handle (path, { create = false, kind = 'file' } = {}) {
    const parts = split(path);
    let folder  = await this.#root;
    if (!parts.length) return folder;
    for (const part of parts.slice(0, -1)) folder = await folder.getDirectoryHandle(part, { create });
    const last = parts.at(-1);
    if (kind === 'folder') return folder.getDirectoryHandle(last, { create });
    if (create) return folder.getFileHandle(last, { create });
    try   { return await folder.getFileHandle(last); }
    catch { return folder.getDirectoryHandle(last); }
  }

  async entry (path) {
    try   { return new Entry(this, await this.#handle(path), split(path).join('/')); }
    catch { return null; }
  }

  async exists (path) { return (await this.entry(path)) !== null; }

  async list (path = '') {
    const folder  = await this.#handle(path, { kind: 'folder' });
    const prefix  = split(path).join('/');
    const entries = [];
    for await (const handle of folder.values()) entries.push(new Entry(this, handle, prefix ? `${prefix}/${handle.name}` : handle.name));
    const folders = entries.filter(entry => entry.kind === 'folder').sort(byName);
    return [...folders, ...entries.filter(entry => entry.kind === 'file').sort(byName)];
  }

  // { entry, children } down from path: the accepted files, folders without one left out, dot names skipped
  async tree (path = '', { accept = () => true } = {}) {
    const walk = async entry => {
      const children = [];
      for (const child of await entry.list()) {
        if (child.name.startsWith('.')) continue;
        if (child.kind === 'file') { if (accept(child.name)) children.push({ children: null, entry: child }); continue; }
        const node = await walk(child);
        if (node.children.length) children.push(node);
      }
      return { children, entry };
    };
    return walk(path ? await this.entry(path) : await this.root());
  }

  async read (path, as) {
    const entry = await this.entry(path);
    if (!entry) throw new TypeError(`[bunker] files: no ${path}`);
    return entry.read(as);
  }

  async write (path, data) {
    const handle = await this.#handle(path, { create: true });
    return new Entry(this, handle, split(path).join('/')).write(data);
  }

  async mkdir (path) {
    const handle = await this.#handle(path, { create: true, kind: 'folder' });
    return new Entry(this, handle, split(path).join('/'));
  }

  async remove (path) {
    const parts  = split(path);
    const parent = await this.#handle(parts.slice(0, -1).join('/'), { kind: 'folder' });
    await parent.removeEntry(parts.at(-1), { recursive: true });
    this.emit({ paths: [parts.join('/')], type: 'remove' });
  }

  on (type, fn) {
    if (type !== 'change') throw new TypeError(`[bunker] on(): no event "${type}", only "change"`);
    this.#listeners.add(fn);
    return () => this.#listeners.delete(fn);
  }

  emit (change) { for (const fn of this.#listeners) fn(change); }
}

const createFiles = options => new Files(options);

// :::::: EXPORT

export { Entry, Files, createFiles };
