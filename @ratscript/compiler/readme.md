# @ratscript/compiler

```c
compiler/
├── 1_lexer.js   # Zerlegt Text in Token (Tokenize)
├── 2_parser.js  # Baut aus Token den AST
├── 3_transformer.js # modifies AST
├── 4_generator.js
├── nodes.js    # Typen für AST-Knoten (z.B. SiftNode, MoldNode)
│   │   └── parser.js
│   ├── transformer/    # Modifiziert den AST (z.B. Optimierungen)
│   │   └── transformer.js
│   ├── generator/      # Macht aus dem AST finales JavaScript Code
│   │   └── generator.ts
│   └── ast.ts          # Zentrale AST-Schnittstelle
├── mod.js              # main export
└── jsr.json / package.json
```
