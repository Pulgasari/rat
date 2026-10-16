# rat :: ranges

status: **built**, decided (d-05 to d-07).

see also: [syntax.md: ranges](../syntax.md#ranges)

<a id="d-05"></a>
## d-05 · range forms → **inclusive `a..b` only**

<a id="d-06"></a>
## d-06 · ranges work everywhere script sugar works → **yes**

<a id="d-07"></a>
## d-07 · what a range is → **a lazy range type with array methods; `[a..b]` is an array**

built: `a..b` is a `Span` from `@rat/runtime`'s `range()` (iterable, `length`, `at`, `includes`,
plus `map`, `filter`, `reduce`, `join` … on a fresh array). `[1..5]` alone in brackets
compiles to `[...$$.range(1, 5)]`. the class is not exported (`Range` is the dom's),
`isRange()` tells one apart.
