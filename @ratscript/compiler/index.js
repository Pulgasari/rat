// @ratscript/compiler

import transform__cond             from './syntax/cond.js';
import transform__guard            from './syntax/guard.js';
import transform__match            from './syntax/match.js';
import transform__named_arguments  from './syntax/named_arguments.js';
import transform__signals          from './syntax/signals.js';

/**
 * Hilfsfunktion zur Generierung interner Signal-Variablennamen,
 * um Namenskonflikte im kompilierte JS-Code zu vermeiden.
 * @param {string} str - Der originale Variablenname.
 * @returns {string} Der präfixte Name.
 */
let _sig = str => '__' + str;


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
  code = transform__cond            (code);
  code = transform__named_arguments (code);
  code = transform__match           (code);
  code = transform__guard           (code);
  code = transform__signals         (code);

  //
  jsOutput += code;
  return jsOutput;
};
