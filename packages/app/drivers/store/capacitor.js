// @rat/app :: drivers :: store, capacitor (android, ios): @capacitor/preferences, every key under `name:`

import { plugin } from '../_capacitor.js';

const Preferences = () => plugin('Preferences', '@capacitor/preferences');

const preferences = ({ name = 'bunker' } = {}) => {
  const prefix = `${name}:`;
  const own    = async () => (await (await Preferences()).keys()).keys.filter(key => key.startsWith(prefix));

  return {
    holds  : 'string',
    sync   : false,
    clear  : async ()           => { const api = await Preferences(); for (const key of await own()) await api.remove({ key }); },
    delete : async key          => (await Preferences()).remove({ key: prefix + key }),
    get    : async key          => (await (await Preferences()).get({ key: prefix + key })).value ?? undefined,
    keys   : async ()           => (await own()).map(key => key.slice(prefix.length)),
    set    : async (key, value) => (await Preferences()).set({ key: prefix + key, value }),
  };
};

export default preferences;
