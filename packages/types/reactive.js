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

import { Color }            from './color.js';
import { Enum }             from './enum.js';
import { List }             from './list.js';
//import { GET, Record, SET } from './record.js';

// ::: $List

const LIST_READS = ['length', 'at', 'includes', 'indexOf', 'every', 'filter', 'find', 'findIndex', 'flatMap', 'forEach', 'join', 'map', 'reduce', 'slice', 'some', 'toArray', 'toJSON', Symbol.iterator];

const $List = reactive(List, {
  reads  : LIST_READS,
  writes : {
    clear   : list => list.length > 0,
    pop     : list => list.length > 0,
    push    : (list, ...items) => items.length > 0,
    remove  : (list, value) => list.includes(value),
    replace : true,
    reverse : list => list.length > 1,
    set     : (list, index, value) => !Object.is(list.at(index), value),
    shift   : list => list.length > 0,
    sort    : list => list.length > 1,
    splice  : true,
    unshift : (list, ...items) => items.length > 0,
  },
});

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

const $Enum = reactive(Enum, {
  reads  : ['value', 'is', 'toJSON', 'toString', 'valueOf'],
  writes : {
    cycle : enumeration => enumeration.values.length > 1,
    value : (enumeration, value) => !enumeration.is(value),
  },
});



// ::: $Color

const differs = name => (color, value) => !Object.is(color[name], value);

const $Color = reactive(Color, {
  reads  : ['r', 'g', 'b', 'a', 'h', 's', 'l', 'hex', 'equals', 'mix', 'toArray', 'toHsl', 'toJSON', 'toString'],
  writes : {
    a   : differs('a'),
    b   : differs('b'),
    g   : differs('g'),
    h   : differs('h'),
    hex : differs('hex'),
    l   : differs('l'),
    r   : differs('r'),
    s   : differs('s'),
    set : (color, input) => !color.equals(input),
  },
});

// ::: registry

register(Array,  $List);
register(Color,  $Color);
register(Enum,   $Enum);
register(List,   $List);
register(Map,    $Map);
register(Set,    $Set);

// :::::: EXPORT

export { $Color, $Enum, $List, $Map, $Set };
