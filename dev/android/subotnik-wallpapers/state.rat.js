// subotnik-wallpapers :: state.rat.js

/*
the config the wallpaper renders and what the screen shows of it. the config is not kept here: the
plugin keeps it for the renderer, save() writes it. kept here are the look of the app, the presets
and the height of the panel.

  $config     the config (modules/wallpaper.js CONFIG), replaced as a whole on every change: set(key, value)
  $sources    the list of the mode (videos or images), $hasMedia: one of them is on
  $selected   the index of the filter in the editor
  $presets    { source, config, wallpaper }: [{ name, data }], what each kind takes of the config: PRESET
  $look       theme, accent, corners, tile size, scales, preview quality
  $overlay    'settings' | 'presets' | 'sources' (the sources full screen) | null
  $tab        the index of the open tab page (TABS), null: the panel is closed
*/

import { effect } from '@rat/signals';
import { $Record, Bool, Enum, Num, Str } from '@rat/types';

import { CONFIG, filterOf, wallpaper } from './modules/wallpaper.js';

import { toast } from '../.shared/toast.js';

// :::::: THE CONFIG

export let $config = { ...CONFIG };

export const set = (key, value) => { $config = { ...$config, [key]: value }; };

export async function load () {
  $config = await wallpaper.load();
}

export async function save () {
  try {
    await wallpaper.save($config);
    toast('gespeichert');
    return true;
  }
  catch {
    toast.error('fehler beim speichern');
    return false;
  }
}

export async function apply () {
  if (!$hasMedia) return toast($config.mode === 'video' ? 'erst ein video wählen' : 'erst bilder wählen');
  if (!await save()) return;
  try { await wallpaper.apply(); }
  catch { toast.error('konnte wallpaper-auswahl nicht öffnen'); }
}

// a list moved: the item at from goes to to
const moved = (list, from, to) => {
  const next = [...list];
  next.splice(to, 0, ...next.splice(from, 1));
  return next;
};

// :::::: SOURCES, the list of the mode

const listKey = () => $config.mode === 'video' ? 'videos' : 'images';

export const $sources  = $config.mode === 'video' ? $config.videos : $config.images;
export const $hasMedia = $sources.some(item => item.enabled);

const setSources = list => set(listKey(), list);

export async function addSources () {
  try {
    const paths = await wallpaper.pick($config.mode === 'video' ? 'video' : 'image');
    if (paths.length) setSources([...$sources, ...paths.map(path => ({ enabled: true, path }))]);
  }
  catch { toast('auswahl abgebrochen'); }
}

export const toggleSource = index => setSources($sources.map((item, at) => at === index ? { ...item, enabled: !item.enabled } : item));
export const removeSource = index => setSources($sources.filter((_, at) => at !== index));
export const moveSource   = (from, to) => setSources(moved($sources, from, to));
export const clearSources = () => setSources([]);

// :::::: FILTERS, a chain

export let $selected = null;

export function addFilter () {
  set('filters', [...$config.filters, filterOf('duotone')]);
  $selected = $config.filters.length - 1;
}

export const toggleFilter = index => set('filters', $config.filters.map((entry, at) => at === index ? { ...entry, enabled: !entry.enabled } : entry));
export const setFilter    = (index, key, value) => set('filters', $config.filters.map((entry, at) => at === index ? { ...entry, [key]: value } : entry));

export function removeFilter (index) {
  set('filters', $config.filters.filter((_, at) => at !== index));
  if ($selected === index) $selected = null;
  else if ($selected > index) $selected--;
}

// the selection goes along with its filter
export function moveFilter (from, to) {
  set('filters', moved($config.filters, from, to));
  if ($selected === null) return;
  if ($selected === from) $selected = to;
  else if (from < $selected && $selected <= to) $selected--;
  else if (to <= $selected && $selected < from) $selected++;
}

// :::::: PRESETS

const SOURCE = ['mode', 'videos', 'images'];
const CONFIG_KEYS = Object.keys(CONFIG).filter(key => !SOURCE.includes(key));

export const PRESET = { config: CONFIG_KEYS, source: SOURCE, wallpaper: [...SOURCE, ...CONFIG_KEYS] };

export let $presets! = { config: [], source: [], wallpaper: [] };

const copy = value => JSON.parse(JSON.stringify(value));

// a name taken again overwrites that preset
export function savePreset (kind, name) {
  const list = $presets[kind];
  const title = name.trim() || `preset ${list.length + 1}`;
  const data  = Object.fromEntries(PRESET[kind].map(key => [key, copy($config[key])]));
  const next  = list.some(preset => preset.name === title) ? list.map(preset => preset.name === title ? { data, name: title } : preset) : [...list, { data, name: title }];
  $presets = { ...$presets, [kind]: next };
  toast(`gespeichert: ${title}`);
}

