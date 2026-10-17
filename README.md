# RAT

![RAT](.assets/rat2.webp)

experimental JS-framework.

works great with:
[@aufbau](https://github.com/pulgasari/aufbau/) ·
[@bunker](https://github.com/pulgasari/bunker/packages/) ·
[@domina](https://github.com/pulgasari/domina/packages/)

---

official: 
[home](http://code.pulgasari.dev/rat/) ·
[docs](http://code.pulgasari.dev/rat/docs/) ·
[playground](https://code.pulgasari.dev/rat/demos/playground/)

demos: 
[app](https://code.pulgasari.dev/rat/demos/app/)

playground:
[blocks](https://code.pulgasari.dev/rat/demos/playground/#blocks.rat) ·
[commands](https://code.pulgasari.dev/rat/demos/playground/#commands.rat) ·
[counter](https://code.pulgasari.dev/rat/demos/playground/#counter.rat) ·
[pipes](https://code.pulgasari.dev/rat/demos/playground/#pipes.rat.js) ·
[syntax](https://code.pulgasari.dev/rat/demos/playground/#syntax.rat) ·
[todos](https://code.pulgasari.dev/rat/demos/playground/#todos.rat)

## packages

| package         | path                                     | status |
|-----------------|------------------------------------------|--------|
| `@rat/app`      | [`packages/app`](packages/app)           | v0: no build, `run.js`, `<rat-app>`, `<rat-part>` |
| `@rat/commands` | [`packages/commands`](packages/commands) | v0: a registry of named commands, `rat:command` |
| `@rat/compiler` | [`packages/compiler`](packages/compiler) | v0     |
| `@rat/core`     | [`packages/core`](packages/core)         | sketch |
| `@rat/hotkeys`  | [`packages/hotkeys`](packages/hotkeys)   | v0: one key notation, app-wide shortcuts |
| `@rat/import`   | [`packages/import`](packages/import)     | v0: files of any format as values, the rewrite of `@aufbau/import` |
| `@rat/runtime`  | [`packages/runtime`](packages/runtime)   | v0: `common/` runs anywhere, `browser/` needs a dom |
| `@rat/signals`  | [`packages/signals`](packages/signals)   | v0: alien-signals core, `$()`, reactive variants |
| `@rat/types`    | [`packages/types`](packages/types)       | v0: data types with schemas, reactive variants |

### tooling

| package         | path                                     | status |
|-----------------|------------------------------------------|--------|
| `@rat/language-server` | [`packages/language-server`](packages/language-server) | v0: diagnostics |
| `@rat/syntax`   | [`packages/syntax`](packages/syntax)     | v0     |
| `@rat/vscode`   | [`packages/vscode`](packages/vscode)     | v0: hl + ls |

## repo

dir: 
[demos](demos/) ·
[playground](demos/playground/)

md: 
[causa: types](.md/causa_types.md) ·
[compiler](.md/compiler.md) ·
[concept](.md/concept.md) ·
[decisions](.md/decisions.md) ·
[ideas](.md/ideas/README.md) ·
[syntax](.md/syntax.md) ·
[todo](.md/todo.md)
