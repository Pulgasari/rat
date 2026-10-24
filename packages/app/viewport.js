// @rat/app :: viewport

/*
viewport in config.rat.js becomes the <meta name='viewport'> of the page:

  viewport : { width: 'device-width', initialScale: 1, maximumScale: 1, userScalable: 'no', fit: 'cover' }
  // -> width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover

a name is written in camelCase or as the meta has it ('initial-scale'), fit is viewport-fit.
a string is taken as it is.
*/

const NAMES = { fit: 'viewport-fit' };

const kebab = name => NAMES[name] ?? name.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`);

function viewport (spec) {
  const content = typeof spec === 'string' ? spec : Object.entries(spec).map(([name, value]) => `${kebab(name)}=${value}`).join(', ');
  let meta = document.head.querySelector('meta[name="viewport"]');
  if (!meta) meta = document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'viewport' }));
  meta.content = content;
  return content;
}

// :::::: EXPORT

export { viewport };
