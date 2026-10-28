// code :: modules/monaco.js

/*
monaco from a versioned cdn through its own amd loader, not through the import map: esm.sh's
monaco-editor ?worker builds break in ts.worker, the min/vs layout ships plain worker scripts that
cache cleanly. a worker can not be cross-origin, so getWorkerUrl hands monaco a same-origin blob that
importScripts the real one. rat (.rat, .rat.js) comes from @rat/syntax, a failure there costs the
highlighting, never the editor.
*/

const VERSION = '0.50.0';
const BASE    = `https://cdn.jsdelivr.net/npm/monaco-editor@${VERSION}/min/`;
const VS      = `${BASE}vs`;

let loading = null;

export function loadMonaco () {
  return loading ??= new Promise((resolve, reject) => {
    const worker = URL.createObjectURL(new Blob([
      `self.MonacoEnvironment = { baseUrl: '${BASE}' };\n`,
      `importScripts('${VS}/base/worker/workerMain.js');`,
    ], { type: 'text/javascript' }));
    self.MonacoEnvironment = { getWorkerUrl: () => worker };

    const script = Object.assign(document.createElement('script'), { src: `${VS}/loader.js` });
    script.onerror = () => reject(new Error('[code] the monaco loader did not load'));
    script.onload  = () => {
      globalThis.require.config({ paths: { vs: VS } });
      globalThis.require(['vs/editor/editor.main'], async () => {
        const { monaco } = globalThis;
        try   { (await import('@rat/syntax/targets/monaco.js')).register(monaco); }
        catch (error) { console.warn('[code] rat syntax unavailable', error); }
        resolve(monaco);
      }, reject);
    };
    document.head.append(script);
  });
}
