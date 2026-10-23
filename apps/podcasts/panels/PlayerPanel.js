// podcasts :: panels/PlayerPanel.js
// the docked player bar — artwork/meta, transport, scrubber and speed/done/close.

import Art             from './../components/Artwork.js';
import { useTable }    from './../modules/hooks.js';
import { fmtDuration } from './../modules/methods.js';

const RATES = [0.8, 1, 1.2, 1.5, 1.75, 2];
const app = zugriff.app;

export default function PlayerPanel () {
  const episode  = app.player.episode;
  const podcasts = useTable('podcasts', () => app.db.podcasts.toValues(), ['all']);
  if (!episode) return null;

  const podcast = podcasts?.find(p => p.id === episode.podcastId);
  const dur     = app.player.duration || episode.duration || 0;
  const time    = app.player.time;

  const cycleRate = () => {
    const i = RATES.indexOf(app.player.rate);
    app.player.setRate(RATES[(i + 1) % RATES.length] ?? 1);
  };

  return html`
    <div class="player">
      <div class="meta">
        <${Art} src=${episode.image || podcast?.image} size=${52} />
        <div class="info">
          <div class="title" title=${episode.title}>${episode.title}</div>
          <div class="podcast">${podcast?.title || ''}</div>
        </div>
      </div>

      <div class="controls">
        <btn-icon
          icon="mdi:rewind-15"
          label="Back 15s"
          onClick=${() => app.player.skip(-15)} 
          />
          
        <btn-icon 
          class="play" 
          title=${app.player.isPlaying ? 'Pause' : 'Play'} 
          onClick=${app.player.toggle}
          icon=${app.player.isWaiting ? 'loading' : app.player.isPlaying ? 'mdi:pause' : 'mdi:play'}
          />
          
        <btn-icon
          icon="mdi:fast-forward-30"
          label="Forward 30s"
          onClick=${() => app.player.skip(30)}
          />
      </div>

      <div class="scrub">
        <span class="time">${fmtDuration(time)}</span>
        <input class="range"
          type="range" 
          min="0"
          max=${Math.max(dur, 1)} 
          step="1" 
          value=${Math.min(time, dur || time)}
          onInput=${e => app.player.seek(Number(e.target.value))}
          />
        <span class="pl-time">${dur ? '-' + fmtDuration(dur - time) : ''}</span>
      </div>

      <div class="pl-right">
        <button
          class="rate"
          title="Playback speed"
          onClick=${cycleRate}>
          ${app.player.rate}×
        </button>
        
        <btn-icon 
          icon=${app.library.stateOf(episode.id).done ? 'mdi:check-circle' : 'mdi:check-circle-outline'}
          label="Mark as done"
          aria-pressed=${app.library.stateOf(episode.id).done}
          onClick=${() => app.library.toggleDone(episode.id)} 
          />
          
        <btn-icon
          icon="close"
          label="Close player"
          onClick=${() => app.player.close()}
          />
      </div>
    </div>
  `;
}
