# rat :: pipes

status: `|>` and `#` **built** (d-08, d-09). further operators: **open decision** ([d-10](#d-10)). more pipe ideas from other languages below.

see also: [syntax.md: pipe](../syntax.md#pipe)

## the pipe family

`|>` with `#` already covers every case: `users |> #.filter(u => u.active)`. further
operators would only be shorter spellings of the common list operations. the question
is whether they earn their place.







## from other languages

### clojure: a name for the value, and a nil-safe pipe

**idea: threading with a named placeholder (`as->`).**

```clojure
(-> user :address :city)              ; thread first:  (:city (:address user))
(->> numbers (filter even?) (map inc)) ; thread last
(as-> user u                           ; thread with a name: u is the value, anywhere
  (assoc u :seen true)
  (save db u))
```

**problem.** rat's `#` is anonymous. in a long pipe, `#` means something different in
every step, which can get hard to follow.

**in rat.** an optional name for the value of one pipe step:

```js
$order
  |> (order) => total(order.items)
  |> (sum) => format(sum, $currency)
```

this already works today: an arrow function on the right is called with the value.
so there is nothing to build, only to document as the "named" form next to `#`.

**idea: nil-safe threading (`some->`).** `(some-> user :address :city)` stops at the
first `nil` instead of throwing.

```js
$user ?|> #.address ?|> #.city ?|> format    // stops at the first null / undefined
```

**cost.** small, one more operator in the pipe rewrite. `?|>` is free in js.

### kotlin: `#` in plain callbacks

**idea: `it`, the implicit name of a one-parameter lambda.**

```kotlin
users.filter { it.active }.map { it.name }
```

**problem.** `users.filter(user => user.active)` names the same thing twice.

**in rat.** `#` already is rat's `it`. the idea would be to allow it in plain callbacks
too, not only in pipes:

```js
$users.filter(#.active).map(#.name)    // users.filter(x => x.active).map(x => x.name)
```

the rule: a `#` directly inside the arguments of a call makes that argument a function
of `#`.

**cost.** small in the compiler, but it changes what `#` means outside of pipes, which
is an error today. a decision, not a technical problem.

