// @rat/app :: elements :: <rat-app>

/*
  <rat-app src="app.rat" routing="hash" palette="dracula"></rat-app>

  <rat-app routing="hash" palette="dracula" loading>
    <rat-area dock="start">…</rat-area>
    <rat-view route="/" src="./home.rat"></rat-view>
    <rat-view route="/settings" name="settings">
      <rat-view route="/"></rat-view>
      <rat-view route="profile" src="./profile.rat"></rat-view>
    </rat-view>
    <rat-view route="*" src="./missing.rat"></rat-view>
  </rat-app>

the root of an app, one per page: a second one warns and stays out of it.
src loads a .rat file and mounts its component (props.app is the element) in
place of what the app holds, its views and areas then come from there. with a
src the app is [loading] by itself until they are mounted.

  app.router     @rat/router, routing = hash | path | query | memory | none, base for path
  app.commands   @rat/commands, listening on the app: onclick='go[settings]', back
  app.view       the deepest active view, app.views every view below the app
  app.area(name) a <rat-area>, app.areas all of them

config.rat.js next to src (or config-src) is loaded before the app's code: its
RAT: true puts rat on globalThis as RAT (a string names it otherwise), its
plugins land on the app (RAT.app.database …, see ../plugins.js), the config
itself is app.config.

areas open and close by their name, two forms to find out which serves better:

  onclick='rat:toggle[menu]'       the event rat:toggle (@rat/commands), the app takes it
  rat.toggle('menu', force?)       import { rat } from '@rat/app': rat.app is the app

matching: per level the first view whose route matches, exactly, else as the
start of the path (a view with views in it, or a src not loaded yet), else a
route with *. what is left goes to the views inside it, the params of every
level are router.params and the props of a src. go[x] takes the route /x, else
the view named x.

[loading] keeps the splash of run.js up until the first views are mounted and
whatever app.hold(promise) got is done; ready() ends it then, in a view
transition. density, geometry, layout, look, mode, palette and skin go to
@gestalt/core as they are.

the last error boundary: an error no view or part took shows in a popover over
the app (see ../boundary.js and errors.js of @rat/runtime).

events: rat:ready, rat:navigate ({ from, to, path, params }), rat:error.
*/

// :::::: IMPORT

import { DominaElement }  from '@domina/element';
import { gestalt }        from '@gestalt/core';
import { createCommands } from '@rat/commands';
import { Enum }           from '@rat/types';

import { createRouter, fill, join, matchRoute, segmentsOf } from '@rat/router';

import { mount } from '@rat/runtime';

import { catchErrors, showError } from '../boundary.js';
import { componentOf, load }      from '../loader.js';
import { usePlugins }             from '../plugins.js';
import { RatArea }                from './rat-area.js';
import { RatView }                from './rat-view.js';

// :::::: CONSTS

const IN  = 'rat-view-in';
const OUT = 'rat-view-out';

// a prop that hands its value to gestalt.set(). the first change of a prop never set is skipped:
// gestalt.set({ skin: null }) would switch the skin off
const gestaltProp = name => ({
  type: String,
  onChange (value, old) {
    if (value == null && old === undefined) return;
    gestalt.set({ [name]: value ?? null });
  },
});

const isWild = view => view.route.includes('*'); // a view without route is not routed, one with * comes last

// :::::: REFS

let current = null;

// :::::: ELEMENT

export class RatApp extends DominaElement {

  static props = {
    base       : String,
    configSrc  : String,
    loading    : Boolean,
    routing    : Enum('hash', 'path', 'query', 'memory', 'none'),
    src        : String,
    transition : { default: 'fade', type: String },

    // handed to gestalt
    density    : gestaltProp('density'),
    geometry   : gestaltProp('geometry'),
    layout     : gestaltProp('layout'),
    look       : gestaltProp('look'),
    mode       : gestaltProp('mode'),
    palette    : gestaltProp('palette'),
    skin       : gestaltProp('skin'),
  };

