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
(the splash run.js draws for an empty <rat-app> shows it), after a failure
[error] and the message inside. props: element.props = { … } before
it mounts. events: rat:mount, rat:error (detail: the error).
*/

// :::::: IMPORT

import { mount } from '@rat/runtime';
import { componentOf, load } from './loader.js';

const idle = fn => globalThis.requestIdleCallback ? requestIdleCallback(fn) : setTimeout(fn, 1);

// :::::: CONSTRUCT ELEMENTS
// TODO: should use: @domina/element as base but extend it

class RatPart extends HTMLElement {
  static observedAttributes = ['src'];

  #cancel  = null;
  #dispose = null;
  #ticket  = 0;

  props = {};

  get mode () { return this.getAttribute('load') ?? 'eager'; }

  connectedCallback ()    { this.#schedule(); }
  disconnectedCallback () { this.stop(); }

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
      this.#fail(error);
    }
  }

  // unmounts, and drops a load or a mount still on its way
  stop () {
    this.#ticket++;
    this.#cancel?.();
    this.#dispose?.();
    this.#cancel = this.#dispose = null;
  }

  #fail (error) {
    console.error(error);
    this.removeAttribute('loading');
    delete this.dataset.status;
    this.toggleAttribute('error', true);
    const message = Object.assign(document.createElement('pre'), { textContent: error.message });
    message.setAttribute('part', 'error');
    this.replaceChildren(message);
    this.dispatchEvent(new CustomEvent('rat:error', { bubbles: true, detail: error }));
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
