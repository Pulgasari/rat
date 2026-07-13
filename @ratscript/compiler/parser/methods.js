// @ratscript/parser/methods.js

// ::::::

export function parseStatement (ctx) {
  // case 1: labeled statements
  if (ctx.checkSequence('IDENTIFIER', ':')) {
    return ctx.parseLabeledStatement();
  }

  // case 2: regular statements
  if (ctx.check('KEYWORD')) {
    const tkn = ctx.peek().value;
    const method = {
      'alias'    : ctx.parseAliasDeclaration,
      'async'    : ctx.parseFunctionDeclaration,
      'break'    : ctx.parseBreakStatement,
      'class'    : ctx.parseClassDeclaration,
      'const'    : ctx.parseVariableDeclaration,
      'continue' : ctx.parseContinueStatement,
      'export'   : ctx.parseExportDeclaration,
      'fn'       : ctx.parseFunctionDeclaration,
      'for'      : ctx.parseForStatement,
      'if'       : ctx.parseIfStatement,
      'import'   : ctx.parseImportDeclaration,
      'let'      : ctx.parseVariableDeclaration,
      'mold'     : ctx.parseMoldStatement,
      'return'   : ctx.parseReturnStatement,
      'sift'     : ctx.parseSiftStatement,
      'switch'   : ctx.parseSwitchStatement,
      'trait'    : ctx.parseTraitDeclaration,
      'try'      : ctx.parseTryStatement,
      'union'    : ctx.parseUnionDeclaration,
      'var'      : ctx.parseVariableDeclaration,
      'while'    : ctx.parseWhileStatement,
      /* TODO:
        function
      */
    }[tkn];
    return method ? method() : null;
  }

  // case 3: expression
  return ctx.parseExpressionStatement();
}

// :::::: PATTERNS

export function parseBlock (ctx) {
  ctx.consume('{');
  const body = ctx.parseBody();
  ctx.consume('}');
  return ASTNode.BlockStatement({ body });
  
  // const body = ctx.parseWrapped('braces', () => ctx.parseBody());
  // return ASTNode.BlockStatement({ body });

  // return ASTNode.BlockStatement({ 
  //   body: ctx.parseWrapped('braces', () => ctx.parseBody())
  // });
}

export function parseActionBlock (ctx) {
  if (ctx.match('{')) {
    const body = ctx.parseBody();
    ctx.consume('}');
    return ASTNode.BlockStatement({ body });
  }
  return ASTNode.BlockStatement({ body: [ctx.parseStatement()] });
}

export function parseBody (ctx) {
  const body = [];
  while (!ctx.checkAny('}', 'EOF')) {
    body.push(ctx.parseStatement());
  }
  return body;
}

// :::::: DECLARATIONS

// :::::: STATEMENTS

function parseLabeledStatement (ctx) {
  const labelToken = advance(); // Label-Identifier
  ctx.advance(); // ':'
  const body = ctx.parseStatement();
  return ASTNode.LabeledStatement({ label: labelToken.value, body });
}

// :::::: EXPRESSIONS

// :::::: KINDA WEIRD

export function parseConditionTest (ctx) {
  const expr = ctx.parseExpression();
  if (ctx.check('as')) {
    ctx.advance(); // 'as'
    const name = ctx.consume('IDENTIFIER').value;
    return ASTNode.AsBindingExpression({ expr, name });
  }
  return expr;
}

// :::::: INTERNAL HELPERS
