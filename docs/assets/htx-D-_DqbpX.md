# HTX

rat's markup is htx: html with a few short forms. They work in `.rat` files and in `html` templates of `.rat.js`.

## Tag selectors

```rat
<div#main.card.big>   <!-- <div id="main" class="card big"> -->
<.card>               <!-- a div -->
</div.card>  </>      <!-- the name after </ is not checked, only counted -->
```

## Props merge

`class` and `style` add up instead of overwriting, also over a spread:

```rat
<div.card class={$size} class:active={$on} {...rest}>
```

## Prop groups

One value, several names:

```rat
<img alt|title={caption} src={url} />
<input readonly|disabled={$locked} />
```

## Attributes

| | |
|---|---|
| `a='x'`, `a={expr}`, `a` | string, expression, `true` |
| `{name}` | `name={name}` |
| `class:on={expr}`, `style:color={expr}` | one class, one css property |
| `bind:value={$x}` | two-way, also `checked`, `open` |
| `onclick='save'` | a command by name (`RAT.app.commands`) |
| `aria-pressed={$on}` | written as `"true"` / `"false"` |

## Outside rat

htx is its own package, a fork of htm: `import { html } from '@htx/js'` renders the same markup in plain js, `@htx/preact` with preact.
