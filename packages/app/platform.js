// @rat/app :: platform

/*
where rat runs, found once: what the shell puts into the page, or the target of a build
(rat build --target, @rat/dev sets __RAT_TARGET__).

  'android', 'ios'   Capacitor (Capacitor.isNativePlatform())
  'desktop'          Deno Desktop (its bindings in the page)
  'web'              anything else: a browser
*/

const TARGET = typeof __RAT_TARGET__ === 'string' ? __RAT_TARGET__ : null;

const capacitor = () => globalThis.Capacitor?.isNativePlatform?.() ? globalThis.Capacitor.getPlatform() : null;
const deno      = () => globalThis.bindings && typeof globalThis.bindings === 'object' ? 'desktop' : null;

const platform = capacitor() ?? deno() ?? 'web';
const native   = platform !== 'web';

// the shell of a platform: the drivers it takes
const SHELLS = { android: 'capacitor', desktop: 'deno', ios: 'capacitor', web: 'web' };

const shell = SHELLS[platform];

// :::::: EXPORT

export { SHELLS, TARGET, native, platform, shell };
