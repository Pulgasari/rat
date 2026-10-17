// @rat/runtime :: range

/*
a..b is a range: lazy (nothing is allocated until it is iterated or asked for
an array) but with the array methods people reach for. [a..b] is a real array.

  1..5          1 2 3 4 5     inclusive on both ends
  5..1          5 4 3 2 1     counts down
  'a'..'e'      a b c d e     single characters, by code point

the class is Span, not Range: that name belongs to the dom. it is not exported,
range() makes one and isRange() tells one apart.
*/

class Span {
  #from;
  #step;
  #chars;
  length;

  constructor (from, to) {
    this.#chars = typeof from === 'string' && typeof to === 'string';
    if (this.#chars) { from = from.codePointAt(0); to = to.codePointAt(0); }
    this.#from  = from;
    this.#step  = from <= to ? 1 : -1;
    this.length = Math.floor(Math.abs(to - from)) + 1;
  }

  at (index) {
    if (index < 0) index += this.length;
    if (index < 0 || index >= this.length) return undefined;
    const value = this.#from + index * this.#step;
    return this.#chars ? String.fromCodePoint(value) : value;
  }

  *[Symbol.iterator] () {
    for (let index = 0; index < this.length; index++) yield this.at(index);
  }

  includes (value) { return this.indexOf(value) > -1; }

  indexOf (value) {
    const code  = this.#chars && typeof value === 'string' ? value.codePointAt(0) : value;
    const index = (code - this.#from) / this.#step;
    return Number.isInteger(index) && index >= 0 && index < this.length ? index : -1;
  }

  toArray () { return [...this]; }
  toString () { return this.toArray().join(','); }
}

// the array methods, each over a fresh array (lazy until used)
for (const name of ['every', 'filter', 'find', 'findIndex', 'flatMap', 'forEach', 'join', 'map', 'reduce', 'reduceRight', 'reverse', 'slice', 'some', 'toReversed', 'toSorted']) {
  Span.prototype[name] = function (...args) { return this.toArray()[name](...args); };
}

const range   = (from, to) => new Span(from, to);
const isRange = value => value instanceof Span;

export { isRange, range };
