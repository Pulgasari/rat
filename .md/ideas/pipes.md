# rat :: pipes

status: `|>` and `#` **built** (d-08, d-09). further operators: **open decision** ([d-10](#d-10)). more pipe ideas from other languages below.

see also: [syntax.md: pipe](../syntax.md#pipe)

## the pipe family

`|>` with `#` already covers every case: `users |> #.filter(u => u.active)`. further
operators would only be shorter spellings of the common list operations. the question
is whether they earn their place.

### the hard constraint: `a |X b` must not be valid js already

`|` is bitwise or. any second character that can start an operand turns the "operator"
into plain js that already means something else:

| candidate | idea | `a \|X b` is valid js? | verdict |
|---|---|---|---|
| `\|>` | pipe | no | **built** |
| `\|:` | map | no | free |
| `\|?` | filter | no | free |
| `\|*` | reduce | no | free |
| `\|^` | sort / flat? | no | free, but no obvious meaning |
| `\|@` | each (side effect) | practically no (only a decorated class expression could follow) | free |
| `\|.name` | pluck | no, as long as a name follows (`\|.5` is valid) | free, with that limit |
| `\|!` | reject | **yes**: `a \| !b` | taken |
| `\|~` | ? | **yes**: `a \| ~b` | taken |
| `\|+` `\|-` | ? | **yes**: `a \| +b` | taken |
| `\|1` | find | **yes**: `a \| 1` | taken |
| `\|$` | ? | **yes**: `a \| $x` | taken |
| `\|#` | ? | **yes**: `a \| #x in obj` (brand check) | taken |
| `\|=` | ? | **yes**: compound assignment | taken |
| `\|` | map | **yes**: bitwise or | taken |

### a coherent set (proposal)

`#` stays the placeholder; in the list operators it is the **item**:

```js
users |? #.active |: #.name                  // users.filter(u => u.active).map(u => u.name)
users |.name                                 // users.map(u => u.name)
1..10 |? # % 2 |* (sum, #) => sum + #, 0     // reduce: (accumulator, item), initial value
items |@ console.log(#)                      // forEach, returns items (for chaining)
```

| operator | meaning | rewrite |
|---|---|---|
| `\|:` | map | `.map($$item => …)` |
| `\|?` | filter | `.filter($$item => …)` |
| `\|.name` | pluck | `.map($$item => $$item.name)` |
| `\|*` | reduce | `.reduce(…)`, needs an initial value: the open spot of this set |
| `\|@` | each | `(list => (list.forEach(…), list))` |

the reject / find slots are taken by js (`|!`, `|1`). alternatives: `|?!` (reject) and
`|?1` (find), both free, both a bit cryptic.

### for and against

- **for**: data flow reads left to right in one line, markup holes stay short
  (`{$users |? #.active |.name}`), ranges get useful at once (`1..10 |? # % 3`).
- **against**: five new operators to learn, `|?` and `|:` look alike, `|*` needs a second
  argument, and `|> #.filter(…)` is only a few characters longer.
- **middle ground**: only `|:` and `|?` (the 90 % case), everything else through `|>`.

### your shapes

checked against the same rule (is `a XX b` valid js already?):

| shape | valid js today? | note |
|---|---|---|
| `>>` | **yes**: shift right | taken |
| `>>>` | **yes**: unsigned shift right | taken |
| `\|?>` | no | free |
| `\|?:` | no | free |
| `\|!:` | no (`a \| !:` has no operand after `!`) | free |
| `\|?\|` | no | free |
| `\|!\|` | no | free |

### the `|X>` family (proposal)

your `|?>` suggests a rule: every list operator ends in `>` like the pipe ("flows
into"), the character in the middle names the operation. all of them are free in js,
because `|` followed by `?`, `!`, `:`, `*`, `.` or `@` and then `>` never forms valid code.

```js
users |?> #.active |:> #.name                  // filter, then map
users |!> #.banned                             // reject: the ones where it is false
users |.> name                                 // pluck
1..10 |*> (sum, #) => sum + #, 0               // reduce (still the open spot: the start value)
$todos |?> !#.done |> #.length                 // mixes with the plain pipe
```

| operator | meaning | why this character |
|---|---|---|
| `\|>` | pipe | built |
| `\|?>` | filter | `?`: "is it?" |
| `\|!>` | reject | `!`: "is it not?" |
| `\|:>` | map | `:`: "becomes" (like `key: value`) |
| `\|*>` | reduce | `*`: "all into one" |
| `\|.>` | pluck | `.`: property access |
| `\|@>` | each (side effect, passes the list on) | `@`: "at each" |

compared to the two-character set (`|?`, `|:`) it is one character longer, but the
family is recognizable at a glance, and `|?` vs. `|:` no longer look alike. find (the
first match) is still without a slot: `|?1>` would be free, but reads poorly.

<a id="d-10"></a>
## d-10 · further pipe operators

your note: more operators, since `filter(…)` / `map(…)` chains read badly. your shapes
are checked [above](#your-shapes): `>>` and `>>>` are js shift
operators; `|?>`, `|?:`, `|!:`, `|?|`, `|!|` are free.

- [ ] a) none, `|>` with `#` covers it
- [ ] b) the `|X>` family: `|>` pipe, `|:>` map, `|?>` filter, `|!>` reject, `|*>` reduce, `|.>` pluck **(rec)**: one visual rule, every member ends in `>` ("flows into"), the middle character is the operation, all free in js
- [ ] c) two-character forms: `|:` map, `|?` filter, `|*` reduce, `|.name` pluck
- [ ] d) other: …

Anm. glaube bei so viele wäre es auch wieddr unleserllch, wenn name nicht 100pro perfekt. aber ich frag mich grade ob zumindest bei map `<|` eigtl logisch wäre?

**reply:** `<|` is free in js (`a <| b` is a syntax error), but it already has a meaning
elsewhere: in f#, elm and haskell (`<|`, `$`) it is backward application, `f <| x` is
`f(x)`, the mirror of `|>`. the arrow points left, so it reads as "flows from right to
left", while map in a chain flows on to the right like every other step. as map it would
fight both the precedent and its own picture. on "too many": agreed, six operators only pay
off if they are all used daily. a smaller set is a real option:

- [ ] e) two only: `|>` pipe and `|?>` filter; map stays `|> map(#, fn)` or a function

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

