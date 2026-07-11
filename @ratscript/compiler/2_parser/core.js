// @ratscript/compiler/parser/core.js

import { parsed } from './index.js';

export function parseBody () {
  const body = [];
  while (!isToken('}') && !isEOF()) {
    body.push(parsed.Statement);
  }
  return body;
}

// :::::: { key: value, method (params) { ... }, ... }
// Wird von parsePrimary (ObjectExpression) UND parsed.TraitDeclaration (Trait-Body) genutzt.
export function parseObjectProperties () {
  consumeToken('{');
  const properties = [];

  if (!isToken('}')) {
    do {
      if (isToken('}')) break; // erlaubt trailing comma vor '}'

      // Methoden-Shorthand: name (params) { body }  -> IDENTIFIER direkt gefolgt von '('
      if (isToken('IDENTIFIER') && peekNext()?.value === '(') {
        const { name, params, body } = parsed.MethodLike;
        properties.push({ kind: 'method', key: name, params, body });
      } else {
        const keyToken = consumeToken('IDENTIFIER');
        let value;

        if (matchToken(':')) {
          value = parsed.Assignment;
        } else { // Shorthand: { x } -> { x: x }
          value = ASTNode.Identifier({ name: keyToken.value });
        }

        properties.push({ kind: 'init', key: keyToken.value, value });
      }
    } while (matchToken(','));
  }

  consumeToken('}');
  return properties;
}

// :::::: Dispatcher

export function parseStatement () {
  if (isToken('KEYWORD')) {
    switch (peek().value) {
      case 'alias'    : return parsed.AliasDeclaration;
      case 'async'    : return parsed.FunctionDeclaration;
      case 'break'    : return parsed.BreakStatement;
      case 'class'    : return parsed.ClassDeclaration;
      case 'const'    : return parsed.VariableDeclaration;
      case 'continue' : return parsed.ContinueStatement;
      case 'fn'       : return parsed.FunctionDeclaration;
      case 'for'      : return parsed.ForStatement;
      case 'if'       : return parsed.IfStatement;
      case 'let'      : return parsed.VariableDeclaration;
      case 'mold'     : return parsed.MoldStatement;
      case 'return'   : return parsed.ReturnStatement;
      case 'sift'     : return parsed.SiftStatement;
      case 'trait'    : return parsed.TraitDeclaration;
      case 'try'      : return parsed.TryStatement;
      case 'union'    : return parsed.UnionDeclaration;
      case 'var'      : return parsed.VariableDeclaration;
      case 'while'    : return parsed.WhileStatement;
    }
  }
  return parsed.ExpressionStatement;
}

// :::::: Block-Helpers
// (werden von statements.js UND declarations.js gebraucht -> hier zentral)

export function parseBlock () {
  consumeToken('{');
  const body = parsed.Body;
  consumeToken('}');
  return ASTNode.BlockStatement({ body });
}

export function parseActionBlock () {
  if (matchToken('{')) {
    const body = parsed.Body;
    consumeToken('}');
    return ASTNode.BlockStatement({ body });
  }
  return ASTNode.BlockStatement({ body: [parsed.Statement] });
}




export function parseConditionTest () {
  const expr = parsed.Expression;
  if (isToken('as')) {
    advance(); // 'as'
    const name = consumeToken('IDENTIFIER').value;
    return ASTNode.AsBindingExpression({ expr, name });
  }
  return expr;
}

