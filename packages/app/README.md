# @rat/app

rat without a build: a page, `.rat` files next to it, one script.

```html
<script src="./packages/app/run/run.js"></script>

<rat-app src="app.rat"></rat-app>
<rat-part src="./chart.rat" load="visible"></rat-part>
```

demos: [`demos/app`](../../demos/app/), [`demos/app2`](../../demos/app2/) (views, areas, guards, errors).

## how it works

1. **`run.js`** is a classic script, not a module: it runs before any module. it writes the import
   map of `run/importmap.json` into the page before its first `import()` (data, so a build reads
   the same file: `@rat/dev`). it maps `@rat/*` into this repo, `@htx/*` and `@domina/*` into
   the repos next to it (`code.pulgasari.dev/rat/`, `/htx/`, `/domina/`, or a local checkout of
   all three side by side), `acorn` and `@pulgasari/is` / `str` to esm.sh. an import map already
   on the page wins: put it before `run.js` to point anything elsewhere. then it imports
   `index.js`, which defines the elements and loads `@rat/types` (the registry of reactive
   variants).
2. **the loader** fetches a `.rat` / `.rat.js` file (or an `.htx` file, compiled by `@htx/compiler` against `@rat/runtime`, or plain `.html`, rendered as it is), compiles it (`compileAsync`, so a
   `<style lang="scss">` works), and imports the result from a blob url. a blob module has no
   path of its own, so the loader rewrites the imports of the compiled code first (parsed with
   acorn):
   - `./card.rat`: compiled the same way, the import gets its blob url
   - `import('./card.rat')`: stays lazy, compiled when it runs
   - `./util.js`, `../x.js`: an absolute url, against the file's own url
   - `@rat/runtime`, `acorn`: stay, for the import map
3. **`<rat-app>` / `<rat-part>` / `<rat-view>`** mount the component (the default export) of their `src` into themselves.

one compile per url, a failed one is dropped so the next try loads again. a circle of `.rat`
files is an error naming the files. devtools show the compiled code under `<file>.rat.js`.

## compiled once

what the loader compiles is kept in the Cache API (`rat:compiled`), under the file's url and a
hash of its source. an unchanged file is not compiled again, and as long as nothing has to be
compiled, neither the compiler nor acorn is loaded: the second start of an app skips both (notes
locally: 1.9 s → 0.5 s). a file that inlines a css file (`style inline`) compiles every time.
`?fresh` drops them all; after a change to the compiler, `?fresh` once.

## splash

compiling in the page takes a moment, most of it loading the compiler. `<rat-app>` shows a
splash while it is not defined or `[loading]`, what it holds hidden meanwhile: logo, `rat app is being built …`, what is happening right now
(`loading the compiler`, `loading app.rat`, `compiling counter.rat` …), a spinner.

- css only, written by `run.js`: it is there with the first paint, before any module loaded.
- background and color are the page's: the logo and the spinner are masks in `currentColor`,
  so light, dark and any palette work without a setting.
- every rule sits in `:where()`, any rule of the page wins. `--rat-logo` and `--rat-spinner`
  (`url(…)`) swap the images. the logo is `assets/splash.svg`.
- content inside `<rat-app>` replaces the splash: `<rat-app src="app.rat">my own</rat-app>`.
- the status comes from the loader: each file announces itself with a `rat:compile` event
  (`detail: { name, url }`) before it compiles, the element writes it into `data-status`.

## cache busting: `?fresh`

a host like github pages lets the browser keep files for a while (`max-age=600`), so an edited
module may not show on reload. `.rat` files are revalidated on every load anyway. for the js:

```
index.html?fresh
```

`run.js` then fetches every module of the page's origin reachable from `@rat/app` once with
`cache: 'reload'` before importing anything. that overwrites the browser's http cache, so the
imports after it get the current files, each fetched once. no devtools needed, works on a
phone. `data-fresh` on the script does the same for every load. the console says how many files
were refetched. files from other origins (esm.sh) are left alone: their urls carry a version.

## elements

`<rat-app>` is the root of an app, `<rat-view>` a view of it, `<rat-area>` a region (sidebar,
drawer, bottom sheet), `<rat-part>` a piece of any page (an island,
[parts](../../.md/ideas/parts.md)). app, view and area are built on `@domina/element`,
`router/` and `@rat/commands`, the successors of `<app-root>` and its kin from
`@aufbau/elements`.

