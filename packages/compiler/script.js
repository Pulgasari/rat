// @rat/compiler :: script

/*
the js side. two steps, in this order:

  sugar     text level, token based: |> and for…of without a declaration.
            acorn cannot parse |>, so this runs before anything is parsed
  reactive  ast level: declared $names become signals / computeds, every
            read and write of one gets .value. only insertions, so edits
            never collide and positions stay simple
*/

import { parse as parseProgram, parseExpressionAt } from 'acorn';

import { ACORN, CompileError, applyEdits, reason, tokens, tt } from './util.js';

// ::: sugar :: pipe

// tokens the left operand of |> never reaches past (on its own bracket level)
const LEFT_STOP  = new Set([tt.comma, tt.semi, tt.eq, tt.assign, tt.arrow, tt.question, tt.colon, tt._return, tt._throw, tt._case, tt._else, tt._do, tt.ellipsis]);
const RIGHT_STOP = new Set([tt.comma, tt.semi, tt.question, tt.colon]);
const OPENERS    = new Set([tt.parenL, tt.bracketL, tt.braceL, tt.dollarBraceL]);
const CLOSERS    = new Set([tt.parenR, tt.bracketR, tt.braceR]);

const isPipe = (list, index) =>
  list[index]?.type === tt.bitwiseOR && list[index + 1]?.value === '>' && list[index].end === list[index + 1].start;

// a line break between two tokens
const breaks = (code, a, b) => code.slice(a.end, b.start).includes('\n');

/*
value |> fn          fn(value)
value |> fn(a)       fn(value, a)
value |> obj.fn      obj.fn(value)
value |> (x => x)    (x => x)(value)

one pipe per round, leftmost first, so a |> f |> g becomes g(f(a)).
*/
function pipes (code, offset = 0) {
  for (let round = 0; round < 1000; round++) {
    const list  = tokens(code, offset);
    const index = list.findIndex((_, at) => isPipe(list, at));
    if (index < 0) return code;

    const left  = leftOperand(code, list, index);
    const right = rightOperand(code, list, index + 2);

    const value = code.slice(left.start, left.end).trim();
    const fn    = code.slice(right.start, right.end).trim();
    if (!value) throw new CompileError('|> has no left operand', { index: list[index].start + offset, source: ' '.repeat(offset) + code });
    if (!fn)    throw new CompileError('|> has no right operand', { index: list[index].start + offset, source: ' '.repeat(offset) + code });

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
      if (LEFT_STOP.has(token.type) || isPipe(list, at)) break;
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
      if (RIGHT_STOP.has(token.type) || isPipe(list, at) || token.type === tt.eof) break;
      // a line break ends it, unless the next line continues the chain (. ?.)
      if (last >= from && breaks(code, list[last], token) && token.type !== tt.dot && token.type !== tt.questionDot) break;
    }
    last = at;
  }

  const start = list[from]?.start ?? code.length;
  return { end: last >= from ? list[last].end : start, first: from, last, start };
}

function call (fn, value, list) {
  const names = list.every(token => token.type === tt.name || token.type === tt.dot || token.type === tt.questionDot);
  if (names) return `${fn}(${value})`;

  // ends in a call: insert the value as first argument
  const last = list[list.length - 1];
  if (last?.type === tt.parenR) {
    let depth = 0;
    let open  = -1;
    for (let at = list.length - 1; at >= 0; at--) {
      if (list[at].type === tt.parenR) depth++;
      if (list[at].type === tt.parenL && --depth === 0) { open = at; break; }
    }
    const callee = list.slice(0, open);
    if (open > 0 && callee.every(token => token.type === tt.name || token.type === tt.dot || token.type === tt.questionDot)) {
      const base   = list[0].start;
      const paren  = list[open].end - base;
      const empty  = list[open + 1].type === tt.parenR;
      return fn.slice(0, paren) + value + (empty ? '' : ', ') + fn.slice(paren);
    }
  }

  return `(${fn})(${value})`;
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

const sugar = (code, offset = 0) => forOf(pipes(code, offset), offset);

// sugar errors come from acorn's tokenizer, positioned but without a file
function sweeten (code, { filename, offset = 0, source }) {
  try {
    return sugar(code, offset);
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

// top level `let $x = …` / `const $x = …`, as { names, edits }
function declarations (program, runtime) {
  const names = new Set;
  const edits = [];

  for (const statement of program.body) {
    const declaration = statement.type === 'ExportNamedDeclaration' ? statement.declaration : statement;
    if (declaration?.type !== 'VariableDeclaration') continue;

    for (const declarator of declaration.declarations) {
      const { id, init } = declarator;
      if (id.type !== 'Identifier' || !id.name.startsWith('$') || id.name.length < 2) continue;
      names.add(id.name);

      if (declaration.kind === 'const') {
        if (!init) continue;
        edits.push({ order: -1, pos: init.start, text: `${runtime}.computed(() => (` });
        edits.push({ order: 1,  pos: init.end,   text: '))' });
      }
      else if (init) {
        edits.push({ order: -1, pos: init.start, text: `${runtime}.signal(` });
        edits.push({ order: 1,  pos: init.end,   text: ')' });
      }
      else edits.push({ pos: id.end, text: ` = ${runtime}.signal()` });
    }
  }

  return { edits, names };
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
returns { code, imports, program } — imports only split off when lift is set.
*/
function transformScript (code, { filename, lift = false, names = new Set, offset = 0, runtime = '$$', source = code, extraEdits } = {}) {
  const sugared  = sweeten(code, { filename, offset, source });
  const program  = parseOrFail(sugared, { filename, offset, source });
  const declared = declarations(program, runtime);

  for (const name of declared.names) names.add(name);

  const edits   = [...declared.edits, ...reads(program, names, bindings(program))];
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

  if (extraEdits) edits.push(...extraEdits(program, sugared, names));

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

export { pipes, forOf, sugar, transformExpression, transformScript, walk };
