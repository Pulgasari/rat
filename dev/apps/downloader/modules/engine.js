// downloader :: modules/engine.js
// the queue. a download waits, runs, and ends done, failed or cancelled; a
// paused one keeps what it has. the bytes go to the opfs as they arrive
// (downloader/data/<id>), a stop or a crash keeps them, the next try asks for
// the rest with Range and If-Range, so a file that changed meanwhile starts over.
//
//   await engine.load();
//   engine.add({ name: 'x', target: 'library', entries: [{ url, name }] });
//   engine.pause(id); engine.resume(id); engine.retry(id); engine.remove(id);
//
// lanes: at most `parallel` downloads at once, at most `perHost` of one host,
// so one slow host does not block the others.
//
// transports: `fetch` streams with progress, cors decides what it reaches.
// `native` (the android app) knows no cors, the body comes in one piece.
// hls playlists: the segments of the best variant, joined into one file.
//
// targets: `library` keeps the file in the opfs, `folder` writes it into the
// granted folder (RAT.app.folders), `webdav` to the webdav place, `save` hands it
// to the browser's own download. off the library the opfs copy goes once it is
// there. the rows and packages are tables of RAT.app.database, the settings
// come from settings.rat.js.

import { computed, signal } from '@rat/signals';

import * as dav    from '../../.shared/webdav/client.js';
import { request } from '../../.shared/http.js';

import { $settings, $webdav } from '../settings.rat.js';

const db = () => RAT.app.database;

// :::::: STATE :::::::::::::::::::::::::::::::::::::::::::::::

export const downloads = signal([]);
export const packages  = signal([]);
export const live      = signal({});   // id -> { speed, eta }, not kept

export const active = computed(() => downloads.value.filter(item => item.state === 'running' || item.state === 'queued'));

export const settings = {
  limit    : () => $settings.limit * 1024,   // kib/s, 0 for none
  parallel : () => $settings.parallel,
  perHost  : () => $settings.perHost,
  retries  : () => $settings.retries,
};

const ENDED       = new Set(['cancelled', 'done', 'failed']);
const FLUSH       = 8 * 1024 * 1024;   // bytes written before the opfs commits them
const controllers = new Map;          // id -> AbortController

