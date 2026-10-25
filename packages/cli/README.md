# @rat/cli

```
rat create [name]       a new app from a few questions   --mods database,offline  --yes
rat dev [dir]           serves dir without a build: .rat compiled here, reload on save   --port 8080  --root
rat build [dir]         builds the app in dir: vite + @rat/dev, the build of its config.rat.js
rat compile <files>     .rat, .rat.html, .rat.js -> .js next to them   -o dir  --stdout  --watch
rat check [files]       compiles without writing: errors with file:line:column, exit code 1
```

node. in this repo `npm install` links it: `npx rat …`.

- **create** writes `index.html`, `app.rat.html`, `config.rat.js`, `app.css`, `manifest.json` (and `sw.js` with the mod offline). inside a rat checkout `run.js` is the local one, else the one of code.pulgasari.dev. folders brings the database with its table.
- **dev** serves the folder above the rat repo when the page loads a local `run.js` (the import map reaches into the repos beside it), else `dir`. a `.rat` file fetched as a module is compiled here, as `middleware.js` does on vercel: the page loads no compiler. a save in the app or in the rat packages reloads the page.
- **build** takes a `vite.config.js` of the app as it is, else vite with `@rat/dev`. `build` of `config.rat.js` sets the rest (`outDir` …). `sw.js` goes along, a local `importScripts` in it inlined.
- **compile** points an import of another `.rat` file to its `.js`. a component used without an import (autoImport) is named: only the page finds it.
