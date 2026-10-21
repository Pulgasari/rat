// apps/.shared/install.js
//
// installing the app as a pwa. chromium offers it through beforeinstallprompt: the event is
// kept, the browser's own banner stays away, install() shows its dialog later. safari on ios
// has no prompt: there the way is share, then add to home screen (ios is true)
//
//   if (available.value) await install();
//   hint('Notes');   // a toast the first time it is possible

import { signal } from '@rat/signals';

import { read, write } from './storage.js';
import { toast }       from './toast.js';

let offer = null;

export const available  = signal(false);
export const standalone = globalThis.matchMedia?.('(display-mode: standalone)').matches || globalThis.navigator?.standalone === true;
export const ios        = /iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent ?? '') && !standalone;

addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  offer           = event;
  available.value = true;
});

addEventListener('appinstalled', () => {
  offer           = null;
  available.value = false;
});

// true once the user accepted
export async function install () {
  if (!offer) return false;
  const current = offer;
  offer           = null;
  available.value = false;
  current.prompt();
  return (await current.userChoice).outcome === 'accepted';
}

// a toast, once per app, the first time installing is possible
export function hint (name) {
  const key  = `${name}:install-hint`;
  const show = () => {
    if (read(key)) return;
    write(key, true);
    toast(`${name} can be installed: see the settings`);
  };
  if (available.value) show();
  else addEventListener('beforeinstallprompt', show, { once: true });
}
