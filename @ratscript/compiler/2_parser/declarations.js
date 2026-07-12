// @ratscript/compiler/parser/declarations.js

import { ASTNode } from './../utils.js';
import { advance, isToken, matchToken, consumeToken } from './state.js';
import { parsed } from './index.js';

import { parseExpression, parsePrimary } from './expressions.js';
import { parseBlock } from './statements.js';

// alias <source> as <name>;   
// alias <name> = <source>;
export function parseAliasDeclaration () {
  advance(); // 'alias'

  // Erst mal nur einen einfachen Identifier/Member-Chain lesen (kein '=', kein 'as' -> parsePrimary reicht,
  // KEIN parseExpression, sonst würde parseAssignment das '=' schon vorzeitig selbst konsumieren).
  const first = parsed.Primary;

  // Form 1: alias database.users.save as saveUser;
  if (matchToken('as')) {
    const aliasNameToken = consumeToken('IDENTIFIER');
    matchToken(';'); // optionales Semikolon, wie in den Docs-Beispielen

    return ASTNode.AliasDeclaration({
      name     : aliasNameToken.value,
      source   : first,
      autoBind : first.type === 'MemberExpression', // nur bei Dot-Chain automatisch binden
    });
  }

  // Form 2: alias saveCustom = database.users.save.bind(alternativeContext);
  if (matchToken('=')) {
    if (first.type !== 'Identifier') {
      const token = peek();
      throw new SyntaxError(`[Parser ${token.line}:${token.column}]: 'alias <name> = ...' erwartet einen einfachen Namen vor '=', kein Member-Chain.`);
    }
    const source = parsed.Expression;
    matchToken(';');

    return ASTNode.AliasDeclaration({ name: first.name, source, autoBind: false }); // volle Kontrolle -> nie autoBind
  }

  const token = peek();
  throw new SyntaxError(`[Parser ${token.line}:${token.column}]: Erwarte 'as' oder '=' nach 'alias' (Gefunden: '${token.value}')`);
}

// :::::: class Name [use Trait] { method1() {...} method2() {...} ... }
export function parseClassDeclaration () {
  advance(); // 'class'
  const nameToken = consumeToken('IDENTIFIER');

  const traits = [];
  if (isToken('use')) {
    advance(); // 'use'
    do {
      traits.push(consumeToken('IDENTIFIER').value);
    } while (matchToken(','));
  }

  consumeToken('{');
  const methods = [];
  while (!isToken('}') && !isEOF()) {
    methods.push(parseMethodLike());
  }
  consumeToken('}');

  return ASTNode.ClassDeclaration({ name: nameToken.value, methods, traits });
}

// :::::: export <decl>;  /  export { a, b as c } [from '...'];  /  export * [as ns] from '...';  /  export default <expr|decl>;
export function parseExportDeclaration () {
  advance(); // 'export'

  if (isToken('default')) {
    advance();
    let declaration;
    if (isToken('KEYWORD') && (peek().value === 'fn' || peek().value === 'async')) {
      declaration = parsed.FunctionDeclaration;
    } else if (isToken('KEYWORD') && peek().value === 'class') {
      declaration = parsed.ClassDeclaration;
    } else {
      declaration = parsed.Expression;
      matchToken(';');
    }
    return ASTNode.ExportDefaultDeclaration({ declaration });
  }

  if (matchToken('*')) {
    let exported = null;
    if (isToken('as')) { advance(); exported = consumeToken('IDENTIFIER').value; }
    consumeToken('IDENTIFIER', 'from');
    const source = consumeToken('STRING').value;
    matchToken(';');
    return ASTNode.ExportAllDeclaration({ exported, source });
  }

  if (isToken('{')) {
    consumeToken('{');
    const specifiers = [];
    if (!isToken('}')) {
      do {
        if (isToken('}')) break;
        const localToken = consumeToken('IDENTIFIER');
        let exported = localToken.value;
        if (isToken('as')) { advance(); exported = consumeToken('IDENTIFIER').value; }
        specifiers.push({ local: localToken.value, exported });
      } while (matchToken(','));
    }
    consumeToken('}');

    let source = null;
    if (isToken('IDENTIFIER') && peek().value === 'from') {
      advance();
      source = consumeToken('STRING').value;
    }
    matchToken(';');
    return ASTNode.ExportNamedDeclaration({ declaration: null, specifiers, source });
  }

  const declaration = parsed.Statement; // let/const/fn/class/trait/union/alias
  return ASTNode.ExportNamedDeclaration({ declaration, specifiers: [], source: null });
}

