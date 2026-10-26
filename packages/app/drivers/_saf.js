// @rat/app :: drivers :: saf

/*
a folder of an android device as FileSystemHandles, through rat's own Saf plugin (native/android/
SafPlugin.java): the storage access framework. the picker persists the grant, so a folder stays readable
across restarts. a handle is its content:// uri, every uri the plugin gives is a document inside the
picked tree: children are listed, never built from strings.

no streaming over the bridge: a file is read whole and written on close, as base64. so peekFile() gives
size, type and date without reading (what the listing brought along, else one stat): a listing, an index
or a scan asks for that first.
*/

import { plugin } from './_capacitor.js';
import { fromBase64, toBase64 } from './_fs.js';

const Saf = () => plugin('Saf', "rat's Saf plugin (rat build --target android)");

// 'granted' while the persisted grant holds. a lost one can not be asked for again without the picker
const access = async uri => {
  try   { return (await (await Saf()).hasAccess({ uri })).granted ? 'granted' : 'denied'; }
  catch { return 'denied'; }
};

const MIME = { gif: 'image/gif', jpeg: 'image/jpeg', jpg: 'image/jpeg', json: 'application/json', md: 'text/markdown', mp3: 'audio/mpeg', mp4: 'video/mp4', pdf: 'application/pdf', png: 'image/png', svg: 'image/svg+xml', txt: 'text/plain', webp: 'image/webp' };

const mimeOf = name => MIME[name.slice(name.lastIndexOf('.') + 1).toLowerCase()] ?? '';

class SafHandle {
  constructor (uri, name) { this._uri = uri; this.name = name; }

  async isSameEntry (other) { return other?._uri === this._uri; }
  queryPermission ()   { return access(this._uri); }
  requestPermission () { return access(this._uri); }
}

class SafFile extends SafHandle {
  kind = 'file';

  constructor (uri, name, meta = null) { super(uri, name); this.meta = meta; }

  async peekFile () {
    this.meta ??= await (await Saf()).stat({ uri: this._uri }).catch(() => ({}));
    return { lastModified: this.meta.mtime || 0, name: this.name, size: this.meta.size ?? 0, type: this.meta.mime || mimeOf(this.name) };
  }

  async getFile () {
    const api   = await Saf();
    const stat  = await api.stat({ uri: this._uri }).catch(() => ({}));
    const { data } = await api.read({ uri: this._uri });
    return new File([fromBase64(data ?? '')], this.name, { lastModified: stat.mtime || Date.now(), type: stat.mime || mimeOf(this.name) });
  }

  // the parts are kept until close, then the whole content is replaced
  async createWritable () {
    const parts = [];
    return {
      abort : async () => { parts.length = 0; },
      close : async () => (await Saf()).write({ data: toBase64(new Uint8Array(await new Blob(parts).arrayBuffer())), uri: this._uri }),
      write : async data => { parts.push(data?.type === 'write' ? data.data : data); },
    };
  }
}

class SafFolder extends SafHandle {
  kind = 'directory';

  async #children () {
    const { entries = [] } = await (await Saf()).list({ uri: this._uri });
    return entries.map(entry => ({ kind: entry.type === 'directory' ? 'directory' : 'file', meta: entry, name: entry.name, uri: entry.uri }));
  }

  async * values () {
    for (const child of await this.#children()) yield child.kind === 'directory' ? new SafFolder(child.uri, child.name) : new SafFile(child.uri, child.name, child.meta);
  }

  async * entries () { for await (const handle of this.values()) yield [handle.name, handle]; }
  async * keys    () { for await (const handle of this.values()) yield handle.name; }
  [Symbol.asyncIterator] () { return this.entries(); }

  // { uri, meta } of a child, made when create says so
  async #child (name, kind, create, extra) {
    const found = (await this.#children()).find(child => child.name === name);
    if (found && found.kind !== kind) throw new DOMException(`${name} is not a ${kind}`, 'TypeMismatchError');
    if (found) return found;
    if (!create) throw new DOMException(`${name} was not found`, 'NotFoundError');
    return { meta: null, uri: (await (await Saf()).create({ name, uri: this._uri, ...extra })).uri };
  }

  async getDirectoryHandle (name, { create = false } = {}) { return new SafFolder((await this.#child(name, 'directory', create, { directory: true })).uri, name); }

  // the mime matters: a provider may append the extension it maps a mime to
  async getFileHandle (name, { create = false } = {}) {
    const { meta, uri } = await this.#child(name, 'file', create, { mime: mimeOf(name) || 'application/octet-stream' });
    return new SafFile(uri, name, meta);
  }

  // the provider has no delete that keeps a folder's content: a full folder needs recursive
  async removeEntry (name, { recursive = false } = {}) {
    const found = (await this.#children()).find(child => child.name === name);
    if (!found) throw new DOMException(`${name} was not found`, 'NotFoundError');
    if (found.kind === 'directory' && !recursive) {
      const { entries = [] } = await (await Saf()).list({ uri: found.uri });
      if (entries.length) throw new DOMException(`${name} is not empty`, 'InvalidModificationError');
    }
    await (await Saf()).delete({ uri: found.uri });
  }

  toJSON () { return { name: this.name, uri: this._uri }; }
}

// the name of a tree uri when the provider gives none: its document id, the part after ':'
function nameOf (uri) {
  try   { const last = decodeURIComponent(uri.replace(/\/+$/, '').split('/').pop() || ''); return last.split(':').pop() || last || 'folder'; }
  catch { return 'folder'; }
}

// the picker, the grant persisted. null when cancelled
async function pickTree () {
  try {
    const { name, uri } = await (await Saf()).pickTree();
    return uri ? new SafFolder(uri, name || nameOf(uri)) : null;
  }
  catch (error) {
    if (error?.code === 'CANCELED' || /cancel/i.test(error?.message ?? '')) return null;
    throw error;
  }
}

const revive = stored => new SafFolder(stored.uri, stored.name);

export { SafFile, SafFolder, pickTree, revive };
