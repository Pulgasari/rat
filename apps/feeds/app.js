// apps/feeds/app.js
// the feeds reader on the shared handle. the runtime binds zugriff (+ zugriff.app, html) to
// window before this runs, so nothing here imports the runtime. the library lives in the db
// module (app.db); ephemeral ui state on app.state.

// ::: vendors
import { computed }         from '@aufbau/signals';
import { useEffect }        from '/.shared/js/vendors.js';

import PopPrompt from '@aufbau/elements/webcomponents/pop-prompt.js';

// ::: shared
import { Config } from '/.shared/js/components/Config.js';

// ::: app modules
import * as db           from './modules/db.js';

const { Image } = await zugriff.components('Image');

// ::: the app handle
const app = zugriff.app;
app.db = db;

// :::::: STATE
// ephemeral ui state on app.state (no `.value`); the library itself is app.db (plain
// signals).
// the view on screen is #app's business (app-view, the hash).

app.state.$extend({
  busy   : { type: 'scalar', value: ''                },   // a label while a long task runs
  feedId : { type: 'scalar', value: null, persist: true },   // the feed of the 'feed' view
});

const flash = (text, kind = 'ok') => kind === 'err' ? app.toast.error(text) : app.toast.success(text);

// :::::: FRAME
// #app is the <app-root>: the views in the main area, the feeds in the menu area,
// the settings in the config area

const area = app.area;
const menu = () => area('menu');

// a drawer closes once something in it was picked, a sidebar stays
const closeMenu = () => { if (menu()?.isOverlay) menu().hide(); };

// the feed view shows app.state.feedId, persisted so a reload lands on the same feed
const open = (name, id = null) => {
  if (id) app.state.feedId = id;
  app.go(name);
  closeMenu();
};

// :::::: DERIVED

const articleFeeds = computed(() => db.feeds.value.filter(f => f.kind !== 'youtube'));
const youtubeFeeds = computed(() => db.feeds.value.filter(f => f.kind === 'youtube'));

// the list + heading of a view
function viewOf (name) {
  if (name === 'youtube') return { title: 'YouTube', icon: 'youtube', kind: 'youtube', list: db.latestVideos.value };
  if (name === 'feed') {
    const f = db.feedById(app.state.$feedId);
    if (!f) return { title: 'Gone', icon: 'rss', kind: 'feed', list: [] };
    return { title: f.title, icon: f.kind === 'youtube' ? 'youtube' : 'rss', kind: f.kind, list: db.itemsByFeed.value[f.id] || [], feed: f };
  }
  return { title: 'Latest', icon: 'mdi:playlist-star', kind: 'feed', list: db.latestArticles.value };
}

// :::::: HELPERS

function fmtWhen (ms) {
  if (!ms) return '';
  const diff = Date.now() - ms;
  const min = Math.round(diff / 60000);
  if (min < 1)   return 'just now';
  if (min < 60)  return `${min} min ago`;
  const h = Math.round(min / 60);
  if (h < 24)    return `${h} h ago`;
  const d = Math.round(h / 24);
  if (d < 7)     return `${d} d ago`;
  return new Date(ms).toLocaleDateString(undefined, { dateStyle: 'medium' });
}

const hostOf = url => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; } };
const feedName = it => db.feedById(it.feedId)?.title || hostOf(it.link);

// :::::: ACTIONS

async function addFeed () {
  const input = (await PopPrompt.prompt('Paste a feed URL, a site URL, or a YouTube channel / @handle / video link.', '', { confirm: 'Add' }))?.trim();
  if (!input) return;
  app.state.busy = 'Adding feed…';
  try {
    const rec = await db.addFeed(input);
    flash(`Added ${rec.title}`);
    open('feed', rec.id);
  } catch (err) {
    flash(err.message || String(err), 'err');
  } finally { app.state.busy = ''; }
}

async function refreshView (name = app.current.value) {
  app.state.busy = 'Refreshing…';
  try {
    if (name === 'feed' && app.state.$feedId) {
      const n = await db.refresh(app.state.$feedId);
      flash(n ? `${n} new` : 'up to date');
    } else {
      const n = await db.refreshAll((d, t) => app.state.busy = `Refreshing ${d}/${t}…`);
      flash(n ? `${n} new` : 'up to date');
    }
  } catch (err) { flash(err.message || String(err), 'err'); }
  finally { app.state.busy = ''; }
}

async function removeFeed (f) {
  if (!await PopPrompt.confirm(`Unfollow “${f.title}”? Its stored entries are removed too.`, { confirm: 'Unfollow' })) return;
  if (app.current.value === 'feed' && app.state.$feedId === f.id) open('latest');
  await db.removeFeed(f.id);
  flash('Unfollowed');
}

