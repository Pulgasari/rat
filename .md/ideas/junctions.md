# rat :: junctions

status: **idea**.

## idea: `any(…)` / `all(…)` (from raku)

```raku
if $answer eq any('yes', 'y', 'ok') { … }
if $age > all(@limits) { … }
```

**problem.** `if (['yes', 'y', 'ok'].includes(answer))` reads backwards: the list comes
first, the thing you check comes last.

**in rat.**

```html
@if ($status == any('error', 'failed', 'timeout')): <p.alert>…</p>
```

**cost.** small: `any(…)` / `all(…)` as runtime helpers whose `==` the compiler
rewrites to `.includes()` / `.every()`.
