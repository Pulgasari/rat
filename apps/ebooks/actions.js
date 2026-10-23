// apps/ebooks/actions.js
// what the views and the app do: open and close a book, add a folder

import toast from '../.shared/toast.js';

import { addFolder as add, markOpened } from './lib.js';
import { state }                        from './state.js';

export function openReader (key) {
  state.bookKey.value = key;
  markOpened(key);
  RAT.app.router.go('/reader');
}

export const closeReader  = () => RAT.app.router.go('/');
export const toggleConfig = () => RAT.app.area('config')?.toggle();

export async function addFolder () {
  if (!('showDirectoryPicker' in globalThis)) return toast.error('This browser can’t open folders — try Chrome, Edge or another Chromium browser.');
  try {
    const source = await add();
    if (source) toast.success(`Added ${source.name}`);
  }
  catch (error) { toast.error(error); }
}
