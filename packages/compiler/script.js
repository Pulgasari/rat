// @rat/compiler :: script

/*
the js side. two steps, in this order:

  sugar     text level, token based: |>, <| and for…of without a declaration.
            acorn cannot parse |>, so this runs before anything is parsed
  reactive  ast level: declared $names become signals / computeds, every
            read and write of one gets .value. only insertions, so edits
            never collide and positions stay simple. a $name made with
            `new $Variant(…)` stays as written: the object reports its own
            reads and writes
*/

import { parse as parseProgram, parseExpressionAt } from 'acorn';

import { styleStatements } from './style.js';
import { ACORN, CompileError, applyEdits, reason, scannable, tokens, tt } from './util.js';

// ::: sugar :: pipe

// tokens the left operand of |> never reaches past (on its own bracket level)
const LEFT_STOP  = new Set([tt.comma, tt.semi, tt.eq, tt.assign, tt.arrow, tt.question, tt.colon, tt._return, tt._throw, tt._case, tt._else, tt._do, tt.ellipsis]);
const RIGHT_STOP = new Set([tt.comma, tt.semi, tt.question, tt.colon]);
const OPENERS    = new Set([tt.parenL, tt.bracketL, tt.braceL, tt.dollarBraceL]);
const CLOSERS    = new Set([tt.parenR, tt.bracketR, tt.braceR]);

const isPipe = (list, index) =>
  list[index]?.type === tt.bitwiseOR && list[index + 1]?.value === '>' && list[index].end === list[index + 1].start;

// |> at index (its |), or at the > of it
const isPipeAt = (list, index) => isPipe(list, index) || isPipe(list, index - 1);

// <| or :: at index (its first half), or at the second half. :: is no js anywhere: two colons side by side
const adjacent  = (list, index) => list[index + 1] && list[index].end === list[index + 1].start;
const isApply   = (list, index) => Boolean(list[index]) && adjacent(list, index) && (
     list[index].value === '<' && list[index + 1].type === tt.bitwiseOR
  || list[index].type === tt.colon && list[index + 1].type === tt.colon);
const isApplyAt = (list, index) => isApply(list, index) || isApply(list, index - 1);

// a line break between two tokens
const breaks = (code, a, b) => code.slice(a.end, b.start).includes('\n');

/*
two forms, decided by the right side:

  value |> fn               fn(value)              implicit: the right side is a callable
  value |> obj.fn           obj.fn(value)
  value |> make()           (make())(value)        whatever it evaluates to is called (d-09)
  value |> fn(a, #)         fn(a, value)           explicit: # marks where the value goes
  value |> { a: #, b: # }   ($$piped => ({ a: $$piped, b: $$piped }))(value)

a value used more than once is bound once, so it is never evaluated twice.

one pipe per round, leftmost first, so a |> f |> g becomes g(f(a)).
*/
function pipes (code, offset = 0) {
  for (let round = 0; round < 1000; round++) {
    const list  = tokens(code, offset);
    const index = list.findIndex((_, at) => isPipe(list, at));
    if (index < 0) return code;

    const left  = leftOperand(code, list, index);
    const right = rightOperand(code, list, index + 2);
    const fail  = message => new CompileError(message, { index: list[index].start + offset, source: ' '.repeat(offset) + code });

    const value = code.slice(left.start, left.end).trim();
    const fn    = code.slice(right.start, right.end).trim();
    if (!value) throw fail('|> has no left operand');
    if (!fn)    throw fail('|> has no right operand');

    code = code.slice(0, left.start) + call(fn, value, list.slice(right.first, right.last + 1)) + code.slice(right.end);
  }
  throw new Error('[rat] pipe rewrite did not settle');
}

function leftOperand (code, list, pipe) {
  let depth = 0;
  let first = pipe;

  for (let at = pipe - 1; at >= 0; at--) {
    const token = list[at];
    if (CLOSERS.has(token.type)) { depth++; first = at; continue; }
    if (OPENERS.has(token.type)) { if (depth === 0) break; depth--; first = at; continue; }
    if (depth === 0) {
      if (LEFT_STOP.has(token.type) || isPipeAt(list, at) || isApplyAt(list, at)) break;
      // a line break on the top level ends the operand, unless the pipe opens the line
      if (first < pipe && breaks(code, token, list[first])) break;
    }
    first = at;
  }

  return { end: list[pipe].start, start: first < pipe ? list[first].start : list[pipe].start };
}

function rightOperand (code, list, from) {
  let depth = 0;
  let last  = from - 1;

  for (let at = from; at < list.length; at++) {
    const token = list[at];
    if (OPENERS.has(token.type)) { depth++; last = at; continue; }
    if (CLOSERS.has(token.type)) { if (depth === 0) break; depth--; last = at; continue; }
    if (depth === 0) {
      if (RIGHT_STOP.has(token.type) || isPipe(list, at) || isApply(list, at) || token.type === tt.eof) break;
      // a line break ends it, unless the next line continues the chain (. ?.)
      if (last >= from && breaks(code, list[last], token) && token.type !== tt.dot && token.type !== tt.questionDot) break;
    }
    last = at;
  }

  const start = list[from]?.start ?? code.length;
  return { end: last >= from ? list[last].end : start, first: from, last, start };
}

