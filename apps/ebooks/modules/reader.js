// apps/ebooks/reader.js
//
// the two reading engines, kept out of the preact layer. each factory builds
// its viewer inside a container element and returns a small controller the ui
// drives (next / prev / zoom / goto / destroy) plus an `onState` callback it
// fires as the reading position moves, so the app can show a progress bar and
// persist where you were.
//
//   pdf  — pdf.js, a lazily-rendered continuous column of canvases
//   epub — epub.js, paginated (or scrolled) reflowable rendering in an iframe
//
// neither factory throws for content reasons; a book that won't open surfaces
// through the returned controller's `error`.

import ePub       from 'epubjs';
import * as pdfjs from 'pdfjs';

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://esm.sh/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs';

// pull a few theme tokens so the epub iframe matches the app's colours
function themeColors () {
  const cs = getComputedStyle(document.documentElement);
  const get = (name, fallback) => (cs.getPropertyValue(name).trim() || fallback);
  return {
    bg     : get('--color-bg', '#282a36'),
    fg     : get('--color-fg', '#f8f8f2'),
    accent : get('--color-ink', '#bd93f9'),
  };
}

// ── PDF ──────────────────────────────────────────────────────────────────────

export async function createPdfReader (container, file, { initialPage = 1, onState } = {}) {
  const data = await file.arrayBuffer();
  const doc  = await pdfjs.getDocument({ data }).promise;
  const pages = doc.numPages;

  container.replaceChildren();
  container.classList.add('pdf-view');

  const first = await doc.getPage(1);
  const vp1   = first.getViewport({ scale: 1 });
  first.cleanup();

  let userZoom = 1;
  let baseScale = 1;
  let current  = Math.min(Math.max(1, initialPage), pages);
  let disposed = false;

  const wrappers = [];              // { el, rendered, task }
  const dpr = Math.min(2, window.devicePixelRatio || 1);

  const fitWidth = () => {
    const avail = container.clientWidth - 32;
    if (avail > 0) baseScale = Math.max(0.2, avail / vp1.width);
  };
  fitWidth();

  const scale = () => baseScale * userZoom;

  // placeholders sized from page 1's ratio; corrected to the real size on render
  const placeholder = n => {
    const el = document.createElement('div');
    el.className = 'pdf-page';
    el.dataset.page = String(n);
    el.style.width  = `${Math.round(vp1.width  * scale())}px`;
    el.style.height = `${Math.round(vp1.height * scale())}px`;
    return el;
  };

  for (let n = 1; n <= pages; n++) {
    const el = placeholder(n);
    container.appendChild(el);
    wrappers.push({ el, rendered: false, task: null });
  }

  async function renderPage (n) {
    const w = wrappers[n - 1];
    if (!w || w.rendered || w.task || disposed) return;
    let page;
    try {
      page = await doc.getPage(n);
      if (disposed) { page.cleanup(); return; }
      const vp = page.getViewport({ scale: scale() });
      const canvas = document.createElement('canvas');
      canvas.width  = Math.ceil(vp.width  * dpr);
      canvas.height = Math.ceil(vp.height * dpr);
      canvas.style.width  = `${Math.round(vp.width)}px`;
      canvas.style.height = `${Math.round(vp.height)}px`;
      const task = page.render({
        canvasContext: canvas.getContext('2d'),
        viewport: vp,
        transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
      });
      w.task = task;
      await task.promise;
      if (disposed) return;
      w.el.style.width = `${Math.round(vp.width)}px`;
      w.el.style.height = `${Math.round(vp.height)}px`;
      w.el.replaceChildren(canvas);
      w.rendered = true;
    } catch { /* render cancelled or failed — leave the placeholder */ }
    finally { w.task = null; page?.cleanup?.(); }
  }

  // render pages as they approach the viewport
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) renderPage(Number(e.target.dataset.page));
  }, { root: container, rootMargin: '200% 0px' });
  wrappers.forEach(w => io.observe(w.el));

  // track the page under the top third of the viewport
  let rafScroll = 0;
  const emit = () => onState?.({ page: current, pages, percent: pages ? current / pages : 0, zoom: userZoom });
  const onScroll = () => {
    if (rafScroll) return;
    rafScroll = requestAnimationFrame(() => {
      rafScroll = 0;
      const mark = container.scrollTop + container.clientHeight / 3;
      let n = 1;
      for (const w of wrappers) { if (w.el.offsetTop <= mark) n = Number(w.el.dataset.page); else break; }
      if (n !== current) { current = n; emit(); }
    });
  };
  container.addEventListener('scroll', onScroll, { passive: true });

  function goto (n) {
    n = Math.min(Math.max(1, n), pages);
    wrappers[n - 1]?.el.scrollIntoView({ block: 'start' });
    current = n; emit();
  }

  function relayout () {
    for (const w of wrappers) {
      w.rendered = false; w.task?.cancel?.(); w.task = null;
      w.el.replaceChildren();
      w.el.style.width  = `${Math.round(vp1.width  * scale())}px`;
      w.el.style.height = `${Math.round(vp1.height * scale())}px`;
    }
    // re-render whatever's on screen
    const top = container.scrollTop, h = container.clientHeight;
    wrappers.forEach((w, i) => {
      const t = w.el.offsetTop;
      if (t + w.el.offsetHeight >= top - h && t <= top + 2 * h) renderPage(i + 1);
    });
  }

  const setZoom = z => { userZoom = Math.min(4, Math.max(0.4, z)); relayout(); emit(); };
  const ro = new ResizeObserver(() => { fitWidth(); relayout(); });
  ro.observe(container);

  if (current > 1) requestAnimationFrame(() => goto(current));
  emit();

  async function outline () {
    try {
      const items = await doc.getOutline();
      const walk = list => (list || []).map(it => ({
        label: it.title, dest: it.dest, children: walk(it.items),
      }));
      return walk(items);
    } catch { return []; }
  }

  async function gotoDest (dest) {
    try {
      let d = typeof dest === 'string' ? await doc.getDestination(dest) : dest;
      if (!Array.isArray(d)) return;
      goto((await doc.getPageIndex(d[0])) + 1);
    } catch {}
  }

  return {
    kind: 'pdf', pages,
    next : () => goto(current + 1),
    prev : () => goto(current - 1),
    goto, gotoDest, outline, setZoom,
    zoomIn : () => setZoom(userZoom + 0.2),
    zoomOut: () => setZoom(userZoom - 0.2),
    destroy () {
      disposed = true;
      io.disconnect(); ro.disconnect();
      container.removeEventListener('scroll', onScroll);
      wrappers.forEach(w => w.task?.cancel?.());
      doc.destroy();
      container.replaceChildren();
      container.classList.remove('pdf-view');
    },
  };
}

