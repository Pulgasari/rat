// @rat/language-server :: build
//
// the worker as one file for the browser: a worker has no import map, so what it imports is bundled.
// the code app (dev/apps/code) starts it beside monaco. typescript is not in it: js.js needs a file
// system, monaco brings a typescript of its own (rat/javascript hands it the js text).
//
//   npm install && node build.js    -> dist/worker.js

import { build } from 'esbuild';

await build({
  bundle        : true,
  entryPoints   : [new URL('./worker.js', import.meta.url).pathname],
  format        : 'esm',
  legalComments : 'none',
  logLevel      : 'error',
  minify        : true,
  outfile       : new URL('./dist/worker.js', import.meta.url).pathname,
  platform      : 'browser',
  target        : 'es2022',
});

console.log('[rat/language-server] wrote dist/worker.js');
