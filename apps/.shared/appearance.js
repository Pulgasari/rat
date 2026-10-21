// apps/.shared/appearance.js
//
// the look of every app on this origin through @gestalt/core: palette, mode, geometry,
// density. stored once for all apps, set again as soon as this module loads
//
//   setAppearance('mode', 'dark');  appearance.mode  // 'dark'

import { gestalt } from '@gestalt/core';

import { read, write } from './storage.js';

const KEY = 'zugriff:appearance';

export const AXES = {
  density  : gestalt.densities,
  geometry : gestalt.geometries,
  mode     : gestalt.modes,
};

export const appearance = read(KEY, {});

// the preset names, read off palettes.css. empty when it cannot be loaded
export const palettes = () => gestalt.palettes().catch(() => []);

export function setAppearance (name, value) {
  appearance[name] = value || null;
  write(KEY, appearance);
  return gestalt.set({ [name]: value || null });
}

if (Object.keys(appearance).length) gestalt.set(appearance);