function markAllRead (name) {
  const list = viewOf(name).list;
  db.markAllRead(list);
  flash(`Marked ${list.length} read`);
}

// :::::: SIDEBAR

function NavItem ({ name, icon, label, count }) {
  const active = app.current.value === name;
  return html`
    <button class=${'nav-item' + (active ? ' active' : '')} onClick=${() => open(name)} title=${label}>
      <svg-icon icon=${icon} />
      <span class="nav-label">${label}</span>
      ${count > 0 && html`<span class="nav-count">${count}</span>`}
    </button>`;
}

function FeedItem ({ feed: f }) {
  const list   = db.itemsByFeed.value[f.id] || [];
  const unread = db.unreadIn(list);
  const active = app.current.value === 'feed' && app.state.$feedId === f.id;
  const spin   = db.refreshing.value[f.id];
  return html`
    <div class=${'feed-row' + (active ? ' active' : '')}>
      <button class="feed-open" onClick=${() => open('feed', f.id)} title=${f.title}>
        <span class="feed-ic">
          ${spin ? html`<svg-icon icon="loading" />`
                 : f.image ? html`<img src=${f.image} alt="" loading="lazy" onError=${e => e.target.style.display = 'none'} />`
                           : html`<svg-icon icon=${f.kind === 'youtube' ? 'youtube' : 'rss'} />`}
        </span>
        <span class="feed-name">${f.title}</span>
        ${f.error ? html`<svg-icon icon="alert" class="feed-err" />`
                  : unread > 0 && html`<span class="nav-count">${unread}</span>`}
      </button>
      <button class="feed-x" title="Unfollow" onClick=${() => removeFeed(f)}>
        <svg-icon icon="close" /></button>
    </div>`;
}

function Sidebar () {
  const arts = articleFeeds.value, tubes = youtubeFeeds.value;
  return html`
    <div class="sidebar">
      <div class="brand">
        <svg-icon icon="rss" /> <span>Feeds</span>
      </div>

      <button class="add-btn" onClick=${addFeed}>
        <svg-icon icon="plus" /> Add feed</button>

      <div class="nav-scroll">
        <div class="nav-group">
          <${NavItem} name="latest" icon="mdi:playlist-star" label="Latest"
                      count=${db.unreadIn(db.latestArticles.value)} />
          ${tubes.length > 0 && html`
            <${NavItem} name="youtube" icon="youtube" label="YouTube"
                        count=${db.unreadIn(db.latestVideos.value)} />`}
        </div>

        ${arts.length > 0 && html`
          <div class="nav-group">
            <div class="nav-title">Feeds</div>
            ${arts.map(f => html`<${FeedItem} key=${f.id} feed=${f} />`)}
          </div>`}

        ${tubes.length > 0 && html`
          <div class="nav-group">
            <div class="nav-title"><svg-icon icon="youtube" /> YouTube</div>
            ${tubes.map(f => html`<${FeedItem} key=${f.id} feed=${f} />`)}
          </div>`}

        ${db.feeds.value.length === 0 && html`<p class="nav-hint">No feeds yet — add one above.</p>`}
      </div>

      <div class="side-foot">
        <button class="foot-btn" onClick=${() => refreshView()} disabled=${!!app.state.$busy || !db.feeds.value.length}>
          <svg-icon icon="refresh" /> Refresh</button>
        <button class="foot-btn" onClick=${() => { closeMenu(); area('config')?.toggle(); }}>
          <svg-icon icon="settings" /> Settings</button>
      </div>
    </div>`;
}

// :::::: ITEM VIEWS

function ArticleRow ({ item }) {
  const unread = !db.isRead(item.key);
  return html`
    <article class=${'post' + (unread ? '' : ' read')}>
      <span class=${'post-dot' + (unread ? ' on' : '')} aria-hidden="true"></span>
      <div class="post-body">
        <a class="post-title" href=${item.link} target="_blank" rel="noopener noreferrer"
           onClick=${() => db.markRead(item.key)}>${item.title}</a>
        <div class="post-meta">
          <span class="post-src">${feedName(item)}</span>
          <span class="dot">·</span>
          <time>${fmtWhen(item.pubDate)}</time>
        </div>
        ${item.summary && html`<p class="post-sum">${item.summary}</p>`}
      </div>
      ${item.image && html`<a class="post-thumb" href=${item.link} target="_blank" rel="noopener noreferrer"
           onClick=${() => db.markRead(item.key)}><img src=${item.image} alt="" loading="lazy"
           onError=${e => e.target.parentElement.style.display = 'none'} /></a>`}
    </article>`;
}

