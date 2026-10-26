// files :: state.js

/*
the state of the app and what can be done with it: the tabs of the library, the listing on screen, the
selection, the file in the preview, the settings. the views and the context area read it, the actions
change it. the modules hold the rest: the folder (root), the servers (remotes), the index (scan), tasks,
places, transfer, sending (sync).

a tab is { path, source }: source null is the granted folder, else the id of a server.
*/

import { computed, effect, signal } from '@rat/signals';

import { read, write }  from '../.shared/storage.js';
import { toast }        from '../.shared/toast.js';

import * as fs       from './modules/fs.js';
import * as places   from './modules/places.js';
import * as remotes  from './modules/remotes.js';
import * as root     from './modules/root.js';
import * as scan     from './modules/scan.js';
import * as sync     from './modules/sync.js';
import * as tasks    from './modules/tasks.js';
import * as transfer from './modules/transfer.js';

export { fs, places, remotes, root, scan, sync, tasks, transfer };

const { CATEGORIES, categoryOf } = scan;

const dialogs = () => RAT.app.dialogs;
const area    = name => RAT.app.area(name);
const go      = route => RAT.app.router.go(route);

// :::::: SETTINGS, kept across visits

const stored = (key, fallback) => {
  const value = signal(read(`files:${key}`, fallback));
  effect(() => write(`files:${key}`, value.value));
  return value;
};

export const settings = {
  open           : stored('open',         'auto'),     // auto, single (a tap), double (a double click)
  'pattern-bg'   : stored('pattern-bg',   ''),         // a pattern behind the app: 'dots 8%', '' for none
  'pattern-tile' : stored('pattern-tile', ''),         // a pattern on the tiles and cards
  searchbar      : stored('searchbar',    'bottom'),   // bottom, top
  tabbar         : stored('tabbar',       'bottom'),   // bottom, top
  viewmode       : stored('viewmode',     'list'),     // list, grid
};

// the patterns as custom properties on the root, app.css paints them (--pattern-bg-image, --pattern-bg-opacity).
// a late answer for a value that changed meanwhile is dropped
export const PATTERNS = ['pattern-bg', 'pattern-tile'];

effect(() => {
  const element = document.documentElement;
  for (const name of PATTERNS) {
    const value = settings[name].value;
    element.toggleAttribute(`data-${name}`, Boolean(value));
    if (!value) continue;
    import('@aufbau/elements/webcomponents/input/types/pattern.js')
      .then(({ patternStyle }) => patternStyle(value, { name }))
      .then(style => {
        if (!style || settings[name].peek() !== value) return;
        for (const [property, css] of Object.entries(style)) element.style.setProperty(property, css);
      });
  }
});

const touch = () => globalThis.matchMedia?.('(pointer: coarse)').matches;

export const opensOnTap = () => settings.open.value === 'single' || (settings.open.value === 'auto' && touch());

// :::::: STATE

export const entries  = signal([]);      // the listing of the current tab's path
export const loading  = signal(false);   // a listing is on its way, the old one is gone already
export const filter   = signal('');      // the library's filter
export const query    = signal('');      // the dashboard's search over the index
export const category = signal(null);    // the category the dashboard lists, or null
export const selected = signal(null);    // the entry the context area is about
export const file     = signal(null);    // the entry in the preview
export const sheet    = signal(null);    // what the context area shows instead: 'tasks', 'remotes'
export const size     = signal(null);    // { width, height } of the image in the preview

// :::::: TABS, each { path, source }

const tabState = stored('tabs', { index: 0, list: [{ path: [] }] });

export const tabs     = computed(() => tabState.value.list?.length ? tabState.value.list : [{ path: [] }]);
export const tabIndex = computed(() => Math.min(Math.max(0, tabState.value.index ?? 0), tabs.value.length - 1));
export const path     = computed(() => tabs.value[tabIndex.value].path);
export const source   = computed(() => tabs.value[tabIndex.value].source ?? null);

