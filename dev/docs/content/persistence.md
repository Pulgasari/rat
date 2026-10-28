# persistence

one could achieve persistence like in any other JS-project or use the stuff RAT provides.

### via schema

```js
// mature: am Schema
let   $theme    = Enum.from(gestalt.themes).stored({ key: 'custom-key', in: 'session' });
const $settings = $Record(Settings).stored('settings').create();
```

### via compiler magic

inside `.rat` and `.rat.js` files:

```js
// compiler magic
$theme!    = Enum('zombie', 'oled', 'rainbow');
$settings! = $Record(Settings).create();
```

### the core

```js
import { stored } from '@rat/types';

let   $theme = stored('theme', Enum('zombie', 'oled', 'rainbow'));
const $tabs  = stored('tabs', $List(Tab).create());
```
