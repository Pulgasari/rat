// code :: modules/lsp.js

/*
rat's language server (@rat/language-server, dist/worker.js) in a web worker, its answers as monaco's
providers. no monaco-languageclient: a few dozen lines of json-rpc, the features rat's server has.

  attach(monaco)          the worker started, the providers registered for rat and ratjs, once
  open(model, key, name, text)   the document on screen, kept open on the server under key
  change(model)                  what is typed
  forget(key)                    a document closed in the app

what the server answers is in the markup and css of a file. javascript (scripts, holes, .rat.js) goes
to monaco's own typescript: rat/javascript gives the js text of the document, with every offset of the
source, so a position in it is the same position in the file. a failure costs the help, never the
editor.
*/

const WORKER    = new URL('../../../../packages/language-server/dist/worker.js', import.meta.url);
const LANGUAGES = ['rat', 'ratjs'];

let monaco  = null;
let worker  = null;
let next    = 0;      // the id of a request
let opened  = 0;      // the documents opened, a uri of its own each
let current = null;   // { diagnostics, entry, model, uri }
let legend  = null;

const pending = new Map;   // id -> { done, fail }

// :::::: JSON-RPC

function request (method, params) {
  if (!worker) return Promise.resolve(null);
  const id = ++next;
  worker.postMessage({ id, jsonrpc: '2.0', method, params });
  return new Promise((done, fail) => pending.set(id, { done, fail }));
}

const notify = (method, params) => worker?.postMessage({ jsonrpc: '2.0', method, params });

function receive ({ data: message }) {
  if (message.id != null && pending.has(message.id)) {
    const { done, fail } = pending.get(message.id);
    pending.delete(message.id);
    return message.error ? fail(new Error(message.error.message)) : done(message.result);
  }
  if (message.id != null && message.method) return worker.postMessage({ id: message.id, jsonrpc: '2.0', result: null });   // the server asks (configuration …): nothing
  if (message.method === 'textDocument/publishDiagnostics') return diagnose(message.params);
  if (message.method === 'window/logMessage') console.debug('[rat lsp]', message.params.message);
}

// :::::: POSITIONS, lsp counts from 0, monaco from 1

const position = ({ column, lineNumber }) => ({ character: column - 1, line: lineNumber - 1 });
const range    = ({ end, start }) => ({ endColumn: end.character + 1, endLineNumber: end.line + 1, startColumn: start.character + 1, startLineNumber: start.line + 1 });
const markdown = contents => [contents].flat().filter(Boolean).map(part => ({ value: typeof part === 'string' ? part : part.language ? `\`\`\`${part.language}\n${part.value}\n\`\`\`` : part.value }));

// the request of a model on screen, null for any other
const ask = (model, method, params = {}) => current?.model === model ? request(method, { textDocument: { uri: current.uri }, ...params }).catch(() => null) : Promise.resolve(null);

// edits of a workspace edit for the document on screen
function editsOf (edit) {
  const changes = edit?.changes?.[current?.uri] ?? edit?.documentChanges?.find(change => change.textDocument?.uri === current?.uri)?.edits ?? [];
  return changes.map(change => ({ resource: current.model.uri, textEdit: { range: range(change.range), text: change.newText }, versionId: undefined }));
}

// :::::: DIAGNOSTICS

function diagnose ({ diagnostics, uri }) {
  if (uri !== current?.uri) return;
  current.diagnostics = diagnostics;
  monaco.editor.setModelMarkers(current.model, 'rat', diagnostics.map(item => ({
    ...range(item.range),
    message  : item.message,
    severity : item.severity === 1 ? monaco.MarkerSeverity.Error : item.severity === 2 ? monaco.MarkerSeverity.Warning : monaco.MarkerSeverity.Info,
    source   : item.source,
  })));
}

// :::::: JAVASCRIPT, monaco's typescript on the js text of the document

let shadow = null;   // the js text as a model of its own, for the typescript worker

async function javascript (model, at) {
  const answer = await ask(model, 'rat/javascript', { position: position(at) });
  if (answer?.region !== 'js' || !monaco.languages.typescript) return null;
  const uri = monaco.Uri.parse(`${current.uri}.virtual.js`);
  if (shadow?.uri.toString() !== uri.toString()) { shadow?.dispose(); shadow = monaco.editor.createModel(answer.text, 'javascript', uri); }
  else if (shadow.getValue() !== answer.text) shadow.setValue(answer.text);
  const service = await (await monaco.languages.typescript.getJavaScriptWorker())(uri);
  return { file: uri.toString(), offset: model.getOffsetAt(at), service };
}

