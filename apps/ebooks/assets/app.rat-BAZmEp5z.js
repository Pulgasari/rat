var Ce=Object.defineProperty;var a=(e,t)=>Ce(e,"name",{value:t,configurable:!0});import{P as ge,Q as O,T as Te,V as se,W as Ee,X as C,Y as He,Z as _,a0 as ze,a1 as W,w as h,h as s,a2 as me,f as j,a3 as Le,a4 as je,a5 as Fe,a6 as N,a7 as Ie}from"./index-Bo_YckS0.js";import $e from"https://esm.sh/epubjs@0.3.93";import*as J from"https://esm.sh/pdfjs-dist@4.4.168";import{p as De,a as Ue}from"./keys-CWTtq0D5.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function oe(e,t){const n={};for(const l of Object.keys(t)){const u=e?.[l],o=t[l];n[l]=ge(u)?u:O(()=>e[l]===void 0&&o?o():e[l])}return new Proxy(e??{},{get:a((l,u)=>Object.hasOwn(n,u)?n[u]:l[u],"get")})}a(oe,"signalsOf");function v(e,{keys:t=null,prevent:n=!1,times:l=0}={}){const u=t?De(t):null;let o=l;return function(c){if(!(l&&!o)&&!(u&&!Ue(c,u))){n&&c.preventDefault(),l&&o--;try{const r=(typeof e=="string"?Te(e):e).call(this,c);typeof r?.catch=="function"&&r.catch(i=>se(this,i,"handler"))}catch(r){se(this,r,"handler")}}}}a(v,"listener");const Y=a(e=>(t,n)=>Ee.notify(t,{...n,type:e}),"notify"),D=Object.assign(Y("info"),{error:Y("error"),info:Y("info"),success:Y("success")});J.GlobalWorkerOptions.workerSrc="https://esm.sh/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs";const be=512,Be=a(e=>/\.pdf$/i.test(e)?"pdf":"epub","kindOf");function Ve(e){return e.replace(/\.[^.]+$/,"").replace(/[_]+/g," ").replace(/\s+/g," ").trim()}a(Ve,"prettyName");async function Ne(e){try{const t=await createImageBitmap(e),n=Math.min(1,be/Math.max(t.width,t.height)),l=Math.max(1,Math.round(t.width*n)),u=Math.max(1,Math.round(t.height*n)),o=document.createElement("canvas");return o.width=l,o.height=u,o.getContext("2d").drawImage(t,0,0,l,u),t.close?.(),await new Promise(r=>o.toBlob(r,"image/webp",.82))||e}catch{return e}}a(Ne,"downscale");async function Ke(e){const t=$e(e);try{await t.ready;const n=t.packaging?.metadata??{};let l=null;try{const u=await t.coverUrl();u&&(l=await Ne(await(await fetch(u)).blob()))}catch{}return{title:(n.title||"").trim(),author:(n.creator||"").trim(),cover:l}}finally{t.destroy?.()}}a(Ke,"fromEpub");async function qe(e){const t=await J.getDocument({data:e.slice(0)}).promise;try{let n="",l="";try{const{info:o}=await t.getMetadata();n=(o?.Title||"").trim(),l=(o?.Author||"").trim()}catch{}let u=null;try{const o=await t.getPage(1),c=o.getViewport({scale:1}),r=Math.min(2,be/Math.max(c.width,c.height)),i=o.getViewport({scale:r}),p=document.createElement("canvas");p.width=Math.ceil(i.width),p.height=Math.ceil(i.height),await o.render({canvasContext:p.getContext("2d"),viewport:i}).promise,u=await new Promise($=>p.toBlob($,"image/webp",.82)),o.cleanup()}catch{}return{title:n,author:l,cover:u,pages:t.numPages}}finally{t.destroy()}}a(qe,"fromPdf");async function We(e,t){try{const n=await t.arrayBuffer();return e==="pdf"?await qe(n):await Ke(n)}catch(n){return console.warn("[ebooks] metadata extraction failed:",n),{author:"",cover:null,title:""}}}a(We,"extractMeta");const Ze=3,B=a(()=>RAT.app.database,"db"),Xe=a((e,t)=>`${e}/${t}`,"keyOf"),F=C([]),K=C({}),ye=C(0),A=He({accept:"epub, pdf",id:"ebooks",table:RAT.app.database.folders}),ae=a(e=>F.value.find(t=>t.key===e)??null,"bookByKey"),le=a(e=>K.value[e]??null,"progressOf");async function Ye(){F.value=await B().books.values(),K.value=await B().progress.as(Object),await A.load()}a(Ye,"load");const ue=new Map;_(()=>{for(const[e,t]of Object.entries(A.trees.value))ue.get(e)!==t&&(ue.set(e,t),Ge(e,t))});const ke=a(e=>e?e.kind==="file"?[e]:(e.children??[]).flatMap(ke):[],"filesOf");async function Ge(e,t){const n=new Map(F.value.filter(c=>c.sourceId===e).map(c=>[c.key,c])),l=await Promise.all(ke(t).map(async c=>{const r=Xe(e,c.path),i=await c.entry.info(),p=`${i?.size}:${i?.modified}`,$=n.get(r);return $?.sig===p?$:{addedAt:$?.addedAt??Date.now(),author:"",cover:$?.cover??null,key:r,kind:Be(c.name),metaDone:!1,name:c.name,pages:null,path:c.path,sig:p,sourceId:e,title:Ve(c.name)}})),u=[...n.keys()].filter(c=>!l.some(r=>r.key===c)),o=l.filter(c=>n.get(c.key)!==c);await Promise.all([...u.map(c=>B().books.delete(c)),...o.map(c=>B().books.set(c.key,c))]),F.value=[...F.value.filter(c=>c.sourceId!==e),...l],Qe(l.filter(c=>!c.metaDone))}a(Ge,"sync");const Q=[];let G=0;function Qe(e){Q.push(...e),we()}a(Qe,"enqueue");function we(){for(ye.value=Q.length+G;G<Ze&&Q.length;){const e=Q.shift();G++,_e(e).finally(()=>{G--,we()})}}a(we,"pump");async function _e(e){const t=ae(e.key);if(!t||t.metaDone||t.sig!==e.sig)return;let n={...t,metaDone:!0};try{const l=await We(t.kind,await Re(t));n={...n,author:l.author||t.author,cover:l.cover??t.cover,pages:l.pages??t.pages,title:l.title||t.title}}catch{}await B().books.set(n.key,n),F.value=F.value.map(l=>l.key===n.key?n:l)}a(_e,"extract");const Je=a(()=>A.add(),"addFolder$1"),et=a(()=>Promise.all(A.sources.value.map(e=>A.scan(e.id))),"rescanAll"),tt=a(e=>A.reconnect(e),"reconnect"),at=a(e=>A.repick(e),"repick"),Re=a(e=>A.nodeAt(e.sourceId,e.path)?.entry.read("blob")??Promise.reject(new Error("This book is no longer in its folder.")),"fileOf");function nt(e){return A.sources.value.some(t=>t.id===e.sourceId)?A.perms.value[e.sourceId]!=="granted"?Promise.reject(new Error("Reconnect this book’s folder in the library first.")):Re(e):Promise.reject(new Error("This book’s folder is no longer open."))}a(nt,"openFile");async function xe(e,t){const n={...K.value[e],...t,updatedAt:Date.now()};return K.value={...K.value,[e]:n},await B().progress.set(e,n),n}a(xe,"saveProgress");const ot=a(e=>xe(e,{lastOpenedAt:Date.now()}),"markOpened"),U={bookKey:C(null),folder:C(""),search:C(""),sort:new ze("recent","title","author","added"),readerFlow:C("paginated"),readerFont:C(100),readerUi:C({ready:!1})};function lt(e){U.bookKey.value=e,ot(e),RAT.app.router.go("/reader")}a(lt,"openReader");const de=a(()=>RAT.app.router.go("/"),"closeReader"),rt=a(()=>RAT.app.area("config")?.toggle(),"toggleConfig");async function fe(){if(!("showDirectoryPicker"in globalThis))return D.error("This browser can’t open folders — try Chrome, Edge or another Chromium browser.");try{const e=await Je();e&&D.success(`Added ${e.name}`)}catch(e){D.error(e)}}a(fe,"addFolder");const ne=a(e=>e.author||"","authorOf"),he=a(e=>le(e.key)?.lastOpenedAt||0,"lastOpenedOf"),te=a((e,t)=>e.localeCompare(t,void 0,{sensitivity:"base"}),"compare"),it=a((e,t)=>[...e].sort((n,l)=>t==="title"?te(n.title,l.title):t==="author"?te(ne(n),ne(l))||te(n.title,l.title):t==="added"?(l.addedAt||0)-(n.addedAt||0):he(l)-he(n)||(l.addedAt||0)-(n.addedAt||0)),"sortBooks"),ct=O(()=>{const e=U.search.value.trim().toLowerCase(),t=U.folder.value;let n=F.value;return t&&(n=n.filter(l=>l.sourceId===t)),e&&(n=n.filter(l=>[l.title,ne(l),l.name].some(u=>u.toLowerCase().includes(e)))),it(n,U.sort.value)});function st(e,t){return ut.call({props:e},e,t)}a(st,"CoverRatHtml");function ut(e,t){const n=this.props.book;let l=W(null);_(()=>{if(!n.cover)return;const o=URL.createObjectURL(n.cover);return l.value=o,()=>URL.revokeObjectURL(o)});function u(o=""){let c=0;for(let r=0;r<o.length;r++)c=c*31+o.charCodeAt(r)>>>0;return c%360}return a(u,"hueOf"),s`
    <div.cover class=${()=>e.class} class:has-img=${()=>!!l.value} style:--hue=${()=>u(n.title)} style:background-image=${()=>l.value?`url("${l.value}")`:null}>
      ${h(()=>!n.cover,()=>s`
          <div.cover-fallback>
            <svg-icon icon=${()=>n.kind==="pdf"?"document":"book-open"} />
            <span.cover-title>${()=>n.title}</span>
            ${h(()=>n.author,()=>s`<span.cover-author>${()=>n.author}</span>`)}
          </div>
        `)}
      <span class=${()=>"kind-badge "+n.kind}>${()=>n.kind.toUpperCase()}</span>
    </div>
  `}a(ut,"$$CoverRatHtml");function dt(e,t){return ft.call({props:e},e,t)}a(dt,"BookItemRatHtml");function ft(e,t){const n=this.props.book,l=O(()=>le(n.key)?.percent??0);return s`
    <button.book title=${()=>n.name} onclick=${v(()=>lt(n.key))}>
      <${st} ...${{get book(){return n}}} class="book-cover" />
      <div.book-meta>
        <div.book-title>${()=>n.title}</div>
        ${h(()=>n.author,()=>s`<div.book-author>${()=>n.author}</div>`)}
      </div>
      ${h(()=>l.value>0,()=>s`<aufbau-progress.book-progress value=${()=>Math.round(l.value*100)} />`)}
    </button>
  `}a(ft,"$$BookItemRatHtml");const ht=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
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
}`;function V(e,t){return vt.call({props:e},e,t)}a(V,"EmptyRatHtml");function vt(e,t){return me("ihnpco",ht),s`
    <div.empty data-rat="ihnpco">
      ${h(()=>e.icon,()=>s`<svg-icon icon=${()=>e.icon} />`)}
      ${h(()=>e.title,()=>s`<p.title>${()=>e.title}</p>`)}
      ${h(()=>e.hint,()=>s`<p.hint>${()=>e.hint}</p>`)}
      ${t}
    </div>
  `}a(vt,"$$EmptyRatHtml");let q=null;const X=C(!1),re=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Ae=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!re;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),q=e,X.value=!0});addEventListener("appinstalled",()=>{q=null,X.value=!1});async function Se(){if(!q)return!1;const e=q;return q=null,X.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}a(Se,"install");function pt(e,t){return gt.call({props:e},e,t)}a(pt,"InstallTipRatHtml");function gt(e,t){return s`
    ${h(()=>!re,()=>s`
        <div.install-tip>
          <svg-icon icon="info" />
          <span.text>${()=>e.message??"Install the app so your folders stay connected between visits — no reconnecting."}</span>
          ${h(()=>X.value,()=>s`<btn-push icon="download" label="Install app" onclick=${v(Se)} />`,()=>h(()=>Ae,()=>s`<span.hint>Share, then <b>Add to Home Screen</b>.</span>`,()=>s`<span.hint>Use your browser’s <b>Install</b> / <b>Add to Home screen</b> menu.</span>`))}
        </div>
      `)}
  `}a(gt,"$$InstallTipRatHtml");function mt(e,t){return $t.call({props:e},e,t)}a(mt,"PickerRatHtml");function $t(e,t){const n=a(i=>typeof i=="object"&&i!==null&&!Array.isArray(i),"isObject"),l=e.signal??(ge(e.value)?e.value:null),u=a(i=>Array.isArray(i)?{label:String(i[1]??i[0]),title:String(i[1]??i[0]),value:i[0]}:n(i)?{icon:i.icon,label:i.label??(i.icon?"":String(i.value)),title:i.title??i.label??String(i.value),value:i.value}:{label:String(i),title:String(i),value:i},"normalize"),o=O(()=>l?l.value:e.value),c=O(()=>(e.options??l?.values??[]).map(u));function r(i){const p=i.detail?.value??i.target?.value;l&&(l.value=p),e.onchange?.(p)}return a(r,"change"),s`
    <input-value class=${()=>e.class} look=${()=>e.look} placeholder=${()=>e.placeholder} searchable=${()=>e.searchable||null} src=${()=>e.src} value=${()=>o.value} onchange=${v(r)}>
      ${j(()=>c.value,i=>i,i=>s`<input-option icon=${()=>i.icon} label=${()=>i.label} title=${()=>i.title} value=${()=>i.value} />`)}
    </input-value>
  `}a($t,"$$PickerRatHtml");function bt(e,t){return yt.call({props:e},e,t)}a(bt,"SearchPanelRatHtml");function yt(e,t){let{value:n}=oe(this.props,{value:null});return s`
    <div.search-panel>
      <input-search placeholder=${()=>e.placeholder} value=${()=>n.value} oninput=${v(l=>n.value=l.currentTarget.value??"")} />
      ${h(()=>n.value,()=>s`<btn-icon icon="close" label="clear filter" onclick=${v(()=>n.value="")} />`)}
    </div>
  `}a(yt,"$$SearchPanelRatHtml");function kt(e,t){return wt.call({props:e},e,t)}a(kt,"SourceStatusRatHtml");function wt(e,t){const n=O(()=>A.sources.value.filter(o=>A.perms.value[o.id]&&A.perms.value[o.id]!=="granted"));function l(o){tt(o.id).then(c=>{c.granted||(console.warn("[ebooks] reconnect failed",{source:o,...c}),D.error(`Reconnect failed — browser said “${c.state}”. Try “Choose folder”.`))})}a(l,"retry");const u=a(o=>at(o.id).then(c=>c||D.error(`Could not open ${o.name}`)),"choose");return s`
    ${h(()=>n.value.length,()=>s`
        <div.reconnect-bar>
          <svg-icon icon="folder-alert" />
          <span>${()=>n.value.length} folder${()=>n.value.length===1?"":"s"} need reconnecting to read on this device.</span>
          ${j(()=>n.value,o=>o,o=>s`
              <div.reconnect-item>
                <span.reconnect-name>${()=>o.name}</span>
                <button.btn.small.primary onclick=${v(()=>l(o))}><svg-icon icon="folder-key" /> Reconnect</button>
                <button.btn.small.ghost title="Re-select the folder — always works" onclick=${v(()=>u(o))}><svg-icon icon="folder-search" /> Choose folder</button>
              </div>
            `)}
        </div>
      `)}
  `}a(wt,"$$SourceStatusRatHtml");function ve(e,t){return Rt.call({props:e},e,t)}a(ve,"ViewHeaderRatHtml");function Rt(e,t){const n=a(()=>RAT.app.router.go(RAT.app.resolve(e.back)),"back");return s`
    <header.view-header>
      ${h(()=>typeof e.back=="string",()=>s`<btn-icon.view-back icon="arrow-left" label="back" onclick=${v(n)} />`,()=>h(()=>e.back,()=>s`<btn-icon.view-back icon="arrow-left" label="back" ...${e.back} />`))}
      ${h(()=>e.title,()=>s`<h1>${()=>e.title}</h1>`)}
      <div.view-tools>${t}</div>
    </header>
  `}a(Rt,"$$ViewHeaderRatHtml");function xt(e,t){return At.call({props:e},e,t)}a(xt,"LibraryViewRatHtml");function At(e,t){let{folder:n,search:l}=oe(U,{folder:null,search:null});const u=O(()=>ct.value),o=O(()=>ye.value),c=O(()=>A.sources.value);return s`
    <${ve} title="Library">
      ${h(()=>o.value>0,()=>s`<span.scan-note><svg-icon icon="loading" /> ${()=>o.value} left</span>`)}
      <btn-icon icon="refresh" label="Rescan folders" onclick=${v(et)} />
      <btn-icon icon="folder-add" label="Add folder" onclick=${v(fe)} />
      <btn-icon icon="settings" label="Settings" onclick=${v(rt)} />
    </${ve}>
    <main>
      <${kt} />
      <${pt} />
      ${h(()=>!c.value.length,()=>s`<${V} icon="books" title="Your library is empty" hint="Add a folder of EPUB and PDF files. It stays on your device — only the folder permission is remembered."><btn-push icon="folder-add" label="Add a folder" onclick=${v(fe)} /></${V}>`,()=>s`
          <div.lib-controls>
            <${bt} placeholder="Search title or author…" ...${{value:l}} />
            <${mt} ...${{get signal(){return U.sort}}} />
          </div>
          ${h(()=>c.value.length>1,()=>s`
              <div.folder-bar>
                <button.chip class:active=${()=>n.value===""} onclick=${v(()=>n.value="")}>All</button>
                ${j(()=>c.value,r=>r,r=>s`<button.chip class:active=${()=>n.value===r.id} onclick=${v(()=>n.value=r.id)}>${()=>r.name}</button>`)}
              </div>
            `)}
          <section.shelf>
            <h2>All books <span>${()=>u.value.length}</span></h2>
            ${h(()=>u.value.length,()=>s`
                <data-index viewmode="grid" item-size="150px" gap="1rem">
                  ${j(()=>u.value,r=>r,r=>s`<data-item><${dt} ...${{get book(){return r}}} /></data-item>`)}
                </data-index>
              `,()=>h(()=>l.value,()=>s`<${V} icon="no-results" title="Nothing matches your search" />`,()=>s`<${V} icon="book" title="No books here yet" hint="Scanning may still be running, or this folder has no EPUB/PDF files." />`))}
          </section>
        `)}
    </main>
  `}a(At,"$$LibraryViewRatHtml");J.GlobalWorkerOptions.workerSrc="https://esm.sh/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs";function St(){const e=getComputedStyle(document.documentElement),t=a((n,l)=>e.getPropertyValue(n).trim()||l,"get");return{bg:t("--color-bg","#282a36"),fg:t("--color-fg","#f8f8f2"),accent:t("--color-ink","#bd93f9")}}a(St,"themeColors");async function Mt(e,t,{initialPage:n=1,onState:l}={}){const u=await t.arrayBuffer(),o=await J.getDocument({data:u}).promise,c=o.numPages;e.replaceChildren(),e.classList.add("pdf-view");const r=await o.getPage(1),i=r.getViewport({scale:1});r.cleanup();let p=1,$=1,b=Math.min(Math.max(1,n),c),M=!1;const w=[],g=Math.min(2,window.devicePixelRatio||1),H=a(()=>{const d=e.clientWidth-32;d>0&&($=Math.max(.2,d/i.width))},"fitWidth");H();const R=a(()=>$*p,"scale"),y=a(d=>{const f=document.createElement("div");return f.className="pdf-page",f.dataset.page=String(d),f.style.width=`${Math.round(i.width*R())}px`,f.style.height=`${Math.round(i.height*R())}px`,f},"placeholder");for(let d=1;d<=c;d++){const f=y(d);e.appendChild(f),w.push({el:f,rendered:!1,task:null})}async function k(d){const f=w[d-1];if(!f||f.rendered||f.task||M)return;let m;try{if(m=await o.getPage(d),M){m.cleanup();return}const S=m.getViewport({scale:R()}),E=document.createElement("canvas");E.width=Math.ceil(S.width*g),E.height=Math.ceil(S.height*g),E.style.width=`${Math.round(S.width)}px`,E.style.height=`${Math.round(S.height)}px`;const ce=m.render({canvasContext:E.getContext("2d"),viewport:S,transform:g!==1?[g,0,0,g,0,0]:void 0});if(f.task=ce,await ce.promise,M)return;f.el.style.width=`${Math.round(S.width)}px`,f.el.style.height=`${Math.round(S.height)}px`,f.el.replaceChildren(E),f.rendered=!0}catch{}finally{f.task=null,m?.cleanup?.()}}a(k,"renderPage");const T=new IntersectionObserver(d=>{for(const f of d)f.isIntersecting&&k(Number(f.target.dataset.page))},{root:e,rootMargin:"200% 0px"});w.forEach(d=>T.observe(d.el));let P=0;const I=a(()=>l?.({page:b,pages:c,percent:c?b/c:0,zoom:p}),"emit"),x=a(()=>{P||(P=requestAnimationFrame(()=>{P=0;const d=e.scrollTop+e.clientHeight/3;let f=1;for(const m of w)if(m.el.offsetTop<=d)f=Number(m.el.dataset.page);else break;f!==b&&(b=f,I())}))},"onScroll");e.addEventListener("scroll",x,{passive:!0});function z(d){d=Math.min(Math.max(1,d),c),w[d-1]?.el.scrollIntoView({block:"start"}),b=d,I()}a(z,"goto");function L(){for(const m of w)m.rendered=!1,m.task?.cancel?.(),m.task=null,m.el.replaceChildren(),m.el.style.width=`${Math.round(i.width*R())}px`,m.el.style.height=`${Math.round(i.height*R())}px`;const d=e.scrollTop,f=e.clientHeight;w.forEach((m,S)=>{const E=m.el.offsetTop;E+m.el.offsetHeight>=d-f&&E<=d+2*f&&k(S+1)})}a(L,"relayout");const ee=a(d=>{p=Math.min(4,Math.max(.4,d)),L(),I()},"setZoom"),ie=new ResizeObserver(()=>{H(),L()});ie.observe(e),b>1&&requestAnimationFrame(()=>z(b)),I();async function Oe(){try{const d=await o.getOutline(),f=a(m=>(m||[]).map(S=>({label:S.title,dest:S.dest,children:f(S.items)})),"walk");return f(d)}catch{return[]}}a(Oe,"outline");async function Pe(d){try{let f=typeof d=="string"?await o.getDestination(d):d;if(!Array.isArray(f))return;z(await o.getPageIndex(f[0])+1)}catch{}}return a(Pe,"gotoDest"),{kind:"pdf",pages:c,next:a(()=>z(b+1),"next"),prev:a(()=>z(b-1),"prev"),goto:z,gotoDest:Pe,outline:Oe,setZoom:ee,zoomIn:a(()=>ee(p+.2),"zoomIn"),zoomOut:a(()=>ee(p-.2),"zoomOut"),destroy(){M=!0,T.disconnect(),ie.disconnect(),e.removeEventListener("scroll",x),w.forEach(d=>d.task?.cancel?.()),o.destroy(),e.replaceChildren(),e.classList.remove("pdf-view")}}}a(Mt,"createPdfReader");async function Ot(e,t,{initialCfi:n=null,flow:l="paginated",fontSize:u=100,onState:o}={}){const c=await t.arrayBuffer(),r=$e(c);e.replaceChildren(),e.classList.add("epub-view");let i=null,p=l,$=u,b=n;const M=St();function w(y){i=r.renderTo(e,{width:"100%",height:"100%",flow:y==="scrolled"?"scrolled-doc":"paginated",spread:"auto",allowScriptedContent:!1}),i.themes.register("app",{"html, body":{background:M.bg+" !important",color:M.fg+" !important"},"a, a:link":{color:M.accent+" !important"},img:{"max-width":"100% !important",height:"auto !important"},"::selection":{background:M.accent+"55"}}),i.themes.select("app"),i.themes.fontSize($+"%"),i.on("relocated",k=>{b=k?.start?.cfi??b,o?.({cfi:b,percent:k?.start?.percentage??0,href:k?.start?.href,atStart:!!k?.atStart,atEnd:!!k?.atEnd})})}a(w,"build"),w(p),await r.ready,await i.display(n||void 0);async function g(){try{const y=await r.loaded.navigation,k=a(T=>(T||[]).map(P=>({label:P.label?.trim(),href:P.href,children:k(P.subitems)})),"walk");return k(y.toc)}catch{return[]}}a(g,"outline");async function H(y){if(y===p)return;p=y;const k=b;i.destroy(),w(p),await i.display(k||void 0)}a(H,"setFlow");const R=a(y=>{$=Math.min(220,Math.max(60,y)),i.themes.fontSize($+"%")},"setFont");return{kind:"epub",next:a(()=>i.next(),"next"),prev:a(()=>i.prev(),"prev"),gotoHref:a(y=>i.display(y),"gotoHref"),outline:g,setFlow:H,get flow(){return p},get fontSize(){return $},fontUp:a(()=>R($+10),"fontUp"),fontDown:a(()=>R($-10),"fontDown"),destroy(){try{i?.destroy()}catch{}try{r.destroy()}catch{}e.replaceChildren(),e.classList.remove("epub-view")}}}a(Ot,"createEpubReader");function Pt(e,t){return Ct.call({props:e},e,t)}a(Pt,"TocPanelRatHtml");function Ct(e,t){function n(l){return s`
      <ul.toc-list>
        ${j(()=>l??[],u=>u,u=>s`
            <li>
              <button.toc-link onclick=${v(()=>e.onpick(e.kind==="pdf"?u.dest:u.href))}>${()=>u.label||"Untitled"}</button>
              ${h(()=>u.children?.length,()=>s`${()=>n(u.children)}`)}
            </li>
          `)}
      </ul>
    `}return a(n,"list"),s`
    <aside.toc-panel>
      <div.toc-head>Contents</div>
      ${h(()=>e.items==null,()=>s`<div.toc-loading><svg-icon icon="loading" /></div>`,()=>h(()=>e.items.length,()=>s`${()=>n(e.items)}`,()=>s`<div.toc-empty>No contents in this book.</div>`))}
    </aside>
  `}a(Ct,"$$TocPanelRatHtml");function Tt(e,t){return Et.call({props:e},e,t)}a(Tt,"ReaderViewRatHtml");function Et(e,t){let{bookKey:n,readerFlow:l,readerFont:u,$readerUi:o}=oe(U,{bookKey:null,readerFlow:null,readerFont:null,$readerUi:null}),c=W(null),r=W(null);const i=O(()=>ae(n.value));_(()=>{const g=n.value,H=c.value,R=Le(()=>ae(g));if(!R||!H)return;let y=!0,k=0,T=null;o.value={error:null,kind:R.kind,ready:!1,toc:null,tocOpen:!1};const P=a(()=>{T&&(xe(g,T),T=null)},"flush"),I=a(x=>{o.value={...o.value,...x},T=R.kind==="pdf"?{page:x.page,pages:x.pages,percent:x.percent}:{location:x.cfi,percent:x.percent},clearTimeout(k),k=setTimeout(P,800)},"onState");return(async()=>{try{const x=await nt(R);if(!y)return;const z=le(g),L=R.kind==="pdf"?await Mt(H,x,{initialPage:z?.page||1,onState:I}):await Ot(H,x,{flow:l.value,fontSize:u.value,initialCfi:z?.location||null,onState:I});if(!y){L.destroy();return}r.value=L,o.value={...o.value,flow:L.flow,fontSize:L.fontSize,kind:L.kind,ready:!0}}catch(x){y&&(o.value={...o.value,error:x.message,ready:!0})}})(),()=>{y=!1,clearTimeout(k),P(),r.value?.destroy(),r.value=null}});async function p(){!o.value.tocOpen&&o.value.toc==null?(o.value={...o.value,toc:[],tocOpen:!0},o.value={...o.value,toc:await r.value?.outline?.()??[]}):o.value={...o.value,tocOpen:!o.value.tocOpen}}a(p,"toggleToc");async function $(){if(!r.value)return;const g=o.value.flow==="scrolled"?"paginated":"scrolled";l.value=g,await r.value.setFlow(g),o.value={...o.value,flow:g}}a($,"toggleFlow");const b=a(g=>{r.value&&(g>0?r.value.fontUp():r.value.fontDown(),u.value=r.value.fontSize)},"font");function M(g){o.value.kind==="pdf"?r.value?.gotoDest(g):r.value?.gotoHref(g),o.value={...o.value,tocOpen:!1}}a(M,"pick");function w(g){/^(INPUT|TEXTAREA|SELECT)$/.test(g.target.tagName)||!r.value||(g.key==="ArrowLeft"&&r.value.prev(),g.key==="ArrowRight"&&r.value.next(),g.key==="Escape"&&de())}return a(w,"key"),_(()=>(addEventListener("keydown",w),()=>removeEventListener("keydown",w))),s`
    <header.reader-bar>
      <btn-icon icon="arrow-left" label="Back" title="Back to library" onclick=${v(de)} />
      <div.reader-id>
        <span.reader-title>${()=>i.value?.title??"Book"}</span>
        ${h(()=>i.value?.author,()=>s`<span.reader-author>${()=>i.value.author}</span>`)}
      </div>
      <div.reader-controls>
        ${h(()=>o.value.kind==="pdf",()=>s`
            <btn-icon icon="remove" label="Zoom out" onclick=${v(()=>r.value?.zoomOut())} />
            <btn-icon icon="add" label="Zoom in" onclick=${v(()=>r.value?.zoomIn())} />
          `)}
        ${h(()=>o.value.kind==="epub",()=>s`
            <btn-icon icon="text-smaller" label="Smaller text" disabled=${()=>!r.value} onclick=${v(()=>b(-1))} />
            <btn-icon icon="text-larger" label="Larger text" disabled=${()=>!r.value} onclick=${v(()=>b(1))} />
            <btn-icon icon=${()=>o.value.flow==="scrolled"?"book-open":"scroll"} label=${()=>o.value.flow==="scrolled"?"Paginated":"Scrolled"} disabled=${()=>!r.value} onclick=${v($)} />
          `)}
        <btn-icon icon="contents" label="Contents" aria-pressed=${()=>je(o.value.tocOpen)} onclick=${v(p)} />
      </div>
    </header>
    <div.reader-main>
      <div.reader-stage ref=${Fe(c)} />
      ${h(()=>o.value.tocOpen,()=>s`<${Pt} ...${{get items(){return o.value.toc},get kind(){return o.value.kind},onpick:M}} />`)}
      ${h(()=>!o.value.ready&&!o.value.error,()=>s`<div.reader-loading><svg-icon icon="loading" /></div>`)}
      ${h(()=>o.value.error,()=>s`<div.reader-error><${V} icon="book-alert" title="Couldn’t open this book" ...${{get hint(){return o.value.error}}} /></div>`)}
      ${h(()=>o.value.kind==="epub"&&o.value.ready&&!o.value.error,()=>s`
          <button.page-edge.left aria-label="Previous" onclick=${v(()=>r.value?.prev())}><svg-icon icon="chevron-left" /></button>
          <button.page-edge.right aria-label="Next" onclick=${v(()=>r.value?.next())}><svg-icon icon="chevron-right" /></button>
        `)}
    </div>
    <footer.reader-foot>
      ${h(()=>o.value.kind==="pdf"&&o.value.pages,()=>s`
          <button.ibtn aria-label="Previous page" onclick=${v(()=>r.value?.prev())}><svg-icon icon="chevron-up" /></button>
          <span.foot-label>Page ${()=>o.value.page??1} / ${()=>o.value.pages}</span>
          <button.ibtn aria-label="Next page" onclick=${v(()=>r.value?.next())}><svg-icon icon="chevron-down" /></button>
        `,()=>s`<span.foot-label>${()=>o.value.percent!=null?Math.round((o.value.percent||0)*100)+"%":""}</span>`)}
      <aufbau-progress.foot-bar value=${()=>Math.round((o.value.percent||0)*100)} />
    </footer>
  `}a(Et,"$$ReaderViewRatHtml");const Z=Ie("appearance",{}),pe={density:N.densities,geometry:N.geometries,mode:N.modes},Ht=a(()=>Z.value,"appearance"),zt=a(()=>N.palettes().catch(()=>[]),"palettes");function Me(e){const t=document.querySelector("rat-app");for(const[n,l]of Object.entries(e))l?t?.setAttribute(n,l):t?.removeAttribute(n);return N.set(e)}a(Me,"apply");function Lt(e,t){return Z.value={...Z.value,[e]:t||null},Me({[e]:t||null})}a(Lt,"setAppearance");Object.keys(Z.value).length&&Me(Z.value);const jt=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function Ft(e,t){return It.call({props:e},e,t)}a(Ft,"SettingsRatHtml");function It(e,t){me("177zzh1",jt);let n=W({...Ht()}),l=W([]);const u=O(()=>X.value);zt().then(r=>{l.value=r});function o(r,i){const p=i.detail?.value??i.target.value;n.value={...n.value,[r]:p},Lt(r,p)}a(o,"change");async function c(){await Se()&&D.success(`${e.name??"the app"} is installed`)}return a(c,"installApp"),s`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>n.value.palette??"zombie"} onchange=${v(r=>o("palette",r))}>
            ${j(()=>l.value,r=>r,r=>s`<input-option value=${()=>r}>${()=>r}</input-option>`)}
          </input-value>
        </label>
        ${j(()=>Object.keys(pe),r=>r,r=>s`
            <label>
              <span>${()=>r}</span>
              <input-value look="segments" value=${()=>n.value[r]??""} onchange=${v(i=>o(r,i))}>
                ${j(()=>pe[r],i=>i,i=>s`<input-option value=${()=>i}>${()=>i}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${h(()=>!re,()=>s`
          <section>
            <h3>install</h3>
            ${h(()=>u.value,()=>s`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${v(c)} />`,()=>s`
                ${h(()=>Ae,()=>s`<p.hint>Share, then "Add to Home Screen".</p>`,()=>s`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}a(It,"$$SettingsRatHtml");function Zt(e,t){return Dt.call({props:e},e,t)}a(Zt,"AppRatHtml");function Dt(e,t){return RAT.app.hold(Ye().catch(D.error)),s`
    <rat-area name="main">
      <rat-view route="/" name="library" component=${()=>xt} />
      <rat-view route="/reader" name="reader" component=${()=>Tt} transition="slide" />
    </rat-area>
    <rat-area name="config" dock="end"><${Ft} name="eBooks" /></rat-area>
  `}a(Dt,"$$AppRatHtml");export{Zt as default};
