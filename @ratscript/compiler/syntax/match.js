// @ratscript/compiler/syntax/match.js

export default function transform (code) {
  
  const matchRegex = /match\s*\((.+?)\)\s*\{([\s\S]+?)\}/g;
  
  code = code.replace(matchRegex, (match, condition, body) => {
    const isAsync = body.includes('await');
    const lines   = body.split('\n');
    let switchCases = '';
    
    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      if (line.endsWith(',')) line = line.slice(0, -1);
      
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      if (key === 'default') {
        switchCases += `    default: return typeof ${value} === 'function' ? (${value})() : ${value};\n`;
      } else {
        switchCases += `    case ${key}: return ${value};\n`;
      }
    }

    return isAsync
      ? `await (async () => {\n  switch (${condition}) {\n${switchCases}  }\n})()`
      : `(() => {\n  switch (${condition}) {\n${switchCases}  }\n})()`;
  });
};
