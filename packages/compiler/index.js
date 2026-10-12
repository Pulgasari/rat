// @rat/compiler

/*
one entry, two inputs:

  .rat      markup first. <script module>, <script>, <style>, the rest is markup
  .rat.js   plain js plus sugar, html`…` without ${…} is compiled as markup

both run through the same passes (parse -> script -> generate) and emit an es
module that imports nothing but @rat/runtime and what the file imports itself.

  <script>
    let $count = 0;
  </script>

  <button onclick={() => $count++}>{$count}</button>

becomes

  import * as $$ from '@rat/runtime';
  export default function Counter (props) {
    let $count = $$.signal(0);
    return $$.el('button', { onclick: () => $count.value++ }, [() => $count.value]);
  }
*/

import { generate }                       from './generate.js';
import { parse }                          from './parse.js';
import { forOf, pipes, sugar, transformExpression, transformScript, walk } from './script.js';
import { hash, scopeStyle }               from './style.js';
import { CompileError, nameOf }           from './util.js';

const RUNTIME = '$$';

// blank lines at the edges go, the indentation of the block stays
const trimBlock = code => code.replace(/^\s*\n/, '').trimEnd();

// ::: .rat

function compileComponent (source, { filename = 'component.rat', runtime = '@rat/runtime' } = {}) {
  const ast   = parse(source, { filename });
  const names = new Set;

  const modules  = ast.scripts.module.map(block => transformScript(block.code, { filename, names, offset: block.start, runtime: RUNTIME, source }).code);
  const instance = ast.scripts.instance.map(block => transformScript(block.code, { filename, lift: true, names, offset: block.start, runtime: RUNTIME, source }));

  const css   = ast.styles.map(block => block.code.trim()).filter(Boolean).join('\n\n');
  const scope = css ? hash(`${filename}\n${css}`) : null;
  const view  = generate(ast, { filename, names, runtime: RUNTIME, scope, source });

  const lines = [
    `import * as ${RUNTIME} from ${JSON.stringify(runtime)};`,
    ...instance.flatMap(script => script.imports),
    ...modules.map(trimBlock),
    css && `\nconst ${RUNTIME}style = ${JSON.stringify(scopeStyle(css, scope))};`,
    `\nexport default function ${nameOf(filename)} (props) {`,
    css && `  ${RUNTIME}.style('${scope}', ${RUNTIME}style);`,
    ...instance.map(script => trimBlock(script.code)),
    `  return ${view};`,
    '}',
    css && `\nexport { ${RUNTIME}style as style };`,
  ];

  return { ast, code: lines.filter(Boolean).join('\n') + '\n', css, names: [...names], scope };
}

// ::: .rat.js

function compileModule (source, { filename = 'module.rat.js', runtime = '@rat/runtime', tag = 'html' } = {}) {
  const names     = new Set;
  const templates = [];

  // html`…` without holes of its own is rat markup
  const markup = (program, code, known) => {
    const edits = [];
    walk(program, node => {
      if (node.type !== 'TaggedTemplateExpression' || node.tag.type !== 'Identifier' || node.tag.name !== tag) return;
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

export { CompileError, compile, compileComponent, compileModule, forOf, parse, pipes, sugar, transformExpression, transformScript };
export default compile;
