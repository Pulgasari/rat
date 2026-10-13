// @rat/runtime :: dom

/*
fine-grained dom, no vdom. the compiler emits nested el() calls; every value
that may change arrives as a function and gets its own effect, so an update
touches exactly the attribute or text node that depends on it.

blocks (when, each, match) live between two comment anchors and own a scope
per branch / item, disposed when the branch or item goes.
*/

import { isHandler, listener }                                  from './events.js';
import { effect, getOwner, isSignal, onCleanup, scope, untrack } from './signals.js';

const SVG = 'http://www.w3.org/2000/svg';

// properties that must be set as properties, an attribute would only be the initial value
const PROPS = new Set(['checked', 'indeterminate', 'muted', 'selected', 'value']);

// which event writes a bound property back
const BIND_EVENTS = { checked: 'change', files: 'change', open: 'toggle', value: 'input' };

// ::: values

function classOf (value) {
  if (!value)                return '';
  if (typeof value !== 'object') return String(value);
  if (Array.isArray(value))  return value.map(classOf).filter(Boolean).join(' ');
  return Object.keys(value).filter(key => value[key]).join(' ');
}

function setAttr (node, name, value) {
  if (name === 'class') value = classOf(value);

  if (name === 'style' && value && typeof value === 'object') {
    node.removeAttribute('style');
    for (const key in value) node.style.setProperty(key, value[key]);
    return;
  }

  if (PROPS.has(name) && name in node) { node[name] = value ?? ''; return; }
  if (value == null || value === false) node.removeAttribute(name);
  else node.setAttribute(name, value === true ? '' : value);
}

// a function is a binding, anything else is set once
function bind (value, apply) {
  if (typeof value === 'function') effect(() => apply(value()));
  else apply(value);
}

// ::: commands

// a string handler names a command. the app (or anyone) listens for it upwards
function command (node, name) {
  return event => node.dispatchEvent(new CustomEvent('rat:command', {
    bubbles  : true,
    composed : true,
    detail   : { event, name },
  }));
}

// ::: props

