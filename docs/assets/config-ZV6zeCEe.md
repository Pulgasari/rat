# config.rat.js

`<rat-app src='app.rat'>` loads `config.rat.js` next to its `src` before the app's code runs. It is read as data where a build needs it: values only in `build`.

```js
// config.rat.js
import { Id } from '@rat/types';

export default {
  name   : 'notes',                                    // names the database and the store
  import : ['@aufbau/elements/webcomponents/btn-icon.js'],   // run before the app: its elements
  autoImport : ['./components/'],                      // components without an import

  icons   : { close: 'lucide:x' },                     // icon='close' in every <svg-icon>
  hotkeys : { 'ctrl+k|/': 'go[search]', escape: 'rat:toggle[menu]' },

  database : { schema: { notes: { id: Id } } },       // RAT.app.database
  store    : true,                                     // RAT.app.store
  offline  : true,                                     // a service worker, installable

  build : { outDir: '../dist' },                       // vite's build options
};
```

## The options

| key | |
|---|---|
| `name` | the app's name, also of its database and store |
| `viewport` | the `<meta name=viewport>`: `{ width: 'device-width', initialScale: 1, fit: 'cover' }` |
| `import` | modules run before the app: elements, a web component from a cdn. a build takes these and nothing else |
| `autoImport` | folders whose components need no import: `true`, a path, a list, or `{ './components/': ['Dock'] }` |
| `icons` | short names for icon ids |
| `hotkeys` | a key combination → a command as in markup (`go[x]`, `rat:toggle[x]`) or a name of `RAT.app.commands` |
| `stored` | where `$name!` values go: `{ in: 'store' }` |
| `capacitor`, `desktop` | the native project of `rat build --target android` / `desktop` |
| `build` | vite's build options over rat's defaults |

## Mods

The parts not every app needs. Named in the config, each lands on `RAT.app` under its key, loaded only then. `true` takes the defaults.

| mod | `RAT.app.…` |
|---|---|
| `database` | tables of `@rat/bunker`: `{ schema: { notes: { id: Id } }, driver: 'indexeddb' }` |
| `store` | keys and values: `{ driver: 'local' }` |
| `files` | a file system, opfs by default |
| `folders` | folders the user grants, kept in the database: `{ accept: 'md, epub' }` |
| `thumbnails` | small webp copies of images: `{ width: 250 }` |
| `offline` | a service worker (`sw.js` next to the app) |
| `clipboard`, `dialogs`, `external`, `notifications` | what their name says, with a driver per platform |
