# RAT :: todo

```
- aufgabe für claude
* aufgabe für mich
```

---

## todo
- [ ] räum mal dieses dokument auf, das ist aktuell unbenutzbar. todos sind entweder kalre punkte zum ankreuzen – oder es gehhört womöglich garnicht in diese file oder vielleichz ans ende.

## `@rat/app`
- [ ] `<rat-app>` entfernen + `<rat-app2>` wird zu `<rat-app>`
- [ ] handling von runtime-errors in componenten und app via `<rat-app2>` (error boundary)

## @rat/router
- [ ] (?) später untersuchen: ein globaler router, den views direkt abonnieren

## syntax

- [ ] `let` vor `$name` auf oberster ebene innerhalb von `<script>` in `.rat`-file optional machen
- [x] syntax für css-files import/adopt
  - [x] `style adopt` + `<style mode='adopt' />`
  - [x] `style inline` + `<style mode='inline' />`
  - [x] `style link` + `<style mode='link' />`
  - [x] default (ohne mode-angabe) = `adopt`

## sonstiges
- [ ] hotkeys an `app.commands` (`@rat/hotkeys`)
- [ ] später: props an signals andocken (optional, ohne dass domina fest an `@rat/signals` hängt)
- [ ] `/.md` müsste eigtl. mal gründlich aufgeräumt werden (erst absprechen)

## create packages (?)
- [ ] `@rat/analyzer`
- [ ] `@rat/cli`
- [ ] `@rat/database` (ursprünglich dachte ich mir auf basis von `@bunker/db` aber mittlerweile denk ich `@bunker` müsste generell komplett neugebaut werden. denn da geht einiges schief, obwohl es an sich durchaus was unter der haube hat)

---

## vorbereitung

was noch mindestens iwie geklärt/getan werden müsste, damit wir halbwegs mit mit dem app-bau anfangen könnten (und so dann in der praxis weiterentwickeln):

**muss**
- props entscheiden (d-13): heute nur `props.title`. für mehr als eine komponente braucht es eine feste form
- slots: `<slot />` gibt es, benannte slots nicht ([slots](ideas/slots.md)). für layouts (header/main/footer) nötig
- router: erstmal `<app-root>`/`<app-view>` aus aufbau in `app.rat` ausprobieren (entschieden). d-17 ("registry jetzt") danach neu bewerten
- persistenz über `@bunker` (entschieden): `$Record`/`$List` in indexeddb/opfs halten, `persist` in `@rat/types`
- pwa-hülle: `manifest.webmanifest`, icons, service worker fürs offline-cachen. ohne build heißt das: der sw cached `run.js`, die pakete, die `.rat`-dateien und die cdn-urls (acorn, esm.sh)
- ~~`@rat/core`~~ gelöscht. commands und hotkeys sind jetzt `@rat/commands` und `@rat/hotkeys`

**sollte**
- `@await` / async-blöcke (d-28) für daten aus fetch oder indexeddb, sonst alles von hand mit signals

- keys in `@for`: `@for` erkennt eine zeile wieder am objekt selbst (`item => item`). ein neu geladenes oder kopiertes objekt (`{ ...todo, done: true }`, frisch aus der db) ist für ihn eine neue zeile: die alte wird weggeworfen, die neue neu gebaut. sichtbar wird das an fokus, halb getipptem text, offenen `<details>`, scrollpositionen in der zeile. lösung: ein schlüssel, z.b. `@for (todo of $todos; key todo.id)`
(anmerkung: `key` sollten wir generell mal besprechen, das wäre ja auch an andern stellen nützlich)
- `@for`-index (d-15): wie man an den index kommt, ist noch offen (eigenes thema, unabhängig von keys)
- produktion: ein build-schritt (oder der sw kompiliert einmal und cached das ergebnis), sonst kompiliert jedes laden neu (anmerkung: das ist aktuell noch nicht so wichtig, würde ich im anschluss machen, solang echt grundstruktur in der praxis klar, die config der apps usw]

