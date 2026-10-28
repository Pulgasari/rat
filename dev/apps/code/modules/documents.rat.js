// code :: modules/documents.rat.js

/*
the files open in the editor, from any source: a document holds a file handle (a granted folder's, a
webdav server's, a github branch's) and works with nothing else, so every source opens and saves the
same way. a binary file opens read only and empty.

  document   a $Record { id, name, content, language, dirty, readOnly, handle, where }
             id: the source and the path, where: what the statusbar names (a folder, a server, a repo)
  $documents the open ones, $current the one in the editor
  open(handle, { id, where })   opens it, or brings it up when it is open already
  save(document, options)       writes it back: options reach the writable (github: { message })
  close(document), closeUnder(id)   one, or all at or below an id (a renamed or deleted entry)
*/

import { $List, $Record } from '@rat/types';

// :::::: LANGUAGES, monaco's own modes plus rat (@rat/syntax)

const LANGUAGES = {
  bash: 'shell', c: 'c', cc: 'cpp', cjs: 'javascript', cpp: 'cpp', cs: 'csharp', css: 'css', go: 'go', h: 'c', hpp: 'cpp',
  htm: 'html', html: 'html', ini: 'ini', java: 'java', js: 'javascript', json: 'json', jsx: 'javascript', less: 'less',
  markdown: 'markdown', md: 'markdown', mjs: 'javascript', php: 'php', py: 'python', rat: 'rat', rb: 'ruby', rs: 'rust',
  scss: 'scss', sh: 'shell', sql: 'sql', svg: 'xml', toml: 'ini', ts: 'typescript', tsx: 'typescript', xml: 'xml',
  yaml: 'yaml', yml: 'yaml',
};

export const languageOf = name => /\.rat\.js$/i.test(name) ? 'ratjs' : LANGUAGES[name.split('.').pop().toLowerCase()] ?? 'plaintext';

// a NUL in the first 8000 bytes: binary, good enough
const isBinary = bytes => bytes.subarray(0, 8000).includes(0);

// :::::: DOCUMENTS

export const $documents = new $List;

export let $current = null;

const byId = id => $documents.find(document => document.id === id);

export async function open (handle, { id, where = '' }) {
  const known = byId(id);
  if (known) { $current = known; return known; }

  const bytes    = new Uint8Array(await (await handle.getFile()).arrayBuffer());
  const binary   = isBinary(bytes);
  const document = new $Record({
    content  : binary ? '' : new TextDecoder().decode(bytes),
    dirty    : false,
    handle,
    id,
    language : languageOf(handle.name),
    name     : handle.name,
    readOnly : binary || Boolean(handle.readOnly),
    where,
  });

  $documents.push(document);
  $current = document;
  return document;
}

export const show = document => { $current = document; };

// a granted folder asks for write access on the click that saves, a server's handle has it
export async function save (document = $current, options) {
  if (!document || document.readOnly) return false;
  const { handle } = document;
  if (await handle.requestPermission?.({ mode: 'readwrite' }) === 'denied') throw new Error(`No permission to write ${document.name}`);
  const writable = await handle.createWritable(options);
  await writable.write(document.content);
  await writable.close();
  document.dirty = false;
  return true;
}

export function close (document) {
  const index = $documents.indexOf(document);
  $documents.remove(document);
  if ($current === document) $current = $documents.at(Math.min(index, $documents.length - 1)) ?? null;
}

export function closeUnder (id) {
  for (const document of $documents.filter(document => document.id === id || document.id.startsWith(`${id}/`)).toArray()) close(document);
}
