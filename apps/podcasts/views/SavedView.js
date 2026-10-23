// podcasts :: views/SavedView.js

import EpisodesIndex from './../components/EpisodesIndex.js';
import SearchPanel   from '/.shared/js/components/SearchPanel.js';
import ViewHeader    from '/.shared/js/components/ViewHeader.js';
import { useTable }  from './../modules/hooks.js';

const app = zugriff.app;

function SavedView () {
  const episodes = useTable('episodes', () => app.db.episodes.toValues(), ['all']);
  const podcasts = useTable('podcasts', () => app.db.podcasts.toValues(), ['all']);
  if (!episodes || !podcasts) return null;

  const byId     = Object.fromEntries(episodes.map(ep => [ep.id, ep]));
  const showById = Object.fromEntries(podcasts.map(p  =>  [p.id,  p]));

  // the saved ids carry the order (newest saved first); the episodes come from the db
  const list = app.library.savedIds()
    .map(id => byId[id])
    .filter(Boolean)
    .map(ep => ({ ...ep, podcast: showById[ep.podcastId] }));

  const empty = {
    icon  : 'bookmarks',
    title : 'Your list is empty',
    hint  : 'Tap the bookmark on any episode to keep it here.',
  };

  return html`
    <${ViewHeader} title='listen later' />
    <main>
      ${list && html`<${SearchPanel} />`}
      <${EpisodesIndex} episodes=${list} empty=${empty} />
    </main>
  `;
}

export default SavedView;
