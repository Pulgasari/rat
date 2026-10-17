# RAT :: todo

```
- aufgabe für claude
* aufgabe für mich
```

---

# repo
- [x] md-files (ausser `todo.md`) sollten englisch sein (alles möglichst lowercase außer bei hervorhebungen, eigennamen usw.)
  - neu: `ideas.md` (pipe-familie, inspiration, style-sprachen), `decisions.md` (deine entscheidungen zum ankreuzen)

---

# syntax

- [x] `<p @if={$error}>{$error}</p>` das mag ich derart am element überhaupt nicht und durch die direktiven drumherum auch unnötig. können wir ausbauen.
  - ausgebaut. `@if`/`@for` als attribut sind jetzt ein fehler mit hinweis, `@name` auf elementen ist frei für behaviors
- [x] ich hab in `ideas.md` und `decisions.md` bisschen was aufgeschrieben, entschieden, angemerkt. da gibts also zumindest bisschen was zum abarbeiten. guck ersma dort.
  - umgesetzt: d-04 (tabs/spaces mischen = fehler), d-07 (`Range` + `[a..b]`), d-09 (`x |> f()` = `f()(x)`), d-11 (`html`/`htx`/`rat`), d-20 (`scss`/`ass` eingebaut, `compileAsync`), behaviors (`@name` + `use:name`), event-modifier (`[keys]`, `!`, `:once`/`:N`), spread-merge
  - entschiedenes steht jetzt unten in `decisions.md` unter "decided", neue fragen: d-24 bis d-30. antworten auf deine notizen: `ideas.md` ("reply:"), named cases: `ideas.md#5-named-cases`
- [x] wenn `use`/`@` sitzt könnten wa direkt mal `@aufbau/patterns` und `@aufbau/filters` in demo-seite für diese syntax nutzen
  - `demos/examples/behaviors.rat` (playground: "behaviors"): `@pattern`, `use:filter`, `@flash:click`, dazu key-filter, `!`, `:once`, `:3`

- [x] neue anmerkungen in `decisions.md` und `ideas.md` (runde 2)
  - entschieden + gebaut: d-12 (nein), d-14 a (schema als startwert, `@rat/types` v0), d-24 (`!`), d-25 d (alle drei formen, neu `once:click`), d-27 (`@fragment`), named cases (`case`, `is`, `@case Name` mit teilen)
  - antworten: `<|` bei d-10 (plus option e: nur `|>` und `|?>`), "3 namen?" in `ideas.md` 5, rückfrage zum `>` bei d-19
  - nebenbei: `runtime/shared.js` (14.10.) hatte `isFn`/`isString` vertauscht, `mount()` und alle behaviors waren dadurch kaputt. behoben
  - runtime: computeds mit cutoff (gleicher wert weckt keine effekte mehr), siehe `compiler.md`

- [x] `ideas.md` aufteilen: ein thema pro datei in `.md/ideas/`, die entscheidungen direkt mit in die jeweilige datei
  - 29 dateien plus `ideas/README.md` (offene entscheidungen, alle themen mit status, shortlist). `decisions.md` ist nur noch ein index, alte links `decisions.md#d-xx` gehen weiter
  - neu: `ideas/parts.md` (`htx-part` als idee für rat: `<rat-part>`, `lazy:`) und `ideas/no-build.md` (compilieren im browser, die tricks aus `@htx/elements/load.js`)

- [x] reaktivität als idee festhalten: `ideas/reactivity.md`
  - alien-signals als kern hinter eigener fassade (d-32), `$()` mit registry, `reactive(Class, { reads, writes })` für varianten, d-23 dorthin verschoben, paketname `@rat/signals` oder `@rat/reactivity` (d-31)

