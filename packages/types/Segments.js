// @rat/types :: Segments

/*
a value made of parts with a separator between them: a key like 'rat:noisy:theme', a path (Path,
special/Path.js), a version. made from the string or from the parts, it is a value: never changed, a
change gives a new one.

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

const partsOf = (value, separator) => {
  if (value instanceof Segments) return value.segments;
  const parts = Array.isArray(value) ? value.map(String) : String(value ?? '').split(separator);
  return parts.filter(part => part !== '');
};

class Segments {
  constructor (value = [], separator = ':') {
    this.separator = separator;
    this.segments  = Object.freeze(partsOf(value, separator));
    Object.freeze(this);
  }

  // another separator, or a subclass, keeps its own: from() of the class that is asked
  static from (value, separator) { return value instanceof this ? value : new this(value, separator); }

  get length () { return this.segments.length; }

  at (index) { return this.segments.at(index); }

  // a new one of the same kind: Path.from() for a path, which keeps one instance per path
  make (parts) { return this.constructor.from(parts, this.separator); }

  slice (start, end) { return this.make(this.segments.slice(start, end)); }
  with  (...parts)   { return this.make([...this.segments, ...parts.flatMap(part => partsOf(part, this.separator))]); }

  equals (other) {
    const parts = partsOf(other, this.separator);
    return parts.length === this.length && parts.every((part, index) => part === this.segments[index]);
  }

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

// :::::: EXPORT

export { Segments, partsOf };
