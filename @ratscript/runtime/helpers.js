// @ratscript/runtime/helpers.js

// +=
export function _assign (left, right) {
  //
  if (left === undefined || left === null) return right;

  // Number | String
  if (typeof left === 'number' || typeof left === 'string') {
    return left + right;
  }

  // Array
  if (Array.isArray(left)) {
    left.push(right);
    return left;
  }

  // Map
  if (left instanceof Set) {
    left.add(right);
    return left;
  }

  // Map
  if (left instanceof Map) {
    if (Array.isArray(right) && right.length === 2) {
      left.set(right[0], right[1]); // map += ['key', 'value']
    } else if (typeof right === 'object' && right !== null) {
      for (let [k, v] of Object.entries(right)) left.set(k, v); // map += { key: 'value' }
    }
    return left;
  }

  // Object
  if (typeof left === 'object') {
    return Object.assign(left, right);
  }

  // Fallback
  return left + right; 
}

export function _inc (needle, haystack) {
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

export function _is (value, pattern) {
  // 1. Identität & primitive Strikt-Gleichheit
  // (Strings, Numbers, Booleans, null, undefined)
  if (value === pattern) return true;

  // 2. Pattern is a Function 
  // (Constructor, Class, RatScript-Cond)
  if (typeof pattern === 'function') {
    // A) Built-in JavaScript Primitiv-Konstruktoren abfangen
    if (pattern === Array)   return Array.isArray(value);
    if (pattern === Boolean) return typeof value === 'boolean';
    if (pattern === Number)  return typeof value === 'number';
    if (pattern === Object)  return typeof value === 'object' && value !== null;
    if (pattern === RegExp)  return value instanceof RegExp;
    if (pattern === String)  return typeof value === 'string';

    // B) Echte Instanz-Prüfung für Custom Classes (z.B. user is Admin)
    try       { if (value instanceof pattern) return true; } 
    catch (_) {}

    // C) Fallback: RatScript 'cond' or Prädikats-Funktion
    try       { return !!pattern(value); } 
    catch (_) { return false; }
  }

  // 3. Structural Object Matching (Deep Shape Matching)
  if (typeof pattern === 'object' && pattern !== null && typeof value === 'object' && value !== null) {
    for (let key of Object.keys(pattern)) {
      // Rekursiver Aufruf erlaubt sogar tief verschachtelte Shapes!
      if (!_is(value[key], pattern[key])) return false;
    }
    return true;
  }

  return false;
}
