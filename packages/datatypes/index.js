// @rat/datatypes

// :::::: IMPORT

// may gonna be inlined later
import shift from '@pulgasari/shift';
import str   from '@pulgasari/str';

// :::::: INTERNAL HELPERS

const instanceOf = (sth) => (ClassName) => sth instanceof ClassName;
const typeOf     = (sth) => (typeName)  => typeof sth === typeName;

const isArray    = Array.isArray;
const isFn       = typeOf('function');
const isIterable = (sth) => typeof sth[Symbol.iterator] === 'function';
const isRegExp   = instanceOf(RegExp);

const P = (Target) => Target.prototype;








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

// explicitly delegate a list of method mappings to a named property on 'this'
type.delegate = function (TargetType, targetKey, mapping) {
  const proto = TargetType.prototype;

  for (const [methodName, targetMethod] of Object.entries(mapping)) {
    proto[methodName] = function (...args) {
      return this[targetKey][targetMethod](...args);
    };
  }
};

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

// define mutating methods list
immu.attach (List   , ['merge', 'remove', 'removeByIndex', 'reverse', 'shift', 'slice', 'splice', 'shuffle', 'sort', 'unshift']);      
immu.attach (Point  , []);
immu.attach (Record , []);
immu.attach (Tree   , []);
immu.attach (Tuple  , []);

// ------------ List

List.prototype.has     = function (item) { return this._items.includes(item); };
List.prototype.indexOf = function (item) { return this._items.indexOf(item); }

List.prototype.add     = function (...items) { return this.merge(items); }
List.prototype.push    = function (...items) { return this.merge(items); }

List.prototype.clone   = function () { return new this.constructor(this._items); }
List.prototype.clear   = function () { this._items.length = 0; return this; },
List.prototype.pop     = function () { return this._items.pop(); },
List.prototype.reverse = function () { this._items.reverse(); return this; },
List.prototype.shift   = function () { return this._items.shift(); },
List.prototype.toArray = function () { return [...this._items]; }
List.prototype.toSet   = function () { return new Set(this._items); }

List.prototype.filter = function (fn) { return new this.constructor(this._items.filter(fn)); },
List.prototype.find   = function (fn) { return this._items.find(fn); },
List.prototype.map    = function (fn) { return new this.constructor(this._items.map(fn)); },
List.prototype.sort   = function (fn) { this._items.sort(fn); return this; },
  
List.prototype.forEach = function (fn, thisArg) { this._items.forEach(fn, thisArg); },

List.prototype.slice = function (start, end) { this._items = this._items.slice(start, end); return this; },



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

type.delegate(List,    '_items', { has: 'includes', indexOf, pop, shift, find });
type.delegate(MapType, '_store', { keys, values });




type.delegate = function (TargetType, propKey, methods) {
  const descriptors = Object.getOwnPropertyDescriptors(methods);

  for (const key in descriptors) {
    const desc = descriptors[key];
    desc.enumerable = false;

    if (typeof desc.value === 'function') {
      const origFn = desc.value;
      // Pass internal target (e.g. this._items) as 1st arg, instance as 2nd arg
      desc.value = function (...args) {
        return origFn(this[propKey], ...args, this);
      };
    }
  }

  Object.defineProperties(TargetType.prototype, descriptors);
};

// ::::: DEFINITION WITH TARGET INJECTION

type.delegate(List, '_items', {
  // `it` is directly `this._items`
  has     : (it, item) => it.includes (item),
  indexOf : (it, item) => it.indexOf  (item),
  pop     : (it)       => it.pop   (),
  shift   : (it)       => it.shift (),

  // `s` (last parameter) is the List instance if needed
  filter : (it, fn, s) => new s.constructor(it.filter(fn)),
  map    : (it, fn, s) => new s.constructor(it.map(fn)),
  clear  : (it,  _, s) => (it.length = 0, s),
});






type.props = function (TargetType, methods) {
  const descriptors = Object.getOwnPropertyDescriptors(methods);
  const proto = TargetType.prototype;

  for (const key in methods) {
    const val = methods[key];

    if (typeof val === 'string') {
      // String shortcut: Forward directly to this._items[val]
      proto[key] = function (...args) {
        return this._items[val](...args);
      };
    } else if (typeof val === 'function') {
      // Arrow function: Pass `this` as 1st parameter
      proto[key] = function (...args) {
        return val(this, ...args);
      };
    }
  }
};

// ::::: DEFINITION WITH SMART DSL

