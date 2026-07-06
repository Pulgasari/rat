// @ratscript/compiler/syntax/match.js

//const matchRegex = /match\s*\((.+?)\)\s*\{([\s\S]+?)\}/g;
const matchRegex = /\bmatch(?:\s*\((.+?)\))?\s*\{([\s\S]+?)\}/g;
const  caseRegex = /(default|[^:]+)\s*:\s*(\{[\s\S]*?\}|[^,\n;]+)/g;
const tupleRegey = /^\s*\(.+?\)\s*:/m;

export default function transform (code) {
  
  
  code = code.replace(matchRegex, (match, condition, body) => {
    let caseMatch;
    let isAsync      = body.includes('await');
    let isTupleMatch = tupleRegex.test(body);
    let switchCases  = '';
    
    if (isTupleMatch && condition) {
      let exprs = condition.split(',').map(e => e.trim());
      let temps = exprs.map((_, i) => `__mt_tmp${i}`);
      let setup = exprs.map((expr, i) => `const ${temps[i]} = ${expr};`).join(' ');

      while ((caseMatch = caseRegex.exec(body)) !== null) {
        let   keyPart = caseMatch[1].trim();
        let valuePart = caseMatch[2].trim();
        if (valuePart.endsWith(',')) valuePart = valuePart.slice(0, -1).trim();

        if (keyPart === 'default') {
          switchCases += `    default: return typeof ${valuePart} === 'function' ? (${valuePart})() : ${valuePart};\n`;
        } else {
          const vals = keyPart.replace(/^\(|\)$/g, '').split(',').map(v => v.trim());
          let condPair = [];
          for (let i = 0; i < temps.length; i++) {
            condPair.push(`${temps[i]} === ${vals[i]}`);
          }
          switchCases += `    case ${condPair.join(' && ')}: return ${valuePart};\n`;
        }
    }

    if (isAsync) {
        return `await (async () => {\n  ${setup}\n  switch (true) {\n${switchCases}  }\n})()`;
      } else {
        return `(() => {\n  ${setup}\n  switch (true) {\n${switchCases}  }\n})()`;
      }
    }

    // --- Standard Match Fallback ---
    while ((caseMatch = caseRegex.exec(body)) !== null) {
      const keyPart = caseMatch[1].trim();
      let valuePart = caseMatch[2].trim();
      if (valuePart.endsWith(',')) valuePart = valuePart.slice(0, -1).trim();

      if (keyPart === 'default') {
        switchCases += `    default: return typeof ${valuePart} === 'function' ? (${valuePart})() : ${valuePart};\n`;
      } else {
        if (condition) {
          switchCases += `    case ${keyPart}: return ${valuePart};\n`;
        } else {
          switchCases += `    case typeof ${keyPart} === 'function' ? ${keyPart}() : ${keyPart}: return ${valuePart};\n`;
        }
      }
    }

    const switchTarget = condition ? condition : 'true';
    if (isAsync) {
      return `await (async () => {\n  switch (${switchTarget}) {\n${switchCases}  }\n})()`;
    } else {
      return `(() => {\n  switch (${switchTarget}) {\n${switchCases}  }\n})()`;
    }
  };

  return code;
};
