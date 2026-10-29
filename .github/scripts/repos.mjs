// .github/scripts/repos.mjs
// the repos of config.repos, next to rat (the import map points there): a shallow clone each

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import config from '../config.js';

const rat    = fileURLToPath(new URL('../../', import.meta.url));
const parent = dirname(rat.replace(/\/$/, ''));
const owner  = process.env.GITHUB_REPOSITORY_OWNER ?? 'Pulgasari';

for (const repo of config.repos) {
  const target = join(parent, repo);
  if (existsSync(target)) continue;
  execFileSync('git', ['clone', '--depth', '1', '--quiet', `https://github.com/${owner}/${repo}.git`, target], { stdio: 'inherit' });
  console.log(`cloned ${repo}`);
}
