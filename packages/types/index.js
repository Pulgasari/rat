// @rat/types

export { ArraySchema, Schema, bare, schemaOf } from './schema.js';
export { isSchema }               from './_shared.js';

// every array: where, exclude, first, has, all, pluck, keyBy, groupBy, uniqueBy, search, sortBy, toSortedBy,
// swap, purge, remove, replace, clear, toggle. by() is the comparator of sortBy
export { by } from './basic/Array.js';

// Basic DataTypes + their reactive variant
export { $Array, $Map, $Set } from './basic/builtins.js';
export { Bool,   $Bool   } from './basic/Bool.js';
export { Dict,   $Dict   } from './basic/Dict.js';
export { Enum,   $Enum   } from './basic/Enum.js';
export { Fn              } from './basic/Fn.js';
export { Num,    $Num    } from './basic/Num.js';
export { Record, $Record } from './basic/Record.js';
export { Segments        } from './basic/Segments.js';
export { Str,    $Str    } from './basic/Str.js';
export { Table,  $Table  } from './basic/Table.js';
export { Tuple           } from './basic/Tuple.js';
export { Union           } from './basic/Union.js';

// Additional DataTypes + their reactive variant
export { Color, $Color }   from './special/Color.js';

// kept beyond the page
export { stored } from '@rat/signals';

// match
export { NONE, any, either, is, match, part, pass, pattern, rest, which } from './match.js';

// Quatsch
export { Id, Ref } from './id.js';

// String Cases
export {
  CamelCase,
  ConstantCase, 
  KebabCase, 
  LowerCase, 
  MockingCase, 
  PascalCase, 
  SnakeCase, 
  TitleCase, 
  UpperCase,
} from './basic/Str.js';
