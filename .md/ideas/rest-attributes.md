# rat :: rest attributes

status: **built** (`{...rest}` on an element merges, `class` and `style` add up).

see also: [props](props.md)

## idea (from laravel blade)

**origin.** a blade component declares its props; everything else the caller writes on
the tag lands in `$attributes` and can be merged onto an element:

```blade
{{-- button.blade.php --}}
@props(['variant' => 'primary'])
<button {{ $attributes->merge(['class' => 'btn btn-' . $variant]) }}>{{ $slot }}</button>

{{-- usage --}}
<x-button variant="danger" class="wide" id="delete">delete</x-button>
{{-- <button class="btn btn-danger wide" id="delete">delete</button> --}}
```

**problem.** a component like `<Button>` cannot know every attribute a caller might
want (`id`, `title`, `aria-*`, `data-*`, more classes). without rest attributes, each
one needs its own prop.

**in rat.**

```html
<!-- button.rat -->
<script>
  let { variant = 'primary', ...rest } = props;
</script>

<button.btn class="btn-{variant}" {...rest}><slot /></button>

<!-- usage -->
<Button variant="danger" class="wide" id="delete">delete</Button>
```

htx already merges `class` and `style` instead of overwriting them, so `class="wide"`
from the caller adds to `btn btn-danger`.

**cost.** small. it depends on how props are declared ([d-13](props.md#d-13)).

## notes

das kann HTX doch bereits, dafür brauchte es keine ugly variante von laravel als inspiration. aber ja, das in `rat` auch gehen.

**reply:** right, htx's merge was the model. built in rat now: a `{...rest}` on an
element merges, `class` and `style` add up, everything else follows source order.
