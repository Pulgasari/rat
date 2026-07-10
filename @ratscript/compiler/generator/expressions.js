// @ratscript/compiler/generator/expressions.js

import { generate } from './index.js';

export function generateIdentifier (node) {
  return node.name;
}

export function generateLiteral (node) {
  if (node.type === 'STRING') return JSON.stringify(node.value);
  return String(node.value);
}

// ::::::

export function generateAssignmentExpression (node) {
  return `${generate(node.left)} = ${generate(node.right)}`;
}

export function generateCallExpression (node) {
  const args = node.args.map(generate).join(', ');
  return `${generate(node.expr)}(${args})`;
}

export function generateMemberExpression (node) {
  return `${generate(node.object)}.${node.property}`;
}

// RangeExpression (z.B. `1..10`) hat für sich genommen kein direktes JS-Äquivalent
// -> aktuell nur sinnvoll als Initializer eines Naked-For-Loops, wo generateForStatement
// gezielt .from/.to ausliest, statt generate() auf den ganzen Range-Knoten anzuwenden.
// Sobald Ranges auch standalone (z.B. `let r = 1..10`) unterstützt werden sollen,
// braucht's hier eine Design-Entscheidung (Array? Lazy-Iterator? Runtime-Helper?).
export function generateRangeExpression (node) {
  throw new Error('[Generator-Fehler]: RangeExpression wird aktuell nur innerhalb von "for"-Loops unterstützt.');
}

// TraitUseExpression (z.B. `expr use Trait`) hat noch keine definierte Laufzeit-Semantik
// (Mixin? Wrapper? Runtime-Check?) -> bewusster Stub statt Rateversuch.
export function generateTraitUseExpression (node) {
  throw new Error('[Generator-Fehler]: TraitUseExpression-Codegen ist noch nicht spezifiziert.');
}



/*
export const

Identifier = node => return node.name,
Literal    = node => (node.type === 'STRING') ? JSON.stringify(node.value) : String(node.value),

AssignmentExpression = node => `${generate(node.left)} = ${generate(node.right)}`,
      CallExpression = node => `${generate(node.expr)}(${node.args.map(generate).join(', ')})`,
    MemberExpression = node => `${generate(node.object)}.${node.property}`,
*/
