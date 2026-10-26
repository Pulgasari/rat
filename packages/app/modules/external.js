// @rat/app :: external

/*
RAT.app.external: a url outside the app, in what the platform opens it with: a new tab in the browser,
an in-app browser or the app of its scheme on android and ios, the default app on the desktop.

  external: true                          in config.rat.js, or { driver: 'web' }

  await RAT.app.external.open('https://example.com');
  await RAT.app.external.open('mailto:someone@example.com');

contract of a driver: open (url) -> promise
*/

import { driverOf } from '../drivers.js';

async function external ({ driver: named } = {}) {
  const driver = await driverOf('external', named);
  return {
    open : url => driver.open(String(url)),
  };
}

// :::::: EXPORT

export default external;
