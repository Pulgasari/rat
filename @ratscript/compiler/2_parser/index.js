// @ratscript/compiler/2_parser/index.js

import { init, isEOF }   from './state.js';
import { ASTNode }       from './../utils.js';
import * as declarations from './declarations.js';
import * as expressions  from './expressions.js';
import * as statements   from './statements.js';



export function parse (tokens) {
  init(tokens);
  return ASTNode.Program({ body: parsed.Body });
}

export const parsed = {
  ...declarations,
  ...expressions,
  ...statements,
  parseBody,
};

for (const [key, body] of Object.entries(parsed)) {
  const name = key.replace(/^parse/, '');
  
  Object.defineProperty(parsed, name, { 
    get () { return body(); },
    enumerable: true
  });
  
  delete parsed[key];
}

parsed.call = name => parsed[name];

function parseBody () {
  const body = [];
  while (!isToken('}') && !isEOF()) {
    body.push(parsed.Statement);
  }
  return body;
}




/*
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
*/
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
