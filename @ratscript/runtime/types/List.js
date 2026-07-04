// @ratscript/runtime/types/List.js

class List {

  // init
  constructor (...values) {
    this._type   = null;
    this._values = [];

    for (let v of values) {
      this._checkType(v);
      this._values.push(v);
    }
  }
  static from (iterable) {
    const list = new List();
    for (let v of iterable) {
      list._checkType(v);
      list._values.push(v);
    }
    return list;
  }
  
  // iterator
  [Symbol.iterator]() {
    let index = 0;
    const values = this._values;

    return {
      next() {
        return (index < values.length)
          ? { value: values[index++], done: false }
          : { value: undefined, done: true };
      }
    };
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

  // methods: mutation
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
  reverse () {
    this._values.reverse();
    return this;
  }
  reversed () {
    const result = new List();
    result._type   = this._type;
    result._values = [...this._values].reverse();
    return result;
  }
  sorted (compareFn) {
    const result = this.clone();
    result.sort(compareFn);
    return result;
  }
  sort (compareFn) {
    this._values.sort(compareFn);
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
  equals (other) {
    if (!(other instanceof List))     return false;
    if (this._type  !== other._type)  return false;
    if (this.length !== other.length) return false;

    for (let i = 0; i < this.length; i++) {
      if (this._values[i] !== other._values[i]) return false;
    }
    return true;
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

    result[Symbol.iterator] = function () { return new ListIterator(result._values); };
    result[Symbol.iterator] = () => new ListIterator(result._values);

    return result;
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

    result[Symbol.iterator] = function () { return new ListIterator(result._values); };
    result[Symbol.iterator] = () => new ListIterator(result._values);

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
    return groups;
  }

  // utility
  contains (v) {
    return this._values.includes(v);
  }
  indexOf (v) {
    return this._values.indexOf(v);
  }
  toArray() {
    return [...this._values];
  }
  clone () {
    const result = new List();
    result._type = this._type;
    result._values = [...this._values];
    return result;
  }

  // debug
  toString() {
    return `List<${this._type}> ${JSON.stringify(this._values)}`;
  }
  
};

// :::::: ITERATOR

// by function
function createListIterator (values) {
  let index = 0;

  return {
    next() {
      return (index < values.length)
        ? { value: values[index++], done: false }
        : { value: undefined, done: true };
    }
  };
}
/*
[Symbol.iterator]() {
    return createIterator(this._values);
}

result[Symbol.iterator] = function() {
    return createIterator(result._values);
};
*/

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
/*
[Symbol.iterator]() {
  return new ListIterator(this._values);
}

result[Symbol.iterator] = function() {
  return new ListIterator(result._values);
};
*/

// by prototype
const ListIteratorPrototype = {
  next () {
    return (this.index < this.values.length)
      ? { value: this.values[this.index++], done: false }
      : { value: undefined, done: true };
  }
};
/*
function createIterator (values) {
  return Object.create(ListIteratorPrototype, {
    values: { value: values },
    index: { value: 0, writable: true }
  });
}

[Symbol.iterator]() {
  return createIterator(this._values);
}
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
