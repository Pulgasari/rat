// @ratscript/compiler/meta.js

import { buildTokenTypes } from '@cosmonaut/parser';
import { javascript }      from '@cosmonaut/presets';

export const globals  = javascript.globals;
export const literals = javascript.literals;
export const puncts   = javascript.puncts;
export const builtins = [ ...javascript.builtins, 'Enum', 'List', 'Record', 'Struct', 'Trait', 'Tuple', 'Type', 'Union' ];
export const keywords = [ ...javascript.keywords, 'alias', 'enum', 'fn', 'inc', 'is', 'match', 'mold', 'proxy', 'sift', 'struct', 'union', 'use' ];
export const puncts   = '()[]{}.:,;?#|'.split('');

export const operators = {
  ...JavaScript.operators,
  
  // RatScript
  '|>'     : { precedence:  2, associativity: 'left'  },
  '..'     : { precedence:  7, associativity: 'left'  },
  'is'     : { precedence:  7, associativity: 'left'  },
  'inc'    : { precedence:  8, associativity: 'left'  },
  'unary+' : { precedence: 15, associativity: 'right' },
  'unary-' : { precedence: 15, associativity: 'right' },
};

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

  // Vendors
  'html' : { token: 'html', from: 'htm/preact' }, // HTM
};

export const TokenType = {
  EOF             : 'EOF', // 'end of line'
  IDENTIFIER      : 'IDENTIFIER',
  KEYWORD         : 'KEYWORD',
  NUMBER          : 'NUMBER',
  OPERATOR        : 'OPERATOR',
  PUNCT           : 'PUNCT',
  STRING          : 'STRING',
  TEMPLATE_STRING : 'TEMPLATE_STRING',
  JSX_TEMPLATE    : 'JSX_TEMPLATE',
};
