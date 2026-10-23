# icons

Browse and search the whole [Iconify](https://iconify.design) library.

- web: <https://zugriff.dev/icons/>
- android:

## features

- **Sets** — every Iconify collection as a card (name, total, samples); filter
  by name, open a set to see all its icons
- **Search** — debounced search across all of Iconify
- **Favourites** — heart any icon; kept in `@bunker/db`
- a **resizable** icon grid (a size slider, plus two-finger / ctrl-wheel resize
  via `@aufbau/gestures`)
- click an icon for a detail sheet: big preview, copy the name, copy the SVG,
  download the SVG, favourite it

---

# under the hood

*App*, not a *tool*: own chrome, own css.

| file          | what it is |
|---------------|------------|
| `app.js`             | the UI on `zugriff.app` — sidebar + home / sets / set / search / favourites + detail sheet |
| `modules/iconify.js` | the Iconify API (`collections`, `collection`, `search`, `svg`) with a `@bunker/db` cache |
| `modules/db.js`      | favourites, in `@bunker/db` |
| `app.css`            | the app's own look |
| `manifest.json` · `app.svg` | manifest (generated), icon (the shared `index.html` shell serves the page) |

Icons in the grid render through the `<iconify-icon>` web component (loaded from
`code.iconify.design`) — it batches the SVG requests per set and caches them, so
a page of hundreds of icons is a couple of requests, not hundreds. The app's own
chrome uses the shared [`Icon`](./../../shared/js/components/Icon.js)
(`<aufbau-icon>`). The library data comes from `api.iconify.design`, which allows
cross-origin requests, so no proxy is involved.

## notes

Nothing is stored but your favourites (icon names) and a short-lived cache of the
collection list. The whole Iconify catalogue is fetched live from
`api.iconify.design` as you browse.
