// @ratscript/runtime/types/Union.js

export default class Union {

  // init
  constructor (name, members) {
    this._members = members; // bereits ausgewertete Werte/Konstruktoren
    this._name    = name;
    Object.freeze(this);
  }

  // access (by getter)
  get members () { return this._members; }
  get name    () { return this._name; }

  //
  assert (value) {
    if (!this.check(value)) throw new TypeError(`Wert entspricht keinem Member von Union '${this._name}': ${JSON.stringify(value)}`);
    return value;
  }
  check (value) {
    return this._members.some(member => this._matches(value, member));
  }
  
  // debug
  toString () {
    return `[Union ${this._name}]`;
  }

  // internal
  _matches (value, member) {
    if (typeof member === 'function') {
      if (member === String)  return typeof value === 'string';
      if (member === Number)  return typeof value === 'number';
      if (member === Boolean) return typeof value === 'boolean';
      return value instanceof member;
    }
    return value === member;
  }

  // static
  static isUnion (value) {
    return value instanceof Union;
  }
}

// --------- OLD ----------

class UnionValue {
  constructor (union, variant, payload = {}) {
    this.$union   = union;
    this.$variant = variant;
    Object.assign(this, payload);
    Object.freeze(this);
  }

  toString() {
    return `${this.$union.name}.${this.$variant}`;
  }
}

export default class Union {

  // init
  constructor (name, definition) {
    this.name      = name;
    this._variants = Object.keys(definition);

    for (let [variantName, paramNames] of Object.entries(definition)) {
      if (!paramNames || paramNames.length === 0) {
        this[variantName] = new UnionValue(this, variantName);
      } else {
        const factory = (...args) => {
          const payload = {};
          paramNames.forEach((param, index) => { payload[param] = args[index]; });
          return new UnionValue(this, variantName, payload);
        };

        factory.$union   = this;
        factory.$variant = variantName;
        factory.is       = (val) => val instanceof UnionValue && val.$union === this && val.$variant === variantName;

        this[variantName] = factory;
      }
    }

    Object.freeze(this);
  }

  
  // access
  variants () {
    return [...this._variants];
  }

  // access (by getter)
  get variants () {
    return [...this._variants];
  }

  // checks
  has (value) {
    return value instanceof UnionValue && value.$union === this;
  }

  // static
  static isUnion (value) {
    return value instanceof UnionValue;
  }
  
};
