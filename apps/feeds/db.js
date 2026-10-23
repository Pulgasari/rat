// apps/feeds/db.js
//
// storage for the reader — three tables of RAT.app.database (config.rat.js):
//
//   feeds   one record per subscribed feed (url, resolved title/link/image,
//           kind: 'feed' | 'youtube', addedAt, lastFetched, error?)
//   items   one record per entry ever seen, keyed feedId + '\n' + guid, so a
//           refresh only adds what's new and nothing is shown twice
//   read    a set of item keys the user has opened (value is just 1)
//
// everything is on-device; a "refresh" re-fetches feeds (feed.js) and upserts
// the entries. nothing here talks to the network except through feed.js.

import { computed, signal } from '@rat/signals';

import * as feed from './feed.js';

const db  = () => RAT.app.database;
const SEP = '\n';
const keyOf = (feedId, guid) => feedId + SEP + guid;

// ── signals ────────────────────────────────────────────────────────────────

export const
feeds     = signal([]),        // [{ id, url, title, link, image, kind, addedAt, lastFetched, error }]
items     = signal([]),        // [{ key, feedId, kind, title, link, author, pubDate, summary, image, addedAt }]
readSet   = signal(new Set()), // keys of opened items
refreshing = signal({}),       // feedId -> true while fetching
ready     = signal(false);

export const feedById = id => feeds.value.find(f => f.id === id) ?? null;

// items grouped + sorted newest-first, ready for the views
export const itemsByFeed = computed(() => {
  const map = {};
  for (const it of items.value) (map[it.feedId] ??= []).push(it);
  for (const list of Object.values(map)) list.sort((a, b) => b.pubDate - a.pubDate);
  return map;
});

const byDate = (a, b) => b.pubDate - a.pubDate;
export const latestArticles = computed(() => items.value.filter(i => i.kind !== 'youtube').sort(byDate));
export const latestVideos   = computed(() => items.value.filter(i => i.kind === 'youtube').sort(byDate));

export const isRead   = key => readSet.value.has(key);
export const unreadIn = list => list.reduce((n, it) => n + (readSet.value.has(it.key) ? 0 : 1), 0);

// ── loading ────────────────────────────────────────────────────────────────

export async function load () {
  const [feedRows, itemRows, readKeys] = await Promise.all([db().feeds.values(), db().items.values(), db().read.keys()]);
  feeds.value   = feedRows.sort((a, b) => (a.addedAt || 0) - (b.addedAt || 0));
  items.value   = itemRows;
  readSet.value = new Set(readKeys);
  ready.value   = true;
}

// ── subscribing ──────────────────────────────────────────────────────────

/**
 * add a feed from whatever the user pasted. a YouTube channel / handle / video
 * url is resolved to its channel feed first; anything else is treated as a feed
 * url directly. returns the new feed record. throws with a human message.
 */
export async function addFeed (input) {
  const typed = (input || '').trim();
  if (!typed) throw new Error('paste a feed URL first');

  const yt  = await feed.resolveYouTube(typed);   // null when not youtube
  const url = yt || (/^https?:\/\//i.test(typed) ? typed : 'https://' + typed);

  if (feeds.value.some(f => f.url === url)) throw new Error('you already follow that feed');

  const parsed = feed.parseFeed(await feed.fetchFeed(url));
  const rec = {
    id      : crypto.randomUUID(),
    url,
    title   : parsed.title || url,
    link    : parsed.link || '',
    image   : parsed.image || '',
    kind    : parsed.kind,
    addedAt : Date.now(),
    lastFetched: Date.now(),
    error   : '',
  };
  await db().feeds.set(rec.id, rec);
  feeds.value = [...feeds.value, rec];
  await upsertItems(rec, parsed.items);
  return rec;
}

/** re-fetch one feed and store any new entries. returns the count added. */
export async function refresh (id) {
  const f = feedById(id);
  if (!f) return 0;
  refreshing.value = { ...refreshing.value, [id]: true };
  try {
    const parsed = feed.parseFeed(await feed.fetchFeed(f.url));
    const patch = {
      ...f,
      title: parsed.title || f.title,
      link : parsed.link  || f.link,
      image: parsed.image || f.image,
      kind : parsed.kind,
      lastFetched: Date.now(),
      error: '',
    };
    await db().feeds.set(id, patch);
    feeds.value = feeds.value.map(x => x.id === id ? patch : x);
    return await upsertItems(patch, parsed.items);
  } catch (err) {
    const patch = { ...f, error: err?.message || String(err), lastFetched: Date.now() };
    await db().feeds.set(id, patch);
    feeds.value = feeds.value.map(x => x.id === id ? patch : x);
    throw err;
  } finally {
    refreshing.value = { ...refreshing.value, [id]: false };
  }
}

export async function refreshAll (onProgress) {
  let done = 0, added = 0;
  for (const f of feeds.value) {
    try { added += await refresh(f.id); } catch {}
    onProgress?.(++done, feeds.value.length);
  }
  return added;
}

async function upsertItems (f, parsedItems) {
  const have = new Set(items.value.filter(i => i.feedId === f.id).map(i => i.key));
  const fresh = [];
  for (const it of parsedItems) {
    const key = keyOf(f.id, it.guid);
    if (have.has(key)) continue;
    have.add(key);
    const rec = { key, feedId: f.id, kind: f.kind, addedAt: Date.now(),
                  title: it.title, link: it.link, author: it.author,
                  pubDate: it.pubDate || Date.now(), summary: it.summary, image: it.image };
    fresh.push(rec);
    await db().items.set(key, rec);
  }
  if (fresh.length) items.value = [...items.value, ...fresh];
  return fresh.length;
}

/** forget a feed and everything of its that we stored */
export async function removeFeed (id) {
  const doomed = items.value.filter(i => i.feedId === id).map(i => i.key);
  await db().feeds.delete(id);
  await Promise.all(doomed.flatMap(k => [db().items.delete(k), db().read.delete(k)]));
  feeds.value = feeds.value.filter(f => f.id !== id);
  items.value = items.value.filter(i => i.feedId !== id);
  if (doomed.length) {
    const set = new Set(readSet.value);
    doomed.forEach(k => set.delete(k));
    readSet.value = set;
  }
}

// ── read state ─────────────────────────────────────────────────────────────

export function markRead (key, read = true) {
  const set = new Set(readSet.value);
  if (read) { if (set.has(key)) return; set.add(key); db().read.set(key, 1); }
  else      { if (!set.has(key)) return; set.delete(key); db().read.delete(key); }
  readSet.value = set;
}

export async function markAllRead (list) {
  const set = new Set(readSet.value);
  await Promise.all(list.map(it => { if (!set.has(it.key)) { set.add(it.key); return db().read.set(it.key, 1); } }));
  readSet.value = set;
}
