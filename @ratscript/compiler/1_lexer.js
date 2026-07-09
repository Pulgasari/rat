// @ratscript/compiler/lexer.js

import { TokenType } from './token.js';
import { keywords }  from './../meta.js';

// Die Regeln für unseren Lexer von spezifisch nach allgemein
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

export class Lexer {
  constructor (source) {
    this.source = source;
    this.cursor = 0;
    this.line   = 1;
    this.column = 1;
  }

  tokenize() {
    const tokens = [];

    while (this.cursor < this.source.length) {
      const char = this.source[this.cursor];

      // skip linebreaks + whitespaces
      if (char === '\n') { this.column = 1; this.cursor++; this.line++; continue; }
      if (/\s/.test(char)) { this.cursor++; this.column++; continue; }

      // 2. Kommentare überspringen (Single Line //)
      if (char === '/' && this.source[this.cursor + 1] === '/') {
        while (this.cursor < this.source.length && this.source[this.cursor] !== '\n') {
          this.cursor++;
        }
        continue;
      }

      // 3. Unsere Token-Regeln abgleichen
      let matched = false;

      for (const { regex, type } of RULES) {
        // Setzt den Startpunkt für das 'sticky' Matching
        regex.lastIndex = this.cursor;
        const match = regex.exec(this.source);

        if (match) {
          let value = match[0];
          let tokenType = type;

          // Spezialfall: Wenn es ein IDENTIFIER ist, prüfen wir, ob es ein geschütztes Keyword ist
          if (tokenType === TokenType.IDENTIFIER && keywords.includes(value)) {
            tokenType = TokenType.KEYWORD;
          }

          // Token registrieren mit Positionsdaten für Fehlermeldungen
          tokens.push({
            type: tokenType,
            value: value,
            line: this.line,
            column: this.column
          });

          // Cursor und Spalte updaten
          this.cursor += value.length;
          this.column += value.length;
          matched = true;
          break;
        }
      }

      // Wenn kein Muster matcht, hat der Entwickler ungültige Zeichen getippt!
      if (!matched) {
        throw new SyntaxError(
          `Ungültiges Zeichen '${char}' an Position ${this.line}:${this.column}`
        );
      }
    }

    // Am Ende hängen wir immer ein EOF (End of File) Token an
    tokens.push({ type: TokenType.EOF, value: '', line: this.line, column: this.column });
    return tokens;
  }
    }
