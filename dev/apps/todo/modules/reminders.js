// todo :: modules/reminders.js
// telling about a task when it is due, or at its own `remind` time.
//
//   browser    a notification through the service worker while the app is open,
//              checked every minute. without a push server nothing wakes a closed
//              app, so what was missed is shown at the next start
//   capacitor  the local notifications plugin, scheduled whenever the tasks
//              change, reliable with the app closed
//
// a reminder is told once, the told ones are kept in localStorage.

import { effect } from '@rat/signals';

import { toast } from '../../.shared/toast.js';

import { dueStamp } from './dates.js';
import * as store   from './store.js';

const KEY    = 'zugriff:todo:told';
const native = () => globalThis.Capacitor?.isNativePlatform?.() ? globalThis.Capacitor.Plugins?.LocalNotifications ?? null : null;

// the moment a task wants to be told about, null for none
export const momentOf = task => {
  if (task.done || task.deleted) return null;
  if (task.remind) return new Date(task.remind).getTime();
  return task.due?.length > 10 ? dueStamp(task.due) : null;   // a due without a time tells nothing
};

function told () {
  try   { return new Set(JSON.parse(localStorage.getItem(KEY)) ?? []); }
  catch { return new Set; }
}

function remember (set) {
  try   { localStorage.setItem(KEY, JSON.stringify([...set].slice(-500))); }
  catch { /* a full storage tells twice at worst */ }
}

export const permission = () => native() ? 'native' : (globalThis.Notification?.permission ?? 'unsupported');

export async function ask () {
  if (native()) return (await native().requestPermissions()).display;
  if (!globalThis.Notification) return 'unsupported';
  return Notification.requestPermission();
}

async function show (task) {
  const options = { body: task.due ? task.due.replace('T', ' ') : '', tag: task.id, data: { url: location.href } };
  if (globalThis.Notification?.permission === 'granted') {
    const registration = await navigator.serviceWorker?.getRegistration?.();
    if (registration) return registration.showNotification(task.title, options);
    return new Notification(task.title, options);
  }
  toast({ duration: 8000, heading: 'Reminder', message: task.title });
}

// what is due by now and was not told yet
async function check () {
  const seen  = told();
  const now   = Date.now();
  let changed = false;
  for (const task of store.tasks.peek()) {
    const moment = momentOf(task);
    const key    = `${task.id}@${moment}`;
    if (moment == null || moment > now || seen.has(key)) continue;
    seen.add(key);
    changed = true;
    await show(task);
  }
  if (changed) remember(seen);
}

// the next 60 moments, the plugin keeps them across restarts
async function schedule () {
  const plugin  = native();
  const pending = await plugin.getPending();
  if (pending.notifications?.length) await plugin.cancel({ notifications: pending.notifications.map(({ id }) => ({ id })) });

  const now  = Date.now();
  const next = store.tasks.peek()
    .map(task => ({ task, moment: momentOf(task) }))
    .filter(({ moment }) => moment && moment > now)
    .sort((a, b) => a.moment - b.moment)
    .slice(0, 60);

  if (next.length) await plugin.schedule({
    notifications: next.map(({ task, moment }, index) => ({ body: task.due?.replace('T', ' ') ?? '', id: index + 1, schedule: { at: new Date(moment) }, title: task.title })),
  });
}

export function start () {
  if (native()) {
    let timer = null;
    effect(() => {
      store.tasks.value;
      clearTimeout(timer);
      timer = setTimeout(() => schedule().catch(() => {}), 1000);
    });
    return;
  }
  check();
  setInterval(check, 60_000);
}

export default { ask, momentOf, permission, start };
