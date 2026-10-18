# RAT :: todo

```
- aufgabe für claude
* aufgabe für mich
```

---

## syntax

- [x] syntax für css-files import/adopt
  - [x] `style adopt` + `<style mode='adopt' />`
  - [x] `style inline` + `<style mode='inline' />`
  - [x] `style link` + `<style mode='link' />`
  - [x] default (ohne mode-angabe) = `adopt`
  - `link`: `<link rel=stylesheet>` im head, global. `adopt`: per fetch, constructable stylesheet, global. `inline`: beim compilieren in den `<style>` der komponente kopiert, also gescoped, kein request zur laufzeit. `.scss`/`.ass` laufen durch ihre sprache
  - `url(…)` in adoptierten und inline-dateien zeigt auf die datei, nicht die seite. `@import` geht bei `adopt` nicht (constructable stylesheets können das nicht), dafür `link`
  - im chromium geprüft, alle drei modi + tag-form + eigener `<style>` + `const style = …` bleibt normales js. doku: `syntax.md#css-files`

```html
<script>
  style link 'https://code.pulgasari.dev/aufbau/css/aufbau.css';
  style adopt 'https://code.pulgasari.dev/aufbau/gestalt/gestalt.css';
  style inline 'localfile.css';
</script>

<style mode='link'   src='https://code.pulgasari.dev/aufbau/css/aufbau.css' />
<style mode='adopt'  src='https://code.pulgasari.dev/aufbau/gestalt/gestalt.css' />
<style mode='inline' src='localfile.css' />
```

- [ ] `const/let/var` vor `$name` optional machen (?)
  - meine einschätzung: **nicht ganz weglassen.** das keyword trägt in rat bedeutung: `let $x` = signal (schreibbar), `const $x` = computed (abgeleitet). ohne keyword ist `$double = $count * 2` mehrdeutig: einmal ausgerechnet oder mitlaufend?
  - zweites problem: `$x = 5` in einer funktion. neue variable oder zuweisung an die äußere? ohne keyword müsste "erstes vorkommen = deklaration" gelten, das kippt beim umsortieren von code
  - was ginge: **nur `let` weglassbar**, auf oberster ebene im `<script>`: `$count = 0` = `let $count = 0`. `const` bleibt für computeds pflicht. das ist eindeutig und spart das häufigste keyword
  - [ ] a) so lassen (keyword pflicht)
  - [ ] b) `let` auf oberster ebene weglassbar, `const` bleibt
  - [ ] c) beides weglassbar, computed per eigenem operator (z.b. `$double := $count * 2`)

## vorbereitung
- [x] was fehlt bis zu einer test-pwa (stichpunkte, nach dringlichkeit)

**muss**
- props entscheiden (d-13): heute nur `props.title`. für mehr als eine komponente braucht es eine feste form
- slots: `<slot />` gibt es, benannte slots nicht ([slots](ideas/slots.md)). für layouts (header/main/footer) nötig
- router: erstmal `<app-root>`/`<app-view>` aus aufbau in `app.rat` ausprobieren (entschieden). d-17 ("registry jetzt") danach neu bewerten
- persistenz über `@bunker` (entschieden): `$Record`/`$List` in indexeddb/opfs halten, `persist` in `@rat/types`
- pwa-hülle: `manifest.webmanifest`, icons, service worker fürs offline-cachen. ohne build heißt das: der sw cached `run.js`, die pakete, die `.rat`-dateien und die cdn-urls (acorn, esm.sh)
- ~~`@rat/core`~~ gelöscht. commands und hotkeys sind jetzt `@rat/commands` und `@rat/hotkeys`

**sollte**
- `@await` / async-blöcke (d-28) für daten aus fetch oder indexeddb, sonst alles von hand mit signals
- fehleranzeige: compile-fehler zeigt `<rat-app>` schon, laufzeitfehler in komponenten noch nicht (keine error boundary)
- keys in `@for`: `@for` erkennt eine zeile wieder am objekt selbst (`item => item`). ein neu geladenes oder kopiertes objekt (`{ ...todo, done: true }`, frisch aus der db) ist für ihn eine neue zeile: die alte wird weggeworfen, die neue neu gebaut. sichtbar wird das an fokus, halb getipptem text, offenen `<details>`, scrollpositionen in der zeile. lösung: ein schlüssel, z.b. `@for (todo of $todos; key todo.id)`
- `@for`-index (d-15): wie man an den index kommt, ist noch offen (eigenes thema, unabhängig von keys)
- produktion: ein build-schritt (oder der sw kompiliert einmal und cached das ergebnis), sonst kompiliert jedes laden neu

