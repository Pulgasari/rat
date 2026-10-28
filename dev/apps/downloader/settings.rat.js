// downloader :: settings.rat.js

/*
the queue's settings and the places a finished file can go to, kept across visits. engine.js reads
them as they are when it needs them: $settings is a $Record, $webdav a signal (engine.js is plain js,
$webdav.value there).

  $settings   parallel, perHost, retries, limit (KiB/s, 0: none), target, subfolders, autostart
  $webdav     { url, username, password, path } of the webdav place, or null
  $plugins    the urls of the user's own plugins
*/

import { $Record, Bool, Enum, Num } from '@rat/types';

export const TARGETS = ['library', 'folder', 'webdav', 'save'];

const Settings = {
  autostart  : Bool.default(true),
  limit      : Num.range(0, 20480).default(0),
  parallel   : Num.range(1, 8).default(3),
  perHost    : Num.range(1, 4).default(2),
  retries    : Num.range(1, 10).default(5),
  subfolders : Bool.default(true),
  target     : Enum(...TARGETS),
};

export const $settings! = $Record(Settings).create();

export let $plugins! = [];
export let $webdav!  = null;
