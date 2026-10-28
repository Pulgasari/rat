// @rat/compiler :: parse

/*
markup -> ast. a hand-written recursive descent over the source; js inside
holes and conditions is not parsed here, only delimited (acorn's tokenizer
finds the closing token). the script pass parses and rewrites it later.

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
going: an unclosed tag ends at the end of the file, a bad attribute is
skipped, a broken block is skipped up to the next tag or line. without it
the first error is thrown, which is what compile() wants.
*/

import { CompileError, scanCase, scanClose, tt } from './util.js';

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

const BLOCK_START  = /@(await|if|for|match|fragment|var)\b/y;
const CONTINUATION = /@(catch|else|case|default|pending)(?![\w$])/y;
const INLINE_SPACE = /[ \t]*/y;
const NAME        = /[^\s=/>"'{]+/y;
const TAG         = /[A-Za-z0-9\-_.#:$]*/y;
const WHITESPACE  = /\s*/y;

// ::: parser

function parse (source, { blocks = true, filename = 'component.rat', offset = 0, tolerant = false } = {}) {
  let i = 0;

  const errors   = [];
  const slips    = [];   // closing tags that closed another element than they name
  const warnings = [];
  const scripts  = { comptime: [], instance: [], module: [] };
  const styles   = [];

  // ::: helpers

  // offset: where source starts inside the file (a template in a .rat.js), errors count from the file
  const fullSource = offset ? ' '.repeat(offset) + source : source;
  const fail       = (message, index = i) => new CompileError(message, { filename, index: index + offset, source: fullSource });

  // an error the parser can step over: thrown, or collected when tolerant
  const report = (message, index = i) => { const error = fail(message, index); if (!tolerant) throw error; errors.push(error); };

  // after an error inside a construct: on to the next tag or line, at least one character further
  function recover (from, failed) {
    i = Math.max(i, failed, from + 1);
    const tag  = source.indexOf('<', i);
    const line = source.indexOf('\n', i);
    const next = Math.min(tag < 0 ? source.length : tag, line < 0 ? source.length : line);
    i = Math.min(next, source.length);
  }

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
    const text = source.slice(start, result.index);
    const lead = text.length - text.trimStart().length;
    const code = text.trim();
    return { code, end: start + lead + code.length + offset, start: start + lead + offset };
  }

  const hole      = () => until(tt.braceR, 'expression');
  const condition = () => { skipWhitespace(); expect('('); return until(tt.parenR, 'condition'); };

  // ::: nodes

  /*
  end says what closes the list:
    eof     the file
    tag     a closing tag
    brace   a }                        @if (…) { … }
    line    the end of the line        @if (…): …
    indent  a line indented no deeper  @if (…)
            than the block head          …
  inside line and indent a } still closes, when an outer { … } is open, and a
  closing tag ends the body inside its element: <ul>@for (x of xs): <li/></ul>
  */
  function nodes (end, context) {
    const children = [];
    const loose    = end === 'line' || end === 'indent';

    while (i < source.length) {
      const at = i;
      try {
        if (loose) {
          if (peek('}') && context.braces) return children;
          if (peek('</') && context.depth) return children;
          if (end === 'line' && (atNewline() || atContinuation())) return children;
          if (end === 'indent' && atNewline()) {
            if (dedented(context.indent)) return children;
            consistent(context.whitespace);
          }
        }

        if (peek('<!--')) {
          const close = source.indexOf('-->', i + 4);
          if (close < 0) { report('unclosed <!--'); i = source.length; continue; }
          i = close + 3;
        }
        else if (peek('</')) {
          const close = source.indexOf('>', i);
          if (end !== 'tag') { report('unexpected closing tag'); i = close < 0 ? source.length : close + 1; continue; }
          if (close < 0) { report('unclosed closing tag'); i = source.length; return children; }
          context.close = { end: close + 1 + offset, name: source.slice(i + 2, close).trim(), start: i + offset };
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
        else children.push(text(end, context));
      } catch (error) {
        if (!tolerant || !(error instanceof CompileError)) throw error;
        errors.push(error);
        recover(at, error.index - offset);
      }
    }

    if (end === 'tag')   report(`<${context.tag}> is never closed`, context.open);
    if (end === 'brace') report('unclosed block, expected "}"');
    return children;
  }

  const atNewline = () => source[i] === '\n' || (source[i] === '\r' && source[i + 1] === '\n');
  const atLineEnd = () => i >= source.length || atNewline();

  // the indentation of the line a position is on (spaces and tabs, one each)
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
  // newline at i; whitespace is { char } shared by the block, set by its first indented line
  function consistent (whitespace) {
    const indent = leading(i + 1);
    if (!indent || !source.slice(i + 1 + indent.length).split('\n')[0].trim()) return;
    const chars = new Set(indent);
    if (chars.size > 1) throw fail('tabs and spaces mixed in one indentation', i + 1);
    const [char] = chars;
    whitespace.char ??= char;
    if (char !== whitespace.char) throw fail(`this block is indented with ${whitespace.char === '\t' ? 'tabs' : 'spaces'}, this line with ${char === '\t' ? 'tabs' : 'spaces'}`, i + 1);
  }

  // true if the next non-blank line is indented no deeper than base (or there is none)
  function dedented (base) {
    let at = i;
    while (at < source.length) {
      const next = source.indexOf('\n', at + 1);
      const line = source.slice(at + 1, next < 0 ? source.length : next);
      if (line.trim()) return indentAt(at + 1) <= base;
      if (next < 0) break;
      at = next;
    }
    return true;
  }

  const before = () => source[i - 1];

  // an @ opens a block only at the start of a line, after whitespace or after a tag
  function atBlockStart () {
    if (before() !== undefined && !/[\s>}]/.test(before())) return false;
    BLOCK_START.lastIndex = i;
    return BLOCK_START.test(source);
  }

  // @else, @case, @default, @pending, @catch: where a one-line body (@if (…): …) stops
  function atContinuation () {
    if (before() !== undefined && !/[\s>}]/.test(before())) return false;
    CONTINUATION.lastIndex = i;
    return CONTINUATION.test(source);
  }

  function text (end, context) {
    const loose = end === 'line' || end === 'indent';
    const start = i;
    i++;
    while (i < source.length) {
      const char = source[i];
      if (char === '<' || char === '{') break;
      if (char === '}' && (end === 'brace' || (loose && context.braces))) break;
      if (char === '\n' && loose) break;
      if (char === '@' && (atBlockStart() || (end === 'line' && atContinuation()))) break;
      i++;
    }
    return { end: i + offset, start: start + offset, type: 'Text', value: source.slice(start, i) };
  }

  // ::: blocks

  const BLOCKS = { await: awaitBlock, fragment: fragmentBlock, for: forBlock, if: ifBlock, match: matchBlock, var: varBlock };

  // context.block: inside a block body, where a @fragment would close over the block
  function block (context) {
    const start       = i;
    const base        = indentAt(i);
    const [, keyword] = sticky(BLOCK_START);
    const node        = BLOCKS[keyword]({ ...context, block: true }, base, context);
    return { ...node, end: i + offset, start: start + offset };
  }

  // the three body forms: { … }, : rest of the line, or the deeper indented lines below
  function body (context, base) {
    sticky(INLINE_SPACE);
    if (peek('{')) { i++; return nodes('brace', { ...context, braces: (context.braces ?? 0) + 1 }); }
    if (peek(':')) { i++; sticky(INLINE_SPACE); return trimEnd(nodes('line', context)); }
    if (atLineEnd()) {
      const head = leading(i);
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
    const start = i;
    skipWhitespace();
    if (peek(keyword) && !/[\w$]/.test(source[i + keyword.length] ?? '')) { i += keyword.length; return true; }
    i = start;
    return false;
  }

  // continues, for the clause of a block: an @else belongs to the @if on its own indentation,
  // so a dedented @else after a nested indented block goes to the outer one
  function clause (keyword, base) {
    const start = i;
    skipWhitespace();
    const ok = i < source.length && indentAt(i) === base;
    i = start;
    return ok && continues(keyword);
  }

  function ifBlock (context, base) {
    const branches = [{ test: condition(), children: body(context, base) }];
    let fallback   = null;

    let elseAt     = null;

    while (clause('@else', base)) {
      if (continues('if')) { branches.push({ test: condition(), children: body(context, base) }); continue; }
      elseAt   = i + offset;
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
    if (clause('@else', base)) { elseAt = i + offset; fallback = body(context, base); }
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
    const start = i;
    while (i < source.length && !atNewline()) i++;
    const text  = source.slice(start, i);
    const code  = text.trim().replace(/;$/, '');
    if (!code) throw fail('expected a value: @var name = value', start);
    return { type: 'Var', name, value: { code, end: start + code.length + offset, start: start + offset } };
  }

  // @fragment row (item, index): markup with parameters, a function returning a view (d-27)
  function fragmentBlock (context, base, outer) {
    const at = i;
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
    if (braced) i++;
    else if (!atLineEnd()) throw fail('expected "{" or a line break after @match (…)');

    while (true) {
      const start = i;
      skipWhitespace();
      if (braced && peek('}')) { i++; break; }
      if (!braced && (i >= source.length || indentAt(i) <= base)) { i = start; break; }

      const at = i;
      if (continues('@case')) {
        sticky(INLINE_SPACE);
        const from   = i;
        const result = scanCase(source, from);
        if (result.error) throw fail(`${result.error} in @case`, result.index);
        i = result.index;
        cases.push({ test: { code: source.slice(from, i).trim(), start: from + offset }, children: body(context, indentAt(at)) });
        continue;
      }
      if (continues('@default')) { fallback = body(context, indentAt(at)); continue; }
      if (!braced) { i = start; break; }
      throw fail('expected @case, @default or "}" in @match');
    }

    return { type: 'Match', cases, fallback, subject };
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
    node.children    = [];
    node.name        = { end: start + 1 + name.length + offset, start: start + 1 + offset };
    node.close       = null;

    const closed = attributes(node);
    node.openEnd = i + offset;

    if (closed === false && !VOID.has(node.tag)) {
      const inner   = { depth: context.depth + 1, open: start, svg: node.svg, tag: name };
      node.children = nodes('tag', inner);
      node.close    = inner.close ?? null;

      // a closing tag closes the innermost element whatever it says; a different name is a slip
      const written = node.close?.name;
      if (written && written !== name) slips.push({ name, open: start, written });
      if (written && written !== name && written.split(/[.#]/)[0] !== node.tag) {
        warnings.push(fail(`</${written}> closes <${name}>`, node.close.start - offset));
      }
    }

    node.end = i + offset;
    return node;
  }

  // div#main.card.big -> { tag, id, classes }. a capital means a component, its name is an identifier
  function selector (name, start) {
    if (/^[A-Z]/.test(name)) return { type: 'Element', classes: [], component: true, id: null, start: start + offset, tag: name };

    const [tag, ...rest] = name.split(/(?=[.#])/);
    const node = { type: 'Element', classes: [], component: false, id: null, start: start + offset, tag: tag || 'div' };
    if (/^[.#]/.test(tag)) { node.tag = 'div'; rest.unshift(tag); }

    for (const part of rest) {
      if (part[0] === '.') node.classes.push(part.slice(1));
      else if (node.id)    report(`an element has one id, "${part}" is a second one`, start);
      else                 node.id = part.slice(1);
    }
    return node;
  }

  // true if the tag closed itself, false if it opened, null at the end of the file
  function attributes (node) {
    while (true) {
      skipWhitespace();
      if (i >= source.length) { report('unclosed tag', node.start - offset); return null; }
      if (peek('/>')) { i += 2; return true; }
      if (peek('>'))  { i += 1; return false; }

      const at = i;

      if (peek('{')) {
        i++;
        if (peek('...')) { i += 3; node.attributes.push({ type: 'Spread', ...hole(), range: { end: i + offset, start: at + offset } }); continue; }
        // {name} is name={name}
        const value = hole();
        node.attributes.push({ end: i + offset, nameEnd: i + offset, names: [value.code], start: at + offset, type: 'Attribute', value: { kind: 'expression', ...value } });
        continue;
      }

      // a positional value (htx): a child, until shorthand tags give it a meaning
      if (peek('"') || peek("'")) {
        const value = quoted();
        node.children.push({ end: i + offset, start: at + offset, type: 'Text', value: value.value ?? '' });
        continue;
      }

      const name = sticky(NAME)?.[0];
      if (!name) { report(`unexpected "${source[i]}" in tag`); i++; continue; }
      const nameEnd = i;

      let value = { kind: 'true' };
      skipWhitespace();
      if (peek('=')) {
        i++;
        skipWhitespace();
        value = attributeValue(name) ?? value;
      }

      // @name is a behavior now. control flow is a block around the element
      if (name === '@if' || name === '@for' || name === '@match') { report(`${name} is a block, not an attribute: write it around the element`, at); continue; }

      // a | inside [ … ] is part of a key filter (on:keydown[ctrl+c|space+a]), not a prop group
      const names = name.split(/\|(?![^[]*\])/);
      if (names.some(part => !part)) { report(`dangling "|" in "${name}"`, at); continue; }
      node.attributes.push({ end: i + offset, nameEnd: nameEnd + offset, names, start: at + offset, type: 'Attribute', value });
    }
  }

  function attributeValue (name) {
    const at = i;
    if (peek('{'))              { i++; return { kind: 'expression', ...hole() }; }
    if (peek('"') || peek("'")) return quoted();
    const bare = sticky(/[^\s>]+/y);
    if (!bare) { report(`expected a value for "${name}"`); return null; }
    return { end: i + offset, kind: 'string', start: at + offset, value: bare[0] };
  }

  // a quoted value, with {…} holes it becomes a template. start and end: inside the quotes
  function quoted () {
    const quote = source[i++];
    const start = i;
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

    const end = i;
    if (i >= source.length) report('unclosed quote', start - 1);
    else i++;
    if (text) parts.push(text);

    if (parts.every(part => typeof part === 'string')) return { end: end + offset, kind: 'string', start: start + offset, value: parts.join('') };
    return { end: end + offset, kind: 'template', parts, start: start + offset };
  }

  // <script>, <script module>, <script comptime>, <style>: raw text, top level only
  function raw (name, start, context) {
    const misplaced = !blocks || context.depth;
    // no closing tag after it: a closing tag was forgotten above, and that element is named. the
    // one a mismatched closing tag closed instead, or else the element it sits in
    const after    = source.indexOf(`</${name}>`, i);
    const unclosed = misplaced && blocks && context.tag && !/<\/[\w.#-]*>/.test(source.slice(after < 0 ? i : after + name.length + 3));
    const slip     = slips.at(-1);
    if (unclosed && slip) report(`<${slip.name}> is not closed, </${slip.written}> closed it instead and the <${name}> below ends up inside`, slip.open);
    else if (unclosed)    report(`<${context.tag}> is not closed, the <${name}> below ends up inside`, context.open);
    else if (misplaced)   report(`<${name}> is only allowed at the top level of a .rat file`, start);
    const open = source.indexOf('>', i);
    if (open < 0) { report(`unclosed <${name}>`, start); i = source.length; return null; }
    // <style src="…" /> has no content and no closing tag
    if (name === 'style' && source[open - 1] === '/') {
      if (!misplaced) styles.push({ attributes: source.slice(i, open - 1).trim(), code: '', end: open + 1 + offset, range: { end: open + 1 + offset, start: start + offset }, start: open + 1 + offset });
      i = open + 1;
      return null;
    }

    const attrs = source.slice(i, open);
    const close = source.indexOf(`</${name}>`, open);
    if (close < 0) { report(`unclosed <${name}>`, start); i = source.length; return null; }
    if (misplaced) { i = close + name.length + 3; return null; }

    const content = { attributes: attrs.trim(), code: source.slice(open + 1, close), end: close + offset, range: { end: close + name.length + 3 + offset, start: start + offset }, start: open + 1 + offset };
    if (name === 'style')                  styles.push(content);
    else if (/\bcomptime\b/.test(attrs))   scripts.comptime.push(content);
    else if (/\bmodule\b/.test(attrs))     scripts.module.push(content);
    else                                   scripts.instance.push(content);

    i = close + name.length + 3;
    return null;
  }

  // ::: run

  const children = normalize(nodes('eof', { depth: 0, svg: false }));
  return { children, end: source.length + offset, errors, scripts, start: offset, styles, type: 'Fragment', warnings };
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
