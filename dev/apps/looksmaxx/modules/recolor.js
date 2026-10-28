// looksmaxx :: modules/recolor.js
//
// recolour the hair region of a photo without flattening it. the trick (straight
// out of the methodology) is to keep the original luminance — the light and shadow
// structure of the hair — and only push the colour underneath it. a flat fill
// looks like paint; a luminance-preserving blend looks like dyed hair.
//
// we work in HSL: take the target colour's hue+saturation, keep each pixel's own
// lightness, and cross-fade from the original by `strength`. the swap is confined
// to pixels the mask marks as hair, with the mask's own edge softened so the
// hairline doesn't show a hard cut.

const clamp = (n, lo, hi) => n < lo ? lo : n > hi ? hi : n;

function rgbToHsl (r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hue2rgb (p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgb (h, s, l) {
  if (s === 0) { const v = l * 255; return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [hue2rgb(p, q, h + 1 / 3) * 255, hue2rgb(p, q, h) * 255, hue2rgb(p, q, h - 1 / 3) * 255];
}

/**
 * paint `ctx` (already holding the base photo at width×height) with the hair
 * recoloured to `color` = { r, g, b } at `strength` in 0..1. `mask` is the
 * row-major hair mask from vision.segmentHair; `maskW`/`maskH` are its dims,
 * which may differ from the canvas, so we sample it by ratio.
 */
export function recolorHair (ctx, { width, height }, { mask, maskW, maskH }, color, strength = 0.85) {
  if (!color || strength <= 0) return;

  const [th, ts] = rgbToHsl(color.r, color.g, color.b);
  const img  = ctx.getImageData(0, 0, width, height);
  const px   = img.data;
  const sx   = maskW / width, sy = maskH / height;

  for (let y = 0; y < height; y++) {
    const my = Math.min(maskH - 1, (y * sy) | 0);
    for (let x = 0; x < width; x++) {
      const mx = Math.min(maskW - 1, (x * sx) | 0);
      if (mask[my * maskW + mx] !== 1) continue;      // hair pixels only

      const i = (y * width + x) * 4;
      const [, , l] = rgbToHsl(px[i], px[i + 1], px[i + 2]);
      // target colour at the pixel's own lightness → keeps highlights & shadows
      const [nr, ng, nb] = hslToRgb(th, ts, l);
      px[i]     = clamp(px[i]     + (nr - px[i])     * strength, 0, 255);
      px[i + 1] = clamp(px[i + 1] + (ng - px[i + 1]) * strength, 0, 255);
      px[i + 2] = clamp(px[i + 2] + (nb - px[i + 2]) * strength, 0, 255);
    }
  }

  ctx.putImageData(img, 0, 0);
}

/** the built-in swatch palette (natural + a few fun ones) */
export const SWATCHES = [
  { name: 'Jet black',    r: 28,  g: 28,  b: 30  },
  { name: 'Dark brown',   r: 74,  g: 51,  b: 36  },
  { name: 'Chestnut',     r: 120, g: 72,  b: 44  },
  { name: 'Auburn',       r: 150, g: 60,  b: 40  },
  { name: 'Copper',       r: 190, g: 92,  b: 40  },
  { name: 'Honey blonde', r: 214, g: 168, b: 96  },
  { name: 'Platinum',     r: 226, g: 220, b: 205 },
  { name: 'Rose',         r: 214, g: 120, b: 150 },
  { name: 'Lavender',     r: 168, g: 140, b: 214 },
  { name: 'Ocean blue',   r: 70,  g: 120, b: 200 },
  { name: 'Emerald',      r: 60,  g: 170, b: 120 },
  { name: 'Crimson',      r: 200, g: 50,  b: 70  },
];
