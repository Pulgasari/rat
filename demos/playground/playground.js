// rat/demos/playground

/*
source (.rat / .rat.js) -> @rat/compiler -> output (js | ast) -> preview.
the preview is an iframe per run: fresh document, fresh runtime, no state
leaking between two compiles. the compiled module goes in as a blob url, the
iframe gets the page's import map, with @rat/runtime, @rat/signals and @rat/types pointing
into this repo.
*/

import { compileAsync } from '../../packages/compiler/index.js';
import { rat, ratjs }   from '../../packages/syntax/targets/hljs.js';

// :::::: SETUP

const EXAMPLES = [
  { file: 'counter.rat',   title: 'counter'     },
  { file: 'todos.rat',     title: 'todos'       },
  { file: 'commands.rat',  title: 'commands'    },
  { file: 'syntax.rat',    title: 'syntax-tour' },
  { file: 'blocks.rat',    title: 'blocks'      },
  { file: 'behaviors.rat', title: 'behaviors'   },
  { file: 'pipes.rat.js',  title: '.rat.js'     },
];

const DELAY   = 250;
const RUNTIME = new URL('../../packages/runtime/index.js', import.meta.url).href;
const TYPES   = new URL('../../packages/types/index.js',   import.meta.url).href;
const SIGNALS = new URL('../../packages/signals/index.js', import.meta.url).href;
const STORAGE = 'rat:playground:';

const $ = selector => document.querySelector(selector);

const ui = {
  console  : $('#console'),
  example  : $('#example'),
  filename : $('#filename'),
  output   : $('#output'),
  pane     : $('#output-pane'),
  preview  : $('#preview'),
  reset    : $('#reset'),
  source   : $('#source'),
  status   : $('#status'),
};

const state = { blob: null, example: EXAMPLES[0], result: null, runs: 0, timer: 0, view: 'code' };

// :::::: EDITORS

// <write-code> comes from @aufbau/elements. without it (offline, broken map) a textarea does the job
async function editors () {
  try {
    await import('@aufbau/elements/webcomponents/write-code.js');
    await customElements.whenDefined('write-code');
    // straight from this repo, so a change to the spec shows here without a deploy of aufbau
    customElements.get('write-code').registerLanguage('rat', rat).registerLanguage('ratjs', ratjs);
  } catch (error) {
    console.warn('[rat] <write-code> unavailable, falling back to textarea:', error);
    customElements.define('write-code', class extends HTMLElement {
      static observedAttributes = ['code'];
      connectedCallback () {
        this.area ??= Object.assign(document.createElement('textarea'), { readOnly: !this.hasAttribute('editable'), spellcheck: false });
        this.area.style.cssText = 'width: 100%; height: 100%; border: 0; padding: 1rem; font: 13px/1.5 ui-monospace, monospace; background: none; color: inherit; resize: none;';
        this.area.value = this.getAttribute('code') ?? '';
        this.append(this.area);
      }
      attributeChangedCallback (_, __, value) { if (this.area) this.area.value = value ?? ''; }
      get code () { return this.area?.value ?? this.getAttribute('code') ?? ''; }
    });
  }
}

const read  = ()   => ui.source.code ?? '';
const write = code => ui.output.setAttribute('code', code);

// :::::: STORAGE

const stored = file => { try { return localStorage.getItem(STORAGE + file); } catch { return null; } };
const store  = (file, code) => { try { localStorage.setItem(STORAGE + file, code); } catch {} };
const forget = file => { try { localStorage.removeItem(STORAGE + file); } catch {} };

// :::::: COMPILE

// async because a <style lang="scss"> loads its preprocessor first. a run that is
// overtaken by a newer one drops its result
async function run () {
  const source = read();
  const { file } = state.example;
  const ticket   = ++state.runs;
  store(file, source);

  const started = performance.now();

  try {
    const result = await compileAsync(source, { filename: file });
    if (ticket !== state.runs) return;
    state.result = result;
  } catch (error) {
    if (ticket !== state.runs) return;
    state.result = null;
    ui.pane.classList.add('error');
    write(error.message);
    status(error.reason ? `${error.reason} · ${error.line}:${error.column}` : error.message, true);
    return;
  }

  const time = (performance.now() - started).toFixed(1);
  ui.pane.classList.remove('error');
  status(`compiled in ${time} ms · ${state.result.code.length} bytes`);
  show();
  preview(state.result.code);
}

