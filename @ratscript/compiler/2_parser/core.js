// @ratscript/compiler/parser/core.js

// :::::: { key: value, method (params) { ... }, ... }
// Wird von parsePrimary (ObjectExpression) UND parsed.TraitDeclaration (Trait-Body) genutzt.

export function parseObjectProperties () {
  consumeToken('{');
  const properties = [];

  if (!isToken('}')) {
    do {
      if (isToken('}')) break; // erlaubt trailing comma vor '}'

      // Methoden-Shorthand: name (params) { body }  -> IDENTIFIER direkt gefolgt von '('
      if (isToken('IDENTIFIER') && peekNext()?.value === '(') {
        const { name, params, body } = parsed.MethodLike;
        properties.push({ kind: 'method', key: name, params, body });
      } else {
        const keyToken = consumeToken('IDENTIFIER');
        consumeToken(':');
        const value = parsed.Assignment; // NICHT parseExpression -> ',' trennt Properties, keine Komma-Expression
        properties.push({ kind: 'init', key: keyToken.value, value });
      }
    } while (matchToken(','));
  }

  consumeToken('}');
  return properties;
}
