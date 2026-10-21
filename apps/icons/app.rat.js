// icons :: app.rat.js

// an Iconify browser: every set, every icon, search, favourites.
// the grid renders through the <iconify-icon> webcomponent, so a page of hundreds
// of icons is a couple of batched requests; the app's own chrome uses <svg-icon>.
// data comes from api.iconify.design (modules/iconify.js), favourites from the
// database of config.rat.js (RAT.app.database.favs, @rat/bunker).

import { autoloader } from '@aufbau/elements';
import gestures       from '@aufbau/gestures';
import { effect }     from '@rat/runtime';

import createElement from '@domina/verbs/createElement.js';

import Dock     from '../.shared/components/Dock.rat.html';
import Empty    from '../.shared/components/Empty.rat.html';
import Loading  from '../.shared/components/Loading.rat.html';
import Settings from '../.shared/components/Settings.rat.html';

import { hint }        from '../.shared/install.js';
import { read, write } from '../.shared/storage.js';
import { toast }       from '../.shared/toast.js';

import * as api from './modules/iconify.js';

// the <iconify-icon> element, not awaited: the app runs without it, the grid fills in once it is there
import('https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js').catch(() => {});

autoloader();

// :::::: STATE

let $collections = null;   // [{ prefix, name, total, samples, author }] | null
let $set         = null;   // { prefix, title, total, icons } of the set view | null
let $setLoading  = false;
let $results     = null;   // the icon names of the search | null
let $searching   = false;
let $detail      = null;   // the icon in the context area | null

// kept by hand until persistence is decided
let $setFilter = read('icons:setFilter', '');
let $query     = read('icons:query', '');
let $itemSize  = read('icons:itemSize', 88);

effect(() => write('icons:setFilter', $setFilter));
effect(() => write('icons:query', $query));
effect(() => write('icons:itemSize', $itemSize));

// the set of the route /set/:prefix
const $prefix = /^\/set\/(.+)$/.exec(RAT.app.router.$path.value)?.[1] ?? null;

// the hearted icons: the table follows as $items, its names as a set
const favs  = RAT.app.database.favs;
const $favs = new Set(favs.$items.map(fav => fav.name));

// :::::: DATA

async function loadCollections () {
  if ($collections) return;
  try   { $collections = await api.collections(); }
  catch { $collections = []; toast.error('Could not reach the Iconify API'); }
}

async function loadSet (prefix) {
  if (!prefix || $set?.prefix === prefix) return;
  $set        = null;
  $setLoading = true;
  try     { $set = await api.collection(prefix); }
  catch   { toast.error('Could not load that set'); }
  finally { $setLoading = false; }
}

effect(() => { loadSet($prefix ? decodeURIComponent($prefix) : null); });

const go      = path => RAT.app.router.go(path);
const openSet = prefix => go(`/set/${encodeURIComponent(prefix)}`);

let searchTimer = null;

function search (value) {
  $query = value;
  clearTimeout(searchTimer);
  const text = value.trim();
  if (!text) { $results = null; $searching = false; return; }
  $searching  = true;
  searchTimer = setTimeout(async () => {
    try     { $results = await api.search(text); }
    catch   { toast.error('Search failed'); }
    finally { $searching = false; }
  }, 250);
}

// :::::: DETAIL

function inspect (name) {
  $detail = name;
  RAT.toggle('context', true);
}

function closeDetail () {
  RAT.toggle('context', false);
  $detail = null;
}

// escape: one level up. the detail closes by itself (an overlay uses the key up first)
function up () {
  const path = RAT.app.router.$path.value;
  if (path.startsWith('/set/')) go('/sets');
  else if (path === '/search' && $query) search('');
  else if (path !== '/') go('/');
}

// :::::: HELPERS

const count = number => number?.toLocaleString?.() ?? String(number ?? 0);

const $sets = (() => {
  const query = $setFilter.trim().toLowerCase();
  const list  = $collections ?? [];
  return query ? list.filter(set => set.name.toLowerCase().includes(query) || set.prefix.toLowerCase().includes(query)) : list;
})();

const $total = ($collections ?? []).reduce((sum, set) => sum + (set.total || 0), 0);

const POPULAR = ['mdi', 'material-symbols', 'lucide', 'ph', 'tabler', 'bi', 'fa6-solid', 'ri', 'carbon', 'solar'];

const $popular = POPULAR.map(prefix => ($collections ?? []).find(set => set.prefix === prefix)).filter(Boolean);

async function copy (text, done = 'Copied') {
  try   { await navigator.clipboard.writeText(text); toast.success(done); }
  catch { toast.error('Copy failed'); }
}

