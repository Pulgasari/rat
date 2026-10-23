// apps/ebooks/library.js
//
// pulling title / author / cover out of a book file. epub is a zip of xhtml —
// epub.js unzips it, reads the OPF package and hands us the cover; pdf metadata
// and a first-page render come from pdf.js. both libraries are already in the
// shared importmap. extraction is the slow part of a library scan, so db.js
// runs it through a bounded background pool and caches the result (cover
// included, as a Blob) keyed by the file's size+mtime signature.

import ePub          from 'epubjs';
import * as pdfjs    from 'pdfjs';

// pin the worker to the exact pdf.js build in the importmap. it's an ES module
// worker (.mjs); pdf.js spins it up with { type:'module' } on its own.
pdfjs.GlobalWorkerOptions.workerSrc =
  'https://esm.sh/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs';

const COVER_MAX = 512;   // longest cover edge we keep, px

export const EXT    = /\.(epub|pdf)$/i;
export const accept = name => EXT.test(name);
export const kindOf = name => /\.pdf$/i.test(name) ? 'pdf' : 'epub';

/** a readable fallback title from a filename */
export function prettyName (name) {
  return name.replace(/\.[^.]+$/, '')
    .replace(/[_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ── cover helpers ────────────────────────────────────────────────────────────

// shrink a cover to a sane size and re-encode as webp/jpeg so a big library of
// full-res covers doesn't blow up IndexedDB
async function downscale (blob) {
  try {
    const bmp    = await createImageBitmap(blob);
    const scale  = Math.min(1, COVER_MAX / Math.max(bmp.width, bmp.height));
    const w      = Math.max(1, Math.round(bmp.width  * scale));
    const h      = Math.max(1, Math.round(bmp.height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    canvas.getContext('2d').drawImage(bmp, 0, 0, w, h);
    bmp.close?.();
    const out = await new Promise(res => canvas.toBlob(res, 'image/webp', 0.82));
    return out || blob;
  } catch {
    return blob;   // some browsers can't decode it here; keep the original
  }
}

// ── epub ─────────────────────────────────────────────────────────────────────

async function fromEpub (arrayBuffer) {
  const book = ePub(arrayBuffer);
  try {
    await book.ready;
    const md = book.packaging?.metadata ?? {};
    let cover = null;
    try {
      const url = await book.coverUrl();               // internal blob: url
      if (url) { cover = await downscale(await (await fetch(url)).blob()); }
    } catch {}
    return {
      title  : (md.title  || '').trim(),
      author : (md.creator || '').trim(),
      cover,
    };
  } finally {
    book.destroy?.();
  }
}

// ── pdf ──────────────────────────────────────────────────────────────────────

async function fromPdf (arrayBuffer) {
  // getDocument transfers the buffer to the worker, so hand it a copy — the
  // caller may still need the original for a subsequent read
  const doc = await pdfjs.getDocument({ data: arrayBuffer.slice(0) }).promise;
  try {
    let title = '', author = '';
    try { const { info } = await doc.getMetadata(); title = (info?.Title || '').trim(); author = (info?.Author || '').trim(); }
    catch {}

    let cover = null;
    try {
      const page     = await doc.getPage(1);
      const base     = page.getViewport({ scale: 1 });
      const scale    = Math.min(2, COVER_MAX / Math.max(base.width, base.height));
      const viewport = page.getViewport({ scale });
      const canvas   = document.createElement('canvas');
      canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      cover = await new Promise(res => canvas.toBlob(res, 'image/webp', 0.82));
      page.cleanup();
    } catch {}

    return { title, author, cover, pages: doc.numPages };
  } finally {
    doc.destroy();
  }
}

// ── public ───────────────────────────────────────────────────────────────────

/**
 * read title / author / cover (and pdf page count) from a book file handle.
 * never throws — a book we can't parse still shows up in the library with its
 * filename as the title and a placeholder cover.
 */
export async function extractMeta (kind, fileHandle) {
  try {
    const file   = await fileHandle.getFile();
    const buffer = await file.arrayBuffer();
    return kind === 'pdf' 
      ? await fromPdf  (buffer) 
      : await fromEpub (buffer);
  } catch (err) {
    console.warn('[ebooks] metadata extraction failed:', err);
    return { title: '', author: '', cover: null };
  }
}
