// @ratscript/compiler/generator/statements.js

import { generate } from './index.js';
import { indent } from './helpers.js';
import { resetHelpers, getUsedHelpers } from './state.js';
import { runtimeHelpers } from './../meta.js';

// :::::: Program / Block

export function generateProgram (node) {
  resetHelpers();

  const body     = node.body.map(generate).join('\n');
  const preamble = generateHelperImports();

  return preamble ? `${preamble}\n\n${body}` : body;
}

export function generateHelperImports () {
  const used = getUsedHelpers();
  if (!used.length) return '';

  // Mehrere Helper aus derselben Datei -> EIN gemeinsamer Import
  const byPath = new Map();
  for (const name of used) {
    const meta = runtimeHelpers[name];
    if (!meta) throw new Error(`[Generator-Fehler]: Unbekannter Runtime-Helper "${name}" (fehlt in meta.js -> runtimeHelpers).`);
    if (!byPath.has(meta.from)) byPath.set(meta.from, []);
    byPath.get(meta.from).push(meta.token);
  }

  return [...byPath.entries()]
    .map(([from, tokens]) => `import { ${tokens.join(', ')} } from '${from}';`)
    .join('\n');
}

export function generateBlockStatement (node) {
  return node.body.map(generate).join('\n');
}

export function generateBreakStatement (node) {
  return node.label ? `break ${node.label};` : 'break;';
}

export function generateContinueStatement (node) {
  return node.label ? `continue ${node.label};` : 'continue;';
}

export function generateExpressionStatement (node) {
  return `${generate(node.expr)};`;
}
export function generateLabeledStatement (node) {
  return `${node.label}: ${generate(node.body)}`;
}

// ::::::

export function generateForStatement (node) {
  const bodyCode     = generateBlockStatement(node.body);
  const iterableCode = generate(node.iterable);

  if (node.id) {
    return `for (${node.kind} ${generate(node.id)} of ${iterableCode}) {\n${indent(bodyCode)}\n}`;
  }

  // Naked: keine Bindung im Body -> interner, nicht referenzierbarer Loop-Variablenname
  return `for (const __for_it of ${iterableCode}) {\n${indent(bodyCode)}\n}`;
}

// 'if (expr as name) { ... }' hat kein direktes JS-Äquivalent (kein 'let' in einer
// Expression-Position) -> wird in einen eigenen Block-Scope mit Temp-Variable gepackt:
//
//   if (expr as name) { body }      ->  { let __as_tmp = expr; if (__as_tmp) { let name = __as_tmp; body } }
//   while (expr as name) { body }   ->  { let __as_tmp; while ((__as_tmp = expr)) { let name = __as_tmp; body } }
//
// Jedes Binding kriegt seinen EIGENEN Block-Scope (anders als der alte, global
// gehoistete __as_tmp) -> keine Kollisionsgefahr zwischen mehreren 'as'-Bindings.

function generateElseBranch (alternate) {
  if (!alternate) return '';
  
  return (alternate.type === 'IfStatement')
    ? ` else ${generateIfStatement(alternate)}`
    : ` else {\n${indent(generateBlockStatement(alternate))}\n}`;
}

export function generateIfStatement (node) {
  if (node.test.type === 'AsBindingExpression') {
    const { expr, name } = node.test;

    let inner = `if (__as_tmp) {\n`;
    inner += `  let ${name} = __as_tmp;\n`;
    inner += indent(generateBlockStatement(node.consequent)) + '\n';
    inner += `}`;
    inner += generateElseBranch(node.alternate);

    return `{\n  let __as_tmp = ${generate(expr)};\n${indent(inner)}\n}`;
  }

  return `if (${generate(node.test)}) {\n${indent(generateBlockStatement(node.consequent))}\n}` + generateElseBranch(node.alternate);
}

export function generateReturnStatement (node) {
  if (node.argument === null) return `return;`;
  return `return ${generate(node.argument)};`;
}

