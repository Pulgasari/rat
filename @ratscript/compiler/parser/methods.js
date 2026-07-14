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

// :::::: Primary (Literale, Identifier, Calls)
export function parsePrimary (p) {
  let expr;

       if (p.match('NUMBER'))          expr = ASTNode.Literal({ kind: 'NUMBER', value: p.prev().value });
  else if (p.match('STRING'))          expr = ASTNode.Literal({ kind: 'STRING', value: p.prev().value });
  else if (p.match('IDENTIFIER'))      expr = ASTNode.Identifier({ name: p.prev().value });
  else if (p.check('TEMPLATE_STRING')) expr = p.parseTemplateLiteral();
  else if (p.check('TEMPLATE_STRING')) expr = ASTNode.TaggedTemplateExpression({ callee: expr, quasi: p.parseTemplateLiteral() });
  else if (p.check('JSX_TEMPLATE'))    expr = ASTNode.TaggedTemplateExpression({ callee: ASTNode.Identifier({ name: 'html' }), quasi: p.parseTemplateLiteral() });
  else if (p.check('match'))           expr = p.parseMatchExpression();
  else if (p.check('['))               expr = ASTNode.ArrayExpression({ elements: p.parseBracketedElements('[]') });
  else if (p.check('{'))               expr = ASTNode.ObjectExpression({ properties: p.parseObjectProperties() });
  else if (p.match('(')) {
    // Geklammerte Gruppierung, z.B. (1 + 2) * 3 -> gibt einfach den inneren Ausdruck zurück
    expr = p.parseExpression();
    p.consume(')');
  } else if (p.match('#')) {
         if (p.check('(')) expr = ASTNode.TupleExpression ({ elements: p.parseBracketedElements('()') });
    else if (p.check('[')) expr = ASTNode.ListExpression  ({ elements: p.parseBracketedElements('[]') });
    else {
      const token = p.peek();
      throw new SyntaxError(`[Parser ${token.line}:${token.column}]: Erwarte '(' oder '[' nach '#' (Gefunden: '${token.value}')`);
    }
  } 
  else if (p.match('new')) {
    let callee = ASTNode.Identifier({ name: p.consume('IDENTIFIER').value });
    while (p.match('.')) {
      callee = ASTNode.MemberExpression({ object: callee, property: p.consume('IDENTIFIER').value });
    }

    let args = [];
    if (p.match('(')) {
      if (!p.check(')')) {
        do { args.push(p.parseExpression()); } 
        while (p.match(','));
      }
      p.consume(')');
    }

    expr = ASTNode.NewExpression({ callee, args });
  } else if (p.check('IDENTIFIER') && p.peek().value === '_') {
    p.advance();
    expr = ASTNode.PipePlaceholder({});
  }
  else {
    const token = p.peek();
    throw new SyntaxError(`[Parser ${token.line}:${token.column}]: Unerwartetes Token '${token.value}' beim Parsen eines Ausdrucks.`);
  }

  return p.parsePostfix(expr);
}

// :::::: PATTERNS

export function parseBlock (p) {
  return ASTNode.BlockStatement({ 
    body: p.parse('Wrapped', '{}', 'Body')
  });
}

export function parseActionBlock (p) {
  return p.check('{')
    ? p.parse('Block')
    : ASTNode.BlockStatement({ body: [p.parse('Statement')] });
}

// ActionBlock = p => p.is('{') ? p.parse('Block') : ASTNode.BlockStatement({ body: [p.parse('Statement')] }),

export function parseBody (p) {
  const body = [];
  while (!p.checkAny('}', 'EOF')) {
    body.push(p.parse('Statement'));
  }
  return body;
}

