# Control flow

Blocks around markup, written with `@`.

## @if

```rat
@if ($user)
  <p>hello {$user.name}</p>
@else
  <button onclick={login}>log in</button>
```

## @for

```rat
<ul>
  @for (todo of $todos): <li>{todo.title}</li>
</ul>
```

## @match

```rat
@match ($view)
  @case 'grid': <grid-view />
  @case 'list': <list-view />
  @default:     <p>unknown</p>
```

## Three forms of a body

```rat
@if ($ok) { <b>yes</b> }    <!-- braces -->
@if ($ok): <b>yes</b>        <!-- one line -->
@if ($ok)                    <!-- indented below -->
  <b>yes</b>
```

## match in the script

```ratjs
const label = match (event) {
  { type: 'user', name } => `user ${name}`,
  'idle' | 'paused'      => 'waiting',
  _                      => 'unknown',
};
```
