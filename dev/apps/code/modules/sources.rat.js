// code :: modules/sources.rat.js

/*
where files come from, each a root handle the tree walks: folders the user grants (RAT.app.folders,
more than one), webdav servers (.shared/webdav/remotes.rat.js) and a github branch (github.rat.js).

  $kind     the source the files area shows: 'local' | 'github' | 'webdav', kept
  $locals   [{ id, name, granted, handle }]: the granted folders, a handle once permission is there
  $servers  [{ id, name, handle }]
*/

import { $connections, rootOf } from '../../.shared/webdav/remotes.rat.js';

const { folders } = RAT.app;
const { $perms, $sources } = folders;

export let $kind! = 'local';

export const $locals = $sources.map(({ id, name }) => {
  const granted = $perms[id] === 'granted';
  return { granted, handle: granted ? folders.handleOf(id) : null, id: `local:${id}`, name, source: id };
});

export const $servers = $connections.map(({ id, name }) => ({ handle: rootOf(id), id: `dav:${id}`, name, source: id }));

export const show = kind => { $kind = kind; };

export const load = () => folders.load();
export const add  = () => folders.add();

export const reconnect = local => folders.reconnect(local.source);

// the handle only, the files stay where they are
export async function forget (local) {
  if (await RAT.app.dialogs.confirm({ message: `Forget “${local.name}”? Its files stay where they are.`, ok: 'Forget', title: local.name })) await folders.remove(local.source);
}
