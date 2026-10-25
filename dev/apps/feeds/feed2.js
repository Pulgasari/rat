// apps/feeds/feed.js
//
// fetching and parsing feeds in the browser — the article-flavoured cousin of
// apps/podcasts/feed.js. same CORS reality: almost no feed sends CORS headers.
// ../.shared/http.js goes around it: natively inside capacitor, in a browser direct
// first and then through its proxy.
//
// on top of plain RSS/Atom it understands YouTube: a channel's feed is Atom
// with yt:/media: extensions (a video id, a thumbnail, a description), and a
// channel *page* url can be turned into its feed url — see resolveYouTube.

import { getText } from '../.shared/http.js';

// fetchText :: `accept` sets the Accept header
// fetchFeed :: fetch a feed's xml
export const fetchText = (url, accept) => getText(url, { accept });

export const fetchFeed = (url) =>
  fetchText(url, 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*');

// ── DOM Helpers (namespace-agnostic by localName) ────────────────────────────

const getChildren = (parent, name) =>
  [...parent.children].filter(el => el.localName === name);

const getLocalText = (parent, name) =>
  getChildren(parent, name)[0]?.textContent?.trim() || '';

/** Extract the trimmed text of the first matching child element tag name */
const getFirstText = (parent, ...names) => {
  for (const name of names) {
    const text = getLocalText(parent, name);
    if (text) return text;
  }
  return '';
};

function parseDate (raw) {
  const t = Date.parse((raw || '').trim());
  return Number.isNaN(t) ? 0 : t;
}

/** Strip tags, collapse whitespace, decode HTML entities, and trim excerpt */
function toText (htmlish, max = 320) {
  if (!htmlish) return '';
  let s = htmlish.replace(/<[^>]*>/g, ' ');

  // Safe entity decoding using DOMParser (avoids innerHTML XSS vulnerabilities)
  if (typeof DOMParser !== 'undefined') {
    const doc = new DOMParser().parseFromString(s, 'text/html');
    s = doc.body?.textContent || s;
  }

  s = s.replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  return s.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

/** Extract thumbnail or image URL from various RSS/Atom/Media standards */
function imageFrom (node) {
  // 1. Media RSS: <media:thumbnail url="..."> (direct or inside <media:group>)
  const thumbnails = [
    ...getChildren(node, 'thumbnail'),
    ...getChildren(node, 'group').flatMap(g => getChildren(g, 'thumbnail')),
  ];
  const thumbUrl = thumbnails.map(el => el.getAttribute('url')).find(Boolean);
  if (thumbUrl) return thumbUrl;

  // 2. iTunes image: <itunes:image href="...">
  const itunesImage = getChildren(node, 'image').map(el => el.getAttribute('href')).find(Boolean);
  if (itunesImage) return itunesImage;

  // 3. Media RSS content: <media:content medium="image" url="...">
  const contentUrl = getChildren(node, 'content').find(el => {
    const medium = el.getAttribute('medium') || '';
    const type = el.getAttribute('type') || '';
    return (medium === 'image' || type.startsWith('image')) && el.getAttribute('url');
  })?.getAttribute('url');
  if (contentUrl) return contentUrl;

  // 4. Standard RSS <image>: <url> text or href attribute
  const rssImage = getChildren(node, 'image')[0];
  if (rssImage) {
    return getLocalText(rssImage, 'url') || rssImage.getAttribute('href') || '';
  }

  return '';
}

// ── RSS 2.0 ──────────────────────────────────────────────────────────────

function parseRss (channel) {
  const feedLink = getChildren(channel, 'link').map(el => el.textContent.trim()).find(Boolean) || '';

  const feed = {
    title       : getLocalText(channel, 'title'),
    description : toText(getLocalText(channel, 'description')),
    link        : feedLink,
    image       : imageFrom(channel),
  };

  const items = getChildren(channel, 'item').map(item => {
    const itemLink = getChildren(item, 'link').map(el => el.textContent.trim()).find(Boolean) || '';
    return {
      guid    : getLocalText(item, 'guid') || itemLink || getLocalText(item, 'title'),
      title   : getLocalText(item, 'title') || '(untitled)',
      link    : itemLink,
      author  : getFirstText(item, 'creator', 'author') || feed.title,
      pubDate : parseDate(getFirstText(item, 'pubDate', 'date')),
      summary : toText(getFirstText(item, 'description', 'encoded', 'summary')),
      image   : imageFrom(item),
    };
  });

  return { ...feed, kind: 'feed', items };
}

// ── Atom (incl. YouTube) ─────────────────────────────────────────────────

function getAtomLink (node, rel = 'alternate') {
  const links = getChildren(node, 'link');
  const matched = links.find(l => (l.getAttribute('rel') || 'alternate') === rel && l.getAttribute('href'))
               || links.find(l => l.getAttribute('href'));
  return matched?.getAttribute('href') || '';
}

function parseAtom (root) {
  const entries = getChildren(root, 'entry');
  const isYouTube = Boolean(getLocalText(root, 'channelId')) || entries.some(e => Boolean(getLocalText(e, 'videoId')));
  const feedAuthor = getChildren(root, 'author').map(a => getLocalText(a, 'name')).find(Boolean) || '';

  const feed = {
    title       : getLocalText(root, 'title'),
    description : toText(getLocalText(root, 'subtitle')),
    link        : getAtomLink(root),
    image       : getFirstText(root, 'logo', 'icon') || imageFrom(root),
    author      : feedAuthor,
  };

  const items = entries.map(entry => {
    const group = getChildren(entry, 'group')[0]; // YouTube media:group
    const summaryRaw = getFirstText(entry, 'summary', 'content') || (group ? getLocalText(group, 'description') : '');

    return {
      guid    : getFirstText(entry, 'id', 'videoId') || getAtomLink(entry),
      title   : getLocalText(entry, 'title') || '(untitled)',
      link    : getAtomLink(entry),
      author  : getChildren(entry, 'author').map(a => getLocalText(a, 'name')).find(Boolean) || feed.author || feed.title,
      pubDate : parseDate(getFirstText(entry, 'published', 'updated')),
      summary : toText(summaryRaw),
      image   : imageFrom(entry),
    };
  });

  return { ...feed, kind: isYouTube ? 'youtube' : 'feed', items };
}

/** parse feed xml into { title, description, link, image, kind, items[] } */
export function parseFeed (xml) {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('this does not look like a valid feed (XML parse error)');
  }

  const channel = doc.querySelector('channel');
  if (channel) return parseRss(channel);

  const root = doc.querySelector('feed');
  if (root) return parseAtom(root);

  throw new Error('unrecognised feed format — expected RSS or Atom');
}

// ── YouTube: channel url / handle → feed url ─────────────────────────────

export const isYouTubeUrl = (url) => /(^|\.)youtube\.com|youtu\.be/i.test(url || '');

const CHANNEL_FEED  = (id) => `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`;
const PLAYLIST_FEED = (id) => `https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`;

// Regex patterns to discover YouTube channel IDs embedded in HTML
const CHANNEL_ID_PATTERNS = [
  /"channelId":"(UC[\w-]+)"/,
  /\/channel\/(UC[\w-]+)/,
  /"externalId":"(UC[\w-]+)"/,
];

/**
 * turn a YouTube input into its RSS feed url, or return null when the input is
 * not a YouTube reference (so the caller treats it as an ordinary feed url).
 */
export async function resolveYouTube (input) {
  const raw = (input || '').trim();
  if (!raw) return null;

  if (/youtube\.com\/feeds\/videos\.xml/i.test(raw)) return raw;
  if (/^UC[\w-]{20,}$/.test(raw)) return CHANNEL_FEED(raw);
  if (!isYouTubeUrl(raw)) return null;

  const channelMatch = raw.match(/\/channel\/(UC[\w-]+)/i);
  if (channelMatch) return CHANNEL_FEED(channelMatch[1]);

  const listMatch = raw.match(/[?&]list=([\w-]+)/i);
  if (listMatch) return PLAYLIST_FEED(listMatch[1]);

  // @handle, /user/, /c/, or a watch url — scrape channelId from HTML
  const html = await fetchText(raw, 'text/html, */*');
  for (const pattern of CHANNEL_ID_PATTERNS) {
    const match = html.match(pattern);
    if (match?.[1]) return CHANNEL_FEED(match[1]);
  }

  throw new Error('could not find the channel behind that YouTube link');
}
