// @ratscript/runtime/types/RecordList.js

import List   from './List.js';
import Record from './Record.js';

export default class RecordList extends List {
  
  constructor (struct, ...records) {
    super(...records);
    this.struct = struct;
    this._type  = 'object';

    // validate initial records
    for (let r of this._values) {
      this._validateRecord(r);
    }
  }

  // methods: access
  entries () {
    return this._values.entries();
  }

  // methods: mutating
  push (record) {
    this._validateRecord(record);
    return super.push(record);
  }
  remove (index) {
    this._values.splice(index, 1);
    return this;
  }
  set (index, record) {
    this._validateRecord(record);
    this._values[index] = record;
    return this;
  }
  unshift (record) {
    this._validateRecord(record);
    return super.unshift(record);
  }
  
  // methods: non-mutating
  toPushed    (record) { return this.clone().push(record); }
  toRemoved   (index)  { return this.clone().remove(index); }
  toUnshifted (record) { return this.clone().unshift(record); }

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
    const result = new RecordList(this.struct);

    for (let r of this._values) {
      const key = fn(r);
      if (!seen.has(key)) {
        seen.add(key);
        result._values.push(r);
      }
    }

    return result;
  }

  toFiltered (fn) {
    const result = new RecordList(this.struct);
    for (let r of this._values) {
      if (fn(r)) result._values.push(r);
    }
    return result;
  }

  where (fn) {
    return this.toFiltered(fn);
  }

  // query
  pluck (key) {
    const result = new List();
    for (let r of this._values) {
      result._values.push(r.get(key));
    }
    return result;
  }

  countBy (fn) {
    let count = 0;
    for (let r of this._values) {
      if (fn(r)) count++;
    }
    return count;
  }
  findBy (fn) {
    for (let r of this._values) {
      if (fn(r)) return r;
    }
    return null;
  }
  groupBy (fn) {
    const groups = {};
    for (let r of this._values) {
      const key = fn(r);
      if (!groups[key]) groups[key] = new RecordList(this.struct);
      groups[key]._values.push(r);
    }
    return groups;
  }
  indexBy (fn) {
    const result = {};
    for (let r of this._values) {
      result[fn(r)] = r;
    }
    return result;
  }

  // iterator
  [Symbol.iterator]() {
    return this._values[Symbol.iterator]();
  }
  
  // internals
  _validateRecord (record) {
    if (!(record instanceof Record))   throw new TypeError("RecordList expects Record instances");
    if (record.struct !== this.struct) throw new TypeError("RecordList expects Records of the same Struct");
  }
  
};
