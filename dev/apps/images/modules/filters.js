// images :: modules/filters.js
//
// the effects of @gestalt/filters the app offers, one curated list for the editor and the batch:
//
//   preview(element, id, options)   live, a css/svg filter on an element (none for a canvas-only effect)
//   bake(canvas, id, options)       into the pixels, every effect (export, batch)
//   cssValue(id, options)           a plain css filter value, '' if there is none (the viewer)

import { applyFilter, removeFilter, filterCanvas, filterCss, list } from '@gestalt/filters';

export const NONE = 'none';

// a photo-oriented subset in a deliberate order, what the catalogue lacks is skipped
const CURATED = [
  'grayscale', 'sepia', 'invert', 'saturate', 'hue-saturation', 'duotone', 'instacolor',
  'posterize', 'solarize', 'sharpen', 'blur', 'glow', 'grain', 'vignette', 'halftone',
  'dot-screen', 'scanlines', 'night-vision', 'thermal', 'tilt-shift', 'emboss', 'edges',
  'rgb-shift', 'pixelate', 'dither',
];

const meta = new Map(((() => { try { return list(); } catch { return []; } })()).map(f => [f.id, f]));

// [{ id, name, amount:{default,min,max,step}|null, previewable }]
export const EFFECTS = [
  { id: NONE, name: 'None', amount: null, previewable: true, cssBacked: true },
  ...CURATED.filter(id => meta.has(id)).map(id => {
    const f = meta.get(id);
    return {
      id,
      name       : f.name,
      amount     : f.vars?.amount ?? null,
      previewable: !!(f.backends?.css || f.backends?.svg),
      cssBacked  : !!f.backends?.css,   // realisable as a plain css filter string
    };
  }),
];

export const effectById = id => EFFECTS.find(e => e.id === id) ?? null;

// live, non-destructive preview on a dom element (css filter or injected svg url)
export async function preview (el, id, opts) {
  if (!el) return;
  if (!id || id === NONE) { removeFilter(el); return; }
  try { await applyFilter(el, id, opts || {}); }
  catch { removeFilter(el); }   // canvas-only effect — no live form; it bakes on export
}

// destructive — bake the effect into a canvas in place (export / batch)
export async function bake (canvas, id, opts) {
  if (!canvas || !id || id === NONE) return;
  try { await filterCanvas(canvas, id, opts || {}); }
  catch (err) { console.warn('[images] filter bake failed:', id, err); }
}

export async function cssValue (id, opts) {
  if (!id || id === NONE) return '';
  try { return (await filterCss(id, opts || {})) || ''; }
  catch { return ''; }
}
