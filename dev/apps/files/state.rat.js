// files :: state.rat.js

/*
the state of the app and what can be done with it: the tabs of the library, the listing on screen, the
selection, the file in the preview, the settings. the views and the context area read it, the actions
change it. the modules hold the rest: the folder (root), the servers (remotes), the index (scan), tasks,
places, transfer, sending (sync). the views import their $values straight from there.

a tab is { path, source }: path a Path (@rat/types/Path), source null for the granted folder, else the id
of a server.
*/

// :::::: IMPORT

import dom from '@domina/dom';
import { effect, untrack }           from '@rat/signals';
import { $List, $Record, Enum, Str } from '@rat/types';
import { Path }                      from '@rat/types/Path';

import { read, write } from '../.shared/storage.js';
import { toast }       from '../.shared/toast.js';

import * as fs       from './modules/fs.js';
import * as places   from './modules/places.rat.js';
import * as remotes  from './modules/remotes.rat.js';
import * as root     from './modules/root.rat.js';
import * as scan     from './modules/scan.rat.js';
import * as sync     from './modules/sync.rat.js';
import * as transfer from './modules/transfer.rat.js';

import { $folder, $handle }                         from './modules/root.rat.js';
import { $index, $scanning, CATEGORIES, categoryOf } from './modules/scan.rat.js';
import { run }                                      from './modules/tasks.rat.js';
import { $pickboard }                               from './modules/transfer.rat.js';

const { dialogs, router } = RAT.app;

// :::::: CONSTANTS

const ICON = {
  copy : 'lucide:copy',
  move : 'lucide:scissors',
};

export const PATTERNS = ['pattern-bg', 'pattern-tile'];

// :::::: SETTINGS, kept across visits under files:settings

const Settings = {
  open           : Enum('auto', 'single', 'double'),   // a tap opens, a double click, or by the pointer
  'pattern-bg'   : Str,                                // a pattern behind the app: 'dots 8%', '' for none
  'pattern-tile' : Str,                                // a pattern on the tiles and cards
  searchbar      : Enum('bottom', 'top'),
  tabbar         : Enum('bottom', 'top'),
  viewmode       : Enum('list', 'grid'),
};

export const $settings = $Record(Settings).create(read('files:settings', {}));

effect(() => write('files:settings', $settings));

effect(() => {
  const element = document.documentElement;
  for (const name of PATTERNS) {
    const value = $settings[name];
    element.toggleAttribute(`data-${name}`, Boolean(value));
    if (!value) continue;
    import('@aufbau/elements/webcomponents/input/types/pattern.js')
      .then(({ patternStyle }) => patternStyle(value, { name }))
      .then(style => {
        if (!style || untrack(() => $settings[name]) !== value) return;
        for (const [property, css] of Object.entries(style)) element.style.setProperty(property, css);
      });
  }
});

// where the tabs and the search bar sit: app.css orders them by these
effect(() => {
  const { dataset } = document.documentElement;
  dataset.searchbar = $settings.searchbar;
  dataset.tabbar    = $settings.tabbar;
});

const touch = () => globalThis.matchMedia?.('(pointer: coarse)').matches;

export const opensOnTap = () => $settings.open === 'single' || ($settings.open === 'auto' && touch());

// :::::: STATE

export let
$category = null,    // the category the dashboard lists, or null
$entries  = [],      // the listing of the current tab's path
$file     = null,    // the entry in the preview
$filter   = '',      // the library's filter
$loading  = false,   // a listing is on its way, the old one is gone already
$query    = '',      // the dashboard's search over the index
$selected = null,    // the entry the context area is about
$sheet    = null,    // what the context area shows instead: 'tasks', 'remotes'
$size     = null;    // { width, height } of the image in the preview

// :::::: TABS, each a $Record { path, source }

const Tab = $Record({ path: Path, '?source': Str });

const tabOf = (tab = {}) => Tab.create({ path: tab.path ?? Path.root, source: tab.source ?? null });

// kept as { index, list }, the paths as 'a/b' (an older tab's as ['a', 'b'])
const stored = read('files:tabs', { index: 0, list: [] });

