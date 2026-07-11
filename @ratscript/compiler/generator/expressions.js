// @ratscript/compiler/generator/expressions.js

import { generate } from './index.js';

export function generateIdentifier ({ name }) {
  return name;
}

export function generateLiteral ({ type,value }) {
  return (type === 'STRING') 
    ? JSON.stringify(value)
    : String(value);
}

// ::::::

export function generateAssignmentExpression ({ left, right }) {
  return `${generate(left)} = ${generate(right)}`;
}

export function generateCallExpression ({ expr, args }) {
  const argsList = args.map(generate).join(', ');
  return `${generate(expr)}(${argsList})`;
}

export function generateCallExpression (node) {
  if (node.namedArgs) {
    const props = node.namedArgs.map(({ name, value }) => `${name}: ${generate(value)}`).join(', ');
    return `${generate(node.expr)}({ __isNamed: true, ${props} })`;
  }
  const args = node.args.map(generate).join(', ');
  return `${generate(node.expr)}(${args})`;
}

export function generateCompoundAssignmentExpression (node) {
  if (node.operator === '+=') {
    useHelper('_assign');
    return `${generate(node.left)} = _assign(${generate(node.left)}, ${generate(node.right)})`;
  }
  throw new Error(`[Generator-Fehler]: Compound-Assignment-Operator '${node.operator}' ist noch nicht implementiert (bisher nur '+=' via _assign).`);
}

export function generatePipePlaceholder (node) {
  throw new Error('[Generator-Fehler]: PipePlaceholder ("_") sollte bereits beim Parsen aufgelöst worden sein.');
}

export function generateMemberExpression ({ object, property }) {
  return `${generate(object)}.${property}`;
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

export function generateObjectPattern (node) {
  const props = node.properties
    .map(p => p.key === p.value ? p.key : `${p.key}: ${p.value}`)
    .join(', ');
  return `{ ${props} }`;
}

/*
export const

Identifier = node => return node.name,
Literal    = node => (node.type === 'STRING') ? JSON.stringify(node.value) : String(node.value),

AssignmentExpression = node => `${generate(node.left)} = ${generate(node.right)}`,
      CallExpression = node => `${generate(node.expr)}(${node.args.map(generate).join(', ')})`,
    MemberExpression = node => `${generate(node.object)}.${node.property}`,
*/