async function copySvg (name) {
  try   { await copy(await api.svgText(name), 'SVG copied'); }
  catch { toast.error('Could not copy the SVG'); }
}

async function downloadSvg (name) {
  try {
    const href = URL.createObjectURL(new Blob([await api.svgText(name)], { type: 'image/svg+xml' }));
    const link = createElement('a', { download: name.replace(':', '-') + '.svg', href });
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
  }
  catch { toast.error('Could not download the SVG'); }
}

const isFav = name => $favs.has(name);

function toggleFav (name, event) {
  event?.stopPropagation();
  return isFav(name) ? favs.delete(name) : favs.add({ name });
}

// :::::: COMPONENTS

const IconCell = props => html`
  <button.cell title={props.name} onclick={() => inspect(props.name)}>
    <span.glyph><iconify-icon icon={props.name}></iconify-icon></span.glyph>
    <span.cname>{props.name.split(':')[1]}</span.cname>
    <btn-push class={isFav(props.name) ? 'heart on' : 'heart'} icon={isFav(props.name) ? 'heart' : 'heart-outline'} title='Favourite' onclick={event => toggleFav(props.name, event)} />
  </button.cell>
`;

// pinch on the grid (two fingers, a trackpad pinch): the cell size follows
const SIZES = { max: 200, min: 56 };

const pinchSize = element => {
  let start = $itemSize;
  const handle = gestures(element, {
    onPinchStart : () => { start = $itemSize; },
    onPinchMove  : gesture => { $itemSize = Math.round(Math.min(SIZES.max, Math.max(SIZES.min, start * gesture.scale))); },
  });
  return () => handle.destroy();
};

const IconGrid = props => html`
  @if (props.names?.length)
    <div.grid style={'--isz: ' + $itemSize + 'px'} @pinch-size>
      @for (name of props.names): <IconCell name={name} />
    </div.grid>
  @else
    <Empty icon='image-search' title='Nothing here.' />
`;

const SizeControl = () => html`
  <div.size>
    <svg-icon icon='zoom-out' />
    <input type='range' min={SIZES.min} max={SIZES.max} step='1' value={$itemSize} oninput={event => $itemSize = Number(event.target.value)} />
    <svg-icon icon='zoom-in' />
  </div.size>
`;

// :::::: VIEWS

/* --- beobachtung -----------
<btn-push icon='search' label='search' onclick='go[search]' />
<btn-push icon|label='search' onclick='go[search]' />

angesichts dessen dass man bei konsistentem benennen 
häufiger die gelegenheit haben müsste, ist es sicherlich suboptimal,
dass hier auf den value des commands nich gleichartig verwiesen werden kann.

<btn-push icon|label|cmd:go='search' />
<btn-push icon|label|cmd.go='search' />
<btn-push icon|label|cmd[go]='search' />

bzgl. `cmd` dachte ich generell schonmal an command-namespace-attr
für die das commands-modul sowie als kurzschreibweise für `command='skip' commandfor='player'`

<button command='skip' commandfor='player' />
<button cmd[player]='skip' />
<button cmd:skip[player] />

https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/commandForElement
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#commandfor

das soll nix suggerieren oder festlegen, ist nur notiz/gedanke
----------- */

const HomeView = () => html`
  <div.home>
    <div.hero>
      <svg-icon icon='mdi:emoticon-outline' />
      <h1>The whole Iconify library</h1>
      <p>{$collections ? 'Browse ' + count($total) + ' icons across ' + count($collections.length) + ' sets.' : 'Loading the catalogue …'}</p>
      <div.hero-actions>
        <btn-push icon='images' label='browse sets' onclick='go[sets]' />
        <btn-push icon='search' label='search' onclick='go[search]' />
      </div.hero-actions>
    </div.hero>
    @if ($popular.length)
      <div.home-sets>
        <div.home-sets-head>Popular sets</div.home-sets-head>
        <div.chips>
          @for (set of $popular): <button.chip onclick={() => openSet(set.prefix)}>{set.name} <span>{count(set.total)}</span></button.chip>
        </div.chips>
      </div.home-sets>
  </div.home>
`;

