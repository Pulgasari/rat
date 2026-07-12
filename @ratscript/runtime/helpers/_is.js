// @ratscript/runtime/helpers/_is.js

import List   from './../builtin/List.js';
import Record from './../builtin/Record.js';
import Struct from './../builtin/Struct.js'
import Trait  from './../builtin/Trait.js';
import Tuple  from './../builtin/Tuple.js';
import Type   from './../builtin/Type.js';
import Union  from './../builtin/Union.js';


export default function _is (value, pattern) {
  // Structural List Comparison
  if (List.isList(value) && List.isList(pattern)) {
    return value.equals(pattern);
  }
  
  // Record & Struct Matching
  if (Record.isRecord(value) && Struct.isStruct(pattern)) {
    return value.struct === pattern; // Stimmt die Blaupause überein?
  }

  // Trait
  //if (Trait.isTrait(type)) {
  //  return Trait.has(target, type);
  //}

  // Tuple Structural Matching
  if (Tuple.isTuple(value) && Tuple.isTuple(pattern)) {
    return value.equals(pattern);
  }
  
  if (Union.isUnion(value)) {
    if (typeof pattern === 'function' && pattern.$union) {
      return value.$union === pattern.$union && value.$variant === pattern.$variant;
    }
    if (Union.isUnion(pattern)) {
      return value.$union === pattern.$union && value.$variant === pattern.$variant;
    }
  }

  if (value === pattern) return true;

  if (typeof pattern === 'function') {
    // RatScript-eigene Constructors bleiben hier (Type kennt sie bewusst nicht,
    // um keine zirkuläre Abhängigkeit Type -> List/Record/Tuple zu erzeugen)
    if (pattern === List)   return List.isList(value);
    if (pattern === Record) return Record.isRecord(value);
    if (pattern === Tuple)  return Tuple.isTuple(value);

    // Alles andere (JS-Primitive-Constructors, Custom Classes, Prädikate) -> zentralisiert
    return Type.isType(value, pattern);
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





import List   from './../types/List.js';
import Record from './../types/Record.js';
import Struct from './../types/Struct.js'
import Trait  from './../types/Trait.js';
import Tuple  from './../types/Tuple.js';
import Union  from './../types/Union.js';

export default function _is (value, pattern) {
  // Structural List Comparison
  if (List.isList(value) && List.isList(pattern)) {
    return value.equals(pattern);
  }
  
  // Record & Struct Matching
  if (Record.isRecord(value) && Struct.isStruct(pattern)) {
    return value.struct === pattern; // Stimmt die Blaupause überein?
  }

  // Trait
  //if (Trait.isTrait(type)) {
  //  return Trait.has(target, type);
  //}

  // Tuple Structural Matching
  if (Tuple.isTuple(value) && Tuple.isTuple(pattern)) {
    return value.equals(pattern);
  }
  
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
    // Primitive Constructors: JavaScript
    if (pattern === Array)   return Array.isArray(value);
    if (pattern === Boolean) return typeof value === 'boolean';
    if (pattern === Number)  return typeof value === 'number';
    if (pattern === Object)  return typeof value === 'object' && value !== null;
    if (pattern === RegExp)  return value instanceof RegExp;
    if (pattern === String)  return typeof value === 'string';
    
    // Primitive Constructors: RatScript
    if (pattern === List)    return List.isList(value);
    if (pattern === Record)  return Record.isRecord(value);
    if (pattern === Tuple)   return Tuple.isTuple(value);

    // Echte Instanz-Prüfung für Custom Classes (z.B. user is Admin)
    try       { if (value instanceof pattern) return true; } 
    catch (_) {}

    // Fallback: RatScript 'cond' or Prädikats-Funktion
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