const now = () => Date.now();
const uid = () => crypto.randomUUID?.() ?? `${now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const native = () => Boolean(globalThis.Capacitor?.isNativePlatform?.() && globalThis.Capacitor.Plugins?.NativeHttp);

export const hostOf = url => { try { return new URL(url).hostname; } catch { return ''; } };

// :::::: STORE :::::::::::::::::::::::::::::::::::::::::::::::

export const get = id => downloads.peek().find(item => item.id === id) ?? null;

async function put (row) {
  downloads.value = downloads.peek().some(item => item.id === row.id)
    ? downloads.peek().map(item => item.id === row.id ? row : item)
    : [...downloads.peek(), row];
  await db().downloads.set(row.id, row);
  return row;
}

const patch = (id, changes) => { const row = get(id); return row ? put({ ...row, ...changes }) : null; };

// :::::: OPFS ::::::::::::::::::::::::::::::::::::::::::::::::

let dataDir = null;

async function data () {
  if (dataDir) return dataDir;
  const root = await navigator.storage.getDirectory();
  dataDir = await (await root.getDirectoryHandle('downloader', { create: true })).getDirectoryHandle('data', { create: true });
  return dataDir;
}

const handleOf = async id => (await data()).getFileHandle(id, { create: true });

export async function fileOf (id) {
  try   { return await (await (await data()).getFileHandle(id)).getFile(); }
  catch { return null; }
}

const dropData = async id => { try { await (await data()).removeEntry(id); } catch { /* not there */ } };

// :::::: LIMIT AND PROGRESS ::::::::::::::::::::::::::::::::::

// one token bucket for all downloads
const bucket = { tokens: 0, at: now() };

async function throttle (bytes) {
  const limit = settings.limit();
  if (!limit) return;
  const time    = now();
  bucket.tokens = Math.min(limit, bucket.tokens + (time - bucket.at) / 1000 * limit);
  bucket.at     = time;
  bucket.tokens -= bytes;
  if (bucket.tokens < 0) await new Promise(resolve => setTimeout(resolve, -bucket.tokens / limit * 1000));
}

// speed as a moving average, the signal written a few times a second
const meters = new Map;
let   flushTimer = null;

function meter (id, received, total) {
  const time  = now();
  const entry = meters.get(id) ?? { at: time, bytes: received, speed: 0 };
  const span  = time - entry.at;
  if (span >= 500) {
    const current = (received - entry.bytes) / span * 1000;
    entry.speed = entry.speed ? entry.speed * 0.7 + current * 0.3 : current;
    entry.at    = time;
    entry.bytes = received;
  }
  entry.received = received;
  entry.total    = total;
  meters.set(id, entry);

  flushTimer ??= setTimeout(() => {
    flushTimer = null;
    live.value = Object.fromEntries([...meters].map(([key, { received, speed, total }]) => [key, {
      eta      : speed > 0 && total ? (total - received) / speed : null,
      received,
      speed,
      total,
    }]));
  }, 250);
}

// :::::: HTTP ::::::::::::::::::::::::::::::::::::::::::::::::

class HttpError extends Error {
  constructor (response) {
    super(`HTTP ${response.status} ${response.statusText}`.trim());
    this.status     = response.status;
    const after     = response.headers.get('retry-after');
    this.retryAfter = after ? (Number(after) * 1000 || Math.max(0, Date.parse(after) - now())) : null;
  }
}

const fetchFor = (download) => (url, init = {}) => download.transport === 'native' ? request(url, init) : fetch(url, { redirect: 'follow', ...init });

function nameFrom (response) {
  const disposition = response.headers.get('content-disposition') ?? '';
  const named = /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i.exec(disposition);
  return named ? decodeURIComponent(named[1] ?? named[2]) : null;
}

// :::::: TRANSPORTS ::::::::::::::::::::::::::::::::::::::::::

async function writeStream (handle, response, { offset, onChunk, signal }) {
  let writable = await handle.createWritable({ keepExistingData: offset > 0 });
  if (offset > 0) await writable.seek(offset);

  let received = offset;
  let unsaved  = 0;

  // the native transport has no stream, its body is all there
  if (!response.body) {
    const blob = await response.blob();
    await writable.write(blob);
    await writable.close();
    onChunk(received + blob.size, true);
    return received + blob.size;
  }

  const reader = response.body.getReader();
  try {
    for (;;) {
      if (signal.aborted) throw new DOMException('aborted', 'AbortError');
      const { done, value } = await reader.read();
      if (done) break;
      await writable.write(value);
      received += value.length;
      unsaved  += value.length;
      onChunk(received, false);
      await throttle(value.length);

      // the opfs commits on close: now and then, so a crash keeps most of it
      if (unsaved >= FLUSH) {
        await writable.close();
        onChunk(received, true);
        writable = await handle.createWritable({ keepExistingData: true });
        await writable.seek(received);
        unsaved = 0;
      }
    }
  }
  finally {
    reader.releaseLock?.();
    await writable.close().catch(() => {});
  }
  onChunk(received, true);
  return received;
}

async function fetchFile (download, signal) {
  const handle = await handleOf(download.id);
  let offset   = (await handle.getFile()).size;
  const go     = fetchFor(download);

  const headers = {};
  if (offset > 0) {
    headers.Range = `bytes=${offset}-`;
    const validator = download.etag ?? download.lastModified;
    if (validator) headers['If-Range'] = validator;
  }

  const response = await go(download.url, { headers, signal });
  if (response.status === 416 && download.size && offset >= download.size) return;
  if (!response.ok) throw new HttpError(response);

  const partial = response.status === 206;
  if (!partial) offset = 0;   // no ranges, or the file changed: from the start

  const range = /\/(\d+)$/.exec(response.headers.get('content-range') ?? '');
  const total = range ? Number(range[1]) : (Number(response.headers.get('content-length')) || null);

  await patch(download.id, {
    etag         : response.headers.get('etag') ?? download.etag ?? null,
    lastModified : response.headers.get('last-modified') ?? download.lastModified ?? null,
    name         : download.named ? download.name : (nameFrom(response) ?? download.name),
    size         : total ?? download.size ?? null,
    type         : response.headers.get('content-type') ?? download.type ?? null,
  });

  await writeStream(handle, response, {
    offset,
    signal,
    onChunk: (received, save) => {
      meter(download.id, received, total);
      if (save) patch(download.id, { received });
    },
  });
}

// hls: the best variant, its segments in order into one file. a resume goes on
// from the first segment not written
async function fetchHls (download, signal) {
  const go   = fetchFor(download);
  const text = async url => {
    const response = await go(url, { signal });
    if (!response.ok) throw new HttpError(response);
    return response.text();
  };

  let url      = download.url;
  let playlist = await text(url);

  if (playlist.includes('#EXT-X-STREAM-INF')) {
    const lines    = playlist.split(/\r?\n/);
    const variants = lines.flatMap((line, index) => line.startsWith('#EXT-X-STREAM-INF') ? [{ bandwidth: Number(/BANDWIDTH=(\d+)/.exec(line)?.[1] ?? 0), url: lines.slice(index + 1).find(next => next && !next.startsWith('#')) }] : []);
    const best     = variants.filter(variant => variant.url).sort((a, b) => b.bandwidth - a.bandwidth)[0];
    if (!best) throw new Error('no variant in the playlist');
    url      = new URL(best.url, url).href;
    playlist = await text(url);
  }

  const key = /#EXT-X-KEY:METHOD=([A-Z0-9-]+)/.exec(playlist);
  if (key && key[1] !== 'NONE') throw new Error(`an encrypted stream (${key[1]}), not supported`);

  const init     = /#EXT-X-MAP:URI="([^"]+)"/.exec(playlist)?.[1];
  const segments = [
    ...(init ? [init] : []),
    ...playlist.split(/\r?\n/).filter(line => line && !line.startsWith('#')),
  ].map(line => new URL(line, url).href);

  if (!segments.length) throw new Error('no segments in the playlist');

  const handle = await handleOf(download.id);
  const start  = download.segment ?? 0;
  let offset   = start ? (await handle.getFile()).size : 0;
  await patch(download.id, { name: init && download.name.endsWith('.ts') ? download.name.replace(/\.ts$/, '.mp4') : download.name, segments: segments.length });

  for (let index = start; index < segments.length; index++) {
    const response = await go(segments[index], { signal });
    if (!response.ok) throw new HttpError(response);
    offset = await writeStream(handle, response, {
      offset,
      signal,
      onChunk: received => meter(download.id, received, null),
    });
    await patch(download.id, { received: offset, segment: index + 1 });
  }
}

// :::::: CHECK AND DELIVER :::::::::::::::::::::::::::::::::::

const hex = buffer => [...new Uint8Array(buffer)].map(byte => byte.toString(16).padStart(2, '0')).join('');

// sha-1, sha-256, sha-384, sha-512. md5 is not in webcrypto and is skipped
async function check (download) {
  const { algorithm, value } = download.hash ?? {};
  if (!algorithm || !value || !/^SHA-(1|256|384|512)$/i.test(algorithm)) return;
  const file = await fileOf(download.id);
  if (!file) return;
  const digest = hex(await crypto.subtle.digest(algorithm.toUpperCase(), await file.arrayBuffer()));
  if (digest !== value.toLowerCase()) throw new Error(`the ${algorithm} does not match, the file is broken`);
}

// a free name in a folder: x.zip, x (1).zip, …
async function freeName (exists, name) {
  const dot  = name.lastIndexOf('.');
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext  = dot > 0 ? name.slice(dot) : '';
  for (let count = 0; count < 1000; count++) {
    const candidate = count ? `${base} (${count})${ext}` : name;
    if (!await exists(candidate)) return candidate;
  }
  return `${base} ${uid()}${ext}`;
}

export function save (file, name) {
  const url  = URL.createObjectURL(file);
  const link = Object.assign(document.createElement('a'), { download: name, href: url });
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

async function deliver (download) {
  const target = download.target ?? 'library';
  if (target === 'library') return { place: 'library' };

  const file = await fileOf(download.id);
  if (!file) throw new Error('the downloaded file is gone');

  if (target === 'save') {
    save(file, download.name);
    return { place: 'library' };   // kept, the browser's copy is not reachable from here
  }

  if (target === 'folder') {
    const { folders } = RAT.app;
    const source = folders.sources.value[0];
    if (!source) throw new Error('no folder granted, choose one in the settings');
    const root = folders.handleOf(source.id);
    if (!root || await root.requestPermission?.({ mode: 'readwrite' }) === 'denied') throw new Error('no access to the folder, reconnect it in the settings');
    const dir  = download.package && $settings.subfolders ? await root.getDirectoryHandle(packageName(download.package), { create: true }) : root;
    const name = await freeName(async candidate => { try { await dir.getFileHandle(candidate); return true; } catch { return false; } }, download.name);
    const writable = await (await dir.getFileHandle(name, { create: true })).createWritable();
    await writable.write(file);
    await writable.close();
    await dropData(download.id);
    return { name, place: `${root.name}/${dir === root ? '' : dir.name + '/'}${name}` };
  }

  if (target === 'webdav') {
    const place = $webdav.value;
    if (!place) throw new Error('no webdav place, add one in the settings');
    const folder = dav.join(place.path ?? '', download.package && $settings.subfolders ? packageName(download.package) : '');
    if (folder && !await dav.stat(place, folder)) await dav.mkcol(place, folder);
    const name = await freeName(async candidate => Boolean(await dav.stat(place, dav.join(folder, candidate))), download.name);
    await dav.write(place, dav.join(folder, name), file);
    await dropData(download.id);
    return { name, place: `webdav ${dav.join(folder, name)}` };
  }

  throw new Error(`unknown target ${target}`);
}

const packageName = id => (packages.peek().find(item => item.id === id)?.name ?? 'downloads').replace(/[\\/:*?"<>|]+/g, ' ').trim();

// :::::: RUN :::::::::::::::::::::::::::::::::::::::::::::::::

const sleep = (ms, signal) => new Promise((resolve, reject) => {
  const timer = setTimeout(resolve, ms);
  signal?.addEventListener('abort', () => { clearTimeout(timer); reject(new DOMException('aborted', 'AbortError')); }, { once: true });
});

async function run (id) {
  const controller = new AbortController;
  controllers.set(id, controller);
  const { signal } = controller;

  let download = await patch(id, { error: null, started: get(id).started ?? now(), state: 'running' });

  for (let attempt = download.attempts ?? 0; ; attempt++) {
    try {
      download = get(id);
      await (download.kind === 'hls' ? fetchHls(download, signal) : fetchFile(download, signal));
      await check(get(id));
      const delivered = await deliver(get(id));
      await patch(id, { ended: now(), error: null, place: delivered.place, savedAs: delivered.name ?? null, state: 'done' });
      break;
    }
    catch (error) {
      if (error.name === 'AbortError' || signal.aborted) break;   // paused or cancelled, they set the state

      const permanent = error.status && error.status < 500 && error.status !== 408 && error.status !== 429;
      if (permanent || attempt + 1 >= settings.retries()) {
        const cors = error instanceof TypeError && download.transport !== 'native';
        await patch(id, { attempts: attempt + 1, ended: now(), error: cors ? `${error.message}: the host may send no cors headers, the android app reaches it` : error.message, state: 'failed' });
        break;
      }

      // backoff, or what the server asked for
      const wait = error.retryAfter ?? Math.min(60_000, 1000 * 2 ** attempt);
      await patch(id, { attempts: attempt + 1, error: `${error.message}, again in ${Math.round(wait / 1000)} s` });
      try   { await sleep(wait, signal); }
      catch { break; }
    }
  }

  controllers.delete(id);
  meters.delete(id);
  live.value = Object.fromEntries(Object.entries(live.peek()).filter(([key]) => key !== id));
  pump();
}

// start what may start: the oldest queued first, within the lanes
export function pump () {
  const running = downloads.peek().filter(item => item.state === 'running' && controllers.has(item.id));
  const perHost = new Map;
  for (const item of running) perHost.set(hostOf(item.url), (perHost.get(hostOf(item.url)) ?? 0) + 1);

  let free = settings.parallel() - running.length;
  for (const item of downloads.peek().filter(row => row.state === 'queued').sort((a, b) => a.created - b.created)) {
    if (free <= 0) break;
    const host = hostOf(item.url);
    if ((perHost.get(host) ?? 0) >= settings.perHost()) continue;
    perHost.set(host, (perHost.get(host) ?? 0) + 1);
    free--;
    run(item.id);
  }
}

// :::::: API :::::::::::::::::::::::::::::::::::::::::::::::::

export async function load () {
  const [rows, packageRows] = await Promise.all([db().downloads.values(), db().packages.values()]);

  // what was running when the app went away goes on
  const again = rows.filter(row => row.state === 'running').map(row => ({ ...row, state: 'queued' }));
  for (const row of again) await db().downloads.set(row.id, row);

  downloads.value = rows.map(row => again.find(item => item.id === row.id) ?? row);
  packages.value  = packageRows.sort((a, b) => b.created - a.created);
  if ($settings.autostart) pump();
}

// a package and its downloads, queued
export async function add ({ entries, name, target = $settings.target }) {
  const pack = { created: now(), id: uid(), name: name || 'downloads', target };
  packages.value = [pack, ...packages.peek()];
  await db().packages.set(pack.id, pack);

  const transport = native() ? 'native' : 'fetch';
  const rows = entries.map((entry, index) => ({
    attempts  : 0,
    created   : now() + index,
    error     : null,
    hash      : entry.hash ?? null,
    id        : uid(),
    kind      : entry.kind ?? 'file',
    name      : entry.name || 'download',
    named     : Boolean(entry.named),
    package   : pack.id,
    plugin    : entry.plugin ?? null,
    received  : 0,
    size      : entry.size ?? null,
    state     : 'queued',
    target    : entry.target ?? target,
    transport,
    url       : entry.url,
  }));
  downloads.value = [...downloads.peek(), ...rows];
  for (const row of rows) await db().downloads.set(row.id, row);
  pump();
  return pack;
}

function stop (id) {
  controllers.get(id)?.abort();
  controllers.delete(id);
}

export async function pause (id) {
  const row = get(id);
  if (!row || ENDED.has(row.state)) return;
  stop(id);
  await patch(id, { state: 'paused' });
  pump();
}

export async function resume (id) {
  const row = get(id);
  if (!row || row.state !== 'paused') return;
  await patch(id, { state: 'queued' });
  pump();
}

// a failed or cancelled one from where it stopped, a done one anew
export async function retry (id) {
  const row = get(id);
  if (!row) return;
  if (row.state === 'done' || row.state === 'cancelled') await dropData(id);
  await patch(id, {
    attempts : 0,
    ended    : null,
    error    : null,
    received : row.state === 'failed' ? row.received : 0,
    segment  : row.state === 'failed' ? row.segment  : 0,
    state    : 'queued',
  });
  pump();
}

export async function cancel (id) {
  stop(id);
  await dropData(id);
  await patch(id, { ended: now(), received: 0, segment: 0, state: 'cancelled' });
  pump();
}

// gone from the list, its bytes in the opfs too
export async function remove (id) {
  const pack = get(id)?.package;
  stop(id);
  await dropData(id);
  downloads.value = downloads.peek().filter(item => item.id !== id);
  await db().downloads.delete(id);
  if (pack) await prunePackage(pack);
  pump();
}

async function prunePackage (id) {
  if (downloads.peek().some(item => item.package === id)) return;
  packages.value = packages.peek().filter(item => item.id !== id);
  await db().packages.delete(id);
}

const ofPackage = id => downloads.peek().filter(item => item.package === id);

export const pausePackage  = async id => { for (const item of ofPackage(id)) await pause(item.id); };
export const resumePackage = async id => { for (const item of ofPackage(id)) await (item.state === 'failed' ? retry(item.id) : resume(item.id)); };

export async function removePackage (id) {
  for (const item of ofPackage(id)) {
    stop(item.id);
    await dropData(item.id);
    await db().downloads.delete(item.id);
  }
  downloads.value = downloads.peek().filter(item => item.package !== id);
  await prunePackage(id);
  pump();
}

// the ended ones out of the queue, their files stay where they went
export async function clearEnded () {
  const ended = downloads.peek().filter(item => ENDED.has(item.state) && item.state !== 'done');
  for (const item of ended) await remove(item.id);
}

export async function storage () {
  const estimate = await navigator.storage?.estimate?.();
  return estimate ? { quota: estimate.quota, usage: estimate.usage } : null;
}

export default { active, add, cancel, clearEnded, downloads, fileOf, get, live, load, packages, pause, pausePackage, pump, remove, removePackage, resume, resumePackage, retry, save, storage };
