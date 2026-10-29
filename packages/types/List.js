// @rat/types :: List, $List

/*
List is a data type and, called, its schema, like every type here:

  const tags = new List(['a', 'b']);   // a list, any items
  const Tags = List(Str);              // the schema of a list of strings
  const own  = Tags.create(['a']);     // a list that knows its schema: new List(Tags, ['a']) as well

a list made from a schema checks what comes in (push, unshift, set, splice, replace, toggle): an item is
coerced, a wrong one throws. an item that is a data type of its own (a $Record) comes in as one:

  const $tabs = $List($Record({ path: Path, '?source': Str })).create();
  $tabs.push({ path: 'photos' });    // a $Record, path a Path, source null
  $tabs.push(tab);                   // a $Record of that schema already: the same object

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

import { by, has, keyBy, one, pluck, where, without } from './query.js';
import { Schema, isSchema, issue, madeBy, partsIn, schemaOf, typed, variant } from './schema.js';

// ::: DATA TYPE

let checked = false;   // the items of a copy came out of a list of the same schema: not checked again

class ListType {
  #items;
  #schema;   // the List schema, null for a list without one
  #item;     // the schema of an item

  // new List(items), new List(schema, items), new List(other): a copy, with its schema
  constructor (source = [], items) {
    const copy   = source instanceof ListType;
    const schema = copy ? source.schema : isSchema(source) ? source : null;
    if (schema && schema.kind !== 'list') throw new TypeError('[rat] a List needs items or a List schema');

    this.#schema = schema;
    this.#item   = schema?.parts.item ?? null;
    this.#items  = copy || checked || !schema ? [...(copy ? source.toArray() : schema ? items : source)] : this.#all(items ?? schema.initial);
  }

  // items as they come in: each made a data type (create fills what is missing), else the list checked at once
  #all (items) { return this.#item.factory ? [...items].map(item => this.#in(item)) : this.#schema.parse([...items]); }

  get schema () { return this.#schema; }

  static from    (items) { return new this(items); }
  static of   (...items) { return new this(items); }

  // an item as it comes in: through the item schema, made a data type when the item is one
  #in (value) {
    const item = this.#item;
    if (!item) return value;
    if (!item.factory) return item.parse(value);
    return madeBy(value) === item ? value : item.create(value);
  }

  // a copy with the same items keeps the schema, one whose items may differ (map) does not
  #same (items) {
    if (!this.#schema) return new ListType(items);
    checked = true;
    try { return new ListType(this.#schema, items); }
    finally { checked = false; }
  }

  get length () { return this.#items.length; }

  at       (index) { return this.#items.at(index); }
  includes (value) { return this.#items.includes(value); }
  indexOf  (value) { return this.#items.indexOf(value); }

  every     (fn)         { return this.#items.every(fn); }
  filter    (fn)         { return this.#same(this.#items.filter(fn)); }
  find      (fn)         { return this.#items.find(fn); }
  findIndex (fn)         { return this.#items.findIndex(fn); }
  flatMap   (fn)         { return new ListType(this.#items.flatMap(fn)); }
  forEach   (fn)         { this.#items.forEach(fn); }
  join      (separator)  { return this.#items.join(separator); }
  map       (fn)         { return new ListType(this.#items.map(fn)); }
  reduce    (...args)    { return this.#items.reduce(...args); }
  slice     (start, end) { return this.#same(this.#items.slice(start, end)); }
  some      (fn)         { return this.#items.some(fn); }
  toArray   ()           { return [...this.#items]; }
  toJSON    ()           { return this.toArray(); }

  has     (test) { return has(test)(this.#items); }
  keyBy   (key)  { return keyBy(key)(this.#items); }
  one     (test) { return one(test)(this.#items); }
  pluck   (key)  { return new ListType(pluck(key)(this.#items)); }
  where   (test) { return this.#same(where(test)(this.#items)); }
  without (test) { return this.#same(without(test)(this.#items)); }

  toReversed ()                         { return this.#same(this.#items.toReversed()); }
  toSorted   (fn)                       { return this.#same(this.#items.toSorted(fn)); }
  toSortedBy (...keys)                  { return this.#same(this.#items.toSorted(by(...keys))); }
  toSpliced  (start, count, ...items)   { return this.#same(this.#items.toSpliced(start, count, ...items.map(item => this.#in(item)))); }
  with       (index, value)             { return this.#same(this.#items.with(index, this.#in(value))); }

  [Symbol.iterator] () { return this.#items[Symbol.iterator](); }

  push    (...items) { return this.#items.push(...items.map(item => this.#in(item))); }
  pop     ()         { return this.#items.pop(); }
  shift   ()         { return this.#items.shift(); }
  unshift (...items) { return this.#items.unshift(...items.map(item => this.#in(item))); }

  splice (start, ...rest) {
    if (!rest.length) return this.#items.splice(start);
    const [count, ...items] = rest;
    return this.#items.splice(start, count, ...items.map(item => this.#in(item)));
  }
  sort    (fn)       { this.#items.sort(fn); return this; }
  sortBy  (...keys)  { this.#items.sort(by(...keys)); return this; }
  reverse ()         { this.#items.reverse(); return this; }

  set     (index, value) { this.#items[index < 0 ? this.#items.length + index : index] = this.#in(value); return this; }
  remove  (value)        { const index = this.#items.indexOf(value); if (index > -1) this.#items.splice(index, 1); return index > -1; }
  replace (items)        { this.#items = this.#schema ? this.#all(items) : [...items]; return this; }

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

// ::: SCHEMA

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
      if (!list && !Array.isArray(value)) return issue('expected a list', path);
      const result = partsIn((list ? value.toArray() : value).map((entry, index) => [index, item, entry]), path);
      if (result.issues || !result.changed) return result.issues ? result : { value };
      return { value: list ? new value.constructor(result.values) : result.values };
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

const List  = typed(ListType, listOf, { kind: 'list', name: 'List' });
const $List = variant(List, { reads: LIST_READS, writes: LIST_WRITES });

// :::::: EXPORT

export { LIST_READS, LIST_WRITES, List, $List };
