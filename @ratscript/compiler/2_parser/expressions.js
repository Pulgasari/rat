// @ratscript/compiler/parser/expressions.js

import { ASTNode } from './../utils.js';
import { advance, peek, peekNext, previous, isToken, matchToken, consumeToken } from './state.js';

const COMPOUND_ASSIGN_OPERATORS = ['+=','-=','*=','/=','%=','<<=','>>=','>>>=','&=','^=','|='];

// :::::: Entry Point

export function parseExpression () {
  return parsed.Assignment;
}

// ::::::

export function parseAssignment () {
  const expr = parsed.Pipe;

  if (matchToken('=')) {
    const right = parsed.Assignment;
    return ASTNode.AssignmentExpression({ left: expr, right });
  }

  for (const op of COMPOUND_ASSIGN_OPERATORS) {
    if (matchToken(op)) {
      const right = parsed.Assignment;
      return ASTNode.CompoundAssignmentExpression({ operator: op, left: expr, right });
    }
  }

  return expr;
}

// Pipe (a |> b(...) |> c(_, x) |> ...)
export function parsePipe () {
  let left = parsed.TraitUse;

  while (matchToken('|>')) {
    const step = parsed.TraitUse;
    left = buildPipeStep(left, step);
  }

  return left;
}

// Bewusst NICHT exportiert: nimmt Parameter entgegen statt vom Token-Stream zu lesen ->
// ist kein Grammatik-Einstiegspunkt, sondern reiner AST-Baustein.
function buildPipeStep (left, step) {
  // Bare Identifier ohne Klammern -> impliziter Aufruf: `x |> fn1` -> `fn1(x)`
  // Falls 'fn1' eigentlich ein Getter statt eines Funktionswerts wäre, crasht das zur
  // Laufzeit zurecht - das ist so gewollt und kümmert uns hier nicht.
  if (step.type === 'Identifier') {
    return ASTNode.CallExpression({ expr: step, args: [left], namedArgs: null });
  }

  if (step.type !== 'CallExpression') {
    throw new SyntaxError(`Pipe-Ziel muss ein Funktionsname oder Funktionsaufruf sein, nicht '${step.type}'.`);
  }

  if (step.namedArgs) {
    const hasPlaceholder = step.namedArgs.some(a => a.value.type === 'PipePlaceholder');
    if (!hasPlaceholder) {
      throw new SyntaxError(`Pipe-Schritt mit Named Arguments braucht einen '_'-Platzhalter (z.B. 'fn(x: _)').`);
    }
    const namedArgs = step.namedArgs.map(a =>
      a.value.type === 'PipePlaceholder' ? { name: a.name, value: left } : a
    );
    return ASTNode.CallExpression({ expr: step.expr, args: [], namedArgs });
  }

  const placeholderCount = step.args.filter(a => a.type === 'PipePlaceholder').length;

  if (placeholderCount > 0) {
    const args = step.args.map(a => a.type === 'PipePlaceholder' ? left : a);
    return ASTNode.CallExpression({ expr: step.expr, args, namedArgs: null });
  }

  // Kein Platzhalter -> Fallback wie im alten Regex-Compiler: leere Klammern '()'
  // bekommen den gepipten Wert als einzigen Arg, sonst wird er vorne angehängt.
  const args = step.args.length === 0 ? [left] : [left, ...step.args];
  return ASTNode.CallExpression({ expr: step.expr, args, namedArgs: null });
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
