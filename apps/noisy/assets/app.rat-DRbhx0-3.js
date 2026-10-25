var ce=Object.defineProperty;var n=(e,t)=>ce(e,"name",{value:t,configurable:!0});import{y as ue,z as g,E as P,G,P as de,H as b,J as pe,K as Q,L as fe,f as x,w as m,h as d,M as U,O as V,Q as A,T as ve}from"./index-BXXQ_AZN.js";import{p as ge,a as me}from"./keys-CWTtq0D5.js";import{parseBlob as $e}from"https://esm.sh/music-metadata@11.16.1";import he from"./index-DIlYw3RB.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function ye(e,t){const a={};for(const l of Object.keys(t)){const c=e?.[l],o=t[l];a[l]=ue(c)?c:g(()=>e[l]===void 0&&o?o():e[l])}return new Proxy(e??{},{get:n((l,c)=>Object.hasOwn(a,c)?a[c]:l[c],"get")})}n(ye,"signalsOf");function h(e,{keys:t=null,prevent:a=!1,times:l=0}={}){const c=t?ge(t):null;let o=l;return function(i){if(!(l&&!o)&&!(c&&!me(i,c))){a&&i.preventDefault(),l&&o--;try{const s=(typeof e=="string"?P(e):e).call(this,i);typeof s?.catch=="function"&&s.catch(r=>G(this,r))}catch(s){G(this,s)}}}}n(h,"listener");const M=n(e=>(t,a)=>de.notify(t,{...a,type:e}),"notify"),C=Object.assign(M("info"),{error:M("error"),info:M("info"),success:M("success")}),be=3,E=n(()=>RAT.app.database,"db"),w=n(()=>RAT.app.folders,"folders"),ke=n((e,t)=>`${e}/${t}`,"keyOf"),O={artist:"Unknown artist",genre:"Unknown genre",release:"Unknown release"},$=b([]),X=b(0),we=n(e=>$.value.find(t=>t.key===e)??null,"trackByKey");async function xe(){$.value=await E().tracks.values(),await w().load()}n(xe,"load");const B=new Map;pe(()=>{for(const[e,t]of Object.entries(w().trees.value))B.get(e)!==t&&(B.set(e,t),Ae(e,t))});const _=n(e=>e?e.kind==="file"?[e]:(e.children??[]).flatMap(_):[],"filesOf"),Re=n(e=>e.replace(/\.[^.]+$/,"").replace(/[_]+/g," ").replace(/\s+/g," ").trim(),"titleOf");async function Ae(e,t){const a=new Map($.value.filter(i=>i.sourceId===e).map(i=>[i.key,i])),l=await Promise.all(_(t).map(async i=>{const s=ke(e,i.path),r=await i.entry.info(),f=`${r?.size}:${r?.modified}`,u=a.get(s);return u?.sig===f?u:{artist:O.artist,cover:null,disc:null,duration:null,genres:[O.genre],key:s,name:i.name,no:null,path:i.path,release:O.release,sig:f,sourceId:e,tagged:!1,title:Re(i.name),year:null}})),c=[...a.keys()].filter(i=>!l.some(s=>s.key===i)),o=l.filter(i=>a.get(i.key)!==i);await Promise.all([...c.map(i=>E().tracks.delete(i)),...o.map(i=>E().tracks.set(i.key,i))]),$.value=[...$.value.filter(i=>i.sourceId!==e),...l],Oe(l.filter(i=>!i.tagged))}n(Ae,"sync");const q=[];let j=0;function Oe(e){q.push(...e),Z()}n(Oe,"enqueue");function Z(){for(X.value=q.length+j;j<be&&q.length;){const e=q.shift();j++,Se(e).finally(()=>{j--,Z()})}}n(Z,"pump");async function Se(e){const t=we(e.key);if(!t||t.tagged||t.sig!==e.sig)return;let a={...t,tagged:!0};try{const{common:l,format:c}=await $e(await ee(t)),o=l.picture?.[0];a={...a,artist:l.albumartist||l.artist||O.artist,cover:o?await Pe(t,o):null,disc:l.disk?.no??null,duration:c.duration??null,genres:l.genre?.length?l.genre:[O.genre],no:l.track?.no??null,release:l.album||O.release,title:l.title||t.title,year:l.year??null}}catch{}await E().tracks.set(a.key,a),$.value=$.value.map(l=>l.key===a.key?a:l)}n(Se,"tag");async function Pe(e,t){const a=`${e.key}:${e.sig}`;return await RAT.app.thumbnails.requestFile(a,()=>new Blob([t.data],{type:t.format})),a}n(Pe,"coverOf");const ee=n(e=>w().nodeAt(e.sourceId,e.path)?.entry.read("blob")??Promise.reject(new Error(`${e.name} is no longer in its folder`)),"fileOf");function Te(e){return w().perms.value[e.sourceId]!=="granted"?Promise.reject(new Error("Reconnect the folder of this track in the settings first.")):ee(e)}n(Te,"openFile");async function Ee(){if(!("showDirectoryPicker"in globalThis))throw new Error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");return w().add()}n(Ee,"addFolder");const Le=n(()=>Promise.all(w().sources.value.map(e=>w().scan(e.id))),"rescanAll");async function He(e){const t=$.value.filter(a=>a.sourceId===e).map(a=>a.key);await w().remove(e),await Promise.all(t.map(a=>E().tracks.delete(a))),$.value=$.value.filter(a=>a.sourceId!==e),B.delete(e)}n(He,"removeFolder");const k=["genres","artists","releases","tracks"],y=Object.fromEntries(k.map(e=>[e,new fe])),I={},L=n(e=>`${e.artist}\0${e.release}`,"releaseKey"),ze=n((e,t)=>e.label.localeCompare(t.label,void 0,{numeric:!0,sensitivity:"base"}),"byLabel");function K(e,t,a=l=>l){const l=new Map;for(const c of e)for(const o of t(c))l.set(o,(l.get(o)??0)+1);return[...l].map(([c,o])=>({count:o,key:c,label:a(c)})).sort(ze)}n(K,"groups");const te=g(()=>y.genres.size?$.value.filter(e=>e.genres.some(t=>y.genres.has(t))):$.value),W=g(()=>te.value.filter(e=>y.artists.has(e.artist))),ne=g(()=>W.value.filter(e=>y.releases.has(L(e)))),ae={genres:g(()=>K($.value,e=>e.genres)),artists:g(()=>K(te.value,e=>[e.artist])),releases:g(()=>y.artists.size?K(W.value,e=>[L(e)],e=>e.split("\0")[1]).map(e=>({...e,sub:je(e.key)})):[]),tracks:g(()=>y.releases.size?ne.value.toSorted(le).map(e=>({cover:e.cover,key:e.key,label:e.title,sub:qe(e)})):[])},Me=g(()=>y.releases.size?ne.value.toSorted(le):[]);function je(e){const t=W.value.find(a=>L(a)===e);return[t?.artist,t?.year].filter(Boolean).join(" · ")}n(je,"releaseInfo");const Ie=n(e=>e==null?"":`${Math.floor(e/60)}:${String(Math.round(e%60)).padStart(2,"0")}`,"duration"),qe=n(e=>[e.no&&String(e.no).padStart(2,"0"),Ie(e.duration)].filter(Boolean).join(" · "),"trackInfo"),le=n((e,t)=>L(e).localeCompare(L(t))||(e.disc??0)-(t.disc??0)||(e.no??0)-(t.no??0)||e.title.localeCompare(t.title),"trackOrder"),Ue=n((e,t,a="one")=>Q(()=>Ce(e,t,a)),"pick");function Ce(e,t,a){const l=y[e],c=ae[e].value.map(o=>o.key);if(a==="range"&&I[e]!=null){const[o,i]=[c.indexOf(I[e]),c.indexOf(t)].sort((s,r)=>s-r);l.clear();for(const s of c.slice(o,i+1))l.add(s)}else if(a==="toggle")l.has(t)?l.delete(t):l.add(t),I[e]=t;else{const o=l.size===1&&l.has(t);l.clear(),o||l.add(t),I[e]=t}for(const o of k.slice(k.indexOf(e)+1))y[o].clear()}n(Ce,"pickIn");const Ne=n(e=>e?.shiftKey?"range":e?.ctrlKey||e?.metaKey?"toggle":"one","modeOf"),Ke=n(()=>Q(()=>{for(const e of k)y[e].clear()}),"clearSelection"),v=new Audio;v.preload="metadata";let F=null;const p={duration:b(0),error:b(null),index:b(-1),playing:b(!1),queue:b([]),time:b(0),get track(){return p.queue.value[p.index.value]??null},play(e,t=0){return p.queue.value=e,p.at(t)},async at(e){const t=p.queue.value[e];if(t){p.index.value=e,p.error.value=null;try{const a=await Te(t);if(p.index.value!==e)return;F&&URL.revokeObjectURL(F),v.src=F=URL.createObjectURL(a),await v.play(),Fe(t)}catch(a){p.error.value=a}}},toggle(){p.track&&(v.paused?v.play():v.pause())},next(){p.index.value<p.queue.value.length-1&&p.at(p.index.value+1)},previous(){v.currentTime>3?v.currentTime=0:p.at(Math.max(0,p.index.value-1))},seek(e){v.currentTime=e}};v.addEventListener("durationchange",()=>{p.duration.value=v.duration||0});v.addEventListener("ended",()=>p.next());v.addEventListener("pause",()=>{p.playing.value=!1});v.addEventListener("play",()=>{p.playing.value=!0});v.addEventListener("timeupdate",()=>{p.time.value=v.currentTime||0});const S=navigator.mediaSession;function Fe(e){S&&(S.metadata=new MediaMetadata({album:e.release,artist:e.artist,title:e.title}))}n(Fe,"session");S?.setActionHandler("nexttrack",()=>p.next());S?.setActionHandler("pause",()=>v.pause());S?.setActionHandler("play",()=>v.play());S?.setActionHandler("previoustrack",()=>p.previous());function Be(e,t){return We.call({props:e},e,t)}n(Be,"FoldersRatHtml");function We(e,t){const a=RAT.app.folders,l=g(()=>a.sources.value),c=g(()=>a.perms.value),o=g(()=>X.value);async function i(){try{const s=await Ee();s&&C.success(`Added ${s.name}`)}catch(s){C.error(s)}}return n(i,"add"),d`
    <section.folders>
      <h3>folders</h3>
      ${x(()=>l.value,s=>s,s=>d`
          <div.folder>
            <span>${()=>s.name}</span>
            ${m(()=>c.value[s.id]!=="granted",()=>d`<btn-push label="Reconnect" onclick=${h(()=>a.reconnect(s.id))} />`)}
            <btn-icon icon="delete" label="Remove" onclick=${h(()=>He(s.id))} />
          </div>
        `)}
      <div.folder-actions>
        <btn-push icon="folder-add" label="Add a folder" onclick=${h(i)} />
        ${m(()=>l.value.length,()=>d`<btn-push icon="refresh" label="Rescan" onclick=${h(Le)} />`)}
      </div>
      ${m(()=>o.value,()=>d`<p.hint>${()=>o.value} files left to read</p>`)}
    </section>
  `}n(We,"$$FoldersRatHtml");function De(e,t){return Ge.call({props:e},e,t)}n(De,"MenuRatHtml");function Ge(e,t){return d`
    <nav.menu>
      <span.menu-brand>noisy</span>
      <btn-icon icon="settings" label="Settings" onclick=${P("rat:toggle[config]")} />
    </nav>
  `}n(Ge,"$$MenuRatHtml");function se(e,t){return Je.call({props:e},e,t)}n(se,"CoverRatHtml");function Je(e,t){let a=U(null);return e.id&&RAT.app.thumbnails.requestFile(e.id,()=>null).then(l=>{a.value=l}).catch(()=>{}),d`
    <span.cover style:background-image=${()=>a.value?`url("${a.value}")`:null}>
      ${m(()=>!a.value,()=>d`<svg-icon icon="mdi:music-note" />`)}
    </span>
  `}n(Je,"$$CoverRatHtml");function Ye(e,t){return Qe.call({props:e},e,t)}n(Ye,"PanelRatHtml");function Qe(e,t){const a=e.name,l=y[a],c=g(()=>ae[a].value),o=g(()=>l.size);function i(r,f){Ue(a,r,f),e.onpick?.(r,f)}n(i,"choose");const s=n(r=>r?.closest?.("[data-key]")?.dataset.key,"keyAt");return d`
    <section.panel data-panel=${()=>a}>
      <header.panel-head>
        <h2>${()=>e.title}</h2>
        <span.panel-count>${()=>o.value?`${o.value} / ${c.value.length}`:c.value.length}</span>
        ${m(()=>o.value,()=>d`<btn-icon icon="close" label="Clear" onclick=${h(()=>l.clear())} />`)}
      </header>
      ${m(()=>c.value.length,()=>d`
          <data-index.panel-list viewmode="list" item-size="2.75rem" gap="0" ref=${V(he,()=>({onLongPress:n(r=>{const f=s(r.target);f&&i(f,"toggle")},"onLongPress")}))}>
            ${x(()=>c.value,r=>r,r=>d`
                <data-item.row data-key=${()=>r.key} class:picked=${()=>l.has(r.key)} onclick=${h(f=>i(r.key,Ne(f)))}>
                  ${m(()=>r.cover!==void 0,()=>d`<${se} ...${{get id(){return r.cover}}} />`)}
                  <span.row-label>${()=>r.label}</span>
                  <span.row-sub>${()=>r.sub??r.count}</span>
                </data-item>
              `)}
          </data-index>
        `,()=>d`<p.panel-empty>${()=>e.empty}</p>`)}
    </section>
  `}n(Qe,"$$PanelRatHtml");function Ve(e,t){return Xe.call({props:e},e,t)}n(Ve,"PlayerRatHtml");function Xe(e,t){let{duration:a,error:l,index:c,playing:o,queue:i,time:s}=ye(p,{duration:null,error:null,index:null,playing:null,queue:null,time:null});const r=g(()=>i.value[c.value]??null),f=n(u=>`${Math.floor(u/60)}:${String(Math.floor(u%60)).padStart(2,"0")}`,"clock");return d`
    <aside.player class:idle=${()=>!r.value}>
      ${m(()=>r.value,()=>d`
          <${se} ...${{get id(){return r.value.cover}}} />
          <div.player-now>
            <span.player-title>${()=>r.value.title}</span>
            <span.player-artist>${()=>r.value.artist}</span>
          </div>
        `,()=>d`<span.player-title>Player</span>`)}
      <div.player-controls>
        <btn-icon icon="mdi:skip-previous" label="Previous" onclick=${P("previous")} />
        <btn-icon icon=${()=>o.value?"mdi:pause":"mdi:play"} label=${()=>o.value?"Pause":"Play"} onclick=${P("toggle-play")} />
        <btn-icon icon="mdi:skip-next" label="Next" onclick=${P("next")} />
      </div>
      ${m(()=>r.value,()=>d`<input.player-seek type="range" min="0" max=${()=>a.value||0} step="1" value=${()=>s.value} oninput=${h(u=>p.seek(Number(u.target.value)))} aria-label="Position" />`)}
      ${m(()=>r.value,()=>d`<span.player-time>${()=>f(s.value)} / ${()=>f(a.value)}</span>`)}
      ${m(()=>l.value,()=>d`<span.player-error>${()=>l.value.message}</span>`)}
    </aside>
  `}n(Xe,"$$PlayerRatHtml");function _e(e,t=null){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}n(_e,"read");function Ze(e,t){t==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}n(Ze,"write");const re=`appearance:${new URL(".",location.href).pathname}`,J={density:A.densities,geometry:A.geometries,mode:A.modes},H=_e(re,{}),et=n(()=>A.palettes().catch(()=>[]),"palettes");function tt(e,t){return H[e]=t||null,Ze(re,H),A.set({[e]:t||null})}n(tt,"setAppearance");Object.keys(H).length&&A.set(H);let T=null;const N=b(!1),oe=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,nt=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!oe;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),T=e,N.value=!0});addEventListener("appinstalled",()=>{T=null,N.value=!1});async function at(){if(!T)return!1;const e=T;return T=null,N.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}n(at,"install");const lt=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function Y(e,t){return st.call({props:e},e,t)}n(Y,"SettingsRatHtml");function st(e,t){ve("177zzh1",lt);let a=U({...H}),l=U([]);const c=g(()=>N.value);et().then(s=>{l.value=s});function o(s,r){const f=r.detail?.value??r.target.value;a.value={...a.value,[s]:f},tt(s,f)}n(o,"change");async function i(){await at()&&C.success(`${e.name??"the app"} is installed`)}return n(i,"installApp"),d`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>a.value.palette??"zombie"} onchange=${h(s=>o("palette",s))}>
            ${x(()=>l.value,s=>s,s=>d`<input-option value=${()=>s}>${()=>s}</input-option>`)}
          </input-value>
        </label>
        ${x(()=>Object.keys(J),s=>s,s=>d`
            <label>
              <span>${()=>s}</span>
              <input-value look="segments" value=${()=>a.value[s]??""} onchange=${h(r=>o(s,r))}>
                ${x(()=>J[s],r=>r,r=>d`<input-option value=${()=>r}>${()=>r}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${m(()=>!oe,()=>d`
          <section>
            <h3>install</h3>
            ${m(()=>c.value,()=>d`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${h(i)} />`,()=>d`
                ${m(()=>nt,()=>d`<p.hint>Share, then "Add to Home Screen".</p>`,()=>d`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}n(st,"$$SettingsRatHtml");function gt(e,t){return rt.call({props:e},e,t)}n(gt,"AppRatHtml");function rt(e,t){const a={artists:"Artists",genres:"Genres",releases:"Releases",tracks:"Tracks"},l={artists:"No artists yet",genres:"Add a folder in the settings",releases:"Pick an artist",tracks:"Pick a release"};RAT.app.hold(xe().catch(u=>C.error(u))),RAT.app.commands.assign({"clear-selection":Ke,next:n(()=>p.next(),"next"),previous:n(()=>p.previous(),"previous"),"toggle-play":n(()=>p.toggle(),"toggle-play")});let c=U(0),o=null;const i=n(()=>o&&o.scrollWidth>o.clientWidth,"narrow"),s=n(u=>o?.children[u]?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"}),"show");function r(u){o=u;const R=n(()=>{c.value=Math.round(u.scrollLeft/Math.max(1,u.clientWidth))},"onScroll");return u.addEventListener("scroll",R,{passive:!0}),()=>u.removeEventListener("scroll",R)}n(r,"panels");function f(u,R,z){if(u==="tracks"&&z==="one"){const D=Me.value;p.play(D,D.findIndex(ie=>ie.key===R));return}z==="one"&&i()&&s(k.indexOf(u)+1)}return n(f,"picked"),d`
    <rat-area name="main">
      <div.noisy>
        <${De} />
        <nav.tabs>
          ${x(()=>k,u=>u,u=>d`<button class:active=${()=>c.value===k.indexOf(u)} onclick=${h(()=>s(k.indexOf(u)))}>${()=>a[u]}</button>`)}
        </nav>
        <div.panels ref=${V(r)}>
          ${x(()=>k,u=>u,u=>d`<${Ye} ...${{get name(){return u},get title(){return a[u]},get empty(){return l[u]},onpick:n((R,z)=>f(u,R,z),"onpick")}} />`)}
        </div>
        <${Ve} />
      </div>
    </rat-area>
    <rat-area name="config" dock="end"><${Y} name="noisy"><${Be} /></${Y}></rat-area>
  `}n(rt,"$$AppRatHtml");export{gt as default};
