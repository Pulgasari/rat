// @rat/app :: elements :: <rat-view>

/*
  <rat-view route="/notes/:id" src="./note.rat" name="note" transition="slide"></rat-view>

a view of the app. only the router of <rat-app2> activates it: the view whose
route matches is [active], the others are inert and hidden. a route is relative
to the view around it, so views nest (one active per level).

src loads a .rat (or .rat.js) file through the loader on the first activation
and mounts its component with the params of the route as props (and the view
itself as props.view). other params remount it. without src the view shows
what it holds.

  view.on('leave', async event => { if (!await ask()) event.preventDefault(); });
  view.on('leave', guard, { unload: true });   // closing the tab asks too, synchronously

a leave guard is asked when a navigation would take this view away, it returns
its stop. any other type is an event listener as on every element.
*/

// :::::: IMPORT

import { DominaElement } from '@domina/element';
import { mount }         from '@rat/runtime';

import { componentOf, load } from '../loader.js';

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

  #dispose = null;
  #guards  = new Set;
  #loaded  = false;
  #params  = null;
  #ticket  = 0;

  get app    () { return this.closest('rat-app2'); }
  get loaded () { return !this.src || this.#loaded; }

  onConnected () { this.inert = !this.active; }

  // :::::: GUARDS

  on (type, fn, options = {}) {
    if (type !== 'leave') return super.on(type, fn, options);
    const guard = { fn, unload: Boolean(options.unload) };
    this.#guards.add(guard);
    return () => this.#guards.delete(guard);
  }

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
    if (this.src && !sameParams(params, this.#params)) this.fill(params);
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
      const Component = componentOf(await load(new URL(this.src, this.baseURI).href));
      if (ticket !== this.#ticket) return;
      if (!Component) throw new Error(`[rat] ${this.src} exports no component`);
      this.#dispose?.();
      this.replaceChildren();
      this.#dispose = mount(Component, this, { ...params, view: this });
      this.emit('rat:mount');
    }
    catch (error) {
      if (ticket !== this.#ticket) return;
      console.error(error);
      this.toggleAttribute('error', true);
      this.replaceChildren(Object.assign(document.createElement('pre'), { textContent: error.message }));
      this.emit('rat:error', error);
    }
    finally {
      if (ticket === this.#ticket) { this.#loaded = true; this.removeAttribute('loading'); }
    }
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
