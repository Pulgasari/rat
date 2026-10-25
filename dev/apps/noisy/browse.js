// apps/noisy/browse.js
//
// the four panels: genres -> artists -> releases -> tracks. what a panel shows follows
// what is picked in the ones before it:
//
//   nothing picked      every genre, every artist, no releases, no tracks
//   genres picked       the artists of these genres
//   artists picked      their releases (within the picked genres)
//   releases picked     their tracks
//
// every panel picks several (pick): a click picks one, ctrl/meta toggles, shift a range,
// a long press toggles (touch). a pick clears what was picked after it.

import { batch, computed } from '@rat/signals';
import { $Set }            from '@rat/types';

import { tracks } from './library.js';

export const PANELS = ['genres', 'artists', 'releases', 'tracks'];

// what is picked, per panel
export const picked = Object.fromEntries(PANELS.map(name => [name, new $Set]));

const anchors = {};   // panel -> the key a shift range starts at

const releaseKey = track => `${track.artist}\u0000${track.release}`;
const byLabel    = (a, b) => a.label.localeCompare(b.label, undefined, { numeric: true, sensitivity: 'base' });

// [{ key, label, count }] of the values a function gives each track, in order
function groups (list, keysOf, labelOf = key => key) {
  const counts = new Map;
  for (const track of list) for (const key of keysOf(track)) counts.set(key, (counts.get(key) ?? 0) + 1);
  return [...counts].map(([key, count]) => ({ count, key, label: labelOf(key) })).sort(byLabel);
}

// :::::: THE PANELS

const inGenres   = computed(() => picked.genres.size  ? tracks.value.filter(track => track.genres.some(genre => picked.genres.has(genre))) : tracks.value);
const ofArtists  = computed(() => inGenres.value.filter(track => picked.artists.has(track.artist)));
const ofReleases = computed(() => ofArtists.value.filter(track => picked.releases.has(releaseKey(track))));

export const lists = {
  genres   : computed(() => groups(tracks.value, track => track.genres)),
  artists  : computed(() => groups(inGenres.value, track => [track.artist])),
  releases : computed(() => picked.artists.size ? groups(ofArtists.value, track => [releaseKey(track)], key => key.split('\u0000')[1]).map(release => ({ ...release, sub: releaseInfo(release.key) })) : []),
  tracks   : computed(() => picked.releases.size ? ofReleases.value.toSorted(trackOrder).map(track => ({ cover: track.cover, key: track.key, label: track.title, sub: trackInfo(track) })) : []),
};

// the tracks of the tracks panel, in its order: what play() queues
export const shownTracks = computed(() => picked.releases.size ? ofReleases.value.toSorted(trackOrder) : []);

function releaseInfo (key) {
  const track = ofArtists.value.find(track => releaseKey(track) === key);
  return [track?.artist, track?.year].filter(Boolean).join(' · ');
}

const duration  = seconds => seconds == null ? '' : `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`;
const trackInfo = track => [track.no && String(track.no).padStart(2, '0'), duration(track.duration)].filter(Boolean).join(' · ');

const trackOrder = (a, b) => releaseKey(a).localeCompare(releaseKey(b)) || (a.disc ?? 0) - (b.disc ?? 0) || (a.no ?? 0) - (b.no ?? 0) || a.title.localeCompare(b.title);

// :::::: PICKING

// mode: 'one' (a click), 'toggle' (ctrl, meta, a long press), 'range' (shift)
export const pick = (panel, key, mode = 'one') => batch(() => pickIn(panel, key, mode));

function pickIn (panel, key, mode) {
  const set  = picked[panel];
  const keys = lists[panel].value.map(item => item.key);

  if (mode === 'range' && anchors[panel] != null) {
    const [from, to] = [keys.indexOf(anchors[panel]), keys.indexOf(key)].sort((a, b) => a - b);
    set.clear();
    for (const each of keys.slice(from, to + 1)) set.add(each);
  }
  else if (mode === 'toggle') {
    set.has(key) ? set.delete(key) : set.add(key);
    anchors[panel] = key;
  }
  else {
    const only = set.size === 1 && set.has(key);
    set.clear();
    if (!only) set.add(key);
    anchors[panel] = key;
  }

  for (const after of PANELS.slice(PANELS.indexOf(panel) + 1)) picked[after].clear();
}

export const modeOf = event => event?.shiftKey ? 'range' : event?.ctrlKey || event?.metaKey ? 'toggle' : 'one';

export const clearSelection = () => batch(() => { for (const name of PANELS) picked[name].clear(); });
