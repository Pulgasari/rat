// @rat/cli :: dev

import { createReadStream, existsSync, watch } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, relative, resolve, sep } from 'node:path';

import { COMPTIME, RAT, compileFile, errorOf } from '../files.js';
import { color, error, print } from '../wizard.js';

export const options = {
  port : { short: 'p', type: 'string', default: '8080' },
  root : { type: 'string' },
};

const EVENTS = '/__rat/events';
const RELOAD = `<script type="module">new EventSource('${EVENTS}').onmessage = () => location.reload();</script>`;

const TYPES = {
  '.css'  : 'text/css',            '.gif'  : 'image/gif',            '.htm'  : 'text/html',
  '.html' : 'text/html',           '.ico'  : 'image/x-icon',         '.jpeg' : 'image/jpeg',
  '.jpg'  : 'image/jpeg',          '.js'   : 'text/javascript',      '.json' : 'application/json',
  '.md'   : 'text/markdown',       '.mjs'  : 'text/javascript',      '.mp3'  : 'audio/mpeg',
  '.png'  : 'image/png',           '.svg'  : 'image/svg+xml',        '.txt'  : 'text/plain',
  '.wasm' : 'application/wasm',    '.webmanifest': 'application/manifest+json',
  '.webp' : 'image/webp',          '.woff2': 'font/woff2',
};

// the packages of the rat repo, when the page loads a local run.js: the import map reaches into the folder above it
async function packagesOf (dir) {
  const html = await readFile(join(dir, 'index.html'), 'utf8').catch(() => '');
  const src  = html.match(/<script\b[^>]*\bsrc=(['"])([^'"]*\/run\/run\.js)\1/)?.[2];
  if (!src || /^[a-z]+:/i.test(src)) return null;
  const run = resolve(dir, src);
  return existsSync(run) ? resolve(run, '../../..') : null;
}

const fileOf = async (root, pathname) => {
  const file = resolve(root, '.' + decodeURIComponent(pathname));
  if (file !== root && !file.startsWith(root + sep)) return null;
  const info = await stat(file).catch(() => null);
  if (info?.isDirectory()) return fileOf(root, pathname.replace(/\/?$/, '/index.html'));
  return info ? file : null;
};

const javascript = (response, code, headers = {}) => {
  response.writeHead(200, { 'cache-control': 'no-cache', 'content-type': 'text/javascript; charset=utf-8', 'x-rat-compiled': '1', ...headers });
  response.end(code);
};

export async function run ([page = '.'], { port, root }) {
  const dir      = resolve(page);
  const packages = await packagesOf(dir);
  const top      = resolve(root ?? (packages ? resolve(packages, '../..') : dir));
  const clients  = new Set;

  const server = createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost');

    if (url.pathname === EVENTS) {
      response.writeHead(200, { 'cache-control': 'no-cache', 'content-type': 'text/event-stream' });
      clients.add(response);
      request.on('close', () => clients.delete(response));
      return;
    }

    const file = await fileOf(top, url.pathname);
    if (!file) { response.writeHead(404).end('not found'); return; }

    // a .rat file as a module, compiled here: the page loads no compiler (as middleware.js). one with a
    // <script comptime> is compiled in the page: its imports go through the page's import map
    if (RAT.test(file) && request.headers['sec-fetch-dest'] !== 'document' && !COMPTIME.test(await readFile(file, 'utf8'))) {
      try {
        const { code, unresolved } = await compileFile(file, { base: `http://${request.headers.host}${url.pathname}`, point: false });
        return javascript(response, code, { 'x-rat-unresolved': unresolved.join(',') });
      }
      catch (failure) {
        error(errorOf(failure, relative(top, file)));
        return javascript(response, `throw new SyntaxError(${JSON.stringify(failure.message)});\n`, { 'x-rat-error': '1' });
      }
    }

    const type = TYPES[extname(file)] ?? 'application/octet-stream';
    if (type === 'text/html') {
      const html = await readFile(file, 'utf8');
      response.writeHead(200, { 'cache-control': 'no-cache', 'content-type': 'text/html; charset=utf-8' });
      return response.end(html.includes('</body>') ? html.replace('</body>', `${RELOAD}\n</body>`) : html + RELOAD);
    }

    response.writeHead(200, { 'cache-control': 'no-cache', 'content-type': type });
    createReadStream(file).pipe(response);
  });

  // a save in the app or in the rat packages reloads the pages
  let timer = null;
  const reload = (type, name) => {
    if (name && /(^|[\\/])(\.git|node_modules)([\\/]|$)/.test(name)) return;
    clearTimeout(timer);
    timer = setTimeout(() => { for (const client of clients) client.write('data: reload\n\n'); }, 80);
  };
  for (const folder of new Set([dir, packages ?? dir])) watch(folder, { recursive: true }, reload);

  server.listen(Number(port), () => {
    print(`${color.green('rat dev')}  http://localhost:${port}/${relative(top, dir).split(sep).join('/')}${dir === top ? '' : '/'}`);
    print(color.gray(`serving ${top}`));
  });
}
