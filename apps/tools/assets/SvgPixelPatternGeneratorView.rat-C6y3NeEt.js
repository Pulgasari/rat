var Z=Object.defineProperty;var l=(m,y)=>Z(m,"name",{value:y,configurable:!0});import{M as p,N as S,g as A,i as w}from"./index-DvJcPkcp.js";import{V as _,l as r}from"./app.rat-KPqxmOcS.js";import{d as j}from"./files-flpFxvji.js";import{S as X}from"./Segments.rat-DkWivJr0.js";import{S as Y}from"./Slider.rat-DyVmWo89.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";function re(m,y){return q.call({props:m},m,y)}l(re,"SvgPixelPatternGeneratorViewRatHtml");function q(m,y){const V=["#e63946","#457b9d","#2a9d8f","#e9c46a","#f4a261","#264653","#ffffff","#000000"],z="#ffffff",G=[{icon:"edit",label:"",value:"draw"},{icon:"fill",label:"",value:"fill"},{icon:"eraser",label:"",value:"erase"}],L=l((e,t,a=z)=>Array.from({length:t},()=>Array(e).fill(a)),"filled");let f=p("palette",V),$=p("active","#000000"),b=p("tool","draw"),o=p("columns",9),s=p("rows",9),g=p("gap",0),h=p("size",32),i=p("grid",L(9,9));const R=S(()=>i.value.flat()),C=S(()=>(()=>{const e=10+g.value,t=o.value*e,a=s.value*e,v=i.value.flatMap((c,d)=>c.map((n,u)=>`<rect x="${u*e}" y="${d*e}" width="10" height="10" fill="${n}"/>`)).join(`
  `);return`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${a}" viewBox="0 0 ${t} ${a}" shape-rendering="crispEdges">
  ${v}
</svg>`})()),E=S(()=>`data:image/svg+xml;base64,${btoa(String.fromCharCode(...new TextEncoder().encode(C.value)))}`),I=l(()=>`.pixel-art {
  width: ${o.value*(10+g.value)}px;
  height: ${s.value*(10+g.value)}px;
  background-image: url("${E.value}");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  image-rendering: pixelated;
}`,"css");function M(e,t){const a=i.value;o.value=e,s.value=t,i.value=Array.from({length:t},(v,c)=>Array.from({length:e},(d,n)=>a[c]?.[n]??z))}l(M,"resize");function F(e,t){const a=Math.floor(e/o.value),v=e%o.value;i.value[a]?.[v]!==t&&(i.value=i.value.map((c,d)=>d===a?c.map((n,u)=>u===v?t:n):c))}l(F,"set");function N(e){const t=Math.floor(e/o.value),a=e%o.value,v=i.value[t][a];if(v===$.value)return;const c=i.value.map(n=>[...n]),d=[[t,a]];for(;d.length;){const[n,u]=d.pop();n<0||n>=s.value||u<0||u>=o.value||c[n][u]!==v||(c[n][u]=$.value,d.push([n+1,u],[n-1,u],[n,u+1],[n,u-1]))}i.value=c}l(N,"flood");let k=!1;const P=l(e=>Number(document.elementFromPoint(e.clientX,e.clientY)?.closest(".pixel-cell")?.dataset.index??-1),"indexAt");function T(e,t){if(!(e<0)){if(b.value==="fill"){t&&N(e);return}F(e,b.value==="erase"?z:$.value)}}l(T,"apply");function B(e){e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),k=!0,T(P(e),!0)}l(B,"down");const D=l(e=>{k&&b.value!=="fill"&&T(P(e),!1)},"over");function O(e){f.value.includes(e)||(f.value=[...f.value,e]),$.value=e}l(O,"addColor");const W=l(()=>{i.value=i.value.map(e=>e.map(t=>`#${(16777215^parseInt(t.slice(1),16)).toString(16).padStart(6,"0")}`))},"invert");function x(e,t,a){return w`<button.tool-btn title=${()=>t} onclick=${r(a)}><svg-icon icon=${()=>e} /></button>`}l(x,"toolButton");function H(e,t,a){return w`
      <div.size-field>
        <span.size-label>${()=>e}</span>
        <button.sz-btn onclick=${r(()=>a(Math.max(1,t-1)))}><svg-icon icon="minus" /></button>
        <input.field.sz-input type="number" min="1" max="64" value=${()=>t} oninput=${r(v=>a(Math.max(1,Math.min(64,Number(v.currentTarget.value)||1))))} />
        <button.sz-btn onclick=${r(()=>a(Math.min(64,t+1)))}><svg-icon icon="add" /></button>
      </div>
    `}return l(H,"sizeField"),w`
    <${_} back="/" title="SVG Pixel Pattern" />
    <main.tool>
      <div.tool-body>
        <div.preview style=${()=>`background-image: url("${E.value}"); background-repeat: repeat; background-size: 3px 3px`} />
        <div.canvas-wrap>
          <div.pixel-grid style=${()=>`--sz: ${h.value}px; --cols: ${o.value}; gap: ${g.value}px`} onpointerdown=${r(B)} onpointermove=${r(D)} onpointerup=${r(()=>k=!1)} onpointercancel=${r(()=>k=!1)}>
            ${A(()=>R.value,e=>e,(e,t)=>w`<div.pixel-cell data-index=${()=>t} style=${()=>`background: ${e}`} />`)}
          </div>
        </div>
        <div.palette>
          ${A(()=>f.value,e=>e,e=>w`<div.pal-swatch class:active=${()=>$.value===e} style=${()=>`background: ${e}`} title=${()=>`${e} (right click removes)`} onclick=${r(()=>$.value=e)} oncontextmenu=${r(t=>{t.preventDefault(),f.value=f.value.filter(a=>a!==e)})} />`)}
          <label.pal-add title="Add color">
            <input type="color" style="opacity: 0; position: absolute; width: 0; height: 0" oninput=${r(e=>O(e.currentTarget.value))} />
            <svg-icon icon="add" />
          </label>
        </div>
        <div.toolbar>
          <${X} ...${{get options(){return G},get value(){return b.value},onchange:l(e=>b.value=e,"onchange")}} />
          <div.divider />
          <div.tool-group>
            ${()=>x("delete","Clear",()=>i.value=L(o.value,s.value))}
            ${()=>x("fill-all","Fill all with active color",()=>i.value=L(o.value,s.value,$.value))}
            ${()=>x("invert","Invert colors",W)}
          </div>
          <div.divider />
          ${()=>H("W",o.value,e=>M(e,s.value))}
          ${()=>H("H",s.value,e=>M(o.value,e))}
          <${Y} label="Gap" ...${{get min(){return 0},get max(){return 10}}} unit="px" ...${{get value(){return g.value},onchange:l(e=>g.value=e,"onchange")}} />
          <div.divider />
          <div.tool-group>
            ${()=>x("zoom-out","Zoom out",()=>h.value=Math.max(8,h.value-4))}
            ${()=>x("zoom-in","Zoom in",()=>h.value=Math.min(64,h.value+4))}
          </div>
          <div.divider />
          <button.btn.primary onclick=${r(()=>j(C.value,"pattern.svg","image/svg+xml"))}><svg-icon icon="download" /> SVG</button>
          <button.btn.secondary onclick=${r(()=>navigator.clipboard.writeText(I()))}><svg-icon icon="copy" /> CSS</button>
        </div>
      </div>
    </main>
  `}l(q,"$$SvgPixelPatternGeneratorViewRatHtml");export{re as default};
