// @rat/runtime :: errors

/*
an error of a component, thrown while it renders, in one of its effects or in
an event handler (a promise the handler returns too), is raised as 'rat:error'
from the node it happened at: bubbling, through shadow roots, cancelable,
detail { error, boundary }.

the nearest boundary takes it with preventDefault() and puts itself into
detail.boundary: <rat-view> and <rat-part> show it in place of their component,
<rat-app2> catches what no view took. an error nobody takes goes to
reportError(), the console as for any uncaught error.

  app.addEventListener('rat:error', ({ detail }) => log(detail.error, detail.boundary));
*/

import { isFn } from '../common/shared.js';

const ERROR = 'rat:error';

function raise (node, error) {
  const event = new CustomEvent(ERROR, { bubbles: true, cancelable: true, composed: true, detail: { boundary: null, error } });
  if (!node?.isConnected || node.dispatchEvent(event)) (globalThis.reportError ?? console.error)(error);
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
