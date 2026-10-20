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
<button onclick='save'>save</button>            <!-- a string handler is a command -->
<button onclick='go[settings]'>…</button>         <!-- with arguments: go('settings', event) -->
<button onclick='move[up, 3]'>…</button>          <!-- move('up', 3, event) -->
```

arguments in brackets, like the key modifiers ([d-16](../../.md/ideas/app.md#d-16)): numbers,
`true`, `false` and `null` are read as such, anything else is a string. the handler gets the
arguments, then the event that fired it. `run('go[settings]')` works the same.

a name with `:` is an event of its own, not a command: `onclick='rat:toggle[menu]'` fires
`rat:toggle` (bubbling, cancelable) with the same `detail`, no registry involved. `<rat-app>`
listens to `rat:toggle`.

| | |
|---|---|
| `createCommands(source?)` | a registry. names are one across kebab, camel and snake case |
| `.add(id, fn)`, `.remove(id)`, `.get(id)`, `.has(id)`, `.list()` | |
| `.run(id, ...args)` | the command's return value, `undefined` for an unknown one |
| `.listen(root = document)` | runs the `rat:command` events that reach `root` and stops them there. returns `stop` |
| `command(target, text, event?, args?)` | fires a bubbling, composed `rat:command` with `{ args, event, name }` |
| `parseCommand(text)` | `'move[up, 3]'` → `{ name: 'move', args: ['up', 3] }` |
| `commandListener(name)` | the handler a compiled `onclick='save'` gets |
| `nameOf(id)` | `'toggle-play'` → `'togglePlay'` |

a registry stops what it runs, so one listening on a component wins over the app's above it.

