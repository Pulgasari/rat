// @ratscript/compiler/meta.js

export const builtins = [
  // JavaScript
  'Array',
  'BigInt',
  'Boolean',
  'Date',
  'Error',
  'Function',
  'Map',
  'Number',
  'Object',
  'Promise',
  'RegExp',
  'Set',
  'String',
  'Symbol',
  // RatScript
  'Enum',
  'List',
  'Record',
  'Struct',
  'Tuple',
  'Union',
];

export const globals = [
  'clearInterval',
  'clearTimeout',
  'console',
  'document',
  'globalThis',
  'process',
  'setInterval',
  'setTimeout',
  'window',
];

export const keywords = [
  'alias',
  'as',
  'async',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'cond',
  'const',
  'continue',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'finally',
  'fn',
  'for',
  'function',
  'guard',
  'if',
  'import',
  'in',
  'inc',
  'instanceof',
  'is',
  'let',
  'match',
  'new',
  'proxy',
  'return',
  'static',
  'struct',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'typeof',
  'union',
  'use',
  'var',
  'void',
  'while',
  'yield',
];

export const literals = [
  'false',
  'null',
  'true',
  'undefined',
  'Infinity',
  'NaN',
];

export const operators = {
  '=':   { precedence: 1,  associativity: 'right' },
  '+=':  { precedence: 1,  associativity: 'right' },
  '|>':  { precedence: 2,  associativity: 'left'  }, // Deine Pipe bindet relativ früh
  '||':  { precedence: 4,  associativity: 'left'  },
  '&&':  { precedence: 5,  associativity: 'left'  },
  'is':  { precedence: 7,  associativity: 'left'  }, // RatScript 'is' verhält sich wie ein Vergleich
  '===': { precedence: 7,  associativity: 'left'  },
  '<':   { precedence: 8,  associativity: 'left'  },
  '+':   { precedence: 12, associativity: 'left'  },
  '-':   { precedence: 12, associativity: 'left'  },
  '*':   { precedence: 13, associativity: 'left'  },
  '/':   { precedence: 13, associativity: 'left'  },
  'inc': { precedence: 15, associativity: 'right' }, // Inkrement bindet extrem stark
};

export const runtimeHelpers = {
  '_assign' : { token: '_assign', from: './../runtime/index.js' },
  '_fn'     : { token: '_fn',     from: './../runtime/index.js' },
  '_inc'    : { token: '_inc',    from: './../runtime/index.js' },
  '_is'     : { token: '_is',     from: './../runtime/index.js' },
  '_proxy'  : { token: '_proxy',  from: './../runtime/index.js' }
};



