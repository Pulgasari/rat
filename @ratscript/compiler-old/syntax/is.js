// @ratscript/compiler/syntax/is_operator.js

const isRegex = /([a-zA-Z0-9_$.[\]()]+)\s+\bis\b\s+([^;\n&|]+)/g;

export default function (code) {
  code = code.replace(isRegex, (match, left, rightGreedy) => {
    let parenDepth = 0;
    let braceDepth = 0;
    let cleanRight = '';

    // Wir laufen durch die rechte Seite und stoßen vor, bis wir auf eine schließende 
    // Klammer treffen, die tiefer liegt als das Pattern selbst (z.B. die schließende Klammer des 'if')
    for (let i = 0; i < rightGreedy.length; i++) {
      const char = rightGreedy[i];
      
      if (char === '(') parenDepth++;
      else if (char === ')') {
        parenDepth--;
        if (parenDepth < 0) break; // Gehört zum äußeren Statement (z.B. if-Klammer)! Schleife abbrechen.
      }
      else if (char === '{') braceDepth++;
      else if (char === '}') {
        braceDepth--;
        if (braceDepth < 0) break;
      }
      
      cleanRight += char;
    }

    // Der Rest, der nach dem Pattern abgeschnitten wurde, wird wieder hinten angehängt
    const remainder = rightGreedy.slice(cleanRight.length);
    
    return `_is(${left.trim()}, ${cleanRight.trim()})${remainder}`;
  });

  return code;
};
