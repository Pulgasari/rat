// @ratscript/compiler/parser/declarations.js

import { ASTNode } from './../utils.js';
import { advance, isToken, matchToken, consumeToken } from './state.js';
import { parseBlock } from './statements.js';

// alias <source> as <name>;   
// alias <name> = <source>;
export function parseAliasDeclaration () {
  advance(); // 'alias'

  // Erst mal nur einen einfachen Identifier/Member-Chain lesen (kein '=', kein 'as' -> parsePrimary reicht,
  // KEIN parseExpression, sonst würde parseAssignment das '=' schon vorzeitig selbst konsumieren).
  const first = parsePrimary();

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
    const source = parseExpression();
    matchToken(';');

    return ASTNode.AliasDeclaration({ name: first.name, source, autoBind: false }); // volle Kontrolle -> nie autoBind
  }

  const token = peek();
  throw new SyntaxError(`[Parser ${token.line}:${token.column}]: Erwarte 'as' oder '=' nach 'alias' (Gefunden: '${token.value}')`);
}

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
