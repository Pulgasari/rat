// code :: modules/github/handles.js

/*
a branch of a repo as file system handles, the same interface a granted folder and a webdav server
implement (.shared/webdav/handles.js): entries, getDirectoryHandle, getFileHandle, removeEntry,
getFile, createWritable, move. so the tree, the documents and .shared/fs.js work on github as well.

  const root = githubRoot({ owner, name, branch, token, readOnly });

a writable commits on close: createWritable({ message }), else "Update <path>". git has no empty
folders, a new one is a .gitkeep. a folder lists by branch:path, so it is current after every commit.
a read-only repo (a public one pinned to look at) refuses every change.
*/

import * as gh from './client.js';

const join     = (...parts) => parts.filter(Boolean).join('/');
const notFound = name => new DOMException(`“${name}” not found`, 'NotFoundError');
const readOnly = () => new DOMException('this repository is read only', 'NotAllowedError');

class GitHubHandle {
  constructor (repo, path, name, sha = null, mode = undefined) {
    Object.assign(this, { mode, name, path, repo, sha });
  }

  get readOnly () { return Boolean(this.repo.readOnly); }

  async isSameEntry (other) { return other instanceof GitHubHandle && other.kind === this.kind && other.repo === this.repo && other.path === this.path; }

  async queryPermission   ({ mode = 'read' } = {}) { return mode === 'readwrite' && this.readOnly ? 'denied' : 'granted'; }
  async requestPermission (options)               { return this.queryPermission(options); }

  async move (target, name = this.name) {
    if (this.readOnly) throw readOnly();
    if (!(target instanceof GitHubDirectoryHandle) || target.repo !== this.repo) throw new DOMException('move across repositories', 'NotSupportedError');
    const to = join(target.path, name);
    await gh.move(this.repo, this.path, to, { isDir: this.kind === 'directory', mode: this.mode, sha: this.sha });
    Object.assign(this, { name, path: to });
  }
}

export class GitHubFileHandle extends GitHubHandle {
  kind = 'file';

  async getFile () { return new File([await gh.blob(this.repo, this.sha)], this.name); }

  async createWritable ({ message } = {}) {
    if (this.readOnly) throw readOnly();
    const parts = [];
    return {
      abort : async () => { parts.length = 0; },
      close : async () => { this.sha = await gh.put(this.repo, this.path, new Uint8Array(await new Blob(parts).arrayBuffer()), this.sha, message ?? `Update ${this.path}`); },
      write : async data => { parts.push(data?.type === 'write' ? data.data : data); },
    };
  }
}

export class GitHubDirectoryHandle extends GitHubHandle {
  kind = 'directory';

  async * entries () {
    const at = this.path ? `${this.repo.branch}:${this.path}` : this.repo.branch;
    for (const entry of await gh.tree(this.repo, at)) {
      const Handle = entry.type === 'tree' ? GitHubDirectoryHandle : GitHubFileHandle;
      if (entry.type === 'tree' || entry.type === 'blob') yield [entry.path, new Handle(this.repo, join(this.path, entry.path), entry.path, entry.sha, entry.mode)];
    }
  }

  async * keys   () { for await (const     [name] of this.entries()) yield   name; }
  async * values () { for await (const [, handle] of this.entries()) yield handle; }
  [Symbol.asyncIterator] () { return this.entries(); }

  async #find (name) {
    for await (const [entry, handle] of this.entries()) if (entry === name) return handle;
    return null;
  }

  async getFileHandle (name, { create = false } = {}) {
    const found = await this.#find(name);
    if (found?.kind === 'directory') throw new DOMException(`“${name}” is a folder`, 'TypeMismatchError');
    if (found) return found;
    if (!create) throw notFound(name);
    if (this.readOnly) throw readOnly();
    const path = join(this.path, name);
    return new GitHubFileHandle(this.repo, path, name, await gh.put(this.repo, path, new Uint8Array, null, `Create ${path}`));
  }

  async getDirectoryHandle (name, { create = false } = {}) {
    const found = await this.#find(name);
    if (found?.kind === 'file') throw new DOMException(`“${name}” is a file`, 'TypeMismatchError');
    if (found) return found;
    if (!create) throw notFound(name);
    if (this.readOnly) throw readOnly();
    const path = join(this.path, name);
    await gh.put(this.repo, `${path}/.gitkeep`, new Uint8Array, null, `Create ${path}/`);
    return new GitHubDirectoryHandle(this.repo, path, name);
  }

  async removeEntry (name) {
    if (this.readOnly) throw readOnly();
    const found = await this.#find(name);
    if (!found) throw notFound(name);
    await gh.remove(this.repo, found.path, { isDir: found.kind === 'directory', sha: found.sha });
  }
}

export const githubRoot = repo => new GitHubDirectoryHandle(repo, '', `${repo.owner}/${repo.name}`);
