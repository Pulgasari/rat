// @rat/import :: styles

/*
css, less, sass and scss, each ending in the same three modes:

  stylesheet     a constructed CSSStyleSheet, for adoptedStyleSheets (the default)
  styleElement   a <style> element
  raw            the file as fetched, uncompiled

{ compiler: (source, path) => css } replaces less and sass, or runs over plain css.
*/

import { createElement, fetchText, toOptions } from './core.js';
import { resolveMode }                         from './modes.js';
import { vendor }                              from './vendors.js';

function styleOf (css, mode) {
  if (mode === 'styleElement') return createElement('style', { textContent: css });
  const sheet = new CSSStyleSheet;
  sheet.replaceSync(css);
  return sheet;
}

async function compile (path, options, format, render) {
  options = toOptions(options);
  const mode   = resolveMode(format, options);
  const source = await fetchText(path, options);
  if (mode === 'raw') return source;

  const css = options.compiler ? await options.compiler(source, path) : await render(source);
  return styleOf(css, mode);
}

const less = async source => (await (await vendor('less')).default.render(source)).css;
const sass = syntax => async source => (await vendor('sass')).default.compileString(source, { syntax }).css;

export function importCSS  (path, options) { return compile(path, options, 'css',  source => source); }
export function importLESS (path, options) { return compile(path, options, 'less', less); }
export function importSASS (path, options) { return compile(path, options, 'sass', sass('indented')); }
export function importSCSS (path, options) { return compile(path, options, 'scss', sass('scss')); }
