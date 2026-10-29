var bt=Object.defineProperty;var o=(e,t)=>bt(e,"name",{value:t,configurable:!0});import{P as ne,Q as p,T as Ge,V as je,W as kt,q as S,X as oe,Y as yt,Z as Ce,a0 as Q,w as d,h as r,f as N,a1 as D,a2 as ue,a3 as ke,a4 as wt,a5 as Rt,a6 as At,a7 as Et,a8 as xt,a9 as q}from"./index-Bu2XLLiK.js";import{p as Tt,a as St}from"./keys-CWTtq0D5.js";import Ht from"./index-DIlYw3RB.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function M(e,t){const a={};for(const n of Object.keys(t)){const i=e?.[n],u=t[n];a[n]=ne(i)?i:p(()=>e[n]===void 0&&u?u():e[n])}return new Proxy(e??{},{get:o((n,i)=>Object.hasOwn(a,i)?a[i]:n[i],"get")})}o(M,"signalsOf");function Pt(e){let t=!1,a;const n=o(()=>(t||(a=e(),t=!0),a),"source");return{get value(){const i=n();return ne(i)?i.value:i},set value(i){const u=n();if(!ne(u))throw new TypeError("[rat] an imported reactive variant changes through its methods, it is not reassigned");u.value=i}}}o(Pt,"imported");function g(e,{keys:t=null,prevent:a=!1,times:n=0}={}){const i=t?Tt(t):null;let u=n;return function(l){if(!(n&&!u)&&!(i&&!St(l,i))){a&&l.preventDefault(),n&&u--;try{const c=(typeof e=="string"?Ge(e):e).call(this,l);typeof c?.catch=="function"&&c.catch(s=>je(this,s,"handler"))}catch(c){je(this,c,"handler")}}}}o(g,"listener");const A={busy:S(""),dialog:S(null),progress:new kt,search:S("")},Dt="https://api.allorigins.win/raw?url={url}",Nt=o(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.CapacitorHttp??null:null,"nativeHttp");function Mt(e,t){const a=(e??"").trim();if(!a)return null;const n=encodeURIComponent(t);return a.includes("{url}")?a.replaceAll("{url}",n):a+n}o(Mt,"viaProxy");async function Be(e,{accept:t,as:a,signal:n}){const i=await fetch(e,{headers:t?{accept:t}:{},redirect:"follow",signal:n});if(!i.ok)throw new Error(`HTTP ${i.status}`);return a==="json"?i.json():i.text()}o(Be,"viaFetch");async function Ot(e,t,{accept:a,as:n}){const i=await e.request({headers:a?{accept:a}:{},method:"GET",responseType:n,url:t});if(i.status<200||i.status>=300)throw new Error(`HTTP ${i.status}`);return n==="json"&&typeof i.data=="string"?JSON.parse(i.data):i.data}o(Ot,"viaNative");async function Ke(e,{accept:t,as:a="text",proxy:n=Dt,signal:i}={}){const u=Nt();if(u)return Ot(u,e,{accept:t,as:a});let l;try{return await Be(e,{accept:t,as:a,signal:i})}catch(s){if(s.name==="AbortError")throw s;l=s}const c=Mt(n,e);if(!c)throw new Error(`could not reach ${e} (${l.message})`);try{return await Be(c,{accept:t,as:a,signal:i})}catch(s){throw s.name==="AbortError"?s:new Error(`could not reach ${e}, direct and through the proxy (${s.message})`)}}o(Ke,"get");const Ut=o((e,t={})=>Ke(e,{accept:"application/json",...t,as:"json"}),"getJson"),It=o((e,t={})=>Ke(e,{...t,as:"text"}),"getText"),ye=o(e=>It(e,{accept:"application/rss+xml, application/xml, text/xml, */*"}),"fetchFeed");function O(e,t){return[...e.children].filter(n=>n.localName===t)}o(O,"local");const y=o((e,t)=>O(e,t)[0]?.textContent?.trim()||"","localText");function Xe(e){const t=Date.parse((e||"").trim());return Number.isNaN(t)?0:t}o(Xe,"parseDate");function _e(e){const t=(e||"").trim();if(!t)return null;if(/^\d+$/.test(t))return Number(t);const a=t.split(":").map(Number);return a.some(Number.isNaN)?null:a.reduce((n,i)=>n*60+i,0)}o(_e,"parseDuration");function ie(e){const t=O(e,"image").find(n=>n.getAttribute("href"));if(t)return t.getAttribute("href");const a=O(e,"image")[0];return a?y(a,"url")||a.getAttribute("href")||a.textContent.trim():""}o(ie,"imageFrom");function Lt(e){const t={title:y(e,"title"),description:y(e,"description")||y(e,"summary"),link:O(e,"link").map(n=>n.textContent.trim()).find(Boolean)||"",author:y(e,"author")||y(e,"managingEditor"),image:ie(e)},a=O(e,"item").map(n=>{const i=O(n,"enclosure").find(u=>(u.getAttribute("type")||"").startsWith("audio"))||O(n,"enclosure")[0];return{title:y(n,"title"),guid:y(n,"guid"),description:y(n,"description")||y(n,"summary")||y(n,"encoded"),audioUrl:i?.getAttribute("url")||"",audioType:i?.getAttribute("type")||"audio/mpeg",pubDate:Xe(y(n,"pubDate")),duration:_e(y(n,"duration")),image:ie(n)||t.image,link:O(n,"link").map(u=>u.textContent.trim()).find(Boolean)||""}});return{...t,episodes:a}}o(Lt,"parseRss");function jt(e){const t=o(i=>O(e,"link").find(c=>(c.getAttribute("rel")||"alternate")===i&&c.getAttribute("href"))?.getAttribute("href")||"","linkHref"),a={title:y(e,"title"),description:y(e,"subtitle")||y(e,"summary"),link:t("alternate"),author:O(e,"author").map(i=>y(i,"name")).find(Boolean)||"",image:y(e,"logo")||y(e,"icon")||ie(e)},n=O(e,"entry").map(i=>{const u=O(i,"link"),l=u.find(c=>(c.getAttribute("type")||"").startsWith("audio"))||u.find(c=>c.getAttribute("rel")==="enclosure");return{title:y(i,"title"),guid:y(i,"id"),description:y(i,"summary")||y(i,"content"),audioUrl:l?.getAttribute("href")||"",audioType:l?.getAttribute("type")||"audio/mpeg",pubDate:Xe(y(i,"published")||y(i,"updated")),duration:_e(y(i,"duration")),image:ie(i)||a.image,link:u.find(c=>(c.getAttribute("rel")||"alternate")==="alternate")?.getAttribute("href")||""}});return{...a,episodes:n}}o(jt,"parseAtom");function we(e){const t=new DOMParser().parseFromString(e,"text/xml");if(t.querySelector("parsererror"))throw new Error("this does not look like a valid feed (XML parse error)");const a=t.querySelector("channel");if(a)return Lt(a);const n=t.querySelector("feed");if(n)return jt(n);throw new Error("unrecognised feed format — expected RSS or Atom")}o(we,"parseFeed");function Qe(e=""){let t=3735928559,a=1103547991;for(let n=0;n<e.length;n++){const i=e.charCodeAt(n);t=Math.imul(t^i,2654435761),a=Math.imul(a^i,1597334677)}return t=Math.imul(t^t>>>16,2246822507)^Math.imul(a^a>>>13,3266489909),a=Math.imul(a^a>>>16,2246822507)^Math.imul(t^t>>>13,3266489909),(4294967296*(2097151&a)+(t>>>0)).toString(36)}o(Qe,"hash");const le=o((e="")=>/^(https?|feed|podcast):\/\//i.test(e)||!/\s/.test(e)&&/\.[a-z]{2,}(\/|$)/i.test(e),"looksLikeUrl");function G(e=""){const t=document.createElement("div");return t.innerHTML=e,(t.textContent||"").replace(/\s+/g," ").trim()}o(G,"plain");function me(e=""){const t=document.createElement("div");return t.innerHTML=String(e).replace(/<\/(p|div|li|h[1-6]|tr)>/gi,`

