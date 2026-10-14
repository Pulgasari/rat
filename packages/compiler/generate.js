// @rat/compiler :: generate

/*
ast -> an htx template for @domina/render. the output is meant to be read:
the markup stays markup, every binding is a visible closure in a hole.

  <p class:on={$x}>{$count}</p>
  $$.html`<p class:on=${() => $x.value}>${() => $count.value}</p>`

blocks become helpers with a function as source, which the renderer follows
live: @if -> when, @switch -> match, @for -> each. component props travel in a
spread with getters, so a child reads props.x and tracks it without knowing it
came from a signal.
*/

import { transformExpression } from './script.js';
import { key }                 from './util.js';

const INLINE = 72; // a line stays one line up to this width

// ::: formatting

const pad       = depth => '  '.repeat(depth);
const multiline = code  => code.includes('\n');

// arguments of a call, broken over lines once they get long
function call (name, args, depth) {
  const inline = `${name}(${args.join(', ')})`;
  if (inline.length <= INLINE && !args.some(multiline)) return inline;
  return `${name}(\n${args.map(arg => pad(depth + 1) + arg).join(',\n')},\n${pad(depth)})`;
}

const literal = parts => '`' + parts.map(part => typeof part === 'string'
  ? part.replace(/[\\`]/g, '\\$&').replace(/\$\{/g, '\\${')
  : '${' + part + '}').join('') + '`';

// htx reads `<` as a tag and trims whitespace with a newline at the edges of a
// text, the template literal needs ` \ ${ escaped: such a text goes in a hole
const asHole   = text => /[<`\\]|\$\{|^\s*\n|\n\s*$/.test(text);
const quotable = text => !/["`\\]|\$\{/.test(text);
const SIMPLE   = /^[\w-]+$/;

// on:keydown[enter]!:once -> type, keys, prevent, times
const EVENT    = /^on(:?)([\w:.-]+?)(?:\[([^\]]*)\])?(!)?(?::(once|\d+))?$/;
const BEHAVIOR = /^(?:@|use:)([\w-]+)(?::([\w-]+))?$/;

const isEvent    = name => /^on[:a-z]/i.test(name);
const isBehavior = name => name[0] === '@' || name.startsWith('use:');
const isFunction = code => /^(?:async\s+)?(?:function\b|\([^)]*\)\s*=>|[\w$]+\s*=>)/.test(code.trim());

// ::: generator

function generate (ast, { filename, names, runtime = '$$', scope = null, source }) {
  const $ = name => `${runtime}.${name}`;

  // an object literal as a value has to be wrapped, or () => { … } reads as a block
  const expression = node => {
    const code = transformExpression(node, { filename, names, source });
    return code.trimStart().startsWith('{') ? `(${code})` : code;
  };

  const live = code => `() => ${code}`;
  const hole = code => '${' + code + '}';

  // [code, isLive] of an attribute value
  function valueOf (value) {
    switch (value.kind) {
      case 'true'       : return ['true', false];
      case 'string'     : return [JSON.stringify(value.value), false];
      case 'template'   : return [literal(value.parts.map(part => typeof part === 'string' ? part : expression(part))), true];
      case 'expression' : return [expression(value), true];
    }
  }

  // ::: views

  // children as a template, or null for none
  function view (children, depth, root = false) {
    if (!children.length) return 'null';
    const body = content(children, depth, root);
    return `${$('html')}\`${body.block ? `\n${body.items.map(item => pad(depth + 1) + item).join('\n')}\n${pad(depth)}` : body.items.join('')}\``;
  }

  // the children of an element or a view. one per line, unless a text sits
  // among them: the line breaks would eat the spaces around it
  function content (children, depth, root) {
    const items  = children.map(child => node(child, depth + 1, root));
    const length = items.reduce((total, item) => total + item.length, 0);
    const block  = !children.some(child => child.type === 'Text') && (items.some(multiline) || (items.length > 1 && length > INLINE));
    return { block, items };
  }

  function node (child, depth, root) {
    switch (child.type) {
      case 'Text'       : return asHole(child.value) ? hole(JSON.stringify(child.value)) : child.value;
      case 'Expression' : return hole(live(expression(child)));
      case 'Element'    : return element(child, depth, root);
      case 'If'         : return hole(ifBlock(child, depth, root));
      case 'For'        : return hole(forBlock(child, depth, root));
      case 'Switch'     : return hole(switchBlock(child, depth, root));
    }
    throw new Error(`[rat] unknown node ${child.type}`);
  }

  // ::: blocks

  // blocks pass `root` on: an element in a block at the top is a root element too

  // @if / @else if / @else: one when() per test, the next one as its otherwise
  function ifBlock ({ branches, fallback }, depth, root) {
    const [first, ...rest] = branches;
    const otherwise = rest.length ? `() => ${ifBlock({ branches: rest, fallback }, depth + 1, root)}` : fallback ? `() => ${view(fallback, depth + 1, root)}` : null;
    const args      = [live(expression(first.test)), `() => ${view(first.children, depth + 1, root)}`];
    if (otherwise) args.push(otherwise);
    return call($('when'), args, depth);
  }

  // rows are keyed by the item itself, a duplicate gets a row per occurrence
  function forBlock ({ children, fallback, index, item, list }, depth, root) {
    const params = index ? `(${item}, ${index})` : `(${item})`;
    const args   = [live(expression(list)), 'item => item', `${params} => ${view(children, depth + 1, root)}`];
    if (fallback) args.push(`() => ${view(fallback, depth + 1, root)}`);
    return call($('each'), args, depth);
  }

  function switchBlock ({ cases, fallback, subject }, depth, root) {
    const items = cases.map(({ children, test }) => `[${expression(test)}, () => ${view(children, depth + 2, root)}]`);
    const list  = items.some(multiline) || items.join(', ').length > INLINE
      ? `[\n${items.map(item => pad(depth + 2) + item).join(',\n')},\n${pad(depth + 1)}]`
      : `[${items.join(', ')}]`;
    const args  = [live(expression(subject)), list];
    if (fallback) args.push(`() => ${view(fallback, depth + 1, root)}`);
    return call($('match'), args, depth);
  }

  // ::: elements

  function element (child, depth, root) {
    if (child.tag === 'slot') return hole('children');
    if (child.component) return component(child, depth);

    const simple   = child.classes.filter(name => SIMPLE.test(name));
    const other    = child.classes.filter(name => !SIMPLE.test(name));
    const id       = child.id && SIMPLE.test(child.id) ? child.id : null;
    const tag      = child.tag + (id ? `#${id}` : '') + simple.map(name => `.${name}`).join('');
    const props    = [];

    if (child.id && !id) props.push(`id=${attribute(child.id)}`);
    if (other.length)    props.push(`class=${attribute(other.join(' '))}`);
    if (root && scope)   props.push(`data-rat="${scope}"`);

    for (const attr of child.attributes) {
      if (attr.type === 'Spread') { props.push(`...${hole(expression(attr))}`); continue; }
      props.push(...prop(attr));
    }

    const open = `<${tag}${props.length ? ' ' + props.join(' ') : ''}`;
    if (!child.children.length) return `${open} />`;

    const body = content(child.children, depth, false);
    if (!body.block) return `${open}>${body.items.join('')}</${child.tag}>`;
    return `${open}>\n${body.items.map(item => pad(depth + 1) + item).join('\n')}\n${pad(depth)}</${child.tag}>`;
  }

  // a static string as it is written, anything awkward in a hole
  const attribute = text => quotable(text) ? `"${text}"` : hole(JSON.stringify(text));

  // one attribute, possibly a group (title|aria-label=…), as htx props
  function prop ({ names: list, value }) {
    const plain = list.every(name => !isEvent(name) && !isBehavior(name) && !name.startsWith('bind:') && name !== 'ref');
    if (plain) return [plainProp(list.join('|'), value)];
    return list.map(name => special(name, value));
  }

  function plainProp (name, value) {
    if (value.kind === 'true')   return name;
    if (value.kind === 'string') return `${name}=${attribute(value.value)}`;
    return `${name}=${hole(live(valueOf(value)[0]))}`;
  }

  function special (name, value) {
    if (isEvent(name))    return event(name, value);
    if (isBehavior(name)) return behavior(name, value);
    if (name === 'ref')   return `ref=${hole(`${$('ref')}(${reference(value)})`)}`;
    return bind(name, value);
  }

  // a bare signal name is the signal itself, anything else an expression
  function reference (value) {
    if (value.kind !== 'expression') throw new Error('[rat] ref needs a signal or a function in {…}');
    const code = value.code.trim();
    return names.has(code) ? code : expression(value);
  }

  // bind:value={$text} -> a ref that writes the signal into the property and back
  function bind (name, value) {
    if (value.kind !== 'expression') throw new Error(`[rat] ${name} needs a signal in {…}`);
    return `ref=${hole(`${$('bind')}(${value.code.trim()}, ${JSON.stringify(name.slice(5))})`)}`;
  }

  // @tooltip={text}, @gestures:swipeable, use:tooltip={text} -> a ref running the behavior
  function behavior (name, value) {
    const [, base, arg] = BEHAVIOR.exec(name) ?? [];
    if (!base) throw new Error(`[rat] "${name}" is not a behavior name (@name or @name:arg)`);
    const fn   = base.replace(/-(\w)/g, (_, char) => char.toUpperCase());
    const args = [fn];
    if (value.kind !== 'true' || arg) args.push(value.kind === 'true' ? 'null' : live(valueOf(value)[0]));
    if (arg) args.push(JSON.stringify(arg));
    return `ref=${hole(`${$('use')}(${args.join(', ')})`)}`;
  }

  // on:keydown[enter]!:once={fn} -> onkeydown=${$$.on(fn, { keys: 'enter', prevent: true, times: 1 })}.
  // a function literal goes in as it is, a string is a command, anything else
  // may be either and is resolved when the event fires
  function event (name, value) {
    const [, , type, keys, prevent, times] = EVENT.exec(name) ?? [];
    if (!type) throw new Error(`[rat] "${name}" is not an event name`);
    const attr    = `on${type}`;
    const options = [
      keys !== undefined && `keys: ${JSON.stringify(keys)}`,
      prevent && 'prevent: true',
      times && `times: ${times === 'once' ? 1 : Number(times)}`,
    ].filter(Boolean);

    const [code] = valueOf(value);
    if (options.length)                       return `${attr}=${hole(`${$('on')}(${code}, { ${options.join(', ')} })`)}`;
    if (value.kind === 'string')              return `${attr}=${hole(`${$('command')}(${code})`)}`;
    if (value.kind === 'expression' && isFunction(code)) return `${attr}=${hole(code)}`;
    return `${attr}=${hole(`${$('on')}(${code})`)}`;
  }

  // ::: components

  // <Card title="x" count={$n}>…</Card> -> <${Card} title="x" ...${{ get count () { … } }}>…</${Card}>
  function component (child, depth) {
    const attrs   = [];
    const getters = [];

    const flush = () => { if (getters.length) attrs.push(`...${hole(`{ ${getters.splice(0).join(', ')} }`)}`); };

    for (const attr of child.attributes) {
      if (attr.type === 'Spread') { flush(); attrs.push(`...${hole(expression(attr))}`); continue; }
      for (const name of attr.names) {
        const { value } = attr;
        if (value.kind === 'true' || value.kind === 'string') { flush(); attrs.push(plainProp(name, value)); continue; }
        getters.push(componentProp(name, value));
      }
    }
    flush();

    const open = `<${hole(child.tag)}${attrs.length ? ' ' + attrs.join(' ') : ''}`;
    if (!child.children.length) return `${open} />`;

    const body  = content(child.children, depth, false);
    const close = `</${hole(child.tag)}>`;
    if (!body.block) return `${open}>${body.items.join('')}${close}`;
    return `${open}>\n${body.items.map(item => pad(depth + 1) + item).join('\n')}\n${pad(depth)}${close}`;
  }

  // live values become getters; handlers, refs, bound signals and behaviors go as they are
  function componentProp (name, value) {
    if (name.startsWith('bind:')) return `${key(name)}: ${value.code.trim()}`;
    if (name === 'ref')           return `${key(name)}: ${reference(value)}`;
    if (isBehavior(name)) {
      const [, base] = BEHAVIOR.exec(name) ?? [];
      const fn = base.replace(/-(\w)/g, (_, char) => char.toUpperCase());
      return `${key(name)}: [${fn}, ${live(valueOf(value)[0])}]`;
    }
    const [code] = valueOf(value);
    if (isEvent(name)) return `${key(name)}: ${code}`;
    return `get ${key(name)} () { return ${code}; }`;
  }

  return view(ast.children, 1, true);
}

export { generate };
export default generate;
