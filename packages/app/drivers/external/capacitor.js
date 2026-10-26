// @rat/app :: drivers :: external, capacitor (android, ios): a web page in @capacitor/browser, anything
// else (mailto:, a file, another app's scheme) through @capacitor/app-launcher

import { plugin } from '../_capacitor.js';

const Browser     = () => plugin('Browser', '@capacitor/browser');
const AppLauncher = () => plugin('AppLauncher', '@capacitor/app-launcher');

export const open = async url => /^https?:/i.test(url)
  ? (await Browser()).open({ url })
  : (await AppLauncher()).openUrl({ url });
