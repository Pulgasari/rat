// code :: modules/github/client.js

/*
the github api as the browser reaches it: api.github.com sends cors headers, so a static page talks to
it directly. what a page can not do is the oauth token exchange, so a fine-grained personal access
token (contents: read and write) stands in. without one a public repo still reads, at a lower rate.

every call takes the token, a repo call { owner, name, branch, token }. a change is one commit: a file
through the contents api, a folder (rename, copy, delete) through the git data api, which reuses the
blobs that are there.
*/

const API = 'https://api.github.com';

export async function request (token, path, { body, method = 'GET' } = {}) {
  const response = await fetch(path.startsWith('http') ? path : API + path, {
    body    : body ? JSON.stringify(body) : undefined,
    headers : {
      Accept                 : 'application/vnd.github+json',
      'X-GitHub-Api-Version' : '2022-11-28',
      ...token ? { Authorization: `Bearer ${token}` } : {},
      ...body  ? { 'Content-Type': 'application/json' } : {},
    },
    method,
  });
  if (response.ok) return response.status === 204 ? null : response.json();

  let message = `${response.status} ${response.statusText}`;
  try { message = (await response.json()).message ?? message; } catch {}
  if (response.status === 401) message = 'The token is invalid or expired';
  if (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0') message = 'GitHub’s rate limit is reached, try again later';
  throw new Error(message);
}

// :::::: BYTES, base64 in chunks: a big file would blow the call stack at once

const fromBase64 = text => Uint8Array.from(atob(text.replace(/\n/g, '')), char => char.charCodeAt(0));

function toBase64 (bytes) {
  let binary = '';
  for (let at = 0; at < bytes.length; at += 0x8000) binary += String.fromCharCode(...bytes.subarray(at, at + 0x8000));
  return btoa(binary);
}

const encodePath = path => path.split('/').map(encodeURIComponent).join('/');
const base       = ({ name, owner }) => `/repos/${owner}/${name}`;

// :::::: ACCOUNT

export const user = token => request(token, '/user');

// the ones the token can push to, the latest first
export async function repos (token) {
  const page  = number => request(token, `/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator,organization_member&page=${number}`);
  const pages = await Promise.all([page(1), page(2)]);
  return pages.flat().map(repo => repoOf(repo, false));
}

export const repo = async (token, owner, name) => repoOf(await request(token, `/repos/${owner}/${name}`), true);

const repoOf = (repo, readOnly) => ({ branch: repo.default_branch, full: repo.full_name, name: repo.name, owner: repo.owner.login, private: repo.private, readOnly });

// owner/name or a github url
export function parseRepo (text) {
  const found = /(?:github\.com\/)?([^/\s]+)\/([^/\s#?]+?)(?:\.git)?(?:[/#?].*)?$/i.exec(String(text ?? '').trim());
  return found ? { name: found[2], owner: found[1] } : null;
}

export const branches = async repo => (await request(repo.token, `${base(repo)}/branches?per_page=100`)).map(branch => branch.name);

// :::::: TREES AND FILES

// the entries of one tree, a sha or branch:path: one level at a time, a big repo stays cheap
export const tree = async (repo, sha) => (await request(repo.token, `${base(repo)}/git/trees/${encodeURIComponent(sha)}`)).tree ?? [];

export const blob = async (repo, sha) => {
  const data = await request(repo.token, `${base(repo)}/git/blobs/${sha}`);
  return data.encoding === 'base64' ? fromBase64(data.content) : new TextEncoder().encode(data.content ?? '');
};

// a file's new content as one commit, the sha it has now. without a sha the file is new
export async function put (repo, path, bytes, sha, message) {
  const body = { branch: repo.branch, content: toBase64(bytes), message, ...sha ? { sha } : {} };
  return (await request(repo.token, `${base(repo)}/contents/${encodePath(path)}`, { body, method: 'PUT' })).content.sha;
}

// :::::: COMMITS OF MORE THAN ONE FILE

async function head (repo) {
  const ref    = await request(repo.token, `${base(repo)}/git/ref/heads/${repo.branch}`);
  const commit = await request(repo.token, `${base(repo)}/git/commits/${ref.object.sha}`);
  return { commit: ref.object.sha, tree: commit.tree.sha };
}

// every blob below a folder
async function blobsUnder (repo, folder, root) {
  const { tree: entries = [] } = await request(repo.token, `${base(repo)}/git/trees/${root}?recursive=1`);
  return entries.filter(entry => entry.type === 'blob' && entry.path.startsWith(`${folder}/`));
}

async function commit (repo, changes, message) {
  const { commit: parent, tree: baseTree } = await head(repo);
  const tree   = await request(repo.token, `${base(repo)}/git/trees`,   { body: { base_tree: baseTree, tree: changes }, method: 'POST' });
  const result = await request(repo.token, `${base(repo)}/git/commits`, { body: { message, parents: [parent], tree: tree.sha }, method: 'POST' });
  await request(repo.token, `${base(repo)}/git/refs/heads/${repo.branch}`, { body: { sha: result.sha }, method: 'PATCH' });
  return result.sha;
}

// a file or a folder, as one commit each: gone, at another path, or there twice
export async function remove (repo, path, { isDir, sha }) {
  if (!isDir) return request(repo.token, `${base(repo)}/contents/${encodePath(path)}`, { body: { branch: repo.branch, message: `Delete ${path}`, sha }, method: 'DELETE' });
  const under = await blobsUnder(repo, path, (await head(repo)).tree);
  return commit(repo, under.map(entry => ({ mode: entry.mode, path: entry.path, sha: null, type: 'blob' })), `Delete ${path}/`);
}

export async function move (repo, from, to, { isDir, mode = '100644', sha }) {
  if (!isDir) return commit(repo, [{ mode, path: to, sha, type: 'blob' }, { mode, path: from, sha: null, type: 'blob' }], `Rename ${from} to ${to}`);
  const under = await blobsUnder(repo, from, (await head(repo)).tree);
  return commit(repo, under.flatMap(entry => [
    { mode: entry.mode, path: to + entry.path.slice(from.length), sha: entry.sha, type: 'blob' },
    { mode: entry.mode, path: entry.path, sha: null, type: 'blob' },
  ]), `Rename ${from}/ to ${to}/`);
}
