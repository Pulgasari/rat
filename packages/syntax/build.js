// @rat/syntax :: build
//
// writes everything that cannot be derived at runtime. hljs, monaco and
// codemirror read spec.js directly and need none of this.
//
//   node build.js            zed, check, textmate, acode
//   node build.js zed check  only the given steps
//   node build.js zed-rev    writes the current commit into zed/extension.toml
//
//   zed/grammars/vocabulary.json        words + operators for tree-sitter
//   zed/grammars/{rat,ratjs}/src/       generated parsers (tree-sitter generate)
//   textmate/*.tmLanguage.json          textmate grammars
//   acode/dist/main.js + rat-syntax.zip the acode plugin, ready to install
//
// check parses every .rat / .rat.js in ../../demos/examples with the generated
// grammars and runs the zed queries over them. a query with a node name the
// grammar does not have fails here, not silently in the editor.

import { execFileSync, spawnSync }                           from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join }                               from 'node:path';
import { fileURLToPath }                               from 'node:url';

import { files, operators, pipe, words } from './spec.js';
import { textmate }                      from './targets/textmate.js';

const ROOT  = dirname(fileURLToPath(import.meta.url));
const BIN   = join(ROOT, 'node_modules', '.bin');
const steps = process.argv.slice(2);
const STEPS = ['zed', 'check', 'textmate', 'acode'];
const run   = step => steps.length ? steps.includes(step) : STEPS.includes(step);

const write = (path, content) => {
  mkdirSync(dirname(join(ROOT, path)), { recursive: true });
  writeFileSync(join(ROOT, path), content);
  console.log(`[rat/syntax] wrote ${path}`);
};

const json = value => JSON.stringify(value, null, 2) + '\n';

// ::: zed

if (run('zed')) {
  // tree-sitter literals: every word must still look like a word, an operator must not be the pipe
  write('zed/grammars/vocabulary.json', json({
    constants : words.constants,
    control   : words.control,
    keywords  : words.keywords,
    language  : words.language,
    operators : operators.filter(operator => operator !== pipe),
    pipe,
    storage   : words.storage,
  }));

  for (const grammar of ['rat', 'ratjs']) {
    // abi 14 is read by every zed release since 2024
    execFileSync(join(BIN, 'tree-sitter'), ['generate', '--abi', '14'], { cwd: join(ROOT, 'zed/grammars', grammar), stdio: 'inherit' });
    console.log(`[rat/syntax] generated zed/grammars/${grammar}/src`);
  }
}

// ::: check

if (run('check')) {
  const examples = join(ROOT, '../../demos/examples');
  const grammars = { rat: '.rat', ratjs: '.rat.js' };

  for (const [grammar, suffix] of Object.entries(grammars)) {
    const sources = readdirSync(examples).filter(file => file.endsWith(suffix) && (grammar === 'ratjs' || !file.endsWith('.rat.js')));
    const cwd     = join(ROOT, 'zed/grammars', grammar);

    for (const file of sources) {
      // a parse error is a warning (the grammar recovers), a broken query is fatal
      const parsed = treeSitter(['parse', '--quiet', join(examples, file)], cwd);
      if (parsed.status) console.warn(`[rat/syntax] ${grammar}: ${file} parses with errors\n${parsed.output}`);

      for (const query of ['highlights', 'brackets', 'injections']) {
        const result = treeSitter(['query', '--quiet', join(ROOT, 'zed/languages', grammar, `${query}.scm`), join(examples, file)], cwd);
        if (result.status) throw new Error(`[rat/syntax] zed/languages/${grammar}/${query}.scm is broken\n${result.output}`);
      }
    }
    console.log(`[rat/syntax] checked ${grammar}: ${sources.length} files, queries valid`);
  }

  await checkRegexTargets(examples);
}

// ::: zed-rev

if (run('zed-rev')) {
  const rev  = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim();
  const path = join(ROOT, 'zed/extension.toml');
  writeFileSync(path, readFileSync(path, 'utf8').replace(/^rev(\s*)= ".*"$/gm, `rev$1= "${rev}"`));
  console.log(`[rat/syntax] zed/extension.toml now points at ${rev}`);
}

// ::: textmate

