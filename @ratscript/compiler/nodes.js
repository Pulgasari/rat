// @ratscript/compiler/parser/nodes.js

export const

// :::::: DECLARATIONS

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

// :::::: EXPRESSION

RangeExpression = {
  type: 'RangeExpression',
  args: ['from', 'to']
},
 
// :::::: STATEMENTS
  
BlockStatement = {
  type: 'BlockStatement',
  args: ['body']
},

ForStatement = {
  type: 'BlockStatement',
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

// ::::::
  
Program: {
  type: 'Program',
  args: { 
    body: { required: true } 
  }
},




export function createForStatement(initializer, isNaked, body) {
  return { type: 'ForStatement',  };
}

export function createRangeExpression(from, to) {
  return { type: 'RangeExpression', from, to };
}

export function createTraitUseExpression(expression, traitName) {
  return { type: 'TraitUseExpression', expression, traitName };
}

export function createExpressionStatement(expression) {
  return { type: 'ExpressionStatement', expression };
}

export function createIdentifier(name) {
  return { type: 'Identifier', name };
}

export function createLiteral(kind, value) {
  return { type: 'Literal', kind, value };
}

export function createMemberExpression(object, property) {
  return { type: 'MemberExpression', object, property };
}

export function createCallExpression(callee, args) {
  return { type: 'CallExpression', callee, arguments: args };
}

export function createProgram(body) {
  return {
    type: 'Program',
    body
  };
}

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


export function createExpression(value) {
  return {
    type: 'Expression',
    value
  };
}

export function createIdentifier(value) {
  return {
    type: 'Identifier',
    value
  };
}
