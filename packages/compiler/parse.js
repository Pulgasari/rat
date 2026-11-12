// @rat/compiler :: parse

/*
markup -> ast. the markup itself (elements, selectors, attributes, prop groups,
closing tags) is htx and read by its one parser, scanner() of @htx/htx. this
file is what rat adds to it:

  holes      {…}, delimited with acorn's tokenizer (the script pass parses the code later)
  blocks     @if @for @match @await @fragment @var, in child position, with their three body forms
  raw tags   <script>, <script module>, <script comptime>, <style>, top level only
  components a capital means an identifier: <Card />

  Fragment   { children, errors, warnings, scripts, styles }
  Element    { tag, id, classes, attributes, children, component, svg, name, openEnd, close }
  Text       { value }
  Expression { code, start, end }
  If         { branches: [{ test, children }], fallback }
  For        { item, index, list, children, fallback }
  Match      { subject, cases: [{ test, children }], fallback }
  FragmentDef { name, params, children }    @fragment name (params), top level only
  Await      { binding, promise, children, pending, failed: { name, children } }
  Var        { name, value }                @var name = value, to the end of the line

every node has start and end, offsets in the file. an expression is
{ code, start, end }: the trimmed source text and where it stands, so later
errors still point into the file. an element also has the range of its name,
where its open tag ends (openEnd) and the range of its closing tag (close).

tolerant: true (the language server) collects errors in ast.errors and keeps
going: an unclosed tag ends at the end of the file, a broken block is skipped
up to the next tag or line. without it the first error is thrown, which is
what compile() wants.
*/

import { scanner } from '@htx/htx/scan';

import { CompileError, scanCase, scanClose, tt } from './util.js';

