# rat :: konzept

stand: entwurf v0. alles hier ist vorschlag, nicht beschluss. entscheidungen, die
schon im prototyp stecken, sind mit **(v0)** markiert, offene fragen stehen am ende
jedes abschnitts.

- [1. haltung](#1-haltung)
- [2. die drei eingänge](#2-die-drei-eingänge)
- [3. architektur](#3-architektur)
- [4. reaktivität: `$` ist das signal](#4-reaktivität--ist-das-signal)
- [5. types sind werte](#5-types-sind-werte)
- [6. app: commands, hotkeys, router](#6-app-commands-hotkeys-router)
- [7. was aus dem bestand kommt](#7-was-aus-dem-bestand-kommt)
- [8. roadmap](#8-roadmap)

---

## 1. haltung

| prinzip | konsequenz |
|---|---|
| browser zuerst | compiler und runtime laufen nativ im browser, ohne build. ein build ist eine optimierung, keine voraussetzung |
| build power trotzdem | derselbe compiler läuft als esbuild-/vite-/node-hook. im build darf er mehr: statische analyse, template-cloning, tree-shaking |
| compiler statt runtime-magie | was zur compilezeit entschieden werden kann, wird dort entschieden. die runtime bleibt klein und dumm |
| syntax ist produkt | die schreibweise ist kein nebeneffekt, sondern der kern. jede regel muss sich lesen lassen, ohne die doku zu kennen |
| sichtbare semantik | keine versteckte reaktivität. was reaktiv ist, sieht man am namen (`$count`), nicht an der stelle, an der es deklariert wurde |
| plattform statt abstraktion | native apis, wo sie reichen: `@scope` für css, custom elements, invoker commands, `adoptedStyleSheets` |
| types ohne typescript | schemas sind laufzeitwerte. sie validieren, koerzieren, persistieren und sind vom compiler lesbar |

was ausdrücklich **nicht** das ziel ist: kompatibilität zu react/svelte-ökosystemen,
ein vdom, jsx-1:1-parität, typescript-support als erste klasse.

---

## 2. die drei eingänge

ein kern, drei schreibweisen. alle landen im selben ast und in derselben codegen.

| eingang | datei | build nötig | was er kann |
|---|---|---|---|
| vanilla | `.js` | nein | `html\`…\`` über htx zur laufzeit. die einstiegsdroge, nichts wird transformiert |
| sugar | `.rat.js` | ja (oder browser-compile) | plain js plus sugar: `\|>`, implizites `const` in `for…of`, `$`-signale, `html\`…\`` mit `{…}`-holes wird compiliert **(v0)** |
| component | `.rat` | ja (oder browser-compile) | markup first: `<script>`, `<script module>`, `<style>`, control flow im markup **(v0)** |

der unterschied zu "einem framework mit einem compiler": `.js` bleibt ein vollwertiger
weg. wer keinen compiler will, verliert die sugar, nicht das framework.

### offen
- bekommt `.rat.js` einen eigenen namen für den tag (`rat\`…\``) oder bleibt es `html`?
- soll vanilla-`html\`…\`` (laufzeit) dieselbe `{…}`-hole-syntax verstehen? technisch
  möglich (string-parse zur laufzeit, gecacht wie htm), aber teurer.

---

## 3. architektur

```
           ┌──────────── @rat/compiler ───────────┐
.rat —————►│ parse      markup → ast (+ scripts)     │
.rat.js ——►│ script     |>, for…of, $-signale         |
           │ analyze    reaktive namen, scopes        │
           │ generate   ast → js  (target: dom)      │──► es module
           │ style      <style> → @scope (native)    │
           └───────────────────────────────────┘
                                                   │ importiert
                                                   ▼
                 ┌──────────── @rat/runtime ─────────────┐
                 │ signals    signal computed effect     │
                 │            batch untrack scope        │
                 │ dom        el svg insert when each    │
                 │            match mount style          │
                 └───────────────────────────────────────┘
                                   ▲
                 ┌──────────── @rat/core ────────────────┐
                 │ app        singleton, root element    │
                 │ commands   registry ← 'rat:command'   │
                 │ hotkeys    → commands                 │
                 │ router     → views                    │
                 └───────────────────────────────────────┘
                                   ▲
                 ┌──────────── @rat/types ───────────────┐
                 │ schemas    Bool Enum Num Str List …   │
                 │ reactive   $Bool $List $Dict $Tree …  │
                 └───────────────────────────────────────┘
```

### pakete

| paket | rolle | status |
|---|---|---|
| `@rat/compiler` | `.rat` / `.rat.js` → es module. läuft in browser, node, deno, bun | v0, im repo |
| `@rat/runtime` | signals + fine-grained dom. kein vdom, kein diff von bäumen | v0, im repo |
| `@rat/core` | app-singleton, commands, hotkeys, router | skizze |
| `@rat/types` | schemas + reaktive datentypen | skizze (readme) |
| `@rat/vite`, `@rat/esbuild`, `@rat/node` | build-adapter, dünne hüllen um `compile()` | geplant |
| `@rat/elements` | brücke zu `@aufbau/elements`, components als custom elements | geplant |

### targets der codegen

| target | ausgabe | wann |
|---|---|---|
| `dom` | lesbare `$$.el(…)`-aufrufe, reaktive closures | **(v0)**, default, dev + playground |
| `dom:clone` | statische teilbäume als `<template>` einmal geparst, dann `cloneNode` + gezieltes binden | build, performance |
| `ssr` | string-ausgabe, hydration-marker | später |
| `htx` | `html\`…\``-ausgabe für bestehende htx/preact-projekte (migration, zugriff) | evtl. |

### offen
- `@rat/core` und `@rat/runtime` zusammenlegen? die runtime ist ohne app nutzbar,
  das spricht für trennung.
- eigener ast-typ für `.rat.js`-templates oder exakt derselbe wie `.rat`? (v0: derselbe)

---

## 4. reaktivität: `$` ist das signal

dein bestehendes muster (`$bool`, `$Bool`, "syntax from god") wird zur sprachregel:

```html
<script>
  let   $count  = 0;            // signal
  const $double = $count * 2;   // computed (abgeleitet)
  const step    = 1;            // ganz normales js

  function inc () { $count += step; }
</script>

<button onclick={inc}>{$count} × 2 = {$double}</button>
```

| geschrieben | compiliert zu |
|---|---|
| `let $x = v` | `let $x = $$.signal(v)` |
| `const $x = expr` | `const $x = $$.computed(() => expr)` |
| `$x` lesen | `$x.value` |
| `$x = v`, `$x++`, `$x += v` | `$x.value = v` usw. |
| `{expr}` im markup | `() => expr`, die runtime bindet fein-granular |
| `bind:value={$x}` | das signal selbst, nicht sein wert |

**warum `$` und nicht svelte-`let`:** reaktivität ist an jeder lese- und schreibstelle
sichtbar, nicht nur an der deklaration. man liest eine zeile und weiß, ob sie ein
update auslöst. und es ist dieselbe konvention wie in `@aufbau/signals`.

**regeln (v0):**
- nur deklarierte `$`-namen werden umgeschrieben. ein importiertes `$bool` oder jquery-`$`
  bleibt unangetastet.
- `$`-signale im `<script module>` sind modulweit geteilt, also ein store für alle
  instanzen, ohne store-api.
- mutation in place (`$todos.push(x)`) benachrichtigt nicht. v0: neu zuweisen
  (`$todos = [...$todos, x]`). später: reaktive typen aus `@rat/types` (`$List`).

### offen
- shadowing: ein parameter `$x` in einer inneren funktion wird v0 trotzdem umgeschrieben.
  der compiler braucht eine scope-analyse (geplant in `analyze`).
- props: v0 ist `props` ein objekt mit gettern (reaktiv beim lesen von `props.x`).
  destructuring (`const { x } = props`) liest einmalig. alternative: `$`-destructuring
  (`let { $title } = props` → reaktiv), oder ein `@props`-block.
- index in `@for`: v0 ein einfacher wert, nach umsortierung veraltet. als signal?

---

## 5. types sind werte

kein typescript. stattdessen schemas, die zur laufzeit existieren, und die der
compiler lesen kann, wenn sie statisch sind.

```js
import { Bool, Enum, List, Num, Record, Str } from '@rat/types';

export const Todo = Record({
  id    : Str.uuid,
  title : Str.min(1),
  done  : Bool,
});

export const Settings = Record({
  view : Enum('grid', 'list'),
  zoom : Num.range(50, 200).default(100),
  tags : List(Str),
});
```

was ein schema können soll:

| fähigkeit | zweck |
|---|---|
| `validate` / `coerce` | eingaben, storage, netzwerk |
| `default` | initialwerte, reset |
| `reactive()` | macht aus dem schema einen reaktiven typ (`$Record`, `$List` …) mit passenden verben (`toggle`, `cycle`, `push`) |
| `persist` | über `@bunker` |
| `describe` | introspektion: formulare, devtools, `@aufbau/gui`-controls generieren |
| statisch lesbar | compiler kennt die form: autocompletion, warnungen, gezielte updates |

idee für die notation im `.rat`-script, noch nicht entschieden:

```js
let $view = Enum('grid', 'list');          // a) schema als initialwert, wert = default
let $view : Enum('grid', 'list') = 'grid'; // b) annotation, compiler entfernt sie
```

(a) ist plain js und braucht keinen compiler. (b) liest sich besser, ist aber
neue syntax. tendenz: (a) zuerst.

### offen
- verhältnis zu `@aufbau/store` (typisierter multi-key-store) und `@aufbau/signals`
  (typisierte signale): `@rat/types` als vereinheitlichung beider?
- datenfluss über grenzen (worker, server, storage): schema als vertrag, der überall
  identisch geprüft wird.

---

## 6. app: commands, hotkeys, router

aus dem readme übernommen, der compiler und die runtime haben die einstiegspunkte
schon:

- ein **string** als event-handler ist ein command: `<button onclick='toggleSidebar'>`
  löst `rat:command` mit `{ name, event }` aus (bubbling). **(v0)**
- `@rat/core` hört am app-root darauf und führt aus dem registry aus.
- hotkeys referenzieren commands: `app.hotkeys.set('ctrl+b', 'toggleSidebar')`.
- natives `command`/`commandfor` (invoker commands api) wird ebenfalls gehört, `--toggle-sidebar`
  ↔ `toggleSidebar`.

```js
import { createApp } from '@rat/core';

const app = createApp({ root: '#app' });

app.commands.set('toggleSidebar', () => $sidebar = !$sidebar);
app.hotkeys.set('ctrl+b', 'toggleSidebar');
```

### offen
- commands mit argumenten im markup: `onclick='open:settings'` oder `onclick={['open', 'settings']}`?
- router: datei-basiert (`views/*.rat`) im build, registry im browser?

---

## 7. was aus dem bestand kommt

| quelle | übernahme |
|---|---|
| htx | tag-selektoren (`<div#id.a.b>`), prop-gruppen (`a\|b=`), `class:`-props, merge statt overwrite **(v0, im compiler)**. positional values und `$`-shorthand-tags folgen |
| htx compiler | blockaufteilung (`<script module>`, `<script>`, `<style>`), import-lifting, fehlermeldungen mit zeile/spalte **(v0)** |
| latte | `n:`-attribute → `@if`/`@for` als attribut, `{foreach}…{else}` → `@for … @else` **(v0)** |
| svelte | single-file component, compiler statt vdom |
| preact/signals | fein-granulare reaktivität, `.value`-modell (vom compiler versteckt) |
| php | pragmatismus, markup und logik dürfen nebeneinander stehen |
| `@aufbau/elements` | ui-bausteine, `<write-code>` im playground |
| `@aufbau/store`, `@aufbau/signals` | grundlage für `@rat/types` |
| `@domina` | dom-helfer für runtime und core, wo sinnvoll |
| `@bunker` | persistenz für typen und app-state |

---

## 8. roadmap

1. **v0 (jetzt):** compiler (`dom`-target), runtime, playground in `demos/`.
2. scope-analyse im compiler (shadowing, unbekannte `$`-namen warnen), source maps.
3. `@rat/core` gegen die runtime: commands, hotkeys, router.
4. `@rat/types` v1: schemas + reaktive varianten, anbindung an `$`-deklarationen.
5. build-adapter (vite, esbuild, node-hook), `dom:clone`-target.
6. ~~editor-support: syntax-highlighting für `.rat`~~ → `@rat/syntax` (eine spec, ableitungen für hljs, monaco, codemirror/acode, zed, textmate).
7. erste echte app (kandidat: ein kleines zugriff-tool) komplett in rat.
