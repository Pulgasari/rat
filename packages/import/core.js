// @rat/import :: core

/*
the ground every format stands on:

  settings    the cdn, the default ttl and the vendor overrides, changed by configure()
  options     importFile(path, 'raw') and importFile(path, String) are short for
              { as: 'raw' } and { as: String }
  fetch       one request, one error message
  paths       absolute urls (the identity of a file) and extensions, query and hash stripped
*/

export const settings = {
  cdn     : 'https://esm.sh/',
  modules : new Map, // vendor name -> specifier string or module object
  ttl     : 7 * 24 * 60 * 60 * 1000,
};

export const isFunction = value => typeof value === 'function';
export const isString   = value => typeof value === 'string';

// modules: null drops an override again
export function configure ({ cdn, modules, ttl } = {}) {
  if (cdn)               settings.cdn = cdn.endsWith('/') ? cdn : cdn + '/';
  if (ttl !== undefined) settings.ttl = ttl;
  if (modules) for (const [name, value] of Object.entries(modules)) {
    if (value == null) settings.modules.delete(name);
    else               settings.modules.set(name, value);
  }
}

export function toOptions (input) {
  if (input == null) return {};
  if (isString(input) || isFunction(input)) return { as: input };
  return input;
}

// ::: fetch

export async function fetchResponse (path, options = {}) {
  const response = await fetch(path, options.fetchOptions);
  if (!response.ok) throw new Error(`[@rat/import] ${hrefOf(path)}: ${response.status} ${response.statusText}`);
  return response;
}

export const fetchText = async (path, options) => (await fetchResponse(path, options)).text();

// ::: paths

const hrefOf = path => isString(path) ? path : path?.href ?? String(path);

// against the page, else the worker, else as given (node, deno without --location)
export function absolute (path) {
  const href = hrefOf(path);
  const base = globalThis.document?.baseURI ?? globalThis.location?.href;
  if (!base) return href;
  try   { return new URL(href, base).href; }
  catch { return href; }
}

// '/data.v2/table.csv?v=3#top' -> 'csv', '' without one
export function extensionOf (path) {
  const name = hrefOf(path).split(/[?#]/)[0].split('/').pop();
  const dot  = name.lastIndexOf('.');
  return dot === -1 ? '' : name.slice(dot + 1).toLowerCase();
}

// ::: dom

export const createElement = (tag, properties) => Object.assign(document.createElement(tag), properties);
export const parseDOM      = (source, type) => new DOMParser().parseFromString(source, type);
