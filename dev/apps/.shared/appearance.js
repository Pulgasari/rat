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

// the attributes of rat-app follow: palettes.css reads [palette] below the body (body [palette]),
// an attribute left there would keep its palette over the one of the root
function apply (values) {
  const app = document.querySelector('rat-app');
  for (const [name, value] of Object.entries(values)) value ? app?.setAttribute(name, value) : app?.removeAttribute(name);
  return gestalt.set(values);
}

export function setAppearance (name, value) {
  look.value = { ...look.value, [name]: value || null };
  return apply({ [name]: value || null });
}

if (Object.keys(look.value).length) apply(look.value);
