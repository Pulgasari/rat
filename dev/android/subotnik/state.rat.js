// subotnik :: state.rat.js

/*
what the launcher keeps and what is open. the apps are read from the device on every start, only the
look and who sits where are kept (by package name: an uninstalled app drops out on its own).

  $look      the appearance, applied live through css variables and body classes
  $home      the package names pinned to the home screen, null until the first run seeded it
  $folders   [{ id, name, apps: [packageName] }], on the home screen. an app is pinned or in a
             folder, never both
  $apps      [{ packageName, label }] of the device, $byPackage the same by name
  $drawer    the app drawer is out, $cat $letter $query its filters (and), reset on each open
  $sheet     'actions' | 'folder' | 'settings' | null, $subject what the actions or the folder are of
*/

import { effect } from '@rat/signals';
import { $Record, Bool, Enum, List, Num, Str } from '@rat/types';

import { launcher, categoryOf, glyphOf, letterOf, norm } from './modules/launcher.js';

import { toast } from '../.shared/toast.js';

// :::::: KEPT

export const BARS = { cat: 'Kategorien', letter: 'Anfangsbuchstaben', search: 'Suchfeld' };

const Look = {
  barsOrder     : List(Enum('cat', 'letter', 'search')).default(['cat', 'letter', 'search']),   // top to bottom
  barsPos       : Enum('bottom', 'top'),
  borderColor   : Str.default('#ffffff'),
  borderSize    : Num.range(0, 4).default(0),
  cellBg        : Str.default('#ffffff'),
  cellBgAlpha   : Num.range(0, 1).default(0.05),
  cellPad       : Num.range(0, 28).default(12),
  cols          : Num.range(3, 10).default(4),
  customCss     : Str.default(''),
  cutLabel      : Bool.default(true),   // false: the label wraps to two lines
  gap           : Num.range(0, 28).default(8),
  iconColor     : Str.default('#e6e6e6'),
  letterTwoRows : Bool,
  pageBg        : Str.default('#0d0d10'),
  pageBgAlpha   : Num.range(0, 1).default(1),   // < 1: the system wallpaper shows through
  shape         : Enum('squircle', 'circle', 'square'),
  showLabel     : Bool.default(true),
  uppercase     : Bool,
};

export const $look! = $Record(Look).create();

export let $home!    = null;
export let $folders! = [];

// the settings of the launcher before rat, under one key: taken over once
function adopt () {
  let old = null;
  try { old = JSON.parse(localStorage.getItem('launcher') ?? 'null'); } catch {}
  if (!old) return;
  $look.assign(Object.fromEntries(Object.keys(Look).filter(key => key in old).map(key => [key, old[key]])));
  if (Array.isArray(old.home))    $home    = old.home;
  if (Array.isArray(old.folders)) $folders = old.folders;
  localStorage.removeItem('launcher');
}

adopt();

// the bars as a permutation of the known ones, whatever was kept
export const $barsOrder = [...new Set([...$look.barsOrder].filter(key => BARS[key]))].concat(Object.keys(BARS).filter(key => ![...$look.barsOrder].includes(key)));

// :::::: THE DEVICE

export let $apps = [];

export const $byPackage = new Map($apps.map(app => [app.packageName, app]));

// a few everyday apps on the first run, so the home screen is not empty
const SEED = ['phone', 'message', 'browser', 'camera', 'mail', 'photos'];

export async function load () {
  try { $apps = await launcher.apps(); }
  catch { $apps = []; toast.error('konnte apps nicht laden'); }

  if ($home) return;
  const picked = [];
  for (const glyph of SEED) {
    const app = $apps.find(item => glyphOf(item) === glyph && !picked.includes(item.packageName));
    if (app) picked.push(app.packageName);
  }
  $home = picked;
}

export async function launch (packageName) {
  try { await launcher.launch(packageName); }
  catch { toast.error('konnte app nicht starten'); }
  closeDrawer();
}

// :::::: HOME

export const folderOf   = packageName => $folders.find(folder => folder.apps.includes(packageName)) ?? null;
export const isPinned   = packageName => ($home ?? []).includes(packageName);
export const appsOf     = folder => folder.apps.map(name => $byPackage.get(name)).filter(Boolean);

export const $homeApps = (() => {
  const inFolder = new Set($folders.flatMap(folder => folder.apps));
  return ($home ?? []).filter(name => !inFolder.has(name)).map(name => $byPackage.get(name)).filter(Boolean);
})();

