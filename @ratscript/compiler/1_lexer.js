// @ratscript/compiler/lexer.js

// :::::: IMPORTS

import { keywords, puncts, operators, TokenType } from './meta.js';

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

// :::::: HELPERS: TEMPLATE STRINGS

// (Backtick-Strings mit ${...}-Interpolation)
// Eigenständig, weil Template-Literale nicht mit einer einzelnen Regex erfassbar sind:
// ${...} kann beliebig verschachtelte Strings, Klammern und sogar weitere
// Template-Literale enthalten -> braucht echtes Balancing statt Regex-Matching.

function skipStringLiteral (source, i, quoteChar) {
  i++; // öffnendes Anführungszeichen
  while (i < source.length) {
    if (source[i] === '\\') { i += 2; continue; }
    if (source[i] === quoteChar) { i++; break; }
    i++;
  }
  return i;
}

function skipBraceExpr (source, i) {
  // i steht direkt HINTER '${' -> sucht das passende '}' auf Tiefe 0
  let depth = 1;
  while (i < source.length && depth > 0) {
    const ch = source[i];
    if (ch === "'" || ch === '"') { i = skipStringLiteral(source, i, ch); continue; }
    if (ch === '`') { i = skipTemplateLiteral(source, i); continue; }
    if (ch === '{') { depth++; i++; continue; }
    if (ch === '}') { depth--; i++; continue; }
    i++;
  }
  return i; // Index NACH dem passenden '}'
}

function skipTemplateLiteral (source, i) {
  // i steht auf dem öffnenden Backtick -> überspringt das GESAMTE Template-Literal
  // (wird für verschachtelte Template-Literale innerhalb von ${...} gebraucht)
  i++; // `
  while (i < source.length) {
    if (source[i] === '\\') { i += 2; continue; }
    if (source[i] === '`') { i++; break; }
    if (source[i] === '$' && source[i + 1] === '{') { i = skipBraceExpr(source, i + 2); continue; }
    i++;
  }
  return i;
}

function scanTemplateString (source, startCursor) {
  let i = startCursor + 1; // öffnendes Backtick
  const segments = [];
  let buffer = '';

  const flush = () => { segments.push({ kind: 'string', value: buffer }); buffer = ''; };

  while (i < source.length) {
    const ch = source[i];

    if (ch === '\\') { buffer += source[i + 1] ?? ''; i += 2; continue; }
    if (ch === '`') { i++; break; } // schließendes Backtick

    if (ch === '$' && source[i + 1] === '{') {
      flush();
      const exprStart = i + 2;
      const exprEnd   = skipBraceExpr(source, exprStart) - 1; // ohne schließendes '}'
      const exprSource = source.slice(exprStart, exprEnd);
      segments.push({ kind: 'expr', tokens: Lexer(exprSource).tokenize() }); // rekursiver Lexer-Aufruf
      i = exprEnd + 1;
      continue;
    }

    buffer += ch;
    i++;
  }

  flush();
  return { segments, endCursor: i };
}

// :::::: THE LEXER (MAIN EXPORT)

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
