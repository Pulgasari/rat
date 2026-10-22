#!/usr/bin/env -S deno run -A
// @rat/cli

import { parseArgs } from '@std/cli/parse-args';
import  buildCommand from './commands/build.js';
import createCommand from './commands/create.js';
import    devCommand from './commands/dev.js';
import   helpCommand from './commands/help.js';

// Flags parsen (z. B. --target linux oder -t linux)
const flags = parseArgs(Deno.args, {
  string : ['target'],
  alias  : { target: 't' },
});

const cmd     = flags._[0];
const subArgs = flags._.slice(1).map(String); // captures everything after 'plugin'

     if (cmd ===  'build') await  buildCommand({ target: flags.target });
else if (cmd === 'create') await createCommand();
else if (cmd ===    'dev') await    devCommand();
else                       await   helpCommand();
