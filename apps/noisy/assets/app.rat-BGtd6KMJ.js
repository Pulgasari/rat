var me=Object.defineProperty;var a=(e,t)=>me(e,"name",{value:t,configurable:!0});import{P as $e,Q as g,T as S,V,W as he,X as b,Y as ye,Z as ee,a0 as be,f as x,w as m,h as u,a1 as z,a2 as te,a3 as T,a4 as ke,a5 as we}from"./index-Bpiyj-8i.js";import{p as xe,a as Ae}from"./keys-CWTtq0D5.js";import{parseBlob as Re,parseBuffer as Oe}from"https://esm.sh/music-metadata@11.16.1";import Ee from"./index-DIlYw3RB.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function Pe(e,t){const n={};for(const l of Object.keys(t)){const r=e?.[l],o=t[l];n[l]=$e(r)?r:g(()=>e[l]===void 0&&o?o():e[l])}return new Proxy(e??{},{get:a((l,r)=>Object.hasOwn(n,r)?n[r]:l[r],"get")})}a(Pe,"signalsOf");function h(e,{keys:t=null,prevent:n=!1,times:l=0}={}){const r=t?xe(t):null;let o=l;return function(c){if(!(l&&!o)&&!(r&&!Ae(c,r))){n&&c.preventDefault(),l&&o--;try{const s=(typeof e=="string"?S(e):e).call(this,c);typeof s?.catch=="function"&&s.catch(i=>V(this,i,"handler"))}catch(s){V(this,s,"handler")}}}}a(h,"listener");const q=a(e=>(t,n)=>he.notify(t,{...n,type:e}),"notify"),F=Object.assign(q("info"),{error:q("error"),info:q("info"),success:q("success")}),X=65536,Se=1<<20,Te=1<<25,Me=3,O=a(()=>RAT.app.database,"db"),w=a(()=>RAT.app.folders,"folders"),He=a((e,t)=>`${e}/${t}`,"keyOf"),R={artist:"Unknown artist",genre:"Unknown genre",release:"Unknown release"},$=b([]),ne=b(0),Le=a(e=>$.value.find(t=>t.key===e)??null,"trackByKey");async function je(){$.value=await O().tracks.values(),await w().load()}a(je,"load");const D=new Map;ye(()=>{for(const[e,t]of Object.entries(w().trees.value))D.get(e)!==t&&(D.set(e,t),Ce(e,t))});const ae=a(e=>e?e.kind==="file"?[e]:(e.children??[]).flatMap(ae):[],"filesOf"),qe=a(e=>e.replace(/\.[^.]+$/,"").replace(/[_]+/g," ").replace(/\s+/g," ").trim(),"titleOf");async function Ce(e,t){const n=new Map($.value.filter(c=>c.sourceId===e).map(c=>[c.key,c])),l=await Promise.all(ae(t).map(async c=>{const s=He(e,c.path),i=await c.entry.info(),f=`${i?.size}:${i?.modified}`,d=n.get(s);return d?.sig===f?d:{artist:R.artist,cover:null,covered:!1,disc:null,duration:null,genres:[R.genre],key:s,name:c.name,no:null,path:c.path,release:R.release,sig:f,sourceId:e,tagged:!1,title:qe(c.name),year:null}})),r=[...n.keys()].filter(c=>!l.some(s=>s.key===c)),o=l.filter(c=>n.get(c.key)!==c);await Promise.all([...r.map(c=>O().tracks.delete(c)),...o.map(c=>O().tracks.set(c.key,c))]),$.value=[...$.value.filter(c=>c.sourceId!==e),...l],Ie(l)}a(Ce,"sync");const U=new Map;let Z=null;function le(e){U.set(e.key,e),Z??=requestAnimationFrame(()=>{Z=null;const t=new Map(U);U.clear(),$.value=$.value.map(n=>t.get(n.key)?.sig===n.sig?t.get(n.key):n)})}a(le,"settle");const P=[],B=[];let C=0;function Ie(e){P.push(...e.filter(t=>!t.tagged)),B.push(...e.filter(t=>t.tagged&&t.covered===!1)),re()}a(Ie,"enqueue");function re(){for(ne.value=P.length+C;C<Me&&(P.length||B.length);){const[e,t]=P.length?[ze,P.shift()]:[Fe,B.shift()];C++,e(t).finally(()=>{C--,re()})}}a(re,"pump");const se=a(e=>{const t=U.get(e.key)??Le(e.key);return!t||t.sig!==e.sig?null:t},"stale"),Y=a(async(e,t,n)=>new Uint8Array(await(await e.slice(t,n)).arrayBuffer()),"bytesOf");async function Ue(e,t){const n=await Y(e,0,Math.min(t,65536)),l=String.fromCharCode(...n.subarray(0,4));if(l==="fLaC")for(let r=4;r<t;){const o=r+4<=n.length?n.subarray(r,r+4):await Y(e,r,r+4);if(r+=4+(o[1]<<16|o[2]<<8|o[3]),o[0]&128)return r+X}return l.startsWith("ID3")?10+(n[5]&16?10:0)+((n[6]&127)<<21|(n[7]&127)<<14|(n[8]&127)<<7|n[9]&127)+X:Se}a(Ue,"tagsEnd");async function oe(e,t){const n=w().nodeAt(e.sourceId,e.path)?.entry;if(!n)throw new Error(`${e.name} is no longer in its folder`);const l={duration:!1,skipCovers:t,skipPostHeaders:!0};if(!n.handle.readSlice)return Re(await n.read("blob"),l);const{size:r=0,type:o}=await n.info()??{},c=Math.min(r,await Ue(n,r));if(c>Te)throw new Error(`${e.name}: tags of ${c} bytes`);return Oe(await Y(n,0,c),{mimeType:o,size:r},l)}a(oe,"parse");async function ze(e){const t=se(e);if(!t||t.tagged)return;let n={...t,tagged:!0};try{const{common:l,format:r}=await oe(t,!0);n={...n,artist:l.albumartist||l.artist||R.artist,disc:l.disk?.no??null,duration:r.duration??null,genres:l.genre?.length?l.genre:[R.genre],no:l.track?.no??null,release:l.album||R.release,title:l.title||t.title,year:l.year??null}}catch{n.covered=!0}await O().tracks.set(n.key,n),le(n),n.covered||B.push(n)}a(ze,"tag");async function Fe(e){const t=se(e);if(!t||t.covered)return;let n=null;try{const r=(await oe(t,!1)).common.picture?.[0];r&&(n=`${t.key}:${t.sig}`,await RAT.app.thumbnails.requestFile(n,()=>new Blob([r.data],{type:r.format})))}catch{}const l={...t,cover:n,covered:!0};await O().tracks.set(l.key,l),le(l)}a(Fe,"cover");const Be=a(e=>w().nodeAt(e.sourceId,e.path)?.entry.read("blob")??Promise.reject(new Error(`${e.name} is no longer in its folder`)),"fileOf");function Ne(e){return w().perms.value[e.sourceId]!=="granted"?Promise.reject(new Error("Reconnect the folder of this track in the settings first.")):Be(e)}a(Ne,"openFile");async function Ke(){if(!("showDirectoryPicker"in globalThis))throw new Error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");return w().add()}a(Ke,"addFolder");const We=a(()=>Promise.all(w().sources.value.map(e=>w().scan(e.id))),"rescanAll");async function De(e){const t=$.value.filter(n=>n.sourceId===e).map(n=>n.key);await w().remove(e),await Promise.all(t.map(n=>O().tracks.delete(n))),$.value=$.value.filter(n=>n.sourceId!==e),D.delete(e)}a(De,"removeFolder");const k=["genres","artists","releases","tracks"],y=Object.fromEntries(k.map(e=>[e,new be])),I={},H=a(e=>`${e.artist}\0${e.release}`,"releaseKey"),Ye=a((e,t)=>e.label.localeCompare(t.label,void 0,{numeric:!0,sensitivity:"base"}),"byLabel");function K(e,t,n=l=>l){const l=new Map;for(const r of e)for(const o of t(r))l.set(o,(l.get(o)??0)+1);return[...l].map(([r,o])=>({count:o,key:r,label:n(r)})).sort(Ye)}a(K,"groups");const ie=g(()=>y.genres.size?$.value.filter(e=>e.genres.some(t=>y.genres.has(t))):$.value),G=g(()=>ie.value.filter(e=>y.artists.has(e.artist))),ce=g(()=>G.value.filter(e=>y.releases.has(H(e)))),ue={genres:g(()=>K($.value,e=>e.genres)),artists:g(()=>K(ie.value,e=>[e.artist])),releases:g(()=>y.artists.size?K(G.value,e=>[H(e)],e=>e.split("\0")[1]).map(e=>({...e,sub:Qe(e.key)})):[]),tracks:g(()=>y.releases.size?ce.value.toSorted(de).map(e=>({cover:e.cover,key:e.key,label:e.title,sub:Xe(e)})):[])},Ge=g(()=>y.releases.size?ce.value.toSorted(de):[]);function Qe(e){const t=G.value.find(n=>H(n)===e);return[t?.artist,t?.year].filter(Boolean).join(" · ")}a(Qe,"releaseInfo");const Ve=a(e=>e==null?"":`${Math.floor(e/60)}:${String(Math.round(e%60)).padStart(2,"0")}`,"duration"),Xe=a(e=>[e.no&&String(e.no).padStart(2,"0"),Ve(e.duration)].filter(Boolean).join(" · "),"trackInfo"),de=a((e,t)=>H(e).localeCompare(H(t))||(e.disc??0)-(t.disc??0)||(e.no??0)-(t.no??0)||e.title.localeCompare(t.title),"trackOrder"),Ze=a((e,t,n="one")=>ee(()=>_e(e,t,n)),"pick");function _e(e,t,n){const l=y[e],r=ue[e].value.map(o=>o.key);if(n==="range"&&I[e]!=null){const[o,c]=[r.indexOf(I[e]),r.indexOf(t)].sort((s,i)=>s-i);l.clear();for(const s of r.slice(o,c+1))l.add(s)}else if(n==="toggle")l.has(t)?l.delete(t):l.add(t),I[e]=t;else{const o=l.size===1&&l.has(t);l.clear(),o||l.add(t),I[e]=t}for(const o of k.slice(k.indexOf(e)+1))y[o].clear()}a(_e,"pickIn");const Je=a(e=>e?.shiftKey?"range":e?.ctrlKey||e?.metaKey?"toggle":"one","modeOf"),et=a(()=>ee(()=>{for(const e of k)y[e].clear()}),"clearSelection"),v=new Audio;v.preload="metadata";let W=null;const p={duration:b(0),error:b(null),index:b(-1),playing:b(!1),queue:b([]),time:b(0),get track(){return p.queue.value[p.index.value]??null},play(e,t=0){return p.queue.value=e,p.at(t)},async at(e){const t=p.queue.value[e];if(t){p.index.value=e,p.error.value=null;try{const n=await Ne(t);if(p.index.value!==e)return;W&&URL.revokeObjectURL(W),v.src=W=URL.createObjectURL(n),await v.play(),tt(t)}catch(n){p.error.value=n}}},toggle(){p.track&&(v.paused?v.play():v.pause())},next(){p.index.value<p.queue.value.length-1&&p.at(p.index.value+1)},previous(){v.currentTime>3?v.currentTime=0:p.at(Math.max(0,p.index.value-1))},seek(e){v.currentTime=e}};v.addEventListener("durationchange",()=>{p.duration.value=v.duration||0});v.addEventListener("ended",()=>p.next());v.addEventListener("pause",()=>{p.playing.value=!1});v.addEventListener("play",()=>{p.playing.value=!0});v.addEventListener("timeupdate",()=>{p.time.value=v.currentTime||0});const E=navigator.mediaSession;function tt(e){E&&(E.metadata=new MediaMetadata({album:e.release,artist:e.artist,title:e.title}))}a(tt,"session");E?.setActionHandler("nexttrack",()=>p.next());E?.setActionHandler("pause",()=>v.pause());E?.setActionHandler("play",()=>v.play());E?.setActionHandler("previoustrack",()=>p.previous());function nt(e,t){return at.call({props:e},e,t)}a(nt,"FoldersRatHtml");function at(e,t){const n=RAT.app.folders,l=g(()=>n.sources.value),r=g(()=>n.perms.value),o=g(()=>ne.value);async function c(){try{const s=await Ke();s&&F.success(`Added ${s.name}`)}catch(s){F.error(s)}}return a(c,"add"),u`
    <section.folders>
      <h3>folders</h3>
      ${x(()=>l.value,s=>s,s=>u`
          <div.folder>
            <span>${()=>s.name}</span>
            ${m(()=>r.value[s.id]!=="granted",()=>u`<btn-push label="Reconnect" onclick=${h(()=>n.reconnect(s.id))} />`)}
            <btn-icon icon="delete" label="Remove" onclick=${h(()=>De(s.id))} />
          </div>
        `)}
      <div.folder-actions>
        <btn-push icon="folder-add" label="Add a folder" onclick=${h(c)} />
        ${m(()=>l.value.length,()=>u`<btn-push icon="refresh" label="Rescan" onclick=${h(We)} />`)}
      </div>
      ${m(()=>o.value,()=>u`<p.hint>${()=>o.value} files left to read</p>`)}
    </section>
  `}a(at,"$$FoldersRatHtml");function lt(e,t){return rt.call({props:e},e,t)}a(lt,"MenuRatHtml");function rt(e,t){return u`
    <nav.menu>
      <span.menu-brand>noisy</span>
      <btn-icon icon="settings" label="Settings" onclick=${S("rat:toggle[config]")} />
    </nav>
  `}a(rt,"$$MenuRatHtml");function pe(e,t){return st.call({props:e},e,t)}a(pe,"CoverRatHtml");function st(e,t){let n=z(null);return e.id&&RAT.app.thumbnails.requestFile(e.id,()=>null).then(l=>{n.value=l}).catch(()=>{}),u`<span.cover style:background-image=${()=>n.value?`url("${n.value}")`:null}>${m(()=>!n.value,()=>u`<svg-icon icon="audio" />`)}</span>`}a(st,"$$CoverRatHtml");function ot(e,t){return it.call({props:e},e,t)}a(ot,"PanelRatHtml");function it(e,t){const n=e.name,l=y[n],r=g(()=>ue[n].value),o=g(()=>l.size);function c(i,f){Ze(n,i,f),e.onpick?.(i,f)}a(c,"choose");const s=a(i=>i?.closest?.("[data-key]")?.dataset.key,"keyAt");return u`
    <section.panel data-panel=${()=>n}>
      <header.panel-head>
        <h2>${()=>e.title}</h2>
        <span.panel-count>${()=>o.value?`${o.value} / ${r.value.length}`:r.value.length}</span>
        ${m(()=>o.value,()=>u`<btn-icon icon="close" label="Clear" onclick=${h(()=>l.clear())} />`)}
      </header>
      ${m(()=>r.value.length,()=>u`
          <data-index.panel-list viewmode="list" item-size="2.75rem" gap="0" ref=${te(Ee,()=>({onLongPress:a(i=>{const f=s(i.target);f&&c(f,"toggle")},"onLongPress")}))}>
            ${x(()=>r.value,i=>i,i=>u`
                <data-item.row data-key=${()=>i.key} class:picked=${()=>l.has(i.key)} onclick=${h(f=>c(i.key,Je(f)))}>
                  ${m(()=>i.cover!==void 0,()=>u`<${pe} ...${{get id(){return i.cover}}} />`)}
                  <span.row-label>${()=>i.label}</span>
                  <span.row-sub>${()=>i.sub??i.count}</span>
                </data-item>
              `)}
          </data-index>
        `,()=>u`<p.panel-empty>${()=>e.empty}</p>`)}
    </section>
  `}a(it,"$$PanelRatHtml");function ct(e,t){return ut.call({props:e},e,t)}a(ct,"PlayerRatHtml");function ut(e,t){let{duration:n,error:l,index:r,playing:o,queue:c,time:s}=Pe(p,{duration:null,error:null,index:null,playing:null,queue:null,time:null});const i=g(()=>c.value[r.value]??null),f=a(d=>`${Math.floor(d/60)}:${String(Math.floor(d%60)).padStart(2,"0")}`,"clock");return u`
    <aside.player class:idle=${()=>!i.value}>
      ${m(()=>i.value,()=>u`
          <${pe} ...${{get id(){return i.value.cover}}} />
          <div.player-now>
            <span.player-title>${()=>i.value.title}</span>
            <span.player-artist>${()=>i.value.artist}</span>
          </div>
        `,()=>u`<span.player-title>Player</span>`)}
      <div.player-controls>
        <btn-icon icon="skip-previous" label="Previous" onclick=${S("previous")} />
        <btn-icon icon=${()=>o.value?"pause":"play"} label=${()=>o.value?"Pause":"Play"} onclick=${S("toggle-play")} />
        <btn-icon icon="skip-next" label="Next" onclick=${S("next")} />
      </div>
      ${m(()=>i.value,()=>u`<input.player-seek type="range" min="0" max=${()=>n.value||0} step="1" value=${()=>s.value} oninput=${h(d=>p.seek(Number(d.target.value)))} aria-label="Position" />`)}
      ${m(()=>i.value,()=>u`<span.player-time>${()=>f(s.value)} / ${()=>f(n.value)}</span>`)}
      ${m(()=>l.value,()=>u`<span.player-error>${()=>l.value.message}</span>`)}
    </aside>
  `}a(ut,"$$PlayerRatHtml");const L=ke("appearance",{}),_={density:T.densities,geometry:T.geometries,mode:T.modes},dt=a(()=>L.value,"appearance"),pt=a(()=>T.palettes().catch(()=>[]),"palettes");function fe(e){const t=document.querySelector("rat-app");for(const[n,l]of Object.entries(e))l?t?.setAttribute(n,l):t?.removeAttribute(n);return T.set(e)}a(fe,"apply");function ft(e,t){return L.value={...L.value,[e]:t||null},fe({[e]:t||null})}a(ft,"setAppearance");Object.keys(L.value).length&&fe(L.value);let M=null;const N=b(!1),ve=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,vt=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!ve;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),M=e,N.value=!0});addEventListener("appinstalled",()=>{M=null,N.value=!1});async function gt(){if(!M)return!1;const e=M;return M=null,N.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a(gt,"install");const mt=`@scope (:has(> [data-rat="1y2oflm"])) to (:scope > :not([data-rat="1y2oflm"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function J(e,t){return $t.call({props:e},e,t)}a(J,"SettingsRatHtml");function $t(e,t){we("1y2oflm",mt);let n=z({...dt()}),l=z([]);const r=g(()=>N.value);pt().then(s=>{l.value=s});function o(s,i){const f=i.detail?.value??i.target.value;n.value={...n.value,[s]:f},ft(s,f)}a(o,"change");async function c(){await gt()&&F.success(`${e.name??"the app"} is installed`)}return a(c,"installApp"),u`
    <div.settings data-rat="1y2oflm">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${h(s=>o("palette",s))}>
            ${x(()=>l.value,s=>s,s=>u`<input-option value=${()=>s}>${()=>s}</input-option>`)}
          </input-value>
        </label>
        ${x(()=>Object.keys(_),s=>s,s=>u`
            <label>
              <span>${()=>s}</span>
              <input-value look="segments" value=${()=>n.value[s]??""} onchange=${h(i=>o(s,i))}>
                ${x(()=>_[s],i=>i,i=>u`<input-option value=${()=>i}>${()=>i}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${m(()=>!ve,()=>u`
          <section>
            <h3>install</h3>
            ${m(()=>r.value,()=>u`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${h(c)} />`,()=>u`
                ${m(()=>vt,()=>u`<p.hint>Share, then "Add to Home Screen".</p>`,()=>u`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a($t,"$$SettingsRatHtml");function Et(e,t){return ht.call({props:e},e,t)}a(Et,"AppRatHtml");function ht(e,t){const n={artists:"Artists",genres:"Genres",releases:"Releases",tracks:"Tracks"},l={artists:"No artists yet",genres:"Add a folder in the settings",releases:"Pick an artist",tracks:"Pick a release"};RAT.app.hold(je().catch(F.error)),RAT.app.commands.assign({"clear-selection":et,next:a(()=>p.next(),"next"),previous:a(()=>p.previous(),"previous"),"toggle-play":a(()=>p.toggle(),"toggle-play")});let r=z(0),o=null;const c=a(()=>o&&o.scrollWidth>o.clientWidth,"narrow"),s=a(d=>o?.children[d]?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"}),"show");function i(d){o=d;const A=a(()=>{r.value=Math.round(d.scrollLeft/Math.max(1,d.clientWidth))},"onScroll");return d.addEventListener("scroll",A,{passive:!0}),()=>d.removeEventListener("scroll",A)}a(i,"panels");function f(d,A,j){if(d==="tracks"&&j==="one"){const Q=Ge.value;p.play(Q,Q.findIndex(ge=>ge.key===A));return}j==="one"&&c()&&s(k.indexOf(d)+1)}return a(f,"picked"),u`
    <rat-area name="main">
      <div.noisy>
        <${lt} />
        <nav.tabs>
          ${x(()=>k,d=>d,d=>u`<button class:active=${()=>r.value===k.indexOf(d)} onclick=${h(()=>s(k.indexOf(d)))}>${()=>n[d]}</button>`)}
        </nav>
        <div.panels ref=${te(i)}>
          ${x(()=>k,d=>d,d=>u`<${ot} ...${{get name(){return d},get title(){return n[d]},get empty(){return l[d]},onpick:a((A,j)=>f(d,A,j),"onpick")}} />`)}
        </div>
        <${ct} />
      </div>
    </rat-area>
    <rat-area name="config" dock="end"><${J} name="noisy"><${nt} /></${J}></rat-area>
  `}a(ht,"$$AppRatHtml");export{Et as default};