const SetsView = () => html`
  <header.topbar>
    <div.searchbox>
      <svg-icon icon='search' />
      <input type='search' placeholder='Filter sets …' bind:value={$setFilter} />
    </div.searchbox>
  </header.topbar>
  @if (!$collections)
    <Loading />
  @else
    <div.sets>
      @for (set of $sets)
        <button.set-card onclick={() => openSet(set.prefix)}>
          <div.set-samples>
            @for (sample of set.samples.slice(0, 3)): <iconify-icon icon={set.prefix + ':' + sample}></iconify-icon>
          </div.set-samples>
          <div.set-name title={set.name}>{set.name}</div.set-name>
          <div.set-meta>{count(set.total)} icons{set.author ? ' · ' + set.author : ''}</div.set-meta>
        </button.set-card>
      @else
        <Empty icon='image-search' title='Nothing here.' />
    </div.sets>
`;

const SetView = () => html`
  <header.topbar>
    <btn-icon icon='arrow-left' label='Back' onclick='go[sets]' />
    <span.spacer></span.spacer>
    <SizeControl />
  </header.topbar>
  @if ($setLoading || !$set)
    <Loading />
  @else
    <div.setview>
      <header.setview-head>
        <div>
          <h1>{$set.title}</h1>
          <div.sub>{count($set.total)} icons · <code>{$set.prefix}</code></div.sub>
        </div>
        <btn-push class='small' icon='copy' label='copy prefix' onclick={() => copy($set.prefix)} />
      </header.setview-head>
      <IconGrid names={$set.icons} />
    </div.setview>
`;

const SearchView = () => html`
  <header.topbar>
    <div.searchbox.big>
      <svg-icon icon='search' />
      <input type='search' placeholder='Search all of Iconify …' value={$query} oninput={event => search(event.target.value)} />
    </div.searchbox.big>
    <SizeControl />
  </header.topbar>
  @if ($searching)
    <Loading />
  @else
    @if ($query.trim())
      <IconGrid names={$results ?? []} />
    @else
      <Empty icon='search' hint='Search across every Iconify set.' />
`;

const FavoritesView = () => html`
  <header.topbar>
    <h1>Favourites</h1>
    <span.spacer></span.spacer>
    <SizeControl />
  </header.topbar>
  @if ($favs.size)
    <IconGrid names={[...$favs]} />
  @else
    <Empty icon='heart' hint='No favourites yet: tap the heart on any icon.' />
`;

// the content of the context area
const Detail = () => html`
  @if ($detail)
    <app-panel heading={$detail.split(':')[1]}>
      <div.detail>
        <div.sheet-preview><iconify-icon icon={$detail}></iconify-icon></div.sheet-preview>
        <div.sheet-set><button.linkish onclick={() => { const [prefix] = $detail.split(':'); closeDetail(); openSet(prefix); }}>{$detail.split(':')[0]}</button.linkish></div.sheet-set>
        <div.sheet-actions>
          <btn-push icon='copy' label='copy name' onclick={() => copy($detail)} />
          <btn-push icon='svg' label='copy svg' onclick={() => copySvg($detail)} />
          <btn-push icon='download' label='download' onclick={() => downloadSvg($detail)} />
          <btn-push icon={isFav($detail) ? 'heart' : 'heart-outline'} label={isFav($detail) ? 'Favourited' : 'Favourite'} onclick={() => toggleFav($detail)} />
        </div.sheet-actions>
      </div.detail>
    </app-panel>
`;

// :::::: APP

const dock = [
  { icon: 'mdi:home', label: 'home',     to: '/'                          },
  { icon: 'search',   label: 'search',   to: '/search'                    },
  { icon: 'images',   label: 'sets',     to: '/sets', match: ['/set']     },
  { icon: 'heart',    label: 'favs',     to: '/favs'                      },
  { icon: 'settings', label: 'settings', onclick: () => RAT.toggle('config') },
];

export default props => {
  props.app.hold(loadCollections());
  props.app.commands.add('up', up);
  hint('Icons');

  // the query survives a reload, its results do not
  if ($query.trim()) search($query);

  return html`
    <rat-view route='/' name='home'><HomeView /></rat-view>
    <rat-view route='/sets' name='sets'><SetsView /></rat-view>
    <rat-view route='/set/:prefix' name='set'><SetView /></rat-view>
    <rat-view route='/search' name='search'><SearchView /></rat-view>
    <rat-view route='/favs' name='favs'><FavoritesView /></rat-view>

    <rat-area name='dock' dock='bottom' overlay='never' open><Dock items={dock} /></rat-area>
    <rat-area name='context' dock='bottom' overlay='always' on:toggle={event => { if (!event.detail?.open) $detail = null; }}><Detail /></rat-area>
    <rat-area name='config' dock='end'>
      <Settings name='Icons'>
        <section>
          <h3>grid</h3>
          <label><span>cell size (or pinch the grid)</span><SizeControl /></label>
        </section>
      </Settings>
    </rat-area>
  `;
};
