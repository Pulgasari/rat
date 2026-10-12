# @rat/syntax

syntax highlighting for rat, from **one source of truth** into every editor.

```
                       ┌─► targets/hljs.js        highlight.js   <write-code>, any hljs page
                       ├─► targets/monaco.js      monarch        zugriff/code
 spec.js ─► engine.js ─┼─► targets/codemirror.js  cm6 stream     acode (acode/dist/)
                       └─► targets/textmate.js    tmLanguage     vs code, shiki, github (textmate/)
 spec.js ─► vocabulary.json ─► zed/grammars/*     tree-sitter    zed (zed/)
```

two languages, one grammar, two entry states:

| id | files | root state | semantics |
|---|---|---|---|
| `rat` | `.rat` | `markup` | markup first: tags, `{…}` holes, `@if`/`@for`/`@switch`, `<script>`, `<style>` |
| `ratjs` | `.rat.js` | `script` | script first: js + sugar (`$signals`, `\|>`), `` html`…` `` is markup again |

everything inside a hole is `script`, everything inside `` html`…` `` is `markup`, so both
languages highlight each other's nested parts identically.

## files

| file | what | edit? |
|---|---|---|
| `spec.js` | vocabulary, patterns, states. **the only place to change the language** | yes |
| `engine.js` | flattening includes, joining group patterns, scope mapping | rarely |
| `targets/*.js` | the translation per engine, plus each engine's scope table | when an engine needs it |
| `hljs/rat.js`, `hljs/ratjs.js` | default exports for `<write-code>` / `hljs.registerLanguage` | no |
| `zed/grammars/common.js` | the tree-sitter grammar (hand-written, reads `vocabulary.json`) | when markup structure changes |
| `zed/languages/*/*.scm` | zed queries: highlights, brackets, css injection | when node names change |
| `build.js` | generates, checks, bundles | rarely |
| `zed/grammars/vocabulary.json`, `zed/grammars/*/src/`, `textmate/`, `acode/dist/` | **generated**, committed | never by hand |

## the model

```js
state  { rules, end?, endToken?, scope?, embed? }
rule   { match, token }           // a token, the state stays
       { begin, token, state }    // a token, then the state is pushed
       { include }                // the rules of another state
```

a state is left when its `end` matches. patterns are regex sources; an array is a sequence
of groups with one token per group. tokens are textmate scopes, each target maps them by
longest prefix onto its own names (`variable.other.reactive` → hljs `variable.reactive`,
monaco `variable.reactive`, codemirror `variableName.special`, zed `@variable.special`).

rules that keep every engine happy:

- no named groups, no variable length lookbehind, no `\p{…}`
- an array part never matches the empty string
- a rule never matches what closes the state around it (`}`, `)`, `>`, a quote).
  hljs would let the rule win over the end otherwise (the hljs target guards against it,
  but the spec should not rely on that)

## workflow

```sh
cd packages/syntax
npm install            # once: tree-sitter-cli, esbuild, highlight.js (all dev only)

# edit spec.js (and, if tags/blocks/holes change structurally, zed/grammars/common.js)
npm run build          # zed parsers, check, textmate, acode
git commit …
node build.js zed-rev  # points zed/extension.toml at that commit
git commit …           # the rev bump
```

`build.js check` is the safety net against the one small error that kills a highlighter:

- parses every file in `demos/examples` with both tree-sitter grammars (errors are reported)
- runs every zed query against them: an unknown node name fails the build, not the editor
- highlights every example with real highlight.js, builds the monarch tokenizers, walks the
  codemirror interpreter over every line (an infinite loop or a throw fails the build)

a new syntax feature therefore goes: spec → an example in `demos/examples` that uses it →
`npm run build`.

## install

### highlight.js / `<write-code>`

`@aufbau/elements` knows `rat` and `ratjs` out of the box (lazy, via the import map):

```html
<write-code lang="rat">…</write-code>
<write-code lang="ratjs">…</write-code>
```

any other hljs:

```js
import hljs         from 'highlight.js';
import { register } from '@rat/syntax/hljs';
register(hljs);
```

rat specific parts get a sub class, so a theme can single them out:

```css
.hljs-variable.reactive_ { color: crimson; }   /* $signals */
.hljs-keyword.block_     { font-weight: 700; } /* @if @for } */
.hljs-operator.pipe_     { color: orange; }    /* |> */
```

### monaco (zugriff/code)

wired in `apps/code/modules/monaco.js`, the language comes from the file name in
`apps/code/modules/files.js`. anywhere else:

```js
import { register, languageOf } from '@rat/syntax/monaco';
register(monaco);
monaco.editor.setModelLanguage(model, languageOf('todo-list.rat'));   // 'rat'
```

### acode (codemirror 6)

install `acode/dist/rat-syntax.zip` (plugins → `+` → local file, or from url:
`https://code.pulgasari.dev/rat/packages/syntax/acode/dist/rat-syntax.zip`).
it registers `RAT` (`.rat`) and `RAT JS` (`.rat.js`) through `acode.require('editorLanguages')`.

codemirror elsewhere:

```js
import { StreamLanguage } from '@codemirror/language';
import { language }       from '@rat/syntax/codemirror';
new EditorView({ extensions: [language(StreamLanguage, 'rat')] });
```

### zed

1. clone this repo, run `npm install && npm run build` in `packages/syntax` once if `src/` is missing
2. zed: extensions → `Install Dev Extension` → select `packages/syntax/zed`
3. zed compiles the grammars from `repository` + `rev` in `zed/extension.toml` (needs a commit
   that is pushed). while changing the grammar itself, point `repository` at your clone
   (`file:///…/rat`) and `rev` at a local commit, then `zed: rebuild dev extension`

if `.rat.js` opens as javascript, add to zed settings:

```json
{ "file_types": { "RAT JS": ["*.rat.js"] } }
```

### textmate (vs code, shiki, github)

`textmate/rat.tmLanguage.json`, `textmate/ratjs.tmLanguage.json`. css in `<style>` includes `source.css`.

## limits (v0)

- regex literals are not recognized (`/` is an operator). a regex containing a quote can
  start a string
- css inside `<style>` is the engine's own css where it can embed (hljs, monaco, textmate,
  zed), a small fallback set of rules in codemirror
- tree-sitter is a highlighting grammar (flat token stream with balanced brackets), not a
  parser of rat. structure-aware features (outline, folding by element) are not there yet
- monaco and codemirror match regexes from the current position; codemirror sees the whole
  line (lookbehind works), monaco may not