// :::::: sift { init: ..., cond: ... }
export function generateSiftStatement (node) {
  let js = `(() => {\n`;

  if (node.init) {
    js += `  // Init\n`;
    js += indent(generateBlockStatement(node.init)) + '\n';
  }

  js += `  try {\n`;

  for (const c of node.cases) {
    js += `    if (${generate(c.condition)}) {\n`;
    js += indent(generateBlockStatement(c.body), 3) + '\n';
    js += `    }\n`;
  }

  if (node.catchBlock) {
    js += `  } catch (__err) {\n`;
    js += indent(generateBlockStatement(node.catchBlock)) + '\n';
  } else {
    js += `  } catch (__err) { throw __err; }\n`;
  }

  if (node.finallyBlock) {
    js += `  finally {\n`;
    js += indent(generateBlockStatement(node.finallyBlock)) + '\n';
    js += `  }\n`;
  }

  js += `})();`;
  return js;
}

// :::::: mold(target) { init: ..., cond: ... }
// Analog zu sift, aber mit `self`-Bindung ans target und Rückgabewert (wie im alten
// Regex-Prototyp: transformMold in syntax/control_flow.js).

export function generateMoldStatement (node) {
  let js = `(() => {\n`;
  js += `  let self = ${generate(node.targetExpr)};\n`;

  if (node.init) {
    js += indent(generateBlockStatement(node.init)) + '\n';
  }

  js += `  try {\n`;

  for (const c of node.cases) {
    js += `    if (${generate(c.condition)}) {\n`;
    js += indent(generateBlockStatement(c.body), 3) + '\n';
    js += `    }\n`;
  }

  if (node.catchBlock) {
    js += `  } catch (__err) {\n`;
    js += indent(generateBlockStatement(node.catchBlock)) + '\n';
  } else {
    js += `  } catch (__err) { throw __err; }\n`;
  }

  if (node.finallyBlock) {
    js += `  finally {\n`;
    js += indent(generateBlockStatement(node.finallyBlock)) + '\n';
    js += `  }\n`;
  }

  js += `  return self;\n`;
  js += `})();`;
  return js;
}

export function generateSwitchStatement (node) {
  const isTupleMode = node.discriminants.length > 1;

  if (isTupleMode) {
    const temps = node.discriminants.map((_, i) => `__sw_tmp${i}`);
    const setup = node.discriminants.map((d, i) => `const ${temps[i]} = ${generate(d)};`).join('\n');

    let js = `switch (true) {\n`;
    for (const c of node.cases) {
      const body = c.isBlock ? generateBlockStatement(c.value) : `${generate(c.value)};`;
      if (c.isDefault) js += `  default:\n${indent(body, 2)}\n    break;\n`;
      else {
        const cond = c.keys.map((k, i) => `${temps[i]} === ${generate(k)}`).join(' && ');
        js += `  case ${cond}:\n${indent(body, 2)}\n    break;\n`;
      }
    }
    js += '}';
    return `${setup}\n${js}`;
  }

  const target = generate(node.discriminants[0]);
  let js = `switch (${target}) {\n`;
  for (const c of node.cases) {
    const body = c.isBlock ? generateBlockStatement(c.value) : `${generate(c.value)};`;
    if (c.isDefault) js += `  default:\n${indent(body, 2)}\n    break;\n`;
    else {
      for (const key of c.keys) js += `  case ${generate(key)}:\n`;
      js += `${indent(body, 2)}\n    break;\n`;
    }
  }
  js += '}';
  return js;
}

// :::::: try/catch/finally
// Standalone-Try (weder catch noch finally) -> automatischer Silent Fail via 'catch {}',
// exakt wie im alten Regex-Compiler.
export function generateTryStatement (node) {
  let js = `try {\n${indent(generateBlockStatement(node.block))}\n}`;

  if (node.handler) {
    const param = node.handlerParam ? ` (${node.handlerParam})` : '';
    js += ` catch${param} {\n${indent(generateBlockStatement(node.handler))}\n}`;
  } else if (!node.finalizer) {
    js += ` catch {}`;
  }

  if (node.finalizer) js += ` finally {\n${indent(generateBlockStatement(node.finalizer))}\n}`;

  return js;
}

export function generateWhileStatement (node) {
  if (node.test.type === 'AsBindingExpression') {
    const { expr, name } = node.test;

    let inner = `while ((__as_tmp = ${generate(expr)})) {\n`;
    inner += `  let ${name} = __as_tmp;\n`;
    inner += indent(generateBlockStatement(node.body)) + '\n';
    inner += `}`;

    return `{\n  let __as_tmp;\n${indent(inner)}\n}`;
  }

  return `while (${generate(node.test)}) {\n${indent(generateBlockStatement(node.body))}\n}`;
}