// ::: sugar :: apply

/*
the other way round: the left side is called with the right side. <| and :: are the same, two spellings
to try out side by side.

  fn <| value                     fn(value)
  fn :: value                     fn(value)
  RAT.app.hold <| load().catch <| toast.error
                                  RAT.app.hold(load().catch(toast.error))

it groups to the right (rightmost first) and binds tighter than |>: a |> f <| b is f(b)(a). a member
call keeps its object, the left side is written out as it is.
*/
function applies (code, offset = 0) {
  for (let round = 0; round < 1000; round++) {
    const list  = tokens(code, offset);
    const index = list.findLastIndex((_, at) => isApply(list, at));
    if (index < 0) return code;

    const left  = leftOperand(code, list, index);
    const right = rightOperand(code, list, index + 2);
    const fail  = message => new CompileError(message, { index: list[index].start + offset, source: ' '.repeat(offset) + code });

    const fn    = code.slice(left.start, left.end).trim();
    const value = code.slice(right.start, right.end).trim();
    const name  = code.slice(list[index].start, list[index + 1].end);
    if (!fn)    throw fail(`${name} has no left operand`);
    if (!value) throw fail(`${name} has no right operand`);

    const own = list.filter(token => token.start >= left.start && token.end <= left.end);
    code = code.slice(0, left.start) + (isChain(own) ? `${fn}(${value})` : `(${fn})(${value})`) + code.slice(right.end);
  }
  throw new Error('[rat] <| rewrite did not settle');
}

// names, dots and calls only (load().catch, a keyword after a dot is a name): called as it is, no parentheses
function isChain (list) {
  let depth = 0;
  for (const [at, token] of list.entries()) {
    if (OPENERS.has(token.type)) { depth++; continue; }
    if (CLOSERS.has(token.type)) { depth--; continue; }
    if (depth) continue;
    const member = token.type.keyword && (list[at - 1]?.type === tt.dot || list[at - 1]?.type === tt.questionDot);
    if (token.type !== tt.name && token.type !== tt.dot && token.type !== tt.questionDot && token.type !== tt._this && !member) return false;
  }
  return true;
}

const isTopic  = token => token.type === tt.name && token.value === TOPIC;
const isSimple = value => /^[\w$.]+$/.test(value);

function call (fn, value, list) {
  const topics = list.filter(isTopic);

  if (topics.length) {
    const base  = list[0].start;
    const bound = topics.length > 1 && !isSimple(value);
    const inner = bound ? BOUND : isSimple(value) ? value : `(${value})`;
    let out     = fn;
    for (const token of [...topics].reverse()) out = out.slice(0, token.start - base) + inner + out.slice(token.end - base);
    return bound ? `(${BOUND} => (${out}))(${value})` : out;
  }

  if (list.every(token => token.type === tt.name || token.type === tt.dot || token.type === tt.questionDot)) return `${fn}(${value})`;
  return `(${fn})(${value})`;
}

// ::: sugar :: topic

/*
# is not js (outside of #private names), so acorn's tokenizer stops at it. every
stop at a lone # becomes the placeholder name and the tokenizer runs again.
what is left after the pipes is a # outside of any pipe.
*/
const TOPIC = '$$topic';
const BOUND = '$$piped'; // the parameter a value used more than once is bound to

function topics (code, offset = 0) {
  for (let round = 0; round < 1000; round++) {
    try {
      tokens(code, 0);
      return code;
    } catch (error) {
      // acorn reports the position after the #
      const at = code[error.pos] === '#' ? error.pos : error.pos - 1;
      if (code[at] !== '#' || /[\w$]/.test(code[at + 1] ?? '')) { error.pos += offset; throw error; }
      code = code.slice(0, at) + TOPIC + code.slice(at + 1);
    }
  }
  throw new Error('[rat] topic rewrite did not settle');
}

function strayTopic (code, offset) {
  const token = tokens(code, offset).find(isTopic);
  if (token) throw new CompileError('# outside of a |> pipe', { index: token.start + offset, source: ' '.repeat(offset) + code });
  return code;
}

// ::: sugar :: range

/*
a..b is an inclusive range: 1..5, 5..1, 'a'..'e', 0..$count. an operand is a
number, a string, a name chain or a (group), anything larger goes in parens.
a..b becomes $$.range(a, b), a lazy range with array methods (@rat/runtime);
[a..b] alone in brackets becomes a real array (d-07). .. inside strings,
comments and ... is never touched.
*/
const OPERAND = String.raw`(?:\d[\d_]*(?:\.\d+)?|'[^'\n]*'|"[^"\n]*"|[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*|\([^()]*\))`;
const RANGE   = new RegExp(String.raw`((?<![\w$)\]])\[\s*)?(?<![\w$.])(${OPERAND})\s*(?<!\.)\.\.(?!\.)\s*(-?${OPERAND})(\s*\])?`, 'g');

