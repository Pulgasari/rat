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

## Two-way

```rat
<!-- parent -->
<SearchPanel bind:value={$query} />

<!-- SearchPanel.rat: writing $value writes the parent's $query -->
<script>
  let { $value } = this.props;
</script>

<input value={$value} oninput={event => $value = event.currentTarget.value} />
```

## Events and commands

```rat
<button onclick={save}>save</button>          <!-- a function -->
<button onclick='save'>save</button>          <!-- a command of RAT.app.commands -->
<form on:submit!={add}>                       <!-- preventDefault() first -->
```

## Using a component

```rat
<script>
  import Card from './Card.rat';
</script>

<Card title='Hello' />
```

With `autoImport` in `config.rat.js`, a component found in the named folders needs no import.

## Views

A component on a route of the app:

```rat
<rat-view name='note' route='/notes/:id' component={NoteView} />   <!-- props: { id, view } -->
<rat-view name='pdf'  route='/pdf' lazy={() => import('./PdfView.rat.html')} />
```