| `<rat-part>` | |
|---|---|
| `src` | the file, against the page: `.rat` (`.rat.js`, `.rat.html`), `.htx` (through `@htx/compiler`), or plain `.html` (shown as it is, scripts in it do not run). a new `src` mounts the new component |
| `load` | `eager` (default), `visible` (once in view), `idle` |
| `[loading]`, `[error]` | while loading, after an error (see [errors](#errors)) |
| `props` | a property, handed to the component when it mounts |
| `start()` | loads again (the retry after an error) |
| `rat:mount`, `rat:error` | events, bubbling |

what a part holds until the component mounts stays: a loading screen without code.

```html
<rat-app src="app.rat"></rat-app>             <!-- views and areas come from app.rat -->

<rat-app routing="hash" loading>              <!-- or right in the page -->
  <rat-area dock="start" open>…</rat-area>
  <rat-view route="/">…</rat-view>
  <rat-view route="/notes/:id" src="./note.rat"></rat-view>
  <rat-view route="/settings" name="settings">
    <rat-view route="/">…</rat-view>
    <rat-view route="profile" src="./profile.rat"></rat-view>
  </rat-view>
  <rat-view route="*">not found</rat-view>
</rat-app>
```

| `<rat-app>` | |
|---|---|
| `src` | a `.rat` file, mounted in place of what the app holds (`props.app` is the element). `[loading]` by itself until its views are mounted |
| `routing` | `hash` (default), `path`, `query`, `memory`, `none`. `base` for `path` |
| `transition` | of the views: `fade` (default), `slide`, `none`, or the name of a keyframes |
| `loading` | the splash of `run.js` stays until the active views are mounted and `app.hold(promise)` is done |
| `density`, `geometry`, `layout`, `look`, `mode`, `palette`, `skin` | handed to `@gestalt/core` |
| `app.router`, `app.commands` | `router/`, `@rat/commands` listening on the app (`go[settings]`, `back`) |
| `app.view`, `app.views`, `app.area(name)`, `app.areas` | the deepest active view, every view, the areas |
| `onclick='rat:toggle[menu]'`, `RAT.toggle('menu', force?)` | an area opened or closed by its name: the event (`@rat/commands`) or the function (`RAT.toggle`, `RAT.app` is the app). both, to find out which serves better |
| `rat:ready`, `rat:navigate` | events, `rat:navigate` with `{ from, to, path, params }` |

one per page, a second one warns and stays out of it.

**matching**: per level the first view whose route matches, exactly, else as the start of the
path (a view with views in it, or a `src` not loaded yet), else a route with `*`. the rest goes
to the views inside, the params of all levels are `router.params`. `go[x]` takes the route `/x`,
else the view `name="x"`.

| `<rat-view>` | |
|---|---|
| `route` | relative to the view around it. a view without `route` is not routed |
| `src` | loaded on the first activation, mounted with the params as props (and `props.view`). other params remount it |
| `name`, `transition` | for `go[name]`, and its own transition |
| `[active]` | set by the router only. an inactive view is inert and hidden, a mounted `src` stays |
| `view.on('leave', fn, { unload })` | a guard, asked when a navigation takes the view away. `event.preventDefault()` keeps it, async is fine. returns its stop |
| `view.retry()` | after an error, loads `src` again |
| `rat:enter`, `rat:leave`, `rat:mount`, `rat:error` | events |

`<rat-area>`: `dock` (`start`, `end`, `bottom`, `none` = main), `open`, `expanded`, `peek`,
`overlay` (`auto` below `breakpoint`, `always`, `never`), `show()`, `hide()`, `toggle()`,
`expand()`, a drag on its handle. the port of `<app-area>`.

## config, `RAT`, mods

`<rat-app src>` loads `config.rat.js` next to its `src` before the app's own code runs
(`config-src` names another file, without `src` too). no such file: no config.

```js
// config.rat.js
import { Id } from '@rat/types';

export default {
  name    : 'icons',
  mods    : {
    database : { schema: { favs: { name: Id } } },               // RAT.app.database (@rat/bunker)
    files    : true,                                              // RAT.app.files, opfs
    store    : { driver: 'local' },                               // RAT.app.store
    hotkeys  : { 'ctrl+k|/': 'go[search]', 'escape': 'rat:toggle[context]' },
  },
};
```

| | |
|---|---|
| `RAT` | always there, from `@rat/runtime`: every export of `@rat/types` (`RAT.Enum` …), `RAT.app` the app, `RAT.config` its config, `RAT.toggle(name)`. as a module: `import RAT from '@rat/app'`, `import { RAT } from '@rat/runtime'`. another name: `globalThis.APP = RAT` |
| `app.config` | the config, `{}` without one |
| `build` | the build of the app (`@rat/dev`): vite's build options (`outDir`, `minify`, `sourcemap` …), merged over rat's defaults. read from the file, not run: values only, no imports. every option, commented out: `dev/docs/config.rat.js` |
| `mods` | the parts rat provides that not every app needs, each a module of `@rat/app` (`database.js`, `files.js`, `folders.js`, `hotkeys.js`, `offline.js`, `store.js`, `thumbnails.js`, listed in `mods.js`), loaded only when named. each lands on the app under its name, in the order written. `true` takes the defaults, `false` leaves it out. what the app builds itself (a player …) is its own code, no mod |
| `folders` | folders the user grants, in the database's table `folders` (`schema: { folders: FOLDERS }`, the database first). `createFolders` and `FOLDERS` from `@rat/app/modules/folders.js` |
| `database`, `store` | named after the app (`name`, else `id`). `schema`: table → its fields, `'indexed-db'` is `'indexeddb'` |
| `hotkeys` | a string is a command as in markup: `go[x]`, `rat:toggle[x]`, a name of `app.commands` |
| `thumbnails` | small webp copies of images in opfs (`createThumbs`, `@rat/app/modules/thumbnails.js`): `RAT.app.thumbnails.request(url)` gives an object url, `peek(url)` at once from memory. options: `proxy` (a template with `{url}`), `resizer`, `width`, `maxBytes` |
| `offline` | a service worker: the app works offline once it was open, and browsers offer to install it. it needs a `sw.js` next to the app (`importScripts('../../packages/app/run/sw.js')`): a worker reaches only the pages below its own folder. files of the page's origin network first, of other origins cache first |

## middleware (vercel)

`middleware.js` compiles a `.rat`, `.rat.html` or `.rat.js` file on the edge: the page gets the module and loads no compiler. the loader sees `x-rat-compiled` and takes the code as it is, autoImport comes along in `x-rat-unresolved`. a host without middleware (github pages) keeps compiling in the page.

```js
// middleware.js at the root of the vercel project
export { middleware as default } from './rat/packages/app/run/middleware.js';
export const config = { matcher: ['/:path*.rat', '/:path*.rat.html', '/:path*.rat.js'] };
```

`acorn` has to be an npm dependency of the project, the edge bundles it. a `<style lang='scss'>` loads its compiler from a cdn, which the edge can not: such a file fails there.

## errors

`<rat-view>`, `<rat-part>` and `<rat-app>` are error boundaries. an error of a
component, while it loads, renders, in an effect or in an event handler (a rejected promise
too), is raised as `rat:error` from where it happened (`@rat/runtime`: `raise`, `guard`). the
nearest boundary takes it:

- a view or a part shows it in place of its component: `<pre part="error">` and, when it has a
  `src`, `<button part="retry">`. `[error]` is set until the retry
- `<rat-app>` catches what no view or part took and shows it in a popover over the app. its
  own `src` failing shows in place, with a retry
- nobody: `reportError()`, the console as for any uncaught error

`rat:error` bubbles on after that, `detail` is `{ error, boundary }`, `defaultPrevented` says it
was taken:

```js
app.addEventListener('rat:error', ({ detail }) => log(detail.error, detail.boundary));
```

## js

```js
import { compileFile, componentOf, load } from '@rat/app';

const module = await load('./card.rat');   // the module
const Card   = componentOf(module);        // its component
```

## limits

- compiling in the page costs time on every load: fine for development and small sites. for
  production a build compiles the same files ahead.
- the import map needs `acorn` from a cdn; offline it has to be mapped to a local copy.
- `@domina/render` renders iterables (a `$List`) as lists only from the commit on domina's
  `ccr-6dcb933c-w3kck9` branch on.
