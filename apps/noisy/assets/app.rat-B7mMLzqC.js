var Te=Object.defineProperty;var r=(e,t)=>Te(e,"name",{value:t,configurable:!0});import{P as Me,Q as v,T as I,V as re,W as Pe,X as x,Y as ue,Z as de,a0 as Le,f as M,w as h,h as p,a1 as V,a2 as fe,a3 as q,a4 as He,a5 as Ue}from"./index-GwAKd1NU.js";import{p as Ce,a as Ie}from"./keys-CWTtq0D5.js";import{parseBlob as qe,parseBuffer as Fe}from"https://esm.sh/music-metadata@11.16.1";import je from"./index-DIlYw3RB.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function pe(e,t){const a={};for(const n of Object.keys(t)){const o=e?.[n],s=t[n];a[n]=Me(o)?o:v(()=>e[n]===void 0&&s?s():e[n])}return new Proxy(e??{},{get:r((n,o)=>Object.hasOwn(a,o)?a[o]:n[o],"get")})}r(pe,"signalsOf");function w(e,{keys:t=null,prevent:a=!1,times:n=0}={}){const o=t?Ce(t):null;let s=n;return function(l){if(!(n&&!s)&&!(o&&!Ie(l,o))){a&&l.preventDefault(),n&&s--;try{const i=(typeof e=="string"?I(e):e).call(this,l);typeof i?.catch=="function"&&i.catch(c=>re(this,c,"handler"))}catch(i){re(this,i,"handler")}}}}r(w,"listener");const N=r(e=>(t,a)=>Pe.notify(t,{...a,type:e}),"notify"),K=Object.assign(N("info"),{error:N("error"),info:N("info"),success:N("success")}),ee=65536,ge=1<<20,X=1<<25,De=3,U=r(()=>RAT.app.database,"db"),S=r(()=>RAT.app.folders,"folders"),Ne=r((e,t)=>`${e}/${t}`,"keyOf"),H={artist:"Unknown artist",genre:"Unknown genre",release:"Unknown release"},$=x([]),ve=x(0),We=r(e=>$.value.find(t=>t.key===e)??null,"trackByKey");async function ze(){$.value=await U().tracks.values(),await S().load()}r(ze,"load");const te=new Map;ue(()=>{for(const[e,t]of Object.entries(S().trees.value))te.get(e)!==t&&(te.set(e,t),Ve(e,t))});const me=r(e=>e?e.kind==="file"?[e]:(e.children??[]).flatMap(me):[],"filesOf"),Be=r(e=>e.replace(/\.[^.]+$/,"").replace(/[_]+/g," ").replace(/\s+/g," ").trim(),"titleOf");async function Ve(e,t){const a=new Map($.value.filter(l=>l.sourceId===e).map(l=>[l.key,l])),n=await Promise.all(me(t).map(async l=>{const i=Ne(e,l.path),c=await l.entry.info(),u=`${c?.size}:${c?.modified}`,d=a.get(i);return d?.sig===u?d:{artist:H.artist,cover:null,covered:!1,disc:null,duration:null,genres:[H.genre],key:i,name:l.name,no:null,path:l.path,release:H.release,sig:u,sourceId:e,tagged:!1,title:Be(l.name),year:null}})),o=[...a.keys()].filter(l=>!n.some(i=>i.key===l)),s=n.filter(l=>a.get(l.key)!==l);await Promise.all([...o.map(l=>U().tracks.delete(l)),...s.map(l=>U().tracks.set(l.key,l))]),$.value=[...$.value.filter(l=>l.sourceId!==e),...n],Ke(n)}r(Ve,"sync");const B=new Map;let se=null;function he(e){B.set(e.key,e),se??=requestAnimationFrame(()=>{se=null;const t=new Map(B);B.clear(),$.value=$.value.map(a=>t.get(a.key)?.sig===a.sig?t.get(a.key):a)})}r(he,"settle");const C=[],G=[];let W=0;function Ke(e){C.push(...e.filter(t=>!t.tagged)),G.push(...e.filter(t=>t.tagged&&t.covered===!1)),ye()}r(Ke,"enqueue");function ye(){for(ve.value=C.length+W;W<De&&(C.length||G.length);){const[e,t]=C.length?[et,C.shift()]:[tt,G.shift()];W++,e(t).finally(()=>{W--,ye()})}}r(ye,"pump");const $e=r(e=>{const t=B.get(e.key)??We(e.key);return!t||t.sig!==e.sig?null:t},"stale"),O=r(async(e,t,a)=>new Uint8Array(await(await e.slice(t,a)).arrayBuffer()),"bytesOf"),P=r(e=>String.fromCharCode(...e),"ascii"),ae=r((e,t)=>(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0,"u32le"),Ge=new Set(["fmt ","LIST","id3 ","ID3 "]);async function Xe(e,t){const a=[];let n=0,o=0;for(let u=12;u+8<=t;){const d=await O(e,u,u+8),y=P(d.subarray(0,4)),m=ae(d,4);if(y==="data")n=m;else if(Ge.has(y)&&m<=X){const T=await O(e,u+8,u+8+m+(m&1));y==="fmt "&&(o=ae(T,8)),a.push(d,T)}u+=8+m+(m&1)}const s=a.reduce((u,d)=>u+d.length,0)+12+8,l=new Uint8Array(s),i=new DataView(l.buffer);l.set([..."RIFF"].map(u=>u.charCodeAt(0)),0),i.setUint32(4,s-8,!0),l.set([..."WAVE"].map(u=>u.charCodeAt(0)),8);let c=12;for(const u of a)l.set(u,c),c+=u.length;return l.set([..."data"].map(u=>u.charCodeAt(0)),c),{bytes:l,duration:o?n/o:null,size:s}}r(Xe,"wavOf");const oe={OpusHead:2,"vorbis":3};async function Ye(e,t,a){const n=r(async b=>b+27<=a.length?a.subarray(b):O(e,b,Math.min(t,b+27+255)),"page"),o=a.subarray(27+a[26]),s=Object.keys(oe).find(b=>P(o.subarray(0,b.length))===b);if(!s)return{bytes:a.subarray(0,Math.min(t,ge)),duration:void 0,size:t};let l=0,i=0;for(;i<oe[s]&&l<t;){const b=await n(l),_=b.subarray(27,27+b[26]);for(const Q of _)Q<255&&i++;l+=27+_.length+_.reduce((Q,Se)=>Q+Se,0)}if(l=Math.min(t,l+ee),l>X)throw new Error(`tags of ${l} bytes`);const c=await O(e,Math.max(0,t-65536),t),u=P(c).lastIndexOf("OggS"),d=new DataView(c.buffer,c.byteOffset),y=u<0?0:Number(d.getBigUint64(u+6,!0)),m=s==="OpusHead"?48e3:ae(o,12),T=s==="OpusHead"?o[10]|o[11]<<8:0;return{bytes:await O(e,0,l),duration:y&&m?(y-T)/m:void 0,size:t}}r(Ye,"oggOf");async function _e(e,t){const a=[];for(let s=0;s+8<=t;){const l=await O(e,s,s+16);let i=(l[0]<<24|l[1]<<16|l[2]<<8|l[3])>>>0;if(i===1&&(i=Number(new DataView(l.buffer,l.byteOffset).getBigUint64(8))),i===0&&(i=t-s),i<8)break;const c=P(l.subarray(4,8));if(c==="mdat")a.push(Uint8Array.of(0,0,0,8,109,100,97,116));else{if(i>X)throw new Error(`${c} of ${i} bytes`);a.push(await O(e,s,s+i))}s+=i}const n=new Uint8Array(a.reduce((s,l)=>s+l.length,0));let o=0;for(const s of a)n.set(s,o),o+=s.length;return{bytes:n,duration:void 0,size:n.length}}r(_e,"mp4Of");async function Qe(e,t){const a=await O(e,0,Math.min(t,65536)),n=P(a.subarray(0,4));let o=ge;if(n==="RIFF"&&P(a.subarray(8,12))==="WAVE")return Xe(e,t);if(n==="OggS")return Ye(e,t,a);if(P(a.subarray(4,8))==="ftyp")return _e(e,t);if(n==="fLaC")for(let s=4;s<t;){const l=s+4<=a.length?a.subarray(s,s+4):await O(e,s,s+4);if(s+=4+(l[1]<<16|l[2]<<8|l[3]),l[0]&128){o=s+ee;break}}if(n.startsWith("ID3")&&(o=10+(a[5]&16?10:0)+((a[6]&127)<<21|(a[7]&127)<<14|(a[8]&127)<<7|a[9]&127)+ee),o=Math.min(t,o),o>X)throw new Error(`tags of ${o} bytes`);return{bytes:o<=a.length?a.subarray(0,o):await O(e,0,o),duration:void 0,size:t}}r(Qe,"partOf");const Ze=/[\u00c2-\u00f4][\u0080-\u00bf]/,le=r(e=>{if(typeof e!="string"||!Ze.test(e)||/[^\u0000-\u00ff]/.test(e))return e;try{return new TextDecoder("utf-8",{fatal:!0}).decode(Uint8Array.from(e,t=>t.charCodeAt(0)))}catch{return e}},"utf8"),Je=["album","albumartist","artist","title"];async function be(e,t){const a=S().nodeAt(e.sourceId,e.path)?.entry;if(!a)throw new Error(`${e.name} is no longer in its folder`);const n={duration:!1,skipCovers:t,skipPostHeaders:!0};let o;if(!a.handle.readSlice)o=await qe(await a.read("blob"),n);else{const{size:i=0,type:c}=await a.info()??{},u=await Qe(a,i);o=await Fe(u.bytes,{mimeType:c,size:u.size},n),u.duration!==void 0&&(o.format.duration=u.duration),!o.format.duration&&o.format.bitrate&&(o.format.duration=i*8/o.format.bitrate)}const{common:s,format:l}=o;if(l.container==="WAVE"){for(const i of Je)s[i]=le(s[i]);s.genre=s.genre?.map(le)}return o}r(be,"parse");async function et(e){const t=$e(e);if(!t||t.tagged)return;let a={...t,tagged:!0};try{const{common:n,format:o}=await be(t,!0);a={...a,artist:n.albumartist||n.artist||H.artist,disc:n.disk?.no??null,duration:o.duration??null,genres:n.genre?.length?n.genre:[H.genre],no:n.track?.no??null,release:n.album||H.release,title:n.title||t.title,year:n.year??null}}catch{a.covered=!0}await U().tracks.set(a.key,a),he(a),a.covered||G.push(a)}r(et,"tag");async function tt(e){const t=$e(e);if(!t||t.covered)return;let a=null;try{const o=(await be(t,!1)).common.picture?.[0];o&&(a=`${t.key}:${t.sig}`,await RAT.app.thumbnails.requestFile(a,()=>new Blob([o.data],{type:o.format})))}catch{}const n={...t,cover:a,covered:!0};await U().tracks.set(n.key,n),he(n)}r(tt,"cover");async function at(e){if(S().perms.value[e.sourceId]!=="granted")throw new Error("Reconnect the folder of this track in the settings first.");const t=await S().entryAt(e.sourceId,e.path);if(!t)throw new Error(`${e.name} is no longer in its folder`);return t.url()}r(at,"urlOf");async function nt(){if(!("showDirectoryPicker"in globalThis))throw new Error("This browser can’t open folders: try Chrome, Edge or another Chromium browser.");return S().add()}r(nt,"addFolder");const rt=r(()=>Promise.all(S().sources.value.map(e=>S().scan(e.id))),"rescanAll");async function st(e){const t=$.value.filter(a=>a.sourceId===e).map(a=>a.key);await S().remove(e),await Promise.all(t.map(a=>U().tracks.delete(a))),$.value=$.value.filter(a=>a.sourceId!==e),te.delete(e)}r(st,"removeFolder");const E=["genres","artists","releases","tracks"],k=Object.fromEntries(E.map(e=>[e,new Le])),z={},j=r(e=>`${e.artist}\0${e.release}`,"releaseKey"),ot=r((e,t)=>e.label.localeCompare(t.label,void 0,{numeric:!0,sensitivity:"base"}),"byLabel");function Z(e,t,a=n=>n){const n=new Map;for(const o of e)for(const s of t(o))n.set(s,(n.get(s)??0)+1);return[...n].map(([o,s])=>({count:s,key:o,label:a(o)})).sort(ot)}r(Z,"groups");const we=v(()=>k.genres.size?$.value.filter(e=>e.genres.some(t=>k.genres.has(t))):$.value),ne=v(()=>we.value.filter(e=>k.artists.has(e.artist))),ke=v(()=>ne.value.filter(e=>k.releases.has(j(e)))),Ae={genres:v(()=>Z($.value,e=>e.genres)),artists:v(()=>Z(we.value,e=>[e.artist])),releases:v(()=>k.artists.size?Z(ne.value,e=>[j(e)],e=>e.split("\0")[1]).map(e=>({...e,sub:it(e.key)})):[]),tracks:v(()=>k.releases.size?ke.value.toSorted(Oe).map(e=>({cover:e.cover,key:e.key,label:e.title,sub:ut(e)})):[])},lt=v(()=>k.releases.size?ke.value.toSorted(Oe):[]);function it(e){const t=ne.value.find(a=>j(a)===e);return[t?.artist,t?.year].filter(Boolean).join(" · ")}r(it,"releaseInfo");const ct=r(e=>e==null?"":`${Math.floor(e/60)}:${String(Math.round(e%60)).padStart(2,"0")}`,"duration"),ut=r(e=>[e.no&&String(e.no).padStart(2,"0"),ct(e.duration)].filter(Boolean).join(" · "),"trackInfo"),Oe=r((e,t)=>j(e).localeCompare(j(t))||(e.disc??0)-(t.disc??0)||(e.no??0)-(t.no??0)||e.title.localeCompare(t.title),"trackOrder"),dt=r((e,t,a="one")=>de(()=>ft(e,t,a)),"pick");function ft(e,t,a){const n=k[e],o=Ae[e].value.map(s=>s.key);if(a==="range"&&z[e]!=null){const[s,l]=[o.indexOf(z[e]),o.indexOf(t)].sort((i,c)=>i-c);n.clear();for(const i of o.slice(s,l+1))n.add(i)}else if(a==="toggle")n.has(t)?n.delete(t):n.add(t),z[e]=t;else{const s=n.size===1&&n.has(t);n.clear(),s||n.add(t),z[e]=t}for(const s of E.slice(E.indexOf(e)+1))k[s].clear()}r(ft,"pickIn");const pt=r(e=>e?.shiftKey?"range":e?.ctrlKey||e?.metaKey?"toggle":"one","modeOf"),gt=r(()=>de(()=>{for(const e of E)k[e].clear()}),"clearSelection"),g=new Audio;g.preload="metadata";let J=null;const f={duration:x(0),error:x(null),index:x(-1),playing:x(!1),queue:x([]),time:x(0),get track(){return f.queue.value[f.index.value]??null},play(e,t=0){return f.queue.value=e,f.at(t)},async at(e){const t=f.queue.value[e];if(t){f.index.value=e,f.error.value=null;try{const a=await at(t);if(f.index.value!==e)return URL.revokeObjectURL(a);J&&URL.revokeObjectURL(J),g.src=J=a,await g.play(),ht(t)}catch(a){f.error.value=a}}},toggle(){f.track&&(g.paused?g.play():g.pause())},next(){f.index.value<f.queue.value.length-1&&f.at(f.index.value+1)},previous(){g.currentTime>3?g.currentTime=0:f.at(Math.max(0,f.index.value-1))},seek(e){g.currentTime=e}};g.addEventListener("durationchange",()=>{f.duration.value=g.duration||0});g.addEventListener("ended",()=>f.next());g.addEventListener("pause",()=>{f.playing.value=!1});g.addEventListener("play",()=>{f.playing.value=!0});g.addEventListener("timeupdate",()=>{f.time.value=g.currentTime||0});const A=globalThis.Capacitor?.isPluginAvailable?.("MediaSession")?globalThis.Capacitor.Plugins.MediaSession:null,L=A?null:navigator.mediaSession??null,R={action:r((e,t)=>{try{A?A.setActionHandler({action:e},t):L?.setActionHandler(e,t)}catch{}},"action"),metadata:r(e=>A?A.setMetadata(e):L&&(L.metadata=new MediaMetadata(e)),"metadata"),position:r(()=>{if(!g.duration||!Number.isFinite(g.duration))return;const e={duration:g.duration,playbackRate:g.playbackRate,position:Math.min(g.currentTime,g.duration)};A?A.setPositionState(e):L?.setPositionState?.(e)},"position"),state:r(e=>A?A.setPlaybackState({playbackState:e}):L&&(L.playbackState=e),"state")},vt=r(e=>new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result),n.onerror=a,n.readAsDataURL(e)}),"dataUrl");async function mt(e){if(!e.cover)return[];try{const t=await RAT.app.thumbnails.requestFile(e.cover,()=>null);if(!t)return[];if(!A)return[{src:t}];const a=await(await fetch(t)).blob();return[{src:await vt(a),type:a.type}]}catch{return[]}}r(mt,"artworkOf");async function ht(e){const t={album:e.release,artist:e.artist,title:e.title};R.metadata(t);const a=await mt(e);a.length&&f.track===e&&R.metadata({...t,artwork:a})}r(ht,"session");g.addEventListener("play",()=>R.state("playing"));g.addEventListener("pause",()=>R.state(g.ended&&f.index.value>=f.queue.value.length-1?"none":"paused"));for(const e of["durationchange","play","pause","ratechange","seeked"])g.addEventListener(e,R.position);R.action("nexttrack",()=>f.next());R.action("pause",()=>g.pause());R.action("play",()=>g.play());R.action("previoustrack",()=>f.previous());R.action("seekto",e=>e?.seekTime!=null&&f.seek(e.seekTime));function yt(e,t){return $t.call({props:e},e,t)}r(yt,"FoldersRatHtml");function $t(e,t){const a=RAT.app.folders,n=v(()=>a.sources.value),o=v(()=>a.perms.value),s=v(()=>ve.value);async function l(){try{const i=await nt();i&&K.success(`Added ${i.name}`)}catch(i){K.error(i)}}return r(l,"add"),p`
    <section.folders>
      <h3>folders</h3>
      ${M(()=>n.value,i=>i,i=>p`
          <div.folder>
            <span>${()=>i.name}</span>
            ${h(()=>o.value[i.id]!=="granted",()=>p`<btn-push label="Reconnect" onclick=${w(()=>a.reconnect(i.id))} />`)}
            <btn-icon icon="delete" label="Remove" onclick=${w(()=>st(i.id))} />
          </div>
        `)}
      <div.folder-actions>
        <btn-push icon="folder-add" label="Add a folder" onclick=${w(l)} />
        ${h(()=>n.value.length,()=>p`<btn-push icon="refresh" label="Rescan" onclick=${w(rt)} />`)}
      </div>
      ${h(()=>s.value,()=>p`<p.hint>${()=>s.value} files left to read</p>`)}
    </section>
  `}r($t,"$$FoldersRatHtml");function bt(e,t){return wt.call({props:e},e,t)}r(bt,"MenuRatHtml");function wt(e,t){return p`
    <nav.menu>
      <span.menu-brand>noisy</span>
      <btn-icon icon="settings" label="Settings" onclick=${I("rat:toggle[config]")} />
    </nav>
  `}r(wt,"$$MenuRatHtml");function Re(e,t){return kt.call({props:e},e,t)}r(Re,"CoverRatHtml");function kt(e,t){let{id:a}=pe(this.props,{id:null}),n=V(null);return ue(()=>{const o=a.value;let s=!0;return n.value=null,o&&RAT.app.thumbnails.requestFile(o,()=>null).then(l=>{s&&(n.value=l)}).catch(()=>{}),()=>{s=!1}}),p`<span.cover style:background-image=${()=>n.value?`url("${n.value}")`:null}>${h(()=>!n.value,()=>p`<svg-icon icon="audio" />`)}</span>`}r(kt,"$$CoverRatHtml");function At(e,t){return Ot.call({props:e},e,t)}r(At,"PanelRatHtml");function Ot(e,t){const a=e.name,n=k[a],o=v(()=>Ae[a].value),s=v(()=>n.size);function l(c,u){dt(a,c,u),e.onpick?.(c,u)}r(l,"choose");const i=r(c=>c?.closest?.("[data-key]")?.dataset.key,"keyAt");return p`
    <section.panel data-panel=${()=>a}>
      <header.panel-head>
        <h2>${()=>e.title}</h2>
        <span.panel-count>${()=>s.value?`${s.value} / ${o.value.length}`:o.value.length}</span>
        ${h(()=>s.value,()=>p`<btn-icon icon="close" label="Clear" onclick=${w(()=>n.clear())} />`)}
      </header>
      ${h(()=>o.value.length,()=>p`
          <data-index.panel-list viewmode="list" item-size="2.75rem" gap="0" ref=${fe(je,()=>({onLongPress:r(c=>{const u=i(c.target);u&&l(u,"toggle")},"onLongPress")}))}>
            ${M(()=>o.value,c=>c,c=>p`
                <data-item.row data-key=${()=>c.key} class:picked=${()=>n.has(c.key)} onclick=${w(u=>l(c.key,pt(u)))}>
                  ${h(()=>c.cover!==void 0,()=>p`<${Re} ...${{get id(){return c.cover}}} />`)}
                  <span.row-label>${()=>c.label}</span>
                  <span.row-sub>${()=>c.sub??c.count}</span>
                </data-item>
              `)}
          </data-index>
        `,()=>p`<p.panel-empty>${()=>e.empty}</p>`)}
    </section>
  `}r(Ot,"$$PanelRatHtml");function Rt(e,t){return xt.call({props:e},e,t)}r(Rt,"PlayerRatHtml");function xt(e,t){let{duration:a,error:n,index:o,playing:s,queue:l,time:i}=pe(f,{duration:null,error:null,index:null,playing:null,queue:null,time:null});const c=v(()=>l.value[o.value]??null),u=r(d=>`${Math.floor(d/60)}:${String(Math.floor(d%60)).padStart(2,"0")}`,"clock");return p`
    <aside.player class:idle=${()=>!c.value}>
      ${h(()=>c.value,()=>p`
          <${Re} ...${{get id(){return c.value.cover}}} />
          <div.player-now>
            <span.player-title>${()=>c.value.title}</span>
            <span.player-artist>${()=>c.value.artist}</span>
          </div>
        `,()=>p`<span.player-title>Player</span>`)}
      <div.player-controls>
        <btn-icon icon="skip-previous" label="Previous" onclick=${I("previous")} />
        <btn-icon icon=${()=>s.value?"pause":"play"} label=${()=>s.value?"Pause":"Play"} onclick=${I("toggle-play")} />
        <btn-icon icon="skip-next" label="Next" onclick=${I("next")} />
      </div>
      ${h(()=>c.value,()=>p`<input.player-seek type="range" min="0" max=${()=>a.value||0} step="1" value=${()=>i.value} oninput=${w(d=>f.seek(Number(d.target.value)))} aria-label="Position" />`)}
      ${h(()=>c.value,()=>p`<span.player-time>${()=>u(i.value)} / ${()=>u(a.value)}</span>`)}
      ${h(()=>n.value,()=>p`<span.player-error>${()=>n.value.message}</span>`)}
    </aside>
  `}r(xt,"$$PlayerRatHtml");const D=He("appearance",{}),ie={density:q.densities,geometry:q.geometries,mode:q.modes},Et=r(()=>D.value,"appearance"),St=r(()=>q.palettes().catch(()=>[]),"palettes");function xe(e){const t=document.querySelector("rat-app");for(const[a,n]of Object.entries(e))n?t?.setAttribute(a,n):t?.removeAttribute(a);return q.set(e)}r(xe,"apply");function Tt(e,t){return D.value={...D.value,[e]:t||null},xe({[e]:t||null})}r(Tt,"setAppearance");Object.keys(D.value).length&&xe(D.value);let F=null;const Y=x(!1),Ee=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Mt=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Ee;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),F=e,Y.value=!0});addEventListener("appinstalled",()=>{F=null,Y.value=!1});async function Pt(){if(!F)return!1;const e=F;return F=null,Y.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}r(Pt,"install");const Lt=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function ce(e,t){return Ht.call({props:e},e,t)}r(ce,"SettingsRatHtml");function Ht(e,t){Ue("177zzh1",Lt);let a=V({...Et()}),n=V([]);const o=v(()=>Y.value);St().then(i=>{n.value=i});function s(i,c){const u=c.detail?.value??c.target.value;a.value={...a.value,[i]:u},Tt(i,u)}r(s,"change");async function l(){await Pt()&&K.success(`${e.name??"the app"} is installed`)}return r(l,"installApp"),p`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>a.value.palette??"zombie"} onchange=${w(i=>s("palette",i))}>
            ${M(()=>n.value,i=>i,i=>p`<input-option value=${()=>i}>${()=>i}</input-option>`)}
          </input-value>
        </label>
        ${M(()=>Object.keys(ie),i=>i,i=>p`
            <label>
              <span>${()=>i}</span>
              <input-value look="segments" value=${()=>a.value[i]??""} onchange=${w(c=>s(i,c))}>
                ${M(()=>ie[i],c=>c,c=>p`<input-option value=${()=>c}>${()=>c}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${h(()=>!Ee,()=>p`
          <section>
            <h3>install</h3>
            ${h(()=>o.value,()=>p`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${w(l)} />`,()=>p`
                ${h(()=>Mt,()=>p`<p.hint>Share, then "Add to Home Screen".</p>`,()=>p`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}r(Ht,"$$SettingsRatHtml");function zt(e,t){return Ut.call({props:e},e,t)}r(zt,"AppRatHtml");function Ut(e,t){const a={artists:"Artists",genres:"Genres",releases:"Releases",tracks:"Tracks"},n={artists:"No artists yet",genres:"Add a folder in the settings",releases:"Pick an artist",tracks:"Pick a release"};RAT.app.hold(ze().catch(K.error)),RAT.app.commands.assign({"clear-selection":gt,next:r(()=>f.next(),"next"),previous:r(()=>f.previous(),"previous"),"toggle-play":r(()=>f.toggle(),"toggle-play")});let o=V(0),s=null;const l=r(()=>s&&s.scrollWidth>s.clientWidth,"narrow"),i=r(d=>s?.children[d]?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"}),"show");function c(d){s=d;const y=r(()=>{o.value=Math.round(d.scrollLeft/Math.max(1,d.clientWidth))},"onScroll");return d.addEventListener("scroll",y,{passive:!0}),()=>d.removeEventListener("scroll",y)}r(c,"panels");function u(d,y,m){if(d==="tracks"&&m==="one"){const T=lt.value;f.play(T,T.findIndex(b=>b.key===y));return}m==="one"&&l()&&i(E.indexOf(d)+1)}return r(u,"picked"),p`
    <rat-area name="main">
      <div.noisy>
        <${bt} />
        <nav.tabs>
          ${M(()=>E,d=>d,d=>p`<button class:active=${()=>o.value===E.indexOf(d)} onclick=${w(()=>i(E.indexOf(d)))}>${()=>a[d]}</button>`)}
        </nav>
        <div.panels ref=${fe(c)}>
          ${M(()=>E,d=>d,d=>p`<${At} ...${{get name(){return d},get title(){return a[d]},get empty(){return n[d]},onpick:r((y,m)=>u(d,y,m),"onpick")}} />`)}
        </div>
        <${Rt} />
      </div>
    </rat-area>
    <rat-area name="config" dock="end"><${ce} name="noisy"><${yt} /></${ce}></rat-area>
  `}r(Ut,"$$AppRatHtml");export{zt as default};
