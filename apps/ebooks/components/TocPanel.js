// ebooks :: components/TocPanel.js


function TocPanel ({ items, kind, onPick }) {
  const render = list => html`
    <ul class="toc-list">
      ${(list || []).map((item, index) => html`
        <li key=${index}>
          <button class="toc-link" onClick=${() => onPick(kind === 'pdf' ? item.dest : item.href)}>${item.label || 'Untitled'}</button>
          ${item.children?.length ? render(item.children) : null}
        </li>`)}
    </ul>`;
  return html`
    <aside class="toc-panel">
      <div class="toc-head">Contents</div>
      ${items == null
        ? html`<div class="toc-loading"><svg-icon icon="svg-spinners:bars-scale-middle" /></div>`
        : items.length ? render(items) : html`<div class="toc-empty">No contents in this book.</div>`}
    </aside>
  `;
}

export       { TocPanel };
export default TocPanel;
