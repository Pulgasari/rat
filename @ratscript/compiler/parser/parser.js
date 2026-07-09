// @ratscript/compiler/parser/parser.js

import { TokenType } from '../lexer/token.js';

export class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0; // Zeigt auf das Token, das wir gerade prüfen
  }

  // ==========================================
  // NAVIGATION-HELPER (Die Standard-Werkzeuge)
  // ==========================================
  
  peek() {
    return this.tokens[this.current];
  }

  isAtEnd() {
    return this.peek().type === TokenType.EOF;
  }

  // Schaut, ob das aktuelle Token einen bestimmten Typ hat, ohne es zu verbrauchen
  check(type) {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  // Geht ein Token weiter und gibt das vorherige zurück
  advance() {
    if (!this.isAtEnd()) this.current++;
    return this.tokens[this.current - 1];
  }

  // Verlangt ein bestimmtes Token. Wenn es nicht da ist -> Knallt es mit Zeilenangabe!
  consume(type, errorMessage) {
    if (this.check(type)) return this.advance();
    const token = this.peek();
    throw new SyntaxError(`[Parser-Fehler ${token.line}:${token.column}]: ${errorMessage} (Gefunden: '${token.value}')`);
  }

  // ==========================================
  // GRAMMATIK-REGELN (Das eigentliche Parsen)
  // ==========================================

  parse() {
    const statements = [];
    while (!this.isAtEnd()) {
      statements.push(this.parseStatement());
    }
    return { type: 'Program', body: statements };
  }

  parseStatement() {
    const token = this.peek();

    // Wenn der Parser das Keyword 'sift' sieht, verzweigt er in die Sift-Regel
    if (token.type === TokenType.KEYWORD && token.value === 'sift') {
      return this.parseSiftStatement();
    }

    // Fallback: Für diesen Prototyp fangen wir unbekannte Zeilen einfach als "Expression" ab
    return this.parseExpressionStatement();
  }

  parseSiftStatement() {
    this.advance(); // Verbraucht das 'sift' Keyword
    this.consume(TokenType.LBRACE, "Erwarte '{' nach 'sift'.");

    const node = {
      type: 'SiftStatement',
      init: null,
      cases: [],
      catchBlock: null,
      finallyBlock: null
    };

    // Wir loopen durch den Inhalt des sift-Blocks bis zur schließenden Schleife '}'
    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      
      // 1. Wir parsen die linke Seite (Bedingung oder Lebenszyklus-Key)
      let keyToken = this.advance();
      
      // Doppelpunkt ':' erwarten
      this.consume(TokenType.COLON, "Erwarte ':' nach der Bedingung im sift-Block.");

      // 2. Wir parsen die rechte Seite (Die Aktion)
      // Für den Prototyp erlauben wir hier entweder einen Block { } oder eine einzelne Zeile
      let actionNode = this.parseAction();

      // 3. Den Ast an die richtige Stelle im SiftNode hängen
      if (keyToken.value === 'init') {
        node.init = actionNode;
      } else if (keyToken.value === 'finally') {
        node.finallyBlock = actionNode;
      } else if (keyToken.value.startsWith('catch')) {
        node.catchBlock = actionNode; // Hier könnte man später noch den Fehler-Parameter parsen
      } else {
        // Eine ganz normale Bedingung
        node.cases.push({
          condition: { type: 'Identifier', value: keyToken.value },
          body: actionNode
        });
      }
    }

    this.consume(TokenType.RBRACE, "Erwarte '}' am Ende des sift-Blocks.");
    return node;
  }

  parseAction() {
    if (this.check(TokenType.LBRACE)) {
      this.advance(); // {
      const statements = [];
      while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
        statements.push(this.parseStatement());
      }
      this.consume(TokenType.RBRACE, "Erwarte '}' am Ende des Aktions-Blocks.");
      return statements;
    } else {
      // Einzeiler
      return [this.parseExpressionStatement()];
    }
  }

  parseExpressionStatement() {
    // Extrem vereinfacht für diesen Testlauf: Nimmt einfach das Token als nackten Ausdruck
    const token = this.advance();
    if (this.check(TokenType.SEMICOLON)) this.advance(); // optionales Semikolon fressen
    return { type: 'Expression', value: token.value };
  }
                 }
