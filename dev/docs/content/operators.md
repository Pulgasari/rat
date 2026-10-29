# Operators

What rat adds to js, in `.rat` scripts, holes and `.rat.js`.

## `|>` pipe

```ratjs
name |> normalize |> slugify;               // slugify(normalize(name))
$todos |> #.length |> `${#} todos`;          // # is the value
value |> clamp(0, 100, #);                  // # places it
'a b' |> makeFormatter();                   // a call without #: its result is called
```

## `<|` / `::` apply

The other way round: the left side is called with the right side.

```ratjs
RAT.app.hold <| load().catch <| toast.error;   // RAT.app.hold(load().catch(toast.error))
show :: format :: item.name;                   // show(format(item.name)), :: is the same
```

## `..` ranges

```ratjs
1..5          // 1 2 3 4 5, lazy
'a'..'e'      // a b c d e
[1..3]        // [1, 2, 3]
```

```rat
@for (n of 1..$count): <span>{n}</span>
```

## `match`

```ratjs
const label = match (event) {
  { type: 'user', name } => `user ${name}`,
  { age } if age >= 18   => 'adult',
  Num.range(0, 255)      => `byte ${#}`,
  'idle' | 'paused'      => 'waiting',
  _                      => 'unknown',
};
```

The first arm that fits gives the result. A pattern is an object, an array, a literal, `typeof` name, a class, a schema, a regexp or a named case.

## `case` and `is`

```ratjs
case Adult = { age } if age >= 18;
case Email = string if #.includes('@');

if (input is Email) send(input);
$users.filter(user => user is Adult);
```

## `for (x of …)`

`for (item of items)` declares `item`, as `const`.
