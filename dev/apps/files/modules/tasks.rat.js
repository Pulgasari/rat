// files :: modules/tasks.rat.js

/*
work that takes a while runs here, never in front of the user: reading the folder, writing to it,
copying and moving. a task waits in its lane, runs, and ends in the history. the lanes run side by
side, the tasks of one lane one after another: two writes never race, a write does not wait for the
index.

  const done = run({ label: 'Rename a.txt', icon: 'lucide:pencil', lane: 'write' }, async ({ progress, signal }) => {
    progress(1, 3);   // done, total
  });

  task      a $Record { id, label, icon, lane, state, progress: { done, total } | null, error, queuedAt, startedAt, endedAt }
  state     queued, running, done, failed, cancelled

  $queue     the tasks not ended yet, in the order they came
  $history   the ended ones, newest first, kept across visits (HISTORY of them)
  $busy      a task is running
*/

// :::::: IMPORT

import { $List, $Record } from '@rat/types';

// ::::::

const HISTORY = 50;

const // ::: the lists, changed in place. the ended ones kept
$open   = new $List,
$ended! = new $List;

export const // ::: what the views read: signals, as every $name another module imports
$queue   = $open.toArray(),
$history = $ended.toArray(),
$busy    = $open.has({ state: 'running' });

const controllers = new WeakMap;   // task -> AbortController
const lanes       = new Map;       // lane -> promise of the last task in it

const isAbort = error => error?.name === 'AbortError';

// the last task of the lane, settled either way
const after = lane => (lanes.get(lane) ?? Promise.resolve()).catch(() => {});

function finish (task, changes) {
  Object.assign(task, changes, { endedAt: Date.now() });
  $open.remove(task);
  $ended.unshift(task.toJSON());
  $ended.splice(HISTORY);
}

export function run ({ icon = 'lucide:loader', label, lane = 'default' }, work) {
  const controller = new AbortController;
  const { signal } = controller;
  const task       = new $Record({
    endedAt   : null,
    error     : null,
    icon,
    id        : crypto.randomUUID(),
    label,
    lane,
    progress  : null,
    queuedAt  : Date.now(),
    startedAt : null,
    state     : 'queued',
  });

  controllers.set(task, controller);
  $open.push(task);

  const progress = (done, total) => { task.progress = { done, total }; };

  const job = after(lane).then(async () => {
    if (signal.aborted) {
      finish(task, { state: 'cancelled' });
      return null;
    }

    Object.assign(task, { startedAt: Date.now(), state: 'running' });

    try {
      const result = await work({ progress, signal });
      finish(task, { state: signal.aborted ? 'cancelled' : 'done' });
      return result;
    }
    catch (error) {
      finish(task, isAbort(error) ? { state: 'cancelled' } : { error: String(error?.message ?? error), state: 'failed' });
      throw error;
    }
  });

  lanes.set(lane, job);
  return job;
}

// a queued task never starts, a running one is asked to stop through its signal
export const
cancel = (task) => controllers.get(task)?.abort(),
clearHistory = () => $ended.clear();