const scrollTop = new Map;   // per tab, for the session
const scroller  = () => document.querySelector('rat-view[name="library"] .listing');

function setTabs (list, index = tabIndex.value) {
  tabState.value = { index: Math.min(Math.max(0, index), list.length - 1), list };
}

// from switches the tab to another source, undefined keeps its own
export function goTo (next, from) {
  setTabs(tabs.value.map((tab, position) => position === tabIndex.value ? { path: next, source: from === undefined ? tab.source ?? null : from } : tab));
  selected.value = null;
  filter.value   = '';
}

export function openTab (at = path.value, from = source.value) {
  const list = [...tabs.value, { path: at, source: from }];
  setTabs(list, list.length - 1);
  selected.value = null;
}

export function closeTab (position) {
  if (tabs.value.length === 1) return goTo([]);
  setTabs(tabs.value.filter((_, other) => other !== position), position < tabIndex.value ? tabIndex.value - 1 : tabIndex.value);
}

export function switchTab (position) {
  scrollTop.set(tabIndex.value, scroller()?.scrollTop ?? 0);
  setTabs(tabs.value, position);
  selected.value = null;
}

export const tabName = tab => tab.path.at(-1) ?? sourceName(tab.source ?? null);

// :::::: THE FOLDER AND THE SERVERS

// the granted folder, and the root of a source: null for the folder, a server's id
export const localRoot    = () => root.perm.value === 'granted' ? root.folder.value?.handle ?? null : null;
export const rootOfSource = from => from ? remotes.rootOf(from) : localRoot();
export const sourceName   = from => from ? remotes.byId(from)?.name ?? 'remote' : root.folder.value?.name ?? 'folder';

// the root of the tab on screen
export const rootHandle = () => rootOfSource(source.value);
export const folderName = () => sourceName(source.value);

// an entry of the index carries its path and lies in the folder, one of a listing in the tab's source
export const sourceOf = entry => entry.source !== undefined ? entry.source : entry.path ? null : source.value;

// the listing follows the folder, its permission and the path by itself. the old one goes at once:
// its entries would still open against the new path. the last request wins, a late answer is dropped
let request = 0;
effect(() => {
  const handle = rootHandle();
  const at     = path.value;
  const mine   = ++request;

  entries.value = [];
  loading.value = Boolean(handle);
  if (!handle) return;

  fs.list(handle, at)
    .then(list => {
      if (mine !== request) return;
      entries.value = list;
      requestAnimationFrame(() => { const element = scroller(); if (element) element.scrollTop = scrollTop.get(tabIndex.peek()) ?? 0; });
    })
    .catch(error => { if (mine === request) toast.error(error); })
    .finally(() => { if (mine === request) loading.value = false; });
});

// the index of the whole folder: the stored one at once, a fresh walk behind it
let scanned = null;
effect(() => {
  const handle = localRoot();
  const folder = root.folder.value;
  if (!handle || !folder || scanned === folder) return;
  scanned = folder;
  scan.restore(folder).then(() => indexFolder(handle, folder));
});

// the walk as a task: its file count is the progress, cancelling stops it
function indexFolder (handle, folder) {
  return tasks.run({ icon: 'lucide:scan-search', label: `Read ${folder.name}`, lane: 'index' }, ({ progress, signal }) => {
    signal.addEventListener('abort', () => scan.stop());
    const follow = effect(() => { const scanning = scan.scanning.value; if (scanning) progress(scanning.files, null); });
    return scan.scan(handle, folder).finally(follow);
  }).catch(error => console.warn('[files] scan failed', error));
}

export const rescan = () => { const handle = localRoot(); if (handle) indexFolder(handle, root.folder.value); };

// :::::: ENTRIES

export const visible = computed(() => {
  const needle = filter.value.trim().toLowerCase();
  return needle ? entries.value.filter(entry => entry.name.toLowerCase().includes(needle)) : entries.value;
});

