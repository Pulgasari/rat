// apps/noisy/library.js
//
// the library: the folders the user grants (RAT.app.folders), the audio files found in
// them (table tracks) with what their tags say. a scan shows every file at once under
// its file name, then two queues, a few files at a time:
//   tags   the part of each file with the tags (music-metadata, no covers): the panels fill
//   covers once the tags are all in, that part again, its picture into the thumbnails
// on android the part with the tags only, not the file: every byte crosses the bridge
// as base64. a file is read again only when its size or date changed.

import { parseBlob, parseBuffer } from 'https://esm.sh/music-metadata@11.16.1';

import { effect, signal } from '@rat/signals';

const FRAMES = 1 << 16;   // bytes after the tags: the first frames, for the duration
const HEAD   = 1 << 20;   // bytes read for the tags of a file of another kind
const LIMIT  = 1 << 25;   // tags larger than this (a huge cover) are not read
const QUEUE  = 3;         // files read at once

const db      = () => RAT.app.database;
const folders = () => RAT.app.folders;
const keyOf   = (sourceId, path) => `${sourceId}/${path}`;

const UNKNOWN = { artist: 'Unknown artist', genre: 'Unknown genre', release: 'Unknown release' };

// :::::: STATE

// [{ key, sourceId, path, name, sig, tagged, covered, title, artist, release, genres, year, no, disc, duration, cover }]
export const tracks  = signal([]);
export const pending = signal(0);   // files still waiting for their tags

export const trackByKey = key => tracks.value.find(track => track.key === key) ?? null;

// :::::: LOAD

export async function load () {
  tracks.value = await db().tracks.values();
  await folders().load();
}

// a folder whose tree changed is synced into the tracks, once per tree
const synced = new Map;   // source id -> the tree last synced

effect(() => {
  for (const [id, tree] of Object.entries(folders().trees.value)) {
    if (synced.get(id) === tree) continue;
    synced.set(id, tree);
    sync(id, tree);
  }
});

const filesOf = node => !node ? [] : node.kind === 'file' ? [node] : (node.children ?? []).flatMap(filesOf);

const titleOf = name => name.replace(/\.[^.]+$/, '').replace(/[_]+/g, ' ').replace(/\s+/g, ' ').trim();

async function sync (sourceId, tree) {
  const known = new Map(tracks.value.filter(track => track.sourceId === sourceId).map(track => [track.key, track]));

  const next = await Promise.all(filesOf(tree).map(async node => {
    const key  = keyOf(sourceId, node.path);
    const info = await node.entry.info();
    const sig  = `${info?.size}:${info?.modified}`;
    const prev = known.get(key);
    if (prev?.sig === sig) return prev;
    return {
      artist   : UNKNOWN.artist,
      cover    : null,
      covered  : false,
      disc     : null,
      duration : null,
      genres   : [UNKNOWN.genre],
      key,
      name     : node.name,
      no       : null,
      path     : node.path,
      release  : UNKNOWN.release,
      sig,
      sourceId,
      tagged   : false,
      title    : titleOf(node.name),
      year     : null,
    };
  }));

  const gone    = [...known.keys()].filter(key => !next.some(track => track.key === key));
  const changed = next.filter(track => known.get(track.key) !== track);
  await Promise.all([...gone.map(key => db().tracks.delete(key)), ...changed.map(track => db().tracks.set(track.key, track))]);

  tracks.value = [...tracks.value.filter(track => track.sourceId !== sourceId), ...next];
  enqueue(next);
}

// :::::: TAGS AND COVERS, a few files at a time

// what a file read gave, into tracks once per frame: one signal write for many files, not one each
const done  = new Map;   // key -> track
let   flush = null;

function settle (track) {
  done.set(track.key, track);
  flush ??= requestAnimationFrame(() => {
    flush = null;
    const merged = new Map(done);
    done.clear();
    tracks.value = tracks.value.map(other => merged.get(other.key)?.sig === other.sig ? merged.get(other.key) : other);
  });
}

