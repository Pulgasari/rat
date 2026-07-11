// @ratscript/compiler/2_parser/index.js

import { ASTNode }           from './../utils.js';
import { createEvilFactory } from './../utils.js';
import { init }              from './state.js';

import * as core         from './core.js';
import * as declarations from './declarations.js';
import * as expressions  from './expressions.js';
import * as statements   from './statements.js';

export const parsed = createEvilFactory({
  prefix: 'parse',
  source: [core, declarations, expressions, statements]
});

export function parse (tokens) {
  init(tokens);
  return ASTNode.Program({ body: parsed.Body });
}
