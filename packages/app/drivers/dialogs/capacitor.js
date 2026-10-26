// @rat/app :: drivers :: dialogs, capacitor (android, ios): @capacitor/dialog, the system's dialogs

import { plugin } from '../_capacitor.js';

const Dialog = () => plugin('Dialog', '@capacitor/dialog');

export const alert = async ({ message = '', ok, title }) => {
  await (await Dialog()).alert({ buttonTitle: ok, message, title });
};

export const confirm = async ({ cancel, message = '', ok, title }) =>
  (await (await Dialog()).confirm({ cancelButtonTitle: cancel, message, okButtonTitle: ok, title })).value;

export const prompt = async ({ cancel, message = '', ok, title, value = '' }) => {
  const result = await (await Dialog()).prompt({ cancelButtonTitle: cancel, inputText: value, message, okButtonTitle: ok, title });
  return result.cancelled ? null : result.value;
};
