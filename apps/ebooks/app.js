// apps/ebooks/app.js
// the ebook library + reader on the shared handle. the runtime binds zugriff (+ zugriff.app,
// html) to window before this runs, so nothing here imports the runtime. the library lives
// in the db module (app.db); ephemeral ui state on app.state; reading prefs are persisted
// signals. the views read all of it off the handle.

const app = zugriff.app;

// :::::: IMPORT :::::::::::::::::::::::::::::::::::::::::::::

import { computed, signal } from '@aufbau/signals';
import { useEffect }                     from '/.shared/js/vendors.js';

// :::::: HANDLE ::::::::::::::::::::::::::::::::::::::::::::
// before the views are imported: a component captured at module scope sees whatever
// was on the handle at import time

app.db = await app.module('db');
app.fs = zugriff.fs;

// :::::: STATE ::::::::::::::::::::::::::::::::::::::::::::::

// the view on screen is #app's business (app-view, the hash)
app.state.$extend({
  bookKey : { type: 'scalar', value: null, persist: true },   // the book in the reader
  search  : { type: 'scalar', value: ''                  },
  folder  : { type: 'scalar', value: ''                  },   // '' = all folders, else sourceId
});

app.sort = app.persisted('sort', 'recent', { values: ['recent', 'title', 'author', 'added'] });

// epub reading prefs, remembered across books
app.readerFlow = app.persisted('readerFlow', 'paginated');
app.readerFont = app.persisted('readerFont', 100);
app.readerUi   = signal({ ready: false });

// :::::: LIBRARY :::::::::::::::::::::::::::::::::::::::::::

const authorOf     = book => book.author || '';
const lastOpenedOf = book => app.db.progressOf(book.key)?.lastOpenedAt || 0;
const compare      = (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' });

const sortBooks = (list, mode) => [...list].sort((a, b) =>
    mode === 'title'  ? compare(a.title, b.title)
  : mode === 'author' ? compare(authorOf(a), authorOf(b)) || compare(a.title, b.title)
  : mode === 'added'  ? (b.addedAt || 0) - (a.addedAt || 0)
  : /* recent */        lastOpenedOf(b) - lastOpenedOf(a) || (b.addedAt || 0) - (a.addedAt || 0));

app.visibleBooks = computed(() => {
  const query = app.state.$search.trim().toLowerCase();
  let list = app.db.books.value;
  if (app.state.$folder) list = list.filter(book => book.sourceId === app.state.$folder);
  if (query) list = list.filter(book => [book.title, authorOf(book), book.name].some(text => text.toLowerCase().includes(query)));
  return sortBooks(list, app.sort.value);
});

app.percentOf = key => app.db.progressOf(key)?.percent ?? 0;

// :::::: FRAME :::::::::::::::::::::::::::::::::::::::::::::
// #app is the <app-root>: library and reader in the main area, the settings in the config area

// the reader is in the dom while it is on screen only, leaving it closes the book
const Reader = () => {
  const key = app.state.$bookKey;
  return key ? html`<${ReaderView} bookKey=${key} key=${key} />` : null;
};

app.views = {
  library : { route: '/',       view: 'LibraryView' },
  reader  : { route: '/reader', view: Reader, transient: true },
};

app.toggleConfig = () => app.area('config')?.toggle();

// :::::: ACTIONS :::::::::::::::::::::::::::::::::::::::::::

app.openReader = key => {
  app.state.bookKey = key;
  app.db.markOpened(key);
  app.go('reader');
};

app.closeReader = () => app.go('library');

app.addFolder = async () => {
  if (!app.fs.supported()) return app.toast.error('This browser can’t open folders — try Chrome, Edge or another Chromium browser.');
  try {
    const source = await app.db.addFolder();
    if (source) app.toast.success(`Added ${source.name}`);
  }
  catch (error) { app.toast.error(error); }
};

// :::::: VIEWS :::::::::::::::::::::::::::::::::::::::::::::

const [ReaderView, { Config, Views }] = await Promise.all([
  app.view('ReaderView'),
  zugriff.components('Config', 'Views'),
]);

// :::::: APP :::::::::::::::::::::::::::::::::::::::::::::::

function App () {
  useEffect(() => { app.db.load().catch(error => app.toast.error(error)); }, []);

  if (!app.db.ready.value) return html`<div class="booting"><svg-icon icon="svg-spinners:bars-scale-middle" /></div>`;

  return html`
    <app-area name='main'><${Views} transition-on='glide' /></app-area>
    <app-area name='config' dock='end'><${Config} /></app-area>
  `;
}

// :::::: BOOT ::::::::::::::::::::::::::::::::::::::::::::::

app.init({ App });
