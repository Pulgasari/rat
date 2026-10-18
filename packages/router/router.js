// @rat/router :: router

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

// :::::: IMPORT

import { signal }        from '@rat/signals';
import { modeOf, split } from './modes.js';
import { matchRoute }    from './pattern.js';

const sameQuery = (a, b) => JSON.stringify(a) === JSON.stringify(b);

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
      commands.add('go', (to, event) => typeof to === 'string' ? router.go(to) : undefined);
      commands.add('back', () => router.back());
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

export { createRouter };
