// @ratscript/runtime/types/List.js

class List {
  
  constructor (...values) {
    this._type   = null;
    this._values = [];

    for (let v of values) {
      this._checkType(v)
      this._values.push(v)
    }
  }

  _checkType (v) {
    if (this._type === null) {
      this._type = typeof v
    } else if (typeof v !== this._type) {
      throw new TypeError(`List expects type ${this._type}, got ${typeof v}`)
    }
  }

  push (v) {
    this._checkType(v)
    this._values.push(v)
  }

  pop () {
    return this._values.pop()
  }

  get (i) {
    return this._values[i]
  }

  set (i, v) {
    this._checkType(v)
    this._values[i] = v
  }

  get length () {
    return this._values.length
  }
  
};
