// apps/.shared/webdav/handles.js
//
// a webdav connection as file system handles: the same interface a granted
// folder, the opfs and the capacitor shim implement (entries, getDirectoryHandle,
// getFileHandle, removeEntry, getFile, createWritable). so everything written
// against those handles (files/modules/fs.js) works on a server as well.
//
//   const root = davRoot(connection);
//   await list(root, ['photos']);
//
// two additions beyond the standard:
//   peekFile()  size, type and date of a file without downloading it, which
//               list() of files asks for first. a listing stays one PROPFIND
//   move()      a MOVE on the server, within the same connection
//
// a writable collects what is written and PUTs it on close: a file passes
// through memory once.

import * as dav from './client.js';

const notFound = name => new DOMException(`“${name}” not found`, 'NotFoundError');
const mismatch = name => new DOMException(`“${name}” is of the other kind`, 'TypeMismatchError');

class DavHandle {
  constructor (connection, path, name) {
    this.connection = connection;
    this.name       = name;
    this.path       = path;
  }

  async isSameEntry (other) { return other instanceof DavHandle && other.kind === this.kind && other.connection === this.connection && other.path === this.path; }
}

export class DavFileHandle extends DavHandle {
  kind = 'file';

  constructor (connection, path, name, meta = null) {
    super(connection, path, name);
    this.meta = meta;
  }

  peekFile () {
    const { lastModified = 0, mime = '', size = 0 } = this.meta ?? {};
    return { lastModified, name: this.name, size, type: mime };
  }

  async getFile () {
    const blob = await dav.read(this.connection, this.path);
    return new File([blob], this.name, { lastModified: this.meta?.lastModified || Date.now(), type: this.meta?.mime || blob.type });
  }

  async createWritable () {
    const parts = [];
    return {
      abort : async () => { parts.length = 0; },
      close : async () => { await dav.write(this.connection, this.path, new Blob(parts)); },
      write : async data => { parts.push(data?.type === 'write' ? data.data : data); },
    };
  }

  async move (targetDir, name = this.name) {
    if (!(targetDir instanceof DavDirectoryHandle) || targetDir.connection !== this.connection) throw new DOMException('move across connections', 'NotSupportedError');
    const to = dav.join(targetDir.path, name);
    await dav.move(this.connection, this.path, to, false);
    Object.assign(this, { name, path: to });
  }
}

export class DavDirectoryHandle extends DavHandle {
  kind = 'directory';

  async * entries () {
    for (const entry of await dav.list(this.connection, this.path)) {
      yield [entry.name, entry.isDir
        ? new DavDirectoryHandle (this.connection, entry.path, entry.name)
        : new DavFileHandle      (this.connection, entry.path, entry.name, entry)
      ];
    }
  }

  async * keys   () { for await (const     [name] of this.entries()) yield   name; }
  async * values () { for await (const [, handle] of this.entries()) yield handle; }
  [Symbol.asyncIterator] () { return this.entries(); }

  async getDirectoryHandle (name, { create = false } = {}) {
    const path  =       dav.join(this.path, name);
    const found = await dav.stat(this.connection, path);
    if (found && !found.isDir) throw mismatch(name);
    if (!found) {
      if (!create) throw notFound(name);
      await dav.mkcol(this.connection, path);
    }
    return new DavDirectoryHandle(this.connection, path, name);
  }

  async getFileHandle (name, { create = false } = {}) {
    const path  =       dav.join(this.path, name);
    const found = await dav.stat(this.connection, path);
    if (found?.isDir) throw mismatch(name);
    if (!found) {
      if (!create) throw notFound(name);
      await dav.write(this.connection, path, new Blob([]));
    }
    return new DavFileHandle(this.connection, path, name, found);
  }

  async removeEntry (name) {
    const path  =       dav.join(this.path, name);
    const found = await dav.stat(this.connection, path);
    if (!found) throw notFound(name);
    await dav.remove(this.connection, path, found.isDir);   // a collection goes with all it holds
  }

  async move (targetDir, name = this.name) {
    if (!(targetDir instanceof DavDirectoryHandle) || targetDir.connection !== this.connection) throw new DOMException('move across connections', 'NotSupportedError');
    const to = dav.join(targetDir.path, name);
    await dav.move(this.connection, this.path, to, true);
    Object.assign(this, { name, path: to });
  }

  // no grant to ask for: the credentials are the permission
  async queryPermission   () { return 'granted'; }
  async requestPermission () { return 'granted'; }
}

/** the root collection of a connection, named after it */
export const davRoot = connection => new DavDirectoryHandle(connection, '', connection.name || new URL(connection.url).host);
