// @ratscript/compiler/syntax/range.js

/**
 * Transformiert den RatScript Range-Operator (..) in den performanten Runtime-Generator.
 * Beispiel: 1..10     -> _range(1, 10)
 * Beispiel: 'a'..'z'  -> _range('a', 'z')
 * Beispiel: min..max  -> _range(min, max)
 */
export default function (code) {
  const rangeRegex = /\b([a-zA-Z0-9_$]+|'[^']+'|"[^"]+")\s*\.\.\s*([a-zA-Z0-9_$]+|'[^']+'|"[^"]+")/g;

  return code.replace(rangeRegex, '_proxyRangeOrIterable');
}

function _proxyRangeOrIterable (match, from, to) {
  return `_range(${from.trim()}, ${to.trim()})`;
}
