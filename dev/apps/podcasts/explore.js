// apps/podcasts/explore.js
// what explore and the preview of a podcast share: feeds read without subscribing,
// the shortlist ('remember') and subscribing from a search hit.
//
// a directory hit, a shortlist row and a preview describe the same podcast; the
// feed url and our own id derived from it are what they share.

import { signal } from '@rat/signals';

import toast from '../.shared/toast.js';

import library from './library.js';

import { fetchFeed, parseFeed }                     from './feed.js';
import { go }                                       from './methods.js';
import { normalizeUrl, podcastIdByHash, toRecords } from './library.js';

const db = () => RAT.app.database;

const urlOf = (entry = {}) => normalizeUrl(entry.url || entry.feedUrl || '');
const idOf  = (entry = {}) => entry.id || podcastIdByHash(urlOf(entry));

// replaces the directory's id with ours, so "subscribed" / "remembered" are plain
// set lookups. an episode hit is keyed by its podcast.
const keyed = (result) => {
  const url = normalizeUrl(result.feedUrl);
  return result.kind === 'episode'
    ? { ...result, url, podcastId: podcastIdByHash(url) }
    : { ...result, url, id: podcastIdByHash(url) };
};

// the podcast an episode hit belongs to, in the shape the row actions expect
const podcastOf = (episode) => ({
  author : episode.author,
  id     : episode.podcastId,
  image  : episode.image,
  title  : episode.podcast,
  url    : episode.url,
});

// what a shortlist row keeps: enough for a list, plus the url back to the feed
const toRow = (entry) => ({
  addedAt : Date.now(),
  author  : entry.author || '',
  count   : entry.count  ?? entry.episodeCount ?? 0,
  genre   : entry.genre  || '',
  id      : idOf(entry),
  image   : entry.image  || '',
  title   : entry.title  || urlOf(entry),
  url     : urlOf(entry),
});

// :::::: PREVIEW

// feeds read but not stored, cached per url for the session.
// url -> promise of { url, id, feed, podcast, episodes }
const previews = new Map;

function preview (rawUrl) {
  const url = normalizeUrl(rawUrl);
  if (!url) return Promise.reject(new Error('no feed url'));
  if (previews.has(url)) return previews.get(url);

  const job = (async () => {
    const feed = parseFeed(await fetchFeed(url));
    return { feed, id: podcastIdByHash(url), url, ...toRecords(url, feed) };
  })();

  // a failed fetch must not be handed back to every later visit
  job.catch(() => previews.delete(url));

  previews.set(url, job);
  return job;
}

// :::::: SHORTLIST

// returns whether the podcast is on the shortlist afterwards
async function toggleRemembered (entry) {
  const row = toRow(entry);
  if (await db().shortlist.get(row.id)) { await db().shortlist.delete(row.id); return false; }
  if (!row.url) throw new Error('no feed url to remember');
  await db().shortlist.set(row.id, row);
  return true;
}

// :::::: SUBSCRIBE

// podcast id -> the step a subscription is at, 'reading' | 'saving'
const subscribing = signal({});

const setStep = (id, step) => {
  const { [id]: _, ...rest } = subscribing.value;
  subscribing.value = step ? { ...rest, [id]: step } : rest;
};

// reuses an already previewed feed and drops the shortlist row. the view stays where it is
async function subscribe (entry) {
  const id = idOf(entry);
  if (subscribing.value[id]) return;
  const url = urlOf(entry);
  setStep(id, 'reading');
  try {
    const cached  = previews.has(url) ? await previews.get(url).catch(() => null) : null;
    const podcast = await library.subscribe(url, cached?.feed, { onStep: step => setStep(id, step) });
    await db().shortlist.delete(podcast.id);
    toast.success(`Subscribed to ${podcast.title}`);
    return podcast;
  }
  catch (error) { toast.error(error); }
  finally       { setStep(id, null); }
}

const open = url => go('explore-podcast', url);

// :::::: ACTIONS (ActionMenu specs, podcast always podcast-shaped, see podcastOf)

const STEPS = { reading: 'Reading feed …', saving: 'Saving …' };

const rememberAction = (podcast, isRemembered) => isRemembered
  ? { icon: 'bookmark',          label: 'Forget',   title: 'Remove from the shortlist',    onclick: () => toggleRemembered(podcast) }
  : { icon: 'bookmark-unfilled', label: 'Remember', title: 'Keep for a closer look later', onclick: () => toggleRemembered(podcast) };

// subscribe, the step while it runs, then the way into the library
function subscribeAction (podcast, isSubscribed) {
  const step = subscribing.value[podcast.id];
  return isSubscribed ? { icon: 'check', label: 'In library', onclick: () => go('podcast', podcast.id) }
       : step         ? { icon: 'svg-spinners:bars-scale-middle', label: STEPS[step], disabled: true }
       :                { icon: 'add', label: 'Subscribe', onclick: () => subscribe(podcast) };
}

// :::::: EXPORT

export { keyed, open, podcastOf, preview, rememberAction, subscribe, subscribeAction, toggleRemembered };
