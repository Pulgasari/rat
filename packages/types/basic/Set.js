// @rat/types :: $Set

// :::::: IMPORT

import { reactive, register } from '@rat/signals';

// :::::: $Set

const $Set = reactive(Set);

register(Set, $Set);

// :::::: EXPORT

export { $Set };
