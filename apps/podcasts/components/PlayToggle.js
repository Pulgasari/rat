// podcasts :: components/PlayToggle.js
// the play/pause control for one episode, reflecting the live player state.


const app = zugriff.app;

function PlayToggle ({ episode, size = 20 }) {
  const isCurrent = app.player.episode?.id === episode.id;
  const isPlaying = isCurrent && app.player.isPlaying;
  const isWaiting = isCurrent && app.player.isWaiting;
  const icon      = isWaiting ? 'loading' : isPlaying ? 'mdi:pause' : 'mdi:play';     
  const title     = isPlaying ? 'Pause' : 'Play';
  
  return html`
    <btn-push
      aria-label=${title}
      class='play-toggle'
      icon=${icon}
      title=${title}
      onClick=${() => app.player.play(episode)}
    />
  `;
}

export default PlayToggle;
