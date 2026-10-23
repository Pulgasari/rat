// podcasts :: components/EpisodesIndex.js

import ActionMenu from '/.shared/js/components/ActionMenu.js';
import Date       from '/.shared/js/components/Date.js';
import Empty      from '/.shared/js/components/Empty.js';

import { useGesture } from '@aufbau/gestures/preact';

import Artwork    from './Artwork.js';
import PlayToggle from './PlayToggle.js';

const app = zugriff.app;

// `episode.podcast` is joined on by the view that loaded the list — a lookup per row
// would mean a db read per row.
function Item ({ episode }) {
  const state      = app.library.stateOf(episode.id);
  const podcast    = episode.podcast;
  const dur        = state.duration || 0;
  const pct        = state.done ? 100 : (dur ? Math.min(100, state.position / dur * 100) : 0);
  //const classNames = [state.done && 'done', app.player.episode?.id === episode.id && 'playing'].filter(Boolean).join(' ');     
  const ref = useGesture({
    onSwipeLeft: () => alert('swipe left'),
  });
  
  return html`
    <data-item 
      class:done=${state.done}
      class:playing=${app.player.episode?.id === episode.id}
      ref=${ref}
      >
      <${Artwork}
        aria-label='open episode'
        onClick=${() => app.go('episode', episode.id)}
        src=${episode.image || podcast?.image} 
      />
      
      <div class='meta'>
        ${podcast && html`<btn-push label=${podcast.title} onClick=${() => app.go('podcast', podcast.id)} />`}
        <${Date} value=${episode.pubDate} />
        <span class='dur'>${zugriff.fmt.duration(episode.duration)}</span>
      </div>
      
      <btn-push class='title' label=${episode.title} onClick=${() => app.go('episode', episode.id)} />
      
      ${(state.position || state.done) && html`<aufbau-progress value=${pct} />`}

      <${ActionMenu} items=${[
        html`<${PlayToggle} episode=${episode} />`,
        { 
          icon    : state.saved ? 'bookmark'         : 'bookmark-outline', 
          label   : state.saved ? 'Remove from list' : 'Save for later',
          onClick : () => app.library.toggleSaved(episode.id)
        },{
          icon    : state.done ? 'mdi:check-circle' : 'mdi:check-circle-outline',
          label   : state.done ? 'Mark unplayed'    : 'Mark as done',
          onClick : () => app.library.toggleDone(episode.id),
        },{
          icon  : 'mdi:open-in-new',
          href  : episode.link,
          title : 'open episode page',
        }
      ]}/>
    </data-item>
  `;
}

function EpisodesIndex ({ episodes, empty }) {
  if (!episodes.length) return html`<${Empty} ...${empty} />`;

  return html`
    <data-index viewmode='list'>
      ${episodes.map(episode => html`
        <${Item} key=${episode.id} episode=${episode} />
      `)}
    </data-index>
  `;
}

export default EpisodesIndex;

