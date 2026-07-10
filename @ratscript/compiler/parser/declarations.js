// @ratscript/compiler/parser/declarations.js

import { advance, isToken, matchToken, consumeToken } from './state.js';
import { ASTNode } from '../utils.js';
import { parseBlock } from './statements.js';

// :::::: fn name(args) use Trait { ... }

export function parseFunctionDeclaration () {
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

  const body = parseBlock();

  return ASTNode.FunctionDeclaration({ name: nameToken.value, params, traits, body });
}

// :::::: trait Name { ... }

export function parseTraitDeclaration () {
  advance(); // 'trait'
  const nameToken = consumeToken('IDENTIFIER');
  const body      = parseBlock();
  return ASTNode.TraitDeclaration({ name: nameToken.value, body });
}
