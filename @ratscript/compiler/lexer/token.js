// packages/compiler/src/lexer/token.js

export const TokenType = {
  KEYWORD    : 'KEYWORD',
  IDENTIFIER : 'IDENTIFIER',
  NUMBER     : 'NUMBER',
  STRING     : 'STRING',
  
  // Operatoren & Symbole
  RANGE     : 'RANGE',     // ..
  COLON     : 'COLON',     // :
  ASSIGN    : 'ASSIGN',    // =
  LBRACE    : 'LBRACE',    // {
  RBRACE    : 'RBRACE',    // }
  LPAREN    : 'LPAREN',    // (
  RPAREN    : 'RPAREN',    // )
  SEMICOLON : 'SEMICOLON', // ;
  
  EOF: 'EOF'  // End of File (Signalisiert das Code-Ende)
};
