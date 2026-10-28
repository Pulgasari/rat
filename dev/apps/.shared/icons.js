// apps/.shared/icons.js
//
// the names of the icons the apps share, one family (lucide), one look. zugriff.config.js hands them to
// every app (icons, @rat/app), an app adds its own in its config.rat.js: icons: { ...config.icons, … }.
// another family is a change here, not in the apps. a name given nowhere: the aufbau defaults

export default {
  // actions
  add           : 'lucide:plus',
  close         : 'lucide:x',
  copy          : 'lucide:copy',
  cut           : 'lucide:scissors',
  delete        : 'lucide:trash-2',
  download      : 'lucide:download',
  edit          : 'lucide:pencil',
  external      : 'lucide:external-link',
  paste         : 'lucide:clipboard-paste',
  refresh       : 'lucide:refresh-cw',
  remove        : 'lucide:minus',
  send          : 'lucide:send',
  upload        : 'lucide:upload',

  // moving around
  back            : 'lucide:arrow-left',
  'chevron-down'  : 'lucide:chevron-down',
  'chevron-left'  : 'lucide:chevron-left',
  'chevron-right' : 'lucide:chevron-right',
  'chevron-up'    : 'lucide:chevron-up',
  home            : 'lucide:house',
  menu            : 'lucide:menu',
  more            : 'lucide:ellipsis-vertical',
  settings        : 'lucide:settings',

  // how things are
  info          : 'lucide:info',
  loading       : 'svg-spinners:bars-scale-middle',
  'no-results'  : 'lucide:search-x',
  pending       : 'lucide:loader',
  warning       : 'lucide:triangle-alert',

  // things
  archive         : 'lucide:file-archive',
  audio           : 'lucide:music',
  bookmark        : 'lucide:bookmark',
  cloud           : 'lucide:cloud',
  document        : 'lucide:file-text',
  file            : 'lucide:file',
  folder          : 'lucide:folder',
  'folder-add'    : 'lucide:folder-plus',
  'folder-alert'  : 'lucide:folder-x',
  'folder-key'    : 'lucide:folder-key',
  'folder-open'   : 'lucide:folder-open',
  'folder-search' : 'lucide:folder-search',
  image           : 'lucide:image',
  rss             : 'lucide:rss',
  video           : 'lucide:film',
  web             : 'lucide:globe',

  // views
  grid          : 'lucide:layout-grid',
  list          : 'lucide:list',

  // media
  pause           : 'lucide:pause',
  play            : 'lucide:play',
  'skip-next'     : 'lucide:skip-forward',
  'skip-previous' : 'lucide:skip-back',
};
