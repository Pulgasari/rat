// @ratscript/runtime/range.js

function* range (from, to, step = 1) {
  while(from < to) yield from++
}


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