export const pin   = packageName => { if (!isPinned(packageName)) $home = [...($home ?? []), packageName]; };
export const unpin = packageName => { $home = ($home ?? []).filter(name => name !== packageName); };

const id = () => `f${Math.random().toString(36).slice(2, 9)}`;

export function createFolder (name) {
  const folder = { apps: [], id: id(), name: name || 'Ordner' };
  $folders = [...$folders, folder];
  return folder;
}

export const renameFolder = (id, name) => { $folders = $folders.map(folder => folder.id === id ? { ...folder, name: name || folder.name } : folder); };

// its apps stay on the home screen, as pins
export function deleteFolder (id) {
  const folder = $folders.find(item => item.id === id);
  for (const name of folder?.apps ?? []) pin(name);
  $folders = $folders.filter(item => item.id !== id);
}

export const leaveFolder = packageName => { $folders = $folders.map(folder => ({ ...folder, apps: folder.apps.filter(name => name !== packageName) })); };

// into a folder: on the home screen through it, no pin of its own
export function moveToFolder (packageName, id) {
  leaveFolder(packageName);
  $folders = $folders.map(folder => folder.id === id ? { ...folder, apps: [...folder.apps, packageName] } : folder);
  unpin(packageName);
}

// :::::: DRAWER

export let $drawer = false;
export let $cat    = null;
export let $letter = null;
export let $query  = '';

const matches = (app, query) => !query || norm(app.label).includes(query) || app.packageName.toLowerCase().includes(query);

// the apps the filters let through, the letter left out: what the letters are enabled by
export const $unlettered = (() => {
  const query = norm($query).trim();
  return $apps.filter(app => (!$cat || categoryOf(app) === $cat) && matches(app, query));
})();

export const $letters = new Set($unlettered.map(letterOf));

// a letter the other filters leave no app for is off
export const $drawerApps = $unlettered.filter(app => !$letter || !$letters.has($letter) || letterOf(app) === $letter);

export function openDrawer () {
  $cat    = null;
  $letter = null;
  $query  = '';
  $drawer = true;
}

export function closeDrawer () {
  document.activeElement?.blur?.();
  $drawer = false;
}

// a tap toggles, a scrub only sets
export function setLetter (letter, toggle) {
  $letter = toggle && $letter === letter ? null : letter;
}

// :::::: SHEETS

export let $sheet   = null;
export let $subject = null;   // { app } | { folder } of the actions, the folder's id while it is open

export const openActions  = subject => { $subject = subject; $sheet = 'actions'; };
export const openSettings = () => { $sheet = 'settings'; };

export function openFolder (folder) {
  $subject = folder.id;
  $sheet   = 'folder';
}

export const closeSheet = () => { $sheet = null; $subject = null; };

// back closes the top layer: a sheet, then the drawer. the launcher itself never closes
export function back () {
  if ($sheet) closeSheet();
  else closeDrawer();
}

export function home () {
  closeSheet();
  closeDrawer();
}

// :::::: THE PAGE, live from $look

const rgba = (hex, alpha) => {
  const match = /^#?([0-9a-f]{6})$/i.exec(String(hex ?? '').trim());
  if (!match) return hex;
  const value = parseInt(match[1], 16);
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
};

const RADIUS = { circle: '50%', square: '14px', squircle: '32%' };

effect(() => {
  const { style, classList } = document.body;
  style.setProperty('--cols',              $look.cols);
  style.setProperty('--glyph-color',       $look.iconColor);
  style.setProperty('--gap',               `${$look.gap}px`);
  style.setProperty('--cell-pad',          `${$look.cellPad}px`);
  style.setProperty('--cell-radius',       RADIUS[$look.shape]);
  style.setProperty('--cell-border',       `${$look.borderSize}px`);
  style.setProperty('--cell-border-color', $look.borderColor);
  style.setProperty('--cell-bg',           rgba($look.cellBg, $look.cellBgAlpha));
  style.setProperty('--page-bg',           rgba($look.pageBg, $look.pageBgAlpha));
  classList.toggle('no-label',         !$look.showLabel);
  classList.toggle('uppercase',        $look.uppercase);
  classList.toggle('multiline',        !$look.cutLabel);
  classList.toggle('drawer-bars-top',  $look.barsPos === 'top');
  classList.toggle('letters-two-rows', $look.letterTwoRows);
});

// the user's own css, after the app's
const custom = document.head.appendChild(document.createElement('style'));
effect(() => { custom.textContent = $look.customCss; });

// a translucent page asks the window to show the system wallpaper
effect(() => launcher.showWallpaper($look.pageBgAlpha < 1));
