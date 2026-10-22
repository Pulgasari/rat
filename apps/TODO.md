# todo

## syntax

- [ ] in `.rat`: `$props`
- [ ] in `.rat`: `$attr` (unter Vorbehalt, vorhin dacht ich mir iwas dabei< aber habs vergessen)
- [ ] in `.rat`: `$data`
- [ ] in `.rat`: `$style`
- [ ] ein vergessenes `</div.source>` meldet der compiler als `<style> is only allowed at the top level`: die meldung sollte das offene element nennen

### nebenbei

- [ ] das zeug aus `zugriff/.shared/js/modules/webdav` wäre vermutlich was passendes für/als `@rat/bunker/webdav` zum auslagern
- [ ] evtl. auf das folders/fs/filesystem- zeug aus `zugriff/shared` ?

---

# ungeklärtes
- generell wie man selbstbezug konstruiert bzw. ausdrückt
- wie man ausdrückt dass signals persistent sein sollen
- daten laden heißt `effect` + `then` + `alive`-flag: das ist genau der fall für `@await` (d-28)
- signals von außen (`lib.sources.value`) kommen per `const $sources = lib.sources.value` in die reaktivität. geht, ist aber eine brücke pro wert
- schema mit ui-hinweisen
- props als signals (`let { $filter } = props`, d-13 b)
- auto-import der komponenten (per config)
- 
---

# notizen

## beobachtungen (aus `notes`)

- persistenz zweimal von hand (`localStorage`: offene notiz, aufgeklappte ordner): die entscheidung dazu wird dringlicher

ordner: `.shared/folders.js` 
- (130 zeilen statt `FolderLibrary` mit drei kopierten modulen) auf `@rat/bunker`
- handles in der tabelle `folders` der app-datenbank,
- bäume über `Files`.
- die capacitor-nachbildung aus zugriff ist dabei weggefallen, die kommt wieder, wenn eine app nativ laufen soll

`.rat.js`:
- in `html`…`` darf kein template-literal stehen (`` {`a ${b}`} ``),
- der backtick beendet das äußere template (js selbst).
- heute: `{'a ' + b}`. ein fall für die syntax-runde
