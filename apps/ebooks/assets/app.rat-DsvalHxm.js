var Ce=Object.defineProperty;var n=(e,t)=>Ce(e,"name",{value:t,configurable:!0});import{P as me,Q as O,T as Te,V as de,W as Ee,X as C,Y as He,Z as _,a0 as ze,a1 as W,w as p,h as s,a2 as J,f as L,a3 as je,a4 as Le,a5 as Fe,a6 as N,a7 as Ie}from"./index-uT95AEv8.js";import be from"https://esm.sh/epubjs@0.3.93";import*as ee from"https://esm.sh/pdfjs-dist@4.4.168";import{p as De,a as Ue}from"./keys-CWTtq0D5.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function re(e,t){const a={};for(const r of Object.keys(t)){const d=e?.[r],o=t[r];a[r]=me(d)?d:O(()=>e[r]===void 0&&o?o():e[r])}return new Proxy(e??{},{get:n((r,d)=>Object.hasOwn(a,d)?a[d]:r[d],"get")})}n(re,"signalsOf");function v(e,{keys:t=null,prevent:a=!1,times:r=0}={}){const d=t?De(t):null;let o=r;return function(c){if(!(r&&!o)&&!(d&&!Ue(c,d))){a&&c.preventDefault(),r&&o--;try{const l=(typeof e=="string"?Te(e):e).call(this,c);typeof l?.catch=="function"&&l.catch(i=>de(this,i,"handler"))}catch(l){de(this,l,"handler")}}}}n(v,"listener");const Y=n(e=>(t,a)=>Ee.notify(t,{...a,type:e}),"notify"),D=Object.assign(Y("info"),{error:Y("error"),info:Y("info"),success:Y("success")});ee.GlobalWorkerOptions.workerSrc="https://esm.sh/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs";const $e=512,Be=n(e=>/\.pdf$/i.test(e)?"pdf":"epub","kindOf");function Ve(e){return e.replace(/\.[^.]+$/,"").replace(/[_]+/g," ").replace(/\s+/g," ").trim()}n(Ve,"prettyName");async function Ne(e){try{const t=await createImageBitmap(e),a=Math.min(1,$e/Math.max(t.width,t.height)),r=Math.max(1,Math.round(t.width*a)),d=Math.max(1,Math.round(t.height*a)),o=document.createElement("canvas");return o.width=r,o.height=d,o.getContext("2d").drawImage(t,0,0,r,d),t.close?.(),await new Promise(l=>o.toBlob(l,"image/webp",.82))||e}catch{return e}}n(Ne,"downscale");async function Ke(e){const t=be(e);try{await t.ready;const a=t.packaging?.metadata??{};let r=null;try{const d=await t.coverUrl();d&&(r=await Ne(await(await fetch(d)).blob()))}catch{}return{title:(a.title||"").trim(),author:(a.creator||"").trim(),cover:r}}finally{t.destroy?.()}}n(Ke,"fromEpub");async function qe(e){const t=await ee.getDocument({data:e.slice(0)}).promise;try{let a="",r="";try{const{info:o}=await t.getMetadata();a=(o?.Title||"").trim(),r=(o?.Author||"").trim()}catch{}let d=null;try{const o=await t.getPage(1),c=o.getViewport({scale:1}),l=Math.min(2,$e/Math.max(c.width,c.height)),i=o.getViewport({scale:l}),h=document.createElement("canvas");h.width=Math.ceil(i.width),h.height=Math.ceil(i.height),await o.render({canvasContext:h.getContext("2d"),viewport:i}).promise,d=await new Promise(b=>h.toBlob(b,"image/webp",.82)),o.cleanup()}catch{}return{title:a,author:r,cover:d,pages:t.numPages}}finally{t.destroy()}}n(qe,"fromPdf");async function We(e,t){try{const a=await t.arrayBuffer();return e==="pdf"?await qe(a):await Ke(a)}catch(a){return console.warn("[ebooks] metadata extraction failed:",a),{author:"",cover:null,title:""}}}n(We,"extractMeta");const Ze=3,B=n(()=>RAT.app.database,"db"),Xe=n((e,t)=>`${e}/${t}`,"keyOf"),F=C([]),K=C({}),ke=C(0),A=He({accept:"epub, pdf",id:"ebooks",table:RAT.app.database.folders}),ae=n(e=>F.value.find(t=>t.key===e)??null,"bookByKey"),le=n(e=>K.value[e]??null,"progressOf");async function Ye(){F.value=await B().books.values(),K.value=await B().progress.as(Object),await A.load()}n(Ye,"load");const ue=new Map;_(()=>{for(const[e,t]of Object.entries(A.trees.value))ue.get(e)!==t&&(ue.set(e,t),Ge(e,t))});const we=n(e=>e?e.kind==="file"?[e]:(e.children??[]).flatMap(we):[],"filesOf");async function Ge(e,t){const a=new Map(F.value.filter(c=>c.sourceId===e).map(c=>[c.key,c])),r=await Promise.all(we(t).map(async c=>{const l=Xe(e,c.path),i=await c.entry.info(),h=`${i?.size}:${i?.modified}`,b=a.get(l);return b?.sig===h?b:{addedAt:b?.addedAt??Date.now(),author:"",cover:b?.cover??null,key:l,kind:Be(c.name),metaDone:!1,name:c.name,pages:null,path:c.path,sig:h,sourceId:e,title:Ve(c.name)}})),d=[...a.keys()].filter(c=>!r.some(l=>l.key===c)),o=r.filter(c=>a.get(c.key)!==c);await Promise.all([...d.map(c=>B().books.delete(c)),...o.map(c=>B().books.set(c.key,c))]),F.value=[...F.value.filter(c=>c.sourceId!==e),...r],Qe(r.filter(c=>!c.metaDone))}n(Ge,"sync");const Q=[];let G=0;function Qe(e){Q.push(...e),ye()}n(Qe,"enqueue");function ye(){for(ke.value=Q.length+G;G<Ze&&Q.length;){const e=Q.shift();G++,_e(e).finally(()=>{G--,ye()})}}n(ye,"pump");async function _e(e){const t=ae(e.key);if(!t||t.metaDone||t.sig!==e.sig)return;let a={...t,metaDone:!0};try{const r=await We(t.kind,await xe(t));a={...a,author:r.author||t.author,cover:r.cover??t.cover,pages:r.pages??t.pages,title:r.title||t.title}}catch{}await B().books.set(a.key,a),F.value=F.value.map(r=>r.key===a.key?a:r)}n(_e,"extract");const Je=n(()=>A.add(),"addFolder$1"),et=n(()=>Promise.all(A.sources.value.map(e=>A.scan(e.id))),"rescanAll"),tt=n(e=>A.reconnect(e),"reconnect"),nt=n(e=>A.repick(e),"repick"),xe=n(e=>A.nodeAt(e.sourceId,e.path)?.entry.read("blob")??Promise.reject(new Error("This book is no longer in its folder.")),"fileOf");function at(e){return A.sources.value.some(t=>t.id===e.sourceId)?A.perms.value[e.sourceId]!=="granted"?Promise.reject(new Error("Reconnect this book’s folder in the library first.")):xe(e):Promise.reject(new Error("This book’s folder is no longer open."))}n(at,"openFile");async function Re(e,t){const a={...K.value[e],...t,updatedAt:Date.now()};return K.value={...K.value,[e]:a},await B().progress.set(e,a),a}n(Re,"saveProgress");const ot=n(e=>Re(e,{lastOpenedAt:Date.now()}),"markOpened"),U={bookKey:C(null),folder:C(""),search:C(""),sort:new ze("recent","title","author","added"),readerFlow:C("paginated"),readerFont:C(100),readerUi:C({ready:!1})};function rt(e){U.bookKey.value=e,ot(e),RAT.app.router.go("/reader")}n(rt,"openReader");const fe=n(()=>RAT.app.router.go("/"),"closeReader"),lt=n(()=>RAT.app.area("config")?.toggle(),"toggleConfig");async function pe(){if(!("showDirectoryPicker"in globalThis))return D.error("This browser can’t open folders — try Chrome, Edge or another Chromium browser.");try{const e=await Je();e&&D.success(`Added ${e.name}`)}catch(e){D.error(e)}}n(pe,"addFolder");const oe=n(e=>e.author||"","authorOf"),ve=n(e=>le(e.key)?.lastOpenedAt||0,"lastOpenedOf"),ne=n((e,t)=>e.localeCompare(t,void 0,{sensitivity:"base"}),"compare"),it=n((e,t)=>[...e].sort((a,r)=>t==="title"?ne(a.title,r.title):t==="author"?ne(oe(a),oe(r))||ne(a.title,r.title):t==="added"?(r.addedAt||0)-(a.addedAt||0):ve(r)-ve(a)||(r.addedAt||0)-(a.addedAt||0)),"sortBooks"),ct=O(()=>{const e=U.search.value.trim().toLowerCase(),t=U.folder.value;let a=F.value;return t&&(a=a.filter(r=>r.sourceId===t)),e&&(a=a.filter(r=>[r.title,oe(r),r.name].some(d=>d.toLowerCase().includes(e)))),it(a,U.sort.value)});function st(e,t){return dt.call({props:e},e,t)}n(st,"CoverRatHtml");function dt(e,t){const a=this.props.book;let r=W(null);_(()=>{if(!a.cover)return;const o=URL.createObjectURL(a.cover);return r.value=o,()=>URL.revokeObjectURL(o)});function d(o=""){let c=0;for(let l=0;l<o.length;l++)c=c*31+o.charCodeAt(l)>>>0;return c%360}return n(d,"hueOf"),s`
    <div.cover class=${()=>e.class} class:has-img=${()=>!!r.value} style:--hue=${()=>d(a.title)} style:background-image=${()=>r.value?`url("${r.value}")`:null}>
      ${p(()=>!a.cover,()=>s`
          <div.cover-fallback>
            <svg-icon icon=${()=>a.kind==="pdf"?"document":"book-open"} />
            <span.cover-title>${()=>a.title}</span>
            ${p(()=>a.author,()=>s`<span.cover-author>${()=>a.author}</span>`)}
          </div>
        `)}
      <span class=${()=>"kind-badge "+a.kind}>${()=>a.kind.toUpperCase()}</span>
    </div>
  `}n(dt,"$$CoverRatHtml");function ut(e,t){return ft.call({props:e},e,t)}n(ut,"BookItemRatHtml");function ft(e,t){const a=this.props.book,r=O(()=>le(a.key)?.percent??0);return s`
    <data-item>
      <button class="book" title=${()=>a.name} onclick=${v(()=>rt(a.key))}>
        <${st} ...${{get book(){return a}}} class="book-cover" />
        <div.book-meta>
          <div.book-title>${()=>a.title}</div>
          ${p(()=>a.author,()=>s`<div.book-author>${()=>a.author}</div>`)}
        </div>
        ${p(()=>r.value>0,()=>s`<aufbau-progress.book-progress value=${()=>Math.round(r.value*100)} />`)}
      </button>
    </data-item>
  `}n(ft,"$$BookItemRatHtml");const pt=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
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
}`;function V(e,t){return vt.call({props:e},e,t)}n(V,"EmptyRatHtml");function vt(e,t){return J("ihnpco",pt),s`
    <div.empty data-rat="ihnpco">
      ${p(()=>e.icon,()=>s`<svg-icon icon=${()=>e.icon} />`)}
      ${p(()=>e.title,()=>s`<p.title>${()=>e.title}</p>`)}
      ${p(()=>e.hint,()=>s`<p.hint>${()=>e.hint}</p>`)}
      ${t}
    </div>
  `}n(vt,"$$EmptyRatHtml");let q=null;const X=C(!1),ie=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,Ae=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!ie;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),q=e,X.value=!0});addEventListener("appinstalled",()=>{q=null,X.value=!1});async function Se(){if(!q)return!1;const e=q;return q=null,X.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}n(Se,"install");function ht(e,t){return gt.call({props:e},e,t)}n(ht,"InstallTipRatHtml");function gt(e,t){return s`
    ${p(()=>!ie,()=>s`
        <div.install-tip>
          <svg-icon icon="info" />
          <span.text>${()=>e.message??"Install the app so your folders stay connected between visits — no reconnecting."}</span>
          ${p(()=>X.value,()=>s`<btn-push icon="download" label="Install app" onclick=${v(Se)} />`,()=>p(()=>Ae,()=>s`<span.hint>Share, then <b>Add to Home Screen</b>.</span>`,()=>s`<span.hint>Use your browser’s <b>Install</b> / <b>Add to Home screen</b> menu.</span>`))}
        </div>
      `)}
  `}n(gt,"$$InstallTipRatHtml");function mt(e,t){return bt.call({props:e},e,t)}n(mt,"PickerRatHtml");function bt(e,t){const a=n(i=>typeof i=="object"&&i!==null&&!Array.isArray(i),"isObject"),r=e.signal??(me(e.value)?e.value:null),d=n(i=>Array.isArray(i)?{label:String(i[1]??i[0]),title:String(i[1]??i[0]),value:i[0]}:a(i)?{icon:i.icon,label:i.label??(i.icon?"":String(i.value)),title:i.title??i.label??String(i.value),value:i.value}:{label:String(i),title:String(i),value:i},"normalize"),o=O(()=>r?r.value:e.value),c=O(()=>(e.options??r?.values??[]).map(d));function l(i){const h=i.detail?.value??i.target?.value;r&&(r.value=h),e.onchange?.(h)}return n(l,"change"),s`
    <input-value class=${()=>e.class} look=${()=>e.look} placeholder=${()=>e.placeholder} searchable=${()=>e.searchable||null} src=${()=>e.src} value=${()=>o.value} onchange=${v(l)}>
      ${L(()=>c.value,i=>i,i=>s`<input-option icon=${()=>i.icon} label=${()=>i.label} title=${()=>i.title} value=${()=>i.value} />`)}
    </input-value>
  `}n(bt,"$$PickerRatHtml");function $t(e,t){return kt.call({props:e},e,t)}n($t,"SearchPanelRatHtml");function kt(e,t){let{value:a}=re(this.props,{value:null});return s`
    <div.search-panel>
      <input-search placeholder=${()=>e.placeholder} value=${()=>a.value} oninput=${v(r=>a.value=r.currentTarget.value??"")} />
      ${p(()=>a.value,()=>s`<btn-icon icon="close" label="clear filter" onclick=${v(()=>a.value="")} />`)}
    </div>
  `}n(kt,"$$SearchPanelRatHtml");function wt(e,t){return yt.call({props:e},e,t)}n(wt,"SourceStatusRatHtml");function yt(e,t){const a=O(()=>A.sources.value.filter(o=>A.perms.value[o.id]&&A.perms.value[o.id]!=="granted"));function r(o){tt(o.id).then(c=>{c.granted||(console.warn("[ebooks] reconnect failed",{source:o,...c}),D.error(`Reconnect failed — browser said “${c.state}”. Try “Choose folder”.`))})}n(r,"retry");const d=n(o=>nt(o.id).then(c=>c||D.error(`Could not open ${o.name}`)),"choose");return s`
    ${p(()=>a.value.length,()=>s`
        <div.reconnect-bar>
          <svg-icon icon="folder-alert" />
          <span>${()=>a.value.length} folder${()=>a.value.length===1?"":"s"} need reconnecting to read on this device.</span>
          ${L(()=>a.value,o=>o,o=>s`
              <div.reconnect-item>
                <span.reconnect-name>${()=>o.name}</span>
                <button.btn.small.primary onclick=${v(()=>r(o))}><svg-icon icon="folder-key" /> Reconnect</button>
                <button.btn.small.ghost title="Re-select the folder — always works" onclick=${v(()=>d(o))}><svg-icon icon="folder-search" /> Choose folder</button>
              </div>
            `)}
        </div>
      `)}
  `}n(yt,"$$SourceStatusRatHtml");function he(e,t){return xt.call({props:e},e,t)}n(he,"ViewHeaderRatHtml");function xt(e,t){const a=n(()=>RAT.app.router.go(RAT.app.resolve(e.back)),"back");return s`
    <header.view-header>
      ${p(()=>typeof e.back=="string",()=>s`<btn-icon.view-back icon="arrow-left" label="back" onclick=${v(a)} />`,()=>p(()=>e.back,()=>s`<btn-icon.view-back icon="arrow-left" label="back" ...${e.back} />`))}
      ${p(()=>e.title,()=>s`<h1>${()=>e.title}</h1>`)}
      <div.view-tools>${t}</div>
    </header>
  `}n(xt,"$$ViewHeaderRatHtml");function Rt(e,t){return At.call({props:e},e,t)}n(Rt,"LibraryViewRatHtml");function At(e,t){let{folder:a,search:r}=re(U,{folder:null,search:null});const d=O(()=>ct.value),o=O(()=>ke.value),c=O(()=>A.sources.value);return s`
    <${he} title="Library">
      ${p(()=>o.value>0,()=>s`<span class="scan-note"><svg-icon icon="loading" /> ${()=>o.value} left</span>`)}
      <btn-icon icon="refresh" label="Rescan folders" onclick=${v(et)} />
      <btn-icon icon="folder-add" label="Add folder" onclick=${v(pe)} />
      <btn-icon icon="settings" label="Settings" onclick=${v(lt)} />
    </${he}>
    <main>
      <${wt} />
      <${ht} />
      ${p(()=>!c.value.length,()=>s`<${V} icon="books" title="Your library is empty" hint="Add a folder of EPUB and PDF files. It stays on your device — only the folder permission is remembered."><btn-push icon="folder-add" label="Add a folder" onclick=${v(pe)} /></${V}>`,()=>s`
          <div class="lib-controls">
            <${$t} placeholder="Search title or author…" ...${{value:r}} />
            <${mt} ...${{get signal(){return U.sort}}} />
          </div>
          ${p(()=>c.value.length>1,()=>s`
              <div.folder-bar>
                <button.chip class:active=${()=>a.value===""} onclick=${v(()=>a.value="")}>All</button>
                ${L(()=>c.value,l=>l,l=>s`<button.chip class:active=${()=>a.value===l.id} onclick=${v(()=>a.value=l.id)}>${()=>l.name}</button>`)}
              </div>
            `)}
          <section.shelf>
            <h2>All books <span>${()=>d.value.length}</span></h2>
            ${p(()=>d.value.length,()=>s`
                <data-index viewmode="grid" item-size="150px" gap="1rem">
                  ${L(()=>d.value,l=>l,l=>s`<${ut} ...${{get book(){return l}}} />`)}
                </data-index>
              `,()=>p(()=>r.value,()=>s`<${V} icon="no-results" title="Nothing matches your search" />`,()=>s`<${V} icon="book" title="No books here yet" hint="Scanning may still be running, or this folder has no EPUB/PDF files." />`))}
          </section>
        `)}
    </main>
  `}n(At,"$$LibraryViewRatHtml");ee.GlobalWorkerOptions.workerSrc="https://esm.sh/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs";function St(){const e=getComputedStyle(document.documentElement),t=n((a,r)=>e.getPropertyValue(a).trim()||r,"get");return{bg:t("--color-bg","#282a36"),fg:t("--color-fg","#f8f8f2"),accent:t("--color-ink","#bd93f9")}}n(St,"themeColors");async function Mt(e,t,{initialPage:a=1,onState:r}={}){const d=await t.arrayBuffer(),o=await ee.getDocument({data:d}).promise,c=o.numPages;e.replaceChildren(),e.classList.add("pdf-view");const l=await o.getPage(1),i=l.getViewport({scale:1});l.cleanup();let h=1,b=1,$=Math.min(Math.max(1,a),c),M=!1;const y=[],g=Math.min(2,window.devicePixelRatio||1),H=n(()=>{const u=e.clientWidth-32;u>0&&(b=Math.max(.2,u/i.width))},"fitWidth");H();const x=n(()=>b*h,"scale"),k=n(u=>{const f=document.createElement("div");return f.className="pdf-page",f.dataset.page=String(u),f.style.width=`${Math.round(i.width*x())}px`,f.style.height=`${Math.round(i.height*x())}px`,f},"placeholder");for(let u=1;u<=c;u++){const f=k(u);e.appendChild(f),y.push({el:f,rendered:!1,task:null})}async function w(u){const f=y[u-1];if(!f||f.rendered||f.task||M)return;let m;try{if(m=await o.getPage(u),M){m.cleanup();return}const S=m.getViewport({scale:x()}),E=document.createElement("canvas");E.width=Math.ceil(S.width*g),E.height=Math.ceil(S.height*g),E.style.width=`${Math.round(S.width)}px`,E.style.height=`${Math.round(S.height)}px`;const se=m.render({canvasContext:E.getContext("2d"),viewport:S,transform:g!==1?[g,0,0,g,0,0]:void 0});if(f.task=se,await se.promise,M)return;f.el.style.width=`${Math.round(S.width)}px`,f.el.style.height=`${Math.round(S.height)}px`,f.el.replaceChildren(E),f.rendered=!0}catch{}finally{f.task=null,m?.cleanup?.()}}n(w,"renderPage");const T=new IntersectionObserver(u=>{for(const f of u)f.isIntersecting&&w(Number(f.target.dataset.page))},{root:e,rootMargin:"200% 0px"});y.forEach(u=>T.observe(u.el));let P=0;const I=n(()=>r?.({page:$,pages:c,percent:c?$/c:0,zoom:h}),"emit"),R=n(()=>{P||(P=requestAnimationFrame(()=>{P=0;const u=e.scrollTop+e.clientHeight/3;let f=1;for(const m of y)if(m.el.offsetTop<=u)f=Number(m.el.dataset.page);else break;f!==$&&($=f,I())}))},"onScroll");e.addEventListener("scroll",R,{passive:!0});function z(u){u=Math.min(Math.max(1,u),c),y[u-1]?.el.scrollIntoView({block:"start"}),$=u,I()}n(z,"goto");function j(){for(const m of y)m.rendered=!1,m.task?.cancel?.(),m.task=null,m.el.replaceChildren(),m.el.style.width=`${Math.round(i.width*x())}px`,m.el.style.height=`${Math.round(i.height*x())}px`;const u=e.scrollTop,f=e.clientHeight;y.forEach((m,S)=>{const E=m.el.offsetTop;E+m.el.offsetHeight>=u-f&&E<=u+2*f&&w(S+1)})}n(j,"relayout");const te=n(u=>{h=Math.min(4,Math.max(.4,u)),j(),I()},"setZoom"),ce=new ResizeObserver(()=>{H(),j()});ce.observe(e),$>1&&requestAnimationFrame(()=>z($)),I();async function Oe(){try{const u=await o.getOutline(),f=n(m=>(m||[]).map(S=>({label:S.title,dest:S.dest,children:f(S.items)})),"walk");return f(u)}catch{return[]}}n(Oe,"outline");async function Pe(u){try{let f=typeof u=="string"?await o.getDestination(u):u;if(!Array.isArray(f))return;z(await o.getPageIndex(f[0])+1)}catch{}}return n(Pe,"gotoDest"),{kind:"pdf",pages:c,next:n(()=>z($+1),"next"),prev:n(()=>z($-1),"prev"),goto:z,gotoDest:Pe,outline:Oe,setZoom:te,zoomIn:n(()=>te(h+.2),"zoomIn"),zoomOut:n(()=>te(h-.2),"zoomOut"),destroy(){M=!0,T.disconnect(),ce.disconnect(),e.removeEventListener("scroll",R),y.forEach(u=>u.task?.cancel?.()),o.destroy(),e.replaceChildren(),e.classList.remove("pdf-view")}}}n(Mt,"createPdfReader");async function Ot(e,t,{initialCfi:a=null,flow:r="paginated",fontSize:d=100,onState:o}={}){const c=await t.arrayBuffer(),l=be(c);e.replaceChildren(),e.classList.add("epub-view");let i=null,h=r,b=d,$=a;const M=St();function y(k){i=l.renderTo(e,{width:"100%",height:"100%",flow:k==="scrolled"?"scrolled-doc":"paginated",spread:"auto",allowScriptedContent:!1}),i.themes.register("app",{"html, body":{background:M.bg+" !important",color:M.fg+" !important"},"a, a:link":{color:M.accent+" !important"},img:{"max-width":"100% !important",height:"auto !important"},"::selection":{background:M.accent+"55"}}),i.themes.select("app"),i.themes.fontSize(b+"%"),i.on("relocated",w=>{$=w?.start?.cfi??$,o?.({cfi:$,percent:w?.start?.percentage??0,href:w?.start?.href,atStart:!!w?.atStart,atEnd:!!w?.atEnd})})}n(y,"build"),y(h),await l.ready,await i.display(a||void 0);async function g(){try{const k=await l.loaded.navigation,w=n(T=>(T||[]).map(P=>({label:P.label?.trim(),href:P.href,children:w(P.subitems)})),"walk");return w(k.toc)}catch{return[]}}n(g,"outline");async function H(k){if(k===h)return;h=k;const w=$;i.destroy(),y(h),await i.display(w||void 0)}n(H,"setFlow");const x=n(k=>{b=Math.min(220,Math.max(60,k)),i.themes.fontSize(b+"%")},"setFont");return{kind:"epub",next:n(()=>i.next(),"next"),prev:n(()=>i.prev(),"prev"),gotoHref:n(k=>i.display(k),"gotoHref"),outline:g,setFlow:H,get flow(){return h},get fontSize(){return b},fontUp:n(()=>x(b+10),"fontUp"),fontDown:n(()=>x(b-10),"fontDown"),destroy(){try{i?.destroy()}catch{}try{l.destroy()}catch{}e.replaceChildren(),e.classList.remove("epub-view")}}}n(Ot,"createEpubReader");function Pt(e,t){return Ct.call({props:e},e,t)}n(Pt,"TocPanelRatHtml");function Ct(e,t){function a(r){return s`
      <ul.toc-list>
        ${L(()=>r??[],d=>d,d=>s`
            <li>
              <button.toc-link onclick=${v(()=>e.onpick(e.kind==="pdf"?d.dest:d.href))}>${()=>d.label||"Untitled"}</button>
              ${p(()=>d.children?.length,()=>s`${()=>a(d.children)}`)}
            </li>
          `)}
      </ul>
    `}return n(a,"list"),s`
    <aside.toc-panel>
      <div.toc-head>Contents</div>
      ${p(()=>e.items==null,()=>s`<div.toc-loading><svg-icon icon="loading" /></div>`,()=>p(()=>e.items.length,()=>s`${()=>a(e.items)}`,()=>s`<div.toc-empty>No contents in this book.</div>`))}
    </aside>
  `}n(Ct,"$$TocPanelRatHtml");const Tt=`@scope (:has(> [data-rat="i1dsid"])) to (:scope > :not([data-rat="i1dsid"])) {
  footer {
    flex: none; display: flex; align-items: center; gap: 0.6rem; height: 2.6rem; padding: 0 1rem;
    border-top: 1px solid var(--line); background: var(--panel);
  }
  footer label { font-size: 0.75rem; color: var(--fg-50, var(--color-fg)); font-variant-numeric: tabular-nums; white-space: nowrap; }
  aufbau-progress               { --progress-size: 4px; flex: 1 1 auto; border-radius: 2px; background: var(--panel-2); overflow: hidden; }
  aufbau-progress .progress-bar { background: var(--color-ink); }
  
  @media (max-width: 560px) {
    .reader-author { display: none; }
  }
}`;function Et(e,t){return Ht.call({props:e},e,t)}n(Et,"ReaderViewRatHtml");function Ht(e,t){J("i1dsid",Tt);let{bookKey:a,readerFlow:r,readerFont:d,$readerUi:o}=re(U,{bookKey:null,readerFlow:null,readerFont:null,$readerUi:null}),c=W(null),l=W(null);const i=O(()=>ae(a.value));_(()=>{const g=a.value,H=c.value,x=je(()=>ae(g));if(!x||!H)return;let k=!0,w=0,T=null;o.value={error:null,kind:x.kind,ready:!1,toc:null,tocOpen:!1};const P=n(()=>{T&&(Re(g,T),T=null)},"flush"),I=n(R=>{o.value={...o.value,...R},T=x.kind==="pdf"?{page:R.page,pages:R.pages,percent:R.percent}:{location:R.cfi,percent:R.percent},clearTimeout(w),w=setTimeout(P,800)},"onState");return(async()=>{try{const R=await at(x);if(!k)return;const z=le(g),j=x.kind==="pdf"?await Mt(H,R,{initialPage:z?.page||1,onState:I}):await Ot(H,R,{flow:r.value,fontSize:d.value,initialCfi:z?.location||null,onState:I});if(!k){j.destroy();return}l.value=j,o.value={...o.value,flow:j.flow,fontSize:j.fontSize,kind:j.kind,ready:!0}}catch(R){k&&(o.value={...o.value,error:R.message,ready:!0})}})(),()=>{k=!1,clearTimeout(w),P(),l.value?.destroy(),l.value=null}});async function h(){!o.value.tocOpen&&o.value.toc==null?(o.value={...o.value,toc:[],tocOpen:!0},o.value={...o.value,toc:await l.value?.outline?.()??[]}):o.value={...o.value,tocOpen:!o.value.tocOpen}}n(h,"toggleToc");async function b(){if(!l.value)return;const g=o.value.flow==="scrolled"?"paginated":"scrolled";r.value=g,await l.value.setFlow(g),o.value={...o.value,flow:g}}n(b,"toggleFlow");const $=n(g=>{l.value&&(g>0?l.value.fontUp():l.value.fontDown(),d.value=l.value.fontSize)},"font");function M(g){o.value.kind==="pdf"?l.value?.gotoDest(g):l.value?.gotoHref(g),o.value={...o.value,tocOpen:!1}}n(M,"pick");function y(g){/^(INPUT|TEXTAREA|SELECT)$/.test(g.target.tagName)||!l.value||(g.key==="ArrowLeft"&&l.value.prev(),g.key==="ArrowRight"&&l.value.next(),g.key==="Escape"&&fe())}return n(y,"key"),_(()=>(addEventListener("keydown",y),()=>removeEventListener("keydown",y))),s`
    <header data-rat="i1dsid" class="reader-bar">
      <btn-icon icon="arrow-left" label="Back" title="Back to library" onclick=${v(fe)} />
      <div class="reader-id">
        <span.reader-title>${()=>i.value?.title??"Book"}</span>
        ${p(()=>i.value?.author,()=>s`<span.reader-author>${()=>i.value.author}</span>`)}
      </div>
      <div.reader-controls>
        ${p(()=>o.value.kind==="pdf",()=>s`
            <btn-icon icon="remove" label="Zoom out" onclick=${v(()=>l.value?.zoomOut())} />
            <btn-icon icon="add" label="Zoom in" onclick=${v(()=>l.value?.zoomIn())} />
          `)}
        ${p(()=>o.value.kind==="epub",()=>s`
            <btn-icon icon="text-smaller" label="Smaller text" disabled=${()=>!l.value} onclick=${v(()=>$(-1))} />
            <btn-icon icon="text-larger" label="Larger text" disabled=${()=>!l.value} onclick=${v(()=>$(1))} />
            <btn-icon icon=${()=>o.value.flow==="scrolled"?"book-open":"scroll"} label=${()=>o.value.flow==="scrolled"?"Paginated":"Scrolled"} disabled=${()=>!l.value} onclick=${v(b)} />
          `)}
        <btn-icon icon="contents" label="Contents" aria-pressed=${()=>Le(o.value.tocOpen)} onclick=${v(h)} />
      </div>
    </header>
    <div data-rat="i1dsid" class="reader-main">
      <div class="reader-stage" ref=${Fe(c)} />
      ${p(()=>o.value.tocOpen,()=>s`<${Pt} ...${{get items(){return o.value.toc},get kind(){return o.value.kind},onpick:M}} />`)}
      ${p(()=>!o.value.ready&&!o.value.error,()=>s`<div.reader-loading><svg-icon icon="loading" /></div>`)}
      ${p(()=>o.value.error,()=>s`<div.reader-error><${V} icon="book-alert" title="Couldn’t open this book" ...${{get hint(){return o.value.error}}} /></div>`)}
      ${p(()=>o.value.kind==="epub"&&o.value.ready&&!o.value.error,()=>s`
          <button.page-edge.left aria-label="Previous" onclick=${v(()=>l.value?.prev())}><svg-icon icon="chevron-left" /></button>
          <button.page-edge.right aria-label="Next" onclick=${v(()=>l.value?.next())}><svg-icon icon="chevron-right" /></button>
        `)}
    </div>
    <footer data-rat="i1dsid">
      ${p(()=>o.value.kind==="pdf"&&o.value.pages,()=>s`
          <button.ibtn aria-label="Previous page" onclick=${v(()=>l.value?.prev())}><svg-icon icon="chevron-up" /></button>
          <span.label>Page ${()=>o.value.page??1} / ${()=>o.value.pages}</span>
          <button.ibtn aria-label="Next page" onclick=${v(()=>l.value?.next())}><svg-icon icon="chevron-down" /></button>
        `,()=>s`<span.label>${()=>o.value.percent!=null?Math.round((o.value.percent||0)*100)+"%":""}</span>`)}
      <aufbau-progress value=${()=>Math.round((o.value.percent||0)*100)} />
    </footer>
  `}n(Ht,"$$ReaderViewRatHtml");const Z=Ie("appearance",{}),ge={density:N.densities,geometry:N.geometries,mode:N.modes},zt=n(()=>Z.value,"appearance"),jt=n(()=>N.palettes().catch(()=>[]),"palettes");function Me(e){const t=document.querySelector("rat-app");for(const[a,r]of Object.entries(e))r?t?.setAttribute(a,r):t?.removeAttribute(a);return N.set(e)}n(Me,"apply");function Lt(e,t){return Z.value={...Z.value,[e]:t||null},Me({[e]:t||null})}n(Lt,"setAppearance");Object.keys(Z.value).length&&Me(Z.value);const Ft=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function It(e,t){return Dt.call({props:e},e,t)}n(It,"SettingsRatHtml");function Dt(e,t){J("177zzh1",Ft);let a=W({...zt()}),r=W([]);const d=O(()=>X.value);jt().then(l=>{r.value=l});function o(l,i){const h=i.detail?.value??i.target.value;a.value={...a.value,[l]:h},Lt(l,h)}n(o,"change");async function c(){await Se()&&D.success(`${e.name??"the app"} is installed`)}return n(c,"installApp"),s`
    <div.settings data-rat="177zzh1">
      ${t}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>a.value.palette??"zombie"} onchange=${v(l=>o("palette",l))}>
            ${L(()=>r.value,l=>l,l=>s`<input-option value=${()=>l}>${()=>l}</input-option>`)}
          </input-value>
        </label>
        ${L(()=>Object.keys(ge),l=>l,l=>s`
            <label>
              <span>${()=>l}</span>
              <input-value look="segments" value=${()=>a.value[l]??""} onchange=${v(i=>o(l,i))}>
                ${L(()=>ge[l],i=>i,i=>s`<input-option value=${()=>i}>${()=>i}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${p(()=>!ie,()=>s`
          <section>
            <h3>install</h3>
            ${p(()=>d.value,()=>s`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${v(c)} />`,()=>s`
                ${p(()=>Ae,()=>s`<p.hint>Share, then "Add to Home Screen".</p>`,()=>s`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}n(Dt,"$$SettingsRatHtml");const Ut=`@scope (:has(> [data-rat="1x4hjym"])) to (:scope > :not([data-rat="1x4hjym"])) {
  /* ── library ─────────────────────────────────────────────────────────────── */
  
  app-view[name="library"] > main { max-width: 1200px; margin: 0 auto; padding: 1.25rem clamp(1rem, 3vw, 2.25rem) 3rem; }
  
  .lib-head       { display: flex; align-items: center; flex-wrap: wrap; }
  .brand          { display: flex; align-items: center; flex: 1 1 auto; }
  .brand svg-icon { color: var(--color-ink); }
  .lib-tools      { display: flex; align-items: center; }
  .scan-note      { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.78rem; color: var(--fg-50, var(--color-fg)); }
  
  .reconnect-bar {
    display: flex; align-items: center; flex-wrap: wrap;
    border: 1px solid var(--line); border-radius: var(--radius);
    background: color-mix(in oklch, var(--color-ink) 8%, var(--panel));
  }
  .reconnect-bar > svg-icon { color: var(--color-ink); }
  .reconnect-item { display: flex; align-items: center; flex-wrap: wrap; }
  
  
  .lib-controls { display: flex; align-items: center; margin-bottom: 0.9rem; flex-wrap: wrap; }
  .lib-search {
    display: flex; align-items: center; flex: 1 1 16rem;
    background: var(--color-bg); border: 1px solid var(--line); border-radius: var(--radius);
  }
  .lib-search:focus-within { border-color: var(--color-ink); }
  .lib-search svg-icon { color: var(--fg-50, var(--color-fg)); flex: none; }
  .lib-search input { flex: 1 1 auto; min-width: 0; border: none; background: none; color: var(--color-fg); font: inherit; outline: none; }
  
  .folder-bar { display: flex; flex-wrap: wrap; }
  .chip {
    border: 1px solid var(--line); background: var(--panel-2); color: var(--fg-75, var(--color-fg));
    font: inherit; white-space: nowrap;
  }
  .chip:hover { background: var(--hover); }
  .chip.active { background: var(--accent-25); color: var(--color-fg); border-color: transparent; }
  
  /* ── shelves + book grid ─────────────────────────────────────────────────── */
  
    .shelf-title { display: flex; align-items: baseline; gap: 0.5rem; }
  
  /* the "continue reading" row scrolls horizontally */
  .shelf-row {
    display: grid; grid-auto-flow: column; grid-auto-columns: 130px;
    overflow-x: auto; scroll-snap-type: x proximity;
  }
  .shelf-row .book { scroll-snap-align: start; }
  
  .book-grid data-item { overflow: visible; }
  
  .book {
    border: none; background: none; color: inherit; padding: 0; text-align: left;
    width: 100%; display: flex; flex-direction: column;
  }
  
  .cover {
    position: relative; 
    width: 100%; 
    aspect-ratio: 2 / 3; 
    overflow: hidden;
    background-size: cover; background-position: center;
    box-shadow: var(--shadow);
    display: flex;
  }
  .book:hover .cover { transform: translateY(-3px); }
  .cover.has-img .cover-fallback { display: none; }
  .cover-fallback {
    margin: auto; 
    display: flex; 
    flex-direction: column; 
    align-items: center;
    text-align: center; color: #fff;
  }
  .cover-fallback svg-icon { opacity: 0.85; }
  .cover-title {
    display: -webkit-box; 
    -webkit-line-clamp: 4; 
    -webkit-box-orient: vertical; 
    overflow: hidden; 
  }
  .kind-badge {
    position: absolute; 
    top: 0.4rem; 
    right: 0.4rem;
    color: #fff;
  }
  .kind-badge.pdf  { background: color-mix(in oklch, #e06c75 75%, black); }
  .kind-badge.epub { background: color-mix(in oklch, #8be9fd 70%, black); }
  
  .book-meta { min-width: 0; }
  .book-title {
    display: -webkit-box; 
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical; 
    overflow: hidden; 
  }
  .book-author { color: var(--fg-50, var(--color-fg)); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .book-progress { --progress-size: 3px; display: block; border-radius: 2px; background: var(--panel-2); overflow: hidden; }
  .book-progress .progress-bar { background: var(--color-ink); }
  
  .book, .brand, .cover-fallback, .folder-bar, .lib-search, .lib-tools, .reconnect-bar, .reconnect-item {
    --gap: small;
  }
  .lib-controls, .lib-head, .shelf-row {
    --gap: normal;
  }
  
  .kind-badge {
    --pad: tiny;
  }
  .chip, .lib-search, .reconnect-bar {
    --pad: small;
  }
  .cover-fallback {
    --pad: normal;
  }
  
  .kind-badge {
    --rad: 0.25rem;
  }
  .cover {
    --rad: 0.50rem;
  }
  .chip {
    --rad: 1.00rem;
  }
}`;function Yt(e,t){return Bt.call({props:e},e,t)}n(Yt,"AppRatHtml");function Bt(e,t){return J("1x4hjym",Ut),RAT.app.hold(Ye().catch(D.error)),s`
    <rat-area data-rat="1x4hjym" name="main">
      <rat-view route="/" name="library" component=${()=>Rt} />
      <rat-view route="/reader" name="reader" component=${()=>Et} transition="slide" />
    </rat-area>
    <rat-area data-rat="1x4hjym" name="config" dock="end"><${It} name="eBooks" /></rat-area>
  `}n(Bt,"$$AppRatHtml");export{Yt as default,Ut as style};