export const $tabs = new $List(stored.list.map(tabOf));
if (!$tabs.length) $tabs.push(tabOf());

// the tab on screen, the tab itself: it can not point past the end of the list
export let $tab = $tabs.at(stored.index) ?? $tabs.at(0);

effect(() => write('files:tabs', { index: $tabs.indexOf($tab), list: $tabs }));

export const
$path   = $tab.path,
$source = $tab.source;

const scrollTop = new WeakMap;   // per tab, for the session
const scroller  = () => document.querySelector('rat-view[name="library"] .listing');

// from switches the tab to another source, undefined keeps its own
export function goTo (path, from) {
  $tab.path = path;
  if (from !== undefined) $tab.source = from;
  $selected = null;
  $filter   = '';
}

export function openTab (path = $path, from = $source) {
  $tab = tabOf({ path, source: from });
  $tabs.push($tab);
  $selected = null;
}

// the next tab takes over, the one before at the end. the last one stays and goes home
export function closeTab (tab) {
  if ($tabs.length === 1) {
    goTo(Path.root);
    return;
  }
  if (tab === $tab) $tab = $tabs.at($tabs.indexOf(tab) + 1) ?? $tabs.at(-2);
  $tabs.remove(tab);
}

export function switchTab (tab) {
  scrollTop.set($tab, scroller()?.scrollTop ?? 0);
  $tab      = tab;
  $selected = null;
}

// these tabs or a fresh one at home, the tab on screen stays where it is among them
function resetTabs (tabs = []) {
  $tabs.replace(tabs.length ? tabs : [tabOf()]);
  if (!$tabs.includes($tab)) $tab = $tabs.at(0);
}

export const tabName = tab => tab.path.name || sourceName(tab.source);

// :::::: THE FOLDER AND THE SERVERS

export const // the root of a source: null for the granted folder, a server's id
rootOfSource = from => from ? remotes.rootOf(from) : $handle,
sourceName   = from => from ? remotes.byId(from)?.name ?? 'remote' : $folder?.name ?? 'folder';

export const // the root of the tab on screen
rootHandle = () => rootOfSource ($source),
folderName = () => sourceName   ($source);

// an entry of the index carries its path and lies in the folder, one of a listing in the tab's source
export const sourceOf = entry => entry.source !== undefined ? entry.source : entry.path ? null : $source;

// the listing follows the folder, its permission and the path by itself, refresh() asks again. the old one
// goes at once: its entries would still open against the new path. the last request wins, a late answer is
// dropped
let $reload = 0;
let request = 0;

export const refresh = () => { $reload++; };

effect(() => {
  const handle = rootHandle();
  const at     = $path;
  const mine   = ++request;
  $reload;   // read, so refresh() runs this again

  $entries = [];
  $loading = Boolean(handle);
  if (!handle) return;

  fs.list(handle, at)
    .then(list => {
      if (mine !== request) return;
      $entries = list;
      requestAnimationFrame(() => { const element = scroller(); if (element) element.scrollTop = scrollTop.get(untrack(() => $tab)) ?? 0; });
    })
    .catch(error => { if (mine === request) toast.error(error); })
    .finally(() => { if (mine === request) $loading = false; });
});

// the index of the whole folder: the stored one at once, a fresh walk behind it
let scanned = null;
effect(() => {
  const handle = $handle;
  const folder = $folder;
  if (!handle || !folder || scanned === folder) return;
  scanned = folder;
  scan.restore(folder).then(() => indexFolder(handle, folder));
});

// the walk as a task: its file count is the progress, cancelling stops it
function indexFolder (handle, folder) {
  return run({ icon: 'lucide:scan-search', label: `Read ${folder.name}`, lane: 'index' }, ({ progress, signal }) => {
    signal.addEventListener('abort', () => scan.stop());
    const follow = effect(() => { if ($scanning) progress($scanning.files, null); });
    return scan.scan(handle, folder).finally(follow);
  }).catch(error => console.warn('[files] scan failed', error));
}

export const rescan = () => { if ($handle) indexFolder($handle, $folder); };