- [x] `@rat/signals` bauen (d-31, d-32): kern auf alien-signals, fassade, `$()`, registry, `reactive()`; `$List`, `$Map`, `$Set` in `@rat/types`
  - der compiler schreibt `$$.$(…)` statt `$$.signal(…)`. `$()` gibt immer ein signal zurück, die registry entscheidet über die variante seines werts
  - `let $bla = new $Map` bleibt im output wie geschrieben (kein `$()`, kein `.value`), sieht also in `.js`, `.rat.js` und `.rat` gleich aus. neu zuweisen ist ein compile-fehler
  - offen: auch `let $todos = []` / `new Map` direkt als variante statt als signal mit variante? geht nur, wenn `$todos` nie neu zugewiesen wird, auch nicht aus markup-handlern
  - `$List` greift erst, wenn `@rat/types` geladen ist (die registry füllt sich beim import)
  - `@domina/render`: iterierbare werte (set, generator, `$List`) rendern als liste

## html-direktiven
- [x] syntax 1: geschweifte klammern um blocks
- [x] syntax 2 ("indentation based layout"): geschweifte klammern um blocks können weggelassen werden, stattdessen muss kontextuales korrekt indentiert werden
  - compiler + highlighting, beispiel: `demos/examples/blocks.rat`. tabs/spaces: `decisions.md` d-04
- [x] syntax 3: alternative, falls sich oneliner mal anbiedet. (unklar: doppelpunkt wirklich nötig? brauchts endmarker? mehrere direkten in one line?)
  - gebaut mit doppelpunkt, ende = zeilenende oder `@else`, mehrere direktiven erlaubt. die drei fragen: `decisions.md` d-01 bis d-03

```html
<!-- syntax 1 -->
<ul>
  @for (todo of $shown) {
    <li>...</li>
  } @else {
    <li>nichts zu tun</li>
  }
</ul>
```
```html
<!-- syntax 2 -->
<ul>
  @for (todo of $shown)
    <li>...</li>
  @else
    <li>nichts zu tun</li>
</ul>
```
```html
<!-- syntax 3 -->
<ul>
  @for (todo of $shown): <li>...</li>
  @else: <li>nichts zu tun</li>
</ul>
```

- [x] range literals `1..10` `a..d` (evtl. auch im js falls es sich bewährt?)
  - `1..10`, `5..1`, `'a'..'d'`, `0..$count`, überall wo script-sugar gilt. offen: exklusiv, schritte, nackte buchstaben (`decisions.md` d-05 bis d-07)

## htx
* [ ] shorthand-syntax `<$xyz>` mit `$` sollte evtl. neu konzipiert bzw. ersetzt werden
* [ ] (?) `cmd='name'` -> `command='--name'`
* [ ] (?) `cmd:#sidebar` -> `command='--name' commandfor='#sidebar'`
- [x] prüfen: ist der pipe-operator korrekt implementiert?
  - war er nicht: `x |> f(a)` hat `x` als erstes argument eingesetzt. jetzt: implizit (`|> fn`), explizit mit `#` (mehrfach erlaubt, wert wird einmal gebunden), `|> eene()` ist ein fehler mit hinweis

```javascript
// implicit
let bla = 'Some Example' |> eene |> meene |> muh;

// explicit
let bla = 'Some Example' |> doThis(#) |> doThat(33, #) |> doMore({ a: #, b: null, c: #);

// das müsste eigtl. nich funktionieren dürfen, sonst krumm, oder?
let bla = 'Some Example' |> eene() |> meene() |> muh();
```

- [x] überlegung und ggf. konzept für weitere pipe-operators (reduce `|*`, pluck `|.`, filter `|?` + `|!`, find `|1` map `|`). überhaupt sinnvoll?
  - `ideas.md#1-a-pipe-family`: `|!`, `|1`, `|` und einige andere sind schon gültiges js (`a | !b`). entscheidung: `decisions.md` d-10

