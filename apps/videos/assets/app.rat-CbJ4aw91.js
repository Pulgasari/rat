var Ee=Object.defineProperty;var t=(e,n)=>Ee(e,"name",{value:n,configurable:!0});import{P as se,Q as Le,T as ue,V as $e,W as je,X as y,Y as k,Z as Oe,a0 as ee,w as $,h as l,f as H,a1 as he,a2 as ge,a3 as ze,a4 as I,a5 as Ce}from"./index-VCdqSaLx.js";import{p as Pe,a as Se}from"./keys-CWTtq0D5.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function b(e){let n=!1,a;const i=t(()=>(n||(a=e(),n=!0),a),"source");return{get value(){const r=i();return se(r)?r.value:r},set value(r){const f=i();if(!se(f))throw new TypeError("[rat] an imported reactive variant changes through its methods, it is not reassigned");f.value=r}}}t(b,"imported");function v(e,{keys:n=null,prevent:a=!1,times:i=0}={}){const r=n?Pe(n):null;let f=i;return function(c){if(!(i&&!f)&&!(r&&!Se(c,r))){a&&c.preventDefault(),i&&f--;try{const o=(typeof e=="string"?Le(e):e).call(this,c);typeof o?.catch=="function"&&o.catch(d=>ue(this,d,"handler"))}catch(o){ue(this,o,"handler")}}}}t(v,"listener");const Me=t((e,n)=>`${e}/${n}`,"keyOf"),be=t(e=>e?e.kind==="file"?[e]:(e.children??[]).flatMap(be):[],"filesOf");function Fe({table:e}){const n=t(()=>RAT.app.database[e],"db"),a=t(()=>RAT.app.folders,"folders"),i=$e([]),r=new Map;async function f(p,w){const m=new Map(i.value.filter(u=>u.sourceId===p).map(u=>[u.key,u])),x=await Promise.all(be(w).map(async u=>{const A=Me(p,u.path),B=await u.entry.info(),O=`${B?.size}:${B?.modified}`,F=m.get(A);return F?.sig===O?F:{added:F?.added??Date.now(),key:A,name:u.name,path:u.path,sig:O,sourceId:p}})),S=[...m.keys()].filter(u=>!x.some(A=>A.key===u)),s=x.filter(u=>m.get(u.key)!==u);await Promise.all([...S.map(u=>n().delete(u)),...s.map(u=>n().set(u.key,u))]),i.value=[...i.value.filter(u=>u.sourceId!==p),...x]}t(f,"sync"),je(()=>{for(const[p,w]of Object.entries(a().trees.value))r.get(p)!==w&&(r.set(p,w),f(p,w))});async function c(){i.value=await n().values(),await a().load()}t(c,"load");function o(p){return a().perms.value[p.sourceId]!=="granted"?Promise.reject(new Error("Reconnect the folder of this file first.")):a().nodeAt(p.sourceId,p.path)?.entry.read("blob")??Promise.reject(new Error(`${p.name} is no longer in its folder`))}t(o,"open");async function d(){if(!("showDirectoryPicker"in globalThis)&&!globalThis.Capacitor?.isNativePlatform?.())throw new Error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");return a().add()}t(d,"add");const g=t(()=>Promise.all(a().sources.value.map(p=>a().scan(p.id))),"rescan");async function T(p){const w=i.value.filter(m=>m.sourceId===p).map(m=>m.key);await a().remove(p),await Promise.all(w.map(m=>n().delete(m))),i.value=i.value.filter(m=>m.sourceId!==p),r.delete(p)}return t(T,"remove"),{add:d,items:i,load:c,open:o,remove:T,rescan:g}}t(Fe,"createGallery");const D=Fe({table:"clips"}),G=320,de=1,Ie=15e3,re=[];let ne=0;function qe(e){return new Promise((n,a)=>{re.push({job:e,reject:a,resolve:n}),ye()})}t(qe,"limit");function ye(){for(;ne<2&&re.length;){const{job:e,reject:n,resolve:a}=re.shift();ne++,e().then(a,n).finally(()=>{ne--,ye()})}}t(ye,"pump");function Ve(e){return new Promise((n,a)=>{const i=URL.createObjectURL(e),r=Object.assign(document.createElement("video"),{muted:!0,playsInline:!0,preload:"auto"});let f=!1;const c=t((d,g)=>{if(!f){f=!0,clearTimeout(o),r.removeAttribute("src");try{r.load()}catch{}URL.revokeObjectURL(i),d?a(d):n(g)}},"end"),o=setTimeout(()=>c(new Error("timeout")),Ie);r.addEventListener("loadedmetadata",()=>{const d=r.duration;r.currentTime=Number.isFinite(d)&&d>0?Math.min(de,Math.max(.1,d*.1)):de},{once:!0}),r.addEventListener("seeked",()=>{const d=Math.min(1,G/(r.videoWidth||G)),g=Object.assign(document.createElement("canvas"),{height:Math.max(1,Math.round((r.videoHeight||G)*d)),width:Math.max(1,Math.round((r.videoWidth||G)*d))});g.getContext("2d").drawImage(r,0,0,g.width,g.height),g.toBlob(T=>T?c(null,T):c(new Error("encode")),"image/webp",.72)},{once:!0}),r.addEventListener("error",()=>c(r.error??new Error("decode")),{once:!0}),r.src=i})}t(Ve,"frameOf");function De(e){return RAT.app.thumbnails.requestFile(`${e.key}:${e.sig}`,()=>qe(async()=>Ve(await D.open(e)))).catch(()=>null)}t(De,"posterOf");let R=y(null),we=y(""),te=y(0),C=y(0),j=y(!1),L=y(!1),P=y(!1),Y=y("contain"),K=y(null),Z=y(!1),U=y(0),oe=y(!1);const Ue=k(()=>[U.value&&`rotate(${U.value}deg)`,Z.value&&"scaleX(-1)"].filter(Boolean).join(" ")||"none"),ae=[null,"9 / 16","16 / 9","1 / 1","4 / 3"],Ne=30;let h=null;const We=t(e=>Math.min(te.value||0,Math.max(0,e)),"clamp");function pe(e){return isFinite(e)?`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,"0")}`:"0:00"}t(pe,"format");let z=0,X=0;function ke(e){if(!h||!j.value||!P.value){z=0;return}const n=X?(e-X)/1e3:0;X=e;let a=h.currentTime-n;if(a<=0){if(!L.value){h.currentTime=0,C.value=0,W();return}a=h.duration}h.currentTime=a,C.value=a,z=requestAnimationFrame(ke)}t(ke,"back");function Re(){h&&(cancelAnimationFrame(z),z=0,P.value?(h.pause(),X=0,z=requestAnimationFrame(ke)):h.play().catch(e=>console.warn("[videos] play() rejected",e)))}t(Re,"drive");function Be(){R.value&&(j.value=!0,Re())}t(Be,"play");function W(){j.value=!1,cancelAnimationFrame(z),z=0,h?.pause()}t(W,"pause");const Te=t(()=>j.value?W():Be(),"toggle");function le(e){h&&(h.currentTime=We(e),C.value=h.currentTime)}t(le,"seek");const J=t(e=>le((h?.currentTime??0)+e),"skip");function fe(e){W(),le((h?.currentTime??0)+e/Ne)}t(fe,"step");function Ge(){P.value=!P.value,j.value&&Re()}t(Ge,"toggleReverse");function Qe(){L.value=!L.value,h&&(h.loop=L.value)}t(Qe,"toggleLoop");const Xe=t(()=>{K.value=ae[(ae.indexOf(K.value)+1)%ae.length]},"cycleAspect"),Ye=t(()=>{Y.value=Y.value==="cover"?"contain":"cover"},"toggleCrop"),Ke=t(()=>{Z.value=!Z.value},"toggleFlip"),Ze=t(()=>{U.value=(U.value+90)%360},"rotate"),Je=t(()=>{oe.value=!oe.value},"toggleChrome");function ie(e){e&&(W(),R.value&&URL.revokeObjectURL(R.value),R.value=URL.createObjectURL(e),we.value=e.name,te.value=0,C.value=0,P.value=!1,h&&(h.src=R.value,h.load()))}t(ie,"load");function _e(e){h=e;const n={ended:t(()=>{L.value||(j.value=!1)},"ended"),error:t(()=>{console.warn("[videos] media error",e.error),j.value=!1},"error"),loadedmetadata:t(()=>{te.value=e.duration||0},"loadedmetadata"),timeupdate:t(()=>{P.value||(C.value=e.currentTime)},"timeupdate")};for(const[a,i]of Object.entries(n))e.addEventListener(a,i);if(e.loop=L.value,R.value&&e.src!==R.value){const a=C.value;e.src=R.value,e.load(),a&&e.addEventListener("loadedmetadata",()=>{e.currentTime=a},{once:!0})}return()=>{for(const[a,i]of Object.entries(n))e.removeEventListener(a,i);W(),h===e&&(h=null)}}t(_e,"attach");const Q=t(e=>(n,a)=>Oe.notify(n,{...a,type:e}),"notify"),E=Object.assign(Q("info"),{error:Q("error"),info:Q("info"),success:Q("success")}),et=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
  .empty {
    align-content  : center;
    display        : grid;
    gap            : 0.5rem;
    justify-items  : center;
    min-block-size : 50dvh;
    text-align     : center;
  }
  
  svg-icon { font-size: 3rem; opacity: 0.5; }
  .title   { font-weight: 600; margin: 0; }
  .hint    { margin: 0; opacity: 0.7; }
}`;function q(e,n){return tt.call({props:e},e,n)}t(q,"EmptyRatHtml");function tt(e,n){return ee("ihnpco",et),l`
    <div.empty data-rat="ihnpco">
      ${$(()=>e.icon,()=>l`<svg-icon icon=${()=>e.icon} />`)}
      ${$(()=>e.title,()=>l`<p.title>${()=>e.title}</p>`)}
      ${$(()=>e.hint,()=>l`<p.hint>${()=>e.hint}</p>`)}
      ${n}
    </div>
  `}t(tt,"$$EmptyRatHtml");let V=null;const M=$e(!1),ce=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Ae=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!ce;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),V=e,M.value=!0});addEventListener("appinstalled",()=>{V=null,M.value=!1});async function xe(){if(!V)return!1;const e=V;return V=null,M.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}t(xe,"install");function nt(e){const n=t(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),E(`${e} can be installed: see the settings`))},"show");M.value?n():addEventListener("beforeinstallprompt",n,{once:!0})}t(nt,"hint");function at(e,n){return rt.call({props:e},e,n)}t(at,"InstallTipRatHtml");function rt(e,n){return l`
    ${$(()=>!ce,()=>l`
        <div.install-tip>
          <svg-icon icon="info" />
          <span.text>${()=>e.message??"Install the app so your folders stay connected between visits — no reconnecting."}</span>
          ${$(()=>M.value,()=>l`<btn-push icon="download" label="Install app" onclick=${v(xe)} />`,()=>$(()=>Ae,()=>l`<span.hint>Share, then <b>Add to Home Screen</b>.</span>`,()=>l`<span.hint>Use your browser’s <b>Install</b> / <b>Add to Home screen</b> menu.</span>`))}
        </div>
      `)}
  `}t(rt,"$$InstallTipRatHtml");const ot=`@scope (:has(> [data-rat="1yudiy"])) to (:scope > :not([data-rat="1yudiy"])) {
  .gallery { display: flex; flex-direction: column; gap: 0.75rem; min-block-size: 0; padding: 0.75rem; }
  
  .gallery-head { align-items: center; display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .scan-note    { align-items: center; display: inline-flex; gap: 0.35rem; opacity: 0.7; }
  
  .gallery-search {
    align-items   : center;
    border        : 1px solid var(--line);
    border-radius : 999px;
    display       : flex;
    flex          : 1 1 12rem;
    gap           : 0.4rem;
    padding       : 0.15rem 0.5rem 0.15rem 0.75rem;
  
    > input { background: none; border: 0; color: inherit; flex: 1; font: inherit; min-inline-size: 0; outline: none; padding: 0.35rem 0; }
  }
  
  .reconnect { align-items: center; border: 1px solid var(--line); border-radius: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0.5rem 0.75rem; }
  .reconnect-item { align-items: center; display: flex; flex-wrap: wrap; gap: 0.5rem; inline-size: 100%; }
  .reconnect-name { font-weight: 600; margin-inline-end: auto; }
  
  .folder-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .chip { background: none; border: 1px solid var(--line); border-radius: 999px; color: inherit; cursor: pointer; font: inherit; padding: 0.25rem 0.75rem; }
  .chip.active { background: var(--color-ink); border-color: var(--color-ink); color: var(--color-bg); }
  
  .gallery-grid { display: grid; gap: 0.6rem; grid-template-columns: repeat(auto-fill, minmax(var(--thumb-size, 140px), 1fr)); }
  
  .thumb {
    aspect-ratio  : 1;
    background    : var(--panel, rgb(255 255 255 / 0.05));
    border        : 0;
    border-radius : 0.5rem;
    color         : inherit;
    cursor        : pointer;
    display       : grid;
    font          : inherit;
    overflow      : hidden;
    padding       : 0;
    position      : relative;
  
    > img, > .placeholder { grid-area: 1 / 1; block-size: 100%; inline-size: 100%; }
    > img          { object-fit: cover; }
    > .placeholder { align-items: center; display: flex; font-size: 2rem; justify-content: center; opacity: 0.35; }
  
    > .thumb-name {
      background    : linear-gradient(transparent, rgb(0 0 0 / 0.6));
      color         : white;
      font-size     : 0.75rem;
      inset         : auto 0 0 0;
      overflow      : hidden;
      padding       : 1rem 0.4rem 0.3rem;
      position      : absolute;
      text-align    : start;
      text-overflow : ellipsis;
      white-space   : nowrap;
    }
  }
}`;function lt(e,n){return it.call({props:e},e,n)}t(lt,"GalleryRatHtml");function it(e,n){ee("1yudiy",ot);const a=RAT.app.folders,i=e.gallery;let r=y(""),f=y("");const c=k(()=>a.sources.value),o=k(()=>a.perms.value),d=k(()=>Object.values(a.scanning.value).some(Boolean)),g=k(()=>c.value.filter(s=>o.value[s.id]&&o.value[s.id]!=="granted")),T=t((s,u)=>s.name.localeCompare(u.name,void 0,{numeric:!0,sensitivity:"base"}),"byName"),p=k(()=>(()=>{const s=r.value.trim().toLowerCase();return i.items.value.filter(u=>(!f.value||u.sourceId===f.value)&&(!s||u.name.toLowerCase().includes(s)||u.path.toLowerCase().includes(s))).sort(T)})());async function w(){try{await i.add()}catch(s){E.error(s)}}t(w,"add");async function m(s){(await a.reconnect(s.id))?.granted||E.error("Reconnect failed, try “Choose folder”.")}t(m,"reconnect");async function x(s){await a.repick(s.id)||E.error(`Could not open ${s.name}`)}t(x,"repick");function S(s,u){const A=new IntersectionObserver(B=>{B.some(O=>O.isIntersecting)&&(A.disconnect(),Promise.resolve(e.thumb(u)).then(O=>{if(!O)return;const F=Object.assign(document.createElement("img"),{alt:u.name,loading:"lazy",src:O});s.querySelector(".placeholder")?.replaceWith(F)}).catch(()=>{}))},{rootMargin:"300px"});return A.observe(s),()=>A.disconnect()}return t(S,"lazy"),l`
    <div.gallery data-rat="1yudiy">
      <header.gallery-head>
        ${$(()=>d.value,()=>l`<span.scan-note><svg-icon icon="loading" /> scanning …</span>`)}
        <label.gallery-search>
          <svg-icon icon="search" />
          <input type="search" placeholder=${()=>`Search ${e.noun} …`} value=${()=>r.value} oninput=${v(s=>r.value=s.currentTarget.value)} />
          ${$(()=>r.value,()=>l`<btn-icon icon="close" label="clear" onclick=${v(()=>r.value="")} />`)}
        </label>
        ${$(()=>c.value.length,()=>l`<btn-icon icon="refresh" label="Rescan folders" onclick=${v(()=>i.rescan())} />`)}
        <btn-push icon="folder-add" label="Add folder" onclick=${v(w)} />
      </header>
      ${$(()=>g.value.length,()=>l`
          <div.reconnect>
            <svg-icon icon="folder-alert" />
            <span>${()=>g.value.length} folder${()=>g.value.length===1?"":"s"} need reconnecting to read on this device.</span>
            ${H(()=>g.value,s=>s,s=>l`
                <div.reconnect-item>
                  <span.reconnect-name>${()=>s.name}</span>
                  <btn-push icon="folder-key" label="Reconnect" onclick=${v(()=>m(s))} />
                  <btn-push icon="folder-search" label="Choose folder" onclick=${v(()=>x(s))} />
                </div>
              `)}
          </div>
        `)}
      ${$(()=>c.value.length,()=>l`<${at} />`)}
      ${$(()=>c.value.length>1,()=>l`
          <div.folder-chips>
            <button.chip class:active=${()=>f.value===""} onclick=${v(()=>f.value="")}>All</button>
            ${H(()=>c.value,s=>s,s=>l`<button.chip class:active=${()=>f.value===s.id} onclick=${v(()=>f.value=s.id)}>${()=>s.name}</button>`)}
          </div>
        `)}
      ${$(()=>!c.value.length,()=>l`<${q} ...${{get icon(){return e.icon},get title(){return`Browse a folder of ${e.noun}`},get hint(){return"Grant a folder off your device and browse it as a gallery. Nothing is uploaded, only the folder permission is remembered."}}}><btn-push icon="folder-add" label="Add a folder" onclick=${v(w)} /></${q}>`,()=>$(()=>p.value.length,()=>l`
            <div.gallery-grid>
              ${H(()=>p.value,s=>s,s=>l`
                  <button.thumb title=${()=>s.path} onclick=${v(()=>e.onopen(s))} ref=${he(S,()=>s)}>
                    <span.placeholder><svg-icon icon=${()=>e.icon} /></span>
                    <span.thumb-name>${()=>s.name}</span>
                  </button>
                `)}
            </div>
          `,()=>l`<${q} ...${{get icon(){return r.value?"no-results":e.icon},get title(){return r.value?"Nothing matches your search":`No ${e.noun} here yet`},get hint(){return r.value?"":"Scanning may still be running, or this folder has none."}}} />`))}
    </div>
  `}t(it,"$$GalleryRatHtml");function _(e,n){return ct.call({props:e},e,n)}t(_,"ViewHeaderRatHtml");function ct(e,n){const a=t(()=>RAT.app.router.go(RAT.app.resolve(e.back)),"back");return l`
    <header.view-header>
      ${$(()=>typeof e.back=="string",()=>l`<btn-icon.view-back icon="arrow-left" label="back" onclick=${v(a)} />`,()=>$(()=>e.back,()=>l`<btn-icon.view-back icon="arrow-left" label="back" ...${e.back} />`))}
      ${$(()=>e.title,()=>l`<h1>${()=>e.title}</h1>`)}
      <div.view-tools>${n}</div>
    </header>
  `}t(ct,"$$ViewHeaderRatHtml");function st(e,n){return ut.call({props:e},e,n)}t(st,"LibraryViewRatHtml");function ut(e,n){async function a(i){try{ie(await D.open(i)),RAT.app.router.go("/player")}catch(r){E.error(r)}}return t(a,"open"),l`
    <${_} title="videos"><btn-icon icon="settings" label="settings" onclick=${v(()=>RAT.app.toggle("config"))} /></${_}>
    <main><${lt} ...${{get gallery(){return D},get thumb(){return De},onopen:a}} noun="clips" icon="video" /></main>
  `}t(ut,"$$LibraryViewRatHtml");function dt(e,n){return pt.call({props:e},e,n)}t(dt,"ControlsRatHtml");function pt(e,n){const a=b(()=>K),i=b(()=>C),r=b(()=>te),f=b(()=>Y),c=b(()=>Z),o=b(()=>L),d=b(()=>j),g=b(()=>P),T=b(()=>U),p=b(()=>R),w=k(()=>!p.value);function m(x,S,s,u,A){return l`<button.control class:active=${()=>u} class:big=${()=>A} title=${()=>S} aria-label=${()=>ge(S)} disabled=${()=>w.value} onclick=${v(s)}><svg-icon icon=${()=>x} /></button>`}return t(m,"control"),l`
    <div.controls>
      <div.row>
        ${()=>m("rewind-10","Back 10s",()=>J(-10),!1,!1)}
        ${()=>m("frame-back","Frame back",()=>fe(-1),!1,!1)}
        ${()=>m(d.value?"pause":"play",d.value?"Pause":"Play",Te,!1,!0)}
        ${()=>m("frame-forward","Frame forward",()=>fe(1),!1,!1)}
        ${()=>m("forward-10","Forward 10s",()=>J(10),!1,!1)}
      </div>
      <div.progress>
        <span.time>${()=>pe(i.value)}</span>
        <input.scrub type="range" min="0" max=${()=>r.value||0} step="0.01" value=${()=>i.value} disabled=${()=>w.value} oninput=${v(x=>le(parseFloat(x.currentTarget.value)))} />
        <span.time>${()=>pe(r.value)}</span>
      </div>
      <div.row>
        ${()=>m(o.value?"repeat":"repeat-off","Loop",Qe,o.value,!1)}
        ${()=>m("aspect","Aspect ratio",Xe,a.value!=null,!1)}
        ${()=>m("crop","Crop to fill",Ye,f.value==="cover",!1)}
        ${()=>m("reverse","Reverse",Ge,g.value,!1)}
        ${()=>m("mirror","Mirror",Ke,c.value,!1)}
        ${()=>m("rotate","Rotate",Ze,T.value!==0,!1)}
      </div>
    </div>
  `}t(pt,"$$ControlsRatHtml");function ft(e,n){return vt.call({props:e},e,n)}t(ft,"StageRatHtml");function vt(e,n){const a=b(()=>K),i=b(()=>Y),r=b(()=>L),f=b(()=>R),c=b(()=>Ue);let o=y(null),d=0;function g(){if(!f.value)return;const p=Date.now();p-d<300?(Je(),d=0):d=p}t(g,"tap");function T(p){ie(p.currentTarget.files?.[0]),p.currentTarget.value=""}return t(T,"picked"),l`
    <div.stage onclick=${v(g)}>
      <div.frame class:framed=${()=>a.value} style=${()=>a.value?`--aspect: ${a.value}`:""}><video.video playsinline loop=${()=>r.value} style=${()=>`--fit: ${i.value}; transform: ${c.value}`} ref=${he(_e)} /></div>
      ${$(()=>!f.value,()=>l`
          <button.open onclick=${v(()=>o.value?.click())}>
            <svg-icon icon="video" />
            <span>Open a video</span>
            <small>It stays on your device.</small>
          </button>
        `)}
      <input type="file" accept="video/*" hidden ref=${ze(o)} onchange=${v(T)} />
    </div>
  `}t(vt,"$$StageRatHtml");function mt(e,n){return $t.call({props:e},e,n)}t(mt,"PlayerViewRatHtml");function $t(e,n){const a=b(()=>oe),i=b(()=>we);return l`
    ${$(()=>!a.value,()=>l`<${_} back="library" ...${{get title(){return i.value||"player"}}} />`)}
    <main.player class:chromeless=${()=>a.value}>
      <${ft} />
      ${$(()=>!a.value,()=>l`<${dt} />`)}
    </main>
  `}t($t,"$$PlayerViewRatHtml");function ht(e,n){return gt.call({props:e},e,n)}t(ht,"EditViewRatHtml");function gt(e,n){const a=b(()=>R),i=[["cut","Trim / cut"],["rotate","Rotate"],["mirror","Flip / mirror"],["crop","Crop"],["speed","Speed"],["mute","Mute / extract audio"]];return l`
    <${_} back="library" title="edit" />
    <main>
      <${q} icon="edit" title="Quick edits" ...${{get hint(){return a.value?"Editing tools are on the way.":"Open a clip in the player first."}}}>
        <ul.planned>
          ${H(()=>i,r=>r,r=>l`<li><svg-icon icon=${()=>r[0]} /> ${()=>r[1]}</li>`)}
        </ul>
      </${q}>
    </main>
  `}t(gt,"$$EditViewRatHtml");function bt(e,n){return yt.call({props:e},e,n)}t(bt,"DockRatHtml");function yt(e,n){const a=k(()=>RAT.app?.router.$path.value??"/"),i=t((c,o)=>c==="/"?o==="/":o===c||o.startsWith(`${c}/`),"owns"),r=t(c=>c.to!=null&&[c.to,...c.match??[]].some(o=>i(o,a.value)),"isActive"),f=t(c=>c.onclick?c.onclick():RAT.app.router.go(c.to),"run");return l`
    <nav.dock>
      ${H(()=>e.items??[],c=>c,c=>l`<btn-tap class=${()=>r(c)?"col active":"col"} aria-current=${()=>ge(r(c)?"page":null)} icon=${()=>c.icon} label=${()=>c.label} onclick=${v(()=>f(c))} />`)}
    </nav>
  `}t(yt,"$$DockRatHtml");const wt=`@scope (:has(> [data-rat="c7mqim"])) to (:scope > :not([data-rat="c7mqim"])) {
  .folder         { align-items: center; display: flex; gap: 0.5rem; justify-content: space-between; }
  .folder > span  { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .folder-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
}`;function kt(e,n){return Rt.call({props:e},e,n)}t(kt,"FoldersRatHtml");function Rt(e,n){ee("c7mqim",wt);const a=RAT.app.folders,i=e.gallery,r=k(()=>a.sources.value),f=k(()=>a.perms.value);async function c(){try{const o=await i.add();o&&E.success(`Added ${o.name}`)}catch(o){E.error(o)}}return t(c,"add"),l`
    <section.folders data-rat="c7mqim">
      <h3>folders</h3>
      ${H(()=>r.value,o=>o,o=>l`
          <div.folder>
            <span>${()=>o.name}</span>
            ${$(()=>f.value[o.id]!=="granted",()=>l`<btn-push label="Reconnect" onclick=${v(()=>a.reconnect(o.id))} />`)}
            <btn-icon icon="delete" label="Remove" onclick=${v(()=>i.remove(o.id))} />
          </div>
        `,()=>l`<p.hint>No folder yet.</p>`)}
      <div.folder-actions>
        <btn-push icon="folder-add" label="Add a folder" onclick=${v(c)} />
        ${$(()=>r.value.length,()=>l`<btn-push icon="refresh" label="Rescan" onclick=${v(()=>i.rescan())} />`)}
      </div>
    </section>
  `}t(Rt,"$$FoldersRatHtml");const N=Ce("appearance",{}),ve={density:I.densities,geometry:I.geometries,mode:I.modes},Tt=t(()=>N.value,"appearance"),At=t(()=>I.palettes().catch(()=>[]),"palettes");function He(e){const n=document.querySelector("rat-app");for(const[a,i]of Object.entries(e))i?n?.setAttribute(a,i):n?.removeAttribute(a);return I.set(e)}t(He,"apply");function xt(e,n){return N.value={...N.value,[e]:n||null},He({[e]:n||null})}t(xt,"setAppearance");Object.keys(N.value).length&&He(N.value);const Ht=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function me(e,n){return Et.call({props:e},e,n)}t(me,"SettingsRatHtml");function Et(e,n){ee("177zzh1",Ht);let a=y({...Tt()}),i=y([]);const r=k(()=>M.value);At().then(o=>{i.value=o});function f(o,d){const g=d.detail?.value??d.target.value;a.value={...a.value,[o]:g},xt(o,g)}t(f,"change");async function c(){await xe()&&E.success(`${e.name??"the app"} is installed`)}return t(c,"installApp"),l`
    <div.settings data-rat="177zzh1">
      ${n}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>a.value.palette??"zombie"} onchange=${v(o=>f("palette",o))}>
            ${H(()=>i.value,o=>o,o=>l`<input-option value=${()=>o}>${()=>o}</input-option>`)}
          </input-value>
        </label>
        ${H(()=>Object.keys(ve),o=>o,o=>l`
            <label>
              <span>${()=>o}</span>
              <input-value look="segments" value=${()=>a.value[o]??""} onchange=${v(d=>f(o,d))}>
                ${H(()=>ve[o],d=>d,d=>l`<input-option value=${()=>d}>${()=>d}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${$(()=>!ce,()=>l`
          <section>
            <h3>install</h3>
            ${$(()=>r.value,()=>l`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${v(c)} />`,()=>l`
                ${$(()=>Ae,()=>l`<p.hint>Share, then "Add to Home Screen".</p>`,()=>l`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}t(Et,"$$SettingsRatHtml");function Mt(e,n){return Lt.call({props:e},e,n)}t(Mt,"AppRatHtml");function Lt(e,n){RAT.app.on("error",E.error),RAT.app.hold(D.load()),nt("Videos"),globalThis.launchQueue?.setConsumer(async i=>{i?.files?.length&&(ie(await i.files[0].getFile()),RAT.app.router.go("/player"))}),RAT.app.commands.assign({"back-10":t(()=>J(-10),"back-10"),"forward-10":t(()=>J(10),"forward-10"),"toggle-play":Te});const a=[{icon:"folders",label:"Library",to:"/"},{icon:"play",label:"Player",to:"/player"},{icon:"edit",label:"Edit",to:"/edit"},{icon:"settings",label:"Settings",onclick:t(()=>RAT.app.toggle("config"),"onclick")}];return l`
    <rat-view name="library" route="/" component=${()=>st} />
    <rat-view name="player" route="/player" component=${()=>mt} />
    <rat-view name="edit" route="/edit" component=${()=>ht} />
    <rat-area name="dock" dock="bottom" overlay="never" open><${bt} ...${{get items(){return a}}} /></rat-area>
    <rat-area name="config" dock="end"><${me} name="Videos"><${kt} ...${{get gallery(){return D}}} /></${me}></rat-area>
  `}t(Lt,"$$AppRatHtml");export{Mt as default};
