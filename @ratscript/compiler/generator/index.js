// @ratscript/compiler/generator/index.js

import { evilFactory }   from './../utils.js'|
import * as declarations from './declarations.js';
import * as expressions  from './expressions.js';
import * as statements   from './statements.js';

export const generated = evilFactory({ 
  prefix: 'generate',
  source: [declarations, expressions, statements]
});


export function generate (node) {
  if (!node) return '';

  const fn = generators[node.type];
  if (!fn) throw new Error(`[Generator-Fehler]: Unbekannter AST-Knoten-Typ "${node.type}"`);

  return fn(node);
}
