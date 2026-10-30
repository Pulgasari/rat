var ge=Object.defineProperty;var o=(e,t)=>ge(e,"name",{value:t,configurable:!0});import{P as $e,Q as h,T as be,V,q as k,W as ye,w as f,h as l,X as B,f as A,Y as S,Z as we,a0 as q}from"./index-D1LDnBtm.js";import{p as ke,a as Ae}from"./keys-CWTtq0D5.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function j(e,t){const n={};for(const a of Object.keys(t)){const i=e?.[a],r=t[a];n[a]=$e(i)?i:h(()=>e[a]===void 0&&r?r():e[a])}return new Proxy(e??{},{get:o((a,i)=>Object.hasOwn(n,i)?n[i]:a[i],"get")})}o(j,"signalsOf");function p(e,{keys:t=null,prevent:n=!1,times:a=0}={}){const i=t?ke(t):null;let r=a;return function(s){if(!(a&&!r)&&!(i&&!Ae(s,i))){n&&s.preventDefault(),a&&r--;try{const u=(typeof e=="string"?be(e):e).call(this,s);typeof u?.catch=="function"&&u.catch(d=>V(this,d,"handler"))}catch(u){V(this,u,"handler")}}}}o(p,"listener");const Re="https://api.allorigins.win/raw?url={url}",Te=o(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.CapacitorHttp??null:null,"nativeHttp");function Se(e,t){const n=(e??"").trim();if(!n)return null;const a=encodeURIComponent(t);return n.includes("{url}")?n.replaceAll("{url}",a):n+a}o(Se,"viaProxy");async function X(e,{accept:t,as:n,signal:a}){const i=await fetch(e,{headers:t?{accept:t}:{},redirect:"follow",signal:a});if(!i.ok)throw new Error(`HTTP ${i.status}`);return n==="json"?i.json():i.text()}o(X,"viaFetch");async function xe(e,t,{accept:n,as:a}){const i=await e.request({headers:n?{accept:n}:{},method:"GET",responseType:a,url:t});if(i.status<200||i.status>=300)throw new Error(`HTTP ${i.status}`);return a==="json"&&typeof i.data=="string"?JSON.parse(i.data):i.data}o(xe,"viaNative");async function De(e,{accept:t,as:n="text",proxy:a=Re,signal:i}={}){const r=Te();if(r)return xe(r,e,{accept:t,as:n});let s;try{return await X(e,{accept:t,as:n,signal:i})}catch(d){if(d.name==="AbortError")throw d;s=d}const u=Se(a,e);if(!u)throw new Error(`could not reach ${e} (${s.message})`);try{return await X(u,{accept:t,as:n,signal:i})}catch(d){throw d.name==="AbortError"?d:new Error(`could not reach ${e}, direct and through the proxy (${d.message})`)}}o(De,"get");const Ie=o((e,t={})=>De(e,{...t,as:"text"}),"getText"),J=o((e,t)=>Ie(e,{accept:t}),"fetchText"),Q=o(e=>J(e,"application/rss+xml, application/atom+xml, application/xml, text/xml, */*"),"fetchFeed"),v=o((e,t)=>[...e.children].filter(n=>n.localName===t),"local"),c=o((e,t)=>v(e,t)[0]?.textContent?.trim()||"","localText");function Z(e){const t=Date.parse((e||"").trim());return Number.isNaN(t)?0:t}o(Z,"parseDate");const L=typeof document<"u"?document.createElement("textarea"):null;function H(e,t=320){let n=(e||"").replace(/<[^>]*>/g," ");return L&&(L.innerHTML=n,n=L.value),n=n.replace(/\s+/g," ").trim(),n.length>t?n.slice(0,t).replace(/\s+\S*$/,"")+"…":n}o(H,"toText");function F(e){const t=v(e,"thumbnail").find(r=>r.getAttribute("url"))||v(e,"group").flatMap(r=>v(r,"thumbnail")).find(r=>r.getAttribute("url"));if(t)return t.getAttribute("url");const n=v(e,"image").find(r=>r.getAttribute("href"));if(n)return n.getAttribute("href");const a=v(e,"content").find(r=>(r.getAttribute("medium")==="image"||(r.getAttribute("type")||"").startsWith("image"))&&r.getAttribute("url"));if(a)return a.getAttribute("url");const i=v(e,"image")[0];return i&&(c(i,"url")||i.getAttribute("href"))||""}o(F,"imageFrom");function Ee(e){const t={title:c(e,"title"),description:H(c(e,"description")),link:v(e,"link").map(a=>a.textContent.trim()).find(Boolean)||"",image:F(e)},n=v(e,"item").map(a=>({guid:c(a,"guid")||v(a,"link").map(i=>i.textContent.trim()).find(Boolean)||c(a,"title"),title:c(a,"title")||"(untitled)",link:v(a,"link").map(i=>i.textContent.trim()).find(Boolean)||"",author:c(a,"creator")||c(a,"author")||t.title,pubDate:Z(c(a,"pubDate")||c(a,"date")),summary:H(c(a,"description")||c(a,"encoded")||c(a,"summary")),image:F(a)}));return{...t,kind:"feed",items:n}}o(Ee,"parseRss");function He(e){const t=!!c(e,"channelId")||v(e,"entry").some(r=>c(r,"videoId")),n=o((r,s="alternate")=>{const u=v(r,"link");return(u.find(d=>(d.getAttribute("rel")||"alternate")===s&&d.getAttribute("href"))||u.find(d=>d.getAttribute("href")))?.getAttribute("href")||""},"linkHref"),a={title:c(e,"title"),description:H(c(e,"subtitle")),link:n(e),image:c(e,"logo")||c(e,"icon")||F(e),author:v(e,"author").map(r=>c(r,"name")).find(Boolean)||""},i=v(e,"entry").map(r=>{const s=v(r,"group")[0];return{guid:c(r,"id")||c(r,"videoId")||n(r),title:c(r,"title")||"(untitled)",link:n(r),author:v(r,"author").map(u=>c(u,"name")).find(Boolean)||a.author||a.title,pubDate:Z(c(r,"published")||c(r,"updated")),summary:H(c(r,"summary")||c(r,"content")||s&&c(s,"description")),image:F(r)}});return{...a,kind:t?"youtube":"feed",items:i}}o(He,"parseAtom");function ee(e){const t=new DOMParser().parseFromString(e,"text/xml");if(t.querySelector("parsererror"))throw new Error("this does not look like a valid feed (XML parse error)");const n=t.querySelector("channel");if(n)return Ee(n);const a=t.querySelector("feed");if(a)return He(a);throw new Error("unrecognised feed format — expected RSS or Atom")}o(ee,"parseFeed");const Fe=o(e=>/(^|\.)youtube\.com|youtu\.be/i.test(e||""),"isYouTubeUrl"),O=o(e=>`https://www.youtube.com/feeds/videos.xml?channel_id=${e}`,"CHANNEL_FEED"),Me=o(e=>`https://www.youtube.com/feeds/videos.xml?playlist_id=${e}`,"PLAYLIST_FEED");async function Ne(e){const t=(e||"").trim();if(!t)return null;if(/youtube\.com\/feeds\/videos\.xml/i.test(t))return t;if(/^UC[\w-]{20,}$/.test(t))return O(t);if(!Fe(t))return null;const n=t.match(/\/channel\/(UC[\w-]+)/i);if(n)return O(n[1]);const a=t.match(/[?&]list=([\w-]+)/i);if(a)return Me(a[1]);const i=await J(t,"text/html, */*"),r=i.match(/"channelId":"(UC[\w-]+)"/)?.[1]||i.match(/\/channel\/(UC[\w-]+)/)?.[1]||i.match(/"externalId":"(UC[\w-]+)"/)?.[1];if(!r)throw new Error("could not find the channel behind that YouTube link");return O(r)}o(Ne,"resolveYouTube");const $=o(()=>RAT.app.database,"db"),Ce=`
`,Le=o((e,t)=>e+Ce+t,"keyOf"),m=k([]),b=k([]),y=k(new Set),T=k({}),Oe=k(!1),Y=o(e=>m.value.find(t=>t.id===e)??null,"feedById"),te=h(()=>{const e={};for(const t of b.value)(e[t.feedId]??=[]).push(t);for(const t of Object.values(e))t.sort((n,a)=>a.pubDate-n.pubDate);return e}),ne=o((e,t)=>t.pubDate-e.pubDate,"byDate"),ae=h(()=>b.value.filter(e=>e.kind!=="youtube").sort(ne)),ie=h(()=>b.value.filter(e=>e.kind==="youtube").sort(ne)),oe=o(e=>y.value.has(e),"isRead"),z=o(e=>e.reduce((t,n)=>t+(y.value.has(n.key)?0:1),0),"unreadIn");async function Ue(){const[e,t,n]=await Promise.all([$().feeds.values(),$().items.values(),$().read.keys()]);m.value=e.sort((a,i)=>(a.addedAt||0)-(i.addedAt||0)),b.value=t,y.value=new Set(n),Oe.value=!0}o(Ue,"load");async function je(e){const t=(e||"").trim();if(!t)throw new Error("paste a feed URL first");const a=await Ne(t)||(/^https?:\/\//i.test(t)?t:"https://"+t);if(m.value.some(s=>s.url===a))throw new Error("you already follow that feed");const i=ee(await Q(a)),r={id:crypto.randomUUID(),url:a,title:i.title||a,link:i.link||"",image:i.image||"",kind:i.kind,addedAt:Date.now(),lastFetched:Date.now(),error:""};return await $().feeds.set(r.id,r),m.value=[...m.value,r],await le(r,i.items),r}o(je,"addFeed$1");async function re(e){const t=Y(e);if(!t)return 0;T.value={...T.value,[e]:!0};try{const n=ee(await Q(t.url)),a={...t,title:n.title||t.title,link:n.link||t.link,image:n.image||t.image,kind:n.kind,lastFetched:Date.now(),error:""};return await $().feeds.set(e,a),m.value=m.value.map(i=>i.id===e?a:i),await le(a,n.items)}catch(n){const a={...t,error:n?.message||String(n),lastFetched:Date.now()};throw await $().feeds.set(e,a),m.value=m.value.map(i=>i.id===e?a:i),n}finally{T.value={...T.value,[e]:!1}}}o(re,"refresh");async function ze(e){let t=0,n=0;for(const a of m.value){try{n+=await re(a.id)}catch{}e?.(++t,m.value.length)}return n}o(ze,"refreshAll");async function le(e,t){const n=new Set(b.value.filter(i=>i.feedId===e.id).map(i=>i.key)),a=[];for(const i of t){const r=Le(e.id,i.guid);if(n.has(r))continue;n.add(r);const s={key:r,feedId:e.id,kind:e.kind,addedAt:Date.now(),title:i.title,link:i.link,author:i.author,pubDate:i.pubDate||Date.now(),summary:i.summary,image:i.image};a.push(s),await $().items.set(r,s)}return a.length&&(b.value=[...b.value,...a]),a.length}o(le,"upsertItems");async function Pe(e){const t=b.value.filter(n=>n.feedId===e).map(n=>n.key);if(await $().feeds.delete(e),await Promise.all(t.flatMap(n=>[$().items.delete(n),$().read.delete(n)])),m.value=m.value.filter(n=>n.id!==e),b.value=b.value.filter(n=>n.feedId!==e),t.length){const n=new Set(y.value);t.forEach(a=>n.delete(a)),y.value=n}}o(Pe,"removeFeed$1");function se(e,t=!0){const n=new Set(y.value);if(t){if(n.has(e))return;n.add(e),$().read.set(e,1)}else{if(!n.has(e))return;n.delete(e),$().read.delete(e)}y.value=n}o(se,"markRead");async function Be(e){const t=new Set(y.value);await Promise.all(e.map(n=>{if(!t.has(n.key))return t.add(n.key),$().read.set(n.key,1)})),y.value=t}o(Be,"markAllRead$1");const E=o(e=>(t,n)=>ye.notify(t,{...n,type:e}),"notify"),w=Object.assign(E("info"),{error:E("error"),info:E("info"),success:E("success")});let x=null;const I=k(!1),ue=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Ye=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!ue;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),x=e,I.value=!0});addEventListener("appinstalled",()=>{x=null,I.value=!1});async function _e(){if(!x)return!1;const e=x;return x=null,I.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}o(_e,"install");function Ve(e){const t=o(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),w(`${e} can be installed: see the settings`))},"show");I.value?t():addEventListener("beforeinstallprompt",t,{once:!0})}o(Ve,"hint");const g={busy:k(""),feedId:k(null)},P=o(()=>RAT.app.area("menu"),"menu"),ce=o(()=>{P()?.isOverlay&&P().hide()},"closeMenu"),N=h(()=>RAT.app.router?.$path?.value?.split("/")[1]||"latest");function C(e,t=null){t&&(g.feedId.value=t),RAT.app.router.go(e==="latest"?"/":`/${e}`),ce()}o(C,"open");const qe=o(()=>P()?.toggle(),"toggleMenu"),Xe=o(()=>{ce(),RAT.app.area("config")?.toggle()},"toggleConfig"),Ge=h(()=>m.value.filter(e=>e.kind!=="youtube")),Ke=h(()=>m.value.filter(e=>e.kind==="youtube"));function de(e){if(e==="youtube")return{icon:"youtube",kind:"youtube",list:ie.value,title:"YouTube"};if(e==="feed"){const t=Y(g.feedId.value);return t?{feed:t,icon:t.kind==="youtube"?"youtube":"rss",kind:t.kind,list:te.value[t.id]||[],title:t.title}:{icon:"rss",kind:"feed",list:[],title:"Gone"}}return{icon:"latest",kind:"feed",list:ae.value,title:"Latest"}}o(de,"viewOf");const We=o(e=>{try{return new URL(e).hostname.replace(/^www\./,"")}catch{return""}},"hostOf"),fe=o(e=>Y(e.feedId)?.title||We(e.link),"feedName");async function pe(){const e=(await RAT.app.dialogs.prompt({message:"Paste a feed URL, a site URL, or a YouTube channel / @handle / video link.",ok:"Add",title:"Add feed"}))?.trim();if(e){g.busy.value="Adding feed…";try{const t=await je(e);w.success(`Added ${t.title}`),C("feed",t.id)}catch(t){w.error(t.message||String(t))}finally{g.busy.value=""}}}o(pe,"addFeed");async function me(e=N.value){g.busy.value="Refreshing…";try{const t=e==="feed"&&g.feedId.value?await re(g.feedId.value):await ze((n,a)=>g.busy.value=`Refreshing ${n}/${a}…`);w.success(t?`${t} new`:"up to date")}catch(t){w.error(t.message||String(t))}finally{g.busy.value=""}}o(me,"refreshView");async function Je(e){await RAT.app.dialogs.confirm({message:`Unfollow “${e.title}”? Its stored entries are removed too.`,ok:"Unfollow",title:e.title})&&(N.value==="feed"&&g.feedId.value===e.id&&C("latest"),await Pe(e.id),w.success("Unfollowed"))}o(Je,"removeFeed");function Qe(e){const t=de(e).list;Be(t),w.success(`Marked ${t.length} read`)}o(Qe,"markAllRead");const Ze=864e5,et={day:"numeric",month:"short",year:"numeric"},_=o(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),M=o(e=>{const t=_(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,et)},"date"),tt=o(e=>{const t=_(e);if(!e||isNaN(t))return"";const n=(Date.now()-t)/Ze;return n<0?M(t):n<1?"today":n<2?"yesterday":n<7?`${Math.floor(n)} days ago`:M(t)},"ago"),nt=o(e=>{const t=_(e);if(!e||isNaN(t))return"";const n=Math.round((Date.now()-t)/6e4);return n<1?"just now":n<60?`${n} min ago`:n<1440?`${Math.round(n/60)} h ago`:n<10080?`${Math.round(n/1440)} d ago`:M(t)},"since"),at=o(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),n=Math.floor(t/3600),a=String(Math.floor(t%3600/60)).padStart(n?2:1,"0"),i=String(t%60).padStart(2,"0");return n?`${n}:${a}:${i}`:`${a}:${i}`},"duration"),it=o(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes"),ve={ago:tt,bytes:it,date:M,duration:at,since:nt};function ot(e,t){return rt.call({props:e},e,t)}o(ot,"ArticleRowRatHtml");function rt(e,t){const n=this.props.item,a=h(()=>!oe(n.key)),i=o(()=>se(n.key),"read");return l`
    <article.post class:read=${()=>!a.value}>
      <span.post-dot class:on=${()=>a.value} aria-hidden="true" />
      <div.post-body>
        <a.post-title href=${()=>n.link} target="_blank" rel="noopener noreferrer" onclick=${p(i)}>${()=>n.title}</a>
        <div.post-meta>
          <span.post-src>${()=>fe(n)}</span>
          <span.dot>·</span>
          <time>${()=>ve.since(n.pubDate)}</time>
        </div>
        ${f(()=>n.summary,()=>l`<p.post-sum>${()=>n.summary}</p>`)}
      </div>
      ${f(()=>n.image,()=>l`<a.post-thumb href=${()=>n.link} target="_blank" rel="noopener noreferrer" onclick=${p(i)}><img src=${()=>n.image} alt="" loading="lazy" onerror=${p(r=>r.target.parentElement.style.display="none")} /></a>`)}
    </article>
  `}o(rt,"$$ArticleRowRatHtml");const lt=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
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
}`;function G(e,t){return st.call({props:e},e,t)}o(G,"EmptyRatHtml");function st(e,t){return B("ihnpco",lt),l`
    <div.empty data-rat="ihnpco">
      ${f(()=>e.icon,()=>l`<svg-icon icon=${()=>e.icon} />`)}
      ${f(()=>e.title,()=>l`<p.title>${()=>e.title}</p>`)}
      ${f(()=>e.hint,()=>l`<p.hint>${()=>e.hint}</p>`)}
      ${t}
    </div>
  `}o(st,"$$EmptyRatHtml");function ut(e,t){return ct.call({props:e},e,t)}o(ut,"ImageRatHtml");function ct(e,t){return l`
    ${f(()=>e.onclick,()=>l`<button.naked onclick=${p(e.onclick)}><img src=${()=>e.src} alt=${()=>e.alt??""} loading=${()=>e.loading??"lazy"} /></button>`,()=>l`<img src=${()=>e.src} alt=${()=>e.alt??""} loading=${()=>e.loading??"lazy"} />`)}
  `}o(ct,"$$ImageRatHtml");function dt(e,t){return ft.call({props:e},e,t)}o(dt,"VideoCardRatHtml");function ft(e,t){const n=this.props.item,a=h(()=>!oe(n.key));return l`
    <a.vid class:read=${()=>!a.value} href=${()=>n.link} target="_blank" rel="noopener noreferrer" onclick=${p(()=>se(n.key))}>
      <div.vid-thumb>
        ${f(()=>n.image,()=>l`<${ut} ...${{get src(){return n.image}}} />`,()=>l`<div.vid-noimg><svg-icon icon="youtube" /></div>`)}
        ${f(()=>a.value,()=>l`<span.vid-new>new</span>`)}
      </div>
      <div.vid-title>${()=>n.title}</div>
      <div.vid-meta>${()=>fe(n)} · ${()=>ve.since(n.pubDate)}</div>
    </a>
  `}o(ft,"$$VideoCardRatHtml");function U(e,t){return pt.call({props:e},e,t)}o(U,"ListViewRatHtml");function pt(e,t){let{name:n}=j(this.props,{name:null}),{busy:a}=j(g,{busy:null});const i=h(()=>de(n.value)),r=h(()=>m.value.length>0);return l`
    <header.topbar>
      <button.ibtn.nav-toggle aria-label="Menu" onclick=${p(qe)}><svg-icon icon="menu" /></button>
      <svg-icon.topbar-ic icon=${()=>i.value.icon} />
      <h1.topbar-title title=${()=>i.value.title}>${()=>i.value.title}</h1>
      ${f(()=>i.value.feed?.link,()=>l`<a.ibtn href=${()=>i.value.feed.link} target="_blank" rel="noopener noreferrer" title="Open site"><svg-icon icon="external" /></a>`)}
      <span.topbar-spacer />
      ${f(()=>a.value,()=>l`<span.topbar-busy><svg-icon icon="loading" /> ${()=>a.value}</span>`)}
      ${f(()=>i.value.list.length,()=>l`<button.ibtn title="Mark all read" onclick=${p(()=>Qe(n.value))}><svg-icon icon="read-all" /></button>`)}
      <button.ibtn title="Refresh" disabled=${()=>!!a.value} onclick=${p(()=>me(n.value))}><svg-icon icon="refresh" /></button>
    </header>
    <main>
      ${f(()=>!i.value.list.length,()=>l`
          <${G} ...${{get icon(){return r.value?"read-all":"rss"},get title(){return r.value?"Nothing here yet — try Refresh.":"Follow a feed to see the latest here."}}}>
            ${f(()=>!r.value,()=>l`<button.cta onclick=${p(pe)}><svg-icon icon="plus" /> Add your first feed</button>`)}
          </${G}>
        `,()=>f(()=>i.value.kind==="youtube",()=>l`
            <div.videos>
              ${A(()=>i.value.list,s=>s,s=>l`<${dt} ...${{get item(){return s}}} />`)}
            </div>
          `,()=>l`
            <div.posts>
              ${A(()=>i.value.list,s=>s,s=>l`<${ot} ...${{get item(){return s}}} />`)}
            </div>
          `))}
    </main>
  `}o(pt,"$$ListViewRatHtml");const D=we("appearance",{}),K={density:S.densities,geometry:S.geometries,mode:S.modes},mt=o(()=>D.value,"appearance"),vt=o(()=>S.palettes().catch(()=>[]),"palettes");function he(e){const t=document.querySelector("rat-app");for(const[n,a]of Object.entries(e))a?t?.setAttribute(n,a):t?.removeAttribute(n);return S.set(e)}o(he,"apply");function ht(e,t){return D.value={...D.value,[e]:t||null},he({[e]:t||null})}o(ht,"setAppearance");Object.keys(D.value).length&&he(D.value);const gt=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function $t(e,t){return bt.call({props:e},e,t)}o($t,"SettingsRatHtml");function bt(e,t){B("177zzh1",gt);let n=q({...mt()}),a=q([]);const i=h(()=>I.value);vt().then(u=>{a.value=u});function r(u,d){const R=d.detail?.value??d.target.value;n.value={...n.value,[u]:R},ht(u,R)}o(r,"change");async function s(){await _e()&&w.success(`${e.name??"the app"} is installed`)}return o(s,"installApp"),l`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${p(u=>r("palette",u))}>
            ${A(()=>a.value,u=>u,u=>l`<input-option value=${()=>u}>${()=>u}</input-option>`)}
          </input-value>
        </label>
        ${A(()=>Object.keys(K),u=>u,u=>l`
            <label>
              <span>${()=>u}</span>
              <input-value look="segments" value=${()=>n.value[u]??""} onchange=${p(d=>r(u,d))}>
                ${A(()=>K[u],d=>d,d=>l`<input-option value=${()=>d}>${()=>d}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${f(()=>!ue,()=>l`
          <section>
            <h3>install</h3>
            ${f(()=>i.value,()=>l`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${p(s)} />`,()=>l`
                ${f(()=>Ye,()=>l`<p.hint>Share, then "Add to Home Screen".</p>`,()=>l`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}o(bt,"$$SettingsRatHtml");const yt=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function wt(e,t){return kt.call({props:e},e,t)}o(wt,"BrandRatHtml");function kt(e,t){return B("1npwj96",yt),l`
    <div.brand data-rat="1npwj96">
      ${f(()=>e.icon,()=>l`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}o(kt,"$$BrandRatHtml");function W(e,t){return At.call({props:e},e,t)}o(W,"FeedItemRatHtml");function At(e,t){const n=this.props.feed,a=h(()=>z(te.value[n.id]||[])),i=h(()=>N.value==="feed"&&g.feedId.value===n.id),r=h(()=>T.value[n.id]);return l`
    <div.feed-row class:active=${()=>i.value}>
      <button.feed-open title=${()=>n.title} onclick=${p(()=>C("feed",n.id))}>
        <span.feed-ic>
          ${f(()=>r.value,()=>l`<svg-icon icon="loading" />`,()=>f(()=>n.image,()=>l`<img src=${()=>n.image} alt="" loading="lazy" onerror=${p(s=>s.target.style.display="none")} />`,()=>l`<svg-icon icon=${()=>n.kind==="youtube"?"youtube":"rss"} />`))}
        </span>
        <span.feed-name>${()=>n.title}</span>
        ${f(()=>n.error,()=>l`<svg-icon.feed-err icon="alert" />`,()=>f(()=>a.value>0,()=>l`<span.nav-count>${()=>a.value}</span>`))}
      </button>
      <button.feed-x title="Unfollow" onclick=${p(()=>Je(n))}><svg-icon icon="close" /></button>
    </div>
  `}o(At,"$$FeedItemRatHtml");function Rt(e,t){return Tt.call({props:e},e,t)}o(Rt,"SidebarRatHtml");function Tt(e,t){let{busy:n}=j(g,{busy:null});const a=h(()=>Ge.value),i=h(()=>Ke.value);function r(s,u,d,R){return l`
      <button.nav-item class:active=${()=>N.value===s} title=${()=>d} onclick=${p(()=>C(s))}>
        <svg-icon icon=${()=>u} />
        <span.nav-label>${()=>d}</span>
        ${f(()=>R>0,()=>l`<span.nav-count>${()=>R}</span>`)}
      </button>
    `}return o(r,"navItem"),l`
    <div.sidebar>
      <${wt} name="Feeds" icon="./app.svg" />
      <button.add-btn onclick=${p(pe)}><svg-icon icon="plus" /> Add feed</button>
      <div.nav-scroll>
        <div.nav-group>
          ${()=>r("latest","latest","Latest",z(ae.value))}
          ${f(()=>i.value.length,()=>l`${()=>r("youtube","youtube","YouTube",z(ie.value))}`)}
        </div>
        ${f(()=>a.value.length,()=>l`
            <div.nav-group>
              <div.nav-title>Feeds</div>
              ${A(()=>a.value,s=>s,s=>l`<${W} ...${{get feed(){return s}}} />`)}
            </div>
          `)}
        ${f(()=>i.value.length,()=>l`
            <div.nav-group>
              <div.nav-title><svg-icon icon="youtube" /> YouTube</div>
              ${A(()=>i.value,s=>s,s=>l`<${W} ...${{get feed(){return s}}} />`)}
            </div>
          `)}
        ${f(()=>!m.value.length,()=>l`<p.nav-hint>No feeds yet — add one above.</p>`)}
      </div>
      <div.side-foot>
        <button.foot-btn disabled=${()=>!!n.value||!m.value.length} onclick=${p(()=>me())}><svg-icon icon="refresh" /> Refresh</button>
        <button.foot-btn onclick=${p(Xe)}><svg-icon icon="settings" /> Settings</button>
      </div>
    </div>
  `}o(Tt,"$$SidebarRatHtml");function Mt(e,t){return St.call({props:e},e,t)}o(Mt,"AppRatHtml");function St(e,t){return RAT.app.on("error",w.error),RAT.app.hold(Ue()),Ve("Feeds"),l`
    <rat-area name="menu" dock="start" open><${Rt} /></rat-area>
    <rat-view name="latest" route="/"><${U} name="latest" /></rat-view>
    <rat-view name|route="feed"><${U} name="feed" /></rat-view>
    <rat-view name|route="youtube"><${U} name="youtube" /></rat-view>
    <rat-area name="config" dock="end"><${$t} name="Feeds" /></rat-area>
  `}o(St,"$$AppRatHtml");export{Mt as default};
