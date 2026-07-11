// @ratscript/compiler/generator/index.js

import { createEvilFactory } from './../utils.js'|
import * as declarations     from './declarations.js';
import * as expressions      from './expressions.js';
import * as statements       from './statements.js';

export const generated = createEvilFactory ({ 
  prefix: 'generate',
  source: [declarations, expressions, statements],
});


export function generate (node) {
  if (!node) return '';

  const fn = generated[node.type];
  if (!fn) throw new Error(`[Generator Error]: Unnknown ASTNode-Type "${node.type}"`);

  return fn(node);
}
