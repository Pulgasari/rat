# apps

1. hier können wir generell etwas die form "üben", wie ich sie bei zugriff habe.

2. mit der zeit bauen wir die zugriff-apps hier neue, und ziehen das dann alles in zugriff-repo um

3. ablaufen wird das vermutlich so, dass ich hier immer schrittweise von hand iwas mache, dabei feature-/syntax-erweiterungen/änderungen auf ne todo packe.

---

## quicklinks

**apps:**
[cli](https://code.pulgasari.dev/rat/apps/cli/) ·
[ebooks](https://code.pulgasari.dev/rat/apps/ebooks/) ·
[feeds](https://code.pulgasari.dev/rat/apps/feeds/) ·
[icons](https://code.pulgasari.dev/rat/apps/icons/) ·
[notes](https://code.pulgasari.dev/rat/apps/notes/) ·
[podcasts](https://code.pulgasari.dev/rat/apps/podcasts/)

---

## todo

### syntax
- [ ] in `.rat`: `$props`
- [ ] in `.rat`: `$attr` (unter Vorbehalt, vorhin dacht ich mir iwas dabei< aber habs vergessen)
- [ ] in `.rat`: `$data`
- [ ] in `.rat`: `$style`

- daten laden heißt `effect` + `then` + `alive`-flag: das ist genau der fall für `@await` (d-28)


### nebenbei
- [ ] das zeug aus `zugriff/.shared/js/modules/webdav` wäre vermutlich was passendes für/als `@rat/bunker/webdav` zum auslagern
- [ ] evtl. auf das folders/fs/filesystem- zeug aus `zugriff/shared` ?

## syntax-wünsche (aus `notes`)

was die apps gern schreiben würden, und was sie bis zur entscheidung stattdessen tun. die skizze dazu: `notes/_sketch.rat`.

| wunsch | vorerst |
|---|---|
| ~~`<script config-src>`, `config.rat.js` als `rat.config`~~ | gebaut: `<rat-app>` lädt `config.rat.js`, `RAT.config` |
| auto-import der komponenten (per config) | explizite imports |
| `$x = …` ohne `let` | `let $x = …` |
| persistenz eines signals | von hand (`localStorage`) |
| `<self>` als sichtbarer anfang/ende | mehrere elemente oben in der komponente |
| props als signals (`let { $filter } = props`, d-13 b) | zustand bleibt in `app.rat` |
| schema mit ui-hinweisen (`settings` in `zugriff.config.js`) | auskommentiert |

## beobachtungen (aus `notes`)

- signals von außen (`lib.sources.value`) kommen per `const $sources = lib.sources.value` in die reaktivität. geht, ist aber eine brücke pro wert
- persistenz zweimal von hand (`localStorage`: offene notiz, aufgeklappte ordner): die entscheidung dazu wird dringlicher

- ein vergessenes `</div.source>` meldet der compiler als `<style> is only allowed at the top level`: die meldung sollte das offene element nennen
- ordner: `.shared/folders.js` (130 zeilen statt `FolderLibrary` mit drei kopierten modulen) auf `@rat/bunker`: handles in der tabelle `folders` der app-datenbank, bäume über `Files`. die capacitor-nachbildung aus zugriff ist dabei weggefallen, die kommt wieder, wenn eine app nativ laufen soll
- `.rat.js`: in `html`…`` darf kein template-literal stehen (`` {`a ${b}`} ``), der backtick beendet das äußere template (js selbst). heute: `{'a ' + b}`. ein fall für die syntax-runde
