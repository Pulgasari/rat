// @rat/import :: modes

/*
what a format hands back, picked with `as`:

  importFile('./theme.css')                     // CSSStyleSheet, the first mode is the default
  importFile('./theme.css', 'style')            // <style>, an alias of styleElement
  importFile('./theme.css', HTMLStyleElement)   // the same: a constructor counts by its name

each table is { canonical: [aliases] }, the first canonical mode is the default.
the tables hold strings only: naming globals like CSSStyleSheet at load would
throw in node, deno or a worker without a dom.
*/

import { isFunction, isString } from './core.js';

const css = {
  stylesheet   : ['adopted', 'cssstylesheet', 'sheet'],
  styleElement : ['htmlstyleelement', 'style', 'tag'],
  raw          : ['code', 'css', 'source', 'string', 'text'],
};

const data = {
  value : ['js', 'json', 'object', 'parsed'],
  raw   : ['source', 'string', 'text'],
};

const transpiled = {
  module : ['exports', 'namespace'],
  code   : ['compiled', 'javascript', 'js'],
  raw    : ['source', 'string', 'text'],
};

const tables = {
  css,
  csv   : {
    records : ['json', 'object', 'objects', 'rows'],
    array   : ['arrays', 'matrix', 'tuples'],
    raw     : ['source', 'string', 'text'],
  },
  env   : data,
  html  : {
    string   : ['html', 'markup', 'raw', 'source', 'text'],
    document : ['doc', 'dom'],
    element  : ['div', 'documentfragment', 'fragment', 'node'],
  },
  ini   : data,
  js    : {
    module : ['exports', 'namespace'],
    raw    : ['code', 'source', 'string', 'text'],
  },
  json  : data,
  json5 : data,
  jsonc : data,
  jsonl : {
    records : ['array', 'arrays', 'objects', 'rows'],
    raw     : ['source', 'string', 'text'],
  },
  jsx   : transpiled,
  less  : css,
  md    : {
    html    : ['markup', 'string'],
    element : ['dom', 'fragment', 'node'],
    raw     : ['markdown', 'source', 'text'],
  },
  sass  : css,
  scss  : css,
  svg   : {
    string  : ['markup', 'text'],
    element : ['dom', 'node', 'svgelement'],
    svgjs   : ['svgdotjs', 'wrapped'],
    raw     : ['original', 'source'],
  },
  text  : {
    raw : ['code', 'source', 'string', 'text'],
  },
  toml  : data,
  ts    : transpiled,
  tsx   : transpiled,
  wasm  : {
    instance : ['exports', 'webassemblyinstance'],
    module   : ['compiled', 'webassemblymodule'],
    buffer   : ['arraybuffer', 'binary', 'bytes', 'raw'],
  },
  xml   : {
    object   : ['js', 'parsed', 'value'],
    json     : ['jsonstring', 'stringify'],
    document : ['doc', 'dom'],
    raw      : ['source', 'string', 'text', 'xml'],
  },
  yaml  : data,
};

const indexes = new Map; // format -> { fallback, list, lookup: token -> canonical }

export const tokenOf = as => (isFunction(as) ? as.name : String(as)).toLowerCase();

export function defineModes (format, table) {
  const lookup = new Map;
  for (const [canonical, aliases] of Object.entries(table)) {
    lookup.set(canonical.toLowerCase(), canonical);
    for (const alias of aliases) lookup.set(alias.toLowerCase(), canonical);
  }
  const list = Object.keys(table);
  indexes.set(format, { fallback: list[0], list, lookup });
}

for (const format in tables) defineModes(format, tables[format]);

// the canonical mode, null for a format without a table
export function resolveMode (format, options) {
  const index = indexes.get(format);
  if (!index) return null;

  const as = isString(options) || isFunction(options) ? options : options?.as;
  if (as == null) return index.fallback;

  const canonical = index.lookup.get(tokenOf(as));
  if (!canonical) throw new TypeError(`[@rat/import] unknown mode "${isFunction(as) ? as.name : as}" for .${format}, expected one of: ${index.list.join(', ')}`);
  return canonical;
}