export function parseObjectPattern (p) {
  const fn = (p) => {
    let key   = p.consume('IDENTIFIER')?.value;
    let value = p.match('as') ? p.consume('IDENTIFIER').value : key;
    return { key, value );
  }
  const props = p.parseList(fn, { wrapper: '{}' };
  return ASTNode.ObjectPattern({ props });
}

// :::::: { key: value, method (params) { ... }, ... }
// Wird von parsePrimary (ObjectExpression) UND parsed.TraitDeclaration (Trait-Body) genutzt.
export function parseObjectProperties (p) {
  p.consume('{');
  const properties = [];

  if (!p.check('}')) {
    do {
      if (!p.check('}')) break; // erlaubt trailing comma vor '}'

      // Methoden-Shorthand: name (params) { body }  -> IDENTIFIER direkt gefolgt von '('
      if (!p.checkSequence('IDENTIFIER', '(')) {
        const { name, params, body } = p.parseMethodLike();
        properties.push({ kind: 'method', key: name, params, body });
      } else {
        const keyToken = p.consume('IDENTIFIER');
        let value;

        if (p.match(':')) {
          value = p.parseAssignment();
        } else { // Shorthand: { x } -> { x: x }
          value = ASTNode.Identifier({ name: keyToken.value });
        }

        properties.push({ kind: 'init', key: keyToken.value, value });
      }
    } while (p.match(','));
  }

  p.consume('}');
  return properties;
}

// :::::: DECLARATIONS

// trait Name { ... }
export function parseTraitDeclaration (p) {
  p.advance(); // 'trait'
  const name  = p.consume('IDENTIFIER')?.value;
  const props = p.parse('ObjectProperties');
  return ASTNode.TraitDeclaration({ name, props });
}

// :::::: union Name = a | b | c;
export function parseUnionDeclaration (p) {
  p.advance(); // 'union'
  const name = p.consume('IDENTIFIER')?.value;
  p.consume('=');

  const members = [p.parse('Primary')];
  while (p.match('|')) members.push(p.parse('Primary'));
  p.match(';');

  return ASTNode.UnionDeclaration({ name, members });
}

// :::::: let/const/var <id | {pattern}> = <init>?;
export function parseVariableDeclaration (p) {
  const kind = p.advance().value; // 'const' | 'let' | 'var'

  const id = p.check('{')
    ? p.parse('ObjectPattern')
    : ASTNode.Identifier({ name: p.consume('IDENTIFIER').value });

  let init = null;
  if (p.match('=')) init = p.parse('Expression');
  p.match(';');

  return ASTNode.VariableDeclaration({ kind, id, init });
}

// :::::: STATEMENTS

export function parseBreakStatement (p) {
  p.advance(); // 'break'
  let label = p.check('IDENTIFIER') ? p.advance().value : null;
  p.match(';');
  return ASTNode.BreakStatement({ label });
}

export function parseContinueStatement (p) {
  p.advance(); // 'continue'
  let label = p.check('IDENTIFIER') ? p.advance().value : null;
  p.match(';');
  return ASTNode.ContinueStatement({ label });
}

// :::::: for (...) { ... }
export function parseForStatement (p) {
  p.advance(); // 'for'
  p.consume('(');

  let id = null, kind = null;

  // for (let n of <iterable>) { ... }
  if (p.checkAny('const', 'let', 'var')) {
    kind = p.advance().value;
    id   = ASTNode.Identifier({ name: p.consume('IDENTIFIER').value });
    p.consume(['IDENTIFIER', 'of']); // 'of' ist kontextuell, kein globales Keyword
  }
  // sonst: naked for (<iterable>) { ... } -> kein id/kind

  const iterable = p.parse('Expression');
  p.consume(')');
  const body = p.parse('Block');

  return ASTNode.ForStatement({ id, kind, iterable, body });
}


export function parseIfStatement (p) {
  p.advance(); // 'if'
  
  const test       = p.parse('Wrapped', '()', 'ConditionTest');
  const consequent = parsed.Block;

  let alternate = null;
  if (p.check('else')) {
    p.advance(); // 'else'
    alternate = p.check('if') ? p.parse('IfStatement') : p.parse('Block');
  }

  return ASTNode.IfStatement({ test, consequent, alternate });
}

export function parseLabeledStatement (p) {
  const label = p.advance().value; // identifier
  p.advance(); // ':'
  const body = p.parse('Statement');
  return ASTNode.LabeledStatement({ label, body });
}

// :::::: return <expr>?;
export function parseReturnStatement (p) {
  p.advance(); // 'return'
  
  let argument = !p.checkAny(';', '}', 'EOF') ? p.parse('Expression') : null;
  p.match(';');

  return ASTNode.ReturnStatement({ argument });
}

// :::::: switch (cond1, cond2, ...) { key(s): action, ... }   -- STATEMENT
// (Bewusst OHNE bedingungslose Form -> deckt 'sift' bereits ab)
export function parseSwitchStatement (p) {
  p.advance(); // 'switch'
  
  p.consume('(');
  const discriminants = [p.parse('Expression')];
  while (p.match(',')) discriminants.push(p.parse('Expression'));
  p.consume(')');

  p.consume('{');
  const cases = p.parse('MatchCases', discriminants.length > 1, true); // true = Block-Bodies erlaubt
  p.consume('}');

  return ASTNode.SwitchStatement({ discriminants, cases });
}

// try           [{...}|stmt] 
// catch   [(e)] [{...}|stmt]? 
// finally       [{...}|stmt]?
export function parseTryStatement (p) {
  p.advance(); // 'try'
  const block = p.parse('ActionBlock');

  let handlerParam = null;
  let handler      = null;
  let finalizer    = null;

  if (p.check('catch')) {
    p.advance(); // 'catch'
    handlerParam = p.parse('Wrapped', '()', 'IDENTIFIER');
    handler      = parsed.ActionBlock;
  }

  if (p.check('finally')) {
    p.advance(); // 'finally'
    finalizer = p.parse('ActionBlock');
  }

  return ASTNode.TryStatement({ block, handlerParam, handler, finalizer });
}

export function parseWhileStatement (p) {
  p.advance(); // 'while'
  const test = p.parse('Wrapped', '()', 'ConditionTest');
  const body = p.parse('Block');
  return ASTNode.WhileStatement({ test, body });
}

// :::::: EXPRESSIONS

export function parseExpr (p) {
  return p.parse('Assignment');
}

// ::::::

export function parseAssignment (p) {
  const left = p.parse('Pipe');

  if (p.match('=')) {
    const right = p.parse('Assignment');
    return ASTNode.AssignmentExpr({ left, right });
  }

  for (const operator of COMPOUND_ASSIGN_OPERATORS) {
    if (p.match(operator)) {
      const right = p.parse('Assignment');
      return ASTNode.CompoundAssignmentExpr({ operator, left, right });
    }
  }

  return left;
}

// Pipe (a |> b(...) |> c(_, x) |> ...)
export function parsePipeExpr (p) {
  let left = p.parse('TraitUse');

  while (p.match('|>')) {
    const step = p.parse('TraitUseExpr');
    left = buildPipeStep(left, step);
  }

  return left;
}

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
  const expr = ctx.parse('Expression');
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
