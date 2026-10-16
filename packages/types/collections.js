// @rat/types :: collections

/*
the reactive variants of collections, made with reactive() from @rat/signals,
and registered there, so $() and every `let $x = …` in a .rat script pick them:

  let $todos = [];          // a signal holding a $List
  $todos.push(todo);        // reactive: whatever read $todos updates

  let $seen  = new Map;     // a signal holding a $Map
  $seen.set(id, true);

List is the data type, $List its reactive variant, like Map and $Map. List is a
plain class, not an Array subclass: an array's length and index access are no
methods and could only be caught with a proxy. a List has length as a getter
and at(index) / set(index, value) instead of [index]. the schema for "a list
of strings" is ListOf(Str), in schema.js.
*/

import { reactive, register } from '@rat/signals';

// ::: List

class List {
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

const LIST_READS = ['length', 'at', 'includes', 'indexOf', 'every', 'filter', 'find', 'findIndex', 'flatMap', 'forEach', 'join', 'map', 'reduce', 'slice', 'some', 'toArray', 'toJSON', Symbol.iterator];

const $List = reactive(List, {
  reads  : LIST_READS,
  writes : {
    clear   : list => list.length > 0,
    pop     : list => list.length > 0,
    push    : (list, ...items) => items.length > 0,
    remove  : (list, value) => list.includes(value),
    replace : true,
    reverse : list => list.length > 1,
    set     : (list, index, value) => !Object.is(list.at(index), value),
    shift   : list => list.length > 0,
    sort    : list => list.length > 1,
    splice  : true,
    unshift : (list, ...items) => items.length > 0,
  },
});

// ::: Map, Set

const $Map = reactive(Map, {
  reads  : ['get', 'has', 'size', 'keys', 'values', 'entries', 'forEach', Symbol.iterator],
  writes : {
    clear  : map => map.size > 0,
    delete : (map, key) => map.has(key),
    set    : (map, key, value) => !map.has(key) || !Object.is(map.get(key), value),
  },
});

const $Set = reactive(Set, {
  reads  : ['has', 'size', 'keys', 'values', 'entries', 'forEach', Symbol.iterator],
  writes : {
    add    : (set, value) => !set.has(value),
    clear  : set => set.size > 0,
    delete : (set, value) => set.has(value),
  },
});

// ::: registry

register(Array, $List);
register(List,  $List);
register(Map,   $Map);
register(Set,   $Set);

// :::::: EXPORT

export { $List, $Map, $Set, List };
