// @rat/app :: boundary

/*
<rat-view>, <rat-part> and <rat-app2> are error boundaries: they take the
'rat:error' raised below them (@rat/runtime, errors.js) that no inner boundary
took. a view or a part shows the error in place of its component, with a
retry when it has a src to load again. [error] is set meanwhile.
*/

import { ERROR } from '@rat/runtime';

const create = (tag, part, text) => {
  const element = Object.assign(document.createElement(tag), { textContent: text });
  element.setAttribute('part', part);
  return element;
};

// the error in place of what the element held
export function showError (element, error, retry = null) {
  console.error(error);
  element.toggleAttribute('error', true);
  const nodes = [create('pre', 'error', error?.message ?? String(error))];
  if (retry) {
    const button = create('button', 'retry', 'retry');
    button.type = 'button';
    button.addEventListener('click', retry);
    nodes.push(button);
  }
  element.replaceChildren(...nodes);
}

// fail(error) for what is raised below element and was not taken yet, returns the stop
export function catchErrors (element, fail) {
  const take = event => {
    if (event.defaultPrevented) return;
    event.preventDefault();
    event.detail.boundary = element;
    fail(event.detail.error);
  };
  element.addEventListener(ERROR, take);
  return () => element.removeEventListener(ERROR, take);
}
