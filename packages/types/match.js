// @rat/types :: match

/*
rat's switch, and the one place where a value is tested: match in plain js,
match, is, @match and named cases in rat files all come here.

  match(value, [
    [null,                                 ()               => [document.documentElement]],
    [String,                               target           => [...document.querySelectorAll(target)]],
    [Element,                              target           => [target]],
    [{ type: 'user', name: part('name') }, (user, { name }) => [user.element]],
  ], () => []);

arms are [test, result], tried from the top, the first that matches gives the
result: a function gets the value the test let through and the parts it bound,
anything else is the result as it is. nothing matches: otherwise, called with
the value when it is a function.

a test is

  a schema        Num.range(0, 255), Enum('a', 'b'), any standard schema: validated,
                  the value is what the schema made of it ('120' -> 120)
  String, Number, Boolean, BigInt, Symbol, Function, Object    typeof (Object: not null)
  a class         Element, Date …: instanceof (a function whose name starts with a capital)
  a predicate     isIterable, value => value > 3
  a RegExp        a string it matches
  an object       every key against its own test, the value may have more. not null
  an array        a tuple: as many items, each against its test. rest() at the end: at least as many
  any             anything
  part('name')    anything, handed out as a part (part('name', test): what test lets through)
  either(a, b)    the first of them that matches
  pattern(test, guard)   a named case: test, then guard(value, parts)
  anything else   a literal: Object.is (null, 'grid', 3)
*/

const isClass  = (sth) => /^[A-Z]/.test(sth.name) && typeof sth.prototype === 'object';
const isFn     = (sth) => typeof sth === 'function';
const isSchema = (sth) => isFn(sth?.['~standard']?.validate);

const NONE   = Symbol('rat.none');
const TYPEOF = new Map([[BigInt, 'bigint'], [Boolean, 'boolean'], [Function, 'function'], [Number, 'number'], [Object, 'object'], [String, 'string'], [Symbol, 'symbol']]);

class Either  { constructor (tests)       { this.tests = tests; } }
class Part    { constructor (name, test)  { this.name = name; this.test = test; } }
class Pattern { constructor (test, guard) { this.guard = guard; this.test = test; } }
class Rest    { constructor (name)        { this.name = name; } }

const any     = Object.freeze({});
const either  = (...tests)           => new Either(tests);
const part    = (name, test = any)   => new Part(name, test);
const pattern = (test, guard = null) => new Pattern(test, guard);
const rest    = (name = null)        => new Rest(name);

// the value the test lets through, its parts written into parts, or NONE
function walk (value, test, parts) {
  if (test === any) return value;
  if (test instanceof Part) {
    const passed = walk(value, test.test, parts);
    if (passed !== NONE) parts[test.name] = passed;
    return passed;
  }
  if (test instanceof Either) {
    for (const option of test.tests) {
      const own    = {};
      const passed = walk(value, option, own);
      if (passed !== NONE) return Object.assign(parts, own), passed;
    }
    return NONE;
  }
  if (test instanceof Pattern) {
    const own    = {};
    const passed = walk(value, test.test, own);
    if (passed === NONE || (test.guard && !test.guard(passed, own))) return NONE;
    return Object.assign(parts, own), passed;
  }
  if (isSchema(test)) {
    const result = test['~standard'].validate(value);
    if (isFn(result?.then)) throw new TypeError('[rat] an async schema can not be a test');
    return result.issues ? NONE : result.value;
  }
  if (TYPEOF.has(test))       return typeof value === TYPEOF.get(test) && value !== null ? value : NONE;
  if (isFn(test))             return (isClass(test) ? value instanceof test : test(value)) ? value : NONE;
  if (test instanceof RegExp) return typeof value === 'string' && test.test(value) ? value : NONE;
  if (Array.isArray(test)) {
    if (!Array.isArray(value)) return NONE;
    const tail  = test.at(-1) instanceof Rest ? test.at(-1) : null;
    const fixed = tail ? test.length - 1 : test.length;
    if (tail ? value.length < fixed : value.length !== fixed) return NONE;
    for (let index = 0; index < fixed; index++) if (walk(value[index], test[index], parts) === NONE) return NONE;
    if (tail?.name) parts[tail.name] = value.slice(fixed);
    return value;
  }
  if (test !== null && typeof test === 'object') {
    if (value == null) return NONE;
    for (const key of Object.keys(test)) if (walk(value[key], test[key], parts) === NONE) return NONE;
    return value;
  }
  return Object.is(value, test) ? value : NONE;
}

const pass = (value, test) => walk(value, test, {});
const is   = (value, test) => walk(value, test, {}) !== NONE;

// the first test the value matches: { index, parts }, index -1 for none
function which (value, tests) {
  for (let index = 0; index < tests.length; index++) {
    const parts = {};
    if (walk(value, tests[index], parts) !== NONE) return { index, parts };
  }
  return { index: -1, parts: null };
}

function match (value, arms, otherwise) {
  for (const [test, result] of arms) {
    const parts  = {};
    const passed = walk(value, test, parts);
    if (passed !== NONE) return isFn(result) ? result(passed, parts) : result;
  }
  return isFn(otherwise) ? otherwise(value) : otherwise;
}

// :::::: EXPORT

export { NONE, any, either, is, match, part, pass, pattern, rest, which };
