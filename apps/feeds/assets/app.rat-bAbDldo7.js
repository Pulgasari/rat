var he=Object.defineProperty;var o=(e,t)=>he(e,"name",{value:t,configurable:!0});import{P as ge,Q as h,T as $e,V,q as k,W as be,w as f,h as l,X as B,f as A,Y as R,Z as ye,a0 as q}from"./index-BsU6Oj3Z.js";import{p as we,a as ke}from"./keys-CWTtq0D5.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function z(e,t){const n={};for(const a of Object.keys(t)){const i=e?.[a],r=t[a];n[a]=ge(i)?i:h(()=>e[a]===void 0&&r?r():e[a])}return new Proxy(e??{},{get:o((a,i)=>Object.hasOwn(n,i)?n[i]:a[i],"get")})}o(z,"signalsOf");function p(e,{keys:t=null,prevent:n=!1,times:a=0}={}){const i=t?we(t):null;let r=a;return function(s){if(!(a&&!r)&&!(i&&!ke(s,i))){n&&s.preventDefault(),a&&r--;try{const u=(typeof e=="string"?$e(e):e).call(this,s);typeof u?.catch=="function"&&u.catch(d=>V(this,d,"handler"))}catch(u){V(this,u,"handler")}}}}o(p,"listener");const Ae="https://api.allorigins.win/raw?url={url}",Re=o(()=>globalThis.Capacitor?.isNativePlatform?.()?globalThis.Capacitor.Plugins?.CapacitorHttp??null:null,"nativeHttp");function Te(e,t){const n=(e??"").trim();if(!n)return null;const a=encodeURIComponent(t);return n.includes("{url}")?n.replaceAll("{url}",a):n+a}o(Te,"viaProxy");async function X(e,{accept:t,as:n,signal:a}){const i=await fetch(e,{headers:t?{accept:t}:{},redirect:"follow",signal:a});if(!i.ok)throw new Error(`HTTP ${i.status}`);return n==="json"?i.json():i.text()}o(X,"viaFetch");async function xe(e,t,{accept:n,as:a}){const i=await e.request({headers:n?{accept:n}:{},method:"GET",responseType:a,url:t});if(i.status<200||i.status>=300)throw new Error(`HTTP ${i.status}`);return a==="json"&&typeof i.data=="string"?JSON.parse(i.data):i.data}o(xe,"viaNative");async function Se(e,{accept:t,as:n="text",proxy:a=Ae,signal:i}={}){const r=Re();if(r)return xe(r,e,{accept:t,as:n});let s;try{return await X(e,{accept:t,as:n,signal:i})}catch(d){if(d.name==="AbortError")throw d;s=d}const u=Te(a,e);if(!u)throw new Error(`could not reach ${e} (${s.message})`);try{return await X(u,{accept:t,as:n,signal:i})}catch(d){throw d.name==="AbortError"?d:new Error(`could not reach ${e}, direct and through the proxy (${d.message})`)}}o(Se,"get");const De=o((e,t={})=>Se(e,{...t,as:"text"}),"getText"),J=o((e,t)=>De(e,{accept:t}),"fetchText"),Q=o(e=>J(e,"application/rss+xml, application/atom+xml, application/xml, text/xml, */*"),"fetchFeed"),v=o((e,t)=>[...e.children].filter(n=>n.localName===t),"local"),c=o((e,t)=>v(e,t)[0]?.textContent?.trim()||"","localText");function Z(e){const t=Date.parse((e||"").trim());return Number.isNaN(t)?0:t}o(Z,"parseDate");const L=typeof document<"u"?document.createElement("textarea"):null;function H(e,t=320){let n=(e||"").replace(/<[^>]*>/g," ");return L&&(L.innerHTML=n,n=L.value),n=n.replace(/\s+/g," ").trim(),n.length>t?n.slice(0,t).replace(/\s+\S*$/,"")+"…":n}o(H,"toText");function F(e){const t=v(e,"thumbnail").find(r=>r.getAttribute("url"))||v(e,"group").flatMap(r=>v(r,"thumbnail")).find(r=>r.getAttribute("url"));if(t)return t.getAttribute("url");const n=v(e,"image").find(r=>r.getAttribute("href"));if(n)return n.getAttribute("href");const a=v(e,"content").find(r=>(r.getAttribute("medium")==="image"||(r.getAttribute("type")||"").startsWith("image"))&&r.getAttribute("url"));if(a)return a.getAttribute("url");const i=v(e,"image")[0];return i&&(c(i,"url")||i.getAttribute("href"))||""}o(F,"imageFrom");function Ie(e){const t={title:c(e,"title"),description:H(c(e,"description")),link:v(e,"link").map(a=>a.textContent.trim()).find(Boolean)||"",image:F(e)},n=v(e,"item").map(a=>({guid:c(a,"guid")||v(a,"link").map(i=>i.textContent.trim()).find(Boolean)||c(a,"title"),title:c(a,"title")||"(untitled)",link:v(a,"link").map(i=>i.textContent.trim()).find(Boolean)||"",author:c(a,"creator")||c(a,"author")||t.title,pubDate:Z(c(a,"pubDate")||c(a,"date")),summary:H(c(a,"description")||c(a,"encoded")||c(a,"summary")),image:F(a)}));return{...t,kind:"feed",items:n}}o(Ie,"parseRss");function Ee(e){const t=!!c(e,"channelId")||v(e,"entry").some(r=>c(r,"videoId")),n=o((r,s="alternate")=>{const u=v(r,"link");return(u.find(d=>(d.getAttribute("rel")||"alternate")===s&&d.getAttribute("href"))||u.find(d=>d.getAttribute("href")))?.getAttribute("href")||""},"linkHref"),a={title:c(e,"title"),description:H(c(e,"subtitle")),link:n(e),image:c(e,"logo")||c(e,"icon")||F(e),author:v(e,"author").map(r=>c(r,"name")).find(Boolean)||""},i=v(e,"entry").map(r=>{const s=v(r,"group")[0];return{guid:c(r,"id")||c(r,"videoId")||n(r),title:c(r,"title")||"(untitled)",link:n(r),author:v(r,"author").map(u=>c(u,"name")).find(Boolean)||a.author||a.title,pubDate:Z(c(r,"published")||c(r,"updated")),summary:H(c(r,"summary")||c(r,"content")||s&&c(s,"description")),image:F(r)}});return{...a,kind:t?"youtube":"feed",items:i}}o(Ee,"parseAtom");function ee(e){const t=new DOMParser().parseFromString(e,"text/xml");if(t.querySelector("parsererror"))throw new Error("this does not look like a valid feed (XML parse error)");const n=t.querySelector("channel");if(n)return Ie(n);const a=t.querySelector("feed");if(a)return Ee(a);throw new Error("unrecognised feed format — expected RSS or Atom")}o(ee,"parseFeed");const He=o(e=>/(^|\.)youtube\.com|youtu\.be/i.test(e||""),"isYouTubeUrl"),O=o(e=>`https://www.youtube.com/feeds/videos.xml?channel_id=${e}`,"CHANNEL_FEED"),Fe=o(e=>`https://www.youtube.com/feeds/videos.xml?playlist_id=${e}`,"PLAYLIST_FEED");async function Me(e){const t=(e||"").trim();if(!t)return null;if(/youtube\.com\/feeds\/videos\.xml/i.test(t))return t;if(/^UC[\w-]{20,}$/.test(t))return O(t);if(!He(t))return null;const n=t.match(/\/channel\/(UC[\w-]+)/i);if(n)return O(n[1]);const a=t.match(/[?&]list=([\w-]+)/i);if(a)return Fe(a[1]);const i=await J(t,"text/html, */*"),r=i.match(/"channelId":"(UC[\w-]+)"/)?.[1]||i.match(/\/channel\/(UC[\w-]+)/)?.[1]||i.match(/"externalId":"(UC[\w-]+)"/)?.[1];if(!r)throw new Error("could not find the channel behind that YouTube link");return O(r)}o(Me,"resolveYouTube");const $=o(()=>RAT.app.database,"db"),Ne=`
`,Ce=o((e,t)=>e+Ne+t,"keyOf"),m=k([]),b=k([]),y=k(new Set),x=k({}),Le=k(!1),Y=o(e=>m.value.find(t=>t.id===e)??null,"feedById"),te=h(()=>{const e={};for(const t of b.value)(e[t.feedId]??=[]).push(t);for(const t of Object.values(e))t.sort((n,a)=>a.pubDate-n.pubDate);return e}),ne=o((e,t)=>t.pubDate-e.pubDate,"byDate"),ae=h(()=>b.value.filter(e=>e.kind!=="youtube").sort(ne)),ie=h(()=>b.value.filter(e=>e.kind==="youtube").sort(ne)),oe=o(e=>y.value.has(e),"isRead"),P=o(e=>e.reduce((t,n)=>t+(y.value.has(n.key)?0:1),0),"unreadIn");async function Oe(){const[e,t,n]=await Promise.all([$().feeds.values(),$().items.values(),$().read.keys()]);m.value=e.sort((a,i)=>(a.addedAt||0)-(i.addedAt||0)),b.value=t,y.value=new Set(n),Le.value=!0}o(Oe,"load");async function Ue(e){const t=(e||"").trim();if(!t)throw new Error("paste a feed URL first");const a=await Me(t)||(/^https?:\/\//i.test(t)?t:"https://"+t);if(m.value.some(s=>s.url===a))throw new Error("you already follow that feed");const i=ee(await Q(a)),r={id:crypto.randomUUID(),url:a,title:i.title||a,link:i.link||"",image:i.image||"",kind:i.kind,addedAt:Date.now(),lastFetched:Date.now(),error:""};return await $().feeds.set(r.id,r),m.value=[...m.value,r],await le(r,i.items),r}o(Ue,"addFeed$1");async function re(e){const t=Y(e);if(!t)return 0;x.value={...x.value,[e]:!0};try{const n=ee(await Q(t.url)),a={...t,title:n.title||t.title,link:n.link||t.link,image:n.image||t.image,kind:n.kind,lastFetched:Date.now(),error:""};return await $().feeds.set(e,a),m.value=m.value.map(i=>i.id===e?a:i),await le(a,n.items)}catch(n){const a={...t,error:n?.message||String(n),lastFetched:Date.now()};throw await $().feeds.set(e,a),m.value=m.value.map(i=>i.id===e?a:i),n}finally{x.value={...x.value,[e]:!1}}}o(re,"refresh");async function ze(e){let t=0,n=0;for(const a of m.value){try{n+=await re(a.id)}catch{}e?.(++t,m.value.length)}return n}o(ze,"refreshAll");async function le(e,t){const n=new Set(b.value.filter(i=>i.feedId===e.id).map(i=>i.key)),a=[];for(const i of t){const r=Ce(e.id,i.guid);if(n.has(r))continue;n.add(r);const s={key:r,feedId:e.id,kind:e.kind,addedAt:Date.now(),title:i.title,link:i.link,author:i.author,pubDate:i.pubDate||Date.now(),summary:i.summary,image:i.image};a.push(s),await $().items.set(r,s)}return a.length&&(b.value=[...b.value,...a]),a.length}o(le,"upsertItems");async function Pe(e){const t=b.value.filter(n=>n.feedId===e).map(n=>n.key);if(await $().feeds.delete(e),await Promise.all(t.flatMap(n=>[$().items.delete(n),$().read.delete(n)])),m.value=m.value.filter(n=>n.id!==e),b.value=b.value.filter(n=>n.feedId!==e),t.length){const n=new Set(y.value);t.forEach(a=>n.delete(a)),y.value=n}}o(Pe,"removeFeed$1");function se(e,t=!0){const n=new Set(y.value);if(t){if(n.has(e))return;n.add(e),$().read.set(e,1)}else{if(!n.has(e))return;n.delete(e),$().read.delete(e)}y.value=n}o(se,"markRead");async function je(e){const t=new Set(y.value);await Promise.all(e.map(n=>{if(!t.has(n.key))return t.add(n.key),$().read.set(n.key,1)})),y.value=t}o(je,"markAllRead$1");const E=o(e=>(t,n)=>be.notify(t,{...n,type:e}),"notify"),w=Object.assign(E("info"),{error:E("error"),info:E("info"),success:E("success")});let S=null;const I=k(!1),ue=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Be=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!ue;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),S=e,I.value=!0});addEventListener("appinstalled",()=>{S=null,I.value=!1});async function Ye(){if(!S)return!1;const e=S;return S=null,I.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}o(Ye,"install");function _e(e){const t=o(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),w(`${e} can be installed: see the settings`))},"show");I.value?t():addEventListener("beforeinstallprompt",t,{once:!0})}o(_e,"hint");const g={busy:k(""),feedId:k(null)},j=o(()=>RAT.app.area("menu"),"menu"),ce=o(()=>{j()?.isOverlay&&j().hide()},"closeMenu"),N=h(()=>RAT.app.router?.$path?.value?.split("/")[1]||"latest");function C(e,t=null){t&&(g.feedId.value=t),RAT.app.router.go(e==="latest"?"/":`/${e}`),ce()}o(C,"open");const Ve=o(()=>j()?.toggle(),"toggleMenu"),qe=o(()=>{ce(),RAT.app.area("config")?.toggle()},"toggleConfig"),Xe=h(()=>m.value.filter(e=>e.kind!=="youtube")),Ge=h(()=>m.value.filter(e=>e.kind==="youtube"));function de(e){if(e==="youtube")return{icon:"youtube",kind:"youtube",list:ie.value,title:"YouTube"};if(e==="feed"){const t=Y(g.feedId.value);return t?{feed:t,icon:t.kind==="youtube"?"youtube":"rss",kind:t.kind,list:te.value[t.id]||[],title:t.title}:{icon:"rss",kind:"feed",list:[],title:"Gone"}}return{icon:"latest",kind:"feed",list:ae.value,title:"Latest"}}o(de,"viewOf");const Ke=o(e=>{try{return new URL(e).hostname.replace(/^www\./,"")}catch{return""}},"hostOf"),fe=o(e=>Y(e.feedId)?.title||Ke(e.link),"feedName");async function pe(){const e=(await RAT.app.dialogs.prompt({message:"Paste a feed URL, a site URL, or a YouTube channel / @handle / video link.",ok:"Add",title:"Add feed"}))?.trim();if(e){g.busy.value="Adding feed…";try{const t=await Ue(e);w.success(`Added ${t.title}`),C("feed",t.id)}catch(t){w.error(t.message||String(t))}finally{g.busy.value=""}}}o(pe,"addFeed");async function me(e=N.value){g.busy.value="Refreshing…";try{const t=e==="feed"&&g.feedId.value?await re(g.feedId.value):await ze((n,a)=>g.busy.value=`Refreshing ${n}/${a}…`);w.success(t?`${t} new`:"up to date")}catch(t){w.error(t.message||String(t))}finally{g.busy.value=""}}o(me,"refreshView");async function We(e){await RAT.app.dialogs.confirm({message:`Unfollow “${e.title}”? Its stored entries are removed too.`,ok:"Unfollow",title:e.title})&&(N.value==="feed"&&g.feedId.value===e.id&&C("latest"),await Pe(e.id),w.success("Unfollowed"))}o(We,"removeFeed");function Je(e){const t=de(e).list;je(t),w.success(`Marked ${t.length} read`)}o(Je,"markAllRead");const Qe=864e5,Ze={day:"numeric",month:"short",year:"numeric"},_=o(e=>e instanceof Date?e.getTime():Number(e),"timeOf"),M=o(e=>{const t=_(e);return!e||isNaN(t)?"":new Date(t).toLocaleDateString(void 0,Ze)},"date"),et=o(e=>{const t=_(e);if(!e||isNaN(t))return"";const n=(Date.now()-t)/Qe;return n<0?M(t):n<1?"today":n<2?"yesterday":n<7?`${Math.floor(n)} days ago`:M(t)},"ago"),tt=o(e=>{const t=_(e);if(!e||isNaN(t))return"";const n=Math.round((Date.now()-t)/6e4);return n<1?"just now":n<60?`${n} min ago`:n<1440?`${Math.round(n/60)} h ago`:n<10080?`${Math.round(n/1440)} d ago`:M(t)},"since"),nt=o(e=>{if(e==null||isNaN(e)||e<=0)return"";const t=Math.round(e),n=Math.floor(t/3600),a=String(Math.floor(t%3600/60)).padStart(n?2:1,"0"),i=String(t%60).padStart(2,"0");return n?`${n}:${a}:${i}`:`${a}:${i}`},"duration"),at=o(e=>{if(!e||e<0)return"0 B";const t=["B","KB","MB","GB","TB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024)));return`${(e/1024**n).toFixed(1)} ${t[n]}`},"bytes"),ve={ago:et,bytes:at,date:M,duration:nt,since:tt};function it(e,t){return ot.call({props:e},e,t)}o(it,"ArticleRowRatHtml");function ot(e,t){const n=this.props.item,a=h(()=>!oe(n.key)),i=o(()=>se(n.key),"read");return l`
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
  `}o(ot,"$$ArticleRowRatHtml");const rt=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
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
}`;function G(e,t){return lt.call({props:e},e,t)}o(G,"EmptyRatHtml");function lt(e,t){return B("ihnpco",rt),l`
    <div.empty data-rat="ihnpco">
      ${f(()=>e.icon,()=>l`<svg-icon icon=${()=>e.icon} />`)}
      ${f(()=>e.title,()=>l`<p.title>${()=>e.title}</p>`)}
      ${f(()=>e.hint,()=>l`<p.hint>${()=>e.hint}</p>`)}
      ${t}
    </div>
  `}o(lt,"$$EmptyRatHtml");function st(e,t){return ut.call({props:e},e,t)}o(st,"ImageRatHtml");function ut(e,t){return l`
    ${f(()=>e.onclick,()=>l`<button.naked onclick=${p(e.onclick)}><img src=${()=>e.src} alt=${()=>e.alt??""} loading=${()=>e.loading??"lazy"} /></button>`,()=>l`<img src=${()=>e.src} alt=${()=>e.alt??""} loading=${()=>e.loading??"lazy"} />`)}
  `}o(ut,"$$ImageRatHtml");function ct(e,t){return dt.call({props:e},e,t)}o(ct,"VideoCardRatHtml");function dt(e,t){const n=this.props.item,a=h(()=>!oe(n.key));return l`
    <a.vid class:read=${()=>!a.value} href=${()=>n.link} target="_blank" rel="noopener noreferrer" onclick=${p(()=>se(n.key))}>
      <div.vid-thumb>
        ${f(()=>n.image,()=>l`<${st} ...${{get src(){return n.image}}} />`,()=>l`<div.vid-noimg><svg-icon icon="youtube" /></div>`)}
        ${f(()=>a.value,()=>l`<span.vid-new>new</span>`)}
      </div>
      <div.vid-title>${()=>n.title}</div>
      <div.vid-meta>${()=>fe(n)} · ${()=>ve.since(n.pubDate)}</div>
    </a>
  `}o(dt,"$$VideoCardRatHtml");function U(e,t){return ft.call({props:e},e,t)}o(U,"ListViewRatHtml");function ft(e,t){let{name:n}=z(this.props,{name:null}),{busy:a}=z(g,{busy:null});const i=h(()=>de(n.value)),r=h(()=>m.value.length>0);return l`
    <header.topbar>
      <button.ibtn.nav-toggle aria-label="Menu" onclick=${p(Ve)}><svg-icon icon="menu" /></button>
      <svg-icon.topbar-ic icon=${()=>i.value.icon} />
      <h1.topbar-title title=${()=>i.value.title}>${()=>i.value.title}</h1>
      ${f(()=>i.value.feed?.link,()=>l`<a.ibtn href=${()=>i.value.feed.link} target="_blank" rel="noopener noreferrer" title="Open site"><svg-icon icon="external" /></a>`)}
      <span.topbar-spacer />
      ${f(()=>a.value,()=>l`<span.topbar-busy><svg-icon icon="loading" /> ${()=>a.value}</span>`)}
      ${f(()=>i.value.list.length,()=>l`<button.ibtn title="Mark all read" onclick=${p(()=>Je(n.value))}><svg-icon icon="read-all" /></button>`)}
      <button.ibtn title="Refresh" disabled=${()=>!!a.value} onclick=${p(()=>me(n.value))}><svg-icon icon="refresh" /></button>
    </header>
    <main>
      ${f(()=>!i.value.list.length,()=>l`
          <${G} ...${{get icon(){return r.value?"read-all":"rss"},get title(){return r.value?"Nothing here yet — try Refresh.":"Follow a feed to see the latest here."}}}>
            ${f(()=>!r.value,()=>l`<button.cta onclick=${p(pe)}><svg-icon icon="plus" /> Add your first feed</button>`)}
          </${G}>
        `,()=>f(()=>i.value.kind==="youtube",()=>l`
            <div.videos>
              ${A(()=>i.value.list,s=>s,s=>l`<${ct} ...${{get item(){return s}}} />`)}
            </div>
          `,()=>l`
            <div.posts>
              ${A(()=>i.value.list,s=>s,s=>l`<${it} ...${{get item(){return s}}} />`)}
            </div>
          `))}
    </main>
  `}o(ft,"$$ListViewRatHtml");const D=ye("appearance",{}),K={density:R.densities,geometry:R.geometries,mode:R.modes},pt=o(()=>D.value,"appearance"),mt=o(()=>R.palettes().catch(()=>[]),"palettes");function vt(e,t){return D.value={...D.value,[e]:t||null},R.set({[e]:t||null})}o(vt,"setAppearance");Object.keys(D.value).length&&R.set(D.value);const ht=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function gt(e,t){return $t.call({props:e},e,t)}o(gt,"SettingsRatHtml");function $t(e,t){B("177zzh1",ht);let n=q({...pt()}),a=q([]);const i=h(()=>I.value);mt().then(u=>{a.value=u});function r(u,d){const T=d.detail?.value??d.target.value;n.value={...n.value,[u]:T},vt(u,T)}o(r,"change");async function s(){await Ye()&&w.success(`${e.name??"the app"} is installed`)}return o(s,"installApp"),l`
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
                ${f(()=>Be,()=>l`<p.hint>Share, then "Add to Home Screen".</p>`,()=>l`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}o($t,"$$SettingsRatHtml");const bt=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function yt(e,t){return wt.call({props:e},e,t)}o(yt,"BrandRatHtml");function wt(e,t){return B("1npwj96",bt),l`
    <div.brand data-rat="1npwj96">
      ${f(()=>e.icon,()=>l`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}o(wt,"$$BrandRatHtml");function W(e,t){return kt.call({props:e},e,t)}o(W,"FeedItemRatHtml");function kt(e,t){const n=this.props.feed,a=h(()=>P(te.value[n.id]||[])),i=h(()=>N.value==="feed"&&g.feedId.value===n.id),r=h(()=>x.value[n.id]);return l`
    <div.feed-row class:active=${()=>i.value}>
      <button.feed-open title=${()=>n.title} onclick=${p(()=>C("feed",n.id))}>
        <span.feed-ic>
          ${f(()=>r.value,()=>l`<svg-icon icon="loading" />`,()=>f(()=>n.image,()=>l`<img src=${()=>n.image} alt="" loading="lazy" onerror=${p(s=>s.target.style.display="none")} />`,()=>l`<svg-icon icon=${()=>n.kind==="youtube"?"youtube":"rss"} />`))}
        </span>
        <span.feed-name>${()=>n.title}</span>
        ${f(()=>n.error,()=>l`<svg-icon.feed-err icon="alert" />`,()=>f(()=>a.value>0,()=>l`<span.nav-count>${()=>a.value}</span>`))}
      </button>
      <button.feed-x title="Unfollow" onclick=${p(()=>We(n))}><svg-icon icon="close" /></button>
    </div>
  `}o(kt,"$$FeedItemRatHtml");function At(e,t){return Rt.call({props:e},e,t)}o(At,"SidebarRatHtml");function Rt(e,t){let{busy:n}=z(g,{busy:null});const a=h(()=>Xe.value),i=h(()=>Ge.value);function r(s,u,d,T){return l`
      <button.nav-item class:active=${()=>N.value===s} title=${()=>d} onclick=${p(()=>C(s))}>
        <svg-icon icon=${()=>u} />
        <span.nav-label>${()=>d}</span>
        ${f(()=>T>0,()=>l`<span.nav-count>${()=>T}</span>`)}
      </button>
    `}return o(r,"navItem"),l`
    <div.sidebar>
      <${yt} name="Feeds" icon="./app.svg" />
      <button.add-btn onclick=${p(pe)}><svg-icon icon="plus" /> Add feed</button>
      <div.nav-scroll>
        <div.nav-group>
          ${()=>r("latest","latest","Latest",P(ae.value))}
          ${f(()=>i.value.length,()=>l`${()=>r("youtube","youtube","YouTube",P(ie.value))}`)}
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
        <button.foot-btn onclick=${p(qe)}><svg-icon icon="settings" /> Settings</button>
      </div>
    </div>
  `}o(Rt,"$$SidebarRatHtml");function Ft(e,t){return Tt.call({props:e},e,t)}o(Ft,"AppRatHtml");function Tt(e,t){return RAT.app.on("error",w.error),RAT.app.hold(Oe()),_e("Feeds"),l`
    <rat-area name="menu" dock="start" open><${At} /></rat-area>
    <rat-view name="latest" route="/"><${U} name="latest" /></rat-view>
    <rat-view name|route="feed"><${U} name="feed" /></rat-view>
    <rat-view name|route="youtube"><${U} name="youtube" /></rat-view>
    <rat-area name="config" dock="end"><${gt} name="Feeds" /></rat-area>
  `}o(Tt,"$$AppRatHtml");export{Ft as default};
