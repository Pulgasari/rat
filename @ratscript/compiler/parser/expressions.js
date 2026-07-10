// @ratscript/compiler/parser/expressions.js

import { ASTNode } from './../utils.js';
import { advance, peek, previous, isToken, matchToken, consumeToken } from './state.js';

// :::::: Entry Point

export function parseExpression () {
  return parseAssignment();
}

// :::::: Assignment

export function parseAssignment () {
  const expr = parseTraitUse();
  if (matchToken('=')) {
    const right = parseAssignment();
    return ASTNode.AssignmentExpression({ left: expr, right });
  }
  return expr;
}

// :::::: 'use' Trait

export function parseTraitUse () { // Expression 'use' TraitName
  let expr = parseRange();
  if (isToken('use')) {
    advance(); // 'use'
    const traitName = consumeToken('IDENTIFIER').value;
    expr = ASTNode.TraitUseExpression({ expr, traitName });
  }
  return expr;
}

// :::::: Range (From '..' To)

export function parseRange () {
  let from = parsePrimary();
  if (matchToken('..')) {
    const to = parsePrimary();
    return ASTNode.RangeExpression({ from, to });
  }
  return from;
}

// :::::: Primary (Literale, Identifier, Calls)

export function parsePrimary () {
  if (matchToken('NUMBER')) {
    return ASTNode.Literal({ type: 'NUMBER', value: previous().value });
  }
  if (matchToken('STRING')) {
    return ASTNode.Literal({ type: 'STRING', value: previous().value });
  }
  if (matchToken('IDENTIFIER')) {
    let expr = ASTNode.Identifier({ name: previous().value });

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
        expr = ASTNode.CallExpression({ expr, args });
      } else {
        break;
      }
    }

    return expr;
  }

  const token = peek();
  throw new SyntaxError(`[Parser ${token.line}:${token.column}]: Unerwartetes Token '${token.value}' beim Parsen eines Ausdrucks.`);
}
