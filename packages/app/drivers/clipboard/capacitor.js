// @rat/app :: drivers :: clipboard, capacitor (android, ios).
// the plugin @capacitor/clipboard of the app's capacitor project,
// through the bridge: no js of it in the build

import { plugin } from '../_capacitor.js';

const Clipboard = () => plugin('Clipboard', '@capacitor/clipboard');

export const
can   = { read: true, write: true },
read  = async ()     => (await (await Clipboard()).read()).value ?? '',
write = async (text) => (await Clipboard()).write({ string: text });
