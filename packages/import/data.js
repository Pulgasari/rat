// @rat/import :: data

/*
files that parse into values: csv / tsv, env, ini, json, json5, jsonc, jsonl / ndjson,
toml, xml and yaml. every one also has raw, the text as fetched.

env, ini, json, jsonc and jsonl are parsed here. csv (papaparse), json5, toml
(smol-toml), xml (fast-xml-parser) and yaml load their parser on first use.
{ parserOptions } reaches papaparse and fast-xml-parser.
*/

import { extensionOf, fetchText, parseDOM, toOptions } from './core.js';
import { resolveMode }                                 from './modes.js';
import { vendor }                                      from './vendors.js';

async function parse (path, options, format, parser) {
  options = toOptions(options);
  const mode   = resolveMode(format, options);
  const source = await fetchText(path, options);
  return mode === 'raw' ? source : parser(source, mode, options, path);
}

const unquote = value => value.replace(/^(['"])(.*)\1$/, '$2');

// key = value lines. env: '# …' comments, an optional 'export '. ini: also '; …', [sections]
function keyValues (source, ini) {
  const result  = {};
  let   section = result;

  for (const line of source.split(/\r?\n/)) {
    const trimmed = ini ? line.trim() : line.trim().replace(/^export\s+/, '');
    if (!trimmed || trimmed[0] === '#' || (ini && trimmed[0] === ';')) continue;

    const header = ini && trimmed.match(/^\[(.+)\]$/);
    if (header) { section = result[header[1].trim()] ??= {}; continue; }

    const split = trimmed.indexOf('=');
    if (split !== -1) section[trimmed.slice(0, split).trim()] = unquote(trimmed.slice(split + 1).trim());
  }
  return result;
}

// strings are matched first and kept, comments and trailing commas outside them go
const JSONC = /("(?:\\.|[^"\\])*")|\/\/[^\n]*|\/\*[\s\S]*?\*\/|,(?=\s*[}\]])/g;

function jsonLines (source, path) {
  const records = [];
  const lines   = source.split(/\r?\n/);
  for (let index = 0; index < lines.length; index++) {
    if (!lines[index].trim()) continue;
    try   { records.push(JSON.parse(lines[index])); }
    catch (error) { throw new SyntaxError(`[@rat/import] ${path}, line ${index + 1}: ${error.message}`); }
  }
  return records;
}

export function importCSV (path, options) {
  return parse(path, options, 'csv', async (source, mode, options) => (await vendor('papaparse')).default.parse(source, {
    delimiter     : extensionOf(path) === 'tsv' ? '\t' : undefined,
    dynamicTyping : true,
    header        : mode === 'records',
    ...options.parserOptions,
  }).data);
}

export function importENV   (path, options) { return parse(path, options, 'env',   source => keyValues(source, false)); }
export function importINI   (path, options) { return parse(path, options, 'ini',   source => keyValues(source, true)); }
export function importJSON  (path, options) { return parse(path, options, 'json',  source => JSON.parse(source)); }
export function importJSON5 (path, options) { return parse(path, options, 'json5', async source => (await vendor('json5')).default.parse(source)); }
export function importJSONC (path, options) { return parse(path, options, 'jsonc', source => JSON.parse(source.replace(JSONC, (match, string) => string ?? ''))); }
export function importJSONL (path, options) { return parse(path, options, 'jsonl', source => jsonLines(source, path)); }
export function importTOML  (path, options) { return parse(path, options, 'toml',  async source => (await vendor('smolToml')).parse(source)); }
export function importYAML  (path, options) { return parse(path, options, 'yaml',  async source => (await vendor('yaml')).default.parse(source)); }

export function importXML (path, options) {
  return parse(path, options, 'xml', async (source, mode, options) => {
    if (mode === 'document') return parseDOM(source, 'text/xml');
    const { XMLParser } = await vendor('fastXmlParser');
    const parsed        = new XMLParser(options.parserOptions ?? {}).parse(source);
    return mode === 'json' ? JSON.stringify(parsed) : parsed;
  });
}
