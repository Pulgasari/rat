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

export function parseObjectPattern (p) {
  p.consume('{');
  const properties = [];

  if (!p.check('}')) {
    do {
      let key   = p.consume('IDENTIFIER')?.value;
      let value = key;

      if (p.check('as')) {
        p.advance(); // 'as'
        value = p.consume('IDENTIFIER').value;
      }

      properties.push({ key, value });
    } while (p.match(','));
  }

  p.consume('}');
  return ASTNode.ObjectPattern({ properties });
}


// :::::: DECLARATIONS

// :::::: STATEMENTS

export function parseLabeledStatement (ctx) {
  const labelToken = advance(); // Label-Identifier
  ctx.advance(); // ':'
  const body = ctx.parseStatement();
  return ASTNode.LabeledStatement({ label: labelToken.value, body });
}

// :::::: EXPRESSIONS

// :::::: PARTS

export function parseMethodLike (p) {
  const name   = p.consume('IDENTIFIER')?.value;
  const params = p.parseParamList();
  const body   = p.parseBlock();
  return { name, params, body };
}

export function parseParamList (p) {
  return p.parseList('IDENTIFIER', { wrapper: '()' });
}

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

// :::::: DEPRECATED (MAYBE)

export function parseBracketedElements (open, close) {
  return p.parseList(() => p.parseExpression(), { wrapper: [open, close] });
}

// :::::: INTERNAL HELPERS