// the tags first: the covers wait until no file waits for its tags
const tagging  = [];
const covering = [];
let   running  = 0;

function enqueue (list) {
  tagging.push(...list.filter(track => !track.tagged));
  covering.push(...list.filter(track => track.tagged && track.covered === false));   // an earlier load stopped in between
  pump();
}

function pump () {
  pending.value = tagging.length + running;
  while (running < QUEUE && (tagging.length || covering.length)) {
    const [job, track] = tagging.length ? [tag, tagging.shift()] : [cover, covering.shift()];
    running++;
    job(track).finally(() => { running--; pump(); });
  }
}

// a rescan came first, or the track is gone
const stale = track => {
  const current = done.get(track.key) ?? trackByKey(track.key);
  return !current || current.sig !== track.sig ? null : current;
};

const bytesOf = async (entry, start, end) => new Uint8Array(await (await entry.slice(start, end)).arrayBuffer());

const ascii = bytes => String.fromCharCode(...bytes);
const u32le = (bytes, at) => (bytes[at] | bytes[at + 1] << 8 | bytes[at + 2] << 16 | bytes[at + 3] << 24) >>> 0;

// the chunks of a wav that are not its samples, as a wav of their own: tags may come after the samples
// (LIST INFO, id3), so they are fetched where they are. the duration out of fmt and the size of data
const WAV_KEEP = new Set(['fmt ', 'LIST', 'id3 ', 'ID3 ']);

async function wavOf (entry, size) {
  const parts = [];
  let samples = 0, rate = 0;
  for (let at = 12; at + 8 <= size;) {
    const head = await bytesOf(entry, at, at + 8);
    const id   = ascii(head.subarray(0, 4));
    const length = u32le(head, 4);
    if (id === 'data') samples = length;
    else if (WAV_KEEP.has(id) && length <= LIMIT) {
      const body = await bytesOf(entry, at + 8, at + 8 + length + (length & 1));
      if (id === 'fmt ') rate = u32le(body, 8);   // bytes per second
      parts.push(head, body);
    }
    at += 8 + length + (length & 1);
  }
  const total = parts.reduce((sum, part) => sum + part.length, 0) + 12 + 8;
  const bytes = new Uint8Array(total);
  const view  = new DataView(bytes.buffer);
  bytes.set([...'RIFF'].map(char => char.charCodeAt(0)), 0);
  view.setUint32(4, total - 8, true);
  bytes.set([...'WAVE'].map(char => char.charCodeAt(0)), 8);
  let at = 12;
  for (const part of parts) { bytes.set(part, at); at += part.length; }
  bytes.set([...'data'].map(char => char.charCodeAt(0)), at);   // empty: the samples stay on disk
  return { bytes, duration: rate ? samples / rate : null, size: total };
}

// an ogg (vorbis, opus): the pages up to the last header packet (the comments carry the cover), the
// duration out of the granule of the last page, at the end of the file
const OGG_HEADERS = { OpusHead: 2, '\u0001vorbis': 3 };

async function oggOf (entry, size, head) {
  const page  = async at => at + 27 <= head.length ? head.subarray(at) : bytesOf(entry, at, Math.min(size, at + 27 + 255));
  const first = head.subarray(27 + head[26]);
  const codec = Object.keys(OGG_HEADERS).find(name => ascii(first.subarray(0, name.length)) === name);
  if (!codec) return { bytes: head.subarray(0, Math.min(size, HEAD)), duration: undefined, size };

  let end = 0, packets = 0;
  while (packets < OGG_HEADERS[codec] && end < size) {
    const bytes    = await page(end);
    const segments = bytes.subarray(27, 27 + bytes[26]);
    for (const lacing of segments) if (lacing < 255) packets++;
    end += 27 + segments.length + segments.reduce((sum, lacing) => sum + lacing, 0);
  }
  end = Math.min(size, end + FRAMES);
  if (end > LIMIT) throw new Error(`tags of ${end} bytes`);

  // the last page: its granule is the position of its last sample, 48 kHz for opus
  const tail = await bytesOf(entry, Math.max(0, size - 65536), size);
  const last = ascii(tail).lastIndexOf('OggS');
  const view = new DataView(tail.buffer, tail.byteOffset);
  const granule = last < 0 ? 0 : Number(view.getBigUint64(last + 6, true));
  const rate    = codec === 'OpusHead' ? 48000 : u32le(first, 12);
  const skip    = codec === 'OpusHead' ? first[10] | first[11] << 8 : 0;

  return { bytes: await bytesOf(entry, 0, end), duration: granule && rate ? (granule - skip) / rate : undefined, size };
}