`).replace(/<br\s*\/?>/gi,`
`),(t.textContent||"").replace(/\n{3,}/g,`

`).split(`

`).map(a=>a.trim()).filter(Boolean)}o(me,"paragraphs");function Re(e,t="",a=!1){const n=t.trim().toLowerCase();return n?e.filter(i=>i.title.toLowerCase().includes(n)||a&&i.podcast?.title.toLowerCase().includes(n)):e}o(Re,"filterEpisodes");const Ae=o((e,t)=>[...e].sort((a,n)=>t==="oldest"?(a.pubDate||0)-(n.pubDate||0):t==="alpha"?a.title.localeCompare(n.title,void 0,{sensitivity:"base"}):(n.pubDate||0)-(a.pubDate||0)),"sortEpisodes"),Ct=o((e,t)=>[...e].sort((a,n)=>t==="alpha"?a.title.localeCompare(n.title,void 0,{sensitivity:"base"}):(n.lastEpisodeAt||0)-(a.lastEpisodeAt||0)),"sortPodcasts"),U=o((e,t)=>RAT.app.router.go(t==null?`/${e}`:`/${e}/${encodeURIComponent(t)}`),"go"),B=o(e=>"p"+Qe(e),"podcastIdByHash"),Bt=o((e,t)=>`${e}:${Qe(t)}`,"episodeIdByHash"),E=o(()=>RAT.app.database,"db$1"),Ze=o(async(e,t)=>(await e.keys()).filter(a=>String(a).startsWith(t)),"keysOf"),Ee={position:0,duration:0,done:!1,doneAt:0,saved:!1,savedAt:0,updatedAt:0};async function zt(){A.progress.clear();for(const[e,t]of await E().progress.entries())A.progress.set(e,t)}o(zt,"load");const de=o(e=>A.progress.get(e)??Ee,"stateOf"),Vt=o(()=>[...A.progress.entries()].filter(([,e])=>e.saved).sort(([,e],[,t])=>t.savedAt-e.savedAt).map(([e])=>e),"savedIds");async function xe(e,t){const a={...Ee,...A.progress.get(e),...t,updatedAt:Date.now()};return A.progress.set(e,a),await E().progress.set(e,a),a}o(xe,"patchProgress");const et=o((e,t,a)=>xe(e,{position:t,duration:a}),"setProgress"),Te=o((e,t=!0)=>xe(e,{done:t,doneAt:t?Date.now():0}),"markDone"),qt=o(e=>Te(e,!de(e).done),"toggleDone"),Ft=o(e=>{const t=!de(e).saved;return xe(e,{saved:t,savedAt:t?Date.now():0})},"toggleSaved");function Se(e,{episodes:t,...a}){const n=B(e),i=t.filter(l=>l.audioUrl).map(l=>{const c=l.guid||l.audioUrl;return{...l,guid:c,id:Bt(n,c),podcastId:n}});return{podcast:{...a,id:n,url:e,title:a.title||e,lastFetched:Date.now(),lastEpisodeAt:i.reduce((l,c)=>Math.max(l,c.pubDate||0),0),episodeCount:i.length},episodes:i}}o(Se,"toRecords");async function tt(e,t){await E().podcasts.set(e.id,e),await Promise.all(t.map(a=>E().episodes.set(a.id,a)))}o(tt,"store");async function at(e,t,{onStep:a}={}){const n=F(e),i=B(n);if(await E().podcasts.get(i))throw new Error("already subscribed to this feed");t||a?.("reading");const u=t??we(await ye(n));if(!u.episodes.length)throw new Error("no episodes found in this feed");a?.("saving");const{podcast:l,episodes:c}=Se(n,u),s={...l,addedAt:Date.now()};return await tt(s,c),s}o(at,"subscribe$1");async function nt(e){const t=await E().podcasts.get(e);if(!t)return{added:0};const a=we(await ye(t.url)),{podcast:n,episodes:i}=Se(t.url,a),u=new Set(await Ze(E().episodes,e+":")),l=i.filter(c=>!u.has(c.id)).length;return await tt({...n,addedAt:t.addedAt},i),{added:l}}o(nt,"refresh");async function Yt(e){const t=await E().podcasts.values(),a=[];let n=0;for(const i of t){try{a.push(await nt(i.id))}catch(u){a.push({podcast:i,error:u?.message||String(u)})}e?.(++n,t.length)}return a}o(Yt,"refreshAll");async function Wt(e){const t=await Ze(E().episodes,e+":");await E().podcasts.delete(e),await Promise.all(t.flatMap(a=>[E().episodes.delete(a),E().progress.delete(a)]));for(const a of t)A.progress.delete(a)}o(Wt,"unsubscribe");const ot=o((e,t)=>`${e}
${t}`,"stateKey");async function Jt(){const e=await E().podcasts.as(Object),t={};for(const[a,{updatedAt:n,...i}]of A.progress.entries()){if(!i.saved&&!i.done&&!i.position)continue;const u=await E().episodes.get(a),l=u&&e[u.podcastId];l&&(t[ot(l.url,u.guid)]=i)}return{app:"zugriff-podcasts",version:1,exportedAt:new Date().toISOString(),feeds:Object.values(e).map(({url:a,title:n})=>({url:a,title:n})),state:t}}o(Jt,"exportData");async function Gt(e,t){if(!e||!Array.isArray(e.feeds))throw new Error("not a podcasts export file");const a=[];let n=0;for(const l of e.feeds){const c=F(l.url||"");if(!c)a.push({url:l.url,skipped:"no url"});else if(await E().podcasts.get(B(c)))a.push({url:c,skipped:"already subscribed"});else try{await at(c),a.push({url:c,added:!0})}catch(s){a.push({url:c,error:s?.message||String(s)})}t?.(++n,e.feeds.length)}const i=await E().podcasts.as(Object),u=[];for(const l of await E().episodes.values()){const c=i[l.podcastId],s=c&&e.state?.[ot(c.url,l.guid)];s&&u.push([l.id,{...Ee,...s,updatedAt:Date.now()}])}await Promise.all(u.map(([l,c])=>E().progress.set(l,c)));for(const[l,c]of u)A.progress.set(l,c);return a}o(Gt,"importData");function F(e){let t=(e||"").trim();return t?(t=t.replace(/^(podcast|feed):\/\//i,"https://"),/^https?:\/\//i.test(t)||(t="https://"+t),t):""}o(F,"normalizeUrl");const x={load:zt,stateOf:de,savedIds:Vt,setProgress:et,markDone:Te,toggleDone:qt,toggleSaved:Ft,subscribe:at,refresh:nt,refreshAll:Yt,unsubscribe:Wt,exportData:Jt,importData:Gt,normalizeUrl:F},ve=[.8,1,1.2,1.5,1.75,2],b=new Audio;b.preload="metadata";const f={duration:S(0),episode:S(null),playing:S(!1),rate:S(1),time:S(0),waiting:S(!1),play(e){if(f.episode.value?.id===e.id)return f.toggle();f.episode.value=e,b.src=e.audioUrl,b.currentTime=de(e.id).position||0,b.playbackRate=f.rate.value,b.play()},toggle(){b.paused?b.play():b.pause()},seek(e){b.currentTime=e},skip(e){b.currentTime=Math.max(0,b.currentTime+e)},cycleRate(){const e=ve[(ve.indexOf(f.rate.value)+1)%ve.length]??1;f.rate.value=b.playbackRate=e},close(){b.pause(),b.removeAttribute("src"),f.episode.value=null}};let ze=0;b.addEventListener("timeupdate",()=>{f.time.value=b.currentTime||0;const e=f.episode.value;e&&Math.abs(b.currentTime-ze)>5&&(ze=b.currentTime,et(e.id,b.currentTime,b.duration||0))});b.addEventListener("durationchange",()=>{f.duration.value=b.duration||0});b.addEventListener("ended",()=>{f.episode.value&&Te(f.episode.value.id)});b.addEventListener("pause",()=>{f.playing.value=!1});b.addEventListener("play",()=>{f.playing.value=!0});b.addEventListener("playing",()=>{f.waiting.value=!1});b.addEventListener("waiting",()=>{f.waiting.value=!0});const ge=oe("settings",yt({menu:Ce("bottom","top"),player:Ce("bottom","top")}).create());Q(()=>{const{dataset:e}=document.documentElement;e.menu=ge.menu,e.player=ge.player});const Kt=864e5,Xt={day:"numeric",month:"short",year:"numeric"},He=o(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),se=o(e=>{const t=He(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,Xt)},"date"),_t=o(e=>{const t=He(e);if(!e||isNaN(t))return"";const a=(Date.now()-t)/Kt;return a<0?se(t):a<1?"today":a<2?"yesterday":a<7?`${Math.floor(a)} days ago`:se(t)},"ago"),Qt=o(e=>{const t=He(e);if(!e||isNaN(t))return"";const a=Math.round((Date.now()-t)/6e4);return a<1?"just now":a<60?`${a} min ago`:a<1440?`${Math.round(a/60)} h ago`:a<10080?`${Math.round(a/1440)} d ago`:se(t)},"since"),Zt=o(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),a=Math.floor(t/3600),n=String(Math.floor(t%3600/60)).padStart(a?2:1,"0"),i=String(t%60).padStart(2,"0");return a?`${a}:${n}:${i}`:`${n}:${i}`},"duration"),ea=o(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],a=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**a).toFixed(1)} ${t[a]}`},"bytes"),I={ago:_t,bytes:ea,date:se,duration:Zt,since:Qt};function K(e,t){return ta.call({props:e},e,t)}o(K,"LinkRatHtml");function ta(e,t){return r`
    <a.link class=${()=>e.class} href=${()=>e.href} title=${()=>e.title} target="_blank" rel="noopener">
      ${d(()=>e.icon,()=>r`<svg-icon icon=${()=>e.icon} />`)}
      ${()=>e.label??e.text??""}
      ${t}
    </a>
  `}o(ta,"$$LinkRatHtml");function X(e,t){return aa.call({props:e},e,t)}o(X,"ActionMenuRatHtml");function aa(e,t){return r`
    <div.action-menu>
      ${t}
      ${N(()=>e.items??[],a=>a,a=>r`
          ${d(()=>a.href,()=>r`<${K} ...${a} />`,()=>r`<btn-push ...${a} />`)}
        `)}
    </div>
  `}o(aa,"$$ActionMenuRatHtml");function L(e,t){return na.call({props:e},e,t)}o(L,"ArtworkRatHtml");function na(e,t){let{src:a}=M(this.props,{src:null}),n=D(null),i=D(!1);Q(()=>{const l=a.value;if(i.value=!1,!l){n.value=null;return}const c=RAT.app.thumbnails;if(!c){n.value=l;return}const s=c.peek(l);if(s){n.value=s;return}n.value=null;let $=!0;return c.request(l).then(h=>{$&&(n.value=h||l)}),()=>{$=!1}});function u(){return r`
      ${d(()=>n.value&&!i.value,()=>r`<img loading="lazy" src=${()=>n.value} onerror=${g(()=>i.value=!0)} />`,()=>r`<svg-icon icon="podcast" />`)}
    `}return o(u,"picture"),r`
    ${d(()=>e.onclick,()=>r`<button.art.not-a-button class=${()=>e.class} aria-label=${()=>ue(e["aria-label"])} onclick=${g(e.onclick)}>${()=>u()}</button>`,()=>r`<div.art class=${()=>e.class}>${()=>u()}</div>`)}
  `}o(na,"$$ArtworkRatHtml");const oa=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
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
}`;function z(e,t){return ia.call({props:e},e,t)}o(z,"EmptyRatHtml");function ia(e,t){return ke("ihnpco",oa),r`
    <div.empty data-rat="ihnpco">
      ${d(()=>e.icon,()=>r`<svg-icon icon=${()=>e.icon} />`)}
      ${d(()=>e.title,()=>r`<p.title>${()=>e.title}</p>`)}
      ${d(()=>e.hint,()=>r`<p.hint>${()=>e.hint}</p>`)}
      ${t}
    </div>
  `}o(ia,"$$EmptyRatHtml");function T(e,t){return la.call({props:e},e,t)}o(T,"ViewHeaderRatHtml");function la(e,t){const a=o(()=>RAT.app.router.go(RAT.app.resolve(e.back)),"back");return r`
    <header.view-header>
      ${d(()=>typeof e.back=="string",()=>r`<btn-icon.view-back icon="arrow-left" label="back" onclick=${g(a)} />`,()=>d(()=>e.back,()=>r`<btn-icon.view-back icon="arrow-left" label="back" ...${e.back} />`))}
      ${d(()=>e.title,()=>r`<h1>${()=>e.title}</h1>`)}
      <div.view-tools>${t}</div>
    </header>
  `}o(la,"$$ViewHeaderRatHtml");function sa(e,t){return ra.call({props:e},e,t)}o(sa,"EpisodeDetailViewRatHtml");function ra(e,t){const a=RAT.app.database,n=a.podcasts.$items,i=a.episodes.$items;let{id:u}=M(this.props,{id:null});const l=p(()=>i.find(R=>R.id===u.value)??null),c=p(()=>l.value&&n.find(R=>R.id===l.value.podcastId)),s=p(()=>x.stateOf(u.value)),$=p(()=>s.value.duration||l.value?.duration||0),h=p(()=>s.value.done?100:$.value&&s.value.position?Math.min(100,s.value.position/$.value*100):0),P=p(()=>f.episode.value?.id===u.value&&f.playing.value),m=p(()=>[{icon:P.value?"pause":"play",label:P.value?"Pause":s.value.position&&!s.value.done?"Resume":"Play",onclick:o(()=>f.play(l.value),"onclick")},{icon:"bookmark",label:s.value.saved?"Remove from list":"Save for later",onclick:o(()=>x.toggleSaved(u.value),"onclick")},{icon:s.value.done?"played":"unplayed",label:s.value.done?"Mark unplayed":"Mark as done",onclick:o(()=>x.toggleDone(u.value),"onclick")},l.value?.link&&{icon:"external",label:"Episode page",href:l.value.link}].filter(Boolean)),k=p(()=>({label:c.value?c.value.title:"Back",onclick:o(()=>c.value?U("podcast",c.value.id):U("latest"),"onclick")}));return r`
    ${d(()=>!l.value,()=>r`
        <${T} back="latest" />
        <${z} icon="alert" title="episode not found" />
      `,()=>r`
        <${T} ...${{get back(){return k.value}}} />
        <main>
          <${L} ...${{get src(){return l.value.image||c.value?.image}}} />
          <div.info>
            ${d(()=>c.value,()=>r`<button onclick=${g(()=>U("podcast",c.value.id))}>${()=>c.value.title}</button>`)}
            <h1>${()=>l.value.title}</h1>
            <div.meta>
              <span>${()=>I.ago(l.value.pubDate)}</span>
              ${d(()=>l.value.duration,()=>r`<span> ${()=>I.duration(l.value.duration)}</span>`)}
              ${d(()=>s.value.done,()=>r`<span>· <svg-icon icon="played" /> done</span>`)}
            </div>
            <${X} ...${{get items(){return m.value}}} />
            <aufbau-progress value=${()=>h.value} />
          </div>
          ${d(()=>me(l.value.description).length,()=>r`
              <div>
                ${N(()=>me(l.value.description),R=>R,R=>r`<p>${()=>R}</p>`)}
              </div>
            `,()=>r`<i>No description.</i>`)}
        </main>
      `)}
  `}o(ra,"$$EpisodeDetailViewRatHtml");const te=o(e=>(t,a)=>wt.notify(t,{...a,type:e}),"notify"),H=Object.assign(te("info"),{error:te("error"),info:te("info"),success:te("success")}),ae=o(()=>RAT.app.database,"db"),re=o((e={})=>F(e.url||e.feedUrl||""),"urlOf"),it=o((e={})=>e.id||B(re(e)),"idOf"),ca=o(e=>{const t=F(e.feedUrl);return e.kind==="episode"?{...e,url:t,podcastId:B(t)}:{...e,url:t,id:B(t)}},"keyed"),Ve=o(e=>({author:e.author,id:e.podcastId,image:e.image,title:e.podcast,url:e.url}),"podcastOf"),ua=o(e=>({addedAt:Date.now(),author:e.author||"",count:e.count??e.episodeCount??0,genre:e.genre||"",id:it(e),image:e.image||"",title:e.title||re(e),url:re(e)}),"toRow"),V=new Map;function da(e){const t=F(e);if(!t)return Promise.reject(new Error("no feed url"));if(V.has(t))return V.get(t);const a=(async()=>{const n=we(await ye(t));return{feed:n,id:B(t),url:t,...Se(t,n)}})();return a.catch(()=>V.delete(t)),V.set(t,a),a}o(da,"preview");async function he(e){const t=ua(e);if(await ae().shortlist.get(t.id))return await ae().shortlist.delete(t.id),!1;if(!t.url)throw new Error("no feed url to remember");return await ae().shortlist.set(t.id,t),!0}o(he,"toggleRemembered");const ce=S({}),fe=o((e,t)=>{const{[e]:a,...n}=ce.value;ce.value=t?{...n,[e]:t}:n},"setStep");async function pa(e){const t=it(e);if(ce.value[t])return;const a=re(e);fe(t,"reading");try{const n=V.has(a)?await V.get(a).catch(()=>null):null,i=await x.subscribe(a,n?.feed,{onStep:o(u=>fe(t,u),"onStep")});return await ae().shortlist.delete(i.id),H.success(`Subscribed to ${i.title}`),i}catch(n){H.error(n)}finally{fe(t,null)}}o(pa,"subscribe");const W=o(e=>U("explore-podcast",e),"open"),$a={reading:"Reading feed …",saving:"Saving …"},qe=o((e,t)=>t?{icon:"bookmark",label:"Forget",title:"Remove from the shortlist",onclick:o(()=>he(e),"onclick")}:{icon:"bookmark-unfilled",label:"Remember",title:"Keep for a closer look later",onclick:o(()=>he(e),"onclick")},"rememberAction");function be(e,t){const a=ce.value[e.id];return t?{icon:"check",label:"In library",onclick:o(()=>U("podcast",e.id),"onclick")}:a?{icon:"loading",label:$a[a],disabled:!0}:{icon:"add",label:"Subscribe",onclick:o(()=>pa(e),"onclick")}}o(be,"subscribeAction");const va=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function Pe(e,t){return fa.call({props:e},e,t)}o(Pe,"LoadingRatHtml");function fa(e,t){return ke("1tn1js8",va),r`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${d(()=>e.text,()=>r`<span>${()=>e.text}</span>`)}
    </div>
  `}o(fa,"$$LoadingRatHtml");function De(e,t){return ma.call({props:e},e,t)}o(De,"DateLabelRatHtml");function ma(e,t){return r`<span.date>${()=>e.relative?I.ago(e.value):I.date(e.value)}</span>`}o(ma,"$$DateLabelRatHtml");function ga(e,t){return ha.call({props:e},e,t)}o(ga,"PreviewEpisodesRatHtml");function ha(e,t){return r`
    ${d(()=>e.episodes.length,()=>r`
        <data-index.preview-episodes viewmode="list">
          ${N(()=>e.episodes,n=>n,n=>r`
              <data-item>
                <${L} ...${{get src(){return n.image}}} />
                <div.meta>
                  <${De} ...${{get value(){return n.pubDate}}} />
                  <span.dur>${()=>I.duration(n.duration)}</span>
                </div>
                <div.title>${()=>n.title}</div>
                ${d(()=>G(n.description),()=>r`<p.teaser>${()=>G(n.description).slice(0,240)}</p>`)}
                ${d(()=>n.link,()=>r`<${K} ...${{get href(){return n.link}}} icon="external" label="Episode page" />`)}
              </data-item>
            `)}
        </data-index>
      `,()=>r`<${z} ...${e.empty} />`)}
  `}o(ha,"$$PreviewEpisodesRatHtml");function ba(e,t){return ka.call({props:e},e,t)}o(ba,"ExplorePodcastViewRatHtml");function ka(e,t){const a=RAT.app.database,n=a.podcasts.$items,i=a.shortlist.$items;let{$id:u}=M(this.props,{$id:null}),l=D(null),c=D("");Q(()=>{const m=u.value;let k=!0;return l.value=null,c.value="",da(m).then(R=>{k&&(l.value=R)}).catch(R=>{k&&(c.value=R?.message||String(R))}),()=>{k=!1}});const s=p(()=>l.value?.podcast),$=p(()=>!!s.value&&n.some(m=>m.id===s.value.id)),h=p(()=>!!s.value&&i.some(m=>m.id===s.value.id)),P=o(()=>he({author:s.value.author,count:s.value.episodeCount,id:s.value.id,image:s.value.image,title:s.value.title,url:u.value}),"remember");return r`
    ${d(()=>c.value,()=>r`
        <${T} back="explore" title="Explore" />
        <${z} icon="alert" title="could not read that feed" ...${{get hint(){return c.value}}} />
      `,()=>d(()=>!l.value,()=>r`
          <${T} back="explore" title="Explore" />
          <${Pe} text="reading the feed …" />
        `,()=>r`
          <${T} back="explore" ...${{get title(){return s.value.title}}}>
            <div.actions>
              <btn-push icon=${()=>h.value?"bookmark":"bookmark-unfilled"} title=${()=>h.value?"Remove from the shortlist":"Keep for a closer look later"} onclick=${g(P)} />
              <btn-push ...${be({id:s.value.id,url:u.value},$.value)} />
            </div>
          </${T}>
          <main>
            <${L} ...${{get src(){return s.value.image}}} />
            <div.info>
              <div.stats>${()=>l.value.episodes.length} episode(s)</div>
              ${d(()=>s.value.author,()=>r`<div.author>${()=>s.value.author}</div>`)}
              ${N(()=>me(s.value.description),m=>m,m=>r`<p.about>${()=>m}</p>`)}
              ${d(()=>s.value.link,()=>r`<${K} ...${{get href(){return s.value.link}}} icon="web" label="Website" />`)}
              <${K} ...${{get href(){return u.value}}} icon="rss" label="Feed" />
            </div>
            <div.section><span>Episodes</span></div>
            <${ga} ...${{get episodes(){return Ae(l.value.episodes,"newest")},get empty(){return{icon:"no-episodes",title:"This feed has no playable episodes"}}}} />
          </main>
        `))}
  `}o(ka,"$$ExplorePodcastViewRatHtml");function ya(e,t){return wa.call({props:e},e,t)}o(ya,"PlayToggleRatHtml");function wa(e,t){const a=this.props.episode,n=p(()=>f.episode.value?.id===a.id),i=p(()=>n.value&&f.playing.value),u=p(()=>n.value&&f.waiting.value);return r`<btn-push.play-toggle aria-label=${()=>ue(i.value?"Pause":"Play")} icon=${()=>u.value?"loading":i.value?"pause":"play"} title=${()=>i.value?"Pause":"Play"} onclick=${g(()=>f.play(a))} />`}o(wa,"$$PlayToggleRatHtml");function Ra(e,t){return Aa.call({props:e},e,t)}o(Ra,"EpisodeItemRatHtml");function Aa(e,t){const a=this.props.episode,n=a.podcast,i=p(()=>x.stateOf(a.id)),u=p(()=>i.value.done?100:i.value.duration?Math.min(100,i.value.position/i.value.duration*100):0),l=p(()=>[{icon:i.value.saved?"bookmark":"bookmark-outline",label:i.value.saved?"Remove from list":"Save for later",onclick:o(()=>x.toggleSaved(a.id),"onclick")},{icon:i.value.done?"played":"unplayed",label:i.value.done?"Mark unplayed":"Mark as done",onclick:o(()=>x.toggleDone(a.id),"onclick")},{icon:"external",href:a.link,title:"open episode page"}]);return r`
    <data-item class:done=${()=>i.value.done} class:playing=${()=>f.episode.value?.id===a.id} ref=${Rt(Ht,()=>({onSwipeLeft:o(()=>alert("swipe left"),"onSwipeLeft")}))}>
      <${L} aria-label="open episode" ...${{get src(){return a.image||n?.image},onclick:o(()=>U("episode",a.id),"onclick")}} />
      <div.meta>
        ${d(()=>n,()=>r`<btn-push label=${()=>n.title} onclick=${g(()=>U("podcast",n.id))} />`)}
        <${De} ...${{get value(){return a.pubDate}}} />
        <span.dur>${()=>I.duration(a.duration)}</span>
      </div>
      <btn-push.title label=${()=>a.title} onclick=${g(()=>U("episode",a.id))} />
      ${d(()=>i.value.position||i.value.done,()=>r`<aufbau-progress value=${()=>u.value} />`)}
      <${X} ...${{get items(){return l.value}}}><${ya} ...${{get episode(){return a}}} /></${X}>
    </data-item>
  `}o(Aa,"$$EpisodeItemRatHtml");function Ne(e,t){return Ea.call({props:e},e,t)}o(Ne,"EpisodesIndexRatHtml");function Ea(e,t){return r`
    ${d(()=>e.episodes.length,()=>r`
        <data-index viewmode="list">
          ${N(()=>e.episodes,a=>a,a=>r`<${Ra} ...${{get episode(){return a}}} />`)}
        </data-index>
      `,()=>r`<${z} ...${e.empty} />`)}
  `}o(Ea,"$$EpisodesIndexRatHtml");function j(e,t){return xa.call({props:e},e,t)}o(j,"PickerRatHtml");function xa(e,t){const a=o(s=>typeof s=="object"&&s!==null&&!Array.isArray(s),"isObject"),n=e.signal??(ne(e.value)?e.value:null),i=o(s=>Array.isArray(s)?{label:String(s[1]??s[0]),title:String(s[1]??s[0]),value:s[0]}:a(s)?{icon:s.icon,label:s.label??(s.icon?"":String(s.value)),title:s.title??s.label??String(s.value),value:s.value}:{label:String(s),title:String(s),value:s},"normalize"),u=p(()=>n?n.value:e.value),l=p(()=>(e.options??n?.values??[]).map(i));function c(s){const $=s.detail?.value??s.target?.value;n&&(n.value=$),e.onchange?.($)}return o(c,"change"),r`
    <input-value class=${()=>e.class} look=${()=>e.look} placeholder=${()=>e.placeholder} searchable=${()=>e.searchable||null} src=${()=>e.src} value=${()=>u.value} onchange=${g(c)}>
      ${N(()=>l.value,s=>s,s=>r`<input-option icon=${()=>s.icon} label=${()=>s.label} title=${()=>s.title} value=${()=>s.value} />`)}
    </input-value>
  `}o(xa,"$$PickerRatHtml");function pe(e,t){return Ta.call({props:e},e,t)}o(pe,"SearchPanelRatHtml");function Ta(e,t){let{value:a}=M(this.props,{value:null});return r`
    <div.search-panel>
      <input-search placeholder=${()=>e.placeholder} value=${()=>a.value} oninput=${g(n=>a.value=n.currentTarget.value??"")} />
      ${d(()=>a.value,()=>r`<btn-icon icon="close" label="clear filter" onclick=${g(()=>a.value="")} />`)}
    </div>
  `}o(Ta,"$$SearchPanelRatHtml");function Sa(e,t){return Ha.call({props:e},e,t)}o(Sa,"PodcastDetailViewRatHtml");function Ha(e,t){const a=RAT.app.database,n=a.podcasts.$items,i=a.episodes.$items;let{id:u}=M(this.props,{id:null}),{busy:l,search:c}=M(A,{busy:null,search:null});const s=new At("newest","oldest","alpha"),$=p(()=>n.find(w=>w.id===u.value)??null),h=p(()=>Ae(i.filter(w=>w.podcastId===u.value).map(w=>({...w,podcast:$.value})),s.value)),P=p(()=>Re(h.value,c.value)),m=p(()=>h.value.filter(w=>x.stateOf(w.id).done).length);async function k(){if(!confirm(`Unsubscribe from “${$.value.title}”? This removes its episodes and their progress.`))return;const w=[$.value.image,...h.value.map(C=>C.image)].filter(Boolean);await x.unsubscribe(u.value),RAT.app.thumbs?.evict(w).catch(()=>{}),H.success("unsubscribed"),U("podcasts")}o(k,"remove");async function R(){l.value="refreshing…";try{const{added:w}=await x.refresh(u.value);H.success(w?`${w} new episode(s)`:"Up to date")}catch(w){H.error(w)}finally{l.value=""}}return o(R,"refresh"),r`
    ${d(()=>!$.value,()=>r`
        <${T} back="podcasts" />
        <${z} icon="alert" title="Podcast not found" />
      `,()=>r`
        <${T} back="podcasts" ...${{get title(){return $.value.title}}}>
          <div.actions>
            <btn-icon icon="refresh" label="refresh" onclick=${g(R)} disabled=${()=>!!l.value} />
            <btn-icon.danger icon="trash" label="delete" onclick=${g(k)} />
          </div>
        </${T}>
        <main>
          <${L} ...${{get src(){return $.value.image}}} />
          <div.info>
            <div.stats>${()=>P.value.length} episodes · ${()=>m.value} done</div>
            ${d(()=>$.value.title,()=>r`<div.title>${()=>$.value.title}</div>`)}
            ${d(()=>$.value.author,()=>r`<div.author>${()=>$.value.author}</div>`)}
            ${d(()=>$.value.description,()=>r`<p.about>${()=>G($.value.description).slice(0,400)}</p>`)}
            ${d(()=>$.value.link,()=>r`<${K} ...${{get href(){return $.value.link}}} icon="web" label="Website" />`)}
          </div>
          <div>
            <span>Episodes</span>
            <${j} ...${{get signal(){return s}}} look="segments" />
          </div>
          <${Ne} ...${{get episodes(){return P.value},get empty(){return{icon:"no-results",title:"Nothing matches your filter"}}}} />
        </main>
        ${d(()=>h.value.length,()=>r`<${pe} placeholder="filter episodes …" ...${{value:c}} />`)}
      `)}
  `}o(Ha,"$$PodcastDetailViewRatHtml");let J=null;const Z=S(!1),lt=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Pa=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!lt;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),J=e,Z.value=!0});addEventListener("appinstalled",()=>{J=null,Z.value=!1});async function Da(){if(!J)return!1;const e=J;return J=null,Z.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}o(Da,"install");function Na(e){const t=o(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),H(`${e} can be installed: see the settings`))},"show");Z.value?t():addEventListener("beforeinstallprompt",t,{once:!0})}o(Na,"hint");const Ma="https://itunes.apple.com/search",Me="any",Oa=[{value:Me,label:"anything"},{value:"titleTerm",label:"title"},{value:"authorTerm",label:"author"},{value:"descriptionTerm",label:"description"},{value:"genreIndex",label:"genre"}],Fe="US";function Ua(){try{return new Intl.Locale(globalThis.navigator?.language||"en-US").maximize?.().region||Fe}catch{return Fe}}o(Ua,"localCountry");async function st(e,t){let a;try{a=await Ut(`${Ma}?${e}`,{signal:t})}catch(n){throw n.name==="AbortError"?n:new Error(`could not reach the podcast directory (${n.message})`)}if(a?.errorMessage)throw new Error(a.errorMessage);return a}o(st,"request");function rt(e,t,{limit:a=25,country:n,attribute:i}={}){const u=new URLSearchParams({media:"podcast",entity:e,term:t,limit:a});return n&&u.set("country",n),i&&i!==Me&&u.set("attribute",i),u}o(rt,"queryFor");const Ia=o(e=>({kind:"podcast",id:String(e.collectionId??e.feedUrl),title:e.collectionName||e.trackName||"",author:e.artistName||"",feedUrl:e.feedUrl||"",image:e.artworkUrl600||e.artworkUrl100||"",count:e.trackCount||0,genre:e.primaryGenreName||""}),"toPodcast"),La=o(e=>({kind:"episode",id:String(e.trackId??e.episodeGuid??e.trackName),title:e.trackName||"",podcast:e.collectionName||"",author:e.artistName||"",feedUrl:e.feedUrl||"",image:e.artworkUrl600||e.artworkUrl160||e.artworkUrl60||"",date:Date.parse(e.releaseDate)||0,duration:e.trackTimeMillis?Math.round(e.trackTimeMillis/1e3):0,description:e.shortDescription||e.description||"",link:e.trackViewUrl||""}),"toEpisode");async function ct(e,t={}){const a=(e||"").trim();return a?((await st(rt("podcast",a,t),t.signal))?.results||[]).map(Ia).filter(i=>i.feedUrl):[]}o(ct,"searchPodcasts");async function ja(e,t={}){const a=(e||"").trim();return a?((await st(rt("podcastEpisode",a,t),t.signal))?.results||[]).map(La).filter(i=>i.feedUrl):[]}o(ja,"searchEpisodes");function Ye(e,t){return Ca.call({props:e},e,t)}o(Ye,"ModalRatHtml");function Ca(e,t){return r`
    <div.modal-backdrop onclick=${g(o(n=>{n.target===n.currentTarget&&e.onclose?.()},"backdrop"))}>
      <div.modal class=${()=>e.class}>
        ${d(()=>e.headline||e.info,()=>r`
            <header>
              ${d(()=>e.headline,()=>r`<h2>${()=>e.headline}</h2>`)}
              ${d(()=>e.info,()=>r`<i>${()=>e.info}</i>`)}
            </header>
          `)}
        <main>${t}</main>
        ${d(()=>e.actions?.length,()=>r`
            <footer>
              ${N(()=>e.actions,n=>n,n=>r`<btn-push ...${n} />`)}
            </footer>
          `)}
      </div>
    </div>
  `}o(Ca,"$$ModalRatHtml");function Ba(e,t){return za.call({props:e},e,t)}o(Ba,"AddPodcastDialogRatHtml");function za(e,t){let{dialog:n}=M(A,{dialog:null}),i=D(""),u=D([]),l=D(!1),c=D("");const s=o(()=>n.value=null,"close");Q(()=>{const m=i.value.trim();if(c.value="",!m||le(m)){u.value=[];return}const k=new AbortController,R=setTimeout(async()=>{l.value=!0;try{u.value=await ct(m,{signal:k.signal}),u.value.length||(c.value="nothing found for that name")}catch(w){w.name!=="AbortError"&&(c.value=w.message)}finally{k.signal.aborted||(l.value=!1)}},300);return()=>{clearTimeout(R),k.abort()}});async function $(m){if(!(!m||l.value)){l.value=!0;try{const k=await x.subscribe(m);H.success(`Subscribed to ${k.title}`),s(),U("podcast",k.id)}catch(k){H.error(k),c.value=k?.message||String(k)}finally{l.value=!1}}}o($,"add");const h=o(()=>{le(i.value.trim())&&$(i.value.trim())},"submit"),P=[{label:"cancel",onclick:s}];return r`
    <${Ye} class="add-podcast" headline="Add a podcast" info="Search by name, or paste an RSS feed URL." ...${{get actions(){return P},onclose:s}}>
      <input type="search" autofocus placeholder="darknet diaries — or https://example.com/feed.xml" ref=${Et(i,"value")} onkeydown=${g(h,{keys:"enter"})} />
      ${d(()=>c.value,()=>r`<i.note>${()=>c.value}</i>`)}
      ${d(()=>l.value,()=>r`<${Pe} text="searching …" />`)}
      ${d(()=>u.value.length,()=>r`
          <ul.results>
            ${N(()=>u.value,m=>m,m=>r`
                <li>
                  <button onclick=${g(()=>$(m.feedUrl))} disabled=${()=>l.value}>
                    <${L} ...${{get src(){return m.image}}} />
                    <span.meta>
                      <span.title>${()=>m.title}</span>
                      <span.sub>
                        ${()=>m.author}
                        ${()=>m.count?` · ${m.count} episodes`:""}
                      </span>
                    </span>
                  </button>
                </li>
              `)}
          </ul>
        `)}
    </${Ye}>
  `}o(za,"$$AddPodcastDialogRatHtml");function Va(e,t){return qa.call({props:e},e,t)}o(Va,"DockRatHtml");function qa(e,t){const a=p(()=>RAT.app?.router.$path.value??"/"),n=o((l,c)=>l==="/"?c==="/":c===l||c.startsWith(`${l}/`),"owns"),i=o(l=>l.to!=null&&[l.to,...l.match??[]].some(c=>n(c,a.value)),"isActive"),u=o(l=>l.onclick?l.onclick():RAT.app.router.go(l.to),"run");return r`
    <nav.dock>
      ${N(()=>e.items??[],l=>l,l=>r`<btn-tap class=${()=>i(l)?"col active":"col"} aria-current=${()=>ue(i(l)?"page":null)} icon=${()=>l.icon} label=${()=>l.label} onclick=${g(()=>u(l))} />`)}
    </nav>
  `}o(qa,"$$DockRatHtml");const Fa=[{value:"podcasts",label:"podcasts",icon:"podcast"},{value:"episodes",label:"episodes",icon:"episodes"}],Ya={attribute:S(Me),country:S(Ua()),query:S(""),tab:S("podcasts")};function Wa(e,t){return Ja.call({props:e},e,t)}o(Wa,"ExploreViewRatHtml");function Ja(e,t){const a="../.shared/json/countries.json",u={episodes:{icon:"episodes",title:"Search for an episode",hint:"Episodes are found by title, author or description across the whole directory."},podcasts:{icon:"bookmark-unfilled",title:"Nothing on the shortlist",hint:"Search for a podcast, open it, and remember it to come back to it later."},search:{icon:"no-results",title:"Nothing found",hint:"Try another name, another storefront, or paste a feed URL."}},l=RAT.app.database,c=l.podcasts.$items,s=l.shortlist.$items;let{attribute:$,country:h,query:P,tab:m}=M(Ya,{attribute:null,country:null,query:null,tab:null}),{dialog:k}=M(A,{dialog:null}),R=D([]),w=D(!1),C=D("");const Y=p(()=>P.value.trim()),Oe=p(()=>le(Y.value)),ee=p(()=>new Set(c.map(v=>v.id))),Ue=p(()=>new Set(s.map(v=>v.id))),Ie=p(()=>Y.value?R.value:m.value==="podcasts"?s.toArray():[]),ut=p(()=>Y.value?u.search:u[m.value]);Q(()=>{const v=Y.value,vt=m.value,ft=h.value,mt=$.value;if(R.value=[],C.value="",!v||le(v)){w.value=!1;return}const $e=new AbortController,gt=vt==="episodes"?ja:ct,ht=setTimeout(async()=>{w.value=!0;try{R.value=(await gt(v,{attribute:mt,country:ft,signal:$e.signal})).map(ca),R.value.length||(C.value="nothing found for that")}catch(Le){Le.name!=="AbortError"&&(C.value=Le.message)}finally{$e.signal.aborted||(w.value=!1)}},300);return()=>{clearTimeout(ht),$e.abort()}});const dt=o(v=>[v.author,v.genre,v.count?`${v.count} episode(s)`:""].filter(Boolean).join(" · "),"podcastMeta");function pt(v){return r`
      <data-item class:subscribed=${()=>ee.value.has(v.id)}>
        <${L} aria-label="open podcast" ...${{get src(){return v.image},onclick:o(()=>W(v.url),"onclick")}} />
        <div.meta>${()=>dt(v)}</div>
        <btn-push.title label=${()=>v.title} onclick=${g(()=>W(v.url))} />
        <${X} ...${{get items(){return[qe(v,Ue.value.has(v.id)),be(v,ee.value.has(v.id))]}}} />
      </data-item>
    `}o(pt,"podcastItem");function $t(v){return r`
      <data-item class:subscribed=${()=>ee.value.has(v.podcastId)}>
        <${L} aria-label="open podcast" ...${{get src(){return v.image},onclick:o(()=>W(v.url),"onclick")}} />
        <div.meta>
          <${De} ...${{get value(){return v.date}}} />
          <span.dur>${()=>I.duration(v.duration)}</span>
        </div>
        <btn-push.title label=${()=>v.title} onclick=${g(()=>W(v.url))} />
        ${d(()=>G(v.description),()=>r`<p.teaser>${()=>G(v.description).slice(0,200)}</p>`)}
        <${X} ...${{get items(){return[qe(Ve(v),Ue.value.has(v.podcastId)),be(Ve(v),ee.value.has(v.podcastId)),v.link&&{icon:"external",href:v.link,title:"open the episode in the store"}].filter(Boolean)}}} />
      </data-item>
    `}return o($t,"episodeItem"),r`
    <${T} title="explore"><btn-icon icon="add" label="Add by URL" onclick=${g(()=>k.value="add")} /></${T}>
    <main>
      <${j} class="tabs" look="segments" ...${{get options(){return Fa},value:m}} />
      <${pe} placeholder="darknet diaries — or https://example.com/feed.xml" ...${{value:P}} />
      <div.filters>
        <${j} class="country" placeholder="country" look="combobox" ...${{get src(){return a}}} searchable ...${{value:h}} />
        <${j} class="attribute" placeholder="attribute" look="combobox" ...${{get options(){return Oa},value:$}} />
      </div>
      ${d(()=>Oe.value,()=>r`<btn-push icon="rss" label="Open this feed" onclick=${g(()=>W(Y.value))} />`)}
      ${d(()=>C.value,()=>r`<i.note>${()=>C.value}</i>`)}
      ${d(()=>w.value,()=>r`<${Pe} text="searching …" />`)}
      ${d(()=>!Oe.value,()=>r`
          ${d(()=>!Ie.value.length,()=>r`<${z} ...${ut.value} />`,()=>r`
              <data-index class=${()=>m.value==="episodes"?"explore-episodes":null} viewmode="list">
                ${N(()=>Ie.value,v=>v,v=>r`${()=>m.value==="episodes"?$t(v):pt(v)}`)}
              </data-index>
            `)}
        `)}
    </main>
  `}o(Ja,"$$ExploreViewRatHtml");function Ga(e,t){return Ka.call({props:e},e,t)}o(Ga,"LatestViewRatHtml");function Ka(e,t){const a=RAT.app.database,n=a.podcasts.$items,i=a.episodes.$items;let{busy:u,dialog:l,search:c}=M(A,{busy:null,dialog:null,search:null});const s=p(()=>n.length>0),$=p(()=>Object.fromEntries(n.map(k=>[k.id,k]))),h=p(()=>i.map(k=>({...k,podcast:$.value[k.podcastId]}))),P=p(()=>Re(Ae(h.value,"newest"),c.value,!0).slice(0,200)),m=p(()=>s.value?c.value?{icon:"no-results",title:"Nothing matches your filter"}:{icon:"no-episodes",title:"No episodes found",hint:"Try refreshing your feeds."}:{icon:"rss",title:"No subscriptions yet",hint:"Add a podcast by its RSS feed URL to see its latest episodes here."});return r`
    <${T} title="latest episodes"><btn-icon icon="refresh" onclick=${Ge("refresh-all")} disabled=${()=>!!u.value} /></${T}>
    <main>
      ${d(()=>s.value,()=>r`<${pe} ...${{value:c}} />`)}
      <${Ne} ...${{get episodes(){return P.value},get empty(){return m.value}}} />
      ${d(()=>!s.value,()=>r`<btn-push icon="add" label="Add a podcast" onclick=${g(()=>l.value="add")} />`)}
    </main>
  `}o(Ka,"$$LatestViewRatHtml");function Xa(e,t){return _a.call({props:e},e,t)}o(Xa,"PlayerRatHtml");function _a(e,t){const a=RAT.app.database.podcasts.$items,n=p(()=>f.episode.value),i=p(()=>n.value&&a.find(s=>s.id===n.value.podcastId)),u=p(()=>f.duration.value||n.value?.duration||0),l=p(()=>f.time.value),c=p(()=>n.value&&x.stateOf(n.value.id).done);return r`
    ${d(()=>n.value,()=>r`
        <div.player>
          <div.meta>
            <${L} ...${{get src(){return n.value.image||i.value?.image}}} />
            <div.info>
              <div.title title=${()=>n.value.title}>${()=>n.value.title}</div>
              <div.podcast>${()=>i.value?.title||""}</div>
            </div>
          </div>
          <div.controls>
            <btn-icon icon="back-15" label="Back 15s" onclick=${g(()=>f.skip(-15))} />
            <btn-icon.play icon=${()=>f.waiting.value?"loading":f.playing.value?"pause":"play"} title=${()=>f.playing.value?"Pause":"Play"} onclick=${g(f.toggle)} />
            <btn-icon icon="ahead-30" label="Forward 30s" onclick=${g(()=>f.skip(30))} />
          </div>
          <div.scrub>
            <span.time>${()=>I.duration(l.value)}</span>
            <input.range type="range" min="0" step="1" max=${()=>Math.max(u.value,1)} value=${()=>Math.min(l.value,u.value||l.value)} oninput=${g(s=>f.seek(Number(s.target.value)))} />
            <span.time>${()=>u.value?"-"+I.duration(u.value-l.value):""}</span>
          </div>
          <div.right>
            <button.rate title="Playback speed" onclick=${g(f.cycleRate)}>${()=>f.rate.value}</button>
            <btn-icon icon=${()=>c.value?"played":"unplayed"} label="Mark as done" aria-pressed=${()=>ue(c.value)} onclick=${g(()=>x.toggleDone(n.value.id))} />
            <btn-icon icon="close" label="close player" onclick=${g(f.close)} />
          </div>
        </div>
      `)}
  `}o(_a,"$$PlayerRatHtml");function Qa(e,t){return Za.call({props:e},e,t)}o(Qa,"PodcastsIndexRatHtml");function Za(e,t){return r`
    ${d(()=>e.podcasts.length,()=>r`
        <data-index viewmode=${()=>e.viewmode??"list"} item-size="150px">
          ${N(()=>e.podcasts,a=>a,a=>r`
              <data-item onclick=${g(()=>U("podcast",a.id))}>
                <${L} ...${{get src(){return a.image}}} />
                <div.title>${()=>a.title}</div>
                <div.sub>${()=>a.episodeCount} episode(s) · ${()=>I.date(a.lastEpisodeAt)}</div>
              </data-item>
            `)}
        </data-index>
      `,()=>r`<${z} ...${e.empty} />`)}
  `}o(Za,"$$PodcastsIndexRatHtml");function en(e,t){return tn.call({props:e},e,t)}o(en,"PodcastsViewRatHtml");function tn(e,t){const a=RAT.app.database.podcasts.$items;let{dialog:n}=M(A,{dialog:null}),i=oe("sorting","newest"),u=oe("viewmode","list");const l=p(()=>Ct(a.toArray(),i.value)),c={hint:"Paste a podcast's RSS feed URL to subscribe.",icon:"rss",title:"No subscriptions yet"};return r`
    <${T} title="podcasts">
      <${j} look="segments" ...${{get options(){return[["newest","newest"],["alpha","a–z"]]},get value(){return i.value},onchange:o(s=>i.value=s,"onchange")}} />
      <${j} look="segments" ...${{get options(){return[["list","list"],["grid","grid"]]},get value(){return u.value},onchange:o(s=>u.value=s,"onchange")}} />
      <btn-icon icon="add" label="add" onclick=${g(()=>n.value="add")} />
    </${T}>
    <main><${Qa} ...${{get podcasts(){return l.value},get viewmode(){return u.value},get empty(){return c}}} /></main>
  `}o(tn,"$$PodcastsViewRatHtml");async function an(){const e=await x.exportData(),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),a=URL.createObjectURL(t),n=`podcasts-${new Date().toISOString().slice(0,10)}.json`,i=Object.assign(document.createElement("a"),{download:n,href:a});document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e3),H.success(`Exported ${e.feeds.length} subscription(s)`)}o(an,"exportFeeds");async function nn(e){if(!e)return;let t;try{t=JSON.parse(await e.text())}catch{H.error("Could not read that file");return}A.dialog.value=null,A.busy.value="Importing…";try{const a=await x.importData(t,(u,l)=>A.busy.value=`Importing ${u}/${l}…`),n=a.filter(u=>u.added).length,i=a.filter(u=>u.error).length;H(`added: ${n} | failed: ${i}`,{type:i?"error":"success"})}catch(a){H.error(a)}finally{A.busy.value=""}}o(nn,"importFeeds");function on(e,t){return ln.call({props:e},e,t)}o(on,"ExportRatHtml");function ln(e,t){let a=D(null);return r`
    <div.export>
      <span.field-label>Subscriptions</span>
      <i>Back up your subscriptions and listening progress as JSON, or restore from a file.</i>
      <span>
        <btn-push icon="download" label="Export JSON" onclick=${g(an)} />
        <btn-push icon="upload" label="Import JSON" onclick=${g(()=>a.value?.click())} />
        <input hidden type="file" accept="application/json,.json" ref=${xt(a)} onchange=${g(n=>{nn(n.target.files[0]),n.target.value=""})} />
      </span>
    </div>
  `}o(ln,"$$ExportRatHtml");function sn(e,t){return rn.call({props:e},e,t)}o(sn,"PreferencesRatHtml");function rn(e,t){const a=Pt(()=>ge);return r`
    <section>
      <h3>podcasts</h3>
      <label>
        <span>Menu</span>
        <${j} look="segments" ...${{get options(){return["bottom","top"]},get value(){return a.value.menu},onchange:o(n=>a.value.menu=n,"onchange")}} />
      </label>
      <label>
        <span>Player</span>
        <${j} look="segments" ...${{get options(){return["bottom","top"]},get value(){return a.value.player},onchange:o(n=>a.value.player=n,"onchange")}} />
      </label>
      <${on} />
    </section>
  `}o(rn,"$$PreferencesRatHtml");function cn(e,t){return un.call({props:e},e,t)}o(cn,"SavedViewRatHtml");function un(e,t){const a=RAT.app.database,n=a.podcasts.$items,i=a.episodes.$items;let{search:u}=M(A,{search:null});const l=p(()=>Object.fromEntries(i.map(h=>[h.id,h]))),c=p(()=>Object.fromEntries(n.map(h=>[h.id,h]))),s=p(()=>Re(x.savedIds().map(h=>l.value[h]).filter(Boolean).map(h=>({...h,podcast:c.value[h.podcastId]})),u.value,!0)),$={icon:"bookmarks",title:"Your list is empty",hint:"Tap the bookmark on any episode to keep it here."};return r`
    <${T} title="listen later" />
    <main>
      <${pe} ...${{value:u}} />
      <${Ne} ...${{get episodes(){return s.value},get empty(){return $}}} />
    </main>
  `}o(un,"$$SavedViewRatHtml");const _=oe("appearance",{}),We={density:q.densities,geometry:q.geometries,mode:q.modes},dn=o(()=>_.value,"appearance"),pn=o(()=>q.palettes().catch(()=>[]),"palettes");function $n(e,t){return _.value={..._.value,[e]:t||null},q.set({[e]:t||null})}o($n,"setAppearance");Object.keys(_.value).length&&q.set(_.value);const vn=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function Je(e,t){return fn.call({props:e},e,t)}o(Je,"SettingsRatHtml");function fn(e,t){ke("177zzh1",vn);let a=D({...dn()}),n=D([]);const i=p(()=>Z.value);pn().then(c=>{n.value=c});function u(c,s){const $=s.detail?.value??s.target.value;a.value={...a.value,[c]:$},$n(c,$)}o(u,"change");async function l(){await Da()&&H.success(`${e.name??"the app"} is installed`)}return o(l,"installApp"),r`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>a.value.palette??"zombie"} onchange=${g(c=>u("palette",c))}>
            ${N(()=>n.value,c=>c,c=>r`<input-option value=${()=>c}>${()=>c}</input-option>`)}
          </input-value>
        </label>
        ${N(()=>Object.keys(We),c=>c,c=>r`
            <label>
              <span>${()=>c}</span>
              <input-value look="segments" value=${()=>a.value[c]??""} onchange=${g(s=>u(c,s))}>
                ${N(()=>We[c],s=>s,s=>r`<input-option value=${()=>s}>${()=>s}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${d(()=>!lt,()=>r`
          <section>
            <h3>install</h3>
            ${d(()=>i.value,()=>r`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${g(l)} />`,()=>r`
                ${d(()=>Pa,()=>r`<p.hint>Share, then "Add to Home Screen".</p>`,()=>r`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}o(fn,"$$SettingsRatHtml");function An(e,t){return mn.call({props:e},e,t)}o(An,"AppRatHtml");function mn(e,t){let{busy:a,dialog:n}=M(A,{busy:null,dialog:null});RAT.app.on("error",H.error),RAT.app.hold(x.load()),Na("Podcasts");async function i(){if(!(await RAT.app.database.podcasts.keys()).length){n.value="add";return}a.value="Refreshing …";try{const l=await x.refreshAll(($,h)=>{a.value=`Refreshing ${$}/${h} …`}),c=l.reduce(($,h)=>$+(h.added||0),0),s=l.filter($=>$.error).length;H(`${c} new episode(s), ${s} feed(s) failed`,{type:s?"error":"success"})}finally{a.value=""}}o(i,"refreshAll"),RAT.app.commands.assign({"add-podcast":o(()=>{n.value="add"},"add-podcast"),"close-dialog":o(()=>{n.value=null},"close-dialog"),"refresh-all":i,"skip-back":o(()=>f.skip(-15),"skip-back"),"skip-forward":o(()=>f.skip(30),"skip-forward"),"toggle-play":o(()=>{f.episode.value&&f.toggle()},"toggle-play")});const u=[{icon:"episodes",label:"Episodes",match:["/episode"],to:"/"},{icon:"grid",label:"Podcasts",match:["/podcast"],to:"/podcasts"},{icon:"bookmark",label:"Later",to:"/saved"},{icon:"explore",label:"Explore",match:["/explore-podcast"],to:"/explore"},{icon:"settings",label:"Settings",onclick:o(()=>RAT.app.toggle("config"),"onclick")}];return r`
    <rat-view name="latest" route="/"><${Ga} /></rat-view>
    <rat-view name|route="podcasts"><${en} /></rat-view>
    <rat-view name|route="saved"><${cn} /></rat-view>
    <rat-view name|route="explore"><${Wa} /></rat-view>
    <rat-view name="episode" route="/episode/:id" component=${()=>sa} transition="slide" />
    <rat-view name="podcast" route="/podcast/:id" component=${()=>Sa} transition="slide" />
    <rat-view name="explore-podcast" route="/explore-podcast/:id" component=${()=>ba} transition="slide" />
    ${d(()=>n.value==="add",()=>r`<${Ba} />`)}
    <rat-area name="dock" dock="bottom" overlay="never" open><${Xa} /><${Va} ...${{get items(){return u}}} /></rat-area>
    <rat-area name="config" dock="end"><${Je} name="Podcasts"><${sn} /></${Je}></rat-area>
  `}o(mn,"$$AppRatHtml");export{An as default};
