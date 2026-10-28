// apps/.shared/appearance.js
//
// the look of an app through @gestalt/core: palette, mode, geometry, density. kept per
// app (RAT.app.store), set again as soon as this module loads
//
//   setAppearance('mode', 'dark');  appearance().mode  // 'dark'

import { gestalt } from '@gestalt/core';
import { stored }  from '@rat/types';

// a signal, this is plain js: .value
const look = stored('appearance', {});

export const AXES = {
  density  : gestalt.densities,
  geometry : gestalt.geometries,
  mode     : gestalt.modes,
};

export const appearance = () => look.value;

// the preset names, read off palettes.css. empty when it cannot be loaded
export const palettes = () => gestalt.palettes().catch(() => []);

export function setAppearance (name, value) {
  look.value = { ...look.value, [name]: value || null };
  return gestalt.set({ [name]: value || null });
}

if (Object.keys(look.value).length) gestalt.set(look.value);
