var f=Object.defineProperty;var i=(a,c)=>f(a,"name",{value:c,configurable:!0});import{K as v,w as r,i as o,R as $,O as h}from"./index-B2ljDWdg.js";import{s as m,l as n}from"./app.rat-BRBbls4Z.js";import{d as w}from"./files-flpFxvji.js";function y(a,c){return b.call({props:a},a,c)}i(y,"CodeInputRatHtml");function b(a,c){let{value:e}=m(this.props,{value:null}),u=v(null);async function d(t){const l=t.currentTarget.files?.[0];t.currentTarget.value="",l&&(e.value=await l.text())}i(d,"picked");async function s(){const t=await RAT.app.dialogs.prompt({ok:"Load",placeholder:"https://example.com/file.txt",title:"Load from URL"});if(!t)return;const l=await fetch(t);if(!l.ok)throw new Error(`${t}: ${l.status} ${l.statusText}`);e.value=await l.text()}i(s,"fromUrl");function p(t,l){t.code!==l&&t.setAttribute("code",l)}return i(p,"source"),o`
    <div.pane>
      <div.pane-header>
        <span.pane-title>${()=>a.title??"Input"}</span>
        <div.pane-actions>
          <btn-icon icon="upload" label="Upload" onclick=${n(()=>u.value?.click())} />
          <btn-icon icon="web" label="URL" onclick=${n(s)} />
          ${r(()=>e.value,()=>o`
              <btn-icon icon="copy" label="Copy" onclick=${n(()=>navigator.clipboard.writeText(e.value))} />
              ${r(()=>a.filename,()=>o`<btn-icon icon="download" label="Download" onclick=${n(()=>w(e.value,a.filename))} />`)}
              <btn-icon icon="close" label="Clear" onclick=${n(()=>e.value="")} />
            `)}
        </div>
      </div>
      <div.input-wrap>
        <write-code editable actions="" lang=${()=>a.lang??"plaintext"} ref=${$(p,()=>e.value)} oninput=${n(t=>e.value=t.detail?.code??e.value)} />
        ${r(()=>!e.value,()=>o`<span.input-placeholder>${()=>a.placeholder??"Paste code here …"}</span>`)}
      </div>
      <div.pane-footer>
        ${r(()=>e.value,()=>o`<span.char-count>${()=>e.value.length} chars</span>`)}
      </div>
      <input type="file" hidden accept=${()=>a.accept??"text/*"} ref=${h(u)} onchange=${n(d)} />
    </div>
  `}i(b,"$$CodeInputRatHtml");export{y as C};
