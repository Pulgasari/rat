// @rat/types

export {
  Bool, Num,
  Schema, bare, isSchema, schemaOf,
} from './schema.js';

export {
  Str,
  CamelCase, ConstantCase, KebabCase, LowerCase, MockingCase, PascalCase, SnakeCase, TitleCase, UpperCase,
} from './Str.js';

export { Fn } from './Fn.js';

// Basic DataTypes + their reactive variant
export { $Bool, $Num, $Str } from './scalars.js';
export {         $Array  } from './Array.js';
export { Dict,   $Dict   } from './Dict.js';
export { Enum,   $Enum   } from './Enum.js';
export { List,   $List   } from './List.js';
export {         $Map    } from './Map.js';
export { Record, $Record } from './Record.js';
export { Segments        } from './Segments.js';
export { Table,  $Table  } from './Table.js';
export {         $Set    } from './Set.js';
export { Tuple           } from './Tuple.js';
export { Union           } from './Union.js';

// Additional DataTypes + their reactive variant
export { Color, $Color }   from './Color.js';

// kept beyond the page
export { stored } from './stored.js';

// match
export { NONE, any, either, is, match, part, pass, pattern, rest, which } from './match.js';

// the query vocabulary of a list, data last: rows |> where({ album }) |> toSortedBy('track')
export { by, has, keyBy, one, pluck, sortBy, toSortedBy, where, without } from './query.js';

// Quatsch
export { Id, Ref } from './id.js';
