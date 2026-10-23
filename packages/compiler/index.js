// @rat/compiler

/*
one entry, two inputs:

  .rat      markup first. <script module>, <script>, <style>, the rest is markup
  .rat.html the same as .rat, for highlighting where .rat is unknown (github)
  .rat.js   plain js plus sugar, html`…` without ${…} is compiled as markup

both run through the same passes (parse -> script -> generate) and emit an es
module that imports nothing but @rat/runtime and what the file imports itself.
the markup comes out as an htx template, rendered by @domina/render.

  <script>
    let $count = 0;
  </script>

  <button onclick={() => $count++}>{$count}</button>

becomes

  import * as $$ from '@rat/runtime';
  export default function Counter (props, children) {
    let $count = $$.$(0);
    return $$.html`<button onclick=${() => $count.value++}>${() => $count.value}</button>`;
  }
*/

// :::::: IMPORT

import { parse as parseProgram } from 'acorn';

import { generate }             from './generate.js';
import { parse }                from './parse.js';
import { MODES, attrOf, hash, inlineSources, langOfPath, rebase, scopeStyle } from './style.js';
import { CompileError, nameOf } from './util.js';

import { builtIn, langOf, langsIn, loadStyles, preprocessor }                              from './preprocess.js';
import { bindings, caseDeclarations, declared, forOf, isOperator, pipes, ranges, sugar, topics, transformExpression, transformScript, walk } from './script.js';

const RUNTIME = '$$';

// blank lines at the edges go, the indentation of the block stays
const trimBlock = code => code.replace(/^\s*\n/, '').trimEnd();

// ::: components

/*
the components the markup uses (<Dock />) that the compiled code neither
imports nor declares: the loader may find them (autoImport in config.rat.js)
*/
function unresolvedOf (asts, code) {
  const used  = new Set;
  const seen  = new WeakSet;
  const visit = node => {
    if (!node || typeof node !== 'object' || seen.has(node)) return;
    seen.add(node);
    if (Array.isArray(node)) return node.forEach(visit);
    if (node.type === 'Element' && node.component) used.add(node.tag.split('.')[0]);
    for (const key in node) if (node[key] && typeof node[key] === 'object') visit(node[key]);
  };
  visit(asts);
  if (!used.size) return [];

  const bound = new Set([...bindings(parseProgram(code, { ecmaVersion: 'latest', sourceType: 'module' }))].map(node => node.name));
  return [...used].filter(name => !bound.has(name)).sort();
}

// ::: .rat

/*
a <style> in another language goes through options.styles[lang], a function
(code, { filename }) => css, or through a built-in one (scss, sass, ass) that
was loaded before: compileAsync() loads them by itself.
*/
function preprocess (code, lang, { filename, index, source, styles = {} }) {
  if (lang === 'css') return code;
  const fn = styles[lang] ?? preprocessor(lang);
  if (!fn && builtIn(lang)) throw new CompileError(`<style lang="${lang}"> is not loaded yet: use compileAsync(), or await loadStyles('${lang}') first`, { filename, index, source });
  if (!fn) throw new CompileError(`no preprocessor for <style lang="${lang}">, pass compile(source, { styles: { ${lang}: code => css } })`, { filename, index, source });
  return String(fn(code, { filename }));
}

/*
the css files of a component (style.js): <style src="…" /> and `style …`
statements, as [{ mode, src, index }]. a <style> with src has no content of its own.
*/
function sheetsOf (ast, statements, { filename, source }) {
  const tags = ast.styles.filter(block => attrOf(block.attributes, 'src')).map(block => ({ index: block.start, mode: attrOf(block.attributes, 'mode') ?? 'adopt', src: attrOf(block.attributes, 'src') }));
  const all  = [...tags, ...statements];
  for (const { index, mode } of all) if (!MODES.includes(mode)) throw new CompileError(`style mode "${mode}" is none of ${MODES.join(', ')}`, { filename, index, source });
  return all;
}

// the css of a component: its <style> blocks, then the files it inlines
function stylesOf (ast, sheets, options) {
  const { base, filename, inlined = {}, source } = options;

  const blocks = ast.styles.filter(block => !attrOf(block.attributes, 'src')).map(block => preprocess(block.code, langOf(block.attributes ?? ''), { ...options, index: block.start }));

  const files = sheets.filter(sheet => sheet.mode === 'inline').map(({ index, src }) => {
    if (!(src in inlined)) throw new CompileError(`style inline '${src}' needs its file: use compileAsync(source, { read: path => text })`, { filename, index, source });
    const css = base ? rebase(inlined[src], new URL(src, base)) : inlined[src];
    return preprocess(css, langOfPath(src), { ...options, index });
  });

  return [...blocks, ...files].filter(css => css.trim()).join('\n\n');
}

// a css file's url in the compiled module: absolute against base when given, else against the module
const urlOf = (src, base) => /^[a-z][\w+.-]*:/i.test(src) ? JSON.stringify(src)
  : base ? JSON.stringify(new URL(src, base).href)
  : `new URL(${JSON.stringify(src)}, import.meta.url).href`;

