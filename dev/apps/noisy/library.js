// apps/noisy/library.js
//
// the library: the folders the user grants (RAT.app.folders), the audio files found in
// them (table tracks) with what their tags say. a scan shows every file at once under
// its file name, then two queues, a few files at a time:
//   tags   the head of each file (music-metadata, no covers): the panels fill
//   covers once the tags are all in, the head again, its picture into the thumbnails
// a head only, not the file: on android every byte crosses the bridge as base64. a file
// whose tags do not fit in the head is read whole. a file is read again only when its
// size or date changed.

import { parseBlob, parseBuffer } from 'https://esm.sh/music-metadata@11.16.1';

import { effect, signal } from '@rat/signals';

const HEAD  = 1 << 20;   // bytes read for the tags (and a cover) of a file
const QUEUE = 3;         // files read at once

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

// the tags out of the head of the file, the whole file when they do not fit
async function parse (track, skipCovers) {
  const entry = folders().nodeAt(track.sourceId, track.path)?.entry;
  if (!entry) throw new Error(`${track.name} is no longer in its folder`);
  const info    = await entry.info();
  const options = { duration: false, skipCovers, skipPostHeaders: true };
  if (info?.size > HEAD) {
    try   { return await parseBuffer(new Uint8Array(await (await entry.slice(0, HEAD)).arrayBuffer()), { mimeType: info.type, size: info.size }, options); }
    catch {}
  }
  return parseBlob(await entry.read('blob'), { ...options, skipPostHeaders: false });
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

const fileOf = track => folders().nodeAt(track.sourceId, track.path)?.entry.read('blob') ?? Promise.reject(new Error(`${track.name} is no longer in its folder`));

// the file of a track, fresh off disk: the player asks
export function openFile (track) {
  if (folders().perms.value[track.sourceId] !== 'granted') return Promise.reject(new Error('Reconnect the folder of this track in the settings first.'));
  return fileOf(track);
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
