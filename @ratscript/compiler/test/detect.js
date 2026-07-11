
let rules = [
  { node: 'AliasDeclaration', end: ';', pattern: ['alias'] },
  { node: 'CondDeclaration',  end: ';', pattern: ['cond'] },
  { node: 'ImportStatement',  end: ';', pattern: ['import', 'from', 'string', 'use'] },
];

const rules = [
  { name: 'ImportStatement', pattern: ['import','from','string','use'], end: ';', priority: 10 },
];

function compilePattern (pattern) {
  return pattern.map(p => {
    if (p === 'string')     return { type: 'String' };
    if (p === 'identifier') return { type: 'Identifier' };
    if (p === '...')        return { wildcard: true };
    // map keywords/punct
    return theMap[p] || { literal: p };
  });
}

const compiled = rules.map(r => ({ ...r, compiledPattern: compilePattern(r.pattern) }));

function matchAt (tokens, i, compiledPattern) {
  let j = i;
  for (const part of compiledPattern) {
    // skip trivia
    while (tokens[j] && tokens[j].type === 'Trivia') j++;
    const t = tokens[j];
    if (!t) return null;
    if (part.wildcard) { j++; continue; }
    if (part.type  && t.type  === part.type)  { j++; continue; }
    if (part.value && t.value === part.value) { j++; continue; }
    return null;
  }
  return j; // index after match
}

function detectDialect (tokens) {
  const detections = [];
  for (let i = 0; i < tokens.length; i++) {
    for (const rule of compiled.sort((a,b)=>b.priority-a.priority)) {
      const endIdx = matchAt(tokens, i, rule.compiledPattern);
      if (endIdx != null) {
        // find end token (semicolon or EOF)
        let k = endIdx;
        while (k < tokens.length && !(tokens[k].type === 'Punct' && tokens[k].value === rule.end)) k++;
        const endToken = tokens[k] || tokens[tokens.length-1];
        detections.push({
          node: rule.name,
          startIndex: i,
          endIndex: k,
          startOffset: tokens[i].start,
          endOffset: endToken.end
        });
        i = k; // advance outer loop
        break;
      }
    }
  }
  return detections;
}
