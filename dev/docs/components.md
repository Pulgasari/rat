# Components

A `.rat` file is one component. Its name is the file name: `Card.rat` is `<Card>`.

```rat
<script>
  let { $title } = this.props;
</script>

<article.card>
  <h2>{$title}</h2>
  <slot />
</article.card>

<style>
  .card { padding: 1rem; border-radius: 0.5rem; }
</style>
```

## Tags

| notation | meaning |
|---|---|
| `<div#main.card.big>` | id and classes right in the tag |
| `<.card>` | a `div` with a class |
| `<Card>` | a component: a capital is a name in scope |
| `<slot />` | what the parent put between the tags |

## Props

```rat
<Card title='Hello' count={$n}>the content</Card>
```

The component reads them as `this.props`. `let { $title } = this.props` makes a signal of a prop: it follows the parent.

## Using a component

```rat
<script>
  import Card from './Card.rat';
</script>

<Card title='Hello' />
```

With `autoImport` in `config.rat.js`, a component found in the named folders needs no import.
