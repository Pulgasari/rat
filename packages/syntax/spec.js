// @rat/syntax :: spec

/*
the single source of truth for rat highlighting. every target reads this file:

  targets/hljs.js        highlight.js          (<write-code>, any hljs page)
  targets/monaco.js      monaco monarch        (zugriff/code)
  targets/codemirror.js  codemirror 6 stream   (acode)
  targets/textmate.js    textmate json         (vs code, shiki, github)
  zed/                   tree-sitter grammar   (zed). the only hand-written
                         target: tree-sitter is a parser, not a regex machine.
                         it still reads words and operators from here

the model is a stack of regions, the common ground of all regex based engines:

  state  { rules, end?, endToken?, eol?, scope?, embed? }
  rule   { match, token }           a token, the state stays
         { begin, token, state }    a token, then the named state is pushed
         { include }                the rules of another state, spliced in

a state is left when its `end` matches, or at the end of the line if `eol` is
set (a block head without { or :). `match`, `begin` and `end` are regex
sources (strings) or arrays of them; an array is a sequence of groups and its
token an array of the same length, one token per group.

token names are textmate scopes, the de facto standard. each target maps
them onto its own names by longest prefix (see targets/*.js).

regex rules, so every engine reads them the same way (js, oniguruma, monarch):
  - no named groups, no variable length lookbehind, no \p{…}
  - an array part must not match the empty string
  - a rule never matches what closes the state around it (`}`, `)`, `>`, quotes)
*/

// :::::: VOCABULARY

const words = {
  blocks    : ['await', 'case', 'catch', 'default', 'else', 'for', 'fragment', 'if', 'match', 'pending', 'var'],   // as @if, @for …
  constants : ['Infinity', 'NaN', 'false', 'null', 'true', 'undefined'],
  control   : ['await', 'break', 'case', 'catch', 'continue', 'default', 'do', 'else', 'finally', 'for', 'if', 'return', 'switch', 'throw', 'try', 'while', 'yield'],
  directives: ['bind', 'class', 'on', 'once', 'style', 'use'],                           // as on:click, bind:value, use:tooltip …
  keywords  : ['as', 'async', 'delete', 'export', 'extends', 'from', 'import', 'in', 'instanceof', 'is', 'new', 'of', 'typeof', 'void'],
  language  : ['props', 'super', 'this'],
  storage   : ['class', 'const', 'function', 'let', 'var'],
};

// longest first is done by the targets, order here is free
const operators = [
  '!', '!=', '!==', '%', '%=', '&', '&&', '&&=', '*', '**', '*=', '+', '++', '+=', '-', '--', '-=',
  '/', '/=', ':', '<', '<<', '<=', '=', '==', '===', '=>', '>', '>=', '>>', '>>>', '?', '??', '??=',
  '?.', '^', '|', '||', '||=', '~', '...',
];

const pipe  = '|>';
const apply = ['<|', '::'];   // two spellings of the same, to try out

// the tags whose templates are rat markup in .rat.js (compiler: TAGS, d-11)
const templateTags = ['html', 'htx', 'rat'];

const files = {
  rat   : { extensions: ['rat'],    name: 'RAT',    root: 'markup', scopeName: 'source.rat'    },
  ratjs : { extensions: ['rat.js'], name: 'RAT JS', root: 'script', scopeName: 'source.rat.js' },
};

// :::::: PATTERNS

const escape = string => string.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
const either = list => [...list].sort((a, b) => b.length - a.length).map(escape).join('|');
const word   = list => `(?<![\\w$.])(?:${either(list)})(?![\\w$])`;

const IDENT  = '[A-Za-z_$][\\w$]*';
const NUMBER = '(?<![\\w$])(?:0[xX][\\da-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\\d[\\d_]*(?:\\.\\d[\\d_]*)?(?:[eE][+-]?\\d+)?n?|\\.\\d[\\d_]*(?:[eE][+-]?\\d+)?)';

// :::::: STATES

