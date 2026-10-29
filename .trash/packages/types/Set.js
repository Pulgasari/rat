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

// ::: registry

register(Set, $Set);

// :::::: EXPORT

export { $Set };
