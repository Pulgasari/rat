// downloader :: modules/plugin-worker.js
// one user plugin, away from the page: it can not read the dom, the other
// downloads or the storage. ctx.text and ctx.json are answered by the app, so
// they go through its transport (native in the android app, the proxy in a
// browser), ctx.fetch is the worker's own.

let plugin  = null;
let counter = 0;

const waiting = new Map;

function ask (method, url) {
  return new Promise((resolve, reject) => {
    const id = `ctx-${++counter}`;
    waiting.set(id, { reject, resolve });
    postMessage({ id, method, type: 'request', url });
  });
}

const ctx = {
  fetch : (url, init) => fetch(url, init),
  json  : url => ask('json', url),
  text  : url => ask('text', url),
};

const handlers = {
  load    : async ({ source }) => { plugin = (await import(source)).default; return plugin?.name ?? source; },
  match   : async ({ url })    => Boolean(await plugin?.match?.(url)),
  resolve : async ({ url })    => (await plugin.resolve(url, ctx)) ?? [],
};

addEventListener('message', async ({ data }) => {
  if (data.type === 'answer') {
    const entry = waiting.get(data.id);
    waiting.delete(data.id);
    return data.error ? entry?.reject(new Error(data.error)) : entry?.resolve(data.value);
  }
  try   { postMessage({ id: data.id, value: await handlers[data.type](data) }); }
  catch (error) { postMessage({ error: error.message ?? String(error), id: data.id }); }
});
