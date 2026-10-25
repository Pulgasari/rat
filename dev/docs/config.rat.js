// docs :: config.rat.js
// every option of a config.rat.js: what the docs use is set, the rest is commented out with its defaults

// import { Id }      from '@rat/types';
// import { FOLDERS } from '@rat/app/modules/folders.js';

export default {
  name : 'RAT docs',   // names the database and the store, unless they name themselves

  // the <meta name='viewport'> of the page: camelCase or as the meta writes it, fit is viewport-fit. a string as it is
  viewport : {
    width        : 'device-width',
    initialScale : 1,
    fit          : 'cover',
    // maximumScale : 1,
    // userScalable : 'no',
  },

  // components the markup uses without importing them, looked for as Name.rat.html, Name.rat, Name.rat.js
  // autoImport : true,                                          // the folder of this file
  // autoImport : './components/',
  // autoImport : ['./components/', '../.shared/components/'],   // in this order
  // autoImport : { './components/': ['Dock', 'Footer'] },       // only these names there

  // the parts not every app needs, each on RAT.app.<name>, in this order. true takes the defaults, false leaves it out
  // database   : { schema: { notes: { id: Id }, folders: FOLDERS }, driver: 'indexeddb', name: 'docs' },   // @rat/bunker, a table per key
  // files      : { driver: 'opfs' },                                                                       // the origin private file system, or { root: handle }
  // folders    : { accept: 'md, epub', table: 'folders' },                                                 // folders the user grants, in the database's table (database first)
  // hotkeys    : { 'ctrl+k|/': 'go[search]', 'escape': 'rat:toggle[menu]' },                               // a command as in markup, or a name of app.commands
  // offline    : { src: 'sw.js' },                                                                         // a service worker next to the app: offline once open, installable
  // store      : { driver: 'local', name: 'docs' },                                                        // keys and values: local, session, memory, cookie, cache, indexeddb
  // thumbnails : { width: 250, quality: 0.8, concurrency: 3, dir: 'thumbs', maxBytes: 64 * 1024 * 1024, proxy: '', resizer: null },   // small webp copies in opfs

  // the build (npm run build:docs, @rat/dev): vite's build options, merged over rat's defaults. read, not run: values only, no imports
  build : {
    emptyOutDir : true,
    outDir      : '../../docs',
    // assetsInlineLimit : 0,          // rat: files stay files (output-md reads markdown by its extension)
    // cssMinify         : false,      // rat: css as it is (gestalt: @function, if())
    // minify            : 'esbuild',  // false keeps the code readable
    // sourcemap         : false,      // true, 'inline' or 'hidden'
    // target            : 'baseline-widely-available',
  },
};
