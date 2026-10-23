// @rat/app :: loader

/*
.rat files in the page, without a build (ideas/no-build.md):

  1. fetch the source, compile it (compileAsync: style languages load first).
     .htx files go through @htx/compiler (adapter @rat/runtime), a plain .html file
     becomes a component that renders it as it is (raw, scripts in it do not run).
  2. rewrite the imports of the result. a blob module has no path of its own,
     so './card.rat' inside it would resolve against blob: and fail:
       .rat, .rat.html, .rat.js, .htx, .html   compiled the same way, the import gets their blob url
       ./x.js, ../x    an absolute url, against the file's own url
       @rat/runtime    stays, for the import map
     a dynamic import('./x.rat') stays lazy: it goes through load() when it runs.
  3. import the result from a blob url, named after the file for devtools.

every file announces itself before it compiles: a 'rat:compile' event on the
document, detail { name, url } (the splash of <rat-app> shows it).

one compile per url, a failed one is dropped so the next try loads again.
a circle of .rat files (a imports b imports a) is an error: each would wait
for the other.

what a file compiles to is kept in the Cache API (rat:compiled), under its url
and a hash of its source: an unchanged file is not compiled again, and as long
as nothing has to be compiled, the compiler is not even loaded. a file that
inlines a css file (style inline) is compiled every time, its css may change.
?fresh (run.js) drops them all, VERSION does when the compiled output changes.

autoImport (config.rat.js, set by <rat-app>): a component the markup uses
(<Dock />) that the file neither imports nor declares is looked for in these
folders, relative to the config, as Name.rat.html, Name.rat, Name.rat.js. the
first file found is imported, none is an error.

  autoImport : true                                          the folder of the config
  autoImport : '../.shared/components/'
  autoImport : ['./components/', '../.shared/components/']   in this order
  autoImport : { './components/': ['Dock', 'Footer'] }       only these names there
*/

import { isArray, isFn, isString } from './_shared.js';

const HTML     = /\.html?$/;
const HTX      = /\.htx$/;
const RAT      = /\.rat(\.js|\.html)?$/;   // .rat.html: a .rat file under another name, for highlighting where .rat is unknown
const RELATIVE = /^(\.{1,2}\/|\/)/;
const SELF     = import.meta.url;

const cache = new Map; // url -> Promise<blob url>

const COMPILED = 'rat:compiled';
const VERSION  = 3;

const EXTENSIONS = ['.rat.html', '.rat', '.rat.js'];

let   folders = [];      // [{ dir, names }]: where autoImport looks, names null for any
const located = new Map; // name -> Promise<url | null>

// fnv-1a over the source, enough to tell an edit
function hashOf (text) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index++) hash = Math.imul(hash ^ text.charCodeAt(index), 0x01000193);
  return (hash >>> 0).toString(36);
}

// ::: imports

// [{ start, end, value, dynamic }] for every import / export … from with a string literal.
// for import('…') start and end span the whole call, for the rest the string
async function specifiers (code) {
  const { parse } = await import('acorn');
  const found = [];
  const visit = node => {
    if (!node || !isString(node.type)) return;
    if (/^(Import|ExportNamed|ExportAll)Declaration$/.test(node.type) && node.source) found.push({ dynamic: false, end: node.source.end, start: node.source.start, value: node.source.value });
    if (node.type === 'ImportExpression' && node.source.type === 'Literal' && typeof node.source.value === 'string') found.push({ dynamic: true, end: node.end, start: node.start, value: node.source.value });
    for (const key in node) {
      const value = node[key];
      if (isArray(value)) value.forEach(visit);
      else if (value && isString(value.type)) visit(value);
    }
  };
  visit(parse(code, { ecmaVersion: 'latest', sourceType: 'module' }));
  return found;
}

// what a file is compiled as: rat, htx, html, or null for anything else
const kindOf = url => {
  const path = new URL(url).pathname;
  return RAT.test(path) ? 'rat' : HTX.test(path) ? 'htx' : HTML.test(path) ? 'html' : null;
};

const isUrl = specifier => RELATIVE.test(specifier) || /^[a-z][\w+.-]*:/i.test(specifier);

// the replacement for one specifier, a promise for a static .rat import (compiled in parallel)
function replacement ({ dynamic, value }, url, chain) {
  const target = new URL(value, url).href;
  if (!kindOf(target)) return dynamic ? `import(${JSON.stringify(target)})` : JSON.stringify(target);
  if (dynamic) return `import(${JSON.stringify(SELF)}).then(app => app.load(${JSON.stringify(target)}))`;
  return compileFile(target, chain).then(blob => JSON.stringify(blob));
}

async function rewrite ({ code, found: all }, url, chain) {
  const found = all.filter(({ value }) => isUrl(value)).sort((a, b) => a.start - b.start);
  const texts = await Promise.all(found.map(specifier => replacement(specifier, url, chain)));

  // from the end, so earlier positions stay valid
  for (let index = found.length - 1; index >= 0; index--) {
    const { end, start } = found[index];
    code = code.slice(0, start) + texts[index] + code.slice(end);
  }
  return code;
}

