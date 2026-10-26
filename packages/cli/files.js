// @rat/cli :: files

import { readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { parse } from 'acorn';

import { compileAsync } from '@rat/compiler';

export const COMPTIME = /<script\b[^>]*\bcomptime\b/;
export const RAT      = /\.rat(\.html|\.js)?$/;
export const jsOf     = file => file.replace(RAT, '.js');

const SKIP = new Set(['.git', 'node_modules']);

// files and folders -> the .rat files in them
export async function filesOf (inputs) {
  const files = [];
  for (const input of inputs) {
    if (!(await stat(input)).isDirectory()) { files.push(input); continue; }
    for (const entry of await readdir(input, { recursive: true })) {
      if (RAT.test(entry) && !entry.split(/[\\/]/).some(part => SKIP.has(part))) files.push(join(input, entry));
    }
  }
  return files;
}

// an import of another .rat file points to its .js
function pointImports (code) {
  const found = [];
  const visit = node => {
    if (!node || typeof node.type !== 'string') return;
    const source = /^(Import|ExportNamed|ExportAll)Declaration$/.test(node.type) || node.type === 'ImportExpression' ? node.source : null;
    if (source?.type === 'Literal' && RAT.test(source.value)) found.push(source);
    for (const key in node) {
      const value = node[key];
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value.type === 'string') visit(value);
    }
  };
  visit(parse(code, { ecmaVersion: 'latest', sourceType: 'module' }));
  for (const { end, start, value } of found.sort((a, b) => b.start - a.start)) code = code.slice(0, start) + JSON.stringify(jsOf(value)) + code.slice(end);
  return code;
}

// <script comptime> in node: a module file beside the component for the moment it runs, so its imports
// resolve from there (node_modules, no import map)
const comptimeOf = file => async (code, { read }) => {
  const temp = join(dirname(file), `.${basename(file)}.comptime.mjs`);
  await writeFile(temp, code);
  try     { return await (await import(`${pathToFileURL(temp).href}?${Date.now()}`)).default({ read }); }
  finally { await rm(temp, { force: true }); }
};

export async function compileFile (file, { base, point = true } = {}) {
  const source = await readFile(file, 'utf8');
  const read   = path => readFile(resolve(dirname(file), path), 'utf8');
  const { code, unresolved = [] } = await compileAsync(source, { base, comptime: comptimeOf(file), filename: basename(file), read });
  return { code: point ? pointImports(code) : code, unresolved };
}

// file:line:column message
export const errorOf = (error, file) => {
  const line   = error.line   ?? error.loc?.line;
  const column = error.column ?? (error.loc ? error.loc.column + 1 : undefined);
  return `${file}${line ? `:${line}:${column}` : ''} ${error.reason ?? error.message}`;
};
