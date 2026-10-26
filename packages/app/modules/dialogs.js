// @rat/app :: dialogs

/*
RAT.app.dialogs: alert, confirm, prompt as promises. the system's dialogs on android and ios, a
<dialog class="rat-dialog"> in the browser and on the desktop (drivers/dialogs/).

  dialogs: true                                       in config.rat.js, or { driver: 'web' }

  await RAT.app.dialogs.alert('saved');
  await RAT.app.dialogs.confirm({ message: 'delete it?', ok: 'Delete', title: 'notes' })   // true | false
  await RAT.app.dialogs.prompt({ message: 'name', value: 'untitled' })                    // the text | null

a string is the message. options: message, title, ok, cancel, value (prompt)

contract of a driver: alert (options), confirm (options) -> bool, prompt (options) -> string | null
*/

import { driverOf } from '../drivers.js';

const optionsOf = options => typeof options === 'string' ? { message: options } : { ...options };

async function dialogs ({ driver: named } = {}) {
  const driver = await driverOf('dialogs', named);
  return {
    alert   : options => driver.alert(optionsOf(options)),
    confirm : options => driver.confirm(optionsOf(options)),
    prompt  : options => driver.prompt(optionsOf(options)),
  };
}

// :::::: EXPORT

export default dialogs;
