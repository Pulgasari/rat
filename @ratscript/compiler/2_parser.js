s// @ratscript/compiler/parser.js

// :::::: IMPORTS

import { keywords, operators, puncts, TokenType } from './meta.js';
import * as nodes from './nodes.js';

// :::::: HELPERS

function createNode (type, properties = {}) {
  return {
    type,
    ...properties
  };
}

function resolveTokenQuery (typeOrValue, maybeValue) {
  return (maybeValue !== undefined)
    ? { type: typeOrValue, value: maybeValue }
    : TOKEN_MAP.get(typeOrValue) ?? null;
}

// :::::: THE PARSER

// ::: TokenMap

const TOKEN_MAP = new Map();
for (const value of keywords) TOKEN_MAP.set(value, { value, type: TokenType.KEYWORD });
for (const value of puncts)   TOKEN_MAP.set(value, { value, type: TokenType.PUNCT   });
for (const value of Object.keys(operators)) {
  TOKEN_MAP.set(value, { type: TokenType.OPERATOR, value });
}

// ::: State

let current;
let tokens;

// ::: Methods | Consume + Navigate

function peek     () { return tokens[current]; }
function previous () { return tokens[current - 1]; }
function isEOF    () { return isToken('EOF'); }

function advance () {
    if (!isEOF()) current++;
    return previous();
}
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

function parse() {
  const statements = [];
  while (!isEOF()) statements.push(parseStatement());
  return nodes.createProgram(statements);
}

function parseActionBlock () { // Hilfsmethode für Kaskaden-Aktionen (Erlaubt Einzeiler oder { Blöcke })
  if (matchToken('{')) {
    const statements = [];
    while (!isToken('}') && !isEOF()) {
      statements.push(parseStatement());
    }
    consumeToken('}');
    return nodes.createBlock(statements);
  }
  return nodes.createBlock([ parseStatement() ]);
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
  matchToken(':'); // optionales Semikolon schlucken
  return nodes.createExpressionStatement(expr);
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

    return nodes.createForStatement(initializer, isNaked, nodes.createBlock(bodyStatements));
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
    return nodes.createMoldStatement(targetExpr, init, cases, catchBlock, finallyBlock);
  }

// fn name(args) use Trait { ... }
function parseFunctionDeclaration () {
  advance(); // 'fn'
  const nameToken = consumeToken('IDENTIFIER', "Erwarte Funktionsnamen.");
    
  consumeToken('(');
  const params = [];
  if (!isToken(')')) {
    do {
      params.push(consumeToken('IDENTIFIER', "Erwarte Parametername.").value);
    } while (matchToken(';')); // Einfaches Splitting über Kommata/Doppelpunkte ignorieren wir flexibel
  }
  consumeToken(')');

  // Optionale Traits via 'use' abfangen
  const traits = [];
  if (isToken('use')) {
    advance(); // 'use'
    traits.push(consumeToken('IDENTIFIER', "Erwarte Trait-Name nach 'use'.").value);
  }

  consumeToken('{');
  const bodyStatements = [];
  while (!isToken('}') && !isEOL()) {
    bodyStatements.push(parseStatement());
  }
  consumeToken('}');

  return nodes.createFunctionDeclaration(nameToken.value, params, traits, nodes.createBlock(bodyStatements));
}

// trait Name { ... }
function parseTraitDeclaration () {
  advance(); // 'trait'
  const nameToken = consumeToken('IDENTIFIER', "Erwarte Name des Traits.");
  consumeToken('{');
    
  const bodyStatements = [];
  while (!isToken('}') && !isEOF()) {
    bodyStatements.push(parseStatement());
  }
    
  consumeToken('}');
  return nodes.createTraitDeclaration(nameToken.value, nodes.createBlock(bodyStatements));
}

function parseTraitUse () { // Expression 'use' TraitName
    let expr = parseRange();
    if (isToken('use')) {
      advance(); // 'use'
      const traitName = consumeToken('IDENTIFIER', "Erwarte Trait-Name nach 'use'.").value;
      expr = nodes.createTraitUseExpression(expr, traitName);
    }
    return expr;
  }

  
function parseRange() { // From '..' To
  let expr = parsePrimary();
  if (matchToken('..')) {
    const toExpr = parsePrimary();
    return nodes.createRangeExpression(expr, toExpr);
  }
  return expr;
}

function parsePrimary () {
  if (matchToken('NUMBER')) {
    return nodes.createLiteral('NUMBER', previous().value);
  }
  if (matchToken('STRING')) {
    return nodes.createLiteral('STRING', previous().value);
  }
  if (matchToken('IDENTIFIER')) {
    let expr = nodes.createIdentifier(previous().value);
      
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
          expr = nodes.createCallExpression(expr, args);
        } 
        else break;
      }
      return expr;
    }

  const token = peek();
  throw new SyntaxError(`[Parser ${token.line}:${token.column}]: Unerwartetes Token '${token.value}' beim Parsen eines Ausdrucks.`);
}

// sift { init: ..., cond: ... }
parseSiftStatement () {
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
}

// ::: EXPORT PARSER OBJECT

export default Parser = function (tokens) {
  consumeToken,
  isToken,
  matchToken,
};
