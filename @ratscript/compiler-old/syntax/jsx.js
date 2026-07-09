// packages/compiler/syntax/jsx.js

/**
 * Expandiert den RatScript Custom-Sugar für Multi-Attribute.
 * Beispiel: [id, name]="test" -> id="test" name="test"
 * Beispiel: [id, name]={$test} -> id={$test} name={$test}
 */
function expandCustomSugar (code) {
  // 1. Für String-Werte: [id, name]="test"
  code = code.replace(/\[([a-zA-Z0-9_\s,]+)\]\s*=\s*(["'])(.*?)\2/g, (match, attrs, quote, value) => {
    const attrList = attrs.split(',').map(a => a.trim());
    return attrList.map(attr => `${attr}=${quote}${value}${quote}`).join(' ');
  });

  // 2. Für Expressions/Signale: [id, name]={$test}
  code = code.replace(/\[([a-zA-Z0-9_\s,]+)\]\s*=\s*\{([^}]+)\}/g, (match, attrs, expr) => {
    const attrList = attrs.split(',').map(a => a.trim());
    return attrList.map(attr => `${attr}={${expr}}`).join(' ');
  });

  return code;
}

/**
 * Findet das exakte, balancierte Ende eines Root-JSX-Elements,
 * um fehlerfrei mit verschachtelten Tags gleichen Namens umzugehen.
 */
function findMatchingClosingTag (code, start) {
  const tagNameMatch = code.slice(start + 1).match(/^[a-zA-Z0-9_]+/);
  if (!tagNameMatch) return -1;
  const tagName = tagNameMatch[0];
  
  // Falls das Root-Tag direkt self-closing ist: <MyComponent />
  const endOfOpenTag = code.indexOf('>', start);
  if (endOfOpenTag === -1) return -1;
  if (code[endOfOpenTag - 1] === '/') return endOfOpenTag + 1;
  
  let depth = 1;
  let pos = endOfOpenTag + 1;
  
  // Findet entweder ein weiteres öffnendes oder das passende schließende Tag
  const searchRegex = new RegExp(`(<${tagName}(?:\\s|/|>))|(</${tagName}\\s*>)`, 'g');
  searchRegex.lastIndex = pos;
  
  let match;
  while ((match = searchRegex.exec(code)) !== null) {
    if (match[1]) {
      // Inneres öffnendes Tag gefunden. Prüfen, ob es self-closing ist
      const innerEnd = code.indexOf('>', match.index);
      if (code[innerEnd - 1] !== '/') {
        depth++;
      }
    } else if (match[2]) {
      // Schließendes Tag gefunden
      depth--;
      if (depth === 0) {
        return match.index + match[0].length;
      }
    }
  }
  return -1;
}

function convertJsxToHtm (block) {
  // ComponentTags
  block = block.replace(/<([A-Z][a-zA-Z0-9_]*)/g, '<\\${$1}');         // Opening Tags: <MyComponent -> <${MyComponent}
  block = block.replace(/<\/([A-Z][a-zA-Z0-9_]*)\s*>/g, '</\\${$1}>'); // Closing Tags: </MyComponent> -> </${MyComponent}>

  // Convert {expr} to ${expr}
  block = block.replace(/\{([^}]+)\}/g, '\\${$1}');

  // pack as tagged template literal 
  return `html\`${block}\``;
}

/**
 * Der RatScript JSX-zu-htm Transformer.
 */
export default function (code) {
  // RatScript JSX Syntax Sugar
  code = expandCustomSugar(code);

  let pos = 0;
  while (true) {
    const start = code.indexOf('<', pos);
    if (start === -1) break;
    
    // Sicherstellen, dass es ein valider Tag-Start ist (und kein mathematisches '<' Zeichen)
    if (!/[a-zA-Z]/.test(code[start + 1])) {
      pos = start + 1;
      continue;
    }
    
    const end = findMatchingClosingTag(code, start);
    if (end === -1) {
      pos = start + 1;
      continue;
    }
    
    const         jsxBlock = code.slice(start, end);
    const transformedBlock = convertJsxToHtm(jsxBlock);
    
    // Code ersetzen und Pointer nach vorne schieben
    code = code.slice(0, start) + transformedBlock + code.slice(end);
    pos  = start + transformedBlock.length;
  }

  return code;
};
