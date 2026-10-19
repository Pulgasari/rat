// @rat/import :: code

/*
js, jsx, ts / tsx and wasm.

  js         import()ed against the page (not against this package), or raw
  jsx, ts    transpiled with sucrase (or { compiler: (source, path) => js }),
             then module (imported from a blob url, a data url in node / bun),
             code (the transpiled js) or raw. { parserOptions } reach sucrase
             (jsxPragma, jsxRuntime …). relative imports inside a transpiled
             module do not resolve: it has no path of its own
  wasm       instance (its exports, the default), module (compiled) or buffer.
             streams when the server sends application/wasm
*/

import { absolute, extensionOf, fetchResponse, fetchText, toOptions } from './core.js';
import { resolveMode }                                                 from './modes.js';
import { vendor }                                                      from './vendors.js';

const NODE       = typeof process !== 'undefined' && !!process.versions?.node;
const TRANSFORMS = { jsx: ['jsx'], ts: ['typescript'], tsx: ['jsx', 'typescript'] };

async function importCode (code, path) {
  code += `\n//# sourceURL=${absolute(path)}`;
  if (NODE) return import(/* @vite-ignore */ 'data:text/javascript,' + encodeURIComponent(code));

  const url = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
  try     { return await import(/* @vite-ignore */ url); }
  finally { URL.revokeObjectURL(url); }
}

async function transpile (path, options, format) {
  options = toOptions(options);
  const mode   = resolveMode(format, options);
  const source = await fetchText(path, options);
  if (mode === 'raw') return source;

  const code = options.compiler
    ? await options.compiler(source, path)
    : (await vendor('sucrase')).transform(source, { transforms: TRANSFORMS[format], ...options.parserOptions }).code;

  return mode === 'code' ? code : importCode(code, path);
}

export async function importJS (path, options) {
  options = toOptions(options);
  if (resolveMode('js', options) === 'raw') return fetchText(path, options);
  return import(/* @vite-ignore */ absolute(path));
}
/*
export function importJSX (path, options) { return transpile(path, options, 'jsx'); }
export function importTS  (path, options) { return transpile(path, options, extensionOf(path) === 'tsx' ? 'tsx' : 'ts'); }
export function importTSX (path, options) { return transpile(path, options, 'tsx'); }
*/

export const
importJSX = (path, options) => transpile (path, options, 'jsx'),
importTS  = (path, options) => transpile (path, options, extensionOf(path) === 'tsx' ? 'tsx' : 'ts')),
importTSX = (path, options) => transpile (path, options, 'jsx');
  
export async function importWASM (path, options) {
  options = toOptions(options);
  const mode     = resolveMode('wasm', options);
  const response = await fetchResponse(path, options);
  if (mode === 'buffer') return response.arrayBuffer();

  const streams = response.headers.get('content-type')?.startsWith('application/wasm');
  if (mode === 'module') return streams ? WebAssembly.compileStreaming(response) : WebAssembly.compile(await response.arrayBuffer());

  const imports      = options.importObject ?? {};
  const { instance } = streams
    ? await WebAssembly.instantiateStreaming(response, imports)
    : await WebAssembly.instantiate(await response.arrayBuffer(), imports);
  return instance.exports;
}
