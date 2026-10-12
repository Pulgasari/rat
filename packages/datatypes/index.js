// @rat/datatypes

// :::::: INTERNAL HELPERS

const instanceOf = (sth) => (ClassName) => sth instanceof ClassName;

// @rat/datatypes

// :::::: BASE CLASS

class RatObject {
  // Static type guard working for all subclasses via 'this'
  static is(sth) {
    return sth instanceof this;
  }
}

// :::::: BASE VARIANTS

class List extends RatObject {
  // Private helper for copy-on-write operations
  #immutable(methodName, ...args) {
    const copy = this.clone();
    copy[methodName](...args);
    return copy;
  }

  // Shared prototype methods
  toMerged         (...args) { return this.#immutable('merge', ...args); }
  toRemoved        (...args) { return this.#immutable('remove', ...args); }
  toRemovedByIndex (...args) { return this.#immutable('removeByIndex', ...args); }
  toReversed       ()        { return this.#immutable('reverse'); }
  toShifted        ()        { return this.#immutable('shift'); }
  toSliced         (...args) { return this.#immutable('slice', ...args); }
  toSpliced        (...args) { return this.#immutable('splice', ...args); }
  toShuffled       ()        { return this.#immutable('shuffle'); }
  toSorted         (...args) { return this.#immutable('sort', ...args); }
  toUnshifted      (...args) { return this.#immutable('unshift', ...args); }

  clone() {
    return new this.constructor(this);
  }
}

class Point  extends RatObject {}
class Record extends RatObject {}
class Tree   extends RatObject {}
class Tuple  extends RatObject {}

// :::::: REACTIVE VARIANTS

class $List  extends List  {}
class $Point extends Point {}
class $Tree  extends Tree  {}

// :::::: USAGE
// List.is(myList);   // true
// $List.is(my$List); // true 










// @rat/datatypes

// :::::: BASE CONSTRUCTOR

function RatObject() {}

// Static method on base function
RatObject.is = function(sth) {
  return sth instanceof this;
};

// :::::: BASE VARIANTS

function List() {
  RatObject.call(this);
}

// Setup instance prototype chain
List.prototype = Object.create(RatObject.prototype);
List.prototype.constructor = List;

// Setup static inheritance chain (so List inherits RatObject.is)
Object.setPrototypeOf(List, RatObject);

// Internal prototype helper
List.prototype._immutable = function(methodName, args) {
  const copy = this.clone();
  copy[methodName].apply(copy, args);
  return copy;
};

// Prototype methods
List.prototype.toMerged = function(...args) {
  return this._immutable('merge', args);
};
List.prototype.toRemoved = function(...args) {
  return this._immutable('remove', args);
};
List.prototype.toRemovedByIndex = function(...args) {
  return this._immutable('removeByIndex', args);
};
List.prototype.toReversed = function() {
  return this._immutable('reverse', []);
};
List.prototype.toShifted = function() {
  return this._immutable('shift', []);
};
List.prototype.toSliced = function(...args) {
  return this._immutable('slice', args);
};
List.prototype.toSpliced = function(...args) {
  return this._immutable('splice', args);
};
List.prototype.toShuffled = function() {
  return this._immutable('shuffle', []);
};
List.prototype.toSorted = function(...args) {
  return this._immutable('sort', args);
};
List.prototype.toUnshifted = function(...args) {
  return this._immutable('unshift', args);
};

List.prototype.clone = function() {
  return new this.constructor(this);
};

function Point() { RatObject.call(this); }
Point.prototype = Object.create(RatObject.prototype);
Point.prototype.constructor = Point;
Object.setPrototypeOf(Point, RatObject);

// :::::: REACTIVE VARIANTS

function $List() {
  List.call(this);
}
$List.prototype = Object.create(List.prototype);
$List.prototype.constructor = $List;
Object.setPrototypeOf($List, List);









// @rat/datatypes










// @rat/datatypes

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

// :::::: BASE PROTOTYPE

function RatType () {}
RatType.is = function (sth) { return sth instanceof this; };

const extendType = (NewType, BaseType = RatType) => {
  NewType.prototype             = Object.create(BaseType.prototype);
  NewType.prototype.constructor = NewType;
  Object.setPrototypeOf(NewType, BaseType);
}

// :::::: LIST PROTOTYPE

function List () {}
extendType(List);

// define mutating methods list
immu.attach (List   , ['merge', 'remove', 'removeByIndex', 'reverse', 'shift', 'slice', 'splice', 'shuffle', 'sort', 'unshift']);      
immu.attach (Point  , []);
immu.attach (Record , []);
immu.attach (Tree   , []);
immu.attach (Tuple  , []);



// :::::: BASE VARIANTS

class List {
  toMerged         = this.clone().merge;
  toRemoved        = this.clone().remove;
  toRemovedByIndex = this.clone().removeByIndex;
  toReversed       = this.clone().reverse;
  toShifted        = this.clone().shift;
  toSliced         = this.clone().slice;
  toSpliced        = this.clone().splice;
  toShuffled       = this.clone().shuffle;
  toSorted         = this.clone().sort;
  toUnshifted      = this.clone().unshifted;
  
  static isList = instanceOf (List);
}

class Point {
  static isPoint = instanceOf (Point);
}

class Record {
  static isRecord = instanceOf (Record);
}

class Tree {
  static isTree = instanceOf (Tree);
}

class Tuple {
  static isTuple = instanceOf (Tuple);
}

// :::::: REACTIVE VARIANTS

class $List  extends List {
  static isList (sth) { return sth instanceof List; }
}

class $Map   extends Map  {
  static isMap (sth) { return sth instanceof Map; }
}

class $Point extends Point {
  static isPoint (sth) { return sth instanceof Point; }
}

class $Tree  extends Tree {
  static isTree (sth) { return sth instanceof Tree; }
}
