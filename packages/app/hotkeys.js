// @rat/app :: hotkeys
// RAT.app.hotkeys: shortcuts (@rat/hotkeys). a string is a command as in markup (go[x],
// rat:toggle[x], a name of app.commands), it goes to the app: the focused element can be
// outside of it (the body). assign, set and [combo] = add more later

import { command }       from '@rat/commands';
import { createHotkeys } from '@rat/hotkeys';

const hotkeys = (map, { app }) => createHotkeys({ 
  commands: { 
    run: (text, event) => command(app, text, event) 
  }
}).assign(map);

// :::::: EXPORT

export default hotkeys;
