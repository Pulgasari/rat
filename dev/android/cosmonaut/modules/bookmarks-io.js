// cosmonaut :: modules/bookmarks-io.js
//
// bookmark exchange formats and files.
//
//   json           { bookmarks, bookmarkFolders }, folders kept (ids remapped on import)
//   netscape html  the format every browser imports / exports. folders become <h3>
//                  sections on export, import reads the links flat (the usual
//                  interop tradeoff)

import { domainOf, uid } from './util.js';
import { filesystem } from './browser.js';

const escapeHtml = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

export const toJson = ({ bookmarks, bookmarkFolders }) => JSON.stringify({ bookmarks, bookmarkFolders }, null, 2);

export function toNetscape ({ bookmarks, bookmarkFolders }) {
  const link = mark => {
    const tags = mark.tags?.length ? ` TAGS="${escapeHtml(mark.tags.join(','))}"` : '';
    return `    <DT><A HREF="${escapeHtml(mark.url)}"${tags}>${escapeHtml(mark.title || domainOf(mark.url))}</A>\n`;
  };

  let out = '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n'
    + '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n'
    + '<TITLE>Bookmarks</TITLE>\n<H1>Bookmarks</H1>\n<DL><p>\n';

  for (const folder of bookmarkFolders) {
    const marks = bookmarks.filter(mark => mark.folder === folder.id);
    if (!marks.length) continue;
    out += `    <DT><H3>${escapeHtml(folder.name)}</H3>\n    <DL><p>\n`;
    for (const mark of marks) out += '    ' + link(mark);
    out += '    </DL><p>\n';
  }
  for (const mark of bookmarks.filter(mark => !mark.folder)) out += link(mark);

  return out + '</DL><p>\n';
}

// { bookmarks, folders } with fresh ids, or null when the text is not json
export function fromJson (text) {
  let data;
  try { data = JSON.parse(text); } catch { return null; }

  const ids     = {};
  const folders = (Array.isArray(data.bookmarkFolders) ? data.bookmarkFolders : [])
    .filter(folder => folder?.name)
    .map(folder => { const id = uid('f'); ids[folder.id] = id; return { id, name: String(folder.name) }; });

  const source    = Array.isArray(data.bookmarks) ? data.bookmarks : Array.isArray(data) ? data : [];
  const bookmarks = source.filter(mark => mark?.url).map(mark => ({
    id     : uid('b'),
    url    : mark.url,
    title  : mark.title || domainOf(mark.url),
    folder : ids[mark.folder],
    tags   : Array.isArray(mark.tags) ? mark.tags : [],
  }));

  return { bookmarks, folders };
}

// { bookmarks, folders: [] }, or null when the html holds no links
export function fromNetscape (html) {
  let doc;
  try { doc = new DOMParser().parseFromString(html, 'text/html'); } catch { return null; }

  const anchors = [...doc.querySelectorAll('a[href]')];
  if (!anchors.length) return null;

  const bookmarks = anchors
    .map(anchor => ({ anchor, url: anchor.getAttribute('href') }))
    .filter(({ url }) => url && !/^(javascript|place):/i.test(url))
    .map(({ anchor, url }) => ({
      id    : uid('b'),
      url,
      title : (anchor.textContent || domainOf(url)).trim(),
      tags  : (anchor.getAttribute('tags') || '').split(',').map(tag => tag.trim()).filter(Boolean),
    }));

  return { bookmarks, folders: [] };
}

// html when the name or the content says so, json otherwise
export const detectFormat = (name, text) => /\.html?$/i.test(name) || /^\s*</.test(text) ? 'html' : 'json';

// writes a user-visible file and returns where it went, or null. android: the
// filesystem plugin into Documents, else app-external storage (scoped storage
// rejects Documents on some api levels). web: a download.
export async function saveTextFile (name, text) {
  if (filesystem) {
    for (const directory of ['DOCUMENTS', 'EXTERNAL']) {
      try {
        const { uri } = await filesystem.writeFile({ path: name, data: text, directory, encoding: 'utf8', recursive: true });
        return uri ? uri.replace(/^file:\/\//, '') : `${directory.toLowerCase()}/${name}`;
      } catch {}
    }
    return null;
  }

  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  Object.assign(document.createElement('a'), { href: url, download: name }).click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return name;
}

// lets the user pick a file (the filesystem plugin has no picker) and resolves
// with { name, text }, or rejects when it cannot be read
export function pickTextFile (input) {
  return new Promise((resolve, reject) => {
    input.value = '';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload  = () => resolve({ name: file.name, text: String(reader.result || '') });
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    };
    input.click();
  });
}