function VideoCard ({ item }) {
  const unread = !db.isRead(item.key);
  return html`
    <a class=${'vid' + (unread ? '' : ' read')}
      href=${item.link} target="_blank" rel="noopener noreferrer"
      onClick=${() => db.markRead(item.key)}
      >
      <div class="vid-thumb">
        ${item.image
          ? html`<${Image} src=${item.image} />`
          : html`<div class="vid-noimg"><svg-icon icon="youtube" /></div>`}
        ${unread && html`<span class="vid-new">new</span>`}
      </div>
      <div class="vid-title">${item.title}</div>
      <div class="vid-meta">${feedName(item)} · ${fmtWhen(item.pubDate)}</div>
    </a>`;
}

function Body ({ name }) {
  const v = viewOf(name);

  if (!v.list.length) {
    const hasFeeds = db.feeds.value.length > 0;
    return html`
      <div class="empty">
        <svg-icon icon=${hasFeeds ? 'mdi:check-all' : 'rss'} />
        <p>${hasFeeds ? 'Nothing here yet — try Refresh.' : 'Follow a feed to see the latest here.'}</p>
        ${!hasFeeds && html`<button class="cta" onClick=${addFeed}>
          <svg-icon icon="plus" /> Add your first feed</button>`}
      </div>`;
  }

  if (v.kind === 'youtube') return html`<div class="videos">${v.list.map(it => html`<${VideoCard} key=${it.key} item=${it} />`)}</div>`;

  return html`<div class="posts">${v.list.map(it => html`<${ArticleRow} key=${it.key} item=${it} />`)}</div>`;
}

// the menu button shows where the menu is a drawer
function Header ({ name }) {
  const v = viewOf(name);
  return html`
    <header class="topbar">
      <button class="ibtn nav-toggle" aria-label="Menu" onClick=${() => menu()?.toggle()}>
        <svg-icon icon="menu" /></button>
      <svg-icon icon=${v.icon} class="topbar-ic" />
      <h1 class="topbar-title" title=${v.title}>${v.title}</h1>
      ${v.feed?.link && html`<a class="ibtn" href=${v.feed.link} target="_blank" rel="noopener noreferrer" title="Open site">
        <svg-icon icon="mdi:open-in-new" /></a>`}
      <span class="topbar-spacer"></span>
      ${app.state.$busy && html`<span class="topbar-busy"><svg-icon icon="loading" /> ${app.state.$busy}</span>`}
      ${v.list.length > 0 && html`
        <button class="ibtn" title="Mark all read" onClick=${() => markAllRead(name)}>
          <svg-icon icon="mdi:check-all" /></button>`}
      <button class="ibtn" title="Refresh" onClick=${() => refreshView(name)} disabled=${!!app.state.$busy}>
        <svg-icon icon="refresh" /></button>
    </header>`;
}

// the three views are one list with its header, each over its own items
const listView = name => () => html`
  <${Header} name=${name} />
  <main><${Body} name=${name} /></main>
`;

app.views = {
  latest  : { route: '/',        view: listView('latest')  },
  youtube : { route: '/youtube', view: listView('youtube') },
  feed    : { route: '/feed',    view: listView('feed')    },
};

// :::::: APP

const { Views } = await zugriff.components('Views');

// the feeds are the way through: a sidebar from the start where there is room
function App () {
  useEffect(() => {
    db.load().then(() => {
      // refresh feeds that haven't been fetched in a while, quietly, on load
      const stale = db.feeds.value.filter(f => Date.now() - (f.lastFetched || 0) > 10 * 60 * 1000);
      if (stale.length) db.refreshAll().catch(() => {});
    }).catch(err => flash('Could not open the library: ' + err.message, 'err'));
  }, []);

  useEffect(() => {
    if (!db.ready.value) return;
    Promise.all(['app-root', 'app-area'].map(tag => customElements.whenDefined(tag))).then(() => {
      if (!menu()?.isOverlay) menu()?.show();
    });
  }, [db.ready.value]);

  if (!db.ready.value) return html`<div class="booting"><svg-icon icon="svg-spinners:bars-scale-middle" /></div>`;

  return html`
    <app-area name='main'><${Views} /></app-area>
    <app-area name='menu' dock='start'><${Sidebar} /></app-area>
    <app-area name='config' dock='end'><${Config} /></app-area>
  `;
}

// :::::: BOOT

app.init({ App });
