// apps/.shared/folders/platform.js (a copy of zugriff's .shared/js/modules/filesystem/platform.js)
//
// the one place that knows which platform we run on, so the rest of the fs layer
// does not have to. a zugriff app runs off its https origin either in a plain
// browser or inside the Capacitor wrapper (android). two things genuinely differ:
//
//   1. picking a folder   — showDirectoryPicker() vs the native SAF picker
//   2. persisting a root  — a browser handle is structured-cloneable and round-
//                           trips through IndexedDB as-is; a native handle is not,
//                           so we store a plain { uri } descriptor and rebuild it.
//
// everything else (walking, reading, writing) is the shared File System Access
// *handle interface* — getDirectoryHandle / getFileHandle / entries / values /
// getFile / createWritable / removeEntry / isSameEntry / query+requestPermission /
// .kind / .name. the Capacitor shim below implements that exact interface backed
// by the repo's own native Saf plugin (.github/capacitor/plugins/SafPlugin.java),
// so nothing downstream branches on platform: handles.js / FolderLibrary / the
// apps all speak one interface.
//
// hydrate/dehydrate key off the *value* (is this a cap handle / a { __capfs }
// descriptor?), not off isNative(), so the web path stays a pure identity and
// existing browser records are untouched.

// :::::: THE BRIDGE
//
// the npm @capacitor/* packages are never part of what the webview loads, neither
// the live origin (capacitor-live) nor the staged www/ (capacitor), see the
// build-android-capacitor workflow. what
// *is* there is the bridge Capacitor injects as globalThis.Capacitor, with every
// installed plugin under Capacitor.Plugins. so we reach the plugins through that
// and keep the import map free of capacitor entries.

/** running inside the native Capacitor wrapper (vs a plain browser)? */
const isNative = () => !!globalThis.Capacitor?.isNativePlatform?.();

const plugin = name => {
  const p = globalThis.Capacitor?.Plugins?.[name];
  if (!p) throw new Error(`[fs/platform] the "${name}" Capacitor plugin is not available`);
  return p;
};

// storage access framework: pick, list, read, write, create, delete on content://
// tree uris. @capacitor/filesystem cannot do this, it rejects content:// for
// readdir and every write
const Saf = () => plugin('Saf');

// :::::: base64 <-> binary (the plugin speaks base64 for file bodies)

function b64ToArrayBuffer (b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}

function arrayBufferToB64 (buf) {
  const bytes = new Uint8Array(buf);
  let bin = '';
  const CHUNK = 0x8000;   // avoid "too many arguments" on big files
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
  }
  return btoa(bin);
}

async function toArrayBuffer (data) {
  if (data instanceof ArrayBuffer) return data;
  if (ArrayBuffer.isView(data))    return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  if (data instanceof Blob)        return data.arrayBuffer();
  if (typeof data === 'string')    return new TextEncoder().encode(data).buffer;
  return new Blob([data]).arrayBuffer();
}

// ext -> mime. a lookup table rather than a platform detail, but this is where it
// is needed first (getFile() hands back a typed File) and it is exported because
// FolderLibrary resolves a mime `accept` spec ('image/*') against it. anything
// unlisted is '' — the folder apps sniff their own types.
export const MIME = {
  // text
  txt:'text/plain', md:'text/markdown', markdown:'text/markdown', mdown:'text/markdown',
  mkd:'text/markdown', mdwn:'text/markdown', mdtxt:'text/markdown',
  json:'application/json', html:'text/html', css:'text/css', js:'text/javascript',
  csv:'text/csv', xml:'application/xml',
  // images
  png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg', jfif:'image/jpeg', gif:'image/gif',
  webp:'image/webp', svg:'image/svg+xml', avif:'image/avif', bmp:'image/bmp',
  ico:'image/x-icon', heic:'image/heic', heif:'image/heif', tif:'image/tiff', tiff:'image/tiff',
  // documents
  pdf:'application/pdf', epub:'application/epub+zip',
  // audio
  mp3:'audio/mpeg', m4a:'audio/mp4', aac:'audio/aac', ogg:'audio/ogg', oga:'audio/ogg',
  opus:'audio/opus', flac:'audio/flac', wav:'audio/wav', wma:'audio/x-ms-wma',
  aif:'audio/aiff', aiff:'audio/aiff',
  // video
  mp4:'video/mp4', m4v:'video/x-m4v', webm:'video/webm', mov:'video/quicktime',
  mkv:'video/x-matroska', avi:'video/x-msvideo', ogv:'video/ogg', '3gp':'video/3gpp',
  flv:'video/x-flv', wmv:'video/x-ms-wmv', mpg:'video/mpeg', mpeg:'video/mpeg', ts:'video/mp2t',
};

