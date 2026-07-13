// @ratscript/compiler/

import Generator from './generator/index.js';
import Lexer     from './lexer/index.js';
import Parser    from './parser/index.js';

export function compile (code) {
  // step 1: convert RatScript code into tokens
  const lexer  = new Lexer (code);
  const tokens = lexer.tokenize();

  // step 2: convert tokens into AST
  const parser = new Parser (tokens);
  const ast    = parser.parse();

  // step 3: convert AST into JavaScript code
  const generator = new Generator (ast);
  const finalCode = generator.generate();

  // done!
  return finalCode;
}
