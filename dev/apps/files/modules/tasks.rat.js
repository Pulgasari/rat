// files :: modules/tasks.rat.js

/*
work that takes a while runs here, never in front of the user: reading the folder, writing to it,
copying and moving. a task waits in its lane, runs, and ends in the history. the lanes run side by
side, the tasks of one lane one after another: two writes never race, a write does not wait for the
index.

  const done = run({ label: 'Rename a.txt', icon: 'lucide:pencil', lane: 'write' }, async ({ progress, signal }) => {
    progress(1, 3);   // done, total
  });

  task      { id, label, icon, lane, state, progress: { done, total } | null, error, queuedAt, startedAt, endedAt }
  state     queued, running, done, failed, cancelled

  $queue     the tasks not ended yet, in the order they came
  $history   the ended ones, newest first, kept across visits (HISTORY of them)
  $busy      a task is running
*/

import { untrack } from '@rat/signals';

import { read, write } from '../../.shared/storage.js';

const HISTORY = 50;
const STORAGE = 'files:tasks';

export let   $queue   = [];
export let   $history = read(STORAGE, []);
export const $busy    = $queue.some(task => task.state === 'running');

const controllers = new Map;   // id -> AbortController
const lanes       = new Map;   // lane -> promise of the last task in it
let   counter     = 0;

// untracked: progress is often reported from inside an effect, which would otherwise subscribe to the
// queue it writes
const tasks = () => untrack(() => $queue);

// a task is replaced, never changed in place
function patch (id, changes) {
  $queue = tasks().map(task => task.id === id ? { ...task, ...changes } : task);
}

function finish (id, changes) {
  const task    = { ...tasks().find(item => item.id === id), ...changes, endedAt: Date.now() };
  const history = [task, ...untrack(() => $history)].slice(0, HISTORY);
  $queue   = tasks().filter(item => item.id !== id);
  $history = history;
  controllers.delete(id);
  write(STORAGE, history);
}

export function run ({ icon = 'lucide:loader', label, lane = 'default' }, work) {
  const id         = `task-${Date.now().toString(36)}-${++counter}`;
  const controller = new AbortController;
  controllers.set(id, controller);

  $queue = [...tasks(), { error: null, icon, id, label, lane, progress: null, queuedAt: Date.now(), state: 'queued' }];

  const job = (lanes.get(lane) ?? Promise.resolve()).catch(() => {}).then(async () => {
    if (controller.signal.aborted) { finish(id, { state: 'cancelled' }); return null; }

    patch(id, { startedAt: Date.now(), state: 'running' });
    const progress = (done, total) => patch(id, { progress: { done, total } });

    try {
      const result = await work({ progress, signal: controller.signal });
      finish(id, { state: controller.signal.aborted ? 'cancelled' : 'done' });
      return result;
    }
    catch (error) {
      finish(id, error?.name === 'AbortError' ? { state: 'cancelled' } : { error: String(error?.message ?? error), state: 'failed' });
      throw error;
    }
  });

  lanes.set(lane, job);
  return job;
}

// a queued task never starts, a running one is asked to stop through its signal
export const cancel = id => controllers.get(id)?.abort();

export function clearHistory () {
  $history = [];
  write(STORAGE, []);
}
