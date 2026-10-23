// apps/podcasts/feed.js
//
// fetching and parsing podcast feeds, entirely in the browser.
//
// the catch with a client-side-only podcast app: almost no podcast feed sends
// CORS headers. modules/http.js goes around it: natively inside capacitor, in a
// browser direct first and then through the CORS proxy.

import { getText } from '/.shared/js/modules/http.js';

const fetchFeed = url => getText(url, { accept: 'application/rss+xml, application/xml, text/xml, */*' });

// ── parsing ────────────────────────────────────────────────────────────────

const txt = (parent, sel) => parent.querySelector(sel)?.textContent?.trim() || '';

// querySelector can't take a namespaced tag like itunes:image, so reach for
// elements by local name across every namespace.
function local (parent, name) {
  const direct = [...parent.children].filter(el => el.localName === name);
  return direct;
}
const localText = (parent, name) => local(parent, name)[0]?.textContent?.trim() || '';

function parseDate (raw) {
  const t = Date.parse((raw || '').trim());
  return Number.isNaN(t) ? 0 : t;
}

/** "01:02:03" or "3600" or "62:00" -> seconds */
function parseDuration (raw) {
  const s = (raw || '').trim();
  if (!s) return null;
  if (/^\d+$/.test(s)) return Number(s);
  const parts = s.split(':').map(Number);
  if (parts.some(Number.isNaN)) return null;
  return parts.reduce((acc, n) => acc * 60 + n, 0);
}

function imageFrom (node) {
  // <itunes:image href="…"> first, then RSS <image><url>, then <image href>
  const itunes = local(node, 'image').find(el => el.getAttribute('href'));
  if (itunes) return itunes.getAttribute('href');
  const rss = local(node, 'image')[0];
  if (rss) return localText(rss, 'url') || rss.getAttribute('href') || rss.textContent.trim();
  return '';
}

function parseRss (channel) {
  const podcast = {
    title       : localText(channel, 'title'),
    description : localText(channel, 'description') || localText(channel, 'summary'),
    link        : local(channel, 'link').map(el => el.textContent.trim()).find(Boolean) || '',
    author      : localText(channel, 'author') || localText(channel, 'managingEditor'),
    image       : imageFrom(channel),
  };

  const episodes = local(channel, 'item').map(item => {
    const enclosure = local(item, 'enclosure').find(el => (el.getAttribute('type') || '').startsWith('audio')) || local(item, 'enclosure')[0];
    return {
      title       : localText(item, 'title'),
      guid        : localText(item, 'guid'),
      description : localText(item, 'description') || localText(item, 'summary') || localText(item, 'encoded'),
      audioUrl    : enclosure?.getAttribute('url') || '',
      audioType   : enclosure?.getAttribute('type') || 'audio/mpeg',
      pubDate     : parseDate(localText(item, 'pubDate')),
      duration    : parseDuration(localText(item, 'duration')),
      image       : imageFrom(item) || podcast.image,
      link        : local(item, 'link').map(el => el.textContent.trim()).find(Boolean) || '',
    };
  });

  return { ...podcast, episodes };
}

function parseAtom (feed) {
  const linkHref = rel => {
    const links = local(feed, 'link');
    const match = links.find(l => (l.getAttribute('rel') || 'alternate') === rel && l.getAttribute('href'));
    return match?.getAttribute('href') || '';
  };
  const podcast = {
    title       : localText(feed, 'title'),
    description : localText(feed, 'subtitle') || localText(feed, 'summary'),
    link        : linkHref('alternate'),
    author      : local(feed, 'author').map(a => localText(a, 'name')).find(Boolean) || '',
    image       : localText(feed, 'logo') || localText(feed, 'icon') || imageFrom(feed),
  };

  const episodes = local(feed, 'entry').map(entry => {
    const links = local(entry, 'link');
    const audio = links.find(l => (l.getAttribute('type') || '').startsWith('audio'))
               || links.find(l => l.getAttribute('rel') === 'enclosure');
    return {
      title       : localText(entry, 'title'),
      guid        : localText(entry, 'id'),
      description : localText(entry, 'summary') || localText(entry, 'content'),
      audioUrl    : audio?.getAttribute('href') || '',
      audioType   : audio?.getAttribute('type') || 'audio/mpeg',
      pubDate     : parseDate(localText(entry, 'published') || localText(entry, 'updated')),
      duration    : parseDuration(localText(entry, 'duration')),
      image       : imageFrom(entry) || podcast.image,
      link        : links.find(l => (l.getAttribute('rel') || 'alternate') === 'alternate')?.getAttribute('href') || '',
    };
  });

  return { ...podcast, episodes };
}

/** parse feed xml into { title, description, link, author, image, episodes[] } */
function parseFeed (xml) {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  if (doc.querySelector('parsererror')) throw new Error('this does not look like a valid feed (XML parse error)');

  const channel = doc.querySelector('channel');
  if (channel) return parseRss(channel);

  const feed = doc.querySelector('feed');
  if (feed) return parseAtom(feed);

  throw new Error('unrecognised feed format — expected RSS or Atom');
}

// :::::: EXPORT

export {
  fetchFeed,
  parseFeed,
};
