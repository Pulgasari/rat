// @rat/types :: Array

/*
every array gets these methods: a plain one, a $Array, the result of a filter. not enumerable, so a
for…in over an array sees none of them.

  a test   what match.js takes: a value, an object of tests per key ({ status: 'reading',
           year: year => year > 1900 }), a function, a RegExp, a schema, a class
  a key    a name or a function of the item

some have two names for now (exclude / without, purge / drop): the one that proves itself stays.
*/

// :::::: IMPORT

import { is }             from './../match.js';
import { isFn, isString } from './../_shared.js';

// :::::: HELPERS

const getterOf = key => isFn(key) ? key : item => item?.[key];

// strings naturally ('2' before '10', case and accents aside), anything else by < and >
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
const compare  = (a, b) => isString(a) && isString(b) ? collator.compare(a, b) : a < b ? -1 : a > b ? 1 : 0;

const isDirection = value => value === 'asc' || value === 'desc';
const signOf      = direction => direction === 'desc' ? -1 : 1;

// the rules of an order, each { get, sign }:
//   'title'                              ascending
//   'title', 'desc'                      descending
//   'artist', 'album', 'desc', 'track'   by each in order, 'desc' flips the key before it
//   ['author', 'title']                  the same as a list
//   { year: 'desc', title: 'asc' }       by each, in order
//   book => book.title.length            by what the function gives
function rulesOf (spec) {
  const [first] = spec;
  if (spec.length === 1 && Array.isArray(first)) return rulesOf(first);
  if (spec.length === 1 && first && typeof first === 'object') return Object.entries(first).map(([key, direction]) => ({ get: getterOf(key), sign: signOf(direction) }));

  const rules = [];
  for (const key of spec) {
    if (isDirection(key) && rules.length) rules.at(-1).sign = signOf(key);
    else rules.push({ get: getterOf(key), sign: 1 });
  }
  return rules;
}

// the comparator of sortBy, for a sort of your own: items.toSorted(by('year', 'desc')). nullish goes last, either way
function by (...spec) {
  const rules = rulesOf(spec);
  return (a, b) => {
    for (const { get, sign } of rules) {
      const left  = get(a);
      const right = get(b);
      if (left == null || right == null) {
        if (left == null && right == null) continue;
        return left == null ? 1 : -1;
      }
      const result = compare(left, right);
      if (result) return sign * result;
    }
    return 0;
  };
}

// a negative index counts from the end, as at() does
const indexOf = (array, index) => index < 0 ? array.length + index : index;

// the items that match go, in place. how many went
function removeWhere (array, test) {
  let kept = 0;
  for (const item of array) if (!is(item, test)) array[kept++] = item;
  const gone = array.length - kept;
  array.length = kept;
  return gone;
}

// :::::: METHODS

const METHODS = {

  // ::: TESTS

  where (test) { return this.filter(item => is(item, test)); },

  // at least one key of criteria matches: whereSome({ author: name, title: name })
  whereSome (criteria) {
    const keys = Object.keys(criteria);
    return this.filter(item => keys.some(key => is(item?.[key], criteria[key])));
  },

  exclude (test) { return this.filter(item => !is(item, test)); },

  // the first that matches, without a test the first item
  first (test) { return test === undefined ? this[0] : this.find(item => is(item, test)); },

  has (test) { return this.some(item => is(item, test)); },
  all (test) { return this.every(item => is(item, test)); },

  // ::: SHAPE

  // the value of key of every item
  pluck (key) { return this.map(getterOf(key)); },

  // { [value of key]: item }, a later item wins
  keyBy (key) {
    const get = getterOf(key);
    const out = {};
    for (const item of this) out[get(item)] = item;
    return out;
  },

  // { [value of key]: [items] }
  groupBy (key) {
    const get    = getterOf(key);
    const groups = {};
    for (const item of this) (groups[get(item)] ??= []).push(item);
    return groups;
  },

  // the first of each value of key, without a key the first of each item
  uniqueBy (key) {
    const get  = key === undefined ? item => item : getterOf(key);
    const seen = new Set;
    return this.filter(item => {
      const value = get(item);
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  },

  // case aside, in the given keys, else in the item itself (a string) or all its values. an empty query finds all
  search (query, keys) {
    const needle = String(query ?? '').trim().toLowerCase();
    if (!needle) return [...this];
    const textsOf = item => keys ? keys.map(key => getterOf(key)(item)) : isString(item) ? [item] : Object.values(item ?? {});
    return this.filter(item => textsOf(item).some(text => text != null && String(text).toLowerCase().includes(needle)));
  },

  // ::: ORDER

  sortBy     (...spec) { return this.sort(by(...spec)); },        // in place, as sort()
  toSortedBy (...spec) { return this.toSorted(by(...spec)); },    // a sorted copy, as toSorted()

  // ::: IN PLACE

  swap (a, b) {
    const left  = indexOf(this, a);
    const right = indexOf(this, b);
    [this[left], this[right]] = [this[right], this[left]];
    return this;
  },

  // the items that match go
  purge (test) { removeWhere(this, test); return this; },

  // this one item goes (by identity). true if it was there
  remove (value) {
    const index = this.indexOf(value);
    if (index > -1) this.splice(index, 1);
    return index > -1;
  },

  // other items in the same array
  replace (items) { this.splice(0, this.length, ...items); return this; },

  clear () { this.length = 0; return this; },

  // out if it is in (by the test, else by identity), else in. true if it is in afterwards
  toggle (value, test = value) {
    if (removeWhere(this, test)) return false;
    this.push(value);
    return true;
  },
};

// second names, see the head
METHODS.without = METHODS.exclude;
METHODS.drop    = METHODS.purge;

for (const [name, method] of Object.entries(METHODS)) {
  Object.defineProperty(Array.prototype, name, { configurable: true, value: method, writable: true });
}

// :::::: EXPORT

export { by };
