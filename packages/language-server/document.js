// @rat/language-server :: document

/*
one analysis per document version, shared by every feature:

  kind        'rat' or 'ratjs'
  ast         the markup of a .rat (tolerant parse), templates for a .rat.js
  errors      parse errors and warnings of the markup
  segments    every piece of javascript: scripts, holes, block heads, the file of a .rat.js
  holes       the {…} of the markup with their braces, for the element analysis
  styles      the content of every <style>
  signals     the $ declarations
  occurrences every $name read or written, declarations included
  unknown     $names in the markup that no script declares
  functions   function names in the scripts (behaviors)

the virtual texts keep every offset of the source: what is not css (or js)
becomes spaces, newlines stay. so a css or typescript service answers in
the coordinates of the .rat file and nothing has to be mapped.
*/

import { tokenizer } from 'acorn';

import { declared, parse } from '@rat/compiler';

const ACORN = { ecmaVersion: 'latest', sourceType: 'module' };

const isRatJs = uri => uri.endsWith('.rat.js');

// acorn tokens of a piece of code, # masked like the compiler does; [] if it does not tokenize
function tokensOf (code) {
  const out = [];
  try { for (const token of tokenizer(code.replace(/#(?![\w$\\])/g, '_'), ACORN)) out.push(token); }
  catch {}
  return out;
}

// :::::: WALK

function* nodesOf (children) {
  for (const node of children ?? []) {
    yield node;
    if (node.type === 'Element') yield* nodesOf(node.children);
    if (node.type === 'If') { for (const branch of node.branches) yield* nodesOf(branch.children); yield* nodesOf(node.fallback); }
    if (node.type === 'For') { yield* nodesOf(node.children); yield* nodesOf(node.fallback); }
    if (node.type === 'Switch') { for (const branch of node.cases) yield* nodesOf(branch.children); yield* nodesOf(node.fallback); }
  }
}

// the {…} around an expression: the brace before its code and the one after
function bracesOf (text, { start, end }, open = '{', close = '}') {
  let from = start - 1;
  while (from >= 0 && /\s/.test(text[from])) from--;
  let to = end;
  while (to < text.length && /\s/.test(text[to])) to++;
  return text[from] === open && text[to] === close ? { end: to + 1, start: from } : null;
}

// javascript segments, markup holes and component tags of a parsed markup
function collect (text, ast, { components, holes, segments }) {
  const add = (expression, kind, open, close) => {
    if (!expression?.code && expression?.code !== '') return;
    segments.push({ code: expression.code, end: expression.end, kind, start: expression.start });
    const braces = bracesOf(text, expression, open, close);
    if (braces) holes.push({ ...braces, code: expression, kind });
  };

  for (const node of nodesOf(ast.children)) {
    if (node.type === 'Expression') add(node, 'hole');
    if (node.type === 'Element') {
      if (node.component) components.push({ end: node.name.end, name: node.tag, start: node.name.start });
      for (const attribute of node.attributes) {
        if (attribute.type === 'Spread') { add(attribute, 'spread'); continue; }
        if (attribute.value.kind === 'expression') add(attribute.value, 'attribute');
        if (attribute.value.kind === 'template') for (const part of attribute.value.parts) if (typeof part !== 'string') add(part, 'attribute');
      }
    }
    if (node.type === 'If') for (const branch of node.branches) add(branch.test, 'head', '(', ')');
    if (node.type === 'For') { add(node.list, 'list'); if (node.head) { const braces = bracesOf(text, node.head, '(', ')'); if (braces) holes.push({ ...braces, code: { ...node.head, list: node.list }, kind: 'head', node }); } }
    if (node.type === 'Switch') {
      add(node.subject, 'head', '(', ')');
      for (const branch of node.cases) { segments.push({ ...branch.test, kind: 'case' }); holes.push({ code: branch.test, end: branch.test.end, kind: 'case', start: branch.test.start }); }
    }
  }
}

// html`…`, htx`…`, rat`…` without holes of their own: rat markup inside a .rat.js
function templatesOf (text) {
  const list = tokensOf(text);
  const out  = [];
  for (let index = 0; index + 3 < list.length; index++) {
    const [tag, open, body, close] = list.slice(index, index + 4);
    if (tag.type.label !== 'name' || !['html', 'htx', 'rat'].includes(tag.value)) continue;
    if (open.type.label !== '`') continue;
    if (body.type.label === '`') continue;                      // html`` empty
    if (body.type.label !== 'template' || close.type.label !== '`') continue;
    out.push({ end: close.start, start: open.end, tag: { end: tag.end, start: tag.start } });
    index += 3;
  }
  return out;
}

// :::::: VIRTUAL TEXTS

const blank = text => text.replace(/[^\n]/g, ' ');

function cssText (text, styles) {
  const out = blank(text).split('');
  for (const style of styles) for (let at = style.start; at < style.end; at++) out[at] = text[at];
  return out.join('');
}

/*
the javascript of a document at its own offsets:
  .rat      scripts as they are, every markup expression as a statement: { $x } -> ; $x ;
            an @for becomes a loop around its body, so the item is in scope there:
            @for (todo of $todos) { … } -> for(let todo of $todos){ … }
            a component tag is a statement of its name, so typescript knows where it comes from
  .rat.js   the file as it is, a markup template as a call: html`…{a}…{b}…` -> html( a, b, )
the scripts of a .rat are a component body: props and children are declared at the end, and a
default export, so an import of the .rat resolves
*/
function jsText (text, model) {
  const out   = blank(text).split('');
  const taken = new Uint8Array(text.length);   // positions written, a later write must not land there
  const copy  = (start, end) => { for (let at = start; at < end; at++) { out[at] = text[at]; taken[at] = 1; } };
  // newlines always stay: the lines of the js text are those of the source
  const put   = (at, char) => { if (at >= 0 && at < out.length && !taken[at] && out[at] !== '\n') { out[at] = char; taken[at] = 1; return true; } return false; };
  const write = (at, string) => { for (let index = 0; index < string.length; index++) put(at + index, string[index]); };
  const free  = (start, end) => { for (let at = start; at < end; at++) if (at < 0 || taken[at] || text[at] === '\n') return false; return true; };

  const separator = model.kind === 'rat' ? ';' : ',';
  const lead      = model.kind === 'rat';   // a statement needs a ; before it, an argument only a , after it
  const loops     = [];

  if (model.kind === 'rat') for (const segment of model.segments) if (segment.kind === 'script' || segment.kind === 'module') copy(segment.start, segment.end);

  if (model.kind === 'ratjs') {
    copy(0, text.length);
    for (const template of model.templates) {
      for (let at = template.start; at < template.end; at++) { taken[at] = 0; if (out[at] !== '\n') out[at] = ' '; }
      put(template.start - 1, '(');
      put(template.end, ')');
    }
  }

  for (const hole of model.holes) {
    const { code } = hole;

    if (hole.kind === 'case') {
      if (lead) put(code.start - 1, separator);
      copy(code.start, code.end);
      put(code.end, separator);
      continue;
    }

    // @for (item of list) as a loop: "for(let " before the item fits where "@for (" and two
    // characters of indentation were. a newline before it ends the statement above
    const node = hole.node;
    if (hole.kind === 'head' && node && lead && free(code.start - 8, code.start)) {
      const item = node.item;
      const of   = text.indexOf('of', code.start + item.length);
      write(code.start - 8, 'for(let ');
      copy(code.start, code.start + item.length);
      copy(of, of + 2);
      copy(code.list.start, code.list.end);
      put(hole.end - 1, ')');
      loops.push({ end: node.elseAt ? node.elseAt - 5 : node.end, open: hole.end });
      continue;
    }

    // (condition) stays in parens; a @for head is "item of list", only the list is an expression
    if (hole.kind === 'head') {
      if (lead) put(hole.start - 1, separator);
      put(hole.start, '(');
      if (code.list) copy(code.list.start, code.list.end);
      else copy(code.start, code.end);
      put(hole.end - 1, ')');
      put(hole.end, separator);
      continue;
    }

    put(hole.start, lead ? separator : ' ');
    copy(code.start, code.end);
    put(hole.end - 1, separator);
  }

  // a component tag: its name as a statement (an argument in a .rat.js)
  for (const component of model.components) {
    if (lead) put(component.start - 1, separator);
    copy(component.start, component.end);
    put(component.end, separator);
  }

  // the braces of the loops, on positions nothing else took: { right after the head, } before the body ends
  for (const loop of loops) {
    let open = loop.open;
    while (open < loop.end && !put(open, '{')) open++;
    let close = loop.end - 1;
    while (close > open && !put(close, '}')) close--;
  }

  return out.join('') + (model.kind === 'rat' ? '\n;var props, children;\nexport default function component () {}\n' : '');
}

// :::::: ANALYSIS

function analyze (text, uri) {
  const kind     = isRatJs(uri) ? 'ratjs' : 'rat';
  const filename = decodeURIComponent(uri.split('/').pop());
  const model    = { components: [], errors: [], filename, holes: [], kind, segments: [], styles: [], templates: [], text, warnings: [] };

  if (kind === 'rat') {
    const ast = parse(text, { filename, tolerant: true });
    model.ast = ast;
    model.errors.push(...ast.errors);
    model.warnings.push(...ast.warnings);
    for (const script of ast.scripts.module)   model.segments.push({ code: script.code, end: script.end, kind: 'module', range: script.range, start: script.start });
    for (const script of ast.scripts.instance) model.segments.push({ code: script.code, end: script.end, kind: 'script', range: script.range, start: script.start });
    for (const style of ast.styles) model.styles.push({ attributes: style.attributes, end: style.end, range: style.range, start: style.start });
    collect(text, ast, model);
  } else {
    model.segments.push({ code: text, end: text.length, kind: 'file', start: 0 });
    for (const template of templatesOf(text)) {
      const ast = parse(text.slice(template.start, template.end), { blocks: false, filename, offset: template.start, tolerant: true });
      model.templates.push({ ...template, ast });
      model.errors.push(...ast.errors);
      model.warnings.push(...ast.warnings);
      collect(text, ast, model);
    }
  }

  // $ declarations: the scripts of a .rat, the top level of a .rat.js (outside templates)
  model.signals = model.segments
    .filter(segment => segment.kind === 'script' || segment.kind === 'module' || segment.kind === 'file')
    .flatMap(segment => declared(segment.code, segment.start));

  const names     = new Set(model.signals.map(signal => signal.name));
  const declaring = new Set(model.signals.map(signal => signal.start));
  model.occurrences = [];
  model.functions   = new Set;
  model.unknown     = [];   // $names read in the markup that no script declares

  for (const segment of model.segments) {
    const list = tokensOf(segment.code);
    list.forEach((token, index) => {
      if (token.type.label !== 'name') return;
      const start = token.start + segment.start;
      if (names.has(token.value) && list[index - 1]?.type.label !== '.') model.occurrences.push({ declaration: declaring.has(start), end: token.end + segment.start, name: token.value, start });
      else if (token.value[0] === '$' && token.value.length > 1 && token.value !== '$$' && !['script', 'module', 'file'].includes(segment.kind) && list[index - 1]?.type.label !== '.' && list[index + 1]?.type.label !== '=>') {
        model.unknown.push({ end: token.end + segment.start, name: token.value, start });
      }
      // function name, const name = (…) => / x => / function
      const previous = list[index - 1];
      const next     = list[index + 1];
      if (previous?.type.keyword === 'function') model.functions.add(token.value);
      if ((previous?.type.keyword === 'const' || previous?.value === 'let') && next?.type.label === '=') {
        const after = list[index + 2];
        if (after && (after.type.keyword === 'function' || after.type.label === '(' || after.value === 'async' || list[index + 3]?.type.label === '=>')) model.functions.add(token.value);
      }
    });
  }

  // markup templates of a .rat.js are strings to the tokenizer: their occurrences come from their holes, already above
  model.occurrences.sort((a, b) => a.start - b.start);

  model.css = cssText(text, model.styles);
  model.js  = jsText(text, model);
  return model;
}

// where an offset is: in a script, a markup expression, a style or the markup itself
function regionAt (model, offset) {
  if (model.styles.some(style => offset >= style.start && offset <= style.end)) return 'css';
  if (model.holes.some(hole => offset > hole.start && offset < hole.end)) return 'js';
  if (model.components.some(item => offset >= item.start && offset <= item.end)) return 'js';
  if (model.segments.some(segment => (segment.kind === 'script' || segment.kind === 'module') && offset >= segment.start && offset <= segment.end)) return 'js';
  if (model.kind === 'ratjs') return model.templates.some(template => offset >= template.start && offset <= template.end) ? 'markup' : 'js';
  return 'markup';
}

const occurrenceAt = (model, offset) => model.occurrences.find(item => offset >= item.start && offset <= item.end) ?? null;

export { analyze, nodesOf, occurrenceAt, regionAt, tokensOf };
