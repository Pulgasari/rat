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

export function generateExportAllDeclaration (node) {
  return node.exported
    ? `export * as ${node.exported} from '${node.source}';`
    : `export * from '${node.source}';`;
}

export function generateExportDefaultDeclaration (node) {
  // Unser fn-Codegen erzeugt eine const-Zuweisung (wegen _fn-Wrapper), keine echte
  // Function-Declaration -> 'export default' kann nicht direkt davorstehen.
  if (node.declaration.type === 'FunctionDeclaration') {
    return `${generate(node.declaration)}\nexport default ${node.declaration.name};`;
  }
  return `export default ${generate(node.declaration)};`;
}

export function generateExportNamedDeclaration (node) {
  if (node.declaration) return `export ${generate(node.declaration)}`;

  const specs = node.specifiers.map(s => s.local === s.exported ? s.local : `${s.local} as ${s.exported}`).join(', ');
  const fromClause = node.source ? ` from '${node.source}'` : '';
  return `export { ${specs} }${fromClause};`;
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

export function generateImportDeclaration (node) {
  if (node.specifiers.length === 0) return `import '${node.source}';`;

  const defaultSpec   = node.specifiers.find(s => s.kind === 'default');
  const namespaceSpec = node.specifiers.find(s => s.kind === 'namespace');
  const namedSpecs    = node.specifiers.filter(s => s.kind === 'named');

  const parts = [];
  if (defaultSpec)   parts.push(defaultSpec.local);
  if (namespaceSpec) parts.push(`* as ${namespaceSpec.local}`);
  if (namedSpecs.length) {
    const named = namedSpecs.map(s => s.imported === s.local ? s.imported : `${s.imported} as ${s.local}`).join(', ');
    parts.push(`{ ${named} }`);
  }

  return `import ${parts.join(', ')} from '${node.source}';`;
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