const TS_KINDS = { alias: 'Module', class: 'Class', const: 'Constant', enum: 'Enum', function: 'Function', getter: 'Property', interface: 'Interface', keyword: 'Keyword', let: 'Variable', 'local function': 'Function', 'local var': 'Variable', method: 'Method', module: 'Module', parameter: 'Variable', property: 'Property', setter: 'Property', string: 'Value', type: 'Interface', var: 'Variable' };

const text = parts => (parts ?? []).map(part => part.text).join('');

async function jsComplete (model, at) {
  const js = await javascript(model, at);
  const info = js && await js.service.getCompletionsAtPosition(js.file, js.offset, {});
  if (!info) return null;
  const word = model.getWordUntilPosition(at);
  const span = { endColumn: word.endColumn, endLineNumber: at.lineNumber, startColumn: word.startColumn, startLineNumber: at.lineNumber };
  return { suggestions: info.entries.map(entry => ({
    insertText : entry.insertText ?? entry.name,
    kind       : monaco.languages.CompletionItemKind[TS_KINDS[entry.kind] ?? 'Text'],
    label      : entry.name,
    range      : span,
    sortText   : entry.sortText,
  })) };
}

async function jsHover (model, at) {
  const js = await javascript(model, at);
  const info = js && await js.service.getQuickInfoAtPosition(js.file, js.offset);
  if (!info) return null;
  const start = model.getPositionAt(info.textSpan.start), end = model.getPositionAt(info.textSpan.start + info.textSpan.length);
  return {
    contents : [{ value: `\`\`\`ts\n${text(info.displayParts)}\n\`\`\`` }, { value: text(info.documentation) }].filter(part => part.value),
    range    : { endColumn: end.column, endLineNumber: end.lineNumber, startColumn: start.column, startLineNumber: start.lineNumber },
  };
}

async function jsSignature (model, at) {
  const js = await javascript(model, at);
  const info = js && await js.service.getSignatureHelpItems(js.file, js.offset, {});
  if (!info) return null;
  return {
    dispose () {},
    value   : {
      activeParameter : info.argumentIndex,
      activeSignature : info.selectedItemIndex,
      signatures      : info.items.map(item => ({
        documentation : text(item.documentation),
        label         : text(item.prefixDisplayParts) + item.parameters.map(parameter => text(parameter.displayParts)).join(text(item.separatorDisplayParts)) + text(item.suffixDisplayParts),
        parameters    : item.parameters.map(parameter => ({ documentation: text(parameter.documentation), label: text(parameter.displayParts) })),
      })),
    },
  };
}

async function jsDefinition (model, at) {
  const js = await javascript(model, at);
  const found = js && await js.service.getDefinitionAtPosition(js.file, js.offset);
  return (found ?? []).filter(item => item.fileName === js.file).map(item => {
    const start = model.getPositionAt(item.textSpan.start), end = model.getPositionAt(item.textSpan.start + item.textSpan.length);
    return { range: { endColumn: end.column, endLineNumber: end.lineNumber, startColumn: start.column, startLineNumber: start.lineNumber }, uri: model.uri };
  });
}

// :::::: PROVIDERS

const kindOf = kind => monaco.languages.CompletionItemKind[['Text', 'Method', 'Function', 'Constructor', 'Field', 'Variable', 'Class', 'Interface', 'Module', 'Property', 'Unit', 'Value', 'Enum', 'Keyword', 'Snippet', 'Color', 'File', 'Reference', 'Folder', 'EnumMember', 'Constant', 'Struct', 'Event', 'Operator', 'TypeParameter'][(kind ?? 1) - 1]];

function suggestion (item, model, at) {
  const word = model.getWordUntilPosition(at);
  const edit = item.textEdit;
  return {
    additionalTextEdits : item.additionalTextEdits?.map(change => ({ range: range(change.range), text: change.newText })),
    detail              : item.detail,
    documentation       : item.documentation && (typeof item.documentation === 'string' ? item.documentation : { value: item.documentation.value }),
    filterText          : item.filterText,
    insertText          : edit?.newText ?? item.insertText ?? item.label,
    insertTextRules     : item.insertTextFormat === 2 ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet : undefined,
    kind                : kindOf(item.kind),
    label               : item.label,
    range               : edit ? range(edit.range ?? edit.insert) : { endColumn: word.endColumn, endLineNumber: at.lineNumber, startColumn: word.startColumn, startLineNumber: at.lineNumber },
    sortText            : item.sortText,
  };
}