// :::::: fn name (args) use Trait { ... }
export function parseFunctionDeclaration () {
  let isAsync = false;
  if (isToken('async')) { advance(); isAsync = true; }

  advance(); // 'fn'

  let isGenerator = false;
  if (matchToken('*')) isGenerator = true; // fn* name(...) { ... }

  const nameToken = consumeToken('IDENTIFIER');
  const params = parseParamList();

  const traits = [];
  if (isToken('use')) {
    advance();
    do { traits.push(consumeToken('IDENTIFIER').value); } while (matchToken(','));
  }

  const body = parsed.Block;
  return ASTNode.FunctionDeclaration({ name: nameToken.value, params, traits, body, isAsync, isGenerator });
}

// :::::: import Default, { a, b as c }, * as ns from 'module';   /   import 'module';
export function parseImportDeclaration () {
  advance(); // 'import'

  if (isToken('STRING')) { // reiner Side-Effect-Import, keine Bindings
    const source = consumeToken('STRING').value;
    matchToken(';');
    return ASTNode.ImportDeclaration({ specifiers: [], source });
  }

  const specifiers = [];

  if (matchToken('*')) {
    consumeToken('IDENTIFIER', 'as');
    specifiers.push({ kind: 'namespace', local: consumeToken('IDENTIFIER').value });
  } else if (isToken('IDENTIFIER')) {
    specifiers.push({ kind: 'default', local: consumeToken('IDENTIFIER').value });
    if (matchToken(',')) {
      if (matchToken('*')) {
        consumeToken('IDENTIFIER', 'as');
        specifiers.push({ kind: 'namespace', local: consumeToken('IDENTIFIER').value });
      } else {
        specifiers.push(...parseNamedImportSpecifiers());
      }
    }
  } else {
    specifiers.push(...parseNamedImportSpecifiers());
  }

  consumeToken('IDENTIFIER', 'from');
  const source = consumeToken('STRING').value;
  matchToken(';');

  return ASTNode.ImportDeclaration({ specifiers, source });
}

// :::::: trait Name { ... }
export function parseTraitDeclaration () {
  advance(); // 'trait'
  const nameToken = consumeToken('IDENTIFIER');
  const properties = parsed.ObjectProperties;
  return ASTNode.TraitDeclaration({ name: nameToken.value, properties });
}

// :::::: union Name = a | b | c;
export function parseUnionDeclaration () {
  advance(); // 'union'
  const nameToken = consumeToken('IDENTIFIER');
  consumeToken('=');

  const members = [parsed.Primary];
  while (matchToken('|')) {
    members.push(parsed.Primary);
  }
  matchToken(';');

  return ASTNode.UnionDeclaration({ name: nameToken.value, members });
}

// :::::: let/const/var <id | {pattern}> = <init>?;

export function parseVariableDeclaration () {
  const kindToken = advance(); // 'let' | 'const' | 'var'

  const id = isToken('{')
    ? parsed.ObjectPattern
    : ASTNode.Identifier({ name: consumeToken('IDENTIFIER').value });

  let init = null;
  if (matchToken('=')) {
    init = parsed.Expression;
  }
  matchToken(';');

  return ASTNode.VariableDeclaration({ kind: kindToken.value, id, init });
}

// :::::: INTERNAL HELPERS

function parseNamedImportSpecifiers () {
  consumeToken('{');
  const specifiers = [];
  if (!isToken('}')) {
    do {
      if (isToken('}')) break;
      const importedToken = consumeToken('IDENTIFIER');
      let local = importedToken.value;
      if (isToken('as')) { advance(); local = consumeToken('IDENTIFIER').value; }
      specifiers.push({ kind: 'named', imported: importedToken.value, local });
    } while (matchToken(','));
  }
  consumeToken('}');
  return specifiers;
}
