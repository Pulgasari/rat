// icons :: app.js

// an Iconify browser: every set, every icon, search, favourites. 
// the grid renders through the <iconify-icon> webcomponent 
// so a page of hundreds of icons is a couple of batched requests;
// the app's own chrome uses <svg-icon>.
// data comes from api.iconify.design (modules/iconify.js),
// favourites from @bunker/db (modules/db.js).

// ::: vendors
import { computed, signal }  from '@aufbau/signals';
import { useEffect, useRef } from '/.shared/js/vendors.js';
import createElement from '@domina/methods/createElement.js';

// the <iconify-icon> element, not awaited: the app runs without it, the grid fills in once it is there
import('https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js').catch(() => {});

const { Config, Dock, Empty, Loading, Views } = await zugriff.components('Config', 'Dock', 'Empty', 'Loading', 'Views');

// ::: the app handle
const app = zugriff.app;
app.api = await app.module('iconify');
app.db  = await app.module('db');

// :::::: STATE :::::::::::::::::::::::::::::::::::::::::::::
// the view on screen is #app's business (app-view, the hash), the rest is on app.state
// (deep signal, no `.value`). the api results (collections / set / search) stay plain
// signals — a set is thousands of names, better not deep-wrapped.

app.state.$extend({
  detail    : { type: 'scalar', value: null                },   // the icon in the context area | null
  prefix    : { type: 'scalar', value: null, persist: true },   // the set of the 'set' view
  setFilter : { type: 'scalar', value: '',   persist: true },   // filter on the sets list
  query     : { type: 'scalar', value: '',   persist: true },   // search box
});

const collections = signal(null);   // [{ prefix, name, total, … }] | null
const setData     = signal(null);   // { prefix, title, total, icons } for route 'set'
const setLoading  = signal(false);
const results     = signal([]);
const searching   = signal(false);
const itemSize    = app.persisted('itemSize', 88); // persisted grid zoom

// :::::: FRAME :::::::::::::::::::::::::::::::::::::::::::::
// #app is the <app-root>: the views in the main area, the icon in the context area

const area = app.area;

function inspect (name) {
  app.state.detail = name;
  area('context')?.show();
}

function closeDetail () {
  area('context')?.hide();
  app.state.detail = null;
}

// :::::: DATA :::::::::::::::::::::::::::::::::::::::::::::::

async function ensureCollections () {
  if (collections.value) return;
  try   { collections.value = await app.api.collections(); }
  catch { collections.value = []; app.toast({ error: 'Could not reach the Iconify API' }); }
}

async function loadSet (prefix) {
  if (!prefix || setData.value?.prefix === prefix) return;
  setData.value = null;
  setLoading.value = true;
  try     { setData.value = await app.api.collection(prefix); }
  catch   { app.toast({ error: 'Could not load that set' }); }
  finally { setLoading.value = false; }
}

function openSet (prefix) {
  app.state.prefix = prefix;
  loadSet(prefix);
  app.go('set');
}

let searchTimer = null;
function onSearch (value) {
  app.state.query = value;
  clearTimeout(searchTimer);
  const q = value.trim();
  if (!q) { results.value = []; searching.value = false; return; }
  searching.value = true;
  searchTimer = setTimeout(async () => {
    try     { results.value = await app.api.search(q); }
    catch   { app.toast({ error: 'Search failed' }); }
    finally { searching.value = false; }
  }, 250);
}

// :::::: ACTIONS + HOTKEYS ::::::::::::::::::::::::::::::::::
// escape closes the icon in the context area

app.actions = { 'dismiss': closeDetail };
app.hotkeys = { 'escape': { action: 'dismiss', global: true, when: () => !!app.state.$detail } };

// :::::: HELPERS :::::::::::::::::::::::::::::::::::::::::::

const nfmt = n => n?.toLocaleString?.() ?? String(n ?? 0);

const filteredSets = computed(() => {
  const list = collections.value || [];
  const q = app.state.$setFilter.trim().toLowerCase();
  return q ? list.filter(c => c.name.toLowerCase().includes(q) || c.prefix.toLowerCase().includes(q)) : list;
});

async function copy (text) {
  try {
    await navigator.clipboard.writeText(text);
    app.toast({ success: 'Copied' });
  }
  catch { app.toast({ error: 'Copy failed' }); }
}
/*
const copySvg = (name) => {
  const text = await app.api.svgText(name);
  copy(text);
};
*/
async function copySvg (name) {
  try {
    const text = await app.api.svgText(name);
    await navigator.clipboard.writeText(text);
    app.toast({ success: 'SVG copied' });
  }
  catch { app.toast({ error: 'Could not copy the SVG' }); }
}
async function downloadSvg (name) {
  try {
    const blob = new Blob([await app.api.svgText(name)], { type: 'image/svg+xml' });
    const href = URL.createObjectURL(blob);
    const a    = createElement('a', { href, download: name.replace(':', '-') + '.svg' });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
  } 
  catch { app.toast({ error: 'Could not download the SVG' }); }
}

