// @rat/types

export {
  Bool, Num, Str,
  Schema, isSchema,
} from './schema.js';

// Basic DataTypes + their reactive variant
export { Enum,   $Enum }   from './Enum.js';
export { List,   $List }   from './List.js';
export { Record, $Record } from './Record.js';
export { Tuple,  $Tuple }  from './Tuple.js';
export { Union }           from './Union.js';

// Additional DataTypes + their reactive variant
export { Color, $Color }   from './Color.js';

// otherd
export { $Map, $Set } from './reactive.js';
export { choice }  from './choice.js';

// Quatsch
export { Id, Ref } from './id.js';
