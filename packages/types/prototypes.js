// @rat/types :: prototypes.js

// :::::: IMPORT

// may gonna be inlined later
import shift from '@pulgasari/shift';
import str   from '@pulgasari/str';

// :::::: INTERNAL HELPERS

const P = (Target) => Target.prototype;

// ::: INTERNAL TYPE GUARDS

const isInstanceOf = (sth) => (ClassName) => sth instanceof ClassName;
const isTypeOf     = (sth) => (typeName)  => typeof sth === typeName;

const isArray    = Array.isArray;
const isFn       = isTypeOf('function');
const isNullish  = (sth) => typeof sth === 'undefined' || typeof sth === 'null';
const isNumber   = (sth) => typeof sth === 'number' && !Number.isNaN(v);
const isObj      = (sth) => sth !== null && typeof sth === 'object';
const isRegExp   = isInstanceOf(RegExp);
const isString   = isTypeOf('string');

const hasIterator = (sth) => isFn(sth[Symbol.iterator]);
const isIterable  = hasIterator;

// ======================================
// RAT DATA TYPES CONSTRUCTION APPROACH 1
// ======================================

// :::::: HELPER FUNCTIONS

// ::: type

const type = {};

type.create = function (NewType, BaseType = RatType) {}

type.extend = function (NewType, BaseType = RatType) {
  NewType.prototype             = Object.create(BaseType.prototype);
  NewType.prototype.constructor = NewType;
  Object.setPrototypeOf(NewType, BaseType);
}

type.init = function (Target, baseType  = RatType) {
  const NewType = isFn(Target) ? Target : { [Target]: function (...args) { baseType.call(this, ...args); } }[Target];
  type.extend(NewType, baseType);
  return NewType;
}

type.props = function (TargetType, methods) {
  const descriptors = Object.getOwnPropertyDescriptors(methods);
  for (const key in descriptors) descriptors[key].enumerable = false;
  Object.defineProperties(TargetType.prototype, descriptors);
};

type.statics = function (TargetType, methods) {
  const descriptors = Object.getOwnPropertyDescriptors(methods);
  for (const key in descriptors) descriptors[key].enumerable = false;
  Object.defineProperties(TargetType, descriptors);
};

type.delegate = function (TargetType, targetKey, ...definitions) {
  const proto = TargetType.prototype;

  for (const def of definitions) {
    const keys    = isString(def) ? def.split(/\s+/).filter(Boolean) : def;
    const entries = isArray(keys) ? keys.map(key => [key, key]) : Object.entries(def ?? {});

    for (const [method, target] of entries) {
      proto[method] = function (...args) { return this[targetKey][target](...args); };
    }
  }
};

const normalizeDefs = (...defs) => {
  const result = [];
  for (let def of defs) {
         if (isString(def)) def = def.split(/\s+/);
         if  (isArray(def)) for (const key of def) if (key) result.push([key, key]);
    else if    (isObj(def)) for (const key in def)          result.push([key, def[key]]);
  }
  return result;
};

const normalizeDefs = (...defs) => {
  const result = [];
  for (const def of defs) {
    if (!def) continue;
    const list = isString(def) ? def.split(/\s+/).filter(Boolean) : def;

         if (isArray(list)) for (const key of list) if (key) result.push([key, key]);
    else if   (isObj(list)) for (const key in list)          result.push([key, list[key]]);
    
  }
  return result;
};


const createDelegator = (resolver) => (TargetType, targetKey, ...definitions) => {
  for (const [method, target] of normalizeDefs(...definitions)) {
    TargetType.prototype[method] = function (...args) {
      const result = this[targetKey][target](...args);
      return resolver ? resolver(result, this) : result;
    };
  }
};

// 1. direct pass-through | returns result
// 2. chaining            | returns `this`
// 3. wrapping            | returns `new List(result)`
type.delegateMethods = createDelegator();
type.chainMethods    = createDelegator((result, self) => self);
type.wrapMethods     = createDelegator((result, self) => new self.constructor(result));

// ::: immu

const immu = {};
// remove -> toRemoved
// removeByIndex -> toRemovedByIndex
immu.attach = (TypeName, methods) => for (const key of methods) TypeName.prototype[immu.name(key)] = immu.make(key);
// creates an immutable wrapper function that operates on a copy of 'this'.
immu.make = (key) => function (...args) {
  const copy = this.clone();
  copy[key](...args);
  return copy;
};
// bulk attaches immutable 'to*' methods to a prototype based on mutation method names.
immu.name = (key) => {
  const match          = key.match(/^([a-z]+)(.*)$/); if (!match) return key;
  const [, verb, rest] = match;
  const pastVerb       = verb.endsWith('e') ? `${verb}d` : `${verb}ed`;
  const capitalized    = pastVerb.charAt(0).toUpperCase() + pastVerb.slice(1);
  return `to${capitalized}${rest}`;
};

