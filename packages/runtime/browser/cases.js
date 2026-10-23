// @rat/runtime :: cases

/*
a @match block. a branch is built once and kept while its case keeps
matching; it gets the parts as a getter, so the compiler can make every part a
computed and the branch follows a new value of the same case.
*/

import { match }    from '@htx/js/render';
import { which }    from '@rat/types';
import { computed } from '../common/shared.js';

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
