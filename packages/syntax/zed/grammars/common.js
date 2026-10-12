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

      text          : $ => token(choice(/[^<{}@&\s][^<{}@&]*/, /[@&]/)),
      template_text : $ => token(choice(/[^<{}@&`$\s][^<{}@&`$]*/, /[@&$]/)),
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

      attribute_name  : $ => /[^\s=\/>"'{}|.#][^\s=\/>"'{}|]*/,
      attribute_value : $ => /[^\s>"'{}]+/,

      attribute_string : $ => choice(
        seq('"', repeat(choice(alias(/[^"{]+/, $.string_fragment), $.expression)), '"'),
        seq("'", repeat(choice(alias(/[^'{]+/, $.string_fragment), $.expression)), "'"),
      ),

      // @if (…) {   @else {   @case 'x' {   the { opens the markup body, } closes it
      block_head    : $ => seq($.block_keyword, repeat($._head), '{'),
      block_keyword : $ => /@(else[ \t]+if|if|for|switch|case|else|default)/,
      block_close   : $ => '}',

      _head : $ => choice($.parens, $.string, $.template_string, $.number, $.reactive_identifier, $.identifier, $._word, $.pipe_operator, $.operator, $.punctuation),

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
        $.reactive_identifier,
        $.identifier,
        $._word,
        $.pipe_operator,
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

      // html`…` is rat markup
      html_template : $ => seq(alias(token('html`'), $.template_tag), repeat($._template_markup), '`'),

      number : $ => /0[xX][\da-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(\.\d[\d_]*)?([eE][+-]?\d+)?n?|\.\d[\d_]*([eE][+-]?\d+)?/,

      reactive_identifier : $ => token(prec(1, /\$[A-Za-z_][\w$]*/)),
      identifier          : $ => /[A-Za-z_$][\w$]*/,

      constant          : $ => choice(...vocabulary.constants),
      control_keyword   : $ => choice(...vocabulary.control),
      keyword           : $ => choice(...vocabulary.keywords),
      language_variable : $ => choice(...vocabulary.language),
      storage_keyword   : $ => choice(...vocabulary.storage),

      pipe_operator : $ => vocabulary.pipe,
      operator      : $ => choice(...vocabulary.operators),
      punctuation   : $ => choice(';', ',', '.'),
    },
  });
}
