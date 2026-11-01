// @rat/types

export { Schema, bare, isSchema, schemaOf } from './schema.js';

// Basic DataTypes + their reactive variant
export {         $Array  } from './basic/Array.js';
export { Bool,   $Bool   } from './basic/Bool.js';
export { Dict,   $Dict   } from './basic/Dict.js';
export { Enum,   $Enum   } from './basic/Enum.js';
export { Fn              } from './basic/Fn.js';
export { List,   $List   } from './basic/List.js';
export {         $Map    } from './basic/Map.js';
export { Num,    $Num    } from './basic/Num.js';
export { Record, $Record } from './basic/Record.js';
export { Segments        } from './basic/Segments.js';
export { Str,    $Str    } from './basic/Str.js';
export { Table,  $Table  } from './basic/Table.js';
export {         $Set    } from './basic/Set.js';
export { Tuple           } from './basic/Tuple.js';
export { Union           } from './basic/Union.js';

// Additional DataTypes + their reactive variant
export { Color, $Color }   from './special/Color.js';

// kept beyond the page
export { stored } from './stored.js';

// match
export { NONE, any, either, is, match, part, pass, pattern, rest, which } from './match.js';

// the query vocabulary of a list, data last: rows |> where({ album }) |> toSortedBy('track')
export { by, has, keyBy, one, pluck, sortBy, toSortedBy, where, without } from './query.js';

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
} from './Str.js';
