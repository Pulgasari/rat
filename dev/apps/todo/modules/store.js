// todo :: modules/store.js
// the tasks and lists, in the tables of RAT.app.database and as signals. every
// write goes to both.
//
//   await store.load();
//   const task = await store.add(parse('call anna tomorrow #family'));
//   await store.tick(task.id);   // a repeating task makes its next one
//   await store.undo();          // the last tick, delete or edit
//
// a deleted task stays as a tombstone ({ deleted }) so a sync knows it is gone.

import { computed, signal } from '@rat/signals';

import { dayOf, nextDue } from './dates.js';

const db = () => RAT.app.database;

export const INBOX = 'inbox';

// :::::: STATE :::::::::::::::::::::::::::::::::::::::::::::::

const all = signal([]);   // with tombstones

export const tasks = computed(() => all.value.filter(task => !task.deleted));
export const lists = signal([]);
export const ready = signal(false);

// a hook for the sync: called after every local write
export const changed = signal(0);

let last = null;   // { label, restore }

const now = () => Date.now();
const uid = () => crypto.randomUUID?.() ?? `${now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

// :::::: LOAD ::::::::::::::::::::::::::::::::::::::::::::::::

async function reload () {
  const [rows, listRows] = await Promise.all([db().tasks.values(), db().lists.values()]);
  all.value   = rows;
  lists.value = withInbox(listRows.filter(list => !list.deleted)).sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

const withInbox = rows => rows.some(list => list.id === INBOX) ? rows : [{ id: INBOX, name: 'Inbox', order: -1, changed: 0 }, ...rows];

export async function load () {
  await reload();
  ready.value = true;
}

// :::::: WRITE :::::::::::::::::::::::::::::::::::::::::::::::

async function put (task) {
  all.value = all.peek().some(item => item.id === task.id)
    ? all.peek().map(item => item.id === task.id ? task : item)
    : [...all.peek(), task];
  await db().tasks.set(task.id, task);
  changed.value++;
  return task;
}

async function putMany (rows) {
  const ids = new Map(rows.map(row => [row.id, row]));
  all.value = [...all.peek().map(item => ids.get(item.id) ?? item), ...rows.filter(row => !all.peek().some(item => item.id === row.id))];
  for (const row of rows) await db().tasks.set(row.id, row);
  changed.value++;
}

export const get = id => all.peek().find(task => task.id === id) ?? null;

function remember (label, rows) {
  const before = rows.map(row => ({ ...row }));
  last = { label, restore: () => putMany(before.map(row => ({ ...row, changed: now() }))) };
}

// a list by its name, made when it is not there yet
export async function listNamed (name) {
  if (!name) return INBOX;
  const key   = name.toLowerCase();
  const found = lists.peek().find(list => list.id === key || list.name.toLowerCase() === key);
  if (found) return found.id;
  return (await addList(name)).id;
}

export async function add (parsed, extra = {}) {
  const list     = extra.list ?? await listNamed(parsed.list);
  const siblings = tasks.peek().filter(task => task.list === list);
  const task     = {
    id       : uid(),
    title    : parsed.title || 'untitled',
    notes    : '',
    done     : null,
    list     : list,
    tags     : [...new Set(parsed.tags ?? [])],
    priority : parsed.priority ?? 0,
    due      : parsed.due ?? null,
    remind   : null,
    repeat   : parsed.repeat ?? null,
    parent   : null,
    order    : siblings.reduce((max, item) => Math.max(max, item.order ?? 0), 0) + 1,
    created  : now(),
    changed  : now(),
    ...extra,
  };
  return put(task);
}

export async function update (id, changes, { undoable = true } = {}) {
  const task = get(id);
  if (!task) return null;
  if (undoable) remember('edit', [task]);
  return put({ ...task, ...changes, changed: now() });
}

// done <-> open. a repeating task ticked makes its next one, once
export async function tick (id) {
  const task = get(id);
  if (!task) return null;

  if (task.done) {
    remember('untick', [task]);
    return put({ ...task, done: null, changed: now() });
  }

  const done = { ...task, done: now(), changed: now() };
  const due  = nextDue(task);
  if (!due) {
    remember('tick', [task]);
    return put(done);
  }

  const next = { ...task, id: uid(), done: null, due, created: now(), changed: now() };
  const subtasks = tasks.peek().filter(item => item.parent === task.id).map(item => ({ ...item, id: uid(), parent: next.id, done: null, created: now(), changed: now() }));
  last = { label: 'tick', restore: () => putMany([{ ...task, changed: now() }, { ...next, deleted: now(), changed: now() }, ...subtasks.map(item => ({ ...item, deleted: now(), changed: now() }))]) };
  await putMany([done, next, ...subtasks]);
  return next;
}

// a task and its subtasks become tombstones
export async function remove (id) {
  const task = get(id);
  if (!task) return;
  const rows = [task, ...tasks.peek().filter(item => item.parent === id)];
  remember('delete', rows);
  await putMany(rows.map(row => ({ ...row, deleted: now(), changed: now() })));
}

export async function undo () {
  if (!last) return null;
  const { label, restore } = last;
  last = null;
  await restore();
  return label;
}

// the new order of a list, by the ids in their new order
export async function reorder (ids) {
  const rows = ids.map((id, index) => ({ ...get(id), order: index + 1, changed: now() })).filter(row => row.id);
  await putMany(rows);
}

// :::::: LISTS :::::::::::::::::::::::::::::::::::::::::::::::

async function putList (list) {
  lists.value = withInbox([...lists.peek().filter(item => item.id !== list.id), list]).sort((a, b) => a.order - b.order);
  await db().lists.set(list.id, list);
  changed.value++;
  return list;
}

export async function addList (name) {
  const id    = name.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || uid();
  const order = lists.peek().reduce((max, list) => Math.max(max, list.order), 0) + 1;
  return putList({ id: lists.peek().some(list => list.id === id) ? uid() : id, name, order, changed: now() });
}

export const renameList = (id, name) => putList({ ...lists.peek().find(list => list.id === id), name, changed: now() });

// its tasks go to the inbox
export async function removeList (id) {
  if (id === INBOX) return;
  const moved = tasks.peek().filter(task => task.list === id).map(task => ({ ...task, list: INBOX, changed: now() }));
  if (moved.length) await putMany(moved);
  await putList({ ...lists.peek().find(list => list.id === id), deleted: now(), changed: now() });
  lists.value = lists.peek().filter(list => list.id !== id);
}

// :::::: QUERIES :::::::::::::::::::::::::::::::::::::::::::::

export const tags = computed(() => [...new Set(tasks.value.flatMap(task => task.tags))].sort());

export const today = () => dayOf();

export const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0) || a.created - b.created;
export const byDue   = (a, b) => (a.due ?? '￿').localeCompare(b.due ?? '￿') || b.priority - a.priority || byOrder(a, b);

// :::::: EXCHANGE ::::::::::::::::::::::::::::::::::::::::::::

export const snapshot = () => ({ version: 1, lists: lists.peek(), tasks: all.peek() });

// the newer one of each wins, by `changed`. tombstones travel along
export async function merge ({ lists: theirLists = [], tasks: theirTasks = [] } = {}) {
  const mine     = new Map(all.peek().map(task => [task.id, task]));
  const incoming = theirTasks.filter(task => task?.id && (!mine.has(task.id) || (task.changed ?? 0) > (mine.get(task.id).changed ?? 0)));
  if (incoming.length) {
    for (const task of incoming) await db().tasks.set(task.id, task);
  }

  const myLists = new Map(lists.peek().map(list => [list.id, list]));
  const newer   = theirLists.filter(list => list?.id && (!myLists.has(list.id) || (list.changed ?? 0) > (myLists.get(list.id).changed ?? 0)));
  for (const list of newer) await db().lists.set(list.id, list);

  await reload();
  return incoming.length + newer.length;
}

// :::::: TODO.TXT ::::::::::::::::::::::::::::::::::::::::::::

// x 2026-10-07 (A) call anna +family due:2026-10-08
const LETTERS = { 3: 'A', 2: 'B', 1: 'C' };

export function toTodoTxt () {
  const listName = id => lists.peek().find(list => list.id === id)?.name.replace(/\s+/g, '-');
  return tasks.peek().sort(byDue).map(task => [
    task.done && `x ${dayOf(new Date(task.done))}`,
    !task.done && LETTERS[task.priority] && `(${LETTERS[task.priority]})`,
    dayOf(new Date(task.created)),
    task.title,
    task.list !== INBOX && `+${listName(task.list) ?? task.list}`,
    ...task.tags.map(tag => `@${tag}`),
    task.due && `due:${task.due.slice(0, 10)}`,
    task.due?.length > 10 && `at:${task.due.slice(11)}`,
    task.repeat && `rec:${task.repeat.from === 'done' ? '' : '+'}${task.repeat.every}${task.repeat.unit[0]}`,
  ].filter(Boolean).join(' ')).join('\n') + '\n';
}

export async function fromTodoTxt (text) {
  let count = 0;
  for (const line of String(text).split(/\r?\n/).map(line => line.trim()).filter(Boolean)) {
    let rest = line;
    const done = /^x (\d{4}-\d{2}-\d{2} )?/.exec(rest);
    if (done) rest = rest.slice(done[0].length);
    const priority = /^\(([A-C])\) /.exec(rest);
    if (priority) rest = rest.slice(priority[0].length);
    rest = rest.replace(/^\d{4}-\d{2}-\d{2} /, '');

    const words = rest.split(/\s+/);
    const meta  = Object.fromEntries(words.filter(word => /^[a-z]+:[^/]/.test(word)).map(word => word.split(/:(.*)/s).slice(0, 2)));
    const title = words.filter(word => !/^[+@]\S/.test(word) && !/^[a-z]+:[^/]/.test(word)).join(' ');
    const rec   = /^(\+)?(\d+)([dwmy])$/.exec(meta.rec ?? '');

    await add({
      title,
      due      : meta.due ? (meta.at ? `${meta.due}T${meta.at}` : meta.due) : null,
      list     : words.find(word => word.startsWith('+'))?.slice(1),
      priority : priority ? { A: 3, B: 2, C: 1 }[priority[1]] : 0,
      repeat   : rec ? { every: Number(rec[2]), unit: { d: 'day', w: 'week', m: 'month', y: 'year' }[rec[3]], on: null, from: rec[1] ? 'due' : 'done' } : null,
      tags     : words.filter(word => word.startsWith('@')).map(word => word.slice(1).toLowerCase()),
    }, done ? { done: done[1] ? new Date(done[1]).getTime() : now() } : {});
    count++;
  }
  return count;
}

export default { add, addList, get, listNamed, load, merge, remove, removeList, renameList, reorder, snapshot, tick, undo, update };
