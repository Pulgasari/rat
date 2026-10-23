// podcasts :: library.js
//
// the library: subscriptions, their episodes and what you have listened to.
// database.js stores it, feed.js fetches and parses it, this is what turns one
// into the other and holds the result where the views can see it.
//
// what a feed parses to is what gets stored. the only fields added on the way in
// are the keys (id, podcastId) and a few counters the lists sort by — no record
// is copied field by field, so whatever feed.js learns to parse lands in the db
// without a second round of mapping here.
//
// the db is the one copy of the library (RAT.app.database, the tables in
// config.rat.js). views read a table as table.$items, which follows its changes,
// so subscribing or refreshing here is a plain write — nothing to keep in step by hand.
//
// progress is the exception and lives in state.progress: it is read per row and
// written while an episode plays, which is no way to treat a table.

// :::::: IMPORTS

import { fetchFeed, parseFeed } from './feed.js';
import { hash }                 from './methods.js';
import { state }                from './state.js';

const podcastIdByHash = (url)       => 'p' + hash(url);
const episodeIdByHash = (pid, guid) => `${pid}:${hash(guid)}`;

// :::::: CONSTANTS

const db = () => RAT.app.database;

// the keys of a table that start with prefix (the episodes of a podcast: 'p…:')
const keysOf = async (table, prefix) => (await table.keys()).filter(key => String(key).startsWith(prefix));

const EMPTY_PROGRESS = { position: 0, duration: 0, done: false, doneAt: 0, saved: false, savedAt: 0, updatedAt: 0 };

// :::::: LOAD
// the progress table into state.progress. podcasts and episodes are not read here —
// the views do that for themselves. the tables are declared in config.rat.js.

async function load () {
  state.progress.clear();
  for (const [id, row] of await db().progress.entries()) state.progress.set(id, row);
}

// :::::: READ

// a $Map read: one version for the whole map, so any progress write wakes every
// reader. that is affordable because the player throttles its writes (player.js)
// rather than storing a position on every timeupdate.
const stateOf = (id) => state.progress.get(id) ?? EMPTY_PROGRESS;

// the ids of every saved episode, newest-saved first. the view joins them to the
// episodes it has already loaded.
const savedIds = () => [...state.progress.entries()]
  .filter(([, progress]) => progress.saved)
  .sort(([, a], [, b]) => b.savedAt - a.savedAt)
  .map(([id]) => id);

// :::::: PROGRESS (position / done / saved)

async function patchProgress (id, patch) {
  const next = { ...EMPTY_PROGRESS, ...state.progress.get(id), ...patch, updatedAt: Date.now() };
  state.progress.set(id, next);
  await db().progress.set(id, next);
  return next;
}

const setProgress = (id, position, duration) => patchProgress(id, { position, duration });
const markDone    = (id, done = true)        => patchProgress(id, { done, doneAt: done ? Date.now() : 0 });
const toggleDone  = (id)                     => markDone(id, !stateOf(id).done);
const toggleSaved = (id) => {
  const saved = !stateOf(id).saved;
  return patchProgress(id, { saved, savedAt: saved ? Date.now() : 0 });
};

// :::::: SUBSCRIPTIONS

// a parsed feed, keyed: the podcast is the feed itself minus its episodes, each
// episode the parsed entry plus its ids. guid is normalized here because the
// export keys listening progress by it, and not every feed sets one.
function toRecords (url, { episodes: entries, ...feed }) {
  const pid = podcastIdByHash(url);

  const eps = entries
    .filter(entry => entry.audioUrl)            // an episode with no audio is nothing to play
    .map(entry => {
      const guid = entry.guid || entry.audioUrl;
      return { ...entry, guid, id: episodeIdByHash(pid, guid), podcastId: pid };
    });

  const podcast = {
    ...feed,
    id            : pid,
    url,
    title         : feed.title || url,
    lastFetched   : Date.now(),
    lastEpisodeAt : eps.reduce((max, ep) => Math.max(max, ep.pubDate || 0), 0),
    episodeCount  : eps.length,
  };

  return { podcast, episodes: eps };
}

async function store (podcast, eps) {
  await db().podcasts.set(podcast.id, podcast);
  await Promise.all(eps.map(ep => db().episodes.set(ep.id, ep)));
}

/**
 * subscribe to a feed by url. fetches, parses and stores it. throws on a bad feed
 * or an unreachable url so the caller can surface the message.
 *
 * `feed` is an already parsed feed — the explore view hands over the one its preview
 * fetched, so subscribing from there does not go down the proxy a second time.
 * `onStep` hears 'reading' and 'saving' as the work gets there.
 */
