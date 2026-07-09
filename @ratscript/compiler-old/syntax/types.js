// @ratscript/compiler/syntax/types.js

export default function (code) {
  code = transformList   (code);
  code = transformStruct (code);
  code = transformTrait  (code);
  code = transformTuple  (code);
  code = transformUnion  (code);
  return code;
}

// RegExp
const      structRegex = /\bstruct\s+([a-zA-Z0-9_$]+)\s*(\{[\s\S]+?\})/g;
const taggedUnionRegex = /\bunion\s+([a-zA-Z0-9_$]+)\s*\{([\s\S]+?)\}/g;

// #[1, 2, 3]      -> new List(1, 2, 3)
// #['dog', 'cat'] -> new List('dog', 'cat')
function transformList (code) {
  return code.replace(/#\[([\s\S]*?)\]/g, 'new List($1)');
}

//
function transformStruct (code) {
  return code.replace(structRegex, (match, name, body) => {
    return `const ${name} = new Struct(${body});`;
  });
}

// #(1, 'cat', true) -> new Tuple(1, 'cat', true)
function transformTuple (code) {
  return code.replace(/#\(([\s\S]*?)\)/g, 'new Tuple($1)');
}

// union Response { Loading, Success(payload) } -> const Response = new Union('Response', { Loading: [], Success: ['payload'] });
function transformUnion (code) {
  
  code = code.replace(taggedUnionRegex, (match, unionName, body) => {
    const variants = body.split(',').map(v => v.trim()).filter(Boolean);
    let defEntries = [];
    
    variants.forEach(variant => {
      // Zerlegt "Success(payload)" in Name und Parameter
      const funcMatch = variant.match(/^([a-zA-Z0-9_$]+)(?:\(([^)]*)\))?$/);
      if (funcMatch) {
        const varName = funcMatch[1];
        // Wenn Parameter existieren, machen wir Strings daraus: ['payload'], sonst []
        const params = funcMatch[2] 
          ? funcMatch[2].split(',').map(p => `'${p.trim()}'`).join(', ') 
          : '';
        defEntries.push(`  ${varName}: [${params}]`);
      }
    });

    //
    return `const ${unionName} = new Union('${unionName}', {\n${defEntries.join(',\n')}\n});`;
  });

  return code;
}

// packages/compiler/syntax/trait.js

/**
 * Transformiert RatScript Traits in lauffähiges JavaScript mit der Runtime-Klasse.
 * 1. trait Name { ... }         -> const Name = new Trait('Name', () => ({ ... }));
 * 2. fn/class Name use Trait    -> Extrahiert 'use' und hängt Trait.apply(Name) hinten an.
 * 3. { obj } use Trait          -> Trait.apply({ obj })
 */
export default function transformTrait (code) {
  
  // ==========================================
  // 1. TRAIT-DEFINITIONEN (trait Name { ... })
  // ==========================================
  let pos = 0;
  while (true) {
    const match = code.slice(pos).match(/\btrait\s+([a-zA-Z0-9_$]+)\s*\{/);
    if (!match) break;

    const traitIndex = pos + match.index;
    const traitName  = match[1];
    
    let startOfBody = traitIndex + match[0].length;
    let depth       = 1;
    let endOfBody   = startOfBody;

    while (endOfBody < code.length && depth > 0) {
           if (code[endOfBody] === '{') depth++;
      else if (code[endOfBody] === '}') depth--;
      endOfBody++;
    }

    const bodyContent = code.slice(startOfBody, endOfBody - 1);
    // Erzeugt die sichere Factory-Funktion im Runtime-Constructor
    const replacement = `const ${traitName} = new Trait('${traitName}', () => ({${bodyContent}}));`;

    code = code.slice(0, traitIndex) + replacement + code.slice(endOfBody);
    pos = traitIndex + replacement.length;
  }

  // ==========================================
  // 2. DEKLARATIONS-ANWENDUNGEN (fn/class Name use Trait)
  // ==========================================
  // Muss VOR den normalen fn/class-Parsern laufen, um die Signatur zu säubern!
  pos = 0;
  while (true) {
    const match = code.slice(pos).match(/\b(fn|class)\s+([a-zA-Z0-9_$]+)(?:\s*\(([^)]*)\))?\s*use\s+([a-zA-Z0-9_$]+)\s*\{/);
    if (!match) break;

    const matchIndex = pos + match.index;
    const keyword    = match[1];
    const name       = match[2];
    const args       = match[3] ? `(${match[3]})` : '';
    const traitName  = match[4];

    // Säubert die Signatur für nachfolgende Compiler-Schritte
    const cleanHeader = `${keyword} ${name}${args} {`;
    let startOfBody = matchIndex + match[0].length;
    let depth = 1;
    let endOfBody = startOfBody;

    while (endOfBody < code.length && depth > 0) {
      if (code[endOfBody] === '{') depth++;
      else if (code[endOfBody] === '}') depth--;
      endOfBody++;
    }

    const body = code.slice(startOfBody, endOfBody); // Inklusive schließender Klammer '}'
    const replacement = `${cleanHeader}${body}\n${traitName}.apply(${name});`;
    
    code = code.slice(0, matchIndex) + replacement + code.slice(endOfBody);
    pos = matchIndex + replacement.length;
  }

  // ==========================================
  // 3. INLINE-EXPRESSIONS ({ token: "xyz" } use Trait)
  // ==========================================
  pos = 0;
  while (true) {
    const match = code.slice(pos).match(/\buse\s+([a-zA-Z0-9_$]+)/);
    if (!match) break;

    const useIndex  = pos + match.index;
    const traitName = match[1];
    const endOfUse  = useIndex + match[0].length;

    // Wir scannen vom 'use' rückwärts, um den linken Ausdruck (Expression) zu finden
    let scanIdx = useIndex - 1;
    while (scanIdx >= 0 && /\s/.test(code[scanIdx])) {
      scanIdx--; // Whitespace überspringen
    }

    let exprStart = 0;
    if (code[scanIdx] === '}') {
      // Es ist ein Objekt-Literal! Klammern rückwärts matchen
      let depth = 1;
      scanIdx--;
      while (scanIdx >= 0 && depth > 0) {
        if (code[scanIdx] === '}') depth++;
        else if (code[scanIdx] === '{') depth--;
        scanIdx--;
      }
      exprStart = scanIdx + 1;
    } else {
      // Es ist eine einfache Variable (z.B. session use Identifiable)
      while (scanIdx >= 0 && /[a-zA-Z0-9_$]/.test(code[scanIdx])) {
        scanIdx--;
      }
      exprStart = scanIdx + 1;
    }

    const expression  = code.slice(exprStart, useIndex).trim();
    const replacement = `${traitName}.apply(${expression})`;

    code = code.slice(0, exprStart) + replacement + code.slice(endOfUse);
    pos = exprStart + replacement.length;
  }

  return code;
}
