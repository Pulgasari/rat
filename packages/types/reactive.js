// @rat/types :: reactive variants

/*
the reactive variants, made with reactive() from @rat/signals: 
$List, $Map, $Set, $Enum, $Record, $Color. 

they look like the originals, only their reads subscribe and their writes notify.
in plain js they are used directly:

  const $seen = new $Map;
  $seen.set(id, true);      // whatever read $seen updates

they are registered too, so $() and every `let $x = …` in a .rat script pick them:

  let $todos = [];          // a signal holding a $List
  $todos.push(todo);        // reactive: whatever read $todos updates

  let $seen  = new Map;     // a signal holding a $Map
  $seen.set(id, true);

  const $view = new $Enum ('grid', 'list', 'masonry');
  $view.cycle();            // whatever read $view.value updates

  const $accent = new $Color ('#ff8800');
  $accent.l = 70;           // whatever read $accent.hex, .r … updates
*/

import { reactive, register } from '@rat/signals';

//import { Color }            from './color.js';
//import { Enum }             from './enum.js';
//import { List }             from './list.js';
//import { GET, Record, SET } from './record.js';

// ::: Map, Set

const $Map = reactive(Map, {
  reads  : ['get', 'has', 'size', 'keys', 'values', 'entries', 'forEach', Symbol.iterator],
  writes : {
    clear  : map => map.size > 0,
    delete : (map, key) => map.has(key),
    set    : (map, key, value) => !map.has(key) || !Object.is(map.get(key), value),
  },
});

const $Set = reactive(Set, {
  reads  : ['has', 'size', 'keys', 'values', 'entries', 'forEach', Symbol.iterator],
  writes : {
    add    : (set, value) => !set.has(value),
    clear  : set => set.size > 0,
    delete : (set, value) => set.has(value),
  },
});

// ::: $Enum



// ::: registry

register(Array,  $List);
register(Map,    $Map);
register(Set,    $Set);

// :::::: EXPORT

export { $Map, $Set };
