// @ratscript/runtime/types/List.js

function createIterator (values) {
  let index = 0;

  return {
    next() {
      return (index < values.length)
        ? { value: values[index++], done: false }
        : { value: undefined, done: true };
    }
  };
}

export default class List {

  // init
  constructor (...values) {
    this._type   = null;
    this._values = [];

    for (let v of values) {
      this._checkType(v);
      this._values.push(v);
    }
  }

  // methods: static
  static from (iterable) {
    const list = new List();
    for (let v of iterable) {
      list._checkType(v);
      list._values.push(v);
    }
    return list;
  }
  static isList (value) {
    return value instanceof List;
  }
  
  // iterator
  [Symbol.iterator]() {
    return createIterator(this._values);
  }

  // internal type checking
  _checkType (v) {
    if (this._type === null) {
      this._type = typeof v
    } else if (typeof v !== this._type) {
      throw new TypeError(`List expects type ${this._type}, got ${typeof v}`)
    }
  }

  // properties
  clear () {
    this._values.length = 0;
    return this;
  }
  get length () {
    return this._values.length
  }
  get type () {
    return this._type;
  }

  // methods: access
  at (index) {
    return this._values.at(index);
  }
  get (index) {
    if (index < 0 || index >= this._values.length) {
      throw new RangeError(`Index ${index} out of bounds`);
    }
    return this._values[index];
  }
  first () {
    return this._values[0];
  }
  last () {
    return this._values[this._values.length - 1];
  }
  with (index, value) {
    this._checkType(value);
    return this._values.with(index, value);
    //const result = this.clone();
    //result._values[index] = value;
    //return result;
  }

  // methods: mutation
  copyWithin (target, start, end) {
    this._values.copyWithin(target, start, end);
    return this;
  }
  remove (value) {
    const index = this._values.indexOf(value);
    if (index !== -1) {
      this._values.splice(index, 1);
    }
    return this;
  }
  remove (...values) {
    for (let value of values) {
      const index = this._values.indexOf(value);
      if (index !== -1) this._values.splice(index, 1);
    }
    return this;
  }
  push (v) {
    this._checkType(v);
    this._values.push(v);
    return this;
  }
  pop () {
    return this._values.pop();
  }
  set (index, v) {
    this._checkType(v);
    if (index < 0 || index >= this._values.length) {
      throw new RangeError(`Index ${index} out of bounds`);
    }
    this._values[index] = v;
    return this;
  }
  shift () {
    return this._values.shift();
  }
  unshift (v) {
    this._checkType(v);
    this._values.unshift(v);
    return this;
  }

  // methods: functional
  forEach (fn) {
    for (let value of this) {
      fn(value);
    }
  }
  map (fn) {
    const result = new List();
    for (let v of this._values) {
      const mapped = fn(v);
      result._checkType(mapped);
      result._values.push(mapped);
    }
    return result;
  }
  filter (fn) {
    const result = new List();
    result._type = this._type;
    for (let v of this._values) {
      if (fn(v)) result._values.push(v);
    }
    return result;
  }
  reduce (fn, initial) {
    let acc = initial;
    for (let v of this._values) {
      acc = fn(acc, v);
    }
    return acc;
  }

  // methods: structural
  slice (start, end) {
    const result = new List();
    result._type   = this._type;
    result._values = this._values.slice(start, end);
    return result;
  }
  splice (start, deleteCount, ...items) {
    for (let item of items) this._checkType(item);
    this._values.splice(start, deleteCount, ...items);
    return this;
  }
  reverse () {
    this._values.reverse();
    return this;
  }
  shuffle () {
    for (let i = this._values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._values[i], this._values[j]] = [this._values[j], this._values[i]];
    }
    return this;
  }
  sort (fn) {
    this._values.sort(fn);
    return this;
  }
  unique() {
    const result = new List();
    result._type = this._type;
    const seen = new Set();
    for (let v of this._values) {
      if (!seen.has(v)) {
        seen.add(v);
        result._values.push(v);
      }
    }
    return result;
  }
  zip (other) {
    if (!(other instanceof List)) {
      throw new TypeError("zip() expects another List");
    }

    const length = Math.min(this.length, other.length);
    const result = new List();

    / zip produces List<Pair>
    result._type = "object";

    for (let i = 0; i < length; i++) {
      result._values.push([this._values[i], other._values[i]]);
    }
    
    return result;
  }
  concat (...args) {
    return this._values.concat(...args);
  }
  merge (other) {
    if (!(other instanceof List)) throw new TypeError("merge() expects another List");
    if (other.type !== this.type) throw new TypeError(`merge() requires same element type: ${this.type} vs ${other.type}`);
    
    const result = this.clone();
    for (let v of other._values) {
      result._values.push(v);
    }
    return result;
  }
  flatMap (fn) {
    const result = new List();

    for (let v of this._values) {
      const mapped = fn(v);

      if (!(mapped instanceof List)) {
        throw new TypeError("flatMap() callback must return a List");
      }

      // determine type from first mapped list
      if (result._type === null && mapped._type !== null) {
        result._type = mapped._type;
      }

      for (let inner of mapped._values) {
        result._checkType(inner);
        result._values.push(inner);
      }
    }
    
    return result;
  }
  groupBy (fn) {
    const groups = {};

    for (let v of this._values) {
      const key = fn(v);

      if (!groups[key]) {
        groups[key]       = new List();
        groups[key]._type = this._type;
      }

      groups[key]._values.push(v);
    }
    //groups[Symbol.iterator] = () => createIterator(result._values);
    return groups;
  }

  //
  toMerged (other) {
    return this.clone().merge(other);
  }
  toRemoved (...values) {
    return this.clone().remove(...values);
  }
  toReversed () {
    return this.clone().reverse();
  }
  toShifted () {
    return this.clone().shift();
  }
  toSliced (...args) {
    return this.clone().slice(...args);
  }
  toSpliced (...args) {
    return this.clone().splice(...args);
  }
  toShuffled () {
    return this.clone().shuffle();
  }
  toSorted (fn) {
    return this.clone().sort(fn);
  }
  toUnshifted (v) {
    return this.clone().unshifted(v);
  }

  // checks
  includes (v) {
    return this._values.includes(v);
  }
  indexOf (v) {
    return this._values.indexOf(v);
  }
  equals (other) {
    if (!(other instanceof List))     return false;
    if (this._type  !== other._type)  return false;
    if (this.length !== other.length) return false;

    for (let i = 0; i < this.length; i++) {
      if (this._values[i] !== other._values[i]) return false;
    }
    return true;
  }
  every (fn) {
    for (let v of this._values) {
      if (!fn(v)) return false;
    }
    return true;
  }
  some (fn) {
    for (let v of this._values) {
      if (fn(v)) return true;
    }
    return false;
  }

  // others
  find (fn) {
    for (let v of this._values) {
      if (fn(v)) return v;
    }
    return undefined;
  }
  findIndex (fn) {
    for (let i = 0; i < this._values.length; i++) {
      if (fn(this._values[i])) return i;
    }
    return -1;
  }
  toArray () {
    return [...this._values];
  }

  // 
  clone () {
    const result = new List();
    result._type = this._type;
    result._values = [...this._values];
    return result;
  }
  get clone () {
    return this.clone();
  }

  // debug
  join (separator) {
    return this._values.join(separator);
  }
  toString () {
    return `List<${this._type}> ${JSON.stringify(this._values)}`;
  }

  // aliases
  any      (fn) { return this.some(fn); }
  contains (v)  { return this.includes(v); }
  has      (v)  { return this.includes(v); }
  
};

