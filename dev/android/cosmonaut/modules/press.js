// cosmonaut :: modules/press.js
//
// a behavior: <button @hold={fn}> fires fn on a long press (and on a right click, for the desktop
// mock), and swallows the click that follows, so a long press does not tap through as well

const MS = 450;

export function hold (element, handler) {
  let fired = false;
  let timer = null;
  let x     = 0;
  let y     = 0;

  const clear = () => { clearTimeout(timer); timer = null; };

  const listeners = {
    pointercancel : clear,
    pointerup     : clear,

    click (event) {
      if (!fired) return;
      event.stopPropagation();
      event.preventDefault();
      fired = false;
    },

    contextmenu (event) {
      event.preventDefault();
      clear();
      handler(event);
    },

    pointerdown (event) {
      fired = false;
      ({ clientX: x, clientY: y } = event);
      clear();
      timer = setTimeout(() => { fired = true; handler(event); }, MS);
    },

    pointermove (event) {
      if (timer && Math.hypot(event.clientX - x, event.clientY - y) > 10) clear();
    },
  };

  for (const [type, fn] of Object.entries(listeners)) element.addEventListener(type, fn, type === 'click');
  return () => { clear(); for (const [type, fn] of Object.entries(listeners)) element.removeEventListener(type, fn, type === 'click'); };
}
