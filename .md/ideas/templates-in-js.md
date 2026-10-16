# rat :: templates in .rat.js and .js

status: **built**, decided (d-11, d-12).

see also: [syntax.md: .rat.js](../syntax.md#ratjs)

<a id="d-11"></a>
## d-11 · the template tag in `.rat.js` → **`html`, `htx` and `rat`, all three for now**

<a id="d-12"></a>
## d-12 · `{…}` holes in plain `.js` files → **no, `${…}` stays**

your note: what would it be good for at all? → nothing, which is why it was the
recommendation. it only came up because `.rat.js` reads `{…}`; a plain `.js` file has no
compiler that could know the local names, so it keeps `${…}`.

## elixir: sigils

**idea: sigils, short tags for literals.** `~r/\d+/` is a regex, `~D[2026-10-13]` a
date, and you can define your own (`~css"…"`). rat already has the same mechanism:
tagged templates (``html`…` ``, ``ass`…` ``). nothing new needed, but a reminder that
custom tags (``date`2026-10-13` ``, ``re`\d+` ``) are a cheap way to make literals
readable.
