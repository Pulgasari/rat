# RAT :: todo

offen, zum abhaken. entschiedenes steht in [decisions.md](decisions.md).

## `@rat/app`
- [ ] `<rat-app>` entfernen, `<rat-app2>` wird `<rat-app>` (mit `src`: lädt `app.rat` und mountet in sich)
- [ ] (?) `<rat-part>` auf `@domina/element`
- [ ] `<rat-part>` lädt auch `.htx` und `.html`
- [ ] error boundary: laufzeitfehler in komponenten in der view/part anzeigen statt die app zu verlieren
- [ ] `<rat-overlay>` auf `<dialog>` (modernes html nutzen: top layer, inert, escape)
- [ ] umschalten per `name` (area, overlay …), beide formen bauen und in der praxis vergleichen: event `rat:toggle` und funktion `rat.toggle(name)`
- [ ] hotkeys an `app.commands` (`@rat/hotkeys`)
- [ ] auto-import per config: `autoImport: true` (verzeichnis der app), `['pathX', …]`, `{ pathX: ['Dock', 'Footer'] }`
- [ ] app-config (`config.rat.js`, `rat.config`, `rat.app`), plugins (`@rat/plugins/*`)
- [ ] pwa-hülle: manifest, icons, service worker (cached `run.js`, pakete, `.rat`-dateien, cdn-urls)

## `@rat/router`
- [ ] (?) globaler router, den views direkt abonnieren

## syntax
- [ ] props nach d-13 b umsetzen (`let { $title } = props`)
- [ ] `let` vor `$name` auf oberster ebene im `<script>` optional (`const` bleibt pflicht)
- [ ] (ungeklärt, verschoben) persistenz eines signals: form klären (statt `$(init, '[persist]')`, idee: `persist $filter;`)
- [ ] sichtbarer anfang/ende einer komponente statt `<>` (`<self>`?)
- [ ] meta-angaben in der ersten zeile (`<!-- rat:root -->` o.ä.)
- [ ] schema mit ui-hinweisen (`Enum({ values, element: { look } })`), form klären
- [ ] benannte slots ([slots](ideas/slots.md)), für layouts
- [ ] `@await` / async-blöcke (d-28)
- [ ] `key` generell besprechen (`@for (todo of $todos; key todo.id)` und anderswo)
- [ ] `@for`-index (d-15)
- [ ] (idee, gemerkt) ein wert für mehrere attribute: `name+src='nav'` / `icon|title='settings'`

## apps
- [ ] testobjekt: `apps/notes` lauffähig machen
- [ ] später: build-schritt bzw. sw kompiliert einmal und cached

## sonstiges
- [ ] props an signals andocken (optional, ohne dass domina fest an `@rat/signals` hängt)
- [ ] `/.md` gründlich aufräumen (erst absprechen)

## packages (?)
- [ ] `@rat/analyzer`
- [ ] `@rat/cli`
- [ ] `@rat/database` (`@bunker` müsste dafür eigtl. neu gebaut werden)
