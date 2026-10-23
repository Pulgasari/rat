// @rat/bunker :: thumbs

/*
a thumbnail cache on the device: hand it an image url and it returns a small
webp copy from the origin private file system (Files on opfs), made the first
time by fetching the original and downscaling it on a canvas. after that the
original host is not touched again.

  const thumbs = createThumbs({ proxy: 'https://proxy/?url={url}' });
  const url    = await thumbs.request(imageUrl);   // an object url, or null: show the original then
  thumbs.peek(imageUrl);                           // the same, at once, from memory only

  // a file the app already holds (a granted folder, an upload) skips the fetch.
  // the id is the key: size and date in it make an edited image a new thumbnail
  await thumbs.requestFile(`${path}:${file.size}:${file.lastModified}`, () => entry.read('blob'));

to resize a cross-origin image a browser has to read its pixels, which needs
the bytes: a direct fetch is tried first, a host that blocks it (no cors) goes
through proxy from then on. a resizer (url, width => endpoint) that returns a
small image is used instead, when given. inside the capacitor wrapper the bytes
come through its native http plugin, which knows no cors.

options: dir ('thumbs'), width (250), quality (0.8), concurrency (3),
maxBytes (64 mb, the oldest go past it), proxy (a template with {url}, or a
function returning one), resizer.
*/

import { createFiles } from './files.js';

const nativeHttp = () => globalThis.Capacitor?.isNativePlatform?.() ? globalThis.Capacitor.Plugins?.CapacitorHttp ?? null : null;
const fromBase64 = (data, type) => new Blob([Uint8Array.from(atob(data), char => char.charCodeAt(0))], { type });

const canResize = typeof createImageBitmap === 'function' && typeof document !== 'undefined';

