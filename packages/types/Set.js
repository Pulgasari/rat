// @rat/types :: $Set

/*
$Set: a js Set whose reads subscribe and whose writes notify. registered for Set, so
`let $x = new Set` in a .rat script is a signal holding a $Set.
*/

import { reactive, register } from '@rat/signals';

// ::: $Set

const $Set = reactive(Set, {
  reads  : ['has', 'size', 'keys', 'values', 'entries', 'forEach', Symbol.iterator],
  writes : {
    add    : (set, value) => !set.has(value),
    clear  : set => set.size > 0,
    delete : (set, value) => set.has(value),
  },
});

register(Set, $Set);

// :::::: EXPORT

export { $Set };
