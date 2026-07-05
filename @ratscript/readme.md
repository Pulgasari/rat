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
