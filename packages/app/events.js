// @rat/app :: events

/*
on(type, fn) of rat's elements is about their own events, not the dom's: fn gets what happened (the
detail), not an event object, and on() returns the stop. dom events go through RAT.dom (@domina/dom):

  RAT.app.on('navigate', ({ from, to }) => …);
  RAT.app.on('error', toast.error);
  view.on('enter', ({ params }) => …);
  area.on('toggle', ({ open }) => …);

  RAT.dom(element).on('click', …);   // the dom

the events themselves stay dom events (rat:enter, toggle …): they bubble, markup listens to them
(ontoggle={…}) and RAT.dom reads them. on() hears the ones of the element itself, not of one below it.
*/

// the stop for fn hearing type from element itself, fn gets the detail
function hear (element, type, fn) {
  const listener = event => { if (event.target === element) fn.call(element, event.detail); };
  element.addEventListener(type, listener);
  return () => element.removeEventListener(type, listener);
}

// on() of an element: events, { type: the dom event }; special, { type: (fn, options) => stop }
export function ownEvents (element, events, special = {}) {
  return (type, fn, options) => {
    if (type in special) return special[type](fn, options);
    if (type in events)  return hear(element, events[type], fn);
    throw new TypeError(`[rat] <${element.localName}> has no event "${type}": ${[...Object.keys(special), ...Object.keys(events)].sort().join(', ')}`);
  };
}
