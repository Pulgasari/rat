// @ratscript/compiler/syntax/alias.js

export function default (code) {
  code = transformAlias (code);
  code = transformAs    (code);
  return code;
}

const         aliasRegex = /\balias\s+([a-zA-Z0-9_$.]+)\s+as\s+([a-zA-Z0-9_$]+);?/g;
const destructuringRegex = /\b(const|let|var)\s*\{([\s\S]+?)\}\s*=/g;
const          condRegex = /\b(if|else\s+if|while)\s*\(([^)]+?)\)\s*(\{[\s\S]*?\}|[^;\n]+;?)/g;
const       innerAsRegex = /([^&|=<>!]+?)\s+as\s+([a-zA-Z0-9_$]+)/g;

function transformAlias (code) {
  return code.replace(aliasRegex, 'const $2 = $1;');
}

function transformAs (code) {
  let hasAsTmp = false;

  // ===================
  // Destructuring Alias
  // ===================
  code = code.replace(destructuringRegex, (match, declaration, content) => {
    const transformedContent = content.replace(/\b([a-zA-Z0-9_$]+)\s+as\s+([a-zA-Z0-9_$]+)\b/g, '$1: $2');
    return `${declaration} {${transformedContent}} =`;
  });

  // ==========================================
  // Strict Block-Scoped Conditional Binding (if / else if / while)
  // ==========================================
  code = code.replace(condRegex, (match, type, condition, body) => {
    if (!condition.includes(' as ')) return match;

    hasAsTmp = true;
    let varName = '';
    
    // 1. Bedingung umschreiben: animal.name as n -> (__as_tmp = animal.name)
    const newCondition = condition.replace(innerAsRegex, (m, expr, name) => {
      varName = name;
      return `(__as_tmp = ${expr.trim()})`;
    });

    // 2. Body anpassen und das let n genau dort hineininjizieren
    let newBody = body.trim();
    newBody = newBody.startsWith('{')
      ? '{\n  let ' + varName + ' = __as_tmp;\n  ' + newBody.slice(1)
      : newBody.endsWith(';')
        ? `{\n  let ${varName} = __as_tmp;\n  ${newBody}\n}`
        : `{\n  let ${varName} = __as_tmp;\n  ${newBody};\n}`;
    
    return `${type} (${newCondition}) ${newBody}`;
  });

  //
  if (hasAsTmp) code = `let __as_tmp;\n\n` + code;

  return code;
};
