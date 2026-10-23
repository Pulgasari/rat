// @rat/app :: router :: modes

/*
where a route lives. a mode is { read, write, listen }:

  read ()                     -> { path, query }
  write (path, { replace })   puts a path (with its ?query) into place
  listen (fn)                 calls fn when the place changes from outside (back, a typed url), returns stop
  moved (), undo ()           optional: an outside change was taken / is to be undone

  hash     #/notes/3?sort=date               the default, works on any host
  path     /app/notes/3?sort=date            real urls, the host has to serve the page for each
  query    ?route=/notes/3&sort=date         one page, real query, no rewrites needed
  memory   nowhere but the router            tests, widgets, a router inside a router

a mode of your own is an object of the same shape.
*/

const queryOf = search => Object.fromEntries(new URLSearchParams(search));

const split = full => {
  const at = full.indexOf('?');
  return at < 0 ? { path: full || '/', query: {} } : { path: full.slice(0, at) || '/', query: queryOf(full.slice(at + 1)) };
};

const onWindow = (types, fn) => {
  for (const type of types) addEventListener(type, fn);
  return () => { for (const type of types) removeEventListener(type, fn); };
};

/*
import onEvents from '@domina/verbs';

const onWindow = (types, fn) => {
  const off = onEvents(types, fn);
  return () => off();
};


import domina from '@domina/domina';

const onWindow = (types, fn) => {
  const off = domina.onEvents(types, fn);
  return () => off();
};
*/

/*
the history modes number their entries in history.state, so a back or forward a
guard refuses is undone by going the same number of steps the other way, and
the entry keeps its place. popstate only: it comes for hash changes as well, a
hashchange on top would ask the guards twice.
*/
function historyOf () {
  let index = history.state?.ratIndex ?? 0;
  if (history.state?.ratIndex === undefined) history.replaceState({ ...history.state, ratIndex: index }, '');

  return {
    listen : fn => onWindow(['popstate'], fn),
    moved  : () => { index = history.state?.ratIndex ?? index; },
    push   : (url, replace) => replace ? history.replaceState({ ratIndex: index }, '', url) : history.pushState({ ratIndex: ++index }, '', url),
    // true when it could go back to where it was, false for an entry without a number (a typed url)
    undo   : () => {
      const delta = (history.state?.ratIndex ?? index) - index;
      if (delta) history.go(-delta);
      return delta !== 0;
    },
  };
}

function hash () {
  const entries = historyOf();
  return {
    ...entries,
    read  : () => split(decodeURI(location.hash.slice(1))),
    write : (path, { replace } = {}) => entries.push(`#${path}`, replace),
  };
}

function path ({ base = '' } = {}) {
  const entries = historyOf();
  const prefix  = base.replace(/\/$/, '');
  return {
    ...entries,
    base  : prefix,
    read  : () => ({ path: decodeURI(location.pathname.startsWith(prefix) ? location.pathname.slice(prefix.length) : location.pathname) || '/', query: queryOf(location.search) }),
    write : (path, { replace } = {}) => entries.push(prefix + path, replace),
  };
}

function query ({ key = 'route' } = {}) {
  const entries = historyOf();
  return {
    ...entries,
    read   : () => {
      const { [key]: route = '/', ...rest } = queryOf(location.search);
      return { path: route, query: rest };
    },
    write  : (full, { replace } = {}) => {
      const { path, query } = split(full);
      const search = new URLSearchParams({ [key]: path, ...query });
      entries.push(`${location.pathname}?${search}${location.hash}`, replace);
    },
  };
}

function memory ({ initial = '/' } = {}) {
  const stack     = [initial];
  const listeners = new Set;
  return {
    back   : () => { if (stack.length > 1) { stack.pop(); for (const fn of listeners) fn(); } },
    listen : fn => { listeners.add(fn); return () => listeners.delete(fn); },
    read   : () => split(stack.at(-1)),
    write  : (path, { replace } = {}) => { if (replace) stack[stack.length - 1] = path; else stack.push(path); },
  };
}

const MODES = { hash, memory, path, query };

// a name and options, or a mode object as it is
const modeOf = (mode, options) => typeof mode === 'string' ? MODES[mode]?.(options) ?? null : mode;

// :::::: EXPORT

export { MODES, modeOf, split };
