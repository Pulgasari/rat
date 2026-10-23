// apps/feeds/feed.js
//
// fetching and parsing feeds in the browser — the article-flavoured cousin of
// apps/podcasts/feed.js. same CORS reality: almost no feed sends CORS headers.
// modules/http.js goes around it: natively inside capacitor, in a browser direct
// first and then through its proxy.
//
// on top of plain RSS/Atom it understands YouTube: a channel's feed is Atom
// with yt:/media: extensions (a video id, a thumbnail, a description), and a
// channel *page* url can be turned into its feed url — see resolveYouTube.

import { getText } from '/.shared/js/modules/http.js';

/** fetch text. `accept` sets the Accept header */
export const fetchText = (url, accept) => getText(url, { accept });

/** fetch a feed's xml */
export const fetchFeed = url =>
  fetchText(url, 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*');

// ── small dom helpers (namespace-agnostic, by localName) ─────────────────────

const local = (parent, name) => [...parent.children].filter(el => el.localName === name);
const localText = (parent, name) => local(parent, name)[0]?.textContent?.trim() || '';

function parseDate (raw) {
  const t = Date.parse((raw || '').trim());
  return Number.isNaN(t) ? 0 : t;
}

// strip tags + collapse whitespace + entity-decode, for a plain-text excerpt
const decoder = typeof document !== 'undefined' ? document.createElement('textarea') : null;
function toText (htmlish, max = 320) {
  let s = (htmlish || '').replace(/<[^>]*>/g, ' ');
  if (decoder) { decoder.innerHTML = s; s = decoder.value; }
  s = s.replace(/\s+/g, ' ').trim();
  return s.length > max ? s.slice(0, max).replace(/\s+\S*$/, '') + '…' : s;
}

function imageFrom (node) {
  const media = local(node, 'thumbnail').find(el => el.getAttribute('url'))
             || local(node, 'group').flatMap(g => local(g, 'thumbnail')).find(el => el.getAttribute('url'));
  if (media) return media.getAttribute('url');
  const itunes = local(node, 'image').find(el => el.getAttribute('href'));
  if (itunes) return itunes.getAttribute('href');
  const content = local(node, 'content').find(el => (el.getAttribute('medium') === 'image' || (el.getAttribute('type') || '').startsWith('image')) && el.getAttribute('url'));
  if (content) return content.getAttribute('url');
  const rss = local(node, 'image')[0];
  if (rss) return localText(rss, 'url') || rss.getAttribute('href') || '';
  return '';
}

// ── RSS 2.0 ──────────────────────────────────────────────────────────────

function parseRss (channel) {
  const feed = {
    title       : localText(channel, 'title'),
    description : toText(localText(channel, 'description')),
    link        : local(channel, 'link').map(el => el.textContent.trim()).find(Boolean) || '',
    image       : imageFrom(channel),
  };
  const items = local(channel, 'item').map(item => ({
    guid    : localText(item, 'guid') || local(item, 'link').map(el => el.textContent.trim()).find(Boolean) || localText(item, 'title'),
    title   : localText(item, 'title') || '(untitled)',
    link    : local(item, 'link').map(el => el.textContent.trim()).find(Boolean) || '',
    author  : localText(item, 'creator') || localText(item, 'author') || feed.title,
    pubDate : parseDate(localText(item, 'pubDate') || localText(item, 'date')),
    summary : toText(localText(item, 'description') || localText(item, 'encoded') || localText(item, 'summary')),
    image   : imageFrom(item),
  }));
  return { ...feed, kind: 'feed', items };
}

// ── Atom (incl. YouTube) ─────────────────────────────────────────────────

function parseAtom (root) {
  const isYouTube = !!localText(root, 'channelId') || local(root, 'entry').some(e => localText(e, 'videoId'));

  const linkHref = (node, rel = 'alternate') => {
    const links = local(node, 'link');
    return (links.find(l => (l.getAttribute('rel') || 'alternate') === rel && l.getAttribute('href'))
         || links.find(l => l.getAttribute('href')))?.getAttribute('href') || '';
  };

  const feed = {
    title       : localText(root, 'title'),
    description : toText(localText(root, 'subtitle')),
    link        : linkHref(root),
    image       : localText(root, 'logo') || localText(root, 'icon') || imageFrom(root),
    author      : local(root, 'author').map(a => localText(a, 'name')).find(Boolean) || '',
  };

  const items = local(root, 'entry').map(entry => {
    const group = local(entry, 'group')[0];   // youtube media:group
    return {
      guid    : localText(entry, 'id') || localText(entry, 'videoId') || linkHref(entry),
      title   : localText(entry, 'title') || '(untitled)',
      link    : linkHref(entry),
      author  : local(entry, 'author').map(a => localText(a, 'name')).find(Boolean) || feed.author || feed.title,
      pubDate : parseDate(localText(entry, 'published') || localText(entry, 'updated')),
      summary : toText(localText(entry, 'summary') || localText(entry, 'content') || (group && localText(group, 'description'))),
      image   : imageFrom(entry),
    };
  });

  return { ...feed, kind: isYouTube ? 'youtube' : 'feed', items };
}

/** parse feed xml into { title, description, link, image, kind, items[] } */
export function parseFeed (xml) {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  if (doc.querySelector('parsererror')) throw new Error('this does not look like a valid feed (XML parse error)');

  const channel = doc.querySelector('channel');
  if (channel) return parseRss(channel);
  const root = doc.querySelector('feed');
  if (root) return parseAtom(root);

  throw new Error('unrecognised feed format — expected RSS or Atom');
}

// ── YouTube: channel url / handle → feed url ─────────────────────────────

export const isYouTubeUrl = url => /(^|\.)youtube\.com|youtu\.be/i.test(url || '');

const CHANNEL_FEED  = id => `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`;
const PLAYLIST_FEED = id => `https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`;

/**
 * turn a YouTube input into its RSS feed url, or return null when the input is
 * not a YouTube reference (so the caller treats it as an ordinary feed url).
 *
 *  - an already-built feed url            → returned unchanged
 *  - a bare channel id (UC…)              → the channel feed
 *  - /channel/UC…  ·  ?list=… playlist    → built directly
 *  - @handle · /user/… · /c/… · a video   → the page is fetched (via proxy) and
 *                                           its channelId scraped out
 */
export async function resolveYouTube (input) {
  const raw = (input || '').trim();
  if (!raw) return null;

  if (/youtube\.com\/feeds\/videos\.xml/i.test(raw)) return raw;
  if (/^UC[\w-]{20,}$/.test(raw)) return CHANNEL_FEED(raw);
  if (!isYouTubeUrl(raw)) return null;

  const channel = raw.match(/\/channel\/(UC[\w-]+)/i);
  if (channel) return CHANNEL_FEED(channel[1]);

  const list = raw.match(/[?&]list=([\w-]+)/i);
  if (list) return PLAYLIST_FEED(list[1]);

  // @handle, /user/, /c/, or a watch url — the channelId is only on the page
  const html = await fetchText(raw, 'text/html, */*');
  const id = html.match(/"channelId":"(UC[\w-]+)"/)?.[1]
          || html.match(/\/channel\/(UC[\w-]+)/)?.[1]
          || html.match(/"externalId":"(UC[\w-]+)"/)?.[1];
  if (!id) throw new Error('could not find the channel behind that YouTube link');
  return CHANNEL_FEED(id);
}