// ************* STEP 1: create the types *************

// :::::: RAT MOTHER PROTOTYPE

function RatType () {}
RatType.is = function (sth) { return sth instanceof this; };

// :::::: RAT PROTOTYPES

initType ('List'   , RatType);
initType ('Point'  , RatType);
initType ('Record' , RatType);
initType ('Tree'   , RatType);
initType ('Tuple'  , RatType);

// :::::: REACTIVE VARIANTS OF RAT PROTOTYPES

initType ('$List'  , List);
initType ('$Point' , Point);
initType ('$Tree'  , Tree);

// ************* STEP 2: attach props and methods *************

// ------------ List

type.props (List, {
  get size () { return this._items.length; },

  clone   () { return new this.constructor(this._items); },
  clear   () { this._items.length = 0; return this; },
  pop     () { return this._items.pop(); },
  reverse () { this._items.reverse(); return this; },
  shift   () { return this._items.shift(); },
  toArray () { return [...this._items]; },
  toSet   () { return new Set(this._items); },

  filter (fn) { return new this.constructor(this._items.filter(fn)); },
  find   (fn) { return this._items.find(fn); },
  map    (fn) { return new this.constructor(this._items.map(fn)); },
  sort   (fn) { this._items.sort(fn); return this; },
      
  has     (item) { return this._items.includes (item); },
  indexOf (item) { return this._items.indexOf  (item); },

  add  (...items) { return this.merge(items); },
  push (...items) { return this.merge(items); },
});

// ::::: USAGE

type.delegateMethods(List, '_items', { has: 'includes' }, ['indexOf', 'pop', 'shift', 'find']);
type.   chainMethods(List, '_items', ['reverse', 'sort']);
type.    wrapMethods(List, '_items', ['filter', 'map']);

type.props (List, {
  get size () { return this._items.length; },

  clone   () { return new this.constructor(this._items); },
  clear   () { this._items.length = 0; return this; },
  
  toArray () { return [...this._items]; },
  toSet   () { return new Set(this._items); },

  add  (...items) { return this.merge(items); },
  push (...items) { return this.merge(items); },
});

// ------ Point
// ::::: POINT PROTOTYPE

const PointPT = new PrototypeMaker ('Point');
PointPT.addStatics({ xy });
PointPT.addProps();

// Unpacks (x, y) from point object, scalar, or fallback
const xy = (val, fallbackX = 0, fallbackY = fallbackX) => {
  if (isNumber(val)) return [val, val];
  if    (isObj(val)) return [Number(val.x) || 0, Number(val.y) || 0];
  return [fallbackX, fallbackY];
};

const Point = type.init (function Point (x = 0, y = 0) {
  RatType.call(this);
  this.x = Number(x) || 0;
  this.y = Number(y) || 0;
});

type.statics (Point, { xy });

type.props (Point, {
  
  get angle     () { return Math.atan2(this.y, this.x); },
  get magnitude () { return Math.hypot(this.x, this.y); },

  clone    ()      { return new this.constructor(this.x, this.y); },
  equals   (other) { return isObj(other) && this.x === other.x && this.y === other.y; },
  distance (other = { x: 0, y: 0 }) { return Math.hypot(other.x - this.x, other.y - this.y); },
  toArray  () { return [this.x, this.y]; },
  toObject () { return { x: this.x, y: this.y }; },

  // ::::: MUTATIONS (In-Place)

  set(x = this.x, y = this.y) {
    this.x = Number(x) || 0;
    this.y = Number(y) || 0;
    return this;
  },

  add (other) {
    const [ox, oy] = xy (other);
    this.x += ox; 
    this.y += oy;
    return this;
  },
  
  subtract (other) {
    const [ox, oy] = xy(other);
    this.x -= ox; 
    this.y -= oy;
    return this;
  },

  multiply (scalar) {
    const factor = Number(scalar) || 0;
    this.x *= factor;
    this.y *= factor;
    return this;
  },

  divide (scalar) {
    const factor = Number(scalar) || 1;
    this.x /= factor;
    this.y /= factor;
    return this;
  },

  negate () {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  },

  clamp (min, max) {
    const [minX, minY] = xy(min, -Infinity);
    const [maxX, maxY] = xy(max,  Infinity);
    this.x = Math.max(minX, Math.min(maxX, this.x));
    this.y = Math.max(minY, Math.min(maxY, this.y));
    return this;
  }

  round () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }
});