**klären**
- welche app als testobjekt? (zugriff-teil, notes, todos …) danach richtet sich, was von "sollte" vorgezogen wird (siehe `rat/apps` im repo)

## app-gerüst (`<rat-app2>`, `<rat-view>`, `<rat-area>`): gebaut
`packages/app/elements/` (`@rat/app/shell`), demo `demos/app2`. look (skin, palette, density …) läuft über gestalt, `<rat-app2>` reicht nur durch.

**`@domina/element`**
- `static props = { name: Schema }` statt `static attr`. jedes standard schema (`~standard`: `@rat/types`, zod, valibot), domina kennt nur die schnittstelle
- zugriff: `this.props.x`, dazu kurzform `this.x` (getter/setter pro prop). name kollidiert mit htmlelement (`title`, `hidden` …): warnung, dann nur über `.props`
- `this.dom`: `@domina/proxy` auf das element begrenzt. `all()`, `find()`, `filter()` nehmen matcher-objekt (`{ active: true }`) oder selektor-string
- `this.observe`: `@domina/observer`. `added(sel, fn)`, `removed(sel, fn)`, `resized(fn)`, `visible(fn)`, `attr(name, fn)`, räumt beim entfernen selbst auf
- schema regelt startwert (`initial`), attribut → prop (umwandlung des schemas: `'120'` → 120, `Bool` = anwesenheit), prop → attribut (einfache werte immer zurückgespiegelt, listen/records bleiben reine props)
- ungültiger wert: warnung, alter wert bleibt (wie typisierte signals)
- prop ist ein schema (kurz) oder `{ type, onChange }`: `type` ein standard schema oder `String`/`Number`/`Boolean`, `onChange` und weiteres (später `reflect: false`) versteht domina selbst, nicht das schema
- änderungen über `onChange` pro prop, keine signals


**`@rat/router`**
- eigenständig (`createRouter({ mode, base })`), einer pro app: `app.router`
- modi: `hash`, `path`, `query`, `memory`, eigener als `{ read, write, listen }`
- muster `:id`, `:id?`, `*`, eigener matcher. `path`-modus fängt links derselben herkunft ab, `data-native` lässt durch
- `router.path`, `.params`, `.query`, `.go(to, { replace })`, `.back()`, `.on('change')`, `.$path` als signal
- verschachtelt: `<rat-view>` in `<rat-view>`, `route` relativ zur eltern-view, pro ebene genau eine aktiv (erste passende), params aller ebenen gesammelt
- guards: `router.on('leave', event => event.preventDefault())`, async, auch pro view, `{ unload: true }` hängt sich an `beforeunload`
- `<rat-view route src>` lädt über den loader von `@rat/app`, params als props


**`<rat-app2>`, `<rat-view>`, `<rat-area>`**
- genau eine `<rat-app2>` pro seite (das root-element), eine zweite: warnung, wird ignoriert
- `<rat-app2>`: `app.router`, `app.commands` (`go`, `back` vom router), `ready()` beendet `[loading]` mit view transition. lade-screen ist der splash aus `run.js`
- `<rat-view>`: `active`, `name`, `route` (relativ zur eltern-view), `src`, `transition`. aktiv macht nur der router
- `<rat-area>` statt `<app-area>`: sidebar, drawer, bottom-sheet, das grid stellt `<rat-app2>`
- matching pro ebene: erst exakt, dann als anfang des pfads (nur views mit views darin oder ungeladenem `src`), zuletzt routen mit `*`
- guard pro view: `view.on('leave', fn, { unload })`, die app fragt nur die views, die die navigation wegnimmt (innerste zuerst)
- `[loading]` endet von selbst, sobald die aktiven views gemountet sind und `app.hold(promise)` erledigt ist
- `<rat-area>` übernimmt die semantik von `<app-area>`: eine angedockte area ist nur mit `open` (oder `peek`) sichtbar

---


