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
| `parse.js` | markup → ast. hand-written recursive descent. js in holes is only delimited (acorn's tokenizer finds the closing `}` / `)`), not parsed. knows the three body forms (braces, indentation, one line). every node has `start` / `end`; `tolerant: true` (the language server) collects errors in `ast.errors` and recovers, closing tags that name another element land in `ast.warnings` |
| `script.js` | `sugar` (token based: `#`, `..`, `\|>`, `for…of`), then the acorn parse, then the reactive rewrite (`$x` → `$x.value`, declarations → `signal` / `computed`). `declared(code)` lists the `$` declarations token based, for tooling |
| `generate.js` | ast → an htx template for `@domina/render`. holes become closures, blocks the helpers `when` / `match` / `each`, component props a spread of getters |
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
- **markup stays markup.** the output is an htx template: what was markup is still
  markup, every binding a closure in a hole. it is readable and fast at once:
  `@domina/render` parses each template once and clones it (the former `dom:clone`
  plan). the previous generator (nested `$$.el(…)` calls) is kept in
  `packages/_compiler` for comparison.
- **preprocessors are passed in, never bundled.** `compile(source, { styles: { scss } })`,
  synchronous, so `compile()` stays sync and the compiler stays one dependency.

## performance notes

| spot | status | cause / plan |
|---|---|---|
| cloning | done | `@domina/render` parses a template once into a `<template>`, clones it per use and binds only the holes through paths (the approach of lit, svelte 5, solid) |
| static holes | small overhead | every `{…}` hole becomes an effect, even `{42}`. the compiler can detect literals and non-reactive expressions (no `$` names, no `props.`, no calls) and insert them directly |
| `each()` reorder | ok | rows walk back to front and move only when their successor changed (`moveBefore` where available). a longest increasing subsequence would move fewer on reversals |
| `each()` index | correctness | rows are built once per key, the index is a plain value and goes stale when a kept row moves. pass it as a signal when the body uses it (the compiler knows) |
| computeds without cutoff | needless runs | a computed whose value stays the same still wakes its effects. fix: an equality check before propagating (push-pull in two phases: stale → check) |
| `pipes()`, `topics()` | compile time | re-tokenize per pipe / per `#` (o(n·p)). irrelevant for normal files, a single pass for generated code with hundreds of them |
| `@scope` | native | no runtime overhead, no selector rewriting |

## open technical points

- scope analysis: detect shadowing of `$` names (parameters, inner declarations).
- source maps (the edit list already holds the information).
- several `<script>` blocks: names from block 2 do not apply in block 1 in v0.
- `.rat.js`: templates with `${…}` stay untouched (runtime htx). mixed forms?
- imports between `.rat` files in the playground (virtual file system, a blob url per file).

## output

```html
<script>
  let $count = 0;
</script>

<div.counter>
  <button onclick={() => $count++}>+1</button>
  @if ($count > 3): <b>viele</b> @else: <i>wenige</i>
</div.counter>
```

```js
export default function Counter (props, children) {
  let $count = $$.signal(0);
  return $$.html`
    <div.counter>
      <button onclick=${() => $count.value++}>+1</button>
      ${$$.when(() => $count.value > 3, () => $$.html`<b>viele</b>`, () => $$.html`<i>wenige</i>`)}
    </div>
  `;
}
```

| rat | htx |
|---|---|
| `{expr}` | `${() => expr}`, a live hole |
| `@if` / `@else if` / `@else` | `when(() => test, then, otherwise)`, nested per `@else if` |
| `@switch` / `@case` / `@default` | `match(() => subject, [[value, branch], …], fallback)` |
| `@for (x, i of list)` … `@else` | `each(() => list, item => item, (x, i) => row, fallback)`, keyed by identity |
| `on:keydown[enter]!:once={fn}` | `onkeydown=${$$.listener(fn, { keys, prevent, times })}` |
| `onclick="save"` | `onclick=${$$.commandListener("save")}`. an expression that is no function literal goes through `$$.listener()`, which resolves a string when the event fires |
| `@tooltip={x}`, `use:tooltip={x}` | `ref=${$$.use(tooltip, () => x)}` |
| `bind:value={$x}` | `ref=${$$.bind($x, "value")}` |
| `ref={$el}` | `ref=${$$.ref($el)}` |
| `<Card title="a" count={$n}>…</Card>` | `<${Card} title="a" ...${{ get count () { return $n.value; } }}>…</${Card}>` |
| `<slot />` | `${children}`, a component is `(props, children)` |
| a text with `<`, `` ` ``, `\` or `${` | a hole with the string, htx would read it as markup |

the runtime renders with effect and scope (see `@domina/render`'s concept): a
helper with a function as source builds a row or branch once per key and keeps
it, and every component, row and branch owns what it creates, so its effects
and behaviors go with it. refs run after the element's children are in place
(a `<select>` has its options before `bind:value`).
