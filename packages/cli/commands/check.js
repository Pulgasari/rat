// @rat/cli :: check

import { compileFile, errorOf, filesOf } from '../files.js';
import { color, error, print, success } from '../wizard.js';

export const options = {};

export async function run (inputs) {
  const files  = await filesOf(inputs.length ? inputs : ['.']);
  let   failed = 0;

  for (const file of files) {
    try { await compileFile(file, { point: false }); }
    catch (failure) { failed++; error(errorOf(failure, file)); }
  }

  if (failed) {
    print(color.gray(`${failed} of ${files.length} files failed`));
    process.exitCode = 1;
  }
  else success(`${files.length} files compile`);
}
