// images :: library.js
//
// the images of the granted folders (.shared/gallery.js, table pics) and their thumbnails: the file,
// downscaled by RAT.app.thumbnails, kept under the image's key and signature

import { createGallery } from '../.shared/gallery.js';

export const gallery = createGallery({ table: 'pics' });

export const thumbOf = pic => RAT.app.thumbnails.requestFile(`${pic.key}:${pic.sig}`, () => gallery.open(pic)).catch(() => null);
