// videos :: player.rat.js

/*
the player: one <video>, driven by hand, its state here (a page has one player). <Stage> hands its
element over (attach), the library or the launch queue a file (load). reverse play is a frame loop: a
<video> has no reliable negative playback rate.

  $src $title $duration $current $playing    the clip and where it is
  $loop $reversed $fit $aspect $flipped $rotation $chromeless   how it is shown
*/

export let $src        = null;        // object url of the loaded file
export let $title      = '';
export let $duration   = 0;
export let $current    = 0;
export let $playing    = false;
export let $loop       = false;
export let $reversed   = false;
export let $fit        = 'contain';   // contain | cover
export let $aspect     = null;        // null: as it is, else a css aspect-ratio
export let $flipped    = false;
export let $rotation   = 0;           // 0 | 90 | 180 | 270
export let $chromeless = false;       // a double tap hides the bars

export const $transform = [$rotation && `rotate(${$rotation}deg)`, $flipped && 'scaleX(-1)'].filter(Boolean).join(' ') || 'none';

const ASPECTS = [null, '9 / 16', '16 / 9', '1 / 1', '4 / 3'];
const FPS     = 30;   // a <video> knows no frame rate: stepping assumes 30

let video = null;

const clamp = time => Math.min($duration || 0, Math.max(0, time));

export function format (time) {
  if (!isFinite(time)) return '0:00';
  return `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`;
}

// :::::: REVERSE, the current time walked down frame by frame

let frame = 0;
let last  = 0;

function back (now) {
  if (!video || !$playing || !$reversed) { frame = 0; return; }
  const step = last ? (now - last) / 1000 : 0;
  last = now;
  let time = video.currentTime - step;
  if (time <= 0) {
    if (!$loop) { video.currentTime = 0; $current = 0; pause(); return; }
    time = video.duration;
  }
  video.currentTime = time;
  $current = time;
  frame = requestAnimationFrame(back);
}

function drive () {
  if (!video) return;
  cancelAnimationFrame(frame);
  frame = 0;
  if ($reversed) { video.pause(); last = 0; frame = requestAnimationFrame(back); }
  else video.play().catch(error => console.warn('[videos] play() rejected', error));
}

// :::::: TRANSPORT

export function play () {
  if (!$src) return;
  $playing = true;
  drive();
}

export function pause () {
  $playing = false;
  cancelAnimationFrame(frame);
  frame = 0;
  video?.pause();
}

export const toggle = () => $playing ? pause() : play();

export function seek (time) {
  if (!video) return;
  video.currentTime = clamp(time);
  $current = video.currentTime;
}

export const skip = seconds => seek((video?.currentTime ?? 0) + seconds);

// one frame, paused
export function step (direction) {
  pause();
  seek((video?.currentTime ?? 0) + direction / FPS);
}

export function toggleReverse () {
  $reversed = !$reversed;
  if ($playing) drive();
}

export function toggleLoop () {
  $loop = !$loop;
  if (video) video.loop = $loop;   // forward loops natively, reverse in back()
}

export const cycleAspect = () => { $aspect = ASPECTS[(ASPECTS.indexOf($aspect) + 1) % ASPECTS.length]; };
export const toggleCrop  = () => { $fit = $fit === 'cover' ? 'contain' : 'cover'; };
export const toggleFlip  = () => { $flipped = !$flipped; };
export const rotate      = () => { $rotation = ($rotation + 90) % 360; };
export const toggleChrome = () => { $chromeless = !$chromeless; };

// :::::: THE CLIP

// a file plays from an object url, the disk is not touched again. src is set here, not bound: an
// empty src="" puts a <video> into an error state it does not always leave
export function load (file) {
  if (!file) return;
  pause();
  if ($src) URL.revokeObjectURL($src);
  $src      = URL.createObjectURL(file);
  $title    = file.name;
  $duration = 0;
  $current  = 0;
  $reversed = false;
  if (video) { video.src = $src; video.load(); }
}

// <Stage> mounted its element: listen to it, and give it the clip a view before had
export function attach (element) {
  video = element;
  const listeners = {
    ended          : () => { if (!$loop) $playing = false; },
    error          : () => { console.warn('[videos] media error', element.error); $playing = false; },
    loadedmetadata : () => { $duration = element.duration || 0; },
    timeupdate     : () => { if (!$reversed) $current = element.currentTime; },
  };
  for (const [type, fn] of Object.entries(listeners)) element.addEventListener(type, fn);
  element.loop = $loop;

  if ($src && element.src !== $src) {
    const at = $current;
    element.src = $src;
    element.load();
    if (at) element.addEventListener('loadedmetadata', () => { element.currentTime = at; }, { once: true });
  }

  return () => {
    for (const [type, fn] of Object.entries(listeners)) element.removeEventListener(type, fn);
    pause();
    if (video === element) video = null;
  };
}
