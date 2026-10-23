// @rat/compiler :: generate

/*
ast -> an htx template for @domina/render. the output is meant to be read:
the markup stays markup, every binding is a visible closure in a hole.

  <p class:on={$x}>{$count}</p>
  $$.html`<p class:on=${() => $x.value}>${() => $count.value}</p>`

blocks become helpers with a function as source, which the renderer follows
live: @if -> when, @match -> cases, @for -> each.
component props travel in a spread with getters, so a child reads props.x and
tracks it without knowing it came from a signal.

a @fragment at the top level becomes a function declaration next to the
component body (hoisted, so the script can call it too), collected in
options.fragments. without that array (.rat.js) a @fragment is an error.
*/

import { transformExpression }  from './script.js';
import { CompileError, key }    from './util.js';

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
const ONCE     = /^once:/; // once:click is on:click:once (d-25 d)
const BEHAVIOR = /^(?:@|use:)([\w-]+)(?::([\w-]+))?$/;

const isEvent    = name => /^on[:a-z]/i.test(name) || ONCE.test(name);
const isBehavior = name => name[0] === '@' || name.startsWith('use:');

// ::: generator

function generate (ast, { cases = new Map, filename, fragments = null, names, runtime = '$$', scope = null, source }) {
  const $ = name => `${runtime}.${name}`;

  // the reactive names in reach; a @case branch adds the parts of its case
  let reactive = names;
  const within = (extra, fn) => {
    const previous = reactive;
    reactive = new Set([...previous, ...extra]);
    try     { return fn(); }
    finally { reactive = previous; }
  };

  const fail = (message, at) => new CompileError(message, { filename, index: at, source });

  // an object literal as a value has to be wrapped, or () => { … } reads as a block
  const expression = node => {
    const code = transformExpression(node, { filename, names: reactive, source });
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
      case 'Match'      : return hole(matchBlock(child, depth, root));
      case 'FragmentDef': throw fail('@fragment is only allowed at the top level of a .rat file, in a .rat.js file write a function', child.start);
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

  /*
  @match: $$.cases tests each @case in order with match.js of @rat/types. a case
  declared in this file hands out its parts, each one a computed in the branch:

    @case Failed: <p>{message}</p>
    ($$parts) => { const message = $$.computed(() => $$parts().message); return $$.html`<p>${() => message.value}</p>`; }
  */
  function matchBlock ({ cases: list, fallback, subject }, depth, root) {
    const tests = list.map(({ test }) => expression(test));
    const views = list.map(({ children, test }) => {
      const parts = cases.get(test.code) ?? [];
      if (!parts.length) return `() => ${view(children, depth + 2, root)}`;
      const locals = parts.map(part => `const ${part} = ${$('computed')}(() => $$parts().${part});`).join(' ');
      return within(parts, () => `($$parts) => { ${locals} return ${view(children, depth + 2, root)}; }`);
    });

    const bracket = items => items.some(multiline) || items.join(', ').length > INLINE
      ? `[\n${items.map(item => pad(depth + 2) + item).join(',\n')},\n${pad(depth + 1)}]`
      : `[${items.join(', ')}]`;

    const args = [live(expression(subject)), bracket(tests), bracket(views)];
    if (fallback) args.push(`() => ${view(fallback, depth + 1, root)}`);
    return call($('cases'), args, depth);
  }

  // @fragment row (item) -> function row (item) { return $$.html`…`; }
  function fragment ({ children, name, params }) {
    return `function ${name} (${params.code}) {\n    return ${view(children, 2, true)};\n  }`;
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
    return reactive.has(code) ? code : expression(value);
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

  // on:keydown[enter]!:once={fn} -> onkeydown=${$$.listener(fn, { keys: 'enter', prevent: true, times: 1 })}.
  // a string is a command, anything else goes through listener(): its errors
  // reach the error boundary, and a value may be either, resolved when the event fires
  function event (name, value) {
    if (ONCE.test(name)) {
      if (/:(?:once|\d+)$/.test(name)) throw new Error(`[rat] "${name}" counts twice, once: and a count`);
      name = `on:${name.slice(5)}:once`;
    }
    const [, , type, keys, prevent, times] = EVENT.exec(name) ?? [];
    if (!type) throw new Error(`[rat] "${name}" is not an event name`);
    const attr    = `on${type}`;
    const options = [
      keys !== undefined && `keys: ${JSON.stringify(keys)}`,
      prevent && 'prevent: true',
      times && `times: ${times === 'once' ? 1 : Number(times)}`,
    ].filter(Boolean);

    const [code] = valueOf(value);
    if (options.length)                       return `${attr}=${hole(`${$('listener')}(${code}, { ${options.join(', ')} })`)}`;
    if (value.kind === 'string')              return `${attr}=${hole(`${$('commandListener')}(${code})`)}`;
    return `${attr}=${hole(`${$('listener')}(${code})`)}`;
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
    // bind:value={$x} on a component: the signal itself as the prop value, let { $value } = this.props takes it
    if (name.startsWith('bind:')) return `${key(name.slice(5))}: ${value.code.trim()}`;
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

  const top = [];
  for (const child of ast.children) {
    if (child.type !== 'FragmentDef') { top.push(child); continue; }
    if (!fragments) throw fail('@fragment is only allowed in a .rat file, in a .rat.js file write a function', child.start);
    fragments.push(fragment(child));
  }

  return view(top, 1, true);
}

export { generate };
export default generate;