// an mp4 (m4a): every atom on top but the samples (mdat), which may come before or after moov
async function mp4Of (entry, size) {
  const parts = [];
  for (let at = 0; at + 8 <= size;) {
    const head = await bytesOf(entry, at, at + 16);
    let length = (head[0] << 24 | head[1] << 16 | head[2] << 8 | head[3]) >>> 0;
    if (length === 1) length = Number(new DataView(head.buffer, head.byteOffset).getBigUint64(8));
    if (length === 0) length = size - at;
    if (length < 8) break;
    const type = ascii(head.subarray(4, 8));
    if (type === 'mdat') parts.push(Uint8Array.of(0, 0, 0, 8, 109, 100, 97, 116));   // empty: the samples stay on disk
    else {
      if (length > LIMIT) throw new Error(`${type} of ${length} bytes`);
      parts.push(await bytesOf(entry, at, at + length));
    }
    at += length;
  }
  const bytes = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
  let at = 0;
  for (const part of parts) { bytes.set(part, at); at += part.length; }
  return { bytes, duration: undefined, size: bytes.length };
}

// the part of a file with its tags, a few frames after them for the duration: flac walks its metadata
// blocks (a picture may come before the comments), an id3v2 tag says its size, a wav and an mp4 are put
// together from their chunks, an ogg is read to its last header page. else HEAD
async function partOf (entry, size) {
  const head = await bytesOf(entry, 0, Math.min(size, 64 * 1024));
  const kind = ascii(head.subarray(0, 4));
  let end = HEAD;

  if (kind === 'RIFF' && ascii(head.subarray(8, 12)) === 'WAVE') return wavOf(entry, size);
  if (kind === 'OggS')                                            return oggOf(entry, size, head);
  if (ascii(head.subarray(4, 8)) === 'ftyp')                      return mp4Of(entry, size);
  if (kind === 'fLaC') {
    for (let at = 4; at < size;) {
      const block = at + 4 <= head.length ? head.subarray(at, at + 4) : await bytesOf(entry, at, at + 4);
      at += 4 + (block[1] << 16 | block[2] << 8 | block[3]);
      if (block[0] & 0x80) { end = at + FRAMES; break; }   // the last block
    }
  }
  if (kind.startsWith('ID3')) end = 10 + (head[5] & 0x10 ? 10 : 0) + ((head[6] & 0x7f) << 21 | (head[7] & 0x7f) << 14 | (head[8] & 0x7f) << 7 | head[9] & 0x7f) + FRAMES;

  end = Math.min(size, end);
  if (end > LIMIT) throw new Error(`tags of ${end} bytes`);
  return { bytes: end <= head.length ? head.subarray(0, end) : await bytesOf(entry, 0, end), duration: undefined, size };
}

// utf-8 read as latin1 (a wav's LIST INFO is latin1 by the book, taggers write utf-8): 'Ã¤' back to 'ä'
const LATIN = /[\u00c2-\u00f4][\u0080-\u00bf]/;
const utf8  = text => {
  if (typeof text !== 'string' || !LATIN.test(text) || /[^\u0000-\u00ff]/.test(text)) return text;
  try   { return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(text, char => char.charCodeAt(0))); }
  catch { return text; }
};

const TEXTS = ['album', 'albumartist', 'artist', 'title'];

