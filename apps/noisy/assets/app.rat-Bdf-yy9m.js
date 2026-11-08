var Me=Object.defineProperty;var r=(e,n)=>Me(e,"name",{value:n,configurable:!0});import{P as Pe,Q as g,T as U,V as oe,W as Le,X as R,Y as de,Z as pe,a0 as ze,f as M,w as v,h as f,a1 as V,a2 as fe,a3 as ae,a4 as I,a5 as Ce}from"./index-BFeDUHpP.js";import{p as He,a as Ue}from"./keys-CWTtq0D5.js";import{parseBlob as Ie,parseBuffer as je}from"https://esm.sh/music-metadata@11.16.1";import qe from"./index-DIlYw3RB.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function me(e,n){const t={};for(const a of Object.keys(n)){const l=e?.[a],o=n[a];t[a]=Pe(l)?l:g(()=>e[a]===void 0&&o?o():e[a])}return new Proxy(e??{},{get:r((a,l)=>Object.hasOwn(t,l)?t[l]:a[l],"get")})}r(me,"signalsOf");function w(e,{keys:n=null,prevent:t=!1,times:a=0}={}){const l=n?He(n):null;let o=a;return function(s){if(!(a&&!o)&&!(l&&!Ue(s,l))){t&&s.preventDefault(),a&&o--;try{const i=(typeof e=="string"?U(e):e).call(this,s);typeof i?.catch=="function"&&i.catch(c=>oe(this,c,"handler"))}catch(i){oe(this,i,"handler")}}}}r(w,"listener");const N=r(e=>(n,t)=>Le.notify(n,{...t,type:e}),"notify"),K=Object.assign(N("info"),{error:N("error"),info:N("info"),success:N("success")}),ee=65536,ge=1<<20,Y=1<<25,Fe=3,C=r(()=>RAT.app.database,"db"),S=r(()=>RAT.app.folders,"folders"),Ne=r((e,n)=>`${e}/${n}`,"keyOf"),z={artist:"Unknown artist",genre:"Unknown genre",release:"Unknown release"},b=R([]),ye=R(0),De=r(e=>b.value.find(n=>n.key===e)??null,"trackByKey");async function We(){b.value=await C().tracks.values(),await S().load()}r(We,"load");const ne=new Map;de(()=>{for(const[e,n]of Object.entries(S().trees.value))ne.get(e)!==n&&(ne.set(e,n),Ve(e,n))});const ve=r(e=>e?e.kind==="file"?[e]:(e.children??[]).flatMap(ve):[],"filesOf"),Be=r(e=>e.replace(/\.[^.]+$/,"").replace(/[_]+/g," ").replace(/\s+/g," ").trim(),"titleOf");async function Ve(e,n){const t=new Map(b.value.filter(s=>s.sourceId===e).map(s=>[s.key,s])),a=await Promise.all(ve(n).map(async s=>{const i=Ne(e,s.path),c=await s.entry.info(),u=`${c?.size}:${c?.modified}`,d=t.get(i);return d?.sig===u?d:{artist:z.artist,cover:null,covered:!1,disc:null,duration:null,genres:[z.genre],key:i,name:s.name,no:null,path:s.path,release:z.release,sig:u,sourceId:e,tagged:!1,title:Be(s.name),year:null}})),l=[...t.keys()].filter(s=>!a.some(i=>i.key===s)),o=a.filter(s=>t.get(s.key)!==s);await Promise.all([...l.map(s=>C().tracks.delete(s)),...o.map(s=>C().tracks.set(s.key,s))]),b.value=[...b.value.filter(s=>s.sourceId!==e),...a],Ke(a)}r(Ve,"sync");const B=new Map;let le=null;function he(e){B.set(e.key,e),le??=requestAnimationFrame(()=>{le=null;const n=new Map(B);B.clear(),b.value=b.value.map(t=>n.get(t.key)?.sig===t.sig?n.get(t.key):t)})}r(he,"settle");const H=[],G=[];let D=0;function Ke(e){H.push(...e.filter(n=>!n.tagged)),G.push(...e.filter(n=>n.tagged&&n.covered===!1)),be()}r(Ke,"enqueue");function be(){for(ye.value=H.length+D;D<Fe&&(H.length||G.length);){const[e,n]=H.length?[en,H.shift()]:[nn,G.shift()];D++,e(n).finally(()=>{D--,be()})}}r(be,"pump");const $e=r(e=>{const n=B.get(e.key)??De(e.key);return!n||n.sig!==e.sig?null:n},"stale"),A=r(async(e,n,t)=>new Uint8Array(await(await e.slice(n,t)).arrayBuffer()),"bytesOf"),P=r(e=>String.fromCharCode(...e),"ascii"),te=r((e,n)=>(e[n]|e[n+1]<<8|e[n+2]<<16|e[n+3]<<24)>>>0,"u32le"),Ge=new Set(["fmt ","LIST","id3 ","ID3 "]);async function Ye(e,n){const t=[];let a=0,l=0;for(let u=12;u+8<=n;){const d=await A(e,u,u+8),h=P(d.subarray(0,4)),y=te(d,4);if(h==="data")a=y;else if(Ge.has(h)&&y<=Y){const T=await A(e,u+8,u+8+y+(y&1));h==="fmt "&&(l=te(T,8)),t.push(d,T)}u+=8+y+(y&1)}const o=t.reduce((u,d)=>u+d.length,0)+12+8,s=new Uint8Array(o),i=new DataView(s.buffer);s.set([..."RIFF"].map(u=>u.charCodeAt(0)),0),i.setUint32(4,o-8,!0),s.set([..."WAVE"].map(u=>u.charCodeAt(0)),8);let c=12;for(const u of t)s.set(u,c),c+=u.length;return s.set([..."data"].map(u=>u.charCodeAt(0)),c),{bytes:s,duration:l?a/l:null,size:o}}r(Ye,"wavOf");const se={OpusHead:2,"vorbis":3};async function Xe(e,n,t){const a=r(async $=>$+27<=t.length?t.subarray($):A(e,$,Math.min(n,$+27+255)),"page"),l=t.subarray(27+t[26]),o=Object.keys(se).find($=>P(l.subarray(0,$.length))===$);if(!o)return{bytes:t.subarray(0,Math.min(n,ge)),duration:void 0,size:n};let s=0,i=0;for(;i<se[o]&&s<n;){const $=await a(s),_=$.subarray(27,27+$[26]);for(const Q of _)Q<255&&i++;s+=27+_.length+_.reduce((Q,Te)=>Q+Te,0)}if(s=Math.min(n,s+ee),s>Y)throw new Error(`tags of ${s} bytes`);const c=await A(e,Math.max(0,n-65536),n),u=P(c).lastIndexOf("OggS"),d=new DataView(c.buffer,c.byteOffset),h=u<0?0:Number(d.getBigUint64(u+6,!0)),y=o==="OpusHead"?48e3:te(l,12),T=o==="OpusHead"?l[10]|l[11]<<8:0;return{bytes:await A(e,0,s),duration:h&&y?(h-T)/y:void 0,size:n}}r(Xe,"oggOf");async function _e(e,n){const t=[];for(let o=0;o+8<=n;){const s=await A(e,o,o+16);let i=(s[0]<<24|s[1]<<16|s[2]<<8|s[3])>>>0;if(i===1&&(i=Number(new DataView(s.buffer,s.byteOffset).getBigUint64(8))),i===0&&(i=n-o),i<8)break;const c=P(s.subarray(4,8));if(c==="mdat")t.push(Uint8Array.of(0,0,0,8,109,100,97,116));else{if(i>Y)throw new Error(`${c} of ${i} bytes`);t.push(await A(e,o,o+i))}o+=i}const a=new Uint8Array(t.reduce((o,s)=>o+s.length,0));let l=0;for(const o of t)a.set(o,l),l+=o.length;return{bytes:a,duration:void 0,size:a.length}}r(_e,"mp4Of");async function Qe(e,n){const t=await A(e,0,Math.min(n,65536)),a=P(t.subarray(0,4));let l=ge;if(a==="RIFF"&&P(t.subarray(8,12))==="WAVE")return Ye(e,n);if(a==="OggS")return Xe(e,n,t);if(P(t.subarray(4,8))==="ftyp")return _e(e,n);if(a==="fLaC")for(let o=4;o<n;){const s=o+4<=t.length?t.subarray(o,o+4):await A(e,o,o+4);if(o+=4+(s[1]<<16|s[2]<<8|s[3]),s[0]&128){l=o+ee;break}}if(a.startsWith("ID3")&&(l=10+(t[5]&16?10:0)+((t[6]&127)<<21|(t[7]&127)<<14|(t[8]&127)<<7|t[9]&127)+ee),l=Math.min(n,l),l>Y)throw new Error(`tags of ${l} bytes`);return{bytes:l<=t.length?t.subarray(0,l):await A(e,0,l),duration:void 0,size:n}}r(Qe,"partOf");const Ze=/[\u00c2-\u00f4][\u0080-\u00bf]/,ie=r(e=>{if(typeof e!="string"||!Ze.test(e)||/[^\u0000-\u00ff]/.test(e))return e;try{return new TextDecoder("utf-8",{fatal:!0}).decode(Uint8Array.from(e,n=>n.charCodeAt(0)))}catch{return e}},"utf8"),Je=["album","albumartist","artist","title"];async function we(e,n){const t=S().nodeAt(e.sourceId,e.path)?.entry;if(!t)throw new Error(`${e.name} is no longer in its folder`);const a={duration:!1,skipCovers:n,skipPostHeaders:!0};let l;if(!t.handle.readSlice)l=await Ie(await t.read("blob"),a);else{const{size:i=0,type:c}=await t.info()??{},u=await Qe(t,i);l=await je(u.bytes,{mimeType:c,size:u.size},a),u.duration!==void 0&&(l.format.duration=u.duration),!l.format.duration&&l.format.bitrate&&(l.format.duration=i*8/l.format.bitrate)}const{common:o,format:s}=l;if(s.container==="WAVE"){for(const i of Je)o[i]=ie(o[i]);o.genre=o.genre?.map(ie)}return l}r(we,"parse");async function en(e){const n=$e(e);if(!n||n.tagged)return;let t={...n,tagged:!0};try{const{common:a,format:l}=await we(n,!0);t={...t,artist:a.albumartist||a.artist||z.artist,disc:a.disk?.no??null,duration:l.duration??null,genres:a.genre?.length?a.genre:[z.genre],no:a.track?.no??null,release:a.album||z.release,title:a.title||n.title,year:a.year??null}}catch{t.covered=!0}await C().tracks.set(t.key,t),he(t),t.covered||G.push(t)}r(en,"tag");async function nn(e){const n=$e(e);if(!n||n.covered)return;let t=null;try{const l=(await we(n,!1)).common.picture?.[0];l&&(t=`${n.key}:${n.sig}`,await RAT.app.thumbnails.requestFile(t,()=>new Blob([l.data],{type:l.format})))}catch{}const a={...n,cover:t,covered:!0};await C().tracks.set(a.key,a),he(a)}r(nn,"cover");async function tn(e){if(S().perms.value[e.sourceId]!=="granted")throw new Error("Reconnect the folder of this track in the settings first.");const n=await S().entryAt(e.sourceId,e.path);if(!n)throw new Error(`${e.name} is no longer in its folder`);return n.url()}r(tn,"urlOf");async function an(){if(!("showDirectoryPicker"in globalThis))throw new Error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");return S().add()}r(an,"addFolder");const rn=r(()=>Promise.all(S().sources.value.map(e=>S().scan(e.id))),"rescanAll");async function on(e){const n=b.value.filter(t=>t.sourceId===e).map(t=>t.key);await S().remove(e),await Promise.all(n.map(t=>C().tracks.delete(t))),b.value=b.value.filter(t=>t.sourceId!==e),ne.delete(e)}r(on,"removeFolder");const E=["genres","artists","releases","tracks"],k=Object.fromEntries(E.map(e=>[e,new ze])),W={},q=r(e=>`${e.artist}\0${e.release}`,"releaseKey"),ln=r((e,n)=>e.label.localeCompare(n.label,void 0,{numeric:!0,sensitivity:"base"}),"byLabel");function Z(e,n,t=a=>a){const a=new Map;for(const l of e)for(const o of n(l))a.set(o,(a.get(o)??0)+1);return[...a].map(([l,o])=>({count:o,key:l,label:t(l)})).sort(ln)}r(Z,"groups");const ke=g(()=>k.genres.size?b.value.filter(e=>e.genres.some(n=>k.genres.has(n))):b.value),re=g(()=>ke.value.filter(e=>k.artists.has(e.artist))),xe=g(()=>re.value.filter(e=>k.releases.has(q(e)))),Ae={genres:g(()=>Z(b.value,e=>e.genres)),artists:g(()=>Z(ke.value,e=>[e.artist])),releases:g(()=>k.artists.size?Z(re.value,e=>[q(e)],e=>e.split("\0")[1]).map(e=>({...e,sub:cn(e.key)})):[]),tracks:g(()=>k.releases.size?xe.value.toSorted(Oe).map(e=>({cover:e.cover,key:e.key,label:e.title,sub:dn(e)})):[])},sn=g(()=>k.releases.size?xe.value.toSorted(Oe):[]);function cn(e){const n=re.value.find(t=>q(t)===e);return[n?.artist,n?.year].filter(Boolean).join(" · ")}r(cn,"releaseInfo");const un=r(e=>e==null?"":`${Math.floor(e/60)}:${String(Math.round(e%60)).padStart(2,"0")}`,"duration"),dn=r(e=>[e.no&&String(e.no).padStart(2,"0"),un(e.duration)].filter(Boolean).join(" · "),"trackInfo"),Oe=r((e,n)=>q(e).localeCompare(q(n))||(e.disc??0)-(n.disc??0)||(e.no??0)-(n.no??0)||e.title.localeCompare(n.title),"trackOrder"),pn=r((e,n,t="one")=>pe(()=>fn(e,n,t)),"pick");function fn(e,n,t){const a=k[e],l=Ae[e].value.map(o=>o.key);if(t==="range"&&W[e]!=null){const[o,s]=[l.indexOf(W[e]),l.indexOf(n)].sort((i,c)=>i-c);a.clear();for(const i of l.slice(o,s+1))a.add(i)}else if(t==="toggle")a.has(n)?a.delete(n):a.add(n),W[e]=n;else{const o=a.size===1&&a.has(n);a.clear(),o||a.add(n),W[e]=n}for(const o of E.slice(E.indexOf(e)+1))k[o].clear()}r(fn,"pickIn");const mn=r(e=>e?.shiftKey?"range":e?.ctrlKey||e?.metaKey?"toggle":"one","modeOf"),gn=r(()=>pe(()=>{for(const e of E)k[e].clear()}),"clearSelection"),m=new Audio;m.preload="metadata";let J=null;const p={duration:R(0),error:R(null),index:R(-1),playing:R(!1),queue:R([]),time:R(0),get track(){return p.queue.value[p.index.value]??null},play(e,n=0){return p.queue.value=e,p.at(n)},async at(e){const n=p.queue.value[e];if(n){p.index.value=e,p.error.value=null;try{const t=await tn(n);if(p.index.value!==e)return URL.revokeObjectURL(t);J&&URL.revokeObjectURL(J),m.src=J=t,await m.play(),hn(n)}catch(t){p.error.value=t}}},toggle(){p.track&&(m.paused?m.play():m.pause())},next(){p.index.value<p.queue.value.length-1&&p.at(p.index.value+1)},previous(){m.currentTime>3?m.currentTime=0:p.at(Math.max(0,p.index.value-1))},seek(e){m.currentTime=e}};m.addEventListener("durationchange",()=>{p.duration.value=m.duration||0});m.addEventListener("ended",()=>p.next());m.addEventListener("pause",()=>{p.playing.value=!1});m.addEventListener("play",()=>{p.playing.value=!0});m.addEventListener("timeupdate",()=>{p.time.value=m.currentTime||0});const x=globalThis.Capacitor?.isPluginAvailable?.("MediaSession")?globalThis.Capacitor.Plugins.MediaSession:null,L=x?null:navigator.mediaSession??null,O={action:r((e,n)=>{try{x?x.setActionHandler({action:e},n):L?.setActionHandler(e,n)}catch{}},"action"),metadata:r(e=>x?x.setMetadata(e):L&&(L.metadata=new MediaMetadata(e)),"metadata"),position:r(()=>{if(!m.duration||!Number.isFinite(m.duration))return;const e={duration:m.duration,playbackRate:m.playbackRate,position:Math.min(m.currentTime,m.duration)};x?x.setPositionState(e):L?.setPositionState?.(e)},"position"),state:r(e=>x?x.setPlaybackState({playbackState:e}):L&&(L.playbackState=e),"state")},yn=r(e=>new Promise((n,t)=>{const a=new FileReader;a.onload=()=>n(a.result),a.onerror=t,a.readAsDataURL(e)}),"dataUrl");async function vn(e){if(!e.cover)return[];try{const n=await RAT.app.thumbnails.requestFile(e.cover,()=>null);if(!n)return[];if(!x)return[{src:n}];const t=await(await fetch(n)).blob();return[{src:await yn(t),type:t.type}]}catch{return[]}}r(vn,"artworkOf");async function hn(e){const n={album:e.release,artist:e.artist,title:e.title};O.metadata(n);const t=await vn(e);t.length&&p.track===e&&O.metadata({...n,artwork:t})}r(hn,"session");m.addEventListener("play",()=>O.state("playing"));m.addEventListener("pause",()=>O.state(m.ended&&p.index.value>=p.queue.value.length-1?"none":"paused"));for(const e of["durationchange","play","pause","ratechange","seeked"])m.addEventListener(e,O.position);O.action("nexttrack",()=>p.next());O.action("pause",()=>m.pause());O.action("play",()=>m.play());O.action("previoustrack",()=>p.previous());O.action("seekto",e=>e?.seekTime!=null&&p.seek(e.seekTime));function bn(e,n){return $n.call({props:e},e,n)}r(bn,"FoldersRatHtml");function $n(e,n){const t=RAT.app.folders,a=g(()=>t.sources.value),l=g(()=>t.perms.value),o=g(()=>ye.value);async function s(){try{const i=await an();i&&K.success(`Added ${i.name}`)}catch(i){K.error(i)}}return r(s,"add"),f`
    <section.folders>
      <h3>folders</h3>
      ${M(()=>a.value,i=>i,i=>f`
          <div.folder>
            <span>${()=>i.name}</span>
            ${v(()=>l.value[i.id]!=="granted",()=>f`<btn-push label="Reconnect" onclick=${w(()=>t.reconnect(i.id))} />`)}
            <btn-icon icon="delete" label="Remove" onclick=${w(()=>on(i.id))} />
          </div>
        `)}
      <div.folder-actions>
        <btn-push icon="folder-add" label="Add a folder" onclick=${w(s)} />
        ${v(()=>a.value.length,()=>f`<btn-push icon="refresh" label="Rescan" onclick=${w(rn)} />`)}
      </div>
      ${v(()=>o.value,()=>f`<p.hint>${()=>o.value} files left to read</p>`)}
    </section>
  `}r($n,"$$FoldersRatHtml");function wn(e,n){return kn.call({props:e},e,n)}r(wn,"MenuRatHtml");function kn(e,n){return f`
    <nav.menu>
      <span.menu-brand>noisy</span>
      <btn-icon icon="settings" label="Settings" onclick=${U("rat:toggle[config]")} />
    </nav>
  `}r(kn,"$$MenuRatHtml");function Re(e,n){return xn.call({props:e},e,n)}r(Re,"CoverRatHtml");function xn(e,n){let{id:t}=me(this.props,{id:null}),a=V(null);return de(()=>{const l=t.value;let o=!0;return a.value=null,l&&RAT.app.thumbnails.requestFile(l,()=>null).then(s=>{o&&(a.value=s)}).catch(()=>{}),()=>{o=!1}}),f`<span.cover style:background-image=${()=>a.value?`url("${a.value}")`:null}>${v(()=>!a.value,()=>f`<svg-icon icon="audio" />`)}</span>`}r(xn,"$$CoverRatHtml");function An(e,n){return On.call({props:e},e,n)}r(An,"PanelRatHtml");function On(e,n){const t=e.name,a=k[t],l=g(()=>Ae[t].value),o=g(()=>a.size);function s(c,u){pn(t,c,u),e.onpick?.(c,u)}r(s,"choose");const i=r(c=>c?.closest?.("[data-key]")?.dataset.key,"keyAt");return f`
    <section.panel data-panel=${()=>t}>
      <header.panel-head>
        <h2>${()=>e.title}</h2>
        <span.panel-count>${()=>o.value?`${o.value} / ${l.value.length}`:l.value.length}</span>
        ${v(()=>o.value,()=>f`<btn-icon icon="close" label="Clear" onclick=${w(()=>a.clear())} />`)}
      </header>
      ${v(()=>l.value.length,()=>f`
          <data-index.panel-list viewmode="list" item-size="2.75rem" gap="0" ref=${fe(qe,()=>({onLongPress:r(c=>{const u=i(c.target);u&&s(u,"toggle")},"onLongPress")}))}>
            ${M(()=>l.value,c=>c,c=>f`
                <data-item.row data-key=${()=>c.key} class:picked=${()=>a.has(c.key)} onclick=${w(u=>s(c.key,mn(u)))}>
                  ${v(()=>c.cover!==void 0,()=>f`<${Re} ...${{get id(){return c.cover}}} />`)}
                  <span.row-label>${()=>c.label}</span>
                  <span.row-sub>${()=>c.sub??c.count}</span>
                </data-item>
              `)}
          </data-index>
        `,()=>f`<p.panel-empty>${()=>e.empty}</p>`)}
    </section>
  `}r(On,"$$PanelRatHtml");const Rn=`@scope (:has(> [data-rat="121i779"])) to (:scope > :not([data-rat="121i779"])) {
  .player {
    align-items    : center;
    display        : flex;
    flex-direction : column;
    grid-area      : player;
    overflow       : hidden;
  
    .cover    { inline-size: calc(var(--noisy-rail) * 1.2); }
    .now      { display: flex; flex: 1; flex-flow: column; min-block-size: 0; overflow: hidden; writing-mode: vertical-rl; }      
    .title    { font-weight: 800; }
    .artist   { opacity: 0.7; }
    .controls { display: flex; flex-direction: column; }
    .seek     { display: none; }
    .time     { font-size: 0.7rem; opacity: 0.6; }
    .error    { color: var(--color-error, red); font-size: 0.75rem; }
  }
  
  .player.idle .title { flex: 1; writing-mode: vertical-rl; }
}`;function En(e,n){return Sn.call({props:e},e,n)}r(En,"PlayerRatHtml");function Sn(e,n){ae("121i779",Rn);let{duration:t,error:a,index:l,playing:o,queue:s,time:i}=me(p,{duration:null,error:null,index:null,playing:null,queue:null,time:null});const c=g(()=>s.value[l.value]??null),u=r(d=>`${Math.floor(d/60)}:${String(Math.floor(d%60)).padStart(2,"0")}`,"clock");return f`
    <aside data-rat="121i779" class="player" class:idle=${()=>!c.value}>
      ${v(()=>c.value,()=>f`
          <${Re} ...${{get id(){return c.value.cover}}} />
          <div class="now">
            <span class="title">${()=>c.value.title}</span>
            <span class="artist">${()=>c.value.artist}</span>
          </div>
        `,()=>f`<span class="title">Player</span>`)}
      <div class="controls">
        <btn-icon icon="skip-previous" label="previous" onclick=${U("previous")} />
        <btn-icon icon=${()=>o.value?"pause":"play"} label=${()=>o.value?"Pause":"Play"} onclick=${U("toggle-play")} />
        <btn-icon icon="skip-next" label="next" onclick=${U("next")} />
      </div>
      ${v(()=>c.value,()=>f`<input class="seek" type="range" min="0" max=${()=>t.value||0} step="1" value=${()=>i.value} oninput=${w(d=>p.seek(Number(d.target.value)))} aria-label="Position" />`)}
      ${v(()=>c.value,()=>f`<span class="time">${()=>u(i.value)} / ${()=>u(t.value)}</span>`)}
      ${v(()=>a.value,()=>f`<span class="error">${()=>a.value.message}</span>`)}
    </aside>
  `}r(Sn,"$$PlayerRatHtml");const F=Ce("appearance",{}),ce={density:I.densities,geometry:I.geometries,mode:I.modes},Tn=r(()=>F.value,"appearance"),Mn=r(()=>I.palettes().catch(()=>[]),"palettes");function Ee(e){const n=document.querySelector("rat-app");for(const[t,a]of Object.entries(e))a?n?.setAttribute(t,a):n?.removeAttribute(t);return I.set(e)}r(Ee,"apply");function Pn(e,n){return F.value={...F.value,[e]:n||null},Ee({[e]:n||null})}r(Pn,"setAppearance");Object.keys(F.value).length&&Ee(F.value);let j=null;const X=R(!1),Se=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Ln=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Se;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),j=e,X.value=!0});addEventListener("appinstalled",()=>{j=null,X.value=!1});async function zn(){if(!j)return!1;const e=j;return j=null,X.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}r(zn,"install");const Cn=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function ue(e,n){return Hn.call({props:e},e,n)}r(ue,"SettingsRatHtml");function Hn(e,n){ae("177zzh1",Cn);let t=V({...Tn()}),a=V([]);const l=g(()=>X.value);Mn().then(i=>{a.value=i});function o(i,c){const u=c.detail?.value??c.target.value;t.value={...t.value,[i]:u},Pn(i,u)}r(o,"change");async function s(){await zn()&&K.success(`${e.name??"the app"} is installed`)}return r(s,"installApp"),f`
    <div.settings data-rat="177zzh1">
      ${n}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>t.value.palette??"zombie"} onchange=${w(i=>o("palette",i))}>
            ${M(()=>a.value,i=>i,i=>f`<input-option value=${()=>i}>${()=>i}</input-option>`)}
          </input-value>
        </label>
        ${M(()=>Object.keys(ce),i=>i,i=>f`
            <label>
              <span>${()=>i}</span>
              <input-value look="segments" value=${()=>t.value[i]??""} onchange=${w(c=>o(i,c))}>
                ${M(()=>ce[i],c=>c,c=>f`<input-option value=${()=>c}>${()=>c}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${v(()=>!Se,()=>f`
          <section>
            <h3>install</h3>
            ${v(()=>l.value,()=>f`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${w(s)} />`,()=>f`
                ${v(()=>Ln,()=>f`<p.hint>Share, then "Add to Home Screen".</p>`,()=>f`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}r(Hn,"$$SettingsRatHtml");const Un=`@scope (:has(> [data-rat="yj6cuy"])) to (:scope > :not([data-rat="yj6cuy"])) {
  @import url('https://code.pulgasari.dev/gestalt/packages/css/gestalt.css');
  
  .noisy {
    --noisy-rail   : 3.5rem;
  
    block-size            : 100dvh;
    display               : grid;
    grid-template-areas   : "menu panels player";
    grid-template-columns : var(--noisy-rail) minmax(0, 1fr) calc(var(--noisy-rail) * 1.6);
  }
  
  .menu, .panel, .player {
    background    : color-mix(in oklch, currentColor 5%, transparent);
    background    : --alpha(cc, 5%);
    min-block-size: 0;
  }
  
  /* :::::: MENU */
  
  .menu {
    align-items    : center;
    display        : flex;
    flex-direction : column;
    grid-area      : menu;
  }
  
  .menu-brand {
    font-weight  : 800;
    writing-mode : vertical-rl;
    rotate       : 180deg;
    margin-block-end: auto;
  }
  
  /* :::::: PANELS */
  
  .tabs { display: none; }
  
  .panels {
    display               : grid;
    grid-area             : panels;
    grid-template-columns : repeat(4, minmax(0, 1fr));
    min-block-size        : 0;
  }
  .panel         { display: flex; flex-direction: column; overflow: hidden; }
  .panel-head    { align-items: center; display: flex; }
  .panel-head h2 { flex: 1; font-size: 1rem; margin: 0; }
  .panel-count   { font-size: 0.8rem; opacity: 0.6; }
  .panel-list    { flex: 1; overflow: auto; }
  .panel-empty   { margin: auto; opacity: 0.5; text-align: center; }
  
  .row {
    align-items   : center;
    cursor        : pointer;
    display       : flex;
    min-block-size: 2.5rem;
    user-select   : none;
    
    &:hover  { --bg: color-mix(in oklch, currentColor 10%, transparent); }
    &.picked { --bg: color-mix(in oklch, var(--color-ink) 35%, transparent); }
  }
  .row-label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .row-sub   { font-size: 0.8rem; opacity: 0.6; white-space: nowrap; }
  
  .cover {
    aspect-ratio        : 1;
    background-position : center;
    background-size     : cover;
    display             : grid;
    flex                : none;
    inline-size         : 2rem;
    place-items         : center;
    background-color    : color-mix(in oklch, currentColor 10%, transparent);
    background-color    : --alpha(cc, 0.1);
  }
  
  /* DENSITY + GEOMETRY */
  
  .player-controls {
    --gap: small;
  }
  .noisy, .menu, .panel, .panel-empty, .panel-head, .panel-list, .panels, .player, .row {
    --gap: normal;
  }
  
  .row {
    --pad: small;
  }
  .noisy, .menu, .panel, .panel-empty, .panel-head, .panel-list, .player {
    --pad: normal;
  }
  
  .cover {
    --rad: 0.25rem;
  }
  .row {
    --rad: 0.50rem;
  }
  .menu, .panel, .player {
    --rad: 1.00rem;
  }
  
  /* :::::: NARROW */
  
  /* @media (width < 48rem) { */
  @media (orientation: portrait) {
    .noisy {
      grid-template-areas   : "menu" "tabs" "panels" "player";
      grid-template-columns : minmax(0, 1fr);
      grid-template-rows    : auto auto minmax(0, 1fr) auto;
    }
  
    .menu       { flex-direction: row; }
    .menu-brand { margin: 0 auto 0 0; rotate: none; writing-mode: horizontal-tb; }
  
    .tabs {
      display   : flex;
      grid-area : tabs;
  
      button {
        background    : none;
        border        : 0;
        border-radius : 999px;
        flex          : 1;
        opacity       : 0.6;
  
        --pad: small;
  
        &.active { --bg: color-mix(in oklch, currentColor 10%, transparent); opacity: 1; }
      }
    }
  
    .panels {
      display          : flex;
      overflow-x       : auto;
      scroll-snap-type : x mandatory;
      scrollbar-width  : none;
  
      > * { flex: 0 0 100%; scroll-snap-align: start; }
    }
  
    .player             { flex-direction : row; }
    .player .cover      { inline-size: 2.75rem; }
    .player .now        { writing-mode: horizontal-tb; flex: 1;  }
    .player.idle .title { writing-mode: horizontal-tb; }
    .player .controls   { flex-direction: row; }
    .player .time       { display: none; }
  }
  
  /* orientation: landscape | default */
  .noisy                { --pad: 1rem 0; }
  .noisy > :first-child { --rad: 0 1rem 1rem 0; }
  .noisy > :last-child  { --rad: 1rem 0 0 1rem; }
  
  /* orientation: portrait */
  @media (orientation: portrait) {
     .noisy                { --pad: 0 1rem; }
     .noisy > :first-child { --rad: 0 0 1rem 1rem; }
     .noisy > :last-child  { --rad: 1rem 1rem 0 0; }
  }
}`;function Kn(e,n){return In.call({props:e},e,n)}r(Kn,"AppRatHtml");function In(e,n){ae("yj6cuy",Un);const t={artists:"Artists",genres:"Genres",releases:"Releases",tracks:"Tracks"},a={artists:"No artists yet",genres:"Add a folder in the settings",releases:"Pick an artist",tracks:"Pick a release"};RAT.app.hold(We().catch(K.error)),RAT.app.commands.assign({"clear-selection":gn,next:r(()=>p.next(),"next"),previous:r(()=>p.previous(),"previous"),"toggle-play":r(()=>p.toggle(),"toggle-play")});let l=V(0),o=null;const s=r(()=>o&&o.scrollWidth>o.clientWidth,"narrow"),i=r(d=>o?.children[d]?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"}),"show");function c(d){o=d;const h=r(()=>{l.value=Math.round(d.scrollLeft/Math.max(1,d.clientWidth))},"onScroll");return d.addEventListener("scroll",h,{passive:!0}),()=>d.removeEventListener("scroll",h)}r(c,"panels");function u(d,h,y){if(d==="tracks"&&y==="one"){const T=sn.value;p.play(T,T.findIndex($=>$.key===h));return}y==="one"&&s()&&i(E.indexOf(d)+1)}return r(u,"picked"),f`
    <rat-area data-rat="yj6cuy" name="main">
      <div.noisy>
        <${wn} />
        <nav.tabs>
          ${M(()=>E,d=>d,d=>f`<button class:active=${()=>l.value===E.indexOf(d)} onclick=${w(()=>i(E.indexOf(d)))}>${()=>t[d]}</button>`)}
        </nav>
        <div.panels ref=${fe(c)}>
          ${M(()=>E,d=>d,d=>f`<${An} ...${{get name(){return d},get title(){return t[d]},get empty(){return a[d]},onpick:r((h,y)=>u(d,h,y),"onpick")}} />`)}
        </div>
        <${En} />
      </div>
    </rat-area>
    <rat-area data-rat="yj6cuy" name="config" dock="end"><${ue} name="noisy"><${bn} /></${ue}></rat-area>
  `}r(In,"$$AppRatHtml");export{Kn as default,Un as style};