## `.rat` files
- [x] prüfen inwiefern `<style type='scss'>...</style>` (umd andere mäglich wäre ohne viel tamtam
  - gebaut als hook: `compile(source, { styles: { scss } })`, `lang=` oder `type=`. einordnung: `ideas.md#3-style-languages`, entscheidung: `decisions.md` d-20

## sonstiges
- [x] evtl. mal bzgl. gute/passende ideen oder inspiration schauen bei: haskell, php, svelte, jquery, latte, laravel, lit, rescript oder andere solide projekte
  - `ideas.md#2-inspiration`
- [x] selbe aufgabe again, aber schau diesmal bei 10 anderen sprachen. such selber aus. überrasch mich. ^^
  - `ideas.md#4-inspiration-round-2`: elixir, clojure, f#, swift, kotlin, raku, gleam, zig, imba, ruby
- [x] (aus dem chat) jquery, htmx, lit und elm genauer anschauen: was sie können, wie, welche konzepte
  - jetzt als einzelne steckbriefe in `pulgasari.github.io/md/webdev/libs/` (jquery, htmx, lit, elm, dazu hyperscript, arrowjs, lynxjs, tsrx, fresh, ejs)

---

# als nächstes (stand 15.10.)

## fehler und lücken
- [ ] `@rat/core` ist nicht lauffähig: importiert `./datatypes.js` (gibt es nicht), nutzt `toDashed`/`toUndashed` und ein globales `htx` ohne import. neu aufsetzen nach `concept.md` 6: `createApp`, kommando-registry auf `rat:command`, hotkeys, router-registry (d-17)
- [x] computeds lösen sich nie von ihren quellen (leak)
  - erledigt mit `@rat/signals` (alien-signals: `unwatched`)
- [ ] `@for`-index veraltet nach umsortieren (d-15, empfehlung `$loop`)
- [ ] `@case` mit importiertem case: matcht, gibt aber keine teile an den zweig (der compiler kennt sie nicht)
- [ ] zed-grammatik und acode-plugin neu generieren (`cd packages/syntax && npm i && node build.js`): `@fragment`, `once:`, `is` sind nur in spec und textmate drin

## compiler
- [ ] statische holes (`{42}`, ausdrücke ohne `$`/`props.`/aufrufe) direkt einsetzen statt als effect
- [ ] scope-analyse: schatten von `$`-namen (parameter, innere deklarationen) erkennen, unbekannte `$`-namen warnen (roadmap 3)
- [ ] source maps (die edit-liste hat die infos schon)
- [ ] mehrere `<script>`-blöcke: namen aus block 2 gelten in block 1 nicht

## runtime
- [ ] leave-animationen: behavior darf `{ leave (done) }` liefern, runtime entfernt erst nach `done()` (ideas 2.11)
- [x] `Set`s pro abhängigkeit, kopie pro schreibzugriff, neuaufbau pro lauf
  - erledigt mit `@rat/signals`

## `@rat/types`
- [ ] reaktive varianten mit verben: `$List`, `$Map`, `$Set` gebaut (d-23 c). `Enum` als datentyp mit `.value` / `.cycle()` und `$Enum` gebaut; `List(Str)` ist wieder das schema (aufruf = schema, `new` = wert). `Record`, `Tuple`, `Color` als datentyp + schema, `$Record` und `$Color` gebaut; `Union` nur als schema (ein union-wert ist ein wert eines seiner fälle). offen: varianten mit einem signal pro schlüssel, wo es sich lohnt; benannte css-farben in `Color`
- [ ] `persist` über `@bunker`
- [ ] der compiler liest statische schemas (completion, warnungen)

## werkzeuge und betrieb
- [ ] build-adapter: vite, esbuild, node-hook (roadmap 6)
- [ ] service worker, der `.rat` auf anfrage compiliert (d-20, browser ohne build)
- [ ] playground: imports zwischen `.rat`-dateien (virtuelles dateisystem)
- [ ] `packages/_compiler` (alter generator) und `packages/compiler/_parserblocks.js` (fremder, ungenutzter code) aufräumen, wenn der vergleich nicht mehr gebraucht wird

## deine entscheidungen
* [ ] offen: d-10 (pipe-familie, neu: option e), d-13 (props), d-15 (index), d-16 (kommandos mit argument), d-19 (das `>`?), d-26 (`@` oder `use:`), d-28 (`@await`), d-29 (filter in `@for`), d-30 (patterns direkt im `@case`)

## danach
- [ ] erste echte app komplett in rat (roadmap 7, kandidat: kleines zugriff-tool)

---

# notizen

```
|? |! |~ |. |: |@ |# |$ |+ |- |* |^ |= |1
```
