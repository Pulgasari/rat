// @rat/import :: file

/*
importFile() picks the format by extension (query and hash stripped, so
'./data.csv?v=2' is csv) and goes through the cache (cache.js).

register('.ext', handler, modes?) adds a format or replaces one. modes takes the
{ canonical: [aliases] } shape of modes.js, resolveMode('ext', options) then
knows it.
*/

import { cached }                 from './cache.js';
import { extensionOf, toOptions } from './core.js';
import { defineModes }            from './modes.js';

import { importJS, importJSX, importTS, importTSX, importWASM } from './code.js';
import {
  importCSV, importENV, importINI, importJSON, importJSON5,
  importJSONC, importJSONL, importTOML, importXML, importYAML,
} from './data.js';
import { importHTML, importMD, importSVG, importText }   from './markup.js';
import { importCSS, importLESS, importSASS, importSCSS } from './styles.js';

const handlers = new Map(Object.entries({
  cjs    : importJS,
  css    : importCSS,
  csv    : importCSV,
  env    : importENV,
  frag   : importText,
  glsl   : importText,
  htm    : importHTML,
  html   : importHTML,
  ini    : importINI,
  js     : importJS,
  json   : importJSON,
  json5  : importJSON5,
  jsonc  : importJSONC,
  jsonl  : importJSONL,
  jsx    : importJSX,
  less   : importLESS,
  md     : importMD,
  mjs    : importJS,
  ndjson : importJSONL,
  sass   : importSASS,
  scss   : importSCSS,
  svg    : importSVG,
  text   : importText,
  toml   : importTOML,
  ts     : importTS,
  tsv    : importCSV,
  tsx    : importTSX,
  txt    : importText,
  vert   : importText,
  wasm   : importWASM,
  wgsl   : importText,
  xml    : importXML,
  yaml   : importYAML,
  yml    : importYAML,
}));

export function register (extension, handler, modes) {
  const key = extension.toLowerCase().replace(/^\./, '');
  handlers.set(key, handler);
  if (modes) defineModes(key, modes);
  return key;
}

export async function importFile (path, options) {
  options = toOptions(options);
  const extension = extensionOf(path);
  const handler   = handlers.get(extension);
  if (!handler) throw new Error(`[@rat/import] .${extension || '(none)'} is not supported: ${path}`);
  return cached(path, options, () => handler(path, options));
}