// @rat/datatypes

// ::::: RECORD PROTOTYPE

const Record = type.init(function Record(source) {
  RatType.call(this);
  this._data = {};
  if (source != null) this.merge(source);
});

type.props (Record, {
  get size() { return Object.keys(this._data).length; },

  get (key) { return this._data[key]; },
  has (key) { return Object.prototype.hasOwnProperty.call(this._data, key); },
  
  clone   () { return new this.constructor(this._data); },
  entries () { return Object.entries (this._data); },
  keys    () { return Object.keys    (this._data); },
  values  () { return Object.values  (this._data); },

  toObject() { return { ...this._data }; },

  equals(other) {
    if (!other || typeof other !== 'object') return false;
    const otherObj = isFn(other.toObject) ? other.toObject() : other;
    const keysA = this.keys();
    const keysB = Object.keys(otherObj);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) => this._data[key] === otherObj[key]);
  },

  // ::::: MUTATIONS

  set    (key, value) { this._data[key] = value; return this; },
  delete (key)        { delete this._data[key]; return this; },

  merge(...sources) {
    for (const source of sources) {
      if (isNullish(source)) continue;
      const entries = isFn(source.entries)
        ? source.entries()
        : isIterable(source)
          ? source
          : Object.entries(source);

      for (const [key, value] of entries) this._data[key] = value;
    }
    return this;
  },

  clear () { this._data = {}; return this; },

  [Symbol.iterator] () { return this.entries () [Symbol.iterator] (); }
});

// ::::: TUPLE PROTOTYPE

const Tuple = type.init (function Tuple (...items) {
  RatType.call(this);
  // Support both spread arguments or a single array parameter
  this._items = (items.length === 1 && isArray(items[0])) ? [...items[0]] : items;
});

// Direct pass-through delegations to internal array

type.props(Tuple, {
  get length () { return this._items.length; },
  get size   () { return this._items.length; },

  get(index) {
    const normalized = index < 0 ? this._items.length + index : index;
    return this._items[normalized];
  },

  clone() {
    return new this.constructor(...this._items);
  },

  equals (other) {
    if (!other) return false;
    const arr = isFn(other.toArray) ? other.toArray() : Array.from(other);
    if (this._items.length !== arr.length) return false;
    return this._items.every((val, i) => val === arr[i]);
  },

  // ::::: MUTATIONS

  set (index, value) {
    const normalized = index < 0 ? this._items.length + index : index;
    if (normalized >= 0) {
      this._items[normalized] = value;
    }
    return this;
  },

  swap(i, j) {
    const len = this._items.length;
    const idxA = i < 0 ? len + i : i;
    const idxB = j < 0 ? len + j : j;
    if (idxA >= 0 && idxA < len && idxB >= 0 && idxB < len) {
      const temp = this._items[idxA];
      this._items[idxA] = this._items[idxB];
      this._items[idxB] = temp;
    }
    return this;
  },

  fill (value, start, end) { this._items.fill(value, start, end); return this; },

  clear () { this._items = []; return this; },

  [Symbol.iterator] () { return this._items[Symbol.iterator](); }
});

type.delegateMethods(Tuple, '_items', { has: 'includes' }, ['indexOf', 'find', 'slice']);

// ::::: TREE PROTOTYPE

const Tree = type.init (function Tree (value, children = []) {
  RatType.call(this);
  this.value = value;
  this.children = [];
  if (children && children.length) this.addChildren(children);
});

type.props(Tree, {
  get isLeaf () { return this.children.length === 0; },

  get depth() {
    if (this.isLeaf) return 0;
    return 1 + Math.max(...this.children.map((c) => c.depth));
  },

  clone() {
    return new this.constructor(
      this.value,
      this.children.map((child) => child.clone())
    );
  },

  find(predicate) {
    if (predicate(this.value, this)) return this;
    for (const child of this.children) {
      const found = child.find(predicate);
      if (found) return found;
    }
    return null;
  },

  traverse(fn) {
    fn(this.value, this);
    for (const child of this.children) child.traverse(fn);
    
  },

  // ::::: MUTATIONS

  setValue (val) { this.value = val; return this; },

  addChild (child) {
    const node = child instanceof Tree ? child : new this.constructor(child);
    this.children.push(node);
    return this;
  },

  addChildren (children) {
    for (const child of children) this.addChild(child);
    return this;
  },

  removeChild (childOrValue) {
    this.children = this.children.filter(
      (c) => c !== childOrValue && c.value !== childOrValue
    );
    return this;
  },

  clear () { this.children = []; return this; }
});



