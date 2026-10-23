// apps/podcasts/panels/SettingsPanel.js
// the settings dialog: menu/player placement, the CORS proxy + artwork resizer, and
// import/export of the subscription library.

import { useSignal }     from '@aufbau/signals';
import { useRef }        from '/.shared/js/vendors.js';
import Modal  from '/.shared/js/components/Modal.js';
import Picker from '/.shared/js/components/Picker.js';
import { PROXY }         from '/.shared/js/modules/http.js';

const DEFAULT_IMG_RESIZER = 'https://img.pulgasari.dev/?url={url}&w={w}';

const app = zugriff.app;
const { library } = app;

export default function SettingsPanel () {
  const proxyVal   = useSignal(app.settings.proxy);
  const resizerVal = useSignal(app.settings.imgResizer);
  const fileRef    = useRef(null);

  const doExport = async () => {
    const data = await library.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), {
      href: url, download: `podcasts-${new Date().toISOString().slice(0, 10)}.json`,
    });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    app.toast.success(`Exported ${data.feeds.length} subscription${data.feeds.length === 1 ? '' : 's'}`);
  };

  const doImport = async file => {
    if (!file) return;
    let data;
    try { data = JSON.parse(await file.text()); }
    catch { app.toast.error('Could not read that file'); return; }
    app.state.dialog = null;
    app.state.busy = 'Importing…';
    try {
      const results = await library.importData(data, (n, total) => app.state.busy = `Importing ${n}/${total}…`);
      const added   = results.filter(r => r.added).length;
      const failed  = results.filter(r => r.error).length;
      app.toast({ message: `Imported ${added} new` + (failed ? `, ${failed} failed` : ''), type: failed ? 'error' : 'success' });
    } catch (err) { app.toast.error(err); }
    finally { app.state.busy = ''; }
  };

  return html`
    <${Modal}>
      
        <h2>Settings</h2>

        <div class="field">
          <span class="field-label">Menu position</span>
          <${Picker} 
            value=${app.settings.menuPos} 
            onChange=${v => app.settings.menuPos = v}
            options=${['top', 'bottom', 'left', 'right']} 
            />
        </div>

        <div class="field">
          <span class="field-label">Player position</span>
          <${Picker}
            value=${app.settings.playerPos}
            onChange=${v => app.settings.playerPos = v}
            options=${['top', 'bottom']}
            />
        </div>

        <label class="field">
          <span class="field-label">CORS proxy</span>
          <span class="field-hint">Most podcast feeds block direct browser requests. Feeds are fetched directly first, then through this proxy. <code>{url}</code> is replaced with the feed URL. Clear it to use direct requests only.</span>
          <input class="modal-input" type="text" value=${proxyVal.value}
                 placeholder=${PROXY}
                 onInput=${e => proxyVal.value = e.target.value} />
          <span class="field-row">
            <button class="ghost small" onClick=${() => proxyVal.value = PROXY}>Reset to default</button>
            <button class="ghost small" onClick=${() => proxyVal.value = ''}>Direct only</button>
          </span>
        </label>
        <label class="field">
          <span class="field-label">Artwork resizer</span>
          <span class="field-hint">A self-hosted endpoint that shrinks cover art server-side, so no third party is involved. <code>{url}</code> is the image, <code>{w}</code> the width. Clear it to resize in the browser instead (only works for images whose host allows it).</span>
          <input class="modal-input" type="text" value=${resizerVal.value}
                 placeholder=${DEFAULT_IMG_RESIZER}
                 onInput=${e => resizerVal.value = e.target.value} />
          <span class="field-row">
            <button class="btn ghost small" onClick=${() => resizerVal.value = DEFAULT_IMG_RESIZER}>Reset to default</button>
            <button class="btn ghost small" onClick=${() => resizerVal.value = ''}>In-browser</button>
          </span>
        </label>

        <div class="field">
          <span class="field-label">Subscriptions</span>
          <span class="field-hint">Back up your subscriptions and listening progress as JSON, or restore from a file.</span>
          <span class="field-row">
            <button onClick=${doExport}><svg-icon icon="download" /> Export JSON</button>
            <button onClick=${() => fileRef.current?.click()}><svg-icon icon="mdi:upload" /> Import JSON</button>
            <input ref=${fileRef} type="file" accept="application/json,.json" hidden
                   onChange=${e => { doImport(e.target.files[0]); e.target.value = ''; }} />
          </span>
        </div>

        <div class="modal-actions">
          <button onClick=${() => {
            app.settings.proxy      = proxyVal.value.trim();
            app.settings.imgResizer = resizerVal.value.trim();
            app.state.dialog = null; app.toast.success('Settings saved');
          }}>Done</button>
        </div>
    <//>
  `;
}
