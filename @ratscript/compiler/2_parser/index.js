// @ratscript/compiler/2_parser/index.js

import { init, isEOF }    from './state.js';
import { parseStatement } from './statements.js';
import { ASTNode }        from './../utils.js';

export function parse (tokens) {
  init(tokens);
  return ASTNode.Program({ body: parseBody() });
}

export function parseBody () {
  const body = [];
  while (!isToken('}') && !isEOF()) {
    body.push(parseStatement());
  }
  return body;
}

/*
export function parse (tokens) {
  init(tokens);

  const body = [];
  while (!isEOF()) {
    body.push(parseStatement());
  }

  return ASTNode.Program({ body });
}
*/
