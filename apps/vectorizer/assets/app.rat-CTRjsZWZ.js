var D=Object.defineProperty;var r=(a,t)=>D(a,"name",{value:t,configurable:!0});import{n as E,r as O,P as H,p as c,q as j,t as T,w as U,h as g}from"./index-BrUyhCwI.js";import{p as I,a as P}from"./keys-CWTtq0D5.js";import{potrace as W,init as F}from"https://esm.sh/esm-potrace-wasm@0.5.1";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function s(a,{keys:t=null,prevent:o=!1,times:l=0}={}){const m=t?I(t):null;let i=l;return function(n){if(!(l&&!i)&&!(m&&!P(n,m))){o&&n.preventDefault(),l&&i--;try{const u=(typeof a=="string"?E(a):a).call(this,n);typeof u?.catch=="function"&&u.catch(p=>O(this,p))}catch(u){O(this,u)}}}}r(s,"listener");const w=r(a=>(t,o)=>H.notify(t,{...o,type:a}),"notify"),h=Object.assign(w("info"),{error:w("error"),info:w("info"),success:w("success")}),q=2048,N=F(),f={colors:4,mode:"color",smoothness:1,speckles:2,tolerance:.2};async function Q(a){const t=await createImageBitmap(a),o=Math.min(1,q/Math.max(t.width,t.height));if(o===1)return t;const l=await createImageBitmap(t,{resizeHeight:Math.round(t.height*o),resizeQuality:"high",resizeWidth:Math.round(t.width*o)});return t.close(),l}r(Q,"bitmapOf");async function S(a,t=f){await N;const o=await W(a,{alphamax:t.smoothness,extractcolors:t.mode==="color",opticurve:1,opttolerance:t.tolerance,pathonly:!1,posterizationalgorithm:0,posterizelevel:t.colors,turdsize:t.speckles,turnpolicy:4});return X(o,a)}r(S,"trace");function X(a,{height:t,width:o}){const l=a.slice(a.indexOf("<svg"));return/viewBox=/.test(l)?l:l.replace("<svg",`<svg viewBox="0 0 ${o} ${t}"`)}r(X,"tidy");function te(a,t){return G.call({props:a},a,t)}r(te,"AppRatHtml");function G(a,t){let o=c(null),l=c(!1),m=c(""),i=c(null),n=c(""),u=c(f.colors),p=c(f.mode),$=c(f.smoothness),b=c(f.speckles),y=c(f.tolerance);const z=j(()=>n.value?`data:image/svg+xml;charset=utf-8,${encodeURIComponent(n.value)}`:null),A=j(()=>n.value?`${(n.value.length/1024).toFixed(1)} kb`:"");async function x(e){if(!e?.type.startsWith("image/"))return h.error("That is no image.");try{i.value&&URL.revokeObjectURL(i.value),i.value=URL.createObjectURL(e),m.value=e.name.replace(/\.[^.]+$/,"")||"image",o.value=await Q(e)}catch(d){h.error(d)}}r(x,"open");function B(){i.value&&URL.revokeObjectURL(i.value),o.value=i.value=null,n.value=""}r(B,"reset"),T(()=>{const e=o.value,d={colors:u.value,mode:p.value,smoothness:$.value,speckles:b.value,tolerance:y.value};if(!e)return;let v=!0;const L=setTimeout(async()=>{l.value=!0;try{const R=await S(e,d);v&&(n.value=R)}catch(R){h.error(R)}finally{v&&(l.value=!1)}},200);return()=>{v=!1,clearTimeout(L)}});function M(){const e=Object.assign(document.createElement("a"),{download:`${m.value}.svg`,href:URL.createObjectURL(new Blob([n.value],{type:"image/svg+xml"}))});e.click(),URL.revokeObjectURL(e.href)}r(M,"download");const C=r(()=>navigator.clipboard.writeText(n.value).then(()=>h.success("svg copied"),e=>h.error(e)),"copy");T(()=>{const e=r(d=>{const v=[...d.clipboardData?.files??[]].find(L=>L.type.startsWith("image/"));v&&x(v)},"paste");return document.addEventListener("paste",e),()=>document.removeEventListener("paste",e)});const k=r(e=>Number(e.target.value),"number");return g`
    <rat-area name="main">
      <main.vectorizer>
        ${U(()=>!i.value,()=>g`
            <label.drop ondragover=${s(()=>{},{prevent:!0})} ondrop=${s(e=>x(e.dataTransfer.files[0]),{prevent:!0})}>
              <svg-icon icon="mdi:vector-curve" />
              <strong>Pick an image</strong>
              <span>or drop it here, or paste it</span>
              <input type="file" accept="image/*" onchange=${s(e=>x(e.target.files[0]))} />
            </label>
          `,()=>g`
            <section.compare>
              <figure>
                <img src=${()=>i.value} alt="the image" />
                <figcaption>${()=>m.value}</figcaption>
              </figure>
              <figure class:busy=${()=>l.value}>
                ${U(()=>z.value,()=>g`<img src=${()=>z.value} alt="the svg" />`)}
                <figcaption>${()=>l.value||!n.value?"tracing …":`svg · ${A.value}`}</figcaption>
              </figure>
            </section>
            <form.settings onsubmit=${s(()=>{},{prevent:!0})}>
              <fieldset.modes>
                <label><input type="radio" name="mode" value="color" checked=${()=>p.value==="color"} onchange=${s(()=>p.value="color")} /> color</label>
                <label><input type="radio" name="mode" value="mono" checked=${()=>p.value==="mono"} onchange=${s(()=>p.value="mono")} /> black & white</label>
              </fieldset>
              ${U(()=>p.value==="color",()=>g`
                  <label>
                    <span>colors <output>${()=>u.value}</output></span>
                    <input type="range" min="1" max="16" step="1" value=${()=>u.value} oninput=${s(e=>u.value=k(e))} />
                  </label>
                `)}
              <label>
                <span>speckles <output>${()=>b.value}px</output></span>
                <input type="range" min="0" max="100" step="1" value=${()=>b.value} oninput=${s(e=>b.value=k(e))} />
              </label>
              <label>
                <span>smoothness <output>${()=>$.value}</output></span>
                <input type="range" min="0" max="1.33" step="0.01" value=${()=>$.value} oninput=${s(e=>$.value=k(e))} />
              </label>
              <label>
                <span>curve tolerance <output>${()=>y.value}</output></span>
                <input type="range" min="0" max="1" step="0.05" value=${()=>y.value} oninput=${s(e=>y.value=k(e))} />
              </label>
            </form>
            <div.actions>
              <btn-push icon="download" label="Download svg" onclick=${s(M)} disabled=${()=>!n.value} />
              <btn-push icon="mdi:content-copy" label="Copy" onclick=${s(C)} disabled=${()=>!n.value} />
              <btn-push icon="mdi:image-plus" label="Another image" onclick=${s(B)} />
            </div>
          `)}
      </main>
    </rat-area>
  `}r(G,"$$AppRatHtml");export{te as default};
