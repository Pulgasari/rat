// apps/feeds/feed.js
//
// fetching and parsing feeds in the browser — the article-flavoured cousin of
// apps/podcasts/feed.js. same CORS reality: almost no feed sends CORS headers.
// modules/http.js goes around it: natively inside capacitor, in a browser direct
// first and then through its proxy.

import { getText } from '/.shared/js/modules/http.js';

export const fetchText = (url, accept) => getText(url, { accept });
export const fetchFeed = (url) =>
  fetchText(url, 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*');

// ── DOM & String Helpers ───────────────────────────────────────────────────

// Get immediate child elements matching localName
const kids = (node, name) => [...(node?.children || [])].filter(c => c.localName === name);

// Get trimmed text content of the first matching child tag
const text = (node, ...tags) =>
  tags.flatMap(t => kids(node, t)).map(c => c.textContent.trim()).find(Boolean) || '';

// Universal link extractor for RSS (<link>url</link>) and Atom (<link href="url"/>)
const link = (node) =>
  kids(node, 'link').map(l => l.getAttribute('href') || l.textContent.trim()).find(Boolean) || '';

const parseDate = (raw) => {
  const t = Date.parse((raw || '').trim());
  return Number.isNaN(t) ? 0 : t;
};

function toText(html, max = 320) {
  if (!html) return '';
  let s = html.replace(/<[^>]*>/g, ' ');
  if (typeof DOMParser !== 'undefined') {
    s = new DOMParser().parseFromString(s, 'text/html').body?.textContent || s;
  }
  s = s.replace(/\s+/g, ' ').trim();
  return s.length > max ? s.slice(0, max).replace(/\s+\S*$/, '') + '…' : s;
}

function imageFrom(node) {
  const thumbs = [...kids(node, 'thumbnail'), ...kids(node, 'group').flatMap(g => kids(g, 'thumbnail'))];
  const mediaUrl = thumbs.map(t => t.getAttribute('url')).find(Boolean);
  if (mediaUrl) return mediaUrl;

  const img = kids(node, 'image')[0] || kids(node, 'content').find(c => (c.getAttribute('medium') || c.getAttribute('type') || '').includes('image'));
  return img?.getAttribute('url') || img?.getAttribute('href') || text(node, 'image') || '';
}

// ── Unified Parser (RSS & Atom) ────────────────────────────────────────────

const mapItem = (node, defaultAuthor) => ({
  guid: text(node, 'id', 'videoId', 'guid') || link(node) || text(node, 'title'),
  title: text(node, 'title') || '(untitled)',
  link: link(node),
  author: text(node, 'author', 'creator') || defaultAuthor,
  pubDate: parseDate(text(node, 'published', 'updated', 'pubDate', 'date')),
  summary: toText(text(node, 'summary', 'content', 'description', 'encoded') || text(kids(node, 'group')[0], 'description')),
  image: imageFrom(node),
});

/** parse feed xml into { title, description, link, image, kind, items[] } */
export function parseFeed(xml) {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  if (doc.querySelector('parsererror')) throw new Error('invalid feed (XML parse error)');

  const channel = doc.querySelector('channel');
  const root = doc.querySelector('feed');
  if (!channel && !root) throw new Error('unrecognised feed format — expected RSS or Atom');

  const isAtom = !channel;
  const src = channel || root;
  const isYouTube = isAtom && (Boolean(text(src, 'channelId')) || kids(src, 'entry').some(e => Boolean(text(e, 'videoId'))));

  const feedAuthor = text(src, 'author');
  const feed = {
    kind: isYouTube ? 'youtube' : 'feed',
    title: text(src, 'title'),
    description: toText(text(src, 'description', 'subtitle')),
    link: link(src),
    image: text(src, 'logo', 'icon') || imageFrom(src),
    author: feedAuthor,
    items: kids(src, isAtom ? 'entry' : 'item').map(node => mapItem(node, feedAuthor || text(src, 'title'))),
  };

  return feed;
}

// ── YouTube Resolver ───────────────────────────────────────────────────────

export const isYouTubeUrl = (url) => /(^|\.)youtube\.com|youtu\.be/i.test(url || '');

export async function resolveYouTube(input) {
  const raw = (input || '').trim();
  if (!raw) return null;
  if (raw.includes('youtube.com/feeds/videos.xml')) return raw;
  if (/^UC[\w-]{20,}$/.test(raw)) return `https://www.youtube.com/feeds/videos.xml?channel_id=${raw}`;
  if (!isYouTubeUrl(raw)) return null;

  const ch = raw.match(/\/channel\/(UC[\w-]+)/i)?.[1];
  if (ch) return `https://www.youtube.com/feeds/videos.xml?channel_id=${ch}`;

  const list = raw.match(/[?&]list=([\w-]+)/i)?.[1];
  if (list) return `https://www.youtube.com/feeds/videos.xml?playlist_id=${list}`;

  const html = await fetchText(raw, 'text/html, */*');
  const id = html.match(/(?:"channelId"|"externalId"|\/channel\/)["/:]+?(UC[\w-]+)/)?.[1];
  if (!id) throw new Error('could not find the channel behind that YouTube link');

  return `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`;
}