// cyrb53, a small stable string hash
function hash (text = '') {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let index = 0; index < text.length; index++) {
    const char = text.charCodeAt(index);
    h1 = Math.imul(h1 ^ char, 2654435761);
    h2 = Math.imul(h2 ^ char, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

// {url} in a proxy template is the encoded source; a template without it gets it appended
function viaProxy (template, url) {
  const text = (template ?? '').trim();
  if (!text) return null;
  const encoded = encodeURIComponent(url);
  return text.includes('{url}') ? text.replaceAll('{url}', encoded) : text + encoded;
}

// at most max at once: a full page of artwork does not open fifty fetches
function limiter (max) {
  let active = 0;
  const queue = [];
  const pump  = () => {
    if (active >= max || !queue.length) return;
    active++;
    const { fn, reject, resolve } = queue.shift();
    Promise.resolve().then(fn).then(resolve, reject).finally(() => { active--; pump(); });
  };
  return fn => new Promise((resolve, reject) => { queue.push({ fn, reject, resolve }); pump(); });
}

function createThumbs ({ concurrency = 3, dir = 'thumbs', maxBytes = 64 * 1024 * 1024, proxy = '', quality = 0.8, resizer = null, width = 250 } = {}) {
  const files    = createFiles({ driver: 'opfs' });
  const native   = nativeHttp();
  const memory   = new Map;   // key -> object url, this session
  const inflight = new Map;   // key -> promise of an object url or null
  const gate     = limiter(concurrency);
  const blocked  = new Set;   // hosts whose direct fetch cors refused: the proxy from then on

  let total = null;   // bytes on disk, read once, then kept up to date

  const keyOf  = id  => `${hash(id)}@${width}.webp`;
  const pathOf = key => `${dir}/${key}`;
  const hostOf = url => { try { return new URL(url).host; } catch { return url; } };

  const entries = async () => {
    await files.mkdir(dir);
    return Promise.all((await files.list(dir)).map(async entry => ({ entry, ...(await entry.info()) })));
  };

  // { blob } of the original, direct, through the proxy or natively, or null
  async function fetchBytes (url) {
    if (native) {
      try {
        const response = await native.request({ method: 'GET', responseType: 'blob', url });
        if (response.status >= 200 && response.status < 300 && typeof response.data === 'string') {
          return { blob: fromBase64(response.data, response.headers?.['Content-Type'] ?? response.headers?.['content-type'] ?? '') };
        }
      }
      catch {}
      return null;
    }

    const host = hostOf(url);
    if (!blocked.has(host)) {
      try {
        const response = await fetch(url, { credentials: 'omit', mode: 'cors' });
        if (response.ok) return { blob: await response.blob() };
      }
      catch { blocked.add(host); }
    }

    const proxied = viaProxy(typeof proxy === 'function' ? proxy() : proxy, url);
    if (!proxied) return null;
    try {
      const response = await fetch(proxied, { credentials: 'omit' });
      if (response.ok) return { blob: await response.blob() };
    }
    catch {}
    return null;
  }

  // a webp no wider than width, a small original kept at its own size; { blob } or { error }
  async function downscale (source) {
    let bitmap;
    try   { bitmap = await createImageBitmap(source); }
    catch { return { error: 'decode' }; }

    const scale  = Math.min(1, width / (bitmap.width || width));
    const canvas = Object.assign(document.createElement('canvas'), {
      height : Math.max(1, Math.round((bitmap.height || 1) * scale)),
      width  : Math.max(1, Math.round((bitmap.width  || 1) * scale)),
    });
    const context = canvas.getContext('2d');
    context.imageSmoothingQuality = 'high';
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();

    const blob = await new Promise(done => canvas.toBlob(done, 'image/webp', quality));
    return blob ? { blob } : { error: 'encode' };
  }

  async function generate (url) {
    const endpoint = native ? null : resizer?.(url, width) || null;
    if (endpoint) {
      try {
        const response = await fetch(endpoint, { credentials: 'omit' });
        if (response.ok) return { blob: await response.blob() };
      }
      catch {}
      return { error: 'resizer' };
    }
    if (!canResize) return { error: 'unsupported' };
    const bytes = await fetchBytes(url);
    return bytes ? downscale(bytes.blob) : { error: 'fetch' };
  }

  // the oldest go once the cache is past maxBytes, down to 90 % of it
  async function store (key, blob) {
    await files.write(pathOf(key), blob);
    total ??= (await entries()).reduce((sum, { size }) => sum + size, 0) - blob.size;
    total += blob.size;
    if (total <= maxBytes) return;

    const all = (await entries()).sort((a, b) => a.modified - b.modified);
    let bytes = all.reduce((sum, { size }) => sum + size, 0);
    for (const { entry, size } of all) {
      if (bytes <= maxBytes * 0.9) break;
      await entry.remove();
      forget(entry.name);
      bytes -= size;
    }
    total = Math.max(0, bytes);
  }

  function forget (key) {
    const url = memory.get(key);
    if (url) URL.revokeObjectURL(url);
    memory.delete(key);
  }

  // a hit from memory or opfs, else make once per key, stored when it worked
  function cached (key, make) {
    if (memory.has(key))   return Promise.resolve(memory.get(key));
    if (inflight.has(key)) return inflight.get(key);

    const job = (async () => {
      const entry = await files.entry(pathOf(key));
      if (entry) {
        const url = URL.createObjectURL(await entry.read('blob'));
        memory.set(key, url);
        return url;
      }
      try {
        const made = await gate(make);
        if (!made || made.error) return null;
        await store(key, made.blob);
        const url = URL.createObjectURL(made.blob);
        memory.set(key, url);
        return url;
      }
      catch (error) {
        console.warn('[bunker] thumbs:', error?.message ?? error);
        return null;
      }
      finally { inflight.delete(key); }
    })();

    inflight.set(key, job);
    return job;
  }

  const thumbs = {
    peek     : url => url ? memory.get(keyOf(url)) ?? null : null,
    peekFile : id  => id  ? memory.get(keyOf(id))  ?? null : null,

    request (url) {
      return url ? cached(keyOf(url), () => generate(url)) : Promise.resolve(null);
    },

    // getFile: the blob (or a promise of it), only called on a miss
    requestFile (id, getFile) {
      return id && canResize ? cached(keyOf(id), async () => downscale(await getFile())) : Promise.resolve(null);
    },

    // generation for a batch, the results ignored
    prewarm (urls = []) {
      for (const url of urls) if (url) thumbs.request(url).catch(() => {});
    },

    // the thumbnails of these urls go (a podcast unsubscribed)
    async evict (urls = []) {
      for (const url of urls.filter(Boolean)) {
        const key   = keyOf(url);
        const entry = await files.entry(pathOf(key));
        if (entry) {
          const size = (await entry.info())?.size ?? 0;
          await entry.remove();
          if (total !== null) total = Math.max(0, total - size);
        }
        forget(key);
      }
    },

    async clear () {
      for (const key of [...memory.keys()]) forget(key);
      if (await files.exists(dir)) await files.remove(dir);
      total = 0;
    },
  };

  return thumbs;
}

// :::::: EXPORT

export { createThumbs };