// locations in the document on screen, the only one the server knows here
const locations = (found, model) => [found ?? []].flat().filter(item => (item.targetUri ?? item.uri) === current?.uri).map(item => ({ range: range(item.targetSelectionRange ?? item.range), uri: model.uri }));

function symbolsOf (items) {
  return (items ?? []).map(item => ({
    children       : symbolsOf(item.children),
    detail         : item.detail ?? '',
    kind           : (item.kind ?? 1) - 1,
    name           : item.name,
    range          : range(item.range),
    selectionRange : range(item.selectionRange ?? item.range),
    tags           : [],
  }));
}

function register (language) {
  const { languages } = monaco;

  languages.registerCompletionItemProvider(language, {
    triggerCharacters : ['<', '@', ':', '.', '$', '"', "'", '[', ' '],
    async provideCompletionItems (model, at) {
      const answer = await ask(model, 'textDocument/completion', { position: position(at) });
      const items  = Array.isArray(answer) ? answer : answer?.items ?? [];
      if (items.length) return { incomplete: !!answer?.isIncomplete, suggestions: items.map(item => suggestion(item, model, at)) };
      return jsComplete(model, at).catch(() => null);
    },
  });

  languages.registerHoverProvider(language, {
    async provideHover (model, at) {
      const answer = await ask(model, 'textDocument/hover', { position: position(at) });
      if (answer?.contents) return { contents: markdown(answer.contents), range: answer.range && range(answer.range) };
      return jsHover(model, at).catch(() => null);
    },
  });

  languages.registerDefinitionProvider(language, {
    async provideDefinition (model, at) {
      const found = locations(await ask(model, 'textDocument/definition', { position: position(at) }), model);
      return found.length ? found : jsDefinition(model, at).catch(() => []);
    },
  });

  languages.registerSignatureHelpProvider(language, {
    signatureHelpTriggerCharacters : ['(', ','],
    provideSignatureHelp           : (model, at) => jsSignature(model, at).catch(() => null),
  });

  languages.registerReferenceProvider(language, {
    provideReferences : async (model, at, context) => locations(await ask(model, 'textDocument/references', { context: { includeDeclaration: context.includeDeclaration }, position: position(at) }), model),
  });

  languages.registerDocumentHighlightProvider(language, {
    provideDocumentHighlights : async (model, at) => ((await ask(model, 'textDocument/documentHighlight', { position: position(at) })) ?? []).map(item => ({ kind: (item.kind ?? 1) - 1, range: range(item.range) })),
  });

  languages.registerRenameProvider(language, {
    async provideRenameEdits (model, at, newName) {
      return { edits: editsOf(await ask(model, 'textDocument/rename', { newName, position: position(at) })) };
    },
    async resolveRenameLocation (model, at) {
      const answer = await ask(model, 'textDocument/prepareRename', { position: position(at) });
      if (!answer) return { rejectReason: 'nothing to rename here', range: undefined, text: '' };
      const span = range(answer.range ?? answer);
      return { range: span, text: answer.placeholder ?? model.getValueInRange(span) };
    },
  });

  languages.registerDocumentSymbolProvider(language, {
    provideDocumentSymbols : async model => symbolsOf(await ask(model, 'textDocument/documentSymbol')),
  });

  languages.registerFoldingRangeProvider(language, {
    provideFoldingRanges : async model => ((await ask(model, 'textDocument/foldingRange')) ?? []).map(item => ({ end: item.endLine + 1, start: item.startLine + 1 })),
  });

  languages.registerSelectionRangeProvider(language, {
    async provideSelectionRanges (model, positions) {
      const answer = await ask(model, 'textDocument/selectionRange', { positions: positions.map(position) });
      return (answer ?? []).map(item => { const out = []; for (let link = item; link; link = link.parent) out.push({ range: range(link.range) }); return out; });
    },
  });

  languages.registerLinkedEditingRangeProvider(language, {
    async provideLinkedEditingRanges (model, at) {
      const answer = await ask(model, 'textDocument/linkedEditingRange', { position: position(at) });
      return answer && { ranges: answer.ranges.map(range), wordPattern: answer.wordPattern ? new RegExp(answer.wordPattern) : undefined };
    },
  });

  languages.registerCodeActionProvider(language, {
    async provideCodeActions (model, span) {
      const lsp   = { end: { character: span.endColumn - 1, line: span.endLineNumber - 1 }, start: { character: span.startColumn - 1, line: span.startLineNumber - 1 } };
      const hits  = (current?.diagnostics ?? []).filter(item => item.range.start.line <= lsp.end.line && item.range.end.line >= lsp.start.line);
      const found = await ask(model, 'textDocument/codeAction', { context: { diagnostics: hits }, range: lsp });
      return { actions: (found ?? []).filter(action => action.edit).map(action => ({ edit: { edits: editsOf(action.edit) }, isPreferred: action.isPreferred, kind: action.kind, title: action.title })), dispose () {} };
    },
  });

  languages.registerColorProvider(language, {
    provideColorPresentations : async (model, { color, range: span }) => ((await ask(model, 'textDocument/colorPresentation', { color, range: { end: { character: span.endColumn - 1, line: span.endLineNumber - 1 }, start: { character: span.startColumn - 1, line: span.startLineNumber - 1 } } })) ?? []).map(item => ({ label: item.label, textEdit: item.textEdit && { range: range(item.textEdit.range), text: item.textEdit.newText } })),
    provideDocumentColors     : async model => ((await ask(model, 'textDocument/documentColor')) ?? []).map(item => ({ color: item.color, range: range(item.range) })),
  });

  if (legend) languages.registerDocumentSemanticTokensProvider(language, {
    getLegend                     : () => legend,
    provideDocumentSemanticTokens : async model => { const answer = await ask(model, 'textDocument/semanticTokens/full'); return answer && { data: new Uint32Array(answer.data), resultId: answer.resultId }; },
    releaseDocumentSemanticTokens () {},
  });
}

