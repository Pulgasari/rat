# @rat/import

one call for any file the browser can fetch: the extension picks the format, `as` picks what
comes back. parsers and compilers (marked, papaparse, sass, sucrase …) load on first use, from
the host if it has them, else from a cdn. plain-data results are cached in indexeddb.

a rewrite of `@aufbau/import`: same functions, same signatures, split into files. switching is
the import specifier.

```js
import { configure, importFile, renderMD } from '@rat/import';

const rows  = await importFile('./table.csv');                 // [{ … }], header row as keys
const sheet = await importFile('./theme.scss');                // CSSStyleSheet
const style = await importFile('./theme.scss', 'style');       // <style>
const text  = await importFile('./theme.scss', String);        // the scss as fetched
const html  = await importFile('./readme.md');                 // html string
const node  = await renderMD('# hi', { as: 'element' });       // <div> holding it

configure({ cdn: 'https://cdn.jsdelivr.net/npm/', modules: { marked: myMarked }, ttl: 60_000 });
```

## how it works

1. **format**: the extension, query and hash stripped (`./data.csv?v=2` is csv). `register()`
   adds one.
2. **mode**: `as` is a string or a constructor (`'raw'`, `String`, `CSSStyleSheet`, `Document`
   …), matched case-insensitively against the format's modes and their aliases. no `as`: the
   first mode. an unknown one throws a `TypeError` naming the valid ones, before the fetch.
   `importFile(path, 'raw')` is short for `importFile(path, { as: 'raw' })`.
3. **vendors**, in order: `configure({ modules })` (a module object, or a specifier), the host
   (import map, `node_modules`), the cdn (`https://esm.sh/` by default) at a pinned version.
   loaded once, a failed load is tried again on the next call.
4. **cache** (`importFile` only): key = absolute url + options, kept for `ttl` (default one
   week, `null`: no expiry). nodes, stylesheets, module namespaces, wasm modules and class
   instances are never cached. a function option (`compiler`) or `useCache: false` skips it.
   a cached value is shared between callers: mutate a copy.

## formats

| extension | function | modes (first: default) | vendor |
|---|---|---|---|
| `css` | `importCSS` | stylesheet, styleElement, raw | |
| `less` | `importLESS` | stylesheet, styleElement, raw | less |
| `sass`, `scss` | `importSASS`, `importSCSS` | stylesheet, styleElement, raw | sass |
| `csv`, `tsv` | `importCSV` | records, array, raw | papaparse |
| `env` | `importENV` | value, raw | |
| `ini` | `importINI` | value, raw | |
| `json` | `importJSON` | value, raw | |
| `json5` | `importJSON5` | value, raw | json5 |
| `jsonc` | `importJSONC` | value, raw | |
| `jsonl`, `ndjson` | `importJSONL` | records, raw | |
| `toml` | `importTOML` | value, raw | smol-toml |
| `xml` | `importXML` | object, json, document, raw | fast-xml-parser |
| `yaml`, `yml` | `importYAML` | value, raw | yaml |
| `htm`, `html` | `importHTML` | string, document, element | |
| `md` | `importMD` | html, element, raw | marked |
| `svg` | `importSVG` | string, element, svgjs, raw | @svgdotjs/svg.js (svgjs) |
| `txt`, `text`, `glsl`, `wgsl`, `vert`, `frag` | `importText` | raw | |
| `js`, `mjs`, `cjs` | `importJS` | module, raw | |
| `jsx` | `importJSX` | module, code, raw | sucrase |
| `ts`, `tsx` | `importTS`, `importTSX` | module, code, raw | sucrase |
| `wasm` | `importWASM` | instance, module, buffer | |

## api

| | |
|---|---|
| `importFile(path, options?)` | by extension, cached. `path`: string or `URL` |
| `import<Format>(path, options?)` | one format, not cached |
| `renderMD(text, options?)` | markdown in hand, same compiler as `importMD` |
| `configure({ cdn, modules, ttl })` | cdn base, vendor overrides (`null` drops one), default ttl |
| `register(extension, handler, modes?)` | a new format or a replaced one, returns the key |
| `resolveMode(format, options)` | the canonical mode, `null` for a format without modes |

options: `as`, `compiler` (`(source, path) => output`: css, less, sass, scss, md, jsx, ts),
`fetchOptions` (to `fetch`), `importObject` (wasm), `parserOptions` (papaparse, fast-xml-parser,
sucrase), `ttl`, `useCache`.

## changes from @aufbau/import

- split into files: `core.js` (settings, options, fetch, paths), `modes.js`, `vendors.js`,
  `cache.js`, and one file per family: `styles.js`, `data.js`, `markup.js`, `code.js`. `file.js`
  holds `importFile` and `register`.
- `importJS` resolves against the page, not against the package.
- the cache keeps plain data only (an allow list, not a deny list): an svg.js wrapper or a wasm
  module is no longer held. `as: String` and `as: 'string'` share an entry instead of turning
  the cache off. a per-call `ttl: null` means no expiry instead of falling back to the default.
  own namespace (`rat-import`): entries of `@aufbau/import` are not read.
- vendors: a failed load is retried, `configure({ modules })` takes effect after a vendor was
  already loaded, `null` drops an override.
- modes are checked before the fetch, for every format (`importText` too).
- `importTSX` is its own function, tsx detection reads the extension, not the last letter of
  the url.
- transpiled modules carry a `sourceURL` and load from a data url in node / bun, where `blob:`
  imports do not work. `parserOptions` reach sucrase.
- `importWASM` falls back to a buffer when the server does not send `application/wasm`.
- `importJSONC` also drops trailing commas, and a string ending in a backslash no longer
  confuses it. `importJSONL` names the line that failed.
- `compiler` also runs over plain css.
- `extensionOf` reads the last path segment: `./v1.2/data` has no extension, `x.constructor` is
  not a format.
- errors start with `[@rat/import]`.
