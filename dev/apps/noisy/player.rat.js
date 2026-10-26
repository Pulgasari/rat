// apps/noisy/player.rat.js – THIS IS JUST A SCRATCHFILE
// one audio element for the app and a queue. what the ui shows of it are signals. the
// media session hands the controls to the system: the notification, the lock screen,
// headphone buttons

import dom from '@domina/dom';
import { signal }   from '@rat/signals';
import { openFile } from './library.js';

const audio = new Audio;
audio.dom     = dom.within(audio);
audio.preload = 'metadata';

let fileUrl = null;   // the object url of the file playing, revoked with the next

const player = {
  $duration : 0,
  $error    : null,
  $index    : -1,
  $playing  : false,
  $queue    : [],     // tracks
  $time     : 0,

  get track () { return player.$queue[player.$index] ?? null; },

  // the queue and where in it to start
  play (queue, index = 0) {
    player.$queue = queue;
    return player.at(index);
  },

  async at (index) {
    const track = player.$queue[index];
    if (!track) return;
    player.$index = index;
    player.$error = null;
    try {
      const file = await openFile(track);
      if (player.$index !== index) return;   // another one came meanwhile
      if (fileUrl) URL.revokeObjectURL(fileUrl);
      audio.src = fileUrl = URL.createObjectURL(file);
      await audio.play();
      session(track);
    }
    catch (error) { player.$error = error; }
  },

  toggle () { if (!player.track) return; audio.paused ? audio.play() : audio.pause(); },
  next   () { if (player.$index < player.$queue.length - 1) player.at(player.$index + 1); },
  prev   () { audio.currentTime > 3 ? audio.currentTime = 0 : player.at(Math.max(0, player.$index - 1)); },
  seek   (seconds) { audio.currentTime = seconds; },
};

audio.dom.addEventListeners ({
  durationchange : () => player.$duration = audio.duration || 0,
  ended          : player.next,
  pause          : () => player.$playing = false,
  play           : () => player.$playing = true,
  timeupdate     : () => player.$time = audio.currentTime || 0,
});

// :::::: MEDIA SESSION

const media = navigator.mediaSession;

function session (track) {
  if (!media) return;
  media.metadata = new MediaMetadata ({
    album  : track.release, 
    artist : track.artist, 
    title  : track.title
  });
}

media?.setActionHandlers({
  nexttrack     : player.next,
  pause         : audio.pause,
  play          : audio.play,
  previoustrack : player.prev,
});

// :::::: EXPORT

export { player };
export default player;
