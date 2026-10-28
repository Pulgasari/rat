// cosmonaut :: state.rat.js

/*
the tabs are native: $session is the last "state" the plugin sent, never edited here. what the chrome
owns is kept: bookmarks and their folders, tab groups (by native tab id), userscripts, search engines,
the look and the dock.

  $session     { tabs: [{ id, url, title, loading, progress, canGoBack }], activeId, expanded }
  $panel       the panel open, null: the chrome is the strip (the resize trick, ARCHITECTURE.md)
  $menu        { items, anchor } of the context menu
*/

import { effect } from '@rat/signals';
import { $Record, Bool, Enum, Num, Str } from '@rat/types';

import { call, plugin } from './modules/browser.js';
import { target }       from './modules/search.js';
import { domainOf, uid } from './modules/util.js';

// :::::: THE SESSION, from native

export let $session = { activeId: '', expanded: false, tabs: [] };

export const $active = $session.tabs.find(tab => tab.id === $session.activeId) ?? null;

// a collapse from native (the back button) closes the panel, without asking native again
plugin.addListener('state', state => {
  $session = { ...$session, ...state };
  if (!state.expanded && $panel) $panel = null;
});

export async function start () {
  const initial = await call('ready');
  if (initial) $session = { ...$session, ...initial };
}

// :::::: KEPT

export const DOCK_IDS = ['tabs', 'marks', 'find', 'userscripts', 'devtools', 'settings'];