export function loadPreset (kind, index) {
  const { data, name } = $presets[kind][index];
  const taken = Object.fromEntries(PRESET[kind].filter(key => data[key] !== undefined).map(key => [key, copy(data[key])]));
  $config   = { ...$config, ...taken };
  $selected = null;
  toast(`geladen: ${name}`);
}

export const deletePreset = (kind, index) => { $presets = { ...$presets, [kind]: $presets[kind].filter((_, at) => at !== index) }; };

// :::::: THE LOOK

const Look = {
  accent     : Str.default('#f0ba48'),
  gridSize   : Num.range(56, 140).default(84),
  mode       : Enum('system', 'dark', 'light'),
  quality    : Enum(1.5, 1, 0.75),   // the device pixel ratio the preview renders at, at most
  rounded    : Bool.default(true),
  spaceScale : Num.range(0.5, 1.8).default(1),
  uiScale    : Num.range(0.8, 1.6).default(1),
};

export const $look! = $Record(Look).create();

export let $panelHeight! = null;

// :::::: WHAT IS OPEN

export const TABS = [['config', 'Config'], ['filters', 'Filter'], ['motion', 'Bewegung'], ['parallax', 'Parallax']];

export let $overlay = null;
export let $tab     = null;
export let $paused  = false;

export const toggleOverlay = name => { $overlay = $overlay === name ? null : name; };
export const closeOverlay  = () => { $overlay = null; };

// a tab tapped again closes the panel
export const toggleTab = index => { $tab = $tab === index ? null : index; };

// :::::: BEFORE RAT, under keys of their own: taken over once

function adopt () {
  const read = key => { try { return JSON.parse(localStorage.getItem(key) ?? 'null'); } catch { return null; } };
  const old  = read('wpfx_theme');
  if (old) $look.assign(Object.fromEntries(Object.keys(Look).filter(key => key in old).map(key => [key, old[key]])));
  const quality = read('wpfx_preview_quality');
  if (quality) $look.quality = Number(quality);
  const height = read('wpfx_panel_h');
  if (height) $panelHeight = height;
  const presets = Object.fromEntries(Object.keys(PRESET).map(kind => [kind, read(`wpfx_presets_${kind}`)]).filter(([, list]) => Array.isArray(list)));
  if (Object.keys(presets).length) $presets = { ...$presets, ...presets };
  for (const key of ['wpfx_theme', 'wpfx_preview_quality', 'wpfx_panel_h', ...Object.keys(PRESET).map(kind => `wpfx_presets_${kind}`)]) localStorage.removeItem(key);
}

adopt();

// :::::: THE THEME, every shade from bg, fg and the accent

const rgbOf = hex => [0, 2, 4].map(index => parseInt(hex.replace('#', '').slice(index, index + 2), 16));
const hexOf = rgb => `#${rgb.map(value => Math.max(0, Math.min(255, value)).toString(16).padStart(2, '0')).join('')}`;
const mix   = (a, b, t) => { const [x, y] = [rgbOf(a), rgbOf(b)]; return hexOf(x.map((value, index) => Math.round(value + (y[index] - value) * t))); };
const rgba  = (hex, alpha) => `rgba(${rgbOf(hex).join(', ')}, ${alpha})`;

// dark ink on a bright accent, light ink on a dark one
const inkOf = hex => { const [r, g, b] = rgbOf(hex).map(value => value / 255); return 0.299 * r + 0.587 * g + 0.114 * b > 0.6 ? '#1a1508' : '#ffffff'; };

const scheme = matchMedia('(prefers-color-scheme: dark)');

let $systemDark = scheme.matches;
scheme.addEventListener('change', event => { $systemDark = event.matches; });

const $dark = $look.mode === 'system' ? $systemDark : $look.mode === 'dark';

effect(() => {
  const bg    = $dark ? '#0d0f16' : '#eef0f5';
  const fg    = $dark ? '#e9ecf5' : '#14161d';
  const style = document.documentElement.style;
  style.setProperty('--text',        fg);
  style.setProperty('--muted',       mix(bg, fg, 0.62));
  // nested surfaces are translucent fg overlays, depth stacks in both themes
  style.setProperty('--card',        rgba(fg, 0.05));
  style.setProperty('--card-2',      rgba(fg, 0.09));
  style.setProperty('--line',        rgba(fg, 0.15));
  style.setProperty('--accent',      $look.accent);
  style.setProperty('--accent-ink',  inkOf($look.accent));
  style.setProperty('--sheet-bg',    rgba(bg, 0.82));
  style.setProperty('--radius',      $look.rounded ? '14px' : '3px');
  style.setProperty('--radius-lg',   $look.rounded ? '18px' : '4px');
  style.setProperty('--tile',        `${$look.gridSize}px`);
  style.setProperty('--ui-scale',    $look.uiScale);
  style.setProperty('--space-scale', $look.spaceScale);
  document.documentElement.dataset.theme = $dark ? 'dark' : 'light';
});
