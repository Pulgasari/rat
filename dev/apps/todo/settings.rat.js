// todo :: settings.rat.js

/*
the place the tasks are synced with, kept across visits: a granted folder (RAT.app.folders keeps its
handle) or a webdav server. modules/sync.js is plain js: $sync.value there.

  $sync   { kind: 'folder' } | { kind: 'webdav', url, username, password, path } | null
*/

export let $sync! = null;
