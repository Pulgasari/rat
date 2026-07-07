// @ratscript/runtime/helpers/_inc.js

export default function _inc (needle, haystack) {
  if (!haystack) return false;
  if (Array.isArray(haystack) || typeof haystack === 'string') {
    return haystack.includes(needle);
  }
  if (haystack instanceof Set || haystack instanceof Map) {
    return haystack.has(needle);
  }
  if (typeof haystack === 'object') {
    return needle in haystack;
  }
  return false;
}
