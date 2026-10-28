// code :: state.rat.js

/*
the app's own settings, kept across visits, and which panel is out. the editor's options live in
modules/editor.rat.js, the open files in modules/documents.rat.js.

  $config   showBrowser … the chrome, fontSize of the chrome, fileSizeFormat of the statusbar,
            commitPrompt asks for a message on a github save, disableAndroidKeyboard keeps the
            system's keyboard away while the app's is there
  $panel    what the areas show: 'files' (the sources), 'settings', 'commands', or null
*/

import { effect } from '@rat/signals';
import { $Record, Bool, Enum } from '@rat/types';

import { disableAndroidKeyboard, enableAndroidKeyboard } from './modules/keyboard.js';

const Config = {
  commitPrompt           : Bool,
  disableAndroidKeyboard : Bool.default(true),
  fileSizeFormat         : Enum('formatted', 'bytes', 'chars'),
  fontSize               : Enum(10, 11, 12, 13, 14, 16).default(12),
  showBrowser            : Bool,
  showKeyboard           : Bool.default(true),
  showStatusbar          : Bool.default(true),
  showToolbar            : Bool.default(true),
};

export const $config! = $Record(Config).create();

// :::::: PANELS, one area each, one open at a time

const AREA = { commands: 'commands', files: 'files', settings: 'config' };

export let $panel = null;

// open, or closed when it is the one open
export function toggle (panel) {
  $panel = $panel === panel ? null : panel;
}

export const close = () => { $panel = null; };

// the areas follow $panel, an area closed by hand clears it
effect(() => {
  for (const [panel, area] of Object.entries(AREA)) RAT.app.toggle(area, $panel === panel);
});

export function closed (area) {
  if (AREA[$panel] === area) $panel = null;
}

// :::::: THE PAGE

effect(() => document.documentElement.style.setProperty('--font-size', `${$config.fontSize}px`));

effect(() => ($config.disableAndroidKeyboard || $config.showKeyboard) ? disableAndroidKeyboard() : enableAndroidKeyboard());
