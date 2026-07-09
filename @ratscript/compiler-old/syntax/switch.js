// @ratscript/compiler/syntax/switch.js

const switchRegex = /\bswitch(?:\s*\((.+?)\))?\s*\{([\s\S]+?)\}/g;
const   caseRegex = /(default|[^:]+)\s*:\s*(\{[\s\S]*?\}|[^;\n]+;?)/g;
const  tupleRegex = /^\s*\(.+?\)\s*:/m;

export default function (code) {
  code = code.replace(switchRegex, (match, condition, body) => {
    let switchCases = '';
    let caseMatch;

    // Prüfen, ob es sich um ein Tuple-Switch handelt (Case-Keys starten mit einer Klammer)
    const isTupleSwitch = tupleRegex.test(body);

    if (isTupleSwitch && condition) {
      // 1. Variablen aufteilen (z.B. isBig, myAnimal)
      const exprs = condition.split(',').map(e => e.trim());
      const temps = exprs.map((_, i) => `__sw_tmp${i}`);
      
      // Zwischenspeichern, damit Funktionen darin nicht mehrfach ausgeführt werden (Side-Effect-Schutz)
      let setup = exprs.map((expr, i) => `const __sw_tmp${i} = ${expr};`).join(' ');

      while ((caseMatch = caseRegex.exec(body)) !== null) {
        const   keyPart = caseMatch[1].trim();
        const valuePart = caseMatch[2].trim();

        if (keyPart === 'default') {
          switchCases += `  default:\n    ${valuePart}\n    break;\n`;
        } else {
          // 2. Case-Werte aufteilen (z.B. aus "(true, 'dog')" wird ["true", "'dog'"])
          const vals = keyPart.replace(/^\(|\)$/g, '').split(',').map(v => v.trim());
          
          // 3. Die Bedingungen verknüpfen (__sw_tmp0 === true && __sw_tmp1 === 'dog')
          let condPair = [];
          for (let i = 0; i < temps.length; i++) {
            condPair.push(`${temps[i]} === ${vals[i]}`);
          }
          switchCases += `  case ${condPair.join(' && ')}:\n    ${valuePart}\n    break;\n`;
        }
      }
      return `${setup}\nswitch (true) {\n${switchCases}}`;
    }

    // --- Klassischer Switch-Fallback (wenn kein Tuple genutzt wird) ---
    while ((caseMatch = caseRegex.exec(body)) !== null) {
      const   keyPart = caseMatch[1].trim();
      const valuePart = caseMatch[2].trim();

      if (keyPart === 'default') {
        switchCases += `  default:\n    ${valuePart}\n    break;\n`;
      } else {
        const keys = keyPart.split(',').map(k => k.trim());
        let cases = '';
        keys.forEach(k => { cases += `  case ${k}:\n`; });
        switchCases += `${cases}    ${valuePart}\n    break;\n`;
      }
    }

    const switchTarget = condition ? condition : 'true';
    return `switch (${switchTarget}) {\n${switchCases}}`;
  });

  return code;
};
              
