// @rat/runtime :: errors

/*
an error of a component, thrown while it renders, in one of its effects or in
an event handler (a promise the handler returns too), is raised as 'rat:error'
from the node it happened at: bubbling, through shadow roots, cancelable,
detail { error, boundary }.

the nearest boundary takes it with preventDefault() and puts itself into
detail.boundary: <rat-view> and <rat-part> show it in place of their component,
<rat-app> catches what no view took. an error nobody takes goes to
reportError(), the console as for any uncaught error.

detail.source says where it came from: 'render' (rendering, an effect, a row),
or 'handler' (an event handler, a command). a failed handler leaves its
component intact: views and parts let it pass, <rat-app> hands it to
app.on('error', fn) (a toast) instead of taking the view down.

  app.addEventListener('rat:error', ({ detail }) => log(detail.error, detail.source, detail.boundary));
*/

import { isFn } from '../common/shared.js';

const ERROR = 'rat:error';

// a handler's element may be gone by the time its promise fails (its component closed on the way): its
// error is raised on the document then, where <rat-app> takes it as well
function raise (node, error, source = 'render') {
  const event  = new CustomEvent(ERROR, { bubbles: true, cancelable: true, composed: true, detail: { boundary: null, error, source } });
  const target = node?.isConnected ? node : source === 'handler' ? globalThis.document : null;
  if (!target || target.dispatchEvent(event)) (globalThis.reportError ?? console.error)(error);
  return event.detail.boundary;
}

// fn with its errors raised from node (from this, the element of a listener, without node)
const guard = (fn, node = null) => function (...args) {
  try {
    const result = fn.apply(this, args);
    if (isFn(result?.catch)) result.catch(error => raise(node ?? this, error));
    return result;
  }
  catch (error) { raise(node ?? this, error); }
};

// :::::: EXPORT

export { ERROR, guard, raise };
