// @ratscript/compiler/generator/core.js

import { generate } from './index.js';

export function generateIdentifier ({ name }) {
  return name;
}

export function generateLiteral ({ type,value }) {
  return (type === 'STRING') 
    ? JSON.stringify(value)
    : String(value);
}

export function generateObjectPattern (node) {
  const props = node.properties
    .map(p => p.key === p.value ? p.key : `${p.key}: ${p.value}`)
    .join(', ');
  return `{ ${props} }`;
}

export function generatePipePlaceholder (node) {
  throw new Error('[Generator-Fehler]: PipePlaceholder ("_") sollte bereits beim Parsen aufgelöst worden sein.');
}
