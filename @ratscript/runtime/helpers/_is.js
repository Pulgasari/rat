// @ratscript/runtime/helpers/_is.js

import Union from './../types/Union.js';

export default function _is (value, pattern) {
  if (Union.isUnion(value)) {
    if (typeof pattern === 'function' && pattern.$union) {
      return value.$union === pattern.$union && value.$variant === pattern.$variant;
    }
    if (Union.isUnion(pattern)) {
      return value.$union === pattern.$union && value.$variant === pattern.$variant;
    }
  }
  
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
