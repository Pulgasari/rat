// videos :: library.js
//
// the clips of the granted folders (.shared/gallery.js, table clips) and their posters: one frame
// decoded on the device, downscaled, kept in the thumbnails (RAT.app.thumbnails) under the clip's key
// and signature. a clip the browser can not decode has none, the icon stays

import { createGallery } from '../.shared/gallery.js';

export const gallery = createGallery({ table: 'clips' });

const WIDTH   = 320;
const AT      = 1;       // the second the frame is taken at, inside the clip
const TIMEOUT = 15000;

// decoding is heavy: two at a time
const queue = [];
let   busy  = 0;

function limit (job) {
  return new Promise((resolve, reject) => {
    queue.push({ job, reject, resolve });
    pump();
  });
}

function pump () {
  while (busy < 2 && queue.length) {
    const { job, reject, resolve } = queue.shift();
    busy++;
    job().then(resolve, reject).finally(() => { busy--; pump(); });
  }
}

// one frame of a video file as a webp blob, or a rejection
export function frameOf (file) {
  return new Promise((resolve, reject) => {
    const url   = URL.createObjectURL(file);
    const video = Object.assign(document.createElement('video'), { muted: true, playsInline: true, preload: 'auto' });

    let done = false;
    const end = (error, blob) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      video.removeAttribute('src');
      try { video.load(); } catch {}
      URL.revokeObjectURL(url);
      error ? reject(error) : resolve(blob);
    };
    const timer = setTimeout(() => end(new Error('timeout')), TIMEOUT);

    // a time past 0 forces a real seek and a decoded frame (0 can be black or never fire)
    video.addEventListener('loadedmetadata', () => {
      const duration = video.duration;
      video.currentTime = Number.isFinite(duration) && duration > 0 ? Math.min(AT, Math.max(0.1, duration * 0.1)) : AT;
    }, { once: true });
    video.addEventListener('seeked', () => {
      const scale  = Math.min(1, WIDTH / (video.videoWidth || WIDTH));
      const canvas = Object.assign(document.createElement('canvas'), { height: Math.max(1, Math.round((video.videoHeight || WIDTH) * scale)), width: Math.max(1, Math.round((video.videoWidth || WIDTH) * scale)) });
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => blob ? end(null, blob) : end(new Error('encode')), 'image/webp', 0.72);
    }, { once: true });
    video.addEventListener('error', () => end(video.error ?? new Error('decode')), { once: true });
    video.src = url;
  });
}

// the poster of a clip, an object url or null
export function posterOf (clip) {
  return RAT.app.thumbnails.requestFile(`${clip.key}:${clip.sig}`, () => limit(async () => frameOf(await gallery.open(clip)))).catch(() => null);
}
