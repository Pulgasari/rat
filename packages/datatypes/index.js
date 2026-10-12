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



