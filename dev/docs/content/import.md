# import

`@rat/import`: any file the browser can fetch, in the form you want. The extension picks the format, `as` the result. Parsers load on first use.

```js
import { importFile, renderMD } from '@rat/import';

const rows  = await importFile('./table.csv');            // [{ … }], the header row as keys
const conf  = await importFile('./app.toml');             // an object
const sheet = await importFile('./theme.scss');           // a CSSStyleSheet
const style = await importFile('./theme.scss', 'style');  // a <style>
const text  = await importFile('./theme.scss', String);   // the source as fetched
const html  = await importFile('./readme.md');            // an html string
const node  = await renderMD('# hi', { as: 'element' });
```

## Formats

| | | |
|---|---|---|
| data | `json` `json5` `jsonc` `jsonl` `yaml` `toml` `ini` `env` `xml` `csv` `tsv` | `value` / `records`, `raw` |
| styles | `css` `scss` `sass` `less` | `stylesheet`, `styleElement`, `raw` |
| markup | `md` `html` `svg` | `html` / `string`, `element`, `document` |
| code | `js` `jsx` `ts` `tsx` `wasm` | `module`, `code`, `raw` |
| text | `txt` `glsl` `wgsl` … | `raw` |

The first mode is the default. Plain data is cached in indexeddb (a week by default).

```js
import { configure } from '@rat/import';

configure({ cdn: 'https://esm.sh/', ttl: 60_000, modules: { marked: myMarked } });
```
