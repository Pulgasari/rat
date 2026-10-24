// apps/vectorizer/trace.js
// an image to an svg on the device: potrace (esm-potrace-wasm, the engine of svgco.de).
// color: potrace per posterized color layer. mono: one layer, dark on transparent

import { init, potrace } from 'https://esm.sh/esm-potrace-wasm@0.5.1';

const MAX   = 2048;   // the long side an image is traced at, px
const ready = init();

export const DEFAULTS = {
  colors     : 4,      // color: levels per channel (posterize)
  mode       : 'color',
  smoothness : 1,      // 0: corners only … 1.33: round
  speckles   : 2,      // areas up to this many px are dropped
  tolerance  : 0.2,    // how far curves may be joined, less: closer to the pixels
};

// a file as a bitmap, no longer than MAX on its long side
export async function bitmapOf (file) {
  const bitmap = await createImageBitmap(file);
  const scale  = Math.min(1, MAX / Math.max(bitmap.width, bitmap.height));
  if (scale === 1) return bitmap;
  const resized = await createImageBitmap(bitmap, { resizeHeight: Math.round(bitmap.height * scale), resizeQuality: 'high', resizeWidth: Math.round(bitmap.width * scale) });
  bitmap.close();
  return resized;
}

// the svg of a bitmap, without the xml prolog and doctype, with a viewBox so it scales
export async function trace (bitmap, settings = DEFAULTS) {
  await ready;
  const svg = await potrace(bitmap, {
    alphamax               : settings.smoothness,
    extractcolors          : settings.mode === 'color',
    opticurve              : 1,
    opttolerance           : settings.tolerance,
    pathonly               : false,
    posterizationalgorithm : 0,
    posterizelevel         : settings.colors,
    turdsize               : settings.speckles,
    turnpolicy             : 4,
  });
  return tidy(svg, bitmap);
}

function tidy (svg, { height, width }) {
  const markup = svg.slice(svg.indexOf('<svg'));
  return /viewBox=/.test(markup) ? markup : markup.replace('<svg', `<svg viewBox="0 0 ${width} ${height}"`);
}