export const isImage = entry => entry.kind !== 'directory' && Boolean(entry.type?.startsWith('image/'));

// a folder with a type shows the type's icon, at is the path the entry lies in
export const iconOf = (entry, at) => entry.kind === 'directory'
  ? (at && places.typeOf([...at, entry.name])?.icon) || 'lucide:folder'
  : CATEGORIES.find(item => item.id === categoryOf(entry))?.icon ?? 'lucide:file';

export const keyOf = entry => `${(entry.path ?? []).join('/')}/${entry.name}`;

export function open (entry, at = path.value) {
  if (entry.kind === 'directory') { goTo([...at, entry.name]); return go('/library'); }
  file.value = { ...entry, kind: 'file', path: entry.path ?? at, source: sourceOf(entry) };
  go('/preview');
}

export function showInFolder (entry) {
  goTo(entry.path ?? [], sourceOf(entry));
  go('/library');
}

// a tap opens, or a click picks and a double click opens: opensOnTap()
export function onEntryClick (entry) {
  if (opensOnTap()) return open(entry);
  selected.value = entry;
}

export function about (entry) {
  sheet.value    = null;
  selected.value = entry;
  area('context')?.show();
}

export function openTasks () {
  selected.value = null;
  sheet.value    = 'tasks';
  area('context')?.show();
}

// :::::: WRITE
// the folder is granted read only. a write asks for more on the click that wants it, then runs as a
// task in the write lane: the app stays usable meanwhile, and two writes never run into each other.
// a server's handle has nothing to ask: its credentials are the permission

async function writable () {
  const handle = rootHandle();
  const state  = handle?.requestPermission ? await handle.requestPermission({ mode: 'readwrite' }).catch(() => 'denied') : handle ? 'granted' : 'denied';
  if (state === 'granted') return handle;
  toast.error('No permission to change this folder');
  return null;
}

// a write as a task. once it is done, the folder it changed is listed anew if it is still on screen
function writeTask (task, at, work) {
  const same = () => at.join('/') === path.value.join('/');
  tasks.run({ ...task, lane: 'write' }, work)
    .then(() => { if (same()) goTo([...at]); })
    .catch(toast.error);
}

export async function newFolder () {
  const name = await dialogs().prompt({ message: 'Name of the new folder', ok: 'Create', title: 'New folder' });
  if (!name) return;
  const handle = await writable();
  if (!handle) return;
  const at = path.value;
  writeTask({ icon: 'lucide:folder-plus', label: `New folder ${name}` }, at, () => fs.mkdir(handle, at, name));
}

export async function renameEntry (entry) {
  const name = await dialogs().prompt({ message: 'New name', ok: 'Rename', title: entry.name, value: entry.name });
  if (!name || name === entry.name) return;
  const handle = await writable();
  if (!handle) return;
  const at = entry.path ?? path.value;
  selected.value = null;
  writeTask({ icon: 'lucide:pencil', label: `Rename ${entry.name} to ${name}` }, at, () => fs.rename(handle, at, entry.name, name, entry.kind));
}

export async function deleteEntry (entry) {
  if (!await dialogs().confirm({ message: `Delete “${entry.name}”? This removes it from your disk.`, ok: 'Delete', title: 'Delete' })) return;
  const handle = await writable();
  if (!handle) return;
  const at = entry.path ?? path.value;
  selected.value = null;
  area('context')?.hide();
  writeTask({ icon: 'lucide:trash-2', label: `Delete ${entry.name}` }, at, () => fs.remove(handle, at, entry.name));
}

export function pick (mode, entry) {
  transfer.pick(mode, entry, entry.path ?? path.value, rootOfSource(sourceOf(entry)));
  area('context')?.hide();
}

