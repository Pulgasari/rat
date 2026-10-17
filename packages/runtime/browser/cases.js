// @rat/runtime :: cases

/*
a @switch with patterns. a branch is built once and kept while its case keeps
matching; it gets the parts as a getter, so the compiler can make every part a
computed and the branch follows a new value of the same case.
*/

import { match }            from './dom.js';
import { computed }         from '../common/shared.js';
import { which }            from '../common/patterns.js';

function cases (subject, tests, views, otherwise = null) {
  const found = computed(() => which(subject(), tests));
  return match(
    () => found.value.index,
    views.map((view, index) => [index, () => view(() => found.value.parts ?? {})]),
    otherwise,
  );
}

// :::::: EXPORT

export { cases };
