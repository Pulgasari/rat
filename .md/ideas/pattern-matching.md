# rat :: pattern matching

status: named cases **built** (`case`, `is`, `@case Name`). patterns written straight into a `@case`: **open decision** ([d-30](#d-30)).

see also: [causa_types.md](../causa_types.md), [syntax.md: named cases](../syntax.md#named-cases), `pulgasari.github.io/md/analyze/shift-typeshift.md`

## idea: `@match` (from rescript)

**origin.** rescript's `switch` compares a value against **shapes**, not only against
fixed values, and takes parts of it out in the same step:

```rescript
switch result {
| Ok(user)       => "hello " ++ user.name
| Error(message) => "failed: " ++ message
}
```

**problem.** `@switch` only compares with `===`. data often comes as objects of
different shapes (`{ status: 'ok', user }` vs `{ status: 'error', message }`), and
then you need `@if` chains plus property access everywhere.

**in rat.**

```html
@match ($result)
  @case { status: 'ok', user }
    <p>hello {user.name}</p>
  @case { status: 'error', message }
    <p>failed: {message}</p>
  @default
    <p>…</p>
```

a case matches when every literal in it is equal (`status: 'ok'`), and the plain names
(`user`, `message`) become variables inside its body.

**cost.** medium. the compiler turns each case into a check plus a destructuring.

## named cases

your idea: a `case` as a declaration, so a pattern has a name and can be reused in
`@switch`, `@if` and anywhere a condition goes. f# has it as *active patterns* ([below](#f-active-patterns)),
haskell as *pattern synonyms*, scala as *extractors*.

### a case is a pattern with a name

```js
// <script> or .rat.js
case Loading = { status: 'loading' };
case Failed  = { status: 'error', message };          // message: a part handed out
case Adult   = { age } if age >= 18;                  // a pattern plus a guard
case Email   = string if #.includes('@');             // a type plus a guard on the value
```

a case answers two things at once: does a value match, and which parts does it hand out.

### where it is used

```html
@switch ($state)
  @case Loading: <p>loading …</p>
  @case Failed:  <p.alert>{message}</p>          <!-- message comes from the case -->
  @default:      <app-view />

@if ($user is Adult): <a href="/shop">shop</a>
```

```js
if (input is Email) send(input);
const adults = $users |?> # is Adult;
```

- `is` is the operator for "matches the case" (raku and kotlin use the same word).
- a case is a value: it can be exported, imported and shared between components
  (`import { Failed } from './states.js'`).

### what it compiles to

```js
const Failed = $$.pattern(value => value?.status === 'error' ? { message: value.message } : null);

// @case Failed: <p>{message}</p>
const match = Failed(state);
if (match) { const { message } = match; … }
```

a case is a function that returns `null` (no match) or the parts it hands out. the
runtime needs nothing beyond that; the work is in the compiler.

### open questions

- `case` as a keyword clashes with `switch` / `case` in plain js. `@case` already is a
  rat keyword in markup; in scripts the name could be `pattern` or `when` instead.
- exhaustiveness: should `@switch` warn when a known set of cases is not fully covered?
- how far patterns go: objects and guards are easy, arrays and nested patterns follow.

Anm.: Das hätte dann 3 Namen oder was lol. Aber inwiefern clashed das mit plain js? es braucht ja eigtl nur in `.rat.js` und `.rat` zu funktionieren? odef nich?

**reply:** right on both. it is one word in three places, each doing its own job:
`case` declares (script), `@case` uses it in markup, `is` tests it inside an expression
(like `instanceof`). `pattern` / `when` are off the table. and the clash is no clash: only
compiled files need it, and there `case Name = …` as a statement is a syntax error in
plain js, so no valid code changes meaning. inside a `switch`, `case x:` stays what it
was; a declaration needs `Name =` with a capital. built that way, see
[syntax.md](../syntax.md#named-cases).

## from other languages

### f#: active patterns

**idea: active patterns, named patterns you define yourself.**

```fsharp
let (|Even|Odd|) n = if n % 2 = 0 then Even else Odd

match 7 with
| Even -> "even"
| Odd  -> "odd"

let (|Email|_|) (s: string) = if s.Contains "@" then Some (s.Split '@') else None

match input with
| Email [| user; domain |] -> $"{user} at {domain}"
| _                        -> "not an email"
```

a pattern is a function: it decides whether a value matches, and it can hand out parts
of it (`user`, `domain`).

**problem.** your idea of reusable "named cases" ([above](#named-cases)) is exactly
this. f# shows it scales: patterns become a vocabulary of the program.

**in rat.** see [named cases](#named-cases) above.

### raku: smart matching with `given` / `when`

**idea: smart matching with `given` / `when`.** a `when` compares by type: a number
against a range, a string against a regex, a value against a list.

```raku
given $score {
  when 90..100 { 'A' }
  when 80..^90 { 'B' }
  when /^\d+$/ { 'a number' }
}
```

**in rat.** `@switch` with ranges, regexes and lists as cases:

```html
@switch ($score)
  @case 90..100: <b>A</b>
  @case 80..89:  <b>B</b>
  @default:      <b>C</b>
```

**cost.** small, and rat has ranges already: a case that is a `Range` uses `includes`.

<a id="d-30"></a>
## d-30 · pattern matching (with [named cases](#named-cases))

two parts: the block, and whether patterns can be named and reused.

- [ ] a) `@match` with object patterns, as in [the idea above](#idea-match-from-rescript)
- [ ] b) `@switch` learns patterns (no new keyword): a `@case` with `{ … }` or `[ … ]` is a pattern, anything else compares with `===` **(rec)**
- [ ] c) both, `@match` exhaustive (warns about unhandled cases), `@switch` not

named cases, your idea: **yes, built.** `case Name = pattern if guard` in scripts, `x is Name`
in scripts and conditions, `@case Name` in `@switch` with the parts handed to the branch.
details in [syntax.md](../syntax.md#named-cases), your question in the notes of [named cases](#named-cases).
what stays open here is only the block: patterns written straight into a `@case` (a, b or c).

## notes

ja, aber genaue syntax mir noch unklar. habe in `@pulgasari/shift` und `@pulgasari/typeshift` mit derartigem auch schon etwas experimentiert. aber bin mir da ingesamt unklar.

so ein mechanismus fehlt ja aber sehr.

n weiter ansatz/gedanke von mir diesbzgl. war mal `case` (ausserhalb von switch) in den stand zum declaration zu erheben, um so globale oder im jeweiligen scope referenzierbare/wiederverwendbare case-muster definieren zu können (quasi benannte cases). nutzbar dann auch in `if` und generell conditional contexten. habs nie richtig ausprobiert, aber rein gefühlsmäßig denk ich mir stets, sowas müsste es eigtl geben.

**reply:** your feeling is right, it exists: f# calls them *active patterns*, scala
*extractors*, haskell *pattern synonyms*. worked out for rat in
[5. named cases](#named-cases), the block syntax is [d-30](#d-30).
