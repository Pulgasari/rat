// @rat/types :: List

/*
List is a data type and, called, its schema, like every type here:

  const tags = new List(['a', 'b']);   // a list
  const Tags = List(Str);              // the schema of a list of strings

List is a plain class, not an Array subclass: an array's length and index
access are no methods and could only be caught with a proxy. a List has length
as a getter and at(index) / set(index, value) instead of [index]. $List, its
reactive variant, is in reactive.js.
*/

import { Schema, typed } from './schema.js';

// ::: the data type

class ListType {
  #items;

  constructor (items = []) { this.#items = [...items]; }

  static from (items) { return new this(items); }
  static of   (...items) { return new this(items); }

  get length () { return this.#items.length; }

  at       (index) { return this.#items.at(index); }
  includes (value) { return this.#items.includes(value); }
  indexOf  (value) { return this.#items.indexOf(value); }

  every     (fn) { return this.#items.every(fn); }
  filter    (fn) { return this.#items.filter(fn); }
  find      (fn) { return this.#items.find(fn); }
  findIndex (fn) { return this.#items.findIndex(fn); }
  flatMap   (fn) { return this.#items.flatMap(fn); }
  forEach   (fn) { this.#items.forEach(fn); }
  join      (separator) { return this.#items.join(separator); }
  map       (fn) { return this.#items.map(fn); }
  reduce    (...args) { return this.#items.reduce(...args); }
  slice     (start, end) { return this.#items.slice(start, end); }
  some      (fn) { return this.#items.some(fn); }
  toArray   () { return [...this.#items]; }
  toJSON    () { return this.toArray(); }

  [Symbol.iterator] () { return this.#items[Symbol.iterator](); }

  push    (...items) { return this.#items.push(...items); }
  pop     () { return this.#items.pop(); }
  shift   () { return this.#items.shift(); }
  unshift (...items) { return this.#items.unshift(...items); }
  splice  (...args) { return this.#items.splice(...args); }
  sort    (fn) { this.#items.sort(fn); return this; }
  reverse () { this.#items.reverse(); return this; }

  set     (index, value) { this.#items[index < 0 ? this.#items.length + index : index] = value; return this; }
  remove  (value) { const index = this.#items.indexOf(value); if (index > -1) this.#items.splice(index, 1); return index > -1; }
  replace (items) { this.#items = [...items]; return this; }
  clear   () { this.#items.length = 0; return this; }
}

Object.defineProperty(ListType, 'name', { value: 'List' });

// ::: the schema

class ListSchema extends Schema {
  min (length) { return this.check(value => value.length >= length, `at least ${length} items`, { min: length }); }
  max (length) { return this.check(value => value.length <= length, `at most ${length} items`,  { max: length }); }
}

// an array or a List, every item checked and coerced. a new one (of the same kind) only when an item changed,
// so an unchanged list stays the same object
const listOf = item => new ListSchema({
  describe : { item: item.describe },
  initial  : [],
  kind     : 'list',
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

const List = typed(ListType, listOf);

// :::::: EXPORT

export { List, ListSchema };