// ::: autoImport

// the folders of an autoImport spec, against the url of the config
function autoImport (spec, base) {
  const dir     = path => new URL(path.endsWith('/') ? path : `${path}/`, base).href;
  const entries = spec === true ? [{ dir: new URL('./', base).href, names: null }]
    : [spec].flat().flatMap(item => isString(item) ? [{ dir: dir(item), names: null }] : Object.entries(item).map(([path, names]) => ({ dir: dir(path), names })));
  folders = entries;
  located.clear();
}

const exists = url => fetch(url, { cache: 'no-cache' }).then(response => response.ok, () => false);

// the first file of a component in the folders, once per name
function locate (name) {
  if (!located.has(name)) located.set(name, (async () => {
    for (const { dir, names } of folders) {
      if (names && !names.includes(name)) continue;
      for (const extension of EXTENSIONS) if (await exists(dir + name + extension)) return dir + name + extension;
    }
    return null;
  })());
  return located.get(name);
}

// the import statements for the components a file uses without importing them
async function importsOf (names = [], url, chain) {
  if (!names.length || !folders.length) return '';
  const lines = await Promise.all(names.map(async name => {
    const target = await locate(name);
    if (!target) throw new Error(`[rat] ${url}: <${name}> is not imported and not found in ${folders.map(({ dir }) => dir).join(', ')}`);
    return `import ${name} from ${JSON.stringify(await compileFile(target, chain))};`;
  }));
  return lines.join('\n');
}

// ::: compile

async function build (url, chain) {
  // revalidated every time: an edited .rat file shows on the next reload
  const response = await fetch(url, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`[rat] ${url}: ${response.status} ${response.statusText}`);

  const source = await response.text();
  const name   = new URL(url).pathname.split('/').pop();

  const compiled = await compiledOf(source, url, name);
  const code     = await rewrite(compiled, url, chain);
  // at the end, so the lines of the code stay where they were: imports are hoisted anyway
  const imports  = await importsOf(compiled.unresolved, url, chain);
  return URL.createObjectURL(new Blob([`${code}\n${imports}\n//# sourceURL=${url}.js\n`], { type: 'text/javascript' }));
}

// { code, found }: kept from an earlier compile of the same source, or compiled now
async function compiledOf (source, url, name) {
  const store = globalThis.caches ? await caches.open(COMPILED).catch(() => null) : null;
  const key   = `${url}${url.includes('?') ? '&' : '?'}rat-compiled=${VERSION}.${hashOf(source)}`;
  const hit   = await store?.match(key);
  if (hit) return hit.json();

  document.dispatchEvent(new CustomEvent('rat:compile', { detail: { name, url } }));
  const { code, inlined, unresolved = [] } = await compileSource(source, url, name);
  const result = { code, found: await specifiers(code), unresolved };

  if (store && !inlined) {
    await store.delete(url, { ignoreSearch: true });
    await store.put(key, new Response(JSON.stringify(result), { headers: { 'content-type': 'application/json' } }));
  }
  return result;
}

// source -> { code, inlined, unresolved }: module code by the kind of the file, inlined when it read another file
async function compileSource (source, url, name) {
  const kind = kindOf(url);
  if (kind === 'html') return { code: `import { raw } from '@rat/runtime';\nconst source = ${JSON.stringify(source)};\nexport default () => raw(source);\n` };

  try {
    if (kind === 'htx') return { code: (await import('@htx/compiler')).compile(source, { adapter: '@rat/runtime', filename: name }).code };

    // base: css files resolve against this file, not the blob. read: what style inline needs
    let inlined = false;
    const read  = path => {
      inlined = true;
      return fetch(new URL(path, url), { cache: 'no-cache' }).then(response => response.ok ? response.text() : Promise.reject(new Error(`[rat] ${new URL(path, url).href}: ${response.status}`)));
    };
    const { compileAsync } = await import('@rat/compiler');
    const { code, unresolved } = await compileAsync(source, { base: url, filename: name, read });
    return { code, inlined, unresolved };
  }
  catch (error) { error.message = `${url}\n${error.message}`; throw error; }
}

// the blob url of a compiled .rat / .rat.js / .htx / .html file. chain: the files that import it, for circles
function compileFile (url, chain = []) {
  url = new URL(url, document.baseURI).href;
  if (chain.includes(url)) throw new Error(`[rat] circular import: ${[...chain, url].join(' -> ')}`);

  if (!cache.has(url)) {
    const pending = build(url, [...chain, url]);
    pending.catch(() => cache.delete(url));
    cache.set(url, pending);
  }

  return cache.get(url);
}

// the module of a .rat / .rat.js / .htx / .html file
const load = async url => import(await compileFile(url));

// the component of a module: its default export, else its first function
const componentOf = module => module.default ?? Object.values(module).find(value => isFn(value)) ?? null;

// :::::: EXPORT

export { autoImport, compileFile, componentOf, load };