const z = {};
z.clipboard = {};

// :::::: COMPONENTS ::::::::::::::::::::::::::::::::::::::::

// the icon svg itself, via the batching/caching web component
const IconGlyph = ({ name }) => html`<iconify-icon icon=${name}></iconify-icon>`;

function IconCell ({ name }) {
  const fav = app.db.favs.value.has(name);
  return html`
    <button class="cell" onClick=${() => inspect(name)} title=${name}>
      <span class="glyph"><${IconGlyph} name=${name} /></span>
      <span class="cname">${name.split(':')[1]}</span>
      <btn-push
        class=${'heart' + (fav ? ' on' : '')}
        icon=${fav ? 'heart' : 'heart-outline'}
        title="Favourite"
        onClick=${e => { e.stopPropagation(); app.db.toggleFav(name); }}
      />
    </button>
  `;
}

function IconGrid ({ names }) {
  const ref = useRef(null);

  useEffect(() => {
    let handle;
    import('@aufbau/gestures')
      .then(g => { if (ref.current) handle = g.adjustable(ref.current, { onChange: v => itemSize.value = Math.round(v), value: itemSize.value, minimum: 56, maximum: 200 }); })
      .catch(() => {});
    return () => handle?.destroy();
  }, []);

  if (!names.length) return html`<${Empty} icon="image-search" title="Nothing here." />`;
  return html`
    <div class="grid" ref=${ref} style=${`--isz:${itemSize.value}px`}>
      ${names.map(n => html`<${IconCell} key=${n} name=${n} />`)}
    </div>
  `;
}

// ── views ────────────────────────────────────────────────────────────────

function HomeView () {
  const list = collections.value;
  const sets = list?.length ?? 0;
  const total = (list || []).reduce((n, c) => n + (c.total || 0), 0);
  return html`
    <div class="home">
      <div class="hero">
        <svg-icon icon="mdi:emoticon-outline" />
        <h1>The whole Iconify library</h1>
        <p>${list ? `Browse ${nfmt(total)} icons across ${nfmt(sets)} sets.` : 'Loading the catalogue…'}</p>
        <div class="hero-actions">
          <btn-push icon='images' label='browse sets' onClick=${() => app.go('sets')}   />
          <btn-push icon='search' label='search'      onClick=${() => app.go('search')} />
        </div>
      </div>
      ${list && list.length > 0 && html`
        <div class="home-sets">
          <div class="home-sets-head">Popular sets</div>
          <div class="chips">
            ${['mdi', 'material-symbols', 'lucide', 'ph', 'tabler', 'bi', 'fa6-solid', 'ri', 'carbon', 'solar']
              .map(p => list.find(c => c.prefix === p)).filter(Boolean)
              .map(c => html`<button class="chip" key=${c.prefix} onClick=${() => openSet(c.prefix)}>${c.name} <span>${nfmt(c.total)}</span></button>`)}
          </div>
        </div>`}
    </div>
  `;
}

function SetsView () {
  if (!collections.value) return html`<${Loading}/>`;
  const rows = filteredSets.value;
  return html`
    <div class="sets">
      ${rows.map(c => html`
        <button class="set-card" key=${c.prefix} onClick=${() => openSet(c.prefix)}>
          <div class="set-samples">
            ${(c.samples.length ? c.samples : ['']).slice(0, 3).map(s => s ? html`<iconify-icon key=${s} icon=${`${c.prefix}:${s}`}></iconify-icon>` : '')}
          </div>
          <div class="set-name" title=${c.name}>${c.name}</div>
          <div class="set-meta">${nfmt(c.total)} icons${c.author ? ` · ${c.author}` : ''}</div>
        </button>`)}
      ${!rows.length && html`<${Empty} icon='image-search' title="Nothing here." />`}
    </div>`;
}

function SetView () {
  useEffect(() => { loadSet(app.state.$prefix); }, []);
  const d = setData.value;
  if (!app.state.$prefix) return html`<${Empty} icon='images' hint='Pick a set.' />`;
  if (setLoading.value || !d) return html`<${Loading}/>`;
  return html`
    <div class="setview">
      <header class="setview-head">
        <div>
          <h1>${d.title}</h1>
          <div class="sub">${nfmt(d.total)} icons · <code>${d.prefix}</code></div>
        </div>
        <btn-push class='small' icon='copy' label='copy prefix' onClick=${() => copy(d.prefix)} />
      </header>
      <${IconGrid} names=${d.icons} />
    </div>`;
}

