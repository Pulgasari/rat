# RAT :: todo

```
- aufgabe für claude
* aufgabe für mich
```

---

# repo
- [ ] md-files (ausser `todo.md`) sollten englisch sein (alles möglichst lowercase außer bei hervorhebungen, eigennamen usw.)

---

# syntax

## html-direktiven
- [x] syntax 1: geschweifte klammern um blocks
- [ ] syntax 2 ("indentation based layout"): geschweifte klammern um blocks können weggelassen werden, stattdessen muss kontextuales korrekt indentiert werden
- [ ] syntax 3: alternative, falls sich oneliner mal anbiedet. (unklar: doppelpunkt wirklich nötig? brauchts endmarker? mehrere direkten in one line?)

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

- [ ] range literals `1..10` `a..d` (evtl. auch im js falls es sich bewährt?)

## htx
* [ ] shorthand-syntax `<$xyz>` mit `$` sollte evtl. neu konzipiert bzw. ersetzt werden
* [ ] (?) `cmd='name'` -> `command='--name'`
* [ ] (?) `cmd:#sidebar` -> `command='--name' commandfor='#sidebar'`
- [ ] prüfen: ist der pipe-operator korrekt implementiert?

```javascript
// implicit
let bla = 'Some Example' |> eene |> meene |> muh;

// explicit
let bla = 'Some Example' |> doThis(#) |> doThat(33, #) |> doMore({ a: #, b: null, c: #);

// das müsste eigtl. nich funktionieren dürfen, sonst krumm, oder?
let bla = 'Some Example' |> eene() |> meene() |> muh();
```

- [ ] überlegung und ggf. konzept für weitere pipe-operators (reduce `|*`, pluck `|.`, filter `|?` + `|!`, map `|`). überhaupt sinnvoll?

---

# notizen

```
|? |! |~ |. |: |@ |# |$ |+ |- |* |^ |=
```
