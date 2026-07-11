// @ratscript/compiler/parser/nodes.js

// :::::: DECLARATIONS

AliasDeclaration = {
  type: 'AliasDeclaration',
  args: {
    name     : { required: true },  // der neue Name
    source   : { required: true },  // Expression, auf die aliased wird
    autoBind : { default: false }   // true nur bei 'as'-Form mit Member-Chain (database.users.save)
  }
},

FunctionDeclaration = {
  type: 'FunctionDeclaration',
  args: {
    name   : {},
    params : {},
    traits : {},
    body   : {},
  }
},
 
TraitDeclaration = {
  type: 'TraitDeclaration',
  args: {
    name : {},
    body : {},
  }
},

VariableDeclaration = {
  type: 'VariableDeclaration',
  args: {
    kind: { required: true }, // 'let' | 'const' | 'var'
    id:   { required: true }, // Identifier | ObjectPattern
    init: { default: null }
  }
},

// :::::: EXPRESSION

AsBindingExpression = {
  type: 'AsBindingExpression',
  args: ['expr', 'name']
  // nur gültig als 'test' von IfStatement/WhileStatement
},

CallExpression = {
  type: 'CallExpression', 
  args: ['callee', 'args', 'namedArgs'],
},

MemberExpression = {
  type: 'MemberExpression',
  args: ['object', 'property']
  // property: einfacher String-Name der Property (nur '.'-Zugriff, kein '[...]' bisher)
},

RangeExpression = {
  type: 'RangeExpression',
  args: ['from', 'to']
},

TraitUseExpression = {
  type: 'TraitUseExpression',
  args: ['expression', 'traitName']
},

// :::::: STATEMENTS
  
BlockStatement = {
  type: 'BlockStatement',
  args: ['body']
},

ExpressionStatement = {
  type: 'ExpressionStatement',
  args: ['expression']
},

IfStatement = {
  type: 'IfStatement',
  args: {
    test:       { required: true }, // Expression | AsBindingExpression
    consequent: { required: true }, // BlockStatement
    alternate:  { default: null }   // BlockStatement | IfStatement | null
  }
},
  
ForStatement = {
  type: 'ForStatement',
  args: ['initializer', 'isNaked', 'body']
},

MoldStatement = {
  type: 'MoldStatement',
  args: {
    target: { required: true },
    init: { default: null },
    cases: { required: true },
    catchBlock: { default: null },
    finallyBlock: { default: null }
  }
},

SiftStatement = {
  type: 'SiftStatement', 
  args: ['init', 'cases', 'catchBlock', 'finallyBlock'],
},

WhileStatement = {
  type: 'WhileStatement',
  args: { test: {required:true}, body: {required:true} }
},
  
// ::::::

Expression = {
  type: 'Expression', 
  args: ['value'],
},
  
Identifier = {
  type: 'Identifier', 
  args: ['name'],
},

Literal = {
  type: 'Literal', 
  args: ['kind','value'],
},

Program: {
  type: 'Program',
  args: { 
    body: { required: true } 
  }
},

// :::::: PATTERNS

ObjectPattern = {
  type: 'ObjectPattern',
  args: ['properties']
  // properties: Array<{ key: string, value: string }>
  // key === value ohne Alias; sonst 'x as y' -> { key: 'x', value: 'y' }
},










export function createSiftStatement(init, cases, catchBlock, finallyBlock) {
  return {
    type: 'SiftStatement',
    init,
    cases,
    catchBlock,
    finallyBlock
  };
}

export function createMoldStatement(target, init, cases, catchBlock, finallyBlock) {
  return {
    type: 'MoldStatement',
    target,
    init,
    cases,
    catchBlock,
    finallyBlock
  };
}
