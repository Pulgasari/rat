// @ratscript/compiler

import transform__cond               from './syntax/cond.js';
import transform__guard              from './syntax/guard.js';
import transform__import_statement   from './syntax/import_statement.js';
import transform__jsx                from './syntax/jsx.js';
import transform__match              from './syntax/match.js';
import transform__multiline_strings  from './syntax/multiline_strings.js';
import transform__named_arguments    from './syntax/named_arguments.js';
import transform__pipe_operator      from './syntax/pipe_operator.js';
import transform__prototype_accessor from './syntax/prototype_accessor.js';
import transform__signals            from './syntax/signals.js';
import transform__switch             from './syntax/switch.js';

let _sig = str => '__' + str;

export function compile (code) {
  //
  let jsOutput = `import { Signal, SignalBool, Effect } from './reactivity.js';\n`
               + `import { linkStylesheet } from './dom.js';\n\n`
               + `import { createCond, condMap } from './cond.js';\n\n`;

  //
  code = transform__import_statement   (code);
  code = transform__multiline_strings  (code);
  code = transform__jsx                (code);
  code = transform__prototype_accessor (code);
  code = transform__pipe_operator      (code);
  code = transform__cond               (code);
  code = transform__named_arguments    (code);
  code = transform__switch             (code);
  code = transform__match              (code);
  code = transform__guard              (code);
  code = transform__signals            (code);

  //
  jsOutput += code;
  return jsOutput;
};
