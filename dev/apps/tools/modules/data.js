// tools :: modules/data.js
//
// csv, json, toml, yaml and a js object, each read into data and written back out. convert(src, from, to)
// goes through the data

import { parse as yamlParse, stringify as yamlStringify } from 'yaml';
import { parse as tomlParse } from 'smol-toml';

// :::::: CSV

function splitLine (line) {
  const result = [];
  const regexp = /("([^"]*)"|([^,]*))(,|$)/g;
  let match;
  while ((match = regexp.exec(line)) !== null) {
    result.push(match[2] ?? match[3] ?? '');
    if (match[4] === '') break;
  }
  return result;
}

function coerce (value) {
  if (value === '')      return null;
  if (value === 'true')  return true;
  if (value === 'false') return false;
  const number = Number(value);
  return isNaN(number) ? value : number;
}

export function csvParse (src) {
  const lines   = src.trim().split('\n');
  const headers = splitLine(lines[0]);
  return lines.slice(1).filter(line => line.trim()).map(line => {
    const values = splitLine(line);
    return Object.fromEntries(headers.map((header, index) => [header.trim(), coerce(values[index]?.trim() ?? '')]));
  });
}

export function csvStringify (data) {
  const rows = Array.isArray(data) ? data : [data];
  if (!rows.length) return '';
  const keys   = Object.keys(rows[0]);
  const escape = value => {
    const string = value === null ? '' : String(value);
    return /[,"\n]/.test(string) ? `"${string.replace(/"/g, '""')}"` : string;
  };
  return [keys.join(','), ...rows.map(row => keys.map(key => escape(row[key])).join(','))].join('\n');
}

// :::::: TOML (smol-toml reads, a small writer for plain and nested objects)

function tomlValue (value) {
  if (typeof value === 'string')  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  if (value === null) return '""';
  return `"${String(value)}"`;
}

function tomlSection (object, prefix = '') {
  let out = '';
  const entries = Object.entries(object);
  for (const [key, value] of entries.filter(([, value]) => typeof value !== 'object' || value === null)) out += `${key} = ${tomlValue(value)}\n`;
  for (const [key, value] of entries.filter(([, value]) => Array.isArray(value))) {
    if (value.every(item => typeof item !== 'object' || item === null)) out += `${key} = [${value.map(tomlValue).join(', ')}]\n`;
    else for (const item of value) out += `\n[[${prefix}${key}]]\n` + tomlSection(item, `${prefix}${key}.`);
  }
  for (const [key, value] of entries.filter(([, value]) => typeof value === 'object' && value !== null && !Array.isArray(value))) out += `\n[${prefix}${key}]\n` + tomlSection(value, `${prefix}${key}.`);
  return out;
}

export const tomlStringify = data => Array.isArray(data) ? data.map(item => `[[items]]\n${tomlSection(item)}`).join('\n') : tomlSection(data);

// :::::: ALL OF THEM

const PARSERS = { csv: csvParse, json: JSON.parse, toml: tomlParse, yaml: yamlParse };

const WRITERS = {
  csv  : csvStringify,
  js   : data => `let data = ${JSON.stringify(data, null, 2).replace(/"([^"]+)":/g, '$1:')}`,
  json : data => JSON.stringify(data, null, 2),
  toml : tomlStringify,
  yaml : data => yamlStringify(data, { indent: 2 }),
};

export const convert = (src, from, to) => WRITERS[to](PARSERS[from](src));

export { tomlParse, yamlParse, yamlStringify };
