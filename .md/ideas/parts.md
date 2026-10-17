# rat :: parts and lazy components

status: **`<rat-part>` built** in [`@rat/app`](../../packages/app), with `load="eager | visible | idle"`. `lazy:` inside components is still an idea. a prototype existed as `<htx-part>` in `@htx/elements` (to be removed from htx), used in `aufbau/www/`.

see also: [no build](no-build.md) (how a part gets compiled in the browser), astro.md in `pulgasari.github.io/md/webdev/libs/`

two entrances to the same thing: a component that is loaded only when it is needed. inside a
rat component the compiler can do it (`lazy:`); on a plain html page an element does it
(`<rat-part>`). the runtime underneath is the same.

## idea: lazy components (from astro islands)

**origin.** astro renders a page as html and loads the javascript of a component only
when it is needed:

```astro
<Chart client:visible />    <!-- loads when it scrolls into view -->
<Comments client:idle />    <!-- loads when the browser is idle -->
```

**problem.** a heavy component (a chart, an editor) far down the page costs loading
time for everyone, also for those who never scroll there.

**in rat.**

```html
<Chart lazy:visible data={$points} />
<Editor lazy:idle />
```

the compiler turns the import of `Chart` into an `import()` that runs when the element
becomes visible (`@domina/observer` has `onVisible`) or when the browser is idle.
until then, a placeholder takes its place. astro's full set is a good template: `load`,
`idle`, `visible`, `media` (a media query), with options (`visible={{ rootMargin }}`).

**cost.** medium. it needs the build adapters for code splitting; in the browser
without a build it works as is, since every module is its own file anyway.

## idea: `<rat-part>`, a part of a plain page

### where it comes from: `<htx-part>`

your experiment in `@htx/elements`, used in `aufbau/www/elements.html` and `router.html`:

```html
<form>
  <htx-part src="./elements.input.htx.html"></htx-part>
  <htx-part src="./elements.media.htx.html" as="section#media" data-title="media"></htx-part>
</form>

<script type="module">
  import { settled } from '@htx/elements';
  await settled();   // every part is in the page now, parts inside parts included
</script>
```

what it does, in order: fetch the file, compile it in the browser (`@htx/compiler`), import
it from a blob url, render its component with `@htx/js` (real dom nodes), adopt its
`<style>` once per file, then replace itself with the result. `data-*` are the props,
`as` wraps the result in an element written as a selector, a part inside a part resolves
its `src` against the file it stands in. a failed part keeps its place, marked `failed`.

### what it is, in other words

the same principle as astro's `<astro-island>`: **a custom element as a loading
boundary**. it stands in the html, an attribute names the module, attributes carry the
props, and it loads itself once it is in the dom (`connectedCallback`). no framework drives
it from outside.

| | `<astro-island>` | `<htx-part>` |
|---|---|---|
| already there | html from the server, js is only **attached** (hydration) | nothing, it **renders** in the browser |
| what is loaded | a built js module | **source**, compiled in the browser |
| when | after its directive (`client:load`, `idle`, `visible`, `media`) | at once |
| afterwards | **stays** as a boundary; nested islands wait for the outer one | **replaces itself** (`replaceWith`), no boundary left |
| props | json with type tags (`Date`, `Map` survive) | `data-*`, strings only |
| nested | solved by the build | relative `src` rewritten against the file, `settled()` waits for all |

the "no build" row is what makes it more than an island. the older relatives are **html
imports** (`<link rel="import">`, web components v0, around 2013, later dropped): html files
as parts of a page; and **server side includes** (`<!--#include file="…" -->`). `htx-part`
is a client side include that compiles a component on the way, plus the loading boundary of
an island.

### why it belongs to rat, not to htx

htx is the **notation**: how markup is written. a part is **runtime, loader and compiler in
the browser**, one level up. that is where rat already sits, and three of its threads meet
here: lazy components (above), the service worker that compiles `.rat` files
([no build](no-build.md)), and the "kinds of files" from the `@htx/elements` readme
(part, element, view), which in rat are a component, a custom element and a router view
([app](app.md), d-17).

### in rat (proposal)

```html
<!-- a plain html page: no build, no compiler call on the page -->
<rat-part src="./chart.rat" lazy="visible" data-points="[1, 2, 3]"></rat-part>
```

```html
<!-- inside a rat component: the compiler does the same with an import() -->
<Chart lazy:visible data={$points} />
```

three changes against `htx-part`:

1. **the element stays as a boundary** instead of replacing itself. its attributes become
   props as signals: a new `data-points` updates the part fine-grained, the part has an
   owner for its effects and a place for its cleanup, and it can be loaded later.
2. **astro's loading conditions**: `lazy="load | idle | visible | media(…)"`, with
   `@domina/observer` for visibility. default `load`.
3. **styles through rat's `@scope`**, so a part's `<style>` is scoped like any component's,
   instead of being adopted globally.

open points:

- **props from attributes are strings.** a codec per prop (json for `data-points`, a number
  for `data-size`) or a schema from `@rat/types` that coerces them. compare the type tags in
  astro's serialized props, and `codecs.md` in `pulgasari.github.io/md/webdev/`.
- **children**: a part's light dom children could fill its `<slot />` ([slots](slots.md)).
- **`settled()`** is worth keeping: a promise for "every part below here is in", for tests,
  screenshots and code that measures the page.
- **name**: `<rat-part>`, `<rat-island>`, `<rat-load>`. `part` matches what it was called so far.

**cost.** medium. the element is small; the work is in the browser compile ([no build](no-build.md))
and in props from attributes.
