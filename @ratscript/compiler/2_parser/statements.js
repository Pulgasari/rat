// @ratscript/compiler/parser/statements.js

import { ASTNode } from './../utils.js';
import { parsed } from './index.js';
import { advance, peek, isToken, isEOF, matchToken, consumeToken } from './state.js';

// :::::: ExpressionStatement

export function parseExpressionStatement () {
  const expr = parsed.Expression;
  matchToken(':');
  return ASTNode.ExpressionStatement({ expr });
}

export function parseBreakStatement () {
  advance(); // 'break'
  let label = null;
  if (isToken('IDENTIFIER')) label = advance().value;
  matchToken(';');
  return ASTNode.BreakStatement({ label });
}

export function parseContinueStatement () {
  advance(); // 'continue'
  let label = null;
  if (isToken('IDENTIFIER')) label = advance().value;
  matchToken(';');
  return ASTNode.ContinueStatement({ label });
}

// :::::: for (...) { ... }
export function parseForStatement () {
  advance(); // 'for'
  consumeToken('(');

  let id = null, kind = null;

  // for (let n of <iterable>) { ... }
  if (isToken('KEYWORD') && ['let', 'const', 'var'].includes(peek().value)) {
    kind = advance().value;
    id = ASTNode.Identifier({ name: consumeToken('IDENTIFIER').value });
    consumeToken('IDENTIFIER', 'of'); // 'of' ist kontextuell, kein globales Keyword
  }
  // sonst: naked for (<iterable>) { ... } -> kein id/kind

  const iterable = parsed.Expression;
  consumeToken(')');
  const body = parsed.Block;

  return ASTNode.ForStatement({ id, kind, iterable, body });
}

export function parseIfStatement () {
  advance(); // 'if'
  consumeToken('(');
  const test = parsed.ConditionTest;
  consumeToken(')');

  const consequent = parsed.Block;

  let alternate = null;
  if (isToken('else')) {
    advance(); // 'else'
    alternate = isToken('if') ? parsed.IfStatement : parsed.Block;
  }

  return ASTNode.IfStatement({ test, consequent, alternate });
}

// :::::: sift { init: ..., cond: ... }

export function parseSiftStatement () {
  advance(); // 'sift'
  consumeToken('{');

  let init = null, cases = [], catchBlock = null, finallyBlock = null;

  while (!isToken('}') && !isEOF()) {
    const keyToken = advance();
    consumeToken(':');
    const action = parsed.ActionBlock;

         if (keyToken.value === 'init')                  init = action;
    else if (keyToken.value === 'finally')       finallyBlock = action;
    else if (keyToken.value.startsWith('catch'))   catchBlock = action;
    else cases.push({ condition: ASTNode.Identifier({ name: keyToken.value }), body: action });
  }

  consumeToken('}');
  return ASTNode.SiftStatement({ init, cases, catchBlock, finallyBlock });
}

// :::::: mold(target) { init: ..., cond: ... }

export function parseMoldStatement () {
  advance(); // 'mold'
  consumeToken('(');
  const targetExpr = parsed.Expression;
  consumeToken(')');
  consumeToken('{');

  let init = null, cases = [], catchBlock = null, finallyBlock = null;

  while (!isToken('}') && !isEOF()) {
    const keyToken = advance();
    consumeToken(':');
    const action = parsed.ActionBlock;

         if (keyToken.value === 'init')                  init = action;
    else if (keyToken.value === 'finally')       finallyBlock = action;
    else if (keyToken.value.startsWith('catch'))   catchBlock = action;
    else cases.push({ condition: ASTNode.Identifier({ name: keyToken.value }), body: action });
  }

  consumeToken('}');
  return ASTNode.MoldStatement({ targetExpr, init, cases, catchBlock, finallyBlock });
}

// :::::: return <expr>?;
export function parseReturnStatement () {
  advance(); // 'return'

  let argument = null;
  if (!isToken(';') && !isToken('}') && !isEOF()) {
    argument = parsed.Expression;
  }
  matchToken(';');

  return ASTNode.ReturnStatement({ argument });
}

// try           [{...}|stmt] 
// catch   [(e)] [{...}|stmt]? 
// finally       [{...}|stmt]?
export function parseTryStatement () {
  advance(); // 'try'
  const block = parsed.ActionBlock; // erlaubt Block ODER Einzeiler (wie schon bei sift/mold)

  let handlerParam = null;
  let handler = null;
  let finalizer = null;

  if (isToken('catch')) {
    advance(); // 'catch'
    if (matchToken('(')) {
      handlerParam = consumeToken('IDENTIFIER').value;
      consumeToken(')');
    }
    handler = parsed.ActionBlock;
  }

  if (isToken('finally')) {
    advance(); // 'finally'
    finalizer = parsed.ActionBlock;
  }

  return ASTNode.TryStatement({ block, handlerParam, handler, finalizer });
}

export function parseWhileStatement () {
  advance(); // 'while'
  consumeToken('(');
  const test = parsed.ConditionTest;
  consumeToken(')');
  const body = parsed.Block;
  return ASTNode.WhileStatement({ test, body });
}

/*
export function parseBlock () {
  consumeToken('{');
  const body = [];
  while (!isToken('}') && !isEOF()) {
    body.push(parseStatement());
  }
  consumeToken('}');
  return ASTNode.BlockStatement({ body });
}

export function parseActionBlock () { // Hilfsmethode für Kaskaden-Aktionen (Erlaubt Einzeiler oder { Blöcke })
  if (matchToken('{')) {
    const body = [];
    while (!isToken('}') && !isEOF()) {
      body.push(parseStatement());
    }
    consumeToken('}');
    return ASTNode.BlockStatement({ body });
  }
  return ASTNode.BlockStatement({ body: [parseStatement()] });
}
*/
