// @rat/language-server

/*
the language server for .rat and .rat.js, independent of where it runs: node.js
starts it over stdio, worker.js in a web worker. both hand over an lsp
connection from vscode-languageserver and what their platform can offer:

  platform.manifests (root)               custom-elements.json files of the workspace
  platform.javascript (root, documents)   typescript for scripts and holes

where an offset is decides who answers (document.js, regionAt):

  markup   rat syntax (rat.js) and elements (elements.js, @htx/analyzer)
  js       typescript (js.js); a $signal answers from rat.js first
  css      vscode-css-languageservice (css.js)

see pulgasari.github.io/md/webdev/lsp/rat.md for the stages.
*/

import { TextDocument } from 'vscode-languageserver-textdocument';

import { compileAsync } from '@rat/compiler';

import { css }                             from './css.js';
import { analyze, occurrenceAt, regionAt } from './document.js';
import { createElements }                  from './elements.js';
import * as rat                            from './rat.js';

const DELAY    = 150;   // ms after the last keystroke before validating
const SEVERITY = { error: 1, warning: 2 };

const pathOf = uri => decodeURIComponent(uri.replace(/^file:\/\//, ''));

// a compile error marks the word it points at, at least one character
function rangeOf (document, index) {
  const text = document.getText();
  let end = index;
  while (end < text.length && /[\w$@:.#-]/.test(text[end])) end++;
  return { end: document.positionAt(Math.max(end, index + 1)), start: document.positionAt(index) };
}

function start (connection, platform = {}) {
  const documents = new Map;   // uri -> TextDocument
  const models    = new Map;   // uri -> { model, version }
  const timers    = new Map;   // uri -> pending validation

  let elements   = createElements(() => []);
  let javascript = null;

  // one analysis per version, made on demand
  function modelOf (uri) {
    const document = documents.get(uri);
    if (!document) return null;
    const cached = models.get(uri);
    if (cached?.version === document.version) return cached.model;
    const model = analyze(document.getText(), uri);
    models.set(uri, { model, version: document.version });
    return model;
  }

  // a feature handler: document, model and offset, errors logged instead of thrown
  const handle = fn => params => {
    const document = documents.get(params.textDocument.uri);
    const model    = document && modelOf(document.uri);
    if (!model) return null;
    try { return fn({ document, model, offset: params.position ? document.offsetAt(params.position) : 0, params, uri: document.uri }) ?? null; }
    catch (error) { connection.console.error(`[rat] ${error?.stack ?? error}`); return null; }
  };

  connection.onInitialize(params => {
    const rootUri = params.workspaceFolders?.[0]?.uri ?? params.rootUri ?? null;
    const root    = rootUri ? pathOf(rootUri) : null;

    if (root && platform.manifests) elements = createElements(() => platform.manifests(root));
    if (root && platform.javascript) {
      try { javascript = platform.javascript(root, () => new Map([...documents.keys()].map(uri => [uri, { model: modelOf(uri), version: documents.get(uri).version }]))); }
      catch (error) { connection.console.error(`[rat] typescript is not available: ${error.message}`); }
    }

    return {
      capabilities: {
        colorProvider              : true,
        completionProvider         : { resolveProvider: true, triggerCharacters: ['<', '@', ':', '.', '$', '"', "'", '[', ' '] },
        definitionProvider         : true,
        documentHighlightProvider  : true,
        documentSymbolProvider     : true,
        foldingRangeProvider       : true,
        hoverProvider              : true,
        linkedEditingRangeProvider : true,
        referencesProvider         : true,
        renameProvider             : { prepareProvider: true },
        selectionRangeProvider     : true,
        semanticTokensProvider     : { full: true, legend: { tokenModifiers: rat.TOKEN_MODIFIERS, tokenTypes: rat.TOKEN_TYPES } },
        signatureHelpProvider      : { triggerCharacters: ['(', ','] },
        textDocumentSync           : { change: 2, openClose: true },
      },
      serverInfo: { name: 'rat-language-server', version: '0.1.0' },
    };
  });

  // :::::: DIAGNOSTICS

  async function validate (uri) {
    const document = documents.get(uri);
    const model    = document && modelOf(uri);
    if (!model) return;

    const diagnostics = [
      ...model.errors.map(error => ({ message: error.reason, range: rangeOf(document, error.index), severity: SEVERITY.error, source: 'rat' })),
      ...model.warnings.map(error => ({ message: error.reason, range: rangeOf(document, error.index), severity: SEVERITY.warning, source: 'rat' })),
    ];

    for (const item of model.unknown) diagnostics.push({ message: `${item.name} is not declared: let ${item.name} = … in <script>`, range: { end: document.positionAt(item.end), start: document.positionAt(item.start) }, severity: SEVERITY.warning, source: 'rat' });

    try { diagnostics.push(...elements.diagnostics(model, document)); } catch (error) { connection.console.error(`[rat] ${error.stack}`); }
    try { diagnostics.push(...css.diagnostics(model, uri)); } catch (error) { connection.console.error(`[rat] ${error.stack}`); }

    // the markup parses: the compiler finds what is left, in scripts and expressions
    if (!model.errors.length) {
      try {
        await compileAsync(document.getText(), { filename: model.filename });
      } catch (error) {
        if (typeof error?.index !== 'number') connection.console.error(`[rat] ${error?.stack ?? error}`);
        else diagnostics.push({ message: error.reason ?? error.message, range: rangeOf(document, error.index), severity: SEVERITY.error, source: 'rat' });
      }
    }

    // the document may have changed meanwhile; its own run reports
    if (documents.get(uri) !== document) return;
    connection.sendDiagnostics({ diagnostics, uri, version: document.version });
  }

  const schedule = uri => {
    clearTimeout(timers.get(uri));
    timers.set(uri, setTimeout(() => { timers.delete(uri); validate(uri); }, DELAY));
  };

  // :::::: DOCUMENTS

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
    models.delete(uri);
    connection.sendDiagnostics({ diagnostics: [], uri });
  });

  // :::::: FEATURES

  connection.onCompletion(handle(({ document, model, offset, params, uri }) => {
    const region = regionAt(model, offset);
    if (region === 'css') return css.complete(model, uri, params.position);
    if (region === 'js')  return javascript?.complete(uri, document, offset);
    const where = elements.where(model, offset);
    const items = [...(rat.complete(model, document, offset, where) ?? []), ...(elements.complete(model, document, offset) ?? [])];
    return items.length ? items : null;
  }));

  connection.onCompletionResolve(item => {
    try { return item.data?.uri && javascript ? javascript.resolve(item) : item; }
    catch (error) { connection.console.error(`[rat] ${error.stack}`); return item; }
  });

  connection.onHover(handle(({ document, model, offset, params, uri }) => {
    if (occurrenceAt(model, offset)) return rat.signalHover(model, document, offset);
    const region = regionAt(model, offset);
    if (region === 'css') return css.hover(model, uri, params.position);
    if (region === 'js')  return javascript?.hover(uri, document, offset);
    return elements.hover(model, document, offset);
  }));

  connection.onDefinition(handle(({ document, model, offset, uri }) => {
    if (occurrenceAt(model, offset)) return rat.signalDefinition(model, document, offset);
    const region = regionAt(model, offset);
    if (region === 'js') return javascript?.definition(uri, offset);
    if (region === 'markup') return elements.definition(model, document, offset);
    return null;
  }));

  connection.onSignatureHelp(handle(({ model, offset, uri }) => regionAt(model, offset) === 'js' ? javascript?.signatureHelp(uri, offset) : null));

  connection.onReferences(handle(({ document, model, offset, params }) => rat.signalReferences(model, document, offset, params.context?.includeDeclaration !== false)));
  connection.onDocumentHighlight(handle(({ document, model, offset }) => rat.signalHighlights(model, document, offset)));
  connection.onPrepareRename(handle(({ document, model, offset }) => rat.prepareRename(model, document, offset)));
  connection.onRenameRequest(handle(({ document, model, offset, params }) => rat.rename(model, document, offset, params.newName)));

  connection.onDocumentSymbol(handle(({ document, model }) => rat.symbols(model, document)));
  connection.onFoldingRanges(handle(({ document, model }) => rat.folding(model, document)));
  connection.onSelectionRanges(handle(({ document, model, params }) => params.positions.map(position => rat.selection(model, document, document.offsetAt(position)))));
  connection.languages.onLinkedEditingRange(handle(({ document, model, offset }) => rat.linkedEditing(model, document, offset)));
  connection.languages.semanticTokens.on(handle(({ document, model }) => rat.semanticTokens(model, document)));

  connection.onDocumentColor(handle(({ model, uri }) => css.colors(model, uri)));
  connection.onColorPresentation(handle(({ model, params, uri }) => css.presentations(model, uri, params.color, params.range)));

  connection.listen();
}

export { start };
export default start;