function show () {
  if (!state.result) return;
  ui.output.setAttribute('lang', state.view === 'ast' ? 'json' : 'javascript');
  write(state.view === 'ast' ? JSON.stringify(state.result.ast, null, 2) : state.result.code);
}

function status (text, error = false) {
  ui.status.textContent = text;
  ui.status.classList.toggle('error', error);
}

const schedule = () => { clearTimeout(state.timer); state.timer = setTimeout(run, DELAY); };

// :::::: PREVIEW

function preview (code) {
  if (state.blob) URL.revokeObjectURL(state.blob);
  state.blob = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
  ui.console.replaceChildren();

  // the page's own import map (code.pulgasari.dev: aufbau, domina …) with this repo's runtime on top.
  // one map, since not every browser takes several
  const page = JSON.parse(document.querySelector('script[type="importmap"]')?.textContent || '{}');
  const map  = JSON.stringify({ imports: { ...page.imports, '@rat/runtime': RUNTIME, '@rat/signals': SIGNALS, '@rat/types': TYPES } });

  ui.preview.srcdoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script type="importmap">${map}<\/script>
  <style>
    :root { color-scheme: light; font: 14px/1.4 system-ui, sans-serif; }
    body  { margin: 16px; }
    button, input { font: inherit; }
  </style>
</head>
<body>
  <div id="app"></div>
  <script type="module">
    const send = (kind, text) => parent.postMessage({ kind, rat: true, text: String(text) }, '*');
    const log  = console.log;
    console.log = (...args) => { log(...args); send('log', args.join(' ')); };
    addEventListener('error', event => send('error', event.message));
    addEventListener('unhandledrejection', event => send('error', event.reason?.message ?? event.reason));
    document.addEventListener('rat:command', event => send('command', event.detail.name));

    try {
      const { mount }   = await import('@rat/runtime');
      const module      = await import(${JSON.stringify(state.blob)});
      const Component   = module.default ?? Object.values(module).find(value => typeof value === 'function');
      if (Component) mount(Component, '#app');
    } catch (error) {
      send('error', error.message);
    }
  <\/script>
</body>
</html>`;
}

addEventListener('message', ({ data }) => {
  if (!data?.rat) return;
  const item = Object.assign(document.createElement('li'), { className: data.kind, textContent: data.text });
  ui.console.append(item);
  item.scrollIntoView({ block: 'nearest' });
});

// :::::: EXAMPLES

async function load (example, fresh = false) {
  state.example = example;
  ui.filename.textContent = example.file;
  ui.source.setAttribute('lang', example.file.endsWith('.js') ? 'ratjs' : 'rat');

  const saved  = fresh ? null : stored(example.file);
  const source = saved ?? await fetch(new URL(`../examples/${example.file}`, import.meta.url)).then(response => response.text());

  ui.source.setAttribute('code', source);
  history.replaceState(null, '', `#${example.file}`);
  run();
}

// :::::: BOOT

await editors();

ui.example.append(...EXAMPLES.map(({ file, title }) => new Option(`${title} (${file})`, file)));

ui.example.addEventListener('change', () => load(EXAMPLES.find(({ file }) => file === ui.example.value)));
ui.reset.addEventListener('click', () => { forget(state.example.file); load(state.example, true); });
ui.source.addEventListener('input', schedule);

for (const button of document.querySelectorAll('[data-view]')) {
  button.addEventListener('click', () => {
    state.view = button.dataset.view;
    for (const other of document.querySelectorAll('[data-view]')) other.setAttribute('aria-pressed', other === button);
    show();
  });
}

const initial = EXAMPLES.find(({ file }) => file === location.hash.slice(1)) ?? EXAMPLES[0];
ui.example.value = initial.file;
load(initial);
