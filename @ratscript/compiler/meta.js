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
  'Type',
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
  'mold',
  'new',
  'of',
  'proxy',
  'return',
  'sift',
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
  // assignment (lowest precedence)
  '='    : { precedence: 1, associativity: 'right' },
  '+='   : { precedence: 1, associativity: 'right' },
  '-='   : { precedence: 1, associativity: 'right' },
  '*='   : { precedence: 1, associativity: 'right' },
  '/='   : { precedence: 1, associativity: 'right' },
  '%='   : { precedence: 1, associativity: 'right' },
  '<<='  : { precedence: 1, associativity: 'right' },
  '>>='  : { precedence: 1, associativity: 'right' },
  '>>>=' : { precedence: 1, associativity: 'right' },
  '&='   : { precedence: 1, associativity: 'right' },
  '^='   : { precedence: 1, associativity: 'right' },
  '|='   : { precedence: 1, associativity: 'right' },

  //
  '|>' : { precedence: 2, associativity: 'left' }, // Pipe
  '..' : { precedence: 7, associativity: 'left' }, // Range (wie Vergleich)

  // logical OR
  '||' : { precedence: 4, associativity: 'left' },

  // logical AND
  '&&' : { precedence: 5, associativity: 'left' },

  // nullish
  '??' : { precedence: 6, associativity: 'left' },

  // equality
  'is'  : { precedence: 7, associativity: 'left' }, // Dein Dialekt
  '===' : { precedence: 7, associativity: 'left' },
  '!==' : { precedence: 7, associativity: 'left' },
  '=='  : { precedence: 7, associativity: 'left' },
  '!='  : { precedence: 7, associativity: 'left' },

  // relational
  '<'          : { precedence: 8, associativity: 'left' },
  '>'          : { precedence: 8, associativity: 'left' },
  '<='         : { precedence: 8, associativity: 'left' },
  '>='         : { precedence: 8, associativity: 'left' },
  'in'         : { precedence: 8, associativity: 'left' },
  'inc'        : { precedence: 8, associativity: 'left' },
  'instanceof' : { precedence: 8, associativity: 'left' },

  // bitwise shifts
  '<<'  : { precedence: 9, associativity: 'left' },
  '>>'  : { precedence: 9, associativity: 'left' },
  '>>>' : { precedence: 9, associativity: 'left' },

  // additive
  '+' : { precedence: 12, associativity: 'left' },
  '-' : { precedence: 12, associativity: 'left' },

  // multiplicative
  '*' : { precedence: 13, associativity: 'left' },
  '/' : { precedence: 13, associativity: 'left' },
  '%' : { precedence: 13, associativity: 'left' },

  // unary (highest)
  '!'      : { precedence: 15, associativity: 'right' },
  '~'      : { precedence: 15, associativity: 'right' },
  'typeof' : { precedence: 15, associativity: 'right' },
  'void'   : { precedence: 15, associativity: 'right' },
  'delete' : { precedence: 15, associativity: 'right' },
  'unary+' : { precedence: 15, associativity: 'right' },
  'unary-' : { precedence: 15, associativity: 'right' },
};

export const puncts = '()[]{}.:,;?#|'.split('');

export const runtimeImports = {
  // Builtins
  'Enum'  : { token: 'Enum',  from: 'builtin/Enum.js'  },
  'List'  : { token: 'List',  from: 'builtin/List.js'  },
  'Trait' : { token: 'Trait', from: 'builtin/Trait.js' },
  'Tuple' : { token: 'Tuple', from: 'builtin/Tuple.js' },
  'Type'  : { token: 'Type',  from: 'builtin/Type.js'  },
  'Union' : { token: 'Union', from: 'builtin/Union.js' },
  
  // Helpers
  '_assign' : { token: '_assign', from: 'index.js' },
  '_fn'     : { token: '_fn',     from: 'index.js' },
  '_inc'    : { token: '_inc',    from: 'index.js' },
  '_is'     : { token: '_is',     from: 'index.js' },
  '_proxy'  : { token: '_proxy',  from: 'index.js' },
};

export const TokenType = {
  EOF        : 'EOF', // 'end of line'
  IDENTIFIER : 'IDENTIFIER',
  KEYWORD    : 'KEYWORD',
  NUMBER     : 'NUMBER',
  OPERATOR   : 'OPERATOR',
  PUNCT      : 'PUNCT',
  STRING     : 'STRING',
  TEMPLATE_STRING : 'TEMPLATE_STRING',
};



/*
import { JavaScript } from '@cosmonaut/presets';

export const globals  = JavaScript.globals;
export const literals = JavaScript.literals;
export const puncts   = JavaScript.puncts;
export const builtins = [ ...JavaScript.builtins, 'Enum', 'List', 'Record', 'Struct', 'Tuple', 'Union' ];
export const keywords = [ ...JavaScript.keywords, 'alias', 'enum', 'fn', 'inc', 'is', 'match', 'mold', 'proxy', 'sift', 'struct', 'union', 'use' ];

export const operators = { ...JavaScript.operators,
  // RatScript
  '|>'  : { precedence:  2, associativity: 'left' },
  '..'  : { precedence:  7, associativity: 'left' },
  'is'  : { precedence:  7, associativity: 'left' },
  'inc' : { precedence: 15, associativity: 'right' },
};

export const runtimeHelpers = {
  '_assign' : { token: '_assign', from: './../runtime/index.js' },
  '_fn'     : { token: '_fn',     from: './../runtime/index.js' },
  '_inc'    : { token: '_inc',    from: './../runtime/index.js' },
  '_is'     : { token: '_is',     from: './../runtime/index.js' },
  '_proxy'  : { token: '_proxy',  from: './../runtime/index.js' }
};

export const TokenType = {
  EOF        : 'EOF', // 'end of line'
  IDENTIFIER : 'IDENTIFIER',
  KEYWORD    : 'KEYWORD',
  NUMBER     : 'NUMBER',
  OPERATOR   : 'OPERATOR',
  PUNCT      : 'PUNCT',
  STRING     : 'STRING',
  TEMPLATE_STRING : 'TEMPLATE_STRING',
};
*/
