// @rat/runtime :: imported

/*
an imported $name, as the compiler hands it over: `import { $x } from './a.rat.js'` becomes
`import { $x as $x$import } …` and `const $x = $$.imported(() => $x$import)`. the file reads and writes
$x.value as for its own signals, imported() decides what that means:

  a signal              its value, written as usual
  a reactive variant    the variant itself ($Record, $List …): read, changed through its methods,
                        never reassigned

the module is asked on the first read, not before: a cycle of imports finds it initialized by then.
*/

import { isSignal } from '@rat/signals';

function imported (get) {
  let resolved = false;
  let target;

  const source = () => {
    if (!resolved) { target = get(); resolved = true; }
    return target;
  };

  return {
    get value () {
      const found = source();
      return isSignal(found) ? found.value : found;
    },
    set value (next) {
      const found = source();
      if (!isSignal(found)) throw new TypeError('[rat] an imported reactive variant changes through its methods, it is not reassigned');
      found.value = next;
    },
  };
}

// :::::: EXPORT

export { imported };
