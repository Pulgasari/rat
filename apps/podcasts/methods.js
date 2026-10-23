// apps/podcasts/methods.js
// pure view helpers: html to text and the episode/podcast list transforms.
// formatting (date, duration) is ../.shared/fmt.js

export function hash (str = '') {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

// does this text look like a feed url rather than a name to search for? one field
// serves both in the add dialog and in explore, so the answer has to live in one place.
export const looksLikeUrl = (text = '') =>
  /^(https?|feed|podcast):\/\//i.test(text) || (!/\s/.test(text) && /\.[a-z]{2,}(\/|$)/i.test(text));

// strip html from a feed description for a one-line teaser
export function plain (htmlStr = '') {
  const el = document.createElement('div');
  el.innerHTML = htmlStr;
  return (el.textContent || '').replace(/\s+/g, ' ').trim();
}

// a feed description as readable paragraphs — block tags become breaks, then the
// text is taken via textContent, so nothing from the feed's markup is executed
export function paragraphs (htmlStr = '') {
  const el = document.createElement('div');
  el.innerHTML = String(htmlStr)
    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n');
  return (el.textContent || '')
    .replace(/\n{3,}/g, '\n\n')
    .split('\n\n')
    .map(s => s.trim())
    .filter(Boolean);
}

// filter an episode list by the search query. `withPodcast` also matches on the
// podcast title, for the mixed "latest" stream — the view joins that on, so there is
// no lookup to do per episode per keystroke.
export function filterEpisodes (list, query = '', withPodcast = false) {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter(ep =>
    ep.title.toLowerCase().includes(q) ||
    (withPodcast && ep.podcast?.title.toLowerCase().includes(q)));
}

export const sortEpisodes = (list, mode) => [...list].sort((a, b) =>
    mode === 'oldest' ? (a.pubDate || 0) - (b.pubDate || 0)
  : mode === 'alpha'  ? a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
  :                     (b.pubDate || 0) - (a.pubDate || 0));

export const sortPodcasts = (list, mode) => [...list].sort((a, b) =>
    mode === 'alpha' ? a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
  :                    (b.lastEpisodeAt || 0) - (a.lastEpisodeAt || 0));

// a view by its name, a detail with its id: go('podcasts'), go('podcast', id) -> /podcast/<id>
export const go = (view, id) => RAT.app.router.go(id == null ? `/${view}` : `/${view}/${encodeURIComponent(id)}`);
