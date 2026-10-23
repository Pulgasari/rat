// @rat/runtime :: destructure

/*
let { $filter, size = 'm' } = this.props: a $name taken out of an object is a
signal. the compiler turns the pattern into { filter: $filter, size = 'm' } and
the source into signalsOf(source, { filter: null, size: () => ('m') }) for
{ $filter, $size = 'm' }:

  the property is a signal     that signal itself (bind:filter={$x}, lib.sources)
  anything else                a computed that follows it, read only (a prop as getter)

a default ($size = 'm') applies while the property is undefined (not to a signal). every other
name of the pattern reads the source as it is.
*/

import { computed, isSignal } from '@rat/signals';

function signalsOf (source, defaults) {
  const made = {};
  for (const key of Object.keys(defaults)) {
    const value    = source?.[key];
    const fallback = defaults[key];
    made[key] = isSignal(value) ? value : computed(() => source[key] === undefined && fallback ? fallback() : source[key]);
  }
  return new Proxy(source ?? {}, { get: (target, key) => Object.hasOwn(made, key) ? made[key] : target[key] });
}

// :::::: EXPORT

export { signalsOf };
