// @rat/dev :: unplugin

/*
rat in a build: one plugin for vite, rollup, rolldown, esbuild and webpack.

  import rat from '@rat/dev';
  export default { plugins: [rat.vite()] };   // vite.config.js

  .rat, .rat.html, .rat.js   compiled to es modules (compileAsync: style languages, style inline)
  bare specifiers            resolved through importmap.json of @rat/app, the map run.js writes into
                             the page. an https entry stays external
  class names (vite)         kept when minified (keepNames): elements take their tag from them
  build of config.rat.js     the build options of the app (vite's build), merged over the defaults
                             here. read from the file, not run: values only, no imports
  index.html (vite)          the script of run.js becomes the entry of the build: it imports @rat/app,
                             the src of <rat-app> and config.rat.js next to it and hands both over
                             (app.run). src goes from <rat-app>, nothing is loaded at runtime

options: importmap (a path, an { imports } object, or false), the rest goes to the compiler.
*/

import { readFile }         from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
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

// the defaults of a build: relative urls, css as it is (gestalt: @function, if()), files as files
// (output-md tells markdown by its extension, a data: url has none)
const DEFAULTS = { assetsInlineLimit: 0, cssMinify: false };

// the build key of config.rat.js, without running the file: its imports are the page's
function buildOf (source) {
  const program = parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  const object  = program.body.find(node => node.type === 'ExportDefaultDeclaration')?.declaration;
  const build   = object?.type === 'ObjectExpression' && object.properties.find(node => (node.key?.name ?? node.key?.value) === 'build');
  return build ? new Function(`return (${source.slice(build.value.start, build.value.end)});`)() : {};
}

// <rat-app src> of root/index.html -> the build of the config.rat.js next to it (or config-src)
async function appBuildOf (root) {
  const html = await readFile(resolve(root, 'index.html'), 'utf8').catch(() => '');
  const app  = html.match(/<rat-app\b[^>]*>/)?.[0] ?? '';
  const attr = name => app.match(new RegExp(`\\s${name}=(['"])([^'"]+)\\1`))?.[2];
  const file = attr('config-src') ? resolve(root, attr('config-src')) : attr('src') && resolve(root, dirname(attr('src')), 'config.rat.js');
  const code = file && await readFile(file, 'utf8').catch(() => null);
  return code ? buildOf(code) : {};
}

async function replaceAsync (text, pattern, replace) {
  const parts = await Promise.all([...text.matchAll(pattern)].map(match => replace(...match)));
  let index = 0;
  return text.replace(pattern, () => parts[index++]);
}

// the entry of a page: the component and the config, handed over to <rat-app>
const entryOf = (src, config) => [
  `import '@rat/app';`,
  `import Component from ${JSON.stringify(src)};`,
  config ? `import config from ${JSON.stringify(config)};` : 'const config = {};',
  `document.querySelector('rat-app').run(Component, config);`,
].join('\n');

// { imports } -> [specifier, file path or url], the paths relative to the map's file
async function readMap (importmap) {
  if (!importmap) return [];
  const base    = typeof importmap === 'string' ? dirname(resolve(importmap)) : process.cwd();
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
  const pages = new Map;   // entry id -> { config, src }, absolute paths
  let   entries;

  return {
    name    : 'rat',
    enforce : 'pre',

    async resolveId (id, importer) {
      if (id.endsWith('/__rat-entry.js')) return ENTRY + resolve(dirname(importer ?? ''), id);
      // a query, so vite does not take a .rat.html file for a page of its own
      if (/\.rat\.html$/.test(id) && /^(\.{0,2}\/)/.test(id)) return resolve(dirname(fileOf(importer ?? '')), id) + '?rat';
      entries ??= readMap(importmap);
      const target = resolveMap(await entries, id);
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
      const { code } = await compileAsync(source, { ...options, filename: file, read });
      return { code };
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
        return { base: './', build: { ...DEFAULTS, ...await appBuildOf(resolve(root)) }, esbuild: { keepNames: true } };
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
          pages.set(id, { config: await readFile(config).then(() => config, () => null), src });
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
