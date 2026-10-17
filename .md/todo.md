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
- d-16 (commands mit argumenten), d-26 (`@name` vs `use:name`): betreffen jede app-ui
- welche app als testobjekt? (zugriff-teil, notes, todos …) danach richtet sich, was von "sollte" vorgezogen wird
