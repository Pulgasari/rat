// @rat/types :: $Map

/*
$Map: a js Map whose reads subscribe and whose writes notify. registered for Map, so
`let $x = new Map` in a .rat script is a signal holding a $Map.
*/

import { reactive, register } from '@rat/signals';

// ::: $Map

const $Map = reactive(Map);

register(Map, $Map);

// :::::: EXPORT

export { $Map };
