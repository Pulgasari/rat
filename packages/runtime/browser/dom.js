// @rat/runtime :: dom

/*
compiled markup is an htx template, rendered by @domina/render. the runtime
hands every render its effect and scope, which makes it fine-grained: a
function in a hole is a live binding, a helper with a function as source
builds its rows and branches once and keeps them, and what a component or row
creates is disposed with it. nothing re-renders, effects write single parts.

effect and scope go per render call, not through configure(): aufbau elements
on the same page keep their own re-render mode.

behaviors, bind:x and ref={$signal} arrive as refs, functions the renderer
calls with the element once its children are in place.
*/

// :::::: IMPORT

import { each, html, raw, render as renderInto, unrender, when } from '@htx/js/render';
import { effect, isFn, isSignal, isString, onCleanup, scope, untrack } from '../common/shared.js';
import { guard }                                                       from './errors.js';

// effects belong to no owner, the renderer disposes them. scopes neither: the
// renderer disposes them with their part
const OPTIONS = {
  effect : fn => effect (fn, null),
  scope  : fn => scope  (fn, null),
};

// which event writes a bound property back
const BIND_EVENTS = { checked: 'change', files: 'change', open: 'toggle', value: 'input' };

// ::: render

function render (target, value, options) {
  const merged = options ? { ...OPTIONS, ...options } : OPTIONS;
  return renderInto(target, value, merged);
}

// a component runs once, untracked, in a scope of its own. what throws later, in
// its effects and rows, is raised from host (errors.js); the first call throws
function mount (Component, target, props = {}) {
  const host    = isString(target) ? document.querySelector(target) : target;
  const options = { effect: fn => effect(guard(fn, host), null), scope: fn => scope(guard(fn, host), null) };
  const [, dispose] = scope(() => render(host, Component(props), options), null);
  return () => { unrender(host); dispose(); };
}

// ::: refs

// ref={$el} writes the element into the signal, a function gets it
const ref = target => node => {
  if (isSignal(target)) target.value = node;
  else target?.(node);
};

// bind:value={$text}: the signal into the property, the property back on its event
function bind (source, name) {
  return node => {
    const type  = BIND_EVENTS[name] ?? 'change';
    const write = () => { source.value = node[name]; };
    effect(() => { node[name] = source.value; });
    node.addEventListener(type, write);
    onCleanup(() => node.removeEventListener(type, write));
  };
}

/*
a behavior is a function (element, value, arg) and returns nothing, a cleanup
function, or { update (value), destroy () }. when its value changes, update()
gets the new one, or (without update) the behavior is cleaned up and runs
again. it lives in the scope its element was built in and goes with it.
*/
function use (behavior, get, arg) {
  if (!isFn(behavior)) throw new TypeError(`[rat] @${arg ?? ''} needs a function, got ${typeof behavior}`);

  return node => {
    let result  = null;
    let cleanup = null;

    onCleanup(() => cleanup?.());

    effect(() => {
      const value = get?.();
      untrack(() => {
        if (result && isFn(result.update)) { result.update(value); return; }
        cleanup?.();
        result  = behavior(node, value, arg) ?? null;
        cleanup = isFn(result) ? result : result?.destroy ? () => result.destroy() : null;
      });
    });
  };
}

// ::: style

const sheets = new Map;

function style (id, css) {
  if (sheets.has(id)) return;
  const sheet = new CSSStyleSheet;
  sheet.replaceSync(css);
  sheets.set(id, sheet);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
}

/*
a css file of a component (style link / adopt): once per url, global, a promise
that settles when it is in. adopt rewrites relative url(…) against the file
first: an adopted sheet resolves them against the page (chromium ignores the
baseURL option). @import does not work in an adopted sheet (a constructable
stylesheet ignores it); link does that.
*/
const files = new Map;

const RELATIVE_URL = /url\(\s*(['"]?)(?![a-z][\w+.-]*:|\/|#)([^'")]+)\1\s*\)/gi;

const rebase = (css, base) => css.replace(RELATIVE_URL, (_, quote, path) => `url("${new URL(path, base).href}")`);

function sheet (mode, url) {
  if (files.has(url)) return files.get(url);

  let done;
  if (mode === 'link') {
    const link = Object.assign(document.createElement('link'), { href: url, rel: 'stylesheet' });
    done = new Promise((resolve, reject) => { link.onload = () => resolve(link); link.onerror = () => reject(new Error(`[rat] style link ${url} failed`)); });
    document.head.append(link);
  }
  else {
    done = fetch(url)
      .then(response => response.ok ? response.text() : Promise.reject(new Error(`[rat] style adopt ${url}: ${response.status}`)))
      .then(css => {
        const sheet = new CSSStyleSheet;
        sheet.replaceSync(rebase(css, url));
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
        return sheet;
      });
  }

  done.catch(error => console.error(error));
  files.set(url, done);
  return done;
}

export { bind, each, html, mount, raw, ref, render, sheet, style, unrender, use, when };
