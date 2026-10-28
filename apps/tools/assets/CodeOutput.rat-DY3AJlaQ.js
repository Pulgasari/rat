var d=Object.defineProperty;var l=(e,n)=>d(e,"name",{value:n,configurable:!0});import{H as u,w as t,h as a,M as v}from"./index-BqtsWe95.js";import{l as i}from"./app.rat-DP92pCm3.js";import{d as s}from"./files-flpFxvji.js";function h(e,n){return $.call({props:e},e,n)}l(h,"CodeOutputRatHtml");function $(e,n){let c=u(null);function r(){const o=document.createRange();o.selectNodeContents(c.value),getSelection().removeAllRanges(),getSelection().addRange(o)}return l(r,"select"),a`
    <div.pane>
      <div.pane-header>
        <span.pane-title>${()=>e.title??"Output"}</span>
        <div.pane-actions>
          ${t(()=>e.value,()=>a`
              <btn-icon icon="copy" label="Copy" onclick=${i(()=>navigator.clipboard.writeText(e.value))} />
              ${t(()=>e.filename,()=>a`<btn-icon icon="download" label="Download" onclick=${i(()=>s(e.value,e.filename))} />`)}
              <btn-icon icon="select-all" label="Select" onclick=${i(r)} />
            `)}
        </div>
      </div>
      <div.output-wrap class:empty=${()=>!e.value}>
        ${t(()=>e.error,()=>a`<div.err-block><svg-icon icon="warning" /><pre>${()=>e.error}</pre></div>`,()=>t(()=>e.value,()=>a`<pre.output-pre ref=${v(c)}>${()=>e.value}</pre>`,()=>a`<span.placeholder>${()=>e.placeholder??"Output appears here …"}</span>`))}
      </div>
      <div.pane-footer>
        ${t(()=>e.value&&e.stats,()=>a`<span.stats><span.stat-badge>${()=>e.stats.ratio}% smaller</span> ${()=>e.stats.after} chars</span>`)}
      </div>
    </div>
  `}l($,"$$CodeOutputRatHtml");export{h as C};
