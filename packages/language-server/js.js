// @rat/language-server :: js

/*
javascript in scripts and holes through typescript's language service (stage
3, first form). typescript reads the javascript text of each open document
(document.js): scripts as they are, markup expressions as statements, every
offset the same as in the .rat file. so completion, hover, definition and
signature help need no mapping. a $signal is a plain variable here, which is
what it is in rat source: $todos.filter offers the array methods.

a .rat answers under its name plus .js (counter.rat -> counter.rat.js), which
is also where typescript looks for an import of './counter.rat': a closed .rat
is analyzed from the disk when something imports it. the item of an @for is in
scope inside its body (document.js turns the block into a loop).

what this form does not know yet: the types of props and of the index of an
@for. the full form maps the compiler output with a source map (see lsp/rat.md).

typescript only runs where there is a file system, so node, not the worker.
*/

import ts from 'typescript';

import { analyze } from './document.js';

const KINDS = {
  [ts.ScriptElementKind.alias]                 : 9,
  [ts.ScriptElementKind.classElement]          : 7,
  [ts.ScriptElementKind.constElement]          : 21,
  [ts.ScriptElementKind.enumElement]           : 13,
  [ts.ScriptElementKind.functionElement]       : 3,
  [ts.ScriptElementKind.interfaceElement]      : 8,
  [ts.ScriptElementKind.keyword]               : 14,
  [ts.ScriptElementKind.letElement]            : 6,
  [ts.ScriptElementKind.localFunctionElement]  : 3,
  [ts.ScriptElementKind.localVariableElement]  : 6,
  [ts.ScriptElementKind.memberFunctionElement] : 2,
  [ts.ScriptElementKind.memberGetAccessorElement] : 10,
  [ts.ScriptElementKind.memberSetAccessorElement] : 10,
  [ts.ScriptElementKind.memberVariableElement] : 10,
  [ts.ScriptElementKind.moduleElement]         : 9,
  [ts.ScriptElementKind.parameterElement]      : 6,
  [ts.ScriptElementKind.string]                : 12,
  [ts.ScriptElementKind.variableElement]       : 6,
};

