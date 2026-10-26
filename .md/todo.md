# RAT :: todo

## @rat/app
- [ ] move `/store.js` to `/modules/store.js`
- [ ] create module drivers:
  - [ ] database
  - [ ] dialogs
  - [ ] external
  - [ ] files
  - [ ] folders
  - [ ] hotkeys
  - [ ] notifications
  - [ ] thumbnails

offen, zum abhaken. entschiedenes steht in [decisions.md](decisions.md).

## `@rat/app`
- [ ] (?) `<rat-part>` auf `@domina/element`
- [ ] error boundary: eigene fehleranzeige (z.b. `<template slot="error">`)
- [ ] `<rat-overlay>` auf `<dialog>` (modernes html nutzen: top layer, inert, escape)
- [ ] `<rat-overlay>` ebenso per `name` umschalten

## syntax
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
- [x] testobjekt: `dev/apps/notes` lauffähig machen (dazu `dev/apps/icons`, siehe `dev/apps/README.md`)
- [x] einmal kompilieren: der loader hält kompilate im cache api, compiler und acorn laden nur bei einer änderung

## sonstiges
- [x] `@rat/bunker`: Store, Database, Files, memo (siehe decisions.md)
- [x] notes: `FolderLibrary` durch `@rat/bunker` Files ersetzt (`apps/.shared/folders.js`, handles in der tabelle `folders`)
- [ ] `@rat/bunker` nach `@bunker` umziehen, sobald es sich in den apps bewährt hat
- [x] compiler: ein nicht geschlossenes element als solches melden (auch das, das ein falsches schließ-tag zugemacht hat)
- [ ] props an signals andocken (optional, ohne dass domina fest an `@rat/signals` hängt)
- [ ] `/.md` gründlich aufräumen (erst absprechen)

## packages (?)
- [ ] `@rat/analyzer`
- [ ] `@rat/cli`
- [x] ~~`@rat/database`~~: ist `@rat/bunker` geworden