// :::::: API

let attached = null;

export function attach (namespace) {
  return attached ??= (async () => {
    monaco = namespace;
    try {
      worker = new Worker(WORKER, { name: 'rat-language-server', type: 'module' });
      worker.onmessage = receive;
      worker.onerror   = event => { console.warn('[code] the rat language server stopped', event.message); worker = null; };
      const { capabilities } = await request('initialize', {
        capabilities : { textDocument: { completion: { completionItem: { snippetSupport: true } }, hover: { contentFormat: ['markdown', 'plaintext'] }, publishDiagnostics: {} } },
        processId    : null,
        rootUri      : null,
      });
      notify('initialized', {});
      legend = capabilities?.semanticTokensProvider?.legend ?? null;
      for (const language of LANGUAGES) register(language);
      return true;
    }
    catch (error) {
      console.warn('[code] rat language server unavailable', error);
      worker?.terminate();
      worker = null;
      return false;
    }
  })();
}

// the document on screen. every document stays open on the server until forget(), so what one names
// (its components) is known in the others; diagnostics show for the one on screen
const known = new Map;   // key -> { uri, version }

export function open (model, key, name, text) {
  if (current) monaco.editor.setModelMarkers(current.model, 'rat', []);
  current = null;
  if (!worker || !LANGUAGES.includes(model.getLanguageId())) return;
  let entry = known.get(key);
  if (!entry) {
    entry = { uri: `file:///code/${++opened}/${encodeURIComponent(name)}`, version: 1 };
    known.set(key, entry);
    notify('textDocument/didOpen', { textDocument: { languageId: model.getLanguageId(), text, uri: entry.uri, version: 1 } });
  }
  else notify('textDocument/didChange', { contentChanges: [{ text }], textDocument: { uri: entry.uri, version: ++entry.version } });   // its diagnostics come again
  current = { diagnostics: [], entry, model, uri: entry.uri };
}

// what is typed: the whole text, the server takes a change without a range as all of it
export function change (model) {
  if (current?.model !== model) return;
  notify('textDocument/didChange', { contentChanges: [{ text: model.getValue() }], textDocument: { uri: current.uri, version: ++current.entry.version } });
}

// a document closed in the app
export function forget (key) {
  const entry = known.get(key);
  if (!entry) return;
  known.delete(key);
  notify('textDocument/didClose', { textDocument: { uri: entry.uri } });
  if (current?.entry === entry) { monaco.editor.setModelMarkers(current.model, 'rat', []); current = null; }
}
