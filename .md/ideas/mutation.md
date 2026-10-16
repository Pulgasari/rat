# rat :: mutating `$` arrays and objects

status: **open decision** ([d-23](#d-23)). today: reassign only.

see also: [types](types.md), mobx.md, immer.md and svelte.md in `pulgasari.github.io/md/webdev/libs/`

<a id="d-23"></a>
## d-23 · mutating `$` arrays and objects (`$todos.push(x)`)

- [ ] a) reassign only: `$todos = [...$todos, x]` **(v0)**
- [ ] b) the compiler turns known mutating calls into updates (`push`, `splice`, `sort` …)
- [ ] c) reactive types from `@rat/types` (`$List`) take care of it **(rec)**
