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

export function generateFunctionDeclaration (node) {
  useHelper('_fn');

  const params    = node.params.join(', ');
  const bodyCode  = generateBlockStatement(node.body);
  const paramList = JSON.stringify(node.params);

  const traitsNote = node.traits.length
    ? indent(`// TODO: traits nicht implementiert -> uses: ${node.traits.join(', ')}\n`)
    : '';

  return `const ${node.name} = _fn(function (${params}) {\n${traitsNote}${indent(bodyCode)}\n}, ${paramList});`;
}

// Noch kein definiertes Laufzeit-Modell (Objekt aus Methoden? Mixin-Funktion?
// Interface-Check?) -> bewusster Stub statt Rateversuch, analog zu TraitUseExpression.
export function generateTraitDeclaration (node) {
  throw new Error('[Generator-Fehler]: TraitDeclaration-Codegen ist noch nicht spezifiziert.');
}

// :::::: let/const/var <id | {pattern}> = <init>?;

export function generateVariableDeclaration (node) {
  const target = generate(node.id); // Identifier oder ObjectPattern
  if (node.init === null) return `${node.kind} ${target};`;
  return `${node.kind} ${target} = ${generate(node.init)};`;
}
