# causa :: types

a topic paper, not a concept. what the words mean, where the ideas come from, which
questions a design has to answer. nothing here is decided; it is the ground to design on.
related: [concept 5](concept.md#5-types-are-values), [d-14](ideas/types.md#d-14),
[d-30](ideas/pattern-matching.md#d-30), [pattern matching](ideas/pattern-matching.md#named-cases), [syntax: named cases](syntax.md#named-cases).

- [1. the complaint](#1-the-complaint)
- [2. what a type is](#2-what-a-type-is)
- [3. building blocks](#3-building-blocks)
- [4. static and at runtime](#4-static-and-at-runtime)
- [5. checking, parsing, coercing](#5-checking-parsing-coercing)
- [6. pattern matching](#6-pattern-matching)
- [7. from a type to an input](#7-from-a-type-to-an-input)
- [8. the color example](#8-the-color-example)
- [9. vocabulary](#9-vocabulary)
- [10. questions for a design](#10-questions-for-a-design)

---

## 1. the complaint

the position "against types" usually is not against types at all, but against one kind of
them. three points, and each has a name:

| what annoys | the name | why it is so |
|---|---|---|
| writing `(a: number, b: number)` on a two-line function, the ide complains otherwise | **annotation burden** | typescript and php need the type written where they can not infer it. languages with good **inference** (elm, ocaml, f#, gleam) almost never need it on small functions |
| the type repeats what the code already says | **duplication** | the type and the runtime check (if there is one) are two descriptions of the same thing. they drift apart |
| everything useful is removed before it runs | **type erasure** | typescript compiles to js and drops every type. by design: ts only checks, it never changes what runs. so `'grid' \| 'list'` exists for the editor and is gone when the select box is built |

the third point is the real one, and it is not an odd view: it is the reason zod, valibot,
json schema, clojure spec, pydantic and elm's decoders exist. they all keep the
information at runtime, because that is where data arrives (forms, storage, network) and
where a ui needs to know what is allowed.

a short way to put it: **static types answer "can this code be wrong", runtime types answer
"is this data right" and "what may it be".** rat's direction (no typescript, schemas as
values) is the second kind. the first kind can still be derived from it later; the other
way round is impossible, because erased information is gone.

---

## 2. what a type is

the word means four different things depending on who says it:

| meaning | example | exists |
|---|---|---|
| a static type | `let x: string` in ts | only while compiling |
| a runtime tag | `typeof x === 'string'`, `x instanceof Date` | at runtime, built into the language |
| a class / constructor | `Date`, `Map`, `class User` | at runtime, as a value |
| a schema | `Str.min(1)`, `z.string().min(1)` | at runtime, as a value you build |

one view holds all four together: **a type is a set of values.**

```
Str             every string
Str.min(1)      every string with at least one character
Num.min(0)      0, 0.5, 1, 2, … 
Enum('a', 'b')  'a' and 'b', nothing else
Bool            true and false
```

with that view a lot gets simple:

- "x has type T" = x is in the set T.
- a narrower type is a smaller set (`Str.min(1)` inside `Str`). that is **subtyping**.
- combining types is set algebra: a union is "in A or in B", a record is "a combination of
  one value from each field".
- a check is the question "is x in the set". a schema is a set you can ask.

what the view leaves out: operations (what you can *do* with a value) and identity
(see nominal vs structural in [9](#9-vocabulary)). for data and inputs it covers almost
everything.

---

## 3. building blocks

every type system builds bigger types from smaller ones with a few operations. the names
come from algebra, which is why they sound odd:

### base types

`Bool`, `Num`, `Int`, `Str`, plus whatever the platform has (`Date`, `Blob`, `URL`).

### literal types

a set with exactly one value: `'grid'`, `42`, `true`. alone they are useless, combined they
are everywhere (`'grid' | 'list'`).

### refinements

a base type plus a condition: `Int` from 0 to 255, `Str` matching an email pattern, a
`List` with at most 10 items. in theory this is a **refinement type**; pascal had it in
1970 as a *subrange* (`type Byte = 0..255;`), ada still has it, and html has it today:

```html
<input type="number" min="0" max="255" step="1">
```

html input attributes are a runtime type system nobody calls one.

### products: record, tuple

"one value of each": a record has named fields, a tuple has positions.

```js
Record({ r: Byte, g: Byte, b: Byte })   // named
Tuple(Byte, Byte, Byte)                 // positional: [255, 128, 0]
```

called **product** because the number of possible values multiplies:
`Bool × Bool` has 2 · 2 = 4 values.

### sums: union, variant

"one of these": a union is in A or in B or in C.

```js
Union(RGBColor, HSLColor, HexColor)
```

called **sum** because the possible values add up. a union is easy to check, but to work
with a value you need to know *which* member it is. two ways:

- **tagged** (also: discriminated, variant): each member carries a marker,
  `{ space: 'rgb', r, g, b }` vs `{ space: 'hsl', h, s, l }`. one look at `space` decides.
  rust's `enum`, elm's custom types, ts's discriminated unions.
- **untagged**: try each member in order until one fits. works, but ambiguous when two
  members overlap (an rgb record and a "three numbers" record look the same).

products and sums together are called **algebraic data types**. with base types,
literals, refinements, products and sums nearly every piece of data can be described.

### collections

`List(T)`, `Set(T)`, `Map(K, V)`, `Dict(T)`: many values of one type. a list is a
product of unknown length.

### generic types

a type with a gap: `List(T)` is not a type until `T` is filled in. in a schema library this
is just a function: `List(Str)` calls `List` with `Str`. see
[generics.md](https://github.com/pulgasari/pulgasari.github.io/blob/main/md/webdev/generics.md).

---

## 4. static and at runtime

| | static (ts, rust, elm) | runtime (schemas) |
|---|---|---|
| when | before the code runs | while it runs |
| finds | mistakes in the code | wrong data |
| costs | annotations, compile time, nothing at runtime | bytes, a check per value |
| knows about the outside world | no: a `fetch` result is whatever the type claims | yes: it looks at the actual value |
| can drive a ui, a form, a db column | no, it is gone | yes |
| editor help (completion, errors while typing) | yes | only if the tooling reads the schemas |

the two are not rivals. the interesting systems connect them:

- **schema first, static type derived**: zod's `z.infer<typeof User>`. the schema is the
  source, the static type a by-product. this is the direction that fits rat: if typescript
  is ever wanted, it can be derived from `@rat/types` schemas.
- **static first, runtime derived**: generators that read ts types and emit validators
  (typia, ts-runtime-checks). needs a build step and still loses everything ts can not express.
- **one language for both**: elm, gleam: static types for the code, explicit decoders at the
  border to the outside world. the border is where the runtime check sits.

the last point is worth keeping: **check at the border, trust inside.** data is checked
when it comes in (form, storage, network, url), after that it is known to be right. no need
to check every function argument.

---

## 5. checking, parsing, coercing

three things that are often mixed up:

| | does | returns |
|---|---|---|
| **validate** | is this value in the set? | yes / no (plus why not) |
| **coerce** | turn a near miss into a fit: `'42'` → `42`, `'yes'` → `true` | a value of the type, or fail |
| **parse** | validate + coerce + build the result | a value you can trust from now on |

*parse, don't validate* (alexis king, 2019): after parsing you hold a value that is
guaranteed to fit, instead of a value plus the memory that you once checked it.

coercion is a design choice, not a must. `Num` accepting `'42'` is handy for form fields
(everything there is a string) and dangerous for an api (a typo becomes a number).

a related idea: a **representation** (or **codec**) is how a value is written down, not
what it is. `#ff8000`, `rgb(255 128 0)` and `{ r: 255, g: 128, b: 0 }` are three
representations of the same color. a codec goes both ways: decode (string → value) and
encode (value → string). zod 4.1 has them, @aufbau/store's persistence does it by hand
with `JSON.parse`.

---

## 6. pattern matching

a ladder; each step adds one thing:

| step | does | example |
|---|---|---|
| named condition | yes or no, with a name | `case adult = user => user.age >= 18` |
| pattern | checks the **shape** of a value | `{ status: 'error' }` |
| pattern with bindings | checks the shape **and** takes parts out | `{ status: 'error', message }` → `message` is usable |
| exhaustive | the compiler warns when a possible case is missing | rust, elm, f#, gleam |

pattern matching in the strict sense means step 3: test and destructure in one move,
instead of `if (x.status === 'error') { const message = x.message; … }`. that core is the
same in every language that has it.

what differs between languages, and why it seems so inconsistent:

- the keywords: `switch`, `match`, `case`, `when`, `is`, `with`.
- guards (`if age >= 18` after a pattern): most have them.
- exhaustiveness: only languages with closed unions can check it (they know all members).
- **patterns as values with a name**: rare. f# calls them *active patterns*, scala
  *extractors*, haskell *pattern synonyms*. most languages only allow patterns written in
  place. rat's named cases are this kind.
- how a binding is told apart from a value to compare with. haskell, rust, f#: uppercase is
  a constructor or constant, lowercase a new variable. js destructuring: the shorthand
  `{ message }` binds, `{ message: x }` renames. a third option: only the shorthand binds,
  anything after a `:` is always a test.

### how it meets types

a pattern is a set plus "take parts out". a schema is a set. so a schema can be a pattern
part wherever a literal can:

```js
case adult  = { age: Num.min(18) };
case failed = { status: 'error', message: Str };
case admin  = { role: Enum('admin', 'owner'), name };

if (x is Str.email) …
```

and a tagged union is what makes exhaustiveness possible: if `$state` is declared as
`Union(loading, failed, done)`, a `@switch ($state)` can tell which `@case` is missing.
the division of labour:

- a **schema** says what a value *may be* (signals, inputs, storage).
- a **case** says which possibility it *is right now* (branches).
- both answer the same question, so `is` can take either.

---

## 7. from a type to an input

the observation behind this paper: a type that describes its values well enough already
says how to edit them. `Enum('grid', 'list')` is a select or a segmented control,
`Int.range(0, 255)` a slider or a stepper, `Bool` a toggle, `Record` a fieldset with one
control per field, `List(T)` a list of `T`-controls with add and remove.

this is old and has names:

| | when | what |
|---|---|---|
| **naked objects** | 2002, richard pawson | the ui is generated entirely from the domain objects. the pattern's whole claim |
| django `ModelForm` | 2005– | a form from a database model |
| json schema forms | 2010s– | react-jsonschema-form, jsonforms: a form from a json schema, plus a separate *ui schema* for layout hints |
| pydantic / fastapi | 2018– | api docs and validation from one python class |
| `@aufbau/gui` | now | a *spec* (`{ type: 'duration', min, max, step, default }`) renders `input-*` controls and reads typed values back |

`@aufbau/gui`'s spec is already a small schema language: `type`, `min`, `max`, `step`,
`default`, `values`, plus `look` and `label`. what it lacks is everything a schema adds on
top: checking a value outside a form, composing (records of records, lists, unions), and
being the same object a signal or a store uses.

the lesson from json schema forms: **two kinds of information**, and they should not be
mixed:

- **what is allowed** (the type): range, steps, options, required. belongs to the data.
- **how it is shown** (the ui hint): slider or stepper, label, order, grouping, `look`.
  belongs to a view. the same `Byte` is a slider in one place and a number field in another.

a type can suggest a default control (an `Enum` with 2 to 5 values: segments, more: a
select), a ui hint overrides it.

---

## 8. the color example

worked through with the words from above.

```js
const Byte    = Int.range(0, 255);                  // a refinement
const Percent = Num.range(0, 100);
const Degree  = Num.range(0, 360);

const RGBColor = Record({ r: Byte, g: Byte, b: Byte });              // a product
const HSLColor = Record({ h: Degree, s: Percent, l: Percent });      // a product

const Color = Union(RGBColor, HSLColor);                             // a sum
```

what this already gives:

- **checking**: `{ r: 300, g: 0, b: 0 }` fails at `r`, with a path.
- **an input**: three sliders 0–255, or three steppers, read off `Byte`. an hsl input: a
  slider 0–360 and two 0–100.
- **a default**: `{ r: 0, g: 0, b: 0 }`, from each field's initial value.

what it shows that is not obvious:

1. **the union is ambiguous untagged.** `{ r, g, b }` and `{ h, s, l }` happen to have
   different field names, so trying each works. but `Tuple(Byte, Byte, Byte)` for rgb and
   `Tuple(Degree, Percent, Percent)` for hsl would both accept `[100, 50, 50]`. a tag
   removes the doubt: `{ space: 'rgb', … }`. the tag also gives the input a mode switch
   (rgb / hsl tabs) for free.
2. **the string is a representation, not a type of its own.** `'#ff8000'` or
   `'rgb(255 128 0)'` is not a third kind of color, it is a way to *write* one. as a type it
   would be `Str.pattern(/^#[0-9a-f]{6}$/)`, a literal pattern; as a codec it is
   `decode('#ff8000') → { space: 'rgb', r: 255, g: 128, b: 0 }` and back. an input can
   then offer a text field that goes through the codec, next to the sliders.
3. **one value, many inputs.** sliders, steppers, a text field, a picker: all edit the same
   `Color`. which one is a ui hint, not part of the type.
4. **conversions are not the type's job.** rgb → hsl is a function between two types, not a
   property of either. a `Color` type does not need to know that hsl exists in rgb terms.
5. **the platform already has a color type.** css colors (`oklch()`, `color-mix()`,
   `<input type="color">`) and `@aufbau/css`'s color functions. a `Color` schema would
   likely want css color strings as its main representation and the records as the
   editable form.

---

## 9. vocabulary

| word | meaning |
|---|---|
| type | a set of values (the view this paper takes) |
| schema | a type as a runtime value: it can check, coerce, describe |
| static / dynamic typing | checked before running / while running |
| type erasure | types removed before running (typescript) |
| inference | the compiler works the type out itself, nothing written |
| annotation | a type written by hand |
| base / primitive type | `Bool`, `Num`, `Str` … |
| literal type | a type with one value: `'grid'` |
| enum | a fixed set of literals |
| refinement | a type plus a condition: `Int` 0–255. older word: subrange |
| product type | one value from each part: record (named), tuple (positional) |
| sum type | one of several: union, variant |
| tagged / discriminated union | a sum whose members carry a marker field |
| algebraic data types | products and sums together |
| generic / parametric type | a type with a gap: `List(T)` |
| subtype | a smaller set inside a bigger one: `Str.min(1)` in `Str` |
| nominal typing | two types are the same only if they have the same name/declaration (java, a `class`) |
| structural typing | two types are the same if they have the same shape (ts, schemas). `{ r, g, b }` is an rgb color wherever it comes from |
| brand | a marker that makes a structural type nominal: an `UserId` string that is not just any string |
| optional / nullable | the value may be missing / may be `null` |
| validate / coerce / parse | is it in the set / bend a near miss into it / both plus build the result |
| codec / representation | how a value is written (string, json) and read back |
| pattern | a shape to test a value against, possibly taking parts out |
| binding | a name a pattern gives to a part (`message`) |
| guard | a condition after a pattern (`if age >= 18`) |
| exhaustiveness | every member of a union handled, checked by the compiler |
| ui hint / ui schema | how a type is shown, kept apart from what it allows |

---

## 10. questions for a design

no answers here, these are the questions a design for `@rat/types` (and `@aufbau/gui`,
`@aufbau/store`) has to settle:

###### **one schema for everything?** can the same `Settings` schema type a signal, check a.storage read, render a settings panel (`@aufbau/gui`) and back a store (`@aufbau/store`)? if yes, `@aufbau/gui`'s spec format and `@aufbau/store`'s type registry become views of one schema language.

Ich ging zumindest bisher davon aus, dass darauf hinaus laufen wird/sollte/könnte. Allein schon weil man dann nicht jedes mal rumüberkegen muss, wie man das nun notiert.
  
###### **coercion by default?** forms want `'42'` → `42`, apis want a strict "no".

Soweit möglich, ja.

###### **tagged unions by convention?** require a tag field (`kind`, `type`, `space`) or allow untagged unions tried in order?

Mir ist unklar, woraur die Frage genau abzielt.

###### **ui hints where?** on the schema (`Byte.hint({ control: 'slider' })`), in a separate view spec (json schema forms' way), or both with the view winning?

Prinzipiell beides. 

RAT legt da bereits einen Default fest. Aber eine App, ein AppView, ein AppPanel, eine GUIInstanz oder eine Element kann da natütrlich reinfunken.

Die genaue Form, wie all das in der Praxis aussehen könnte, wäre zu konzipieren und umfassend auszuprobieren. Hier sind sicherlich zig Formen möglich und man sollte sich zu früh auf irgendwas einschiessen.
  
###### **representations and codecs:** part of a schema (`Color.codec(css)`) or separate functions?

Ist ne Frage, die vermutlich aus der Praxis heraus zu beantworten ist.
  
###### **patterns and schemas:** is every schema a pattern (`x is Str.email`, `{ age: Num.min(18) }`)? and how is a binding told apart from a test (case of the first letter, shorthand only, a marker)?

###### **reactive variants:** does `List(T)` as a signal get list verbs (`push`, `remove`), and `Enum` as a signal `cycle`? (d-23 c, @aufbau/store already does this.)

In meiner Vorstellung ist `$List` "nur" ein reaktives `List`.

Wie man das in der Praxis am besten konstruiert, ist mir aber noch unklar

###### **static types later?** keep the door open to derive `.d.ts` types from schemas, the wayvzod does, without making them needed.

###### **names:** `Str` / `Num` (short), `String` / `Number` (clash with js globals), `Text` /.`Int` / `Decimal` (closer to what a person means)? and `Record`, which clashes with typescript's built-in `Record`.

Hier versteh schon wieder nicht, inwiefern das clashen soll? Was hat das `@rat/types` mit TypeScript am Hut? Und `Num`/`Str` wären doch prinipiell `Number`/`String`?

