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

# notizen

```
|? |! |~ |. |: |@ |# |$ |+ |- |* |^ |= |1
```
