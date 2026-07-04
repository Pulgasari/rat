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
    result._type = this._type;
    result._values = this._values.slice(start, end);
    return result;
  }
  reverse () {
    this._values.reverse();
    return this;
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
