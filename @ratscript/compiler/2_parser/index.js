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



import * as declarations from './declarations.js';
import * as expressions  from './expressions.js';
import * as statements   from './statements.js';

const methods = { 
  ...declarations,
  ...expressions,
  ...statements,
};

const Expression = () => parse.Assignment;

const Body = () => {
  const body = [];
  while (!isToken('}') && !isEOF()) {
    body.push(parse('Statement'));
    body.push(parse.Statement());
    body.push(parse.Statement);

  }
  return body;
}

export const parse = name => methods[name]();

parse('Body');
parse('Expression');
parse('For');

parse.Body();
parse.Expression();
parse.For();


