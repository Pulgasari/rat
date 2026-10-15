// @rat/compiler

/*
one entry, two inputs:

  .rat      markup first. <script module>, <script>, <style>, the rest is markup
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
    let $count = $$.signal(0);
    return $$.html`<button onclick=${() => $count.value++}>${() => $count.value}</button>`;
  }
*/

// :::::: IMPORT

import { generate }             from './generate.js';
import { parse }                from './parse.js';
import { hash, scopeStyle }     from './style.js';
import { CompileError, nameOf } from './util.js';

import { builtIn, langOf, langsIn, loadStyles, preprocessor }                              from './preprocess.js';
import { declared, forOf, pipes, ranges, sugar, topics, transformExpression, transformScript, walk } from './script.js';

const RUNTIME = '$$';

// blank lines at the edges go, the indentation of the block stays
const trimBlock = code => code.replace(/^\s*\n/, '').trimEnd();

// ::: .rat

/*
a <style> in another language goes through options.styles[lang], a function
(code, { filename }) => css, or through a built-in one (scss, sass, ass) that
was loaded before: compileAsync() loads them by itself.
*/
function stylesOf (ast, { filename, source, styles = {} }) {
  return ast.styles.map(block => {
    const lang = langOf(block.attributes ?? '');
    if (lang === 'css') return block.code;
    const preprocess = styles[lang] ?? preprocessor(lang);
    if (!preprocess && builtIn(lang)) throw new CompileError(`<style lang="${lang}"> is not loaded yet: use compileAsync(), or await loadStyles('${lang}') first`, { filename, index: block.start, source });
    if (!preprocess) throw new CompileError(`no preprocessor for <style lang="${lang}">, pass compile(source, { styles: { ${lang}: code => css } })`, { filename, index: block.start, source });
    return String(preprocess(block.code, { filename }));
  }).filter(css => css.trim()).join('\n\n');
}

function compileComponent (source, { filename = 'component.rat', runtime = '@rat/runtime', styles } = {}) {
  const ast   = parse(source, { filename });
  const names = new Set;

  const modules  = ast.scripts.module  .map(block => transformScript(block.code, { filename, names, offset: block.start, runtime: RUNTIME, source }).code);
  const instance = ast.scripts.instance.map(block => transformScript(block.code, { filename, names, offset: block.start, runtime: RUNTIME, source, lift: true }));

  const css   = stylesOf(ast, { filename, source, styles });
  const scope = css ? hash(`${filename}\n${css}`) : null;
  const view  = generate(ast, { filename, names, runtime: RUNTIME, scope, source });

  const lines = [
    `import * as ${RUNTIME} from ${JSON.stringify(runtime)};`,
    ...instance.flatMap(script => script.imports),
    ...modules.map(trimBlock),
    css && `\nconst ${RUNTIME}style = ${JSON.stringify(scopeStyle(css, scope))};`,
    `\nexport default function ${nameOf(filename)} (props, children) {`,
    css && `  ${RUNTIME}.style('${scope}', ${RUNTIME}style);`,
    ...instance.map(script => trimBlock(script.code)),
    `  return ${view};`,
    '}',
    css && `\nexport { ${RUNTIME}style as style };`,
  ];

  return { ast, code: lines.filter(Boolean).join('\n') + '\n', css, names: [...names], scope };
}

// ::: .rat.js

// the template tags compiled as markup in .rat.js, all three for now (d-11)
const TAGS = ['html', 'htx', 'rat'];

function compileModule (source, { filename = 'module.rat.js', runtime = '@rat/runtime', tags = TAGS } = {}) {
  const names     = new Set;
  const templates = [];

  // html`…` (htx`…`, rat`…`) without holes of its own is rat markup
  const markup = (program, code, known) => {
    const edits = [];
    walk(program, node => {
      if (node.type !== 'TaggedTemplateExpression' || node.tag.type !== 'Identifier' || !tags.includes(node.tag.name)) return;
      if (node.quasi.expressions.length) return;
      const raw = node.quasi.quasis[0].value.raw;
      const ast = parse(raw, { blocks: false, filename, offset: node.quasi.start + 1 });
      templates.push(ast);
      edits.push({ end: node.end, pos: node.start, text: generate(ast, { filename, names: known, runtime: RUNTIME, source: code }) });
      return false;
    });
    return edits;
  };

  const { code } = transformScript(source, { extraEdits: markup, filename, names, runtime: RUNTIME, source });
  const used     = code.includes(`${RUNTIME}.`);

  return {
    ast  : { templates, type: 'Module' },
    code : (used ? `import * as ${RUNTIME} from ${JSON.stringify(runtime)};\n\n` : '') + code.trim() + '\n',
    names: [...names],
  };
}

// ::: compile

function compile (source, options = {}) {
  const { filename = 'component.rat' } = options;
  const mode = options.mode ?? (filename.endsWith('.js') ? 'module' : 'component');
  return mode === 'module' ? compileModule(source, options) : compileComponent(source, options);
}

// compile() after loading the built-in style languages the source uses
async function compileAsync (source, options = {}) {
  const langs = langsIn(source).filter(lang => !options.styles?.[lang] && builtIn(lang));
  if (langs.length) await loadStyles(langs);
  return compile(source, options);
}

// :::::: EXPORT

export { 
  CompileError,
  compile, compileAsync, compileComponent, compileModule, 
  declared, forOf, loadStyles, parse, pipes, ranges, sugar, topics,
  transformExpression, transformScript 
};
export default compile;
