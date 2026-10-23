// ebooks :: views/LibraryView.js

import Empty       from '/.shared/js/components/Empty.js';
import InstallTip  from '/.shared/js/components/InstallTip.js';
import Picker      from '/.shared/js/components/Picker.js';
import SearchPanel from '/.shared/js/components/SearchPanel.js';
import ViewHeader  from '/.shared/js/components/ViewHeader.js';

import BookItem     from './../components/BookItem.js';
import SourceStatus from './../components/SourceStatus.js';

const app = zugriff.app;

// :::::: PARTS

function BooksIndex ({ books }) {
  return html`
    <data-index viewmode='grid' item-size='150px' gap='1rem'>
      ${books.map(book => html`<aufbau-item key=${book.key}><${BookItem} book=${book} /></aufbau-item>`)}
    </data-index>
  `;
}

// one chip per folder once there is more than one
function FolderBar () {
  const sources = app.db.sources.value;
  if (sources.length < 2) return null;
  const chip = (id, label) => html`
    <button key=${id} class=${'chip' + (app.state.$folder === id ? ' active' : '')} onClick=${() => app.state.folder = id}>${label}</button>`;
  return html`<div class="folder-bar">${chip('', 'All')}${sources.map(source => chip(source.id, source.name))}</div>`;
}

const EmptyLibrary = () => html`<${Empty} icon='mdi:book-outline' title='No books here yet' hint='Scanning may still be running, or this folder has no EPUB/PDF files.' />`;
const EmptySearch  = () => html`<${Empty} icon='mdi:magnify-close' title='Nothing matches your search' />`;

const NoFolders = () => html`
  <${Empty} icon='books' title='Your library is empty'
    hint='Add a folder of EPUB and PDF files. It stays on your device — only the folder permission is remembered.'
    action=${html`<btn-push icon='folder-add' label='Add a folder' onClick=${app.addFolder} />`} />`;

// :::::: VIEW

function LibraryView () {
  const books   = app.visibleBooks.value;
  const pending = app.db.pending.value;

  const tools = html`
    ${pending > 0 && html`<span class="scan-note"><svg-icon icon="loading" /> ${pending} left</span>`}
    <btn-icon icon='refresh'    label='Rescan folders' onClick=${() => app.db.rescanAll()} />
    <btn-icon icon='folder-add' label='Add folder'     onClick=${app.addFolder} />
    <btn-icon icon='settings'   label='Settings'       onClick=${app.toggleConfig} />
  `;

  return html`
    <${ViewHeader} title='Library' tools=${tools} />

    <main>
      <${SourceStatus} />
      <${InstallTip} />

      ${!app.db.sources.value.length
        ? html`<${NoFolders} />`
        : html`
          <div class="lib-controls">
            <${SearchPanel} placeholder='Search title or author…' appStateId='search' />
            <${Picker}      signal=${app.sort} />
          </div>
          <${FolderBar} />

          <section class="shelf">
            <h2>All books <span>${books.length}</span></h2>
            ${books.length ? html`<${BooksIndex} books=${books} />`
              : app.state.$search ? html`<${EmptySearch} />`
              : html`<${EmptyLibrary} />`}
          </section>`}
    </main>
  `;
}

export       { LibraryView };
export default LibraryView;
