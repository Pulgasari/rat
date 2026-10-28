// prompts :: state.rat.js

/*
the library and what the app does with it. prompts and tags are tables of RAT.app.database
(config.rat.js), read as $items: they follow every write, so a change is a write and nothing else.

  $shown     the prompts after search, tag and sort
  $current   the prompt picked, or null
  $editing   the form is out: the current prompt, or a new one without it
*/

const { database, dialogs } = RAT.app;

export const prompts = database.prompts.$items;
export const tags    = database.tags.$items;

// :::::: STATE

export let $search    = '';
export let $tag       = null;     // the id of the tag the list is filtered by
export let $sortBy!   = 'title';  // title, updatedAt, createdAt
export let $currentId = null;
export let $editing   = false;

export const SORTS = [['title', 'Name'], ['updatedAt', 'Updated'], ['createdAt', 'Created']];

export const $current = prompts.find(prompt => prompt.id === $currentId) ?? null;

export const $shown = prompts
  .filter(prompt => !$tag || prompt.tags?.includes($tag))
  .filter(prompt => `${prompt.title} ${prompt.content}`.toLowerCase().includes($search.trim().toLowerCase()))
  .toSorted((a, b) => $sortBy === 'title' ? a.title.localeCompare(b.title) : (b[$sortBy] ?? 0) - (a[$sortBy] ?? 0));

export const tagOf = id => tags.find(tag => tag.id === id) ?? null;

// :::::: THE LIST, a sidebar where there is room, a drawer where not: a pick closes the drawer

const menu = () => RAT.app.area('menu');

const picked   = () => { if (menu()?.isOverlay) menu().hide(); };
export const showList = () => menu()?.show();

// :::::: ACTIONS

export function create () {
  $currentId = null;
  $editing   = true;
  picked();
}

export function open (id) {
  $currentId = id;
  $editing   = false;
  picked();
}

export function edit () { $editing = true; }

export function cancel () {
  $editing = false;
  if (!$current) showList();
}

// escape: out of the form, else back to the list
export const back = () => $editing ? cancel() : showList();

export async function save ({ content, tags: chosen, title }) {
  const now   = Date.now();
  const saved = await database.prompts.put({
    content,
    createdAt : $current?.createdAt ?? now,
    tags      : [...chosen],   // a $List in the form, an array in the database
    title     : title.trim(),
    updatedAt : now,
    ...$current ? { id: $current.id } : {},
  });
  $currentId = saved.id;
  $editing   = false;
}

export async function remove (prompt) {
  if (!await dialogs.confirm({ message: `Delete “${prompt.title || 'Untitled'}”?`, ok: 'Delete', title: 'Delete' })) return;
  await database.prompts.delete(prompt.id);
  if ($currentId === prompt.id) { $currentId = null; $editing = false; }
}

export const addTag = (name, color) => database.tags.add({ color, name: name.trim() });

// the tag goes off every prompt that had it
export async function removeTag (id) {
  await database.tags.delete(id);
  for (const prompt of prompts.filter(prompt => prompt.tags?.includes(id)).toArray()) {
    await database.prompts.put({ ...prompt, tags: prompt.tags.filter(other => other !== id) });
  }
  if ($tag === id) $tag = null;
}

RAT.app.commands.set('back', back);
