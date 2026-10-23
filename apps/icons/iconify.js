// apps/icons/iconify.js
//
// the Iconify HTTP API: collections, one collection's icons, and search.
// api.iconify.design allows cross-origin requests, so these are plain fetches.
// the collection list and each set's icon list are kept in the Cache API for a
// day (@rat/bunker: a cache store under memo), re-opening a set is instant.

import { createStore, memo } from '@rat/bunker';

const API = 'https://api.iconify.design';
const DAY = 24 * 60 * 60 * 1000;

const kept   = memo(createStore({ driver: 'cache', name: 'icons-api' }), { ttl: DAY });
const cached = (key, fetcher) => kept.get(`${API}/rat-cache/${encodeURIComponent(key)}`, fetcher);

async function getJson (url) {
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`Iconify API ${res.status}`);
  return res.json();
}

// ── collections ───────────────────────────────────────────────────────────

/** [{ prefix, name, total, samples[], author, category, palette }] sorted by name */
export function collections () {
  return cached('collections', async () => {
    const raw = await getJson(`${API}/collections`);
    return Object.entries(raw)
      .map(([prefix, info]) => ({
        prefix,
        name    : info.name || prefix,
        total   : info.total || 0,
        samples : info.samples || [],
        author  : info.author?.name || '',
        category: info.category || '',
        palette : !!info.palette,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  });
}

// ── one collection's icons ──────────────────────────────────────────────────

/** { prefix, title, total, icons:[`prefix:name`] } */
export function collection (prefix) {
  return cached(`set:${prefix}`, async () => {
    const data = await getJson(`${API}/collection?prefix=${encodeURIComponent(prefix)}`);
    const names = [
      ...(data.uncategorized || []),
      ...Object.values(data.categories || {}).flat(),
    ];
    const seen = new Set();
    const icons = [];
    for (const n of names) { if (!seen.has(n)) { seen.add(n); icons.push(`${prefix}:${n}`); } }
    return { prefix, title: data.title || prefix, total: data.total || icons.length, icons };
  });
}

// ── search ──────────────────────────────────────────────────────────────

/** [`prefix:name`] — not cached, queries change constantly */
export async function search (query, limit = 120) {
  const q = query.trim();
  if (!q) return [];
  const data = await getJson(`${API}/search?query=${encodeURIComponent(q)}&limit=${limit}`);
  return data.icons || [];
}

// ── single icon ─────────────────────────────────────────────────────────

export const svgUrl = name => `${API}/${name.replace(':', '/')}.svg`;

export async function svgText (name) {
  const res = await fetch(svgUrl(name));
  if (!res.ok) throw new Error(`could not load ${name}`);
  return res.text();
}