function SearchView () {
  // the query survives a reload, the results do not
  useEffect(() => { if (app.state.$query.trim() && !results.value.length) onSearch(app.state.$query); }, []);
  return html`
    <div class="searchview">
      ${searching.value ? html`<${Loading}/>`
        : app.state.$query.trim() ? html`<${IconGrid} names=${results.value} />`
        : html`<${Empty} icon='search' hint='Search across every Iconify set.' />`}
    </div>
  `;
}

function FavoritesView () {
  const names = [...app.db.favs.value];
  return names.length
    ? html`<${IconGrid} names=${names} />`
    : html`<${Empty} icon='heart' hint='No favourites yet — tap the heart on any icon.' />`;
}

// ── top bar ──────────────────────────────────────────────────────────────

function SizeControl () {
  return html`
    <div class="size">
      <svg-icon icon='zoom-out' />
      <input type="range" min="56" max="200" step="1" value=${itemSize.value} onInput=${e => itemSize.value = +e.target.value} />
      <svg-icon icon='zoom-in' />
    </div>
  `;
}

// each view carries its own, `name` is the view's
function TopBar ({ name }) {
  const grid = name === 'set' || name === 'search' || name === 'favs';
  return html`
    <header class="topbar">
      ${name === 'set' && html`<btn-icon icon="arrow-left" label="Back" onClick=${() => app.go('sets')} />`}

      ${name === 'search'
        ? html`<div class="searchbox big">
            <svg-icon icon='search' />
            <input type="search" placeholder="Search all of Iconify…" value=${app.state.$query} onInput=${e => onSearch(e.target.value)} />
          </div>`
        : name === 'sets'
        ? html`<div class="searchbox">
            <svg-icon icon='search' />
            <input type="search" placeholder="Filter sets…" value=${app.state.$setFilter} onInput=${e => app.state.setFilter = e.target.value} />
          </div>`
        : html`<h1>${name === 'favs' ? 'Favourites' : name === 'set' ? 'Sets' : 'Icons'}</h1>`}

      <span class="spacer"></span>
      ${grid && html`<${SizeControl} />`}
    </header>`;
}

// ── detail, the content of the context area ──────────────────────────────

function Detail () {
  const name = app.state.$detail;
  if (!name) return null;
  const [prefix, icon] = name.split(':');
  const fav = app.db.favs.value.has(name);
  return html`
    <app-panel heading=${icon}>
      <div class="detail">
        <div class="sheet-preview"><iconify-icon icon=${name}></iconify-icon></div>
        <div class="sheet-set"><button class="linkish" onClick=${() => { closeDetail(); openSet(prefix); }}>${prefix}</button></div>
        <div class="sheet-actions">
          <btn-push icon='copy'     label='copy name' onClick=${() => copy        (name)} />
          <btn-push icon='svg'      label='copy svg'  onClick=${() => copySvg     (name)} />
          <btn-push icon='download' label='download'  onClick=${() => downloadSvg (name)} />
          <btn-push
            icon=${fav ? 'heart' : 'heart-outline'}
            label=${fav ? 'Favourited' : 'Favourite'}
            onClick=${() => app.db.toggleFav(name)}
          />
        </div>
      </div>
    </app-panel>`;
}

// :::::: APP :::::::::::::::::::::::::::::::::::::::::::::::

// every view is the top bar over its content
const withBar = (name, View) => () => html`<${TopBar} name=${name} /><main><${View} /></main>`;

app.views = {
  home   : { route: '/',       view: withBar('home',   HomeView)      },
  sets   : { route: '/sets',   view: withBar('sets',   SetsView)      },
  set    : { route: '/set',    view: withBar('set',    SetView)       },
  search : { route: '/search', view: withBar('search', SearchView)    },
  favs   : { route: '/favs',   view: withBar('favs',   FavoritesView) },
};

const dockItems = [
  { icon: 'mdi:home', label: 'home',     view: 'home'                                },
  { icon: 'search',   label: 'search',   view: 'search'                              },
  { icon: 'images',   label: 'sets',     view: 'sets', match: ['set']                },
  { icon: 'heart',    label: 'favs',     view: 'favs'                                },
  { icon: 'settings', label: 'settings', onClick: () => area('config')?.toggle()     },
];

// the areas of #app, the root
function App () {
  useEffect(() => {
    app.db.loadFavs().catch(() => {});
    ensureCollections(); // warms the catalogue for home stats + sets
  }, []);

  return html`
    <app-area name='main'>
      <${Views} />
      <${Dock} items=${dockItems} />
    </app-area>
    <app-area name='context' dock='bottom' ontoggle=${event => { if (!event.detail?.open) app.state.detail = null; }}><${Detail} /></app-area>
    <app-area name='config' dock='end'><${Config} /></app-area>
  `;
}

// :::::: BOOT

app.init({ App });
