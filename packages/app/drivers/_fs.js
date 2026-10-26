// @rat/app :: drivers :: fs

/*
a file system of a shell as a FileSystemDirectoryHandle, so @rat/bunker's Files (and folders, thumbnails
on top of it) runs on it unchanged. a shell gives the operations, paths are its own:

  list   (path)                -> [{ kind: 'directory' | 'file', name }]
  read   (path)                -> Uint8Array
  write  (path, bytes)         the parent exists
  mkdir  (path)                with the folders on the way
  remove (path, recursive)
  stat   (path)                -> { kind, modified, size } or null

no permission api: Entry reads that as granted. toJSON() keeps kind and path, revive() makes the
handle again (a folder in a database table).
*/

class Handle {
  constructor (fs, path, kind = 'directory') {
    Object.assign(this, { fs, kind, name: path.split('/').filter(Boolean).at(-1) ?? '', path });
  }

  #child (name) { return `${this.path.replace(/\/$/, '')}/${name}`; }

  async #at (name, kind, create) {
    const path = this.#child(name);
    const stat = await this.fs.stat(path);
    if (stat && stat.kind !== kind) throw new DOMException(`${name} is not a ${kind}`, 'TypeMismatchError');
    if (!stat && !create) throw new DOMException(`${name} was not found`, 'NotFoundError');
    if (!stat) kind === 'directory' ? await this.fs.mkdir(path) : await this.fs.write(path, new Uint8Array);
    return new Handle(this.fs, path, kind);
  }

  getDirectoryHandle (name, { create = false } = {}) { return this.#at(name, 'directory', create); }
  getFileHandle      (name, { create = false } = {}) { return this.#at(name, 'file', create); }

  async * values () {
    for (const { kind, name } of await this.fs.list(this.path)) yield new Handle(this.fs, this.#child(name), kind);
  }

  async getFile () {
    const [bytes, stat] = await Promise.all([this.fs.read(this.path), this.fs.stat(this.path)]);
    return new File([bytes], this.name, { lastModified: stat?.modified ?? Date.now() });
  }

  // the parts are kept until close, then written at once
  async createWritable () {
    const parts = [];
    return {
      close : async () => this.fs.write(this.path, new Uint8Array(await new Blob(parts).arrayBuffer())),
      write : async data => { parts.push(data); },
    };
  }

  removeEntry (name, { recursive = false } = {}) { return this.fs.remove(this.#child(name), recursive); }

  async isSameEntry (other) { return other instanceof Handle && other.fs === this.fs && other.path === this.path; }

  toJSON () { return { kind: this.kind, path: this.path }; }
}

const revive = (fs, { kind, path }) => new Handle(fs, path, kind);

// :::::: BASE64, what crosses a bridge as bytes

const CHUNK = 0x8000;

function toBase64 (bytes) {
  if (bytes.toBase64) return bytes.toBase64();
  let binary = '';
  for (let index = 0; index < bytes.length; index += CHUNK) binary += String.fromCharCode(...bytes.subarray(index, index + CHUNK));
  return btoa(binary);
}

const fromBase64 = data => Uint8Array.fromBase64 ? Uint8Array.fromBase64(data) : Uint8Array.from(atob(data), char => char.charCodeAt(0));

// :::::: EXPORT

export { Handle, fromBase64, revive, toBase64 };
