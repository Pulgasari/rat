(() => {
  // spec.js
  var words = {
    blocks: ["case", "default", "else", "for", "if", "switch"],
    // as @if, @for …
    constants: ["Infinity", "NaN", "false", "null", "true", "undefined"],
    control: ["await", "break", "case", "catch", "continue", "default", "do", "else", "finally", "for", "if", "return", "switch", "throw", "try", "while", "yield"],
    directives: ["bind", "class", "on", "style"],
    // as on:click, bind:value …
    keywords: ["as", "async", "delete", "export", "extends", "from", "import", "in", "instanceof", "new", "of", "typeof", "void"],
    language: ["props", "super", "this"],
    storage: ["class", "const", "function", "let", "var"]
  };
  var operators = [
    "!",
    "!=",
    "!==",
    "%",
    "%=",
    "&",
    "&&",
    "&&=",
    "*",
    "**",
    "*=",
    "+",
    "++",
    "+=",
    "-",
    "--",
    "-=",
    "/",
    "/=",
    ":",
    "<",
    "<<",
    "<=",
    "=",
    "==",
    "===",
    "=>",
    ">",
    ">=",
    ">>",
    ">>>",
    "?",
    "??",
    "??=",
    "?.",
    "^",
    "|",
    "||",
    "||=",
    "~",
    "..."
  ];
  var pipe = "|>";
  var files = {
    rat: { extensions: ["rat"], name: "RAT", root: "markup", scopeName: "source.rat" },
    ratjs: { extensions: ["rat.js"], name: "RAT JS", root: "script", scopeName: "source.rat.js" }
  };
  var escape = (string) => string.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&");
  var either = (list) => [...list].sort((a, b) => b.length - a.length).map(escape).join("|");
  var word = (list) => `(?<![\\w$.])(?:${either(list)})(?![\\w$])`;
  var IDENT = "[A-Za-z_$][\\w$]*";
  var NUMBER = "(?<![\\w$])(?:0[xX][\\da-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\\d[\\d_]*(?:\\.\\d[\\d_]*)?(?:[eE][+-]?\\d+)?n?|\\.\\d[\\d_]*(?:[eE][+-]?\\d+)?)";
  var states = {
    // ::: markup (.rat root, html`…` templates)
    markup: { rules: [
      { begin: "<!--", token: "comment.block", state: "markupComment" },
      { begin: ["<", "script\\b[^>]*", ">"], token: ["punctuation.definition.tag", "entity.name.tag", "punctuation.definition.tag"], state: "scriptBlock" },
      { begin: ["<", "style\\b[^>]*", ">"], token: ["punctuation.definition.tag", "entity.name.tag", "punctuation.definition.tag"], state: "styleBlock" },
      { match: ["</", "[A-Z][\\w$.]*", ">"], token: ["punctuation.definition.tag", "support.class.component", "punctuation.definition.tag"] },
      { match: ["</", "[^>\\s]+", ">"], token: ["punctuation.definition.tag", "entity.name.tag", "punctuation.definition.tag"] },
      { match: "</>", token: "punctuation.definition.tag" },
      { begin: ["<", "[A-Z][\\w$.]*"], token: ["punctuation.definition.tag", "support.class.component"], state: "tag" },
      { begin: ["<", "[a-z][\\w\\-:]*"], token: ["punctuation.definition.tag", "entity.name.tag"], state: "tag" },
      { begin: "<(?=[.#])", token: "punctuation.definition.tag", state: "tag" },
      { begin: `@(?:else\\s+if|${either(words.blocks)})(?![\\w$])`, token: "keyword.control.block", state: "blockHead" },
      { begin: "\\{", token: "punctuation.section.embedded", state: "expression" },
      { match: "\\}", token: "keyword.control.block" },
      { match: "&(?:[a-zA-Z]+|#\\d+|#x[\\da-fA-F]+);", token: "constant.character.entity" }
    ] },
    markupComment: { end: "-->", endToken: "comment.block", scope: "comment.block", rules: [] },
    // @if (…) {   @for (…) {   @case 'x' {   @else {   the { opens the markup body
    blockHead: { end: "\\{", endToken: "keyword.control.block", rules: [
      { begin: "\\(", token: "punctuation.section.parens", state: "parens" },
      { include: "atoms" }
    ] },
    expression: { end: "\\}", endToken: "punctuation.section.embedded", scope: "meta.embedded.expression", rules: [
      { include: "script" }
    ] },
    tag: { end: "/?>", endToken: "punctuation.definition.tag", rules: [
      { match: "#[\\w-]+", token: "entity.other.attribute-name.id" },
      { match: "\\.[\\w-]+", token: "entity.other.attribute-name.class" },
      { match: `@(?:${either(["for", "if"])})(?![\\w$])`, token: "keyword.control.block" },
      { match: [`(?:${either(words.directives)})`, ":", "[\\w\\-:]+"], token: ["keyword.other.directive", "punctuation.separator.directive", "entity.other.attribute-name"] },
      { match: `[^\\s=/>"'{}|.#][^\\s=/>"'{}|]*`, token: "entity.other.attribute-name" },
      { match: "\\|", token: "punctuation.separator.group" },
      { match: "=", token: "punctuation.separator.key-value" },
      { begin: "\\{", token: "punctuation.section.embedded", state: "expression" },
      { begin: '"', token: "string.quoted.double", state: "attributeDouble" },
      { begin: "'", token: "string.quoted.single", state: "attributeSingle" }
    ] },
    attributeDouble: { end: '"', endToken: "string.quoted.double", scope: "string.quoted.double", rules: [
      { begin: "\\{", token: "punctuation.section.embedded", state: "expression" }
    ] },
    attributeSingle: { end: "'", endToken: "string.quoted.single", scope: "string.quoted.single", rules: [
      { begin: "\\{", token: "punctuation.section.embedded", state: "expression" }
    ] },
    scriptBlock: { end: ["</", "script", ">"], endToken: ["punctuation.definition.tag", "entity.name.tag", "punctuation.definition.tag"], rules: [
      { include: "script" }
    ] },
    // css is embedded where the engine can (hljs, monaco, textmate), the rules are the fallback
    styleBlock: { embed: "css", end: ["</", "style", ">"], endToken: ["punctuation.definition.tag", "entity.name.tag", "punctuation.definition.tag"], rules: [
      { include: "css" }
    ] },
    // ::: script (.rat.js root, <script>, holes)
    script: { rules: [
      { match: "//.*", token: "comment.line" },
      { begin: "/\\*", token: "comment.block", state: "blockComment" },
      { begin: ["html", "`"], token: ["entity.name.function.tagged-template", "punctuation.definition.string.template"], state: "markupTemplate" },
      { begin: "`", token: "string.template", state: "template" },
      { begin: "\\{", token: "punctuation.section.braces", state: "braces" },
      { begin: "\\(", token: "punctuation.section.parens", state: "parens" },
      { include: "atoms" }
    ] },
    // everything that never opens a nested { or (
    atoms: { rules: [
      { begin: '"', token: "string.quoted.double", state: "stringDouble" },
      { begin: "'", token: "string.quoted.single", state: "stringSingle" },
      { match: NUMBER, token: "constant.numeric" },
      { match: `(?<![\\w$])\\$[A-Za-z_][\\w$]*`, token: "variable.other.reactive" },
      { match: word(words.constants), token: "constant.language" },
      { match: word(words.language), token: "variable.language" },
      { match: word(words.storage), token: "storage.type" },
      { match: word(words.control), token: "keyword.control" },
      { match: word(words.keywords), token: "keyword.other" },
      { match: `${IDENT}(?=\\s*\\()`, token: "entity.name.function" },
      { match: IDENT, token: "variable.other" },
      { match: escape(pipe), token: "keyword.operator.pipe" },
      { match: either(operators), token: "keyword.operator" },
      { match: "[;,.\\[\\]]", token: "punctuation" }
    ] },
    braces: { end: "\\}", endToken: "punctuation.section.braces", rules: [{ include: "script" }] },
    parens: { end: "\\)", endToken: "punctuation.section.parens", rules: [{ include: "script" }] },
    blockComment: { end: "\\*/", endToken: "comment.block", scope: "comment.block", rules: [] },
    stringDouble: { end: '"', endToken: "string.quoted.double", scope: "string.quoted.double", rules: [
      { match: "\\\\.", token: "constant.character.escape" }
    ] },
    stringSingle: { end: "'", endToken: "string.quoted.single", scope: "string.quoted.single", rules: [
      { match: "\\\\.", token: "constant.character.escape" }
    ] },
    template: { end: "`", endToken: "string.template", scope: "string.template", rules: [
      { match: "\\\\.", token: "constant.character.escape" },
      { begin: "\\$\\{", token: "punctuation.definition.template-expression", state: "interpolation" }
    ] },
    interpolation: { end: "\\}", endToken: "punctuation.definition.template-expression", scope: "meta.template.expression", rules: [
      { include: "script" }
    ] },
    // html`…` is rat markup. ${…} still works, for vanilla htx
    markupTemplate: { end: "`", endToken: "punctuation.definition.string.template", scope: "meta.embedded.markup", rules: [
      { begin: "\\$\\{", token: "punctuation.definition.template-expression", state: "interpolation" },
      { include: "markup" }
    ] },
    // ::: css (fallback for engines without embedding)
    css: { rules: [
      { begin: "/\\*", token: "comment.block", state: "blockComment" },
      { begin: '"', token: "string.quoted.double", state: "stringDouble" },
      { begin: "'", token: "string.quoted.single", state: "stringSingle" },
      { match: "@[\\w-]+", token: "keyword.control.at-rule" },
      { match: "--[\\w-]+", token: "variable.other.custom-property" },
      { match: "#[\\da-fA-F]{3,8}(?![\\w-])", token: "constant.other.color" },
      { match: "-?(?:\\d*\\.)?\\d+(?:%|[a-zA-Z]+)?", token: "constant.numeric" },
      { match: "[a-zA-Z-]+(?=\\s*:[^:{;]*;)", token: "support.type.property-name" },
      { match: "\\.[\\w-]+", token: "entity.other.attribute-name.class" },
      { match: "[\\w-]+(?=\\()", token: "support.function" },
      { match: "[{}();:,>+~*]", token: "punctuation" }
    ] }
  };

  // engine.js
  var source = (pattern) => Array.isArray(pattern) ? pattern.map((part) => `(${part})`).join("") : pattern;
  var tokens = (token) => Array.isArray(token) ? token : [token];
  function flatten(name, seen = /* @__PURE__ */ new Set()) {
    if (seen.has(name)) return [];
    seen.add(name);
    const state = states[name];
    if (!state) throw new Error(`[rat/syntax] unknown state "${name}"`);
    return state.rules.flatMap((rule) => rule.include ? flatten(rule.include, seen) : [rule]);
  }
  function mapper(table) {
    const keys = Object.keys(table).sort((a, b) => b.length - a.length);
    const cache = /* @__PURE__ */ new Map();
    return (scope) => {
      if (scope == null) return null;
      if (cache.has(scope)) return cache.get(scope);
      const key = keys.find((key2) => scope === key2 || scope.startsWith(`${key2}.`));
      const value = key === void 0 ? null : table[key];
      cache.set(scope, value);
      return value;
    };
  }

  // targets/codemirror.js
  var tag = mapper({
    "comment": "comment",
    "constant.character.entity": "character",
    "constant.character.escape": "escape",
    "constant.language": "atom",
    "constant.numeric": "number",
    "constant.other.color": "color",
    "entity.name.function": "variableName.function",
    "entity.name.function.tagged-template": "macroName",
    "entity.name.tag": "tagName",
    "entity.other.attribute-name": "attributeName",
    "entity.other.attribute-name.class": "className",
    "entity.other.attribute-name.id": "labelName",
    "keyword": "keyword",
    "keyword.control": "controlKeyword",
    "keyword.control.block": "controlKeyword.special",
    "keyword.operator": "operator",
    "keyword.operator.pipe": "operatorKeyword",
    "keyword.other.directive": "modifier",
    "punctuation": "punctuation",
    "punctuation.definition.tag": "angleBracket",
    "punctuation.definition.template-expression": "brace.special",
    "punctuation.section": "bracket",
    "punctuation.section.embedded": "brace.special",
    "storage.type": "definitionKeyword",
    "string": "string",
    "support.class.component": "typeName",
    "support.function": "variableName.standard",
    "support.type.property-name": "propertyName",
    "variable.language": "self",
    "variable.other": "variableName",
    "variable.other.custom-property": "propertyName.special",
    "variable.other.reactive": "variableName.special"
  });
  function compile(pattern, scope) {
    const groups = Array.isArray(pattern);
    return {
      groups,
      regex: new RegExp(source(pattern), groups ? "yd" : "y"),
      tokens: tokens(scope).map(tag)
    };
  }
  var machine = Object.fromEntries(Object.keys(states).map((name) => {
    const state = states[name];
    return [name, {
      end: state.end ? compile(state.end, state.endToken) : null,
      rules: flatten(name).map((rule) => rule.match ? compile(rule.match, rule.token) : { ...compile(rule.begin, rule.token), push: rule.state }),
      scope: tag(state.scope)
    }];
  }));
  function emit(stream, state, rule, match) {
    if (!rule.groups) {
      stream.pos += match[0].length;
      return rule.tokens[0];
    }
    const parts = match.indices.slice(1).map(([start, end], index) => ({ end, start, token: rule.tokens[index] ?? null })).filter((part) => part.end > part.start);
    const [first, ...rest] = parts;
    state.queue.push(...rest.map(({ end, token }) => [end, token]));
    stream.pos = first.end;
    return first.token;
  }
  function attempt(stream, rule) {
    if (!rule) return null;
    rule.regex.lastIndex = stream.pos;
    const match = rule.regex.exec(stream.string);
    return match && match[0].length ? match : null;
  }
  function parser(language) {
    const root = files[language].root;
    return {
      name: language,
      startState: () => ({ queue: [], stack: [root] }),
      copyState: (state) => ({ queue: state.queue.map((item) => [...item]), stack: [...state.stack] }),
      token(stream, state) {
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
        do
          stream.next();
        while (stream.pos < stream.string.length && !attempt(stream, current.end) && !current.rules.some((rule) => attempt(stream, rule)));
        return current.scope;
      },
      languageData: {
        closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
        commentTokens: language === "rat" ? { block: { close: "-->", open: "<!--" } } : { block: { close: "*/", open: "/*" }, line: "//" }
      }
    };
  }

  // acode/main.src.js
  var ID = "dev.pulgasari.rat";
  var { StreamLanguage } = acode.require("@codemirror/language");
  var languages = acode.require("editorLanguages");
  acode.setPluginInit(ID, () => {
    for (const [id, { extensions, name }] of Object.entries(files)) {
      languages.register(id, extensions.join("|"), name, () => StreamLanguage.define(parser(id)));
    }
  });
  acode.setPluginUnmount(ID, () => {
    for (const id of Object.keys(files)) languages.unregister(id);
  });
})();
