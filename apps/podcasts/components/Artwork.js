// podcasts :: components/Artwork.js

import { useSignal } from '@aufbau/signals';
import { useEffect } from '/.shared/js/vendors.js';

const app = zugriff.app;

function Artwork ({ src, size = 48, className = '', onClick }) {
  // phase: 'pending' | 'ready' (thumb) | 'orig' (fallback to source) | 'none'
  const state = useSignal({ url: null, phase: src ? 'pending' : 'none', broken: false });

  useEffect(() => {
    // read the cache off the handle here, never at module scope: app.js hangs
    // app.thumbs on it after this module has already been imported.
    const thumbs = app.thumbs;

    if (!src) { state.value = { url: null, phase: 'none', broken: false }; return; }

    const cached = thumbs.peek(src);
    if (cached) { state.value = { url: cached, phase: 'ready', broken: false }; return; }

    state.value = { url: null, phase: 'pending', broken: false };
    let alive = true;
    thumbs.request(src).then(url => {
      if (!alive) return;
      state.value = url ? { url,      phase: 'ready', broken: false }
                        : { url: src, phase: 'orig',  broken: false };
    });
    return () => { alive = false; };
  }, [src]);

  const { url, phase, broken } = state.value;
  const showImg = (phase === 'ready' || phase === 'orig') && !broken;

  // keep url and phase — only the loading of this one url failed
  const onError = () => state.value = { ...state.value, broken: true };

  const classes = 'art ' + className + (onClick ? ' not-a-button' : '');

  const pic = showImg
    ? html`<img loading='lazy' src=${url} onError=${onError} />`
    : html`<svg-icon icon='mdi:podcast' />`;

  return onClick
    ? html`<button class=${classes} onClick=${onClick}>${pic}</button>`
    : html`<div    class=${classes}>${pic}</div>`;
}

export default Artwork;
