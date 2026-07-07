// packages/compiler/syntax/as.js

const destructuringRegex = /\b(const|let|var)\s*\{([\s\S]+?)\}\s*=/g;
const          ifAsRegex = /\bif\s*\((.+?)\s+as\s+([a-zA-Z0-9_$]+)\)\s*(\{[\s\S]*?\}|[^;\n]+;?)(?:\s*else\s*(\{[\s\S]*?\}|[^;\n]+;?))?/g;

export default function (code) {
  
  // ==========================================
  // Destructuring Alias: const { something as sth } = namespace;
  // ==========================================
  code = code.replace(destructuringRegex, (match, declaration, content) => {
    const transformed = content.replace(/\b([a-zA-Z0-9_$]+)\s+as\s+([a-zA-Z0-9_$]+)\b/g, '$1: $2');
    return `${declaration} {${transformed}} =`;
  });

  // ==========================================
  // Conditional Binding: if (animal.name as n) ... [optional else]
  // ==========================================
  // Erkennt das 'as n' im if und fängt den Rumpf (und ein optionales else) ab
  code = code.replace(ifAsRegex, (match, expr, varName, ifBody, elseBody) => {
    let result = `{\n  let ${varName} = ${expr};\n  if (${varName}) ${ifBody.trim()}`;
    result += elseBody ? ` else ${elseBody.trim()}` : `\n}`;
    return result;
  });

  return code;
}
