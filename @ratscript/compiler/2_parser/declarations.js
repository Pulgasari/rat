// @ratscript/compiler/parser/declarations.js

import { ASTNode } from './../utils.js';
import { advance, isToken, matchToken, consumeToken } from './state.js';
import { parsed } from './index.js';

import { parseExpression, parsePrimary } from './expressions.js';
import { parseBlock } from './statements.js';

// alias <source> as <name>;   
// alias <name> = <source>;
export function parseAliasDeclaration () {
  advance(); // 'alias'

  // Erst mal nur einen einfachen Identifier/Member-Chain lesen (kein '=', kein 'as' -> parsePrimary reicht,
  // KEIN parseExpression, sonst würde parseAssignment das '=' schon vorzeitig selbst konsumieren).
  const first = parsed.Primary;

  // Form 1: alias database.users.save as saveUser;
  if (matchToken('as')) {
    const aliasNameToken = consumeToken('IDENTIFIER');
    matchToken(';'); // optionales Semikolon, wie in den Docs-Beispielen

    return ASTNode.AliasDeclaration({
      name     : aliasNameToken.value,
      source   : first,
      autoBind : first.type === 'MemberExpression', // nur bei Dot-Chain automatisch binden
    });
  }

  // Form 2: alias saveCustom = database.users.save.bind(alternativeContext);
  if (matchToken('=')) {
    if (first.type !== 'Identifier') {
      const token = peek();
      throw new SyntaxError(`[Parser ${token.line}:${token.column}]: 'alias <name> = ...' erwartet einen einfachen Namen vor '=', kein Member-Chain.`);
    }
    const source = parsed.Expression;
    matchToken(';');

    return ASTNode.AliasDeclaration({ name: first.name, source, autoBind: false }); // volle Kontrolle -> nie autoBind
  }

  const token = peek();
  throw new SyntaxError(`[Parser ${token.line}:${token.column}]: Erwarte 'as' oder '=' nach 'alias' (Gefunden: '${token.value}')`);
}

// :::::: fn name (args) use Trait { ... }
export function parseFunctionDeclaration () {
  advance(); // 'fn'
  const nameToken = consumeToken('IDENTIFIER');

  consumeToken('(');
  const params = [];
  if (!isToken(')')) {
    do {
      params.push(consumeToken('IDENTIFIER').value);
    } while (matchToken(','));
  }
  consumeToken(')');

  // Optionale Traits via 'use' abfangen
  const traits = [];
  if (isToken('use')) {
    advance(); // 'use'
    traits.push(consumeToken('IDENTIFIER').value);
  }

  const body = parsed.Block;
  return ASTNode.FunctionDeclaration({ name: nameToken.value, params, traits, body });
}

// :::::: trait Name { ... }
export function parseTraitDeclaration () {
  advance(); // 'trait'
  const nameToken = consumeToken('IDENTIFIER');
  const body      = parsed.Block;
  return ASTNode.TraitDeclaration({ name: nameToken.value, body });
}

// :::::: let/const/var <id | {pattern}> = <init>?;

export function parseVariableDeclaration () {
  const kindToken = advance(); // 'let' | 'const' | 'var'

  const id = isToken('{')
    ? parsed.ObjectPattern
    : ASTNode.Identifier({ name: consumeToken('IDENTIFIER').value });

  let init = null;
  if (matchToken('=')) {
    init = parsed.Expression;
  }
  matchToken(';');

  return ASTNode.VariableDeclaration({ kind: kindToken.value, id, init });
}

function parseObjectPattern () {
  consumeToken('{');
  const properties = [];

  if (!isToken('}')) {
    do {
      const keyToken = consumeToken('IDENTIFIER');
      let valueName = keyToken.value;

      if (isToken('as')) {
        advance(); // 'as'
        valueName = consumeToken('IDENTIFIER').value;
      }

      properties.push({ key: keyToken.value, value: valueName });
    } while (matchToken(','));
  }

  consumeToken('}');
  return ASTNode.ObjectPattern({ properties });
}
