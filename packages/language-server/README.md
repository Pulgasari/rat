# @rat/language-server

A language server (LSP) for `.rat` and `.rat.js`. Background and the plan for
the next stages: [lsp/rat.md](https://github.com/pulgasari/pulgasari.github.io/blob/main/md/webdev/lsp/rat.md).

| stage | features | status |
|---|---|---|
| 1 | diagnostics: every change is compiled with `@rat/compiler`, a `CompileError` becomes a diagnostic | built |
| 2 | structure: symbols, folding, semantic tokens for `$signals`, rat snippets | planned |
| 3 | javascript in holes and scripts through typescript and a source map from the compiler | planned |
| 4 | css in `<style>`, elements from `custom-elements.json` (shared with `@htx/analyzer`) | planned |

The compiler stops at its first error, so there is one diagnostic at a time
until the parser learns to recover.

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
