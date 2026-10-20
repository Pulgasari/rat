# apps

1. hier können wir generell etwas die form "üben", wie ich sie bei zugriff habe.

2. mit der zeit bauen wir die zugriff-apps hier neue, und ziehen das dann alles in zugriff-repo um

3. ablaufen wird das vermutlich so, dass ich hier immer schrittweise von hand iwas mache, dabei feature-/syntax-erweiterungen/änderungen auf ne todo packe.

## todo
- [ ] vorübergehend müssen wir mal `.rat.html` als synonym mit `.rat` unterstützen, weil ich direkt auf gh sonst kein syntax-highlighting habe. (ich fix das später indem ich mobile editor mit gh verknüpfe.)
- [x] `apps/notes` lauffähig: ordner öffnen, baum, filter, notiz lesen, inhaltsverzeichnis, beim neuladen bleibt alles
- [ ] `apps/notes`: settings (config-area), dock unten auf schmalen bildschirmen, install-hinweis, toasts
- [ ] `<rat-part>` sollte wohl actually nich nur direkt `.rat` fressen, sondern auch `.htx` und schnöde `.html` files

### nebenbei
- [ ] das zeug aus `zugriff/.shared/js/modules/webdav` wäre vermutlich was passendes für/als `@bunker/webdav` zum auslagern
- [ ] evtl. auf das folders/fs/filesystem- zeug aus `zugriff/shared` ?

## syntax-wünsche (aus `notes`)

was die apps gern schreiben würden, und was sie bis zur entscheidung stattdessen tun. die skizze dazu: `notes/_sketch.rat`.

| wunsch | vorerst |
|---|---|
| `<script config-src>`, `config.rat.js` als `rat.config` | `import config from './config.rat.js'` |
| auto-import der komponenten (per config) | explizite imports |
| `$x = …` ohne `let` | `let $x = …` |
| persistenz eines signals | von hand (`localStorage`) |
| `<self>` als sichtbarer anfang/ende | mehrere elemente oben in der komponente |
| props als signals (`let { $filter } = props`, d-13 b) | zustand bleibt in `app.rat` |
| schema mit ui-hinweisen (`settings` in `zugriff.config.js`) | auskommentiert |

## beobachtungen (aus `notes`)

- signals von außen (`lib.sources.value`) kommen per `const $sources = lib.sources.value` in die reaktivität. geht, ist aber eine brücke pro wert
- persistenz zweimal von hand (`localStorage`: offene notiz, aufgeklappte ordner): die entscheidung dazu wird dringlicher
- daten laden heißt `effect` + `then` + `alive`-flag: das ist genau der fall für `@await` (d-28)
- ein vergessenes `</div.source>` meldet der compiler als `<style> is only allowed at the top level`: die meldung sollte das offene element nennen
- `FolderLibrary` ist 1:1 aus zugriff übernommen (`.shared/folders/`), nur auf `@rat/signals`. neu bauen steht in `.md/todo.md`