**klären**
- d-26 (`@name` vs `use:name`): betrifft jede app-ui. d-16 ist entschieden (siehe app-gerüst)
- welche app als testobjekt? (zugriff-teil, notes, todos …) danach richtet sich, was von "sollte" vorgezogen wird

## app-gerüst (`<rat-app2>`, `<rat-view>`): entschieden, noch nicht gebaut
skizze: `packages/app/elements/rat-app2.js`. look (skin, palette, density …) läuft über gestalt, `<rat-app2>` reicht nur durch.

**`@domina/element`**
- `static props = { name: Schema }` statt `static attr`. jedes standard schema (`~standard`: `@rat/types`, zod, valibot), domina kennt nur die schnittstelle
- zugriff: `this.props.x`, dazu kurzform `this.x` (getter/setter pro prop). name kollidiert mit htmlelement (`title`, `hidden` …): warnung, dann nur über `.props`
- `this.dom`: `@domina/proxy` auf das element begrenzt. `all()`, `find()`, `filter()` nehmen matcher-objekt (`{ active: true }`) oder selektor-string
- `this.observe`: `@domina/observer`. `added(sel, fn)`, `removed(sel, fn)`, `resized(fn)`, `visible(fn)`, `attr(name, fn)`, räumt beim entfernen selbst auf
- schema regelt startwert (`initial`), attribut → prop (umwandlung des schemas: `'120'` → 120, `Bool` = anwesenheit), prop → attribut (einfache werte immer zurückgespiegelt, listen/records bleiben reine props)
- ungültiger wert: warnung, alter wert bleibt (wie typisierte signals)
- prop ist ein schema (kurz) oder `{ type, onChange }`: `type` ein standard schema oder `String`/`Number`/`Boolean`, `onChange` und weiteres (später `reflect: false`) versteht domina selbst, nicht das schema
- änderungen über `onChange` pro prop, keine signals
- [ ] später: props an signals andocken (optional, ohne dass domina fest an `@rat/signals` hängt)

**`@rat/router`**
- eigenständig (`createRouter({ mode, base })`), einer pro app: `app.router`
- modi: `hash`, `path`, `query`, `memory`, eigener als `{ read, write, listen }`
- muster `:id`, `:id?`, `*`, eigener matcher. `path`-modus fängt links derselben herkunft ab, `data-native` lässt durch
- `router.path`, `.params`, `.query`, `.go(to, { replace })`, `.back()`, `.on('change')`, `.$path` als signal
- verschachtelt: `<rat-view>` in `<rat-view>`, `route` relativ zur eltern-view, pro ebene genau eine aktiv (erste passende), params aller ebenen gesammelt
- guards: `router.on('leave', event => event.preventDefault())`, async, auch pro view, `{ unload: true }` hängt sich an `beforeunload`
- `<rat-view route src>` lädt über den loader von `@rat/app`, params als props
- [ ] später untersuchen: ein globaler router, den views direkt abonnieren

**`<rat-app2>`, `<rat-view>`, `<rat-area>`**
- genau eine `<rat-app2>` pro seite (das root-element), eine zweite: warnung, wird ignoriert
- `<rat-app2>`: `app.router`, `app.commands` (`go`, `back` vom router), `ready()` beendet `[loading]` mit view transition. lade-screen ist der splash aus `run.js`
- `<rat-view>`: `active`, `name`, `route` (relativ zur eltern-view), `src`, `transition`. aktiv macht nur der router
- `<rat-area>` statt `<app-area>`: sidebar, drawer, bottom-sheet, das grid stellt `<rat-app2>`
- entfällt gegenüber der skizze: routing-code, `start()` mit mutationobserver, `sync()`/`applySkin()`, die `defineProperty`-schleife, der spinner in `styles()`

**commands mit argumenten (d-16 → entschieden)**
- `onclick='go[settings]'`, mehrere mit komma: `move[up, 3]`. `rat:command` trägt `{ name, args, event }`
- der router meldet `go` und `back` an. `go[x]` nimmt die route (`/settings`, auch ohne `/`), eine view mit `name="settings"` ist ebenso erreichbar

