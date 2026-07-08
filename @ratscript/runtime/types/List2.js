// @ratscript/runtime/types/List.js

export default class List extends Array {

  // init
  constructor (...values) {
    // Ruft den nativen Array-Konstruktor auf
    super();
    this._type = null;

    for (let v of values) {
      this.push(v); // Nutzt unser getuntes push() inklusive Typecheck!
    }
  }
  
  // properties
  get type () { return this._type; }

  // mutate
  merge (other) {
    if (!List.isList(other)) throw new TypeError("merge() expects another List");
    if (this._type !== null && other.type !== null && other.type !== this._type) {
      throw new TypeError(`merge() requires same element type: ${this._type} vs ${other.type}`);
    }
    
    for (let v of other) this.push(v);
    return this;
  }
  push (...values) {
    for (let v of values) {
      this._checkType(v);
      super.push(v);
    }
    return this;
  }
  set (index, v) {
    this._checkType(v);
    if (index < 0 || index >= this.length) {
      throw new RangeError(`Index ${index} out of bounds`);
    }
    this[index] = v;
    return this;
  }
  splice (start, deleteCount, ...items) {
    for (let item of items) this._checkType(item);
    super.splice(start, deleteCount, ...items);
    return this;
  }
  unshift (...values) {
    for (let v of values) {
      this._checkType(v);
      super.unshift(v);
    }
    return this;
  }
  with (index, value) {
    this._checkType(value);
    const nativeArr = super.with(index, value);
    const result = new List();
    result._type = this._type;
    result.push(...nativeArr);
    return result;
  }
  
  // ==========================================
  // CUSTOM RATSCRIPT UTILITIES
  // ==========================================
  getFirstItem () { return this[0]; }
  getLastItem  () { return this[this.length - 1]; }
  indexOfLast  () { return this.length - 1; }

  clear () {
    this.length = 0;
    return this;
  }
  remove (...values) {
    for (let value of values) {
      const index = this.indexOf(value);
      if (index !== -1) this.splice(index, 1);
    }
    return this;
  }
  removeByIndex (index) {
    this.splice(index, 1);
    return this;
  }
  shuffle () {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
  }
  unique() {
    const seen = new Set();
    const result = new List();
    result._type = this._type;
    for (let v of this) {
      if (!seen.has(v)) {
        seen.add(v);
        result.push(v);
      }
    }
    return result;
  }
  zip (other) {
    if (!List.isList(other)) throw new TypeError("zip() expects another List");
    const len = Math.min(this.length, other.length);
    const result = new List();
    result._type = "object"; // Da Paare nun Arrays/Objekte sind
    for (let i = 0; i < len; i++) {
      result.push([this[i], other[i]]);
    }
    return result;
  }

  flatMap (fn) {
    const result = new List();
    for (let v of this) {
      const mapped = fn(v);
      if (!List.isList(mapped)) throw new TypeError("flatMap() callback must return a List");
      if (result._type === null && mapped._type !== null) result._type = mapped._type;
      for (let inner of mapped) {
        result.push(inner);
      }
    }
    return result;
  }

  groupBy (fn) {
    const groups = {};
    for (let v of this) {
      const key = fn(v);
      if (!groups[key]) {
        groups[key] = new List();
        groups[key]._type = this._type;
      }
      groups[key].push(v);
    }
    return groups;
  }

  // mutated clones
  toMerged         (other)     { return this.clone().merge(other); }
  toRemoved        (...values) { return this.clone().remove(...values); }
  toRemovedByIndex (index)     { return this.clone().removeByIndex(index); }
  toReversed       ()          { const c = this.clone(); super.reverse.call(c); return c; }
  toShuffled       ()          { return this.clone().shuffle(); }
  toSorted         (fn)        { const c = this.clone(); super.sort.call(c, fn); return c; }

  // Strukturelle Clones
  slice (start, end) {
    const result = new List();
    result._type = this._type;
    // Nutzen den nativen Array slice, um die Werte zu holen
    const slicedValues = super.slice(start, end);
    result.push(...slicedValues);
    return result;
  }

  clone () {
    const result = new List();
    result._type = this._type;
    result.push(...this);
    return result;
  }

  // checks
  equals (other) {
    if (!List.isList(other)) return false;
    if (this._type !== other._type) return false;
    if (this.length !== other.length) return false;
    for (let i = 0; i < this.length; i++) {
      if (this[i] !== other[i]) return false;
    }
    return true;
  }
  
  // internal
  _checkType (v) {
    if (this._type === null) {
      this._type = typeof v;
    } else if (typeof v !== this._type) {
      throw new TypeError(`List expects type ${this._type}, got ${typeof v}`);
    }
  }

  // static
  static isList (value) {
    return value instanceof List;
  }
}
