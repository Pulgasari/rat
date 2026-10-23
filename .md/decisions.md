# RAT :: decisions

getroffene entscheidungen, ohne bestimmte ordnung. offenes steht in [todo.md](todo.md).

## syntax: css-files
- `style adopt` / `style inline` / `style link` im `<script>`, als tag `<style mode='adopt|inline|link' src='…' />`. ohne mode: `adopt`

## props in `.rat`-komponenten (d-13)
- b: `let { $title, size = 'm' } = props`. ein name mit `$` bleibt reaktiv (signal), ohne `$` ist es der wert beim mount. dieselbe `$`-regel wie überall
- c (eigener `@props { … }`-block) verworfen: macht dasselbe wie b, nur mit neuer syntax statt destrukturierung. blocks sind fürs markup da

## vorbereitung (frühere festlegungen)
- persistenz über `@bunker`: `$Record`/`$List` in indexeddb/opfs halten, `persist` in `@rat/types`
- `@rat/core` gelöscht, commands und hotkeys sind `@rat/commands` und `@rat/hotkeys`
- commands mit argumenten (d-16): `onclick='go[settings]'`, `move[up, 3]`

## `@domina/element`: media, a11y
- `this.media` (`dark`, `light`, `hover`, `coarse`, `print`, `matches(query)`, `on(query, fn)`), `this.a11y` (`reducedMotion`, `contrast`, `forcedColors`, `reducedTransparency`). a11y als eigener namespace, dort kommt später eine eigene schicht barrierefreiheit hinein

## app-gerüst (`<rat-app>`, `<rat-view>`, `<rat-area>`)
- `<rat-app>` ist `<rat-app>` geworden (das alte `<rat-app>` als `<rat-part>`-variante ist weg), `src` lädt die app-komponente
`packages/app/elements/`, demo `demos/app2`. look (skin, palette, density …) läuft über gestalt, `<rat-app>` reicht nur durch.

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


**`<rat-app>`, `<rat-view>`, `<rat-area>`**
- genau eine `<rat-app>` pro seite (das root-element), eine zweite: warnung, wird ignoriert
- `<rat-app>`: `app.router`, `app.commands` (`go`, `back` vom router), `ready()` beendet `[loading]` mit view transition. lade-screen ist der splash aus `run.js`
- `<rat-view>`: `active`, `name`, `route` (relativ zur eltern-view), `src`, `transition`. aktiv macht nur der router
- `<rat-area>` statt `<app-area>`: sidebar, drawer, bottom-sheet, das grid stellt `<rat-app>`
- matching pro ebene: erst exakt, dann als anfang des pfads (nur views mit views darin oder ungeladenem `src`), zuletzt routen mit `*`
- guard pro view: `view.on('leave', fn, { unload })`, die app fragt nur die views, die die navigation wegnimmt (innerste zuerst)
- `[loading]` endet von selbst, sobald die aktiven views gemountet sind und `app.hold(promise)` erledigt ist
- `<rat-area>` übernimmt die semantik von `<app-area>`: eine angedockte area ist nur mit `open` (oder `peek`) sichtbar

## allgemein
- modernes html nutzen, wo es geht (`<dialog>`, popover, view transitions …)

## persistente daten (`@rat/bunker`, später `@bunker`)
- vier teile: **Store** (schlüssel/werte), **Database** (tabellen aus records, je tabelle ein store), **Files** (baum aus einträgen), **memo** (ttl/swr als wrapper, keine eigene ablage)
- alles async für jeden treiber; treiber, die sofort antworten (local, session, cookie, memory), haben zusätzlich `getSync`/`setSync` (vor dem ersten paint)
- codecs (wert ↔ was der treiber hält) und schema (prüft/wandelt den wert) sind getrennte schichten. schema auch für store, optional
- cache api ist ein store mit url-schlüsseln, kein files
- ein handle ist der eintrag, den die plattform ausstellt (festgenagelt, mit rechten, inhalt erst bei bedarf). files reicht einträge herum, pfade sind nur die adresse
- `Id` (uuid, `Id.counter` fortlaufend), `Ref('tabelle')` in `@rat/types`
- `.as(Type)` und `.$items` beide, in der praxis vergleichen. `List`/`$List`/`$items` kommen aus `rat.js`, der rest kennt rat nicht

## config, `RAT`
- `<rat-app src>` lädt `config.rat.js` daneben selbst (`config-src` für eine andere datei)
- globales `RAT` immer, aus `@rat/runtime`: alle exporte von `@rat/types`, dazu `app`, `config`, `toggle` aus `@rat/app`. kein opt-in, kein umbenennen (eine zeile selbst: `globalThis.APP = RAT`). als modul: `import RAT from '@rat/app'`, `import { RAT } from '@rat/runtime'`
- `autoImport` in `config.rat.js` (kein mod: nichts landet an `RAT.app`, es ist eine einstellung des loaders): ordner, relativ zur `config.rat.js` der app, in denen eine nicht importierte komponente (`<Dock />`) als `Dock.rat.html`, `Dock.rat`, `Dock.rat.js` gesucht wird. `true`, ein pfad, eine liste, `{ pfad: ['Dock'] }` für nur diese namen. nichts gefunden: fehler. ein eigener import oder ein lokaler name gewinnt
- `mods: { name: options | true }` (bausteine, die rat bereitstellt, nicht jede app braucht) landen an `RAT.app.<name>`: `database`, `files`, `store`, `hotkeys`. was die app selbst baut, ist ihr eigener code, kein mod

## syntax
- `let` vor `$name` ist auf oberster ebene im `<script>` einer `.rat`-datei optional: die erste zuweisung an einen nirgends deklarierten `$name` deklariert ihn. `const` (computed) bleibt pflicht, in `.rat.js` gilt js

## offline, start
- service worker als mod `offline`: dateien der eigenen herkunft network-first (eine änderung zeigt sich beim nächsten laden), fremde cache-first mit auffrischen dahinter. jede app braucht ein `sw.js` neben ihrer seite (`importScripts`), ein worker reicht nur bis zu seinem ordner
- kompilate hält der loader selbst (cache api `rat:compiled`, schlüssel url + hash des quelltexts): der sw kann blob-module nicht cachen. `?fresh` verwirft sie
- `match` ist rats switch im script (compiler): `match (x) { muster => ergebnis, … }`, ohne `(x)` eine funktion. dieselben muster wie `case`/`is`/`@case`, `#` ist der wert (bei einem schema der umgewandelte), `_` ist alles, `a | b` beides. form vorläufig, wird später verbessert
- testen gibt es genau einmal: `match.js` in `@rat/types` (`match`, `is`, `pass`, `pattern`, `which`). der compiler übersetzt muster nur in daten (`part('name')`, `either`, `rest`, `any`), `match`, `is`, `@match` und benannte cases laufen alle darüber, die runtime importiert es. `choice` entfällt, `match()` ist die form für plain js
- `@switch` heißt `@match`, die zweige bleiben `@case`/`@default`

