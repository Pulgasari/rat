// @rat/app :: loader

/*
.rat files in the page, without a build (ideas/no-build.md):

  1. fetch the source, compile it (compileAsync: style languages load first).
  2. rewrite the imports of the result. a blob module has no path of its own,
     so './card.rat' inside it would resolve against blob: and fail:
       .rat, .rat.html, .rat.js   compiled the same way, the import gets their blob url
       ./x.js, ../x    an absolute url, against the file's own url
       @rat/runtime    stays, for the import map
     a dynamic import('./x.rat') stays lazy: it goes through load() when it runs.
  3. import the result from a blob url, named after the file for devtools.

every file announces itself before it compiles: a 'rat:compile' event on the
document, detail { name, url } (the splash of <rat-app> shows it).

one compile per url, a failed one is dropped so the next try loads again.
a circle of .rat files (a imports b imports a) is an error: each would wait
for the other.
*/

import { parse }          from 'acorn';
import { compileAsync }   from '@rat/compiler';
import { isArray, isFn, isString } from './_shared.js';

const RAT      = /\.rat(\.js|\.html)?$/;   // .rat.html: a .rat file under another name, for highlighting where .rat is unknown
const RELATIVE = /^(\.{1,2}\/|\/)/;
const SELF     = import.meta.url;

const cache = new Map; // url -> Promise<blob url>

// ::: imports

// [{ start, end, value, dynamic }] for every import / export … from with a string literal.
// for import('…') start and end span the whole call, for the rest the string
function specifiers (code) {
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

const isUrl = specifier => RELATIVE.test(specifier) || /^[a-z][\w+.-]*:/i.test(specifier);

// the replacement for one specifier, a promise for a static .rat import (compiled in parallel)
function replacement ({ dynamic, value }, url, chain) {
  const target = new URL(value, url).href;
  if (!RAT.test(new URL(target).pathname)) return dynamic ? `import(${JSON.stringify(target)})` : JSON.stringify(target);
  if (dynamic) return `import(${JSON.stringify(SELF)}).then(app => app.load(${JSON.stringify(target)}))`;
  return compileFile(target, chain).then(blob => JSON.stringify(blob));
}

async function rewrite (code, url, chain) {
  const found = specifiers(code).filter(({ value }) => isUrl(value)).sort((a, b) => a.start - b.start);
  const texts = await Promise.all(found.map(specifier => replacement(specifier, url, chain)));

  // from the end, so earlier positions stay valid
  for (let index = found.length - 1; index >= 0; index--) {
    const { end, start } = found[index];
    code = code.slice(0, start) + texts[index] + code.slice(end);
  }
  return code;
}

// ::: compile

async function build (url, chain) {
  // revalidated every time: an edited .rat file shows on the next reload
  const response = await fetch(url, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`[rat] ${url}: ${response.status} ${response.statusText}`);

  const source = await response.text();
  const name   = new URL(url).pathname.split('/').pop();

  document.dispatchEvent(new CustomEvent('rat:compile', { detail: { name, url } }));

  let compiled;
  // base: css files resolve against this file, not the blob. read: what style inline needs
  const read = path => fetch(new URL(path, url), { cache: 'no-cache' }).then(response => response.ok ? response.text() : Promise.reject(new Error(`[rat] ${new URL(path, url).href}: ${response.status}`)));

  try { compiled = await compileAsync(source, { base: url, filename: name, read }); }
  catch (error) { error.message = `${url}\n${error.message}`; throw error; }

  const code = await rewrite(compiled.code, url, chain);
  return URL.createObjectURL(new Blob([`${code}\n//# sourceURL=${url}.js\n`], { type: 'text/javascript' }));
}

// the blob url of a compiled .rat / .rat.js file. chain: the files that import it, for circles
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

// the module of a .rat / .rat.js file
const load = async url => import(await compileFile(url));

// the component of a module: its default export, else its first function
const componentOf = module => module.default ?? Object.values(module).find(value => isFn(value)) ?? null;

// :::::: EXPORT

export { compileFile, componentOf, load };
