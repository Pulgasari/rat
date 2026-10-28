// images :: convert.rat.js
//
// convert: images re-encoded as jpg, png or webp

import { entriesOf, release, runAll } from './files.js';

export let $converts = [];

export let $convertFormat!  = 'webp';
export let $convertQuality! = 90;

export const FORMATS = ['jpg', 'png', 'webp'];

const MIME = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

export const add = files => { $converts = [...$converts, ...entriesOf(files)]; };

export function remove (id) {
  const entry = $converts.find(item => item.id === id);
  if (entry) release(entry);
  $converts = $converts.filter(item => item.id !== id);
}

async function convert (file) {
  const bitmap = await createImageBitmap(file);
  const canvas = Object.assign(document.createElement('canvas'), { height: bitmap.height, width: bitmap.width });
  const ctx    = canvas.getContext('2d');
  if ($convertFormat === 'jpg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height); }   // jpg has no alpha
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close?.();
  const blob = await new Promise(resolve => canvas.toBlob(resolve, MIME[$convertFormat], $convertQuality / 100));
  if (!blob) throw new Error('Conversion failed');
  return { blob, outName: `${file.name.replace(/\.[^.]+$/, '')}.${$convertFormat}` };
}

export const convertAll = () => runAll(() => $converts, list => { $converts = list; }, convert, true);
