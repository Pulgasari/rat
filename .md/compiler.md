# rat :: compiler v0

## pipeline

```
source ──► parse ──► ast ──► generate ──► es module
             │                  ▲
             └─► scripts ──► script (sugar → acorn → reactive) ─┘
             └─► styles ───► preprocess (lang) ──► style (@scope)
```

| file | job |
|---|---|
| `parse.js` | markup → ast. hand-written recursive descent. js in holes is only delimited (acorn's tokenizer finds the closing `}` / `)`), not parsed. knows the three body forms (braces, indentation, one line) |
| `script.js` | `sugar` (token based: `#`, `..`, `\|>`, `for…of`), then the acorn parse, then the reactive rewrite (`$x` → `$x.value`, declarations → `signal` / `computed`) |
| `generate.js` | ast → readable `$$.el(…)` calls. element props become closures, component props getters |
| `style.js` | `<style>` → `@scope ([data-rat="hash"]) { … }` |
| `util.js` | errors with line/column, token scanners, applying edits, names |
| `index.js` | `compile()`, tells `.rat` from `.rat.js`, runs `<style lang>` preprocessors |

### sugar, in this order

| step | why here |
|---|---|
| `topics` | `#` is no js token, acorn's tokenizer stops at it. every stop at a lone `#` becomes the placeholder name, then the tokenizer runs again |
| `ranges` | before pipes, so `1..5 \|> sum` pipes the range. `..` inside strings, templates, regexes and comments is skipped |
| `pipes` | one pipe per round, leftmost first. implicit (callable), explicit (`#`), refused (a call without `#`) |
| stray `#` | a `#` left after the pipes is outside of any pipe: an error |
| `forOf` | `for (x of y)` → `for (const x of y)` |

## decisions

- **acorn is the only dependency.** js is never read with a regex. the tokenizer also
  delimits holes, because it knows strings, templates and regexes and tolerates `|>`
  (two tokens, no grammar check). a `#` is masked to a same-length name while scanning.
- **sugar before the parse.** acorn knows neither `|>` nor `#` nor `..`, so they are
  rewritten at token level before an ast exists. downside: error positions after a pipe
  or range are approximate.
- **insertions only.** the reactive rewrite only inserts text (`.value`, `$$.signal(` …
  `)`), it never replaces. edits never collide, no magic-string needed.
- **readable output before fast output.** the `dom` target is built for thinking. the
  fast target (`dom:clone`) comes second, from the same ast.
- **preprocessors are passed in, never bundled.** `compile(source, { styles: { scss } })`,
  synchronous, so `compile()` stays sync and the compiler stays one dependency.

## performance notes

| spot | status | cause / plan |
|---|---|---|
| `el()` per element | fine for v0 | every element is created on its own. `dom:clone`: parse static subtrees once as `<template>`, then `cloneNode(true)` and bind only the dynamic parts through paths (the approach of svelte 5 / solid). typically 2–5× faster on large lists |
| static holes | small overhead | every `{…}` hole becomes an effect, even `{42}`. the compiler can detect literals and non-reactive expressions (no `$` names, no `props.`, no calls) and insert them directly |
| `each()` reorder | **bottleneck on large lists** | every update moves every node once (`insertBefore` per item). fix: longest increasing subsequence, then only displaced items move |
| `each()` index | correctness | the index is a plain value and goes stale when a reused item moves. pass it as a signal when the body uses it (the compiler knows) |
| computeds without cutoff | needless runs | a computed whose value stays the same still wakes its effects. fix: an equality check before propagating (push-pull in two phases: stale → check) |
| `pipes()`, `topics()` | compile time | re-tokenize per pipe / per `#` (o(n·p)). irrelevant for normal files, a single pass for generated code with hundreds of them |
| `@scope` | native | no runtime overhead, no selector rewriting |

## open technical points

- scope analysis: detect shadowing of `$` names (parameters, inner declarations).
- source maps (the edit list already holds the information).
- several `<script>` blocks: names from block 2 do not apply in block 1 in v0.
- `.rat.js`: templates with `${…}` stay untouched (runtime htx). mixed forms?
- imports between `.rat` files in the playground (virtual file system, a blob url per file).
