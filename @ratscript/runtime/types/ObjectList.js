// @ratscript/runtime/types/ObjectList.js

import List   from './List.js';

export default class ObjectList extends List {

  constructor (...objects) {
    super(...objects);
    this._type = "object";

    for (let obj of this._values) {
      this._validate(obj);
    }
  }

  // :::::: mutating
  push(obj) {
    this._validate(obj);
    return super.push(obj);
  }

  unshift(obj) {
    this._validate(obj);
    return super.unshift(obj);
  }

  set(index, obj) {
    this._validate(obj);
    this._values[index] = obj;
    return this;
  }

  removeByIndex(index) {
    this._values.splice(index, 1);
    return this;
  }

  remove(criteria) {
    for (let i = this._values.length - 1; i >= 0; i--) {
      if (this._matchesCriteria(this._values[i], criteria)) {
        this._values.splice(i, 1);
      }
    }
    return this;
  }

  // :::::: non-mutating
  toPushed(obj) {
    return this.clone().push(obj);
  }

  toUnshifted(obj) {
    return this.clone().unshift(obj);
  }

  toSet(index, obj) {
    return this.clone().set(index, obj);
  }

  toRemovedByIndex(index) {
    return this.clone().removeByIndex(index);
  }

  toRemoved(criteria) {
    return this.clone().remove(criteria);
  }

  // :::::: query
  pluck(key) {
    const result = new List();
    for (let obj of this._values) {
      result._values.push(obj[key]);
    }
    return result;
  }

  findBy(fn) {
    for (let obj of this._values) {
      if (fn(obj)) return obj;
    }
    return null;
  }

  countBy(fn) {
    let count = 0;
    for (let obj of this._values) {
      if (fn(obj)) count++;
    }
    return count;
  }

  groupBy(fn) {
    const groups = {};
    for (let obj of this._values) {
      const key = fn(obj);
      if (!groups[key]) groups[key] = new ObjectList();
      groups[key]._values.push(obj);
    }
    return groups;
  }

  indexBy(fn) {
    const result = {};
    for (let obj of this._values) {
      result[fn(obj)] = obj;
    }
    return result;
  }

  entries() {
    return this._values.entries();
  }

  // iterator
  [Symbol.iterator]() {
    return this._values[Symbol.iterator]();
  }

  // internals
  _matchesCriteria (obj, criteria) {
    for (let key in criteria) {
      if (obj[key] !== criteria[key]) return false;
    }
    return true;
  }
  _validate (obj) {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
      throw new TypeError("ObjectList expects plain objects");
    }
  }

};

export default class ObjectList extends List {

  // init
  constructor (...objects) {
    super(...objects);
    this._type = "object";

    for (let obj of this._values) {
      this._validate(obj);
    }
  }
  
  // methods: mutating
  mapKeys (fn) {
    return this._mutate(obj => {
      const newObj = {};
      for (let key in obj) {
        newObj[fn(key)] = obj[key];
      }
      return newObj;
    });
  }
  mapValues (fn) {
    return this._mutate(obj => {
      const newObj = {};
      for (let key in obj) {
        newObj[key] = fn(obj[key], key, obj);
      }
      return newObj;
    });
  }
  push (obj) {
    this._validate(obj);
    return super.push(obj);
  }
  remove (index) {
    this._values.splice(index, 1);
    return this;
  }
  set (index, obj) {
    this._validate(obj);
    this._values[index] = obj;
    return this;
  }
  unshift (obj) {
    this._validate(obj);
    return super.unshift(obj);
  }
  
  // methods: non-mutating
  toMappedKeys   (fn)    { return this.clone().mapKeys   (fn);    }
  toMappedValues (fn)    { return this.clone().mapValues (fn);    }
  toPushed       (obj)   { return this.clone().push      (obj);   }
  toRemoved      (index) { return this.clone().remove    (index); }
  toUnshifted    (obj)   { return this.clone().unshift   (obj);   }
  
  toFiltered (fn) {
    const result = new ObjectList();
    for (let obj of this._values) {
      if (fn(obj)) result._values.push(obj);
    }
    return result;
  }

  toSortedBy (fn) {
    const clone = this.clone();
    clone._values.sort((a, b) => {
      const av = fn(a);
      const bv = fn(b);
      return av < bv ? -1 : av > bv ? 1 : 0;
    });
    return clone;
  }

  toUniqueBy (fn) {
    const seen   = new Set();
    const result = new ObjectList();

    for (let obj of this._values) {
      const key = fn(obj);
      if (!seen.has(key)) {
        seen.add(key);
        result._values.push(obj);
      }
    }

    return result;
  }

  // :::::: query
  pluck (key) {
    const result = new List();
    for (let obj of this._values) {
      result._values.push(obj[key]);
    }
    return result;
  }
  countBy (fn) {
    let count = 0;
    for (let obj of this._values) {
      if (fn(obj)) count++;
    }
    return count;
  }
  findBy (fn) {
    for (let obj of this._values) {
      if (fn(obj)) return obj;
    }
    return null;
  }
  groupBy (fn) {
    const groups = {};
    for (let obj of this._values) {
      const key = fn(obj);
      if (!groups[key]) groups[key] = new ObjectList();
      groups[key]._values.push(obj);
    }
    return groups;
  }
  indexBy (fn) {
    const result = {};
    for (let obj of this._values) {
      result[fn(obj)] = obj;
    }
    return result;
  }

  entries () {
    return this._values.entries();
  }

  // iterator
  [Symbol.iterator]() {
    return this._values[Symbol.iterator]();
  }

  // internals
  _mutate (fn) {
    for (let i = 0; i < this._values.length; i++) {
      const oldObj = this._values[i];
      const newObj = fn(oldObj);
      this._validate(newObj);
      this._values[i] = newObj;
    }
    return this;
  }
  _validate (obj) {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
      throw new TypeError("ObjectList expects plain objects");
    }
  }
  
};
