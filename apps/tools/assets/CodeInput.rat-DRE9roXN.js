var f=Object.defineProperty;var o=(t,i)=>f(t,"name",{value:i,configurable:!0});import{H as $,w as r,h as c,M as v}from"./index-BqtsWe95.js";import{s as h,l as n}from"./app.rat-DP92pCm3.js";import{d as m}from"./files-flpFxvji.js";function x(t,i){return w.call({props:t},t,i)}o(x,"CodeInputRatHtml");function w(t,i){let{value:a}=h(this.props,{value:null}),u=$(null);async function d(e){const l=e.currentTarget.files?.[0];e.currentTarget.value="",l&&(a.value=await l.text())}o(d,"picked");async function s(){const e=await RAT.app.dialogs.prompt({ok:"Load",placeholder:"https://example.com/file.txt",title:"Load from URL"});if(!e)return;const l=await fetch(e);if(!l.ok)throw new Error(`${e}: ${l.status} ${l.statusText}`);a.value=await l.text()}o(s,"fromUrl");function p(e){e.key==="Tab"&&(e.preventDefault(),e.currentTarget.setRangeText("  ",e.currentTarget.selectionStart,e.currentTarget.selectionEnd,"end"),a.value=e.currentTarget.value)}return o(p,"indent"),c`
    <div.pane>
      <div.pane-header>
        <span.pane-title>${()=>t.title??"Input"}</span>
        <div.pane-actions>
          <btn-icon icon="upload" label="Upload" onclick=${n(()=>u.value?.click())} />
          <btn-icon icon="web" label="URL" onclick=${n(s)} />
          ${r(()=>a.value,()=>c`
              <btn-icon icon="copy" label="Copy" onclick=${n(()=>navigator.clipboard.writeText(a.value))} />
              ${r(()=>t.filename,()=>c`<btn-icon icon="download" label="Download" onclick=${n(()=>m(a.value,t.filename))} />`)}
              <btn-icon icon="close" label="Clear" onclick=${n(()=>a.value="")} />
            `)}
        </div>
      </div>
      <textarea.code-input spellcheck="false" placeholder=${()=>t.placeholder??"Paste code here …"} value=${()=>a.value} oninput=${n(e=>a.value=e.currentTarget.value)} onkeydown=${n(p)} />
      <div.pane-footer>
        ${r(()=>a.value,()=>c`<span.char-count>${()=>a.value.length} chars</span>`)}
      </div>
      <input type="file" hidden accept=${()=>t.accept??"text/*"} ref=${v(u)} onchange=${n(d)} />
    </div>
  `}o(w,"$$CodeInputRatHtml");export{x as C};
