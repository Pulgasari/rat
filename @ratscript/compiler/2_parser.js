s// @ratscript/compiler/parser.js

// :::::: IMPORTS

import { keywords, operators, puncts, TokenType } from './meta.js';
import * as nodes from './nodes.js';
import { ASTNode } from './utils.js';

// :::::: HELPERS

function resolveTokenQuery (typeOrValue, maybeValue) {
  return (maybeValue !== undefined)
    ? { type: typeOrValue, value: maybeValue }
    : TOKEN_MAP.get(typeOrValue) ?? null;
}

// :::::: THE PARSER

// ::: TokenMap

const TOKEN_MAP = new Map();
for (const value of keywords)               TOKEN_MAP.set(value, { value, type: TokenType.KEYWORD  });
for (const value of puncts)                 TOKEN_MAP.set(value, { value, type: TokenType.PUNCT    });
for (const value of Object.keys(operators)) TOKEN_MAP.set(value, { value, type: TokenType.OPERATOR });

// ::: State

let current;
let tokens;

// ::: Methods | Consume + Navigate

function advance  () { if (!isEOF()) current++; return previous(); }
function peek     () { return tokens[current]; }
function previous () { return tokens[current - 1]; }
function isEOF    () { return isToken('EOF'); }

function consumeToken (typeOrValue, maybeValue, message) {
  if (isToken(typeOrValue, maybeValue)) return advance();
  const token = peek();
  const query = resolveTokenQuery(typeOrValue, maybeValue);
  throw new SyntaxError(`[Parser ${token.line}:${token.column}]: ${message || `Erwarte '${query?.value}'`} (Gefunden: '${token.value}')`);
}
function isToken (typeOrValue, maybeValue) {
  const query = resolveTokenQuery(typeOrValue, maybeValue);
  if (!query) return false;

  const token = peek();
  return token.type  === query.type 
      && token.value === query.value;
}
function matchToken (typeOrValue, maybeValue) {
  if (isToken(typeOrValue, maybeValue)) {
    advance();
    return true;
  }
  return false;
}

// ::: Methods | Parsing

function parse () {
  const body = [];
  while (!isEOF()) body.push(parseStatement());
  return ASTNode.Program({ body });
}

function parseActionBlock () { // Hilfsmethode für Kaskaden-Aktionen (Erlaubt Einzeiler oder { Blöcke })
  if (matchToken('{')) {
    const statements = [];
    while (!isToken('}') && !isEOF()) {
      statements.push(parseStatement());
    }
    consumeToken('}');
    return create.Block({ statements });
  }
  return create.Block({ statements: [parseStatement()] });
}

function parseAssignment () {
  const expr = parseTraitUse();
  if (matchToken('=')) {
    const value = parseAssignment();
    return { type: 'AssignmentExpression', left: expr, right: value };
  }
  return expr;
}

function parseExpression () {
  return parseAssignment();
}

function parseExpressionStatement () {
  const expr = parseExpression();
  matchToken(':');
  return create.ExpressionStatement({ expr });
}

function parseForStatement () {
  advance(); // 'for'
  consumeToken('(');

  let initializer = null;
  let isNaked     = true;

  // Erkennung ob Standard-Loop oder Naked-Loop
  if (isToken('KEYWORD') && ['let', 'const', 'var'].includes(this.peek().value)) {
    // Standard JS Loop
    isNaked = false;
    initializer = parseExpression(); // Für den Prototyp als Expression abgefangen
  } else {
    // RatScript Naked Loop (z.B. 1..10 oder ein nacktes Array)
    initializer = parseExpression();
  }

  consumeToken(')');
  consumeToken('{');
  const bodyStatements = [];
  while (!isToken('}') && !isEOF()) {
    bodyStatements.push(parseStatement());
  }
  consumeToken('}');

  return AST.ForStatement({ initializer, isNaked, body: AST.Block({ body: bodyStatements }) });
}

function parseStatement () {
  if (isToken('KEYWORD')) {
    switch (peek().value) {
      case 'sift'  : return parseSiftStatement();
      case 'mold'  : return parseMoldStatement();
      case 'trait' : return parseTraitDeclaration();
      case 'fn'    : return parseFunctionDeclaration();
      case 'for'   : return parseForStatement();
    }
  }
  return parseExpressionStatement();
}

