// zugriff icons :: modules/db.js

// on-device storage — one @bunker/db with two stores:
// - `favs` (the icons the.user hearted)
// - `cache` (the Iconify collection/set responses, see 'iconify.js').

import { signal }   from '@aufbau/signals';
import { createDb } from '@bunker/db';

let   setup = null;
const db    = createDb('zugriff-icons');
const ready = () => (setup ??= db.setup({ favs: {}, cache: {} }));

// ── favourites ───────────────────────────────────────────────────────────

const favs  = signal(new Set);   // icon names, e.g. 'mdi:home'
const isFav = name => favs.value.has(name);

async function loadFavs () {
  await ready();
  favs.value = new Set(Object.keys(await db.getAll('favs')));
}

async function toggleFav (name) {
  const set = new Set(favs.value);
  if (set.has(name)) { set.delete (name); await db.delete ('favs', name   ); }
  else               { set.add    (name); await db.set    ('favs', name, 1); }
  favs.value = set;
}

// :::::: EXPORT

export { 
  db, ready,
  favs, isFav, loadFavs, toggleFav,
};