// the tags of a file. a handle that reads ranges (android: every byte crosses the bridge) gives the
// part with the tags only, never the whole file. a File of the browser is read where the parser asks
async function parse (track, skipCovers) {
  const entry = folders().nodeAt(track.sourceId, track.path)?.entry;
  if (!entry) throw new Error(`${track.name} is no longer in its folder`);
  const options = { duration: false, skipCovers, skipPostHeaders: true };

  let result;
  if (!entry.handle.readSlice) result = await parseBlob(await entry.read('blob'), options);
  else {
    const { size = 0, type } = await entry.info() ?? {};
    const part = await partOf(entry, size);
    result = await parseBuffer(part.bytes, { mimeType: type, size: part.size }, options);
    if (part.duration !== undefined) result.format.duration = part.duration;
    // a stream without a length of its own (adts, an mp3 without xing): size by bitrate
    if (!result.format.duration && result.format.bitrate) result.format.duration = size * 8 / result.format.bitrate;
  }

  // only a wav: elsewhere text is utf-8 by the book, and 'ß²' would read as utf-8 too
  const { common, format } = result;
  if (format.container === 'WAVE') {
    for (const key of TEXTS) common[key] = utf8(common[key]);
    common.genre = common.genre?.map(utf8);
  }
  return result;
}

async function tag (track) {
  const current = stale(track);
  if (!current || current.tagged) return;

  let merged = { ...current, tagged: true };   // a broken file is not retried on every load
  try {
    const { common, format } = await parse(current, true);
    merged = {
      ...merged,
      artist   : common.albumartist || common.artist || UNKNOWN.artist,
      disc     : common.disk?.no ?? null,
      duration : format.duration ?? null,
      genres   : common.genre?.length ? common.genre : [UNKNOWN.genre],
      no       : common.track?.no ?? null,
      release  : common.album || UNKNOWN.release,
      title    : common.title || current.title,
      year     : common.year ?? null,
    };
  }
  catch { merged.covered = true; }   // no tags read, no cover either

  await db().tracks.set(merged.key, merged);
  settle(merged);
  if (!merged.covered) covering.push(merged);
}

// the cover into the thumbnails: its id, which Cover.rat.html asks for
async function cover (track) {
  const current = stale(track);
  if (!current || current.covered) return;

  let id = null;
  try {
    const picture = (await parse(current, false)).common.picture?.[0];
    if (picture) {
      id = `${current.key}:${current.sig}`;
      await RAT.app.thumbnails.requestFile(id, () => new Blob([picture.data], { type: picture.format }));
    }
  }
  catch {}

  const merged = { ...current, cover: id, covered: true };
  await db().tracks.set(merged.key, merged);
  settle(merged);
}

// :::::: FILES

// a url to stream a track from, the player asks: an object url of the File in the browser, on android
// a copy in the cache the webview reads in ranges (not the whole file over the bridge)
export async function urlOf (track) {
  if (folders().perms.value[track.sourceId] !== 'granted') throw new Error('Reconnect the folder of this track in the settings first.');
  const entry = folders().nodeAt(track.sourceId, track.path)?.entry;
  if (!entry) throw new Error(`${track.name} is no longer in its folder`);
  return entry.url();
}

// :::::: FOLDERS

export async function addFolder () {
  if (!('showDirectoryPicker' in globalThis)) throw new Error('This browser can’t open folders: try Chrome, Edge or another Chromium browser.');
  return folders().add();
}

export const rescanAll = () => Promise.all(folders().sources.value.map(source => folders().scan(source.id)));

// the folder goes, and with it its tracks
export async function removeFolder (id) {
  const doomed = tracks.value.filter(track => track.sourceId === id).map(track => track.key);
  await folders().remove(id);
  await Promise.all(doomed.map(key => db().tracks.delete(key)));
  tracks.value = tracks.value.filter(track => track.sourceId !== id);
  synced.delete(id);
}

export { UNKNOWN };
