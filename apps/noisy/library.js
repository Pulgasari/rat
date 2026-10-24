// apps/noisy/library.js
//
// the library: the folders the user grants (RAT.app.folders), the audio files found in
// them (table tracks) with what their tags say. a scan shows every file at once under
// its file name, then a few files at a time are read for their tags (music-metadata)
// and their cover goes to the thumbnails. a file is read again only when its size or
// date changed.

import { parseBlob } from 'https://esm.sh/music-metadata@11.16.1';

import { effect, signal } from '@rat/signals';

const QUEUE = 3;   // files read for their tags at once

const db      = () => RAT.app.database;
const folders = () => RAT.app.folders;
const keyOf   = (sourceId, path) => `${sourceId}/${path}`;

const UNKNOWN = { artist: 'Unknown artist', genre: 'Unknown genre', release: 'Unknown release' };

// :::::: STATE

// [{ key, sourceId, path, name, sig, tagged, title, artist, release, genres, year, no, disc, duration, cover }]
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
  enqueue(next.filter(track => !track.tagged));
}

// :::::: TAGS, a few files at a time

const waiting = [];
let   running = 0;

function enqueue (list) {
  waiting.push(...list);
  pump();
}

function pump () {
  pending.value = waiting.length + running;
  while (running < QUEUE && waiting.length) {
    const track = waiting.shift();
    running++;
    tag(track).finally(() => { running--; pump(); });
  }
}

async function tag (track) {
  const current = trackByKey(track.key);
  if (!current || current.tagged || current.sig !== track.sig) return;   // a rescan came first

  let merged = { ...current, tagged: true };   // a broken file is not retried on every load
  try {
    const { common, format } = await parseBlob(await fileOf(current));
    const picture = common.picture?.[0];
    merged = {
      ...merged,
      artist   : common.albumartist || common.artist || UNKNOWN.artist,
      cover    : picture ? await coverOf(current, picture) : null,
      disc     : common.disk?.no ?? null,
      duration : format.duration ?? null,
      genres   : common.genre?.length ? common.genre : [UNKNOWN.genre],
      no       : common.track?.no ?? null,
      release  : common.album || UNKNOWN.release,
      title    : common.title || current.title,
      year     : common.year ?? null,
    };
  }
  catch {}

  await db().tracks.set(merged.key, merged);
  tracks.value = tracks.value.map(other => other.key === merged.key ? merged : other);
}

// the cover into the thumbnails: its id, which Cover.rat.html asks for
async function coverOf (track, picture) {
  const id = `${track.key}:${track.sig}`;
  await RAT.app.thumbnails.requestFile(id, () => new Blob([picture.data], { type: picture.format }));
  return id;
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
