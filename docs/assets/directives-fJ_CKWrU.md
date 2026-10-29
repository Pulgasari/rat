# Directives

Blocks around markup in a `.rat` file. They start with `@` at the beginning of a line (after whitespace, a tag or `}`): `mail@for.example` stays text.

[`@if`](#if) · [`@for`](#for) · [`@match`](#match) · [`@await`](#await) · [`@var`](#var) · [`@fragment`](#fragment)

## Three body forms

Every body can be written three ways, mixed per branch:

```rat
@if ($ok) { <b>yes</b> } @else { <i>no</i> }   <!-- braces -->

@if ($ok): <b>yes</b>                          <!-- one line: the rest of the line -->
@else: <i>no</i>

@if ($ok)                                      <!-- indented: the lines deeper than the head -->
  <b>yes</b>
@else
  <i>no</i>
```

## @if

```rat
@if ($user)
  <p>hello {$user.name}</p>
@else if ($loading)
  <p>loading …</p>
@else
  <button onclick='login'>log in</button>
```

## @for

```rat
<ul>
  @for (todo of $todos): <li>{todo.title}</li>
  @else: <li.empty>nothing to do</li.empty>
</ul>

@for (todo, index of $todos): <li>{index + 1}. {todo.title}</li>
@for ({ id, title } of $todos): <li id={id}>{title}</li>
@for (n of 1..5): <span>{n}</span>
```

- `@else` shows for an empty list.
- rows are kept by item identity. `index` is the position a row was made at; `$index` follows the row:

```rat
@for (tab, $index of $tabs)
  <button class:active={$index === $current} onclick={() => close($index)}>{tab.name}</button>
```

## @match

```rat
@match ($view)
  @case 'grid': <grid-view />
  @case 'list': <list-view />
  @default:     <p>unknown view</p>
```

A `@case` takes any test `match` knows: a literal, a schema, a class, a named case. A case declared in the file hands out its parts:

```rat
<script>
  case Failed = { status: 'error', message };
</script>

@match ($state)
  @case Failed:  <p.alert>{message}</p>
  @case 'idle':  <p>ready</p>
  @default:      <p>loading …</p>
```

## @await

The states of a promise. It is asked again when what it reads changes.

```rat
@await (user of load($id))
  <p>{user.name}</p>
@pending
  <p>loading …</p>
@catch (error)
  <p>{error.message}</p>
```

Without `@catch` a rejection goes to `RAT.app.on('error')`.

## @var

A name for the rest of a body, mostly per row of a `@for`:

```rat
@for (item of $items)
  @var $share = Math.round(item.count / $total * 100)
  <li>{item.name}: {$share}%</li>
```

A `$name` follows what it reads, a plain name is the value when the row is made.

## @fragment

Markup with parameters, declared once at the top level, called like a function:

```rat
@fragment row (item)
  <tr><td>{item.name}</td><td>{item.price}</td></tr>

<table>
  @for (fruit of $fruits): {row(fruit)}
</table>
```

The script can call it too and hand it on as a prop.
