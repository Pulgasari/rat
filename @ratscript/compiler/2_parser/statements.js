// @ratscript/compiler/parser/statements.js

import { ASTNode } from './../utils.js';
import { parseBody } from './index.js';
import { advance, peek, isToken, isEOF, matchToken, consumeToken } from './state.js';
import { parseAliasDeclaration, parseFunctionDeclaration, parseTraitDeclaration } from './declarations.js';
import { parseExpression } from './expressions.js';

// :::::: Dispatcher

export function parseStatement () {
  if (isToken('KEYWORD')) {
    switch (peek().value) {
      case 'alias' : return parseAliasDeclaration();
      case 'fn'    : return parseFunctionDeclaration();
      case 'for'   : return parseForStatement();
      case 'mold'  : return parseMoldStatement();
      case 'sift'  : return parseSiftStatement();
      case 'trait' : return parseTraitDeclaration();
    }
  }
  return parseExpressionStatement();
}

// :::::: Block-Helpers
// (werden von statements.js UND declarations.js gebraucht -> hier zentral)

export function parseBlock () {
  consumeToken('{');
  const body = parseBody();
  consumeToken('}');
  return ASTNode.BlockStatement({ body });
}

export function parseActionBlock () {
  if (matchToken('{')) {
    const body = parseBody();
    consumeToken('}');
    return ASTNode.BlockStatement({ body });
  }
  return ASTNode.BlockStatement({ body: [parseStatement()] });
}

// :::::: ExpressionStatement

export function parseExpressionStatement () {
  const expr = parseExpression();
  matchToken(':');
  return ASTNode.ExpressionStatement({ expr });
}

// :::::: for (...) { ... }

export function parseForStatement () {
  advance(); // 'for'
  consumeToken('(');

  let initializer = null;
  let isNaked     = true;

  // Erkennung ob Standard-Loop oder Naked-Loop
  if (isToken('KEYWORD') && ['let', 'const', 'var'].includes(peek().value)) {
    // Standard JS Loop
    isNaked = false;
    initializer = parseExpression(); // Für den Prototyp als Expression abgefangen
  } else {
    // RatScript Naked Loop (z.B. 1..10 oder ein nacktes Array)
    initializer = parseExpression();
  }

  consumeToken(')');

  const body = parseBlock();
  return ASTNode.ForStatement({ initializer, isNaked, body });
}

// :::::: sift { init: ..., cond: ... }

export function parseSiftStatement () {
  advance(); // 'sift'
  consumeToken('{');

  let init = null, cases = [], catchBlock = null, finallyBlock = null;

  while (!isToken('}') && !isEOF()) {
    const keyToken = advance();
    consumeToken(':');
    const action = parseActionBlock();

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
  const targetExpr = parseExpression();
  consumeToken(')');
  consumeToken('{');

  let init = null, cases = [], catchBlock = null, finallyBlock = null;

  while (!isToken('}') && !isEOF()) {
    const keyToken = advance();
    consumeToken(':');
    const action = parseActionBlock();

         if (keyToken.value === 'init')                  init = action;
    else if (keyToken.value === 'finally')       finallyBlock = action;
    else if (keyToken.value.startsWith('catch'))   catchBlock = action;
    else cases.push({ condition: ASTNode.Identifier({ name: keyToken.value }), body: action });
  }

  consumeToken('}');
  return ASTNode.MoldStatement({ targetExpr, init, cases, catchBlock, finallyBlock });
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
