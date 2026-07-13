// @ratscript/compiler/parser

import default as CosmonautParser from '@cosmonaut/parser';
import { buildTokenTypes } from '@cosmonaut/parser/utils';
import { keywords, operators, puncts, tokenTypes, wrappers } from './../meta.js';


const options = {
  grammar     : [],   // Module mit parseXxx-Regeln, s.u.
  keywords    : keywords,
  methods     : [],
  nodeFactory : null, // s.u. (ASTNode-Proxy)
  puncts      : puncts,
  operators   : operators,
  tokenTypes  : tokenTypes,
  wrappers    : wrappers,
};

const tokens; // ???
export const parser = new CosmonautParser (tokens, options);
export default parser;