function compileComponent (source, { base, filename = 'component.rat', inlined, runtime = '@rat/runtime', styles } = {}) {
  const ast        = parse(source, { filename });
  const names      = new Set;
  const cases      = new Map;
  const statements = [];

  const modules  = ast.scripts.module  .map(block => transformScript(block.code, { cases, filename, names, offset: block.start, runtime: RUNTIME, sheets: statements, source }).code);
  const instance = ast.scripts.instance.map(block => transformScript(block.code, { cases, filename, names, offset: block.start, runtime: RUNTIME, sheets: statements, source, lift: true }));

  const sheets    = sheetsOf(ast, statements, { filename, source });
  const linked    = sheets.filter(sheet => sheet.mode !== 'inline').map(({ mode, src }) => `${RUNTIME}.sheet('${mode}', ${urlOf(src, base)});`);
  const css       = stylesOf(ast, sheets, { base, filename, inlined, source, styles });
  const scope     = css ? hash(`${filename}\n${css}`) : null;
  const fragments = [];
  const view      = generate(ast, { cases, filename, fragments, names, runtime: RUNTIME, scope, source });

  const lines = [
    `import * as ${RUNTIME} from ${JSON.stringify(runtime)};`,
    ...instance.flatMap(script => script.imports),
    ...modules.map(trimBlock),
    linked.length && `\n${linked.join('\n')}`,
    css && `\nconst ${RUNTIME}style = ${JSON.stringify(scopeStyle(css, scope))};`,
    `\nexport default function ${nameOf(filename)} (props, children) {`,
    css && `  ${RUNTIME}.style('${scope}', ${RUNTIME}style);`,
    ...instance.map(script => trimBlock(script.code)),
    ...fragments.map(code => `  ${code}`),
    `  return ${view};`,
    '}',
    css && `\nexport { ${RUNTIME}style as style };`,
  ];

  const code = lines.filter(Boolean).join('\n') + '\n';
  return { ast, code, css, names: [...names], scope, unresolved: unresolvedOf(ast, code) };
}

// ::: .rat.js

// the template tags compiled as markup in .rat.js, all three for now (d-11)
const TAGS = ['html', 'htx', 'rat'];

function compileModule (source, { filename = 'module.rat.js', runtime = '@rat/runtime', tags = TAGS } = {}) {
  const names     = new Set;
  const templates = [];

  // html`…` (htx`…`, rat`…`) without holes of its own is rat markup
  const markup = (program, code, known, cases) => {
    const edits = [];
    walk(program, node => {
      if (node.type !== 'TaggedTemplateExpression' || node.tag.type !== 'Identifier' || !tags.includes(node.tag.name)) return;
      if (node.quasi.expressions.length) return;
      const raw = node.quasi.quasis[0].value.raw;
      const ast = parse(raw, { blocks: false, filename, offset: node.quasi.start + 1 });
      templates.push(ast);
      edits.push({ end: node.end, pos: node.start, text: generate(ast, { cases, filename, names: known, runtime: RUNTIME, source: code }) });
      return false;
    });
    return edits;
  };

  const { code } = transformScript(source, { extraEdits: markup, filename, names, runtime: RUNTIME, source });
  const used     = code.includes(`${RUNTIME}.`);
  const out      = (used ? `import * as ${RUNTIME} from ${JSON.stringify(runtime)};\n\n` : '') + code.trim() + '\n';

  return {
    ast        : { templates, type: 'Module' },
    code       : out,
    names      : [...names],
    unresolved : unresolvedOf(templates, out),
  };
}

// ::: compile

function compile (source, options = {}) {
  const { filename = 'component.rat' } = options;
  const mode = options.mode ?? (filename.endsWith('.js') ? 'module' : 'component');
  return mode === 'module' ? compileModule(source, options) : compileComponent(source, options);
}

/*
compile() after loading the built-in style languages the source uses, and
reading the files it inlines (style inline 'x.css') through options.read,
path => text or a promise of it, relative to the file.
*/
async function compileAsync (source, options = {}) {
  const sources = options.read ? [...new Set(inlineSources(source))] : [];
  const inlined = Object.fromEntries(await Promise.all(sources.map(async path => [path, String(await options.read(path))])));

  const langs = [...langsIn(source), ...sources.map(langOfPath)].filter(lang => lang !== 'css' && !options.styles?.[lang] && builtIn(lang));
  if (langs.length) await loadStyles([...new Set(langs)]);
  return compile(source, { ...options, inlined: { ...options.inlined, ...inlined } });
}

// :::::: EXPORT

export { 
  CompileError,
  compile, compileAsync, compileComponent, compileModule, 
  caseDeclarations, declared, forOf, isOperator, loadStyles, parse, pipes, ranges, sugar, topics,
  transformExpression, transformScript 
};
export default compile;