type.props(List, {
  // 1. Strings = Direct 1:1 delegation to this._items
  has     : 'includes',
  indexOf : 'indexOf',
  pop     : 'pop',
  shift   : 'shift',
  find    : 'find',

  // 2. Arrows = Custom logic where `s` is the instance
  add     : (s, ...items) => s.merge(items),
  clear   : (s)           => (s._items.length = 0, s),
  filter  : (s, fn)       => new s.constructor(s._items.filter(fn)),
  toArray : (s)           => [...s._items],
});






// ======================================
// RAT DATA TYPES CONSTRUCTION APPROACH 2
// ======================================

// :::::: IMMUTABLE METHOD GENERATOR

const immu = {};

// Bulk attaches immutable 'to*' methods to a prototype based on mutation method names
immu.attach = (TypeName, methods = []) => {
  for (const key of methods) {
    P(TypeName)[immu.name(key)] = immu.make(key);
  }
};

// Creates an immutable wrapper function that operates on a copy of 'this'
immu.make = (key) => function (...args) {
  const copy = this.clone();
  copy[key](...args);
  return copy;
};

// Converts mutation key (e.g., 'removeByIndex') to immutable key ('toRemovedByIndex')
immu.name = (key) => {
  const match = key.match(/^([a-z]+)(.*)$/); if (!match) return key;
  const [, verb, rest] = match;
  const pastVerb    = verb.endsWith('e') ? `${verb}d` : `${verb}ed`;
  const capitalized = pastVerb.charAt(0).toUpperCase() + pastVerb.slice(1);
  return `to${capitalized}${rest}`;
};

// :::::: RAT MOTHER PROTOTYPE

function RatType() {}
// dynamic type check works for all extended types
RatType.is = function (sth) { return sth instanceof this; };

// Wire prototype chain and static inheritance
function extendType(NewType, BaseType = RatType) {
  NewType.prototype.constructor = NewType;
  Object.setPrototypeOf(NewType.prototype, BaseType.prototype);
  Object.setPrototypeOf(NewType, BaseType);
}

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

// :::::: RAT PROTOTYPES DEFINITION

const List = createType('List', {
  methods: {
    clone         ()        { return new this.constructor(this); },
    merge         (...args) { /* mutation impl */ },
    remove        (...args) { /* mutation impl */ },
    removeByIndex (...args) { /* mutation impl */ },
    reverse       ()        { /* mutation impl */ },
    shift         ()        { /* mutation impl */ },
    slice         (...args) { /* mutation impl */ },
    splice        (...args) { /* mutation impl */ },
    shuffle       ()        { /* mutation impl */ },
    sort          (...args) { /* mutation impl */ },
    unshift       (...args) { /* mutation impl */ }
  },
  mutations: [
    'merge', 'remove', 'removeByIndex', 'reverse', 
    'shift', 'slice', 'splice', 'shuffle', 'sort', 'unshift'
  ]
});

const Point = createType (function Point (x = 0, y = 0) {
  RatType.call(this);
  this.x = x;
  this.y = y;
});

const Record = createType('Record');
const Tree   = createType('Tree');
const Tuple  = createType('Tuple');

// :::::: REACTIVE VARIANTS

const $List  = createType('$List',  { base: List });
const $Point = createType('$Point', { base: Point });
const $Tree  = createType('$Tree',  { base: Tree });










// @rat/datatypes

// :::::: KEY NORMALIZATION ENGINE

const BUILTIN_FORMS = {
  camel:      (s) => s.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : '')),
  kebab:      (s) => s.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase(),
  snake:      (s) => s.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s-]+/g, '_').toLowerCase(),
  pascal:     (s) => s.replace(/(^\w|[-_]\w)/g, (m) => m.replace(/[-_]/, '').toUpperCase()),
  stripFlags: (s) => s.replace(/^--?/, ''), // Converts '--custom-command' -> 'custom-command'
};

/**
 * Resolves a form definition (string, regex, function) into a transformer function.
 */
const toTransformer = (form) => {
  if (isFn(form)) return form;
  if (isString(form) && BUILTIN_FORMS[form]) return BUILTIN_FORMS[form];
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
    if (stripFlags) transformers.push(BUILTIN_FORMS.stripFlags);
    if (custom)     transformers.push(toTransformer(custom));
    transformers.push(...forms.map(toTransformer));
  }
  // Default pipeline: strip CLI flags, then support camel, kebab, snake
  else transformers = [BUILTIN_FORMS.stripFlags, BUILTIN_FORMS.camel, BUILTIN_FORMS.kebab, BUILTIN_FORMS.snake];
  

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
    keys    () { return this._store.keys  (); },
    values  () { return this._store.values  (); },
    entries () { return this._store.entries (); },
    [Symbol.iterator]() { return this._store[Symbol.iterator](); }
  },

  // Auto-generate immutable variants: toSet, toDeleted, toCleared, toMerged
  mutations: ['set', 'delete', 'clear', 'merge']
});

