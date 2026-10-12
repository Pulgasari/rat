// @rat/datatypes

// :::::: INTERNAL HELPERS

const instanceOf = (sth) => (ClassName) => sth instanceof ClassName;













// :::::: HELPER FUNCTIONS

const P = Name => Name.prototype;

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

function extendType (NewType, BaseType = RatType) {
  NewType.prototype             = Object.create(BaseType.prototype);
  NewType.prototype.constructor = NewType;
  Object.setPrototypeOf(NewType, BaseType);
}

function createType (NewType, BaseType = RatType) {}

// :::::: RAT PROTOTYPES

function List () {}
extendType (List, RatType);

function Point () { RatType.call(this); }
extendType (Point, RatType);

function Record () { RatType.call(this); }
extendType (Record, RatType);

function Tree () { RatType.call(this); }
extendType (Tree, RatType);

function Tuple () { RatType.call(this); }
extendType (Tuple, RatType);

// :::::: REACTIVE VARIANTS OF RAT PROTOTYPES

function $List () { List.call(this); }
extendType ($List, List);

function $Point () { Point.call(this); }
extendType ($Point, Point);

function $Tree () { Tree.call(this); }
extendType ($Tree, Tree);

// define mutating methods list
immu.attach (List   , ['merge', 'remove', 'removeByIndex', 'reverse', 'shift', 'slice', 'splice', 'shuffle', 'sort', 'unshift']);      
immu.attach (Point  , []);
immu.attach (Record , []);
immu.attach (Tree   , []);
immu.attach (Tuple  , []);











// @rat/datatypes

// :::::: INTERNAL HELPERS

const instanceOf = (sth) => (ClassName) => sth instanceof ClassName;
const isFn       = (sth) => typeof sth === 'function';
const P = (Target) => Target.prototype;

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

// Dynamic type check works for all extended types
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

const Point = createType(function Point(x = 0, y = 0) {
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

