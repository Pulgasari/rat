# @ratscript/compiler

```c
compiler/
├── src/
│   ├── lexer/          # Zerlegt Text in Token (Tokenize)
│   │   ├── token.js
│   │   └── lexer.js
│   ├── parser/         # Baut aus Token den AST (Abstract Syntax Tree)
│   │   ├── nodes.js    # Typen für AST-Knoten (z.B. SiftNode, MoldNode)
│   │   └── parser.js
│   ├── transformer/    # Modifiziert den AST (z.B. Optimierungen)
│   │   └── transformer.js
│   ├── generator/      # Macht aus dem AST finales JavaScript Code
│   │   └── generator.ts
│   └── ast.ts          # Zentrale AST-Schnittstelle
├── mod.js              # main export
└── jsr.json / package.json
```
