// @rat/language-server :: worker
// the same server in a web worker, for editors in the browser (monaco with
// monaco-languageclient, codemirror with @codemirror/lsp-client): the playground,
// zugriff. messages travel by postMessage instead of stdio.

import server from 'vscode-languageserver/browser';

import { start } from './index.js';

const { BrowserMessageReader, BrowserMessageWriter, createConnection } = server;

start(createConnection(new BrowserMessageReader(self), new BrowserMessageWriter(self)));
