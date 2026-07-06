// @ratscript/compiler/syntax/switch.js

const switchRegex = /\bswitch(?:\s*\((.+?)\))?\s*\{([\s\S]+?)\}/g;
const   caseRegex = /(default|[^:]+)\s*:\s*(\{[\s\S]*?\}|[^;\n]+;?)/g;

export default function (code) {
  
  code = code.replace(switchRegex, (match, condition, body) => {
    let switchCases = '';
    let caseMatch;

    while ((caseMatch = caseRegex.exec(body)) !== null) {
      const   keyPart = caseMatch[1].trim();
      const valuePart = caseMatch[2].trim();

      if (keyPart === 'default') {
        switchCases += `  default:\n    ${valuePart}\n    break;\n`;
      } else {
        // Multi-Case via Komma aufsplitten
        const keys = keyPart.split(',').map(k => k.trim());
        let cases = '';
        keys.forEach( key => cases += `  case ${key}:\n` );
        switchCases += `${cases}    ${valuePart}\n    break;\n`;
      }
    }
    
    const switchTarget = condition ? condition : 'true';
    return `switch (${switchTarget}) {\n${switchCases}}`;
  });

  return code;
};
              
