// podcasts :: dialogs/AddPodcastDialog.js

import { useSignal } from '@aufbau/signals';
import { useEffect } from '/.shared/js/vendors.js';

import Artwork from './../components/Artwork.js';
import Loading from '/.shared/js/components/Loading.js';
import Modal   from '/.shared/js/components/Modal.js';

import { searchPodcasts } from './../modules/search.js';
import { looksLikeUrl }   from './../modules/methods.js';

const app      = zugriff.app;
const DEBOUNCE = 300;

function AddPodcastDialog () {
  const query   = useSignal('');
  const results = useSignal([]);
  const busy    = useSignal(false);
  const note    = useSignal('');
  const close = () => app.state.dialog = null;

  // search-as-you-type: the timer waits out the typing, the controller drops a
  // request whose query has already moved on
  useEffect(() => {
    const text = query.value.trim();
    note.value = '';

    if (!text || looksLikeUrl(text)) { results.value = []; return; }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      busy.value = true;
      try {
        results.value = await searchPodcasts(text, { signal: controller.signal });
        if (!results.value.length) note.value = 'nothing found for that name';
      }
      catch (error) { if (error.name !== 'AbortError') note.value = error.message; }
      finally       { if (!controller.signal.aborted) busy.value = false; }
    }, DEBOUNCE);

    return () => { clearTimeout(timer); controller.abort(); };
  }, [query.value]);

  const add = async (url) => {
    if (!url || busy.value) return;
    busy.value = true;
    try {
      const podcast = await app.library.subscribe(url);
      app.toast.success(`Subscribed to ${podcast.title}`);
      close();
      app.go('podcast', podcast.id);
    }
    catch (error) { app.toast.error(error); note.value = error?.message || String(error); }
    finally       { busy.value = false; }
  };

  const submit = () => {
    const text = query.value.trim();
    if (looksLikeUrl(text)) add(text);
  };

  const actions = [
    { label: 'cancel', onClick: close },
  ];

  return html`
    <${Modal}
      headline='Add a podcast'
      info='Search by name, or paste an RSS feed URL.'
      actions=${actions}
      onClose=${close}
      class='add-podcast'
      >
      <input
        type='search'
        autofocus
        placeholder='darknet diaries — or https://example.com/feed.xml'
        value=${query.value}
        onInput=${e => query.value = e.target.value}
        onKeyDown=${e => { if (e.key === 'Enter') submit(); }}
        />

      ${note.value && html`<i class='note'>${note.value}</i>`}
      ${busy.value && html`<${Loading} text='searching …' />`}

      ${results.value.length > 0 && html`
        <ul class='results'>
          ${results.value.map(result => html`
            <li key=${result.id}>
              <button onClick=${() => add(result.feedUrl)} disabled=${busy.value}>
                <${Artwork} src=${result.image} />
                <span class='meta'>
                  <span class='title'>${result.title}</span>
                  <span class='sub'>${result.author}${result.count ? ` · ${result.count} episodes` : ''}</span>
                </span>
              </button>
            </li>
          `)}
        </ul>
     `}
    <//>
  `;
}

export default AddPodcastDialog;
