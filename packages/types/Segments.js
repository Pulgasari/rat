// @rat/types :: Segments

/*
a value made of parts with a separator between them: a key like 'rat:noisy:theme', a path (Path,
special/Path.js), a version. made from the string or from the parts, it is a value: never changed, a
change gives a new one. called, it is the schema: a string, the parts or Segments, made Segments.

  const Key = Segments(':');                      // the schema, ':' by default. { key: Segments } as a field is Segments()

  const key = Segments.from('rat:noisy:theme');   // separator ':' by default
  const ver = Segments.from('1.4.2', '.');

  key.segments          // ['rat', 'noisy', 'theme'], frozen
  key.separator         // ':'
  key.length            // 3
  key.at(-1)            // 'theme'
  key.slice(0, 2)       // rat:noisy
  key.with('dark')      // rat:noisy:theme:dark
  key.startsWith('rat') // true, a part at a time: 'ra' is no start of it
  key.equals('rat:noisy:theme')
  String(key)           // 'rat:noisy:theme', JSON as well

empty parts are dropped: 'a::b' and ':a:b:' are a:b.
*/

import { Schema, bare, byParse, issue, typed } from './schema.js';

const partsOf = (value, separator) => {
  if (value instanceof SegmentsType) return value.segments;
  const parts = Array.isArray(value) ? value.map(String) : String(value ?? '').split(separator);
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

  /* --- scratches for ratjs syntax ---
  static fn from     = (value, separator) => value instanceof this ? value : new this(value, separator);
  getter fn length   ==> this.segments.length;
  public fn at       = this.segments.at;
  public fn make     = (parts) => this.constructor.from(parts, this.separator);
  public fn slice    = this.make :: this.segments.slice; // not sure if that would make sense ?
  public fn with     = (...parts) => this.make :: [...this.segments, ...parts.flatMap(partsOf)];
  public fn toArray  ==> [...this.segments];
  public fn toJSON   ==> this.toString();
  public fn toString ==> this.segments.join(this.separator);
  */
  
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

const isInput = value => typeof value === 'string' || Array.isArray(value) || value instanceof SegmentsType;

const segmentsOf = (separator = ':') => new Schema({
  describe : { separator },
  initial  : '',
  kind     : 'segments',
  run      : (value, path) => isInput(value) ? { value: SegmentsType.from(value, separator) } : issue('expected a string or its parts', path),
});

// ::: Segments

// a value of the schema is Segments already: create() hands it on
const Segments = bare(typed(SegmentsType, segmentsOf, { kind: 'segments', make: byParse, name: 'Segments' }));

// :::::: EXPORT

export { Segments, isInput, partsOf };
