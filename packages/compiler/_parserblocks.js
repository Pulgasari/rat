// @cosmonaut/parsers/_internal.js
// shared plumbing for the blocks themselves - not exported from mod.js.

export const
// identity for now; reserved as the single wrapping point for future
// cross-cutting concerns (chainability, tracing, source positions), so
// that adding one does not mean touching every block.
decorate = parser => parser,

// runs `parser`, rewinding the stream if it did not match. `undefined` is
// the only failure value - `null` is a legitimate result, most importantly
// optional()'s "matched nothing".
backtrack = (stream, parser) => {
  const position = stream.save();
  const result   = parser(stream);
  if (result === undefined) stream.restore(position);
  return result;
};

// @cosmonaut/parsers/atoms.js
// The only blocks that touch the stream's token-level API directly.
// Everything else in this package is built out of these plus each other.
//import { decorate } from './_internal.js';

export const

check   = value => decorate (stream => stream.check(value) ? true : undefined),
expect  = value => decorate (stream => stream.consume(value)),
token   = value => decorate (stream => stream.match  (value)),

any     = ()    => decorate (stream => stream.eof() ? undefined : stream.next()),
eof     = ()    => decorate (stream => stream.eof() ? true : undefined),

succeed = value => decorate (stream => value),
fail    = ()    => decorate (stream => undefined);

// @cosmonaut/parsers/chain.js
// Context-sensitive and associative chaining: unlike map(), which only
// transforms a result, these let the result decide what gets parsed next.
//import { decorate } from './_internal.js';

export const

chain = (parser, fn) => decorate (stream => {
  const position = stream.save();
  const result   = parser(stream);

  if (result === undefined) {
    stream.restore(position);
    return undefined;
  }

  const next = fn(result, stream)(stream);

  if (next === undefined) {
    stream.restore(position);
    return undefined;
  }

  return next;
}),

chain1 = (parser, fn) => decorate (stream => {
  const position = stream.save();
  const first    = parser(stream);

  if (first === undefined) {
    stream.restore(position);
    return undefined;
  }

  const results = [first];
  let current   = first;

  while (true) {
    const position = stream.save();
    const next     = fn(current, stream)(stream);

    if (next === undefined) {
      stream.restore(position);
      break;
    }

    // infinite loop guard
    if (stream.save() === position) {
      throw new Error('chain1(): parser consumed no input.');
    }

    results.push(next);
    current = next;
  }

  return results;
}),

chainl1 = (operand, operator, build) => decorate (stream => {
  let left = operand(stream);

  if (left === undefined) return undefined;

  while (true) {
    const position = stream.save();
    const op       = operator(stream);

    if (op === undefined) {
      stream.restore(position);
      break;
    }

    const right = operand(stream);

    if (right === undefined) {
      stream.restore(position);
      break;
    }

    left = build(left, op, right);
  }

  return left;
}),

chainr1 = (operand, operator, build) => decorate (stream => {
  const left = operand(stream);

  if (left === undefined) return undefined;

  const position = stream.save();
  const op       = operator(stream);

  if (op === undefined) {
    stream.restore(position);
    return left;
  }

  const right = chainr1(operand, operator, build)(stream);

  if (right === undefined) {
    stream.restore(position);
    return left;
  }

  return build(left, op, right);
});

// @cosmonaut/parsers/flow.js
// `undefined` is the failure value throughout. optional() is the one place
// that deliberately converts a failure into a successful `null` - everything
// else here just propagates undefined-on-failure transparently.
//import { backtrack, decorate } from './_internal.js';

export const

lazy = parser => decorate (stream => parser()(stream)),
not  = parser => decorate (stream => lookAhead(parser)(stream) === undefined ? true : undefined),

// The ONE place `undefined` (failed) becomes `null` (succeeded, matched
// nothing) - this is what lets seq() and friends downstream distinguish
// "this optional part legitimately matched nothing" from "something failed".
optional = parser => decorate (stream => {
  const result = backtrack(stream, parser);
  return result === undefined ? null : result;
}),

