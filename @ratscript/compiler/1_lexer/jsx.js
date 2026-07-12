// @ratscript/compiler/lexer/jsx.js

export function isJSXStart (source, i) {
  return source[i] === '<' && /[a-zA-Z_$/>]/.test(source[i + 1] ?? '');
}

export function readTagName (source, i) {
  let name = '';
  while (i < source.length && /[a-zA-Z0-9_$.]/.test(source[i])) { name += source[i]; i++; }
  return { name, end: i };
}

// Balanciertes '{'-Skip für Expression-Inseln in JSX (kein '${' wie bei Template-Strings,
// hier ist's rohes '{...}' -> respektiert verschachtelte Strings/Template-Literale/JSX).
export function skipCurlyExpr (source, i) {
  let depth = 1;
  while (i < source.length && depth > 0) {
    const ch = source[i];
    if (ch === "'" || ch === '"') { i = skipStringLiteral(source, i, ch); continue; }
    if (ch === '`') { i = skipTemplateLiteral(source, i); continue; }
    if (isJSXStart(source, i)) { i = scanJSXElement(source, i).endCursor; continue; }
    if (ch === '{') { depth++; i++; continue; }
    if (ch === '}') { depth--; i++; continue; }
    i++;
  }
  return i;
}

export function scanJSXElement (source, startCursor) {
  let i = startCursor;
  const segments = [];
  let buffer = '';
  const stack = [];

  const flush = () => { segments.push({ kind: 'string', value: buffer }); buffer = ''; };
  const pushExpr = () => {
    flush();
    const exprStart = i + 1;
    const exprEnd = skipCurlyExpr(source, exprStart) - 1;
    segments.push({ kind: 'expr', tokens: Lexer(source.slice(exprStart, exprEnd)).tokenize() });
    i = exprEnd + 1;
  };

  function readTag () {
    buffer += '<'; i++;
    let isClosing = false;
    if (source[i] === '/') { isClosing = true; buffer += '/'; i++; }

    const { name, end } = readTagName(source, i);
    buffer += name; i = end;

    if (isClosing) {
      while (i < source.length && source[i] !== '>') { buffer += source[i]; i++; }
      buffer += '>'; i++;
      stack.pop();
      return { closingRoot: stack.length === 0 };
    }

    let selfClosing = false;
    while (i < source.length) {
      if (source[i] === '{') { pushExpr(); continue; }
      if (source[i] === '"' || source[i] === "'") {
        const start = i; i = skipStringLiteral(source, i, source[i]); buffer += source.slice(start, i); continue;
      }
      if (source[i] === '/' && source[i + 1] === '>') { selfClosing = true; buffer += '/>'; i += 2; break; }
      if (source[i] === '>') { buffer += '>'; i++; break; }
      buffer += source[i]; i++;
    }

    if (!selfClosing) stack.push(name);
    return { closingRoot: false };
  }

  readTag();
  while (stack.length > 0 && i < source.length) {
    if (source[i] === '<') {
      const { closingRoot } = readTag();
      if (closingRoot) break;
      continue;
    }
    if (source[i] === '{') { pushExpr(); continue; }
    buffer += source[i]; i++;
  }

  flush();
  return { segments, endCursor: i };
}