const pathOf = uri => decodeURIComponent(uri.replace(/^file:\/\//, ''));
const text   = parts => (parts ?? []).map(part => part.text).join('');

// documents: () => Map(uri -> { model, version })
function createJavaScript (root, documents) {
  // a .rat answers as .rat.js, a .rat.js under its own name
  const nameOf = uri => uri.endsWith('.rat.js') ? pathOf(uri) : `${pathOf(uri)}.js`;

  const open = () => {
    const out = new Map;
    for (const [uri, entry] of documents()) out.set(nameOf(uri), { ...entry, uri });
    return out;
  };

  // x.rat.js stands for x.rat when there is a x.rat and no real x.rat.js
  const ratFile = name => name.endsWith('.rat.js') && !ts.sys.fileExists(name) && ts.sys.fileExists(name.slice(0, -3)) ? name.slice(0, -3) : null;
  const uriOf   = name => {
    const entry = open().get(name);
    if (entry) return entry.uri;
    const rat = ratFile(name);
    return `file://${rat ?? name}`;
  };

  // closed .rat files someone imports, analyzed from the disk, per modification time
  const closed = new Map;   // path -> { time, js }
  function closedText (name) {
    const rat = ratFile(name);
    if (!rat) return null;
    const time   = ts.sys.getModifiedTime?.(rat)?.getTime() ?? 0;
    const cached = closed.get(rat);
    if (cached?.time === time) return cached;
    const text  = ts.sys.readFile(rat);
    const entry = { js: analyze(text, `file://${rat}`).js, length: text.length, time };
    closed.set(rat, entry);
    return entry;
  }

  function options () {
    const base = { allowJs: true, checkJs: false, lib: ['lib.esnext.d.ts', 'lib.dom.d.ts'], maxNodeModuleJsDepth: 2, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler, noEmit: true, target: ts.ScriptTarget.ESNext };
    const file = ts.findConfigFile(root, ts.sys.fileExists, 'jsconfig.json') ?? ts.findConfigFile(root, ts.sys.fileExists, 'tsconfig.json');
    if (!file) return base;
    const { config } = ts.readConfigFile(file, ts.sys.readFile);
    const parsed = ts.parseJsonConfigFileContent(config ?? {}, ts.sys, root);
    return { ...base, ...parsed.options, allowJs: true, checkJs: false, noEmit: true };
  }

  const settings = options();

  const host = {
    directoryExists        : ts.sys.directoryExists,
    fileExists             : name => open().has(name) || ts.sys.fileExists(name) || !!ratFile(name),
    getCompilationSettings : () => settings,
    getCurrentDirectory    : () => root,
    getDefaultLibFileName  : value => ts.getDefaultLibFilePath(value),
    getDirectories         : ts.sys.getDirectories,
    getScriptFileNames     : () => [...open().keys()],
    getScriptSnapshot      : name => {
      const entry = open().get(name);
      if (entry) return ts.ScriptSnapshot.fromString(entry.model.js);
      const rat = closedText(name);
      if (rat) return ts.ScriptSnapshot.fromString(rat.js);
      return ts.sys.fileExists(name) ? ts.ScriptSnapshot.fromString(ts.sys.readFile(name)) : undefined;
    },
    getScriptVersion       : name => {
      const entry = open().get(name);
      if (entry) return `rat:${entry.version}`;
      const rat = ratFile(name);
      return String(ts.sys.getModifiedTime?.(rat ?? name)?.getTime() ?? 0);
    },
    readDirectory          : ts.sys.readDirectory,
    readFile               : name => open().get(name)?.model.js ?? closedText(name)?.js ?? ts.sys.readFile(name),
    realpath               : ts.sys.realpath,
  };

  const service = ts.createLanguageService(host, ts.createDocumentRegistry());

  // a location in typescript's terms -> lsp
  function locationOf (fileName, span) {
    const program = service.getProgram();
    const source  = program?.getSourceFile(fileName);
    if (!source) return null;
    // what document.js appended to a .rat (its default export) has no place in the file: its start then
    const length = open().get(fileName)?.model.text.length ?? closedText(fileName)?.length ?? Infinity;
    if (span.start >= length) return { range: { end: { character: 0, line: 0 }, start: { character: 0, line: 0 } }, uri: uriOf(fileName) };
    const start = source.getLineAndCharacterOfPosition(span.start);
    const end   = source.getLineAndCharacterOfPosition(span.start + span.length);
    return { range: { end: { character: end.character, line: end.line }, start: { character: start.character, line: start.line } }, uri: uriOf(fileName) };
  }

  return {
    complete (uri, document, offset) {
      const name   = nameOf(uri);
      const result = service.getCompletionsAtPosition(name, offset, { includeCompletionsWithInsertText: true });
      if (!result) return null;
      return result.entries.map(entry => ({
        data       : { name: entry.name, offset, source: entry.source, uri, value: entry.data },
        filterText : entry.filterText,
        kind       : KINDS[entry.kind] ?? 6,
        label      : entry.name,
        sortText   : entry.sortText,
        ...(entry.replacementSpan
          ? { textEdit: { newText: entry.insertText ?? entry.name, range: { end: document.positionAt(entry.replacementSpan.start + entry.replacementSpan.length), start: document.positionAt(entry.replacementSpan.start) } } }
          : { insertText: entry.insertText ?? entry.name }),
      }));
    },

    resolve (item) {
      const { name, offset, source, uri, value } = item.data ?? {};
      if (!uri) return item;
      const details = service.getCompletionEntryDetails(nameOf(uri), offset, name, {}, source, {}, value);
      if (!details) return item;
      return { ...item, detail: text(details.displayParts), documentation: { kind: 'markdown', value: text(details.documentation) } };
    },

    hover (uri, document, offset) {
      const info = service.getQuickInfoAtPosition(nameOf(uri), offset);
      if (!info) return null;
      const docs = text(info.documentation);
      const tags = (info.tags ?? []).map(tag => `*@${tag.name}* ${text(tag.text)}`).join('\n\n');
      return {
        contents : { kind: 'markdown', value: ['```ts\n' + text(info.displayParts) + '\n```', docs, tags].filter(Boolean).join('\n\n') },
        range    : { end: document.positionAt(info.textSpan.start + info.textSpan.length), start: document.positionAt(info.textSpan.start) },
      };
    },

    definition (uri, offset) {
      const found = service.getDefinitionAtPosition(nameOf(uri), offset);
      return (found ?? []).map(item => locationOf(item.fileName, item.textSpan)).filter(Boolean);
    },

    signatureHelp (uri, offset) {
      const help = service.getSignatureHelpItems(nameOf(uri), offset, {});
      if (!help) return null;
      return {
        activeParameter : help.argumentIndex,
        activeSignature : help.selectedItemIndex,
        signatures      : help.items.map(item => ({
          documentation : text(item.documentation),
          label         : text(item.prefixDisplayParts) + item.parameters.map(parameter => text(parameter.displayParts)).join(text(item.separatorDisplayParts)) + text(item.suffixDisplayParts),
          parameters    : item.parameters.map(parameter => ({ documentation: text(parameter.documentation), label: text(parameter.displayParts) })),
        })),
      };
    },
  };
}

export { createJavaScript };