// :::::: ENTRIES

const matches = (list, filter) => {
  const needle = filter.trim().toLowerCase();
  return needle ? list.filter(entry => entry.name.toLowerCase().includes(needle)) : list;
};

export const $visible = matches($entries, $filter);

export const isImage = entry => entry.kind !== 'directory' && Boolean(entry.type?.startsWith('image/'));

// a folder with a type shows the type's icon, at is the path the entry lies in
export const iconOf = (entry, at) => entry.kind === 'directory'
  ? (at && places.folderTypeOf(at.child(entry.name))?.icon) || 'lucide:folder'
  : CATEGORIES.find(item => item.id === categoryOf(entry))?.icon ?? 'lucide:file';

export const keyOf = entry => String((entry.path ?? Path.root).child(entry.name));

export function open (entry, at = $path) {
  if (entry.kind === 'directory') { goTo(at.child(entry.name)); return router.go('/library'); }
  $file = { ...entry, kind: 'file', path: entry.path ?? at, source: sourceOf(entry) };
  router.go('/preview');
}

export function showInFolder (entry) {
  goTo(entry.path ?? Path.root, sourceOf(entry));
  router.go('/library');
}

// a tap opens, or a click picks and a double click opens: opensOnTap()
export function onEntryClick (entry) {
  if (opensOnTap()) return open(entry);
  $selected = entry;
}

export function about (entry) {
  $sheet    = null;
  $selected = entry;
  RAT.app.toggle('context', true);
}

export function openTasks () {
  $selected = null;
  $sheet    = 'tasks';
  RAT.app.toggle('context', true);
}

// :::::: WRITE
// the folder is granted read only. a write asks for more on the click that wants it, then runs as a
// task in the write lane: the app stays usable meanwhile, and two writes never run into each other.
// a server's handle has nothing to ask: its credentials are the permission. a failure is not caught
// here: it goes up to the click, and from there to the app's catch() (app.rat.html)

async function writable () {
  const handle = rootHandle();
  if (!handle) throw new Error('No folder open');
  const state = handle.requestPermission ? await handle.requestPermission({ mode: 'readwrite' }).catch(() => 'denied') : 'granted';
  if (state !== 'granted') throw new Error('No permission to change this folder');
  return handle;
}

// a write as a task. once it is done, the folder it changed is listed anew if it is still on screen
async function writeTask (task, at, work) {
  await run({ ...task, lane: 'write' }, work);
  if (at === $path) refresh();
}

export async function newFolder () {
  const name = await dialogs.prompt({ message: 'Name of the new folder', ok: 'Create', title: 'New folder' });
  if (!name) return;
  const handle = await writable();
  const at     = $path;
  await writeTask({ icon: 'lucide:folder-plus', label: `New folder ${name}` }, at, () => fs.mkdir(handle, at, name));
}

export async function renameEntry (entry) {
  const name = await dialogs.prompt({ message: 'New name', ok: 'Rename', title: entry.name, value: entry.name });
  if (!name || name === entry.name) return;
  const handle = await writable();
  const at     = entry.path ?? $path;
  $selected = null;
  await writeTask(
    {
      icon  : 'lucide:pencil',
      label : `Rename ${entry.name} to ${name}`,
    },
    at,
    () => fs.rename(handle, at, entry.name, name, entry.kind)
  );
}

export async function deleteEntry (entry) {
  if (!await dialogs.confirm({ message: `Delete “${entry.name}”? This removes it from your disk.`, ok: 'Delete', title: 'Delete' })) return;
  const handle = await writable();
  const at     = entry.path ?? $path;
  $selected = null;
  RAT.app.toggle('context', false);
  await writeTask({ icon: 'lucide:trash-2', label: `Delete ${entry.name}` }, at, () => fs.remove(handle, at, entry.name));
}

export function pick (mode, entry) {
  transfer.pick(mode, entry, entry.path ?? $path, rootOfSource(sourceOf(entry)));
  RAT.app.toggle('context', false);
}

