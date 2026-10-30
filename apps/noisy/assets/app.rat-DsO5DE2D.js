var ge=Object.defineProperty;var a=(e,t)=>ge(e,"name",{value:t,configurable:!0});import{P as me,Q as g,T as E,V as Q,W as $e,X as b,Y as he,Z as J,a0 as ye,f as A,w as m,h as u,a1 as I,a2 as ee,a3 as H,a4 as be,a5 as ke}from"./index-CG4R-YZC.js";import{p as we,a as Ae}from"./keys-CWTtq0D5.js";import{parseBuffer as xe,parseBlob as Re}from"https://esm.sh/music-metadata@11.16.1";import Pe from"./index-DIlYw3RB.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function Oe(e,t){const n={};for(const l of Object.keys(t)){const o=e?.[l],i=t[l];n[l]=me(o)?o:g(()=>e[l]===void 0&&i?i():e[l])}return new Proxy(e??{},{get:a((l,o)=>Object.hasOwn(n,o)?n[o]:l[o],"get")})}a(Oe,"signalsOf");function h(e,{keys:t=null,prevent:n=!1,times:l=0}={}){const o=t?we(t):null;let i=l;return function(c){if(!(l&&!i)&&!(o&&!Ae(c,o))){n&&c.preventDefault(),l&&i--;try{const s=(typeof e=="string"?E(e):e).call(this,c);typeof s?.catch=="function"&&s.catch(r=>Q(this,r,"handler"))}catch(s){Q(this,s,"handler")}}}}a(h,"listener");const q=a(e=>(t,n)=>$e.notify(t,{...n,type:e}),"notify"),F=Object.assign(q("info"),{error:q("error"),info:q("info"),success:q("success")}),V=1<<20,Te=3,P=a(()=>RAT.app.database,"db"),w=a(()=>RAT.app.folders,"folders"),Ee=a((e,t)=>`${e}/${t}`,"keyOf"),R={artist:"Unknown artist",genre:"Unknown genre",release:"Unknown release"},$=b([]),te=b(0),He=a(e=>$.value.find(t=>t.key===e)??null,"trackByKey");async function Se(){$.value=await P().tracks.values(),await w().load()}a(Se,"load");const D=new Map;he(()=>{for(const[e,t]of Object.entries(w().trees.value))D.get(e)!==t&&(D.set(e,t),Me(e,t))});const ne=a(e=>e?e.kind==="file"?[e]:(e.children??[]).flatMap(ne):[],"filesOf"),Le=a(e=>e.replace(/\.[^.]+$/,"").replace(/[_]+/g," ").replace(/\s+/g," ").trim(),"titleOf");async function Me(e,t){const n=new Map($.value.filter(c=>c.sourceId===e).map(c=>[c.key,c])),l=await Promise.all(ne(t).map(async c=>{const s=Ee(e,c.path),r=await c.entry.info(),f=`${r?.size}:${r?.modified}`,d=n.get(s);return d?.sig===f?d:{artist:R.artist,cover:null,covered:!1,disc:null,duration:null,genres:[R.genre],key:s,name:c.name,no:null,path:c.path,release:R.release,sig:f,sourceId:e,tagged:!1,title:Le(c.name),year:null}})),o=[...n.keys()].filter(c=>!l.some(s=>s.key===c)),i=l.filter(c=>n.get(c.key)!==c);await Promise.all([...o.map(c=>P().tracks.delete(c)),...i.map(c=>P().tracks.set(c.key,c))]),$.value=[...$.value.filter(c=>c.sourceId!==e),...l],je(l)}a(Me,"sync");const C=new Map;let X=null;function ae(e){C.set(e.key,e),X??=requestAnimationFrame(()=>{X=null;const t=new Map(C);C.clear(),$.value=$.value.map(n=>t.get(n.key)?.sig===n.sig?t.get(n.key):n)})}a(ae,"settle");const T=[],B=[];let z=0;function je(e){T.push(...e.filter(t=>!t.tagged)),B.push(...e.filter(t=>t.tagged&&t.covered===!1)),le()}a(je,"enqueue");function le(){for(te.value=T.length+z;z<Te&&(T.length||B.length);){const[e,t]=T.length?[qe,T.shift()]:[ze,B.shift()];z++,e(t).finally(()=>{z--,le()})}}a(le,"pump");const se=a(e=>{const t=C.get(e.key)??He(e.key);return!t||t.sig!==e.sig?null:t},"stale");async function re(e,t){const n=w().nodeAt(e.sourceId,e.path)?.entry;if(!n)throw new Error(`${e.name} is no longer in its folder`);const l=await n.info(),o={duration:!1,skipCovers:t,skipPostHeaders:!0};if(l?.size>V)try{return await xe(new Uint8Array(await(await n.slice(0,V)).arrayBuffer()),{mimeType:l.type,size:l.size},o)}catch{}return Re(await n.read("blob"),{...o,skipPostHeaders:!1})}a(re,"parse");async function qe(e){const t=se(e);if(!t||t.tagged)return;let n={...t,tagged:!0};try{const{common:l,format:o}=await re(t,!0);n={...n,artist:l.albumartist||l.artist||R.artist,disc:l.disk?.no??null,duration:o.duration??null,genres:l.genre?.length?l.genre:[R.genre],no:l.track?.no??null,release:l.album||R.release,title:l.title||t.title,year:l.year??null}}catch{n.covered=!0}await P().tracks.set(n.key,n),ae(n),n.covered||B.push(n)}a(qe,"tag");async function ze(e){const t=se(e);if(!t||t.covered)return;let n=null;try{const o=(await re(t,!1)).common.picture?.[0];o&&(n=`${t.key}:${t.sig}`,await RAT.app.thumbnails.requestFile(n,()=>new Blob([o.data],{type:o.format})))}catch{}const l={...t,cover:n,covered:!0};await P().tracks.set(l.key,l),ae(l)}a(ze,"cover");const Ue=a(e=>w().nodeAt(e.sourceId,e.path)?.entry.read("blob")??Promise.reject(new Error(`${e.name} is no longer in its folder`)),"fileOf");function Ce(e){return w().perms.value[e.sourceId]!=="granted"?Promise.reject(new Error("Reconnect the folder of this track in the settings first.")):Ue(e)}a(Ce,"openFile");async function Ie(){if(!("showDirectoryPicker"in globalThis))throw new Error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");return w().add()}a(Ie,"addFolder");const Fe=a(()=>Promise.all(w().sources.value.map(e=>w().scan(e.id))),"rescanAll");async function Be(e){const t=$.value.filter(n=>n.sourceId===e).map(n=>n.key);await w().remove(e),await Promise.all(t.map(n=>P().tracks.delete(n))),$.value=$.value.filter(n=>n.sourceId!==e),D.delete(e)}a(Be,"removeFolder");const k=["genres","artists","releases","tracks"],y=Object.fromEntries(k.map(e=>[e,new ye])),U={},L=a(e=>`${e.artist}\0${e.release}`,"releaseKey"),Ne=a((e,t)=>e.label.localeCompare(t.label,void 0,{numeric:!0,sensitivity:"base"}),"byLabel");function K(e,t,n=l=>l){const l=new Map;for(const o of e)for(const i of t(o))l.set(i,(l.get(i)??0)+1);return[...l].map(([o,i])=>({count:i,key:o,label:n(o)})).sort(Ne)}a(K,"groups");const oe=g(()=>y.genres.size?$.value.filter(e=>e.genres.some(t=>y.genres.has(t))):$.value),Y=g(()=>oe.value.filter(e=>y.artists.has(e.artist))),ie=g(()=>Y.value.filter(e=>y.releases.has(L(e)))),ce={genres:g(()=>K($.value,e=>e.genres)),artists:g(()=>K(oe.value,e=>[e.artist])),releases:g(()=>y.artists.size?K(Y.value,e=>[L(e)],e=>e.split("\0")[1]).map(e=>({...e,sub:We(e.key)})):[]),tracks:g(()=>y.releases.size?ie.value.toSorted(ue).map(e=>({cover:e.cover,key:e.key,label:e.title,sub:Ye(e)})):[])},Ke=g(()=>y.releases.size?ie.value.toSorted(ue):[]);function We(e){const t=Y.value.find(n=>L(n)===e);return[t?.artist,t?.year].filter(Boolean).join(" · ")}a(We,"releaseInfo");const De=a(e=>e==null?"":`${Math.floor(e/60)}:${String(Math.round(e%60)).padStart(2,"0")}`,"duration"),Ye=a(e=>[e.no&&String(e.no).padStart(2,"0"),De(e.duration)].filter(Boolean).join(" · "),"trackInfo"),ue=a((e,t)=>L(e).localeCompare(L(t))||(e.disc??0)-(t.disc??0)||(e.no??0)-(t.no??0)||e.title.localeCompare(t.title),"trackOrder"),Ge=a((e,t,n="one")=>J(()=>Qe(e,t,n)),"pick");function Qe(e,t,n){const l=y[e],o=ce[e].value.map(i=>i.key);if(n==="range"&&U[e]!=null){const[i,c]=[o.indexOf(U[e]),o.indexOf(t)].sort((s,r)=>s-r);l.clear();for(const s of o.slice(i,c+1))l.add(s)}else if(n==="toggle")l.has(t)?l.delete(t):l.add(t),U[e]=t;else{const i=l.size===1&&l.has(t);l.clear(),i||l.add(t),U[e]=t}for(const i of k.slice(k.indexOf(e)+1))y[i].clear()}a(Qe,"pickIn");const Ve=a(e=>e?.shiftKey?"range":e?.ctrlKey||e?.metaKey?"toggle":"one","modeOf"),Xe=a(()=>J(()=>{for(const e of k)y[e].clear()}),"clearSelection"),v=new Audio;v.preload="metadata";let W=null;const p={duration:b(0),error:b(null),index:b(-1),playing:b(!1),queue:b([]),time:b(0),get track(){return p.queue.value[p.index.value]??null},play(e,t=0){return p.queue.value=e,p.at(t)},async at(e){const t=p.queue.value[e];if(t){p.index.value=e,p.error.value=null;try{const n=await Ce(t);if(p.index.value!==e)return;W&&URL.revokeObjectURL(W),v.src=W=URL.createObjectURL(n),await v.play(),Ze(t)}catch(n){p.error.value=n}}},toggle(){p.track&&(v.paused?v.play():v.pause())},next(){p.index.value<p.queue.value.length-1&&p.at(p.index.value+1)},previous(){v.currentTime>3?v.currentTime=0:p.at(Math.max(0,p.index.value-1))},seek(e){v.currentTime=e}};v.addEventListener("durationchange",()=>{p.duration.value=v.duration||0});v.addEventListener("ended",()=>p.next());v.addEventListener("pause",()=>{p.playing.value=!1});v.addEventListener("play",()=>{p.playing.value=!0});v.addEventListener("timeupdate",()=>{p.time.value=v.currentTime||0});const O=navigator.mediaSession;function Ze(e){O&&(O.metadata=new MediaMetadata({album:e.release,artist:e.artist,title:e.title}))}a(Ze,"session");O?.setActionHandler("nexttrack",()=>p.next());O?.setActionHandler("pause",()=>v.pause());O?.setActionHandler("play",()=>v.play());O?.setActionHandler("previoustrack",()=>p.previous());function _e(e,t){return Je.call({props:e},e,t)}a(_e,"FoldersRatHtml");function Je(e,t){const n=RAT.app.folders,l=g(()=>n.sources.value),o=g(()=>n.perms.value),i=g(()=>te.value);async function c(){try{const s=await Ie();s&&F.success(`Added ${s.name}`)}catch(s){F.error(s)}}return a(c,"add"),u`
    <section.folders>
      <h3>folders</h3>
      ${A(()=>l.value,s=>s,s=>u`
          <div.folder>
            <span>${()=>s.name}</span>
            ${m(()=>o.value[s.id]!=="granted",()=>u`<btn-push label="Reconnect" onclick=${h(()=>n.reconnect(s.id))} />`)}
            <btn-icon icon="delete" label="Remove" onclick=${h(()=>Be(s.id))} />
          </div>
        `)}
      <div.folder-actions>
        <btn-push icon="folder-add" label="Add a folder" onclick=${h(c)} />
        ${m(()=>l.value.length,()=>u`<btn-push icon="refresh" label="Rescan" onclick=${h(Fe)} />`)}
      </div>
      ${m(()=>i.value,()=>u`<p.hint>${()=>i.value} files left to read</p>`)}
    </section>
  `}a(Je,"$$FoldersRatHtml");function et(e,t){return tt.call({props:e},e,t)}a(et,"MenuRatHtml");function tt(e,t){return u`
    <nav.menu>
      <span.menu-brand>noisy</span>
      <btn-icon icon="settings" label="Settings" onclick=${E("rat:toggle[config]")} />
    </nav>
  `}a(tt,"$$MenuRatHtml");function de(e,t){return nt.call({props:e},e,t)}a(de,"CoverRatHtml");function nt(e,t){let n=I(null);return e.id&&RAT.app.thumbnails.requestFile(e.id,()=>null).then(l=>{n.value=l}).catch(()=>{}),u`<span.cover style:background-image=${()=>n.value?`url("${n.value}")`:null}>${m(()=>!n.value,()=>u`<svg-icon icon="audio" />`)}</span>`}a(nt,"$$CoverRatHtml");function at(e,t){return lt.call({props:e},e,t)}a(at,"PanelRatHtml");function lt(e,t){const n=e.name,l=y[n],o=g(()=>ce[n].value),i=g(()=>l.size);function c(r,f){Ge(n,r,f),e.onpick?.(r,f)}a(c,"choose");const s=a(r=>r?.closest?.("[data-key]")?.dataset.key,"keyAt");return u`
    <section.panel data-panel=${()=>n}>
      <header.panel-head>
        <h2>${()=>e.title}</h2>
        <span.panel-count>${()=>i.value?`${i.value} / ${o.value.length}`:o.value.length}</span>
        ${m(()=>i.value,()=>u`<btn-icon icon="close" label="Clear" onclick=${h(()=>l.clear())} />`)}
      </header>
      ${m(()=>o.value.length,()=>u`
          <data-index.panel-list viewmode="list" item-size="2.75rem" gap="0" ref=${ee(Pe,()=>({onLongPress:a(r=>{const f=s(r.target);f&&c(f,"toggle")},"onLongPress")}))}>
            ${A(()=>o.value,r=>r,r=>u`
                <data-item.row data-key=${()=>r.key} class:picked=${()=>l.has(r.key)} onclick=${h(f=>c(r.key,Ve(f)))}>
                  ${m(()=>r.cover!==void 0,()=>u`<${de} ...${{get id(){return r.cover}}} />`)}
                  <span.row-label>${()=>r.label}</span>
                  <span.row-sub>${()=>r.sub??r.count}</span>
                </data-item>
              `)}
          </data-index>
        `,()=>u`<p.panel-empty>${()=>e.empty}</p>`)}
    </section>
  `}a(lt,"$$PanelRatHtml");function st(e,t){return rt.call({props:e},e,t)}a(st,"PlayerRatHtml");function rt(e,t){let{duration:n,error:l,index:o,playing:i,queue:c,time:s}=Oe(p,{duration:null,error:null,index:null,playing:null,queue:null,time:null});const r=g(()=>c.value[o.value]??null),f=a(d=>`${Math.floor(d/60)}:${String(Math.floor(d%60)).padStart(2,"0")}`,"clock");return u`
    <aside.player class:idle=${()=>!r.value}>
      ${m(()=>r.value,()=>u`
          <${de} ...${{get id(){return r.value.cover}}} />
          <div.player-now>
            <span.player-title>${()=>r.value.title}</span>
            <span.player-artist>${()=>r.value.artist}</span>
          </div>
        `,()=>u`<span.player-title>Player</span>`)}
      <div.player-controls>
        <btn-icon icon="skip-previous" label="Previous" onclick=${E("previous")} />
        <btn-icon icon=${()=>i.value?"pause":"play"} label=${()=>i.value?"Pause":"Play"} onclick=${E("toggle-play")} />
        <btn-icon icon="skip-next" label="Next" onclick=${E("next")} />
      </div>
      ${m(()=>r.value,()=>u`<input.player-seek type="range" min="0" max=${()=>n.value||0} step="1" value=${()=>s.value} oninput=${h(d=>p.seek(Number(d.target.value)))} aria-label="Position" />`)}
      ${m(()=>r.value,()=>u`<span.player-time>${()=>f(s.value)} / ${()=>f(n.value)}</span>`)}
      ${m(()=>l.value,()=>u`<span.player-error>${()=>l.value.message}</span>`)}
    </aside>
  `}a(rt,"$$PlayerRatHtml");const M=be("appearance",{}),Z={density:H.densities,geometry:H.geometries,mode:H.modes},ot=a(()=>M.value,"appearance"),it=a(()=>H.palettes().catch(()=>[]),"palettes");function pe(e){const t=document.querySelector("rat-app");for(const[n,l]of Object.entries(e))l?t?.setAttribute(n,l):t?.removeAttribute(n);return H.set(e)}a(pe,"apply");function ct(e,t){return M.value={...M.value,[e]:t||null},pe({[e]:t||null})}a(ct,"setAppearance");Object.keys(M.value).length&&pe(M.value);let S=null;const N=b(!1),fe=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,ut=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!fe;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),S=e,N.value=!0});addEventListener("appinstalled",()=>{S=null,N.value=!1});async function dt(){if(!S)return!1;const e=S;return S=null,N.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a(dt,"install");const pt=`@scope (:has(> [data-rat="1y2oflm"])) to (:scope > :not([data-rat="1y2oflm"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function _(e,t){return ft.call({props:e},e,t)}a(_,"SettingsRatHtml");function ft(e,t){ke("1y2oflm",pt);let n=I({...ot()}),l=I([]);const o=g(()=>N.value);it().then(s=>{l.value=s});function i(s,r){const f=r.detail?.value??r.target.value;n.value={...n.value,[s]:f},ct(s,f)}a(i,"change");async function c(){await dt()&&F.success(`${e.name??"the app"} is installed`)}return a(c,"installApp"),u`
    <div.settings data-rat="1y2oflm">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${h(s=>i("palette",s))}>
            ${A(()=>l.value,s=>s,s=>u`<input-option value=${()=>s}>${()=>s}</input-option>`)}
          </input-value>
        </label>
        ${A(()=>Object.keys(Z),s=>s,s=>u`
            <label>
              <span>${()=>s}</span>
              <input-value look="segments" value=${()=>n.value[s]??""} onchange=${h(r=>i(s,r))}>
                ${A(()=>Z[s],r=>r,r=>u`<input-option value=${()=>r}>${()=>r}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${m(()=>!fe,()=>u`
          <section>
            <h3>install</h3>
            ${m(()=>o.value,()=>u`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${h(c)} />`,()=>u`
                ${m(()=>ut,()=>u`<p.hint>Share, then "Add to Home Screen".</p>`,()=>u`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a(ft,"$$SettingsRatHtml");function At(e,t){return vt.call({props:e},e,t)}a(At,"AppRatHtml");function vt(e,t){const n={artists:"Artists",genres:"Genres",releases:"Releases",tracks:"Tracks"},l={artists:"No artists yet",genres:"Add a folder in the settings",releases:"Pick an artist",tracks:"Pick a release"};RAT.app.hold(Se().catch(F.error)),RAT.app.commands.assign({"clear-selection":Xe,next:a(()=>p.next(),"next"),previous:a(()=>p.previous(),"previous"),"toggle-play":a(()=>p.toggle(),"toggle-play")});let o=I(0),i=null;const c=a(()=>i&&i.scrollWidth>i.clientWidth,"narrow"),s=a(d=>i?.children[d]?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"}),"show");function r(d){i=d;const x=a(()=>{o.value=Math.round(d.scrollLeft/Math.max(1,d.clientWidth))},"onScroll");return d.addEventListener("scroll",x,{passive:!0}),()=>d.removeEventListener("scroll",x)}a(r,"panels");function f(d,x,j){if(d==="tracks"&&j==="one"){const G=Ke.value;p.play(G,G.findIndex(ve=>ve.key===x));return}j==="one"&&c()&&s(k.indexOf(d)+1)}return a(f,"picked"),u`
    <rat-area name="main">
      <div.noisy>
        <${et} />
        <nav.tabs>
          ${A(()=>k,d=>d,d=>u`<button class:active=${()=>o.value===k.indexOf(d)} onclick=${h(()=>s(k.indexOf(d)))}>${()=>n[d]}</button>`)}
        </nav>
        <div.panels ref=${ee(r)}>
          ${A(()=>k,d=>d,d=>u`<${at} ...${{get name(){return d},get title(){return n[d]},get empty(){return l[d]},onpick:a((x,j)=>f(d,x,j),"onpick")}} />`)}
        </div>
        <${st} />
      </div>
    </rat-area>
    <rat-area name="config" dock="end"><${_} name="noisy"><${_e} /></${_}></rat-area>
  `}a(vt,"$$AppRatHtml");export{At as default};
