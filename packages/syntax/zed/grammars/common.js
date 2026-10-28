// @rat/syntax :: tree-sitter (shared by grammars/rat and grammars/ratjs)

/*
a highlighting grammar, not a parser of the language: markup is a flat stream
of tags, holes and text, script is a "token soup" with balanced brackets. no
statement structure, so unfinished code never breaks the rest of the file.

words and operators come from spec.js through vocabulary.json (written by
build.js). both grammars share every rule and differ only in source_file.
*/

import vocabulary from './vocabulary.json' with { type: 'json' };

const markup = (text) => $ => choice(
  $.html_comment,
  $.script_element,
  $.style_element,
  $.start_tag,
  $.end_tag,
  $.block_head,
  $.block_close,
  $.expression,
  $.entity,
  text($),
);

export default function define (name, root) {
  return grammar({
    name,

    extras : $ => [/\s/],
    word   : $ => $.identifier,

    rules: {
      source_file: root,

      // ::: markup

      _markup          : markup($ => $.text),
      _template_markup : $ => choice(markup($ => $.template_text)($), $.template_substitution),

      text          : $ => token(choice(/[^<{}@&:\s][^<{}@&]*/, /[@&:]/)),
      template_text : $ => token(choice(/[^<{}@&:`$\s][^<{}@&`$]*/, /[@&:$]/)),
      entity        : $ => /&(#\d+|#x[0-9a-fA-F]+|[a-zA-Z]+);/,
      html_comment  : $ => token(seq('<!--', /([^-]|-[^-]|--[^>])*/, '-->')),

      script_element : $ => seq(
        alias(token('<script'), $.script_start),
        optional(alias(/[^>\s][^>]*/, $.raw_attributes)),
        '>',
        repeat($._script),
        alias(token('</script>'), $.script_end),
      ),

      style_element : $ => seq(
        alias(token('<style'), $.style_start),
        optional(alias(/[^>\s][^>]*/, $.raw_attributes)),
        '>',
        repeat($.style_text),
        alias(token('</style>'), $.style_end),
      ),

      style_text : $ => choice(/[^<]+/, '<'),

      start_tag : $ => seq(
        '<',
        choice(seq(choice($.tag_name, $.component_name), repeat($._selector)), repeat1($._selector)),
        repeat(choice($.attribute, $.expression)),
        choice('>', '/>'),
      ),

      end_tag : $ => seq('</', repeat(choice($.tag_name, $.component_name, $._selector)), '>'),

      tag_name       : $ => /[a-z][\w\-:]*/,
      component_name : $ => /[A-Z][\w$.]*/,
      _selector      : $ => choice($.selector_id, $.selector_class),
      selector_id    : $ => /#[\w-]+/,
      selector_class : $ => /\.[\w-]+/,

      attribute : $ => seq(
        $.attribute_name,
        repeat(seq('|', $.attribute_name)),
        optional(seq('=', choice($.attribute_string, $.expression, $.attribute_value))),
      ),

      // a [ … ] key filter (on:keydown[ctrl+c|space+a]) is part of the name, | included
      attribute_name  : $ => /([^\s=\/>"'{}|.#\[]|\[[^\]\n]*\])([^\s=\/>"'{}|\[]|\[[^\]\n]*\])*/,
      attribute_value : $ => /[^\s>"'{}]+/,

      attribute_string : $ => choice(
        seq('"', repeat(choice(alias(/[^"{]+/, $.string_fragment), $.expression)), '"'),
        seq("'", repeat(choice(alias(/[^'{]+/, $.string_fragment), $.expression)), "'"),
      ),

      /*
      @if (…) {   @if (…):   @if (…)⏎   the head ends with { or :, or just stops (indented body).
      the lexer takes the longest valid token, and text is valid wherever a head may end, so
      every head must be complete before it can end: ( … ) after @if/@for/@match, one value
      after @case. a : never starts text, so `@if (…): …` reads the : as part of the head
      */
      block_head : $ => prec.right(choice(
        seq(alias(token(/@(if|for|match|else[ \t]+if)/), $.block_keyword), $.parens, optional($._body_open)),
        seq(alias(token('@case'), $.block_keyword), $._case_value, optional($._body_open)),
        seq(alias(token(/@(else|default)/), $.block_keyword), optional($._body_open)),
      )),

      _body_open  : $ => choice('{', ':'),
      _case_value : $ => choice($.parens, $.string, $.template_string, $.number, $.reactive_identifier, $.identifier, $._word),
      block_close : $ => '}',

      expression : $ => seq('{', repeat($._script), '}'),

      // ::: script

      _script : $ => choice(
        $.line_comment,
        $.block_comment,
        $.html_template,
        $.template_string,
        $.braces,
        $.parens,
        $.brackets,
        $.string,
        $.number,
        $.kept_identifier,
        $.reactive_identifier,
        $.identifier,
        $._word,
        $.pipe_operator,
        $.range_operator,
        $.topic,
        $.operator,
        $.punctuation,
      ),

      _word : $ => choice($.constant, $.control_keyword, $.keyword, $.language_variable, $.storage_keyword),

      braces   : $ => seq('{', repeat($._script), '}'),
      brackets : $ => seq('[', repeat($._script), ']'),
      parens   : $ => seq('(', repeat($._script), ')'),

      line_comment  : $ => token(seq('//', /.*/)),
      block_comment : $ => token(seq('/*', /[^*]*\*+([^\/*][^*]*\*+)*/, '/')),

      string : $ => token(choice(
        seq('"', /([^"\\\n]|\\.)*/, '"'),
        seq("'", /([^'\\\n]|\\.)*/, "'"),
      )),

      template_string       : $ => seq('`', repeat(choice($.template_chars, $.escape_sequence, $.template_substitution)), '`'),
      template_chars        : $ => token(choice(/[^`$\\]+/, '$')),
      escape_sequence       : $ => /\\./,
      template_substitution : $ => seq('${', repeat($._script), '}'),

      // html`…`, htx`…`, rat`…` are rat markup
      html_template : $ => seq(alias(token(choice(...vocabulary.templateTags.map(tag => `${tag}\``))), $.template_tag), repeat($._template_markup), '`'),

      number : $ => /0[xX][\da-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(\.\d[\d_]*)?([eE][+-]?\d+)?n?|\.\d[\d_]*([eE][+-]?\d+)?/,

      reactive_identifier : $ => token(prec(1, /\$[A-Za-z_][\w$]*/)),
      // $theme! = …: kept beyond the page. a ! right after the name, != stays the operator (the longer token)
      kept_identifier     : $ => prec(1, seq($.reactive_identifier, alias(token.immediate('!'), $.kept_marker))),
      identifier          : $ => /[A-Za-z_$][\w$]*/,

      constant          : $ => choice(...vocabulary.constants),
      control_keyword   : $ => choice(...vocabulary.control),
      keyword           : $ => choice(...vocabulary.keywords),
      language_variable : $ => choice(...vocabulary.language),
      storage_keyword   : $ => choice(...vocabulary.storage),

      pipe_operator  : $ => vocabulary.pipe,
      range_operator : $ => '..',
      topic          : $ => '#',
      operator      : $ => choice(...vocabulary.operators),
      punctuation   : $ => choice(';', ',', '.'),
    },
  });
}
