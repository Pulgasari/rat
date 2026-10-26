// @rat/app :: drivers :: notifications, capacitor (android, ios): @capacitor/local-notifications

import { plugin } from '../_capacitor.js';

const LocalNotifications = () => plugin('LocalNotifications', '@capacitor/local-notifications');

const stateOf = ({ display }) => display.startsWith('prompt') ? 'prompt' : display;

let next = Date.now() % 2 ** 31;

export const can        = true;
export const permission = async () => stateOf(await (await LocalNotifications()).checkPermissions());
export const request    = async () => stateOf(await (await LocalNotifications()).requestPermissions());

export async function show ({ body, title }) {
  next = (next + 1) % 2 ** 31;
  await (await LocalNotifications()).schedule({ notifications: [{ body, id: next, title }] });
}
