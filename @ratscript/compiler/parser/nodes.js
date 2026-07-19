// @ratscript/compiler/parser/nodes.js

// NEW
PipePlaceholder = {},

// the both old/original formats
// (these formats should still work)
AliasDeclaration = [ 'autoBind', 'name', 'source' ];
AliasDeclaration = { autoBind: { default: false }, name: { required: true }, source: { required: true } },    

// the new formats
// `!` means "required: true" and means "default: null"
// and both could be used in combination '?!'
// if sb. notates it as '!?'it should still be understood
// maybe also the position (notated as prefix or suffix) shouldnt matter ???
AliasDeclaration = [ '!autoBind', '?name', '!source' ];
// key/value format could be used to define a default value
AliasDeclaration = [ {'!autoBind': false }, 'name', '!source' ]; // if notated

// Cosmonaut Grammar Notation Syntax | CGNS
NODE AliasDeclaration = !autoBind ?name !source
NODE AliasDeclaration = autoBind name source <> !?!

// OLD

export const

// :::::: PLACEHOLDERS
// transient - taucht nie im finalen AST auf, wird schon beim Parsen aufgelöst

PipePlaceholder = { 
  type: 'PipePlaceholder', 
  args: []
},

// :::::: DECLARATIONS

AliasDeclaration = {
  type: 'AliasDeclaration',
  args: {
    name     : { required: true },  // der neue Name
    source   : { required: true },  // Expression, auf die aliased wird
    autoBind : { default: false }   // true nur bei 'as'-Form mit Member-Chain (database.users.save)
  }
},

ClassDeclaration = {
  type: 'ClassDeclaration',
  args: { 
    name    : {required: true}, 
    methods : {required: true}, 
    traits  : {default: []} 
  }
  // methods: Array<{ name:string, params:string[], body:BlockStatement }>
  // (Constructor ist einfach die Methode mit name === 'constructor')
},

ExportAllDeclaration = { // 'export * [as ns] from ...'
  type: 'ExportAllDeclaration',
  args: { 
    exported : {default: null}, 
    source   : {required: true} 
  }
},
  
ExportDefaultDeclaration = { 
  type: 'ExportDefaultDeclaration', 
  args: ['declaration']
},
  
ExportNamedDeclaration = {
  type: 'ExportNamedDeclaration',
  args: { 
    declaration : {default: null}, 
    specifiers  : {default: []}, 
    source      : {default: null}
  }
  // declaration gesetzt XOR specifiers gesetzt 
  // (declaration = 'export const x=...', specifiers = 'export {a,b} [from ...]')
},
  
FunctionDeclaration = {
  type: 'FunctionDeclaration',
  args: {
    name        : {required: true}, 
    params      : {required: true}, 
    traits      : {default: []},
    body        : {required: true}, 
    isAsync     : {default: false}, 
    isGenerator : {default: false},
  }
},

ImportDeclaration = {
  type: 'ImportDeclaration',
  args: { 
    specifiers : {required: true}, 
    source     : {required:true}
  }
  // specifiers: Array<{kind:'default'|'named'|'namespace', imported?:string, local:string}>
};

// ERSETZT die bisherige (nie fertig implementierte) Version -> body wurde zu properties,
// weil ein Trait-Body kein Statement-Block ist, sondern Objekt-Literal-Syntax
// (comma-getrennte properties/methods, kein Statement-Loop wie bei BlockStatement).
TraitDeclaration = {
  type: 'TraitDeclaration',
  args: { 
    name       : {required: true}, 
    properties : {required: true},
  }
},