between = (open, inner, close) => decorate (stream => {
  const position = stream.save();

  if (open(stream) === undefined) {
    stream.restore(position);
    return undefined;
  }

  const result = inner(stream);

  if (result === undefined || close(stream) === undefined) {
    stream.restore(position);
    return undefined;
  }

  return result;
}),

choice = (...parsers) => decorate (stream => {
  for (const parser of parsers.flat()) {
    const result = backtrack(stream, parser);
    if (result !== undefined) return result;
  }
  return undefined;
}),

cut = (parser, message) => decorate (stream => {
  const result = parser(stream);
  if (result !== undefined) return result;

  message ??= 'cut(): expected parser to succeed.';

  throw stream.error
    ? stream.error(message)
    : new Error(message);
}),

lookAhead = parser => decorate (stream => {
  const position = stream.save();
  const result   = parser(stream);
  stream.restore(position);
  return result;
}),

seq = (...parsers) => decorate (stream => {
  const position = stream.save();
  const results  = [];

  for (const parser of parsers.flat()) {
    const result = parser(stream);
    if (result === undefined) {
      stream.restore(position);
      return undefined;
    }
    results.push(result);
  }

  return results;
}),

skip = (parser, discarded) => decorate (stream => {
  const position = stream.save();
  const result   = parser(stream);

  if (result === undefined || discarded(stream) === undefined) {
    stream.restore(position);
    return undefined;
  }

  return result;
}),

then = (discarded, parser) => decorate (stream => {
  const position = stream.save();

  if (discarded(stream) === undefined) {
    stream.restore(position);
    return undefined;
  }

  const result = parser(stream);

  if (result === undefined) {
    stream.restore(position);
    return undefined;
  }

  return result;
});

export const commit = cut;

// @cosmonaut/parsers/repeat.js
// The "always succeeds" blocks (many, sepBy, sepByLoose, sepEndBy, atMost)
// never return undefined themselves - worst case an empty array `[]`, which
// is a real value, distinct from both `null` and `undefined`. Only the
// "requires at least one" variants (many1, sepBy1, sepBy1Loose, sepEndBy1,
// many1Till) can fail, when even the first required match does not happen.

import { backtrack, decorate } from './_internal.js';

export const

atLeast = (parser, min) => times(parser, min, Infinity),
atMost  = (parser, max) => times(parser, 0, max),

many = parser => decorate (stream => {
  const results = [];

  while (true) {
    const position = stream.save();
    const result   = parser(stream);

    if (result === undefined) {
      stream.restore(position);
      break;
    }

    if (stream.save() === position) {
      throw new Error('many(): parser consumed no input.');
    }

    results.push(result);
  }

  return results;
}),

many1 = parser => decorate (stream => {
  const first = parser(stream);
  if (first === undefined) return undefined;

  const results = many(parser)(stream);
  results.unshift(first);

  return results;
}),

repeat = (parser, count) => decorate (stream => {
  const position = stream.save();
  const results  = [];

  for (let i = 0; i < count; i++) {
    const result = parser(stream);

    if (result === undefined) {
      stream.restore(position);
      return undefined;
    }

    results.push(result);
  }

  return results;
}),

sepBy = (item, separator) => decorate (stream => {
  const first = backtrack(stream, item);
  if (first === undefined) return [];
  return sepByRest(stream, item, separator, [first]);
}),

sepBy1 = (item, separator) => decorate (stream => {
  const first = item(stream);
  if (first === undefined) return undefined;
  return sepByRest(stream, item, separator, [first]);
}),

sepEndBy = (item, separator) => decorate (stream => {
  const first = backtrack(stream, item);
  if (first === undefined) return [];
  return sepEndByRest(stream, item, separator, [first]);
}),

sepEndBy1 = (item, separator) => decorate (stream => {
  const first = item(stream);
  if (first === undefined) return undefined;
  return sepEndByRest(stream, item, separator, [first]);
}),

