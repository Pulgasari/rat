// @ratscript/compiler

import transform__alias              from './syntax/alias.js';
import transform__assignment_sugar   from './syntax/assignment_sugar.js';
import transform__cond               from './syntax/cond.js';
import transform__guard              from './syntax/guard.js';
import transform__fn                 from './syntax/fn.js';
import transform__for                from './syntax/for.js';
import transform__import_statement   from './syntax/import_statement.js';
import transform__inc                from './syntax/inc.js';
import transform__is                 from './syntax/is.js';
import transform__jsx                from './syntax/jsx.js';
import transform__match              from './syntax/match.js';
import transform__multiline_strings  from './syntax/multiline_strings.js';
import transform__pipe_operator      from './syntax/pipe_operator.js';
import transform__prototype_accessor from './syntax/prototype_accessor.js';
import transform__range              from './syntax/range.js';
import transform__signals            from './syntax/signals.js';
import transform__switch             from './syntax/switch.js';
import transform__try_catch          from './syntax/try_catch.js';
import transform__types              from './syntax/types.js';

export function compile (code) {
  
  // transformations
  code = transform__import_statement   (code);
  code = transform__fn                 (code);
  code = transform__range              (code);
  code = transform__for                (code);
  code = transform__try_catch          (code);
  code = transform__multiline_strings  (code);
  code = transform__jsx                (code);
  code = transform__alias              (code); // alias, as
  code = transform__prototype_accessor (code);
  code = transform__pipe_operator      (code);
  code = transform__is                 (code);
  code = transform__cond               (code);
  code = transform__types              (code); // enum, struct, #(...), #[...]
  code = transform__switch             (code);
  code = transform__match              (code);
  code = transform__guard              (code);
  code = transform__inc                (code);
  code = transform__assignment_sugar   (code);
  code = transform__signals            (code);

  // return final code (incl. imports)
  return `import { Signal, SignalBool, Effect } from './reactivity.js';\n`
       + `import { createCond, condMap } from './cond.js';\n\n`
       + `import * from 'ratscript';\n\n`
       + code;
};

export default compile;