  static styles () {
    return `
    rat-app {
      display: block;

      /* while loading the splash of run.js has the box */
      &:has(> rat-area):not([loading]) {
        display       : grid;
        grid-template :
          "start main   end" minmax(0, 1fr)
          "start bottom end" auto
          / auto minmax(0, 1fr) auto;
        min-block-size: 100dvh;

        & > :not(rat-area) { grid-area: main; min-inline-size: 0; }
      }

      &:has(> rat-area[dock="bottom"][peek]:state(overlay)) { padding-block-end: var(--area-peek, 1.75rem); }

      & > [data-rat-errors] {
        background      : Canvas;
        border          : 1px solid color-mix(in oklab, CanvasText 25%, transparent);
        border-radius   : 0.5rem;
        color           : CanvasText;
        inset           : auto 1rem 1rem auto;
        max-inline-size : min(40rem, calc(100vw - 2rem));
        padding         : 0.75rem 1rem;

        & pre { margin: 0 0 0.5rem; white-space: pre-wrap; }
      }
    }

    @keyframes rat-view-fade  { from { opacity: 0; } }
    @keyframes rat-view-slide { from { opacity: 0; translate: var(--rat-view-offset, 2rem 0); } }

    html:active-view-transition-type(rat-view) {
      &::view-transition-old(root),
      &::view-transition-new(root) { animation: none; }

      &::view-transition-group(${IN}),
      &::view-transition-group(${OUT}) { animation-duration: var(--rat-view-duration, 0.25s); }

      &::view-transition-new(${IN})  { animation: var(--rat-view-in)  var(--rat-view-duration, 0.25s) ease both; }
      &::view-transition-old(${OUT}) { animation: var(--rat-view-out) var(--rat-view-duration, 0.25s) ease both reverse; }
    }`;
  }

  #commands = createCommands();
  #config   = null;
  #dispose  = null;
  #errors   = null;
  #holds    = new Set;
  #mounting = false;
  #queued   = false;
  #router   = null;
  #started  = false;

