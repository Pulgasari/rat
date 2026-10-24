// @rat/dev :: unplugin

/*
rat in a build: one plugin for vite, rollup, rolldown, esbuild and webpack.

  import rat from '@rat/dev';
  export default { plugins: [rat.vite()] };   // vite.config.js

  .rat, .rat.html, .rat.js   compiled to es modules (compileAsync: style languages, style inline)
  bare specifiers            resolved through importmap.json of @rat/app, the map run.js writes into
                             the page. an https entry stays external

options: importmap (a path, an { imports } object, or false), the rest goes to the compiler.
*/

import { readFile }         from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath }    from 'node:url';
import { createUnplugin }   from 'unplugin';
import { compileAsync }     from '../compiler/index.js';

const IMPORTMAP = fileURLToPath(new URL('../app/run/importmap.json', import.meta.url));
const RAT       = /\.rat(\.html|\.js)?$/;

const fileOf = id => id.split('?')[0];

// { imports } -> [specifier, file path or url], the paths relative to the map's file
async function readMap (importmap) {
  if (!importmap) return [];
  const base    = typeof importmap === 'string' ? dirname(resolve(importmap)) : process.cwd();
  const { imports = {} } = typeof importmap === 'string' ? JSON.parse(await readFile(importmap, 'utf8')) : importmap;
  return Object.entries(imports).map(([key, value]) => [key, /^[a-z]+:/.test(value) ? value : resolve(base, value)]);
}

// the way the browser reads an import map: exact, then the longest prefix
function resolveMap (entries, specifier) {
  const exact = entries.find(([key]) => key === specifier);
  if (exact) return exact[1];
  const prefix = entries.filter(([key]) => key.endsWith('/') && specifier.startsWith(key)).sort((a, b) => b[0].length - a[0].length)[0];
  return prefix ? prefix[1] + specifier.slice(prefix[0].length) : null;
}

const unplugin = createUnplugin(({ importmap = IMPORTMAP, ...options } = {}) => {
  let entries;

  return {
    name    : 'rat',
    enforce : 'pre',

    async resolveId (id) {
      entries ??= readMap(importmap);
      const target = resolveMap(await entries, id);
      if (!target) return null;
      return /^https?:/.test(target) ? { external: true, id: target } : target;
    },

    transformInclude: id => RAT.test(fileOf(id)),

    async transform (source, id) {
      const file = fileOf(id);
      const read = path => readFile(resolve(dirname(file), path), 'utf8');
      const { code } = await compileAsync(source, { ...options, filename: file, read });
      return { code };
    },
  };
});

// :::::: EXPORT

export const { esbuild, rolldown, rollup, vite, webpack } = unplugin;
export { unplugin };
export default unplugin;
