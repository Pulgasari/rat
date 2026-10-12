// @rat/syntax :: textmate

/*
spec -> textmate grammar (json). the spec's scope names are textmate's own, so
nothing is mapped. a state becomes a repository entry with its rules; a begin
rule becomes a begin/end pattern that includes that entry. an embedded state
includes the host grammar (source.css) instead.

used by vs code, shiki, github linguist and everything else that reads
.tmLanguage.json. written to disk by build.js.
*/

import { files } from '../spec.js';
import { flatten, source, states, tokens } from '../engine.js';

function captures (pattern, scope) {
  if (!Array.isArray(pattern)) return scope ? { 0: { name: scope } } : undefined;
  return Object.fromEntries(tokens(scope).map((name, index) => [index + 1, { name }]).filter(([, value]) => value.name));
}

function pattern (rule) {
  if (rule.match) {
    return Array.isArray(rule.match)
      ? { captures: captures(rule.match, rule.token), match: source(rule.match) }
      : { match: rule.match, name: rule.token };
  }

  const state = states[rule.state];
  const out   = {
    begin         : source(rule.begin),
    beginCaptures : captures(rule.begin, rule.token),
    end           : source(state.end),
    endCaptures   : captures(state.end, state.endToken),
    patterns      : [{ include: state.embed ? `source.${state.embed}` : `#${rule.state}` }],
  };
  if (state.scope) out.contentName = state.scope;
  return out;
}

function textmate (language) {
  const { extensions, name, root, scopeName } = files[language];
  const repository = {};

  for (const stateName of Object.keys(states)) {
    if (states[stateName].embed) continue;
    repository[stateName] = { patterns: flatten(stateName).map(pattern) };
  }

  return {
    $schema   : 'https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json',
    fileTypes : extensions,
    name,
    patterns  : [{ include: `#${root}` }],
    repository,
    scopeName,
  };
}

export { textmate };
export default textmate;
