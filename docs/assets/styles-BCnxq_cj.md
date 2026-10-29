# Styles

`<style>` in a `.rat` file is scoped to the component (`@scope`). It reaches into child components the way css cascades; on a conflict the closer component wins.

```rat
<div.card>
  <h2>{$title}</h2>
</div.card>

<style>
  .card { padding: 1rem; border-radius: 0.5rem; }
  h2    { margin: 0; }
</style>
```

## Languages

```rat
<style lang='scss'>
  .card { .title { font-weight: 700; } }
</style>
```

`scss`, `sass` and `gestalt` (`@spread`, `@val`, `@mixin` / `@apply`) are built in. The compiler loads on first use.

## Css files

```rat
<style mode='link'   src='https://code.pulgasari.dev/aufbau/css/aufbau.css' />
<style mode='adopt'  src='./theme.css' />
<style mode='inline' src='./local.scss' />
```

| mode | |
|---|---|
| `adopt` (default) | fetched once per url, a constructable stylesheet of the document |
| `link` | a `<link rel=stylesheet>` in the head |
| `inline` | read while compiling, part of the component's `<style>`: no request, no unstyled flash |

The same as a statement in the script:

```ratjs
style link 'https://code.pulgasari.dev/aufbau/css/aufbau.css';
style './theme.css';
```

## Dynamic

```rat
<div.bar style:width={`${$progress}%`} class:done={$progress === 100} />
<section style={{ '--accent': $color }}>
```
