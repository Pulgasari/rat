// @ratscript/compiler/generator/statements.js

import { generate } from './index.js';
import { indent } from './helpers.js';

// :::::: Program / Block

export function generateProgram (node) {
  return node.body.map(generate).join('\n');
}

export function generateBlockStatement (node) {
  return node.body.map(generate).join('\n');
}

export function generateExpressionStatement (node) {
  return `${generate(node.expr)};`;
}

// :::::: for

export function generateForStatement (node) {
  const bodyCode = generateBlockStatement(node.body);

  if (node.isNaked) {
    if (node.initializer.type === 'RangeExpression') {
      const from = generate(node.initializer.from);
      const to   = generate(node.initializer.to);
      return `for (let i = ${from}; i <= ${to}; i++) {\n${indent(bodyCode)}\n}`;
    }
    // Naked-Loop über ein Array/Iterable, z.B. `for (liste) { ... }`
    return `for (const it of ${generate(node.initializer)}) {\n${indent(bodyCode)}\n}`;
  }

  // Standard-Loop (`for (let i = 0; ...; ...)`): der Parser erfasst aktuell nur EINE
  // Initializer-Expression, keine separate Bedingung/Inkrement -> für einen echten
  // C-artigen for-Loop fehlen dem AST noch die nötigen Felder. Das muss erst im
  // Parser nachgezogen werden (z.B. initializer/condition/update als eigene Felder),
  // bevor der Generator hier sinnvoll JS erzeugen kann.
  throw new Error('[Generator-Fehler]: Standard-For-Loops (nicht "naked") sind im AST noch nicht vollständig genug abgebildet (fehlende condition/update).');
}

// :::::: sift { init: ..., cond: ... }

export function generateSiftStatement (node) {
  let js = `(() => {\n`;

  if (node.init) {
    js += `  // Init\n`;
    js += indent(generateBlockStatement(node.init)) + '\n';
  }

  js += `  try {\n`;

  for (const c of node.cases) {
    js += `    if (${generate(c.condition)}) {\n`;
    js += indent(generateBlockStatement(c.body), 3) + '\n';
    js += `    }\n`;
  }

  if (node.catchBlock) {
    js += `  } catch (__err) {\n`;
    js += indent(generateBlockStatement(node.catchBlock)) + '\n';
  } else {
    js += `  } catch (__err) { throw __err; }\n`;
  }

  if (node.finallyBlock) {
    js += `  finally {\n`;
    js += indent(generateBlockStatement(node.finallyBlock)) + '\n';
    js += `  }\n`;
  }

  js += `})();`;
  return js;
}

// :::::: mold(target) { init: ..., cond: ... }
// Analog zu sift, aber mit `self`-Bindung ans target und Rückgabewert (wie im alten
// Regex-Prototyp: transformMold in syntax/control_flow.js).

export function generateMoldStatement (node) {
  let js = `(() => {\n`;
  js += `  let self = ${generate(node.targetExpr)};\n`;

  if (node.init) {
    js += indent(generateBlockStatement(node.init)) + '\n';
  }

  js += `  try {\n`;

  for (const c of node.cases) {
    js += `    if (${generate(c.condition)}) {\n`;
    js += indent(generateBlockStatement(c.body), 3) + '\n';
    js += `    }\n`;
  }

  if (node.catchBlock) {
    js += `  } catch (__err) {\n`;
    js += indent(generateBlockStatement(node.catchBlock)) + '\n';
  } else {
    js += `  } catch (__err) { throw __err; }\n`;
  }

  if (node.finallyBlock) {
    js += `  finally {\n`;
    js += indent(generateBlockStatement(node.finallyBlock)) + '\n';
    js += `  }\n`;
  }

  js += `  return self;\n`;
  js += `})();`;
  return js;
}
