// apps/podcasts/app.js

const app = zugriff.app;

// :::::: IMPORT :::::::::::::::::::::::::::::::::::::::::::::::

import { createThumbCache } from '/.shared/js/thumbs.js';

// :::::: APP ::::::::::::::::::::::::::::::::::::::::::::::::::

// ::: HANDLE
// before anything is imported that reads the handle: a component captured at module
// scope sees whatever was on it at import time, and undefined stays undefined.
const { library, player } = await app.modules('library', 'player');

app.db      = app.database;
app.library = library;
app.player  = player;
app.thumbs  = createThumbCache();

const [{ Config, Dock, Slot, Views }, { PlayerPanel }, Export] = await Promise.all([
  zugriff.components('Config', 'Dock', 'Slot', 'Views'),
  app.panels('PlayerPanel'),
  app.component('Export'),
]);

// :::: STATE
// dialog is declared by createState; this app's own keys go on the same store.
// nothing added here is persisted — a leaf has to ask for that. the settings are
// persisted leaves as well, shown in the config area after the shared ones
app.settings = {
  menuPosition   : { type: 'enum', label: 'Menu',   look: 'segments', values: ['top', 'bottom', 'left', 'right'], default: 'bottom' },
  playerPosition : { type: 'enum', label: 'Player', look: 'segments', values: ['top', 'bottom'],                  default: 'bottom' },
};

app.state.$extend({
  busy           : { type: String, value: '' },   // a label while a long task runs
  search         : { type: String, value: '' },   // shared episode filter, written by SearchPanel

  // listening progress, keyed by episode id. the one part of the library that does
  // not come out of the db per view — it is read per row and written while playing.
  progress       : { type: 'record', value: {} },
});

// the db is the library; only the schema and the progress table are read up front.
// a storage failure must not blank the app — it mounts either way, just empty.
await app.library.load().catch(error => app.toast.error(error));
app.db.podcasts.toValues().then(rows => app.thumbs.prewarm(rows.map(podcast => podcast.image)));

// :::::: ACTIONS

async function refreshAll () {
  if (!await app.db.podcasts.count()) { app.state.dialog = 'add'; return; }
  app.state.busy = 'Refreshing…';
  try {
    const results = await app.library.refreshAll((n, total) => app.state.busy = `Refreshing ${n}/${total}…`);
    const added   = results.reduce((sum, r) => sum + (r.added || 0), 0);
    const failed  = results.filter(r => r.error).length;
    const type    = failed ? 'error' : 'success';
    const message = `${added} new episode(s), ${failed} feed(s) failed.`;
    app.toast({ message, type });
  }
  finally { app.state.busy = ''; }
}

app.actions = {
  'close-dialog'  : () => app.state.dialog = null,

  'refresh-all'   : refreshAll,
  'add-podcast'   : () => app.state.dialog = 'add',
  'open-settings' : () => area('config')?.show(),

  'toggle-play'   : () => app.player.toggle(),
  'skip-back'     : () => app.player.skip(-15),
  'skip-forward'  : () => app.player.skip(30),
};

// :::::: HOTKEYS

app.hotkeys = {
  'escape'      : { action: 'close-dialog', when: () => !!app.state.$dialog },

  'space'       : { action: 'toggle-play',   when: !!app.player.episode },
  'arrow-left'  : { action: 'skip-back',     when: !!app.player.episode },
  'arrow-right' : { action: 'skip-forward',  when: !!app.player.episode },
};

// :::::: EFFECTS

const $app = document.getElementById('app');
app.effect(() => {
  $app.dataset.menu   = app.state.$menuPosition;
  $app.dataset.player = app.state.$playerPosition;
});

// :::::: FRAME ::::::::::::::::::::::::::::::::::::::::::::::

const area = app.area;

// the lists have a route, the details do not: they render once app.go() opened them,
// and a reload lands on the first list. explore-podcast is opened with a feed url
// rather than an id, a podcast that is not subscribed has no record to point at
app.views = {
  latest            : { route: '/',         view: 'LatestView' },
  episode           : 'EpisodeDetailView',
  podcasts          : { route: '/podcasts', view: 'PodcastsView' },
  podcast           : 'PodcastDetailView',
  saved             : { route: '/saved',    view: 'SavedView' },
  explore           : { route: '/explore',  view: 'ExploreView' },
  'explore-podcast' : 'ExplorePodcastView',
};

app.dialogs = {
  add : 'AddPodcastDialog',
};

// a detail view keeps the item of the list it was opened from
const dockItems = [
  { label: 'Episodes', icon: 'mdi:playlist-play',     view: 'latest'                        },
  { label: 'Podcasts', icon: 'mdi:view-grid-outline', view: 'podcasts'                      },
  { label: 'Later',    icon: 'bookmarks',             view: 'saved'                         },
  { label: 'Explore',  icon: 'mdi:compass-outline',   view: 'explore'                       },
  { label: 'Settings', icon: 'settings',              onClick: () => area('config')?.toggle() },
];

// :::::: ROOT ::::::::::::::::::::::::::::::::::::::::::::::::

// the areas of #app, the root
function App () {
  return html`
    <app-area name='main'>
      <${Views} transition-on='glide' />
      <${PlayerPanel} />
      <${Dock} items=${dockItems} />
      <${Slot} map=${app.dialogs} name=${app.state.$dialog} load='dialog' />
    </app-area>
    <app-area name='config' dock='end'><${Config}><${Export} /></${Config}></app-area>
  `;
}

// :::::: BOOT ::::::::::::::::::::::::::::::::::::::::::::::::

app.init({ App });
