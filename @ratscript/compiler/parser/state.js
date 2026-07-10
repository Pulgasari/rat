// @ratscript/compiler/parser/state.js

// Modul-State für EINEN laufenden Parse-Vorgang (Singleton).
// Wird per init(tokens) vor jedem parse()-Aufruf zurückgesetzt.

import { keywords, operators, puncts, TokenType } from './../meta.js';

// :::::: TokenMap

const TOKEN_MAP = new Map();
for (const value of keywords)               TOKEN_MAP.set(value, { value, type: TokenType.KEYWORD  });
for (const value of puncts)                 TOKEN_MAP.set(value, { value, type: TokenType.PUNCT    });
for (const value of Object.keys(operators)) TOKEN_MAP.set(value, { value, type: TokenType.OPERATOR });

// :::::: Helpers

function resolveTokenQuery (typeOrValue, maybeValue) {
  return (maybeValue !== undefined)
    ? { type: typeOrValue, value: maybeValue }
    : TOKEN_MAP.get(typeOrValue) ?? null;
}

// :::::: State

let current;
let tokens;

export function init (inputTokens) {
  tokens  = inputTokens;
  current = 0;
}

// :::::: Navigate

export function advance  () { if (!isEOF()) current++; return previous(); }
export function peek     () { return tokens[current]; }
export function previous () { return tokens[current - 1]; }
export function isEOF    () { return isToken('EOF'); }

// :::::: Consume

export function isToken (typeOrValue, maybeValue) {
  const query = resolveTokenQuery(typeOrValue, maybeValue);
  if (!query) return false;

  const token = peek();
  return token.type  === query.type
      && token.value === query.value;
}

export function matchToken (typeOrValue, maybeValue) {
  if (isToken(typeOrValue, maybeValue)) {
    advance();
    return true;
  }
  return false;
}

export function consumeToken (typeOrValue, maybeValue, message) {
  if (isToken(typeOrValue, maybeValue)) return advance();
  const token = peek();
  const query = resolveTokenQuery(typeOrValue, maybeValue);
  throw new SyntaxError(`[Parser ${token.line}:${token.column}]: ${message || `Erwarte '${query?.value}'`} (Gefunden: '${token.value}')`);
}
