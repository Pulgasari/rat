; @rat/syntax :: zed highlights, shared by rat and ratjs (same node names).
; zed lets later patterns win: generic first, specific after

(identifier) @variable

; ::: markup

(html_comment) @comment

(tag_name) @tag
(component_name) @type
[(script_start) (script_end) (style_start) (style_end)] @tag
(raw_attributes) @attribute
(selector_id) @attribute
(selector_class) @attribute
(attribute_name) @attribute
((attribute_name) @keyword
  (#match? @keyword "^(on|bind|class|style|use):"))
((attribute_name) @function
  (#match? @function "^@"))
(attribute_value) @string
(attribute_string) @string
(entity) @string.special

(start_tag ["<" ">" "/>"] @punctuation.bracket)
(end_tag ["</" ">"] @punctuation.bracket)
(script_element ">" @punctuation.bracket)
(style_element ">" @punctuation.bracket)
(attribute ["=" "|"] @punctuation.delimiter)

(block_keyword) @keyword
(block_head ["{" ":"] @keyword)
(block_close) @keyword
(expression ["{" "}"] @punctuation.special)

; ::: script

[(line_comment) (block_comment)] @comment

(string) @string
(template_string) @string
(template_chars) @string
(escape_sequence) @string.escape
(template_substitution ["${" "}"] @punctuation.special)
(template_tag) @function
(html_template "`" @punctuation.special)

(number) @number
(constant) @constant.builtin
(language_variable) @variable.special
(reactive_identifier) @variable.special
(kept_marker) @keyword

[(control_keyword) (storage_keyword) (keyword)] @keyword
[(pipe_operator) (range_operator) (operator)] @operator
(topic) @variable.special
(punctuation) @punctuation.delimiter

(braces ["{" "}"] @punctuation.bracket)
(brackets ["[" "]"] @punctuation.bracket)
(parens ["(" ")"] @punctuation.bracket)

(_ (identifier) @function . (parens))
