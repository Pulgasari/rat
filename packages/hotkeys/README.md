# @rat/hotkeys

one key notation for markup modifiers (`on:keydown[ctrl+s]`) and app-wide shortcuts. no
dependencies, usable without the rest of rat; with [`@rat/commands`](../commands) a shortcut
runs a command by name.

```js
import { createCommands } from '@rat/commands';
import { createHotkeys }  from '@rat/hotkeys';

const commands = createCommands({ save, search, togglePlay });

createHotkeys({ commands }).define({
  'ctrl+s'   : 'save',                                      // a command name
  'escape'   : () => close(),                               // a function
  'space'    : { command: 'toggle-play', when: hasPlayer }, // only while when() is true
  'ctrl+k|/' : { command: 'search', global: true },         // alternatives; global: in inputs too
});
```

## notation

| | |
|---|---|
| `ctrl+s`, `ctrl + s` | modifiers and held keys, then the key. modifiers match exactly: `ctrl+c` does not fire on `ctrl+shift+c` |
| `ctrl+c\|space+a` | alternatives |
| `space+a` | `space` has to be down when `a` is pressed (tracked once a combo needs it) |
| `left`, `arrow-left`, `arrowleft` | the same key, likewise `up`, `down`, `right` |
| `esc`, `del`, `return`, `control`, `cmd`, `option` | `escape`, `delete`, `enter`, `ctrl`, `meta`, `alt` |

## createHotkeys({ commands, target })

- a binding is a command name (with arguments too: `'go[settings]'`), a function, or
  `{ command, when, global, preventDefault }`
  (`action` is read as `command`, as zugriff names it).
- without `commands`, a name fires `rat:command` from the focused element: a registry
  listening above it runs it.
- typing in an input, textarea, select or contenteditable is left alone, unless ctrl, alt or
  meta is held or the binding is `global`.
- `preventDefault` is on unless set to `false`.
- a keydown someone already used up (`defaultPrevented`) runs nothing: an overlay that closes on
  escape (`<rat-area>`) keeps an escape hotkey behind it quiet.
- `.define(map)`, `.remove(...keys)`, `.list()`, `.destroy()`. defining a combo again replaces it.

`keyName`, `parseCombos`, `matchesCombo(s)` and `trackHeldKeys` are what `@rat/runtime`
uses for `on:keydown[…]`.
