// @rat/syntax :: monaco

/*
spec -> monarch tokenizers. monarch is the spec's own model (states, push,
pop, group tokens), so this is mostly renaming:

  { match }           [regex, token | [tokens]]
  { begin, state }    [regex, { token, next: '@state' }]
  state.end           first rule of the state, next: '@pop'
  state.scope         a catch-all as last rule, so a string stays a string
  state.embed         monaco's own language takes over (nextEmbedded) until the
                      end rematches in the parent, which tokenizes the close tag

includes are flattened here instead of using monarch's { include }, which would
also pull in the end rule of the included state.

token names follow monaco's built-in themes (keyword, string, tag, delimiter …)
with a rat suffix where it helps: keyword.block, variable.reactive.

  import { register } from '@rat/syntax/monaco';
  register(monaco);
*/

import { files } from '../spec.js';
import { flatten, mapper, source, states, tokens } from '../engine.js';

const token = mapper({
  'comment'                              : 'comment',
  'constant.character.entity'            : 'string.escape',
  'constant.character.escape'            : 'string.escape',
  'constant.language'                    : 'keyword.constant',
  'constant.numeric'                     : 'number',
  'constant.other.color'                 : 'number.hex',
  'entity.name.function'                 : 'identifier.function',
  'entity.name.function.tagged-template' : 'type.template',
  'entity.name.tag'                      : 'tag',
  'entity.other.attribute-name'          : 'attribute.name',
  'entity.other.attribute-name.class'    : 'attribute.name.class',
  'entity.other.attribute-name.id'       : 'attribute.name.id',
  'keyword'                              : 'keyword',
  'keyword.control.block'                : 'keyword.block',
  'keyword.operator'                     : 'delimiter.operator',
  'keyword.operator.pipe'                : 'keyword.pipe',
  'keyword.other.directive'              : 'keyword.directive',
  'meta'                                 : '',
  'punctuation'                          : 'delimiter',
  'punctuation.definition.tag'           : 'delimiter.tag',
  'storage.type'                         : 'keyword.storage',
  'string'                               : 'string',
  'support.class.component'              : 'type.component',
  'support.function'                     : 'predefined',
  'support.type.property-name'           : 'attribute.name.css',
  'variable.language'                    : 'variable.predefined',
  'variable.other'                       : 'identifier',
  'variable.other.custom-property'       : 'variable',
  'variable.other.reactive'              : 'variable.reactive',
});

const name   = scope => token(scope) ?? '';
const regex  = pattern => new RegExp(source(pattern));

// a token action, the last group carries the transition
function action (pattern, scope, transition) {
  if (!Array.isArray(pattern)) return transition ? { token: name(scope), ...transition } : name(scope);
  const list = tokens(scope).map(name);
  if (!transition) return list;
  return [...list.slice(0, -1), { token: list[list.length - 1], ...transition }];
}

function monarch (language) {
  const tokenizer = { root: [] };

  for (const [stateName, state] of Object.entries(states)) {
    const rules = [];

    if (state.embed) {
      // the embedded language runs until the end rematches one level up
      rules.push([new RegExp([].concat(state.end).join('')), { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]);
      rules.push([/[^<]+/, ''], [/</, '']);
      tokenizer[stateName] = rules;
      continue;
    }

    if (state.end) rules.push([regex(state.end), action(state.end, state.endToken, { next: '@pop' })]);

    for (const rule of flatten(stateName)) {
      if (rule.match) { rules.push([regex(rule.match), action(rule.match, rule.token)]); continue; }
      const target     = states[rule.state];
      const transition = { next: `@${rule.state}` };
      if (target.embed) transition.nextEmbedded = target.embed;
      rules.push([regex(rule.begin), action(rule.begin, rule.token, transition)]);
    }

    if (state.scope) rules.push([/[\s\S]/, name(state.scope)]);
    tokenizer[stateName] = rules;
  }

  tokenizer.root = tokenizer[files[language].root];

  return { defaultToken: '', tokenPostfix: `.${language}`, tokenizer };
}

const configuration = {
  rat: {
    autoClosingPairs : [{ open: '{', close: '}' }, { open: '(', close: ')' }, { open: '[', close: ']' }, { open: '"', close: '"' }, { open: "'", close: "'" }, { open: '`', close: '`' }],
    brackets         : [['{', '}'], ['(', ')'], ['[', ']']],
    comments         : { blockComment: ['<!--', '-->'] },
  },
  ratjs: {
    autoClosingPairs : [{ open: '{', close: '}' }, { open: '(', close: ')' }, { open: '[', close: ']' }, { open: '"', close: '"' }, { open: "'", close: "'" }, { open: '`', close: '`' }],
    brackets         : [['{', '}'], ['(', ')'], ['[', ']']],
    comments         : { blockComment: ['/*', '*/'], lineComment: '//' },
  },
};

// registers rat and ratjs on a monaco namespace. idempotent
function register (monaco) {
  for (const [id, { extensions, name: alias }] of Object.entries(files)) {
    if (monaco.languages.getLanguages().some(language => language.id === id)) continue;
    monaco.languages.register({ aliases: [alias, id], extensions: extensions.map(extension => `.${extension}`), id });
    monaco.languages.setMonarchTokensProvider(id, monarch(id));
    monaco.languages.setLanguageConfiguration(id, configuration[id]);
  }
  return monaco;
}

// file name -> monaco language id, for editors that pick the language themselves
const languageOf = filename => Object.entries(files)
  .filter(([, { extensions }]) => extensions.some(extension => filename.endsWith(`.${extension}`)))
  .sort(([, a], [, b]) => Math.max(...b.extensions.map(e => e.length)) - Math.max(...a.extensions.map(e => e.length)))[0]?.[0] ?? null;

export { languageOf, monarch, register };
export default register;
