// @rat/cli :: compile

import { watch } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

import { RAT, compileFile, errorOf, filesOf, jsOf } from '../files.js';
import { color, error, print, warn } from '../wizard.js';

export const options = {
  out    : { short: 'o', type: 'string' },
  stdout : { type: 'boolean' },
  watch  : { short: 'w', type: 'boolean' },
};

async function compileTo (file, { out, stdout }) {
  try {
    const { code, unresolved } = await compileFile(file);
    if (unresolved.length) warn(`${file}: ${unresolved.join(', ')} not imported (autoImport finds them in the page only)`);
    if (stdout) return print(code);
    const target = out ? join(out, jsOf(relative('.', file))) : jsOf(file);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, code);
    print(`${color.gray(file)} -> ${target}`);
    return true;
  }
  catch (failure) {
    error(errorOf(failure, file));
    process.exitCode = 1;
  }
}

export async function run (inputs, flags) {
  if (!inputs.length) return error('rat compile <files or folders …> [-o dir] [--stdout] [--watch]');
  for (const file of await filesOf(inputs)) await compileTo(file, flags);
  if (!flags.watch) return;

  print(color.gray('watching …'));
  for (const input of inputs) {
    watch(input, { recursive: true }, (type, name) => {
      const file = name ? join(input, name) : input;
      if (RAT.test(file)) compileTo(file, flags);
    });
  }
}
