// @rat/syntax :: engine

// what every target needs from the spec: flattened rules, joined patterns, scope mapping

import { states } from './spec.js';

// an array pattern is a sequence of groups
const source = pattern => Array.isArray(pattern) ? pattern.map(part => `(${part})`).join('') : pattern;
const tokens = token   => Array.isArray(token) ? token : [token];

// the rules of a state with every { include } spliced in. cycles are cut, never followed twice
function flatten (name, seen = new Set) {
  if (seen.has(name)) return [];
  seen.add(name);
  const state = states[name];
  if (!state) throw new Error(`[rat/syntax] unknown state "${name}"`);
  return state.rules.flatMap(rule => rule.include ? flatten(rule.include, seen) : [rule]);
}

// textmate scope -> target name, by the longest matching prefix (segment wise)
function mapper (table) {
  const keys  = Object.keys(table).sort((a, b) => b.length - a.length);
  const cache = new Map;
  return scope => {
    if (scope == null) return null;
    if (cache.has(scope)) return cache.get(scope);
    const key   = keys.find(key => scope === key || scope.startsWith(`${key}.`));
    const value = key === undefined ? null : table[key];
    cache.set(scope, value);
    return value;
  };
}

export { flatten, mapper, source, states, tokens };
