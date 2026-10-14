// @rat/compiler :: style

/*
<style> -> native @scope, rooted at the component's top level elements, which
carry data-rat="<hash>". no selector rewriting, no class mangling: the browser
does the scoping.

there is no lower boundary (`to (…)`) on purpose: styles reach into child
components the way css always cascades, and slotted content keeps its parent's
styles. where both match, @scope proximity lets the closer component win.
*/

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
  return `@scope ([data-rat="${id}"]) {\n${body.replace(/^/gm, '  ')}\n}`;
}

export { hash, scopeStyle };
