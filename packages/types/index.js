// @rat/types

export {
  Bool, Num, Str,
  Schema, isSchema,
} from './schema.js';

// Basic DataTypes + their reactive variant
export { Enum,   $Enum   } from './Enum.js';
export { List,   $List   } from './List.js';
export {         $Map    } from './Map.js';
export { Record, $Record } from './Record.js';
export {         $Set    } from './Set.js';
export { Tuple           } from './Tuple.js';
export { Union           } from './Union.js';

// Additional DataTypes + their reactive variant
export { Color, $Color }   from './Color.js';

// match
export { NONE, any, either, is, match, part, pass, pattern, rest, which } from './match.js';

// Quatsch
export { Id, Ref } from './id.js';
