// @rat/types :: Segments

// :::::: IMPORT

import { Schema, bare, byParse, dataType, issue } from './../schema.js';
import { isArray, isString } from './../_shared.js';

// :::::: HELPERS

const partsOf = (value, separator) => {
  if (value instanceof SegmentsType) return value.segments;
  const parts = isArray(value) ? value.map(String) : String(value ?? '').split(separator);
  return parts.filter(part => part !== '');
};

// ::: DATA TYPE

class SegmentsType {
  constructor (value = [], separator = ':') {
    this.separator = separator;
    this.segments  = Object.freeze(partsOf(value, separator));
    Object.freeze(this);
  }

  // another separator, or a subclass, keeps its own: from() of the class that is asked
  static from (value, separator) { return value instanceof this ? value : new this(value, separator); }

  get length () { return this.segments.length; }

  at    (index)      { return this.segments.at(index); }
  make  (parts)      { return this.constructor.from(parts, this.separator); } // a new one of the same kind: Path.from() for a path, which keeps one instance per path      
  slice (start, end) { return this.make(this.segments.slice(start, end)); }
  with  (...parts)   { return this.make([...this.segments, ...parts.flatMap(part => this.partsOf(part))]); }
  
  equals (other) {
    const parts = partsOf(other, this.separator);
    return parts.length === this.length && parts.every((part, index) => part === this.segments[index]);
  }

  partsOf (part) { return partsOf(part, this.separator); }

  // other is the beginning of this one, part by part (equal counts)
  startsWith (other) {
    const parts = partsOf(other, this.separator);
    return parts.length <= this.length && parts.every((part, index) => part === this.segments[index]);
  }

  toArray  () { return [...this.segments]; }
  toJSON   () { return this.toString(); }
  toString () { return this.segments.join(this.separator); }

  [Symbol.iterator] () { return this.segments[Symbol.iterator](); }
}

// ::: SCHEMA

const isInput = value => isString(value) || isArray(value) || value instanceof SegmentsType;

const segmentsOf = (separator = ':') => new Schema({
  describe : { separator },
  initial  : '',
  kind     : 'segments',
  run      : (value, path) => isInput(value) ? { value: SegmentsType.from(value, separator) } : issue('expected a string or its parts', path),
});

// ::: Segments

// a value of the schema is Segments already: create() hands it on
const Segments = bare(dataType(SegmentsType, segmentsOf, { create: byParse, kind: 'segments', name: 'Segments' }));

// :::::: EXPORT

export { Segments, isInput, partsOf };