// ************ STEP 3 ************
// Auto-generate 'to*' immutable counterparts (toAdded, toSubtracted, toMultiplied, etc.)
// define mutating methods list
immu.attach (List   , ['merge', 'remove', 'removeByIndex', 'reverse', 'shift', 'slice', 'splice', 'shuffle', 'sort', 'unshift']);      
immu.attach (Point  , ['add', 'clamp', 'divide', 'multiply', 'negate', 'round', 'set', 'subtract']);
immu.attach (Record , ['set', 'delete', 'merge', 'clear']);
immu.attach (Tree   , ['setValue', 'addChild', 'addChildren', 'removeChild', 'clear']);
immu.attach (Tuple  , ['set', 'swap', 'fill', 'clear']);




// @rat/datatypes

// ::::: UNIVERSAL ARRAY COERCING HELPER

/**
 * Coerces any given source/shape into a plain Array based on its type.
 * 
 * @param {any} source - Input value of any shape or type
 * @returns {Array} - Coerced plain array
 */
const toArray = (source) => {
  if (source == null) return [];
  // 1. Delegate if the target already implements custom toArray logic
  if (isFn(source.toArray)) return source.toArray();
  // 2. Handle Iterables (Arrays, Sets, Maps, custom Iterables)
  if (isIterable(source[Symbol.iterator])) return Array.from(source);
  // 3. Handle Plain Objects / Key-Value structures
  if (isObj(source)) return Object.values(source);
  // 4. Fallback for primitives (number, string, boolean, symbol)
  return [source];
};

// ::::: INTEGRATION INTO RAT MOTHER PROTOTYPE
// Base fallback for all RatType instances
RatType.prototype.toArray = function () { return toArray (this); };
// Static helper on RatType for direct utility calls: RatType.toArray(anything)
RatType.toArray = toArray;

// Single Source of Truth for Array Coercion
const toArray = (source) => {
  if (isNullish(source))    return [];
  if (isFn(source.toArray)) return source.toArray();
  if (isIterable(source))   return Array.from(source);
  if (isObj(source))        return Object.values(source);
  return [source];
};

RatType.prototype.toArray = function () { return toArray(this); };
RatType.toArray = toArray;




// ======================================

function createType (Target, {
  baseType  = RatType, 
  methods   = {},
  mutations = [], 
  statics   = {} 
} = {}) {
  // If Target is a string, construct a named function dynamically
  const NewType = isFn(Target) ? Target : { [Target]: function (...args) { base.call(this, ...args); } }[Target];
  // 1. inherit prototype & static properties
  extendType(NewType, baseType);
  // 2. attach instance methods to prototype
  Object.assign(NewType.prototype, methods);
  // 3. auto-generate immutable counterpart methods
  if (mutations.length) immu.attach(NewType, mutations);
  // 4. attach static methods
  Object.assign(NewType, statics);
  // done!
  return NewType;
}


// :::::: KEY NORMALIZATION ENGINE

const CASES = {
  camel  : str.toCamelCase,
  kebab  : str.toKebabCase,
  snake  : str.toSnakeCase,
  pascal : str.toPascalCase,
  stripFlags : (s) => s.replace(/^--?/, ''), // '--custom-command' -> 'custom-command'
};

/**
 * Resolves a form definition (string, regex, function) into a transformer function.
 */
const toTransformer = (form) => {
  if (isFn(form)) return form;
  if (isString(form) && CASES[form]) return CASES[form];
  if (isRegExp(form)) return (s) => s.replace(form, '');
  return (s) => s;
};

/**
 * Creates a composite key normalizer pipeline and alias generator.
 */
