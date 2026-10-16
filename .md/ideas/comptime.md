# rat :: comptime

status: **idea**.

see also: [no build](no-build.md)

## idea: code that runs in the compiler (from zig)

```zig
const table = comptime blk: {
  var values: [256]u8 = undefined;
  for (&values, 0..) |*value, index| value.* = @intCast(index * 2);
  break :blk values;
};
```

the table is computed while compiling and lands in the program as finished data.

**problem.** a page often renders data that never changes at runtime: a list of icons,
a navigation from a json file, a changelog from markdown. today that is fetched and
rendered in the browser, every time.

**in rat.** a script block that runs in the compiler, its results are baked in:

```html
<script comptime>
  const icons = await readJson('./icons.json');
</script>

<ul>
  @for (icon of icons): <li>{icon.name}</li>
</ul>
```

the compiled module contains the finished list, no fetch, no json, no loop at runtime.

**cost.** large: the compiler has to execute code (in node: easy, in the browser: a
worker), and it fits the build adapters and the `dom:clone` target. but it is the
strongest form of "compiler over runtime magic".
