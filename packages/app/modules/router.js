// @rat/app :: router

// :::::: IMPORT

import { signal } from '@rat/signals';

// :::::: HELPERS

const isString = (sth) => typeof sth === 'string';

const modeOf     = (mode, options) => typeof mode === 'string' ? MODES[mode]?.(options) ?? null : mode; // a name and options, or a mode object as it is
const queryOf    = (search)        => Object.fromEntries(new URLSearchParams(search));
const segmentsOf = (path)          => String(path ?? '').split('/').filter(Boolean);
const join       = (...paths)      => '/' + paths.flatMap(segmentsOf).join('/'); // '/settings' + 'profile' -> '/settings/profile'

const sameQuery = (a,b) => JSON.stringify(a) === JSON.stringify(b);

// :::::: REFS

const MODES = { hash, memory, path, query };

const compiled = new Map;

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
the history modes number their entries in history.state,
so a back or forward a guard refuses 
is undone by going the same number of steps the other way,
and the entry keeps its place. 

popstate only: it comes for hash changes as well,
a hashchange on top would ask the guards twice.
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


/*
route patterns, matched segment by segment:

  /notes/:id       a param, one segment
  /notes/:id?      an optional one
  /files/*         the rest, any number of segments (params['*'])
  /notes           a literal

matchRoute(pattern, path) gives { params, rest } or null. a nested route
matches the start of the path and hands the rest to its children:

  matchRoute('/settings', '/settings/profile')            { params: {}, rest: '/profile' }
  matchRoute('/settings', '/settings/profile', { exact })  null

a pattern without a leading slash is relative, the same as with one: the
caller decides what it is relative to.
*/

function compile (pattern) {
  if (!compiled.has(pattern)) {
    compiled.set(pattern, segmentsOf(pattern).map(segment =>
        segment === '*'          ? { kind: 'rest' }
      : segment.startsWith(':')  ? { kind: 'param', name: segment.slice(1).replace(/\?$/, ''), optional: segment.endsWith('?') }
      :                            { kind: 'literal', value: decodeURIComponent(segment) }));
  }
  return compiled.get(pattern);
}

function matchRoute (pattern, path, { exact = false } = {}) {
  const parts    = compile(pattern);
  const segments = segmentsOf(path);
  const params   = {};
  let   at       = 0;

  for (const part of parts) {
    if (part.kind === 'rest') {
      params['*'] = segments.slice(at).map(decodeURIComponent).join('/');
      return { params, rest: '' };
    }
    const segment = segments[at];
    if (part.kind === 'literal') {
      if (segment === undefined || decodeURIComponent(segment) !== part.value) return null;
      at++;
    }
    else if (segment === undefined) {
      if (!part.optional) return null;
    }
    else {
      params[part.name] = decodeURIComponent(segment);
      at++;
    }
  }

  const rest = at < segments.length ? '/' + segments.slice(at).join('/') : '';
  return exact && rest ? null : { params, rest };
}

// '/notes/:id' with { id: 3 } -> '/notes/3'
const fill = (pattern, params = {}) => '/' + compile(pattern).map(part =>
    part.kind === 'literal' ? encodeURIComponent(part.value)
  : part.kind === 'rest'    ? params['*'] ?? ''
  :                           params[part.name] == null ? '' : encodeURIComponent(params[part.name])).filter(Boolean).join('/');

/*
  const router = createRouter({ mode: 'hash' }).start();

  router.path; router.query; router.params;      // where it is now
  router.$path;                                  // the same path as a signal
  router.go('/notes/3'); router.go('settings');  // a path, or a name through resolve()
  router.back();

  router.on('change', ({ path, query }) => …);
  router.on('leave', async event => { if (!await ask()) event.preventDefault(); });
  router.on('leave', guard, { unload: true });   // closing the tab asks too (synchronously)
  router.match('/notes/:id', ({ id }) => …);

a navigation waits for every leave guard; one that prevents it keeps the old
route, and a back or a typed url is put back. the newest navigation wins, an
older one still waiting on its guards is dropped. in path mode a click on a
link of the same origin under base is caught, data-native lets it through.

params belong to whoever knows the routes: match() hands them to its callback,
an app that matches its views sets router.params itself.
*/




const toFull = (path, query) => {
  const search = new URLSearchParams(query).toString();
  return search ? `${path}?${search}` : path;
};

