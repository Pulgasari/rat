// @ratscript/compiler/syntax/sift.js

export default function (code) {
  // Matcht sift { ... }
  const siftRegex = /\bsift\s*\{([\s\S]*?)\}/g;

  return code.replace(siftRegex, (match, content) => {
    const { initCode, catchBlock, finallyCode, bodyCode } = parseBlockContent(content);

    return `(() => {
${initCode}  try {
${bodyCode}  } ${catchBlock || 'catch(__err) { throw __err; }'} ${finallyCode ? `finally {\n${finallyCode}  }` : ''}
})()`;
  });
}

/**
 * Hilfsfunktion: Teilt den Block deklarativ in seine Lebenszyklus-Phasen auf.
 * Funktioniert über eine Key-Value-Erkennung am Doppelpunkt.
 */
export function parseBlockContent (content) {
  let initCode    = '';
  let catchBlock  = '';
  let finallyCode = '';
  let bodyCode    = '';

  // Erkennt: 'schlüssel : aktion' (wobei aktion ein Block {..} oder ein Einzeiler sein kann)
  const entryRegex = /(init|finally|catch\s*\([^)]+\)|[^:{]+)\s*:\s*({[\s\S]*?}|[^;\n]+;?)/g;
  let match;

  while ((match = entryRegex.exec(content)) !== null) {
    const key    = match[1].trim();
    const action = match[2].trim();

    if (key === 'init') {
      initCode += `  ${action}\n`;
    } else if (key === 'finally') {
      finallyCode += `    ${action}\n`;
    } else if (key.startsWith('catch')) {
      // Macht aus catch(err) -> catch (err)
      catchBlock = `catch ${key.slice(5).trim()} ${action}`;
    } else {
      // Eine ganz normale Bedingung wird zum sequentiellen if
      bodyCode += `    if (${key}) ${action}\n`;
    }
  }

  return { initCode, catchBlock, finallyCode, bodyCode };
}
