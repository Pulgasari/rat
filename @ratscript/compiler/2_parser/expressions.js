// @ratscript/compiler/parser/expressions.js

import { ASTNode } from './../utils.js';
import { advance, peek, peekNext, previous, isToken, matchToken, consumeToken } from './state.js';

const COMPOUND_ASSIGN_OPERATORS = ['+=','-=','*=','/=','%=','<<=','>>=','>>>=','&=','^=','|='];
// Bewusst ausgeklammert (eigene Ebenen bzw. später): Assignment-Operatoren, Pipe,
// Range ('..' bleibt die eigene, dedizierte Node), 'is'/'in'/'inc'.
const EXCLUDED_FROM_GENERIC = new Set([
  '=','+=','-=','*=','/=','%=','<<=','>>=','>>>=','&=','^=','|=',
  '|>', '..', 'in',
]);
const UNARY_OPERATORS = [
  { token: '+',      operator: 'unary+' },
  { token: '-',      operator: 'unary-' },
  { token: '!',      operator: '!'      },
  { token: '~',      operator: '~'      },
  { token: 'typeof', operator: 'typeof' },
  { token: 'void',   operator: 'void'   },
  { token: 'delete', operator: 'delete' },
];

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
    if (!hasPlaceholder) throw new SyntaxError(`Pipe-Schritt mit Named Arguments braucht einen '_'-Platzhalter (z.B. 'fn(x: _)').`);
    const namedArgs = step.namedArgs.map(
      a => a.value.type === 'PipePlaceholder' ? { name: a.name, value: left } : a
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
export function parseTraitUse () {
  let expr = parsed.BinaryExpression;
  if (isToken('use')) {
    advance(); // 'use'
    const traitNames = [consumeToken('IDENTIFIER').value];
    while (matchToken(',')) {
      traitNames.push(consumeToken('IDENTIFIER').value);
    }
    expr = ASTNode.TraitUseExpression({ expr, traitNames });
  }
  return expr;
}

// :::::: Range (From '..' To)
export function parseRange () {
  let from = parsed.Primary;
  return matchToken('..')
    ? ASTNode.RangeExpression({ from, to: parsed.Primary })
    : from;
}

export function parseTemplateLiteral () {
  const token = advance(); // JSX_TEMPLATE or TEMPLATE_STRING
  const quasis = [];
  const expressions = [];

  for (const segment of token.value) {
    if (segment.kind === 'string') {
      quasis.push(segment.value);
    } else {
      pushState(segment.tokens);
      expressions.push(parsed.Expression);
      popState();
    }
  }

  return ASTNode.TemplateLiteral({ quasis, expressions });
}

// :::::: Unary (rechtsassoziativ, z.B. !!x)
export function parseUnary () {
  if (isToken('await')) {
    advance();
    const argument = parsed.Unary;
    return ASTNode.AwaitExpression({ argument });
  }

  if (isToken('yield')) {
    advance();
    let argument = null;
    if (!isToken(';') && !isToken(')') && !isToken('}') && !isEOF()) {
      argument = parsed.Unary;
    }
    return ASTNode.YieldExpression({ argument });
  }

  for (const { token, operator } of UNARY_OPERATORS) {
    if (isToken(token)) {
      advance();
      const argument = parsed.Unary;
      return ASTNode.UnaryExpression({ operator, argument });
    }
  }
  return parsed.Range;
}

// todo: problem wegen argument + export lösen
export function parseBinaryExpression (minPrecedence = 0) {
  let left = parsed.Unary;
  //let left = parser.parse('Unary');

  while (true) {
    const match = matchBinaryOperator(minPrecedence); if (!match) break;
    const right = parseBinaryExpression(match.precedence + 1);

    switch (match.operator) {
      case 'inc' : left = ASTNode.IncExpression ({ left, right }); break;
      case 'is'  : left = ASTNode.IsExpression  ({ left, right }); break;
      default    : left = ASTNode.BinaryExpression({ operator: match.operator, left, right });
    }
  }

  return left;
}

// :::::: match [(cond1, cond2, ...)] { key(s): value, ... }
// -- EXPRESSION, liefert einen Wert
export function parseMatchExpression () {
  advance(); // 'match'

  let discriminants = [];
  if (matchToken('(')) {
    discriminants = [parsed.Expression];
    while (matchToken(',')) discriminants.push(parsed.Expression);
    consumeToken(')');
  }

  consumeToken('{');
  const cases = parseMatchCases(discriminants.length > 1, false); // false = keine Block-Values erlaubt
  consumeToken('}');

  const isAsync = cases.some(c => containsAwait(c.value));
  return ASTNode.MatchExpression({ discriminants, cases, isAsync });
}

// :::::: INTERNAL HELPERS

function containsAwait (node) {
  if (!node || typeof node !== 'object') return false;
  if (node.type === 'AwaitExpression') return true;
  return Object.values(node).some(v => Array.isArray(v) ? v.some(containsAwait) : containsAwait(v));
}

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

// :::::: Binär-Operatoren via Precedence-Climbing (nutzt die Tabelle aus meta.js direkt,
// statt für jede Präzedenzstufe eine eigene handgeschriebene Funktion zu brauchen)
function matchBinaryOperator (minPrecedence) {
  for (const [op, info] of Object.entries(operators)) {
    if (EXCLUDED_FROM_GENERIC.has(op)) continue;
    if (info.precedence < minPrecedence) continue;
    if (isToken(op)) {
      advance();
      return { operator: op, precedence: info.precedence };
    }
  }
  return null;
}
