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
  generateVariableDeclaration
} from './declarations.js';

import {
  generateIdentifier,
  generateLiteral,

  generateAssignmentExpression,
  generateCallExpression,
  generateMemberExpression,
  generateRangeExpression,
  generateTraitUseExpression,

  generateObjectPattern,
} from './expressions.js';

const generators = {
  Program              : generateProgram,
  Identifier           : generateIdentifier,
  Literal              : generateLiteral,

  // Declarations
  FunctionDeclaration  : generateFunctionDeclaration,
  TraitDeclaration     : generateTraitDeclaration,
  VariableDeclaration  : generateVariableDeclaration,
  
  // Expressions
  CallExpression       : generateCallExpression,
  CompoundAssignmentExpression : generateCompoundAssignmentExpression,
  AssignmentExpression : generateAssignmentExpression,
  RangeExpression      : generateRangeExpression,
  TraitUseExpression   : generateTraitUseExpression,

  // Patterns
  ObjectPattern        : generateObjectPattern,

  // Placeholders
  PipePlaceholder      : generatePipePlaceholder,

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
