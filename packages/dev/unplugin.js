// @rat/dev :: unplugin

/*
rat in a build: one plugin for vite, rollup, rolldown, esbuild and webpack.

  import rat from '@rat/dev';
  export default { plugins: [rat.vite()] };   // vite.config.js

  .rat, .rat.html, .rat.js   compiled to es modules (compileAsync: style languages, style inline)
  bare specifiers            resolved through an import map of the page (it wins, as in the browser),
                             then importmap.json of @rat/app, the map run.js writes into the page.
                             an https entry stays external
  class names (vite)         kept when minified (keepNames): elements take their tag from them
  build of config.rat.js     the build options of the app (vite's build), merged over the defaults
                             here. read from the file, not run: values only, no imports. a spread of a
                             relative default import (...config) is followed
  autoImport of it           a component a file uses without an import gets one, found the way the
                             loader finds it in the page
  index.html (vite)          the script of run.js becomes the entry of the build: it imports @rat/app
                             and config.rat.js and hands the config and the src of <rat-app> over
                             (app.run): the mods are there before the app's code runs

options: importmap (a path, an { imports } object, or false), the rest goes to the compiler.
*/

import { existsSync }                  from 'node:fs';
import { readFile }                    from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath }    from 'node:url';
import { parse }            from 'acorn';
import { createUnplugin }   from 'unplugin';
import { compileAsync }     from '@rat/compiler';

