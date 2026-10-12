// @rat/compiler :: generate

/*
ast -> js for the dom target. the output is meant to be read: nested
$$.el() calls, every binding a visible closure.

  <p class:on={$x}>{$count}</p>
  $$.el('p', { 'class:on': () => $x.value }, [() => $count.value])

element props get closures, component props get getters, so a child reads
props.x and tracks it without knowing it came from a signal.
*/

import { transformExpression } from './script.js';
import { key }                 from './util.js';

const INLINE = 72; // an array or object stays on one line up to this width

// ::: formatting

const pad = depth => '  '.repeat(depth);

function list (items, depth, object = false) {
  const [open, close] = object ? ['{', '}'] : ['[', ']'];
  if (!items.length) return open + close;
  const inline = object ? `{ ${items.join(', ')} }` : `[${items.join(', ')}]`;
  if (inline.length <= INLINE && !inline.includes('\n')) return inline;
  return `${open}\n${items.map(item => pad(depth + 1) + item).join(',\n')},\n${pad(depth)}${close}`;
}

const template = parts => '`' + parts.map(part => typeof part === 'string'
  ? part.replace(/[\\`]/g, '\\$&').replace(/\$\{/g, '\\${')
  : '${' + part + '}').join('') + '`';

// ::: generator

function generate (ast, { filename, names, runtime = '$$', scope = null, source }) {
  const expression = node => transformExpression(node, { filename, names, source });

  function nodes (children, depth, root) {
    return children.map(child => node(child, depth, root));
  }

  // a list of children as the body of a render function
  function render (children, depth, root) {
    const items = nodes(children, depth + 1, root);
    return `() => ${items.length === 1 ? items[0] : list(items, depth)}`;
  }

  function node (child, depth, root) {
    switch (child.type) {
      case 'Text'       : return JSON.stringify(child.value);
      case 'Expression' : return `() => ${expression(child)}`;
      case 'Element'    : return element(child, depth, root);
      case 'If'         : return ifBlock(child, depth, root);
      case 'For'        : return forBlock(child, depth, root);
      case 'Switch'     : return switchBlock(child, depth, root);
    }
    throw new Error(`[rat] unknown node ${child.type}`);
  }

  // ::: blocks

  function ifBlock ({ branches, fallback }, depth, root) {
    const items = branches.map(({ children, test }) => `[() => ${expression(test)}, ${render(children, depth + 1, root)}]`);
    const args  = [list(items, depth)];
    if (fallback) args.push(render(fallback, depth, root));
    return `${runtime}.when(${args.join(', ')})`;
  }

  function forBlock ({ children, fallback, index, item, list: items }, depth, root) {
    const params = index ? `(${item}, ${index})` : `(${item})`;
    const body   = nodes(children, depth + 1, root);
    const args   = [`() => ${expression(items)}`, `${params} => ${body.length === 1 ? body[0] : list(body, depth)}`];
    if (fallback) args.push(render(fallback, depth, root));
    return `${runtime}.each(${args.join(', ')})`;
  }

  function switchBlock ({ cases, fallback, subject }, depth, root) {
    const items = cases.map(({ children, test }) => `[${expression(test)}, ${render(children, depth + 1, root)}]`);
    const args  = [`() => ${expression(subject)}`, list(items, depth)];
    if (fallback) args.push(render(fallback, depth, root));
    return `${runtime}.match(${args.join(', ')})`;
  }

  // ::: elements

  function element (child, depth, root) {
    if (child.tag === 'slot') return 'props.children';

    const props    = properties(child, root);
    const children = nodes(child.children, depth + 1, false);
    const fn       = child.svg ? 'svg' : 'el';
    const tag      = child.component ? child.tag : `'${child.tag}'`;
    const args     = [tag];

    if (props.length || children.length) args.push(list(props, depth, true));
    if (children.length) args.push(list(children, depth));

    return `${runtime}.${fn}(${args.join(', ')})`;
  }

  function properties (child, root) {
    const out     = [];
    const classes = [...child.classes.map(name => JSON.stringify(name))];
    let id        = child.id && JSON.stringify(child.id);
    let dynamic   = false;

    for (const attribute of child.attributes) {
      if (attribute.type === 'Spread') { out.push(`...${expression(attribute)}`); continue; }

      for (const name of attribute.names) {
        const { value } = attribute;

        // class merges (selector, class="", class={}) into one value
        if (name === 'class' && !child.component) {
          const [code, live] = valueOf(name, value);
          classes.push(code);
          dynamic ||= live;
          continue;
        }
        if (name === 'id') { id = null; }

        out.push(prop(name, value, child.component));
      }
    }

    if (classes.length) {
      const value = classes.length === 1 ? classes[0] : `[${classes.join(', ')}]`;
      out.unshift(dynamic ? `class: () => ${value}` : `class: ${classes.every(isString) ? JSON.stringify(classes.map(code => JSON.parse(code)).join(' ')) : value}`);
    }
    if (id) out.unshift(`id: ${id}`);
    if (root && scope && !child.component) out.unshift(`'data-rat': '${scope}'`);

    return out;
  }

  // [code, isLive]. live values become closures (elements) or getters (components)
  function valueOf (name, value) {
    switch (value.kind) {
      case 'true'       : return ['true', false];
      case 'string'     : return [JSON.stringify(value.value), false];
      case 'template'   : return [template(value.parts.map(part => typeof part === 'string' ? part : expression(part))), true];
      case 'expression' : return [expression(value), true];
    }
  }

  function prop (name, value, component) {
    const isEvent = /^on[:a-z]/i.test(name);
    const isRaw   = isEvent || name === 'ref' || name.startsWith('bind:');

    if (name.startsWith('bind:')) {
      if (value.kind !== 'expression') throw new Error(`[rat] ${name} needs a signal in {…}`);
      return `${key(name)}: ${value.code}`;
    }

    const [code, live] = valueOf(name, value);
    if (!live || isRaw) return `${key(name)}: ${code}`;
    if (component)      return `get ${key(name)} () { return ${code}; }`;
    return `${key(name)}: () => ${code}`;
  }

  const items = nodes(ast.children, 1, true);
  if (!items.length)     return 'null';
  if (items.length === 1) return items[0];
  return list(items, 1);
}

const isString = code => /^"(?:[^"\\]|\\.)*"$/.test(code);

export { generate };
export default generate;
