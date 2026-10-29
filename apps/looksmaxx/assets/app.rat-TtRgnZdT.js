var ee=Object.defineProperty;var s=(e,t)=>ee(e,"name",{value:t,configurable:!0});import{z as W,E as te,G as z,H as $,J as ae,P as ne,k as oe,w as v,h as f,e as G,K as re}from"./index-Cm-mwgad.js";import{p as se,a as le}from"./keys-CWTtq0D5.js";import{ImageSegmenter as ie,FilesetResolver as ce,FaceLandmarker as ue}from"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function h(e){let t=!1,a;const n=s(()=>(t||(a=e(),t=!0),a),"source");return{get value(){const r=n();return W(r)?r.value:r},set value(r){const l=n();if(!W(l))throw new TypeError("[rat] an imported reactive variant changes through its methods, it is not reassigned");l.value=r}}}s(h,"imported");function g(e,{keys:t=null,prevent:a=!1,times:n=0}={}){const r=t?se(t):null;let l=n;return function(o){if(!(n&&!l)&&!(r&&!le(o,r))){a&&o.preventDefault(),n&&l--;try{const i=(typeof e=="string"?te(e):e).call(this,o);typeof i?.catch=="function"&&i.catch(u=>z(this,u,"handler"))}catch(i){z(this,i,"handler")}}}}s(g,"listener");const me="0.10.14",fe=`https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${me}/wasm`,ge="https://storage.googleapis.com/mediapipe-models/image_segmenter/hair_segmenter/float32/latest/hair_segmenter.tflite",pe="https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";let de;const X=s(()=>de??=ce.forVisionTasks(fe),"fileset");let ve;async function he(){return ve??=ie.createFromOptions(await X(),{baseOptions:{modelAssetPath:ge,delegate:"GPU"},runningMode:"IMAGE",outputCategoryMask:!0,outputConfidenceMasks:!1})}s(he,"getSegmenter");let be;async function $e(){return be??=ue.createFromOptions(await X(),{baseOptions:{modelAssetPath:pe,delegate:"GPU"},runningMode:"IMAGE",numFaces:1})}s($e,"getLandmarker");async function ye(e){const a=(await he()).segment(e);try{const n=a.categoryMask;return{mask:Uint8Array.from(n.getAsUint8Array()),width:n.width,height:n.height}}finally{a.close?.()}}s(ye,"segmentHair");async function we(e){return(await $e()).detect(e).faceLandmarks?.[0]??null}s(we,"detectFace");const Re=3.1;function ke(e,t,a,{width:n,height:r,scale:l=1,offsetY:o=0,widthRatio:i=Re}={}){if(!t||!a?.complete||!a.naturalWidth)return!1;const u=t[33],k=t[263],y=t[10];if(!u||!k||!y)return!1;const m=(k.x-u.x)*n,x=(k.y-u.y)*r,A=Math.hypot(m,x);if(!A)return!1;const w=Math.atan2(x,m),L=A*i*l,d=L*(a.naturalHeight/a.naturalWidth),E=y.x*n,p=y.y*r+o*d;return e.save(),e.translate(E,p),e.rotate(w),e.drawImage(a,-L/2,-d*.42,L,d),e.restore(),!0}s(ke,"drawHairstyle");const D=s((e,t,a)=>e<t?t:e>a?a:e,"clamp");function Y(e,t,a){e/=255,t/=255,a/=255;const n=Math.max(e,t,a),r=Math.min(e,t,a),l=(n+r)/2;let o=0,i=0;if(n!==r){const u=n-r;switch(i=l>.5?u/(2-n-r):u/(n+r),n){case e:o=(t-a)/u+(t<a?6:0);break;case t:o=(a-e)/u+2;break;default:o=(e-t)/u+4}o/=6}return[o,i,l]}s(Y,"rgbToHsl");function O(e,t,a){return a<0&&(a+=1),a>1&&(a-=1),a<1/6?e+(t-e)*6*a:a<1/2?t:a<2/3?e+(t-e)*(2/3-a)*6:e}s(O,"hue2rgb");function Le(e,t,a){if(t===0){const l=a*255;return[l,l,l]}const n=a<.5?a*(1+t):a+t-a*t,r=2*a-n;return[O(r,n,e+1/3)*255,O(r,n,e)*255,O(r,n,e-1/3)*255]}s(Le,"hslToRgb");function Ue(e,{width:t,height:a},{mask:n,maskW:r,maskH:l},o,i=.85){if(!o||i<=0)return;const[u,k]=Y(o.r,o.g,o.b),y=e.getImageData(0,0,t,a),m=y.data,x=r/t,A=l/a;for(let w=0;w<a;w++){const L=Math.min(l-1,w*A|0);for(let d=0;d<t;d++){const E=Math.min(r-1,d*x|0);if(n[L*r+E]!==1)continue;const p=(w*t+d)*4,[,,V]=Y(m[p],m[p+1],m[p+2]),[q,Q,Z]=Le(u,k,V);m[p]=D(m[p]+(q-m[p])*i,0,255),m[p+1]=D(m[p+1]+(Q-m[p+1])*i,0,255),m[p+2]=D(m[p+2]+(Z-m[p+2])*i,0,255)}}e.putImageData(y,0,0)}s(Ue,"recolorHair");const Te=[{name:"Jet black",r:28,g:28,b:30},{name:"Dark brown",r:74,g:51,b:36},{name:"Chestnut",r:120,g:72,b:44},{name:"Auburn",r:150,g:60,b:40},{name:"Copper",r:190,g:92,b:40},{name:"Honey blonde",r:214,g:168,b:96},{name:"Platinum",r:226,g:220,b:205},{name:"Rose",r:214,g:120,b:150},{name:"Lavender",r:168,g:140,b:214},{name:"Ocean blue",r:70,g:120,b:200},{name:"Emerald",r:60,g:170,b:120},{name:"Crimson",r:200,g:50,b:70}],He=1400;let P=$(!1),U=$(null),C=$(.85),R=$(null),T=$(1),H=$(0),b=$(""),_=$(!1);const c={base:null,canvas:null,face:null,mask:null,style:null},J={detecting:"Finding the face …",loading:"Loading photo …",segmenting:"Finding the hair …"},B=s(e=>e in J,"isBusy"),xe=s(e=>J[e]??e,"labelOf");function F(e){return new Promise((t,a)=>{const n=new Image;n.onload=()=>t(n),n.onerror=()=>a(new Error("Could not read that image.")),n.src=e})}s(F,"imageOf");function Ae(e){return c.canvas=e,j(),()=>{c.canvas===e&&(c.canvas=null)}}s(Ae,"attach");async function I(e){if(e?.type?.startsWith("image/")){b.value="loading";try{const t=URL.createObjectURL(e),a=await F(t);URL.revokeObjectURL(t);const n=Math.min(1,He/Math.max(a.naturalWidth,a.naturalHeight)),r=Object.assign(document.createElement("canvas"),{height:Math.round(a.naturalHeight*n),width:Math.round(a.naturalWidth*n)});r.getContext("2d").drawImage(a,0,0,r.width,r.height),c.base=r,c.face=null,_.value=!1,P.value=!0,b.value="segmenting";const{height:l,mask:o,width:i}=await ye(r);c.mask={mask:o,maskH:l,maskW:i},b.value="",j()}catch(t){console.error("[looksmaxx]",t),b.value=t.message||"Something went wrong."}}}s(I,"usePhoto");function j(){const{base:e,canvas:t}=c;if(!t||!e)return;t.width=e.width,t.height=e.height;const a=t.getContext("2d");a.drawImage(e,0,0),U.value&&c.mask&&Ue(a,t,c.mask,U.value,C.value),R.value&&c.style&&c.face&&ke(a,c.face,c.style,{height:t.height,offsetY:H.value,scale:T.value,width:t.width})}s(j,"compose");ae(()=>{U.value,C.value,R.value,T.value,H.value,j()});async function S(e,t){if(!e&&!t){c.style=null,R.value=null;return}try{c.style=t??await F(e.src),T.value=1,H.value=0,c.face||(b.value="detecting",c.face=await we(c.base),_.value=!!c.face,b.value=c.face?"":"No face found: a hairstyle needs a clear front-facing photo."),R.value=e?.id??"custom"}catch(a){console.error("[looksmaxx]",a),b.value=a.message||"Could not apply that hairstyle."}}s(S,"useStyle");async function Me(e){e&&S(null,await F(URL.createObjectURL(e)))}s(Me,"useCustomStyle");function Ce(){U.value=null,C.value=.85,R.value=null,T.value=1,H.value=0,c.style=null}s(Ce,"reset");function Ee(){!c.canvas||!P.value||c.canvas.toBlob(e=>{const t=Object.assign(document.createElement("a"),{download:"looksmaxx.png",href:URL.createObjectURL(e)});t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),1e3)},"image/png")}s(Ee,"download");const M=s(e=>(t,a)=>ne.notify(t,{...a,type:e}),"notify"),K=Object.assign(M("info"),{error:M("error"),info:M("info"),success:M("success")}),N=oe(!1);globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),N.value=!0});addEventListener("appinstalled",()=>{N.value=!1});function De(e){const t=s(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),K(`${e} can be installed: see the settings`))},"show");N.value?t():addEventListener("beforeinstallprompt",t,{once:!0})}s(De,"hint");function Oe(e,t){return Ie.call({props:e},e,t)}s(Oe,"ColorRowRatHtml");function Ie(e,t){const a=h(()=>U),n=h(()=>C),r=s((o,i)=>o&&o.r===i.r&&o.g===i.g&&o.b===i.b,"same");function l(o){const i=/^#?([0-9a-f]{6})$/i.exec(o.currentTarget.value);if(!i)return;const u=parseInt(i[1],16);a.value={b:u&255,g:u>>8&255,r:u>>16&255}}return s(l,"custom"),f`
    <div.group>
      <div.group-head>
        <span>Hair colour</span>
        ${v(()=>a.value,()=>f`<button.link onclick=${g(()=>a.value=null)}>none</button>`)}
      </div>
      <div.swatches>
        ${G(()=>Te,o=>o,o=>f`<button.swatch class:on=${()=>r(a.value,o)} title=${()=>o.name} style=${()=>`background: rgb(${o.r}, ${o.g}, ${o.b})`} onclick=${g(()=>a.value={b:o.b,g:o.g,r:o.r})} />`)}
        <label.swatch.custom title="Custom colour">
          <svg-icon icon="pipette" />
          <input type="color" oninput=${g(l)} />
        </label>
      </div>
      ${v(()=>a.value,()=>f`
          <label.slider>
            <span>Intensity</span>
            <input type="range" min="0" max="1" step="0.01" value=${()=>n.value} oninput=${g(o=>n.value=Number(o.currentTarget.value))} />
          </label>
        `)}
    </div>
  `}s(Ie,"$$ColorRowRatHtml");function Se(e,t){return Pe.call({props:e},e,t)}s(Se,"DropzoneRatHtml");function Pe(e,t){function a(n){n.preventDefault(),I(n.dataTransfer.files?.[0])}return s(a,"dropped"),f`
    <label.drop ondragover=${g(n=>n.preventDefault())} ondrop=${g(a)}>
      <svg-icon icon="image-add" />
      <strong>Drop a photo</strong>
      <span>or tap to choose: a clear, front-facing portrait works best. Nothing leaves your device.</span>
      <input type="file" accept="image/*" hidden onchange=${g(n=>{I(n.currentTarget.files?.[0]),n.currentTarget.value=""})} />
    </label>
  `}s(Pe,"$$DropzoneRatHtml");const _e=[{id:"bob",name:"Bob",src:new URL(""+new URL("bob-D1rIqnMr.svg",import.meta.url).href,import.meta.url).href},{id:"long",name:"Long",src:new URL(""+new URL("long-DDUEtuoM.svg",import.meta.url).href,import.meta.url).href},{id:"curly",name:"Curly",src:new URL(""+new URL("curly-CWAO1KAY.svg",import.meta.url).href,import.meta.url).href},{id:"buzz",name:"Short",src:new URL(""+new URL("buzz-DdHm9YUP.svg",import.meta.url).href,import.meta.url).href}];function Fe(e,t){return je.call({props:e},e,t)}s(Fe,"StyleRowRatHtml");function je(e,t){const a=h(()=>_),n=h(()=>H),r=h(()=>T),l=h(()=>R);return f`
    <div.group>
      <div.group-head><span>Hairstyle</span></div>
      <div.styles>
        <button.style.none class:on=${()=>!l.value} onclick=${g(()=>S(null))}><svg-icon icon="none" /><span>None</span></button>
        ${G(()=>_e,o=>o,o=>f`
            <button.style class:on=${()=>l.value===o.id} onclick=${g(()=>S(o))}>
              <img src=${()=>o.src} alt=${()=>o.name} />
              <span>${()=>o.name}</span>
            </button>
          `)}
        <label.style.upload class:on=${()=>l.value==="custom"}>
          <svg-icon icon="upload" />
          <span>Your PNG</span>
          <input type="file" accept="image/png,image/*" hidden onchange=${g(o=>{Me(o.currentTarget.files?.[0]),o.currentTarget.value=""})} />
        </label>
      </div>
      ${v(()=>l.value&&a.value,()=>f`
          <label.slider>
            <span>Size</span>
            <input type="range" min="0.6" max="1.8" step="0.01" value=${()=>r.value} oninput=${g(o=>r.value=Number(o.currentTarget.value))} />
          </label>
          <label.slider>
            <span>Height</span>
            <input type="range" min="-0.4" max="0.4" step="0.01" value=${()=>n.value} oninput=${g(o=>n.value=Number(o.currentTarget.value))} />
          </label>
        `)}
    </div>
  `}s(je,"$$StyleRowRatHtml");function Ke(e,t){return Ne.call({props:e},e,t)}s(Ke,"AppRatHtml");function Ne(e,t){const a=h(()=>P),n=h(()=>b),r=new URL(""+new URL("app-Bmm0qxXk.svg",import.meta.url).href,import.meta.url).href;return RAT.app.on("error",K.error),De("looksmaxx"),f`
    <header.topbar>
      <svg-icon icon=${()=>r} mode="image" />
      <strong>looksmaxx</strong>
      <span.spacer />
      ${v(()=>a.value,()=>f`
          <label.ibtn title="New photo">
            <svg-icon icon="image-refresh" />
            <input type="file" accept="image/*" hidden onchange=${g(l=>{I(l.currentTarget.files?.[0]),l.currentTarget.value=""})} />
          </label>
          <btn-icon icon="reset" label="Reset edits" onclick=${g(Ce)} />
          <btn-icon icon="download" label="Download" onclick=${g(Ee)} />
        `)}
    </header>
    <main.stage>
      ${v(()=>!a.value,()=>f`<${Se} />`,()=>f`
          <div.canvas-wrap>
            <canvas ref=${re(Ae)} />
            ${v(()=>B(n.value),()=>f`<div.overlay-status><span.spin />${()=>xe(n.value)}</div>`)}
          </div>
        `)}
    </main>
    ${v(()=>a.value,()=>f`
        <footer.controls>
          ${v(()=>n.value&&!B(n.value),()=>f`<div.msg>${()=>n.value}</div>`)}
          <${Oe} />
          <${Fe} />
        </footer>
      `)}
  `}s(Ne,"$$AppRatHtml");export{Ke as default};