class NumberList extends List {
  
  constructor (...values) {
    super(...values);
    this._type = 'number';
  }

  //
  mutateItems (fn) {
    for (let i = 0; i < this._values.length; i++) {
      let oldValue = this._values[i];
      let newValue = fn(oldValue);
      this._values[i] = newValue;
    }
    return this;
  }

  // methods: mutate
  decrement (n = 1) {
    this.mutateItems( value => value + n );
    return this;
  }
  increment (n = 1) {
    this.mutateItems( value => value - n );
    return this;
  }
  decrement (n = 1) {
    for (let i = 0; i < this._values.length; i++) {
      this._values[i] -= n;
    }
    return this;
  }
  increment (n = 1) {
    for (let i = 0; i < this._values.length; i++) {
      this._values[i] += n;
    }
    return this;
  }
  clamp (min, max) {
    for (let i = 0; i < this._values.length; i++) {
      const v = this._values[i];
      this._values[i] = Math.min(max, Math.max(min, v));
    }
    return this;
  }
  round () {
    for (let i = 0; i < this._values.length; i++) {
      this._values[i] = Math.round(this._values[i]);
    }
    return this;
  }
  floor () {
    for (let i = 0; i < this._values.length; i++) {
      this._values[i] = Math.floor(this._values[i]);
    }
    return this;
  }
  ceil () {
    for (let i = 0; i < this._values.length; i++) {
      this._values[i] = Math.ceil(this._values[i]);
    }
    return this;
  }
  scale (factor) {
    for (let i = 0; i < this._values.length; i++) {
      this._values[i] *= factor;
    }
    return this;
  }

  //
  toDecremented (n = 1) { return this.clone().decrement(n); }
  toIncremented (n = 1) { return this.clone().increment(n); }
  
  toScaled (factor) {
    return this.clone().scale(factor);
  }
  toClamped (min, max) {
    return this.clone().clamp(min, max);
  }

  toCeiled  () { return this.clone().ceil();  }
  toFloored () { return this.clone().floor(); }
  toRounded () { return this.clone().round(); }
  
}

class StringList extends List {
  constructor (...values) {
    super(...values);
    this._type = 'string';
  }

  // methods: mutate
  toLowerCase () {
    for (let i = 0; i < this._values.length; i++) {
      this._values[i] = this._values[i].toLowerCase();
    }
    return this;
  }
  toUpperCase () {
    for (let i = 0; i < this._values.length; i++) {
      this._values[i] = this._values[i].toUpperCase();
    }
    return this;
  }

  // methods: non-mutating clones
  toLowerCased () { return this.clone().toLowerCase(); }
  toUpperCased () { return this.clone().toUpperCase(); }
  
}

/*
// :::::: ITERATOR

// by function
function createIterator (values) {
  let index = 0;

  return {
    next() {
      return (index < values.length)
        ? { value: values[index++], done: false }
        : { value: undefined, done: true };
    }
  };
}

// by class
class ListIterator {
  constructor (values) {
    this.index  = 0;
    this.values = values;
  }

  next () {
    return (this.index < this.values.length)
      ? { value: this.values[this.index++], done: false }
      : { value: undefined, done: true };
  }
}

// by prototype
const ListIteratorPrototype = {
  next () {
    return (this.index < this.values.length)
      ? { value: this.values[this.index++], done: false }
      : { value: undefined, done: true };
  }
};
*/

/*
function groupByIterator () {
  let index = 0;
  let keys = Object.keys(groups);

  return {
    next() {
      if (index < keys.length) {
        const key = keys[index++];
        return {
          value: { key, values: groups[key] },
          done: false
        };
      }
      return { value: undefined, done: true };
    }
  };
};
*/
