# @rat/language-server

A language server (LSP) for `.rat` and `.rat.js`. Background and the plan for
the next stages: [lsp/rat.md](https://github.com/pulgasari/pulgasari.github.io/blob/main/md/webdev/lsp/rat.md).

| stage | features | status |
|---|---|---|
| 1 | diagnostics: every markup error at once (tolerant parse), closing tags that name another element, `$names` nobody declares, then the compiler for scripts and expressions | built |
| 2 | structure: symbols, folding, selection ranges, linked editing of tag names, semantic tokens for `$signals`; hover, definition, references, highlights and rename of signals; completion of blocks, `bind:`, behaviors, `on:` modifiers | built |
| 3 | javascript in scripts and holes through typescript: completion, hover, definition, signature help; the item of an `@for` in scope, imports of `.rat` files, component tags | built, without source map (see below) |
| 4 | css in `<style>` (validation, completion, hover, colors); tags, attributes and values from html and `custom-elements.json` through `@htx/analyzer`; class names of the `<style>` and the workspace's stylesheets in selectors and `class="…"` | built |
| 5 | code actions: `@if={x}` into a block, declare an unknown `$name`, the closest value for a wrong one; `@if` / `@for` between braces and one line | built |

## how it works

| file | |
|---|---|
| `document.js` | one analysis per version: the tolerant ast, scripts, holes, styles, signals and their occurrences, and two virtual texts (css and js) that keep every offset of the source |
| `rat.js` | stage 2, from the ast alone |
| `elements.js` | the markup as `@htx/analyzer` templates: holes, block heads, scripts and styles cut out |
| `css.js` | `vscode-css-languageservice` on the css text |
| `js.js` | the typescript language service on the js text (node only) |
| `actions.js` | stage 5, code actions |
| `manifests.js` | `custom-elements.json` of the workspace and its dependencies (node only) |
| `styles.js` | class names of the workspace's stylesheets (node only) |

Where the cursor is decides who answers: markup (rat, elements), js (a
`$signal` first, then typescript), css.

The js text keeps scripts as they are and turns every markup expression into a
statement (`{$x}` → `;$x;`), so typescript answers at the offsets of the `.rat`
file without a source map. A `$signal` is a plain variable there, which is what
it is in rat source (`$todos.filter` offers the array methods).

- an `@for` becomes a loop around its body, so its item has its type inside:
  `@for (todo of $todos) { … }` → `for(let todo of $todos){ … }`, written where
  `@for (` and the indentation were (it needs two characters of indentation)
- a `.rat` answers as `name.rat.js`, which is where typescript looks for an
  import of `./name.rat`; a closed `.rat` is analyzed from the disk. the js text
  ends with a default export, so `import Card from './card.rat'` resolves
- a component tag is a statement of its name: hover and definition on `<Card>`
  go to the import

Not known yet: the types of props and the index of an `@for`. That needs the
compiler output with a source map.

## run

```sh
npm install
npm link                       # rat-language-server on the path
rat-language-server --stdio
```

| file | starts the server |
|---|---|
| `node.js` | in node, over stdio (`--stdio`) or node ipc; the `bin` |
| `worker.js` | in a web worker, over `postMessage`, for monaco or codemirror in the browser |
| `index.js` | `start(connection)`, the server itself, independent of the transport |

## editors

| editor | how |
|---|---|
| VS Code | [`packages/vscode`](../vscode) |
| Zed | the extension in [`packages/syntax/zed`](../syntax/zed) starts it |
| Neovim 0.11 | `vim.lsp.config('rat', { cmd = { 'rat-language-server', '--stdio' }, filetypes = { 'rat', 'ratjs' } })`, `vim.lsp.enable('rat')` |
| Helix | `[language-server.rat] command = "rat-language-server", args = ["--stdio"]` in `languages.toml` |
