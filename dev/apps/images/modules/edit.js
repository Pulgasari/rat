// images :: modules/edit.js
//
// the pixel work, pure canvas transforms: each takes a canvas and returns a new one, the caller keeps
// the old one for undo. nothing here touches the dom or the app state

export function newCanvas (w, h) {
  const canvas = document.createElement('canvas');
  canvas.width  = Math.max(1, Math.round(w));
  canvas.height = Math.max(1, Math.round(h));
  return canvas;
}

// a straight copy of a canvas
export function clone (src) {
  const out = newCanvas(src.width, src.height);
  out.getContext('2d').drawImage(src, 0, 0);
  return out;
}

// rotate by a quarter turn — 'cw' or 'ccw'. width and height swap.
export function rotate90 (src, dir = 'cw') {
  const out = newCanvas(src.height, src.width);
  const ctx = out.getContext('2d');
  if (dir === 'cw') { ctx.translate(out.width, 0);  ctx.rotate(Math.PI / 2); }
  else              { ctx.translate(0, out.height); ctx.rotate(-Math.PI / 2); }
  ctx.drawImage(src, 0, 0);
  return out;
}

// mirror across an axis — 'h' (left↔right) or 'v' (top↔bottom)
export function flip (src, axis = 'h') {
  const out = newCanvas(src.width, src.height);
  const ctx = out.getContext('2d');
  if (axis === 'h') { ctx.translate(out.width, 0); ctx.scale(-1, 1); }
  else              { ctx.translate(0, out.height); ctx.scale(1, -1); }
  ctx.drawImage(src, 0, 0);
  return out;
}

// cut out a rectangle (in source pixels), clamped to the canvas
export function crop (src, x, y, w, h) {
  x = Math.max(0, Math.min(src.width,  Math.round(x)));
  y = Math.max(0, Math.min(src.height, Math.round(y)));
  w = Math.max(1, Math.min(src.width  - x, Math.round(w)));
  h = Math.max(1, Math.min(src.height - y, Math.round(h)));
  const out = newCanvas(w, h);
  out.getContext('2d').drawImage(src, x, y, w, h, 0, 0, w, h);
  return out;
}

// scale to new dimensions
export function resize (src, w, h) {
  const out = newCanvas(w, h);
  const ctx = out.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(src, 0, 0, out.width, out.height);
  return out;
}

// :::::: ADJUSTMENTS

export const IDENTITY = { brightness: 100, contrast: 100, saturate: 100, grayscale: 0 };

// true when the sliders are all at their neutral position
export const isIdentity = f =>
  f.brightness === 100 && f.contrast === 100 && f.saturate === 100 && f.grayscale === 0;

// a css/canvas filter string from the slider values
export const filterString = f =>
  `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturate}%) grayscale(${f.grayscale}%)`;

// bake the current adjustments into the pixels
export function applyFilter (src, f) {
  if (isIdentity(f)) return clone(src);
  const out = newCanvas(src.width, src.height);
  const ctx = out.getContext('2d');
  ctx.filter = filterString(f);
  ctx.drawImage(src, 0, 0);
  return out;
}

// :::::: IO

// decode a File/Blob into a canvas — createImageBitmap with an <img> fallback
export async function loadImage (file) {
  try {
    const bitmap = await createImageBitmap(file);
    const out = newCanvas(bitmap.width, bitmap.height);
    out.getContext('2d').drawImage(bitmap, 0, 0);
    bitmap.close?.();
    return out;
  } catch {
    return await new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const out = newCanvas(img.naturalWidth, img.naturalHeight);
        out.getContext('2d').drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve(out);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('could not decode image')); };
      img.src = url;
    });
  }
}

export function toBlob (canvas, type = 'image/png', quality = 0.92) {
  return new Promise((resolve, reject) =>
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('export failed')), type, quality)
  );
}
