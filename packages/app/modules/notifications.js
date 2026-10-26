// @rat/app :: notifications

/*
RAT.app.notifications: a notification of the system, from the Notification api in the browser, local
notifications on android and ios, the system's on the desktop (drivers/notifications/).

  notifications: true                     in config.rat.js, or { driver: 'web' }

  await RAT.app.notifications.show({ title: 'scan done', body: '12 new files' });
  await RAT.app.notifications.permission()     // 'granted' | 'prompt' | 'denied', never asks
  await RAT.app.notifications.request()        // asks, inside a click in the browser

show asks first when the permission is open, and rejects when it is denied.

contract of a driver: can, permission () -> state, request () -> state, show ({ title, body, tag })
*/

import { driverOf } from '../drivers.js';

async function notifications ({ driver: named } = {}) {
  const driver = await driverOf('notifications', named);
  return {
    can        : driver.can,
    permission : () => driver.permission(),
    request    : () => driver.request(),

    async show (options) {
      const { body = '', tag, title } = typeof options === 'string' ? { title: options } : options;
      let state = await driver.permission();
      if (state === 'prompt') state = await driver.request();
      if (state !== 'granted') throw new Error('[rat] notifications: not allowed');
      return driver.show({ body: String(body), tag, title: String(title) });
    },
  };
}

// :::::: EXPORT

export default notifications;
