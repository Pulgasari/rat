// @ratscript/compiler

import transform__guard_assignment from './semantics/guard_assignment.js';
import transform__guard_line       from './semantics/guard_line.js';
import transform__match            from './semantics/match.js';
import transform__named_arguments  from './semantics/named_arguments.js';
import transform__signals          from './semantics/signals.js';

/**
 * Hilfsfunktion zur Generierung interner Signal-Variablennamen,
 * um Namenskonflikte im kompilierte JS-Code zu vermeiden.
 * @param {string} str - Der originale Variablenname.
 * @returns {string} Der präfixte Name.
 */
let _sig = str => '__' + str;

/**
 * Hilfsfunktion für den Guard-Compiler.
 * Bestimmt die JS-Bedingung basierend auf dem gewählten Operator.
 * @param {string} varName - Name der geprüften Variable.
 * @param {string} operator - Der Operator ('or', '||' oder '??').
 * @returns {string} Die valide JavaScript-Bedingung.
 */
function getGuardCondition (varName, operator) {
  return (operator === '??')
    ? `${varName} === null || ${varName} === undefined`;
    : `!${varName}`;
}

/**
 * Hilfsfunktion für den Guard-Compiler.
 * Formatiert den Inhalt eines do-Statements oder do-Blocks sauber für die Ausgabe.
 * @param {string} action - Der rohe do-Inhalt.
 * @returns {string} Formtierter JS-Code-String.
 */
function formatAction (action) {
  if (!action) return '';
  let trimmed = action.trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return trimmed.slice(1, -1).trim() + '\n';
  }
  return trimmed + ';\n';
}

/**
 * Der plattformunabhängige Compiler-Core für RatScript.
 * Transformiert RatScript-DSL in standardkonformes JavaScript (ESM).
 * * @param {string} sourceCode - Der rohe RatScript Quellcode.
 * @returns {string} Das kompilierte, ausführbare JavaScript.
 */
export function compile (sourceCode) {
  let condsList = new Set();
  let jsOutput = `import { Signal, SignalBool, Effect } from './reactivity.js';\n`
               + `import { linkStylesheet } from './dom.js';\n\n`
               + `import { createCond, condMap } from './cond.js';\n\n`;


  let code = sourceCode;

  //
  code = transform__cond             (code);
  code = transform__named_arguments  (code);
  code = transform__match            (code);
  code = transform__guard_line       (code);
  code = transform__guard_assignment (code);
  code = transform__signals          (code);



  // ==========================================
  // 6. Framework Keywords (Signals, Effects, Stylesheets)
  // ==========================================
  const stylesheetRegex = /stylesheet\s+(['"`])(.+?)\1\s*;/g;
  processedCode = processedCode.replace(stylesheetRegex, (match, quote, path) => {
    return `linkStylesheet('${path}');`;
  });

  const signalRegex = /signal\s+\$(\w+)(?:\s*:\s*(\w+))?\s*=\s*(.+?);/g;
  let signalsList = new Set();

  processedCode = processedCode.replace(signalRegex, (match, name, type, value) => {
    signalsList.add(name);
    const className = type === 'bool' ? 'SignalBool' : 'Signal';
    return `const ${_sig(name)} = new ${className}(${value});`;
  });

  const effectRegex = /effect\s*\{([\s\S]*?)\};/g;
  processedCode = processedCode.replace(effectRegex, (match, blockContent) => {
    return `new Effect(() => {${blockContent}});`;
  });

  // ==========================================
  // 7. Framework Dollar-Stripping ($theme -> __theme.value)
  // ==========================================
  signalsList.forEach(signalName => {
    const dollarRegex = new RegExp(`\\$${signalName}\\b`, 'g');
    processedCode = processedCode.replace(dollarRegex, `${_sig(signalName)}.value`);
  });

  jsOutput += processedCode;
  return jsOutput;
};