// what the pickboard holds goes into the folder on screen, as one task
export async function paste () {
  const board = $pickboard;
  if (!board) return;
  const handle = await writable();
  const items  = board.items.toArray();
  const target = $path;
  const what   = items.length === 1 ? items[0].name : `${items.length} items`;
  const verb   = board.mode === 'move' ? 'move' : 'copy';
  const icon   = ICON[verb];
  if (board.mode === 'move') transfer.clear();
  else transfer.placed();

  // listed anew whether it worked or not: a part may have arrived
  try {
    await run({ icon, label: `${verb} ${what} to /${target}`, lane: 'write' },
      ({ progress, signal }) => transfer.transfer(handle, items, board.mode, target, { onProgress: progress, signal }));
  }
  finally {
    if (target === $path) refresh();
  }
}

export async function download (entry) {
  const blob = await fs.readFile(rootOfSource(sourceOf(entry)), entry.path ?? $path, entry.name);
  const link = Object.assign(document.createElement('a'), { download: entry.name, href: URL.createObjectURL(blob) });
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

// :::::: THE FOLDER, granted and let go

export async function chooseFolder () {
  if (!root.supported) throw new Error('This browser can’t open folders: try Chrome, Edge or another Chromium browser.');
  if (!await root.grant()) return;
  resetTabs();
  router.go('/');
}

export async function reconnect () {
  const { granted } = await root.reconnect();
  if (!granted) await chooseFolder();
}

export async function closeFolder () {
  if (!await dialogs.confirm({ message: 'Close this folder? Your files are untouched, only the app forgets it.', ok: 'Close', title: folderName() })) return;
  await scan.forget($folder);
  scanned = null;
  await root.forget();
  resetTabs();
}

// :::::: SERVERS, each opens in a tab of its own

export function openRemote (id) {
  openTab(Path.root, id);
  router.go('/library');
}

export function manageRemotes () {
  $selected = null;
  $sheet    = 'remotes';
  RAT.app.toggle('context', true);
}

// its tabs close with it, the last one falls back to the folder
export async function forgetRemote (connection) {
  if (!await dialogs.confirm({ message: `Forget “${connection.name}”? The files on the server stay.`, ok: 'Forget', title: connection.name })) return;
  await remotes.remove(connection.id);
  resetTabs($tabs.filter(tab => tab.source !== connection.id).toArray());
}

// :::::: SEND, a file of the folder into the outbox, the view opens

export async function sendEntry (entry) {
  await sync.addEntry($handle, entry.path ?? $path, entry);
  RAT.app.toggle('context', false);
  router.go('/sync');
}

// :::::: FOLDERTYPES

export async function newFolderType (at) {
  const label = await dialogs.prompt({ message: 'Name of the new foldertype', ok: 'Next', title: 'Foldertype' });
  if (!label) return;
  const icon = await dialogs.prompt({ message: 'Its icon (an iconify id)', ok: 'Create', title: label, value: 'lucide:folder' }) || 'lucide:folder';
  places.setFolderType(at, places.addFolderType({ icon, label }));
}

// what a listing is mostly made of
function factsOf (list) {
  const files  = list.filter(entry => entry.kind === 'file');
  const counts = {};
  for (const entry of files) counts[categoryOf(entry)] = (counts[categoryOf(entry)] ?? 0) + 1;
  const mostly = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return {
    files   : files.length,
    folders : list.length - files.length,
    mostly  : mostly && mostly[1] / files.length >= 0.6 ? CATEGORIES.find(item => item.id === mostly[0])?.label : null,
    size    : files.reduce((sum, entry) => sum + entry.size, 0),
  };
}

export const $facts = factsOf($entries);

// :::::: THE INDEX, on the dashboard

// by name, other always last
export const SORTED = CATEGORIES.toSorted((a, b) => a.id === 'other' ? 1 : b.id === 'other' ? -1 : a.label.localeCompare(b.label));

const newest = (a, b) => b.lastModified - a.lastModified;

export const $categoryFiles = ($index?.files ?? []).filter(entry => categoryOf(entry) === $category).toSorted(newest).slice(0, 500);
export const $hits          = scan.search($query);
