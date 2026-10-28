// images :: editor.rat.js

/*
the editor: one image as a canvas, geometry (rotate, flip, crop, resize) baked in at once with an undo
stack, the adjustments and an effect live on top and baked on export.

  $work $original     the canvas now and as loaded
  $adjust             { brightness, contrast, saturate, grayscale }
  $effect $amount     an effect of filters.js and its amount
  $crop               null, or { x, y, w, h } in image pixels while cropping
*/

import * as edit from './modules/edit.js';
import * as fx   from './modules/filters.js';
import { $current, download, isImageFile } from './tray.rat.js';

export let $original = null;
export let $work     = null;
export let $adjust   = { ...edit.IDENTITY };
export let $effect   = 'none';
export let $amount   = 1;
export let $crop     = null;
export let $ratio    = null;     // the locked aspect ratio (w / h) of the crop, or null
export let $preset   = 'free';
export let $undo     = [];
export let $redo     = [];
export let $name     = 'image';
export let $error    = '';
export let $busy     = false;
export let $width    = 0;        // the resize fields
export let $height   = 0;
export let $locked   = true;

export let $exportFormat!  = 'image/png';
export let $exportQuality! = 92;
export let $panelTab!      = 'adjust';   // adjust | effects | resize | export

export const $dirty = $undo.length > 0 || !edit.isIdentity($adjust) || $effect !== 'none';

export const FORMATS = [
  { ext: 'png',  label: 'PNG',  lossy: false, type: 'image/png' },
  { ext: 'jpg',  label: 'JPEG', lossy: true,  type: 'image/jpeg' },
  { ext: 'webp', label: 'WebP', lossy: true,  type: 'image/webp' },
];

export const formatOf = type => FORMATS.find(format => format.type === type) ?? FORMATS[0];

export const PRESETS = [
  { id: 'free',     label: 'Free',     ratio: null },
  { id: 'original', label: 'Original', ratio: 'image' },
  { id: '1:1',      label: '1:1',      ratio: 1 },
  { id: '4:3',      label: '4:3',      ratio: 4 / 3 },
  { id: '3:4',      label: '3:4',      ratio: 3 / 4 },
  { id: '3:2',      label: '3:2',      ratio: 3 / 2 },
  { id: '2:3',      label: '2:3',      ratio: 2 / 3 },
  { id: '16:9',     label: '16:9',     ratio: 16 / 9 },
  { id: '9:16',     label: '9:16',     ratio: 9 / 16 },
  { id: 'screen',   label: 'Screen',   ratio: 'screen' },
];

const HISTORY  = 30;
const MIN_CROP = 8;   // px

let loadedFrom = null;   // the file last decoded

// :::::: LOADING

export async function loadFile (file) {
  if (!isImageFile(file)) { $error = 'That is not an image.'; return; }
  $busy      = true;
  $error     = '';
  loadedFrom = file;
  try {
    const canvas = await edit.loadImage(file);
    $original = canvas;
    $work     = canvas;
    $adjust   = { ...edit.IDENTITY };
    $effect   = 'none';
    $amount   = 1;
    $undo     = [];
    $redo     = [];
    $crop     = null;
    $name     = (file.name || 'image').replace(/\.[^.]+$/, '');
    syncSize();
  }
  catch (error) {
    $error     = error?.message || String(error);
    loadedFrom = null;
  }
  finally { $busy = false; }
}

// the current image of the tray, into the editor
export function editCurrent () {
  RAT.app.router.go('/edit');
  const shot = $current;
  if (shot && loadedFrom !== shot.file) return loadFile(shot.file);
}

// :::::: HISTORY

function syncSize () {
  if ($work) { $width = $work.width; $height = $work.height; }
}

function commit (next) {
  if (!$work) return;
  $undo = [...$undo, $work].slice(-HISTORY);
  $redo = [];
  $work = next;
  syncSize();
}

export function undo () {
  if (!$undo.length) return;
  $redo = [...$redo, $work];
  $work = $undo.at(-1);
  $undo = $undo.slice(0, -1);
  syncSize();
}

export function redo () {
  if (!$redo.length) return;
  $undo = [...$undo, $work];
  $work = $redo.at(-1);
  $redo = $redo.slice(0, -1);
  syncSize();
}

export function reset () {
  if (!$original) return;
  if ($work !== $original) commit($original);
  $adjust = { ...edit.IDENTITY };
  $effect = 'none';
  $amount = 1;
  $crop   = null;
}

export const rotate = direction => commit(edit.rotate90($work, direction));
export const flip   = axis      => commit(edit.flip($work, axis));

// :::::: ADJUSTMENTS AND EFFECTS

export const setAdjust   = (key, value) => { $adjust = { ...$adjust, [key]: value }; };
export const resetAdjust = () => { $adjust = { ...edit.IDENTITY }; };

export function selectEffect (id) {
  $effect = id;
  $amount = fx.effectById(id)?.amount?.default ?? 1;
}

// :::::: CROP

const screenRatio = () => (screen?.width || innerWidth || 16) / (screen?.height || innerHeight || 9);
const round4      = (x, y, w, h) => ({ h: Math.round(h), w: Math.round(w), x: Math.round(x), y: Math.round(y) });

function centered (ratio, width, height) {
  let w = width, h = width / ratio;
  if (h > height) { h = height; w = height * ratio; }
  return round4((width - w) / 2, (height - h) / 2, w, h);
}

