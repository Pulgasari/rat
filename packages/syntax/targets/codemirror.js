// @rat/syntax :: codemirror

/*
spec -> codemirror 6 stream parser. a small interpreter of the state stack:
at every position the end of the current state is tried first, then its
rules in order; nothing matching means plain text in the state's scope, up to
the next position where something matches.

regexes run sticky on the whole line (not on a slice, so lookbehind sees what
came before). array patterns use the d flag: the first group is returned
right away, the rest is queued and handed out on the next calls.

@codemirror/language is injected, not imported, so the same file works in a
bundle, in acode (acode.require) and from a cdn:

  import { StreamLanguage } from '@codemirror/language';
  import { language }       from '@rat/syntax/codemirror';
  const rat = language(StreamLanguage, 'rat');
*/

import { files } from '../spec.js';
import { flatten, mapper, source, states, tokens } from '../engine.js';

const tag = mapper({
  'comment'                              : 'comment',
  'constant.character.entity'            : 'character',
  'constant.character.escape'            : 'escape',
  'constant.language'                    : 'atom',
  'constant.numeric'                     : 'number',
  'constant.other.color'                 : 'color',
  'entity.name.function'                 : 'variableName.function',
  'entity.name.function.tagged-template' : 'macroName',
  'entity.name.tag'                      : 'tagName',
  'entity.other.attribute-name'          : 'attributeName',
  'entity.other.attribute-name.class'    : 'className',
  'entity.other.attribute-name.id'       : 'labelName',
  'keyword'                              : 'keyword',
  'keyword.control'                      : 'controlKeyword',
  'keyword.control.block'                : 'controlKeyword.special',
  'keyword.operator'                     : 'operator',
  'keyword.operator.pipe'                : 'operatorKeyword',
  'keyword.other.directive'              : 'modifier',
  'punctuation'                          : 'punctuation',
  'punctuation.definition.tag'           : 'angleBracket',
  'punctuation.definition.template-expression' : 'brace.special',
  'punctuation.section'                  : 'bracket',
  'punctuation.section.embedded'         : 'brace.special',
  'storage.type'                         : 'definitionKeyword',
  'string'                               : 'string',
  'support.class.component'              : 'typeName',
  'support.function'                     : 'variableName.standard',
  'support.type.property-name'           : 'propertyName',
  'variable.language'                    : 'self',
  'variable.other'                       : 'variableName',
  'variable.other.custom-property'       : 'propertyName.special',
  'variable.other.reactive'              : 'variableName.special',
});

// ::: machine

function compile (pattern, scope) {
  const groups = Array.isArray(pattern);
  return {
    groups,
    regex  : new RegExp(source(pattern), groups ? 'yd' : 'y'),
    tokens : tokens(scope).map(tag),
  };
}

// every state compiled once: { end, rules: [{ regex, tokens, groups, push }], scope }
const machine = Object.fromEntries(Object.keys(states).map(name => {
  const state = states[name];
  return [name, {
    end   : state.end ? compile(state.end, state.endToken) : null,
    rules : flatten(name).map(rule => rule.match
      ? compile(rule.match, rule.token)
      : { ...compile(rule.begin, rule.token), push: rule.state }),
    scope : tag(state.scope),
  }];
}));

// ::: parser

function emit (stream, state, rule, match) {
  if (!rule.groups) {
    stream.pos += match[0].length;
    return rule.tokens[0];
  }

  // [start, end] per group, empty groups dropped
  const parts = match.indices.slice(1)
    .map(([start, end], index) => ({ end, start, token: rule.tokens[index] ?? null }))
    .filter(part => part.end > part.start);

  const [first, ...rest] = parts;
  state.queue.push(...rest.map(({ end, token }) => [end, token]));
  stream.pos = first.end;
  return first.token;
}

function attempt (stream, rule) {
  if (!rule) return null;
  rule.regex.lastIndex = stream.pos;
  const match = rule.regex.exec(stream.string);
  return match && match[0].length ? match : null;
}

function parser (language) {
  const root = files[language].root;

  return {
    name : language,

    startState : () => ({ queue: [], stack: [root] }),
    copyState  : state => ({ queue: state.queue.map(item => [...item]), stack: [...state.stack] }),

    token (stream, state) {
      if (state.queue.length) {
        const [end, token] = state.queue.shift();
        stream.pos = end;
        return token;
      }

      const current = machine[state.stack[state.stack.length - 1]];

      const ending = attempt(stream, current.end);
      if (ending) {
        if (state.stack.length > 1) state.stack.pop();
        return emit(stream, state, current.end, ending);
      }

      for (const rule of current.rules) {
        const match = attempt(stream, rule);
        if (!match) continue;
        if (rule.push) state.stack.push(rule.push);
        return emit(stream, state, rule, match);
      }

      // plain text runs until something could match, so a string is one token, not one per character
      do stream.next();
      while (stream.pos < stream.string.length && !attempt(stream, current.end) && !current.rules.some(rule => attempt(stream, rule)));
      return current.scope;
    },

    languageData : {
      closeBrackets : { brackets: ['(', '[', '{', "'", '"', '`'] },
      commentTokens : language === 'rat' ? { block: { close: '-->', open: '<!--' } } : { block: { close: '*/', open: '/*' }, line: '//' },
    },
  };
}

// a StreamLanguage for rat or ratjs, StreamLanguage passed in
const language = (StreamLanguage, name = 'rat') => StreamLanguage.define(parser(name));

export { language, parser };
export default language;