function ranges (code, offset = 0, runtime = '$$') {
  // where .. must not be read: strings, templates, regexes, comments
  const blocked = [];
  const list    = tokens(code, offset);
  for (const token of list) if (token.type === tt.string || token.type === tt.template || token.type === tt.regexp) blocked.push([token.start, token.end]);
  for (const match of code.matchAll(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g)) {
    // only a comment if it does not start inside a string
    if (!blocked.some(([start, end]) => match.index >= start && match.index < end)) blocked.push([match.index, match.index + match[0].length]);
  }

  return code.replace(RANGE, (whole, open, from, to, close, at) => {
    const dots = at + whole.indexOf('..', (open ?? '').length + from.length);
    if (blocked.some(([start, end]) => dots >= start && dots < end)) return whole;
    const range = `${runtime}.range(${from}, ${to})`;
    return open && close ? `[...${range}]` : `${open ?? ''}${range}${close ?? ''}`;
  });
}

// ::: sugar :: named cases

/*
d-30, ideas 5. a case is a pattern with a name:

  case Loading = { status: 'loading' };
  case Failed  = { status: 'error', message };     message is a part it hands out
  case Adult   = { age } if age >= 18;             a guard, after the parts
  case Email   = string if #.includes('@');        # in a guard is the value

becomes a pattern of @rat/types (match.js), the test as data:

  const Failed = $$.pattern({ status: 'error', message: $$.part('message') });

`case` at the start of a statement is a syntax error in plain js, so the name is
free in compiled files. a capitalized name is required (`case Name =`), which
also keeps `case x = 1:` inside a switch what it was.

the pattern itself:
  { key: pattern, name }   an object; a shorthand or a lowercase name binds a part
  [a, b, ...rest]          an array, at least as long as its elements
  'x', 1, true, null       a literal
  string, number …         typeof
  Other, Num.range(0, 9)   another case, a schema, a class, a regexp: a test of its own
  a | b                    either, binding no parts
  _                        anything
  anything else            an expression, its value is the test
*/
const TYPES = new Map([['bigint', 'BigInt'], ['boolean', 'Boolean'], ['function', 'Function'], ['number', 'Number'], ['object', 'Object'], ['string', 'String'], ['symbol', 'Symbol']]);
const VALUE = '$$value';

// tokens that leave an expression open at the end of a line: the declaration goes on
const CONTINUES = new Set([tt.eq, tt._if, tt.comma, tt.dot, tt.questionDot, tt.question, tt.colon, tt.logicalAND, tt.logicalOR, tt.coalesce, tt.equality, tt.relational, tt.plusMin, tt.star, tt.slash, tt.modulo, tt.bitwiseAND, tt.bitwiseOR, tt.bitwiseXOR, tt.arrow]);

function caseDeclarations (code, offset = 0, found = new Map, runtime = '$$') {
  if (!/\bcase\b/.test(code)) return code;
  const list  = tokens(scannable(code), offset);
  const edits = [];
  const fail  = (message, at) => new CompileError(message, { index: at + offset, source: ' '.repeat(offset) + code });

  for (let at = 0; at < list.length; at++) {
    const token = list[at];
    const name  = list[at + 1];
    if (token.type !== tt._case || name?.type !== tt.name || list[at + 2]?.type !== tt.eq) continue;
    if (!/^[A-Z]/.test(name.value)) throw fail(`a named case starts with a capital: case ${name.value[0].toUpperCase()}${name.value.slice(1)} = …`, name.start);

    let depth = 0;
    let guard = null;
    let last  = at + 2;
    let next  = at + 3;
    for (; next < list.length; next++) {
      const item = list[next];
      if (item.type === tt.eof) break;
      if (depth === 0) {
        if (item.type === tt.semi) break;
        if (breaks(code, list[last], item) && !CONTINUES.has(list[last].type) && !CONTINUES.has(item.type)) break;
        if (item.type === tt._if && !guard) guard = next;
      }
      if (OPENERS.has(item.type)) depth++;
      else if (CLOSERS.has(item.type)) { if (depth === 0) break; depth--; }
      last = next;
    }

    const from    = list[at + 3]?.start ?? code.length;
    const end     = list[last].end;
    const pattern = code.slice(from, guard ? list[guard].start : end).trim();
    const test    = guard ? code.slice(list[guard].end, end).trim() : null;
    if (!pattern) throw fail(`case ${name.value} has no pattern`, list[at + 2].start);

    const compiled = compilePattern(pattern, { fail: message => fail(`${message} in case ${name.value}`, from), runtime });
    found.set(name.value, compiled.parts);

    edits.push({ end, pos: token.start, text: `const ${name.value} = ${patternCall(compiled, test, runtime)}` });
    at = last;
  }

  return applyEdits(code, edits);
}

