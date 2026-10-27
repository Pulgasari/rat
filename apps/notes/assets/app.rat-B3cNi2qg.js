var ne=Object.defineProperty;var n=(e,a)=>ne(e,"name",{value:a,configurable:!0});import{K as D,L as X,P as ae,M as oe,i as o,O as N,w as g,Q as b,g as S,T as x,V as O,W as Q,X as le}from"./index-Bv2xGASN.js";import{p as ie,a as re}from"./keys-CWTtq0D5.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function h(e,{keys:a=null,prevent:r=!1,times:p=0}={}){const u=a?ie(a):null;let v=p;return function(i){if(!(p&&!v)&&!(u&&!re(i,u))){r&&i.preventDefault(),p&&v--;try{const l=(typeof e=="string"?D(e):e).call(this,i);typeof l?.catch=="function"&&l.catch(s=>X(this,s))}catch(l){X(this,l)}}}}n(h,"listener");function K(e,a=null){try{return JSON.parse(localStorage.getItem(e))??a}catch{return a}}n(K,"read");function P(e,a){a==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(a))}n(P,"write");const E=n(e=>(a,r)=>ae.notify(a,{...r,type:e}),"notify"),H=Object.assign(E("info"),{error:E("error"),info:E("info"),success:E("success")});let z=null;const j=oe(!1),Z=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,ce=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Z;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),z=e,j.value=!0});addEventListener("appinstalled",()=>{z=null,j.value=!1});async function se(){if(!z)return!1;const e=z;return z=null,j.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}n(se,"install");function de(e){const a=`${e}:install-hint`,r=n(()=>{K(a)||(P(a,!0),H(`${e} can be installed: see the settings`))},"show");j.value?r():addEventListener("beforeinstallprompt",r,{once:!0})}n(de,"hint");function U(e,a){return ue.call({props:e},e,a)}n(U,"HeaderRatHtml");function ue(e,a){return o`
    <header>
      <btn-icon icon="menu" title="notes" onclick=${D("rat:toggle[menu]")} />
      <nav-crumbs path=${()=>e.path??""} />
      <btn-icon icon="settings" title="settings" onclick=${D("rat:toggle[config]")} />
    </header>
  `}n(ue,"$$HeaderRatHtml");const fe=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function pe(e,a){return $e.call({props:e},e,a)}n(pe,"BrandRatHtml");function $e(e,a){return N("1npwj96",fe),o`
    <div.brand data-rat="1npwj96">
      ${g(()=>e.icon,()=>o`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}n($e,"$$BrandRatHtml");function ge(e,a){return me.call({props:e},e,a)}n(ge,"DockRatHtml");function me(e,a){const r=b(()=>RAT.app?.router.$path.value??"/"),p=n((i,l)=>i==="/"?l==="/":l===i||l.startsWith(`${i}/`),"owns"),u=n(i=>i.to!=null&&[i.to,...i.match??[]].some(l=>p(l,r.value)),"isActive"),v=n(i=>i.onclick?i.onclick():RAT.app.router.go(i.to),"run");return o`
    <nav.dock>
      ${S(()=>e.items??[],i=>i,i=>o`<btn-tap class=${()=>u(i)?"col active":"col"} aria-current=${()=>u(i)?"page":null} icon=${()=>i.icon} label=${()=>i.label} onclick=${h(()=>v(i))} />`)}
    </nav>
  `}n(me,"$$DockRatHtml");const he=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
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
}`;function B(e,a){return ve.call({props:e},e,a)}n(B,"EmptyRatHtml");function ve(e,a){return N("ihnpco",he),o`
    <div.empty data-rat="ihnpco">
      ${g(()=>e.icon,()=>o`<svg-icon icon=${()=>e.icon} />`)}
      ${g(()=>e.title,()=>o`<p.title>${()=>e.title}</p>`)}
      ${g(()=>e.hint,()=>o`<p.hint>${()=>e.hint}</p>`)}
      ${a}
    </div>
  `}n(ve,"$$EmptyRatHtml");const be=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function _(e,a){return ye.call({props:e},e,a)}n(_,"LoadingRatHtml");function ye(e,a){return N("1tn1js8",be),o`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${g(()=>e.text,()=>o`<span>${()=>e.text}</span>`)}
    </div>
  `}n(ye,"$$LoadingRatHtml");const we=`@scope (:has(> [data-rat="1oqcgw9"])) to (:scope > :not([data-rat="1oqcgw9"])) {
  .tree  { display: grid; gap: 0.75rem; }
  .head  { align-items: center; display: flex; gap: 0.25rem; }
  .name  { flex: 1 1 auto; font-weight: 600; min-inline-size: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .reconnect { display: grid; gap: 0.5rem; }
  .empty, .hint { opacity: 0.7; }
}`;function ke(e,a){return xe.call({props:e},e,a)}n(ke,"FolderTreeRatHtml");function xe(e,a){N("1oqcgw9",we);const r=e.lib,p=e.expandedKey??"foldertree:expanded",u=e.labelOf??(t=>t.name);let i=x(n(()=>{try{return JSON.parse(localStorage.getItem(p))??[]}catch{return[]}},"read")());const l=b(()=>r.sources.value),s=b(()=>r.perms.value),m=b(()=>r.trees.value),k=b(()=>r.scanning.value),y=b(()=>String(e.filter??"").trim().toLowerCase()),I=n((t,c,$)=>`${t}:${c}:${$}`,"valueOf");function A(t=""){const c=t.slice(2),$=c.indexOf(":");return{kind:t[0],path:c.slice($+1),sourceId:c.slice(0,$)}}n(A,"parse");function L(t,c){if(t.kind==="file")return t.path.toLowerCase().includes(c)?t:null;const $=(t.children??[]).map(f=>L(f,c)).filter(Boolean);return $.length?{...t,children:$}:null}n(L,"filtered");const R=n(t=>y.value&&m.value[t]?L(m.value[t],y.value):m.value[t],"shown"),q=n((t,c)=>i.value.includes(`${t}:${c}`),"isOpen"),J=n((t,c)=>e.selected?.sourceId===t&&e.selected?.path===c,"isSelected");function F(t){const{kind:c,path:$,sourceId:f}=A(t.detail?.value);c==="f"&&e.onopen?.(f,$)}n(F,"select");function C(t){const{kind:c,path:$,sourceId:f}=A(t.detail?.value);if(c!=="d")return;const Y=`${f}:${$}`,W=i.value.filter(te=>te!==Y);i.value=t.detail.expanded?[...W,Y]:W,localStorage.setItem(p,JSON.stringify(i.value))}n(C,"toggle");async function M(t){confirm(`Close “${t.name}”? Your files are untouched, this only forgets the folder.`)&&(e.onremove?.(t.id),await r.remove(t.id))}n(M,"remove");async function d(t){const c=await r.reconnect(t.id);c.granted||console.warn("[foldertree] reconnect failed",{source:t,...c})}n(d,"reconnect");function w(t,c,$){return o`
      ${S(()=>t.children??[],f=>f,f=>o`
          ${g(()=>f.kind==="file",()=>o`<data-node data-rat="1oqcgw9" label=${()=>u(f)} value=${()=>I("f",c,f.path)} icon=${()=>e.fileIcon} selected=${()=>J(c,f.path)} />`,()=>o`<data-node data-rat="1oqcgw9" label=${()=>f.name} value=${()=>I("d",c,f.path)} expanded=${()=>$||q(c,f.path)}>${()=>w(f,c,$)}</data-node>`)}
        `)}
    `}return n(w,"branch"),o`
    <div.tree data-rat="1oqcgw9">
      ${S(()=>l.value,t=>t,t=>o`
          <div.source>
            <div.head>
              <svg-icon icon="folder" />
              <span.name title=${()=>t.name}>${()=>t.name}</span>
              <btn-icon icon="refresh" label="refresh" disabled=${()=>k.value[t.id]||s.value[t.id]!=="granted"} onclick=${h(()=>r.scan(t.id).catch(()=>{}))} />
              <btn-icon icon="close" label="close" onclick=${h(()=>M(t))} />
            </div>
            ${g(()=>s.value[t.id]!=="granted",()=>o`
                <div.reconnect>
                  <span>${()=>s.value[t.id]==="denied"?"Permission was blocked.":"This folder needs permission again."}</span>
                  <btn-push icon="folder-key" label="Reconnect" onclick=${h(()=>d(t))} />
                  <btn-push icon="folder-search" label="Choose folder" onclick=${h(()=>r.repick(t.id))} />
                </div>
              `,()=>o`
                ${g(()=>k.value[t.id]&&!m.value[t.id],()=>o`<${_} text="scanning …" />`,()=>o`
                    ${g(()=>R(t.id)?.children?.length,()=>o`<data-tree ondata-tree-select=${h(F)} ondata-tree-toggle=${h(C)}>${()=>w(R(t.id),t.id,!!y.value)}</data-tree>`,()=>o`<p.empty>${()=>y.value?e.noMatchText??"No matches":e.emptyText??"This folder is empty"}</p>`)}
                  `)}
              `)}
          </div>
        `,()=>o`<p.hint>${()=>e.noSourcesText??"No folders open yet."}</p>`)}
    </div>
  `}n(xe,"$$FolderTreeRatHtml");const ee=`appearance:${new URL(".",location.href).pathname}`,V={density:O.densities,geometry:O.geometries,mode:O.modes},T=K(ee,{}),Se=n(()=>O.palettes().catch(()=>[]),"palettes");function Oe(e,a){return T[e]=a||null,P(ee,T),O.set({[e]:a||null})}n(Oe,"setAppearance");Object.keys(T).length&&O.set(T);const Re=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function G(e,a){return He.call({props:e},e,a)}n(G,"SettingsRatHtml");function He(e,a){N("177zzh1",Re);let r=x({...T}),p=x([]);const u=b(()=>j.value);Se().then(l=>{p.value=l});function v(l,s){const m=s.detail?.value??s.target.value;r.value={...r.value,[l]:m},Oe(l,m)}n(v,"change");async function i(){await se()&&H.success(`${e.name??"the app"} is installed`)}return n(i,"installApp"),o`
    <div.settings data-rat="177zzh1">
      ${a}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>r.value.palette??"zombie"} onchange=${h(l=>v("palette",l))}>
            ${S(()=>p.value,l=>l,l=>o`<input-option value=${()=>l}>${()=>l}</input-option>`)}
          </input-value>
        </label>
        ${S(()=>Object.keys(V),l=>l,l=>o`
            <label>
              <span>${()=>l}</span>
              <input-value look="segments" value=${()=>r.value[l]??""} onchange=${h(s=>v(l,s))}>
                ${S(()=>V[l],s=>s,s=>o`<input-option value=${()=>s}>${()=>s}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${g(()=>!Z,()=>o`
          <section>
            <h3>install</h3>
            ${g(()=>u.value,()=>o`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${h(i)} />`,()=>o`
                ${g(()=>ce,()=>o`<p.hint>Share, then "Add to Home Screen".</p>`,()=>o`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}n(He,"$$SettingsRatHtml");function Ce(e,a){return ze.call({props:e},e,a)}n(Ce,"AppRatHtml");function ze(e,a){const r=e.app,p=r.config,u=r.folders;r.hold(u.load()),de(p.name);const v="notes:open",i=n(()=>{try{return JSON.parse(localStorage.getItem(v))}catch{return null}},"stored");let l=x(""),s=x(i()),m=x(null),k=x(K("notes:textSize",16));Q(()=>P("notes:textSize",k.value));const y=b(()=>s.value&&u.trees.value[s.value.sourceId]?u.nodeAt(s.value.sourceId,s.value.path):null),I=b(()=>u.sources.value),A=b(()=>y.value?y.value.path:""),L=n(d=>d.name.replace(/\.[^.]+$/,""),"titleOf");function R(d){s.value=d,d?localStorage.setItem(v,JSON.stringify(d)):localStorage.removeItem(v)}n(R,"remember");const q=n(()=>{const d=r.area("menu");d?.isOverlay&&d.hide()},"closeMenu");function J(d,w){R({path:w,sourceId:d}),r.router.go("/note"),q()}n(J,"openNote");function F(d){H("Folder removed"),s.value?.sourceId===d&&(R(null),r.router.go("/"))}n(F,"forget");async function C(){try{await u.add()&&H.success("Folder added")}catch(d){H.error(d.message)}}n(C,"addFolder");const M=[{icon:"folder",label:"folders",onclick:n(()=>r.toggle("menu"),"onclick")},{icon:"notes",label:"note",to:"/note"},{icon:"settings",label:"settings",onclick:n(()=>r.toggle("config"),"onclick")}];return Q(()=>{const d=y.value;if(m.value=null,!d)return;let w=!0;return u.read(d).then(t=>{w&&(m.value=t)},t=>{w&&(m.value=`could not read that note: ${t.message}`)}),()=>{w=!1}}),o`
    <rat-area name="menu" dock="start" open>
      <div.menu>
        <${pe} ...${{get name(){return p.name}}} icon="./app.svg" />
        <input type="search" placeholder="filter notes ..." ref=${le(l,"value")} />
        <${ke} ...${{get lib(){return u},get filter(){return l.value},get selected(){return s.value},onopen:J,onremove:F,get labelOf(){return L}}} fileIcon="notes" expandedKey="notes:expanded" emptyText="No markdown files here" />
        <div.side-foot><btn-push icon="folder-add" label="Open a folder" onclick=${h(C)} /></div>
      </div>
    </rat-area>
    <rat-view route="/" name="start">
      <${U} />
      ${g(()=>I.value.length,()=>o`<${B} icon="notes" title="No note open" hint="Choose a note to start reading." />`,()=>o`<${B} icon="notes" title="No note open" hint="Open a folder of Markdown files to get started."><btn-push icon="folder-add" label="Open a folder" onclick=${h(C)} /></${B}>`)}
    </rat-view>
    <rat-view route="/note" name="note" transition="slide">
      <${U} ...${{get path(){return A.value}}} />
      ${g(()=>m.value===null,()=>o`<${_} />`,()=>o`
          <output-md id="notes-reader" format="markdown" raw=${()=>m.value} style=${()=>"font-size: "+k.value+"px"} />
          <nav-toc target="#notes-reader" selector="h1, h2, h3" />
        `)}
    </rat-view>
    <rat-area name="dock" dock="bottom" overlay="never" open><${ge} ...${{get items(){return M}}} /></rat-area>
    <rat-area name="config" dock="end">
      <${G} ...${{get name(){return p.name}}}>
        <section>
          <h3>reading</h3>
          <label>
            <span>text size</span>
            <input-number look="slider" min="12" max="24" step="1" value=${()=>k.value} onchange=${h(d=>k.value=Number(d.detail?.value??d.target.value))} />
          </label>
        </section>
      </${G}>
    </rat-area>
  `}n(ze,"$$AppRatHtml");export{Ce as default};
