var ke=Object.defineProperty;var a=(R,T)=>ke(R,"name",{value:T,configurable:!0});import{M as $,K as q,N as Re,R as Q,g as L,i as M,O as Ee}from"./index-DvJcPkcp.js";import{V as Me,l as s}from"./app.rat-KPqxmOcS.js";import Te from"https://esm.sh/upng-js@2.1.0";import{d as O}from"./files-flpFxvji.js";import{S as V}from"./Segments.rat-DkWivJr0.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";import"./keys-CWTtq0D5.js";function Le(R,T){return Ce.call({props:R},R,T)}a(Le,"PixelArtCreatorViewRatHtml");function Ce(R,T){const ee=["#e63946","#457b9d","#2a9d8f","#e9c46a","#f4a261","#264653","#ffffff","#000000"],te=[.125,.25,.5,1,1.5,2].map(e=>({label:`${e}×`,value:e})),le=[{icon:"minus",label:"No mirror",value:"none"},{icon:"flip-h",label:"Mirror X",value:"x"},{icon:"flip-v",label:"Mirror Y",value:"y"},{icon:"mirror-xy",label:"Mirror X+Y",value:"xy"},{icon:"swap",label:"Diagonal",value:"diagonal"}],ae=[[8,8],[16,16],[32,32],[64,64],[128,128],[16,8],[32,16],[64,32],[128,64]].map(([e,t])=>({h:t,label:`${e}×${t}`,w:e})),ie=[{icon:"edit",label:"",value:"draw"},{icon:"fill",label:"",value:"fill"},{icon:"eraser",label:"",value:"erase"},{icon:"pipette",label:"",value:"pipette"}],j=a((e,t)=>Array.from({length:t},()=>Array(e).fill(null)),"empty");let f=$("palette",ee),p=$("active","#000000"),c=$("preset",{h:16,w:16}),n=$("grid",j(16,16)),B=$("scale",1),C=$("showBg",!0),E=$("showGap",!0),S=$("showGrid",!0),G=$("mirror","none"),z=$("exportWidth",512),b=q("draw");const ne=Re(()=>[...new Set(n.value.flat().filter(Boolean))]);let w=[n.value],y=0;function I(){w=[...w.slice(0,y+1),n.value].slice(-100),y=w.length-1}a(I,"remember");const H=a(()=>{y>0&&(n.value=w[--y])},"undo"),D=a(()=>{y<w.length-1&&(n.value=w[++y])},"redo");function re(){const e=a(t=>{if(!t.ctrlKey&&!t.metaKey)return;const l=t.key.toLowerCase();l==="z"&&(t.preventDefault(),t.shiftKey?D():H()),l==="y"&&(t.preventDefault(),D())},"onKey");return addEventListener("keydown",e),()=>removeEventListener("keydown",e)}a(re,"keys");function oe(e,t){const{h:l,w:i}=c.value,o=l-1-e,u=i-1-t;switch(G.value){case"x":return[[e,t],[e,u]];case"y":return[[e,t],[o,t]];case"xy":return[[e,t],[e,u],[o,t],[o,u]];case"diagonal":return[[e,t],[t,e]].filter(([r,g])=>r<l&&g<i);default:return[[e,t]]}}a(oe,"mirrored");function K(e,t,l){const i=n.value.map(o=>[...o]);for(const[o,u]of oe(e,t))i[o][u]=l;n.value=i}a(K,"set");function ue(e,t,l,i){if(l===i)return;const{h:o,w:u}=c.value,r=n.value.map(v=>[...v]),g=[[e,t]];for(;g.length;){const[v,d]=g.pop();v<0||v>=o||d<0||d>=u||r[v][d]!==l||(r[v][d]=i,g.push([v+1,d],[v-1,d],[v,d+1],[v,d-1]))}n.value=r}a(ue,"flood");let J=null;function W(e,t,l){const i=n.value[e]?.[t];if(i!==void 0){if(b.value==="pipette"){i&&(p.value=i),b.value="draw";return}if(b.value==="fill"){l&&(ue(e,t,i,p.value),I());return}if(b.value==="erase")return K(e,t,null);l&&(J=i===p.value?null:p.value),i!==J&&K(e,t,J)}}a(W,"touch");function ce(e,[t,l,i]){const{h:o,w:u}=c.value,r=devicePixelRatio||1,g=a(()=>{const d=e.clientWidth/u;e.width=Math.round(e.clientWidth*r),e.height=Math.round(d*o*r),e.style.height=`${d*o}px`;const h=e.getContext("2d"),N=i||l?1:0,k=d*r;if(h.clearRect(0,0,e.width,e.height),t.forEach((m,xe)=>m.forEach((Z,Se)=>{Z&&(h.fillStyle=Z,h.fillRect(Se*k,xe*k,k-N*r,k-N*r))})),!!l){h.fillStyle=getComputedStyle(e).getPropertyValue("--cc")||"#8884";for(let m=1;m<u;m++)h.fillRect(Math.round(m*k)-r,0,r,e.height);for(let m=1;m<o;m++)h.fillRect(0,Math.round(m*k)-r,e.width,r)}},"draw"),v=new ResizeObserver(g);return v.observe(e),g(),()=>v.disconnect()}a(ce,"board");function Y(e){const t=e.currentTarget.getBoundingClientRect();return[Math.floor((e.clientY-t.top)/t.height*c.value.h),Math.floor((e.clientX-t.left)/t.width*c.value.w)]}a(Y,"cellAt");let A=!1;function se(e){e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),A=!0,W(...Y(e),!0)}a(se,"down");function ve(e){A&&b.value!=="fill"&&W(...Y(e),!1)}a(ve,"over");function U(){A&&(A=!1,(b.value==="draw"||b.value==="erase")&&I())}a(U,"up");function de(e){const t=n.value;c.value={h:e.h,w:e.w},n.value=Array.from({length:e.h},(l,i)=>Array.from({length:e.w},(o,u)=>t[i]?.[u]??null)),w=[n.value],y=0}a(de,"resize");const P=a(e=>{n.value=e,I()},"change"),fe=a(()=>P(j(c.value.w,c.value.h)),"clear"),pe=a(()=>P(n.value.map(e=>e.map(()=>p.value))),"fillAll"),ge=a(()=>P(n.value.map(e=>e.map(t=>t?`#${(16777215^parseInt(t.slice(1),16)).toString(16).padStart(6,"0")}`:null))),"invert");function X(e,t){P(n.value.map(l=>l.map(i=>i===e?t:i))),f.value.includes(t)||(f.value=[...f.value,t])}a(X,"replace");function he(e){f.value.includes(e)||(f.value=[...f.value,e]),p.value=e}a(he,"addColor");const $e=a(()=>O(JSON.stringify({grid:n.value,palette:f.value,preset:c.value,version:1}),"pixel-art.json","application/json"),"exportJson");async function be(e){const t=e.currentTarget.files?.[0];if(e.currentTarget.value="",!t)return;const l=JSON.parse(await t.text());if(!l.grid||!l.preset)throw new Error("Not a pixel art file");c.value=l.preset,f.value=l.palette??f.value,n.value=l.grid,w=[n.value],y=0}a(be,"importJson");function me(){const{h:e,w:t}=c.value,l=n.value.flatMap((i,o)=>i.map((u,r)=>u?`<rect x="${r}" y="${o}" width="1" height="1" fill="${u}"/>`:"")).filter(Boolean).join(`
  `);return`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${e}" viewBox="0 0 ${t} ${e}" shape-rendering="crispEdges">
  ${l}
</svg>`}a(me,"svg");const _=a(()=>Math.max(4,Math.round(z.value/Math.max(c.value.w,c.value.h))),"cellSize");function we(){const e=_(),t=Object.assign(document.createElement("canvas"),{height:c.value.h*e,width:c.value.w*e}),l=t.getContext("2d");n.value.forEach((i,o)=>i.forEach((u,r)=>{u&&(l.fillStyle=u,l.fillRect(r*e,o*e,e,e))})),t.toBlob(i=>O(i,"pixel-art.png"))}a(we,"png");function ye(){const e=_(),t=c.value.w*e,l=c.value.h*e,i=new Uint8Array(t*l*4);n.value.forEach((o,u)=>o.forEach((r,g)=>{if(!r)return;const v=parseInt(r.slice(1),16);for(let d=0;d<e;d++)for(let h=0;h<e;h++){const N=((u*e+d)*t+g*e+h)*4;i.set([v>>16&255,v>>8&255,v&255,255],N)}})),O(new Blob([Te.encode([i.buffer],t,l,256)],{type:"image/png"}),"pixel-art-opt.png")}a(ye,"smallPng");let F=q(null);function x(e,t,l,i){return M`<button.tool-btn class:active=${()=>i} title=${()=>t} onclick=${s(l)}><svg-icon icon=${()=>e} /></button>`}return a(x,"toolButton"),M`
    <${Me} back="/" title="Pixel Art Creator" />
    <main.tool>
      <div.tool-body data-show-bg=${()=>String(C.value)} data-show-gap=${()=>String(E.value||S.value)} data-show-grid=${()=>String(S.value)} style=${()=>`--pxl-active: ${p.value}; --pxl-scale: ${B.value}`} ref=${Q(re)}>
        <div.used-colors>
          <div.used-swatch.transparent title="Transparent: fill with the active colour" onclick=${s(()=>X(null,p.value))} />
          ${L(()=>ne.value,e=>e,e=>M`<label.used-swatch style=${()=>`background: ${e}`} title=${()=>e}><input type="color" value=${()=>e} style="opacity: 0; position: absolute; width: 0; height: 0" oninput=${s(t=>X(e,t.currentTarget.value))} /></label>`)}
        </div>
        <div.canvas-wrap><canvas.pixel-grid ref=${Q(ce,()=>[n.value,S.value,E.value])} onpointerdown=${s(se)} onpointermove=${s(ve)} onpointerup=${s(U)} onpointercancel=${s(U)} oncontextmenu=${s(e=>e.preventDefault())} /></div>
        <div.palette>
          ${L(()=>f.value,e=>e,e=>M`<div.pal-swatch class:active=${()=>p.value===e} style=${()=>`background: ${e}`} title=${()=>`${e} (right click removes)`} onclick=${s(()=>p.value=e)} oncontextmenu=${s(t=>{t.preventDefault(),f.value=f.value.filter(l=>l!==e)})} />`)}
          <label.pal-add title="Add color">
            <input type="color" style="opacity: 0; position: absolute; width: 0; height: 0" oninput=${s(e=>he(e.currentTarget.value))} />
            <svg-icon icon="add" />
          </label>
        </div>
        <div.toolbar>
          <${V} ...${{get options(){return ie},get value(){return b.value},onchange:a(e=>b.value=e,"onchange")}} />
          <${V} ...${{get options(){return te},get value(){return B.value},onchange:a(e=>B.value=e,"onchange")}} />
          <div.divider />
          <${V} ...${{get options(){return le.map(e=>({icon:e.icon,label:"",value:e.value}))},get value(){return G.value},onchange:a(e=>G.value=e,"onchange")}} />
          <div.divider />
          <div.tool-group>
            ${L(()=>ae,e=>e,e=>M`<button.preset-btn class:active=${()=>c.value.w===e.w&&c.value.h===e.h} onclick=${s(()=>de(e))}>${()=>e.label}</button>`)}
          </div>
          <div.divider />
          <div.tool-group>
            ${()=>x("undo","Undo (Ctrl+Z)",H,!1)}
            ${()=>x("redo","Redo (Ctrl+Y)",D,!1)}
          </div>
          <div.divider />
          <div.tool-group>
            ${()=>x("delete","Clear",fe,!1)}
            ${()=>x("fill-all","Fill all",pe,!1)}
            ${()=>x("invert","Invert colors",ge,!1)}
          </div>
          <div.divider />
          <button.btn.primary onclick=${s(()=>O(me(),"pixel-art.svg","image/svg+xml"))}><svg-icon icon="download" /> SVG</button>
          <button.btn.secondary onclick=${s(we)}><svg-icon icon="image" /> PNG</button>
          <button.btn.secondary onclick=${s(ye)}><svg-icon icon="image" /> PNG opt</button>
          <button.btn.secondary onclick=${s($e)}><svg-icon icon="braces" /> JSON</button>
          <button.btn.secondary title="Import JSON" onclick=${s(()=>F.value?.click())}><svg-icon icon="upload" /> Import</button>
          <input type="file" accept=".json" hidden ref=${Ee(F)} onchange=${s(be)} />
          <div.divider />
          <div.tool-group>
            ${()=>x("checkers","Toggle background",()=>C.value=!C.value,C.value)}
            ${()=>x("gap","Toggle gap",()=>E.value=!E.value,E.value)}
            ${()=>x("grid","Toggle grid",()=>S.value=!S.value,S.value)}
          </div>
          <label.export-width>PNG width <input.field type="number" min="16" value=${()=>z.value} oninput=${s(e=>z.value=Number(e.currentTarget.value))} /></label>
        </div>
      </div>
    </main>
  `}a(Ce,"$$PixelArtCreatorViewRatHtml");export{Le as default};