UnionDeclaration = {
  type: 'UnionDeclaration',
  args: { 
    name    : {required: true}, 
    members : {required: true} 
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

ArrayExpr = { 
  type: 'ArrayExpr', 
  args: ['elements']
},

AsBindingExpr = {
  type: 'AsBindingExpression',
  args: ['expr', 'name']
  // nur gültig als 'test' von IfStatement/WhileStatement
},

AssignmentExpr = {
  type: 'AssignmentExpr',
  args: ['left', 'right']
},

AwaitExpr = { 
  type: 'AwaitExpr', 
  args: ['argument'] 
},

BinaryExpr = {
  type: 'BinaryExpr', 
  args: ['operator', 'left', 'right']
},
  
CallExpr = {
  type: 'CallExpr', 
  args: ['callee', 'args', 'namedArgs'],
},

CompoundAssignmentExpr = {
  type: 'CompoundAssignmentExpr',
  args: ['operator', 'left', 'right']
  // operator: '+=' | '-=' | '*=' | ... (aktuell hat nur '+=' echte Laufzeit-Semantik im Generator)
},

IncExpr = { // TODO: rename to 'in' ?
  type: 'IncExpr', 
  args: ['left','right']
};

IsExpr  = {
  type: 'IsExpr',
  args: ['left','right']
};

ListExpr  = { 
  type: 'ListExpr',  
  args: ['elements'] 
},

MatchExpr = {
  type: 'MatchExpr',
  args: {
    discriminants : {required: true}, 
    cases         : {required: true}, 
    isAsyncv      : {default: false} 
  }
  // cases: Array<{ isDefault:bool, keys:Expression[], value:Expression, isBlock?:bool }>
  // - Tuple-Modus (>1 Discriminant): keys = EIN Tupel '(a,b)', Arity == Discriminants
  // - Klassisch (1 Discriminant):    keys = 1+ Alternativ-Keys 'a, b: ...' (Fallthrough)
  // - Prädikat (0 Discriminants, nur match): keys = 1 Bool-Ausdruck (oder Nullary-Funktion)
},

MemberExpr = {
  type: 'MemberExpr',
  args: ['object', 'property']
  // property: einfacher String-Name der Property (nur '.'-Zugriff, kein '[...]' bisher)
},

NewExpr = { 
  type: 'NewExpr', 
  args: ['callee', 'args'] 
},

ObjectExpr = { 
  type: 'ObjectExpr', 
  args: ['properties'] 
  // properties: Array<
  //   { kind:'init',   key:string, value:Expression } |
  //   { kind:'method', key:string, params:string[], body:BlockStatement }
  // >
},

RangeExpr = {
  type: 'RangeExpr',
  args: ['from', 'to']
},

TaggedTemplateExpr = {
  type: 'TaggedTemplateExpr',
  args: ['callee', 'quasi']
},

TraitUseExpr = {
  type: 'TraitUseExpr',
  args: ['expr', 'traitNames']
},

TupleExpr = { 
  type: 'TupleExpr', 
  args: ['elements']
},

UnaryExpr  = { 
  type: 'UnaryExpr',  
  args: ['operator', 'argument']
},

YieldExpr = { 
  type: 'YieldExpr', 
  args: {
    argument: {default: null}
  } 
},

// :::::: STATEMENTS
  
BlockStatement = {
  type: 'BlockStatement',
  args: ['body']
},

BreakStatement = {
  type: 'BreakStatement',
  args: ['label'] // label: string|null
},

ContinueStatement = { 
  type: 'ContinueStatement', 
  args: ['label']
},

ExpressionStatement = {
  type: 'ExpressionStatement',
  args: ['expression']
},

ForStatement = {
  type: 'ForStatement',
  args: {
    id       : { default: null },  // Identifier | null (null = naked, keine Bindung im Body)
    kind     : { default: null },  // 'let' | 'const' | 'var' | null (nur bei gesetztem id)
    iterable : { required: true }, // Expression (Range, Array, beliebiges Iterable)
    body     : { required: true }
  }
},

IfStatement = {
  type: 'IfStatement',
  args: {
    test:       { required: true }, // Expression | AsBindingExpression
    consequent: { required: true }, // BlockStatement
    alternate:  { default: null }   // BlockStatement | IfStatement | null
  }
},

LabeledStatement = { 
  type: 'LabeledStatement', 
  args: ['label', 'body']
},

MoldStatement = {
  type: 'MoldStatement',
  args: {
    target       : { required: true },
    init         : { default: null },
    cases        : { required: true },
    catchBlock   : { default: null },
    finallyBlock : { default: null },
  }
},

ReturnStatement = {
  type: 'ReturnStatement',
  args: ['argument']
},

SiftStatement = {
  type: 'SiftStatement', 
  args: ['init', 'cases', 'catchBlock', 'finallyBlock'],
},

SwitchStatement = { 
  type: 'SwitchStatement', 
  args: ['discriminants','cases']
},

TryStatement = {
  type: 'TryStatement',
  args: {
    block        : { required: true }, // BlockStatement
    handlerParam : { default: null }, // string|null (Name der Catch-Variable)
    handler      : { default: null }, // BlockStatement | null (null = kein catch überhaupt)
    finalizer    : { default: null }  // BlockStatement | null
  }
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

TemplateLiteral = {
  type: 'TemplateLiteral',
  args: ['quasis', 'expressions']
}, // quasis: string[] (Länge = expressions.length + 1)

Program = {
  type: 'Program',
  args: { 
    body: {required: true} 
  }
},

// :::::: PATTERNS

ObjectPattern = {
  type: 'ObjectPattern',
  args: ['properties']
  // properties: Array<{ key: string, value: string }>
  // key === value ohne Alias; sonst 'x as y' -> { key: 'x', value: 'y' }
};










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
