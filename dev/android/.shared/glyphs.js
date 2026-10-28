// android/.shared/glyphs.js
//
// an app's own line icons for <svg-icon>, offline: the bodies of 24x24 svgs (fill none, a stroke) are
// handed to svg-icon as '<prefix>:<name>', config.icons names them. svg-icon masks them, so the color is
// the element's (--icon-color, currentColor)
//
//   provide('sub', GLYPHS);                 // once, before the markup shows them
//   icons : aliases('sub', GLYPHS),         // config.rat.js: <svg-icon icon='phone'>

const wrap = (body, width) => `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#000' stroke-width='${width}' stroke-linecap='round' stroke-linejoin='round'>${body}</svg>`;

export const aliases = (prefix, glyphs) => Object.fromEntries(Object.keys(glyphs).map(name => [name, `${prefix}:${name}`]));

export function provide (prefix, glyphs, width = 1.7) {
  const svgs = Object.fromEntries(Object.entries(glyphs).map(([name, body]) => [`${prefix}:${name}`, wrap(body, width)]));
  const SvgIcon = customElements.get('svg-icon');
  if (SvgIcon) SvgIcon.provide?.(svgs);
  else customElements.whenDefined('svg-icon').then(SvgIcon => SvgIcon.provide?.(svgs));
}
