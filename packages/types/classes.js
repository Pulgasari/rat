// @rat/datatypes - Class-based Implementation

// ::::: TYPE GUARDS & HELPERS

export const isFn       = (v) => typeof v === 'function';
export const isString   = (v) => typeof v === 'string';
export const isNumber   = (v) => typeof v === 'number' && !Number.isNaN(v);
export const isObj      = (v) => v !== null && typeof v === 'object';
export const isNullish  = (v) => v == null;
export const isArray    = Array.isArray;
export const isIterable = (v) => v != null && isFn(v[Symbol.iterator]);
export const isRegExp   = (v) => v instanceof RegExp;

// Normalizes negative indices relative to target length (-1 -> length - 1)
export const normIdx = (idx, len) => (idx < 0 ? len + idx : idx);

// ::::: IMMUTABLE METHOD ATTACHER

const toImmutableName = (key) => {
  const match = key.match(/^([a-z]+)(.*)$/);
  if (!match) return key;
  const [, verb, rest] = match;
  const pastVerb = verb.endsWith('e') ? `${verb}d` : `${verb}ed`;
  return `to${pastVerb.charAt(0).toUpperCase()}${pastVerb.slice(1)}${rest}`;
};

const attachImmutable = (ClassRef, methodNames) => {
  const proto = ClassRef.prototype;
  for (const key of methodNames) {
    const immutableName = toImmutableName(key);
    proto[immutableName] = function (...args) {
      const copy = this.clone();
      copy[key](...args);
      return copy;
    };
  }
};

// ::::: RAT MOTHER CLASS

export class RatType {
  // Static type check working for all subclasses automatically via 'this'
  static is(sth) {
    return sth instanceof this;
  }

  toArray() {
    if (isNullish(this)) return [];
    if (isIterable(this)) return Array.from(this);
    if (isObj(this)) return Object.values(this);
    return [this];
  }

  static toArray(source) {
    if (isNullish(source)) return [];
    if (isFn(source.toArray)) return source.toArray();
    if (isIterable(source)) return Array.from(source);
    if (isObj(source)) return Object.values(source);
    return [source];
  }
}

// ::::: LIST CLASS (UNIQUE ORDERED SET)

export class List extends RatType {
  constructor(source) {
    super();
    this._items = [];
    if (source != null) this.merge(source);
  }

  get size() { return this._items.length; }
  get length() { return this._items.length; }

  has(item) { return this._items.includes(item); }
  indexOf(item) { return this._items.indexOf(item); }
  get(index) { return this._items[normIdx(index, this._items.length)]; }

  clone() { return new this.constructor(this._items); }
  toArray() { return [...this._items]; }
  toSet() { return new Set(this._items); }

  add(...items) { return this.merge(items); }
  push(...items) { return this.merge(items); }

  merge(...sources) {
    for (const source of sources) {
      const entries = isNullish(source) ? []
        : isIterable(source) ? source
        : Object.values(source);

      for (const item of entries) {
        if (!this.has(item)) this._items.push(item);
      }
    }
    return this;
  }

  remove(...items) {
    for (const item of items) {
      const idx = this.indexOf(item);
      if (idx !== -1) this._items.splice(idx, 1);
    }
    return this;
  }

  removeByIndex(...indices) {
    const sorted = [...indices].sort((a, b) => b - a);
    for (const idx of sorted) {
      const normalized = normIdx(idx, this._items.length);
      if (normalized >= 0 && normalized < this._items.length) {
        this._items.splice(normalized, 1);
      }
    }
    return this;
  }

  reverse() { this._items.reverse(); return this; }
  shift() { return this._items.shift(); }
  pop() { return this._items.pop(); }