parseMoldStatement () { // mold(target) { init: ..., cond: ... }
  advance(); // 'mold'
  consumeToken('(');
    const targetExpr = parseExpression();
    consumeToken(')');
    consumeToken('{');

    let init = null, cases = [], catchBlock = null, finallyBlock = null;

    while (!isToken('}') && !isEOF()) {
      const keyToken = advance();
      consumeToken(';');
      const action = parseActionBlock();

           if (keyToken.value === 'init')                  init = action;
      else if (keyToken.value === 'finally')       finallyBlock = action;
      else if (keyToken.value.startsWith('catch'))   catchBlock = action;
      else cases.push({ condition: nodes.createIdentifier(keyToken.value), body: action });
    }

    consumeToken('}');
    return create.MoldStatement({ targetExpr, init, cases, catchBlock, finallyBlock });
  }

// fn name(args) use Trait { ... }
function parseFunctionDeclaration () {
  advance(); // 'fn'
  const nameToken = consumeToken('IDENTIFIER');
    
  consumeToken('(');
  const params = [];
  if (!isToken(')')) {
    do {
      params.push(consumeToken('IDENTIFIER').value);
    } while (matchToken(';')); // Einfaches Splitting über Kommata/Doppelpunkte ignorieren wir flexibel
  }
  consumeToken(')');

  // Optionale Traits via 'use' abfangen
  const traits = [];
  if (isToken('use')) {
    advance(); // 'use'
    traits.push(consumeToken('IDENTIFIER').value);
  }

  consumeToken('{');
  const bodyStatements = [];
  while (!isToken('}') && !isEOL()) {
    bodyStatements.push(parseStatement());
  }
  consumeToken('}');

  return create.FunctionDeclaration({ name: nameToken.value, params, traits, body: create.Block(bodyStatements) });
}

// trait Name { ... }
function parseTraitDeclaration () {
  advance(); // 'trait'
  const nameToken = consumeToken('IDENTIFIER');
  consumeToken('{');
    
  const bodyStatements = [];
  while (!isToken('}') && !isEOF()) {
    bodyStatements.push(parseStatement());
  }
    
  consumeToken('}');
  return create.TraitDeclaration({ name: nameToken.value, body: create.Block(bodyStatements) });
}

function parseTraitUse () { // Expression 'use' TraitName
    let expr = parseRange();
    if (isToken('use')) {
      advance(); // 'use'
      const traitName = consumeToken('IDENTIFIER').value;
      expr = create.TraitUseExpression({ expr, traitName });
    }
    return expr;
  }

  
function parseRange() { // From '..' To
  let expr = parsePrimary();
  if (matchToken('..')) {
    const toExpr = parsePrimary();
    return create.RangeExpression({ expr, toExpr });
  }
  return expr;
}

function parsePrimary () {
  if (matchToken('NUMBER')) {
    return AST.Literal({ type: 'NUMBER', value: previous().value });
  }
  if (matchToken('STRING')) {
    return AST.Literal({ type: 'STRING', value: previous().value });
  }
  if (matchToken('IDENTIFIER')) {
    let expr = AST.Identifier({ name: previous().value });
      
    // Member-Zugriffe (z.B. console.log) oder Funktionsaufrufe () kaskadieren
    while (true) {
      if (matchToken('(')) {
        const args = [];
        if (!isToken(')')) {
            do {
              args.push(parseExpression());
            } while (matchToken(':')); // einfaches Argument-Splitting
          }
          consumeToken(')');
          expr = AST.CallExpression({ expr, args });
        } 
        else break;
      }
      return expr;
    }

  const token = peek();
  throw new SyntaxError(`[Parser ${token.line}:${token.column}]: Unerwartetes Token '${token.value}' beim Parsen eines Ausdrucks.`);
}

// sift { init: ..., cond: ... }
function parseSiftStatement () {
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
    else cases.push({ condition: nodes.createIdentifier(keyToken.value), body: action });
  }

  consumeToken('}');
  return nodes.createSiftStatement(init, cases, catchBlock, finallyBlock);
  return createNode('SiftStatement', { init, cases, catchBlock, finallyBlock });
  return create.SiftStatement({ init, cases, catchBlock, finallyBlock });
  return node.SiftStatement({ init, cases, catchBlock, finallyBlock });
}

// ::: EXPORT PARSER OBJECT

export default Parser = function (tokens) {
  consumeToken,
  isToken,
  matchToken,

  check,
  consume,
  match,

  check,
  eat,
  match,

  parser.check,
  parser.eat,
  parser.match,

  TKN.is,
  TKN.expect,
  TKN.match,

  consumeToken,
  isToken,
  matchToken,
};
