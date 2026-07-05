// @ratscript/compiler/syntax/import_statement.js

export default function (code) {
  const importRegex = /import\s+from\s+(['"`])(.+?)\1\s+use\s+([\s\S]+?)\s*;/g;
  
  code = code.replace(importRegex, (match, quote, path, target) => {
    return `import ${target.trim()} from '${path}';`;
  });

  return code;
};
