// @rat/language-server :: rat

/*
the features that come from the rat ast alone (stage 2): symbols, folding,
selection ranges, linked editing of tag names, semantic tokens, and hover,
definition, references, highlights and rename for $signals. plus the
completion of rat syntax in the markup: blocks, on:, bind:, behaviors.
every function takes the analysis (document.js) and the TextDocument.
*/

import { nodesOf, occurrenceAt } from './document.js';

// lsp enums, as numbers
const SYMBOL     = { Class: 5, Constant: 14, Field: 8, Function: 12, Module: 2, Struct: 23, Variable: 13 };
const COMPLETION = { Event: 23, Function: 3, Keyword: 14, Property: 10, Snippet: 15, Value: 12 };
const HIGHLIGHT  = { Read: 2, Write: 3 };
const SNIPPET    = 2;

const TOKEN_TYPES     = ['variable'];
const TOKEN_MODIFIERS = ['declaration', 'readonly', 'reactive'];

const range = (document, start, end) => ({ end: document.positionAt(end), start: document.positionAt(start) });

// :::::: SYMBOLS

const elementName = node => node.component ? node.tag : node.tag + (node.id ? `#${node.id}` : '') + node.classes.map(name => `.${name}`).join('');

function markupSymbols (document, children) {
  const out = [];
  for (const node of children ?? []) {
    if (node.type === 'Element') {
      out.push({
        children       : markupSymbols(document, node.children),
        kind           : node.component ? SYMBOL.Class : SYMBOL.Field,
        name           : elementName(node),
        range          : range(document, node.start, node.end),
        selectionRange : range(document, node.name.start, node.name.end),
      });
    }
    if (node.type === 'If' || node.type === 'For' || node.type === 'Switch') {
      const keyword = `@${node.type.toLowerCase()}`;
      const head    = node.type === 'If' ? node.branches[0].test.code : node.type === 'For' ? node.head?.code : node.subject.code;
      const inner   = node.type === 'If' ? [...node.branches.flatMap(branch => branch.children), ...(node.fallback ?? [])]
                    : node.type === 'For' ? [...node.children, ...(node.fallback ?? [])]
                    : [...node.cases.flatMap(branch => branch.children), ...(node.fallback ?? [])];
      out.push({
        children       : markupSymbols(document, inner),
        kind           : SYMBOL.Struct,
        name           : `${keyword} (${head ?? ''})`,
        range          : range(document, node.start, node.end),
        selectionRange : range(document, node.start, node.start + keyword.length),
      });
    }
  }
  return out;
}

function signalSymbols (model, document) {
  return model.signals.map(signal => ({
    detail         : signal.kind,
    kind           : signal.kind === 'computed' ? SYMBOL.Constant : SYMBOL.Variable,
    name           : signal.name,
    range          : range(document, signal.statement, signal.end),
    selectionRange : range(document, signal.start, signal.end),
  }));
}

function symbols (model, document) {
  if (model.kind === 'ratjs') {
    return [
      ...signalSymbols(model, document),
      ...model.templates.map(template => ({ children: markupSymbols(document, template.ast.children), kind: SYMBOL.Module, name: 'html`…`', range: range(document, template.tag.start, template.end + 1), selectionRange: range(document, template.tag.start, template.tag.end) })),
    ];
  }

  const out = [];
  for (const segment of model.segments) {
    if (segment.kind !== 'script' && segment.kind !== 'module') continue;
    const inside = signalSymbols(model, document).filter((_, index) => model.signals[index].start >= segment.start && model.signals[index].end <= segment.end);
    out.push({ children: inside, kind: SYMBOL.Module, name: segment.kind === 'module' ? '<script module>' : '<script>', range: range(document, segment.range.start, segment.range.end), selectionRange: range(document, segment.range.start, segment.range.start + 7) });
  }
  out.push(...markupSymbols(document, model.ast.children));
  for (const style of model.styles) out.push({ children: [], kind: SYMBOL.Module, name: '<style>', range: range(document, style.range.start, style.range.end), selectionRange: range(document, style.range.start, style.range.start + 6) });
  return out.sort((a, b) => a.range.start.line - b.range.start.line || a.range.start.character - b.range.start.character);
}

// :::::: FOLDING

function folding (model, document) {
  const out = [];
  const add = (start, end, kind) => {
    const from = document.positionAt(start).line;
    const to   = document.positionAt(end).line - 1;
    if (to > from) out.push({ endLine: to, kind, startLine: from });
  };

  const trees = model.kind === 'rat' ? [model.ast.children] : model.templates.map(template => template.ast.children);
  for (const tree of trees) for (const node of nodesOf(tree)) if (node.end !== undefined && node.type !== 'Text' && node.type !== 'Expression') add(node.start, node.end);
  for (const segment of model.segments) if (segment.range) add(segment.range.start, segment.range.end);
  for (const style of model.styles) add(style.range.start, style.range.end);
  for (const template of model.templates) add(template.start, template.end + 1);
  return out;
}

// :::::: SELECTION RANGES

