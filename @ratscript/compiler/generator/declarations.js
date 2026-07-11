// @ratscript/compiler/generator/declarations.js

import { indent } from './helpers.js';
import { useHelper } from './state.js';
import { generateBlockStatement } from './statements.js';

export function generateAliasDeclaration (node) {
  if (node.autoBind) {
    const context = generate(node.source.object); // z.B. "database.users"
    return `const ${node.name} = ${generate(node.source)}.bind(${context});`;
  }
  return `const ${node.name} = ${generate(node.source)};`;
}

// :::::: class Name [use Trait] { ... }
export function generateClassDeclaration (node) {
  const methodsCode = node.methods
    .map(m => `${m.name} (${m.params.join(', ')}) {\n${indent(generateBlockStatement(m.body))}\n}`)
    .join('\n\n');

  let js = `class ${node.name} {\n${indent(methodsCode)}\n}`;

  for (const traitName of node.traits) {
    useHelper('Trait');
    js += `\n${traitName}.apply(${node.name});`;
  }

  return js;
}

export function generateFunctionDeclaration (node) {
  useHelper('_fn');

  const params    = node.params.join(', ');
  const bodyCode  = generateBlockStatement(node.body);
  const paramList = JSON.stringify(node.params);
  const asyncKw   = node.isAsync ? 'async ' : '';
  const starKw    = node.isGenerator ? '*' : '';

  let js = `const ${node.name} = _fn(${asyncKw}function${starKw} (${params}) {\n${indent(bodyCode)}\n}, ${paramList});`;

  for (const traitName of node.traits) {
    useHelper('Trait');
    js += `\n${traitName}.apply(${node.name});`;
  }

  return js;
}

export function generateTraitDeclaration (node) {
  useHelper('Trait');

  const propsCode = node.properties.map(p => {
    if (p.kind === 'method') {
      const params = p.params.join(', ');
      return `${p.key} (${params}) {\n${indent(generateBlockStatement(p.body))}\n}`;
    }
    return `${p.key}: ${generate(p.value)}`;
  }).join(',\n');

  return `const ${node.name} = new Trait('${node.name}', () => ({\n${indent(propsCode)}\n}));`;
}

export function generateUnionDeclaration (node) {
  useHelper('Union');
  const members = node.members.map(generate).join(', ');
  return `const ${node.name} = new Union('${node.name}', [${members}]);`;
}

// :::::: let/const/var <id | {pattern}> = <init>?;
export function generateVariableDeclaration (node) {
  const target = generate(node.id); // Identifier oder ObjectPattern
  if (node.init === null) return `${node.kind} ${target};`;
  return `${node.kind} ${target} = ${generate(node.init)};`;
}
