// @ratscript/compiler/generator/helpers.js

export function indent (code, level = 1) {
  const pad = '  '.repeat(level);
  return code
    .split('\n')
    .map(line => line.length ? pad + line : line)
    .join('\n');
}

function wrapInIIFE (code) {
 return `(() => {\n` + code + `})();`;
}

export const iife = (code) => `(() => {\n` + code + `})();`;
