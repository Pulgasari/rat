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

it also draws the splash of <rat-app> while it is not defined or [loading]:
logo, what is happening, spinner, what the app holds hidden meanwhile. css
only, so it is there with the first paint, long before the compiler has
loaded. background and color are the page's, the logo and the spinner are
masks in currentColor. a page can set --rat-logo and --rat-spinner (url(…))
to swap either.

?fresh in the page's url (or data-fresh on this script) refetches every
module of the same origin first, with cache: 'reload'. that overwrites the
browser's http cache, so the imports after it get today's files: a cache
bust without devtools, on a phone too. .rat files are always revalidated, and
what the loader compiled from them is dropped (rat:compiled), so they compile anew.
*/

(() => {
  const script = document.currentScript;
  const at     = path => new URL(path, script.src).href;
  const fresh  = new URL(location.href).searchParams.has('fresh') || script.hasAttribute('data-fresh');

  // ::: splash

  const SPINNER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="4"  cy="12" r="3"><animate id="a" attributeName="r" begin="0;c.end-0.25s" dur="0.75s" values="3;.2;3"/></circle>
    <circle cx="12" cy="12" r="3"><animate        attributeName="r" begin="a.end-0.6s"    dur="0.75s" values="3;.2;3"/></circle>
    <circle cx="20" cy="12" r="3"><animate id="c" attributeName="r" begin="a.end-0.45s"   dur="0.75s" values="3;.2;3"/></circle>
  </svg>`;

  const STATUS = fresh ? 'fetching fresh files' : 'loading';

  // every selector in :where(), so any rule of the page wins
  const SPLASH = `
    :where(:root) {
      --rat-logo    : url("${at('./splash.svg')}");
      --rat-spinner : url("data:image/svg+xml,${encodeURIComponent(SPINNER)}");
    }

    /* what the app holds stays hidden behind the splash */
    :where(rat-app:is(:not(:defined), [loading])) > * { display: none !important; }

    :where(rat-app:is(:not(:defined), [loading])) {
      align-content  : center;
      display        : grid;
      gap            : 1.5rem;
      justify-items  : center;
      min-block-size : 100dvh;
      text-align     : center;
    }

    :where(rat-app:is(:not(:defined), [loading]))::before {
      aspect-ratio : 3937 / 3067;
      background   : currentColor;
      content      : '';
      inline-size  : min(10rem, 45vw);
      mask         : var(--rat-logo) center / contain no-repeat;
    }

    /* the text on top, the spinner below it: the background only fills the spinner's box, the mask shows the text above and the spinner's shape below */
    :where(rat-app:is(:not(:defined), [loading]))::after {
      background        : linear-gradient(currentColor 0 0) bottom / 2rem 2rem no-repeat;
      content           : 'rat app is being built …' '\\A' attr(data-status);
      line-height       : 1.6;
      mask              : linear-gradient(#000 0 0) top / 100% calc(100% - 2rem) no-repeat, var(--rat-spinner) bottom / 2rem 2rem no-repeat;
      padding-block-end : 3rem;
      white-space       : pre;
    }

    :where(rat-app:not(:defined))::after { content: 'rat app is being built …' '\\A' '${STATUS}'; }
  `;

  document.head.prepend(Object.assign(document.createElement('style'), { textContent: SPLASH }));

  // ::: import map
  
  const // CDN + JSR
  ESM = 'https://esm.sh/',
  UPM = 'https://upm.sh/',
  JSR = 'https://esm.sh/jsr/';

  const map = {
    //////////// @rat ////////////
    '@rat/app'        : at('./index.js'),
    '@rat/bunker'     : at('../bunker/index.js'),
    '@rat/commands'   : at('../commands/index.js'),
    '@rat/compiler'   : at('../compiler/index.js'),
    '@rat/hotkeys'    : at('../hotkeys/index.js'),
    '@rat/import'     : at('../import/index.js'),
    '@rat/router'     : at('../router/index.js'),
    '@rat/runtime'    : at('../runtime/index.js'),
    '@rat/signals'    : at('../signals/index.js'),
    '@rat/types'      : at('../types/index.js'),
    //////////// @aufbau ////////////
    '@aufbau/elements'  : at('../../../aufbau/elements/index.js'),
    '@aufbau/elements/' : at('../../../aufbau/elements/'),
    '@aufbau/gestures'  : at('../../../aufbau/gestures/index.js'),
    '@aufbau/svg/'      : at('../../../aufbau/svg/'),
    //////////// @bunker ////////////
    '@bunker/core'    : at('../../../bunker/core/index.js'),
    '@bunker/db'      : at('../../../bunker/db/index.js'),
    '@bunker/policy'  : at('../../../bunker/policy/index.js'),
    '@bunker/storage' : at('../../../bunker/storage/index.js'),
    '@bunker/utils/'  : at('../../../bunker/utils/'),
    //////////// @domina ////////////
    '@domina/chain'   : at('../../../domina/packages/chain/index.js'),
    '@domina/dom'     : at('../../../domina/packages/dom/index.js'),
    '@domina/element' : at('../../../domina/packages/element/index.js'),
    '@domina/observer': at('../../../domina/packages/observer/index.js'),
    '@domina/proxy'   : at('../../../domina/packages/proxy/index.js'),
    '@domina/render'  : at('../../../domina/packages/render/index.js'),
    '@domina/verbs/'  : at('../../../domina/packages/verbs/'),
    //////////// @gestalt ////////////
    '@gestalt/core'   : at('../../../gestalt/packages/core/index.js'),
    //////////// @htx ////////////
    '@htx/compiler'   : at('../../../htx/packages/compiler/index.js'),
    '@htx/htx'        : at('../../../htx/packages/htx/index.js'),
    '@htx/js/render'  : at('../../../htx/packages/js/render.js'),
    //////////// @pulgasari ////////////
    '@pulgasari/canonicalmap' : at('../../../js-packages/obj/CanonicalMap.js'),
    '@pulgasari/coerce'       : at('../../../js-packages/coerce/index.js'),
    '@pulgasari/is'           : JSR + '@pulgasari/is',
    '@pulgasari/logger'       : JSR + '@pulgasari/logger',
    '@pulgasari/shift'        : at('../../../js-packages/shift/index.js'),
    '@pulgasari/str'          : JSR + '@pulgasari/str',
    '@pulgasari/timing'       : at('../../../js-packages/timing/index.js'),
    '@pulgasari/url'          : at('../../../js-packages/url/index.js'),
    //////////// other stuff ////////////
    'acorn'           : ESM + 'acorn@8.14.0',
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
      if (!url || seen.has(url) || new URL(url).origin !== location.origin || /\.rat(\.html)?$/.test(new URL(url).pathname)) return;
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
  // ?fresh drops the compiled files of the loader as well (loader.js)
  const drop  = () => globalThis.caches?.delete('rat:compiled').catch(() => {});
  const ready = fresh ? Promise.all([refetch(entry), drop()]).then(([count]) => console.info(`[rat] ?fresh: ${count} files refetched, compiled files dropped`)) : Promise.resolve();

  ready
    .then(() => import(entry))
    .catch(error => console.error('[rat] @rat/app failed to load:', error));
})();
