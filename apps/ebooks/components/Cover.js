// ebooks :: components/Cover.js

import { useEffect, useRef } from '/.shared/js/vendors.js';

// a stable pastel from a title, for the placeholder cover
function hueOf (text = '') {
  let hash = 0;
  for (let index = 0; index < text.length; index++) hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  return hash % 360;
}

// the extracted image if there is one, otherwise a titled placeholder
function Cover ({ book, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !book.cover) return;
    const url = URL.createObjectURL(book.cover);
    element.style.backgroundImage = `url("${url}")`;
    element.classList.add('has-img');
    return () => { URL.revokeObjectURL(url); element.style.backgroundImage = ''; element.classList.remove('has-img'); };
  }, [book.cover]);

  return html`
    <div ref=${ref} class=${'cover ' + className} style=${`--hue:${hueOf(book.title)}`}>
      ${!book.cover && html`
        <div class="cover-fallback">
          <svg-icon icon=${book.kind === 'pdf' ? 'mdi:file-pdf-box' : 'mdi:book-open-page-variant-outline'} />
          <span class="cover-title">${book.title}</span>
          ${book.author && html`<span class="cover-author">${book.author}</span>`}
        </div>`}
      <span class=${'kind-badge ' + book.kind}>${book.kind.toUpperCase()}</span>
    </div>
  `;
}

export       { Cover };
export default Cover;
