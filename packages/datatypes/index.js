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