/** the mime for a filename, or '' when the extension is unknown */
export const mimeOf = name => {
  const dot = name.lastIndexOf('.');
  return dot > 0 ? (MIME[name.slice(dot + 1).toLowerCase()] ?? '') : '';
};

/** every extension matching `pattern` — an exact mime, or a wildcard like 'image/*' */
export const extsForMime = pattern => {
  const want   = String(pattern).toLowerCase();
  const prefix = want.endsWith('/*') ? want.slice(0, -1) : null;
  return Object.keys(MIME).filter(ext => prefix ? MIME[ext].startsWith(prefix) : MIME[ext] === want);
};

// :::::: THE CAPACITOR HANDLE SHIM
//
// android folder grants come from the Storage Access Framework: the Saf plugin
// opens the system folder picker and persists the grant (takePersistableUriPermission),
// so a folder stays readable across restarts. a handle's identity is its content://
// uri, and every uri the plugin returns is a document inside the picked tree, so
// children are listed, never built by string concatenation.

/** 'granted' while the persisted grant holds. a lost one cannot be re-requested without the picker */
async function capPermission (uri) {
  try   { return (await Saf().hasAccess({ uri })).granted ? 'granted' : 'denied'; }
  catch { return 'denied'; }
}

class CapFileHandle {
  kind = 'file';
  constructor (uri, name) { this._uri = uri; this.name = name; }

  /** the live File, read fresh from disk — mirrors FileSystemFileHandle.getFile() */
  async getFile () {
    let mtime = Date.now();
    try { mtime = (await Saf().stat({ uri: this._uri })).mtime || mtime; } catch {}
    const { data } = await Saf().read({ uri: this._uri });   // base64, the bridge carries strings only
    const buf = b64ToArrayBuffer(typeof data === 'string' ? data : '');
    return new File([buf], this.name, { type: mimeOf(this.name), lastModified: mtime });
  }

  /**
   * a writable that buffers writes and flushes once on close, since the bridge has
   * no streaming write. good enough for the small files the apps produce. close()
   * replaces the whole content.
   */
  async createWritable () {
    const uri = this._uri; const chunks = [];
    return {
      async write (data) { chunks.push(await toArrayBuffer(data)); },
      async close () {
        const buf = await new Blob(chunks).arrayBuffer();
        await Saf().write({ uri, data: arrayBufferToB64(buf) });
      },
      async abort () {},
    };
  }

  async isSameEntry (other)  { return other?._uri === this._uri; }
  async queryPermission ()   { return capPermission(this._uri); }
  async requestPermission () { return capPermission(this._uri); }
}

class CapDirHandle {
  kind = 'directory';
  constructor (uri, name) { this._uri = uri; this.name = name; }