const createKeyPipeline = (config) => {
  let transformers = [];

       if    (isFn(config)) transformers = [config];
  else if (isArray(config)) transformers = config.map(toTransformer);
  else if (config && typeof config === 'object') {
    const { stripFlags = true, forms = ['camel', 'kebab', 'snake'], custom } = config;
    if (stripFlags) transformers.push(CASES.stripFlags);
    if (custom)     transformers.push(toTransformer(custom));
    transformers.push(...forms.map(toTransformer));
  }
  // Default pipeline: strip CLI flags, then support camel, kebab, snake
  else transformers = [CASES.stripFlags, CASES.camel, CASES.kebab, CASES.snake];
  

  return {
    // Primary transformer to compute canonical key
    canonical: (key) => {
      if (!isString(key)) return key;
      return transformers.reduce((acc, fn) => fn(acc), key);
    },
    // Generates all alias forms for a key
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

// :::::: MAP / DICT PROTOTYPE

const MapType = createType(function Map(source, options = {}) {
  RatType.call(this);

  this._store    = new Map();
  this._aliases  = new Map();
  this._cache    = new Map();
  this._pipeline = createKeyPipeline(options);

  if (source != null) this.merge(source);
}, {
  methods: {
    // Resolve any key (raw, alias, flag) to its canonical key
    key(rawKey) {
      if (!isString(rawKey)) return rawKey;

      const alias = this._aliases.get(rawKey);
      if (alias !== undefined) return alias;

      const cached = this._cache.get(rawKey);
      if (cached !== undefined) return cached;

      const canonicalKey = this._pipeline.canonical(rawKey);
      this._cache.set(rawKey, canonicalKey);
      return canonicalKey;
    },

    set (rawKey, value) {
      if (!isString(rawKey)) {
        this._store.set(rawKey, value);
        return this;
      }

      const canonicalKey = this.key(rawKey);

      if (!this._store.has(canonicalKey)) {
        // Register all alias variations pointing to the canonical key
        const aliases = this._pipeline.generateAliases(rawKey);
        for (const alias of aliases) {
          this._aliases.set(alias, canonicalKey);
        }
      }

      this._store.set(canonicalKey, value);
      return this;
    },

    get (rawKey) { return this._store.get(this.key(rawKey)); },
    has (rawKey) { return this._store.has(this.key(rawKey)); },

    delete(rawKey) {
      const canonicalKey = this.key(rawKey);
      
      // Clean up associated aliases
      for (const [alias, target] of this._aliases) {
        if (target === canonicalKey) this._aliases.delete(alias);
      }

      return this._store.delete(canonicalKey);
    },

    clear() {
      this._aliases.clear();
      this._cache.clear();
      this._store.clear();
      return this;
    },

    merge (source) {
      const entries = source == null ? [] 
        : isIterable(source) ? source 
        : Object.entries(source);

      for (const [k, v] of entries) this.set(k, v);
      return this;
    },

    toObject(transformForm) {
      const convert = transformForm ? toTransformer(transformForm) : null;
      const result  = {};
      for (const [k, v] of this._store) {
        result[convert ? convert(k) : k] = v;
      }
      return result;
    },

    clone() {
      const copy = new this.constructor(null, this._pipeline);
      for (const [k,v] of this._store) copy.set(k,v);
      return copy;
    },

    // Iterators
    keys    () { return this._store.keys    (); },
    values  () { return this._store.values  (); },
    entries () { return this._store.entries (); },
    [Symbol.iterator]() { return this._store[Symbol.iterator](); }
  },

  // Auto-generate immutable variants: toSet, toDeleted, toCleared, toMerged
  mutations: ['set', 'delete', 'clear', 'merge']
});

// :::::: REACTIVE VARIANT

const $Map = createType('$Map', { base: MapType });

/*
delegator
iterator
mutator
normalizer
transformer
validator
wrapper

getter
setter
*/

function createType(Target, {
  base      = RatType,
  props     = {},
  delegate  = null, // [targetKey, ...defs]
  chain     = null, // [targetKey, ...defs]
  wrap      = null, // [targetKey, ...defs]
  mutations = [],
  statics   = {}
} = {}) {
  const NewType = type.init(Target, base);

  if (delegate) type.delegateMethods(NewType, ...delegate);
  if (chain)    type.chainMethods   (NewType, ...chain);
  if (wrap)     type.wrapMethods    (NewType, ...wrap);

  type.props(NewType, props);
  type.statics(NewType, statics);

  if (mutations.length) immu.attach(NewType, mutations);

  return NewType;
}

// ::::: 

const List = createType('List', {
  delegate: ['_items', { has: 'includes' }, 'indexOf pop shift find'],
  chain:    ['_items', 'reverse sort'],
  wrap:     ['_items', 'filter map'],
  mutations: ['add', 'push', 'merge', 'remove', 'reverse', 'sort', 'clear'],
  props: {
    get size () { return this._items.length; },
    clear   () { this._items.length = 0; return this; },
    clone   () { return new this.constructor(this._items); },
    toArray () { return [...this._items]; },
    toSet   () { return new Set(this._items); },
    add     (...items) { return this.merge(items); },
    push    (...items) { return this.merge(items); }
  }
});

