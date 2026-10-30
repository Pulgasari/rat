var r=Object.defineProperty;var l=(e,n)=>r(e,"name",{value:n,configurable:!0});import{K as u,w as t,i as a,O as v}from"./index-DvJcPkcp.js";import{l as c}from"./app.rat-KPqxmOcS.js";import{d as s}from"./files-flpFxvji.js";function w(e,n){return $.call({props:e},e,n)}l(w,"CodeOutputRatHtml");function $(e,n){let i=u(null);function d(){const o=document.createRange();o.selectNodeContents(i.value.querySelector("pre > code")??i.value),getSelection().removeAllRanges(),getSelection().addRange(o)}return l(d,"select"),a`
    <div.pane>
      <div.pane-header>
        <span.pane-title>${()=>e.title??"Output"}</span>
        <div.pane-actions>
          ${t(()=>e.value,()=>a`
              <btn-icon icon="copy" label="Copy" onclick=${c(()=>navigator.clipboard.writeText(e.value))} />
              ${t(()=>e.filename,()=>a`<btn-icon icon="download" label="Download" onclick=${c(()=>s(e.value,e.filename))} />`)}
              <btn-icon icon="select-all" label="Select" onclick=${c(d)} />
            `)}
        </div>
      </div>
      <div.output-wrap class:empty=${()=>!e.value}>
        ${t(()=>e.error,()=>a`<div.err-block><svg-icon icon="warning" /><pre>${()=>e.error}</pre></div>`,()=>t(()=>e.value,()=>a`<write-code actions="" lang=${()=>e.lang??"plaintext"} code=${()=>e.value} ref=${v(i)} />`,()=>a`<span.placeholder>${()=>e.placeholder??"Output appears here …"}</span>`))}
      </div>
      <div.pane-footer>
        ${t(()=>e.value&&e.stats,()=>a`<span.stats><span.stat-badge>${()=>e.stats.ratio}% smaller</span> ${()=>e.stats.after} chars</span>`)}
      </div>
    </div>
  `}l($,"$$CodeOutputRatHtml");export{w as C};
