// @ratscript/runtime/types/Record.js

export default class Record {

  // init
  constructor (struct, values) {
    this.struct = struct;

    // validate using Struct
    struct.validate(values);

    // store immutable values
    this.values = Object.freeze({ ...values });

    // expose keys as properties (optional but nice)
    for (let key of struct.keys()) {
      Object.defineProperty(this, key, {
        value: this.values[key],
        enumerable: true
      });
    }

    Object.freeze(this);
  }

  // iterator
  [Symbol.iterator]() {
    return Object.values(this.values)[Symbol.iterator]();
  }

  get (key) {
    return this.values[key];
  }

  

  keys () {
    return Object.keys(this.values);
  }

  entries () {
    return Object.entries(this.values);
  }

  toObject () {
    return { ...this.values };
  }

  

  with (key, value) {
    const newValues = { ...this.values, [key]: value };
    this.struct.validate(newValues);
    return new Record(this.struct, newValues);
  }

  merge (obj) {
    const newValues = { ...this.values, ...obj };
    this.struct.validate(newValues);
    return new Record(this.struct, newValues);
  }

  toMerged (obj) {
    return this.merge(obj);
  }

  // checks
  equals (other) {
    if (!(other instanceof Record))   return false;
    if (other.struct !== this.struct) return false;

    const keys = this.keys();
    for (let key of keys) {
      if (this.values[key] !== other.values[key]) return false;
    }
    return true;
  }
  has (key) {
    return key in this.values;
  }
  
  // debug
  toString () {
    return `Record(${JSON.stringify(this.values)})`;
  }
  
};
