// @rat/app :: run

/*
the one script a page without a build needs:

  <script src="./packages/app/run.js"></script>
  <rat-app src="app.rat"></rat-app>

a classic script on purpose: it runs before any module, so the import map it
writes is in place in time. a module script would be too late for that.

the map points @rat/* into this repo and @htx/*, @domina/* into the repos
next to it (code.pulgasari.dev/rat/, /htx/, /domina/, or a local checkout of
all three side by side). entries of an import map already on the page win:
put it before this script to point anything elsewhere.
*/

(() => {
  const script = document.currentScript;
  const at     = path => new URL(path, script.src).href;

  const map = {
    '@rat/app'        : at('./index.js'),
    '@rat/compiler'   : at('../compiler/index.js'),
    '@rat/runtime'    : at('../runtime/index.js'),
    '@rat/signals'    : at('../signals/index.js'),
    '@rat/types'      : at('../types/index.js'),

    '@domina/methods/': at('../../../domina/packages/methods/'),
    '@domina/render'  : at('../../../domina/packages/render/index.js'),
    '@htx/htx'        : at('../../../htx/packages/htx/index.js'),
    '@htx/js/render'  : at('../../../htx/packages/js/render.js'),

    '@pulgasari/is'   : 'https://esm.sh/jsr/@pulgasari/is',
    '@pulgasari/str'  : 'https://esm.sh/jsr/@pulgasari/str',
    'acorn'           : 'https://esm.sh/acorn@8.14.0',
  };

  // what the page maps already stays as it is
  for (const element of document.querySelectorAll('script[type="importmap"]')) {
    try { for (const key in JSON.parse(element.textContent).imports ?? {}) delete map[key]; } catch {}
  }

  script.after(Object.assign(document.createElement('script'), { textContent: JSON.stringify({ imports: map }), type: 'importmap' }));

  import(map['@rat/app'] ?? '@rat/app').catch(error => console.error('[rat] @rat/app failed to load:', error));
})();
