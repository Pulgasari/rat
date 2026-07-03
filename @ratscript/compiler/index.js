// @ratscript/compiler

import transform__cond              from './syntax/cond.js';
import transform__guard             from './syntax/guard.js';
import transform__match             from './syntax/match.js';
import transform__multiline_strings from './syntax/multiline_strings.js';
import transform__named_arguments   from './syntax/named_arguments.js';
import transform__signals           from './syntax/signals.js';

let _sig = str => '__' + str;

export function compile (code) {
  //
  let jsOutput = `import { Signal, SignalBool, Effect } from './reactivity.js';\n`
               + `import { linkStylesheet } from './dom.js';\n\n`
               + `import { createCond, condMap } from './cond.js';\n\n`;

  //
  coye = transform__multiline_strings (code);
  code = transform__cond              (code);
  code = transform__named_arguments   (code);
  code = transform__match             (code);
  code = transform__guard             (code);
  code = transform__signals           (code);

  //
  jsOutput += code;
  return jsOutput;
};
