# codec

a draft, nothing of it is built. what `@rat/types` would need to take a value out of the page and back
in without losing it: a date into storage and back, a set into json and back. related: [schema.md](schema.md),
[persistence.md](persistence.md), [causa_types.md](causa_types.md).

- [1. the words](#1-the-words)
- [2. the verbs](#2-the-verbs)
- [3. a case of writing is no codec](#3-a-case-of-writing-is-no-codec)
- [4. Codec](#4-codec)
- [5. encode on every schema](#5-encode-on-every-schema)
- [6. what changes elsewhere](#6-what-changes-elsewhere)
- [7. open questions](#7-open-questions)

---

## 1. the words

five words, each answers another question:

| word | question | direction | in rat today |
|---|---|---|---|
| **data type** | what kind of value is it? | – | `List`, `Dict`, `Color`, `Segments`: classes that hold data |
| **schema** | is this value allowed? | checks | `Str`, `Num.range(…)`, `Enum(…)`, `Record({…})` |
| **coercion** | can it be read as an allowed value though it does not quite fit? | in, tolerant | `'120'` → `120`, `'yes'` → `true` |
| **transform** | make it the right form | in, may lose information | `KebabCase.from('togglePlay')` → `'toggle-play'` |
| **codec** | how does the same value look inside and outside? | in **and** out, loses nothing | not named; `toJSON` on data types does half of it |

the line between transform and codec: **if the old value must come back exactly, it is a codec, else a
transform.**

a codec has two forms of the same information:

| inside (what the code works with) | outside (what is stored, sent, put in a url) |
|---|---|
| `Date` | `'2026-10-29T12:00:00.000Z'` |
| `Set` | `['a', 'b']` |
| `Color` | `'#3b82f6'` |
| `Segments` | `'a:b:c'` |

## 2. the verbs

what each verb does and how it relates to the others. **identical** means the same function under another
name, **close** means much the same with a difference that is named.

| verb | on | gives | relation |
|---|---|---|---|
| `validate (x)` | schema | `{ value }` or `{ issues }`, never throws | today's name, kept: standard schema calls it (`~standard.validate`) |
| `decode (x)` | schema | `{ value }` or `{ issues }`, never throws | **identical** to `validate`. the name that pairs with `encode` |
| `parse (x)` | schema | the value, throws on issues | `decode` + throw. unchanged |
| `is (x)` | schema | `true` / `false` | `decode` without the value. unchanged |
| `encode (x)` | schema | the outside form | **new**. the way back of `decode` |
| `from (x)` | schema with a transform (a case) | the value in this form, no check | **close** to `decode`: one way, may lose information, never fails |
| `to (schema)` | schema | a schema: this check, then `from` of the other | a transform chained in, one way. no codec |
| `create (x)` | schema of a data type | a value of the data type (a `List`, a `$Dict`) | **close** to `decode`: checks too, but gives a new instance, also from nothing (`create()`) |
| `Type.from (x)` | data type (class) | an instance, no schema involved | **close** to `create`: no check |
| `toJSON ()` | value of a data type | its json form | **close** to `encode`: on the value, not on the schema, and only for data types |

so for a plain schema (`Str`, `Num`, `Enum`): `decode` is `validate`, `encode` gives the value back as
it is. the pair only does something of its own for codecs and for structures that hold codecs.

## 3. a case of writing is no codec

`CamelCase`, `KebabCase` and the other cases of `Str.js` are schemas with a transform: as a schema they
check ("is it camelCase already?"), `from()` makes any string into the case. there is one form only, a
string written that way. and as a pair they lose information:

```js
KebabCase.from('XMLHttp')   // 'xml-http'
CamelCase.from('xml-http')  // 'xmlHttp', not 'XMLHttp'
```

that is a transform. it stays as it is.

## 4. Codec

a schema with an outside form of its own. it is a schema, so it goes wherever one goes: a field of a
`Record`, the item of a `List`, `let $x!`, `@match`.

```js
// Codec(outside, inside, { decode, encode }). Instant: a schema of a Date, not there yet
const IsoDate = Codec(Str.pattern(ISO_DATE), Instant, {
  decode : text => new Date(text),
  encode : date => date.toISOString(),
});

IsoDate.decode('2026-10-29T12:00:00Z')   // { value: Date }
IsoDate.decode('gestern')                // { issues: [{ message: 'matching …', path: [] }] }
IsoDate.parse('2026-10-29T12:00:00Z')    // Date, or it throws
IsoDate.encode(new Date)                 // '2026-10-29T…Z'
IsoDate.is(new Date)                     // false: is() asks for the outside form, see 7
```

### decode, step by step

1. the outside schema checks (and coerces) the input. issues end here
2. `decode` of the codec makes the inside value. a throw becomes an issue (`could not decode: …`)
3. the inside schema checks the result. an issue here is a bug of the codec, the message says so

### encode, step by step

1. `encode` of the codec makes the outside form
2. in development, the outside schema checks it: an encode that writes what decode can not read is found
   at once, not when the value is read back

### the law

for every inside value `x` the codec accepts:

```js
codec.parse(codec.encode(x))  // equal to x
```

a codec that can not keep it is a transform and is written as one (`to`, `from`). the law is what a test
of a codec checks, and the only one it needs.

### describe

a codec describes both sides, a form or a json schema takes the outside one (that is what a user types
or a file holds):

```js
IsoDate.describe   // { kind: 'codec', outside: { kind: 'str', pattern: … }, inside: { kind: 'instant' } }
```

## 5. encode on every schema

so that a structure can encode what it holds, every schema gets `encode`:

| schema | `encode` |
|---|---|
| scalar (`Str`, `Num`, `Bool`), `Enum`, a case | the value as it is |
| data type (`List`, `Dict`, `Color`, `Segments`, …) | `toJSON()` of the value, as `stored` does today |
| `Record` | field by field, each through the schema of its field |
| `List`, `Set`, `Dict`, `Table`, `Tuple` | item by item (value by value), each through its schema |
| `Union` | through the case the value fits (`is` on the inside), see 7 |
| `Codec` | its own `encode` |

`decode` needs no such table: it is `validate`, and `validate` of a structure already goes through the
schemas of its parts.

the data types could then be written as codecs themselves, their pair is there already:

| data type | outside | `decode` | `encode` |
|---|---|---|---|
| `Segments` | `Str` | `Segments.from(text)` | `toString()` |
| `Color` | `Str` | `Color.from(text)` | `.hex` |
| `List` | an array | `List.from(array)` | `toJSON()` |

## 6. what changes elsewhere

- **`stored`**: writes `schema.encode(value)` instead of what `toJSON` gives, reads through `decode`
  (it does through `validate` today, the same). `version` and `migrate` stay: they are about an old shape,
  a codec is about the form of the same shape.
- **webdav, export, url params**: the same pair at every border. checked on the way in, encoded on the way
  out, trusted in between.
- **`~standard`**: unchanged. standard schema only knows validate, which is decode.
- **`index.d.ts`**: `Codec<Outside, Inside>`, `Infer` gives the inside type, a second `Encoded<S>` the
  outside one.

## 7. open questions

- **`is` on a codec**: the outside form (it is `decode` without the value) or the inside one? the outside
  keeps `is` = `decode` true everywhere; a second `has(x)` could ask the inside.
- **`Union` and encode**: a value fitting two cases (an `IsoDate` and an `Str` case both take a string
  inside) is ambiguous. first case that fits, or cases with a tag only?
- **async**: a codec that reads a file or decrypts. not in this draft: `decode` stays synchronous, an
  async border is the job of whoever calls it.
- **the names `outside` / `inside`**: zod says `input` / `output`, purify `encode` / `decode` only.
  outside and inside say where the value is, not which way it goes.
- **`to()` next to `Codec`**: both turn one schema into another. `to` is one way and may lose, `Codec`
  is two ways and may not. the names should keep that apart.
- **json schema**: `toJSONSchema()` from the outside `describe` would be little code (for an mcp
  `inputSchema`, a form). its own draft, once this one stands.
- **elsewhere**: zod 4.1 has the same (`z.codec(outside, inside, { decode, encode })`, `.decode()`,
  `.encode()`, `parse` kept), purify-ts has `Codec` with `decode` / `encode` and a json schema per codec.
