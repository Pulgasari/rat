// @rat/language-server

/*
the language server for .rat and .rat.js, independent of where it runs: node.js
starts it over stdio, worker.js in a web worker. both hand over an lsp
connection from vscode-languageserver.

stage 1 (see pulgasari.github.io/md/webdev/lsp/rat.md): diagnostics. every
change compiles the document with @rat/compiler; a CompileError becomes one
diagnostic at its offset. the compiler stops at the first error, so one is all
there is until the parser learns to recover.
*/

import { TextDocument } from 'vscode-languageserver-textdocument';

import { compileAsync } from '@rat/compiler';

const DELAY = 150;   // ms after the last keystroke before compiling

const SEVERITY_ERROR = 1;
const SYNC_INCREMENTAL = 2;

// file:///app/todo-list.rat -> todo-list.rat: the compiler tells .rat from .rat.js by it
const filenameOf = uri => decodeURIComponent(uri.split('/').pop());

// a compile error marks the word it points at, at least one character
function rangeOf (document, index) {
  const text = document.getText();
  let end = index;
  while (end < text.length && /[\w$@:.#-]/.test(text[end])) end++;
  return { end: document.positionAt(Math.max(end, index + 1)), start: document.positionAt(index) };
}

function start (connection) {
  const documents = new Map;   // uri -> TextDocument
  const timers    = new Map;   // uri -> pending validation

  connection.onInitialize(() => ({
    capabilities : { textDocumentSync: { change: SYNC_INCREMENTAL, openClose: true } },
    serverInfo   : { name: 'rat-language-server', version: '0.0.1' },
  }));

  async function validate (uri) {
    const document = documents.get(uri);
    if (!document) return;

    const diagnostics = [];
    try {
      await compileAsync(document.getText(), { filename: filenameOf(uri) });
    } catch (error) {
      // anything but a CompileError is a bug in the compiler, not in the file
      if (typeof error?.index !== 'number') { connection.console.error(`[rat] ${error?.stack ?? error}`); return; }
      diagnostics.push({ message: error.reason ?? error.message, range: rangeOf(document, error.index), severity: SEVERITY_ERROR, source: 'rat' });
    }

    // the document may have changed while compiling; its own run will report
    if (documents.get(uri) !== document) return;
    connection.sendDiagnostics({ diagnostics, uri, version: document.version });
  }

  const schedule = uri => {
    clearTimeout(timers.get(uri));
    timers.set(uri, setTimeout(() => { timers.delete(uri); validate(uri); }, DELAY));
  };

  connection.onDidOpenTextDocument(({ textDocument: { languageId, text, uri, version } }) => {
    documents.set(uri, TextDocument.create(uri, languageId, version, text));
    validate(uri);
  });

  connection.onDidChangeTextDocument(({ contentChanges, textDocument: { uri, version } }) => {
    const document = documents.get(uri);
    if (!document) return;
    documents.set(uri, TextDocument.update(document, contentChanges, version));
    schedule(uri);
  });

  connection.onDidCloseTextDocument(({ textDocument: { uri } }) => {
    clearTimeout(timers.get(uri));
    timers.delete(uri);
    documents.delete(uri);
    connection.sendDiagnostics({ diagnostics: [], uri });
  });

  connection.listen();
}

export { start };
export default start;