// :::::: Primary (Literale, Identifier, Calls)
export function parsePrimary () {
  let expr;

  if (matchToken('NUMBER')) {
    expr = ASTNode.Literal({ kind: 'NUMBER', value: previous().value });
  } else if (matchToken('STRING')) {
    expr = ASTNode.Literal({ kind: 'STRING', value: previous().value });
  } else if (isToken('TEMPLATE_STRING')) {
    expr = parsed.TemplateLiteral;
  } else if (matchToken('(')) {
    // Geklammerte Gruppierung, z.B. (1 + 2) * 3 -> gibt einfach den inneren Ausdruck zurück
    expr = parsed.Expression;
    consumeToken(')');
  } else if (matchToken('#')) {
    if (isToken('(')) {
      expr = ASTNode.TupleExpression({ elements: parseBracketedElements('(', ')') });
    } else if (isToken('[')) {
      expr = ASTNode.ListExpression({ elements: parseBracketedElements('[', ']') });
    } else {
      const token = peek();
      throw new SyntaxError(`[Parser ${token.line}:${token.column}]: Erwarte '(' oder '[' nach '#' (Gefunden: '${token.value}')`);
    }
  } else if (isToken('[')) {
    expr = ASTNode.ArrayExpression({ elements: parseBracketedElements('[', ']') });
  } else if (isToken('{')) {
    expr = ASTNode.ObjectExpression({ properties: parsed.ObjectProperties });
  } else if (matchToken('new')) {
    let callee = ASTNode.Identifier({ name: consumeToken('IDENTIFIER').value });
    while (matchToken('.')) {
      callee = ASTNode.MemberExpression({ object: callee, property: consumeToken('IDENTIFIER').value });
    }

    let args = [];
    if (matchToken('(')) {
      if (!isToken(')')) {
        do { args.push(parsed.Expression); } while (matchToken(','));
      }
      consumeToken(')');
    }

    expr = ASTNode.NewExpression({ callee, args });
  } else if (isToken('IDENTIFIER') && peek().value === '_') {
    advance();
    expr = ASTNode.PipePlaceholder({});
  } else if (matchToken('IDENTIFIER')) {
    expr = ASTNode.Identifier({ name: previous().value });
  } else {
    const token = peek();
    throw new SyntaxError(`[Parser ${token.line}:${token.column}]: Unerwartetes Token '${token.value}' beim Parsen eines Ausdrucks.`);
  }

  return parsePostfix(expr);
}

// :::::: gemeinsame Param-Liste (fn + class-Methoden)
export function parseParamList () {
  consumeToken('(');
  const params = [];
  if (!isToken(')')) {
    do {
      params.push(consumeToken('IDENTIFIER').value);
    } while (matchToken(','));
  }
  consumeToken(')');
  return params;
}

// Von parseClassDeclaration UND parseObjectProperties (Methoden-Shorthand) genutzt.
export function parseMethodLike () {
  const nameToken = consumeToken('IDENTIFIER');
  const params = parseParamList();
  const body = parsed.Block;
  return { name: nameToken.value, params, body };
}

export function parseObjectPattern () {
  consumeToken('{');
  const properties = [];

  if (!isToken('}')) {
    do {
      const keyToken = consumeToken('IDENTIFIER');
      let valueName = keyToken.value;

      if (isToken('as')) {
        advance(); // 'as'
        valueName = consumeToken('IDENTIFIER').value;
      }

      properties.push({ key: keyToken.value, value: valueName });
    } while (matchToken(','));
  }

  consumeToken('}');
  return ASTNode.ObjectPattern({ properties });
}

// :::::: INTERNAL HELPERS
// can't be exported to avoid conflicts with 'evilObject' because they have arguments
// TODO: maybe find a solution to change this

// :::::: gemeinsamer Helper für #(...) und #[...]
function parseBracketedElements (open, close) {
  consumeToken(open);
  const elements = [];

  if (!isToken(close)) {
    do {
      if (isToken(close)) break; // trailing comma erlaubt
      elements.push(parsed.Expression);
    } while (matchToken(','));
  }

  consumeToken(close);
  return elements;
}

// :::::: .property und (...) beliebig kaskadierbar, auf JEDER Primary-Form.
// Zentralisiert statt pro Branch dupliziert -> jede neue Primary-Form (Tuple, List, ...)
// bekommt Verkettung automatisch mit, ohne dass man's dort explizit einbauen muss.
function parsePostfix (expr) {
  while (true) {
    if (matchToken('.')) {
      const propToken = consumeToken('IDENTIFIER');
      expr = ASTNode.MemberExpression({ object: expr, property: propToken.value });
    } else if (matchToken('(')) {
      const { args, namedArgs } = parseCallArguments();
      expr = ASTNode.CallExpression({ expr, args, namedArgs });
    } else {
      break;
    }
  }
  return expr;
}
