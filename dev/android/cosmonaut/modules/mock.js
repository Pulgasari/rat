// cosmonaut :: modules/mock.js
//
// stands in for the native Browser plugin in a plain browser, so the chrome can
// be laid out and screenshotted without a device. same methods, same events.

import { domainOf } from './util.js';

export function createMock () {
  const listeners = new Map;
  let tabs = [
    { id: 't1', url: 'https://duckduckgo.com/',        title: 'DuckDuckGo',   loading: false, progress: 100, canGoBack: false },
    { id: 't2', url: 'https://news.ycombinator.com/',  title: 'Hacker News',  loading: false, progress: 100, canGoBack: true  },
    { id: 't3', url: 'https://developer.mozilla.org/', title: 'MDN Web Docs', loading: false, progress: 100, canGoBack: false },
  ];
  let activeId = 't2', expanded = false, count = tabs.length;

  const state = () => structuredClone({ tabs, activeId, expanded });
  const emit  = (type, data) => (listeners.get(type) ?? []).forEach(fn => fn(data));
  const push  = () => { emit('state', state()); return state(); };

  // the same normalization the native side does: a scheme or a dotted word is a url
  const normalize = input => /^[a-z]+:\/\//i.test(input) ? input
    : input.includes('.') && !input.includes(' ') ? 'https://' + input
    : 'https://duckduckgo.com/?q=' + encodeURIComponent(input);

  const noop = async () => {};

  return {
    ready    : async () => state(),
    getState : async () => state(),

    async navigate ({ url }) {
      const tab = tabs.find(tab => tab.id === activeId) ?? tabs[0];
      tab.url = normalize(url); tab.title = domainOf(tab.url); expanded = false;
      return push();
    },
    async newTab ({ url } = {}) {
      const id = 't' + (++count);
      tabs.push({ id, url: url || 'https://duckduckgo.com/', title: 'New tab', loading: false, progress: 100, canGoBack: false });
      activeId = id;
      return push();
    },
    async closeTab ({ id }) {
      tabs = tabs.filter(tab => tab.id !== id);
      if (activeId === id) activeId = tabs.at(-1)?.id ?? '';
      return push();
    },
    async activateTab ({ id }) { activeId = id; return push(); },
    async setChromeExpanded ({ expanded: value }) { expanded = value; return push(); },

    goBack : async () => state(), goForward : async () => state(),
    reload : async () => state(), hardReload : async () => state(),

    setDockPosition : noop, setStripHeight : noop, findInPage : noop, findNext : noop, clearFind : noop,
    toggleDevtools  : noop, setUserscripts : noop,

    addListener (type, fn) {
      listeners.set(type, [...(listeners.get(type) ?? []), fn]);
      return { remove: () => listeners.set(type, listeners.get(type).filter(other => other !== fn)) };
    },
  };
}
