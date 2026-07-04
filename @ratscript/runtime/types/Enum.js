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

  values () {
    return [...this._values];
  }

  names () {
    return [...this._names];
  }

  has (name) {
    return this._names.includes(name);
  }

  isEnumValue (value) {
    return value instanceof EnumValue && value.enum === this;
  }

  parse (name) {
    if (!this.has(name)) throw new Error(`Invalid enum value: ${name}`);
    return this[name];
  }

  tryParse (name) {
    return this.has(name) ? this[name] : null;
  }

  [Symbol.iterator]() {
    return this._values[Symbol.iterator]();
  }
  
};
