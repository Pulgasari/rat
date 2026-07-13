// @ratscript/compiler/parser

import default as CosmonautParser from '@cosmonaut/parser';
import { buildTokenTypes } from '@cosmonaut/parser/utils';
import { keywords, operators, puncts, TokenType } from './../meta.js';


const options = {
  grammar     : [],   // Module mit parseXxx-Regeln, s.u.
  keywords    : keywords,
  methods     : [],
  nodeFactory : null, // s.u. (ASTNode-Proxy)
  puncts      : puncts,
  operators   : operators,
  tokenTypes  : null, // z.B. via buildTokenTypes() aus @cosmonaut/lexer
  wrappers    : {},   // custom open/close-Paare, s.u.
};

const tokens; // ???
export const parser = new CosmonautParser (tokens, options);
export default parser;
