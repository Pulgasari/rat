// @rat/app :: drivers :: clipboard, capacitor (android, ios): @capacitor/clipboard

import { plugin } from '../_capacitor.js';

const Clipboard = () => plugin('Clipboard', '@capacitor/clipboard');

export const can   = { read: true, write: true };
export const read  = async () => (await (await Clipboard()).read()).value ?? '';
export const write = async text => (await Clipboard()).write({ string: text });
