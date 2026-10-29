// @rat/types :: List

/*
List is a data type and, called, its schema, like every type here:

  const tags = new List(['a', 'b']);   // a list
  const Tags = List(Str);              // the schema of a list of strings

List is a plain class, not an Array subclass: an array's length and index
access are no methods and could only be caught with a proxy. a List has length
as a getter and at(index) / set(index, value) instead of [index]. $List, its
reactive variant, is below.

what gives a list gives a List (filter, map, flatMap, slice, where …), toArray()
an array. the query vocabulary of query.js as methods:

  tracks.where({ album }).toSortedBy('track').pluck('title')
  tracks.without({ id })
  tracks.one({ id })   tracks.has({ status: 'reading' })   tracks.keyBy('id')

as with the array methods, the short name changes the list, to… gives a copy:
sort / toSorted, sortBy / toSortedBy, reverse / toReversed, splice / toSpliced,
set / with. on a $List the first ones are writes.

drop and toggle change the list by a test, like where and without read it:

  tags.drop('old')                              // every item the test lets through, gone: how many
  bookmarks.toggle({ folder, name, path })      // gone where there was one, else added: there now?
  bookmarks.toggle(bookmark, { folder, path })  // a test of its own, the value is what is added
*/

import { reactive, register } from '@rat/signals';
import { by, has, keyBy, one, pluck, where, without } from './query.js';
import { Schema, schemaOf, typed } from './schema.js';

// ::: the data type

class ListType {
  #items;

  constructor (items = []) { this.#items = [...items]; }

  static from    (items) { return new this(items); }
  static of   (...items) { return new this(items); }

  get length () { return this.#items.length; }

  at       (index) { return this.#items.at(index); }
  includes (value) { return this.#items.includes(value); }
  indexOf  (value) { return this.#items.indexOf(value); }

  every     (fn)         { return this.#items.every(fn); }
  filter    (fn)         { return new ListType(this.#items.filter(fn)); }
  find      (fn)         { return this.#items.find(fn); }
  findIndex (fn)         { return this.#items.findIndex(fn); }
  flatMap   (fn)         { return new ListType(this.#items.flatMap(fn)); }
  forEach   (fn)         { this.#items.forEach(fn); }
  join      (separator)  { return this.#items.join(separator); }
  map       (fn)         { return new ListType(this.#items.map(fn)); }
  reduce    (...args)    { return this.#items.reduce(...args); }
  slice     (start, end) { return new ListType(this.#items.slice(start, end)); }
  some      (fn)         { return this.#items.some(fn); }
  toArray   ()           { return [...this.#items]; }
  toJSON    ()           { return this.toArray(); }

  has     (test) { return has(test)(this.#items); }
  keyBy   (key)  { return keyBy(key)(this.#items); }
  one     (test) { return one(test)(this.#items); }
  pluck   (key)  { return new ListType(pluck(key)(this.#items)); }
  where   (test) { return new ListType(where(test)(this.#items)); }
  without (test) { return new ListType(without(test)(this.#items)); }

  toReversed ()             { return new ListType(this.#items.toReversed()); }
  toSorted   (fn)           { return new ListType(this.#items.toSorted(fn)); }
  toSortedBy (...keys)      { return new ListType(this.#items.toSorted(by(...keys))); }
  toSpliced  (...args)      { return new ListType(this.#items.toSpliced(...args)); }
  with       (index, value) { return new ListType(this.#items.with(index, value)); }

  [Symbol.iterator] () { return this.#items[Symbol.iterator](); }

  push    (...items) { return this.#items.push(...items); }
  pop     ()         { return this.#items.pop(); }
  shift   ()         { return this.#items.shift(); }
  unshift (...items) { return this.#items.unshift(...items); }
  splice  (...args)  { return this.#items.splice(...args); }
  sort    (fn)       { this.#items.sort(fn); return this; }
  sortBy  (...keys)  { this.#items.sort(by(...keys)); return this; }
  reverse ()         { this.#items.reverse(); return this; }

  set     (index, value) { this.#items[index < 0 ? this.#items.length + index : index] = value; return this; }
  remove  (value)        { const index = this.#items.indexOf(value); if (index > -1) this.#items.splice(index, 1); return index > -1; }
  replace (items)        { this.#items = [...items]; return this; }

  drop (test) {
    const kept    = without(test)(this.#items);
    const dropped = this.#items.length - kept.length;
    this.#items = kept;
    return dropped;
  }

  toggle (value, test = value) {
    if (this.drop(test)) return false;
    this.push(value);
    return true;
  }
  clear   ()             { this.#items.length = 0; return this; }
}

Object.defineProperty(ListType, 'name', { value: 'List' });

// ::: the schema

class ListSchema extends Schema {
  min (length) { return this.check(value => value.length >= length, `at least ${length} items`, { min: length }); }
  max (length) { return this.check(value => value.length <= length, `at most ${length} items`,  { max: length }); }
}

// an array or a List, every item checked and coerced. a new one (of the same kind) only when an item changed,
// so an unchanged list stays the same object
function listOf (given) {
  const item = schemaOf(given);
  return new ListSchema({
    describe : { item: item.describe },
    initial  : [],
    kind     : 'list',
    parts    : { item },
    run      : (value, path) => {
      const list = value instanceof ListType;
      if (!list && !Array.isArray(value)) return { issues: [{ message: 'expected a list', path }] };
      const items  = list ? value.toArray() : value;
      const issues = [];
      const out    = items.map((entry, index) => {
        const result = item.validate(entry, [...path, index]);
        if (result.issues) issues.push(...result.issues);
        return result.value;
      });
      if (issues.length) return { issues };
      if (!out.some((entry, index) => entry !== items[index])) return { value };
      return { value: list ? new value.constructor(out) : out };
    },
  });
}


// ::: List + $List

const LIST_READS = [
  'length', 'at', 'includes', 'indexOf', 'every', 'filter', 'find', 'findIndex', 'flatMap', 'forEach', 'join', 'map', 'reduce', 'slice', 'some', 'toArray', 'toJSON', Symbol.iterator,
  'has', 'keyBy', 'one', 'pluck', 'where', 'without', 'toReversed', 'toSorted', 'toSortedBy', 'toSpliced', 'with',
];

const LIST_WRITES = {
  clear   : list => list.length > 0,
  drop    : (list, test) => list.has(test),
  pop     : list => list.length > 0,
  push    : (list, ...items) => items.length > 0,
  remove  : (list, value) => list.includes(value),
  replace : true,
  reverse : list => list.length > 1,
  set     : (list, index, value) => !Object.is(list.at(index), value),
  shift   : list => list.length > 0,
  sort    : list => list.length > 1,
  sortBy  : list => list.length > 1,
  splice  : true,
  toggle  : true,
  unshift : (list, ...items) => items.length > 0,
};

// create(items): the items checked, a List holds no schema of its own
const ofItems = (Type, schema, items = []) => new Type(schema.parse(items));

const List = typed(ListType, listOf, ofItems);

const $List = typed(reactive(List, { reads: LIST_READS, writes: LIST_WRITES }), listOf, ofItems);

register (List, $List);

// :::::: EXPORT

export { LIST_READS, LIST_WRITES, List, $List, ListSchema };
