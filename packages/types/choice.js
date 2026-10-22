// @rat/types :: choice

/*
choice: rat's switch. cases are pairs of a test and what to do, tried from the
top, the first that matches wins. a function alone at the end is the fallback.

  const toElements = choice(
    [null,      ()     => [document.documentElement]],
    [Str,       target => [...document.querySelectorAll(target)]],
    [Element,   target => [target]],
    [isIterable, target => [...target].filter(isElement)],
    ()          => [],
  );

  toElements('.card');

a test is

  a schema        Num.range(0, 255), Enum('a', 'b'), Record({ … }), any standard schema:
                  validated, and the handler gets the value as the schema made it ('120' -> 120)
  String, Number, Boolean, BigInt, Symbol, Function    by typeof, nothing coerced
  a class         Element, Date, Map …: by instanceof (a function whose name starts with a capital)
  a predicate     isIterable, value => value > 3: true or false
  a RegExp        a string it matches
  an object       a pattern: every key matches its own test, the value may have more
  an array        a pattern of a tuple: as many items, each matching its test
  anything else   a literal: Object.is (null, 'grid', 3, true)

a handler gets the value and returns the result. a handler that is no function
is the result as it is. nothing matches and no fallback: undefined.

  choice.matches(test, value)    a single test, true or false
*/

const isArray    = Array.isArray;
const isClass    = (sth) => /^[A-Z]/.test(sth.name) && typeof sth.prototype === 'object';
const isFn       = (sth) => typeof sth === 'function';
const isRegExp   = (sth) => sth instanceof RegExp;
const isSchema   = (sth) => typeof sth?.['~standard']?.validate === 'function';
const isString   = (sth) => typeof sth === 'string';
const isThenable = (sth) => typeof sth?.then === 'function';

const NONE   = Symbol('none');
const TYPEOF = new Map([[BigInt, 'bigint'], [Boolean, 'boolean'], [Function, 'function'], [Number, 'number'], [String, 'string'], [Symbol, 'symbol']]);

// the value the test lets through (a schema's result), or NONE
function check (test, value) {
  if (isSchema(test)) {
    const result = test['~standard'].validate(value);
    if (typeof result?.then === 'function') throw new TypeError('[rat] choice: an async schema can not be a case');
    return result.issues ? NONE : result.value;
  }
  if (TYPEOF.has(test)) return typeof value === TYPEOF.get(test) ? value : NONE;
  if       (isFn(test)) return (isClass(test) ? value instanceof test : test(value)) ? value : NONE;
  if   (isRegExp(test)) return isString(value) && test.test(value) ? value : NONE;
  if    (isArray(test)) return isArray(value) && value.length === test.length && test.every((item, index) => check(item, value[index]) !== NONE) ? value : NONE;
  if (test !== null && typeof test === 'object') {
    if (value === null || typeof value !== 'object') return NONE;
    return Object.keys(test).every(key => check(test[key], value[key]) !== NONE) ? value : NONE;
  }
  return Object.is(test, value) ? value : NONE;
}

function choice (...cases) {
  const fallback = isFn(cases.at(-1)) ? cases.pop() : null;

  for (const entry of cases) {
    if (!isArray(entry) || entry.length !== 2) throw new TypeError('[rat] choice: a case is [test, handler], only the fallback stands alone at the end');
  }

  return value => {
    for (const [test, handler] of cases) {
      const passed = check(test, value);
      if (passed !== NONE) return isFn(handler) ? handler(passed) : handler;
    }
    return fallback ? fallback(value) : undefined;
  };
}

choice.matches = (test, value) => check(test, value) !== NONE;

// :::::: EXPORT

export { choice };
