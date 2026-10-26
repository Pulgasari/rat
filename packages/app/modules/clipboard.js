// @rat/app :: clipboard

/*
RAT.app.clipboard: the same in the browser, on android and ios, on the desktop (drivers/clipboard/).

  clipboard: true                        in config.rat.js, or { driver: 'web' }

  await RAT.app.clipboard.write('copied');
  const text = await RAT.app.clipboard.read();
  RAT.app.clipboard.can.read              // a browser often does not let the page read it

contract of a driver: read () -> promise of the text, write (text) -> promise, can: { read, write }
*/

import { driverOf } from '../drivers.js';

const unable = what => Promise.reject(new Error(`[rat] clipboard: this platform does not let the app ${what} it`));

async function clipboard ({ driver: named } = {}) {
  const driver = await driverOf('clipboard', named);
  return {
    can   : { ...driver.can },
    read  : () => driver.can.read ? driver.read() : unable('read'),
    write : text => driver.can.write ? driver.write(String(text)) : unable('write'),
  };
}

// :::::: EXPORT

export default clipboard;
