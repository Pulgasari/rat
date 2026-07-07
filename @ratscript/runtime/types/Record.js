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

  
  with (key, value) {
    const newValues = { ...this.values, [key]: value };
    this.struct.validate(newValues);
    return new Record(this.struct, newValues);
  }

  
  // access
  get     (key) { return this.values[key]; }
  entries ()    { return Object.entries(this.values); }
  keys    ()    { return Object.keys(this.values); }

  // access (by getter)
  get entries () { return Object.entries(this.values); }
  get keys    () { return Object.keys(this.values); }

  // mutate
  merge (obj) {
    const newValues = { ...this.values, ...obj };
    this.struct.validate(newValues);
    return new Record(this.struct, newValues);
  }

  // mutated clones
  toMerged (obj) {
    return this.merge(obj);
  }

  // convert
  toObject () {
    return { ...this.values };
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

  // iterator
  [Symbol.iterator]() {
    return Object.values(this.values)[Symbol.iterator]();
  }

  // static
  static isRecord (value) { return value instanceof Record; }
  
};
