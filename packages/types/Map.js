// @rat/types :: $Map

/*
$Map: a js Map whose reads subscribe and whose writes notify. registered for Map, so
`let $x = new Map` in a .rat script is a signal holding a $Map.
*/

import { reactive, register } from '@rat/signals';

// ::: $Map

const $Map = reactive(Map, {
  reads  : ['get', 'has', 'size', 'keys', 'values', 'entries', 'forEach', Symbol.iterator],
  writes : {
    clear  : map => map.size > 0,
    delete : (map, key) => map.has(key),
    set    : (map, key, value) => !map.has(key) || !Object.is(map.get(key), value),
  },
});

register(Map, $Map);

// :::::: EXPORT

export { $Map };
