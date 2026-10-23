// podcasts :: modules/search.js
//
// finding a podcast — or a single episode — through Apple's iTunes Search API. no
// key, no account, and every podcast in their directory carries the feed url we
// actually subscribe to, which is the only field here we truly need.
//
// whether apple sends CORS headers has a habit of changing, so this takes the same
// route feed.js does, through modules/http.js: natively inside capacitor, in a
// browser direct first and then through the CORS proxy.

// :::::: IMPORTS

import { getJson } from '/.shared/js/modules/http.js';

// :::::: CONSTANTS

const ENDPOINT = 'https://itunes.apple.com/search';

// which field the term is matched against. `any` is not one of the api's own values
// — it stands for leaving the parameter out, which is the directory's default: every
// field of the entity. a named value rather than '' so the picker has one to show.
export const ANY = 'any';

export const ATTRIBUTES = [
  { value: ANY,               label: 'anything'    },
  { value: 'titleTerm',       label: 'title'       },
  { value: 'authorTerm',      label: 'author'      },
  { value: 'descriptionTerm', label: 'description' },
  { value: 'genreIndex',      label: 'genre'       },
];

// the storefront decides which catalogue is searched, and with it the language of
// what comes back — `lang` only speaks en_us and ja_jp, so country is the filter
// that matters. the list of them is /.shared/json/countries.json.
const DEFAULT_COUNTRY = 'US';

/**
 * the storefront to start on: the region the browser is set to, which is the
 * catalogue someone is most likely to want. not every region is a storefront — one
 * that is not comes back as an api error, which the note in the view then says, and
 * the picker is right there.
 */
// a language tag Intl.Locale rejects (some webviews report one) falls back
export function localCountry () {
  try   { return new Intl.Locale(globalThis.navigator?.language || 'en-US').maximize?.().region || DEFAULT_COUNTRY; }
  catch { return DEFAULT_COUNTRY; }
}

// :::::: FETCH

/** an abort is the caller moving on, not a failure */
async function request (params, signal) {
  let data;

  try         { data = await getJson(`${ENDPOINT}?${params}`, { signal }); }
  catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error(`could not reach the podcast directory (${error.message})`);
  }

  // a rejected parameter comes back as HTTP 200 with no results — without this it
  // would read as "nothing found", which is a different thing to tell someone
  if (data?.errorMessage) throw new Error(data.errorMessage);
  return data;
}

// the search parameters every entity shares. `attribute` and `country` are left out
// when empty rather than sent blank, which the api reads as a filter that matches
// nothing.
function queryFor (entity, term, { limit = 25, country, attribute } = {}) {
  const query = new URLSearchParams({ media: 'podcast', entity, term, limit });
  if (country) query.set('country', country);
  if (attribute && attribute !== ANY) query.set('attribute', attribute);
  return query;
}

// :::::: RESULTS

// one podcast, thinned to what a row shows and what subscribing needs. an entry
// without a feed url is nothing to subscribe to, the same way an episode without
// audio is nothing to play.
const toPodcast = (item) => ({
  kind    : 'podcast',
  id      : String(item.collectionId ?? item.feedUrl),
  title   : item.collectionName || item.trackName || '',
  author  : item.artistName     || '',
  feedUrl : item.feedUrl        || '',
  image   : item.artworkUrl600  || item.artworkUrl100 || '',
  count   : item.trackCount     || 0,
  genre   : item.primaryGenreName || '',
});

// one episode. it is kept next to its feed url on purpose: an episode hit is a way
// into the podcast it belongs to, which is the only thing that can be subscribed to.
const toEpisode = (item) => ({
  kind        : 'episode',
  id          : String(item.trackId ?? item.episodeGuid ?? item.trackName),
  title       : item.trackName      || '',
  podcast     : item.collectionName || '',
  author      : item.artistName     || '',
  feedUrl     : item.feedUrl        || '',
  image       : item.artworkUrl600  || item.artworkUrl160 || item.artworkUrl60 || '',
  date        : Date.parse(item.releaseDate) || 0,
  duration    : item.trackTimeMillis ? Math.round(item.trackTimeMillis / 1000) : 0,
  description : item.shortDescription || item.description || '',
  link        : item.trackViewUrl   || '',
});

// :::::: MAIN

/**
 * search the directory by name. `signal` aborts an in-flight request, which is how
 * search-as-you-type drops a result its query has already moved past. `country` picks
 * the storefront, `attribute` the field the term is matched against.
 */
export async function searchPodcasts (term, options = {}) {
  const text = (term || '').trim();
  if (!text) return [];

  const data = await request(queryFor('podcast', text, options), options.signal);
  return (data?.results || []).map(toPodcast).filter(result => result.feedUrl);
}

/** the same search over single episodes (`entity=podcastEpisode`) */
export async function searchEpisodes (term, options = {}) {
  const text = (term || '').trim();
  if (!text) return [];

  const data = await request(queryFor('podcastEpisode', text, options), options.signal);
  return (data?.results || []).map(toEpisode).filter(result => result.feedUrl);
}

export default searchPodcasts;
