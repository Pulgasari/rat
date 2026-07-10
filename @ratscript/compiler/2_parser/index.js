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
    body.push(parsed.Statement);
    parse.Statement |> body.push;
  }
  return body;
}

export const parse = name => methods[name]();
export const parse = name => methods['parse' + name]();

parse('Body');
parse('Expression');
parse('For');

parse.Body();
parse.Expression();
parse.For();

parse.Body;
parse.Expression;
parse.For;

parsed.Body;
parsed.Expression;
parsed.For;





import * as declarations from './declarations.js';
import * as expressions  from './expressions.js';
import * as statements   from './statements.js';

export const parsed = {
  ...declarations,
  ...expressions,
  ...statements,
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
