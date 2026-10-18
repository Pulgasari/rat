# @rat/app

rat without a build: a page, `.rat` files next to it, one script.

```html
<script src="./packages/app/run.js"></script>

<rat-app src="app.rat">loading …</rat-app>
<rat-part src="./chart.rat" load="visible"></rat-part>
```

demo: [`demos/app`](../../demos/app/).

## how it works

1. **`run.js`** is a classic script, not a module: it runs before any module, so the import map
   it writes is in place in time. it maps `@rat/*` into this repo, `@htx/*` and `@domina/*` into
   the repos next to it (`code.pulgasari.dev/rat/`, `/htx/`, `/domina/`, or a local checkout of
   all three side by side), `acorn` and `@pulgasari/is` / `str` to esm.sh. an import map already
   on the page wins: put it before `run.js` to point anything elsewhere. then it imports
   `index.js`, which defines the elements and loads `@rat/types` (the registry of reactive
   variants).
2. **the loader** fetches a `.rat` / `.rat.js` file, compiles it (`compileAsync`, so a
   `<style lang="scss">` works), and imports the result from a blob url. a blob module has no
   path of its own, so the loader rewrites the imports of the compiled code first (parsed with
   acorn):
   - `./card.rat`: compiled the same way, the import gets its blob url
   - `import('./card.rat')`: stays lazy, compiled when it runs
   - `./util.js`, `../x.js`: an absolute url, against the file's own url
   - `@rat/runtime`, `acorn`: stay, for the import map
3. **`<rat-app>` / `<rat-part>`** mount the component (the default export) into themselves.

one compile per url, a failed one is dropped so the next try loads again. a circle of `.rat`
files is an error naming the files. devtools show the compiled code under `<file>.rat.js`.

## splash

compiling in the page takes a moment, most of it loading the compiler. an empty `<rat-app>`
shows a splash meanwhile: logo, `rat app is being built …`, what is happening right now
(`loading the compiler`, `loading app.rat`, `compiling counter.rat` …), a spinner.

- css only, written by `run.js`: it is there with the first paint, before any module loaded.
- background and color are the page's: the logo and the spinner are masks in `currentColor`,
  so light, dark and any palette work without a setting.
- every rule sits in `:where()`, any rule of the page wins. `--rat-logo` and `--rat-spinner`
  (`url(…)`) swap the images. the logo is `splash.svg` next to `run.js`.
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

| | |
|---|---|
| `src` | the file, against the page. a new `src` mounts the new component |
| `load` | `<rat-part>` only: `eager` (default), `visible` (once in view), `idle` |
| `[loading]`, `[error]` | while loading, after a failure (the message is inside, `part="error"`) |
| `props` | a property, handed to the component when it mounts |
| `rat:mount`, `rat:error` | events, bubbling |

what the element holds until the component mounts stays: a loading screen without code.
`<rat-app>` is the entry of an app and always loads right away, `<rat-part>` is a piece of a
page (an island, [parts](../../.md/ideas/parts.md)).

## app shell: `<rat-app2>`, `<rat-view>`, `<rat-area>`

experimental, the successor of `<app-root>` from `@aufbau/elements`, built on `@domina/element`,
`@rat/router` and `@rat/commands`. `run.js` loads it (`@rat/app/shell`) when the page has a
`<rat-app2>`. demo: [`demos/app2`](../../demos/app2/).

```html
<rat-app2 routing="hash" loading>
  <rat-area dock="start" open>…</rat-area>
  <rat-view route="/">…</rat-view>
  <rat-view route="/notes/:id" src="./note.rat"></rat-view>
  <rat-view route="/settings" name="settings">
    <rat-view route="/">…</rat-view>
    <rat-view route="profile" src="./profile.rat"></rat-view>
  </rat-view>
  <rat-view route="*">not found</rat-view>
</rat-app2>
```

| `<rat-app2>` | |
|---|---|
| `routing` | `hash` (default), `path`, `query`, `memory`, `none`. `base` for `path` |
| `transition` | of the views: `fade` (default), `slide`, `none`, or the name of a keyframes |
| `loading` | the splash of `run.js` stays until the active views are mounted and `app.hold(promise)` is done |
| `density`, `geometry`, `layout`, `look`, `mode`, `palette`, `skin` | handed to `@gestalt/core` |
| `app.router`, `app.commands` | `@rat/router`, `@rat/commands` listening on the app (`go[settings]`, `back`) |
| `app.view`, `app.views`, `app.area(name)`, `app.areas` | the deepest active view, every view, the areas |
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
| `rat:enter`, `rat:leave`, `rat:mount`, `rat:error` | events |

`<rat-area>`: `dock` (`start`, `end`, `bottom`, `none` = main), `open`, `expanded`, `peek`,
`overlay` (`auto` below `breakpoint`, `always`, `never`), `show()`, `hide()`, `toggle()`,
`expand()`, a drag on its handle. the port of `<app-area>`.

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