const states = {

  // ::: markup (.rat root, html`…` templates)

  markup: { rules: [
    { begin: '<!--',                        token: 'comment.block',                state: 'markupComment' },
    { begin: ['<', 'script\\b[^>]*', '>'],  token: ['punctuation.definition.tag', 'entity.name.tag', 'punctuation.definition.tag'], state: 'scriptBlock' },
    { begin: ['<', 'style\\b[^>]*', '>'],   token: ['punctuation.definition.tag', 'entity.name.tag', 'punctuation.definition.tag'], state: 'styleBlock' },
    { match: ['</', '[A-Z][\\w$.]*', '>'],  token: ['punctuation.definition.tag', 'support.class.component', 'punctuation.definition.tag'] },
    { match: ['</', '[^>\\s]+', '>'],       token: ['punctuation.definition.tag', 'entity.name.tag', 'punctuation.definition.tag'] },
    { match: '</>',                         token: 'punctuation.definition.tag' },
    { begin: ['<', '[A-Z][\\w$.]*'],        token: ['punctuation.definition.tag', 'support.class.component'], state: 'tag' },
    { begin: ['<', '[a-z][\\w\\-:]*'],      token: ['punctuation.definition.tag', 'entity.name.tag'],         state: 'tag' },
    { begin: '<(?=[.#])',                   token: 'punctuation.definition.tag',   state: 'tag' },
    { begin: `@(?:else\\s+if|${either(words.blocks)})(?![\\w$])`, token: 'keyword.control.block', state: 'blockHead' },
    { begin: '\\{',                         token: 'punctuation.section.embedded', state: 'expression' },
    { match: '\\}',                         token: 'keyword.control.block' },
    { match: '&(?:[a-zA-Z]+|#\\d+|#x[\\da-fA-F]+);', token: 'constant.character.entity' },
  ]},

  markupComment: { end: '-->', endToken: 'comment.block', scope: 'comment.block', rules: [] },

  // @if (…) {   @if (…):   @if (…)⏎   the head ends where the body starts: {, : or the line end
  blockHead: { end: '\\{|:', endToken: 'keyword.control.block', eol: true, rules: [
    { begin: '\\(', token: 'punctuation.section.parens', state: 'parens' },
    { include: 'atoms' },
  ]},

  expression: { end: '\\}', endToken: 'punctuation.section.embedded', scope: 'meta.embedded.expression', rules: [
    { include: 'script' },
  ]},

  tag: { end: '/?>', endToken: 'punctuation.definition.tag', rules: [
    { match: '#[\\w-]+',  token: 'entity.other.attribute-name.id' },
    { match: '\\.[\\w-]+', token: 'entity.other.attribute-name.class' },
    { match: ['@[\\w-]+', ':', '[\\w-]+'], token: ['entity.name.function.behavior', 'punctuation.separator.directive', 'variable.parameter.behavior'] },
    { match: '@[\\w-]+',                   token: 'entity.name.function.behavior' },
    { match: [`(?:${either(words.directives)})`, ':', '[\\w\\-:]+'], token: ['keyword.other.directive', 'punctuation.separator.directive', 'entity.other.attribute-name'] },
    { match: '\\[[^\\]\\n]*\\]',            token: 'constant.other.key-filter' },
    { match: '!(?=[\\s=/>:])',             token: 'keyword.operator.modifier' },
    { match: '[^\\s=/>"\'{}|.#\\[!][^\\s=/>"\'{}|\\[!]*', token: 'entity.other.attribute-name' },
    { match: '\\|',                                token: 'punctuation.separator.group' },
    { match: '=',                                  token: 'punctuation.separator.key-value' },
    { begin: '\\{', token: 'punctuation.section.embedded', state: 'expression' },
    { begin: '"',   token: 'string.quoted.double',         state: 'attributeDouble' },
    { begin: "'",   token: 'string.quoted.single',         state: 'attributeSingle' },
  ]},

  attributeDouble: { end: '"', endToken: 'string.quoted.double', scope: 'string.quoted.double', rules: [
    { begin: '\\{', token: 'punctuation.section.embedded', state: 'expression' },
  ]},

  attributeSingle: { end: "'", endToken: 'string.quoted.single', scope: 'string.quoted.single', rules: [
    { begin: '\\{', token: 'punctuation.section.embedded', state: 'expression' },
  ]},

  scriptBlock: { end: ['</', 'script', '>'], endToken: ['punctuation.definition.tag', 'entity.name.tag', 'punctuation.definition.tag'], rules: [
    { include: 'script' },
  ]},

  // css is embedded where the engine can (hljs, monaco, textmate), the rules are the fallback
  styleBlock: { embed: 'css', end: ['</', 'style', '>'], endToken: ['punctuation.definition.tag', 'entity.name.tag', 'punctuation.definition.tag'], rules: [
    { include: 'css' },
  ]},

  // ::: script (.rat.js root, <script>, holes)

  script: { rules: [
    { match: '//.*',                 token: 'comment.line' },
    { begin: '/\\*',                 token: 'comment.block', state: 'blockComment' },
    { begin: [`(?<![\\w$.])(?:${either(templateTags)})`, '`'], token: ['entity.name.function.tagged-template', 'punctuation.definition.string.template'], state: 'markupTemplate' },
    { begin: '`',                    token: 'string.template', state: 'template' },
    { begin: '\\{',                  token: 'punctuation.section.braces', state: 'braces' },
    { begin: '\\(',                  token: 'punctuation.section.parens', state: 'parens' },
    { include: 'atoms' },
  ]},

  // everything that never opens a nested { or (
  atoms: { rules: [
    { begin: '"',                    token: 'string.quoted.double', state: 'stringDouble' },
    { begin: "'",                    token: 'string.quoted.single', state: 'stringSingle' },
    { match: NUMBER,                 token: 'constant.numeric' },
    // $theme! = …: kept beyond the page, the ! where a declaration goes on (=, not ==), ends or lists
    { match: [`(?<![\\w$])\\$[A-Za-z_][\\w$]*`, '!(?=\\s*(?:=(?!=)|[;,]|$))'], token: ['variable.other.reactive', 'keyword.operator.kept'] },
    { match: `(?<![\\w$])\\$[A-Za-z_][\\w$]*`, token: 'variable.other.reactive' },
    { match: word(words.constants),  token: 'constant.language' },
    { match: word(words.language),   token: 'variable.language' },
    { match: word(words.storage),    token: 'storage.type' },
    { match: word(words.control),    token: 'keyword.control' },
    { match: word(words.keywords),   token: 'keyword.other' },
    { match: `${IDENT}(?=\\s*\\()`,  token: 'entity.name.function' },
    { match: IDENT,                  token: 'variable.other' },
    { match: escape(pipe),           token: 'keyword.operator.pipe' },
    { match: either(apply),          token: 'keyword.operator.pipe' },
    { match: '(?<!\\.)\\.\\.(?!\\.)',     token: 'keyword.operator.range' },
    { match: '#(?![\\w$])',            token: 'variable.language.topic' },
    { match: either(operators),      token: 'keyword.operator' },
    { match: '[;,.\\[\\]]',          token: 'punctuation' },
  ]},

  braces : { end: '\\}', endToken: 'punctuation.section.braces', rules: [{ include: 'script' }] },
  parens : { end: '\\)', endToken: 'punctuation.section.parens', rules: [{ include: 'script' }] },

  blockComment: { end: '\\*/', endToken: 'comment.block', scope: 'comment.block', rules: [] },

  stringDouble: { end: '"', endToken: 'string.quoted.double', scope: 'string.quoted.double', rules: [
    { match: '\\\\.', token: 'constant.character.escape' },
  ]},

  stringSingle: { end: "'", endToken: 'string.quoted.single', scope: 'string.quoted.single', rules: [
    { match: '\\\\.', token: 'constant.character.escape' },
  ]},

  template: { end: '`', endToken: 'string.template', scope: 'string.template', rules: [
    { match: '\\\\.',  token: 'constant.character.escape' },
    { begin: '\\$\\{', token: 'punctuation.definition.template-expression', state: 'interpolation' },
  ]},

  interpolation: { end: '\\}', endToken: 'punctuation.definition.template-expression', scope: 'meta.template.expression', rules: [
    { include: 'script' },
  ]},

  // html`…` is rat markup. ${…} still works, for vanilla htx
  markupTemplate: { end: '`', endToken: 'punctuation.definition.string.template', scope: 'meta.embedded.markup', rules: [
    { begin: '\\$\\{', token: 'punctuation.definition.template-expression', state: 'interpolation' },
    { include: 'markup' },
  ]},

  // ::: css (fallback for engines without embedding)

  css: { rules: [
    { begin: '/\\*',                       token: 'comment.block',        state: 'blockComment' },
    { begin: '"',                          token: 'string.quoted.double', state: 'stringDouble' },
    { begin: "'",                          token: 'string.quoted.single', state: 'stringSingle' },
    { match: '@[\\w-]+',                   token: 'keyword.control.at-rule' },
    { match: '--[\\w-]+',                  token: 'variable.other.custom-property' },
    { match: '#[\\da-fA-F]{3,8}(?![\\w-])', token: 'constant.other.color' },
    { match: '-?(?:\\d*\\.)?\\d+(?:%|[a-zA-Z]+)?', token: 'constant.numeric' },
    { match: '[a-zA-Z-]+(?=\\s*:[^:{;]*;)', token: 'support.type.property-name' },
    { match: '\\.[\\w-]+',                 token: 'entity.other.attribute-name.class' },
    { match: '[\\w-]+(?=\\()',             token: 'support.function' },
    { match: '[{}();:,>+~*]',              token: 'punctuation' },
  ]},
};

export { apply, either, escape, files, operators, pipe, states, templateTags, words };
export default { apply, files, operators, pipe, states, templateTags, words };
