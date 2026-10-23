// podcasts :: views/EpisodeDetailView.js

import ActionMenu from '/.shared/js/components/ActionMenu.js';
import Empty      from '/.shared/js/components/Empty.js';
import ViewHeader from '/.shared/js/components/ViewHeader.js';

import Art        from './../components/Artwork.js';

import { useTable } from './../modules/hooks.js';
import { fmtDate, fmtDuration, paragraphs } from './../modules/methods.js';

const app = zugriff.app;

export default function EpisodeDetailView ({ id }) {
  const episode = useTable('episodes', () => app.db.episodes.get(id), ['one', id]);
  const podcast = useTable('podcasts', () => episode ? app.db.podcasts.get(episode.podcastId) : Promise.resolve(null), ['one', episode?.podcastId]);      

  if (episode === null) return null;
  if (!episode) return html`
    <${ViewHeader} back='latest' />
    <${Empty} icon='alert' title='episode not found' />
  `;

  const player   = app.player;
  const state    = app.library.stateOf(id);
  const paras    = paragraphs(episode.description);
  const duration = state.duration || episode.duration || 0;
  const percent  = state.done ? 100 : (duration && state.position ? Math.min(100, (state.position / duration) * 100) : 0);     

  const isCurrent = app.player.episode?.id === id;
  const isPlaying = isCurrent && app.player.isPlaying;

  const actions = [
    {
      icon     : isPlaying ? 'mdi:pause' : 'mdi:play',
      label    : isPlaying ? 'Pause' : state.position && !state.done ? 'Resume' : 'Play',
      onClick  : () => app.player.play(episode)
    },
    { 
      icon     : 'bookmark',
      label    : state.saved ? 'Remove from list' : 'Save for later',
      onClick  : () => app.library.toggleSaved(id) 
    },
    { 
      icon     : state.done ? 'mdi:check-circle' : 'mdi:check-circle-outline',
      label    : state.done ? 'Mark unplayed' : 'Mark as done',
      onClick  : () => app.library.toggleDone(id)
    },
    episode.link && { 
      icon: 'mdi:open-in-new', 
      label: 'Episode page', 
      href: episode.link
    },
  ].filter(Boolean);

  const back = {
    label   : podcast ? podcast.title : 'Back',
    onClick : () => podcast ? app.go('podcast', podcast.id) : app.go('latest'),
  };

  return html`
    <${ViewHeader} back=${back} />

    <main>
      <${Art} src=${episode.image || podcast?.image} size=${160} />
      
      <div class='info'>
        ${podcast && html`<button onClick=${() => app.go('podcast', podcast.id)}>${podcast.title}</button>`}
        <h1>${episode.title}</h1>
        <div class="meta">
          <span>${fmtDate(episode.pubDate)}</span>
          ${episode.duration && html`<span> ${fmtDuration(episode.duration)}</span>`}
          ${state.done       && html`<span>· <svg-icon icon="mdi:check-circle" /> done</span>`}
        </div>

        <${ActionMenu} items=${actions} />
        <aufbau-progress value=${percent} />
      </div>
  
      ${paras.length
      ? html`<div>${paras.map((p,i) => html`<p key=${i}>${p}</p>`)}</div>`
      : html`<i>No description.</i>`}
    </main>
  `;
}
