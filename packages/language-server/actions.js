// @rat/language-server :: actions

/*
code actions (stage 5): quick fixes for what the diagnostics found, and
rewrites of a block between its forms.

  @if={x} on an element        -> @if (x) { <element> }
  $name nobody declares        -> let $name; in the <script>, or a new <script>
  a value outside its options  -> one of the closest options
  @if / @for, one branch       -> braces <-> one line
*/

import { nodesOf } from './document.js';

const QUICKFIX = 'quickfix';
const REWRITE  = 'refactor.rewrite';

const range = (document, start, end) => ({ end: document.positionAt(end), start: document.positionAt(start) });
const touches = (document, request, start, end) => document.offsetAt(request.start) <= end && document.offsetAt(request.end) >= start;
const action  = (title, kind, document, edits, preferred = false) => ({ edit: { changes: { [document.uri]: edits } }, isPreferred: preferred || undefined, kind, title });

// the end of a {…} that starts at index, braces in strings and templates aside
function closingBrace (text, index) {
  let depth = 0, quote = null;
  for (let at = index; at < text.length; at++) {
    const char = text[at];
    if (quote) { if (char === '\\') at++; else if (char === quote) quote = null; continue; }
    if (char === '"' || char === "'" || char === '`') { quote = char; continue; }
    if (char === '{') depth++;
    if (char === '}' && --depth === 0) return at;
  }
  return -1;
}

const elementsOf = model => model.kind === 'rat' ? [...nodesOf(model.ast.children)] : model.templates.flatMap(template => [...nodesOf(template.ast.children)]);

// :::::: QUICK FIXES

// @if={x} -> a block around the element
function blockAttribute (model, document, error) {
  const match = /^@(if|for|switch) is a block/.exec(error.reason);
  if (!match) return null;
  const text  = model.text;
  const open  = text.indexOf('{', error.index);
  const close = open < 0 ? -1 : closingBrace(text, open);
  if (close < 0) return null;

  const element = elementsOf(model).filter(node => node.type === 'Element' && node.start < error.index && node.openEnd > error.index).at(-1);
  if (!element) return null;

  let from = error.index;
  while (from > 0 && /[ \t]/.test(text[from - 1])) from--;
  const value = text.slice(open + 1, close).trim();

  return action(`write @${match[1]} as a block around <${element.tag}>`, QUICKFIX, document, [
    { newText: `@${match[1]} (${value}) { `, range: range(document, element.start, element.start) },
    { newText: '', range: range(document, from, close + 1) },
    { newText: ' }', range: range(document, element.end, element.end) },
  ], true);
}

// let $name; at the end of the instance script, or a script of its own
function declare (model, document, item) {
  const script = model.segments.find(segment => segment.kind === 'script') ?? model.segments.find(segment => segment.kind === 'module');
  if (model.kind !== 'rat') return null;
  if (script) {
    const text = model.text;
    let at = script.end;
    while (at > script.start && /\s/.test(text[at - 1])) at--;
    return action(`declare ${item.name} in <script>`, QUICKFIX, document, [{ newText: `\n  let ${item.name};`, range: range(document, at, at) }], true);
  }
  return action(`declare ${item.name} in a new <script>`, QUICKFIX, document, [{ newText: `<script>\n  let ${item.name};\n</script>\n\n`, range: range(document, 0, 0) }], true);
}

function distance (a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0]++;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length];
}

// 'sumbit' is no value of type: 'button' | 'reset' | 'submit' -> the closest three
function closestValues (document, diagnostic) {
  const match = /^'([^']*)' is no value of [^:]+: (.+)$/.exec(diagnostic.message);
  if (!match) return [];
  const values = [...match[2].matchAll(/'([^']*)'/g)].map(item => item[1]);
  const quoted = /^["']/.test(document.getText(diagnostic.range));
  return values
    .sort((a, b) => distance(match[1], a) - distance(match[1], b))
    .slice(0, 3)
    .map((value, index) => ({ diagnostics: [diagnostic], ...action(`change to '${value}'`, QUICKFIX, document, [{ newText: quoted ? `"${value}"` : value, range: diagnostic.range }], index === 0) }));
}

// :::::: REWRITES

// the form of a block's body: { … }, : …, or indented lines
function formOf (text, headEnd) {
  let at = headEnd;
  while (text[at] === ' ' || text[at] === '\t') at++;
  return { at, form: text[at] === '{' ? 'braces' : text[at] === ':' ? 'line' : 'indent' };
}

function rewrites (model, document, request) {
  const text = model.text;
  const out  = [];

  for (const node of elementsOf(model)) {
    const single = (node.type === 'If' && node.branches.length === 1 && !node.fallback) || (node.type === 'For' && !node.fallback);
    if (!single) continue;

    const head    = node.type === 'If' ? node.branches[0].test : node.head;
    const headEnd = text.indexOf(')', head.end) + 1;
    if (!headEnd || !touches(document, request, node.start, headEnd)) continue;

    const { at, form } = formOf(text, headEnd);
    const keyword      = `@${node.type.toLowerCase()}`;

    if (form === 'braces' && text[node.end - 1] === '}') {
      const content = text.slice(at + 1, node.end - 1);
      if (content.includes('\n')) continue;
      out.push(action(`${keyword}: braces to one line`, REWRITE, document, [{ newText: `: ${content.trim()}`, range: range(document, at, node.end) }]));
    }
    if (form === 'line') {
      const content = text.slice(at + 1, node.end);
      out.push(action(`${keyword}: one line to braces`, REWRITE, document, [{ newText: `{ ${content.trim()} }`, range: range(document, at, node.end) }]));
    }
  }

  return out;
}

// :::::: ALL

function codeActions (model, document, request, diagnostics = []) {
  const out = [];

  for (const error of model.errors) {
    if (!touches(document, request, error.index, error.index + 1)) continue;
    const fix = blockAttribute(model, document, error);
    if (fix) out.push(fix);
  }

  for (const item of model.unknown ?? []) {
    if (!touches(document, request, item.start, item.end)) continue;
    const fix = declare(model, document, item);
    if (fix) out.push(fix);
  }

  for (const diagnostic of diagnostics) if (diagnostic.code === 'htx-value') out.push(...closestValues(document, diagnostic));

  out.push(...rewrites(model, document, request));
  return out;
}

export { codeActions };
