# rat :: filters on loops

status: **idea**, syntax is an **open decision** ([d-29](#d-29)).

## idea: a condition in the `@for` head (from haskell)

**origin.** haskell's list comprehension builds a list from another, with a condition:

```haskell
[ x * 2 | x <- [1..10], even x ]   -- [4, 8, 12, 16, 20]
```

read: "x times 2, for x from 1 to 10, where x is even".

**problem.** "show only the open todos" otherwise needs a computed or a `.filter()`
inside the `@for` head.

**in rat.**

```html
@for (todo of $todos if !todo.done)
  <li>{todo.title}</li>
@else
  <li>all done</li>
```

**cost.** small. `if …` becomes a `.filter()` around the list. `@else` then means
"nothing left after filtering", which is usually what you want.

<a id="d-29"></a>
## d-29 · filters on loops: the syntax

```html
@for (todo of $todos if !todo.done)       a) if in the head
@for (todo of $todos where !todo.done)    b) where (sql, haskell, swift)
@for (todo of $todos |? !#.done)          c) the pipe filter (if d-10 brings |?)
@for (todo of $todos, !todo.done)         d) a comma, like a comprehension
```

- [ ] a) `if` **(rec)**: a word every js reader knows, no new keyword
- [ ] b) `where`
- [ ] c) only through the pipe family
- [ ] d) comma

## notes

ja, aber genaue syntax mir noch unklar.

**reply:** four variants in [d-29](#d-29).
