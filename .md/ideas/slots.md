# rat :: named slots

status: **idea**.

## idea (from web components, latte blocks)

**origin.** web components fill several places in a template by name:

```html
<!-- in the template of <app-card> -->
<header><slot name="title"></slot></header>
<main><slot></slot></main>

<!-- usage -->
<app-card>
  <h2 slot="title">weather</h2>
  <p>sunny</p>
</app-card>
```

latte's layouts do the same with `{block title}…{/block}`.

**problem.** rat's `<slot />` takes all children as one piece. a layout component with
a header, a sidebar and a main area cannot tell them apart.

**in rat.** the same notation as the platform:

```html
<!-- card.rat -->
<article>
  <header><slot name="title" /></header>
  <slot />
</article>

<!-- usage -->
<Card>
  <h2 slot="title">weather</h2>
  <p>sunny</p>
</Card>
```

**cost.** small. the compiler sorts children by their `slot` attribute into
`props.slots.title` and `props.children`.