sepByLoose = (item, separator) => decorate (stream => {
  const first = backtrack(stream, item);
  if (first === undefined) return [];
  return sepByLooseRest(stream, item, separator, [first]);
}),

sepBy1Loose = (item, separator) => decorate (stream => {
  const first = item(stream);
  if (first === undefined) return undefined;
  return sepByLooseRest(stream, item, separator, [first]);
}),

manyTill = (item, end) => decorate (stream => {
  const results = [];

  while (true) {
    const position = stream.save();
    if (end(stream) !== undefined) break;

    stream.restore(position);

    const result = item(stream);
    if (result === undefined) return undefined;

    if (stream.save() === position) {
      throw new Error('manyTill(): parser consumed no input.');
    }

    results.push(result);
  }

  return results;
}),

many1Till = (item, end) => decorate (stream => {
  const first = item(stream);
  if (first === undefined) return undefined;

  const results = manyTill(item, end)(stream);
  results.unshift(first);

  return results;
}),

times = (parser, min, max = Infinity) => decorate (stream => {
  const position = stream.save();
  const results  = [];

  for (let i = 0; i < min; i++) {
    const result = parser(stream);

    if (result === undefined) {
      stream.restore(position);
      return undefined;
    }

    results.push(result);
  }

  while (results.length < max) {
    const position = stream.save();
    const result   = parser(stream);

    if (result === undefined) {
      stream.restore(position);
      break;
    }

    if (stream.save() === position) {
      throw new Error('times(): parser consumed no input.');
    }

    results.push(result);
  }

  return results;
});

// :::::: internal continuation helpers - not exported

function sepByRest (stream, item, separator, results) {
  while (true) {
    const position = stream.save();

    if (backtrack(stream, separator) === undefined) {
      stream.restore(position);
      break;
    }

    const next = item(stream);

    if (next === undefined) {
      stream.restore(position);
      break;
    }

    results.push(next);
  }

  return results;
}

function sepEndByRest (stream, item, separator, results) {
  while (true) {
    if (backtrack(stream, separator) === undefined) break;

    const next = backtrack(stream, item);
    if (next === undefined) break; // trailing separator allowed

    results.push(next);
  }

  return results;
}

function sepByLooseRest (stream, item, separator, results) {
  while (true) {
    const position = stream.save();

    backtrack(stream, separator); // optional: consume if present, no-op otherwise

    const next = backtrack(stream, item);

    if (next === undefined) {
      stream.restore(position);
      break;
    }

    if (stream.save() === position) {
      throw new Error('sepByLoose(): parser consumed no input.');
    }

    results.push(next);
  }

  return results;
}

// @cosmonaut/parsers/transform.js
// Result shaping. None of these touch the stream position themselves -
// they only run an inner block and reshape whatever came back.
//import { decorate } from './_internal.js';

export const

capture = (parser, name) => decorate (stream => {
  const result = parser(stream);
  return result === undefined ? undefined : { [name]: result };
}),

filter = (parser, predicate) => decorate (stream => {
  const result = parser(stream);
  return result === undefined ? undefined : predicate(result, stream) ? result : undefined;
}),

map = (parser, fn) => decorate (stream => {
  const result = parser(stream);
  return result === undefined ? undefined : fn(result, stream);
}),

tap = (parser, fn) => decorate (stream => {
  const result = parser(stream);
  if (result !== undefined) fn(result, stream);
  return result;
}),

value = (parser, value) => decorate (stream => {
  const result = parser(stream);
  return result === undefined ? undefined : value;
});



/*
function undefOr (sth, returnOnDef, returnOnUndef, callbackOnDef, callbackOnUndef) {
  const isDef = (sth !== undefined);

  if (isDef) { 
    if (callbackOnDef) callbackOnDef();
    return returnOnDef;
  }

  if (!isDef) {
    if (callbackOnUndef) callbackOnUndef();
    return returnOnUndef;
  }
}
*/
