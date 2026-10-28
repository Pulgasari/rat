// code :: modules/editor.rat.js

/*
the monaco side: its options, kept across visits, the themes and the live editor. the options are a
$Record of a schema, so the settings render from it (a Bool a toggle, an Enum a picker) and a value
that no longer fits falls back on its own. a few are rat's shape of monaco's: lineNumbers a Bool,
minimap a Bool (monaco wants { enabled }), optionsOf() turns them into monaco's.

  $options            the options, theme included
  $instance           the editor once it is made, else null
  optionsOf(options)  the construction options monaco takes
  applyTheme(name)    a native theme, or one of monaco-themes fetched and defined once
  toggle(key)         a Bool flips, wordWrap goes on and off
*/

// :::::: IMPORT

import { $Record, Bool, Enum, Num, Str } from '@rat/types';

import { loadMonaco } from './monaco.js';

export { loadMonaco };

// :::::: THEMES

const NATIVE = ['vs', 'vs-dark', 'hc-black', 'hc-light'];

// id -> the file name of monaco-themes (github.com/brijeshb42/monaco-themes)
const THEMES = {
  'active4d'                : 'Active4D',
  'all-hallows-eve'         : 'All Hallows Eve',
  'amy'                     : 'Amy',
  'birds-of-paradise'       : 'Birds of Paradise',
  'blackboard'              : 'Blackboard',
  'brilliance-black'        : 'Brilliance Black',
  'brilliance-dull'         : 'Brilliance Dull',
  'chrome-devtools'         : 'Chrome DevTools',
  'clouds'                  : 'Clouds',
  'clouds-midnight'         : 'Clouds Midnight',
  'cobalt'                  : 'Cobalt',
  'cobalt2'                 : 'Cobalt2',
  'dawn'                    : 'Dawn',
  'dracula'                 : 'Dracula',
  'dreamweaver'             : 'Dreamweaver',
  'eiffel'                  : 'Eiffel',
  'espresso-libre'          : 'Espresso Libre',
  'github'                  : 'GitHub',
  'github-dark'             : 'GitHub Dark',
  'github-light'            : 'GitHub Light',
  'idle'                    : 'IDLE',
  'idlefingers'             : 'idleFingers',
  'iplastic'                : 'iPlastic',
  'katzenmilch'             : 'Katzenmilch',
  'krtheme'                 : 'krTheme',
  'kuroir-theme'            : 'Kuroir Theme',
  'lazy'                    : 'LAZY',
  'magicwb--amiga-'         : 'MagicWB (Amiga)',
  'merbivore'               : 'Merbivore',
  'merbivore-soft'          : 'Merbivore Soft',
  'monoindustrial'          : 'monoindustrial',
  'monokai'                 : 'Monokai',
  'monokai-bright'          : 'Monokai Bright',
  'night-owl'               : 'Night Owl',
  'nord'                    : 'Nord',
  'oceanic-next'            : 'Oceanic Next',
  'pastels-on-dark'         : 'Pastels on Dark',
  'slush-and-poppies'       : 'Slush and Poppies',
  'solarized-dark'          : 'Solarized-dark',
  'solarized-light'         : 'Solarized-light',
  'spacecadet'              : 'SpaceCadet',
  'sunburst'                : 'Sunburst',
  'textmate--mac-classic-'  : 'Textmate (Mac Classic)',
  'tomorrow'                : 'Tomorrow',
  'tomorrow-night'          : 'Tomorrow-Night',
  'tomorrow-night-blue'     : 'Tomorrow-Night-Blue',
  'tomorrow-night-bright'   : 'Tomorrow-Night-Bright',
  'tomorrow-night-eighties' : 'Tomorrow-Night-Eighties',
  'twilight'                : 'Twilight',
  'upstream-sunburst'       : 'Upstream Sunburst',
  'vibrant-ink'             : 'Vibrant Ink',
  'xcode-default'           : 'Xcode_default',
  'zenburnesque'            : 'Zenburnesque',
};

export const THEME_NAMES = [...NATIVE, ...Object.keys(THEMES)];

// :::::: OPTIONS, kept across visits

const Options = {
  autoIndent           : Enum('none', 'keep', 'brackets', 'advanced', 'full'),
  contextmenu          : Bool,
  cursorBlinking       : Enum('blink', 'smooth', 'phase', 'expand', 'solid'),
  cursorStyle          : Enum('line', 'block', 'underline', 'line-thin', 'block-outline', 'underline-thin'),
  folding              : Bool.default(true),
  fontLigatures        : Bool.default(true),
  fontSize             : Enum(8, 9, 10, 11, 12, 13, 14, 16, 18).default(13),
  insertSpaces         : Bool.default(true),
  lineNumbers          : Bool.default(true),
  minimap              : Bool,
  readOnly             : Bool,
  scrollBeyondLastLine : Bool,
  showUnused           : Bool.default(true),
  tabSize              : Enum(2, 4, 8),
  theme                : Enum(...THEME_NAMES).default('dracula'),
  wordBasedSuggestions : Bool,
  wordWrap             : Enum('off', 'on', 'wordWrapColumn', 'bounded'),
  wrappingStrategy     : Enum('simple', 'advanced'),
};

// what monaco always gets, beside the options
const FIXED = {
  automaticLayout     : true,
  cursorWidth         : 2,
  disableLayerHinting : true,
  dragAndDrop         : true,
  letterSpacing       : 0,
  lineNumbersMinChars : 3,
  links               : true,
  renderLineHighlight : 'none',
};

export const $options! = $Record(Options).create();

export let $instance = null;

export const optionsOf = ({ lineNumbers, minimap, theme, ...options }) => ({
  ...FIXED,
  ...options,
  lineNumbers : lineNumbers ? 'on' : 'off',
  minimap     : { enabled: minimap, renderCharacters: false, side: 'right' },
});

export function toggle (key) {
  if (key === 'wordWrap') $options.wordWrap = $options.wordWrap === 'off' ? 'on' : 'off';
  else $options[key] = !$options[key];
}

export function setInstance (editor) { $instance = editor; }

// :::::: THEME

const defined = new Set;

// one that does not load (offline, the first time) leaves the editor dark
export async function applyTheme (name) {
  const { monaco } = globalThis;
  if (!monaco) return;
  if (!NATIVE.includes(name) && !defined.has(name)) {
    try {
      const response = await fetch(`https://unpkg.com/monaco-themes/themes/${encodeURIComponent(THEMES[name])}.json`);
      monaco.editor.defineTheme(name, await response.json());
      defined.add(name);
    }
    catch (error) {
      console.warn(`[code] theme ${name} unavailable`, error);
      return monaco.editor.setTheme('vs-dark');
    }
  }
  monaco.editor.setTheme(name);
}
