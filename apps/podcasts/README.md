# podcasts

A podcast client that runs entirely on the device.

Subscribe by RSS feed URL, play episodes with a docked player, and keep progress, done-marks and a listen-later list — all stored locally, nothing leaves the browser except the feed requests themselves.

## features

- **add by name or URL** — one field: type a name to search Apple's podcast
  directory, or paste a feed URL to subscribe to it directly. RSS 2.0 and Atom are
  both parsed.
- **explore** — the same search, but a hit opens the podcast instead of subscribing
  to it: description, artwork and the full episode list, read straight from the feed
  and stored nowhere. Subscribe from there, or **remember** it — a shortlist for the
  ones that look interesting but have not earned a subscription yet. A pasted feed
  URL opens here too. Two tabs over one query — **podcasts** or single **episodes**
  (an episode hit is a way into the show it came from) — and two filters that decide
  what is searched at all: the **storefront** (`country`, which also decides the
  language of what comes back) and the **field** the term is matched against (title,
  author, description or genre). Both are remembered.
- **latest episodes** — a combined, newest-first stream across every subscription.
- **podcasts view** — grid or list, sorted alphabetically or by most recently
  updated (the feed with the newest episode first).
- **episodes per podcast** — sorted newest, oldest or A–Z, with a sticky filter.
- **episode page** — a full view for a single episode: artwork, complete
  description, playback controls and progress.
- **filter** — the latest-episodes stream and each podcast page carry a
  bottom-docked search that filters as you type.
- **listen later** — a bookmark list of episodes to get to.
- **progress & done** — the player saves your position as you listen and marks
  an episode done at ~95%; you can also toggle done by hand.
- **layout** — the menu (top / bottom / left / right) and the player
  (top / bottom) positions are set in Settings; the menu defaults to the bottom.
- **import / export** — back up your subscriptions and listening state as JSON
  and restore them on another device.

## planned features
- [ ] download episodes
- [ ] sync subscriptions

---

# under the hood

Everything is a static ES module — no build step, in keeping with the rest of
zugriff. The app runs on the shared **global runtime**: the page is the unified
`zugriff/index.html`, whose blocking `boot.js` binds `zugriff` (and `zugriff.app`,
`html`) to `window`, so nothing here imports the runtime — `zugriff.app` is the
reference point (see `.shared/js/app.js`).

## structure

```
app.js         assembles the handle: modules, state, actions, hotkeys, mount
modules/       app logic — library, database, player, feed, search,
               methods (pure helpers)
views/         routed main content — Latest, Podcasts, PodcastDetail, EpisodeDetail,
               Saved, Explore, ExplorePodcast
panels/        chrome + overlays — Sidebar, Player, Search dock, Settings
dialogs/       modal dialogs — Add podcast
components/    small reusable pieces — Artwork, PodcastsIndex, EpisodesIndex, …
```

`app.js` hangs the modules on the handle and seeds the state:

- `app.library` / `app.player` / `app.thumbs` — the modules. `app.library` is read
  synchronously (plain calls, no `.value`); `app.js` awaits `app.library.load()`
  once before mounting, so the first render already has the library.
- `app.state` — a `signalStore` (`@aufbau/signals`, built in `.shared/js/app/state.js`).
  A leaf reads as **its signal**, `$name` as its value:
  `app.state.busy.value` / `app.state.$busy`, and `app.state.$busy = '…'` writes it.
  `createState` declares the frame every app shares (theme, font, dialog, route, …);
  this app adds `busy`, `search`, `menuPosition`, `playerPosition` and `progress` with
  `$extend`. Only the declared frame persists — an added leaf has to ask for it.
- There is no mirror of podcasts and episodes. The db is the one copy; views read
  the tables they need through `useTable` (`modules/hooks.js`) and reload on
  `@bunker/db`'s change feed, which also carries across tabs.
- explore routes on the feed url rather than an id (`app.go('explore-podcast', url)`):
  a podcast that is not subscribed has no record to point at, and the url is the one
  thing that still means something after a reload.
- `app.state` — the app's ephemeral ui state on the shared deep signal (`@aufbau/signals`),
  read/written **without** `.value`: `route` (`{name,id}`), `search`, `dialog`, `busy`.
  Leaves are read inside render to stay reactive, so they are never destructured at module
  top. Nothing here persists.
