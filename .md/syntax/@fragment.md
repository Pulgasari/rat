# @fragment :: rat :: markup fragments

status: **built** as `@fragment`

**problem.** a small repeated piece of markup is not worth its own `.rat` file, but
copying it three times is worse.

**solution:**

```html
@fragment row (item)
  <tr><td>{item.name}</td><td>{item.price}</td></tr>

<table>
  @for (fruit of $fruits): {row(fruit)}
</table>
```

a fragment is a plain function that returns markup, so it can also be passed to a
child component as a prop.

**cost.** small. it compiles to a function inside the component.
