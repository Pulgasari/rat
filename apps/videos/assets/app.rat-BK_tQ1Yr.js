var He=Object.defineProperty;var n=(e,t)=>He(e,"name",{value:t,configurable:!0});import{P as se,Q as Ee,T as ue,V as me,W as Le,X as y,Y as k,Z as je,a0 as ee,w as m,h as l,f as H,a1 as he,a2 as ge,a3 as Oe,a4 as M,a5 as ze}from"./index-iANVUzsC.js";import{p as Ce,a as Pe}from"./keys-CWTtq0D5.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function b(e){let t=!1,a;const i=n(()=>(t||(a=e(),t=!0),a),"source");return{get value(){const r=i();return se(r)?r.value:r},set value(r){const f=i();if(!se(f))throw new TypeError("[rat] an imported reactive variant changes through its methods, it is not reassigned");f.value=r}}}n(b,"imported");function v(e,{keys:t=null,prevent:a=!1,times:i=0}={}){const r=t?Ce(t):null;let f=i;return function(c){if(!(i&&!f)&&!(r&&!Pe(c,r))){a&&c.preventDefault(),i&&f--;try{const o=(typeof e=="string"?Ee(e):e).call(this,c);typeof o?.catch=="function"&&o.catch(d=>ue(this,d,"handler"))}catch(o){ue(this,o,"handler")}}}}n(v,"listener");const Se=n((e,t)=>`${e}/${t}`,"keyOf"),be=n(e=>e?e.kind==="file"?[e]:(e.children??[]).flatMap(be):[],"filesOf");function Me({table:e}){const t=n(()=>RAT.app.database[e],"db"),a=n(()=>RAT.app.folders,"folders"),i=me([]),r=new Map;async function f(p,w){const $=new Map(i.value.filter(u=>u.sourceId===p).map(u=>[u.key,u])),x=await Promise.all(be(w).map(async u=>{const A=Se(p,u.path),B=await u.entry.info(),O=`${B?.size}:${B?.modified}`,I=$.get(A);return I?.sig===O?I:{added:I?.added??Date.now(),key:A,name:u.name,path:u.path,sig:O,sourceId:p}})),S=[...$.keys()].filter(u=>!x.some(A=>A.key===u)),s=x.filter(u=>$.get(u.key)!==u);await Promise.all([...S.map(u=>t().delete(u)),...s.map(u=>t().set(u.key,u))]),i.value=[...i.value.filter(u=>u.sourceId!==p),...x]}n(f,"sync"),Le(()=>{for(const[p,w]of Object.entries(a().trees.value))r.get(p)!==w&&(r.set(p,w),f(p,w))});async function c(){i.value=await t().values(),await a().load()}n(c,"load");function o(p){return a().perms.value[p.sourceId]!=="granted"?Promise.reject(new Error("Reconnect the folder of this file first.")):a().nodeAt(p.sourceId,p.path)?.entry.read("blob")??Promise.reject(new Error(`${p.name} is no longer in its folder`))}n(o,"open");async function d(){if(!("showDirectoryPicker"in globalThis)&&!globalThis.Capacitor?.isNativePlatform?.())throw new Error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");return a().add()}n(d,"add");const g=n(()=>Promise.all(a().sources.value.map(p=>a().scan(p.id))),"rescan");async function T(p){const w=i.value.filter($=>$.sourceId===p).map($=>$.key);await a().remove(p),await Promise.all(w.map($=>t().delete($))),i.value=i.value.filter($=>$.sourceId!==p),r.delete(p)}return n(T,"remove"),{add:d,items:i,load:c,open:o,remove:T,rescan:g}}n(Me,"createGallery");const D=Me({table:"clips"}),G=320,de=1,Fe=15e3,re=[];let te=0;function Ie(e){return new Promise((t,a)=>{re.push({job:e,reject:a,resolve:t}),ye()})}n(Ie,"limit");function ye(){for(;te<2&&re.length;){const{job:e,reject:t,resolve:a}=re.shift();te++,e().then(a,t).finally(()=>{te--,ye()})}}n(ye,"pump");function qe(e){return new Promise((t,a)=>{const i=URL.createObjectURL(e),r=Object.assign(document.createElement("video"),{muted:!0,playsInline:!0,preload:"auto"});let f=!1;const c=n((d,g)=>{if(!f){f=!0,clearTimeout(o),r.removeAttribute("src");try{r.load()}catch{}URL.revokeObjectURL(i),d?a(d):t(g)}},"end"),o=setTimeout(()=>c(new Error("timeout")),Fe);r.addEventListener("loadedmetadata",()=>{const d=r.duration;r.currentTime=Number.isFinite(d)&&d>0?Math.min(de,Math.max(.1,d*.1)):de},{once:!0}),r.addEventListener("seeked",()=>{const d=Math.min(1,G/(r.videoWidth||G)),g=Object.assign(document.createElement("canvas"),{height:Math.max(1,Math.round((r.videoHeight||G)*d)),width:Math.max(1,Math.round((r.videoWidth||G)*d))});g.getContext("2d").drawImage(r,0,0,g.width,g.height),g.toBlob(T=>T?c(null,T):c(new Error("encode")),"image/webp",.72)},{once:!0}),r.addEventListener("error",()=>c(r.error??new Error("decode")),{once:!0}),r.src=i})}n(qe,"frameOf");function Ve(e){return RAT.app.thumbnails.requestFile(`${e.key}:${e.sig}`,()=>Ie(async()=>qe(await D.open(e)))).catch(()=>null)}n(Ve,"posterOf");let R=y(null),we=y(""),ne=y(0),C=y(0),j=y(!1),L=y(!1),P=y(!1),Y=y("contain"),K=y(null),Z=y(!1),U=y(0),oe=y(!1);const De=k(()=>[U.value&&`rotate(${U.value}deg)`,Z.value&&"scaleX(-1)"].filter(Boolean).join(" ")||"none"),ae=[null,"9 / 16","16 / 9","1 / 1","4 / 3"],Ue=30;let h=null;const Ne=n(e=>Math.min(ne.value||0,Math.max(0,e)),"clamp");function pe(e){return isFinite(e)?`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,"0")}`:"0:00"}n(pe,"format");let z=0,X=0;function ke(e){if(!h||!j.value||!P.value){z=0;return}const t=X?(e-X)/1e3:0;X=e;let a=h.currentTime-t;if(a<=0){if(!L.value){h.currentTime=0,C.value=0,W();return}a=h.duration}h.currentTime=a,C.value=a,z=requestAnimationFrame(ke)}n(ke,"back");function Re(){h&&(cancelAnimationFrame(z),z=0,P.value?(h.pause(),X=0,z=requestAnimationFrame(ke)):h.play().catch(e=>console.warn("[videos] play() rejected",e)))}n(Re,"drive");function We(){R.value&&(j.value=!0,Re())}n(We,"play");function W(){j.value=!1,cancelAnimationFrame(z),z=0,h?.pause()}n(W,"pause");const Te=n(()=>j.value?W():We(),"toggle");function le(e){h&&(h.currentTime=Ne(e),C.value=h.currentTime)}n(le,"seek");const J=n(e=>le((h?.currentTime??0)+e),"skip");function fe(e){W(),le((h?.currentTime??0)+e/Ue)}n(fe,"step");function Be(){P.value=!P.value,j.value&&Re()}n(Be,"toggleReverse");function Ge(){L.value=!L.value,h&&(h.loop=L.value)}n(Ge,"toggleLoop");const Qe=n(()=>{K.value=ae[(ae.indexOf(K.value)+1)%ae.length]},"cycleAspect"),Xe=n(()=>{Y.value=Y.value==="cover"?"contain":"cover"},"toggleCrop"),Ye=n(()=>{Z.value=!Z.value},"toggleFlip"),Ke=n(()=>{U.value=(U.value+90)%360},"rotate"),Ze=n(()=>{oe.value=!oe.value},"toggleChrome");function ie(e){e&&(W(),R.value&&URL.revokeObjectURL(R.value),R.value=URL.createObjectURL(e),we.value=e.name,ne.value=0,C.value=0,P.value=!1,h&&(h.src=R.value,h.load()))}n(ie,"load");function Je(e){h=e;const t={ended:n(()=>{L.value||(j.value=!1)},"ended"),error:n(()=>{console.warn("[videos] media error",e.error),j.value=!1},"error"),loadedmetadata:n(()=>{ne.value=e.duration||0},"loadedmetadata"),timeupdate:n(()=>{P.value||(C.value=e.currentTime)},"timeupdate")};for(const[a,i]of Object.entries(t))e.addEventListener(a,i);if(e.loop=L.value,R.value&&e.src!==R.value){const a=C.value;e.src=R.value,e.load(),a&&e.addEventListener("loadedmetadata",()=>{e.currentTime=a},{once:!0})}return()=>{for(const[a,i]of Object.entries(t))e.removeEventListener(a,i);W(),h===e&&(h=null)}}n(Je,"attach");const Q=n(e=>(t,a)=>je.notify(t,{...a,type:e}),"notify"),E=Object.assign(Q("info"),{error:Q("error"),info:Q("info"),success:Q("success")}),_e=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
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
}`;function q(e,t){return en.call({props:e},e,t)}n(q,"EmptyRatHtml");function en(e,t){return ee("ihnpco",_e),l`
    <div.empty data-rat="ihnpco">
      ${m(()=>e.icon,()=>l`<svg-icon icon=${()=>e.icon} />`)}
      ${m(()=>e.title,()=>l`<p.title>${()=>e.title}</p>`)}
      ${m(()=>e.hint,()=>l`<p.hint>${()=>e.hint}</p>`)}
      ${t}
    </div>
  `}n(en,"$$EmptyRatHtml");let V=null;const F=me(!1),ce=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Ae=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!ce;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),V=e,F.value=!0});addEventListener("appinstalled",()=>{V=null,F.value=!1});async function xe(){if(!V)return!1;const e=V;return V=null,F.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}n(xe,"install");function nn(e){const t=n(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),E(`${e} can be installed: see the settings`))},"show");F.value?t():addEventListener("beforeinstallprompt",t,{once:!0})}n(nn,"hint");function tn(e,t){return an.call({props:e},e,t)}n(tn,"InstallTipRatHtml");function an(e,t){return l`
    ${m(()=>!ce,()=>l`
        <div.install-tip>
          <svg-icon icon="info" />
          <span.text>${()=>e.message??"Install the app so your folders stay connected between visits — no reconnecting."}</span>
          ${m(()=>F.value,()=>l`<btn-push icon="download" label="Install app" onclick=${v(xe)} />`,()=>m(()=>Ae,()=>l`<span.hint>Share, then <b>Add to Home Screen</b>.</span>`,()=>l`<span.hint>Use your browser’s <b>Install</b> / <b>Add to Home screen</b> menu.</span>`))}
        </div>
      `)}
  `}n(an,"$$InstallTipRatHtml");const rn=`@scope (:has(> [data-rat="1yudiy"])) to (:scope > :not([data-rat="1yudiy"])) {
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
}`;function on(e,t){return ln.call({props:e},e,t)}n(on,"GalleryRatHtml");function ln(e,t){ee("1yudiy",rn);const a=RAT.app.folders,i=e.gallery;let r=y(""),f=y("");const c=k(()=>a.sources.value),o=k(()=>a.perms.value),d=k(()=>Object.values(a.scanning.value).some(Boolean)),g=k(()=>c.value.filter(s=>o.value[s.id]&&o.value[s.id]!=="granted")),T=n((s,u)=>s.name.localeCompare(u.name,void 0,{numeric:!0,sensitivity:"base"}),"byName"),p=k(()=>(()=>{const s=r.value.trim().toLowerCase();return i.items.value.filter(u=>(!f.value||u.sourceId===f.value)&&(!s||u.name.toLowerCase().includes(s)||u.path.toLowerCase().includes(s))).sort(T)})());async function w(){try{await i.add()}catch(s){E.error(s)}}n(w,"add");async function $(s){(await a.reconnect(s.id))?.granted||E.error("Reconnect failed, try “Choose folder”.")}n($,"reconnect");async function x(s){await a.repick(s.id)||E.error(`Could not open ${s.name}`)}n(x,"repick");function S(s,u){const A=new IntersectionObserver(B=>{B.some(O=>O.isIntersecting)&&(A.disconnect(),Promise.resolve(e.thumb(u)).then(O=>{if(!O)return;const I=Object.assign(document.createElement("img"),{alt:u.name,loading:"lazy",src:O});s.querySelector(".placeholder")?.replaceWith(I)}).catch(()=>{}))},{rootMargin:"300px"});return A.observe(s),()=>A.disconnect()}return n(S,"lazy"),l`
    <div.gallery data-rat="1yudiy">
      <header.gallery-head>
        ${m(()=>d.value,()=>l`<span.scan-note><svg-icon icon="loading" /> scanning …</span>`)}
        <label.gallery-search>
          <svg-icon icon="search" />
          <input type="search" placeholder=${()=>`Search ${e.noun} …`} value=${()=>r.value} oninput=${v(s=>r.value=s.currentTarget.value)} />
          ${m(()=>r.value,()=>l`<btn-icon icon="close" label="clear" onclick=${v(()=>r.value="")} />`)}
        </label>
        ${m(()=>c.value.length,()=>l`<btn-icon icon="refresh" label="Rescan folders" onclick=${v(()=>i.rescan())} />`)}
        <btn-push icon="folder-add" label="Add folder" onclick=${v(w)} />
      </header>
      ${m(()=>g.value.length,()=>l`
          <div.reconnect>
            <svg-icon icon="folder-alert" />
            <span>${()=>g.value.length} folder${()=>g.value.length===1?"":"s"} need reconnecting to read on this device.</span>
            ${H(()=>g.value,s=>s,s=>l`
                <div.reconnect-item>
                  <span.reconnect-name>${()=>s.name}</span>
                  <btn-push icon="folder-key" label="Reconnect" onclick=${v(()=>$(s))} />
                  <btn-push icon="folder-search" label="Choose folder" onclick=${v(()=>x(s))} />
                </div>
              `)}
          </div>
        `)}
      ${m(()=>c.value.length,()=>l`<${tn} />`)}
      ${m(()=>c.value.length>1,()=>l`
          <div.folder-chips>
            <button.chip class:active=${()=>f.value===""} onclick=${v(()=>f.value="")}>All</button>
            ${H(()=>c.value,s=>s,s=>l`<button.chip class:active=${()=>f.value===s.id} onclick=${v(()=>f.value=s.id)}>${()=>s.name}</button>`)}
          </div>
        `)}
      ${m(()=>!c.value.length,()=>l`<${q} ...${{get icon(){return e.icon},get title(){return`Browse a folder of ${e.noun}`},get hint(){return"Grant a folder off your device and browse it as a gallery. Nothing is uploaded, only the folder permission is remembered."}}}><btn-push icon="folder-add" label="Add a folder" onclick=${v(w)} /></${q}>`,()=>m(()=>p.value.length,()=>l`
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
  `}n(ln,"$$GalleryRatHtml");function _(e,t){return cn.call({props:e},e,t)}n(_,"ViewHeaderRatHtml");function cn(e,t){const a=n(()=>RAT.app.router.go(RAT.app.resolve(e.back)),"back");return l`
    <header.view-header>
      ${m(()=>typeof e.back=="string",()=>l`<btn-icon.view-back icon="arrow-left" label="back" onclick=${v(a)} />`,()=>m(()=>e.back,()=>l`<btn-icon.view-back icon="arrow-left" label="back" ...${e.back} />`))}
      ${m(()=>e.title,()=>l`<h1>${()=>e.title}</h1>`)}
      <div.view-tools>${t}</div>
    </header>
  `}n(cn,"$$ViewHeaderRatHtml");function sn(e,t){return un.call({props:e},e,t)}n(sn,"LibraryViewRatHtml");function un(e,t){async function a(i){try{ie(await D.open(i)),RAT.app.router.go("/player")}catch(r){E.error(r)}}return n(a,"open"),l`
    <${_} title="videos"><btn-icon icon="settings" label="settings" onclick=${v(()=>RAT.app.toggle("config"))} /></${_}>
    <main><${on} ...${{get gallery(){return D},get thumb(){return Ve},onopen:a}} noun="clips" icon="video" /></main>
  `}n(un,"$$LibraryViewRatHtml");function dn(e,t){return pn.call({props:e},e,t)}n(dn,"ControlsRatHtml");function pn(e,t){const a=b(()=>K),i=b(()=>C),r=b(()=>ne),f=b(()=>Y),c=b(()=>Z),o=b(()=>L),d=b(()=>j),g=b(()=>P),T=b(()=>U),p=b(()=>R),w=k(()=>!p.value);function $(x,S,s,u,A){return l`<button.control class:active=${()=>u} class:big=${()=>A} title=${()=>S} aria-label=${()=>ge(S)} disabled=${()=>w.value} onclick=${v(s)}><svg-icon icon=${()=>x} /></button>`}return n($,"control"),l`
    <div.controls>
      <div.row>
        ${()=>$("rewind-10","Back 10s",()=>J(-10),!1,!1)}
        ${()=>$("frame-back","Frame back",()=>fe(-1),!1,!1)}
        ${()=>$(d.value?"pause":"play",d.value?"Pause":"Play",Te,!1,!0)}
        ${()=>$("frame-forward","Frame forward",()=>fe(1),!1,!1)}
        ${()=>$("forward-10","Forward 10s",()=>J(10),!1,!1)}
      </div>
      <div.progress>
        <span.time>${()=>pe(i.value)}</span>
        <input.scrub type="range" min="0" max=${()=>r.value||0} step="0.01" value=${()=>i.value} disabled=${()=>w.value} oninput=${v(x=>le(parseFloat(x.currentTarget.value)))} />
        <span.time>${()=>pe(r.value)}</span>
      </div>
      <div.row>
        ${()=>$(o.value?"repeat":"repeat-off","Loop",Ge,o.value,!1)}
        ${()=>$("aspect","Aspect ratio",Qe,a.value!=null,!1)}
        ${()=>$("crop","Crop to fill",Xe,f.value==="cover",!1)}
        ${()=>$("reverse","Reverse",Be,g.value,!1)}
        ${()=>$("mirror","Mirror",Ye,c.value,!1)}
        ${()=>$("rotate","Rotate",Ke,T.value!==0,!1)}
      </div>
    </div>
  `}n(pn,"$$ControlsRatHtml");function fn(e,t){return vn.call({props:e},e,t)}n(fn,"StageRatHtml");function vn(e,t){const a=b(()=>K),i=b(()=>Y),r=b(()=>L),f=b(()=>R),c=b(()=>De);let o=y(null),d=0;function g(){if(!f.value)return;const p=Date.now();p-d<300?(Ze(),d=0):d=p}n(g,"tap");function T(p){ie(p.currentTarget.files?.[0]),p.currentTarget.value=""}return n(T,"picked"),l`
    <div.stage onclick=${v(g)}>
      <div.frame class:framed=${()=>a.value} style=${()=>a.value?`--aspect: ${a.value}`:""}><video.video playsinline loop=${()=>r.value} style=${()=>`--fit: ${i.value}; transform: ${c.value}`} ref=${he(Je)} /></div>
      ${m(()=>!f.value,()=>l`
          <button.open onclick=${v(()=>o.value?.click())}>
            <svg-icon icon="video" />
            <span>Open a video</span>
            <small>It stays on your device.</small>
          </button>
        `)}
      <input type="file" accept="video/*" hidden ref=${Oe(o)} onchange=${v(T)} />
    </div>
  `}n(vn,"$$StageRatHtml");function $n(e,t){return mn.call({props:e},e,t)}n($n,"PlayerViewRatHtml");function mn(e,t){const a=b(()=>oe),i=b(()=>we);return l`
    ${m(()=>!a.value,()=>l`<${_} back="library" ...${{get title(){return i.value||"player"}}} />`)}
    <main.player class:chromeless=${()=>a.value}>
      <${fn} />
      ${m(()=>!a.value,()=>l`<${dn} />`)}
    </main>
  `}n(mn,"$$PlayerViewRatHtml");function hn(e,t){return gn.call({props:e},e,t)}n(hn,"EditViewRatHtml");function gn(e,t){const a=b(()=>R),i=[["cut","Trim / cut"],["rotate","Rotate"],["mirror","Flip / mirror"],["crop","Crop"],["speed","Speed"],["mute","Mute / extract audio"]];return l`
    <${_} back="library" title="edit" />
    <main>
      <${q} icon="edit" title="Quick edits" ...${{get hint(){return a.value?"Editing tools are on the way.":"Open a clip in the player first."}}}>
        <ul.planned>
          ${H(()=>i,r=>r,r=>l`<li><svg-icon icon=${()=>r[0]} /> ${()=>r[1]}</li>`)}
        </ul>
      </${q}>
    </main>
  `}n(gn,"$$EditViewRatHtml");function bn(e,t){return yn.call({props:e},e,t)}n(bn,"DockRatHtml");function yn(e,t){const a=k(()=>RAT.app?.router.$path.value??"/"),i=n((c,o)=>c==="/"?o==="/":o===c||o.startsWith(`${c}/`),"owns"),r=n(c=>c.to!=null&&[c.to,...c.match??[]].some(o=>i(o,a.value)),"isActive"),f=n(c=>c.onclick?c.onclick():RAT.app.router.go(c.to),"run");return l`
    <nav.dock>
      ${H(()=>e.items??[],c=>c,c=>l`<btn-tap class=${()=>r(c)?"col active":"col"} aria-current=${()=>ge(r(c)?"page":null)} icon=${()=>c.icon} label=${()=>c.label} onclick=${v(()=>f(c))} />`)}
    </nav>
  `}n(yn,"$$DockRatHtml");const wn=`@scope (:has(> [data-rat="c7mqim"])) to (:scope > :not([data-rat="c7mqim"])) {
  .folder         { align-items: center; display: flex; gap: 0.5rem; justify-content: space-between; }
  .folder > span  { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .folder-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
}`;function kn(e,t){return Rn.call({props:e},e,t)}n(kn,"FoldersRatHtml");function Rn(e,t){ee("c7mqim",wn);const a=RAT.app.folders,i=e.gallery,r=k(()=>a.sources.value),f=k(()=>a.perms.value);async function c(){try{const o=await i.add();o&&E.success(`Added ${o.name}`)}catch(o){E.error(o)}}return n(c,"add"),l`
    <section.folders data-rat="c7mqim">
      <h3>folders</h3>
      ${H(()=>r.value,o=>o,o=>l`
          <div.folder>
            <span>${()=>o.name}</span>
            ${m(()=>f.value[o.id]!=="granted",()=>l`<btn-push label="Reconnect" onclick=${v(()=>a.reconnect(o.id))} />`)}
            <btn-icon icon="delete" label="Remove" onclick=${v(()=>i.remove(o.id))} />
          </div>
        `,()=>l`<p.hint>No folder yet.</p>`)}
      <div.folder-actions>
        <btn-push icon="folder-add" label="Add a folder" onclick=${v(c)} />
        ${m(()=>r.value.length,()=>l`<btn-push icon="refresh" label="Rescan" onclick=${v(()=>i.rescan())} />`)}
      </div>
    </section>
  `}n(Rn,"$$FoldersRatHtml");const N=ze("appearance",{}),ve={density:M.densities,geometry:M.geometries,mode:M.modes},Tn=n(()=>N.value,"appearance"),An=n(()=>M.palettes().catch(()=>[]),"palettes");function xn(e,t){return N.value={...N.value,[e]:t||null},M.set({[e]:t||null})}n(xn,"setAppearance");Object.keys(N.value).length&&M.set(N.value);const Hn=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function $e(e,t){return En.call({props:e},e,t)}n($e,"SettingsRatHtml");function En(e,t){ee("177zzh1",Hn);let a=y({...Tn()}),i=y([]);const r=k(()=>F.value);An().then(o=>{i.value=o});function f(o,d){const g=d.detail?.value??d.target.value;a.value={...a.value,[o]:g},xn(o,g)}n(f,"change");async function c(){await xe()&&E.success(`${e.name??"the app"} is installed`)}return n(c,"installApp"),l`
    <div.settings data-rat="177zzh1">
      ${t}
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
      ${m(()=>!ce,()=>l`
          <section>
            <h3>install</h3>
            ${m(()=>r.value,()=>l`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${v(c)} />`,()=>l`
                ${m(()=>Ae,()=>l`<p.hint>Share, then "Add to Home Screen".</p>`,()=>l`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}n(En,"$$SettingsRatHtml");function Mn(e,t){return Ln.call({props:e},e,t)}n(Mn,"AppRatHtml");function Ln(e,t){RAT.app.on("error",E.error),RAT.app.hold(D.load()),nn("Videos"),globalThis.launchQueue?.setConsumer(async i=>{i?.files?.length&&(ie(await i.files[0].getFile()),RAT.app.router.go("/player"))}),RAT.app.commands.assign({"back-10":n(()=>J(-10),"back-10"),"forward-10":n(()=>J(10),"forward-10"),"toggle-play":Te});const a=[{icon:"folders",label:"Library",to:"/"},{icon:"play",label:"Player",to:"/player"},{icon:"edit",label:"Edit",to:"/edit"},{icon:"settings",label:"Settings",onclick:n(()=>RAT.app.toggle("config"),"onclick")}];return l`
    <rat-view name="library" route="/" component=${()=>sn} />
    <rat-view name="player" route="/player" component=${()=>$n} />
    <rat-view name="edit" route="/edit" component=${()=>hn} />
    <rat-area name="dock" dock="bottom" overlay="never" open><${bn} ...${{get items(){return a}}} /></rat-area>
    <rat-area name="config" dock="end"><${$e} name="Videos"><${kn} ...${{get gallery(){return D}}} /></${$e}></rat-area>
  `}n(Ln,"$$AppRatHtml");export{Mn as default};
