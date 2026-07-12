// @ratscript/runtime/builtin/Type.js

// Zentralisiert die "eigenwilligen" JS-Typ-Eigenheiten an EINER Stelle, statt sie
// über _is.js und potentiell andere Helper verstreut zu haben.

export default class Type {

  // Normalisierter Typname als String -> stabile, vorhersehbare Werte statt
  // typeof-Fallstricken (typeof null === 'object', typeof NaN === 'number', ...).
  static of (value) {
    if (value === null)       return 'null';
    if (value === undefined)  return 'undefined';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'number' && Number.isNaN(value)) return 'nan';
    return typeof value; // 'string' | 'number' | 'boolean' | 'object' | 'function' | 'symbol' | 'bigint'
  }

  static isNullish (value) {
    return value === null || value === undefined;
  }

  // Zentrale "value entspricht Konstruktor/Pattern"-Logik -> von _is.js genutzt
  // für den 'pattern ist eine Funktion'-Fall (Primitive Constructors, Custom Classes, Prädikate).
  static isType (value, pattern) {
    if (pattern === Array)   return Array.isArray(value);
    if (pattern === Boolean) return typeof value === 'boolean';
    if (pattern === Number)  return typeof value === 'number' && !Number.isNaN(value);
    if (pattern === Object)  return typeof value === 'object' && value !== null && !Array.isArray(value);
    if (pattern === RegExp)  return value instanceof RegExp;
    if (pattern === String)  return typeof value === 'string';

    try       { if (value instanceof pattern) return true; }
    catch (_) {}

    // Fallback: Prädikats-Funktion (z.B. RatScript 'cond')
    try       { return !!pattern(value); }
    catch (_) { return false; }
  }

  static isTypeOf (value, typeName) {
    return Type.of(value) === typeName;
  }
  
}
