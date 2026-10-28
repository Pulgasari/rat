// looksmaxx :: state.rat.js

/*
the editor: a photo, the hair in it recoloured, a hairstyle laid over it. everything stays on the
device. what the controls change is in signals, the heavy work (canvases, the hair mask, the face) in
work: it never renders, compose() draws it.

  $color      { r, g, b } of the hair, or null
  $strength   how much of it, 0 … 1
  $style      the id of the hairstyle, 'custom' for one of the user's, or null
  $scale $offset   its size and height (a fraction of the head, negative up)
  $status     '' | 'loading' | 'segmenting' | 'detecting' | a message
*/

import { effect } from '@rat/signals';

import { detectFace, segmentHair } from './modules/vision.js';
import { drawHairstyle }           from './modules/overlay.js';
import { recolorHair }             from './modules/recolor.js';

const MAX = 1400;   // the working size: a recolour stays smooth

export let $photo    = false;
export let $color    = null;
export let $strength = 0.85;
export let $style    = null;
export let $scale    = 1;
export let $offset   = 0;
export let $status   = '';
export let $face     = false;   // a face was found: the hairstyle sliders show

const work = { base: null, canvas: null, face: null, mask: null, style: null };

const BUSY = { detecting: 'Finding the face …', loading: 'Loading photo …', segmenting: 'Finding the hair …' };

export const isBusy  = status => status in BUSY;
export const labelOf = status => BUSY[status] ?? status;

function imageOf (src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload  = () => resolve(image);
    image.onerror = () => reject(new Error('Could not read that image.'));
    image.src = src;
  });
}

// the visible canvas, once <canvas> is there
export function attach (canvas) {
  work.canvas = canvas;
  compose();
  return () => { if (work.canvas === canvas) work.canvas = null; };
}

// the photo, downsized onto the base canvas, then its hair found
export async function usePhoto (file) {
  if (!file?.type?.startsWith('image/')) return;
  $status = 'loading';
  try {
    const url   = URL.createObjectURL(file);
    const image = await imageOf(url);
    URL.revokeObjectURL(url);

    const scale = Math.min(1, MAX / Math.max(image.naturalWidth, image.naturalHeight));
    const base  = Object.assign(document.createElement('canvas'), { height: Math.round(image.naturalHeight * scale), width: Math.round(image.naturalWidth * scale) });
    base.getContext('2d').drawImage(image, 0, 0, base.width, base.height);

    work.base = base;
    work.face = null;   // found again, lazily, for this photo
    $face     = false;
    $photo    = true;

    $status = 'segmenting';
    const { height, mask, width } = await segmentHair(base);
    work.mask = { mask, maskH: height, maskW: width };
    $status = '';
    compose();
  }
  catch (error) {
    console.error('[looksmaxx]', error);
    $status = error.message || 'Something went wrong.';
  }
}

// base photo, recolour, hairstyle
function compose () {
  const { base, canvas } = work;
  if (!canvas || !base) return;
  canvas.width  = base.width;
  canvas.height = base.height;
  const context = canvas.getContext('2d');
  context.drawImage(base, 0, 0);
  if ($color && work.mask) recolorHair(context, canvas, work.mask, $color, $strength);
  if ($style && work.style && work.face) drawHairstyle(context, work.face, work.style, { height: canvas.height, offsetY: $offset, scale: $scale, width: canvas.width });
}

// a change of the controls draws again
effect(() => { $color; $strength; $style; $scale; $offset; compose(); });

// a hairstyle of the list, one of the user's (an image), or none. the face is found on the first one
export async function useStyle (entry, image) {
  if (!entry && !image) { work.style = null; $style = null; return; }
  try {
    work.style = image ?? await imageOf(entry.src);
    $scale  = 1;
    $offset = 0;
    if (!work.face) {
      $status   = 'detecting';
      work.face = await detectFace(work.base);
      $face     = Boolean(work.face);
      $status   = work.face ? '' : 'No face found: a hairstyle needs a clear front-facing photo.';
    }
    $style = entry?.id ?? 'custom';
  }
  catch (error) {
    console.error('[looksmaxx]', error);
    $status = error.message || 'Could not apply that hairstyle.';
  }
}

export async function useCustomStyle (file) {
  if (file) useStyle(null, await imageOf(URL.createObjectURL(file)));
}

export function reset () {
  $color    = null;
  $strength = 0.85;
  $style    = null;
  $scale    = 1;
  $offset   = 0;
  work.style = null;
}

export function download () {
  if (!work.canvas || !$photo) return;
  work.canvas.toBlob(blob => {
    const link = Object.assign(document.createElement('a'), { download: 'looksmaxx.png', href: URL.createObjectURL(blob) });
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }, 'image/png');
}
