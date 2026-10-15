// @rat/compiler :: util

import { tokenizer, tokTypes as tt } from 'acorn';

const ACORN = { ecmaVersion: 'latest', sourceType: 'module' };

// ::: errors

function locate (source, index) {
  const lines = source.slice(0, index).split('\n');
  return { column: lines[lines.length - 1].length + 1, line: lines.length };
}

class CompileError extends SyntaxError {
  constructor (message, { filename = 'component.rat', index = 0, source = '' } = {}) {
    const { column, line } = locate(source, index);
    super(`[rat] ${message} (${filename}:${line}:${column})`);
    Object.assign(this, { column, filename, index, line, reason: message });
  }
}

// acorn appends " (line:column)" to its messages, we bring our own
const reason = error => error.message.replace(/ \(\d+:\d+\)$/, '');

// ::: tokens

// acorn's tokenizer is lazy and does not validate grammar, so it reads code
// with |> (two tokens: | and >) and stops wherever we stop asking
function tokens (code, offset = 0) {
  const out = [];
  try {
    for (const token of tokenizer(code, ACORN)) out.push(token);
  } catch (error) {
    error.pos = (error.pos ?? 0) + offset;
    throw error;
  }
  return out;
}

// a lone # (the pipe placeholder) is no js token. scanning only needs the shape of the
// code, so it becomes a name of the same length and every position stays true
const scannable = code => code.replace(/#(?![\w$\\])/g, '_');

const OPEN  = new Set([tt.braceL, tt.bracketL, tt.parenL, tt.dollarBraceL]);
const CLOSE = new Set([tt.braceR, tt.bracketR, tt.parenR]);

// finds the token that closes the current level: } for a hole, ) for a
// condition. returns its index in source
function scanClose (source, start, close = tt.braceR) {
  let depth = 0;
  try {
    for (const token of tokenizer(scannable(source.slice(start)), ACORN)) {
      if (OPEN.has(token.type)) depth++;
      else if (CLOSE.has(token.type)) {
        if (depth === 0) {
          if (token.type !== close) return { error: `unexpected ${source[start + token.start]}`, index: start + token.start };
          return { index: start + token.start };
        }
        depth--;
      }
    }
  } catch (error) {
    return { error: reason(error), index: start + (error.pos ?? 0) };
  }
  return { error: 'unexpected end of input', index: source.length };
}

// the first token of a given type on the top level, e.g. the { opening a @case body
function scanUntil (source, start, type) {
  let depth = 0;
  try {
    for (const token of tokenizer(scannable(source.slice(start)), ACORN)) {
      if (depth === 0 && token.type === type) return { index: start + token.start };
      if (OPEN.has(token.type)) depth++;
      else if (CLOSE.has(token.type)) depth--;
      if (depth < 0) break;
    }
  } catch (error) {
    return { error: reason(error), index: start + (error.pos ?? 0) };
  }
  return { error: 'unexpected end of input', index: source.length };
}

// the end of a @case value: a { or : on the top level, or the end of its line
function scanCase (source, start) {
  let depth = 0;
  let last  = start;
  try {
    for (const token of tokenizer(scannable(source.slice(start)), ACORN)) {
      const at = start + token.start;
      if (depth === 0 && source.slice(last, at).includes('\n')) return { index: last };
      if (depth === 0 && (token.type === tt.braceL || token.type === tt.colon)) return { index: at };
      if (OPEN.has(token.type)) depth++;
      else if (CLOSE.has(token.type)) depth--;
      last = start + token.end;
    }
  } catch (error) {
    return { error: reason(error), index: start + (error.pos ?? 0) };
  }
  return { index: source.length };
}

// ::: edits

// edits never overlap: { pos, end = pos, text, order = 0 }. same pos sorts by order
function applyEdits (code, edits) {
  const sorted = [...edits].sort((a, b) => a.pos - b.pos || (a.order ?? 0) - (b.order ?? 0));
  let out    = '';
  let cursor = 0;
  for (const { end, pos, text } of sorted) {
    out   += code.slice(cursor, pos) + text;
    cursor = Math.max(cursor, end ?? pos);
  }
  return out + code.slice(cursor);
}

// ::: names

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;

const key = name => IDENTIFIER.test(name) ? name : JSON.stringify(name);

// todo-list.rat -> TodoList
function nameOf (filename) {
  const base = filename.split(/[\\/]/).pop().replace(/\.rat(\.js)?$/, '');
  const name = base.replace(/(^|[-_.\s]+)(\w)/g, (_, __, char) => char.toUpperCase());
  return IDENTIFIER.test(name) ? name : 'Component';
}

export { ACORN, CompileError, IDENTIFIER, applyEdits, key, nameOf, reason, scanCase, scanClose, scanUntil, scannable, tokens, tt };
