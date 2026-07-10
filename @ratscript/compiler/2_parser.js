// @ratscript/compiler/2_parser.js

import { init, isEOF } from './parser/state.js';
import { parseStatement } from './parser/statements.js';
import { ASTNode } from './utils.js';

export function parse (tokens) {
  init(tokens);

  const body = [];
  while (!isEOF()) {
    body.push(parseStatement());
  }

  return ASTNode.Program({ body });
}
