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
        consumeToken(':');
        const value = parsed.Assignment; // NICHT parseExpression -> ',' trennt Properties, keine Komma-Expression
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
      case 'alias' : return parsed.AliasDeclaration;
      case 'const' : return parsed.VariableDeclaration;
      case 'fn'    : return parsed.FunctionDeclaration;
      case 'for'   : return parsed.ForStatement;
      case 'if'    : return parsed.IfStatement;
      case 'let'   : return parsed.VariableDeclaration;
      case 'mold'  : return parsed.MoldStatement;
      case 'sift'  : return parsed.SiftStatement;
      case 'trait' : return parsed.TraitDeclaration;
      case 'try'   : return parsed.TryStatement;
      case 'var'   : return parsed.VariableDeclaration;
      case 'while' : return parsed.WhileStatement;
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
  if (matchToken('NUMBER')) {
    return ASTNode.Literal({ type: 'NUMBER', value: previous().value });
  }
  if (matchToken('STRING')) {
    return ASTNode.Literal({ type: 'STRING', value: previous().value });
  }
  if (isToken('{')) {
    const properties = parsed.ObjectProperties;
    return ASTNode.ObjectExpression({ properties });
  }
  // Pipe-Platzhalter '_' -> eigener, transienter Node
  if (isToken('IDENTIFIER') && peek().value === '_') {
    advance();
    return ASTNode.PipePlaceholder({});
  }
  if (matchToken('IDENTIFIER')) {
    let expr = ASTNode.Identifier({ name: previous().value });

    // Member-Zugriffe (z.B. console.log) oder Funktionsaufrufe () kaskadieren
    while (true) {
      if (matchToken('.')) {
        const propToken = consumeToken('IDENTIFIER');
        expr = ASTNode.MemberExpression({ object: expr, property: propToken.value });
      } 
      else if (matchToken('(')) {
        const { args, namedArgs } = parsed.CallArguments;
        expr = ASTNode.CallExpression({ expr, args, namedArgs });
      }
      else break;
    }

    return expr;
  }

  const token = peek();
  throw new SyntaxError(`[Parser ${token.line}:${token.column}]: Unerwartetes Token '${token.value}' beim Parsen eines Ausdrucks.`);
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

