// subotnik :: modules/touch.js
//
// behaviors for the markup (@tile, @swipe): a tap that a scroll does not fire, a long press, and a
// vertical swipe that only counts where it starts at the edge of its scroller
//
//   <button @tile={{ tap, hold }}>
//   <div @swipe={{ accept: dy => dy < -70, run: open }}>

const MOVE = 12;    // px a finger may move before the gesture is a scroll
const HOLD = 480;   // ms to a long press

const vibrate = () => { try { navigator.vibrate?.(12); } catch {} };

export function tile (element, { hold, tap } = {}) {
  let held  = false;
  let moved = false;
  let timer = 0;
  let x     = 0;
  let y     = 0;

  const stop = () => { clearTimeout(timer); timer = 0; };

  const listeners = {
    contextmenu : event => { event.preventDefault(); hold?.(); },
    // a mouse (the browser): a click taps, the right button holds
    click       : () => { if (!('ontouchstart' in window)) tap?.(); },
    touchcancel : () => { stop(); moved = true; },
    touchend    : () => { stop(); if (!held && !moved) tap?.(); },

    touchmove (event) {
      const point = event.touches[0];
      if (Math.abs(point.clientX - x) > MOVE || Math.abs(point.clientY - y) > MOVE) { moved = true; stop(); }
    },

    touchstart (event) {
      held  = false;
      moved = false;
      ({ clientX: x, clientY: y } = event.touches[0]);
      stop();
      timer = setTimeout(() => { if (!moved) { held = true; vibrate(); hold?.(); } }, HOLD);
    },
  };

  for (const [type, fn] of Object.entries(listeners)) element.addEventListener(type, fn, { passive: !['contextmenu', 'touchend'].includes(type) });
  return () => { stop(); for (const [type, fn] of Object.entries(listeners)) element.removeEventListener(type, fn); };
}

const atBottom = element => element.scrollTop + element.clientHeight >= element.scrollHeight - 2;

// the edge is taken when the finger goes down: a scroll that only ends at the edge is no swipe
export function swipe (element, { accept, run }) {
  let edge = null;
  let x    = 0;
  let y    = 0;

  const start = event => {
    ({ clientX: x, clientY: y } = event.touches[0]);
    edge = { bottom: atBottom(element), top: element.scrollTop <= 0 };
  };

  const end = event => {
    if (!edge) return;
    const point = event.changedTouches[0];
    const dx    = point.clientX - x;
    const dy    = point.clientY - y;
    const from  = edge;
    edge = null;
    if (Math.abs(dy) < Math.abs(dx) * 1.5) return;
    if ((dy < 0 && !from.bottom) || (dy > 0 && !from.top)) return;
    if (accept(dy)) run();
  };

  element.addEventListener('touchstart', start, { passive: true });
  element.addEventListener('touchend', end);
  return () => { element.removeEventListener('touchstart', start); element.removeEventListener('touchend', end); };
}
