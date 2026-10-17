// @rat/import :: vendors

/*
the parsers and compilers, loaded on first use, never up front:

  1. an override from configure({ modules }): a module object is used as is,
     a string replaces the specifier
  2. the host: an import map in the page, node_modules in node / deno / bun
  3. the cdn, at the pinned version below

the specifier is put together at runtime, so bundlers and jsr publish never see
a literal url in an import(). a failed load is dropped, the next call tries again.
*/

import { settings } from './core.js';

const registry = {
  fastXmlParser : 'fast-xml-parser@4.3.2',
  json5         : 'json5@2.2.3',
  less          : 'less@4.2.0',
  marked        : 'marked@11.1.1',
  papaparse     : 'papaparse@5.4.1',
  sass          : 'sass@1.70.0',
  smolToml      : 'smol-toml@1.1.4',
  sucrase       : 'sucrase@3.35.0',
  svgjs         : '@svgdotjs/svg.js@3.2.0',
  yaml          : 'yaml@2.3.4',
};

const loaded = new Map; // specifier -> Promise<module>

// '@scope/name@1.0.0' -> '@scope/name'
function bare (specifier) {
  const at = specifier.lastIndexOf('@');
  return at > 0 ? specifier.slice(0, at) : specifier;
}

function locate (name) {
  const override = settings.modules.get(name);
  if (typeof override === 'string') return override;

  const pinned = registry[name];
  if (!pinned) throw new Error(`[@rat/import] no vendor named "${name}"`);

  try {
    const hit = import.meta.resolve?.(bare(pinned));
    if (hit) return hit;
  }
  catch {} // not mapped, not installed: the cdn

  return settings.cdn + pinned;
}

export function vendor (name) {
  const override = settings.modules.get(name);
  if (override && typeof override === 'object') return Promise.resolve(override);

  const specifier = locate(name);
  let   promise   = loaded.get(specifier);
  if (!promise) {
    promise = import(/* @vite-ignore */ specifier);
    promise.catch(() => loaded.delete(specifier));
    loaded.set(specifier, promise);
  }
  return promise;
}
