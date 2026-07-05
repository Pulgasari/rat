; === BASIS JAVASCRIPT HIGHLIGHTS ===
(boolean) @constant.builtin
(comment) @comment
(number)  @number
(string)  @string

"const"  @keyword
"else"   @keyword
"if"     @keyword
"let"    @keyword
"return" @keyword
"var"    @keyword

(property_identifier) @property
(method_definition name: (property_identifier) @function)
(call_expression function: (identifier) @function)
(call_expression function: (member_expression property: (property_identifier) @function))

; === RATSCRIPT CUSTOM KEYWORDS ===
"cond"   @keyword
"effect" @keyword
"from"   @keyword
"signal" @keyword
"match"  @keyword
"do"     @keyword
"is"     @keyword
"or"     @keyword
"use"    @keyword


; Detects Variables starting with $
((identifier) @variable.special
 (#match? @variable.special "^\\$.+"))


; Färbe den Pipe-Operator als Operator ein
"|>" @operator

; Färbe das Platzhalter-Symbol # als Spezial-Konstante ein
"#" @constant.builtin
