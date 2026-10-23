// podcasts :: components/Export.js
// back up the library as json and restore it. the export carries the feed urls
// plus the listening state keyed by feed url + episode guid, so an import
// re-fetches the feeds and re-attaches progress to them.

import { useRef } from '/.shared/js/vendors.js';

const app = zugriff.app;

async function exportFeeds () {
  const data = await app.library.exportData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const href = URL.createObjectURL(blob);
  const name = `podcasts-${new Date().toISOString().slice(0, 10)}.json`;
  const a    = Object.assign(document.createElement('a'), { href, download: name });

  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
  app.toast.success(`Exported ${data.feeds.length} subscription(s)`);
}

async function importFeeds (file) {
  if (!file) return;

  let data;
  try   { data = JSON.parse(await file.text()); }
  catch { app.toast.error('Could not read that file'); return; }

  app.state.dialog = null;
  app.state.busy   = 'Importing…';

  try {
    const results = await app.library.importData(data, (n, total) => app.state.busy = `Importing ${n}/${total}…`);
    const added   = results.filter(r => r.added).length;
    const failed  = results.filter(r => r.error).length;

    app.toast({
      message : `added: ${added} | failed: ${failed}`,
      type    : failed ? 'error' : 'success',
    });
  }
  catch (error) { app.toast(error); }
  finally       { app.state.busy = ''; }
}

function Export () {
  const fileRef = useRef(null);

  return html`
    <div>
      <span class="field-label">Subscriptions</span>
      <i>Back up your subscriptions and listening progress as JSON, or restore from a file.</i>
      <span>
        <btn-push icon='download' label='Export JSON' onClick=${exportFeeds} />
        <btn-push icon='upload'   label='Import JSON' onClick=${() => fileRef.current?.click()} />

        <input hidden
          ref=${fileRef}
          type="file"
          accept="application/json,.json"
          onChange=${e => { importFeeds(e.target.files[0]); e.target.value = ''; }}
          />
      </span>
    </div>
  `;
}

export default Export;
