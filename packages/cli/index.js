#!/usr/bin/env node
// @rat/cli

import { argv } from 'node:process';
import { parseArgs } from 'node:util';

import { close, color, error, print } from './wizard.js';

const COMMANDS = {
  build   : () => import('./commands/build.js'),
  check   : () => import('./commands/check.js'),
  compile : () => import('./commands/compile.js'),
  create  : () => import('./commands/create.js'),
  dev     : () => import('./commands/dev.js'),
};

const HELP = `${color.green('rat')} <command> …

  create [name]       a new app from a few questions   --mods database,offline  --yes
  dev [dir]           serves dir without a build: .rat compiled here, reload on save   --port 8080  --root
  build [dir]         builds the app in dir: vite + @rat/dev, the build of its config.rat.js   --target web|android|ios|desktop
  compile <files>     .rat, .rat.html, .rat.js -> .js next to them   -o dir  --stdout  --watch
  check [files]       compiles without writing: errors with file:line:column, exit code 1`;

const [name, ...rest] = argv.slice(2);

if (!COMMANDS[name]) {
  if (name && !['-h', '--help', 'help'].includes(name)) error(`no command "${name}"\n`);
  print(HELP);
}
else {
  const command = await COMMANDS[name]();
  try {
    const { positionals, values } = parseArgs({ args: rest, allowPositionals: true, options: command.options });
    await command.run(positionals, values);
  }
  catch (failure) {
    error(failure.message);
    process.exitCode = 1;
  }
  finally { close(); }
}
