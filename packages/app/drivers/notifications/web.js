// @rat/app :: drivers :: notifications, web: the Notification api, through the service worker where there
// is one (android's chrome shows them only that way)

const api = globalThis.Notification;

const stateOf = permission => permission === 'default' ? 'prompt' : permission;

export const can        = !!api;
export const permission = async () => api ? stateOf(api.permission) : 'denied';
export const request    = async () => api ? stateOf(await api.requestPermission()) : 'denied';

export async function show ({ body, tag, title }) {
  const registration = await globalThis.navigator?.serviceWorker?.getRegistration?.();
  if (registration) return registration.showNotification(title, { body, tag });
  new api(title, { body, tag });
}
