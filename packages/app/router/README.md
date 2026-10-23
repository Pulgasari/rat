# @rat/app :: router

a router on its own: no element, no framework. `<rat-app>` and `<rat-view>` from
[`@rat/app`](../app) use it, any page can as well.

```js
import { createRouter } from '@rat/app/router/index.js';

const router = createRouter({ mode: 'hash' }).start();

router.path;                                   // '/notes/3'
router.query;                                  // { sort: 'date' } from ?sort=date
router.$path;                                  // the path as a signal (@rat/signals)

router.go('/notes/4');
router.go('/notes/4', { replace: true });
router.go('settings');                         // a name, through resolve()
router.back();

router.on('change', ({ path, query }) => …);
router.match('/notes/:id', ({ id }) => show(id));
```

## modes

| mode | where the route lives | |
|---|---|---|
| `hash` (default) | `#/notes/3?sort=date` | works on any host |
| `path` | `/app/notes/3?sort=date` | real urls, `base: '/app'`. the host has to serve the page for each. link clicks of the same origin under `base` are caught, `data-native` lets one through |
| `query` | `?route=/notes/3&sort=date` | one page, real query, no rewrites. `key` names the parameter |
| `memory` | nowhere but the router | tests, widgets. `initial` is where it starts. `none` is the same |

a mode of your own is `{ read, write, listen }` (and optionally `moved`, `undo`, `back`), see
`modes.js`.

## patterns

| | |
|---|---|
| `/notes/:id` | a param, one segment |
| `/notes/:id?` | an optional one |
| `/files/*` | the rest (`params['*']`) |

`matchRoute(pattern, path)` gives `{ params, rest }` or `null`: a pattern matches the start of a
path, the rest goes to nested routes. `{ exact: true }` allows no rest. `fill('/notes/:id',
{ id: 3 })` and `join('/settings', 'profile')` build paths.

## guards

```js
const off = router.on('leave', async event => {
  if ($dirty && !await confirm('discard?')) event.preventDefault();
});

router.on('leave', guard, { unload: true });   // closing the tab asks too (synchronously)
```

a navigation waits for every guard. one that prevents it keeps the route; a back or forward is
undone by stepping the other way (the history modes number their entries), so the entry keeps
its place. the newest navigation wins, an older one still waiting is dropped, the same target
twice is one navigation.

## commands

```js
router.bind(commands);   // go and back in a @rat/commands registry
```

```html
<button onclick='go[settings]'>…</button>
<button onclick='go[/notes/3]'>…</button>
<button onclick='back'>…</button>
```

## params

the router knows paths, not routes: `match()` hands params to its callback, and whoever matches
a tree of routes (an app with its views) sets `router.params`.