  get commands () { return this.#commands; }
  get config   () { return this.#config ?? {}; }
  get router   () { return this.#router; }

  get areas () { return this.dom.getListOfElements('rat-area'); }
  get view  () { return this.views.findLast({ active: true }) ?? null; }
  get views () { return this.dom.getListOfElements('rat-view'); }

  area (name) { return this.areas.find({ name }) ?? null; }

  // a <rat-area> by its name, opened or closed: force true opens, false closes, none flips
  toggle (name, force) {
    const target = this.area(name);
    target?.toggle(force);
    return target;
  }

  // :::::: LIFECYCLE

  onConnected () {
    if (current && current !== this && current.isConnected) {
      console.warn('[rat] one <rat-app> per page, this one stays out of it', this);
      return;
    }
    current = this;

    if (this.src) this.hold(this.start());
    else if (this.configSrc) this.hold(this.configure());

    this.#router ??= createRouter({ base: this.base ?? '', mode: this.routing, resolve: name => this.resolve(name) }).bind(this.#commands);
    this.track(this.#commands.listen(this));
    this.track(this.#router.on('change', () => this.schedule()));
    this.track(this.#router.on('leave', event => this.ask(event), { unload: true }));
    this.#router.start();
    this.track(() => this.#router.stop());

    this.observe.added('rat-view', () => this.schedule());
    this.observe.removed('rat-view', () => this.schedule());
    this.track(catchErrors(this, error => this.report(error)));
    this.on('rat:toggle', ({ detail }) => this.toggle(...detail.args));
  }

  onDisconnected () {
    if (current === this) current = null;
  }

  onAttributeChanged (name) {
    if (name === 'src' && current === this) this.start();
  }

  // :::::: SRC

  // the component of src in place of what the app held. matching waits for it
  async start () {
    const { src } = this;
    if (!src) return;

    const status = ({ detail }) => { this.dataset.status = `compiling ${detail.name}`; };
    this.#mounting = true;
    this.loading   = true;
    this.dataset.status = `loading ${src}`;
    document.addEventListener('rat:compile', status);

    try {
      await this.configure();
      const Component = componentOf(await load(new URL(src, this.baseURI).href));
      if (!Component) throw new Error(`[rat] ${src} exports no component`);
      this.#dispose?.();
      this.replaceChildren();
      this.#errors  = null;
      this.#dispose = mount(Component, this, { app: this });
      this.emit('rat:mount');
    }
    catch (error) {
      this.loading = false;
      showError(this, error, () => { this.removeAttribute('error'); this.start(); });
    }
    finally {
      document.removeEventListener('rat:compile', status);
      delete this.dataset.status;
      this.#mounting = false;
      this.#started  = false;
      this.schedule();
    }
  }

  // :::::: CONFIG

  // config.rat.js next to src (config-src names another): RAT and the plugins, once, before
  // the app's own code runs. without config-src a missing file is no config
  async configure () {
    if (this.#config) return this.#config;
    const named = this.configSrc;
    const url   = named ? new URL(named, this.baseURI).href : new URL('config.rat.js', new URL(this.src, this.baseURI)).href;

    if (!named && !(await fetch(url, { cache: 'no-cache', method: 'HEAD' }).then(response => response.ok, () => false))) return this.#config = {};

    const module = await load(url);
    const config = module.default ?? { ...module };
    if (config.RAT) globalThis[config.RAT === true ? 'RAT' : config.RAT] = rat;
    await usePlugins(this, config);
    return this.#config = config;
  }

  // :::::: MATCHING

  // the views of one level: those whose nearest view or app is parent
  levelOf (parent) {
    return [...parent.querySelectorAll('rat-view[route]')].filter(view => view.parentElement.closest('rat-view, rat-app') === parent);
  }

  pick (views, path) {
    const tame = views.filter(view => !isWild(view));
    for (const view of tame) {
      const found = matchRoute(view.route, path, { exact: true });
      if (found) return { ...found, view };
    }
    for (const view of tame) {
      if (!segmentsOf(view.route).length || (view.loaded && !this.levelOf(view).length)) continue;
      const found = matchRoute(view.route, path);
      if (found) return { ...found, view };
    }
    for (const view of views.filter(isWild)) {
      const found = matchRoute(view.route, path);
      if (found) return { ...found, view };
    }
    return null;
  }

  // { params, views } of a path, the views from the outermost in
  match (path) {
    const params = {};
    const views  = [];
    let   level  = this.levelOf(this);
    let   rest   = path;

    while (level.length) {
      const found = this.pick(level, rest);
      if (!found) break;
      Object.assign(params, found.params);
      views.push(found.view);
      rest  = found.rest || '/';
      level = this.levelOf(found.view);
    }
    return { params, views };
  }

  // the full route of a view: the routes of the views around it joined, the params filled in
  routeOf (view) {
    const routes = [];
    for (let at = view; at && at !== this; at = at.parentElement.closest('rat-view, rat-app')) routes.unshift(at.route ?? '');
    return fill(join(...routes), this.#router.params);
  }

  // go[x]: the route /x when a view takes it, else the view named x
  resolve (name) {
    const path      = `/${name}`;
    const { views } = this.match(path);
    if (views.length && !views.some(isWild)) return path;
    const view = this.views.find({ name });
    return view?.route == null ? null : this.routeOf(view);
  }

  // :::::: NAVIGATION

  // once per microtask, however many views came or the route changed meanwhile
  schedule () {
    if (this.#queued || this.#mounting || current !== this) return;
    this.#queued = true;
    queueMicrotask(() => { this.#queued = false; this.follow(); });
  }

  follow () {
    const { path }           = this.#router;
    const { params, views }  = this.match(path);
    const next               = new Set(views);
    const leaving            = this.views.filter(view => view.active && !next.has(view));
    const entering           = views.filter(view => !view.active);
    const swap               = () => { for (const view of leaving) view.leave(); for (const view of views) view.enter(params); };

    this.#router.params = params;

    if (!this.#started) {
      this.#started = true;
      swap();
      this.settle();
      return;
    }

    if (!leaving.length && !entering.length) return swap();

    this.emit('rat:navigate', { from: leaving[0]?.name ?? null, params, path, to: entering[0]?.name ?? null });
    return this.transit({ from: leaving[0], swap, to: entering[0] });
  }

  // the topmost view that goes and the topmost that comes, in a view transition
  transit ({ from, swap, to }) {
    const name = (view, fallback) => {
      const value = view?.transition ?? fallback;
      return value === 'fade' || value === 'slide' ? `rat-view-${value}` : value;
    };
    const on  = name(to,   this.transition);
    const off = name(from, this.transition);

    if (!document.startViewTransition || this.a11y.reducedMotion || (on === 'none' && off === 'none') || this.loading) return Promise.resolve(swap());

    const html = document.documentElement;
    html.style.setProperty('--rat-view-in',  on);
    html.style.setProperty('--rat-view-out', off);
    if (from) from.style.viewTransitionName = OUT;

    const transition = document.startViewTransition({
      types  : ['rat-view'],
      update : () => {
        if (from) from.style.viewTransitionName = '';
        if (to)   to.style.viewTransitionName   = IN;
        swap();
      },
    });

    return transition.finished.finally(() => {
      if (to) to.style.viewTransitionName = '';
      html.style.removeProperty('--rat-view-in');
      html.style.removeProperty('--rat-view-out');
    });
  }

  // the leave guards of the views a navigation takes away, the innermost first.
  // on unload those of every active view, synchronously: the tab does not wait
  ask (event) {
    if (event.unload) {
      for (const view of this.views.filter({ active: true })) view.ask(event);
      return;
    }
    const next = new Set(this.match(event.to).views);
    return this.views.filter(view => view.active && !next.has(view)).reverse()
      .reduce((asking, view) => asking.then(pass => pass && view.ask(event)), Promise.resolve(true));
  }

  // :::::: ERRORS

  // the last boundary (../boundary.js): what no view or part took, in a popover over the app
  report (error) {
    console.error(error);
    if (!this.#errors) {
      this.#errors = Object.assign(document.createElement('div'), { popover: 'manual' });
      this.#errors.dataset.ratErrors = '';
      const close = Object.assign(document.createElement('button'), { popoverTargetAction: 'hide', popoverTargetElement: this.#errors, textContent: 'close', type: 'button' });
      this.#errors.append(document.createElement('pre'), close);
      this.append(this.#errors);
    }
    this.#errors.querySelector('pre').textContent = error?.message ?? String(error);
    this.#errors.showPopover?.();
  }

  // :::::: LOADING

  // ready() waits for it too
  hold (promise) {
    this.#holds.add(promise);
    return promise;
  }

  // after the first pass: the active views mounted, the holds done, then ready()
  async settle () {
    if (!this.loading) return;
    const mounted = view => view.loaded || new Promise(done => {
      view.addEventListener('rat:mount', done, { once: true });
      view.addEventListener('rat:error', done, { once: true });
    });
    await Promise.allSettled([...this.views.filter({ active: true }).map(mounted), ...this.#holds]);
    return this.ready();
  }

  ready () {
    if (!this.loading) return Promise.resolve();
    const done = () => { this.loading = false; this.emit('rat:ready'); };
    return !document.startViewTransition || this.a11y.reducedMotion ? Promise.resolve(done()) : document.startViewTransition(done).finished;
  }
}

RatApp.init('rat-app');

// the app from anywhere: rat.app, rat.toggle('menu')
const rat = {
  get app    () { return current; },
  get config () { return current?.config ?? null; },
  toggle (name, force) { return current?.toggle(name, force) ?? null; },
};

// :::::: EXPORT

export { RatArea, RatView, rat };
export default RatApp;