const ENTRY     = '\0rat:entry:';
const IMPORTMAP = fileURLToPath(new URL('../app/run/importmap.json', import.meta.url));
const RAT       = /\.rat(\.html|\.js)?$/;
const RUN       = /<script\b[^>]*\bsrc=(['"])[^'"]*\/run\/run\.js\1[^>]*><\/script>/;
const SRC       = /(<rat-app\b[^>]*?)\s+src=(['"])([^'"]+)\2/;

const fileOf = id => id.split('?')[0];

// the defaults of a build: relative urls, css as it is (gestalt: @function, if()), code as it is (import attributes stay), files as files
// (output-md tells markdown by its extension, a data: url has none)
const DEFAULTS = { assetsInlineLimit: 0, cssMinify: false, rollupOptions: { output: { importAttributesKey: 'with' } }, target: 'esnext' };

// a key of the default export of a config, without running the file (its imports are the page's):
// values only. a spread of a relative default import (...config) is followed, a later key wins
async function keyOfConfig (file, key) {
  const source = file && await readFile(file, 'utf8').catch(() => null);
  if (source == null) return undefined;
  const program = parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  const object  = program.body.find(node => node.type === 'ExportDefaultDeclaration')?.declaration;
  if (object?.type !== 'ObjectExpression') return undefined;

  const importOf = name => program.body.find(node => node.type === 'ImportDeclaration' && node.specifiers.some(spec => spec.type === 'ImportDefaultSpecifier' && spec.local.name === name))?.source.value;

  let value;
  for (const node of object.properties) {
    if (node.type === 'SpreadElement') {
      const from  = node.argument.type === 'Identifier' ? importOf(node.argument.name) : null;
      const inner = from?.startsWith('.') ? await keyOfConfig(resolve(dirname(file), from), key) : undefined;
      if (inner !== undefined) value = inner;
    }
    else if ((node.key?.name ?? node.key?.value) === key) value = new Function(`return (${source.slice(node.value.start, node.value.end)});`)();
  }
  return value;
}

// <rat-app src> of root/index.html -> the config.rat.js next to it (or config-src)
async function configOf (root) {
  const html = await readFile(resolve(root, 'index.html'), 'utf8').catch(() => '');
  const app  = html.match(/<rat-app\b[^>]*>/)?.[0] ?? '';
  const attr = name => app.match(new RegExp(`\\s${name}=(['"])([^'"]+)\\1`))?.[2];
  return attr('config-src') ? resolve(root, attr('config-src')) : attr('src') ? resolve(root, dirname(attr('src')), 'config.rat.js') : null;
}

// autoImport as the loader reads it: [{ dir, names }], relative to the config
function foldersOf (spec, config) {
  if (!spec) return [];
  const base = dirname(config);
  if (spec === true) return [{ dir: base, names: null }];
  return [spec].flat().flatMap(item => typeof item === 'string' ? [{ dir: resolve(base, item), names: null }] : Object.entries(item).map(([path, names]) => ({ dir: resolve(base, path), names })));
}

const EXTENSIONS = ['.rat.html', '.rat', '.rat.js'];

// the import lines of the components a file uses without importing them
function importsOf (names, file, folders) {
  return names.map(name => {
    for (const { dir, names: only } of folders) {
      if (only && !only.includes(name)) continue;
      const found = EXTENSIONS.map(extension => join(dir, name + extension)).find(existsSync);
      if (found) return `import ${name} from ${JSON.stringify('./' + relative(dirname(file), found).split('\\').join('/'))};`;
    }
    throw new Error(`[rat] ${file}: <${name}> is not imported and not found through autoImport`);
  }).join('\n');
}

async function replaceAsync (text, pattern, replace) {
  const parts = await Promise.all([...text.matchAll(pattern)].map(match => replace(...match)));
  let index = 0;
  return text.replace(pattern, () => parts[index++]);
}

// the entry of a page: the config and how to load the component, handed over to <rat-app>. the
// component is imported after the config: its modules may read the mods (RAT.app.database) at once
const entryOf = (src, config) => [
  `import '@rat/app';`,
  config ? `import config from ${JSON.stringify(config)};` : 'const config = {};',
  `document.querySelector('rat-app').run(() => import(${JSON.stringify(src)}), config);`,
].join('\n');

// { imports } -> [specifier, file path or url], the paths relative to the map's file
async function readMap (importmap) {
  if (!importmap) return [];
  const base    = typeof importmap === 'string' ? dirname(resolve(importmap)) : importmap.base ?? process.cwd();
  const { imports = {} } = typeof importmap === 'string' ? JSON.parse(await readFile(importmap, 'utf8')) : importmap;
  const pathOf = value => resolve(base, value) + (value.endsWith('/') ? '/' : '');
  return Object.entries(imports).map(([key, value]) => [key, /^[a-z]+:/.test(value) ? value : pathOf(value)]);
}

// the way the browser reads an import map: exact, then the longest prefix
function resolveMap (entries, specifier) {
  const exact = entries.find(([key]) => key === specifier);
  if (exact) return exact[1];
  const prefix = entries.filter(([key]) => key.endsWith('/') && specifier.startsWith(key)).sort((a, b) => b[0].length - a[0].length)[0];
  return prefix ? prefix[1] + specifier.slice(prefix[0].length) : null;
}

const unplugin = createUnplugin(({ importmap = IMPORTMAP, ...options } = {}) => {
  const pages   = new Map;   // entry id -> { config, src }, absolute paths
  let   folders = [];        // autoImport of the page's config
  let   own     = [];        // the import map of the page
  let   entries;

  return {
    name    : 'rat',
    enforce : 'pre',

    async resolveId (id, importer) {
      if (id.endsWith('/__rat-entry.js')) return ENTRY + resolve(dirname(importer ?? ''), id);
      // a query, so vite does not take a .rat.html file for a page of its own
      if (/\.rat\.html$/.test(id) && /^(\.{0,2}\/)/.test(id)) return resolve(dirname(fileOf(importer ?? '')), id) + '?rat';
      entries ??= readMap(importmap);
      const target = resolveMap([...own, ...await entries], id);
      if (!target) return null;
      return /^https?:/.test(target) ? { external: true, id: target } : target;
    },

    loadInclude: id => id.startsWith(ENTRY),

    load (id) {
      const { config, src } = pages.get(id.slice(ENTRY.length)) ?? {};
      return src ? entryOf(src, config) : null;
    },

    transformInclude: id => RAT.test(fileOf(id)),

    async transform (source, id) {
      const file = fileOf(id);
      const read = path => readFile(resolve(dirname(file), path), 'utf8');
      const { code, unresolved = [] } = await compileAsync(source, { ...options, filename: file, read });
      return { code: unresolved.length && folders.length ? `${code}\n${importsOf(unresolved, file, folders)}\n` : code };
    },

    // sw.js beside a page goes along (the offline mod registers it at runtime, vite does not see it). a local
    // importScripts in it is inlined: its path into the rat repo is not there after the build
    async generateBundle () {
      for (const id of pages.keys()) {
        const file = resolve(dirname(id), 'sw.js');
        const code = await readFile(file, 'utf8').catch(() => null);
        if (code == null) continue;
        const inlined = await replaceAsync(code, /importScripts\((['"])([^'"]+)\1\);?/g, async (whole, quote, path) => /^[a-z]+:/i.test(path) ? whole : readFile(resolve(dirname(file), path), 'utf8').catch(() => whole));
        this.emitFile({ fileName: 'sw.js', source: inlined, type: 'asset' });
      }
    },

    vite: {
      // class names stay: an element without a tag of its own takes its class name (@domina/element)
      async config ({ root = process.cwd() }) {
        const config = await configOf(resolve(root));
        return { base: './', build: { ...DEFAULTS, ...await keyOfConfig(config, 'build') }, esbuild: { keepNames: true } };
      },

      transformIndexHtml: {
        order: 'pre',
        async handler (html, { filename }) {
          const app = html.match(SRC);
          if (!app || !RUN.test(html)) return html;
          const dir    = dirname(filename);
          const src    = resolve(dir, app[3]);
          const config = resolve(dirname(src), 'config.rat.js');
          const id     = resolve(dir, '__rat-entry.js');
          const map   = html.match(/<script\b[^>]*\btype=(['"])importmap\1[^>]*>([\s\S]*?)<\/script>/)?.[2];
          if (map) own = await readMap({ ...JSON.parse(map), base: dir });
          const found = await readFile(config).then(() => config, () => null);
          pages.set(id, { config: found, src });
          if (found) folders = foldersOf(await keyOfConfig(found, 'autoImport'), found);
          return html.replace(SRC, '$1').replace(RUN, `<script type="module" src="./__rat-entry.js"></script>`);
        },
      },
    },
  };
});

// :::::: EXPORT

export const { esbuild, rolldown, rollup, vite, webpack } = unplugin;
export { unplugin };
export default unplugin;
