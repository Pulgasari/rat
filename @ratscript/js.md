# what i don't like about js

## import & export syntax

```javascript
// :::::: IMPORT
import aufbau          from '@aufbau/api';
import * as db         from '@bunker/db';
import { signalStore } from '@aufbau/signals';
import { doSth as x }  from './modules/actions.js';
```

```javascript
// :::::: EXPORT
export { a, b, c };
export default sth;

// you can do this:
export const sth = 'bla';

// but not this
export default const sth = 'bla';
```
