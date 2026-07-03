// @ratscript/compiler

import guard_assignment from './semantics/guard_assignment.js';
import guard_line       from './semantics/guard_line.js';
import match            from './semantics/match.js';
import named_arguments  from './semantics/named_arguments.js';
import signals          from './semantics/signals.js';

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
  let jsOutput = `import { Signal, SignalBool, Effect } from './reactivity.js';\n`
               + `import { linkStylesheet } from './dom.js';\n\n`;

  let code = sourceCode;

  //
  processedCode = named_arguments  (processedCode);
  processedCode = match            (processedCode);
  processedCode = guard_line       (processedCode);
  processedCode = guard_assignment (processedCode);
  processedCode = signals          (processedCode);

  // ==========================================
  // 1. Named Arguments (Funktions-Definitionen)
  // function name (a, b) -> function name ({ a, b } = {})
  // ==========================================
  const funcDefRegex = /function\s+(\w+)\s*\(([^)]+)\)/g;
  processedCode = processedCode.replace(funcDefRegex, (match, funcName, args) => {
    if (args.trim().startsWith('{')) return match;
    return `function ${funcName}({ ${args} } = {})`;
  });

  // ==========================================
  // 2. Named Arguments (Funktions-Aufrufe)
  // name(age: 18) -> name({ age: 18 })
  // ==========================================
  const funcCallNamedRegex = /(\w+)\s*\(([^)]*:[^)]*)\)/g;
  processedCode = processedCode.replace(funcCallNamedRegex, (match, funcName, body) => {
    if (body.trim().startsWith('{')) return match;
    return `${funcName}({ ${body} })`;
  });

  // ==========================================
  // 3. PHP-like match() Interface
  // ==========================================
  const matchRegex = /match\s*\((.+?)\)\s*\{([\s\S]+?)\}/g;
  processedCode = processedCode.replace(matchRegex, (match, condition, body) => {
    const isAsync = body.includes('await');
    const lines = body.split('\n');
    let switchCases = '';
    
    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      if (line.endsWith(',')) line = line.slice(0, -1);
      
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      if (key === 'default') {
        switchCases += `    default: return typeof ${value} === 'function' ? (${value})() : ${value};\n`;
      } else {
        switchCases += `    case ${key}: return ${value};\n`;
      }
    }
    
    if (isAsync) {
      return `await (async () => {\n  switch (${condition}) {\n${switchCases}  }\n})()`;
    } else {
      return `(() => {\n  switch (${condition}) {\n${switchCases}  }\n})()`;
    }
  });

  // ==========================================
  // 4. Line Guards: return if (...) do ...
  // ==========================================
  // Variante mit do-Block oder do-Statement: return if (x) do bye();
  processedCode = processedCode.replace(/return\s+if\s*\((.+?)\)\s*do\s*(\{[\s\S]*?\}|[^;\n]+)\s*;/g, (match, cond, action) => {
    const act = formatAction(action);
    return `if (${cond}) {\n  ${act}  return;\n}`;
  });

  // Variante simpel: return if (x);
  processedCode = processedCode.replace(/return\s+if\s*\((.+?)\)\s*;/g, (match, cond) => {
    return `if (${cond}) return;`;
  });

  // ==========================================
  // 5. Assignment Guards (or, ||, ??)
  // ==========================================
  // Variante 1: mit return [wert] AND do [aktion] (or return false do { ... })
  processedCode = processedCode.replace(/(let|const|var)\s+(\w+)\s*=\s*(.+?)\s+(or|\|\||\?\?)\s+return(\s+[^\n;do]+)?\s+do\s*(\{[\s\S]*?\}|[^;\n]+)\s*;/g, (match, dec, name, expr, op, retVal, action) => {
    const cond = getGuardCondition(name, op);
    const act = formatAction(action);
    const rv = retVal ? retVal.trim() : '';
    return `${dec} ${name} = ${expr};\nif (${cond}) {\n  ${act}  return ${rv};\n}`;
  });

  // Variante 2: NUR return [wert] (or return false; oder ?? return;)
  processedCode = processedCode.replace(/(let|const|var)\s+(\w+)\s*=\s*(.+?)\s+(or|\|\||\?\?)\s+return(\s+[^\n;]+)?\s*;/g, (match, dec, name, expr, op, retVal) => {
    const cond = getGuardCondition(name, op);
    const rv = retVal ? retVal.trim() : '';
    return `${dec} ${name} = ${expr};\nif (${cond}) return ${rv};`;
  });

  // Variante 3: NUR do [aktion] (Side-Effect ohne Abbruch: or do bye();)
  processedCode = processedCode.replace(/(let|const|var)\s+(\w+)\s*=\s*(.+?)\s+(or|\|\||\?\?)\s+do\s*(\{[\s\S]*?\}|[^;\n]+)\s*;/g, (match, dec, name, expr, op, action) => {
    const cond = getGuardCondition(name, op);
    const act = formatAction(action);
    return `${dec} ${name} = ${expr};\nif (${cond}) {\n  ${act}}`;
  });

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
