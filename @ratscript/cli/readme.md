# @ratscript/cli

```c
cli/
├── commands/
│   ├── compile.js  # Liest Datei -> ruft compiler auf -> schreibt .js
│   ├── run.js      # Kompiliert im RAM und führt es direkt aus
│   └── init.js     # creates RatScript projekt
├── utils/
│   └── file.js     # Deno.readTextFile / Deno.writeTextFile
├── main.js         # CLI-Einstiegs-Skript (Deno-Binary)
├── mod.js          # main exports
└── jsr.json
```