if (run('textmate')) {
  for (const language of Object.keys(files)) write(`textmate/${language}.tmLanguage.json`, json(textmate(language)));
}

// ::: acode

if (run('acode')) {
  execFileSync(join(BIN, 'esbuild'), ['acode/main.src.js', '--bundle', '--format=iife', '--target=es2022', '--outfile=acode/dist/main.js', '--log-level=warning'], { cwd: ROOT, stdio: 'inherit' });
  console.log('[rat/syntax] wrote acode/dist/main.js');

  const manifest = readFileSync(join(ROOT, 'acode/plugin.json'));
  const entries  = [
    ['plugin.json', manifest],
    ['main.js',     readFileSync(join(ROOT, 'acode/dist/main.js'))],
    ['readme.md',   readFileSync(join(ROOT, 'acode/readme.md'))],
  ];
  write('acode/dist/rat-syntax.zip', zip(entries));
}

// ::: regex targets

/*
every spec regex compiles in js (monaco and codemirror use js regex), hljs
highlights every example without throwing, and the codemirror interpreter
walks every line of every example to its end.
*/
async function checkRegexTargets (examples) {
  const { default: hljs }   = await import('highlight.js');
  const { register }        = await import('./targets/hljs.js');
  const { monarch }         = await import('./targets/monaco.js');
  const { parser }          = await import('./targets/codemirror.js');

  register(hljs);

  for (const [language, { extensions }] of Object.entries(files)) {
    monarch(language);

    const sources = readdirSync(examples).filter(file => file.endsWith(`.${extensions[0]}`) && (language === 'ratjs' || !file.endsWith('.rat.js')));

    for (const file of sources) {
      const code = readFileSync(join(examples, file), 'utf8');

      const result = hljs.highlight(code, { ignoreIllegals: false, language });
      if (result.illegal) throw new Error(`[rat/syntax] hljs: ${file} hits an illegal match`);

      const stream = parser(language);
      const state  = stream.startState();
      for (const line of code.split('\n')) {
        const cursor = { pos: 0, string: line, next () { return this.string[this.pos++]; }, sol () { return this.pos === 0; } };
        let guard = line.length + 1;
        while (cursor.pos < line.length) {
          const before = cursor.pos;
          stream.token(cursor, state);
          if (cursor.pos <= before && !state.queue.length && --guard < 0) throw new Error(`[rat/syntax] codemirror: no progress in ${file}: ${line}`);
        }
      }
    }
    console.log(`[rat/syntax] checked ${language}: hljs, monarch, codemirror on ${sources.length} files`);
  }
}

// ::: tree-sitter

// the cli warns about a missing parser directory config on every call, which says nothing here
function treeSitter (args, cwd) {
  const { status, stderr, stdout } = spawnSync(join(BIN, 'tree-sitter'), args, { cwd, encoding: 'utf8' });
  const output = `${stdout}${stderr}`.split('\n')
    .filter(line => !/parser directories|init-config|configuration file to indicate|language grammars\./.test(line))
    .join('\n').trim();
  return { output, status };
}

// ::: zip

/*
a stored (uncompressed) zip: local headers, data, central directory, end record.
enough for a plugin of three small files and no dependency for it.
*/
function zip (entries) {
  const table = crc32Table();
  const crc32 = data => { let crc = -1; for (const byte of data) crc = (crc >>> 8) ^ table[(crc ^ byte) & 0xff]; return (crc ^ -1) >>> 0; };

  const locals  = [];
  const centrals = [];
  let offset    = 0;

  for (const [name, content] of entries) {
    const data     = Buffer.from(content);
    const filename = Buffer.from(name);
    const crc      = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(filename.length, 26);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(filename.length, 28);
    central.writeUInt32LE(offset, 42);

    locals.push(local, filename, data);
    centrals.push(central, filename);
    offset += local.length + filename.length + data.length;
  }

  const directory = Buffer.concat(centrals);
  const end       = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(offset, 16);

  return Buffer.concat([...locals, directory, end]);
}

function crc32Table () {
  const table = new Int32Array(256);
  for (let index = 0; index < 256; index++) {
    let value = index;
    for (let bit = 0; bit < 8; bit++) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    table[index] = value;
  }
  return table;
}