  unshift(...items) {
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      const idx = this.indexOf(item);
      if (idx !== -1) this._items.splice(idx, 1);
      this._items.unshift(item);
    }
    return this;
  }

  slice(start, end) { this._items = this._items.slice(start, end); return this; }

  splice(start, deleteCount, ...items) {
    for (const item of items) {
      const idx = this.indexOf(item);
      if (idx !== -1) this._items.splice(idx, 1);
    }
    this._items.splice(start, deleteCount, ...items);
    return this;
  }

  shuffle() {
    for (let i = this._items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._items[i], this._items[j]] = [this._items[j], this._items[i]];
    }
    return this;
  }

  sort(compareFn) { this._items.sort(compareFn); return this; }
  clear() { this._items.length = 0; return this; }

  intersect(other) {
    const set = new Set(RatType.toArray(other));
    this._items = this._items.filter((item) => set.has(item));
    return this;
  }

  difference(other) {
    const set = new Set(RatType.toArray(other));
    this._items = this._items.filter((item) => !set.has(item));
    return this;
  }

  forEach(fn, thisArg) { this._items.forEach(fn, thisArg); }
  map(fn) { return new this.constructor(this._items.map(fn)); }
  filter(fn) { return new this.constructor(this._items.filter(fn)); }
  find(fn) { return this._items.find(fn); }

  [Symbol.iterator]() { return this._items[Symbol.iterator](); }
}

attachImmutable(List, [
  'add', 'push', 'merge', 'remove', 'removeByIndex', 'reverse',
  'shift', 'pop', 'unshift', 'slice', 'splice', 'shuffle', 'sort', 'clear',
  'intersect', 'difference'
]);

// ::::: POINT CLASS (2D VECTOR)

export class Point extends RatType {
  constructor(x = 0, y = 0) {
    super();
    this.x = +x || 0;
    this.y = +y || 0;
  }

  get magnitude() { return Math.hypot(this.x, this.y); }
  get angle() { return Math.atan2(this.y, this.x); }

  clone() { return new this.constructor(this.x, this.y); }
  equals(other) { return isObj(other) && this.x === other.x && this.y === other.y; }
  distance(other = { x: 0, y: 0 }) { return Math.hypot(other.x - this.x, other.y - this.y); }

  toArray() { return [this.x, this.y]; }
  toObject() { return { x: this.x, y: this.y }; }

  set(x = this.x, y = this.y) {
    this.x = +x || 0;
    this.y = +y || 0;
    return this;
  }

  add(other) {
    const ox = isNumber(other) ? other : (other?.x ?? 0);
    const oy = isNumber(other) ? other : (other?.y ?? 0);
    this.x += ox; this.y += oy;
    return this;
  }

  subtract(other) {
    const ox = isNumber(other) ? other : (other?.x ?? 0);
    const oy = isNumber(other) ? other : (other?.y ?? 0);
    this.x -= ox; this.y -= oy;
    return this;
  }

  multiply(scalar) {
    const factor = +scalar || 0;
    this.x *= factor; this.y *= factor;
    return this;
  }

  divide(scalar) {
    const factor = +scalar || 1;
    this.x /= factor; this.y /= factor;
    return this;
  }

  negate() { this.x = -this.x; this.y = -this.y; return this; }

  clamp(min, max) {
    const minX = isNumber(min) ? min : (min?.x ?? -Infinity);
    const minY = isNumber(min) ? min : (min?.y ?? -Infinity);
    const maxX = isNumber(max) ? max : (max?.x ?? Infinity);
    const maxY = isNumber(max) ? max : (max?.y ?? Infinity);
    this.x = Math.max(minX, Math.min(maxX, this.x));
    this.y = Math.max(minY, Math.min(maxY, this.y));
    return this;
  }

  round() { this.x = Math.round(this.x); this.y = Math.round(this.y); return this; }
}

attachImmutable(Point, ['set', 'add', 'subtract', 'multiply', 'divide', 'negate', 'clamp', 'round']);

// ::::: RECORD CLASS (KEY-VALUE STORE)

export class Record extends RatType {
  constructor(source) {
    super();
    this._data = {};
    if (source != null) this.merge(source);
  }

  get size() { return Object.keys(this._data).length; }
  get(key) { return this._data[key]; }
  has(key) { return Object.prototype.hasOwnProperty.call(this._data, key); }

  keys() { return Object.keys(this._data); }
  values() { return Object.values(this._data); }
  entries() { return Object.entries(this._data); }

  clone() { return new this.constructor(this._data); }
  toObject() { return { ...this._data }; }

