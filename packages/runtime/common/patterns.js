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
const partsOf   = (value, test) => isPattern(test) ? test(value) : Object.is(value, test) ? {} : null;
const is        = (value, test) => partsOf(value, test) != null;

// the first test the value matches: { index, parts }, index -1 for none
function which (value, tests) {
  for (let index = 0; index < tests.length; index++) {
    const parts = partsOf(value, tests[index]);
    if (parts != null) return { index, parts };
  }
  return { index: -1, parts: null };
}

// :::::: EXPORT

export { is, isPattern, pattern, which };
