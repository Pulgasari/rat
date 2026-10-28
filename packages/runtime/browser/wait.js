// @rat/runtime :: wait

/*
@await (user of load($id)) … @pending … @catch (error) …, as the compiler hands it over:

  wait(() => load($id), value => view, () => pending view, error => failed view)

the promise is asked again whenever what it reads changes: a new one shows pending (nothing without
@pending) and replaces the one before, whose late answer is dropped. ready and failed get getters, so
their branch stays and follows the next answer. without failed a rejection is left unhandled: it goes to
the app's on('error'), the toast. a component that goes drops every answer still on its way.
*/

import { effect, onCleanup, signal } from '../common/shared.js';
import { when }                      from '@htx/js/render';

const PENDING = { status: 'pending' };

function wait (source, ready, pending = null, failed = null) {
  const state  = signal(PENDING);
  let   ticket = 0;

  effect(() => {
    const mine    = ++ticket;
    const promise = Promise.resolve(source());
    state.value = PENDING;

    const settle = next => { if (mine === ticket) state.value = next; };
    const done   = value => settle({ status: 'ready', value });

    if (failed) promise.then(done, error => settle({ error, status: 'failed' }));
    else promise.then(done);
  });

  onCleanup(() => { ticket++; });

  const value = () => state.value.value;
  const error = () => state.value.error;

  return when(
    () => state.value.status === 'ready',
    () => ready(value),
    () => when(() => state.value.status === 'failed', () => failed?.(error) ?? null, () => pending?.() ?? null),
  );
}

// :::::: EXPORT

export { wait };
