// cosmonaut :: modules/search.js
//
// what the url field does with its input: a command (commands.js) opens its url, a url opens as it is,
// anything else is a search with the default engine, or with the engine picked

import { commandUrl, parseCommand } from './commands.js';

// a scheme, or a dotted word without spaces
export const isUrlLike = value => /^[a-z][a-z0-9+.-]*:\/\//i.test(value) || (value.includes('.') && !value.includes(' '));

const searchUrl = (engine, query) => engine.url.includes('%s')
  ? engine.url.replaceAll('%s', encodeURIComponent(query))
  : engine.url + encodeURIComponent(query);

// the url to navigate to, null for an empty input. engines: the list, fallback: the default engine
export function target (input, { engine, fallback }) {
  const value = (input || '').trim();
  if (!value) return null;
  const command = !engine && parseCommand(value);
  if (command) return commandUrl(command);
  const by = engine ?? (isUrlLike(value) ? null : fallback);
  return by ? searchUrl(by, value) : value;
}
