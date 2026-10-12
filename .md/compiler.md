# rat :: compiler v0

## pipeline

```
source ──► parse ──► ast ──► generate ──► es module
             │                  ▲
             └─► scripts ──► script (sugar → acorn → reactive) ─┘
             └─► styles ───► style (@scope)
```

| datei | aufgabe |
|---|---|
| `parse.js` | markup → ast. handgeschriebener recursive descent. js in holes wird nur abgegrenzt (acorn-tokenizer findet das schließende `}` / `)`), nicht geparst |
| `script.js` | `sugar` (token-basiert: `\|>`, `for…of`), dann acorn-parse, dann reaktive umschreibung (`$x` → `$x.value`, deklarationen → `signal` / `computed`) |
| `generate.js` | ast → lesbare `$$.el(…)`-aufrufe. element-props werden closures, component-props getter |
| `style.js` | `<style>` → `@scope ([data-rat="hash"]) { … }` |
| `util.js` | fehler mit zeile/spalte, token-scanner, edit-anwendung, namen |
| `index.js` | `compile()`, unterscheidet `.rat` und `.rat.js` |

## entscheidungen

- **acorn ist die einzige abhängigkeit.** js wird nie mit regex gelesen. der tokenizer
  wird auch für das abgrenzen von holes benutzt, weil er strings, templates und regex
  korrekt erkennt und `|>` toleriert (zwei tokens, keine grammatik-prüfung).
- **sugar vor dem parse.** acorn kennt `|>` nicht, also wird auf token-ebene umgeschrieben,
  bevor ein ast existiert. nachteil: fehlerpositionen nach einer pipe sind ungenau.
- **nur einfügungen.** die reaktive umschreibung fügt ausschließlich text ein (`.value`,
  `$$.signal(` … `)`), sie ersetzt nichts. dadurch kollidieren edits nie, und es braucht
  kein magic-string.
- **lesbare ausgabe vor schneller ausgabe.** das `dom`-target ist für das nachdenken
  gebaut. das schnelle target (`dom:clone`) kommt als zweites, mit identischem ast.

## performance-notizen

| stelle | status | ursache / plan |
|---|---|---|
| `el()` pro element | ok für v0 | jedes element wird einzeln erzeugt. `dom:clone`: statische teilbäume einmal als `<template>` parsen, dann `cloneNode(true)` und nur die dynamischen stellen über pfade binden (der ansatz von svelte 5 / solid). typisch 2–5× schneller bei großen listen |
| statische holes | kleiner overhead | jeder `{…}`-hole wird ein effect, auch `{42}`. der compiler kann literale und nicht-reaktive ausdrücke erkennen (keine `$`-namen, kein `props.`, keine aufrufe) und direkt einsetzen |
| `each()` umsortieren | **engpass bei großen listen** | jeder update verschiebt alle knoten einmal (`insertBefore` pro item). lösung: longest increasing subsequence, dann werden nur verdrängte items bewegt |
| `each()` index | korrektheit | der index ist ein einfacher wert und veraltet beim umsortieren eines wiederverwendeten items. als signal geben, wenn der body ihn benutzt (compiler weiß das) |
| computeds ohne cutoff | unnötige läufe | ein computed, dessen wert gleich bleibt, weckt trotzdem seine effects. lösung: equality-check vor dem propagieren (push-pull mit zwei phasen: stale → check) |
| `pipes()` | compilezeit | re-tokenisiert pro pipe (o(n·p)). irrelevant für normale dateien, bei generiertem code mit hunderten pipes ein einziger pass |
| `@scope` | nativ | kein laufzeit-overhead, kein selektor-umschreiben |

## offene technische punkte

- scope-analyse: shadowing von `$`-namen (parameter, innere deklarationen) erkennen.
- source maps (die edit-liste enthält die information bereits).
- mehrere `<script>`-blöcke: namen aus block 2 gelten v0 nicht in block 1.
- `.rat.js`: templates mit `${…}` bleiben unangetastet (laufzeit-htx). mischformen?
- imports zwischen `.rat`-dateien im playground (virtuelles dateisystem, blob-urls pro datei).
