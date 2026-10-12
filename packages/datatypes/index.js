// @rat/datatypes

// :::::: INTERNAL HELPERS

const instanceOf = (sth) => (ClassName) => sth instanceof ClassName;

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