// every range around an offset, innermost first: name, attribute, element, block …
function selection (model, document, offset) {
  const ranges = [];
  const trees  = model.kind === 'rat' ? [model.ast.children] : model.templates.map(template => template.ast.children);

  for (const tree of trees) {
    for (const node of nodesOf(tree)) {
      if (node.start === undefined || node.end === undefined || offset < node.start || offset > node.end) continue;
      ranges.push([node.start, node.end]);
      if (node.type !== 'Element') continue;
      ranges.push([node.start, node.openEnd]);
      if (offset >= node.name.start && offset <= node.name.end) ranges.push([node.name.start, node.name.end]);
      for (const attribute of node.attributes) {
        const [start, end] = attribute.range ? [attribute.range.start, attribute.range.end] : [attribute.start, attribute.end];
        if (offset < start || offset > end) continue;
        ranges.push([start, end]);
        if (attribute.nameEnd && offset <= attribute.nameEnd) ranges.push([attribute.start, attribute.nameEnd]);
      }
    }
  }

  const occurrence = occurrenceAt(model, offset);
  if (occurrence) ranges.push([occurrence.start, occurrence.end]);
  for (const segment of model.segments) if (offset >= segment.start && offset <= segment.end) ranges.push([segment.start, segment.end]);

  // outermost first, so each one becomes the parent of the next
  const unique = [...new Map(ranges.map(item => [item.join(':'), item])).values()].sort((a, b) => (b[1] - b[0]) - (a[1] - a[0]));
  let parent;
  for (const [start, end] of unique) parent = { parent, range: range(document, start, end) };
  return parent ?? { range: range(document, offset, offset) };
}

// :::::: LINKED EDITING

// the name of an open tag and of its closing tag change together, when both say the same
function linkedEditing (model, document, offset) {
  const trees = model.kind === 'rat' ? [model.ast.children] : model.templates.map(template => template.ast.children);
  for (const tree of trees) {
    for (const node of nodesOf(tree)) {
      if (node.type !== 'Element' || !node.close || node.component) continue;
      const written = document.getText().slice(node.name.start, node.name.end);
      if (node.close.name !== written) continue;
      const close = { end: node.close.start + 2 + written.length, start: node.close.start + 2 };
      if ((offset >= node.name.start && offset <= node.name.end) || (offset >= close.start && offset <= close.end)) {
        return { ranges: [range(document, node.name.start, node.name.end), range(document, close.start, close.end)], wordPattern: '[A-Za-z0-9\\-_.#:$]+' };
      }
    }
  }
  return null;
}

// :::::: SEMANTIC TOKENS

function semanticTokens (model, document) {
  const kinds = new Map(model.signals.map(signal => [signal.name, signal.kind]));
  const data  = [];
  let line = 0, character = 0;

  for (const item of model.occurrences) {
    const start = document.positionAt(item.start);
    const modifiers = 1 << 2 | (item.declaration ? 1 : 0) | (kinds.get(item.name) === 'computed' ? 1 << 1 : 0);
    data.push(start.line - line, start.line === line ? start.character - character : start.character, item.end - item.start, 0, modifiers);
    line = start.line;
    character = start.character;
  }

  return { data };
}

// :::::: SIGNALS

const signalOf = (model, name) => model.signals.find(signal => signal.name === name) ?? null;

function signalHover (model, document, offset) {
  const occurrence = occurrenceAt(model, offset);
  const signal     = occurrence && signalOf(model, occurrence.name);
  if (!signal) return null;

  const text  = document.getText();
  const lineEnd = text.indexOf('\n', signal.statement);
  const code  = text.slice(signal.statement, lineEnd < 0 ? text.length : lineEnd).trim();
  const what  = signal.kind === 'computed' ? 'computed: follows the signals it reads, read only' : 'signal: reading tracks it, writing updates whatever read it';
  return { contents: { kind: 'markdown', value: `\`\`\`js\n${code}\n\`\`\`\n\n${what}` }, range: range(document, occurrence.start, occurrence.end) };
}

function signalDefinition (model, document, offset) {
  const occurrence = occurrenceAt(model, offset);
  const signal     = occurrence && signalOf(model, occurrence.name);
  return signal ? { range: range(document, signal.start, signal.end), uri: document.uri } : null;
}

function signalReferences (model, document, offset, includeDeclaration = true) {
  const occurrence = occurrenceAt(model, offset);
  if (!occurrence) return null;
  return model.occurrences
    .filter(item => item.name === occurrence.name && (includeDeclaration || !item.declaration))
    .map(item => ({ range: range(document, item.start, item.end), uri: document.uri }));
}

function signalHighlights (model, document, offset) {
  const occurrence = occurrenceAt(model, offset);
  if (!occurrence) return null;
  const text = document.getText();
  return model.occurrences.filter(item => item.name === occurrence.name).map(item => {
    // a write: the declaration, or followed by = (not ==), +=, ++ …
    const after = text.slice(item.end, item.end + 3).trimStart();
    const write = item.declaration || /^(=(?!=)|[-+*/%&|^]=|\+\+|--|\*\*=|\?\?=|\|\|=|&&=)/.test(after);
    return { kind: write ? HIGHLIGHT.Write : HIGHLIGHT.Read, range: range(document, item.start, item.end) };
  });
}

