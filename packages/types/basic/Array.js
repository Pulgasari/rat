// @rat/types :: Array

// every array gets these methods, a plain one, a $Array, the result of a filter. not enumerable, so a
// for…in over an array sees none of them. a test is what match.js takes: a value, an object of tests per
// key ({ status: 'reading', year: year => year > 1900 }), a function, a RegExp, a schema, a class

// :::::: IMPORT

import { is } from './../match.js';
import { isFn, isString } from './../_shared.js';

// :::::: HELPERS

// a key: a name or a function of the item
const getterOf = (key) => isFn(key) ? key : (item) => item?.[key];

// strings naturally ('2' before '10', case and accents aside), anything else by < and >
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

function compare (a, b) {
  if (isString(a) && isString(b)) return collator.compare(a, b);
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

// what sortBy takes as the rules of the order, each [getter, 1 | -1]:
//   'title'                              ascending
//   'title', 'desc'                      descending
//   ['author', 'title']                  ascending by each, in order
//   { year: 'desc', title: 'asc' }       by each, in order
//   book => book.title.length            by what the function gives
function rulesOf (spec) {
  const [first, second] = spec;
  if (isString(second) && (second === 'asc' || second === 'desc')) return [[getterOf(first), second === 'desc' ? -1 : 1]];
  if (Array.isArray(first)) return first.map(key => [getterOf(key), 1]);
  if (first && typeof first === 'object') return Object.entries(first).map(([key, order]) => [getterOf(key), order === 'desc' ? -1 : 1]);
  return spec.map(key => [getterOf(key), 1]);
}

// nullish goes last, either way
function comparatorOf (spec) {
  const rules = rulesOf(spec);
  return (a, b) => {
    for (const [get, sign] of rules) {
      const left  = get(a);
      const right = get(b);
      if (left == null && right == null) continue;
      if (left == null)  return 1;
      if (right == null) return -1;
      const result = compare(left, right);
      if (result) return sign * result;
    }
    return 0;
  };
}

// a negative index counts from the end, as at() does
const indexOf = (array, index) => index < 0 ? array.length + index : index;

// :::::: METHODS

const METHODS = {

  // ::: TESTS

  where (test) { return this.filter(item => is(item, test)); },                                   // filterBy, keep

  // at least one key of criteria matches: whereSome({ author: name, title: name })
  whereSome (criteria) {                                                                          // whereAny
    const keys = Object.keys(criteria);
    return this.filter(item => keys.some(key => is(item?.[key], criteria[key])));
  },

  exclude (test) { return this.filter(item => !is(item, test)); },                                // drop

  // the first that matches, without a test the first item
  first (test) { return test === undefined ? this[0] : this.find(item => is(item, test)); },      // pick1, findBy

  has (test) { return this.some(item => is(item, test)); },                                       // contains
  all (test) { return this.every(item => is(item, test)); },                                      // everyBy

  // ::: SHAPE

  // { [value of key]: [items] }
  groupBy (key) {
    const get    = getterOf(key);
    const groups = {};
    for (const item of this) (groups[get(item)] ??= []).push(item);
    return groups;
  },

  // the first of each value of key, without a key the first of each item
  uniqueBy (key) {                                                                                // distinct
    const get  = key === undefined ? (item) => item : getterOf(key);
    const seen = new Set;
    return this.filter(item => {
      const value = get(item);
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  },

  // case aside, in the given keys, else in the item itself (a string) or all its values. an empty query finds all
  search (query, keys) {                                                                          // lookFor, matchText
    const needle = String(query ?? '').trim().toLowerCase();
    if (!needle) return [...this];
    const textsOf = (item) => keys ? keys.map(key => getterOf(key)(item)) : isString(item) ? [item] : Object.values(item ?? {});
    return this.filter(item => textsOf(item).some(text => text != null && String(text).toLowerCase().includes(needle)));
  },

  // ::: ORDER

  sortBy     (...spec) { return this.sort(comparatorOf(spec)); },        // in place, as sort()
  toSortedBy (...spec) { return this.toSorted(comparatorOf(spec)); },    // a sorted copy, as toSorted()

  // ::: IN PLACE

  swap (a, b) {                                                                                   // swapAt
    const left  = indexOf(this, a);
    const right = indexOf(this, b);
    [this[left], this[right]] = [this[right], this[left]];
    return this;
  },

  // the items that match go, in place
  purge (test) {
    let kept = 0;
    for (const item of this) if (!is(item, test)) this[kept++] = item;
    this.length = kept;
    return this;
  },
};

for (const [name, method] of Object.entries(METHODS)) {
  Object.defineProperty(Array.prototype, name, { configurable: true, value: method, writable: true });
}