function setProp (node, key, value) {
  if (key === 'ref') {
    if (isSignal(value)) value.value = node;
    else value?.(node);
    return;
  }

  // @tooltip, @gestures:swipeable (use:tooltip arrives the same way): a behavior
  if (key[0] === '@') {
    const colon = key.indexOf(':');
    use(node, value[0], value[1], colon > 0 ? key.slice(colon + 1) : undefined);
    return;
  }

  // onclick, on:click, plus modifiers (events.js)
  if (key.startsWith('on')) {
    // modifiers stay in the key (on:keydown[enter]), so two listeners of one type never collide
    const type    = key.slice(key[2] === ':' ? 3 : 2).replace(/\[.*$|!.*$|:(?:once|\d+)$/, '').toLowerCase();
    const resolve = handler => typeof handler === 'string' ? command(node, handler) : handler;
    node.addEventListener(type, isHandler(value) ? listener(node, type, value, resolve) : resolve(value));
    return;
  }

  const colon = key.indexOf(':');

  if (colon > 0) {
    const kind = key.slice(0, colon);
    const name = key.slice(colon + 1);

    if (kind === 'class') return bind(value, on => node.classList.toggle(name, !!on));
    if (kind === 'style') return bind(value, css => css == null ? node.style.removeProperty(name) : node.style.setProperty(name, css));
    if (kind === 'bind')  {
      effect(() => { node[name] = value.value; });
      node.addEventListener(BIND_EVENTS[name] ?? 'change', () => { value.value = node[name]; });
      return;
    }
  }

  bind(value, next => setAttr(node, key, next));
}

// ::: nodes

// children first: a <select> needs its options before bind:value, a behavior sees the content
function element (node, props, children) {
  if (children) insert(node, children);
  for (const key in props) setProp(node, key, props[key]);
  return node;
}

function el (tag, props, children) {
  if (typeof tag === 'function') return component(tag, props, children);
  return element(document.createElement(tag), props, children);
}

function svg (tag, props, children) {
  return element(document.createElementNS(SVG, tag), props, children);
}

// a component runs once, untracked: only its own bindings react
function component (fn, props = {}, children) {
  if (children?.length) props.children = children;
  return untrack(() => fn(props));
}

// ::: insert

function toNodes (value, out = []) {
  if (value == null || value === false || value === true) return out;
  if (Array.isArray(value)) { for (const item of value) toNodes(item, out); return out; }
  if (value instanceof Node) {
    if (value.nodeType === 11) out.push(...value.childNodes);
    else out.push(value);
    return out;
  }
  if (typeof value === 'function') { out.push(dynamic(value)); return out; }
  out.push(document.createTextNode(String(value)));
  return out;
}

function insert (parent, value, before = null) {
  for (const node of toNodes(value)) parent.insertBefore(node, before);
}

// a reactive hole. a primitive updates one text node in place, anything else
// is swapped between two anchors
function dynamic (fn) {
  const fragment = document.createDocumentFragment();
  const start    = document.createComment('');
  const end      = document.createComment('');
  let text       = null;
  let current    = [];

  fragment.append(start, end);

  effect(() => {
    const value = fn();

    if (value == null || typeof value !== 'object' && typeof value !== 'function') {
      const data = value == null || typeof value === 'boolean' ? '' : String(value);
      if (text?.parentNode) { if (text.data !== data) text.data = data; return; }
      clear(current);
      text    = document.createTextNode(data);
      current = [text];
      end.parentNode.insertBefore(text, end);
      return;
    }

    clear(current);
    text    = null;
    current = untrack(() => toNodes(value));
    insert(end.parentNode, current, end);
  });

  return fragment;
}

// nested blocks add nodes after creation, so a node list is a range: first to last, inclusive
function range (nodes) {
  if (!nodes.length || !nodes[0].parentNode) return nodes;
  const last = nodes[nodes.length - 1];
  const out  = [];
  for (let node = nodes[0]; node; node = node.nextSibling) { out.push(node); if (node === last) break; }
  return out;
}

function clear (nodes) {
  for (const node of range(nodes)) node.remove();
}

// all nodes between two anchors, exclusive
function between (start, end) {
  const nodes = [];
  for (let node = start.nextSibling; node && node !== end; node = node.nextSibling) nodes.push(node);
  return nodes;
}

// ::: blocks

function block (name) {
  const fragment = document.createDocumentFragment();
  const start    = document.createComment(name);
  const end      = document.createComment(`/${name}`);
  fragment.append(start, end);
  return { end, fragment, start };
}

// renders one branch into its own scope, returns its dispose. the scope belongs to
// the block's owner, not to the block's effect, which would dispose it on every re-run
function mountBranch (anchor, owner, render) {
  if (!render) return null;
  const [nodes, dispose] = scope(() => toNodes(render()), owner);
  insert(anchor.parentNode, nodes, anchor);
  return dispose;
}

function swap (start, end, previous) {
  previous?.();
  clear(between(start, end));
}

// @if / @else if / @else. branches: [[test, render], …], fallback: render
function when (branches, fallback) {
  const { end, fragment, start } = block('if');
  const owner = getOwner();
  let active  = -2;
  let dispose = null;

  effect(() => {
    const index = branches.findIndex(([test]) => test());
    if (index === active) return;
    active = index;
    untrack(() => {
      swap(start, end, dispose);
      dispose = mountBranch(end, owner, index < 0 ? fallback : branches[index][1]);
    });
  });

  return fragment;
}

// @switch. cases: [[value, render], …]
function match (subject, cases, fallback) {
  const { end, fragment, start } = block('switch');
  const owner = getOwner();
  let active  = -2;
  let dispose = null;

  effect(() => {
    const value = subject();
    const index = cases.findIndex(([test]) => Object.is(test, value));
    if (index === active) return;
    active = index;
    untrack(() => {
      swap(start, end, dispose);
      dispose = mountBranch(end, owner, index < 0 ? fallback : cases[index][1]);
    });
  });

  return fragment;
}

// @for … @else. items are keyed by identity, duplicates queue up per key
function each (list, render, fallback) {
  const { end, fragment, start } = block('for');
  const owner = getOwner();
  let records = new Map;
  let empty   = null; // the dispose of the @else branch while it is shown

  const create = (item, index) => {
    const [nodes, dispose] = scope(() => toNodes(render(item, index)), owner);
    document.createDocumentFragment().append(...nodes); // siblings from the start, so range() holds
    return { dispose, nodes };
  };

  effect(() => {
    const items = [...(list() ?? [])];

    untrack(() => {
      const next = new Map;

      for (let index = 0; index < items.length; index++) {
        const item   = items[index];
        const record = records.get(item)?.shift() ?? create(item, index);
        if (next.has(item)) next.get(item).push(record);
        else next.set(item, [record]);
      }

      for (const queue of records.values()) for (const record of queue) { record.dispose(); clear(record.nodes); }
      records = next;

      if (!items.length) {
        empty ??= mountBranch(end, owner, fallback) ?? (() => {});
        return;
      }

      if (empty) { empty(); empty = null; clear(between(start, end)); }

      // moves every node once per update. fine for now, an lis pass would move only the displaced ones
      const parent = end.parentNode;
      const seen   = new Map;
      for (const item of items) {
        const index = seen.get(item) ?? 0;
        seen.set(item, index + 1);
        for (const node of range(records.get(item)[index].nodes)) parent.insertBefore(node, end);
      }
    });
  });

  return fragment;
}

// ::: behaviors

/*
a behavior is a function (element, value, arg) and returns nothing, a cleanup
function, or { update (value), destroy () }. it runs once the element exists;
when its value changes, update() gets the new one, or (without update) the
behavior is cleaned up and runs again. the cleanup belongs to the owner the
element was created in, so it goes with the element's branch.
*/
function use (node, behavior, get, arg) {
  if (typeof behavior !== 'function') throw new TypeError(`[rat] @${arg ?? ''} needs a function, got ${typeof behavior}`);
  let result  = null;
  let cleanup = null;

  onCleanup(() => cleanup?.());

  effect(() => {
    const value = get?.();
    untrack(() => {
      if (result && typeof result.update === 'function') { result.update(value); return; }
      cleanup?.();
      result  = behavior(node, value, arg) ?? null;
      cleanup = typeof result === 'function' ? result : result?.destroy ? () => result.destroy() : null;
    });
  });
}

// ::: merge

/*
props with spreads: { …written }, rest, { …written } in source order. later
wins, except class and style, which add up (as in htx). a reactive part keeps
the merged value reactive.
*/
const read = value => typeof value === 'function' ? value() : value;

function styleText (value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return Object.entries(value).map(([key, item]) => `${key}: ${item}`).join('; ');
}

function combine (key, a, b) {
  if (typeof a === 'function' || typeof b === 'function') return () => combine(key, read(a), read(b));
  if (key === 'class') return [a, b];
  if (a && b && typeof a === 'object' && typeof b === 'object') return { ...a, ...b };
  return [styleText(a), styleText(b)].filter(Boolean).join('; ');
}

function merge (...parts) {
  const out = {};
  for (const part of parts) {
    if (!part) continue;
    for (const key of Object.keys(part)) {
      const value = part[key];
      out[key] = (key === 'class' || key === 'style') && key in out ? combine(key, out[key], value) : value;
    }
  }
  return out;
}

// ::: mount + style

function mount (Component, target, props = {}) {
  const host = typeof target === 'string' ? document.querySelector(target) : target;
  const [nodes, dispose] = scope(() => toNodes(component(Component, props)));
  insert(host, nodes);
  return () => { dispose(); clear(nodes); };
}

const sheets = new Map;

function style (id, css) {
  if (sheets.has(id)) return;
  const sheet = new CSSStyleSheet;
  sheet.replaceSync(css);
  sheets.set(id, sheet);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
}

export { each, el, insert, match, merge, mount, style, svg, use, when };