export function startCrop () {
  if (!$work) return;
  const { height, width } = $work;
  $crop   = round4(width * 0.1, height * 0.1, width * 0.8, height * 0.8);
  $ratio  = null;
  $preset = 'free';
}

export const cancelCrop = () => { $crop = null; };

export function applyCrop () {
  const rect = $crop;
  $crop = null;
  if (rect) commit(edit.crop($work, rect.x, rect.y, rect.w, rect.h));
}

export function applyPreset (preset) {
  if (!$work) return;
  let ratio = preset.ratio;
  if (ratio === 'image')  ratio = $work.width / $work.height;
  if (ratio === 'screen') ratio = screenRatio();
  $preset = preset.id;
  $ratio  = ratio;
  if (ratio) $crop = centered(ratio, $work.width, $work.height);
}

// the crop rect a drag makes: drag { type: 'move' | a handle 'nw' … 'w', origin, rect }, point in image pixels
export function nextCrop (drag, point, W, H, ratio) {
  const rect = drag.rect;
  const startL = rect.x, startT = rect.y, startR = rect.x + rect.w, startB = rect.y + rect.h;

  if (drag.type === 'move') {
    const left = Math.min(Math.max(0, rect.x + point.x - drag.origin.x), W - rect.w);
    const top  = Math.min(Math.max(0, rect.y + point.y - drag.origin.y), H - rect.h);
    return { h: rect.h, w: rect.w, x: Math.round(left), y: Math.round(top) };
  }

  const west  = drag.type.includes('w'), east  = drag.type.includes('e');
  const north = drag.type.includes('n'), south = drag.type.includes('s');

  if (!ratio) {
    let left = startL, top = startT, right = startR, bottom = startB;
    if (west)  left   = Math.min(Math.max(0, point.x), right - MIN_CROP);
    if (east)  right  = Math.max(Math.min(W, point.x), left + MIN_CROP);
    if (north) top    = Math.min(Math.max(0, point.y), bottom - MIN_CROP);
    if (south) bottom = Math.max(Math.min(H, point.y), top + MIN_CROP);
    return round4(left, top, right - left, bottom - top);
  }

  const minW = Math.max(MIN_CROP, MIN_CROP * ratio);
  let ax, ay, w, h;

  if ((east || west) && (north || south)) {
    ax = east ? startL : startR;
    ay = south ? startT : startB;
    w  = Math.max(Math.abs(point.x - ax), Math.abs(point.y - ay) * ratio);
    w  = Math.min(w, east ? W - ax : ax, (south ? H - ay : ay) * ratio);
  }
  else if (east || west) {
    ax = east ? startL : startR;
    const cy = (startT + startB) / 2;
    w = Math.max(minW, Math.min(Math.abs(point.x - ax), east ? W - ax : ax, 2 * Math.min(cy, H - cy) * ratio));
    h = w / ratio;
    return round4(east ? ax : ax - w, cy - h / 2, w, h);
  }
  else {
    ay = south ? startT : startB;
    const cx = (startL + startR) / 2;
    h = Math.max(minW / ratio, Math.min(Math.abs(point.y - ay), south ? H - ay : ay, 2 * Math.min(cx, W - cx) / ratio));
    w = h * ratio;
    return round4(cx - w / 2, south ? ay : ay - h, w, h);
  }

  w = Math.max(w, minW);
  h = w / ratio;
  return round4(east ? ax : ax - w, south ? ay : ay - h, w, h);
}

// :::::: RESIZE AND EXPORT

export function setSize (which, value) {
  if (!$work) return;
  value = Math.max(1, Math.round(value || 0));
  const ratio = $work.width / $work.height;
  if (which === 'w') { $width  = value; if ($locked) $height = Math.max(1, Math.round(value / ratio)); }
  else               { $height = value; if ($locked) $width  = Math.max(1, Math.round(value * ratio)); }
}

export function applyResize () {
  if ($work && ($width !== $work.width || $height !== $work.height)) commit(edit.resize($work, $width, $height));
}

export async function exportImage () {
  if (!$work) return;
  $busy = true;
  try {
    const flat   = edit.applyFilter($work, $adjust);
    await fx.bake(flat, $effect, { amount: $amount });
    const format = formatOf($exportFormat);
    download(await edit.toBlob(flat, format.type, $exportQuality / 100), `${$name}.${format.ext}`);
  }
  catch (error) { $error = error?.message || String(error); }
  finally { $busy = false; }
}

// :::::: ON SCREEN

// the editor keys while it is on screen, and the tray's image if the editor is empty
export function keys () {
  if (!$work && $current && loadedFrom !== $current.file) loadFile($current.file);
  const onKey = event => {
    if (event.key === 'Escape' && $crop) { cancelCrop(); return; }
    if (!event.ctrlKey && !event.metaKey) return;
    const key = event.key.toLowerCase();
    if (key === 'z' && !event.shiftKey) { event.preventDefault(); undo(); }
    else if (key === 'y' || (key === 'z' && event.shiftKey)) { event.preventDefault(); redo(); }
  };
  addEventListener('keydown', onKey);
  return () => removeEventListener('keydown', onKey);
}

// the visible canvas: a copy of the work, the effect live on its wrapper
export function paint (canvas, work) {
  if (!work) return;
  canvas.width  = work.width;
  canvas.height = work.height;
  canvas.getContext('2d').drawImage(work, 0, 0);
}

export const previewEffect = (element, [id, amount]) => { fx.preview(element, id, { amount }); };
