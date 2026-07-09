# @ratscript/language-server

```c
language-server/
├── src/
│   ├── capabilities/
│   │   ├── completion.js   # Autocomplete für Enums, Traits, etc.
│   │   ├── diagnostics.js  # Rote Wellenlinien bei Syntax-Fehlern
│   │   └── hover.js        # Info-Popups, wenn man über Code hoovert
│   └── server.js           # LSP-Verbindungs-Handler
├── main.js                 # Startpunkt des Servers
└── jsr.json / package.json
```
