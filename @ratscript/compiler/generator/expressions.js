// @ratscript/compiler/generator/expressions.js

import { generate } from './index.js';

// ::::::

export function generateArrayExpression (node) {
  return `[${node.elements.map(generate).join(', ')}]`;
}

export function generateAssignmentExpression ({ left, right }) {
  return `${generate(left)} = ${generate(right)}`;
}

export function generateAwaitExpression (node) {
  return `await ${generate(node.argument)}`;
}

export function generateBinaryExpression (node) {
  return `${generate(node.left)} ${node.operator} ${generate(node.right)}`;
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

export function generateListExpression (node) {
  useHelper('List');
  return `new List(${node.elements.map(generate).join(', ')})`;
}

export function generateMemberExpression ({ object, property }) {
  return `${generate(object)}.${property}`;
}

export function generateNewExpression (node) {
  const args = node.args.map(generate).join(', ');
  return `new ${generate(node.callee)}(${args})`;
}

export function generateObjectExpression (node) {
  const props = node.properties.map(p => {
    if (p.kind === 'method') {
      const params = p.params.join(', ');
      return `${p.key} (${params}) {\n${indent(generateBlockStatement(p.body))}\n}`;
    }
    return `${p.key}: ${generate(p.value)}`;
  }).join(',\n');

  return `{\n${indent(props)}\n}`;
}

export function generateRangeExpression ({ from, to ) {
  useHelper('_range');
  return `_range(${generate(from)}, ${generate(to)})`;
}

export function generateTemplateLiteral (node) {
  let js = '`';
  node.quasis.forEach((str, i) => {
    js += str.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    if (i < node.expressions.length) js += '${' + generate(node.expressions[i]) + '}';
  });
  return js + '`';
}

export function generateTraitUseExpression (node) {
  // { } use A, B
  // ->  B.apply(A.apply({ }))  
  // -- A wird zuerst appliziert, B zuletzt
  return node.traitNames.reduce((code, name) => `${name}.apply(${code})`, generate(node.expr));
}

export function generateTupleExpression (node) {
  useHelper('Tuple');
  return `new Tuple(${node.elements.map(generate).join(', ')})`;
}

export function generateUnaryExpression (node) {
  const symbol = node.operator.replace(/^unary/, '');
  const spacer = /^[a-z]/.test(symbol) ? ' ' : '';
  return `${symbol}${spacer}${generate(node.argument)}`;
}

export function generateYieldExpression (node) {
  return node.argument === null ? 'yield' : `yield ${generate(node.argument)}`;
}



/*
export const

Identifier = node => return node.name,
Literal    = node => (node.type === 'STRING') ? JSON.stringify(node.value) : String(node.value),

AssignmentExpression = node => `${generate(node.left)} = ${generate(node.right)}`,
      CallExpression = node => `${generate(node.expr)}(${node.args.map(generate).join(', ')})`,
    MemberExpression = node => `${generate(node.object)}.${node.property}`,
*/
