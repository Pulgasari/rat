// @rat/types :: List, $List

// :::::: IMPORT

import { by, has, keyBy, one, pluck, where, without } from './../query.js';
import { Schema, issue, madeBy, partsIn, schemaOf, typed, variant } from './../schema.js';
import { isArray, isSchema } from './../_shared.js';

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
      if (!list && !isArray(value)) return issue('expected a list', path);
      const result = partsIn((list ? value.toArray() : value).map((entry, index) => [index, item, entry]), path);
      if (result.issues || !result.changed) return result.issues ? result : { value };
      return { value: list ? new value.constructor(result.values) : result.values };
    },
  });
}

// ::: List + $List

const List  = typed(ListType, listOf, { kind: 'list', name: 'List' });
const $List = variant(List);

// :::::: EXPORT

export { List, $List };
