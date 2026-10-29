var N=Object.defineProperty;var n=($,h)=>N($,"name",{value:h,configurable:!0});import{K as p,M as I,N as D,w as y,i as r,g as T}from"./index-BgOYoByy.js";import{V as _,l as f}from"./app.rat-DU5-tjU4.js";import{PDFDocument as j}from"https://esm.sh/pdf-lib@1.17.1";import*as F from"https://esm.sh/pdfjs-dist@4.4.168";import{d as H}from"./files-flpFxvji.js";import{D as q}from"./Dropzone.rat-ertq5fX7.js";import{S as L}from"./Segments.rat-Cd6Ouq_e.js";import{S as z}from"./Slider.rat-CC-xjTTR.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";function oe($,h){return G.call({props:$},$,h)}n(oe,"PdfExtractorViewRatHtml");function G($,h){F.GlobalWorkerOptions.workerSrc=import.meta.resolve("pdfjs-worker");const O=["pdf","png","jpg","webp"],V={jpg:"image/jpeg",png:"image/png",webp:"image/webp"},B=[{label:"1×",value:1},{label:"2×",value:2},{label:"3×",value:3}];let m=p(null),w=p(""),u=p([]),o=I("format","pdf"),x=p(92),k=p(2),s=p("idle"),c=p(""),R=null;const v=D(()=>u.value.filter(e=>e.selected)),S=D(()=>s.value!=="idle");async function E(e,t,a,l){const d=await e.getPage(t),i=d.getViewport({scale:a}),g=Object.assign(document.createElement("canvas"),{height:i.height,width:i.width}),b=g.getContext("2d");return l&&(b.fillStyle=l,b.fillRect(0,0,g.width,g.height)),await d.render({canvasContext:b,viewport:i}).promise,g}n(E,"render");async function M(e){const t=e[0];if(!t.type.includes("pdf")&&!/\.pdf$/i.test(t.name)){c.value="Not a PDF file";return}s.value="loading",c.value="";try{const a=await t.arrayBuffer();R=a.slice(0);const l=await F.getDocument({data:a}).promise;m.value=l,w.value=t.name.replace(/\.pdf$/i,"");const d=[];for(let i=1;i<=l.numPages;i++){const g=await E(l,i,.3);d.push({number:i,selected:!0,thumb:URL.createObjectURL(await new Promise(b=>g.toBlob(b,"image/webp",.8)))}),u.value=[...d]}}catch(a){c.value=a.message}finally{s.value="idle"}}n(M,"use");function U(){for(const e of u.value)URL.revokeObjectURL(e.thumb);m.value=null,u.value=[],w.value="",c.value="",R=null}n(U,"reset");const P=n(e=>{u.value=u.value.map(t=>({...t,selected:e(t)}))},"select");async function A(){if(!v.value.length)return;s.value="exporting";const e=w.value||"page";try{if(o.value==="pdf"){const t=await j.load(R),a=await j.create();for(const l of await a.copyPages(t,v.value.map(d=>d.number-1)))a.addPage(l);H(new Blob([await a.save()],{type:"application/pdf"}),`${e}_extracted.pdf`)}else for(const t of v.value){const a=await E(m.value,t.number,k.value,o.value==="jpg"?"#fff":null);H(await new Promise(l=>a.toBlob(l,V[o.value],x.value/100)),`${e}_p${t.number}.${o.value}`),await new Promise(l=>setTimeout(l,80))}}catch(t){c.value=t.message}finally{s.value="idle"}}n(A,"extract");const C=D(()=>s.value==="exporting"?"Exporting …":`${o.value==="pdf"?"Extract":"Export"} ${v.value.length} page${v.value.length===1?"":"s"} as ${o.value==="pdf"?"PDF":`.${o.value}`}`);return r`
    <${_} back="/" title="PDF Extractor" />
    <main.tool>
      <div.tool-body>
        ${y(()=>!m.value,()=>r`
            ${y(()=>s.value==="loading",()=>r`<div.loading-row><svg-icon icon="loading" /> Loading PDF …</div>`,()=>r`<${q} accept=".pdf,application/pdf" what="a PDF" ...${{onfiles:M}} />`)}
          `,()=>r`
            <div.file-bar>
              <svg-icon icon="pdf" />
              <span.fname>${()=>w.value}.pdf</span>
              <span.page-count>${()=>m.value.numPages} pages</span>
              <button.ghost-btn onclick=${f(U)}><svg-icon icon="close" /> Remove</button>
            </div>
            <div.sel-bar>
              <span.sel-info>${()=>v.value.length} of ${()=>m.value.numPages} selected</span>
              <button.ghost-btn onclick=${f(()=>P(()=>!0))}>All</button>
              <button.ghost-btn onclick=${f(()=>P(()=>!1))}>None</button>
              <button.ghost-btn onclick=${f(()=>P(e=>!e.selected))}>Invert</button>
            </div>
            <div.pages-grid>
              ${T(()=>u.value,e=>e,e=>r`
                  <div.page-thumb class:selected=${()=>e.selected} onclick=${f(()=>P(t=>t.number===e.number?!t.selected:t.selected))}>
                    <div.thumb-canvas-wrap>
                      <img.thumb-canvas src=${()=>e.thumb} alt=${()=>`Page ${e.number}`} />
                      <div.thumb-check><svg-icon icon=${()=>e.selected?"check-circle":"circle"} /></div>
                    </div>
                    <span.thumb-num>Page ${()=>e.number}</span>
                  </div>
                `)}
            </div>
            <div.export-panel>
              <${L} ...${{get options(){return O},get value(){return o.value},onchange:n(e=>o.value=e,"onchange")}} />
              ${y(()=>o.value!=="pdf",()=>r`
                  <${z} label="Quality" ...${{get min(){return 1},get max(){return 100}}} unit="%" ...${{get value(){return x.value},onchange:n(e=>x.value=e,"onchange")}} />
                  <div.setting-row>
                    <label>Scale</label>
                    <${L} ...${{get options(){return B},get value(){return k.value},onchange:n(e=>k.value=e,"onchange")}} />
                    <span.val.hint>higher = sharper</span>
                  </div>
                `)}
              <btn-push icon=${()=>S.value?"loading":"download"} label=${()=>C.value} disabled=${()=>S.value||!v.value.length} onclick=${f(A)} />
            </div>
          `)}
        ${y(()=>c.value,()=>r`<div.err-block><svg-icon icon="warning" /> ${()=>c.value}</div>`)}
      </div>
    </main>
  `}n(G,"$$PdfExtractorViewRatHtml");export{oe as default};
