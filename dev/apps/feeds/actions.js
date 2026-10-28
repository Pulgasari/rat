// apps/feeds/actions.js
// what the sidebar and the views do: open a list, add, refresh and unfollow feeds

import { computed } from '@rat/signals';

import toast from '../.shared/toast.js';

import * as db   from './db.js';
import { state } from './state.js';

const menu = () => RAT.app.area('menu');

// a drawer closes once something in it was picked, a sidebar stays
const closeMenu = () => { if (menu()?.isOverlay) menu().hide(); };

// the name of the list on screen: latest, youtube, feed
export const current = computed(() => RAT.app.router?.$path?.value?.split('/')[1] || 'latest');

export function open (name, id = null) {
  if (id) state.feedId.value = id;
  RAT.app.router.go(name === 'latest' ? '/' : `/${name}`);
  closeMenu();
}

export const toggleMenu   = () => menu()?.toggle();
export const toggleConfig = () => { closeMenu(); RAT.app.area('config')?.toggle(); };

export const articleFeeds = computed(() => db.feeds.value.filter(feed => feed.kind !== 'youtube'));
export const youtubeFeeds = computed(() => db.feeds.value.filter(feed => feed.kind === 'youtube'));

// the list + heading of a view
export function viewOf (name) {
  if (name === 'youtube') return { icon: 'youtube', kind: 'youtube', list: db.latestVideos.value, title: 'YouTube' };
  if (name === 'feed') {
    const feed = db.feedById(state.feedId.value);
    if (!feed) return { icon: 'rss', kind: 'feed', list: [], title: 'Gone' };
    return { feed, icon: feed.kind === 'youtube' ? 'youtube' : 'rss', kind: feed.kind, list: db.itemsByFeed.value[feed.id] || [], title: feed.title };
  }
  return { icon: 'latest', kind: 'feed', list: db.latestArticles.value, title: 'Latest' };
}

const hostOf = url => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; } };

export const feedName = item => db.feedById(item.feedId)?.title || hostOf(item.link);

export async function addFeed () {
  const input = (await RAT.app.dialogs.prompt({ message: 'Paste a feed URL, a site URL, or a YouTube channel / @handle / video link.', ok: 'Add', title: 'Add feed' }))?.trim();
  if (!input) return;
  state.busy.value = 'Adding feed…';
  try {
    const record = await db.addFeed(input);
    toast.success(`Added ${record.title}`);
    open('feed', record.id);
  }
  catch (error) { toast.error(error.message || String(error)); }
  finally       { state.busy.value = ''; }
}

export async function refreshView (name = current.value) {
  state.busy.value = 'Refreshing…';
  try {
    const added = name === 'feed' && state.feedId.value
      ? await db.refresh(state.feedId.value)
      : await db.refreshAll((done, total) => state.busy.value = `Refreshing ${done}/${total}…`);
    toast.success(added ? `${added} new` : 'up to date');
  }
  catch (error) { toast.error(error.message || String(error)); }
  finally       { state.busy.value = ''; }
}

export async function removeFeed (feed) {
  if (!await RAT.app.dialogs.confirm({ message: `Unfollow “${feed.title}”? Its stored entries are removed too.`, ok: 'Unfollow', title: feed.title })) return;
  if (current.value === 'feed' && state.feedId.value === feed.id) open('latest');
  await db.removeFeed(feed.id);
  toast.success('Unfollowed');
}

export function markAllRead (name) {
  const list = viewOf(name).list;
  db.markAllRead(list);
  toast.success(`Marked ${list.length} read`);
}
