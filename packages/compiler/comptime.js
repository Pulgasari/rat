// @rat/compiler :: comptime

/*
<script comptime> runs before the component exists: in the build, or in the page right before the
file is compiled (no build: comptime is load time there). what its top-level const and let hold is
baked into the module as data, the code that made it is not part of it:

  <script comptime>
    import { use } from '@gestalt/patterns';
    const dots  = await use('dots', { fg: '#f00' }).image();
    const icons = await read('./icons.json', 'json');
  </script>

  ->  const dots  = "url(\"data:image/svg+xml,…\")";
      const icons = [{ "name": "add" }, …];

plain js, no rat sugar, no $ names: a baked value does not change. read (path, as) reads a file
relative to the component, 'text' or 'json'. a value has to be data: json, undefined, NaN, ±Infinity,
-0, BigInt, Date, RegExp, URL, Map, Set, a typed array.

the host runs it: compileAsync(source, { comptime: (code, { read }) => values }). code is a module whose
default export takes { read } and returns the values: the host imports it and calls that, in one go (a
lazy import inside it still needs the host). @rat/dev, the loader and rat compile bring one.
*/

import { parse } from 'acorn';

import { CompileError, reason } from './util.js';

const TAG = /<script\b[^>]*\bcomptime\b/;

// :::::: THE MODULE

// the names a pattern declares: const { a, b: [c] } = …
function namesOf (pattern, names = []) {
  if (!pattern) return names;
  if (pattern.type === 'Identifier')        names.push(pattern.name);
  if (pattern.type === 'ObjectPattern')     pattern.properties.forEach(property => namesOf(property.type === 'RestElement' ? property.argument : property.value, names));
  if (pattern.type === 'ArrayPattern')      pattern.elements.forEach(element => namesOf(element, names));
  if (pattern.type === 'RestElement')       namesOf(pattern.argument, names);
  if (pattern.type === 'AssignmentPattern') namesOf(pattern.left, names);
  return names;
}

/*
the blocks as one module: the imports at its top, the rest in its default export, which hands back
what the top-level const and let hold
*/
function moduleOf (blocks, { filename, source }) {
  const imports = [];
  const body    = [];
  const names   = [];

  for (const block of blocks) {
    let program;
    try   { program = parse(block.code, { ecmaVersion: 'latest', sourceType: 'module' }); }
    catch (error) { throw new CompileError(`<script comptime>: ${reason(error)}`, { filename, index: block.start + (error.pos ?? 0), source }); }

    let from = 0;
    for (const node of program.body) {
      if (node.type === 'ImportDeclaration') {
        body.push(block.code.slice(from, node.start));
        imports.push(block.code.slice(node.start, node.end));
        from = node.end;
        continue;
      }
      if (/^Export/.test(node.type)) throw new CompileError('<script comptime> exports nothing: its top-level const and let are what the component gets', { filename, index: block.start + node.start, source });
      if (node.type !== 'VariableDeclaration') continue;
      for (const declarator of node.declarations) {
        for (const name of namesOf(declarator.id)) {
          if (name.startsWith('$')) throw new CompileError(`<script comptime>: ${name} is baked, it does not change. a $ name is for state`, { filename, index: block.start + declarator.start, source });
          names.push(name);
        }
      }
    }
    body.push(block.code.slice(from));
  }

  return [
    ...imports,
    'export default async function ({ read }) {',
    ...body,
    `return { ${names.join(', ')} };`,
    '}',
  ].join('\n');
}

// :::::: THE VALUES

const TYPED = [BigInt64Array, BigUint64Array, Float32Array, Float64Array, Int8Array, Int16Array, Int32Array, Uint8Array, Uint8ClampedArray, Uint16Array, Uint32Array];

const kindOf = value => typeof value === 'function' ? 'a function' : value?.constructor?.name ? `a ${value.constructor.name}` : typeof value;

// a value as js source, or a TypeError naming where it is not data
function toSource (value, path, seen = new Set) {
  if (value === undefined)                          return 'undefined';
  if (value === null || typeof value === 'boolean') return String(value);
  if (typeof value === 'string')                    return JSON.stringify(value);
  if (typeof value === 'bigint')                    return `${value}n`;
  if (typeof value === 'number')                    return Object.is(value, -0) ? '-0' : String(value);
  if (typeof value !== 'object')                    throw new TypeError(`${path} is ${kindOf(value)}, not data`);

  if (seen.has(value)) throw new TypeError(`${path} refers to itself`);
  seen.add(value);
  const inner = (item, at) => toSource(item, at, seen);

  try {
    if (Array.isArray(value))     return `[${value.map((item, index) => inner(item, `${path}[${index}]`)).join(', ')}]`;
    if (value instanceof Date)    return `new Date(${value.getTime()})`;
    if (value instanceof RegExp)  return String(value);
    if (value instanceof URL)     return `new URL(${JSON.stringify(value.href)})`;
    if (value instanceof Map)     return `new Map(${inner([...value], path)})`;
    if (value instanceof Set)     return `new Set(${inner([...value], path)})`;
    const typed = TYPED.find(Type => value instanceof Type);
    if (typed)                    return `new ${typed.name}(${inner([...value], path)})`;

    const proto = Object.getPrototypeOf(value);
    if (proto !== Object.prototype && proto !== null) throw new TypeError(`${path} is ${kindOf(value)}, not data`);
    const entries = Object.entries(value).map(([key, item]) => `${JSON.stringify(key)}: ${inner(item, `${path}.${key}`)}`);
    return entries.length ? `{ ${entries.join(', ')} }` : '{}';
  }
  finally { seen.delete(value); }
}

// :::::: RUN

/*
the blocks run by the host, their values as declarations for the top of the module. read is
options.read (path -> text), 'json' parses it
*/
async function bake (blocks, { comptime, filename, read, source }) {
  const index = blocks[0].start;
  if (!comptime) throw new CompileError('<script comptime> needs a host that runs it: compileAsync(source, { comptime: (code, { read }) => values })', { filename, index, source });

  const reader = async (path, as = 'text') => {
    if (!read) throw new Error(`read('${path}'): the host gives no read`);
    const text = String(await read(path));
    return as === 'json' ? JSON.parse(text) : text;
  };

  let values;
  try   { values = await comptime(moduleOf(blocks, { filename, source }), { filename, read: reader }); }
  catch (error) { throw error instanceof CompileError ? error : new CompileError(`<script comptime>: ${error?.message ?? error}`, { filename, index, source }); }

  const names = Object.keys(values);
  const width = Math.max(0, ...names.map(name => name.length));
  return names.map(name => {
    try   { return `const ${name.padEnd(width)} = ${toSource(values[name], name)};`; }
    catch (error) { throw new CompileError(`<script comptime>: ${error.message}. a baked value is data: json, Date, RegExp, URL, Map, Set, BigInt, a typed array`, { filename, index, source }); }
  }).join('\n');
}

// :::::: EXPORT

export { TAG, bake, moduleOf, toSource };
