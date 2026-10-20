# apps

1. hier können wir generell etwas die form "üben", wie ich sie bei zugriff habe.

2. mit der zeit bauen wir die zugriff-apps hier neue, und ziehen das dann alles in zugriff-repo um

3. ablaufen wird das vermutlich so, dass ich hier immer schrittweise von hand iwas mache, dabei feature-/syntax-erweiterungen/änderungen auf ne todo packe.

## todo
- [ ] was ich in `apps/notes` angefangen hab zu bauen (nich vollständig), sollte erstmal so halbwegs lauffähig gemacht werden. ein paar syntax-reshapes o.ä. sind evtl schon erkennbar. da am besten mal gucken, sammeln und mit mir abklären.
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

