// @rat/types

export {
  Bool, Num,
  Schema, isSchema,
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
export { Table,  $Table  } from './Table.js';
export {         $Set    } from './Set.js';
export { Tuple           } from './Tuple.js';
export { Union           } from './Union.js';

// Additional DataTypes + their reactive variant
export { Color, $Color }   from './Color.js';

// match
export { NONE, any, either, is, match, part, pass, pattern, rest, which } from './match.js';

// Quatsch
export { Id, Ref } from './id.js';
