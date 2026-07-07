// @ratscript/runtime/range.js

function* range (from, to, step = 1) {
  while(from < to) yield from++
}

function* range (from, to, value) {
  while (from < to) {
    yield value ? value(from) : from;
    from++;
  }
}

[...range(64, 75, String.fromCharCode)] // ['@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

function* range(from, to) {
  while(from < to) yield from++
}

// Set increment/decrement
function* range(from, to) {
  const step = from <= to ? 1 : -1;
  while(from < to) {
    yield from;
    from += step;
  }
}

// Flip values
function* range(from, to) {
  if (from > to) [from, to] = [to, from];
  while(from < to) yield from++
}



const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );

console.log(arrayRange(1, 5, 1)); // [1,2,3,4,5]
