// @rat/compiler :: style

/*
<style> -> native @scope around the component's top level elements, which
carry data-rat="<hash>". no selector rewriting, no class mangling: the browser
does the scoping.

the scoping root is their PARENT, not they themselves: a plain selector in
@scope never matches the root (only :scope does), so `.counter { … }` would
miss <div.counter> at the top of the component. the lower boundary cuts the
parent's other children off, so only the component's elements are in scope.

no other boundary on purpose: styles reach into child components the way css
always cascades, and slotted content keeps its parent's styles. where both
match, @scope proximity lets the closer component win.
*/

import { tokens, tt } from './util.js';

// djb2, base36. stable per file, short enough to read in devtools
function hash (string) {
  let value = 5381;
  for (let index = 0; index < string.length; index++) value = (value * 33) ^ string.charCodeAt(index);
  return (value >>> 0).toString(36);
}

function scopeStyle (css, id) {
  const lines  = css.replace(/^\s*\n|\s+$/g, '').split('\n');
  const indent = Math.min(...lines.filter(line => line.trim()).map(line => line.match(/^\s*/)[0].length));
  const body   = lines.map(line => line.slice(indent)).join('\n');
  if (!body.trim()) return '';
  const root = `[data-rat="${id}"]`;
  return `@scope (:has(> ${root})) to (:scope > :not(${root})) {\n${body.replace(/^/gm, '  ')}\n}`;
}

// ::: css files

/*
three ways a css file gets into the page, the same in a script and as a tag:

  style link   'https://…/aufbau.css';    <style mode="link"   src="…" />
  style adopt  'gestalt.css';             <style mode="adopt"  src="…" />   (adopt is the default)
  style inline 'local.css';               <style mode="inline" src="…" />

  link     a <link rel="stylesheet"> in the head. global, once per url
  adopt    fetched, a constructable stylesheet in document.adoptedStyleSheets. global, once per url
  inline   read while compiling and added to the component's own <style>: scoped like it,
           no request at runtime. a .scss / .sass / .ass file goes through that language

link and adopt run when the module is first imported, relative urls resolve against the file.
*/

const MODES = ['adopt', 'inline', 'link'];

const attrOf = (attributes, name) => new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>/]+))`).exec(attributes)?.slice(1).find(value => value !== undefined) ?? null;

const STATEMENT_START = new Set([tt.semi, tt.braceL, tt.braceR]);

/*
the `style …` statements of a script, cut out (blanked, so positions stay):
{ code, found: [{ mode, src, index }] }. only at the top level and at the start
of a statement, so style.color = … or const style = … stay plain js.
*/
function styleStatements (code) {
  const list  = tokens(code);
  const found = [];
  let   out   = code;
  let   depth = 0;

  for (let at = 0; at < list.length; at++) {
    const token = list[at];
    if (token.type === tt.braceL) depth++;
    if (token.type === tt.braceR) depth--;
    if (depth || token.type !== tt.name || token.value !== 'style') continue;

    const previous = list[at - 1];
    if (previous && !STATEMENT_START.has(previous.type) && !code.slice(previous.end, token.start).includes('\n')) continue;

    const named = list[at + 1]?.type === tt.name && MODES.includes(list[at + 1].value);
    const path  = list[at + (named ? 2 : 1)];
    if (path?.type !== tt.string) continue;

    let last = at + (named ? 2 : 1);
    if (list[last + 1]?.type === tt.semi) last++;

    found.push({ index: token.start, mode: named ? list[at + 1].value : 'adopt', src: path.value });
    out = out.slice(0, token.start) + out.slice(token.start, list[last].end).replace(/[^\n]/g, ' ') + out.slice(list[last].end);
    at = last;
  }

  return { code: out, found };
}

// the inline sources of a .rat file, without parsing it: compileAsync() reads them ahead
const inlineSources = source => [
  ...[...source.matchAll(/<style\b([^>]*)>/g)].filter(([, attributes]) => attrOf(attributes, 'mode') === 'inline').map(([, attributes]) => attrOf(attributes, 'src')),
  ...[...source.matchAll(/\bstyle\s+inline\s+(["'])(.+?)\1/g)].map(match => match[2]),
].filter(Boolean);

// relative url(…) of an inlined file made absolute against the file: inlined, it would resolve against the page
const RELATIVE_URL = /url\(\s*(['"]?)(?![a-z][\w+.-]*:|\/|#)([^'")]+)\1\s*\)/gi;

const rebase = (css, base) => css.replace(RELATIVE_URL, (_, quote, path) => `url("${new URL(path, base).href}")`);

// the language of a css file by its extension
const langOfPath = path => /\.(scss|sass|ass)$/i.exec(path)?.[1].toLowerCase() ?? 'css';

export { MODES, attrOf, hash, inlineSources, langOfPath, rebase, scopeStyle, styleStatements };
