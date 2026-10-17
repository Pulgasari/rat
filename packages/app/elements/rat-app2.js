// @rat/app :: elements :: <rat-app>
// basiert auf <app-root> aus @aufbau/elements
// experimentell — bei Erfolg wird die `<app-*>` aus @aufbau/elements vermutl. eliminiert

/*
:::::: attr
- sollte via @rat/types definiert werden können (muss nich sofort sein)
:::::: observer
- klingt @domina/observer ein
:::::: router
- sollte als @rat/router ausgelagert werden
- wird hier dann nur eingebunden und genutzt
- sollte erweitert werden: hash, query/params, path, custom
*/

import './app-area.js';
import './app-view.js';

import { AufbauElement: DominaElement, setSkin } from '@domina/element';

// set on the root as data-*, the css below it reads them
const LOOK = ['density', 'geometry', 'palette', 'scheme'];

const reducedMotion = () => globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
//const reducedMotion = () => domina.a11y.reducedMotion;
//const reducedMotion = () => domina.media.reducedMotion;

export class RatApp extends DominaElement {
  // nach DominaElement direkt:
  get dom () { domina.within(this); }

  static attr = {
    base       : String,
    density    : String,
    geometry   : String,
    loading    : Boolean,
    palette    : String,
    routing    : { type: String, default: 'hash', values: ['hash', 'none', 'path'] },
    scheme     : String,
    skin       : { type: String, onChange: () => this.applySkin() },
    transition : { type: String, default: 'fade' },
  };

  static styles () {
    return `app-root {
      display: block;

      &:has(> app-area) {
        display       : grid;
        grid-template :
          "start main   end" minmax(0, 1fr)
          "start bottom end" auto
          / auto minmax(0, 1fr) auto;
      }

      &:has(> app-area[dock="bottom"][peek]:state(overlay)) { padding-block-end: var(--area-peek, 1.75rem); }

      &:not([loading]) > [data-loading] { display: none; }

      &[loading] > [data-loading] {
        background : var(--color-bg);
        inset      : 0;
        position   : fixed;
        z-index    : var(--app-loading-z, 1000);
      }

      &[loading]:not(:has(> [data-loading]))::before,
      &[loading]:not(:has(> [data-loading]))::after {
        content  : '';
        position : fixed;
        z-index  : var(--app-loading-z, 1000);
      }

      &[loading]:not(:has(> [data-loading]))::before {
        background : var(--color-bg);
        inset      : 0;
      }

      &[loading]:not(:has(> [data-loading]))::after {
        animation        : spin 0.8s linear infinite;
        block-size       : 2em;
        border           : 2px solid var(--color-ink);
        border-radius    : 50%;
        border-top-color : transparent;
        inline-size      : 2em;
        inset            : calc(50% - 1em) auto auto calc(50% - 1em);
      }
    }`;
  }

  get views () { return this.dom.selectList('app-view'); }
  get view  () { return this.views.find({ view: view.active }) ?? null; }
  get areas () { return this.children.filter({ localName: 'app-area' }); }

  area (name)          { return this.areas.find({ name }) ?? null; }
  show (name, options) { return this.views.find({ name })?.activate(options); }

  ready () {
    if (!this.loading) return Promise.resolve();
    
    const done = () => {
      this.loading = false; 
      this.emit('ready'); 
    };
    
    return (!document.startViewTransition || reducedMotion()) 
      ? Promise.resolve(done())
      : document.startViewTransition(done).finished;
  }

  onConnected () {
    domina.window.on('hashchange', () => { if (this.routing === 'hash') this.follow(); });
    domina.window.on('popstate',   () => { if (this.routing === 'path') this.follow(); });

    this.start();
  }

  // the views may come later than the root, a page that renders into a root of its
  // markup: then the address is read once the first of them is there
  start () {
    if (!this.views.length) {
      const observer = new MutationObserver(() => {
        if (!this.views.length) return;
        observer.disconnect();
        this.start();
      });
      observer.observe(this, { childList: true, subtree: true });
      this.track(() => observer.disconnect());
      return;
    }
    this.follow({ transition: false });
    if (!this.view) this.views[0]?.activate({ history: false, transition: false });
  }

  onAttributeChanged (name) {
    if (name === 'skin') this.applySkin();
  }

  sync () {
    for (const name of LOOK) {
      const value = this[name];
      if (value) this.dataset[name] = value;
      else delete this.dataset[name];
    }
    if (!this._skinApplied) this.applySkin();
  }

  applySkin () {
    this._skinApplied = true;
    const skin = this.skin;
    if (!skin) return;
    document.documentElement.dataset.skin = skin;
    setSkin(skin);
  }

  // :::::: ROUTING ::::::::::::::::::::::::::::::::::::::::::::::

  // the route in the address, null without routing
  get path () {
    const routing = this.getAttr('routing');
    if (routing === 'hash') return location.hash.slice(1) || '/';
    if (routing === 'path') {
      const base = (this.base ?? '').replace(/\/$/, '');
      const path = location.pathname.startsWith(base) ? location.pathname.slice(base.length) : location.pathname;
      return path || '/';
    }
    return null;
  }

  // shows the view the address names
  follow (options = {}) {
    const path = this.path;
    if (path == null) return;
    const view = this.views.find({ route: path });
    if (view && !view.active) view.activate({ ...options, history: false });
  }

  // puts an activated view into the address
  remember (view) {
    const route   = view.route;
    const routing = this.routing;
    if (!route || route === this.path) return;

    if (routing === 'hash') history.pushState(null, '', `#${route}`);
    if (routing === 'path') history.pushState(null, '', `${(this.base) ?? '').replace(/\/$/, '')}${route}`);
  }
}

for (const name of Object.keys(AppRoot.attr)) {
  const attribute = name;
  Object.defineProperty(AppRoot.prototype, name, {
    configurable : true,
    get () { return this.getAttr(attribute); },
    set (value) {
      if (value === false || value == null) this.removeAttribute(attribute);
      else this.attr(attribute, value);
    },
  });
}

AppRoot.init('app-root');

export default AppRoot;
