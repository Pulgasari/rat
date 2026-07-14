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

// :::::: Gemeinsames Case-Parsing für switch/match.
// allowBlockValue=true erlaubt '{ ... }' als Case-Body (nur bei switch sinnvoll -> Statement-Block,
// match braucht immer genau EINEN Ausdruck als Rückgabewert).
export function parseMatchCases (p, isTupleMode, allowBlockValue) {
  const cases = [];

  while (!p.checkAny('}', 'EOF')) {
    let keys = [], isDefault = false;

    if (p.check('default')) {
      p.advance();
      isDefault = true;
    } else if (isTupleMode) {
      keys = p.parseBracketedElements('()');
    } else {
      keys = [p.parseAssignment()];
      while (!p.check(':')) {
        p.consume(',');
        keys.push(p.parseAssignment());
      }
    }

    p.consume(':');
    const isBlock = allowBlockValue && p.check('{');
    const value   = isBlock ? p.parseBlock() : p.parseAssignment();

    cases.push({ isDefault, keys, value, isBlock });
    p.match(',');
  }

  return cases;
}

export function parseMethodLike (p) {
  const name   = p.consume('IDENTIFIER')?.value;
  const params = p.parseParamList();
  const body   = p.parseBlock();
  return { name, params, body };
}

export function parseParamList (p) {
  return p.parseList('IDENTIFIER', { wrapper: '()' });
}

// :::::: .property und (...) beliebig kaskadierbar, auf JEDER Primary-Form.
// Zentralisiert statt pro Branch dupliziert -> jede neue Primary-Form (Tuple, List, ...)
// bekommt Verkettung automatisch mit, ohne dass man's dort explizit einbauen muss.
export function parsePostfix (p, expr) {
  while (true) {
    if (p.match('.')) {
      const property = p.consume('IDENTIFIER')?.value;
      expr = ASTNode.MemberExpression({ object: expr, property });
    } else if (p.match('(')) {
      const { args, namedArgs } = p.parseCallArguments();
      expr = ASTNode.CallExpression({ expr, args, namedArgs });
    } else {
      break;
    }
  }
  return expr;
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

export function parseBracketedElements (wrapper) {
  return p.parseList(() => p.parseExpression(), { wrapper });
}

// :::::: INTERNAL HELPERS