// what the clipboard holds goes into the folder on screen, as one task
export async function paste () {
  const board = transfer.clipboard.value;
  if (!board) return;
  const handle = await writable();
  if (!handle) return;

  const target = [...path.value];
  const count  = board.items.length;
  const what   = count === 1 ? board.items[0].name : `${count} items`;
  const verb   = board.mode === 'move' ? 'Move' : 'Copy';
  if (board.mode === 'move') transfer.clear();
  else transfer.pasted();

  const done = () => { if (target.join('/') === path.value.join('/')) goTo([...target]); };
  tasks.run({ icon: board.mode === 'move' ? 'lucide:scissors' : 'lucide:copy', label: `${verb} ${what} to /${target.join('/')}`, lane: 'write' },
    ({ progress, signal }) => transfer.transfer(handle, board.items, board.mode, target, { onProgress: progress, signal }))
    .then(done)
    .catch(error => { if (error?.name !== 'AbortError') toast.error(error); done(); });
}

export async function download (entry) {
  const blob = await fs.readFile(rootOfSource(sourceOf(entry)), entry.path ?? path.value, entry.name);
  const link = Object.assign(document.createElement('a'), { download: entry.name, href: URL.createObjectURL(blob) });
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

// :::::: THE FOLDER, granted and let go

export async function chooseFolder () {
  if (!root.supported()) return toast.error('This browser can’t open folders: try Chrome, Edge or another Chromium browser.');
  try {
    if (!await root.grant()) return;
    setTabs([{ path: [] }], 0);
    go('/');
  }
  catch (error) { toast.error(error); }
}

export async function reconnect () {
  const { granted } = await root.reconnect();
  if (!granted) return chooseFolder();
}

export async function closeFolder () {
  if (!await dialogs().confirm({ message: 'Close this folder? Your files are untouched, only the app forgets it.', ok: 'Close', title: folderName() })) return;
  await scan.forget(root.folder.value);
  scanned = null;
  await root.forget();
  setTabs([{ path: [] }], 0);
}

// :::::: SERVERS, each opens in a tab of its own

export function openRemote (id) {
  openTab([], id);
  go('/library');
}

export function manageRemotes () {
  selected.value = null;
  sheet.value    = 'remotes';
  area('context')?.show();
}

// its tabs close with it, the last one falls back to the folder
export async function forgetRemote (connection) {
  if (!await dialogs().confirm({ message: `Forget “${connection.name}”? The files on the server stay.`, ok: 'Forget', title: connection.name })) return;
  await remotes.remove(connection.id);
  const left = tabs.value.filter(tab => tab.source !== connection.id);
  setTabs(left.length ? left : [{ path: [] }], 0);
}

// :::::: SEND, a file of the folder into the outbox, the view opens

export function sendEntry (entry) {
  sync.addEntry(localRoot(), entry.path ?? path.value, entry)
    .then(() => { area('context')?.hide(); go('/sync'); })
    .catch(toast.error);
}

// :::::: FOLDER TYPES

export async function newType (at) {
  const label = await dialogs().prompt({ message: 'Name of the new folder type', ok: 'Next', title: 'Folder type' });
  if (!label) return;
  const icon = await dialogs().prompt({ message: 'Its icon (an iconify id)', ok: 'Create', title: label, value: 'lucide:folder' }) || 'lucide:folder';
  places.setType(at, places.addType({ icon, label }));
}

// what the folder on screen is mostly made of
export const folderFacts = computed(() => {
  const list   = entries.value;
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
});

// :::::: THE INDEX, on the dashboard

// by name, other always last
export const SORTED = CATEGORIES.toSorted((a, b) => a.id === 'other' ? 1 : b.id === 'other' ? -1 : a.label.localeCompare(b.label));

export const categoryFiles = computed(() => (scan.index.value?.files ?? [])
  .filter(entry => categoryOf(entry) === category.value)
  .toSorted((a, b) => b.lastModified - a.lastModified)
  .slice(0, 500));

export const hits = computed(() => scan.search(query.value));
