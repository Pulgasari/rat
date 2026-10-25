// apps/podcasts/player.js
// one audio element for the app. what the views show of it are signals, so the
// player bar, a play toggle in a row and the detail view follow it by themselves.

import { signal } from '@rat/signals';

import { markDone, setProgress, stateOf } from './library.js';

const RATES = [0.8, 1, 1.2, 1.5, 1.75, 2];

const audio = new Audio;
audio.preload = 'metadata';

const player = {
  duration : signal(0),
  episode  : signal(null),
  playing  : signal(false),
  rate     : signal(1),
  time     : signal(0),
  waiting  : signal(false),

  play (episode) {
    if (player.episode.value?.id === episode.id) return player.toggle();
    player.episode.value = episode;
    audio.src            = episode.audioUrl;
    audio.currentTime    = stateOf(episode.id).position || 0;
    audio.playbackRate   = player.rate.value;
    audio.play();
  },

  toggle () { audio.paused ? audio.play() : audio.pause(); },
  seek   (seconds) { audio.currentTime = seconds; },
  skip   (seconds) { audio.currentTime = Math.max(0, audio.currentTime + seconds); },

  // the next of RATES, around the end
  cycleRate () {
    const next = RATES[(RATES.indexOf(player.rate.value) + 1) % RATES.length] ?? 1;
    player.rate.value = audio.playbackRate = next;
  },

  close () {
    audio.pause();
    audio.removeAttribute('src');
    player.episode.value = null;
  },
};

// the position goes to the library every few seconds, not on every timeupdate
let saved = 0;

audio.addEventListener('timeupdate', () => {
  player.time.value = audio.currentTime || 0;
  const episode = player.episode.value;
  if (episode && Math.abs(audio.currentTime - saved) > 5) {
    saved = audio.currentTime;
    setProgress(episode.id, audio.currentTime, audio.duration || 0);
  }
});

audio.addEventListener('durationchange', () => { player.duration.value = audio.duration || 0; });
audio.addEventListener('ended',          () => { if (player.episode.value) markDone(player.episode.value.id); });
audio.addEventListener('pause',          () => { player.playing.value = false; });
audio.addEventListener('play',           () => { player.playing.value = true; });
audio.addEventListener('playing',        () => { player.waiting.value = false; });
audio.addEventListener('waiting',        () => { player.waiting.value = true; });

// :::::: EXPORT

export { RATES, player };
export default player;
