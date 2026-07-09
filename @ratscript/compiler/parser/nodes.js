// @ratscript/compiler/parser/nodes.js

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