  equals(other) {
    if (!isObj(other)) return false;
    const otherObj = isFn(other.toObject) ? other.toObject() : other;
    const keysA = this.keys();
    const keysB = Object.keys(otherObj);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((k) => this._data[k] === otherObj[k]);
  }

  set(key, value) { this._data[key] = value; return this; }
  delete(key) { delete this._data[key]; return this; }

  merge(...sources) {
    for (const source of sources) {
      if (isNullish(source)) continue;
      const entries = isFn(source.entries) ? source.entries()
        : isIterable(source) ? source
        : Object.entries(source);
      for (const [k, v] of entries) this._data[k] = v;
    }
    return this;
  }

  clear() { this._data = {}; return this; }

  [Symbol.iterator]() { return this.entries()[Symbol.iterator](); }
}

attachImmutable(Record, ['set', 'delete', 'merge', 'clear']);

// ::::: TUPLE CLASS (FIXED-LENGTH INDEXED LIST)

export class Tuple extends RatType {
  constructor(...items) {
    super();
    this._items = (items.length === 1 && isArray(items[0])) ? [...items[0]] : items;
  }

  get length() { return this._items.length; }
  get size() { return this._items.length; }

  get(index) { return this._items[normIdx(index, this._items.length)]; }
  has(item) { return this._items.includes(item); }
  indexOf(item) { return this._items.indexOf(item); }
  find(fn) { return this._items.find(fn); }
  slice(start, end) { return this._items.slice(start, end); }

  clone() { return new this.constructor(...this._items); }

  equals(other) {
    if (!other) return false;
    const arr = isFn(other.toArray) ? other.toArray() : Array.from(other);
    if (this._items.length !== arr.length) return false;
    return this._items.every((val, i) => val === arr[i]);
  }

  set(index, value) {
    const idx = normIdx(index, this._items.length);
    if (idx >= 0 && idx < this._items.length) this._items[idx] = value;
    return this;
  }

  swap(i, j) {
    const len = this._items.length;
    const a = normIdx(i, len);
    const b = normIdx(j, len);
    if (a >= 0 && a < len && b >= 0 && b < len) {
      [this._items[a], this._items[b]] = [this._items[b], this._items[a]];
    }
    return this;
  }

  fill(value, start, end) { this._items.fill(value, start, end); return this; }
  clear() { this._items = []; return this; }

  [Symbol.iterator]() { return this._items[Symbol.iterator](); }
}

attachImmutable(Tuple, ['set', 'swap', 'fill', 'clear']);

// ::::: TREE CLASS (NODE HIERARCHY)

export class Tree extends RatType {
  constructor(value, children = []) {
    super();
    this.value = value;
    this.children = [];
    if (children && children.length) this.addChildren(children);
  }

  get isLeaf() { return this.children.length === 0; }

  get depth() {
    if (this.isLeaf) return 0;
    return 1 + Math.max(...this.children.map((c) => c.depth));
  }

  clone() {
    return new this.constructor(this.value, this.children.map((c) => c.clone()));
  }

  find(predicate) {
    if (predicate(this.value, this)) return this;
    for (const child of this.children) {
      const found = child.find(predicate);
      if (found) return found;
    }
    return null;
  }

  traverse(fn) {
    fn(this.value, this);
    for (const child of this.children) child.traverse(fn);
  }

  setValue(val) { this.value = val; return this; }

  addChild(child) {
    const node = child instanceof Tree ? child : new this.constructor(child);
    this.children.push(node);
    return this;
  }

  addChildren(children) {
    for (const child of children) this.addChild(child);
    return this;
  }

  removeChild(childOrValue) {
    this.children = this.children.filter((c) => c !== childOrValue && c.value !== childOrValue);
    return this;
  }

  clear() { this.children = []; return this; }
}

attachImmutable(Tree, ['setValue', 'addChild', 'addChildren', 'removeChild', 'clear']);

// ::::: MAP / DICT CLASS (CANONICAL KEY ENGINE)

const BUILTIN_CASES = {
  camel: (s) => s.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : '')),
  kebab: (s) => s.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase(),
  snake: (s) => s.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s-]+/g, '_').toLowerCase(),
  pascal: (s) => s.replace(/(^\w|[-_]\w)/g, (m) => m.replace(/[-_]/, '').toUpperCase()),
  stripFlags: (s) => s.replace(/^--?/, ''),
};

