// @ratscript/compiler/parser/parser.js

// packages/compiler/src/parser/parser.js
import { TokenType } from '../lexer/token.js';
import * as nodes from './nodes.js';

export class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0;
  }

  // ==========================================
  // NAVIGATION & TOKENS KONSUMIEREN
  // ==========================================

  peek() {
    return this.tokens[this.current];
  }

  previous() {
    return this.tokens[this.current - 1];
  }

  isAtEnd() {
    return this.peek().type === TokenType.EOF;
  }

  check(type) {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  advance() {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  match(...types) {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  consume(type, message) {
    if (this.check(type)) return this.advance();
    const token = this.peek();
    throw new SyntaxError(`[Parser ${token.line}:${token.column}]: ${message} (Gefunden: '${token.value}')`);
  }

  // ==========================================
  // HAUPT-EINSTIEGSPUNKTE
  // ==========================================

  parse() {
    const statements = [];
    while (!this.isAtEnd()) {
      statements.push(this.parseStatement());
    }
    return nodes.createProgram(statements);
  }

  parseStatement() {
    if (this.check(TokenType.KEYWORD)) {
      switch (this.peek().value) {
        case 'sift':  return this.parseSiftStatement();
        case 'mold':  return this.parseMoldStatement();
        case 'trait': return this.parseTraitDeclaration();
        case 'fn':    return this.parseFunctionDeclaration();
        case 'for':   return this.parseForStatement();
      }
    }
    return this.parseExpressionStatement();
  }

  // ==========================================
  // RATSCRIPT SPEZIFISCHE STRUKTUREN
  // ==========================================

  // sift { init: ..., cond: ... }
  parseSiftStatement() {
    this.advance(); // 'sift'
    this.consume(TokenType.LBRACE, "Erwarte '{' nach 'sift'.");

    let init = null, cases = [], catchBlock = null, finallyBlock = null;

    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      const keyToken = this.advance();
      this.consume(TokenType.COLON, "Erwarte ':' nach Kaskaden-Bedingung.");
      const action = this.parseActionBlock();

      if (keyToken.value === 'init') init = action;
      else if (keyToken.value === 'finally') finallyBlock = action;
      else if (keyToken.value.startsWith('catch')) catchBlock = action;
      else {
        cases.push({ condition: nodes.createIdentifier(keyToken.value), body: action });
      }
    }

    this.consume(TokenType.RBRACE, "Erwarte '}' am Ende des sift-Blocks.");
    return nodes.createSiftStatement(init, cases, catchBlock, finallyBlock);
  }

  // mold(target) { init: ..., cond: ... }
  parseMoldStatement() {
    this.advance(); // 'mold'
    this.consume(TokenType.LPAREN, "Erwarte '(' nach 'mold'.");
    const targetExpr = this.parseExpression();
    this.consume(TokenType.RPAREN, "Erwarte ')' nach mold-Zielwert.");
    this.consume(TokenType.LBRACE, "Erwarte '{' vor mold-Körper.");

    let init = null, cases = [], catchBlock = null, finallyBlock = null;

    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      const keyToken = this.advance();
      this.consume(TokenType.COLON, "Erwarte ':' nach Kaskaden-Bedingung.");
      const action = this.parseActionBlock();

      if (keyToken.value === 'init') init = action;
      else if (keyToken.value === 'finally') finallyBlock = action;
      else if (keyToken.value.startsWith('catch')) catchBlock = action;
      else {
        cases.push({ condition: nodes.createIdentifier(keyToken.value), body: action });
      }
    }

    this.consume(TokenType.RBRACE, "Erwarte '}' am Ende des mold-Blocks.");
    return nodes.createMoldStatement(targetExpr, init, cases, catchBlock, finallyBlock);
  }

  // trait Name { ... }
  parseTraitDeclaration() {
    this.advance(); // 'trait'
    const nameToken = this.consume(TokenType.IDENTIFIER, "Erwarte Name des Traits.");
    this.consume(TokenType.LBRACE, "Erwarte '{' vor Trait-Inhalt.");
    
    const bodyStatements = [];
    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      bodyStatements.push(this.parseStatement());
    }
    
    this.consume(TokenType.RBRACE, "Erwarte '}' nach Trait-Inhalt.");
    return nodes.createTraitDeclaration(nameToken.value, nodes.createBlock(bodyStatements));
  }

  // fn name(args) use Trait { ... }
  parseFunctionDeclaration() {
    this.advance(); // 'fn'
    const nameToken = this.consume(TokenType.IDENTIFIER, "Erwarte Funktionsnamen.");
    
    this.consume(TokenType.LPAREN, "Erwarte '(' nach Funktionsnamen.");
    const params = [];
    if (!this.check(TokenType.RPAREN)) {
      do {
        params.push(this.consume(TokenType.IDENTIFIER, "Erwarte Parametername.").value);
      } while (this.match(TokenType.COLON)); // Einfaches Splitting über Kommata/Doppelpunkte ignorieren wir flexibel
    }
    this.consume(TokenType.RPAREN, "Erwarte ')' nach Parameterliste.");

    // Optionale Traits via 'use' abfangen
    const traits = [];
    if (this.check(TokenType.KEYWORD) && this.peek().value === 'use') {
      this.advance(); // 'use'
      traits.push(this.consume(TokenType.IDENTIFIER, "Erwarte Trait-Name nach 'use'.").value);
    }

    this.consume(TokenType.LBRACE, "Erwarte '{' vor Funktionskörper.");
    const bodyStatements = [];
    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      bodyStatements.push(this.parseStatement());
    }
    this.consume(TokenType.RBRACE, "Erwarte '}' nach Funktionskörper.");

    return nodes.createFunctionDeclaration(nameToken.value, params, traits, nodes.createBlock(bodyStatements));
  }

  // for (1..10) ODER for (let x of items)
  parseForStatement() {
    this.advance(); // 'for'
    this.consume(TokenType.LPAREN, "Erwarte '(' nach 'for'.");

    let initializer = null;
    let isNaked = true;

    // Erkennung ob Standard-Loop oder Naked-Loop
    if (this.check(TokenType.KEYWORD) && ['let', 'const', 'var'].includes(this.peek().value)) {
      // Standard JS Loop
      isNaked = false;
      initializer = this.parseExpression(); // Für den Prototyp als Expression abgefangen
    } else {
      // RatScript Naked Loop (z.B. 1..10 oder ein nacktes Array)
      initializer = this.parseExpression();
    }

    this.consume(TokenType.RPAREN, "Erwarte ')' nach Schleifenkopf.");
    
    this.consume(TokenType.LBRACE, "Erwarte '{' vor Schleifenkörper.");
    const bodyStatements = [];
    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      bodyStatements.push(this.parseStatement());
    }
    this.consume(TokenType.RBRACE, "Erwarte '}' am Ende der Schleife.");

    return nodes.createForStatement(initializer, isNaked, nodes.createBlock(bodyStatements));
  }

  // Hilfsmethode für Kaskaden-Aktionen (Erlaubt Einzeiler oder { Blöcke })
  parseActionBlock() {
    if (this.match(TokenType.LBRACE)) {
      const statements = [];
      while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
        statements.push(this.parseStatement());
      }
      this.consume(TokenType.RBRACE, "Erwarte '}' nach Aktionsblock.");
      return nodes.createBlock(statements);
    }
    return nodes.createBlock([this.parseStatement()]);
  }

  // ==========================================
  // AUSDRÜCKE & OPERATOREN (Expression Tree)
  // ==========================================

  parseExpressionStatement() {
    const expr = this.parseExpression();
    this.match(TokenType.SEMICOLON); // optionales Semikolon schlucken
    return nodes.createExpressionStatement(expr);
  }

  parseExpression() {
    return this.parseAssignment();
  }

  parseAssignment() {
    const expr = this.parseTraitUse();
    if (this.match(TokenType.ASSIGN)) {
      const value = this.parseAssignment();
      return { type: 'AssignmentExpression', left: expr, right: value };
    }
    return expr;
  }

  // Expression 'use' TraitName
  parseTraitUse() {
    let expr = this.parseRange();
    if (this.check(TokenType.KEYWORD) && this.peek().value === 'use') {
      this.advance(); // 'use'
      const traitName = this.consume(TokenType.IDENTIFIER, "Erwarte Trait-Name nach 'use'.").value;
      expr = nodes.createTraitUseExpression(expr, traitName);
    }
    return expr;
  }

  // From '..' To
  parseRange() {
    let expr = this.parsePrimary();
    if (this.match(TokenType.RANGE)) {
      const toExpr = this.parsePrimary();
      return nodes.createRangeExpression(expr, toExpr);
    }
    return expr;
  }

  // Basis-Bausteine (Identifiers, Literals, Funktionsaufrufe)
  parsePrimary() {
    if (this.match(TokenType.NUMBER)) {
      return nodes.createLiteral('NUMBER', this.previous().value);
    }
    if (this.match(TokenType.STRING)) {
      return nodes.createLiteral('STRING', this.previous().value);
    }
    if (this.match(TokenType.IDENTIFIER)) {
      let expr = nodes.createIdentifier(this.previous().value);
      
      // Member-Zugriffe (z.B. console.log) oder Funktionsaufrufe () kaskadieren
      while (true) {
        if (this.match(TokenType.LPAREN)) {
          const args = [];
          if (!this.check(TokenType.RPAREN)) {
            do {
              args.push(this.parseExpression());
            } while (this.match(TokenType.COLON)); // einfaches Argument-Splitting
          }
          this.consume(TokenType.RPAREN, "Erwarte ')' nach Argumenten.");
          expr = nodes.createCallExpression(expr, args);
        } else {
          break;
        }
      }
      return expr;
    }

    const token = this.peek();
    throw new SyntaxError(`[Parser ${token.line}:${token.column}]: Unerwartetes Token '${token.value}' beim Parsen eines Ausdrucks.`);
  }
                          
}
