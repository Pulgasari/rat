// @rat/types :: query

/*
the query vocabulary of a list, data last: each takes its arguments and gives a function of the list,
so it fits rat's pipe and plain calls alike. a list is an array or any iterable (a List), the result an
array. List, $List and Table have the same as methods, with a List back (List.js).

  rows |> where({ album }) |> toSortedBy('track') |> pluck('title')
  toSortedBy('artist', 'album', 'track')(rows)

  where (test)           the items the test lets through
  without (test)         the items it does not
  one (test)             the first it lets through, or undefined
  has (test)             is there one
  pluck (key)            the value of key of every item
  keyBy (key)            { [value of key]: item }, a later item wins
  sortBy (...keys)       sorts the list itself (an array, a List), as sort does
  toSortedBy (...keys)   a sorted copy, as toSorted does

a test is one of match.js: a literal, an object of tests per key, a RegExp, a schema, a class, a
predicate … a key is a name or a function of the item. by(...keys) is the comparator: the keys in
order, 'desc' after a key flips it ('asc' is the default). strings compare naturally ('2' before
'10', case and accents aside), nullish goes last either way.
*/

import { is } from './match.js';

const arrayOf  = list => Array.isArray(list) ? list : [...list];
const getterOf = key  => typeof key === 'function' ? key : item => item?.[key];

// :::::: ORDER

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

const compare = (a, b) => typeof a === 'string' && typeof b === 'string' ? collator.compare(a, b) : a < b ? -1 : a > b ? 1 : 0;

function by (...keys) {
  const rules = [];
  for (const key of keys) {
    if (key === 'asc' || key === 'desc') { if (rules.length) rules.at(-1).sign = key === 'desc' ? -1 : 1; continue; }
    rules.push({ get: getterOf(key), sign: 1 });
  }

  return (a, b) => {
    for (const { get, sign } of rules) {
      const left = get(a), right = get(b);
      if (left == null || right == null) { if (left == null && right == null) continue; return left == null ? 1 : -1; }
      const result = compare(left, right);
      if (result) return sign * result;
    }
    return 0;
  };
}

// :::::: QUERY

const tester = test => item => is(item, test);

const where   = test => list => arrayOf(list).filter(tester(test));
const without = test => { const passes = tester(test); return list => arrayOf(list).filter(item => !passes(item)); };
const one     = test => list => arrayOf(list).find(tester(test));
const has     = test => list => arrayOf(list).some(tester(test));
const pluck   = key  => list => arrayOf(list).map(getterOf(key));
const keyBy   = key  => { const get = getterOf(key); return list => Object.fromEntries(arrayOf(list).map(item => [get(item), item])); };

const sortBy     = (...keys) => list => list.sort(by(...keys));
const toSortedBy = (...keys) => list => arrayOf(list).toSorted(by(...keys));

// :::::: EXPORT

export { by, has, keyBy, one, pluck, sortBy, toSortedBy, where, without };
