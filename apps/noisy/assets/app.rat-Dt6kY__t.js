var xe=Object.defineProperty;var r=(e,t)=>xe(e,"name",{value:t,configurable:!0});import{P as Re,Q as v,T as I,V as ne,W as Ee,X as O,Y as Se,Z as ie,a0 as Te,f as S,w as h,h as d,a1 as z,a2 as ce,a3 as U,a4 as Me,a5 as He}from"./index-CUevBhav.js";import{p as Pe,a as Le}from"./keys-CWTtq0D5.js";import{parseBlob as Ie,parseBuffer as Ue}from"https://esm.sh/music-metadata@11.16.1";import Ce from"./index-DIlYw3RB.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function je(e,t){const n={};for(const a of Object.keys(t)){const l=e?.[a],s=t[a];n[a]=Re(l)?l:v(()=>e[a]===void 0&&s?s():e[a])}return new Proxy(e??{},{get:r((a,l)=>Object.hasOwn(n,l)?n[l]:a[l],"get")})}r(je,"signalsOf");function w(e,{keys:t=null,prevent:n=!1,times:a=0}={}){const l=t?Pe(t):null;let s=a;return function(i){if(!(a&&!s)&&!(l&&!Le(i,l))){n&&i.preventDefault(),a&&s--;try{const o=(typeof e=="string"?I(e):e).call(this,i);typeof o?.catch=="function"&&o.catch(c=>ne(this,c,"handler"))}catch(o){ne(this,o,"handler")}}}}r(w,"listener");const F=r(e=>(t,n)=>Ee.notify(t,{...n,type:e}),"notify"),B=Object.assign(F("info"),{error:F("error"),info:F("info"),success:F("success")}),Z=65536,ue=1<<20,K=1<<25,qe=3,H=r(()=>RAT.app.database,"db"),R=r(()=>RAT.app.folders,"folders"),Fe=r((e,t)=>`${e}/${t}`,"keyOf"),M={artist:"Unknown artist",genre:"Unknown genre",release:"Unknown release"},$=O([]),fe=O(0),De=r(e=>$.value.find(t=>t.key===e)??null,"trackByKey");async function Ne(){$.value=await H().tracks.values(),await R().load()}r(Ne,"load");const J=new Map;Se(()=>{for(const[e,t]of Object.entries(R().trees.value))J.get(e)!==t&&(J.set(e,t),ze(e,t))});const de=r(e=>e?e.kind==="file"?[e]:(e.children??[]).flatMap(de):[],"filesOf"),We=r(e=>e.replace(/\.[^.]+$/,"").replace(/[_]+/g," ").replace(/\s+/g," ").trim(),"titleOf");async function ze(e,t){const n=new Map($.value.filter(i=>i.sourceId===e).map(i=>[i.key,i])),a=await Promise.all(de(t).map(async i=>{const o=Fe(e,i.path),c=await i.entry.info(),u=`${c?.size}:${c?.modified}`,f=n.get(o);return f?.sig===u?f:{artist:M.artist,cover:null,covered:!1,disc:null,duration:null,genres:[M.genre],key:o,name:i.name,no:null,path:i.path,release:M.release,sig:u,sourceId:e,tagged:!1,title:We(i.name),year:null}})),l=[...n.keys()].filter(i=>!a.some(o=>o.key===i)),s=a.filter(i=>n.get(i.key)!==i);await Promise.all([...l.map(i=>H().tracks.delete(i)),...s.map(i=>H().tracks.set(i.key,i))]),$.value=[...$.value.filter(i=>i.sourceId!==e),...a],Be(a)}r(ze,"sync");const W=new Map;let ae=null;function pe(e){W.set(e.key,e),ae??=requestAnimationFrame(()=>{ae=null;const t=new Map(W);W.clear(),$.value=$.value.map(n=>t.get(n.key)?.sig===n.sig?t.get(n.key):n)})}r(pe,"settle");const L=[],V=[];let D=0;function Be(e){L.push(...e.filter(t=>!t.tagged)),V.push(...e.filter(t=>t.tagged&&t.covered===!1)),ge()}r(Be,"enqueue");function ge(){for(fe.value=L.length+D;D<qe&&(L.length||V.length);){const[e,t]=L.length?[Ze,L.shift()]:[Je,V.shift()];D++,e(t).finally(()=>{D--,ge()})}}r(ge,"pump");const ve=r(e=>{const t=W.get(e.key)??De(e.key);return!t||t.sig!==e.sig?null:t},"stale"),A=r(async(e,t,n)=>new Uint8Array(await(await e.slice(t,n)).arrayBuffer()),"bytesOf"),T=r(e=>String.fromCharCode(...e),"ascii"),ee=r((e,t)=>(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0,"u32le"),Ve=new Set(["fmt ","LIST","id3 ","ID3 "]);async function Ke(e,t){const n=[];let a=0,l=0;for(let u=12;u+8<=t;){const f=await A(e,u,u+8),y=T(f.subarray(0,4)),m=ee(f,4);if(y==="data")a=m;else if(Ve.has(y)&&m<=K){const E=await A(e,u+8,u+8+m+(m&1));y==="fmt "&&(l=ee(E,8)),n.push(f,E)}u+=8+m+(m&1)}const s=n.reduce((u,f)=>u+f.length,0)+12+8,i=new Uint8Array(s),o=new DataView(i.buffer);i.set([..."RIFF"].map(u=>u.charCodeAt(0)),0),o.setUint32(4,s-8,!0),i.set([..."WAVE"].map(u=>u.charCodeAt(0)),8);let c=12;for(const u of n)i.set(u,c),c+=u.length;return i.set([..."data"].map(u=>u.charCodeAt(0)),c),{bytes:i,duration:l?a/l:null,size:s}}r(Ke,"wavOf");const re={OpusHead:2,"vorbis":3};async function Ge(e,t,n){const a=r(async b=>b+27<=n.length?n.subarray(b):A(e,b,Math.min(t,b+27+255)),"page"),l=n.subarray(27+n[26]),s=Object.keys(re).find(b=>T(l.subarray(0,b.length))===b);if(!s)return{bytes:n.subarray(0,Math.min(t,ue)),duration:void 0,size:t};let i=0,o=0;for(;o<re[s]&&i<t;){const b=await a(i),X=b.subarray(27,27+b[26]);for(const Y of X)Y<255&&o++;i+=27+X.length+X.reduce((Y,Oe)=>Y+Oe,0)}if(i=Math.min(t,i+Z),i>K)throw new Error(`tags of ${i} bytes`);const c=await A(e,Math.max(0,t-65536),t),u=T(c).lastIndexOf("OggS"),f=new DataView(c.buffer,c.byteOffset),y=u<0?0:Number(f.getBigUint64(u+6,!0)),m=s==="OpusHead"?48e3:ee(l,12),E=s==="OpusHead"?l[10]|l[11]<<8:0;return{bytes:await A(e,0,i),duration:y&&m?(y-E)/m:void 0,size:t}}r(Ge,"oggOf");async function Xe(e,t){const n=[];for(let s=0;s+8<=t;){const i=await A(e,s,s+16);let o=(i[0]<<24|i[1]<<16|i[2]<<8|i[3])>>>0;if(o===1&&(o=Number(new DataView(i.buffer,i.byteOffset).getBigUint64(8))),o===0&&(o=t-s),o<8)break;const c=T(i.subarray(4,8));if(c==="mdat")n.push(Uint8Array.of(0,0,0,8,109,100,97,116));else{if(o>K)throw new Error(`${c} of ${o} bytes`);n.push(await A(e,s,s+o))}s+=o}const a=new Uint8Array(n.reduce((s,i)=>s+i.length,0));let l=0;for(const s of n)a.set(s,l),l+=s.length;return{bytes:a,duration:void 0,size:a.length}}r(Xe,"mp4Of");async function Ye(e,t){const n=await A(e,0,Math.min(t,65536)),a=T(n.subarray(0,4));let l=ue;if(a==="RIFF"&&T(n.subarray(8,12))==="WAVE")return Ke(e,t);if(a==="OggS")return Ge(e,t,n);if(T(n.subarray(4,8))==="ftyp")return Xe(e,t);if(a==="fLaC")for(let s=4;s<t;){const i=s+4<=n.length?n.subarray(s,s+4):await A(e,s,s+4);if(s+=4+(i[1]<<16|i[2]<<8|i[3]),i[0]&128){l=s+Z;break}}if(a.startsWith("ID3")&&(l=10+(n[5]&16?10:0)+((n[6]&127)<<21|(n[7]&127)<<14|(n[8]&127)<<7|n[9]&127)+Z),l=Math.min(t,l),l>K)throw new Error(`tags of ${l} bytes`);return{bytes:l<=n.length?n.subarray(0,l):await A(e,0,l),duration:void 0,size:t}}r(Ye,"partOf");const _e=/[\u00c2-\u00f4][\u0080-\u00bf]/,se=r(e=>{if(typeof e!="string"||!_e.test(e)||/[^\u0000-\u00ff]/.test(e))return e;try{return new TextDecoder("utf-8",{fatal:!0}).decode(Uint8Array.from(e,t=>t.charCodeAt(0)))}catch{return e}},"utf8"),Qe=["album","albumartist","artist","title"];async function me(e,t){const n=R().nodeAt(e.sourceId,e.path)?.entry;if(!n)throw new Error(`${e.name} is no longer in its folder`);const a={duration:!1,skipCovers:t,skipPostHeaders:!0};let l;if(!n.handle.readSlice)l=await Ie(await n.read("blob"),a);else{const{size:o=0,type:c}=await n.info()??{},u=await Ye(n,o);l=await Ue(u.bytes,{mimeType:c,size:u.size},a),u.duration!==void 0&&(l.format.duration=u.duration),!l.format.duration&&l.format.bitrate&&(l.format.duration=o*8/l.format.bitrate)}const{common:s,format:i}=l;if(i.container==="WAVE"){for(const o of Qe)s[o]=se(s[o]);s.genre=s.genre?.map(se)}return l}r(me,"parse");async function Ze(e){const t=ve(e);if(!t||t.tagged)return;let n={...t,tagged:!0};try{const{common:a,format:l}=await me(t,!0);n={...n,artist:a.albumartist||a.artist||M.artist,disc:a.disk?.no??null,duration:l.duration??null,genres:a.genre?.length?a.genre:[M.genre],no:a.track?.no??null,release:a.album||M.release,title:a.title||t.title,year:a.year??null}}catch{n.covered=!0}await H().tracks.set(n.key,n),pe(n),n.covered||V.push(n)}r(Ze,"tag");async function Je(e){const t=ve(e);if(!t||t.covered)return;let n=null;try{const l=(await me(t,!1)).common.picture?.[0];l&&(n=`${t.key}:${t.sig}`,await RAT.app.thumbnails.requestFile(n,()=>new Blob([l.data],{type:l.format})))}catch{}const a={...t,cover:n,covered:!0};await H().tracks.set(a.key,a),pe(a)}r(Je,"cover");async function et(e){if(R().perms.value[e.sourceId]!=="granted")throw new Error("Reconnect the folder of this track in the settings first.");const t=R().nodeAt(e.sourceId,e.path)?.entry;if(!t)throw new Error(`${e.name} is no longer in its folder`);return t.url()}r(et,"urlOf");async function tt(){if(!("showDirectoryPicker"in globalThis))throw new Error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");return R().add()}r(tt,"addFolder");const nt=r(()=>Promise.all(R().sources.value.map(e=>R().scan(e.id))),"rescanAll");async function at(e){const t=$.value.filter(n=>n.sourceId===e).map(n=>n.key);await R().remove(e),await Promise.all(t.map(n=>H().tracks.delete(n))),$.value=$.value.filter(n=>n.sourceId!==e),J.delete(e)}r(at,"removeFolder");const x=["genres","artists","releases","tracks"],k=Object.fromEntries(x.map(e=>[e,new Te])),N={},j=r(e=>`${e.artist}\0${e.release}`,"releaseKey"),rt=r((e,t)=>e.label.localeCompare(t.label,void 0,{numeric:!0,sensitivity:"base"}),"byLabel");function _(e,t,n=a=>a){const a=new Map;for(const l of e)for(const s of t(l))a.set(s,(a.get(s)??0)+1);return[...a].map(([l,s])=>({count:s,key:l,label:n(l)})).sort(rt)}r(_,"groups");const he=v(()=>k.genres.size?$.value.filter(e=>e.genres.some(t=>k.genres.has(t))):$.value),te=v(()=>he.value.filter(e=>k.artists.has(e.artist))),ye=v(()=>te.value.filter(e=>k.releases.has(j(e)))),$e={genres:v(()=>_($.value,e=>e.genres)),artists:v(()=>_(he.value,e=>[e.artist])),releases:v(()=>k.artists.size?_(te.value,e=>[j(e)],e=>e.split("\0")[1]).map(e=>({...e,sub:ot(e.key)})):[]),tracks:v(()=>k.releases.size?ye.value.toSorted(be).map(e=>({cover:e.cover,key:e.key,label:e.title,sub:it(e)})):[])},st=v(()=>k.releases.size?ye.value.toSorted(be):[]);function ot(e){const t=te.value.find(n=>j(n)===e);return[t?.artist,t?.year].filter(Boolean).join(" · ")}r(ot,"releaseInfo");const lt=r(e=>e==null?"":`${Math.floor(e/60)}:${String(Math.round(e%60)).padStart(2,"0")}`,"duration"),it=r(e=>[e.no&&String(e.no).padStart(2,"0"),lt(e.duration)].filter(Boolean).join(" · "),"trackInfo"),be=r((e,t)=>j(e).localeCompare(j(t))||(e.disc??0)-(t.disc??0)||(e.no??0)-(t.no??0)||e.title.localeCompare(t.title),"trackOrder"),ct=r((e,t,n="one")=>ie(()=>ut(e,t,n)),"pick");function ut(e,t,n){const a=k[e],l=$e[e].value.map(s=>s.key);if(n==="range"&&N[e]!=null){const[s,i]=[l.indexOf(N[e]),l.indexOf(t)].sort((o,c)=>o-c);a.clear();for(const o of l.slice(s,i+1))a.add(o)}else if(n==="toggle")a.has(t)?a.delete(t):a.add(t),N[e]=t;else{const s=a.size===1&&a.has(t);a.clear(),s||a.add(t),N[e]=t}for(const s of x.slice(x.indexOf(e)+1))k[s].clear()}r(ut,"pickIn");const ft=r(e=>e?.shiftKey?"range":e?.ctrlKey||e?.metaKey?"toggle":"one","modeOf"),dt=r(()=>ie(()=>{for(const e of x)k[e].clear()}),"clearSelection"),g=new Audio;g.preload="metadata";let Q=null;const p={duration:O(0),error:O(null),index:O(-1),playing:O(!1),queue:O([]),time:O(0),get track(){return p.queue.value[p.index.value]??null},play(e,t=0){return p.queue.value=e,p.at(t)},async at(e){const t=p.queue.value[e];if(t){p.index.value=e,p.error.value=null;try{const n=await et(t);if(p.index.value!==e)return URL.revokeObjectURL(n);Q&&URL.revokeObjectURL(Q),g.src=Q=n,await g.play(),pt(t)}catch(n){p.error.value=n}}},toggle(){p.track&&(g.paused?g.play():g.pause())},next(){p.index.value<p.queue.value.length-1&&p.at(p.index.value+1)},previous(){g.currentTime>3?g.currentTime=0:p.at(Math.max(0,p.index.value-1))},seek(e){g.currentTime=e}};g.addEventListener("durationchange",()=>{p.duration.value=g.duration||0});g.addEventListener("ended",()=>p.next());g.addEventListener("pause",()=>{p.playing.value=!1});g.addEventListener("play",()=>{p.playing.value=!0});g.addEventListener("timeupdate",()=>{p.time.value=g.currentTime||0});const P=navigator.mediaSession;function pt(e){P&&(P.metadata=new MediaMetadata({album:e.release,artist:e.artist,title:e.title}))}r(pt,"session");P?.setActionHandler("nexttrack",()=>p.next());P?.setActionHandler("pause",()=>g.pause());P?.setActionHandler("play",()=>g.play());P?.setActionHandler("previoustrack",()=>p.previous());function gt(e,t){return vt.call({props:e},e,t)}r(gt,"FoldersRatHtml");function vt(e,t){const n=RAT.app.folders,a=v(()=>n.sources.value),l=v(()=>n.perms.value),s=v(()=>fe.value);async function i(){try{const o=await tt();o&&B.success(`Added ${o.name}`)}catch(o){B.error(o)}}return r(i,"add"),d`
    <section.folders>
      <h3>folders</h3>
      ${S(()=>a.value,o=>o,o=>d`
          <div.folder>
            <span>${()=>o.name}</span>
            ${h(()=>l.value[o.id]!=="granted",()=>d`<btn-push label="Reconnect" onclick=${w(()=>n.reconnect(o.id))} />`)}
            <btn-icon icon="delete" label="Remove" onclick=${w(()=>at(o.id))} />
          </div>
        `)}
      <div.folder-actions>
        <btn-push icon="folder-add" label="Add a folder" onclick=${w(i)} />
        ${h(()=>a.value.length,()=>d`<btn-push icon="refresh" label="Rescan" onclick=${w(nt)} />`)}
      </div>
      ${h(()=>s.value,()=>d`<p.hint>${()=>s.value} files left to read</p>`)}
    </section>
  `}r(vt,"$$FoldersRatHtml");function mt(e,t){return ht.call({props:e},e,t)}r(mt,"MenuRatHtml");function ht(e,t){return d`
    <nav.menu>
      <span.menu-brand>noisy</span>
      <btn-icon icon="settings" label="Settings" onclick=${I("rat:toggle[config]")} />
    </nav>
  `}r(ht,"$$MenuRatHtml");function we(e,t){return yt.call({props:e},e,t)}r(we,"CoverRatHtml");function yt(e,t){let n=z(null);return e.id&&RAT.app.thumbnails.requestFile(e.id,()=>null).then(a=>{n.value=a}).catch(()=>{}),d`<span.cover style:background-image=${()=>n.value?`url("${n.value}")`:null}>${h(()=>!n.value,()=>d`<svg-icon icon="audio" />`)}</span>`}r(yt,"$$CoverRatHtml");function $t(e,t){return bt.call({props:e},e,t)}r($t,"PanelRatHtml");function bt(e,t){const n=e.name,a=k[n],l=v(()=>$e[n].value),s=v(()=>a.size);function i(c,u){ct(n,c,u),e.onpick?.(c,u)}r(i,"choose");const o=r(c=>c?.closest?.("[data-key]")?.dataset.key,"keyAt");return d`
    <section.panel data-panel=${()=>n}>
      <header.panel-head>
        <h2>${()=>e.title}</h2>
        <span.panel-count>${()=>s.value?`${s.value} / ${l.value.length}`:l.value.length}</span>
        ${h(()=>s.value,()=>d`<btn-icon icon="close" label="Clear" onclick=${w(()=>a.clear())} />`)}
      </header>
      ${h(()=>l.value.length,()=>d`
          <data-index.panel-list viewmode="list" item-size="2.75rem" gap="0" ref=${ce(Ce,()=>({onLongPress:r(c=>{const u=o(c.target);u&&i(u,"toggle")},"onLongPress")}))}>
            ${S(()=>l.value,c=>c,c=>d`
                <data-item.row data-key=${()=>c.key} class:picked=${()=>a.has(c.key)} onclick=${w(u=>i(c.key,ft(u)))}>
                  ${h(()=>c.cover!==void 0,()=>d`<${we} ...${{get id(){return c.cover}}} />`)}
                  <span.row-label>${()=>c.label}</span>
                  <span.row-sub>${()=>c.sub??c.count}</span>
                </data-item>
              `)}
          </data-index>
        `,()=>d`<p.panel-empty>${()=>e.empty}</p>`)}
    </section>
  `}r(bt,"$$PanelRatHtml");function wt(e,t){return kt.call({props:e},e,t)}r(wt,"PlayerRatHtml");function kt(e,t){let{duration:n,error:a,index:l,playing:s,queue:i,time:o}=je(p,{duration:null,error:null,index:null,playing:null,queue:null,time:null});const c=v(()=>i.value[l.value]??null),u=r(f=>`${Math.floor(f/60)}:${String(Math.floor(f%60)).padStart(2,"0")}`,"clock");return d`
    <aside.player class:idle=${()=>!c.value}>
      ${h(()=>c.value,()=>d`
          <${we} ...${{get id(){return c.value.cover}}} />
          <div.player-now>
            <span.player-title>${()=>c.value.title}</span>
            <span.player-artist>${()=>c.value.artist}</span>
          </div>
        `,()=>d`<span.player-title>Player</span>`)}
      <div.player-controls>
        <btn-icon icon="skip-previous" label="Previous" onclick=${I("previous")} />
        <btn-icon icon=${()=>s.value?"pause":"play"} label=${()=>s.value?"Pause":"Play"} onclick=${I("toggle-play")} />
        <btn-icon icon="skip-next" label="Next" onclick=${I("next")} />
      </div>
      ${h(()=>c.value,()=>d`<input.player-seek type="range" min="0" max=${()=>n.value||0} step="1" value=${()=>o.value} oninput=${w(f=>p.seek(Number(f.target.value)))} aria-label="Position" />`)}
      ${h(()=>c.value,()=>d`<span.player-time>${()=>u(o.value)} / ${()=>u(n.value)}</span>`)}
      ${h(()=>a.value,()=>d`<span.player-error>${()=>a.value.message}</span>`)}
    </aside>
  `}r(kt,"$$PlayerRatHtml");const q=Me("appearance",{}),oe={density:U.densities,geometry:U.geometries,mode:U.modes},At=r(()=>q.value,"appearance"),Ot=r(()=>U.palettes().catch(()=>[]),"palettes");function ke(e){const t=document.querySelector("rat-app");for(const[n,a]of Object.entries(e))a?t?.setAttribute(n,a):t?.removeAttribute(n);return U.set(e)}r(ke,"apply");function xt(e,t){return q.value={...q.value,[e]:t||null},ke({[e]:t||null})}r(xt,"setAppearance");Object.keys(q.value).length&&ke(q.value);let C=null;const G=O(!1),Ae=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Rt=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Ae;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),C=e,G.value=!0});addEventListener("appinstalled",()=>{C=null,G.value=!1});async function Et(){if(!C)return!1;const e=C;return C=null,G.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}r(Et,"install");const St=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function le(e,t){return Tt.call({props:e},e,t)}r(le,"SettingsRatHtml");function Tt(e,t){He("177zzh1",St);let n=z({...At()}),a=z([]);const l=v(()=>G.value);Ot().then(o=>{a.value=o});function s(o,c){const u=c.detail?.value??c.target.value;n.value={...n.value,[o]:u},xt(o,u)}r(s,"change");async function i(){await Et()&&B.success(`${e.name??"the app"} is installed`)}return r(i,"installApp"),d`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${w(o=>s("palette",o))}>
            ${S(()=>a.value,o=>o,o=>d`<input-option value=${()=>o}>${()=>o}</input-option>`)}
          </input-value>
        </label>
        ${S(()=>Object.keys(oe),o=>o,o=>d`
            <label>
              <span>${()=>o}</span>
              <input-value look="segments" value=${()=>n.value[o]??""} onchange=${w(c=>s(o,c))}>
                ${S(()=>oe[o],c=>c,c=>d`<input-option value=${()=>c}>${()=>c}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${h(()=>!Ae,()=>d`
          <section>
            <h3>install</h3>
            ${h(()=>l.value,()=>d`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${w(i)} />`,()=>d`
                ${h(()=>Rt,()=>d`<p.hint>Share, then "Add to Home Screen".</p>`,()=>d`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}r(Tt,"$$SettingsRatHtml");function Ft(e,t){return Mt.call({props:e},e,t)}r(Ft,"AppRatHtml");function Mt(e,t){const n={artists:"Artists",genres:"Genres",releases:"Releases",tracks:"Tracks"},a={artists:"No artists yet",genres:"Add a folder in the settings",releases:"Pick an artist",tracks:"Pick a release"};RAT.app.hold(Ne().catch(B.error)),RAT.app.commands.assign({"clear-selection":dt,next:r(()=>p.next(),"next"),previous:r(()=>p.previous(),"previous"),"toggle-play":r(()=>p.toggle(),"toggle-play")});let l=z(0),s=null;const i=r(()=>s&&s.scrollWidth>s.clientWidth,"narrow"),o=r(f=>s?.children[f]?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"}),"show");function c(f){s=f;const y=r(()=>{l.value=Math.round(f.scrollLeft/Math.max(1,f.clientWidth))},"onScroll");return f.addEventListener("scroll",y,{passive:!0}),()=>f.removeEventListener("scroll",y)}r(c,"panels");function u(f,y,m){if(f==="tracks"&&m==="one"){const E=st.value;p.play(E,E.findIndex(b=>b.key===y));return}m==="one"&&i()&&o(x.indexOf(f)+1)}return r(u,"picked"),d`
    <rat-area name="main">
      <div.noisy>
        <${mt} />
        <nav.tabs>
          ${S(()=>x,f=>f,f=>d`<button class:active=${()=>l.value===x.indexOf(f)} onclick=${w(()=>o(x.indexOf(f)))}>${()=>n[f]}</button>`)}
        </nav>
        <div.panels ref=${ce(c)}>
          ${S(()=>x,f=>f,f=>d`<${$t} ...${{get name(){return f},get title(){return n[f]},get empty(){return a[f]},onpick:r((y,m)=>u(f,y,m),"onpick")}} />`)}
        </div>
        <${wt} />
      </div>
    </rat-area>
    <rat-area name="config" dock="end"><${le} name="noisy"><${gt} /></${le}></rat-area>
  `}r(Mt,"$$AppRatHtml");export{Ft as default};