// a function as replacement: '$$' in a replacement string would be read as one $
const topicOf = text => text.replace(/#(?![\w$\\])/g, () => VALUE);

// (value, parts) => code, # in code is the value
function arrow (code, parts) {
  const body = topicOf(code);
  if (parts.length)        return `(${VALUE}, { ${parts.join(', ')} }) => (${body})`;
  if (body.includes(VALUE)) return `(${VALUE}) => (${body})`;
  return `() => (${body})`;
}

const patternCall = ({ parts, test }, guard, runtime) => guard ? `${runtime}.pattern(${test}, ${arrow(guard, parts)})` : `${runtime}.pattern(${test})`;

// { test, parts }: the pattern as a test of @rat/types and the names of the parts it hands out
function compilePattern (code, { fail, runtime }) {
  let node;
  try { node = parseExpressionAt(code, 0, ACORN); }
  catch (error) { throw fail(reason(error)); }
  if (code.slice(node.end).trim()) throw fail('expected a single pattern');

  const parts = [];
  const text  = node => code.slice(node.start, node.end);

  const bind = name => {
    if (parts.includes(name)) throw fail(`the part "${name}" is bound twice`);
    parts.push(name);
    return `${runtime}.part('${name}')`;
  };

  function visit (node) {
    switch (node.type) {
      case 'ObjectExpression': {
        const entries = [];
        for (const property of node.properties) {
          if (property.type === 'SpreadElement') continue;
          if (property.computed) throw fail('a computed key can not be a pattern');
          const key = property.key.type === 'Identifier' ? property.key.name : String(property.key.value);
          entries.push(`${/^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key)}: ${property.shorthand ? bind(key) : visit(property.value)}`);
        }
        return entries.length ? `{ ${entries.join(', ')} }` : '{}';
      }
      case 'ArrayExpression': {
        const items = node.elements.map((element, index) => {
          if (!element) return `${runtime}.any`;
          if (element.type !== 'SpreadElement') return visit(element);
          if (index !== node.elements.length - 1) throw fail('...rest comes last');
          if (element.argument.type !== 'Identifier') return `${runtime}.rest()`;
          bind(element.argument.name);
          return `${runtime}.rest('${element.argument.name}')`;
        });
        return `[${items.join(', ')}]`;
      }
      case 'Identifier':
        if (node.name === '_')         return `${runtime}.any`;
        if (node.name === 'undefined') return 'undefined';
        if (TYPES.has(node.name))      return TYPES.get(node.name);
        if (/^[A-Z]/.test(node.name))  return node.name;
        return bind(node.name);
      case 'BinaryExpression':
        if (node.operator === '|') {
          const either = [];
          const flat   = side => side.type === 'BinaryExpression' && side.operator === '|' ? (flat(side.left), flat(side.right)) : either.push(side);
          flat(node);
          const tests = either.map(side => {
            const inner = compilePattern(text(side), { fail, runtime });
            if (inner.parts.length) throw fail('a pattern with | binds no parts');
            return inner.test;
          });
          return `${runtime}.either(${tests.join(', ')})`;
        }
        return `(${text(node)})`;
      default:
        return text(node);
    }
  }

  const test = visit(node);
  return { parts, test };
}

// ::: sugar :: match

/*
rat's switch, as an expression. arms are `pattern => result`, tried from the
top, the first that matches gives the result. without a value in parens it is
a function of one value:

  const label = match (event) {
    { type: 'user', name }     => `user ${name}`,      parts of the pattern are names in the result
    { age } if age >= 18       => 'adult',             a guard after the pattern
    Num.range(0, 255)          => `byte ${#}`,         a schema, a class, a predicate, a regexp: # is the value it let through
    Loading                    => 'loading …',         a named case
    'idle' | 'paused'          => 'waiting',           either
    _                          => 'unknown',           anything
  };

  const toElements = match {
    null    => [document.documentElement],
    string  => [...document.querySelectorAll(#)],
    _       => [],
  };

# in an arm is the value. no arm matches: undefined. `match (x) {` and
`match {` are syntax errors in plain js, the { has to be on the line of match
or its ). becomes a call of match from @rat/types:

  $$.match(event, [
    [{ type: 'user', name: $$.part('name') }, ($$value, { name }) => (`user ${name}`)],
    …
  ])
*/

// the arms of a match: [{ pattern, guard, body, at }], split at the top level commas
function armsOf (code, list, open, close, fail) {
  const arms = [];
  let depth  = 0;
  let from   = open + 1;
  for (let at = open + 1; at <= close; at++) {
    const token = list[at];
    if (at < close && OPENERS.has(token.type)) { depth++; continue; }
    if (at < close && CLOSERS.has(token.type)) { depth--; continue; }
    if (depth > 0 || (at < close && token.type !== tt.comma)) continue;
    if (from < at) {
      const arrow = list.slice(from, at).findIndex((item, index) => item.type === tt.arrow && level(list, from, from + index) === 0);
      if (arrow < 0) throw fail('an arm of match is pattern => result', list[from].start);
      const split = from + arrow;
      const guard = list.slice(from, split).findIndex((item, index) => item.type === tt._if && level(list, from, from + index) === 0);
      const head  = code.slice(list[from].start, list[guard < 0 ? split : from + guard].start).trim();
      arms.push({
        at      : list[from].start,
        body    : code.slice(list[split].end, list[at - 1].end).trim(),
        guard   : guard < 0 ? null : code.slice(list[from + guard].end, list[split].start).trim(),
        pattern : head,
      });
    }
    from = at + 1;
  }
  return arms;
}

// the bracket depth of index, counted from from
function level (list, from, index) {
  let depth = 0;
  for (let at = from; at < index; at++) {
    if (OPENERS.has(list[at].type)) depth++;
    else if (CLOSERS.has(list[at].type)) depth--;
  }
  return depth;
}

function armCode ({ at, body, guard, pattern }, { fail, runtime }) {
  const compiled = compilePattern(pattern, { fail: message => fail(`${message} in an arm of match`, at), runtime });
  const test     = guard ? patternCall(compiled, guard, runtime) : compiled.test;
  return `[${test}, ${arrow(body, compiled.parts)}]`;
}

function matchExpressions (code, offset = 0, runtime = '$$') {
  if (!/\bmatch\b/.test(code)) return code;
  const fail = (message, at) => new CompileError(message, { index: at + offset, source: ' '.repeat(offset) + code });

  // the last match first: a match inside the arms of another one comes later in the text
  for (let round = 0; round < 1000; round++) {
    const list  = tokens(scannable(code), offset);
    const found = list.map((token, at) => ({ at, token })).filter(({ at, token }) => {
      if (token.type !== tt.name || token.value !== 'match') return false;
      const before = list[at - 1];
      if (before && (before.type === tt.dot || before.type === tt.questionDot || before.type === tt._function)) return false;
      const next = list[at + 1];
      if (next?.type === tt.braceL) return !breaks(code, token, next);
      if (next?.type !== tt.parenL) return false;
      const end = closing(list, at + 1);
      return list[end + 1]?.type === tt.braceL && !breaks(code, list[end], list[end + 1]);
    }).at(-1);
    if (!found) return code;

    const { at } = found;
    const subject = list[at + 1].type === tt.parenL ? closing(list, at + 1) : null;
    const open    = subject === null ? at + 1 : subject + 1;
    const close   = closing(list, open);
    const value   = subject === null ? null : code.slice(list[at + 1].end, list[subject].start).trim();
    const arms    = armsOf(code, list, open, close, fail).map(arm => armCode(arm, { fail, runtime }));
    const call    = `${runtime}.match(${value ?? VALUE}, [${arms.join(', ')}])`;

    code = code.slice(0, list[at].start) + (value === null ? `((${VALUE}) => ${call})` : call) + code.slice(list[close].end);
  }
  throw new Error('[rat] match rewrite did not settle');
}

// ::: sugar :: is

/*
value is Case -> $$.is(value, Case). the left side is the postfix chain before
it ($user, item.state, list[0], f(x)), so `!a is B && c` reads as
!$$.is(a, B) && c. the right side is a name chain, optionally called, or a
(group). `is` stays a plain name everywhere else (obj.is(x), const is = …).
*/
const OPERAND_END = new Set([tt.name, tt.num, tt.string, tt.privateId, tt._this, tt._null, tt._true, tt._false, tt.parenR, tt.bracketR, tt.backQuote]);
const CHAIN       = new Set([tt.name, tt.num, tt.string, tt.privateId, tt._this, tt._null, tt._true, tt._false, tt._new, tt.dot, tt.questionDot, tt.template, tt.backQuote]);

// contextual keywords acorn reads as names: `await is(x)` calls a function named is
const CONTEXTUAL = new Set(['async', 'await', 'of', 'yield']);

// ) is ( is left alone: `if (a) is(b)` is a call after a condition, not a test
const isIs = (code, list, at) => {
  const token = list[at];
  const left  = list[at - 1];
  const right = list[at + 1];
  if (token.type !== tt.name || token.value !== 'is' || !left || !right) return false;
  if (!OPERAND_END.has(left.type) || breaks(code, left, token)) return false;
  if (left.type === tt.name && CONTEXTUAL.has(left.value)) return false;
  if (right.type === tt.parenL) return left.type !== tt.parenR;
  return right.type === tt.name;
};

function isOperator (code, offset = 0, runtime = '$$') {
  if (!/\bis\b/.test(code)) return code;
  for (let round = 0; round < 1000; round++) {
    const list  = tokens(code, offset);
    const index = list.findIndex((_, at) => isIs(code, list, at));
    if (index < 0) return code;

    let depth = 0;
    let first = index;
    for (let at = index - 1; at >= 0; at--) {
      const token = list[at];
      if (CLOSERS.has(token.type)) { depth++; first = at; continue; }
      if (OPENERS.has(token.type)) { if (depth === 0) break; depth--; first = at; continue; }
      if (depth === 0 && !CHAIN.has(token.type)) break;
      first = at;
    }

    let last = index + 1;
    if (list[last].type === tt.parenL) last = closing(list, last);
    else {
      while (list[last + 1]?.type === tt.dot && list[last + 2]?.type === tt.name) last += 2;
      if (list[last + 1]?.type === tt.parenL) last = closing(list, last + 1);
    }

    const value = code.slice(list[first].start, list[index].start).trim();
    const test  = code.slice(list[index + 1].start, list[last].end);
    code = code.slice(0, list[first].start) + `${runtime}.is(${value}, ${test})` + code.slice(list[last].end);
  }
  throw new Error('[rat] is rewrite did not settle');
}

// the index of the token closing the opener at index
function closing (list, index) {
  let depth = 0;
  for (let at = index; at < list.length; at++) {
    if (OPENERS.has(list[at].type)) depth++;
    else if (CLOSERS.has(list[at].type) && --depth === 0) return at;
  }
  return list.length - 2;
}

// ::: sugar :: for…of

// for (x of y) -> for (const x of y). the head ends at the first top level "of"
function forOf (code, offset = 0) {
  const list  = tokens(code, offset);
  const edits = [];

  for (let at = 0; at < list.length; at++) {
    if (list[at].type !== tt._for) continue;
    let open = at + 1;
    if (list[open]?.type === tt.name && list[open].value === 'await') open++;
    if (list[open]?.type !== tt.parenL) continue;

    const head = list[open + 1];
    if (!head || head.type === tt._var || head.type === tt._const || (head.type === tt.name && head.value === 'let')) continue;

    let depth = 0;
    for (let next = open + 1; next < list.length; next++) {
      const token = list[next];
      if (OPENERS.has(token.type)) depth++;
      else if (CLOSERS.has(token.type)) { if (depth-- === 0) break; }
      else if (depth === 0 && token.type === tt.semi) break;
      else if (depth === 0 && token.type === tt.name && token.value === 'of' && next > open + 1) {
        edits.push({ pos: head.start, text: 'const ' });
        break;
      }
    }
  }

  return applyEdits(code, edits);
}

/*
order matters: cases first (their guards own a #), match next (its arms own a #), # must be a name before anything
else tokenizes, ranges before pipes (1..5 |> sum), is before pipes (x |> # is A), <| before |> (it binds tighter).
cases: a map the named cases are collected in, name -> the parts they hand out
*/
const sugar = (code, offset = 0, cases = new Map) => {
  code = caseDeclarations(code, offset, cases);
  code = matchExpressions(code, offset);
  code = isOperator(ranges(topics(code, offset), offset), offset);
  return forOf(strayTopic(pipes(applies(code, offset), offset), offset), offset);
};

// sugar errors come from acorn's tokenizer, positioned but without a file
function sweeten (code, { cases, filename, offset = 0, source }) {
  try {
    return sugar(code, offset, cases);
  } catch (error) {
    if (error instanceof CompileError || error.pos == null) throw error;
    throw new CompileError(reason(error), { filename, index: error.pos, source });
  }
}

// ::: walking

// every child node with its parent and the key it sits under
function walk (node, visit, parent = null, key = null) {
  if (!node || typeof node.type !== 'string') return;
  if (visit(node, parent, key) === false) return;
  for (const name in node) {
    if (name === 'type' || name === 'start' || name === 'end') continue;
    const value = node[name];
    if (Array.isArray(value)) { for (const item of value) walk(item, visit, node, name); }
    else if (value && typeof value.type === 'string') walk(value, visit, node, name);
  }
}

// identifiers that introduce a name: declarations, params, catch clauses
function bindings (program) {
  const found = new Set;
  const mark  = pattern => walk(pattern, (node, parent, key) => {
    if (node.type === 'Identifier' && !(parent?.type === 'Property' && key === 'key' && !parent.shorthand)) found.add(node);
    if (node.type === 'AssignmentPattern') { mark(node.left); return false; }
    if (node.type === 'MemberExpression')  return false;
  });

  walk(program, node => {
    if (node.type === 'VariableDeclarator') mark(node.id);
    if (/Function/.test(node.type))         { node.params.forEach(mark); if (node.id) found.add(node.id); }
    if (node.type === 'CatchClause')        mark(node.param);
    if (node.type === 'ClassDeclaration' && node.id) found.add(node.id);
    if (/^Import\w*Specifier$/.test(node.type))     found.add(node.local);
  });

  return found;
}

// ::: reactive

const SKIP_KEYS = {
  BreakStatement     : ['label'],
  ContinueStatement  : ['label'],
  ExportSpecifier    : ['exported', 'local'],
  LabeledStatement   : ['label'],
  MetaProperty       : ['meta', 'property'],
  MethodDefinition   : ['key'],
  PropertyDefinition : ['key'],
};

// the .value edits for every read / write of a reactive name
function reads (root, names, skip = new Set) {
  const edits = [];

  walk(root, (node, parent, key) => {
    if (node.type !== 'Identifier' || !names.has(node.name) || skip.has(node)) return;
    if (parent?.type === 'MemberExpression' && key === 'property' && !parent.computed) return;
    if (parent && SKIP_KEYS[parent.type]?.includes(key) && !parent.computed) return;
    if (parent?.type === 'Property' && key === 'key' && !parent.computed) return;

    // { $x } -> { $x: $x.value }
    if (parent?.type === 'Property' && parent.shorthand && key === 'value') {
      edits.push({ pos: node.end, text: `: ${node.name}.value` });
      return;
    }

    edits.push({ pos: node.end, text: '.value' });
  });

  return edits;
}

// `new $Map`, `new $List(items)`: an instance of a reactive variant
const isVariant = init => init?.type === 'NewExpression' && init.callee.type === 'Identifier' && /^\$[A-Z]/.test(init.callee.name);

// top level `let $x = …` / `const $x = …`, as { edits, names, variants }. a let goes through $(),
// which picks the reactive variant of its value (a $List for an array, once @rat/types is loaded).
// a variant instance is no signal and gets no .value, it is used as written
function declarations (program, runtime, source, known = new Set) {
  const names    = new Set;
  const variants = new Set;
  const edits    = [];
  const skip     = new Set; // nodes that moved elsewhere, reads() leaves them alone

  // a default's code with .value for the reactive names known so far
  const codeOf = node => applyEdits(source.slice(node.start, node.end), reads(node, new Set([...known, ...names])).map(edit => ({ ...edit, pos: edit.pos - node.start })));

  // let { $filter, $size = 'm' } = this.props
  // -> let { "filter": $filter, "size": $size } = $$.signalsOf(this.props, { filter: null, size: () => ('m') })
  const destructure = (pattern, init) => {
    const defaults = [];
    for (const property of pattern.properties) {
      if (property.type !== 'Property' || property.computed) continue;
      const assigned = property.value.type === 'AssignmentPattern';
      const target   = assigned ? property.value.left : property.value;
      if (target.type !== 'Identifier' || !/^\$\w/.test(target.name)) continue;

      const key = property.shorthand ? target.name.slice(1) : property.key.name ?? String(property.key.value);
      defaults.push(`${JSON.stringify(key)}: ${assigned ? `() => (${codeOf(property.value.right)})` : 'null'}`);
      if (assigned) walk(property.value.right, node => { skip.add(node); });
      names.add(target.name);
      edits.push({ end: property.end, pos: property.start, text: `${JSON.stringify(key)}: ${target.name}` });
    }
    if (!defaults.length) return;
    edits.push({ order: -1, pos: init.start, text: `${runtime}.signalsOf(` });
    edits.push({ order: 1,  pos: init.end,   text: `, { ${defaults.join(', ')} })` });
  };

  for (const statement of program.body) {
    const declaration = statement.type === 'ExportNamedDeclaration' ? statement.declaration : statement;
    if (declaration?.type !== 'VariableDeclaration') continue;

    for (const declarator of declaration.declarations) {
      const { id, init } = declarator;
      if (id.type === 'ObjectPattern' && init) { destructure(id, init); continue; }
      if (id.type !== 'Identifier' || !id.name.startsWith('$') || id.name.length < 2) continue;
      if (isVariant(init)) { variants.add(id.name); continue; }
      names.add(id.name);

      if (declaration.kind === 'const') {
        if (!init) continue;
        edits.push({ order: -1, pos: init.start, text: `${runtime}.computed(() => (` });
        edits.push({ order: 1,  pos: init.end,   text: '))' });
      }
      else if (init) {
        edits.push({ order: -1, pos: init.start, text: `${runtime}.$(` });
        edits.push({ order: 1,  pos: init.end,   text: ')' });
      }
      else edits.push({ pos: id.end, text: ` = ${runtime}.$()` });
    }
  }

  return { edits, names, skip, variants };
}

// a variant binding changes through its methods. reassigned, whatever read it would keep the old object
function reassigned (program, variants) {
  let found = null;
  walk(program, node => {
    if (found) return false;
    const target = node.type === 'AssignmentExpression' ? node.left : node.type === 'UpdateExpression' ? node.argument : null;
    if (target?.type === 'Identifier' && variants.has(target.name)) found = target;
  });
  return found;
}

/*
the reactive declarations of a script as written, for tooling (the language
server): [{ name, kind, start, end, statement }], kind 'signal' (let, var),
'computed' (const) or 'variant' (= new $Map, either keyword). token based like
the sugar pass, so it reads code with |>, # and .. and code that does not parse
yet. offsets count from offset.
*/
function declared (code, offset = 0) {
  let list;
  try { list = tokens(code.replace(/#(?![\w$\\])/g, '_')); } catch { return []; }

  const out   = [];
  let   depth = 0;

  for (let index = 0; index < list.length; index++) {
    const token = list[index];
    if (OPENERS.has(token.type)) { depth++; continue; }
    if (CLOSERS.has(token.type)) { depth--; continue; }
    if (depth) continue;

    const kind = token.type === tt._const ? 'computed' : token.type === tt._var || (token.type === tt.name && token.value === 'let') ? 'signal' : null;
    if (!kind) continue;

    // the declarators of this statement: a name after the keyword or after a comma on its level
    let expectName = true;
    let local      = 0;
    let next       = index + 1;
    for (; next < list.length; next++) {
      const item = list[next];
      if (expectName) {
        // let { $filter, size } = …: the $names of the pattern
        if (item.type === tt.braceL) {
          const close = closing(list, next);
          for (let at = next + 1; at < close; at++) {
            const name = list[at];
            if (name.type === tt.name && name.value[0] === '$' && name.value.length > 1 && [tt.braceL, tt.comma, tt.colon].includes(list[at - 1].type) && [tt.comma, tt.braceR, tt.eq].includes(list[at + 1]?.type)) {
              out.push({ end: name.end + offset, kind: 'signal', name: name.value, start: name.start + offset, statement: token.start + offset });
            }
          }
          next = close;
          expectName = false;
          continue;
        }
        if (item.type === tt.name && item.value[0] === '$' && item.value.length > 1) {
          const variant = list[next + 1]?.type === tt.eq && list[next + 2]?.type === tt._new && /^\$[A-Z]/.test(list[next + 3]?.value ?? '');
          out.push({ end: item.end + offset, kind: variant ? 'variant' : kind, name: item.value, start: item.start + offset, statement: token.start + offset });
        }
        expectName = false;
        continue;
      }
      if (OPENERS.has(item.type)) local++;
      else if (CLOSERS.has(item.type)) { if (!local) break; local--; }
      else if (!local && item.type === tt.comma) expectName = true;
      else if (!local && (item.type === tt.semi || breaks(code, list[next - 1], item) && (item.type.keyword || item.value === 'let'))) break;
    }
    index = next - 1;
  }

  return out;
}

function parseOrFail (code, { filename, offset, source }) {
  try {
    return parseProgram(code, ACORN);
  } catch (error) {
    throw new CompileError(reason(error), { filename, index: offset + (error.pos ?? 0), source });
  }
}

/*
a <script> or <script module> block, or a whole .rat.js file.
names: the reactive names already known (from <script module>), extended in place.
cases: the named cases found, extended in place (name -> the parts they hand out).
sheets: given, the `style …` statements are cut out and collected there (style.js).
returns { code, imports, program } — imports only split off when lift is set.
*/
// $count = 0 at the top level of a .rat script is let $count = 0: the first assignment to a $name
// declared nowhere at the top level. const stays written, a computed is never implied
function implicitLet (code, options) {
  const program  = parseOrFail(code, options);
  const declared = new Set;
  for (const node of program.body) {
    if (node.type === 'VariableDeclaration') for (const { id } of node.declarations) if (id.type === 'Identifier') declared.add(id.name);
    if (node.type === 'FunctionDeclaration' || node.type === 'ClassDeclaration') declared.add(node.id?.name);
    if (node.type === 'ImportDeclaration') for (const { local } of node.specifiers) declared.add(local.name);
  }

  const edits = [];
  for (const node of program.body) {
    const { expression: assignment } = node;
    if (node.type !== 'ExpressionStatement' || assignment.type !== 'AssignmentExpression' || assignment.operator !== '=') continue;
    const { name, type } = assignment.left;
    if (type !== 'Identifier' || !/^\$\w/.test(name) || declared.has(name)) continue;
    declared.add(name);
    edits.push({ end: node.start, pos: node.start, text: 'let ' });
  }
  return edits.length ? applyEdits(code, edits) : code;
}

function transformScript (code, { cases = new Map, filename, lift = false, names = new Set, offset = 0, runtime = '$$', sheets, source = code, extraEdits } = {}) {
  let   sugared  = sweeten     (code,    { cases, filename, offset, source });
  if (!filename?.endsWith('.js')) sugared = implicitLet(sugared, { filename, offset, source });
  if (sheets) {
    const statements = styleStatements(sugared);
    sheets.push(...statements.found.map(sheet => ({ ...sheet, index: sheet.index + offset })));
    sugared = statements.code;
  }
  const program  = parseOrFail (sugared, { filename, offset, source });
  const declared = declarations(program, runtime, sugared, names);

  for (const name of declared.names) names.add(name);

  // an imported $name is a signal of another module, read and written the same way ($List and the other
  // $Names are classes and stay as written)
  for (const node of program.body) {
    if (node.type !== 'ImportDeclaration') continue;
    for (const { local } of node.specifiers) if (/^\$[a-z_]/.test(local.name)) names.add(local.name);
  }

  const target = reassigned(program, declared.variants);
  if (target) throw new CompileError(`${target.name} is a reactive variant, it changes through its methods and is not reassigned`, { filename, index: offset + target.start, source });

  const edits   = [...declared.edits, ...reads(program, names, new Set([...bindings(program), ...declared.skip]))];
  const imports = [];

  for (const node of program.body) {
    if (lift && node.type === 'ImportDeclaration') {
      imports.push(sugared.slice(node.start, node.end));
      edits.push({ end: node.end, pos: node.start, text: '' });
    }
    else if (lift && node.type.startsWith('Export')) {
      throw new CompileError('an export goes in <script module>, the component body has none', { filename, index: offset + node.start, source });
    }
    else if (!lift && node.type === 'ExportDefaultDeclaration' && filename.endsWith('.rat')) {
      throw new CompileError('the markup is the default export, <script module> cannot have one', { filename, index: offset + node.start, source });
    }
  }

  if (extraEdits) edits.push(...extraEdits(program, sugared, names, cases));

  return { code: applyEdits(sugared, edits), imports, program };
}

// a single expression from the markup: a hole, a condition, an attribute value
function transformExpression ({ code, start }, { filename, names, source }) {
  const sugared = sweeten(code, { filename, offset: start, source });
  let node;

  try {
    node = parseExpressionAt(sugared, 0, ACORN);
  } catch (error) {
    throw new CompileError(reason(error), { filename, index: start + (error.pos ?? 0), source });
  }

  if (sugared.slice(node.end).trim()) {
    throw new CompileError('expected a single expression', { filename, index: start + node.end, source });
  }

  return applyEdits(sugared.slice(0, node.end), reads(node, names, bindings(node)));
}

// :::::: EXPORT

export { 
  TOPIC, 
  applies, bindings, caseDeclarations, declared, forOf, isOperator, pipes, ranges, sugar, topics, walk,
  transformExpression, transformScript,
};

