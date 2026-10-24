# Control flow

Blocks around markup, written with `@`.

## @if

```html
@if ($user)
  <p>hello {$user.name}</p>
@else
  <button onclick={login}>log in</button>
```

## @for

```html
<ul>
  @for (todo of $todos): <li>{todo.title}</li>
</ul>
```

## @match

```html
@match ($view)
  @case 'grid': <grid-view />
  @case 'list': <list-view />
  @default:     <p>unknown</p>
```

## Three forms of a body

```html
@if ($ok) { <b>yes</b> }    <!-- braces -->
@if ($ok): <b>yes</b>        <!-- one line -->
@if ($ok)                    <!-- indented below -->
  <b>yes</b>
```

## match in the script

```js
const label = match (event) {
  { type: 'user', name } => `user ${name}`,
  'idle' | 'paused'      => 'waiting',
  _                      => 'unknown',
};
```
