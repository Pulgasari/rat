// @ratscript/compiler/lexer.js

// :::::: IMPORTS

import { TokenType: Token } from './utils.js';
import { keywords }         from './meta.js';

// :::::: HELPERS

const isKeyword = value => keywords.includes(value);

// :::::: LEXER RULES

const OPERATOR_RULES = OPERATORS.map(op => ({
  type: TokenType.OPERATOR,
  regex: new RegExp(op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'y')
}));

const PUNCT_RULES = [
  { type: TokenType.PUNCT, value: '{', regex: /\{/y },
  { type: TokenType.PUNCT, value: '}', regex: /\}/y },
  { type: TokenType.PUNCT, value: '(', regex: /\(/y },
  { type: TokenType.PUNCT, value: ')', regex: /\)/y },
  { type: TokenType.PUNCT, value: '[', regex: /\[/y },
  { type: TokenType.PUNCT, value: ']', regex: /\]/y },
  { type: TokenType.PUNCT, value: ',', regex: /,/y },
  { type: TokenType.PUNCT, value: ';', regex: /;/y },
];

const RULES = [
  { type: TokenType.RANGE     , regex: /\.\./y },
  { type: TokenType.COLON     , regex: /:/y    },
  { type: TokenType.ASSIGN    , regex: /=/y    },
  { type: TokenType.LBRACE    , regex: /\{/y   },
  { type: TokenType.RBRACE    , regex: /\}/y   },
  { type: TokenType.LPAREN    , regex: /\(/y   },
  { type: TokenType.RPAREN    , regex: /\)/y   },
  { type: TokenType.SEMICOLON , regex: /;/y    },
  
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
      const char = source[cursor];

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

      let matched = false;

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

    tokens.push({ column, line, type: TokenType.EOF, value: '' });
    return tokens;
  }

  return {
    tokenize,
    get column () { return column; },
    get cursor () { return cursor; },
    get line   () { return line; },
  };
}
