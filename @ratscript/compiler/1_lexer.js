// @ratscript/compiler/lexer.js

// :::::: IMPORTS

import { TokenType } from './utils.js';
import { keywords, puncts, operators } from './meta.js';

// :::::: HELPERS

const isKeyword = value => keywords.includes(value);
const rgx       = (value, flags) => new RegExp(RegExp.escape(value), flags); 

// :::::: LEXER RULES

const OPERATOR_RULES = Object.keys(operators).map(char => ({
  type  : TokenType.OPERATOR,
  regex : rgx(char, 'y'),
}));

const PUNCT_RULES = puncts.map(char => ({
  type  : TokenType.PUNCT,
  value : char,
  regex : rgx(char, 'y'),
}));

const RULES = [
  ...OPERATOR_RULES,
  ...PUNCT_RULES,
  
  // Literale (Strings & Zahlen)
  { type: TokenType.STRING , regex: /"(?:\\.|[^"\\])*"/y },
  { type: TokenType.STRING , regex: /'(?:\\.|[^'\\])*'/y },
  { type: TokenType.NUMBER , regex: /\d+/y,              },
  
  // Identifiers (Variablen, Funktionen, Keywords)
  { regex: /[a-zA-Z_$][a-zA-Z0-9_$]*/y, type: TokenType.IDENTIFIER }
];

export function Lexer (source) {
  let cursor = 0;
  let line   = 1;
  let column = 1;

  function tokenize () {
    const tokens = [];

    while (cursor < source.length) {
      let char    = source[cursor];
      let matched = false;

      // skip linebreaks + whitespaces
      if (char === '\n')   { column = 1; cursor++; line++; continue; }
      if (/\s/.test(char)) { column++; cursor++; continue; }

      // skip comments: '//'
      if (char === '/' && source[cursor + 1] === '/') {
        while (cursor < source.length && source[cursor] !== '\n') {
          cursor++;
        }
        continue;
      }
      
      for (const { regex, type } of RULES) {
        regex.lastIndex = cursor;
        const match = regex.exec(source);

        if (match) {
          let value = match[0];

          if (type === TokenType.IDENTIFIER && keywords.includes(value)) {
            type = TokenType.KEYWORD;
          }

          tokens.push({ column, line, type, value });

          cursor += value.length;
          column += value.length;
          matched = true;
          break;
        }
      }

      if (!matched) throw new SyntaxError(`Ungültiges Zeichen '${char}' an Position ${line}:${column}`);
    }
    // end of file
    tokens.push({ column, line, type: TokenType.EOF, value: '' });
    return tokens;
  }

  return {
    tokenize,
    get column () { return column; },
    get cursor () { return cursor; },
    get line   () { return line;   },
  };
}
