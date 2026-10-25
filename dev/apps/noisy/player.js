// apps/noisy/player.js
// one audio element for the app and a queue. what the ui shows of it are signals. the
// media session hands the controls to the system: the notification, the lock screen,
// headphone buttons

import { signal } from '@rat/signals';

import { openFile } from './library.js';

const audio = new Audio;
audio.preload = 'metadata';

let fileUrl = null;   // the object url of the file playing, revoked with the next

const player = {
  duration : signal(0),
  error    : signal(null),
  index    : signal(-1),
  playing  : signal(false),
  queue    : signal([]),     // tracks
  time     : signal(0),

  get track () { return player.queue.value[player.index.value] ?? null; },

  // the queue and where in it to start
  play (queue, index = 0) {
    player.queue.value = queue;
    return player.at(index);
  },

  async at (index) {
    const track = player.queue.value[index];
    if (!track) return;
    player.index.value = index;
    player.error.value = null;
    try {
      const file = await openFile(track);
      if (player.index.value !== index) return;   // another one came meanwhile
      if (fileUrl) URL.revokeObjectURL(fileUrl);
      audio.src = fileUrl = URL.createObjectURL(file);
      await audio.play();
      session(track);
    }
    catch (error) { player.error.value = error; }
  },

  toggle   () { if (!player.track) return; audio.paused ? audio.play() : audio.pause(); },
  next     () { if (player.index.value < player.queue.value.length - 1) player.at(player.index.value + 1); },
  previous () { audio.currentTime > 3 ? audio.currentTime = 0 : player.at(Math.max(0, player.index.value - 1)); },
  seek     (seconds) { audio.currentTime = seconds; },
};

audio.addEventListener('durationchange', () => { player.duration.value = audio.duration || 0; });
audio.addEventListener('ended',          () => player.next());
audio.addEventListener('pause',          () => { player.playing.value = false; });
audio.addEventListener('play',           () => { player.playing.value = true; });
audio.addEventListener('timeupdate',     () => { player.time.value = audio.currentTime || 0; });

// :::::: MEDIA SESSION

const media = navigator.mediaSession;

function session (track) {
  if (!media) return;
  media.metadata = new MediaMetadata({ album: track.release, artist: track.artist, title: track.title });
}

media?.setActionHandler('nexttrack',     () => player.next());
media?.setActionHandler('pause',         () => audio.pause());
media?.setActionHandler('play',          () => audio.play());
media?.setActionHandler('previoustrack', () => player.previous());

// :::::: EXPORT

export { player };
export default player;
