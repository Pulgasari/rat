// todo :: state.rat.js

/*
what the views share: their tasks in titled groups, the task in the editor, the list and the tag a
view shows, the search. and what the keys and the menu do.

  sectionsOf(name)   [{ title, tasks, empty, collapsed }] of a view
  $selected          the id of the task in the editor
  $list, $tag        what the list and the tag view show, kept
*/

import { addDays, dayLabel, dayOf, dueDay, dueLabel } from './modules/dates.js';
import * as store from './modules/store.js';

import { toast } from '../.shared/toast.js';

const { dialogs, router } = RAT.app;

const area = name => RAT.app.area(name);
const go   = name => router.go(name === 'today' ? '/' : `/${name}`);

// :::::: STATE

export let $filter   = '';
export let $selected = null;
export let $list!    = store.INBOX;
export let $tag!     = null;

// the view on screen, by its route
export const $view = router.$path.value.split('/')[1] || 'today';

// :::::: QUERIES

const $open = store.tasks.value.filter(task => !task.done && !task.parent);

const matches = (task, query) => [task.title, task.notes, ...task.tags].some(text => text?.toLowerCase().includes(query));

const SECTIONS = {
  today () {
    const today = dayOf();
    return [
      { tasks: $open.filter(task => task.due && dueDay(task.due) < today).sort(store.byDue), title: 'overdue' },
      { empty: 'nothing due today', tasks: $open.filter(task => dueDay(task.due) === today).sort(store.byDue), title: 'today' },
      { tasks: $open.filter(task => !task.due && task.priority === 3).sort(store.byOrder), title: 'high priority' },
    ];
  },

  upcoming () {
    const today = dayOf();
    const limit = addDays(today, 28);
    const days  = new Map;
    for (const task of $open.filter(task => task.due && dueDay(task.due) > today && dueDay(task.due) <= limit).sort(store.byDue)) {
      const day = dueDay(task.due);
      if (!days.has(day)) days.set(day, []);
      days.get(day).push(task);
    }
    return [
      ...[...days].map(([day, tasks]) => ({ tasks, title: dayLabel(day) })),
      { collapsed: true, tasks: $open.filter(task => task.due && dueDay(task.due) > limit).sort(store.byDue), title: 'later' },
    ];
  },

  someday () {
    return [{ empty: 'no undated tasks in the inbox', tasks: $open.filter(task => !task.due && task.list === store.INBOX).sort(store.byOrder) }];
  },

  list () {
    return [
      { empty: 'nothing to do here', tasks: $open.filter(task => task.list === $list).sort(store.byOrder) },
      { collapsed: true, tasks: store.tasks.value.filter(task => task.done && !task.parent && task.list === $list).sort((a, b) => b.done - a.done), title: 'done' },
    ];
  },

  tag () {
    return [{ empty: 'no open task with this tag', tasks: $open.filter(task => task.tags.includes($tag)).sort(store.byDue) }];
  },

  done () {
    const days = new Map;
    for (const task of store.tasks.value.filter(task => task.done && !task.parent).sort((a, b) => b.done - a.done).slice(0, 300)) {
      const day = dayOf(new Date(task.done));
      if (!days.has(day)) days.set(day, []);
      days.get(day).push(task);
    }
    return [...days].map(([day, tasks]) => ({ tasks, title: dayLabel(day) }));
  },

  search () {
    const query = $filter.trim().toLowerCase();
    if (!query) return [];
    const found = store.tasks.value.filter(task => !task.parent && matches(task, query));
    return [
      { empty: 'no open task matches', tasks: found.filter(task => !task.done).sort(store.byDue) },
      { collapsed: true, tasks: found.filter(task => task.done), title: 'done' },
    ];
  },
};

export const sectionsOf = name => SECTIONS[name]();

const TITLES = { done: 'Done', search: 'Search', someday: 'Someday', today: 'Today', upcoming: 'Upcoming' };

