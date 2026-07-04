// @ratscript/runtime/types/Struct.js

import Record from './Record.js';

export default class Struct {
  constructor (schema) {
    this.schema = schema; // { name: "string", age: "number" }
  }

  validate (obj) {
    for (let key in this.schema) {
      const expected = this.schema[key];
      const actual   = typeof obj[key];

      if (actual !== expected) {
        throw new TypeError(`Field ${key} must be ${expected}, got ${actual}`);
      }
    }
  }

  create (obj) {
    this.validate(obj);
    return new Record(this, obj);
  }
  
}
