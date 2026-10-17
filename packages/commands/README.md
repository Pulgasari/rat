# @rat/commands

the vocabulary of an app: named things it can do (`save`, `openSettings`, `togglePlay`). ui,
hotkeys and code fire them by name, so a button and a shortcut share one behaviour. no
dependencies, usable without the rest of rat.

```js
import { createCommands } from '@rat/commands';

const commands = createCommands({ save, openSettings });

commands.add('toggle-play', () => player.toggle());
commands.togglePlay = () => player.toggle();   // the same, property form

commands.run('toggle-play');
commands.togglePlay();                         // the same

const stop = commands.listen(document);        // runs what markup fires
```

```html
<button onclick='save'>save</button>   <!-- a string handler is a command -->
```

| | |
|---|---|
| `createCommands(source?)` | a registry. names are one across kebab, camel and snake case |
| `.add(id, fn)`, `.remove(id)`, `.get(id)`, `.has(id)`, `.list()` | |
| `.run(id, ...args)` | the command's return value, `undefined` for an unknown one |
| `.listen(root = document)` | runs the `rat:command` events that reach `root` and stops them there. returns `stop` |
| `command(target, name, event?)` | fires a bubbling, composed `rat:command` with `{ event, name }` |
| `commandListener(name)` | the handler a compiled `onclick='save'` gets |
| `nameOf(id)` | `'toggle-play'` → `'togglePlay'` |

a registry stops what it runs, so one listening on a component wins over the app's above it.
how commands take arguments in markup is open ([d-16](../../.md/ideas/app.md#d-16)).