  async #children () {
    const { entries = [] } = await Saf().list({ uri: this._uri });
    return entries.map(e => ({ name: e.name, kind: e.type === 'directory' ? 'directory' : 'file', uri: e.uri }));
  }

  async *entries () { for (const c of await this.#children()) yield [c.name, c.kind === 'directory' ? new CapDirHandle(c.uri, c.name) : new CapFileHandle(c.uri, c.name)]; }
  async *keys    () { for (const c of await this.#children()) yield c.name; }
  async *values  () { for await (const [, h] of this.entries()) yield h; }

  async getDirectoryHandle (name, { create = false } = {}) {
    for (const c of await this.#children())
      if (c.name === name && c.kind === 'directory') return new CapDirHandle(c.uri, c.name);
    if (!create) throw new DOMException(`${name} not found`, 'NotFoundError');
    const { uri } = await Saf().create({ uri: this._uri, name, directory: true });
    return new CapDirHandle(uri, name);
  }

  async getFileHandle (name, { create = false } = {}) {
    for (const c of await this.#children())
      if (c.name === name && c.kind === 'file') return new CapFileHandle(c.uri, c.name);
    if (!create) throw new DOMException(`${name} not found`, 'NotFoundError');
    // the mime matters: a provider may append the extension it maps a mime to
    const { uri } = await Saf().create({ uri: this._uri, name, mime: mimeOf(name) || 'application/octet-stream' });
    return new CapFileHandle(uri, name);
  }

  // a folder goes with everything in it, which is what `recursive` asks for; the
  // provider offers no non-recursive delete, so a non-empty folder is refused here
  async removeEntry (name, { recursive = false } = {}) {
    for (const c of await this.#children()) if (c.name === name) {
      if (c.kind === 'directory' && !recursive) {
        const { entries = [] } = await Saf().list({ uri: c.uri });
        if (entries.length) throw new DOMException(`${name} is not empty`, 'InvalidModificationError');
      }
      await Saf().delete({ uri: c.uri });
      return;
    }
    throw new DOMException(`${name} not found`, 'NotFoundError');
  }

  async isSameEntry (other)  { return other?._uri === this._uri; }
  async queryPermission ()   { return capPermission(this._uri); }
  async requestPermission () { return capPermission(this._uri); }
}

// name a tree URI for display when the provider gave no name: decode its last path
// segment, which for a SAF tree URI is the document id (e.g. "primary:Music") —
// take the part after ':'.
function nameFromUri (uri) {
  try {
    const last = decodeURIComponent(uri.replace(/\/+$/, '').split('/').pop() || '');
    const tail = last.split(':').pop();
    return tail || last || 'folder';
  } catch { return 'folder'; }
}

async function capPick () {
  try {
    const { uri, name } = await Saf().pickTree();   // persists the grant
    if (!uri) return null;
    return new CapDirHandle(uri, name || nameFromUri(uri));
  } catch (err) {
    if (err?.code === 'CANCELED' || /cancel/i.test(err?.message || '')) return null;   // normalise user-cancel to null
    throw err;
  }
}

const
isCapRef     = v      => v && typeof v === 'object' && v.__capfs === true,
capHydrate   = ref    => new CapDirHandle(ref.uri, ref.name),
capDehydrate = handle => ({ __capfs: true, uri: handle._uri, name: handle.name });

// :::::: THE PUBLIC SEAM

/** can this platform grant a folder at all? */
function supported () {
  return isNative()
    ? true
    : (typeof window !== 'undefined' && typeof window.showDirectoryPicker === 'function');
}

/**
 * open the folder picker → a live directory handle, or null if cancelled. on the
 * web this is showDirectoryPicker (must run inside a user gesture); on native the
 * SAF picker, which persists the grant so it survives restarts. either way the
 * result satisfies the shared handle interface.
 */
async function pick ({ id, mode = 'read', startIn } = {}) {
  if (isNative()) return capPick();
  if (!supported()) throw new Error('This browser cannot open a folder — try a Chromium-based one.');
  try {
    return await window.showDirectoryPicker({ id, mode, startIn });
  } catch (err) {
    if (err?.name === 'AbortError') return null;   // the user dismissed the picker
    throw err;
  }
}

export const
dehydrate = handle => (handle instanceof CapDirHandle ? capDehydrate(handle) : handle),
hydrate   = ref    => (isCapRef(ref) ? capHydrate(ref) : ref);

export {
  isNative,
  pick as pickDirectory,
  supported,
};
