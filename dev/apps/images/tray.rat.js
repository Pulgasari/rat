// images :: tray.rat.js

/*
the open images, what every view works on: the viewer browses them, the editor takes the current one,
the library and the launch queue fill them. only setFiles replaces the set.

  $shots    [{ file, name, size, type, url }]
  $index    the one shown
*/

export let $shots = [];
export let $index = 0;
export let $error = '';

export const $current = $shots[$index] ?? null;
export const $many    = $shots.length > 1;

const IMAGE = /\.(avif|bmp|gif|heic|heif|ico|jfif|jpe?g|png|svg|tiff?|webp)$/i;
const UNITS = ['B', 'KB', 'MB', 'GB'];

export const isImageFile = file => file && (file.type?.startsWith('image/') || IMAGE.test(file.name || ''));

export function formatSize (bytes = 0) {
  if (!bytes) return '';
  const unit = Math.min(UNITS.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${(bytes / 1024 ** unit).toFixed(unit ? 1 : 0)} ${UNITS[unit]}`;
}

export function setFiles (files) {
  const images = [...files].filter(isImageFile);
  if (!images.length) {
    if (files.length) $error = 'Those files aren’t images the browser can show.';
    return;
  }
  for (const shot of $shots) URL.revokeObjectURL(shot.url);
  $error = '';
  $shots = images.map(file => ({ file, name: file.name || 'image', size: file.size, type: file.type, url: URL.createObjectURL(file) }));
  $index = 0;
}

export function show (index) {
  const count = $shots.length;
  if (count) $index = (index + count) % count;
}

export function removeCurrent () {
  const shot = $shots[$index];
  if (!shot) return;
  URL.revokeObjectURL(shot.url);
  $shots = $shots.filter((_, index) => index !== $index);
  if ($index >= $shots.length) $index = Math.max(0, $shots.length - 1);
}

export function download (blob, name) {
  const url = typeof blob === 'string' ? blob : URL.createObjectURL(blob);
  Object.assign(document.createElement('a'), { download: name, href: url }).click();
  if (url !== blob) setTimeout(() => URL.revokeObjectURL(url), 1000);
}