const toTransformer = (form) => {
  if (isFn(form)) return form;
  if (isString(form) && BUILTIN_CASES[form]) return BUILTIN_CASES[form];
  if (isRegExp(form)) return (s) => s.replace(form, '');
  return (s) => s;
};

const createKeyPipeline = (config) => {
  let transformers = [];

  if (isFn(config)) transformers = [config];
  else if (isArray(config)) transformers = config.map(toTransformer);
  else if (isObj(config)) {
    const { stripFlags = true, forms = ['camel', 'kebab', 'snake'], custom } = config;
    if (stripFlags) transformers.push(BUILTIN_CASES.stripFlags);
    if (custom) transformers.push(toTransformer(custom));
    transformers.push(...forms.map(toTransformer));
  } else {
    transformers = [BUILTIN_CASES.stripFlags, BUILTIN_CASES.camel, BUILTIN_CASES.kebab, BUILTIN_CASES.snake];
  }

  return {
    canonical: (key) => {
      if (!isString(key)) return key;
      return transformers.reduce((acc, fn) => fn(acc), key);
    },
    generateAliases: (key) => {
      if (!isString(key)) return [key];
      const variants = new Set([key]);
      let current = key;
      for (const fn of transformers) {
        current = fn(current);
        variants.add(current);
      }
      return Array.from(variants);
    }
  };
};

export class MapType extends RatType {
  constructor(source, options = {}) {
    super();
    this._store = new Map();
    this._aliases = new Map();
    this._cache = new Map();
    this._pipeline = createKeyPipeline(options);

    if (source != null) this.merge(source);
  }

  key(rawKey) {
    if (!isString(rawKey)) return rawKey;

    const alias = this._aliases.get(rawKey);
    if (alias !== undefined) return alias;

    const cached = this._cache.get(rawKey);
    if (cached !== undefined) return cached;

    const canonicalKey = this._pipeline.canonical(rawKey);
    this._cache.set(rawKey, canonicalKey);
    return canonicalKey;
  }

  set(rawKey, value) {
    if (!isString(rawKey)) {
      this._store.set(rawKey, value);
      return this;
    }

    const canonicalKey = this.key(rawKey);

    if (!this._store.has(canonicalKey)) {
      const aliases = this._pipeline.generateAliases(rawKey);
      for (const alias of aliases) this._aliases.set(alias, canonicalKey);
    }

    this._store.set(canonicalKey, value);
    return this;
  }

  get(rawKey) { return this._store.get(this.key(rawKey)); }
  has(rawKey) { return this._store.has(this.key(rawKey)); }

  delete(rawKey) {
    const canonicalKey = this.key(rawKey);
    for (const [alias, target] of this._aliases) {
      if (target === canonicalKey) this._aliases.delete(alias);
    }
    return this._store.delete(canonicalKey);
  }

  clear() {
    this._aliases.clear();
    this._cache.clear();
    this._store.clear();
    return this;
  }

  merge(source) {
    const entries = isNullish(source) ? []
      : isIterable(source) ? source
      : Object.entries(source);

    for (const [k, v] of entries) this.set(k, v);
    return this;
  }

  toObject(transformForm) {
    const convert = transformForm ? toTransformer(transformForm) : null;
    const result = {};
    for (const [k, v] of this._store) {
      result[convert ? convert(k) : k] = v;
    }
    return result;
  }

  clone() {
    const copy = new this.constructor(null, this._pipeline);
    for (const [k, v] of this._store) copy.set(k, v);
    return copy;
  }

  keys() { return this._store.keys(); }
  values() { return this._store.values(); }
  entries() { return this._store.entries(); }
  [Symbol.iterator]() { return this._store[Symbol.iterator](); }
}

attachImmutable(MapType, ['set', 'delete', 'clear', 'merge']);

// ::::: REACTIVE VARIANTS

export class $List   extends List {}
export class $Point  extends Point {}
export class $Record extends Record {}
export class $Tuple  extends Tuple {}
export class $Tree   extends Tree {}
export class $Map    extends MapType {}
