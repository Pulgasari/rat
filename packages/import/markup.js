// @rat/import :: markup

/*
html, markdown, svg and plain text (txt, glsl, wgsl, vert, frag …).

  html   string (default), document, element (a <div> holding it)
  md     html (default), element, raw. renderMD() is the same for text already
         in hand, so a caller never needs a markdown parser of its own (marked,
         or { compiler: (source, path) => html })
  svg    string (default: xml declaration and doctype stripped, for inlining),
         element (the <svg>), svgjs (an svg.js wrapper of it), raw
*/

import { createElement, fetchText, parseDOM, toOptions } from './core.js';
import { resolveMode }                                   from './modes.js';
import { vendor }                                        from './vendors.js';

export async function importHTML (path, options) {
  options = toOptions(options);
  const mode   = resolveMode('html', options);
  const source = await fetchText(path, options);

  if (mode === 'document') return parseDOM(source, 'text/html');
  if (mode === 'element')  return createElement('div', { innerHTML: source });
  return source;
}

export async function renderMD (text, options) {
  options = toOptions(options);
  const mode = resolveMode('md', options);
  if (mode === 'raw') return text;

  const html = options.compiler ? await options.compiler(text, options.path) : await (await vendor('marked')).marked.parse(text);
  return mode === 'element' ? createElement('div', { innerHTML: html }) : html;
}

export async function importMD (path, options) {
  options = toOptions(options);
  resolveMode('md', options);
  return renderMD(await fetchText(path, options), { ...options, path });
}

export async function importSVG (path, options) {
  options = toOptions(options);
  const mode   = resolveMode('svg', options);
  const source = await fetchText(path, options);
  if (mode === 'raw') return source;

  const clean = source.replace(/<\?xml[\s\S]*?\?>/gi, '').replace(/<!DOCTYPE[\s\S]*?>/gi, '').trim();
  if (mode === 'string') return clean;

  const doc     = parseDOM(clean, 'image/svg+xml');
  const element = doc.querySelector('svg') ?? doc.documentElement;
  if (mode === 'element') return element;

  const { SVG } = await vendor('svgjs');
  return SVG(element); // adopts the node, no second parse
}

export async function importText (path, options) {
  options = toOptions(options);
  resolveMode('text', options);
  return fetchText(path, options);
}
