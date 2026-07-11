// @ratscript/compiler/parser/expressions.js

import { ASTNode } from './../utils.js';
import { advance, peek, peekNext, previous, isToken, matchToken, consumeToken } from './state.js';

// :::::: Entry Point

export function parseExpression () {
  return parsed.Assignment;
}

// :::::: Assignment

export function parseAssignment () {
  const expr = parsed.TraitUse;
  if (matchToken('=')) {
    const right = parsed.Assignment;
    return ASTNode.AssignmentExpression({ left: expr, right });
  }
  return expr;
}

// :::::: 'use' Trait

export function parseTraitUse () { // Expression 'use' TraitName
  let expr = parsed.Range;
  if (isToken('use')) {
    advance(); // 'use'
    const traitName = consumeToken('IDENTIFIER').value;
    expr = ASTNode.TraitUseExpression({ expr, traitName });
  }
  return expr;
}

// :::::: Range (From '..' To)

export function parseRange () {
  let from = parsed.Primary;
  if (matchToken('..')) {
    const to = parsed.Primary;
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
      if (matchToken('.')) {
        const propToken = consumeToken('IDENTIFIER');
        expr = ASTNode.MemberExpression({ object: expr, property: propToken.value });
      } 
      else if (matchToken('(')) {
        const { args, namedArgs } = parsed.CallArguments;
        expr = ASTNode.CallExpression({ expr, args, namedArgs });
      }
      else break;
    }

    return expr;
  }

  const token = peek();
  throw new SyntaxError(`[Parser ${token.line}:${token.column}]: Unerwartetes Token '${token.value}' beim Parsen eines Ausdrucks.`);
}

// :::::: INTERNAL HELPERS

// :::::: Call-Argumente: positional ODER named ('key: value', komma-getrennt)
// Beide Formen dürfen NICHT gemischt werden (der Runtime-Helper _fn erwartet entweder
// reine Positional-Args ODER ein einzelnes { __isNamed: true, ... }-Objekt).

expoet function parseCallArguments () {
  const args = [];
  const namedArgs = [];

  if (!isToken(')')) {
    do {
      if (isToken('IDENTIFIER') && peekNext()?.value === ':') {
        const nameToken = advance();
        consumeToken(':');
        namedArgs.push({ name: nameToken.value, value: parsed.Expression });
      } else {
        args.push(parsed.Expression);
      }
    } while (matchToken(','));
  }
  consumeToken(')');

  if (namedArgs.length && args.length) {
    const token = peek();
    throw new SyntaxError(`[Parser ${token.line}:${token.column}]: Named und positionale Argumente können nicht gemischt werden.`);
  }

  return namedArgs.length ? { args: [], namedArgs } : { args, namedArgs: null };
}
