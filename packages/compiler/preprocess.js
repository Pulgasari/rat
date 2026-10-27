// @rat/compiler :: preprocess

/*
style languages that ship with the compiler (d-20). compile() is synchronous,
so a language is loaded once before it is used: compileAsync() does that on
its own for every <style lang> in a file, loadStyles('scss') does it by hand.

a loader tries the bare specifier first (an import map, node_modules), then
a pinned url, so it works in a build and in a plain browser page.

  scss, sass   sass (dart sass compiled to js), the same version @aufbau/import pins
  gestalt      @gestalt/syntax: css with @spread, @val, @mixin and @apply
*/

const GESTALT = 'https://code.pulgasari.dev/gestalt/packages/syntax/index.js';
const SASS    = 'https://esm.sh/sass@1.70.0';

async function first (specifiers) {
  let failure;
  for (const specifier of specifiers) {
    try { return await import(/* @vite-ignore */ specifier); }
    catch (error) { failure = error; }
  }
  throw failure;
}

const sass = syntax => async () => {
  const module = await first(['sass', SASS]);
  const api    = module.compileString ? module : module.default;
  return code => api.compileString(code, { syntax }).css;
};

const loaders = {
  gestalt : async () => (await first(['@gestalt/syntax', GESTALT])).compile,
  sass    : sass('indented'),
  scss    : sass('scss'),
};

const ready   = new Map;
const pending = new Map;

// loads the given languages, resolves once all of them can be used
function loadStyles (...langs) {
  return Promise.all(langs.flat().map(lang => {
    if (ready.has(lang)) return ready.get(lang);
    if (!loaders[lang])  return Promise.reject(new Error(`[rat] no built-in preprocessor for <style lang="${lang}">`));
    if (!pending.has(lang)) pending.set(lang, loaders[lang]().then(fn => { ready.set(lang, fn); return fn; }));
    return pending.get(lang);
  }));
}

const preprocessor = lang => ready.get(lang);
const builtIn      = lang => lang in loaders;

// <style lang="scss"> / type="text/scss" -> 'scss'. no attribute is css
const langOf = attributes => /\b(?:lang|type)\s*=\s*["']?(?:text\/)?([\w-]+)/.exec(attributes)?.[1] ?? 'css';

// every style language a source uses, without parsing it
const langsIn = source => [...new Set([...source.matchAll(/<style\b([^>]*)>/g)].map(match => langOf(match[1])))].filter(lang => lang !== 'css');

export { builtIn, langOf, langsIn, loadStyles, preprocessor };
