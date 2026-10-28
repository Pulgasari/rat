// tools :: modules/ffmpeg.js
//
// one ffmpeg.wasm for the audio tools, loaded on first use. the ~32 mb core comes off the cdn (blob urls:
// the worker needs it same-origin), the service worker keeps it from then on. one exec at a time: the
// wasm is not safe across concurrent runs
//
//   const ff = await loadFFmpeg();
//   const [data] = await run(file, 'in.wav', ['-i', 'in.wav', 'out.mp3'], ['out.mp3'], progress => …);
//   await exclusive(async ff => { … several files … });

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

const CORE = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/';

let loading = null;
let queue   = Promise.resolve();

export function loadFFmpeg () {
  loading ??= (async () => {
    const ff = new FFmpeg;
    await ff.load({
      coreURL : await toBlobURL(`${CORE}ffmpeg-core.js`, 'text/javascript'),
      wasmURL : await toBlobURL(`${CORE}ffmpeg-core.wasm`, 'application/wasm'),
    });
    return ff;
  })().catch(error => { loading = null; throw error; });
  return loading;
}

// fn (ff) alone on ffmpeg, its progress events to onProgress (0 … 100) while it runs
export function exclusive (fn, onProgress) {
  const job = queue.then(async () => {
    const ff       = await loadFFmpeg();
    const progress = ({ progress }) => onProgress?.(Math.max(0, Math.min(100, Math.round(progress * 100))));
    ff.on('progress', progress);
    try { return await fn(ff); }
    finally { ff.off('progress', progress); }
  });
  queue = job.catch(() => {});
  return job;
}

// a file in under the name input, ffmpeg run with args, the files named outputs read back
export const run = (file, input, args, outputs, onProgress) => exclusive(async ff => {
  await ff.writeFile(input, await fetchFile(file));
  try {
    await ff.exec(args);
    const results = [];
    for (const name of outputs) {
      results.push(await ff.readFile(name));
      await ff.deleteFile(name);
    }
    return results;
  }
  finally { await ff.deleteFile(input).catch(() => {}); }
}, onProgress);

export { fetchFile };
