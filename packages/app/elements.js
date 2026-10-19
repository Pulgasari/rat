// @rat/app :: elements

/*
<rat-app>   ::  the root of app
<rat-view>  ::  holds a view of app
<rat-part>  ::  holds a .rat | .rat.js | .html | .htx
*/

/*
  <rat-app src="app.rat">loading …</rat-app>
  <rat-part src="./chart.rat" load="visible"></rat-part>

both load a .rat (or .rat.js) file through the loader and mount its component
into themselves. what they hold until then stays: a loading screen for free.
src resolves against the page. a new src mounts the new component.

  load="eager"     right away (the default)
  load="visible"   once the element comes into view
  load="idle"      once the browser has nothing else to do

rat-app is the entry of a whole app and always eager; rat-part is a piece of a
page, an island in astro's words (ideas/parts.md).

while loading the element has [loading] and in data-status what it is doing
(the splash run.js draws for an empty <rat-app> shows it). both are error
boundaries (boundary.js): an error of the component, while loading, rendering,
in an effect or an event handler, replaces it with the message and a retry,
[error] is set. props: element.props = { … } before it mounts. events:
rat:mount, rat:error (from @rat/runtime, detail { error, boundary }).
*/

// :::::: IMPORT

import { mount, raise } from '@rat/runtime';

import { catchErrors, showError } from './boundary.js';
import { componentOf, load }      from './loader.js';

const idle = fn => globalThis.requestIdleCallback ? requestIdleCallback(fn) : setTimeout(fn, 1);

// :::::: CONSTRUCT ELEMENTS
// TODO: should use: @domina/element as base but extend it

class RatPart extends HTMLElement {
  static observedAttributes = ['src'];

  #cancel  = null;
  #dispose = null;
  #ticket  = 0;
  #uncatch = null;

  props = {};

  get mode () { return this.getAttribute('load') ?? 'eager'; }

  connectedCallback () {
    this.#uncatch ??= catchErrors(this, error => this.#fail(error));
    this.#schedule();
  }

  disconnectedCallback () {
    this.#uncatch?.();
    this.#uncatch = null;
    this.stop();
  }

  attributeChangedCallback (name, previous, next) {
    if (this.isConnected && previous !== null && previous !== next) this.start();
  }

  #schedule () {
    if (this.mode === 'visible' && globalThis.IntersectionObserver) {
      const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        this.start();
      });
      observer.observe(this);
      this.#cancel = () => observer.disconnect();
    }
    else if (this.mode === 'idle') {
      let cancelled = false;
      idle(() => { if (!cancelled) this.start(); });
      this.#cancel = () => { cancelled = true; };
    }
    else this.start();
  }

  async start () {
    this.stop();
    const src = this.getAttribute('src');
    if (!src) return;

    const ticket = this.#ticket;
    const status = ({ detail }) => { if (ticket === this.#ticket) this.dataset.status = `compiling ${detail.name}`; };
    this.toggleAttribute('loading', true);
    this.removeAttribute('error');
    this.dataset.status = `loading ${src}`;
    document.addEventListener('rat:compile', status);

    try {
      const Component = componentOf(await load(new URL(src, this.baseURI).href));
      document.removeEventListener('rat:compile', status);
      if (ticket !== this.#ticket) return;
      if (!Component) throw new Error(`[rat] ${src} exports no component`);
      this.replaceChildren();
      this.#dispose = mount(Component, this, this.props);
      this.removeAttribute('loading');
      delete this.dataset.status;
      this.dispatchEvent(new CustomEvent('rat:mount', { bubbles: true }));
    }
    catch (error) {
      document.removeEventListener('rat:compile', status);
      if (ticket !== this.#ticket) return;
      raise(this, error);
    }
  }

  // unmounts, and drops a load or a mount still on its way
  stop () {
    this.#ticket++;
    this.#cancel?.();
    this.#dispose?.();
    this.#cancel = this.#dispose = null;
  }

  // an error boundary (boundary.js): the component goes, the error takes its place
  #fail (error) {
    this.#dispose?.();
    this.#dispose = null;
    this.removeAttribute('loading');
    delete this.dataset.status;
    showError(this, error, () => this.start());
  }
}

class RatApp extends RatPart {
  get mode () { return 'eager'; }
}

// :::::: REGISTER ELEMENTS

const define = (name, element) => customElements.get(name) ?? customElements.define(name, element);

define('rat-app',  RatApp);
define('rat-part', RatPart);

// :::::: EXPORT

export { RatApp, RatPart };