function createRouter ({ base = '', initial = '/', key = 'route', mode = 'hash', resolve = null, root = null } = {}) {
  const place = modeOf(mode === 'none' ? 'memory' : mode, { base, initial, key });
  if (!place) throw new TypeError(`[rat] router: no mode "${mode}"`);

  const handlers = { change: new Set, leave: new Set };
  const matchers = new Set;
  const stops    = new Set;
  const $path    = signal('/');
  const state    = { params: {}, path: '/', query: {} };
  let   ticket   = 0;
  let   pending  = null;   // { full, promise }: the same target twice while the guards run is one navigation

  const emit = (type, detail) => { for (const fn of handlers[type]) fn(detail); };

  function apply ({ path, query }) {
    Object.assign(state, { path, query });
    $path.value = path;
    for (const { fn, pattern } of matchers) {
      const found = matchRoute(pattern, path, { exact: true });
      if (found) fn(found.params, router);
    }
    emit('change', { path, query, router });
  }

  async function guarded (to) {
    const event = { defaultPrevented: false, from: state.path, to, preventDefault () { this.defaultPrevented = true; } };
    for (const fn of handlers.leave) await fn(event);
    return !event.defaultPrevented;
  }

  // outside: the place moved already (back, a typed url), a refusal puts it back
  function navigate (full, options = {}) {
    if (pending?.full === full) return pending.promise;
    const promise = run(full, options).finally(() => { if (pending?.promise === promise) pending = null; });
    pending = { full, promise };
    return promise;
  }

  async function run (full, { outside = false, replace = false } = {}) {
    const next = split(full);
    if (next.path === state.path && sameQuery(next.query, state.query)) return true;

    const mine = ++ticket;
    const pass = handlers.leave.size === 0 || await guarded(next.path);
    if (mine !== ticket) return false;

    if (!pass) {
      if (outside && !place.undo?.()) place.write(toFull(state.path, state.query), { replace: true });
      return false;
    }

    if (outside) place.moved?.();
    else place.write(toFull(next.path, next.query), { replace });
    apply(next);
    return true;
  }

  // a path, or a name: resolve(name) gives its path, else it is taken as one
  const pathOf = to => String(to).startsWith('/') ? String(to) : resolve?.(String(to)) ?? `/${to}`;

  function onClick (event) {
    if (event.defaultPrevented || event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const link = event.composedPath().find(node => node.localName === 'a' && node.href);
    if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download') || link.hasAttribute('data-native')) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || !url.pathname.startsWith(place.base ?? '')) return;
    event.preventDefault();
    navigate(url.pathname.slice((place.base ?? '').length) + url.search);
  }

  const router = {
    $path, mode,

    get params () { return state.params; },
    get path   () { return state.path; },
    get query  () { return state.query; },

    set params (params) { state.params = params ?? {}; },

    back ()            { return place.back ? place.back() : history.back(); },
    go   (to, options) { return navigate(pathOf(to), options); },

    match (pattern, fn) {
      const matcher = { fn, pattern };
      matchers.add(matcher);
      const found = matchRoute(pattern, state.path, { exact: true });
      if (found) fn(found.params, router);
      return () => matchers.delete(matcher);
    },

    on (type, fn, { unload = false } = {}) {
      handlers[type].add(fn);
      let off = () => handlers[type].delete(fn);

      if (type === 'leave' && unload) {
        const ask = event => {
          const leave = { defaultPrevented: false, from: state.path, to: null, unload: true, preventDefault () { this.defaultPrevented = true; } };
          fn(leave);
          if (leave.defaultPrevented) { event.preventDefault(); event.returnValue = ''; }
        };
        addEventListener('beforeunload', ask);
        const first = off;
        off = () => { first(); removeEventListener('beforeunload', ask); };
      }
      return off;
    },

    // go and back as commands: go[settings], go[/notes/3], back
    bind (commands) {
      commands.set('go', (to, event) => typeof to === 'string' ? router.go(to) : undefined);
      commands.set('back', () => router.back());
      return router;
    },

    start () {
      stops.add(place.listen(() => navigate(toFull(place.read().path, place.read().query), { outside: true })));
      if (mode === 'path') {
        const target = root ?? document;
        target.addEventListener('click', onClick);
        stops.add(() => target.removeEventListener('click', onClick));
      }
      apply(place.read());
      return router;
    },

    stop () {
      for (const stop of stops) stop();
      stops.clear();
      return router;
    },
  };

  return router;
}

// :::::: EXPORT

export { MODES, modeOf, split }; // ehem. modes.js
export { fill, join, matchRoute, segmentsOf }; // ehem. pattern.js
export { createRouter };
