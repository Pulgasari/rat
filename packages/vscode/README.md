# rat for VS Code

Highlighting for `.rat` and `.rat.js` (the TextMate grammars of
[`@rat/syntax`](../syntax)) and the language server
[`@rat/language-server`](../language-server).

```sh
npm install          # copies the grammars into syntaxes/, links the language server
npx vsce package     # rat-vscode-0.0.1.vsix, install with "Extensions: Install from VSIX…"
```

During development: open this folder in VS Code and start "Run Extension" (F5).
