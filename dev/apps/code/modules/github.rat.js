// code :: modules/github.rat.js

/*
the github side of the app: the token, the repos it reaches, the public ones pinned to look at, the
repo and branch chosen. the token stays on the device (RAT.app.store), sent only to api.github.com.

  $user, $repos         the account and its repos once the token is known, else null and []
  $pinned               public repos, read only: [{ owner, name, full, branch, readOnly }]
  $repo, $branch        the one chosen
  $root                 its root handle (github/handles.js), null without a repo
  $busy, $error         what is under way, what went wrong last
*/

import * as gh from './github/client.js';
import { githubRoot } from './github/handles.js';

export const TOKEN_URL = 'https://github.com/settings/personal-access-tokens/new';

// :::::: STATE

let $token! = null;

export let $branch! = null;
export let $pinned! = [];
export let $repo!   = null;

export let
$busy  = '',
$error = null,
$repos = [],
$user  = null;

export const $root = $repo && $branch ? githubRoot({ ...$repo, branch: $branch, token: $token }) : null;

// a change is allowed: a token, and a repo of its own
export const $writable = Boolean($user) && Boolean($repo) && !$repo.readOnly;

async function busy (label, work) {
  $busy  = label;
  $error = null;
  try     { return await work(); }
  catch (error) { $error = error.message; throw error; }
  finally { $busy = ''; }
}

// :::::: ACCOUNT

// the kept token checked again, quietly: a stale one only disconnects
export async function load () {
  if (!$token) return;
  try   { $user = await gh.user($token); $repos = await gh.repos($token); }
  catch { $user = null; }
}

export const connect = token => busy('Connecting …', async () => {
  const trimmed = String(token ?? '').trim();
  if (!trimmed) throw new Error('Paste a token first');
  $user  = await gh.user(trimmed);
  $token = trimmed;
  $repos = await gh.repos(trimmed);
});

export function disconnect () {
  $token = $user = null;
  $repos = [];
  if (!$repo?.readOnly) $repo = $branch = null;
}

// :::::: REPOS

export const pin = text => busy('Adding …', async () => {
  const spec = gh.parseRepo(text);
  if (!spec) throw new Error('A repository as owner/name or a GitHub url');
  if ($pinned.some(repo => repo.full.toLowerCase() === `${spec.owner}/${spec.name}`.toLowerCase())) throw new Error('That one is pinned already');
  const repo = await gh.repo($token, spec.owner, spec.name);
  $pinned = [repo, ...$pinned];
  choose(repo);
});

export function unpin (full) {
  $pinned = $pinned.filter(repo => repo.full !== full);
  if ($repo?.full === full) $repo = $branch = null;
}

export function choose (repo) {
  $repo   = repo;
  $branch = repo.branch;
}

export const chooseBranch = name => { $branch = name; };

export const branches = () => $repo ? gh.branches({ ...$repo, token: $token }) : Promise.resolve([]);
