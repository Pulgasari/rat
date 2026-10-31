// apps/noisy/player.js
// one audio element for the app and a queue. what the ui shows of it are signals. the
// media session hands the controls to the system: the notification, the lock screen,
// headphone buttons

import { signal } from '@rat/signals';

import { urlOf } from './library.js';

const audio = new Audio;
audio.preload = 'metadata';

let fileUrl = null;   // the url of the file playing, revoked with the next (an object url in the browser)

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
      const url = await urlOf(track);
      if (player.index.value !== index) return URL.revokeObjectURL(url);   // another one came meanwhile
      if (fileUrl) URL.revokeObjectURL(fileUrl);
      audio.src = fileUrl = url;
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
// the controls in the system: the notification, the lock screen, headphone buttons. on android the
// webview hands none of navigator.mediaSession to the system: the MediaSession plugin (config.rat.js,
// android.npm) does, with a foreground service that keeps the app playing in the background

const native = globalThis.Capacitor?.isPluginAvailable?.('MediaSession') ? globalThis.Capacitor.Plugins.MediaSession : null;
const web    = native ? null : navigator.mediaSession ?? null;

const system = {
  action   : (action, handler) => { try { native ? native.setActionHandler({ action }, handler) : web?.setActionHandler(action, handler); } catch {} },   // a browser without the action throws
  metadata : metadata          => native ? native.setMetadata(metadata) : web && (web.metadata = new MediaMetadata(metadata)),
  position : ()                => {
    if (!audio.duration || !Number.isFinite(audio.duration)) return;
    const state = { duration: audio.duration, playbackRate: audio.playbackRate, position: Math.min(audio.currentTime, audio.duration) };
    native ? native.setPositionState(state) : web?.setPositionState?.(state);
  },
  state    : playbackState     => native ? native.setPlaybackState({ playbackState }) : web && (web.playbackState = playbackState),
};

// the plugin turns no blob: url into a picture, a data: url it does
const dataUrl = blob => new Promise((done, fail) => { const reader = new FileReader; reader.onload = () => done(reader.result); reader.onerror = fail; reader.readAsDataURL(blob); });

async function artworkOf (track) {
  if (!track.cover) return [];
  try {
    const url = await RAT.app.thumbnails.requestFile(track.cover, () => null);
    if (!url) return [];
    if (!native) return [{ src: url }];
    const blob = await (await fetch(url)).blob();
    return [{ src: await dataUrl(blob), type: blob.type }];
  }
  catch { return []; }
}

async function session (track) {
  const metadata = { album: track.release, artist: track.artist, title: track.title };
  system.metadata(metadata);
  const artwork = await artworkOf(track);
  if (artwork.length && player.track === track) system.metadata({ ...metadata, artwork });
}

audio.addEventListener('play',           () => system.state('playing'));
audio.addEventListener('pause',          () => system.state(audio.ended && player.index.value >= player.queue.value.length - 1 ? 'none' : 'paused'));
for (const type of ['durationchange', 'play', 'pause', 'ratechange', 'seeked']) audio.addEventListener(type, system.position);

system.action('nexttrack',     () => player.next());
system.action('pause',         () => audio.pause());
system.action('play',          () => audio.play());
system.action('previoustrack', () => player.previous());
system.action('seekto',        details => details?.seekTime != null && player.seek(details.seekTime));

// :::::: EXPORT

export { player };
export default player;
