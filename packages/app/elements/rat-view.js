// @rat/app :: elements :: <rat-view>

/*
  <rat-view route="/notes/:id" src="./note.rat" name="note" transition="slide"></rat-view>

a view of the app. only the router of <rat-app> activates it: the view whose
route matches is [active], the others are inert and hidden. a route is relative
to the view around it, so views nest (one active per level).

src loads a .rat (or .rat.js) file through the loader on the first activation
and mounts its component with the params of the route as props (and the view
itself as props.view). other params remount it. component={X} does the same
with a component at hand: a build sees it as an import, a src is a string it
does not follow. without either the view shows what it holds.

  <rat-view route='/podcast/:id' component={PodcastDetailView} />

lazy={() => import('./x.rat.html')} imports the component on the first activation: a build splits it off,
the app does not load it (nor what it imports) before the view is shown.

  <rat-view route='/pdf' lazy={() => import('./views/PdfView.rat.html')} />

an error boundary: an error of its component (loading, rendering, effects)
replaces the component, [error] is set, retry() loads it again. a failed event
handler leaves it as it is and goes on to the app (on('error') of <rat-app>).

on(type, fn) (../events.js), fn gets the value, on() returns the stop:

  enter   it became active: { params }
  left    it is inactive again
  mount   the component of src mounted
  leave   a guard, asked when a navigation would take this view away:

  view.on('leave', async event => { if (!await ask()) event.preventDefault(); });
  view.on('leave', guard, { unload: true });   // closing the tab asks too, synchronously

as dom events: rat:enter, rat:leave, rat:mount (RAT.dom(view).on(…)).
*/

// :::::: IMPORT

import { DominaElement } from '@domina/element';
import { mount, raise }  from '@rat/runtime';

import { catchErrors, showError } from '../boundary.js';
import { ownEvents }              from '../events.js';
import { componentOf, load }      from '../run/loader.js';

const sameParams = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// :::::: ELEMENT

export class RatView extends DominaElement {

  static props = {
    active     : Boolean,
    name       : String,
    route      : String,
    src        : String,
    transition : String,
  };

  static styles () {
    return `rat-view {
      display: block;

      &:not([active]) {
        content-visibility : hidden;
        position           : absolute;
      }
    }`;
  }

  #component = null;
  #dispose   = null;
  #lazy      = null;
  #guards    = new Set;
  #loaded  = false;
  #params  = null;
  #ticket  = 0;

  get app    () { return this.closest('rat-app'); }
  get loaded () { return !this.#mounts || this.#loaded; }

  // a component in place of src, the same way
  get component () { return this.#component; }
  set component (value) {
    if (value === this.#component) return;
    this.#component = value;
    if (this.active && this.#params !== null) this.fill(this.#params);
  }

  // a function that imports the component, called on the first activation
  get lazy () { return this.#lazy; }
  set lazy (value) {
    if (value === this.#lazy) return;
    this.#lazy = value;
    if (this.active && this.#params !== null) this.fill(this.#params);
  }

  get #mounts () { return Boolean(this.src || this.#component || this.#lazy); }

  onConnected () {
    this.inert = !this.active;
    this.track(catchErrors(this, error => this.fail(error)));
  }

  // :::::: GUARDS

  // its own events (../events.js): enter, left, mount, and the guard leave
  #events = ownEvents(this, { enter: 'rat:enter', left: 'rat:leave', mount: 'rat:mount' }, {
    leave: (fn, options = {}) => {
      const guard = { fn, unload: Boolean(options.unload) };
      this.#guards.add(guard);
      return () => this.#guards.delete(guard);
    },
  });

  on (type, fn, options) { return this.#events(type, fn, options); }

  // every guard in turn, until one prevents. on unload only those that asked for it, without waiting
  async ask (event) {
    for (const { fn, unload } of this.#guards) {
      if (event.unload && !unload) continue;
      if (event.unload) fn.call(this, event);
      else await fn.call(this, event);
      if (event.defaultPrevented) return false;
    }
    return true;
  }

  // :::::: ACTIVATION, by the app

  enter (params = {}) {
    if (!this.active) {
      this.active = true;
      this.inert  = false;
      this.emit('rat:enter', { params });
    }
    if (this.#mounts && !sameParams(params, this.#params)) this.fill(params);
  }

  leave () {
    if (!this.active) return;
    this.active = false;
    this.inert  = true;
    this.emit('rat:leave');
  }

  // :::::: SRC

  async fill (params) {
    const ticket = ++this.#ticket;
    this.#params = params;
    this.toggleAttribute('loading', true);
    this.removeAttribute('error');

    try {
      const Component = this.#component ?? componentOf(await (this.#lazy ? this.#lazy() : load(new URL(this.src, this.baseURI).href)));
      if (ticket !== this.#ticket) return;
      if (!Component) throw new Error(`[rat] ${this.src ?? 'the view'} has no component`);
      this.#dispose?.();
      this.replaceChildren();
      this.#dispose = mount(Component, this, { ...params, view: this });
      this.emit('rat:mount');
    }
    catch (error) {
      if (ticket === this.#ticket) raise(this, error);
    }
    finally {
      if (ticket === this.#ticket) { this.#loaded = true; this.removeAttribute('loading'); }
    }
  }

  // :::::: ERRORS: a boundary (../boundary.js)

  // the component goes, the error takes its place
  fail (error) {
    this.#dispose?.();
    this.#dispose = null;
    showError(this, error, this.#mounts ? () => this.retry() : null);
  }

  retry () {
    this.removeAttribute('error');
    return this.fill(this.#params ?? {});
  }

  onAttributeChanged (name) {
    if (name !== 'src' || this.#params === null) return;
    this.#loaded = false;
    if (this.active) this.fill(this.#params);
    else this.#params = null;
  }
}

RatView.init('rat-view');

export default RatView;