const ENGINES = [
  { icon: '', id: 'ddg',       name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=%s' },
  { icon: '', id: 'google',    name: 'Google',     url: 'https://www.google.com/search?q=%s' },
  { icon: '', id: 'wikipedia', name: 'Wikipedia',  url: 'https://en.wikipedia.org/w/index.php?search=%s' },
];

const Settings = {
  accent    : Str.default('#4f8cff'),
  bg        : Str.default('#0c0d10'),
  blur      : Bool.default(true),
  dockGap   : Num.range(4, 28).default(12),
  dockPos   : Enum('bottom', 'top'),
  dockSize  : Num.range(36, 60).default(46),
  fg        : Str.default('#edeef0'),
  loaderPos : Enum('bottom', 'top'),
};

export const $settings! = $Record(Settings).create();

export let $dock!          = DOCK_IDS.map(id => ({ id, on: id !== 'devtools' }));   // [{ id, on }] in order
export let $bookmarks!     = [];   // [{ id, url, title, folder?, tags? }]
export let $folders!       = [];   // [{ id, name }] of the bookmarks
export let $groups!        = [];   // [{ id, name }] of the tabs
export let $tabGroups!     = {};   // tab id -> group id
export let $scripts!       = [];   // [{ id, name, matches, code, css, enabled }]
export let $engines!       = ENGINES;
export let $defaultEngine! = 'ddg';

// the chrome before rat kept all of it under "browser": taken over once
function adopt () {
  let old = null;
  try { old = JSON.parse(localStorage.getItem('browser') ?? 'null'); } catch {}
  if (!old) return;
  const list = value => Array.isArray(value) ? value : [];
  const { dock, ...settings } = old.settings ?? {};
  $settings.assign(Object.fromEntries(Object.keys(Settings).filter(key => key in settings).map(key => [key, settings[key]])));
  if (Array.isArray(dock)) $dock = dock;
  $bookmarks = list(old.bookmarks);
  $folders   = list(old.bookmarkFolders);
  $groups    = list(old.groups);
  $tabGroups = old.tabGroups && typeof old.tabGroups === 'object' ? old.tabGroups : {};
  $scripts   = list(old.userscripts);
  if (list(old.engines).length) $engines = old.engines;
  if (old.defaultEngine) $defaultEngine = old.defaultEngine;
  localStorage.removeItem('browser');
}

adopt();

// the dock as kept, unknown ids dropped, new ones appended
export const $dockItems = (() => {
  const seen = new Set;
  const kept = $dock.filter(item => item && DOCK_IDS.includes(item.id) && !seen.has(item.id) && seen.add(item.id));
  return [...kept, ...DOCK_IDS.filter(id => !seen.has(id)).map(id => ({ id, on: id !== 'devtools' }))];
})();

export const $engine = $engines.find(engine => engine.id === $defaultEngine) ?? $engines[0];

// :::::: PANELS, one at a time, drawn while the chrome webview is full screen

export let $panel = null;
export let $menu  = null;

export async function open (name) {
  $panel = name;
  await call('setChromeExpanded', { expanded: true });
}

export async function close () {
  $panel = null;
  await call('setChromeExpanded', { expanded: false });
}

export function openMenu (items, anchor) {
  $menu = { anchor, items };
  open('menu');
}

// what a panel leaves behind when it goes: find in page clears its highlights
let before = null;
effect(() => {
  if (before === 'find' && $panel !== 'find') call('clearFind');
  before = $panel;
});

// the dock's buttons by id (DOCK_IDS is their default order)
export const DOCK = {
  devtools    : { icon: 'console', label: 'Dev tools',    run: () => { call('toggleDevtools'); close(); } },
  find        : { icon: 'search',  label: 'Find in page', run: () => open('find') },
  marks       : { icon: 'book',    label: 'Bookmarks',    run: () => open('marks') },
  settings    : { icon: 'gear',    label: 'Settings',     run: () => open('settings') },
  tabs        : { icon: 'tabs',    label: 'Tabs',         run: () => open('tabs') },
  userscripts : { icon: 'code',    label: 'Userscripts',  run: () => open('scripts') },
};

// :::::: NAVIGATION

export function go (input, engineId) {
  const engine = engineId ? $engines.find(item => item.id === engineId) : null;
  const url    = target(input, { engine, fallback: $engine });
  if (!url) return;
  call('navigate', { url });
  close();
}

export async function newTab () {
  await call('newTab');
  open('dash');
}

// :::::: BOOKMARKS

export const isBookmarked = url => $bookmarks.some(mark => mark.url === url);

const markOf = tab => ({ id: uid('b'), title: tab.title || domainOf(tab.url), url: tab.url });

export function addCurrent () {
  const tab = $active;
  if (tab?.url && !isBookmarked(tab.url)) $bookmarks = [markOf(tab), ...$bookmarks];
}

export function toggleBookmark () {
  const tab = $active;
  if (!tab?.url) return;
  $bookmarks = isBookmarked(tab.url) ? $bookmarks.filter(mark => mark.url !== tab.url) : [markOf(tab), ...$bookmarks];
}

export const saveMark   = mark => { $bookmarks = $bookmarks.some(item => item.id === mark.id) ? $bookmarks.map(item => item.id === mark.id ? mark : item) : [...$bookmarks, mark]; };
export const deleteMark = id   => { $bookmarks = $bookmarks.filter(mark => mark.id !== id); };

export const addFolder = name => { $folders = [...$folders, { id: uid('f'), name: name.trim() || 'Folder' }]; };

// merged by url: one already there is skipped. the count added
export function importMarks ({ bookmarks, folders }) {
  const known = new Set($bookmarks.map(mark => mark.url));
  const added = bookmarks.filter(mark => mark.url && !known.has(mark.url) && known.add(mark.url));
  $folders   = [...$folders, ...folders];
  $bookmarks = [...$bookmarks, ...added];
  return added.length;
}

// :::::: TABS

export function setGroup (tabId, groupId) {
  const { [tabId]: _, ...rest } = $tabGroups;
  $tabGroups = groupId ? { ...rest, [tabId]: groupId } : rest;
}

export const addGroup = name => { $groups = [...$groups, { id: uid('g'), name: name.trim() || 'Group' }]; };

// :::::: USERSCRIPTS, injected by native at document end into the pages one of their globs matches.
// native runs javascript only: the css goes along as a snippet that adds a <style>

const styleSnippet = css => css?.trim()
  ? `\n;(() => { const style = document.createElement('style'); style.textContent = ${JSON.stringify(css)}; (document.head || document.documentElement).append(style); })();`
  : '';

effect(() => call('setUserscripts', {
  scripts: $scripts.map(({ code, css, enabled, matches, name }) => ({ code: (code || '') + styleSnippet(css), enabled, matches: [...(matches ?? [])], name })),
}));

export const saveScript   = script => { $scripts = $scripts.some(item => item.id === script.id) ? $scripts.map(item => item.id === script.id ? script : item) : [...$scripts, script]; };
export const deleteScript = id     => { $scripts = $scripts.filter(script => script.id !== id); };

// :::::: ENGINES

export const saveEngine = engine => { $engines = $engines.some(item => item.id === engine.id) ? $engines.map(item => item.id === engine.id ? engine : item) : [...$engines, engine]; };

export function deleteEngine (id) {
  $engines = $engines.filter(engine => engine.id !== id);
  if ($defaultEngine === id) $defaultEngine = $engines[0]?.id;
}

// :::::: THE LOOK, live. the palette on body, where aufbau's palette sets it

effect(() => {
  const body = document.body.style;
  body.setProperty('--color-bg',  $settings.bg);
  body.setProperty('--color-fg',  $settings.fg);
  body.setProperty('--color-ink', $settings.accent);
  document.documentElement.style.setProperty('--dock-size', `${$settings.dockSize}px`);
  document.documentElement.style.setProperty('--dock-gap',  `${$settings.dockGap}px`);
  document.body.classList.toggle('no-blur',    !$settings.blur);
  document.body.classList.toggle('loader-top', $settings.loaderPos === 'top');
  document.body.classList.toggle('dock-top',   $settings.dockPos === 'top');
});

effect(() => call('setDockPosition', { position: $settings.dockPos }));
