// @ratscript/compiler/mod.js

import { Lexer } from './src/lexer/lexer.js';
import { Parser } from './src/parser/parser.js';
import { Generator } from './src/generator/generator.js';

export function compile (ratscriptCode) {
  // 1. Text in Token zerlegen
  const lexer = new Lexer(ratscriptCode);
  const tokens = lexer.tokenize();

  // 2. Token in einen logischen AST umwandeln
  const parser = new Parser(tokens);
  const ast = parser.parse();

  // 3. AST in valides JavaScript übersetzen
  const generator = new Generator();
  return generator.generate(ast);
}
