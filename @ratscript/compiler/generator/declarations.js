// @ratscript/compiler/generator/declarations.js

import { indent } from './helpers.js';
import { generateBlockStatement } from './statements.js';

// :::::: fn name(args) use Trait { ... }

export function generateFunctionDeclaration (node) {
  const params   = node.params.join(', ');
  const bodyCode = generateBlockStatement(node.body);

  // Traits werden aktuell nur als Kommentar markiert -> die eigentliche
  // Mixin-/Wrapper-Semantik von "use Trait" ist noch nicht spezifiziert
  // (siehe generateTraitUseExpression in expressions.js).
  const traitsNote = node.traits.length
    ? indent(`// TODO: traits nicht implementiert -> uses: ${node.traits.join(', ')}\n`)
    : '';

  return `function ${node.name}(${params}) {\n${traitsNote}${indent(bodyCode)}\n}`;
}

// :::::: trait Name { ... }
// Noch kein definiertes Laufzeit-Modell (Objekt aus Methoden? Mixin-Funktion?
// Interface-Check?) -> bewusster Stub statt Rateversuch, analog zu TraitUseExpression.

export function generateTraitDeclaration (node) {
  throw new Error('[Generator-Fehler]: TraitDeclaration-Codegen ist noch nicht spezifiziert.');
}
