# RatScript

## Syntax

### Import Statements

```javascript
import from 'domina'          use * as dom;
import from 'preact'          use { render };
import from '@preact/signals' use { effect, signal };
```

### Guards

Instead of writing sth. like this ...

```javascript
function example () {
  let items = getItems();
  if (!items) return;
}
```

... write this:

```javascript
function example () {
  let items = getItems() or return;
}
```

### Multiline Comments

Instead of writing sth. like this ...

```javascript
let html = `<div>
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

... write this

````javascript
let html = ```
            <div>
              <div>...</div>
              <div>...</div>
              <div>...</div>
            </div>
            ```;
````

### Pipe Operator

Instead of writing sth. like this ...

```javascript
let bla = muh(meene(eene('Some Example')));
```

... write this:

```javascript
//
let bla = 'Some Example' |> eene() |> meene() |> muh();

// implicit notation
let bla = 'Some Example' |> eene |> meene |> muh;

// explicit notation
let bla = 'Some Example' |> eene(#) |> meene(#) |> muh(#);
```
