// cli/commands.js
// what the prompt knows. the commands that need real work go to the worker, the
// rest run here, over the origin's private file system (@rat/bunker, Files on opfs)

import { signal } from '@rat/signals';

import { createFiles } from '@rat/bunker';

export const VERSION = 'v0.2.0';

// the commands the prompt knows, the wasm tools join with `init`
export const loaded = signal(new Set(['clear', 'download', 'help', 'init', 'ls', 'rm', 'upload']));

const files = createFiles({ driver: 'opfs' });

const red   = text => `\x1b[31m${text}\x1b[0m`;
const green = text => `\x1b[32m${text}\x1b[0m`;

const HELP = [
  'Available commands:',
  '  ls           - List files in virtual filesystem (OPFS)',
  '  upload       - Open file dialog to upload file into OPFS',
  '  download <f> - Download file from OPFS to host system',
  '  rm <f>       - Delete file from OPFS',
  '  init <tool>  - Register WASM executable tool',
  '  clear        - Clear terminal screen',
];

// one line of input. done() writes the next prompt
export async function run (input, { done, term, worker }) {
  const [command, ...args] = input.split(/\s+/);
  const needs = usage => { if (args[0]) return false; term.writeln(red(`Error: ${usage}`)); done(); return true; };

  switch (command) {
    case 'help':
      HELP.forEach(line => term.writeln(line));
      return done();

    case 'clear':
      term.clear();
      return done();

    case 'ls':
      try {
        const entries = await files.list();
        if (!entries.length) term.writeln('VFS is empty.');
        for (const entry of entries) term.writeln(`${entry.name.padEnd(25)}${(await entry.info())?.size ?? 0} bytes`);
      }
      catch (error) { term.writeln(red(`Error accessing VFS: ${error.message}`)); }
      return done();

    case 'upload':
      return upload(term, done);

    case 'download':
      if (needs('Filename required. Usage: download <filename>')) return;
      await download(args[0], term);
      return done();

    case 'rm':
      if (needs('Filename required. Usage: rm <filename>')) return;
      try   { await files.remove(args[0]); term.writeln(`Removed file: ${args[0]}`); }
      catch (error) { term.writeln(red(`Error removing file: ${error.message}`)); }
      return done();

    case 'init':
      if (needs('Tool name required. Usage: init <tool>')) return;
      loaded.value = new Set([...loaded.value, args[0]]);
      term.writeln(green(`Registered WASM executable: ${args[0]}`));
      return done();

    default:
      if (loaded.value.has(command)) return worker.postMessage({ payload: { args, cmd: command }, type: 'RUN_COMMAND' });
      term.writeln(red(`Command not found: ${command}. Type "help" for instructions.`));
      return done();
  }
}

function upload (term, done) {
  const input = Object.assign(document.createElement('input'), { type: 'file' });

  input.onchange = async event => {
    const file = event.target.files[0];
    if (file) {
      term.writeln(`Uploading ${file.name} to VFS...`);
      await files.write(file.name, file);
      term.writeln(green(`Successfully saved ${file.name} to OPFS.`));
    }
    else term.writeln('Upload canceled.');
    done();
  };
  input.oncancel = () => { term.writeln('Upload canceled.'); done(); };

  input.click();
}

async function download (name, term) {
  try {
    const href = URL.createObjectURL(await files.read(name, 'blob'));
    Object.assign(document.createElement('a'), { download: name, href }).click();
    URL.revokeObjectURL(href);
    term.writeln(`Triggered download for: ${name}`);
  }
  catch (error) { term.writeln(red(`Download failed: ${error.message}`)); }
}
