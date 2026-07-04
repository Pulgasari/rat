// @ratscript/runtime/types/Tuple.js

export default class Tuple {
  
  constructor (...values) {
    this._values = Object.freeze([...values]);

    // index access: t[0], t[1], ...
    for (let i = 0; i < values.length; i++) {
      Object.defineProperty(this, i, {
        value: values[i],
        enumerable: true
      });
    }

    Object.freeze(this);
  }

  // properties
  get length () {
    return this._values.length;
  }

  get (index) {
    return this._values[index];
  }

  values () {
    return [...this._values];
  }

  toArray () {
    return [...this._values];
  }

  equals (other) {
    if (!(other instanceof Tuple)) return false;
    if (other.length !== this.length) return false;

    for (let i = 0; i < this.length; i++) {
      if (other[i] !== this[i]) return false;
    }
    return true;
  }

  with (index, value) {
    const arr = [...this._values];
    arr[index] = value;
    return new Tuple(...arr);
  }

  map (fn) {
    const arr = this._values.map(fn);
    return new Tuple(...arr);
  }

  [Symbol.iterator]() {
    return this._values[Symbol.iterator]();
  }

  toString () {
    return `Tuple(${this._values.join(", ")})`;
  }
  
};
