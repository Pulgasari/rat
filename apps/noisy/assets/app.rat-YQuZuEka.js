var ie=Object.defineProperty;var a=(e,t)=>ie(e,"name",{value:t,configurable:!0});import{P as ce,Q as g,T,V as Y,W as ue,X as b,Y as de,Z as V,a0 as pe,f as x,w as m,h as u,a1 as U,a2 as X,a3 as A,a4 as fe,a5 as ve}from"./index-BPjVGhA9.js";import{p as ge,a as me}from"./keys-CWTtq0D5.js";import{parseBlob as $e}from"https://esm.sh/music-metadata@11.16.1";import he from"./index-DIlYw3RB.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function ye(e,t){const n={};for(const l of Object.keys(t)){const c=e?.[l],o=t[l];n[l]=ce(c)?c:g(()=>e[l]===void 0&&o?o():e[l])}return new Proxy(e??{},{get:a((l,c)=>Object.hasOwn(n,c)?n[c]:l[c],"get")})}a(ye,"signalsOf");function h(e,{keys:t=null,prevent:n=!1,times:l=0}={}){const c=t?ge(t):null;let o=l;return function(i){if(!(l&&!o)&&!(c&&!me(i,c))){n&&i.preventDefault(),l&&o--;try{const s=(typeof e=="string"?T(e):e).call(this,i);typeof s?.catch=="function"&&s.catch(r=>Y(this,r,"handler"))}catch(s){Y(this,s,"handler")}}}}a(h,"listener");const M=a(e=>(t,n)=>ue.notify(t,{...n,type:e}),"notify"),I=Object.assign(M("info"),{error:M("error"),info:M("info"),success:M("success")}),be=3,E=a(()=>RAT.app.database,"db"),w=a(()=>RAT.app.folders,"folders"),ke=a((e,t)=>`${e}/${t}`,"keyOf"),O={artist:"Unknown artist",genre:"Unknown genre",release:"Unknown release"},$=b([]),Z=b(0),we=a(e=>$.value.find(t=>t.key===e)??null,"trackByKey");async function xe(){$.value=await E().tracks.values(),await w().load()}a(xe,"load");const B=new Map;de(()=>{for(const[e,t]of Object.entries(w().trees.value))B.get(e)!==t&&(B.set(e,t),Ae(e,t))});const _=a(e=>e?e.kind==="file"?[e]:(e.children??[]).flatMap(_):[],"filesOf"),Re=a(e=>e.replace(/\.[^.]+$/,"").replace(/[_]+/g," ").replace(/\s+/g," ").trim(),"titleOf");async function Ae(e,t){const n=new Map($.value.filter(i=>i.sourceId===e).map(i=>[i.key,i])),l=await Promise.all(_(t).map(async i=>{const s=ke(e,i.path),r=await i.entry.info(),f=`${r?.size}:${r?.modified}`,d=n.get(s);return d?.sig===f?d:{artist:O.artist,cover:null,disc:null,duration:null,genres:[O.genre],key:s,name:i.name,no:null,path:i.path,release:O.release,sig:f,sourceId:e,tagged:!1,title:Re(i.name),year:null}})),c=[...n.keys()].filter(i=>!l.some(s=>s.key===i)),o=l.filter(i=>n.get(i.key)!==i);await Promise.all([...c.map(i=>E().tracks.delete(i)),...o.map(i=>E().tracks.set(i.key,i))]),$.value=[...$.value.filter(i=>i.sourceId!==e),...l],Oe(l.filter(i=>!i.tagged))}a(Ae,"sync");const C=[];let j=0;function Oe(e){C.push(...e),J()}a(Oe,"enqueue");function J(){for(Z.value=C.length+j;j<be&&C.length;){const e=C.shift();j++,Pe(e).finally(()=>{j--,J()})}}a(J,"pump");async function Pe(e){const t=we(e.key);if(!t||t.tagged||t.sig!==e.sig)return;let n={...t,tagged:!0};try{const{common:l,format:c}=await $e(await ee(t)),o=l.picture?.[0];n={...n,artist:l.albumartist||l.artist||O.artist,cover:o?await Te(t,o):null,disc:l.disk?.no??null,duration:c.duration??null,genres:l.genre?.length?l.genre:[O.genre],no:l.track?.no??null,release:l.album||O.release,title:l.title||t.title,year:l.year??null}}catch{}await E().tracks.set(n.key,n),$.value=$.value.map(l=>l.key===n.key?n:l)}a(Pe,"tag");async function Te(e,t){const n=`${e.key}:${e.sig}`;return await RAT.app.thumbnails.requestFile(n,()=>new Blob([t.data],{type:t.format})),n}a(Te,"coverOf");const ee=a(e=>w().nodeAt(e.sourceId,e.path)?.entry.read("blob")??Promise.reject(new Error(`${e.name} is no longer in its folder`)),"fileOf");function Se(e){return w().perms.value[e.sourceId]!=="granted"?Promise.reject(new Error("Reconnect the folder of this track in the settings first.")):ee(e)}a(Se,"openFile");async function Ee(){if(!("showDirectoryPicker"in globalThis))throw new Error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");return w().add()}a(Ee,"addFolder");const He=a(()=>Promise.all(w().sources.value.map(e=>w().scan(e.id))),"rescanAll");async function Le(e){const t=$.value.filter(n=>n.sourceId===e).map(n=>n.key);await w().remove(e),await Promise.all(t.map(n=>E().tracks.delete(n))),$.value=$.value.filter(n=>n.sourceId!==e),B.delete(e)}a(Le,"removeFolder");const k=["genres","artists","releases","tracks"],y=Object.fromEntries(k.map(e=>[e,new pe])),q={},H=a(e=>`${e.artist}\0${e.release}`,"releaseKey"),ze=a((e,t)=>e.label.localeCompare(t.label,void 0,{numeric:!0,sensitivity:"base"}),"byLabel");function N(e,t,n=l=>l){const l=new Map;for(const c of e)for(const o of t(c))l.set(o,(l.get(o)??0)+1);return[...l].map(([c,o])=>({count:o,key:c,label:n(c)})).sort(ze)}a(N,"groups");const te=g(()=>y.genres.size?$.value.filter(e=>e.genres.some(t=>y.genres.has(t))):$.value),W=g(()=>te.value.filter(e=>y.artists.has(e.artist))),ae=g(()=>W.value.filter(e=>y.releases.has(H(e)))),ne={genres:g(()=>N($.value,e=>e.genres)),artists:g(()=>N(te.value,e=>[e.artist])),releases:g(()=>y.artists.size?N(W.value,e=>[H(e)],e=>e.split("\0")[1]).map(e=>({...e,sub:je(e.key)})):[]),tracks:g(()=>y.releases.size?ae.value.toSorted(le).map(e=>({cover:e.cover,key:e.key,label:e.title,sub:Ce(e)})):[])},Me=g(()=>y.releases.size?ae.value.toSorted(le):[]);function je(e){const t=W.value.find(n=>H(n)===e);return[t?.artist,t?.year].filter(Boolean).join(" · ")}a(je,"releaseInfo");const qe=a(e=>e==null?"":`${Math.floor(e/60)}:${String(Math.round(e%60)).padStart(2,"0")}`,"duration"),Ce=a(e=>[e.no&&String(e.no).padStart(2,"0"),qe(e.duration)].filter(Boolean).join(" · "),"trackInfo"),le=a((e,t)=>H(e).localeCompare(H(t))||(e.disc??0)-(t.disc??0)||(e.no??0)-(t.no??0)||e.title.localeCompare(t.title),"trackOrder"),Ue=a((e,t,n="one")=>V(()=>Ie(e,t,n)),"pick");function Ie(e,t,n){const l=y[e],c=ne[e].value.map(o=>o.key);if(n==="range"&&q[e]!=null){const[o,i]=[c.indexOf(q[e]),c.indexOf(t)].sort((s,r)=>s-r);l.clear();for(const s of c.slice(o,i+1))l.add(s)}else if(n==="toggle")l.has(t)?l.delete(t):l.add(t),q[e]=t;else{const o=l.size===1&&l.has(t);l.clear(),o||l.add(t),q[e]=t}for(const o of k.slice(k.indexOf(e)+1))y[o].clear()}a(Ie,"pickIn");const Fe=a(e=>e?.shiftKey?"range":e?.ctrlKey||e?.metaKey?"toggle":"one","modeOf"),Ne=a(()=>V(()=>{for(const e of k)y[e].clear()}),"clearSelection"),v=new Audio;v.preload="metadata";let K=null;const p={duration:b(0),error:b(null),index:b(-1),playing:b(!1),queue:b([]),time:b(0),get track(){return p.queue.value[p.index.value]??null},play(e,t=0){return p.queue.value=e,p.at(t)},async at(e){const t=p.queue.value[e];if(t){p.index.value=e,p.error.value=null;try{const n=await Se(t);if(p.index.value!==e)return;K&&URL.revokeObjectURL(K),v.src=K=URL.createObjectURL(n),await v.play(),Ke(t)}catch(n){p.error.value=n}}},toggle(){p.track&&(v.paused?v.play():v.pause())},next(){p.index.value<p.queue.value.length-1&&p.at(p.index.value+1)},previous(){v.currentTime>3?v.currentTime=0:p.at(Math.max(0,p.index.value-1))},seek(e){v.currentTime=e}};v.addEventListener("durationchange",()=>{p.duration.value=v.duration||0});v.addEventListener("ended",()=>p.next());v.addEventListener("pause",()=>{p.playing.value=!1});v.addEventListener("play",()=>{p.playing.value=!0});v.addEventListener("timeupdate",()=>{p.time.value=v.currentTime||0});const P=navigator.mediaSession;function Ke(e){P&&(P.metadata=new MediaMetadata({album:e.release,artist:e.artist,title:e.title}))}a(Ke,"session");P?.setActionHandler("nexttrack",()=>p.next());P?.setActionHandler("pause",()=>v.pause());P?.setActionHandler("play",()=>v.play());P?.setActionHandler("previoustrack",()=>p.previous());function Be(e,t){return We.call({props:e},e,t)}a(Be,"FoldersRatHtml");function We(e,t){const n=RAT.app.folders,l=g(()=>n.sources.value),c=g(()=>n.perms.value),o=g(()=>Z.value);async function i(){try{const s=await Ee();s&&I.success(`Added ${s.name}`)}catch(s){I.error(s)}}return a(i,"add"),u`
    <section.folders>
      <h3>folders</h3>
      ${x(()=>l.value,s=>s,s=>u`
          <div.folder>
            <span>${()=>s.name}</span>
            ${m(()=>c.value[s.id]!=="granted",()=>u`<btn-push label="Reconnect" onclick=${h(()=>n.reconnect(s.id))} />`)}
            <btn-icon icon="delete" label="Remove" onclick=${h(()=>Le(s.id))} />
          </div>
        `)}
      <div.folder-actions>
        <btn-push icon="folder-add" label="Add a folder" onclick=${h(i)} />
        ${m(()=>l.value.length,()=>u`<btn-push icon="refresh" label="Rescan" onclick=${h(He)} />`)}
      </div>
      ${m(()=>o.value,()=>u`<p.hint>${()=>o.value} files left to read</p>`)}
    </section>
  `}a(We,"$$FoldersRatHtml");function De(e,t){return Ye.call({props:e},e,t)}a(De,"MenuRatHtml");function Ye(e,t){return u`
    <nav.menu>
      <span.menu-brand>noisy</span>
      <btn-icon icon="settings" label="Settings" onclick=${T("rat:toggle[config]")} />
    </nav>
  `}a(Ye,"$$MenuRatHtml");function se(e,t){return Ge.call({props:e},e,t)}a(se,"CoverRatHtml");function Ge(e,t){let n=U(null);return e.id&&RAT.app.thumbnails.requestFile(e.id,()=>null).then(l=>{n.value=l}).catch(()=>{}),u`<span.cover style:background-image=${()=>n.value?`url("${n.value}")`:null}>${m(()=>!n.value,()=>u`<svg-icon icon="audio" />`)}</span>`}a(Ge,"$$CoverRatHtml");function Qe(e,t){return Ve.call({props:e},e,t)}a(Qe,"PanelRatHtml");function Ve(e,t){const n=e.name,l=y[n],c=g(()=>ne[n].value),o=g(()=>l.size);function i(r,f){Ue(n,r,f),e.onpick?.(r,f)}a(i,"choose");const s=a(r=>r?.closest?.("[data-key]")?.dataset.key,"keyAt");return u`
    <section.panel data-panel=${()=>n}>
      <header.panel-head>
        <h2>${()=>e.title}</h2>
        <span.panel-count>${()=>o.value?`${o.value} / ${c.value.length}`:c.value.length}</span>
        ${m(()=>o.value,()=>u`<btn-icon icon="close" label="Clear" onclick=${h(()=>l.clear())} />`)}
      </header>
      ${m(()=>c.value.length,()=>u`
          <data-index.panel-list viewmode="list" item-size="2.75rem" gap="0" ref=${X(he,()=>({onLongPress:a(r=>{const f=s(r.target);f&&i(f,"toggle")},"onLongPress")}))}>
            ${x(()=>c.value,r=>r,r=>u`
                <data-item.row data-key=${()=>r.key} class:picked=${()=>l.has(r.key)} onclick=${h(f=>i(r.key,Fe(f)))}>
                  ${m(()=>r.cover!==void 0,()=>u`<${se} ...${{get id(){return r.cover}}} />`)}
                  <span.row-label>${()=>r.label}</span>
                  <span.row-sub>${()=>r.sub??r.count}</span>
                </data-item>
              `)}
          </data-index>
        `,()=>u`<p.panel-empty>${()=>e.empty}</p>`)}
    </section>
  `}a(Ve,"$$PanelRatHtml");function Xe(e,t){return Ze.call({props:e},e,t)}a(Xe,"PlayerRatHtml");function Ze(e,t){let{duration:n,error:l,index:c,playing:o,queue:i,time:s}=ye(p,{duration:null,error:null,index:null,playing:null,queue:null,time:null});const r=g(()=>i.value[c.value]??null),f=a(d=>`${Math.floor(d/60)}:${String(Math.floor(d%60)).padStart(2,"0")}`,"clock");return u`
    <aside.player class:idle=${()=>!r.value}>
      ${m(()=>r.value,()=>u`
          <${se} ...${{get id(){return r.value.cover}}} />
          <div.player-now>
            <span.player-title>${()=>r.value.title}</span>
            <span.player-artist>${()=>r.value.artist}</span>
          </div>
        `,()=>u`<span.player-title>Player</span>`)}
      <div.player-controls>
        <btn-icon icon="skip-previous" label="Previous" onclick=${T("previous")} />
        <btn-icon icon=${()=>o.value?"pause":"play"} label=${()=>o.value?"Pause":"Play"} onclick=${T("toggle-play")} />
        <btn-icon icon="skip-next" label="Next" onclick=${T("next")} />
      </div>
      ${m(()=>r.value,()=>u`<input.player-seek type="range" min="0" max=${()=>n.value||0} step="1" value=${()=>s.value} oninput=${h(d=>p.seek(Number(d.target.value)))} aria-label="Position" />`)}
      ${m(()=>r.value,()=>u`<span.player-time>${()=>f(s.value)} / ${()=>f(n.value)}</span>`)}
      ${m(()=>l.value,()=>u`<span.player-error>${()=>l.value.message}</span>`)}
    </aside>
  `}a(Ze,"$$PlayerRatHtml");const L=fe("appearance",{}),G={density:A.densities,geometry:A.geometries,mode:A.modes},_e=a(()=>L.value,"appearance"),Je=a(()=>A.palettes().catch(()=>[]),"palettes");function et(e,t){return L.value={...L.value,[e]:t||null},A.set({[e]:t||null})}a(et,"setAppearance");Object.keys(L.value).length&&A.set(L.value);let S=null;const F=b(!1),re=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,tt=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!re;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),S=e,F.value=!0});addEventListener("appinstalled",()=>{S=null,F.value=!1});async function at(){if(!S)return!1;const e=S;return S=null,F.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a(at,"install");const nt=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function Q(e,t){return lt.call({props:e},e,t)}a(Q,"SettingsRatHtml");function lt(e,t){ve("177zzh1",nt);let n=U({..._e()}),l=U([]);const c=g(()=>F.value);Je().then(s=>{l.value=s});function o(s,r){const f=r.detail?.value??r.target.value;n.value={...n.value,[s]:f},et(s,f)}a(o,"change");async function i(){await at()&&I.success(`${e.name??"the app"} is installed`)}return a(i,"installApp"),u`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${h(s=>o("palette",s))}>
            ${x(()=>l.value,s=>s,s=>u`<input-option value=${()=>s}>${()=>s}</input-option>`)}
          </input-value>
        </label>
        ${x(()=>Object.keys(G),s=>s,s=>u`
            <label>
              <span>${()=>s}</span>
              <input-value look="segments" value=${()=>n.value[s]??""} onchange=${h(r=>o(s,r))}>
                ${x(()=>G[s],r=>r,r=>u`<input-option value=${()=>r}>${()=>r}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${m(()=>!re,()=>u`
          <section>
            <h3>install</h3>
            ${m(()=>c.value,()=>u`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${h(i)} />`,()=>u`
                ${m(()=>tt,()=>u`<p.hint>Share, then "Add to Home Screen".</p>`,()=>u`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a(lt,"$$SettingsRatHtml");function vt(e,t){return st.call({props:e},e,t)}a(vt,"AppRatHtml");function st(e,t){const n={artists:"Artists",genres:"Genres",releases:"Releases",tracks:"Tracks"},l={artists:"No artists yet",genres:"Add a folder in the settings",releases:"Pick an artist",tracks:"Pick a release"};RAT.app.hold(xe().catch(I.error)),RAT.app.commands.assign({"clear-selection":Ne,next:a(()=>p.next(),"next"),previous:a(()=>p.previous(),"previous"),"toggle-play":a(()=>p.toggle(),"toggle-play")});let c=U(0),o=null;const i=a(()=>o&&o.scrollWidth>o.clientWidth,"narrow"),s=a(d=>o?.children[d]?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"}),"show");function r(d){o=d;const R=a(()=>{c.value=Math.round(d.scrollLeft/Math.max(1,d.clientWidth))},"onScroll");return d.addEventListener("scroll",R,{passive:!0}),()=>d.removeEventListener("scroll",R)}a(r,"panels");function f(d,R,z){if(d==="tracks"&&z==="one"){const D=Me.value;p.play(D,D.findIndex(oe=>oe.key===R));return}z==="one"&&i()&&s(k.indexOf(d)+1)}return a(f,"picked"),u`
    <rat-area name="main">
      <div.noisy>
        <${De} />
        <nav.tabs>
          ${x(()=>k,d=>d,d=>u`<button class:active=${()=>c.value===k.indexOf(d)} onclick=${h(()=>s(k.indexOf(d)))}>${()=>n[d]}</button>`)}
        </nav>
        <div.panels ref=${X(r)}>
          ${x(()=>k,d=>d,d=>u`<${Qe} ...${{get name(){return d},get title(){return n[d]},get empty(){return l[d]},onpick:a((R,z)=>f(d,R,z),"onpick")}} />`)}
        </div>
        <${Xe} />
      </div>
    </rat-area>
    <rat-area name="config" dock="end"><${Q} name="noisy"><${Be} /></${Q}></rat-area>
  `}a(st,"$$AppRatHtml");export{vt as default};
