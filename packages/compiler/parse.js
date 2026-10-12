// @rat/compiler :: parse

/*
markup -> ast. a hand-written recursive descent over the source; js inside
holes and conditions is not parsed here, only delimited (acorn's tokenizer
finds the closing token). the script pass parses and rewrites it later.

  Fragment   { children }
  Element    { tag, id, classes, attributes, children, component, svg }
  Text       { value }
  Expression { code, start }
  If         { branches: [{ test, children }], fallback }
  For        { item, index, list, children, fallback }
  Switch     { subject, cases: [{ test, children }], fallback }

an expression is { code, start }: the source text and its offset, so later
errors still point into the file.
*/

import { CompileError, scanClose, scanUntil, tt } from './util.js';

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

const BLOCK_START = /@(if|for|switch)\b/y;
const NAME        = /[^\s=/>"'{]+/y;
const TAG         = /[A-Za-z0-9\-_.#:$]*/y;
const WHITESPACE  = /\s*/y;

// ::: parser

function parse (source, { blocks = true, filename = 'component.rat', offset = 0 } = {}) {
  let i = 0;

  const scripts = { instance: [], module: [] };
  const styles  = [];

  // ::: helpers

  // offset: where source starts inside the file (a template in a .rat.js), errors count from the file
  const fullSource = offset ? ' '.repeat(offset) + source : source;
  const fail       = (message, index = i) => new CompileError(message, { filename, index: index + offset, source: fullSource });

  const peek = (string) => source.startsWith(string, i);

  function sticky (regex) {
    regex.lastIndex = i;
    const match = regex.exec(source);
    if (match) i = regex.lastIndex;
    return match;
  }

  const skipWhitespace = () => sticky(WHITESPACE);

  function expect (string) {
    if (!peek(string)) throw fail(`expected "${string}"`);
    i += string.length;
  }

  // the code up to the token that closes the current level, consumed with it
  function until (close, label) {
    const start  = i;
    const result = scanClose(source, start, close);
    if (result.error) throw fail(`${result.error} in ${label}`, result.index);
    i = result.index + 1;
    return { code: source.slice(start, result.index).trim(), start: start + offset };
  }

  const hole      = () => until(tt.braceR, 'expression');
  const condition = () => { skipWhitespace(); expect('('); return until(tt.parenR, 'condition'); };

  // ::: nodes

  function nodes (end, context) {
    const children = [];

    while (i < source.length) {
      if (peek('<!--')) {
        const close = source.indexOf('-->', i + 4);
        if (close < 0) throw fail('unclosed <!--');
        i = close + 3;
      }
      else if (peek('</')) {
        if (end !== 'tag') throw fail('unexpected closing tag');
        const close = source.indexOf('>', i);
        if (close < 0) throw fail('unclosed closing tag');
        i = close + 1;
        return children;
      }
      else if (peek('<') && /[A-Za-z.#]/.test(source[i + 1] ?? '')) {
        const node = element(context);
        if (node) children.push(node);
      }
      else if (peek('{')) {
        i++;
        children.push({ type: 'Expression', ...hole() });
      }
      else if (peek('}') && end === 'brace') {
        i++;
        return children;
      }
      else if (peek('@') && atBlockStart()) {
        children.push(block(context));
      }
      else children.push(text(end));
    }

    if (end === 'tag')   throw fail('unclosed element');
    if (end === 'brace') throw fail('unclosed block, expected "}"');
    return children;
  }

  // an @ opens a block only at the start of a line, after whitespace or after a tag
  function atBlockStart () {
    const before = source[i - 1];
    if (before !== undefined && !/[\s>}]/.test(before)) return false;
    BLOCK_START.lastIndex = i;
    return BLOCK_START.test(source);
  }

  function text (end) {
    const start = i;
    i++;
    while (i < source.length) {
      const char = source[i];
      if (char === '<' || char === '{' || (char === '}' && end === 'brace')) break;
      if (char === '@' && atBlockStart()) break;
      i++;
    }
    return { type: 'Text', value: source.slice(start, i) };
  }

  // ::: blocks

  function block (context) {
    const [, keyword] = sticky(BLOCK_START);
    if (keyword === 'if')     return ifBlock(context);
    if (keyword === 'for')    return forBlock(context);
    return switchBlock(context);
  }

  function body (context) {
    skipWhitespace();
    expect('{');
    return nodes('brace', context);
  }

  // looks past whitespace for a continuation like @else, restores if there is none
  function continues (keyword) {
    const start = i;
    skipWhitespace();
    if (peek(keyword) && !/[\w$]/.test(source[i + keyword.length] ?? '')) { i += keyword.length; return true; }
    i = start;
    return false;
  }

  function ifBlock (context) {
    const branches = [{ test: condition(), children: body(context) }];
    let fallback   = null;

    while (continues('@else')) {
      if (continues('if')) { branches.push({ test: condition(), children: body(context) }); continue; }
      fallback = body(context);
      break;
    }

    return { type: 'If', branches, fallback };
  }

  function forBlock (context) {
    const head     = condition();
    const children = body(context);
    const fallback = continues('@else') ? body(context) : null;
    return { type: 'For', ...forHead(head), children, fallback };
  }

  // "item of list", "item, index of list", "{ a, b } of list"
  function forHead ({ code, start }) {
    const match = /\s+of\s+/.exec(code);
    if (!match) throw fail('expected "item of list"', start - offset);

    let binding = code.slice(0, match.index).trim();
    let index   = null;
    const comma = topLevelComma(binding);
    if (comma > -1) {
      index   = binding.slice(comma + 1).trim();
      binding = binding.slice(0, comma).trim();
    }

    const listOffset = match.index + match[0].length;
    return { index, item: binding, list: { code: code.slice(listOffset).trim(), start: start + listOffset } };
  }

  function switchBlock (context) {
    const subject = condition();
    const cases   = [];
    let fallback  = null;

    skipWhitespace();
    expect('{');

    while (true) {
      skipWhitespace();
      if (peek('}'))        { i++; break; }
      if (continues('@case')) {
        skipWhitespace();
        const start  = i;
        const result = scanUntil(source, start, tt.braceL);
        if (result.error) throw fail(`${result.error} in @case`, result.index);
        i = result.index;
        cases.push({ test: { code: source.slice(start, i).trim(), start: start + offset }, children: body(context) });
        continue;
      }
      if (continues('@default')) { fallback = body(context); continue; }
      throw fail('expected @case, @default or "}" in @switch');
    }

    return { type: 'Switch', cases, fallback, subject };
  }

  // ::: elements

  function element (context) {
    const start = i;
    i++;
    const name = sticky(TAG)[0];

    if (name === 'script' || name === 'style') return raw(name, start, context);

    const node       = selector(name, start);
    node.svg         = context.svg || node.tag === 'svg';
    node.attributes  = [];
    node.directives  = {};
    node.children    = [];

    const closed = attributes(node);

    if (!closed && !VOID.has(node.tag)) {
      node.children = nodes('tag', { depth: context.depth + 1, svg: node.svg });
    }

    return directives(node);
  }

  // div#main.card.big -> { tag, id, classes }. a capital means a component, its name is an identifier
  function selector (name, start) {
    if (/^[A-Z]/.test(name)) return { type: 'Element', classes: [], component: true, id: null, start: start + offset, tag: name };

    const [tag, ...rest] = name.split(/(?=[.#])/);
    const node = { type: 'Element', classes: [], component: false, id: null, start: start + offset, tag: tag || 'div' };
    if (/^[.#]/.test(tag)) { node.tag = 'div'; rest.unshift(tag); }

    for (const part of rest) {
      if (part[0] === '.') node.classes.push(part.slice(1));
      else if (node.id)    throw fail(`an element has one id, "${part}" is a second one`, start);
      else                 node.id = part.slice(1);
    }
    return node;
  }

  // returns true if the tag closed itself
  function attributes (node) {
    while (true) {
      skipWhitespace();
      if (i >= source.length) throw fail('unclosed tag', node.start - offset);
      if (peek('/>')) { i += 2; return true; }
      if (peek('>'))  { i += 1; return false; }

      if (peek('{')) {
        i++;
        if (peek('...')) { i += 3; node.attributes.push({ type: 'Spread', ...hole() }); continue; }
        // {name} is name={name}
        const value = hole();
        node.attributes.push({ type: 'Attribute', names: [value.code], value: { kind: 'expression', ...value } });
        continue;
      }

      // a positional value (htx): a child, until shorthand tags give it a meaning
      if (peek('"') || peek("'")) {
        node.children.push({ type: 'Text', value: quoted().value });
        continue;
      }

      const at   = i;
      const name = sticky(NAME)?.[0];
      if (!name) throw fail(`unexpected "${source[i]}" in tag`);

      let value = { kind: 'true' };
      skipWhitespace();
      if (peek('=')) {
        i++;
        skipWhitespace();
        value = attributeValue(name);
      }

      if (name === '@if' || name === '@for') {
        if (value.kind !== 'expression') throw fail(`${name} needs a value in {…}`, at);
        node.directives[name.slice(1)] = value;
        continue;
      }

      const names = name.split('|');
      if (names.some(part => !part)) throw fail(`dangling "|" in "${name}"`, at);
      node.attributes.push({ type: 'Attribute', names, value });
    }
  }

  function attributeValue (name) {
    if (peek('{'))              { i++; return { kind: 'expression', ...hole() }; }
    if (peek('"') || peek("'")) return quoted();
    const bare = sticky(/[^\s>]+/y);
    if (!bare) throw fail(`expected a value for "${name}"`);
    return { kind: 'string', value: bare[0] };
  }

  // a quoted value, with {…} holes it becomes a template
  function quoted () {
    const quote = source[i++];
    const parts = [];
    let text    = '';

    while (i < source.length && source[i] !== quote) {
      if (source[i] === '{') {
        i++;
        if (text) parts.push(text);
        parts.push(hole());
        text = '';
      }
      else text += source[i++];
    }

    if (i >= source.length) throw fail('unclosed quote');
    i++;
    if (text) parts.push(text);

    if (parts.every(part => typeof part === 'string')) return { kind: 'string', value: parts.join('') };
    return { kind: 'template', parts };
  }

  // @if={…} and @for={…} wrap the element in the block they name. @for is outside, @if inside
  function directives (node) {
    const { for: loop, if: test } = node.directives;
    delete node.directives;
    let result = node;
    if (test) result = { type: 'If', branches: [{ test, children: [result] }], fallback: null };
    if (loop) result = { type: 'For', ...forHead(loop), children: [result], fallback: null };
    return result;
  }

  // <script>, <script module>, <style>: raw text, top level only
  function raw (name, start, context) {
    if (!blocks || context.depth) throw fail(`<${name}> is only allowed at the top level of a .rat file`, start);
    const open = source.indexOf('>', i);
    if (open < 0) throw fail(`unclosed <${name}>`, start);
    const attrs = source.slice(i, open);
    const close = source.indexOf(`</${name}>`, open);
    if (close < 0) throw fail(`unclosed <${name}>`, start);

    const content = { code: source.slice(open + 1, close), start: open + 1 + offset };
    if (name === 'style')                  styles.push(content);
    else if (/\bmodule\b/.test(attrs))     scripts.module.push(content);
    else                                   scripts.instance.push(content);

    i = close + name.length + 3;
    return null;
  }

  // ::: run

  const children = normalize(nodes('eof', { depth: 0, svg: false }));
  return { children, scripts, styles, type: 'Fragment' };
}

// ::: whitespace

/*
runs of whitespace collapse to one space. a run with a newline at the edge of a
text node goes, so indentation never becomes content. inside <pre> nothing changes.
*/
function normalize (children, pre = false) {
  const out = [];

  for (const node of children) {
    if (node.type === 'Text') {
      if (pre) { out.push(node); continue; }
      const value = node.value
        .replace(/^\s*\n\s*/, '')
        .replace(/\s*\n\s*$/, '')
        .replace(/\s+/g, ' ');
      if (value) out.push({ ...node, value });
      continue;
    }

    if (node.type === 'Element') node.children = normalize(node.children, pre || node.tag === 'pre');
    if (node.type === 'If')      { for (const branch of node.branches) branch.children = normalize(branch.children, pre); }
    if (node.type === 'Switch')  { for (const branch of node.cases)    branch.children = normalize(branch.children, pre); }
    if (node.type === 'For' || node.type === 'If' || node.type === 'Switch') {
      if (node.children) node.children = normalize(node.children, pre);
      if (node.fallback) node.fallback = normalize(node.fallback, pre);
    }
    out.push(node);
  }

  return out;
}

// the index of the last comma on the top level of a binding pattern, or -1
function topLevelComma (code) {
  let depth = 0;
  let found = -1;
  for (let index = 0; index < code.length; index++) {
    const char = code[index];
    if ('([{'.includes(char)) depth++;
    else if (')]}'.includes(char)) depth--;
    else if (char === ',' && depth === 0) found = index;
  }
  return found;
}

export { parse };
export default parse;
