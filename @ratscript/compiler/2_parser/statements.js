// @ratscript/compiler/parser/statements.js

import { ASTNode } from './../utils.js';
import { parsed } from './index.js';
import { advance, peek, isToken, isEOF, matchToken, consumeToken } from './state.js';

// :::::: Dispatcher

export function parseStatement () {
  if (isToken('KEYWORD')) {
    switch (peek().value) {
      case 'alias' : return parsed.AliasDeclaration;
      case 'const' : return parsed.VariableDeclaration;
      case 'fn'    : return parsed.FunctionDeclaration;
      case 'for'   : return parsed.ForStatement;
      case 'if'    : return parsed.IfStatement;
      case 'let'   : return parsed.VariableDeclaration;
      case 'mold'  : return parsed.MoldStatement;
      case 'sift'  : return parsed.SiftStatement;
      case 'trait' : return parsed.TraitDeclaration;
      case 'var'   : return parsed.VariableDeclaration;
      case 'while' : return parsed.WhileStatement;
    }
  }
  return parsed.ExpressionStatement;
}

// :::::: Block-Helpers
// (werden von statements.js UND declarations.js gebraucht -> hier zentral)

export function parseBlock () {
  consumeToken('{');
  const body = parsed.Body;
  consumeToken('}');
  return ASTNode.BlockStatement({ body });
}

export function parseActionBlock () {
  if (matchToken('{')) {
    const body = parsed.Body;
    consumeToken('}');
    return ASTNode.BlockStatement({ body });
  }
  return ASTNode.BlockStatement({ body: [parsed.Statement] });
}

export function parseConditionTest () {
  const expr = parsed.Expression;
  if (isToken('as')) {
    advance(); // 'as'
    const name = consumeToken('IDENTIFIER').value;
    return ASTNode.AsBindingExpression({ expr, name });
  }
  return expr;
}

// :::::: ExpressionStatement

export function parseExpressionStatement () {
  const expr = parsed.Expression;
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
    initializer = parsed.Expression; // Für den Prototyp als Expression abgefangen
  } else {
    // RatScript Naked Loop (z.B. 1..10 oder ein nacktes Array)
    initializer = parsed.Expression;
  }

  consumeToken(')');

  const body = parsed.Block;
  return ASTNode.ForStatement({ initializer, isNaked, body });
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