- `app.settings` — the durable prefs as a typed, `.value`-free store (`typedSignal`):
  `podcastSort` / `episodeSort` / `view` / `menuPos` / `playerPos` are enum leaves (off-list
  writes are ignored), `proxy` / `imgResizer` are text. Persisted as one blob under
  `zugriff:podcasts:settings`. Its own store rather than an `app.state` subtree because
  `typedSignal` persistence is whole-store and `app.state` must stay ephemeral.
- `app.go(name, id)` — navigate: the `<app-view>` of that name in the `<app-root>` of app.js. the lists have a hash route, the detail views keep their id outside the address. For toasts call `app.toast(…)` directly (see `.shared/js/modules/toast.js`).
- `app.actions` — named behaviours (`refresh-all`, `add-podcast`, `toggle-play`, `skip-back/forward`, …); `app.hotKeys` is the declarative combo→spec map that binds keys to them (`space` = play/pause, `arrow-left`/`arrow-right` = skip, `escape` = close). See `.shared/js/modules/{actions,hotkeys}.js`.

Views/panels/components reach all of this through `const app = zugriff.app` (+
destructuring the stable module refs); shared components load from
`/.shared/js/components`, app pieces through `app.view()` / `app.panel()` /
`app.dialog()` / `app.component()`.

## modules

- **`modules/database.js`** — the store, and nothing else: three tables over
  [`@bunker/db`](https://github.com/pulgasari/bunker/) (IndexedDB) — `podcasts`,
  `episodes`, `progress` — plus the id hashing, because the ids *are* the keys.
  No app state, no fetching, no rules about what a record means. Episode keys
  start with their podcast id, so "all episodes of this podcast" is a plain
  prefix scan.
- **`modules/library.js`** — subscriptions, their episodes and what you have
  listened to: the layer that turns a parsed feed into stored records and back.
  What a feed parses to is what gets stored — the podcast record *is* the parsed
  feed minus its episodes, each episode record the parsed entry plus its keys, so
  nothing is copied field by field on the way in. Subscribing, refreshing and
  unsubscribing are plain db writes; the views hear about them through the change
  feed. Only `progress` is held in memory (`app.state.progress`), because it is read
  per row and written while an episode plays.
- **`modules/search.js`** — the iTunes Search API: `searchPodcasts` and
  `searchEpisodes` over the same request, with `country` (the storefront) and
  `attribute` (the field the term is matched against, `ATTRIBUTES`) passed through.
  `any` is ours, not theirs — it stands for leaving `attribute` out. A parameter the
  api rejects comes back as HTTP 200 with no results, so that is turned into an error
  rather than read as "nothing found". The storefront list is
  `/.shared/json/countries.json`, which `<input-value src=…>` loads by itself.
- **`views/ExploreView.js`** — the same library seen from outside, kept in the view
  since nothing else needs it (ExplorePodcastView imports the shared pieces from
  there): the directory search, a feed read but not stored (`preview`, cached per url for the session) and
  the shortlist, a `shortlist` table of podcasts to come back to. A preview is keyed
  by the same `toRecords` a subscription is keyed by, so an episode looked at today
  and subscribed to tomorrow keeps its id and with it its progress. Subscribing hands
  the already parsed feed to `library.subscribe`, so it does not go down the proxy
  twice, and drops the shortlist row. Query and tab are module-scope signals; the
  storefront and the field persist under `podcasts:explore:`.
- **`modules/hooks.js`** — `useTable(table, read, deps)`: a view's slice of the db,
  reloaded when that table changes, in this tab or another. Returns `null` until
  the first read lands, and remembers the last rows per key so navigating back
  draws immediately and refreshes behind the list.

The grid/list podcasts view is laid out by `<data-index viewmode="grid|list">`
with each podcast in a `<data-item>`.

---

# notes

- Feeds load through the configured CORS proxy by default (`api.allorigins.win`).
  Change or clear it in Settings if you'd rather use your own.
- Artwork is downscaled by a self-hosted resizer — no third party. Covers are
  frequently 1400–3000px but shown at 48–160px, so each image goes through
  `img.pulgasari.dev` (see [`/img-proxy`](./../../img-proxy/)), a tiny PHP
  endpoint that fetches the original server-side (no browser CORS) and returns a
  small webp. The shared cache (`.shared/js/thumbs.js`) stores that result in
  IndexedDB, so from then on nothing is fetched again. While it loads a
  placeholder shows; if the resizer is unreachable the original is shown for
  display, then a placeholder. The endpoint is set in **Settings → Artwork
  resizer**; clear it to resize in the browser instead (works only for hosts
  that allow cross-origin reads).
- Audio streams from the podcast's own host; only feed metadata is stored
  locally, not the audio.
