# rat :: styles

status: style languages **built** (d-20). `@scope` lower boundary: **open decision** ([d-19](#d-19)).

see also: [syntax.md: styles](../syntax.md#styles), [no build](no-build.md)

## style languages

**decided** ([d-20](#d-20)): `scss` and `ass` ship with rat. your point
stands: css can do a lot by now, but writing it is the problem, and that is what a
preprocessor (and later your own css sugar) is for.

### built

```html
<style lang="scss"> … </style>
<style lang="ass"> … </style>
```

- `compileAsync()` loads `sass` / `@aufbau/ass` the first time a file uses them,
  `loadStyles('scss', 'ass')` does it ahead of time. any other language still goes
  through `compile(source, { styles: { less: code => … } })`.
- a loader tries the bare specifier first (import map, `node_modules`), then a pinned
  url: `sass@1.70.0` on esm.sh (the version `@aufbau/import` pins) and `@aufbau/ass`
  on code.pulgasari.dev.

### `@aufbau/import`, helpful?

partly. it knows how to fetch and cache vendors (`sass` included) and compiles scss
*files* by path (`importSCSS(path)`). the compiler needs to compile *source text* that
it already has, and it needs a fixed sass version, so it resolves `sass` itself, the
same way. what would really help: a small `compile(text, lang)` export in
`@aufbau/import` next to the path based ones; then rat could use it and the two would
share one vendor cache (indexeddb via `@bunker`).

<a id="d-20"></a>
## d-20 · style languages → **`scss` and `ass` out of the box**

built: `scss`, `sass` and `ass` load on demand (`compileAsync()`, `loadStyles()`), any
other language through `options.styles`. still to do: browser-only setups through a
service worker that compiles `.rat` files on request. your own css sugar comes later.

<a id="d-19"></a>
## d-19 · `@scope` lower boundary

- [ ] a) none: styles reach into children, closer components win >**(v0) (rec)**: css-like, slotted content keeps the parent's styles
- [ ] b) donut scope: `to ([data-rat])`, styles stop at child components

question: there is a `>` in front of **(v0) (rec)** in a. a slip, or a mark you meant (a tick for a)?

## notes

das hinkt völlig. css kann zwar alles mögliche mittlerweile, und das sogar live, aber lässt sich absolut beschissen schreiben und ist schwer lesbar usw.

scss/ass, sowas sollte out-of-the-box mitgeliefert werden. (`@aufbau/import`) hilfreich?

**reply:** done, see [style languages](#style-languages) above, which also answers the
`@aufbau/import` question.
