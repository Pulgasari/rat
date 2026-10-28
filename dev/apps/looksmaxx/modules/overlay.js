// looksmaxx :: modules/overlay.js
//
// place a 2D hairstyle "sticker" (a transparent PNG) over the head in a photo —
// the fast, fully client-side approach (Ansatz A). the FaceLandmarker gives us
// eye and forehead points; from those we get the head's roll angle, its width
// (eye distance is a stable proxy) and an anchor on the forehead, then draw the
// PNG scaled + rotated to match. no ML re-render, no server.
//
// landmark indices (MediaPipe Face Mesh, 468/478): 33 = right eye outer,
// 263 = left eye outer, 10 = forehead top, 1 = nose tip.

// how many "eye distances" wide a hairstyle PNG should be drawn. a wig image is
// authored roughly this wide relative to the eyes; a per-style tweak can override.
const DEFAULT_WIDTH_RATIO = 3.1;

/**
 * draw `img` (an HTMLImageElement, already loaded) as a hairstyle over the face
 * described by `landmarks`, onto `ctx` sized width×height (canvas pixels).
 * `opts.scale` (default 1) and `opts.offsetY` (fraction of head height, default 0,
 * negative = up) let the UI nudge fit. returns false if landmarks are unusable.
 */
export function drawHairstyle (ctx, landmarks, img, { width, height, scale = 1, offsetY = 0, widthRatio = DEFAULT_WIDTH_RATIO } = {}) {
  if (!landmarks || !img?.complete || !img.naturalWidth) return false;

  const rightEye = landmarks[33];
  const leftEye  = landmarks[263];
  const forehead = landmarks[10];
  if (!rightEye || !leftEye || !forehead) return false;

  const ex = (leftEye.x - rightEye.x) * width;
  const ey = (leftEye.y - rightEye.y) * height;
  const eyeDist = Math.hypot(ex, ey);
  if (!eyeDist) return false;

  const angle   = Math.atan2(ey, ex);                       // head roll
  const drawW   = eyeDist * widthRatio * scale;
  const drawH   = drawW * (img.naturalHeight / img.naturalWidth);
  const anchorX = forehead.x * width;
  const anchorY = forehead.y * height + offsetY * drawH;

  ctx.save();
  ctx.translate(anchorX, anchorY);
  ctx.rotate(angle);
  // anchor the PNG so the forehead point sits a bit below its top edge — the
  // hairline area of a typical cut-out — and centre it horizontally.
  ctx.drawImage(img, -drawW / 2, -drawH * 0.42, drawW, drawH);
  ctx.restore();
  return true;
}
