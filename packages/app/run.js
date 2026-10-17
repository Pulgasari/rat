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

it also draws the splash of an empty <rat-app>: logo, what is happening,
spinner. css only, so it is there with the first paint, long before the
compiler has loaded. background and color are the page's, the logo and the
spinner are masks in currentColor. content inside <rat-app> replaces it, a
page can set --rat-logo and --rat-spinner (url(…)) to swap either.
*/

(() => {
  // placeholder until the real logo is in
  const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="#000" stroke-width="2"/><text x="12" y="16" font-family="system-ui, sans-serif" font-size="10" font-weight="900" text-anchor="middle">rat</text></svg>`;

  const SPINNER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="4" cy="12" r="3"><animate id="a" attributeName="r" begin="0;c.end-0.25s" dur="0.75s" values="3;.2;3"/></circle>
    <circle cx="12" cy="12" r="3"><animate attributeName="r" begin="a.end-0.6s" dur="0.75s" values="3;.2;3"/></circle>
    <circle cx="20" cy="12" r="3"><animate id="c" attributeName="r" begin="a.end-0.45s" dur="0.75s" values="3;.2;3"/></circle>
  </svg>`;

  const svg = code => `url("data:image/svg+xml,${encodeURIComponent(code)}")`;

  // every selector in :where(), so any rule of the page wins
  const SPLASH = `
    :where(:root) { --rat-logo: ${svg(LOGO)}; --rat-spinner: ${svg(SPINNER)}; }

    :where(rat-app:is(:not(:defined), [loading]):empty) {
      align-content  : center;
      display        : grid;
      gap            : 1.5rem;
      justify-items  : center;
      min-block-size : 100dvh;
      text-align     : center;
    }

    :where(rat-app:is(:not(:defined), [loading]):empty)::before {
      aspect-ratio : 1;
      background   : currentColor;
      content      : '';
      inline-size  : min(7rem, 35vw);
      mask         : var(--rat-logo) center / contain no-repeat;
    }

    /* the text on top, the spinner below it: the background only fills the spinner's box, the mask shows the text above and the spinner's shape below */
    :where(rat-app:is(:not(:defined), [loading]):empty)::after {
      background        : linear-gradient(currentColor 0 0) bottom / 2rem 2rem no-repeat;
      content           : 'rat app is being built …' '\\A' attr(data-status);
      line-height       : 1.6;
      mask              : linear-gradient(#000 0 0) top / 100% calc(100% - 2rem) no-repeat, var(--rat-spinner) bottom / 2rem 2rem no-repeat;
      padding-block-end : 3rem;
      white-space       : pre;
    }

    :where(rat-app:not(:defined):empty)::after { content: 'rat app is being built …' '\\A' 'loading the compiler'; }
  `;

  document.head.prepend(Object.assign(document.createElement('style'), { textContent: SPLASH }));

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
