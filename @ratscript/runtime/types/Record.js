// @ratscript/runtime/types/Record.js

export default class Record {
  
  constructor (struct, values) {
    this.struct = struct;
    struct.validate(values);
    this.values = { ...values };
  }

  get (key) {
    return this.values[key];
  }

  set (key, value) {
    this.struct.validate({ ...this.values, [key]: value });
    this.values[key] = value;
    return this;
  }

  with (key, value) {
    const newValues = { ...this.values, [key]: value };
    this.struct.validate(newValues);
    return new Record(this.struct, newValues);
  }

  toObject () {
    return { ...this.values };
  }
  
}
