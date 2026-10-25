// @rat/cli :: create

import { existsSync } from 'node:fs';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';

import { ask, color, error, multiselect, print, success } from '../wizard.js';

export const options = {
  mods : { type: 'string' },
  yes  : { short: 'y', type: 'boolean' },
};

const CDN  = 'https://code.pulgasari.dev/rat/packages/app/run/run.js';
const MODS = ['database', 'files', 'folders', 'hotkeys', 'offline', 'store', 'thumbnails'];

const MOD = {
  database   : "{ schema: {} }",
  files      : 'true',
  folders    : "{ accept: '' }",
  hotkeys    : "{ 'escape': 'rat:toggle[config]' }",
  offline    : 'true',
  store      : "{ driver: 'local' }",
  thumbnails : 'true',
};

// run.js of the rat repo the app is created in, relative to it, else from the cdn
function runOf (dir) {
  for (let folder = dir; folder !== dirname(folder); folder = dirname(folder)) {
    const run = join(folder, 'packages/app/run/run.js');
    if (existsSync(run)) return relative(dir, run).split(sep).join('/');
  }
  return CDN;
}

const indexHtml = (name, run) => `<!DOCTYPE html>
<html lang='en'>

<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0' />
  <title>${name}</title>
  <link rel='stylesheet' href='app.css'>
  <link rel='manifest' href='manifest.json'>
  <script src='${run}'></script>
</head>

<body>
  <rat-app src='app.rat.html' routing='hash'></rat-app>
</body>

</html>
`;

const appRat = name => `<script>
  let $count = 0;
</script>

<rat-area name='main'>
  <main>
    <h1>${name}</h1>
    <button onclick={() => $count++}>clicked {$count} times</button>
  </main>
</rat-area>
`;

function configRat (name, mods) {
  const imports = mods.includes('folders') ? "import { FOLDERS } from '@rat/app/modules/folders.js';\n\n" : '';
  const width   = Math.max(...mods.map(mod => mod.length));
  const entries = mods.map(mod => `    ${mod.padEnd(width)} : ${mod === 'database' && mods.includes('folders') ? '{ schema: { folders: FOLDERS } }' : MOD[mod]},`);
  return `${imports}export default {
  name : '${name}',${mods.length ? `\n\n  mods : {\n${entries.join('\n')}\n  },` : ''}
};
`;
}

const manifest = name => JSON.stringify({ display: 'standalone', icons: [], id: name, name, scope: './', short_name: name, start_url: './' }, null, 2) + '\n';

const appCss = `main {
  margin  : 0 auto;
  max-inline-size: 40rem;
  padding : 2rem 1rem;
}
`;

const sw = run => `importScripts('${run.replace(/run\.js$/, 'sw.js')}');\n`;

export async function run ([given], { mods: modsFlag, yes }) {
  const name = given ?? (yes ? 'app' : await ask('name of the app:', 'app'));
  const dir  = resolve(name);
  if (existsSync(dir) && (await readdir(dir)).length) return error(`${dir} is not empty`);

  let mods = modsFlag ? modsFlag.split(',').map(mod => mod.trim()).filter(mod => MODS.includes(mod)) : yes ? [] : await multiselect('mods:', MODS);
  if (mods.includes('folders') && !mods.includes('database')) mods = ['database', ...mods];

  const run   = runOf(dir);
  const files = {
    'app.css'        : appCss,
    'app.rat.html'   : appRat(name),
    'config.rat.js'  : configRat(name, mods),
    'index.html'     : indexHtml(name, run),
    'manifest.json'  : manifest(name),
    ...mods.includes('offline') ? { 'sw.js': sw(run) } : {},
  };

  await mkdir(dir, { recursive: true });
  for (const [file, content] of Object.entries(files)) await writeFile(join(dir, file), content);

  success(`created ${relative('.', dir) || '.'}`);
  print(color.gray(Object.keys(files).join(', ')));
  print(`\n  rat dev ${relative('.', dir) || '.'}`);
}
