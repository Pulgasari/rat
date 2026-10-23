// podcasts :: views/LatestView.js

import SearchPanel from '/.shared/js/components/SearchPanel.js';
import ViewHeader  from '/.shared/js/components/ViewHeader.js';

import EpisodesIndex      from './../components/EpisodesIndex.js';
import { useTable }        from './../modules/hooks.js';
import { filterEpisodes, sortEpisodes } from './../modules/methods.js';

const app = zugriff.app;

export default function LatestView () {
  const podcasts = useTable('podcasts', () => app.db.podcasts.toValues(), ['all']);
  const episodes = useTable('episodes', () => app.db.episodes.toValues(), ['all']);
  if (!podcasts || !episodes) return null;

  const hasSubs = podcasts.length > 0;
  const byId    = Object.fromEntries(podcasts.map(podcast => [podcast.id, podcast]));

  const           joined = episodes.map(ep => ({ ...ep, podcast: byId[ep.podcastId] }));
  const   sortedEpisodes = sortEpisodes(joined, 'newest');
  const filteredEpisodes = filterEpisodes(sortedEpisodes, true).slice(0, 200);

  const actions = html`<btn-icon icon='refresh' onClick=${() => app.actions.run('refresh-all')} disabled=${!!app.state.$busy} />`;        
  
  const empty = !hasSubs
    ? {
      icon   : 'mdi:rss', title: 'No subscriptions yet',
      hint   : 'Add a podcast by its RSS feed URL to see its latest episodes here.',
      action : html`<btn-push icon='add' label='Add a podcast' onClick=${() => app.state.dialog = 'add'} />`     
    } : { 
      icon  : app.state.search.value ? 'mdi:magnify-close'           : 'mdi:playlist-remove',
      title : app.state.search.value ? 'Nothing matches your filter' : 'No episodes found',
      hint  : app.state.search.value ? '' : 'Try refreshing your feeds.'
    };

  return html`
    <${ViewHeader} title='latest episodes' tools=${actions} />
    <main>
      ${hasSubs && html`<${SearchPanel} />`}
      <${EpisodesIndex} episodes=${filteredEpisodes} empty=${empty} />
    </main>
  `;
}
