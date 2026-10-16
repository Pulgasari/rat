# rat :: block syntax

status: **built**, decided (d-01 to d-04). the three body forms of `@if`, `@for`, `@switch`, `@fragment`.

see also: [syntax.md: three body forms](../syntax.md#three-body-forms)

<a id="d-01"></a>
## d-01 · one-line blocks need the `:` → **yes**

<a id="d-02"></a>
## d-02 · a one-line body ends at the line end or at `@else` / `@case` / `@default` → **yes**

<a id="d-03"></a>
## d-03 · several directives on one line → **allowed**

<a id="d-04"></a>
## d-04 · tabs and spaces mixed in one indented block → **an error**

built: the compiler names the line and what the block uses instead.

your note on d-01 to d-04: not sure yet that this holds up in practice, especially
colon or not and an end marker or not. → they stay easy to change: all of it lives in
`body()` and `nodes()` in `packages/compiler/parse.js`, plus `blockHead` in the syntax spec.
