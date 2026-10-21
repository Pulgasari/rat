# RAT :: todo

offen, zum abhaken. entschiedenes steht in [decisions.md](decisions.md).

## `@rat/app`
- [x] `<rat-app>` entfernen, `<rat-app2>` wird `<rat-app>` (mit `src`: lädt `app.rat` und mountet in sich)
- [ ] (?) `<rat-part>` auf `@domina/element`
- [x] `<rat-part>` lädt auch `.htx` und `.html` (der loader, für alle elemente und imports)
- [x] error boundary: `<rat-view>`, `<rat-part>`, `<rat-app>` (popover als letzte), `raise`/`guard` in `@rat/runtime`
- [x] error boundary: fehler in command-handlern (`@rat/commands`) kommen an, als `rat:error` vom auslösenden element
- [ ] error boundary: eigene fehleranzeige (z.b. `<template slot="error">`)
- [ ] `<rat-overlay>` auf `<dialog>` (modernes html nutzen: top layer, inert, escape)
- [x] umschalten per `name`, beide formen gebaut, in der praxis vergleichen: `onclick='rat:toggle[menu]'` (ein command-name mit `:` ist ein eigenes event) und `rat.toggle('menu')` (`import { rat } from '@rat/app'`)
- [ ] `<rat-overlay>` ebenso per `name` umschalten
- [x] hotkeys an `app.commands` (`@rat/hotkeys`): mod `hotkeys`
- [ ] auto-import per config: `autoImport: true` (verzeichnis der app), `['pathX', …]`, `{ pathX: ['Dock', 'Footer'] }`
- [x] app-config (`config.rat.js`, `RAT.config`, `RAT.app`), mods (`database`, `files`, `store`, `hotkeys`)
- [ ] pwa-hülle: manifest, icons, service worker (cached `run.js`, pakete, `.rat`-dateien, cdn-urls)

## `@rat/router`
- [ ] (?) globaler router, den views direkt abonnieren

## syntax
- [ ] props nach d-13 b umsetzen (`let { $title } = props`)
- [x] `let` vor `$name` auf oberster ebene im `<script>` optional (`const` bleibt pflicht, nicht in `.rat.js`)
- [ ] (ungeklärt, verschoben, jetzt mit `@rat/bunker` als unterbau) persistenz eines signals: form klären (statt `$(init, '[persist]')`, idee: `persist $filter;`)
- [ ] sichtbarer anfang/ende einer komponente statt `<>` (`<self>`?)
- [ ] meta-angaben in der ersten zeile (`<!-- rat:root -->` o.ä.)
- [ ] schema mit ui-hinweisen (`Enum({ values, element: { look } })`), form klären
- [ ] benannte slots ([slots](ideas/slots.md)), für layouts
- [ ] `@await` / async-blöcke (d-28)
- [ ] `key` generell besprechen (`@for (todo of $todos; key todo.id)` und anderswo)
- [ ] `@for`-index (d-15)
- [ ] (idee, gemerkt) ein wert für mehrere attribute: `name+src='nav'` / `icon|title='settings'`

## apps
- [x] testobjekt: `apps/notes` lauffähig machen (dazu `apps/icons`, siehe `apps/README.md`)
- [ ] später: build-schritt bzw. sw kompiliert einmal und cached

## sonstiges
- [x] `@rat/bunker`: Store, Database, Files, memo (siehe decisions.md)
- [ ] notes: `FolderLibrary` durch `@rat/bunker` Files ersetzen (granted folder, handle in einer tabelle)
- [ ] `@rat/bunker` nach `@bunker` umziehen, sobald es sich in den apps bewährt hat
- [x] compiler: ein nicht geschlossenes element als solches melden (auch das, das ein falsches schließ-tag zugemacht hat)
- [ ] props an signals andocken (optional, ohne dass domina fest an `@rat/signals` hängt)
- [ ] `/.md` gründlich aufräumen (erst absprechen)

## packages (?)
- [ ] `@rat/analyzer`
- [ ] `@rat/cli`
- [x] ~~`@rat/database`~~: ist `@rat/bunker` geworden
