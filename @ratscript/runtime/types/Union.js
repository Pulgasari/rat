// @ratscript/runtime/types/Union.js

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
