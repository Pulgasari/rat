var F=Object.defineProperty;var n=(g,$)=>F(g,"name",{value:$,configurable:!0});import{K as r,N as k,w as f,i as c,g as M,_ as U}from"./index-CsWBSA1m.js";import{V as B,l as p}from"./app.rat-C6L9lY-_.js";import{d as S}from"./files-flpFxvji.js";import{D as E}from"./Dropzone.rat-CaqmKWtL.js";import{S as I}from"./Slider.rat-Di-zItgY.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";function ee(g,$){return N.call({props:g},g,$)}n(ee,"SvgConverterViewRatHtml");function N(g,$){const D=["png","jpg","webp","pdf"],O={jpg:"image/jpeg",png:"image/png",webp:"image/webp"};let t=r(null),o=r(0),u=r(0),s=r(!0),b=r(92),d=r("");const x=k(()=>o.value||t.value?.width||0),y=k(()=>u.value||t.value?.height||0);function j(e){const a=new DOMParser().parseFromString(e,"image/svg+xml").querySelector("svg");let i=parseFloat(a?.getAttribute("width"))||0,l=parseFloat(a?.getAttribute("height"))||0;return(!i||!l)&&a?.getAttribute("viewBox")&&([,,i,l]=a.getAttribute("viewBox").split(/[\s,]+/).map(Number)),{height:l||600,width:i||800}}n(j,"sizeOf");async function H(e){const a=e[0];if(!a.type.includes("svg")&&!/\.svg$/i.test(a.name)){d.value="Not an SVG file";return}const i=await a.text();R(),t.value={name:a.name.replace(/\.svg$/i,""),text:i,url:URL.createObjectURL(new Blob([i],{type:"image/svg+xml"})),...j(i)},d.value=""}n(H,"use");function R(){t.value&&URL.revokeObjectURL(t.value.url),t.value=null,o.value=0,u.value=0}n(R,"remove");function P(e){o.value=e,s.value&&e&&(u.value=Math.round(e*t.value.height/t.value.width))}n(P,"setWidth");function V(e){u.value=e,s.value&&e&&(o.value=Math.round(e*t.value.width/t.value.height))}n(V,"setHeight");async function z(e,a,i){const l=new Image;l.src=t.value.url,await l.decode();const v=Object.assign(document.createElement("canvas"),{height:a,width:e}),m=v.getContext("2d");return i&&(m.fillStyle=i,m.fillRect(0,0,e,a)),m.drawImage(l,0,0,e,a),v}n(z,"canvasOf");async function _(e){const a=x.value,i=y.value,l=t.value.name||"image";try{if(e==="pdf"){const{PDFDocument:w}=await U(async()=>{const{PDFDocument:L}=await import("https://esm.sh/pdf-lib@1.17.1");return{PDFDocument:L}},[],import.meta.url),A=await z(a,i),h=await w.create();return h.addPage([a,i]).drawImage(await h.embedPng(A.toDataURL("image/png")),{height:i,width:a,x:0,y:0}),S(new Blob([await h.save()],{type:"application/pdf"}),`${l}.pdf`)}const v=await z(a,i,e==="jpg"?"#fff":null),m=await new Promise(w=>v.toBlob(w,O[e],b.value/100));S(m,`${l}.${e}`)}catch(v){d.value=v.message||String(v)}}return n(_,"exportAs"),c`
    <${B} back="/" title="SVG Converter" />
    <main.tool>
      <div.tool-body>
        ${f(()=>!t.value,()=>c`<${E} accept="image/svg+xml,.svg" what="an SVG" ...${{onfiles:H}} />`,()=>c`
            <div.content>
              <div.preview-wrap>
                <div.svg-preview><img src=${()=>t.value.url} alt=${()=>t.value.name} /></div>
                <div.preview-meta>
                  <span>${()=>t.value.width} × ${()=>t.value.height}px</span>
                  <span>${()=>t.value.name}.svg</span>
                  <button.ghost-btn onclick=${p(R)}><svg-icon icon="close" /> Remove</button>
                </div>
              </div>
              <div.settings>
                <div.setting-group>
                  <label.setting-label>Output size</label>
                  <div.size-row>
                    <div.size-field>
                      <span.size-unit>W</span>
                      <input.field.size-input type="number" min="1" placeholder=${()=>t.value.width} value=${()=>o.value||""} oninput=${p(e=>P(Number(e.currentTarget.value)||0))} />
                      <span.size-unit>px</span>
                    </div>
                    <button.lock-btn class:active=${()=>s.value} title=${()=>s.value?"Unlock aspect ratio":"Lock aspect ratio"} onclick=${p(()=>s.value=!s.value)}><svg-icon icon=${()=>s.value?"lock":"lock-open"} /></button>
                    <div.size-field>
                      <span.size-unit>H</span>
                      <input.field.size-input type="number" min="1" placeholder=${()=>t.value.height} value=${()=>u.value||""} oninput=${p(e=>V(Number(e.currentTarget.value)||0))} />
                      <span.size-unit>px</span>
                    </div>
                    ${f(()=>o.value||u.value,()=>c`<button.ghost-btn title="Reset to natural size" onclick=${p(()=>{o.value=0,u.value=0})}><svg-icon icon="refresh" /></button>`)}
                  </div>
                  <span.size-hint>→ ${()=>x.value} × ${()=>y.value}px</span>
                </div>
                <div.setting-group>
                  <label.setting-label>Quality <span.setting-sub>(jpg / webp)</span></label>
                  <${I} label="" ...${{get min(){return 1},get max(){return 100}}} unit="%" ...${{get value(){return b.value},onchange:n(e=>b.value=e,"onchange")}} />
                </div>
                <div.setting-group>
                  <label.setting-label>Export as</label>
                  <div.export-btns>
                    ${M(()=>D,e=>e,e=>c`<button.btn.primary onclick=${p(()=>_(e))}><svg-icon icon=${()=>e==="pdf"?"pdf":"download"} /> .${()=>e}</button>`)}
                  </div>
                </div>
              </div>
            </div>
          `)}
        ${f(()=>d.value,()=>c`<div.err-block><svg-icon icon="warning" /> ${()=>d.value}</div>`)}
      </div>
    </main>
  `}n(N,"$$SvgConverterViewRatHtml");export{ee as default};
