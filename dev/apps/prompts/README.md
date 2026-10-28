# prompts

a library of prompts: written once, copied when needed. tags to sort them, a search over title and
text. everything stays on the device.

| file | |
|---|---|
| `state.rat.js` | the tables `prompts` and `tags` of `RAT.app.database` (as `$items`, they follow every write), the filter, the prompt picked, the actions |
| `app.rat.html` | the list in a menu area (a sidebar, a drawer on a phone), the prompt in main |
| `components/` | `Sidebar`, `PromptItem`, `TagBadge`, `TagManager`, `Detail` (read and edit) |

ported from `zugriff/apps/prompts`.
