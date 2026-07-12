// @ratscript/compiler/lexer/index_new.js

// :::::: IMPORTS

// @cosmonaut
import Lexer as LexerClass, { makeRulesFromKeywords, makeRulesFromOperators, makeRulesFromPuncts } from '@cosmonaut/lexer';
import { javascript, doubleQuotesString, singleQuotesString } from '@cosmonaut/presets'|

// @ratscript/compiler
import { keywords, puncts, operators, TokenType } from './../meta.js';
import { scanJSXElement, scanTemplateString } from './helpers.js';

// :::::: THE LEXER (MAIN EXPORT)

export const Lexer = new LexerClass ({
  comments : javascript.comments,
  keywords : keywords,
  rules    : [
    makeRulesFromOperators(operators),
    makeRulesFromPuncts(puncts),
    doubleQuotesString,
    singleQuotesString,
    { id: 'number', type: TokenType.NUMBER , regex: /0[xX][0-9a-fA-F](?:_?[0-9a-fA-F])*|0[bB][01](?:_?[01])*|0[oO][0-7](?:_?[0-7])*|(?:\d(?:_?\d)*)?\.\d(?:_?\d)*(?:[eE][+-]?\d+)?|\d(?:_?\d)*\.(?!\.)(?:[eE][+-]?\d+)?|\d(?:_?\d)*(?:[eE][+-]?\d+)?/y },
    // kürzer? /0(?:x[\da-f](?:_?[\da-f])*|b[01](?:_?[01])*|o[0-7](?:_?[0-7])*)|(?:(?:\d(?:_?\d)*)?\.\d(?:_?\d)*|\d(?:_?\d)*(?:\.(?!\.))?)(?:e[+-]?\d+)?/i
  ],
  scanners : [
    scanTemplateString,
    scanJSXElement,
  ],
  skipComments    : true,
  skipWhitespaces : true,
});

default export Lexer;

// :::::: SCANNER: TEMPLATE STRINGS

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

export function scanTemplateString (source, startCursor) {
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

// :::::: SCANNER: JSX
/*
Wichtige, bekannte Einschränkung (bewusst nicht gelöst): 
Die Heuristik < + direkt folgender Buchstabe///> kollidiert 
mit Vergleichen ohne Leerzeichen, 
z. B. a<b würde fälschlich als JSX-Start (<b) erkannt. 
Mit Leerzeichen (a < b) ist es eindeutig. 
Schwachstelle benannt — bleibt bestehen, 
da eine kontextsensitive Lösung (Parser-Zustand im Lexer) 
unsere Architektur aufbrechen würde.
*/

function isJSXStart (source, i) {
  return source[i] === '<' && /[a-zA-Z_$/>]/.test(source[i + 1] ?? '');
}

function readTagName (source, i) {
  let name = '';
  while (i < source.length && /[a-zA-Z0-9_$.]/.test(source[i])) { name += source[i]; i++; }
  return { name, end: i };
}

// Balanciertes '{'-Skip für Expression-Inseln in JSX (kein '${' wie bei Template-Strings,
// hier ist's rohes '{...}' -> respektiert verschachtelte Strings/Template-Literale/JSX).
function skipCurlyExpr (source, i) {
  let depth = 1;
  while (i < source.length && depth > 0) {
    const ch = source[i];
    if (ch === "'" || ch === '"') { i = skipStringLiteral(source, i, ch); continue; }
    if (ch === '`') { i = skipTemplateLiteral(source, i); continue; }
    if (isJSXStart(source, i)) { i = scanJSXElement(source, i).endCursor; continue; }
    if (ch === '{') { depth++; i++; continue; }
    if (ch === '}') { depth--; i++; continue; }
    i++;
  }
  return i;
}

export function scanJSXElement (source, startCursor) {
  let i = startCursor;
  const segments = [];
  let buffer = '';
  const stack = [];

  const flush = () => { segments.push({ kind: 'string', value: buffer }); buffer = ''; };
  const pushExpr = () => {
    flush();
    const exprStart = i + 1;
    const exprEnd = skipCurlyExpr(source, exprStart) - 1;
    segments.push({ kind: 'expr', tokens: Lexer(source.slice(exprStart, exprEnd)).tokenize() });
    i = exprEnd + 1;
  };

  function readTag () {
    buffer += '<'; i++;
    let isClosing = false;
    if (source[i] === '/') { isClosing = true; buffer += '/'; i++; }

    const { name, end } = readTagName(source, i);
    buffer += name; i = end;

    if (isClosing) {
      while (i < source.length && source[i] !== '>') { buffer += source[i]; i++; }
      buffer += '>'; i++;
      stack.pop();
      return { closingRoot: stack.length === 0 };
    }

    let selfClosing = false;
    while (i < source.length) {
      if (source[i] === '{') { pushExpr(); continue; }
      if (source[i] === '"' || source[i] === "'") {
        const start = i; i = skipStringLiteral(source, i, source[i]); buffer += source.slice(start, i); continue;
      }
      if (source[i] === '/' && source[i + 1] === '>') { selfClosing = true; buffer += '/>'; i += 2; break; }
      if (source[i] === '>') { buffer += '>'; i++; break; }
      buffer += source[i]; i++;
    }

    if (!selfClosing) stack.push(name);
    return { closingRoot: false };
  }

  readTag();
  while (stack.length > 0 && i < source.length) {
    if (source[i] === '<') {
      const { closingRoot } = readTag();
      if (closingRoot) break;
      continue;
    }
    if (source[i] === '{') { pushExpr(); continue; }
    buffer += source[i]; i++;
  }

  flush();
  return { segments, endCursor: i };
}
