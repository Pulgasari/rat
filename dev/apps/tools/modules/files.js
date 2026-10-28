// tools :: modules/files.js

// a blob, a text or an object url to a file the browser saves
export function download (content, name, type = 'text/plain') {
  const url = typeof content === 'string' && /^(blob|data):/.test(content) ? content : URL.createObjectURL(content instanceof Blob ? content : new Blob([content], { type }));
  Object.assign(document.createElement('a'), { download: name, href: url }).click();
  if (url !== content) setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const copy = text => navigator.clipboard.writeText(text);
