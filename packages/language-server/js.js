// @rat/language-server :: js

/*
javascript in scripts and holes through typescript's language service (stage
3, first form). typescript reads the javascript text of each open document
(document.js): scripts as they are, markup expressions as statements, every
offset the same as in the .rat file. so completion, hover, definition and
signature help need no mapping. a $signal is a plain variable here, which is
what it is in rat source: $todos.filter offers the array methods.

what this form does not know yet: the item of an @for (it is any), props of
components, imports of .rat files. the full form maps the compiler output
with a source map (see lsp/rat.md).

typescript only runs where there is a file system, so node, not the worker.
*/

import ts from 'typescript';

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
  // a .rat answers under a .js name next to it, a .rat.js under its own
  const nameOf = uri => uri.endsWith('.rat.js') ? pathOf(uri) : `${pathOf(uri)}.virtual.js`;
  const uriOf  = name => name.endsWith('.rat.virtual.js') ? `file://${name.slice(0, -'.virtual.js'.length)}` : `file://${name}`;

  const open = () => {
    const out = new Map;
    for (const [uri, entry] of documents()) out.set(nameOf(uri), { ...entry, uri });
    return out;
  };

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
    fileExists             : name => open().has(name) || ts.sys.fileExists(name),
    getCompilationSettings : () => settings,
    getCurrentDirectory    : () => root,
    getDefaultLibFileName  : value => ts.getDefaultLibFilePath(value),
    getDirectories         : ts.sys.getDirectories,
    getScriptFileNames     : () => [...open().keys()],
    getScriptSnapshot      : name => {
      const entry = open().get(name);
      if (entry) return ts.ScriptSnapshot.fromString(entry.model.js);
      return ts.sys.fileExists(name) ? ts.ScriptSnapshot.fromString(ts.sys.readFile(name)) : undefined;
    },
    getScriptVersion       : name => {
      const entry = open().get(name);
      return entry ? `rat:${entry.version}` : String(ts.sys.getModifiedTime?.(name)?.getTime() ?? 0);
    },
    readDirectory          : ts.sys.readDirectory,
    readFile               : name => open().get(name)?.model.js ?? ts.sys.readFile(name),
    realpath               : ts.sys.realpath,
  };

  const service = ts.createLanguageService(host, ts.createDocumentRegistry());

  // a location in typescript's terms -> lsp
  function locationOf (fileName, span) {
    const program = service.getProgram();
    const source  = program?.getSourceFile(fileName);
    if (!source) return null;
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
