# commands

## usage

```js
const { commands } = RAT.app;
```

```js
import { Commands } from '@rat/app/modules/commands.js';
const commands = new Commands;
```

## define

### define a single command

```js
RAT.app.commands.set({ name: 'refresh-all', exec: refreshAll });
```

```js
RAT.app.commands.set('refresh-all', refreshAll);
```

```js
RAT.app.commands['refresh-all'] = refreshAll;
```

### define multiple commands at once

```js
RAT.app.commands.assign ([
  { name: 'refresh-all', exec: refreshAll },
];
```

```js
RAT.app.commands.assign ({
  'refresh-all'   : refreshAll,
});
```
