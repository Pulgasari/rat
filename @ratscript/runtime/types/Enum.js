// @ratscript/runtime/types/Enum.js

class EnumValue {
  constructor (enumType, name) {
    this.enum = enumType;
    this.name = name;
    Object.freeze(this);
  }

  toString() {
    return this.name;
  }
}

export default class Enum {

  // init
  constructor (...names) {
    this._names  = names;
    this._values = [];

    for (let name of names) {
      const value = new EnumValue(this, name);
      this[name] = value;
      this._values.push(value);
    }

    Object.freeze(this);
  }
  
  //
  parse (name) {
    if (!this.has(name)) throw new Error(`Invalid enum value: ${name}`);
    return this[name];
  }
  tryParse (name) {
    return this.has(name) ? this[name] : null;
  }

  // access
  names  () { return [...this._names];  }
  values () { return [...this._values]; }

  // access (by getter)
  get names  () { return [...this._names];  }
  get values () { return [...this._values]; }

  // checks
  has (name) {
    return this._names.includes(name);
  }
  isEnumValue (value) {
    return value instanceof EnumValue && value.enum === this;
  }

  // iterator
  [Symbol.iterator]() {
    return this._values[Symbol.iterator]();
  }

  // static
  static isEnum (value) {
    return value instanceof EnumValue;
  }
  
};
