// apps/podcasts/modules/player.js

import { stateOf, setProgress, markDone } from './library.js';

class PlayerModule extends EventTarget {
  #audio    = new Audio();
  #episode  = null;
  #duration = 0;
  #rate     = 1;

  constructor() {
    super();
    this.#audio.preload = 'metadata';
    
    // Relay native audio events as custom events
    this.#audio.addEventListener('timeupdate', () => this.dispatchEvent(new Event('change')));     
    this.#audio.addEventListener('play',       () => this.dispatchEvent(new Event('change')));
    this.#audio.addEventListener('pause',      () => this.dispatchEvent(new Event('change')));
  }

  get episode   () { return  this.#episode; }
  get time      () { return  this.#audio.currentTime || 0; }
  get isPlaying () { return !this.#audio.paused; }

  play (episode) {
    this.#episode   = episode;
    this.#audio.src = episode.audioUrl;
    this.#audio.play();
    this.dispatchEvent(new Event('change'));
  }

  toggle () {
    if  (this.#audio.paused) this.#audio.play(); 
    else this.#audio.pause();
  }
}

export const player = new PlayerModule();