export function titleOf (name) {
  if (name === 'list') return store.lists.value.find(list => list.id === $list)?.name ?? 'List';
  if (name === 'tag')  return `#${$tag ?? ''}`;
  return TITLES[name];
}

// what the add field fills in by itself in a view
export const defaultsOf = name => ({
  due  : name === 'today' ? dayOf() : null,
  list : name === 'list'  ? $list   : null,
  tag  : name === 'tag'   ? $tag    : null,
});

// the numbers of the menu
export const $counts = {
  someday  : $open.filter(task => !task.due && task.list === store.INBOX).length,
  today    : $open.filter(task => task.due && dueDay(task.due) <= dayOf()).length,
  upcoming : $open.filter(task => task.due && dueDay(task.due) > dayOf()).length,
};

export const countOfList = id   => $open.filter(task => task.list === id).length;
export const countOfTag  = name => $open.filter(task => task.tags.includes(name)).length;

// :::::: THE EDITOR AND THE MENU

// a drawer closes once something in it was picked, a sidebar stays
export const closeMenu = () => { if (area('menu')?.isOverlay) area('menu').hide(); };

export function edit (id) {
  $selected = id;
  RAT.app.toggle('context', true);
}

export function closeEditor () {
  RAT.app.toggle('context', false);
  $selected = null;
}

export function openView (name) {
  go(name);
  closeMenu();
}

export function openList (id) {
  $list = id;
  openView('list');
}

export function openTag (name) {
  $tag = name;
  openView('tag');
}

// the search has a view of its own while there is a query
export function search (text) {
  $filter = text;
  if (text.trim() && $view !== 'search') go('search');
  if (!text.trim() && $view === 'search') go('today');
}

// :::::: TASKS, with an undo in the toast

export function undoToast (text) {
  const element = toast({ duration: 5000, message: '' });
  const label   = Object.assign(document.createElement('span'), { textContent: `${text} ` });
  const button  = Object.assign(document.createElement('button'), { className: 'undo', textContent: 'undo', type: 'button' });
  button.addEventListener('click', async () => { await store.undo(); element?.dismiss?.(); });
  element?.append(label, button);
}

export async function tickTask (id) {
  const task = store.get(id);
  const next = await store.tick(id);
  if (!task.done) undoToast(next && next.id !== id ? `done, next ${dueLabel(next.due)}` : 'done');
}

export async function removeTask (id) {
  if ($selected === id) $selected = null;
  await store.remove(id);
  undoToast('deleted');
}

// :::::: LISTS

export async function newList () {
  const name = await dialogs.prompt({ message: 'the name of the list', ok: 'Create', title: 'New list' });
  if (!name?.trim()) return;
  openList((await store.addList(name.trim())).id);
}

export async function renameList (id) {
  const list = store.lists.peek().find(item => item.id === id);
  const name = await dialogs.prompt({ message: 'a new name', ok: 'Rename', title: list.name, value: list.name });
  if (name?.trim()) await store.renameList(id, name.trim());
}

export async function deleteList (id) {
  const list = store.lists.peek().find(item => item.id === id);
  if (!await dialogs.confirm({ message: `Delete “${list.name}”? Its tasks go to the inbox.`, ok: 'Delete', title: list.name })) return;
  await store.removeList(id);
  go('today');
}

// :::::: COMMANDS, the hotkeys of config.rat.js fire them

const focus = selector => requestAnimationFrame(() => document.querySelector(selector)?.focus());

RAT.app.commands.assign({
  'close'    : closeEditor,
  'edit'     : () => { if ($selected) RAT.app.toggle('context', true); },
  'new'      : () => focus('rat-view[active] .add input'),
  'search'   : () => { area('menu')?.show(); focus('.menu input-search, .menu input'); },
  'tick'     : () => { if ($selected) tickTask($selected); },
  'today'    : () => go('today'),
  'undo'     : async () => { const label = await store.undo(); if (label) toast(`undone: ${label}`); },
  'upcoming' : () => go('upcoming'),
});
