// @rat/app :: _shared.js

export { isArray, isFn, isString } from '@pulgasari/is';

// a database or store is named after the app: name in its options, else the config's id or name
export const nameOf   = (options, config) => options.name ?? config.id ?? config.name ?? 'rat';
export const driverOf = driver => driver?.replace?.(/-/g, '') ?? driver;   // 'indexed-db' is 'indexeddb'
