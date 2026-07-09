// @ratscript/compiler/syntax/fn.js

import { keywords } from './../meta.js';

export default function (code) {
  code = transformFnDeclarations (code);
  code = transformFnCalls        (code);
  return code;
}

function transformFnDeclarations (code) {
  let pos = 0;
  
  while (true) {
    // Finde das nächste 'fn' gefolgt von Name und Klammern
    const match = code.slice(pos).match(/\bfn\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*\{/);
    if (!match) break;

    const fnIndex  = pos + match.index;
    const funcName = match[1];
    const argsStr  = match[2];
    
    let startOfBody = fnIndex + match[0].length;
    let depth = 1;
    let endOfBody = startOfBody;

    // Klammer-Tiefe tracken, um das exakte Ende der Funktion zu finden
    while (endOfBody < code.length && depth > 0) {
      if (code[endOfBody] === '{') depth++;
      else if (code[endOfBody] === '}') depth--;
      endOfBody++;
    }
    
    // Den echten Body-Inhalt heraustrennen
    const bodyContent = code.slice(startOfBody, endOfBody - 1);

    // Parameternamen isolieren (Default-Werte wie '= 10' vorher abschneiden)
    const paramNames = argsStr.split(',').map(p => {
      const clean = p.trim().split('=')[0].trim();
      return clean.match(/^[a-zA-Z0-9_$]+/)?.[0];
    }).filter(Boolean);

    // Erzeuge den sauberen JS-Output mit dem Runtime-Wrapper
    const paramArrayStr = JSON.stringify(paramNames); // Macht daraus ['param1', 'param2']
    const replacement   = `const ${funcName} = _fn(function(${argsStr}) {\n${bodyContent}\n}, ${paramArrayStr});`;
    
    code = code.slice(0, fnIndex) + replacement + code.slice(endOfBody);
    pos  = fnIndex + replacement.length;
  }
  
  return code;
}

function transformFnCalls (code) {
  const funcCallRegex  = /([a-zA-Z0-9_$]+)\s*\(([^)]*)\)/g;

  code = code.replace(funcCallRegex, (match, funcName, body) => {
    // Ignorieren, wenn es sich um Kontrollstrukturen statt Funktionen handelt
    if (keywords.includes(funcName)) return match;

    const trimmedBody = body.trim();
    
    // Erkennt Named Arguments (Key gefolgt von Doppelpunkt, aber kein normales Objekt)
    if (/^[a-zA-Z0-9_$]+\s*:/ .test(trimmedBody) && !trimmedBody.startsWith('{')) {
      return `${funcName}({ __isNamed: true, ${body} })`;
    }
    
    return match;
  });

  return code;
}