function prepareRename (model, document, offset) {
  const occurrence = occurrenceAt(model, offset);
  return occurrence ? { placeholder: occurrence.name, range: range(document, occurrence.start, occurrence.end) } : null;
}

// a signal keeps its $: renaming $count to total gives $total
function rename (model, document, offset, name) {
  const occurrence = occurrenceAt(model, offset);
  if (!occurrence) return null;
  const next = name.startsWith('$') ? name : `$${name}`;
  if (!/^\$[\w$]+$/.test(next)) return null;
  const edits = model.occurrences.filter(item => item.name === occurrence.name).map(item => ({ newText: next, range: range(document, item.start, item.end) }));
  return { changes: { [document.uri]: edits } };
}

// :::::: COMPLETION

const BLOCKS = [
  { detail: 'braces',      label: '@if',     snippet: '@if (${1:condition}) {\n\t$0\n}' },
  { detail: 'one line',    label: '@if:',    snippet: '@if (${1:condition}): $0' },
  { detail: 'braces',      label: '@for',    snippet: '@for (${1:item} of ${2:list}) {\n\t$0\n}' },
  { detail: 'with @else',  label: '@for …@else', snippet: '@for (${1:item} of ${2:list}) {\n\t$3\n} @else {\n\t$0\n}' },
  { detail: 'one line',    label: '@for:',   snippet: '@for (${1:item} of ${2:list}): $0' },
  { detail: 'braces',      label: '@switch', snippet: '@switch (${1:value}) {\n\t@case ${2:value} { $3 }\n\t@default { $0 }\n}' },
  { detail: 'continues @if, @for', label: '@else', snippet: '@else {\n\t$0\n}' },
  { detail: 'inside @switch', label: '@case', snippet: '@case ${1:value} { $0 }' },
  { detail: 'inside @switch', label: '@default', snippet: '@default { $0 }' },
  { detail: 'markup with parameters, top level', label: '@fragment', snippet: '@fragment ${1:name} (${2:item})\n\t$0' },
];

const BINDABLE  = ['checked', 'files', 'open', 'value'];
const MODIFIERS = [
  { detail: 'only for these keys: [enter], [ctrl+s|escape]', label: '[]', snippet: '[${1:enter}]' },
  { detail: 'preventDefault() first', label: '!', snippet: '!' },
  { detail: 'once, then never again', label: ':once', snippet: ':once' },
];

// completion of rat syntax at an offset in the markup; where: 'text', 'attribute' or 'tag'
// (see elements.where). null where it has nothing to say
function complete (model, document, offset, where) {
  const text   = document.getText();
  const line   = text.slice(text.lastIndexOf('\n', offset - 1) + 1, offset);
  const blocks = /(^|[\s>}])(@\w*)$/.exec(line);

  // @if, @for, @switch where a block can start
  if (blocks && where === 'text') {
    const start = offset - blocks[2].length;
    return BLOCKS.map(item => ({ detail: item.detail, filterText: item.label, insertTextFormat: SNIPPET, kind: COMPLETION.Snippet, label: item.label, textEdit: { newText: item.snippet, range: range(document, start, offset) } }));
  }
  if (where !== 'attribute') return null;

  const word  = /[^\s<>"'{}=]*$/.exec(line)[0];
  const start = offset - word.length;
  const edit  = (label, newText = label) => ({ newText, range: range(document, start, offset) });

  // on:click[…]!:once
  if (/^on:[\w:-]+$/.test(word) && !word.endsWith(':')) return MODIFIERS.map(item => ({ detail: item.detail, insertTextFormat: SNIPPET, kind: COMPLETION.Keyword, label: word + item.label, textEdit: edit(word + item.label, word + item.snippet) }));
  if (word.startsWith('bind:')) return BINDABLE.map(name => ({ detail: 'two-way binding to a signal', kind: COMPLETION.Property, label: `bind:${name}`, textEdit: edit(`bind:${name}`, `bind:${name}={\\$\${1:signal}}`), insertTextFormat: SNIPPET }));

  // behaviors: functions of the scripts, as @name and use:name
  const behaviors = [...model.functions].flatMap(name => [
    { detail: 'behavior', kind: COMPLETION.Function, label: `@${name}`, textEdit: edit(`@${name}`) },
    { detail: 'behavior', kind: COMPLETION.Function, label: `use:${name}`, textEdit: edit(`use:${name}`) },
  ]);

  return [
    ...behaviors,
    ...BINDABLE.map(name => ({ detail: 'two-way binding to a signal', insertTextFormat: SNIPPET, kind: COMPLETION.Property, label: `bind:${name}`, textEdit: edit(`bind:${name}`, `bind:${name}={\\$\${1:signal}}`) })),
  ];
}

export {
  TOKEN_MODIFIERS, TOKEN_TYPES,
  complete, folding, linkedEditing, prepareRename, rename, selection, semanticTokens,
  signalDefinition, signalHighlights, signalHover, signalReferences, symbols,
};