const BLOCK_START  = /@(await|if|for|match|fragment|var)\b/y;
const CONTINUATION = /@(catch|else|case|default|pending)(?![\w$])/y;
const INLINE_SPACE = /[ \t]*/y;
const TAG_START    = /[A-Za-z.#]/;

// ::: parser

function parse (source, { blocks = true, filename = 'component.rat', offset = 0, tolerant = false } = {}) {
  const scripts = { comptime: [], instance: [], module: [] };
  const styles  = [];

  // offset: where source starts inside the file (a template in a .rat.js), errors count from the file
  const fullSource = offset ? ' '.repeat(offset) + source : source;

  const p = scanner(source, {
    child      : (p, end, context) => p.peek('@') && atBlockStart() ? block(context) : undefined,
    component  : name => /^[A-Z]/.test(name),
    emit,
    ends,
    error      : (message, index) => new CompileError(message, { filename, index: index + offset, source: fullSource }),
    hole       : holeAt,
    open       : (p, name, start, context) => name === 'script' || name === 'style' ? { node: raw(name, start, context) } : undefined,
    position   : { end: index => index + offset, start: index => index + offset },
    stops      : '{',
    tagStart   : TAG_START,
    text       : (p, end, context) => text(end, context),
    tolerant,
    unfinished : (p, end) => { if (end === 'brace') report('unclosed block, expected "}"'); },
  });

  const { fail, nodes, peek, report, skipWhitespace, sticky } = p;

  // ::: helpers

  function expect (string) {
    if (!peek(string)) throw fail(`expected "${string}"`);
    p.i += string.length;
  }

  // the code up to the token that closes the current level, consumed with it
  function until (close, label) {
    const start  = p.i;
    const result = scanClose(source, start, close);
    if (result.error) throw fail(`${result.error} in ${label}`, result.index);
    p.i = result.index + 1;
    const text = source.slice(start, result.index);
    const lead = text.length - text.trimStart().length;
    const code = text.trim();
    return { code, end: start + lead + code.length + offset, start: start + lead + offset };
  }

  const hole      = () => until(tt.braceR, 'expression');
  const condition = () => { skipWhitespace(); expect('('); return until(tt.parenR, 'condition'); };

  const atNewline = () => source[p.i] === '\n' || (source[p.i] === '\r' && source[p.i + 1] === '\n');
  const atLineEnd = () => p.i >= source.length || atNewline();

  // ::: hooks of the scanner

  // {expr}, and {...props} where an attribute stands. a tag or a closing name is never a hole
  function holeAt (p, where) {
    if (where === 'tag' || where === 'closing' || source[p.i] !== '{') return undefined;
    p.i++;
    if (where === 'attribute' && peek('...')) { p.i += 3; return { spread: true, value: hole() }; }
    return { value: hole() };
  }

  /*
  what closes a child list besides a closing tag and the end of the file:
    brace   a }                        @if (…) { … }
    line    the end of the line        @if (…): …
    indent  a line indented no deeper  @if (…)
            than the block head          …
  inside line and indent a } still closes, when an outer { … } is open, and a
  closing tag ends the body inside its element: <ul>@for (x of xs): <li/></ul>
  */
  function ends (p, end, context) {
    if (end === 'line' || end === 'indent') {
      if (peek('}') && context.braces) return true;
      if (peek('</') && context.depth) return true;
      if (end === 'line' && (atNewline() || atContinuation())) return true;
      if (end === 'indent' && atNewline()) {
        if (dedented(context.indent)) return true;
        consistent(context.whitespace);
      }
    }
    if (end === 'brace' && peek('}')) { p.i++; return true; }
    return false;
  }

  // the nodes of htx as the ast of rat. comments go
  function emit (node) {
    if (node.type === 'comment') return null;
    if (node.type === 'hole')    return { type: 'Expression', ...node.hole };
    if (node.type === 'element') return elementOf(node);
    return node;
  }

  function elementOf (node) {
    const attributes = [];
    const children   = [];

    for (const attribute of node.attributes) {
      const { end, start, value } = attribute;

      if (attribute.spread) { attributes.push({ type: 'Spread', ...value.hole, range: { end, start } }); continue; }

      if (attribute.positional) {
        // {name} is name={name}
        if (value.kind === 'hole' && !value.quoted) attributes.push({ end, nameEnd: end, names: [value.hole.code], start, type: 'Attribute', value: { kind: 'expression', ...value.hole } });
        // a positional value (htx): a child, until shorthand tags give it a meaning
        else children.push({ end, start, type: 'Text', value: value.kind === 'string' ? value.text : '' });
        continue;
      }

      // @name is a behavior. control flow is a block around the element
      if (attribute.name === '@if' || attribute.name === '@for' || attribute.name === '@match') { report(`${attribute.name} is a block, not an attribute: write it around the element`, start - offset); continue; }

      attributes.push({ end, nameEnd: attribute.nameEnd, names: attribute.names, start, type: 'Attribute', value: valueOf(value) });
    }

    return {
      type       : 'Element',
      attributes,
      children   : [...children, ...node.children],
      classes    : node.classes.map(item => item.name),
      close      : node.close && { end: node.close.end, name: node.close.name, start: node.close.start },
      component  : node.component,
      end        : node.end,
      id         : node.id?.name ?? null,
      name       : node.nameRange,
      openEnd    : node.openEnd,
      start      : node.start,
      svg        : node.svg,
      tag        : node.tag,
    };
  }

  // a value with {…} holes is a template, its start and end stand inside the quotes
  function valueOf (value) {
    if (value.kind === 'true') return { kind: 'true' };
    const { end, start } = value.inner;
    if (value.kind === 'string') return { end, kind: 'string', start, value: value.text };
    if (value.kind === 'hole' && !value.quoted) return { kind: 'expression', ...value.hole };
    const parts = value.kind === 'hole' ? [value.hole] : value.parts.map(part => typeof part === 'string' ? part : part.hole);
    return { end, kind: 'template', parts, start };
  }

  // ::: lines and indentation

  function indentAt (position) {
    let at = source.lastIndexOf('\n', position - 1) + 1;
    const from = at;
    while (source[at] === ' ' || source[at] === '\t') at++;
    return at - from;
  }

  // the leading spaces and tabs of the line a position is on
  function leading (position) {
    const from = source.lastIndexOf('\n', position - 1) + 1;
    return /^[ \t]*/.exec(source.slice(from))[0];
  }

  // an indented block uses tabs or spaces, never both (d-04). checks the line after the
  // newline at p.i; whitespace is { char } shared by the block, set by its first indented line
  function consistent (whitespace) {
    const indent = leading(p.i + 1);
    if (!indent || !source.slice(p.i + 1 + indent.length).split('\n')[0].trim()) return;
    const chars = new Set(indent);
    if (chars.size > 1) throw fail('tabs and spaces mixed in one indentation', p.i + 1);
    const [char] = chars;
    whitespace.char ??= char;
    if (char !== whitespace.char) throw fail(`this block is indented with ${whitespace.char === '\t' ? 'tabs' : 'spaces'}, this line with ${char === '\t' ? 'tabs' : 'spaces'}`, p.i + 1);
  }

  // true if the next non-blank line is indented no deeper than base (or there is none)
  function dedented (base) {
    let at = p.i;
    while (at < source.length) {
      const next = source.indexOf('\n', at + 1);
      const line = source.slice(at + 1, next < 0 ? source.length : next);
      if (line.trim()) return indentAt(at + 1) <= base;
      if (next < 0) break;
      at = next;
    }
    return true;
  }

  const before = () => source[p.i - 1];

  // an @ opens a block only at the start of a line, after whitespace or after a tag
  function atBlockStart () {
    if (before() !== undefined && !/[\s>}]/.test(before())) return false;
    BLOCK_START.lastIndex = p.i;
    return BLOCK_START.test(source);
  }

  // @else, @case, @default, @pending, @catch: where a one-line body (@if (…): …) stops
  function atContinuation () {
    if (before() !== undefined && !/[\s>}]/.test(before())) return false;
    CONTINUATION.lastIndex = p.i;
    return CONTINUATION.test(source);
  }

  function text (end, context) {
    const loose = end === 'line' || end === 'indent';
    const start = p.i;
    p.i++;
    while (p.i < source.length) {
      const char = source[p.i];
      if (char === '<' || char === '{') break;
      if (char === '}' && (end === 'brace' || (loose && context.braces))) break;
      if (char === '\n' && loose) break;
      if (char === '@' && (atBlockStart() || (end === 'line' && atContinuation()))) break;
      p.i++;
    }
    return { end: p.i + offset, start: start + offset, type: 'Text', value: source.slice(start, p.i) };
  }

  // ::: blocks

  const BLOCKS = { await: awaitBlock, fragment: fragmentBlock, for: forBlock, if: ifBlock, match: matchBlock, var: varBlock };

  // context.block: inside a block body, where a @fragment would close over the block
  function block (context) {
    const start       = p.i;
    const base        = indentAt(p.i);
    const [, keyword] = sticky(BLOCK_START);
    const node        = BLOCKS[keyword]({ ...context, block: true }, base, context);
    return { ...node, end: p.i + offset, start: start + offset };
  }

  // the three body forms: { … }, : rest of the line, or the deeper indented lines below
  function body (context, base) {
    sticky(INLINE_SPACE);
    if (peek('{')) { p.i++; return nodes('brace', { ...context, braces: (context.braces ?? 0) + 1 }); }
    if (peek(':')) { p.i++; sticky(INLINE_SPACE); return trimEnd(nodes('line', context)); }
    if (atLineEnd()) {
      const head = leading(p.i);
      return nodes('indent', { ...context, indent: base, whitespace: { char: head ? head[0] : null } });
    }
    throw fail('expected "{", ":" or a line break after the block head');
  }

  // a one-line body ends where @else starts, the space before it is no content
  function trimEnd (children) {
    const last = children[children.length - 1];
    if (last?.type === 'Text') last.value = last.value.trimEnd();
    if (last?.type === 'Text' && !last.value) children.pop();
    return children;
  }

  // looks past whitespace for a continuation like @else, restores if there is none
  function continues (keyword) {
    const start = p.i;
    skipWhitespace();
    if (peek(keyword) && !/[\w$]/.test(source[p.i + keyword.length] ?? '')) { p.i += keyword.length; return true; }
    p.i = start;
    return false;
  }

  // continues, for the clause of a block: an @else belongs to the @if on its own indentation,
  // so a dedented @else after a nested indented block goes to the outer one
  function clause (keyword, base) {
    const start = p.i;
    skipWhitespace();
    const ok = p.i < source.length && indentAt(p.i) === base;
    p.i = start;
    return ok && continues(keyword);
  }

  function ifBlock (context, base) {
    const branches = [{ test: condition(), children: body(context, base) }];
    let fallback   = null;

    let elseAt     = null;

    while (clause('@else', base)) {
      if (continues('if')) { branches.push({ test: condition(), children: body(context, base) }); continue; }
      elseAt   = p.i + offset;
      fallback = body(context, base);
      break;
    }

    return { type: 'If', branches, elseAt, fallback };
  }

  function forBlock (context, base) {
    const head     = condition();
    const children = body(context, base);
    let elseAt     = null;
    let fallback   = null;
    if (clause('@else', base)) { elseAt = p.i + offset; fallback = body(context, base); }
    return { type: 'For', ...forHead(head), children, elseAt, fallback, head };
  }

  // @await (user of load($id)), then @pending and @catch (error) as clauses, in any order (d-28 d).
  // without a binding (@await (save())) the value is not handed out
  function awaitBlock (context, base) {
    const head     = condition();
    const of       = /^([A-Za-z_$][\w$]*)\s+of\s+/.exec(head.code);
    const binding  = of?.[1] ?? null;
    const promise  = of ? { code: head.code.slice(of[0].length).trim(), end: head.end, start: head.start + of[0].length } : head;
    const children = body(context, base);
    let   pending  = null;
    let   failed   = null;

    while (true) {
      if (!pending && clause('@pending', base)) { pending = body(context, base); continue; }
      if (!failed && clause('@catch', base)) {
        const name = condition().code;
        if (!/^[A-Za-z_$][\w$]*$/.test(name)) throw fail('expected a name: @catch (error)');
        failed = { children: body(context, base), name };
        continue;
      }
      break;
    }

    return { type: 'Await', binding, children, failed, pending, promise };
  }

  // @var name = value: a name for the rest of the body. $name follows what it reads (a computed), a plain
  // name is the value at the time the body is made. one line
  function varBlock () {
    sticky(INLINE_SPACE);
    const name = sticky(/[A-Za-z_$][\w$]*/y)?.[0];
    if (!name) throw fail('expected a name: @var name = value');
    sticky(INLINE_SPACE);
    expect('=');
    sticky(INLINE_SPACE);
    const start = p.i;
    while (p.i < source.length && !atNewline()) p.i++;
    const text  = source.slice(start, p.i);
    const code  = text.trim().replace(/;$/, '');
    if (!code) throw fail('expected a value: @var name = value', start);
    return { type: 'Var', name, value: { code, end: start + code.length + offset, start: start + offset } };
  }

  // @fragment row (item, index): markup with parameters, a function returning a view (d-27)
  function fragmentBlock (context, base, outer) {
    const at = p.i;
    if (outer.depth || outer.block) throw fail('@fragment is only allowed at the top level of a .rat file', at - '@fragment'.length);
    sticky(INLINE_SPACE);
    const name = sticky(/[A-Za-z_$][\w$]*/y)?.[0];
    if (!name) throw fail('expected a name after @fragment: @fragment row (item)');
    const params = condition();
    return { type: 'FragmentDef', children: body(context, base), name, params };
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
    const list       = code.slice(listOffset).trim();
    return { index, item: binding, list: { code: list, end: start + listOffset + list.length, start: start + listOffset } };
  }

  // @match (…) { @case … }, or without braces: the @case lines indented below it
  function matchBlock (context, base) {
    const subject = condition();
    const cases   = [];
    let fallback  = null;

    sticky(INLINE_SPACE);
    const braced = peek('{');
    if (braced) p.i++;
    else if (!atLineEnd()) throw fail('expected "{" or a line break after @match (…)');

    while (true) {
      const start = p.i;
      skipWhitespace();
      if (braced && peek('}')) { p.i++; break; }
      if (!braced && (p.i >= source.length || indentAt(p.i) <= base)) { p.i = start; break; }

      const at = p.i;
      if (continues('@case')) {
        sticky(INLINE_SPACE);
        const from   = p.i;
        const result = scanCase(source, from);
        if (result.error) throw fail(`${result.error} in @case`, result.index);
        p.i = result.index;
        cases.push({ test: { code: source.slice(from, p.i).trim(), start: from + offset }, children: body(context, indentAt(at)) });
        continue;
      }
      if (continues('@default')) { fallback = body(context, indentAt(at)); continue; }
      if (!braced) { p.i = start; break; }
      throw fail('expected @case, @default or "}" in @match');
    }

    return { type: 'Match', cases, fallback, subject };
  }

  // ::: raw tags

  // <script>, <script module>, <script comptime>, <style>: raw text, top level only
  function raw (name, start, context) {
    const misplaced = !blocks || context.depth;
    // no closing tag after it: a closing tag was forgotten above, and that element is named. the
    // one a mismatched closing tag closed instead, or else the element it sits in
    const after    = source.indexOf(`</${name}>`, p.i);
    const unclosed = misplaced && blocks && context.tag && !/<\/[\w.#-]*>/.test(source.slice(after < 0 ? p.i : after + name.length + 3));
    const slip     = p.slips.at(-1);
    if (unclosed && slip) report(`<${slip.name}> is not closed, </${slip.written}> closed it instead and the <${name}> below ends up inside`, slip.open);
    else if (unclosed)    report(`<${context.tag}> is not closed, the <${name}> below ends up inside`, context.open);
    else if (misplaced)   report(`<${name}> is only allowed at the top level of a .rat file`, start);
    const open = source.indexOf('>', p.i);
    if (open < 0) { report(`unclosed <${name}>`, start); p.i = source.length; return null; }
    // <style src="…" /> has no content and no closing tag
    if (name === 'style' && source[open - 1] === '/') {
      if (!misplaced) styles.push({ attributes: source.slice(p.i, open - 1).trim(), code: '', end: open + 1 + offset, range: { end: open + 1 + offset, start: start + offset }, start: open + 1 + offset });
      p.i = open + 1;
      return null;
    }

    const attrs = source.slice(p.i, open);
    const close = source.indexOf(`</${name}>`, open);
    if (close < 0) { report(`unclosed <${name}>`, start); p.i = source.length; return null; }
    if (misplaced) { p.i = close + name.length + 3; return null; }

    const content = { attributes: attrs.trim(), code: source.slice(open + 1, close), end: close + offset, range: { end: close + name.length + 3 + offset, start: start + offset }, start: open + 1 + offset };
    if (name === 'style')                  styles.push(content);
    else if (/\bcomptime\b/.test(attrs))   scripts.comptime.push(content);
    else if (/\bmodule\b/.test(attrs))     scripts.module.push(content);
    else                                   scripts.instance.push(content);

    p.i = close + name.length + 3;
    return null;
  }

  // ::: run

  const children = normalize(nodes('eof', { depth: 0, svg: false }));
  return { children, end: source.length + offset, errors: p.errors, scripts, start: offset, styles, type: 'Fragment', warnings: p.warnings };
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
    if (node.type === 'Match')  { for (const branch of node.cases)    branch.children = normalize(branch.children, pre); }
    if (node.type === 'For' || node.type === 'If' || node.type === 'Match' || node.type === 'FragmentDef' || node.type === 'Await') {
      if (node.children) node.children = normalize(node.children, pre);
      if (node.fallback) node.fallback = normalize(node.fallback, pre);
    }
    if (node.type === 'Await') {
      if (node.pending) node.pending = normalize(node.pending, pre);
      if (node.failed)  node.failed.children = normalize(node.failed.children, pre);
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
