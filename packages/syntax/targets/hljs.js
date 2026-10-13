// @rat/syntax :: highlight.js

/*
spec -> hljs language definitions. a state becomes the contains list of every
mode that enters it (behind an "ender", see enderOf); modes are memoized per
rule and lists per state, so the
recursion (braces in braces, templates in holes in templates) is a cyclic
object graph, which hljs compiles once.

rat specific scopes get a sub class, hljs renders "variable.reactive" as
class="hljs-variable reactive_", so a theme can single them out:

  .hljs-variable.reactive_ { color: crimson; }
*/

import { files } from '../spec.js';
import { flatten, mapper, source, states, tokens } from '../engine.js';

const scope = mapper({
  'comment'                              : 'comment',
  'constant.character.entity'            : 'symbol',
  'constant.character.escape'            : 'char.escape',
  'constant.language'                    : 'literal',
  'constant.numeric'                     : 'number',
  'constant.other.color'                 : 'number',
  'entity.name.function'                 : 'title.function',
  'entity.name.function.tagged-template' : 'title.function.template',
  'entity.name.tag'                      : 'name',
  'entity.other.attribute-name'          : 'attr',
  'entity.other.attribute-name.class'    : 'selector-class',
  'entity.other.attribute-name.id'       : 'selector-id',
  'keyword'                              : 'keyword',
  'keyword.control.at-rule'              : 'keyword',
  'keyword.control.block'                : 'keyword.block',
  'keyword.operator'                     : 'operator',
  'keyword.operator.pipe'                : 'operator.pipe',
  'keyword.operator.range'               : 'operator.range',
  'keyword.other.directive'              : 'keyword.directive',
  'meta.embedded.expression'             : 'subst',
  'meta.template.expression'             : 'subst',
  'punctuation'                          : 'punctuation',
  'storage.type'                         : 'keyword',
  'string'                               : 'string',
  'support.class.component'              : 'title.class.component',
  'support.function'                     : 'built_in',
  'support.type.property-name'           : 'attribute',
  'variable.language'                    : 'variable.language',
  'variable.language.topic'              : 'variable.language.topic',
  'variable.other.custom-property'       : 'variable',
  'variable.other.reactive'              : 'variable.reactive',
});

const regex = pattern => Array.isArray(pattern) ? pattern.map(part => new RegExp(part)) : new RegExp(pattern);

// a single scope, or { 1: …, 2: … } for an array pattern
function scopes (pattern, token) {
  if (!Array.isArray(pattern)) return scope(token) ?? undefined;
  const out = {};
  tokens(token).forEach((name, index) => { const mapped = scope(name); if (mapped) out[index + 1] = mapped; });
  return out;
}

function definition (hljs, language) {
  const { name, root } = files[language];
  const lists = new Map;
  const modes = new Map;

  function containsOf (stateName) {
    if (lists.has(stateName)) return lists.get(stateName);
    const list = [];
    lists.set(stateName, list);
    for (const rule of flatten(stateName)) list.push(modeOf(rule));
    return list;
  }

  // hljs tries contained rules before a mode's end, so `<` (an operator) would eat
  // `</script>`. a first child that matches the end and ends its parent gives the
  // end priority, the way every other engine treats it
  const enders = new Map;

  // eol states (a block head without { or :) also end at the line break
  function endersOf (stateName) {
    if (enders.has(stateName)) return enders.get(stateName);
    const state = states[stateName];
    const ender = { begin: regex(state.end), endsParent: true, relevance: 0 };
    const name  = scopes(state.end, state.endToken);
    if (name) ender.beginScope = name;
    const list = state.eol ? [ender, { begin: /\n/, endsParent: true, relevance: 0 }] : [ender];
    enders.set(stateName, list);
    return list;
  }

  function modeOf (rule) {
    if (modes.has(rule)) return modes.get(rule);

    if (rule.match) {
      const mode = { match: regex(rule.match), relevance: 0 };
      const name = scopes(rule.match, rule.token);
      if (name) mode.scope = name;
      modes.set(rule, mode);
      return mode;
    }

    const state = states[rule.state];
    const mode  = { begin: regex(rule.begin), end: regex(state.end), relevance: 0 };
    modes.set(rule, mode);

    const begin = scopes(rule.begin, rule.token);
    const end   = scopes(state.end, state.endToken);
    if (begin) mode.beginScope = begin;
    if (end)   mode.endScope   = end;
    if (state.scope && scope(state.scope)) mode.scope = scope(state.scope);

    if (state.embed && hljs.getLanguage(state.embed)) mode.subLanguage = state.embed;
    else mode.contains = [...endersOf(rule.state), ...containsOf(rule.state)];

    return mode;
  }

  return {
    aliases          : [...new Set([language, ...files[language].extensions])],
    case_insensitive : false,
    contains         : containsOf(root),
    name,
  };
}

const rat   = hljs => definition(hljs, 'rat');
const ratjs = hljs => definition(hljs, 'ratjs');

// registers both languages on an hljs instance
function register (hljs) {
  hljs.registerLanguage('rat',   rat);
  hljs.registerLanguage('ratjs', ratjs);
  return hljs;
}

export { definition, rat, ratjs, register };
export default register;
