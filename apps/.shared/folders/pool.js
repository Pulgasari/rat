// apps/.shared/folders/pool.js (a copy of zugriff's .shared/js/vendors/pool.js)
//
// a bounded concurrency gate. hand it async jobs and it runs at most `max` of
// them at once, queueing the rest — so a burst of work (a page of thumbnails,
// a folder of books to parse) overlaps without opening an unbounded flood of
// promises at the same time. no workers, no i/o of its own: it only decides
// *how many* of your promises are allowed to be in flight.
//
//   import { createPool } from './pool.js';
//   const gate = createPool(3);
//   const cover = await gate(() => extract(file));   // waits for a free slot
//   await gate.all(files, f => extract(f));            // whole batch, 3 at a time
//
// modelled on the inline limiter lib/thumbs.js grew — pulled out so every app
// (and brigade.js, for its submission side) shares one implementation.

export function createPool (max = 3) {
  const limit = Math.max(1, max | 0);
  const queue = [];
  let active  = 0;

  const pump = () => {
    if (active >= limit || !queue.length) return;
    active++;
    const { fn, resolve, reject } = queue.shift();
    Promise.resolve().then(fn).then(resolve, reject).finally(() => { active--; pump(); });
  };

  // enqueue one job; resolves / rejects with the job's own result
  const run = fn => new Promise((resolve, reject) => { queue.push({ fn, resolve, reject }); pump(); });

  // run a job per item, at most `max` at once; resolves to the results in order
  run.all = (items, job) => Promise.all(Array.from(items, (item, i) => run(() => job(item, i))));

  run.active  = () => active;         // jobs in flight right now
  run.pending = () => queue.length;   // jobs still waiting for a slot
  run.size    = () => active + queue.length;
  run.idle    = () => active === 0 && queue.length === 0;

  return run;
}

export default createPool;