// ── EPUB ─────────────────────────────────────────────────────────────────────

export async function createEpubReader (container, file, {
  initialCfi = null, flow = 'paginated', fontSize = 100, onState,
} = {}) {
  const buf  = await file.arrayBuffer();
  const book = ePub(buf);
  container.replaceChildren();
  container.classList.add('epub-view');

  let rendition = null;
  let currentFlow = flow;
  let currentFont = fontSize;
  let lastCfi = initialCfi;

  const colors = themeColors();

  function build (theFlow) {
    rendition = book.renderTo(container, {
      width: '100%', height: '100%',
      flow: theFlow === 'scrolled' ? 'scrolled-doc' : 'paginated',
      spread: 'auto', allowScriptedContent: false,
    });
    rendition.themes.register('app', {
      'html, body': { background: colors.bg + ' !important', color: colors.fg + ' !important' },
      'a, a:link'  : { color: colors.accent + ' !important' },
      'img'        : { 'max-width': '100% !important', height: 'auto !important' },
      '::selection': { background: colors.accent + '55' },
    });
    rendition.themes.select('app');
    rendition.themes.fontSize(currentFont + '%');
    rendition.on('relocated', loc => {
      lastCfi = loc?.start?.cfi ?? lastCfi;
      onState?.({
        cfi    : lastCfi,
        percent: loc?.start?.percentage ?? 0,
        href   : loc?.start?.href,
        atStart: !!loc?.atStart,
        atEnd  : !!loc?.atEnd,
      });
    });
  }

  build(currentFlow);
  await book.ready;
  await rendition.display(initialCfi || undefined);

  async function outline () {
    try {
      const nav = await book.loaded.navigation;
      const walk = list => (list || []).map(it => ({ label: it.label?.trim(), href: it.href, children: walk(it.subitems) }));
      return walk(nav.toc);
    } catch { return []; }
  }

  async function setFlow (theFlow) {
    if (theFlow === currentFlow) return;
    currentFlow = theFlow;
    const cfi = lastCfi;
    rendition.destroy();
    build(currentFlow);
    await rendition.display(cfi || undefined);
  }

  const setFont = pct => { currentFont = Math.min(220, Math.max(60, pct)); rendition.themes.fontSize(currentFont + '%'); };

  return {
    kind: 'epub',
    next : () => rendition.next(),
    prev : () => rendition.prev(),
    gotoHref: href => rendition.display(href),
    outline, setFlow,
    get flow () { return currentFlow; },
    get fontSize () { return currentFont; },
    fontUp  : () => setFont(currentFont + 10),
    fontDown: () => setFont(currentFont - 10),
    destroy () {
      try { rendition?.destroy(); } catch {}
      try { book.destroy(); } catch {}
      container.replaceChildren();
      container.classList.remove('epub-view');
    },
  };
}