async function subscribe (rawUrl, feed, { onStep } = {}) {
  const url = normalizeUrl(rawUrl);
  const pid = podcastIdByHash(url);
  if (await db().podcasts.get(pid)) throw new Error('already subscribed to this feed');

  if (!feed) onStep?.('reading');
  const parsed = feed ?? parseFeed(await fetchFeed(url));
  if (!parsed.episodes.length) throw new Error('no episodes found in this feed');

  onStep?.('saving');
  const { podcast, episodes: eps } = toRecords(url, parsed);
  const record = { ...podcast, addedAt: Date.now() };
  await store(record, eps);
  return record;
}

/**
 * re-fetch one subscription. every episode is rewritten, since titles, artwork
 * and descriptions change in place; episodes a feed has since dropped are kept,
 * so a truncated feed does not take their progress with it.
 */
async function refresh (pid) {
  const known = await db().podcasts.get(pid);
  if (!known) return { added: 0 };

  const parsed = parseFeed(await fetchFeed(known.url));
  const { podcast, episodes: eps } = toRecords(known.url, parsed);

  // the episode keys of this podcast start with its id — no need to read the
  // records themselves to count what is new
  const have  = new Set(await keysOf(db().episodes, pid + ':'));
  const added = eps.filter(ep => !have.has(ep.id)).length;

  await store({ ...podcast, addedAt: known.addedAt }, eps);
  return { added };
}

async function refreshAll (onProgress) {
  const all     = await db().podcasts.values();
  const results = [];
  let   done    = 0;

  for (const podcast of all) {
    try           { results.push(await refresh(podcast.id)); }
    catch (error) { results.push({ podcast, error: error?.message || String(error) }); }
    onProgress?.(++done, all.length);
  }
  return results;
}

/** drop a subscription along with its episodes and their progress */
async function unsubscribe (pid) {
  const keys = await keysOf(db().episodes, pid + ':');

  await db().podcasts.delete(pid);
  await Promise.all(keys.flatMap(key => [db().episodes.delete(key), db().progress.delete(key)]));

  for (const key of keys) state.progress.delete(key);
}

// :::::: IMPORT / EXPORT
// progress is keyed by feed url + episode guid rather than by our own ids, so it
// re-attaches after an import has re-fetched the feeds — the ids are derived
// from exactly those two strings.

const stateKey = (url, guid) => `${url}\n${guid}`;

async function exportData () {
  const podcasts = await db().podcasts.as(Object);
  const kept     = {};

  for (const [id, { updatedAt, ...rest }] of state.progress.entries()) {
    if (!rest.saved && !rest.done && !rest.position) continue;   // nothing worth keeping
    const episode = await db().episodes.get(id);
    const podcast = episode && podcasts[episode.podcastId];
    if (podcast) kept[stateKey(podcast.url, episode.guid)] = rest;
  }

  return {
    app        : 'zugriff-podcasts',
    version    : 1,
    exportedAt : new Date().toISOString(),
    feeds      : Object.values(podcasts).map(({ url, title }) => ({ url, title })),
    state      : kept,
  };
}

async function importData (data, onProgress) {
  if (!data || !Array.isArray(data.feeds)) throw new Error('not a podcasts export file');

  const results = [];
  let   done    = 0;

  for (const feed of data.feeds) {
    const url = normalizeUrl(feed.url || '');
    if      (!url)                          results.push({ url: feed.url, skipped: 'no url' });
    else if (await db().podcasts.get(podcastIdByHash(url))) results.push({ url, skipped: 'already subscribed' });
    else {
      try           { await subscribe(url); results.push({ url, added: true }); }
      catch (error) { results.push({ url, error: error?.message || String(error) }); }
    }
    onProgress?.(++done, data.feeds.length);
  }

  // re-apply the saved progress now that the episodes exist
  const podcasts = await db().podcasts.as(Object);
  const rows     = [];

  for (const episode of await db().episodes.values()) {
    const podcast = podcasts[episode.podcastId];
    const saved   = podcast && data.state?.[stateKey(podcast.url, episode.guid)];
    if (saved) rows.push([episode.id, { ...EMPTY_PROGRESS, ...saved, updatedAt: Date.now() }]);
  }

  await Promise.all(rows.map(([id, row]) => db().progress.set(id, row)));
  for (const [id, row] of rows) state.progress.set(id, row);

  return results;
}

// :::::: HELPERS

/** tidy a pasted feed url — trim, add https://, drop a leading podcast:// */
function normalizeUrl (raw) {
  let url = (raw || '').trim();
  if (!url) return '';
  url = url.replace(/^(podcast|feed):\/\//i, 'https://');
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  return url;
}

// :::::: EXPORT

// named exports for direct importers — player.js writes progress, ExploreView keys a
// preview the way a subscription would be keyed
export { load, stateOf, setProgress, markDone, normalizeUrl, podcastIdByHash, toRecords };

// the default is RAT.app.library
export default {
  load,

  stateOf, savedIds,

  setProgress, markDone, toggleDone, toggleSaved,
  subscribe, refresh, refreshAll, unsubscribe,
  exportData, importData, normalizeUrl,
};
