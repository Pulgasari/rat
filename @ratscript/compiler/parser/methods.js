// @ratscript/parser/methods.js

export function parseStatement (ctx) {
  // Labeled Statements
  if (ctx.check('IDENTIFIER') && ctx.peekNext()?.value === ':') {
    return ctx.parseLabeledStatement();
  }
  
  if (ctx.check('KEYWORD')) {
    switch (ctx.peek().value) {
      case 'alias'    : return ctx.parseAliasDeclaration;
      case 'async'    : return ctx.parseFunctionDeclaration;
      case 'break'    : return ctx.parseBreakStatement;
      case 'class'    : return ctx.parseClassDeclaration;
      case 'const'    : return ctx.parseVariableDeclaration;
      case 'continue' : return ctx.parseContinueStatement;
      case 'export'   : return ctx.parseExportDeclaration;
      case 'fn'       : return ctx.parseFunctionDeclaration;
      case 'for'      : return ctx.parseForStatement;
      case 'if'       : return ctx.parseIfStatement;
      case 'import'   : return ctx.parseImportDeclaration;
      case 'let'      : return ctx.parseVariableDeclaration;
      case 'mold'     : return ctx.parseMoldStatement;
      case 'return'   : return ctx.parseReturnStatement;
      case 'sift'     : return ctx.parseSiftStatement;
      case 'switch'   : return ctx.parseSwitchStatement; 
      case 'trait'    : return ctx.parseTraitDeclaration;
      case 'try'      : return ctx.parseTryStatement;
      case 'union'    : return ctx.parseUnionDeclaration;
      case 'var'      : return ctx.parseVariableDeclaration;
      case 'while'    : return ctx.parseWhileStatement;
    }
  }

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
  
  return ctx.parseExpressionStatement();
}

function parseLabeledStatement () {
  const labelToken = advance(); // Label-Identifier
  advance(); // ':'
  const body = ctx.parseStatement();
  return ASTNode.LabeledStatement({ label: labelToken.value, body });
}
