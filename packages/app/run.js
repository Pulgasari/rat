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

?fresh in the page's url (or data-fresh on this script) refetches every
module of the same origin first, with cache: 'reload'. that overwrites the
browser's http cache, so the imports after it get today's files: a cache
bust without devtools, on a phone too. .rat files are always revalidated.
*/

(() => {
  const script = document.currentScript;
  const at     = path => new URL(path, script.src).href;
  const fresh  = new URL(location.href).searchParams.has('fresh') || script.hasAttribute('data-fresh');

  // ::: splash

  const SPINNER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="4" cy="12" r="3"><animate id="a" attributeName="r" begin="0;c.end-0.25s" dur="0.75s" values="3;.2;3"/></circle>
    <circle cx="12" cy="12" r="3"><animate attributeName="r" begin="a.end-0.6s" dur="0.75s" values="3;.2;3"/></circle>
    <circle cx="20" cy="12" r="3"><animate id="c" attributeName="r" begin="a.end-0.45s" dur="0.75s" values="3;.2;3"/></circle>
  </svg>`;

  const STATUS = fresh ? 'fetching fresh files' : 'loading the compiler';

  // every selector in :where(), so any rule of the page wins
  const SPLASH = `
    :where(:root) {
      --rat-logo    : url("${at('./splash.svg')}");
      --rat-spinner : url("data:image/svg+xml,${encodeURIComponent(SPINNER)}");
    }

    :where(rat-app:is(:not(:defined), [loading]):empty) {
      align-content  : center;
      display        : grid;
      gap            : 1.5rem;
      justify-items  : center;
      min-block-size : 100dvh;
      text-align     : center;
    }

    :where(rat-app:is(:not(:defined), [loading]):empty)::before {
      aspect-ratio : 3937 / 3067;
      background   : currentColor;
      content      : '';
      inline-size  : min(10rem, 45vw);
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

    :where(rat-app:not(:defined):empty)::after { content: 'rat app is being built …' '\\A' '${STATUS}'; }
  `;

  document.head.prepend(Object.assign(document.createElement('style'), { textContent: SPLASH }));

  // ::: import map

  const map = {
    '@rat/app'        : at('./index.js'),
    '@rat/commands'   : at('../commands/index.js'),
    '@rat/compiler'   : at('../compiler/index.js'),
    '@rat/hotkeys'    : at('../hotkeys/index.js'),
    '@rat/import'     : at('../import/index.js'),
    '@rat/runtime'    : at('../runtime/index.js'),
    '@rat/signals'    : at('../signals/index.js'),
    '@rat/types'      : at('../types/index.js'),

    '@bunker/db'      : at('../../../bunker/db/index.js'),
    '@bunker/policy'  : at('../../../bunker/policy/index.js'),
    '@domina/methods/': at('../../../domina/packages/methods/'),
    '@domina/render'  : at('../../../domina/packages/render/index.js'),
    '@htx/htx'        : at('../../../htx/packages/htx/index.js'),
    '@htx/js/render'  : at('../../../htx/packages/js/render.js'),

    '@pulgasari/is'   : 'https://esm.sh/jsr/@pulgasari/is',
    '@pulgasari/str'  : 'https://esm.sh/jsr/@pulgasari/str',
    'acorn'           : 'https://esm.sh/acorn@8.14.0',
  };

  // what the page maps already stays as it is
  const page = {};
  for (const element of document.querySelectorAll('script[type="importmap"]')) {
    try { Object.assign(page, JSON.parse(element.textContent).imports); } catch {}
  }
  for (const key in page) delete map[key];

  script.after(Object.assign(document.createElement('script'), { textContent: JSON.stringify({ imports: map }), type: 'importmap' }));

  // ::: fresh

  const IMPORTS = /\b(?:import|export)\s*(?:[\w$*{}\s,]+?\s*from\s*)?['"]([^'"\n]+)['"]|\bimport\(\s*['"]([^'"\n]+)['"]\s*\)/g;
  const all     = { ...map, ...page };

  // a specifier to a url the way the import map does it: exact, then the longest prefix, then relative
  function resolve (specifier, base) {
    if (all[specifier]) return new URL(all[specifier], location.href).href;
    const prefix = Object.keys(all).filter(key => key.endsWith('/') && specifier.startsWith(key)).sort((a, b) => b.length - a.length)[0];
    if (prefix) return new URL(all[prefix] + specifier.slice(prefix.length), location.href).href;
    if (/^(\.{1,2}\/|\/)/.test(specifier)) return new URL(specifier, base).href;
    return null;
  }

  // every module of this origin reachable from the entry, fetched past the cache. a miss is skipped
  async function refetch (entry) {
    const seen  = new Set;
    const visit = async url => {
      if (!url || seen.has(url) || new URL(url).origin !== location.origin || /\.rat$/.test(new URL(url).pathname)) return;
      seen.add(url);
      try {
        const code = await fetch(url, { cache: 'reload' }).then(response => response.ok ? response.text() : '');
        await Promise.all([...code.matchAll(IMPORTS)].map(match => visit(resolve(match[1] ?? match[2], url))));
      } catch {}
    };
    await visit(entry);
    return seen.size;
  }

  // ::: start

  const entry = resolve('@rat/app', location.href);
  const ready = fresh ? refetch(entry).then(count => console.info(`[rat] ?fresh: ${count} files refetched`)) : Promise.resolve();

  ready
    .then(() => import(entry))
    .catch(error => console.error('[rat] @rat/app failed to load:', error));
})();
