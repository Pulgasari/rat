// @rat/runtime :: patterns

/*
named cases (d-30, ideas 5). the compiler turns

  case Failed = { status: 'error', message };

into a pattern: a function that returns the parts it hands out ({ message }) or
null when the value does not match. anything that is not a pattern compares
with Object.is, so a @switch can mix both:

  @switch ($state)
    @case Loading: …
    @case Failed:  <p>{message}</p>
    @case 'idle':  …
*/

import { isFn } from './shared.js';

//die benennung hier is so herrlich bekloppt
const PATTERN   = Symbol('rat.pattern');
const pattern   = fn    => Object.defineProperty(fn, PATTERN, { value: true });
const isPattern = value => isFn(value) && value[PATTERN] === true;

/*
what else a test can be, for is, @case and match:

  a schema                      Num.range(0, 255), any standard schema: validated, cast() gives the value it made
  String, Number, Boolean …     typeof
  a class                       Element, Date: instanceof (a function whose name starts with a capital)
  a predicate                   isIterable: what it returns
  a RegExp                      a string it matches
  anything else                 Object.is
*/
const NONE   = Symbol('rat.none');
const TYPEOF = new Map([[BigInt, 'bigint'], [Boolean, 'boolean'], [Function, 'function'], [Number, 'number'], [String, 'string'], [Symbol, 'symbol']]);

const isClass  = fn    => /^[A-Z]/.test(fn.name) && typeof fn.prototype === 'object';
const isSchema = value => isFn(value?.['~standard']?.validate);

// the value the test lets through, as a schema made it, or NONE
function cast (value, test) {
  if (isPattern(test)) return test(value) != null ? value : NONE;
  if (isSchema(test)) {
    const result = test['~standard'].validate(value);
    if (isFn(result?.then)) throw new TypeError('[rat] an async schema can not be a test');
    return result.issues ? NONE : result.value;
  }
  if (TYPEOF.has(test))       return typeof value === TYPEOF.get(test) ? value : NONE;
  if (isFn(test))             return (isClass(test) ? value instanceof test : test(value)) ? value : NONE;
  if (test instanceof RegExp) return typeof value === 'string' && test.test(value) ? value : NONE;
  return Object.is(value, test) ? value : NONE;
}

const partsOf = (value, test) => isPattern(test) ? test(value) : cast(value, test) !== NONE ? {} : null;
const is      = (value, test) => partsOf(value, test) != null;

// the first test the value matches: { index, parts }, index -1 for none
function which (value, tests) {
  for (let index = 0; index < tests.length; index++) {
    const parts = partsOf(value, tests[index]);
    if (parts != null) return { index, parts };
  }
  return { index: -1, parts: null };
}

// :::::: EXPORT

export { NONE, cast, is, isPattern, pattern, which };