// :::::: REACTIVE VARIANT

const $Map = createType('$Map', { base: MapType });



// @rat/datatypes

// :::::: LIST PROTOTYPE (ORDERED SET / UNIQUE ARRAY)

const List = createType(function List(source) {
  RatType.call(this);

  this._items = [];

  if (source != null) {
    this.merge(source);
  }
}, {
  methods: {
    // ::::: READ & UTILITIES

    has(item) { return this._items.includes(item); },

    get(index) {
      // Support negative index (-1 = last item)
      const normalized = index < 0 ? this._items.length + index : index;
      return this._items[normalized];
    },

    indexOf (item) { return this._items.indexOf(item); },
    get size   () { return this._items.length; },
    get length () { return this._items.length; },

    clone   () { return new this.constructor(this._items); },
    toArray () { return [...this._items]; },
    toSet   () { return new Set(this._items); },

    // ::::: MUTATIONS (Set-like Uniqueness + Array Operations)

    add  (...items) { return this.merge(items); },
    push (...items) { return this.merge(items); },

    merge(...sources) {
      for (const source of sources) {
        const entries = source == null ? [] 
          : typeof source[Symbol.iterator] === 'function' ? source 
          : Object.values(source);

        for (const item of entries) {
          if (!this.has(item)) {
            this._items.push(item);
          }
        }
      }
      return this;
    },

    remove(...items) {
      for (const item of items) {
        const idx = this.indexOf(item);
        if (idx !== -1) {
          this._items.splice(idx, 1);
        }
      }
      return this;
    },

    removeByIndex(...indices) {
      // Sort indices descending to avoid shift offset issues during deletion
      const sorted = [...indices].sort((a, b) => b - a);

      for (const idx of sorted) {
        const normalized = idx < 0 ? this._items.length + idx : idx;
        if (normalized >= 0 && normalized < this._items.length) {
          this._items.splice(normalized, 1);
        }
      }
      return this;
    },
    
    clear   () { this._items.length = 0; return this; },
    pop     () { return this._items.pop(); },
    reverse () { this._items.reverse(); return this; },
    shift   () { return this._items.shift(); },


    unshift(...items) {
      // Insert items at the front while ensuring uniqueness
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        const idx = this.indexOf(item);
        if (idx !== -1) this._items.splice(idx, 1);
        this._items.unshift(item);
      }
      return this;
    },

    slice (start, end) { this._items = this._items.slice(start, end); return this; },
    sort (fn) { this._items.sort(fn); return this; },
    
    splice(start, deleteCount, ...items) {
      // Remove duplicates from existing elements before inserting new ones
      for (const item of items) {
        const idx = this.indexOf(item);
        if (idx !== -1) this._items.splice(idx, 1);
      }
      this._items.splice(start, deleteCount, ...items);
      return this;
    },

    shuffle() {
      // Fisher-Yates shuffle algorithm
      for (let i = this._items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this._items[i], this._items[j]] = [this._items[j], this._items[i]];
      }
      return this;
    },

    

    

    // ::::: SET ALGEBRA

    intersect(other) {
      const otherSet = new Set(
        other == null ? [] 
        : typeof other[Symbol.iterator] === 'function' ? other 
        : Object.values(other)
      );
      this._items = this._items.filter(item => otherSet.has(item));
      return this;
    },

    difference(other) {
      const otherSet = new Set(
        other == null ? [] 
        : typeof other[Symbol.iterator] === 'function' ? other 
        : Object.values(other)
      );
      this._items = this._items.filter(item => !otherSet.has(item));
      return this;
    },

    // ::::: ITERATION & FUNCTIONAL METHODS

    forEach (fn, thisArg) { this._items.forEach(fn, thisArg); },
    
    filter (fn) { return new this.constructor(this._items.filter(fn)); },
    find   (fn) { return this._items.find(fn); },
    map    (fn) { return new this.constructor(this._items.map(fn)); },

    [Symbol.iterator]() {
      return this._items[Symbol.iterator]();
    }
  },

  // Auto-generate immutable counterpart methods ('to*')
  mutations: [
    'add',
    'push',
    'merge',
    'remove',
    'removeByIndex',
    'reverse',
    'shift',
    'pop',
    'unshift',
    'slice',
    'splice',
    'shuffle',
    'sort',
    'clear',
    'intersect',
    'difference'
  ]
});

