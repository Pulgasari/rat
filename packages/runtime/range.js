// @rat/runtime :: range

// a..b, inclusive. numbers count up or down by one, single characters by code point
function range (from, to) {
  if (typeof from === 'string' && typeof to === 'string') {
    return range(from.codePointAt(0), to.codePointAt(0)).map(code => String.fromCodePoint(code));
  }

  const out  = [];
  const step = from <= to ? 1 : -1;
  for (let value = from; step > 0 ? value <= to : value >= to; value += step) out.push(value);
  return out;
}

export { range };