### gleam: `_` as the placeholder

**idea: the pipe placeholder `_`.**

```gleam
list
|> list.map(_, double)
|> string.join(_, ", ")
```

**problem.** this is d-08: you liked `_` but worried it means "skip". gleam uses it for
exactly rat's purpose and nobody gets confused, because inside a pipe step it can only
mean "the value". worth a second look at [d-08](#d-08).

### swift and ruby: pluck

**idea: key paths.** `\.name` is a function that reads `name`: `users.map(\.name)`.
rat's pluck (`|.> name`, [above](#the-x-family-proposal)) is the same idea for pipes.

**idea: symbol to proc, `&:name`.** `users.map(&:name)` is `users.map { |u| u.name }`.
the third language in this list (after swift and kotlin) with a short form for "read
this property", which makes pluck (`|.> name`) a safe bet.

### raku: the whatever-star

**idea: the whatever-star.** `@numbers.map(* * 2)` makes a function from an expression
with a `*` in it. it is the same idea as rat's `#`, which confirms the choice: a
placeholder that turns an expression into a function is a proven concept.

<a id="d-08"></a>
## d-08 · the pipe placeholder → **`#`, provisionally**

your note: `$` is taken by reactivity, `_` usually means "skip", `@` looks good too.
→ `@` is now the behavior marker in markup and a decorator in js, which would make it
ambiguous inside holes. `#` stays until something better shows up. worth knowing: gleam
uses `_` exactly like this (`list |> map(_, double)`), so `_` has a precedent
([below](#gleam-_-as-the-placeholder)).

<a id="d-09"></a>
## d-09 · `x |> f()` → **`f()(x)`: whatever the right side evaluates to is called**

your note: with the two existing forms only this is consistent. → agreed and built. the
rule is now simple: with `#` the value goes where `#` is; without `#` the right side is
evaluated and called with the value.
