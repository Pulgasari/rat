# rat :: types

status: schema as initial value **built** (d-14), `@rat/types` v0. reactive variants, persist and static reading are next.

see also: [causa_types.md](../causa_types.md), [syntax.md: typed signals](../syntax.md#typed-signals), [mutation](mutation.md), [value wrappers](value-wrappers.md)

<a id="d-14"></a>
## d-14 · type notation in scripts → **a schema as the initial value**

built: `let $view = Enum('grid', 'list')`. `signal()` takes anything with a standard schema
interface (`~standard`): it starts at the schema's initial value and checks every write
(rejected: dropped with a warning, coerced: stored coerced). the schemas are `@rat/types`
v0 (`Bool`, `Num`, `Str`, `Enum`, `List`, `Record`); zod and valibot schemas work as well.
