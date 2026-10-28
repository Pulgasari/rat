// images :: viewer.rat.js

/*
the viewer over the tray: zoom and pan of the shown image, a live effect (view only, never saved), the
bars hidden for a bare look. the stage element is handed over by <ViewerView> (stage), its gestures
zoom and pan.

  $zoom $pan    1 fits the stage, the pan is kept inside it
  $bare $strip  the bars gone, the thumbnail strip shown
  $effect       a css-backed effect id, $filter its css value
*/

import { effect } from '@rat/signals';
import { gestures } from '@aufbau/gestures';

import toast   from '../.shared/toast.js';
import * as fx from './modules/filters.js';
import { $current, $index, $many, setFiles, show } from './tray.rat.js';

export let $zoom   = 1;
export let $pan    = { x: 0, y: 0 };
export let $bare   = false;
export let $strip  = true;
export let $effect = 'none';
export let $filter = '';

export const $moved = $zoom !== 1 || $pan.x !== 0 || $pan.y !== 0;

const ACCEPT = ['.avif', '.bmp', '.gif', '.heic', '.heif', '.ico', '.jpeg', '.jpg', '.png', '.svg', '.tif', '.tiff', '.webp'];

effect(() => {
  const id = $effect;
  fx.cssValue(id).then(css => { if ($effect === id) $filter = css; });
});

let stage = null;

export function reset () { $zoom = 1; $pan = { x: 0, y: 0 }; }

export function go (delta) {
  show($index + delta);
  reset();
}

export function showAt (index) {
  $index = index;
  reset();
}

function clampPan (pan) {
  const image = stage?.querySelector('.viewer-image');
  if (!image) return pan;
  const bounds = stage.getBoundingClientRect();
  const maxX   = Math.max(0, (image.offsetWidth  * $zoom - bounds.width)  / 2);   // offset sizes: the layout, not the transform
  const maxY   = Math.max(0, (image.offsetHeight * $zoom - bounds.height) / 2);
  return { x: Math.min(maxX, Math.max(-maxX, pan.x)), y: Math.min(maxY, Math.max(-maxY, pan.y)) };
}

export function setZoom (zoom) {
  $zoom = Math.min(8, Math.max(1, zoom));
  $pan  = $zoom === 1 ? { x: 0, y: 0 } : clampPan($pan);
}

export const zoomIn  = () => setZoom($zoom * 1.4);
export const zoomOut = () => setZoom($zoom / 1.4);

export function toggleFullscreen () {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else document.documentElement.requestFullscreen?.().catch(() => {});
}

let input = null;   // the <input type=file> of browsers without a file picker

export async function openPicker () {
  if (!globalThis.showOpenFilePicker) return input?.click();
  try {
    const handles = await showOpenFilePicker({ multiple: true, types: [{ accept: { 'image/*': ACCEPT }, description: 'Images' }] });
    setFiles(await Promise.all(handles.map(handle => handle.getFile())));
    reset();
  }
  catch (error) { if (error?.name !== 'AbortError') toast.error(error); }
}

export function picker (element) {
  input = element;
  return () => { if (input === element) input = null; };
}

// the stage: a double tap zooms, a pan moves a zoomed image, a pinch or the wheel zooms
export function attach (element) {
  stage = element;
  let from  = { x: 0, y: 0 };
  let start = 1;
  const handle = gestures(element, {
    onDoubleTap  : () => { if ($current) setZoom($zoom > 1 ? 1 : 2.5); },
    onPanStart   : () => { from = { ...$pan }; },
    onPanMove    : gesture => { if ($zoom > 1) $pan = clampPan({ x: from.x + gesture.delta.x, y: from.y + gesture.delta.y }); },
    onPinchStart : () => { start = $zoom; },
    onPinchMove  : gesture => { if ($current) setZoom(start * gesture.scale); },
    onWheelMove  : gesture => { if ($current) setZoom($zoom * (gesture.movement.y < 0 ? 1.15 : 1 / 1.15)); },
  });
  return () => {
    handle.destroy();
    if (stage === element) stage = null;
  };
}

// the keys of the viewer, while it is on screen
export function keys (element, edit) {
  const onKey = event => {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)) return;
    switch (event.key) {
      case 'ArrowRight': case ' ': if ($many) { event.preventDefault(); go(1); } break;
      case 'ArrowLeft' : if ($many) go(-1); break;
      case '+': case '=': zoomIn(); break;
      case '-'   : zoomOut(); break;
      case '0'   : reset(); break;
      case 'f'   : toggleFullscreen(); break;
      case 'e'   : if ($current) edit(); break;
      case 'Escape': if ($bare) $bare = false; else reset(); break;
    }
  };
  addEventListener('keydown', onKey);
  return () => removeEventListener('keydown', onKey);
}
