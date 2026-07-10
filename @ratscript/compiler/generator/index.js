// @ratscript/compiler/generator/index.js
//
// Zentraler Dispatcher: node.type -> generate-Funktion.
// statements.js/declarations.js/expressions.js importieren `generate` von
// hier zurück (für verschachtelte Knoten) -> zyklischer Import, funktioniert
// in ESM problemlos, weil die Funktionen erst zur Laufzeit aufgerufen werden.

import {
  generateProgram,
  generateExpressionStatement,
  generateBlockStatement,
  generateForStatement,
  generateSiftStatement,
  generateMoldStatement,
} from './statements.js';

import {
  generateAliasDeclaration,
  generateFunctionDeclaration,
  generateTraitDeclaration,
} from './declarations.js';

import {
  generateIdentifier,
  generateLiteral,

  generateAssignmentExpression,
  generateCallExpression,
  generateMemberExpression,
  generateRangeExpression,
  generateTraitUseExpression,
} from './expressions.js';

const generators = {
  Program              : generateProgram,
  Identifier           : generateIdentifier,
  Literal              : generateLiteral,

  // Declarations
  FunctionDeclaration  : generateFunctionDeclaration,
  TraitDeclaration     : generateTraitDeclaration,
  
  // Expressions
  CallExpression       : generateCallExpression,
  AssignmentExpression : generateAssignmentExpression,
  RangeExpression      : generateRangeExpression,
  TraitUseExpression   : generateTraitUseExpression,

  // Statements
  ExpressionStatement  : generateExpressionStatement,
  BlockStatement       : generateBlockStatement,
  ForStatement         : generateForStatement,
  SiftStatement        : generateSiftStatement,
  MoldStatement        : generateMoldStatement,
};

export function generate (node) {
  if (!node) return '';

  const fn = generators[node.type];
  if (!fn) throw new Error(`[Generator-Fehler]: Unbekannter AST-Knoten-Typ "${node.type}"`);

  return fn(node);
}
