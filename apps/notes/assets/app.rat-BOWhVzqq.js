var ne=Object.defineProperty;var n=(e,a)=>ne(e,"name",{value:a,configurable:!0});import{L as D,M as X,P as ae,O as le,i as l,Q as N,w as g,T as b,g as S,V as oe,W as x,X as O,Y as Q,Z as ie}from"./index-DhxCI4O9.js";import{p as re,a as ce}from"./keys-CWTtq0D5.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function h(e,{keys:a=null,prevent:r=!1,times:p=0}={}){const u=a?re(a):null;let v=p;return function(i){if(!(p&&!v)&&!(u&&!ce(i,u))){r&&i.preventDefault(),p&&v--;try{const o=(typeof e=="string"?D(e):e).call(this,i);typeof o?.catch=="function"&&o.catch(s=>X(this,s,"handler"))}catch(o){X(this,o,"handler")}}}}n(h,"listener");function P(e,a=null){try{return JSON.parse(localStorage.getItem(e))??a}catch{return a}}n(P,"read");function Y(e,a){a==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(a))}n(Y,"write");const E=n(e=>(a,r)=>ae.notify(a,{...r,type:e}),"notify"),H=Object.assign(E("info"),{error:E("error"),info:E("info"),success:E("success")});let z=null;const j=le(!1),G=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,se=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!G;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),z=e,j.value=!0});addEventListener("appinstalled",()=>{z=null,j.value=!1});async function de(){if(!z)return!1;const e=z;return z=null,j.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}n(de,"install");function ue(e){const a=`${e}:install-hint`,r=n(()=>{P(a)||(Y(a,!0),H(`${e} can be installed: see the settings`))},"show");j.value?r():addEventListener("beforeinstallprompt",r,{once:!0})}n(ue,"hint");function U(e,a){return fe.call({props:e},e,a)}n(U,"HeaderRatHtml");function fe(e,a){return l`
    <header>
      <btn-icon icon="menu" title="notes" onclick=${D("rat:toggle[menu]")} />
      <nav-crumbs path=${()=>e.path??""} />
      <btn-icon icon="settings" title="settings" onclick=${D("rat:toggle[config]")} />
    </header>
  `}n(fe,"$$HeaderRatHtml");const pe=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function $e(e,a){return ge.call({props:e},e,a)}n($e,"BrandRatHtml");function ge(e,a){return N("1npwj96",pe),l`
    <div.brand data-rat="1npwj96">
      ${g(()=>e.icon,()=>l`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}n(ge,"$$BrandRatHtml");function me(e,a){return he.call({props:e},e,a)}n(me,"DockRatHtml");function he(e,a){const r=b(()=>RAT.app?.router.$path.value??"/"),p=n((i,o)=>i==="/"?o==="/":o===i||o.startsWith(`${i}/`),"owns"),u=n(i=>i.to!=null&&[i.to,...i.match??[]].some(o=>p(o,r.value)),"isActive"),v=n(i=>i.onclick?i.onclick():RAT.app.router.go(i.to),"run");return l`
    <nav.dock>
      ${S(()=>e.items??[],i=>i,i=>l`<btn-tap class=${()=>u(i)?"col active":"col"} aria-current=${()=>oe(u(i)?"page":null)} icon=${()=>i.icon} label=${()=>i.label} onclick=${h(()=>v(i))} />`)}
    </nav>
  `}n(he,"$$DockRatHtml");const ve=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
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
}`;function B(e,a){return be.call({props:e},e,a)}n(B,"EmptyRatHtml");function be(e,a){return N("ihnpco",ve),l`
    <div.empty data-rat="ihnpco">
      ${g(()=>e.icon,()=>l`<svg-icon icon=${()=>e.icon} />`)}
      ${g(()=>e.title,()=>l`<p.title>${()=>e.title}</p>`)}
      ${g(()=>e.hint,()=>l`<p.hint>${()=>e.hint}</p>`)}
      ${a}
    </div>
  `}n(be,"$$EmptyRatHtml");const ye=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function _(e,a){return we.call({props:e},e,a)}n(_,"LoadingRatHtml");function we(e,a){return N("1tn1js8",ye),l`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${g(()=>e.text,()=>l`<span>${()=>e.text}</span>`)}
    </div>
  `}n(we,"$$LoadingRatHtml");const ke=`@scope (:has(> [data-rat="1oqcgw9"])) to (:scope > :not([data-rat="1oqcgw9"])) {
  .tree  { display: grid; gap: 0.75rem; }
  .head  { align-items: center; display: flex; gap: 0.25rem; }
  .name  { flex: 1 1 auto; font-weight: 600; min-inline-size: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .reconnect { display: grid; gap: 0.5rem; }
  .empty, .hint { opacity: 0.7; }
}`;function xe(e,a){return Se.call({props:e},e,a)}n(xe,"FolderTreeRatHtml");function Se(e,a){N("1oqcgw9",ke);const r=e.lib,p=e.expandedKey??"foldertree:expanded",u=e.labelOf??(t=>t.name);let i=x(n(()=>{try{return JSON.parse(localStorage.getItem(p))??[]}catch{return[]}},"read")());const o=b(()=>r.sources.value),s=b(()=>r.perms.value),m=b(()=>r.trees.value),k=b(()=>r.scanning.value),y=b(()=>String(e.filter??"").trim().toLowerCase()),I=n((t,c,$)=>`${t}:${c}:${$}`,"valueOf");function A(t=""){const c=t.slice(2),$=c.indexOf(":");return{kind:t[0],path:c.slice($+1),sourceId:c.slice(0,$)}}n(A,"parse");function L(t,c){if(t.kind==="file")return t.path.toLowerCase().includes(c)?t:null;const $=(t.children??[]).map(f=>L(f,c)).filter(Boolean);return $.length?{...t,children:$}:null}n(L,"filtered");const R=n(t=>y.value&&m.value[t]?L(m.value[t],y.value):m.value[t],"shown"),q=n((t,c)=>i.value.includes(`${t}:${c}`),"isOpen"),J=n((t,c)=>e.selected?.sourceId===t&&e.selected?.path===c,"isSelected");function F(t){const{kind:c,path:$,sourceId:f}=A(t.detail?.value);c==="f"&&e.onopen?.(f,$)}n(F,"select");function C(t){const{kind:c,path:$,sourceId:f}=A(t.detail?.value);if(c!=="d")return;const K=`${f}:${$}`,W=i.value.filter(te=>te!==K);i.value=t.detail.expanded?[...W,K]:W,localStorage.setItem(p,JSON.stringify(i.value))}n(C,"toggle");async function M(t){confirm(`Close “${t.name}”? Your files are untouched, this only forgets the folder.`)&&(e.onremove?.(t.id),await r.remove(t.id))}n(M,"remove");async function d(t){const c=await r.reconnect(t.id);c.granted||console.warn("[foldertree] reconnect failed",{source:t,...c})}n(d,"reconnect");function w(t,c,$){return l`
      ${S(()=>t.children??[],f=>f,f=>l`
          ${g(()=>f.kind==="file",()=>l`<data-node data-rat="1oqcgw9" label=${()=>u(f)} value=${()=>I("f",c,f.path)} icon=${()=>e.fileIcon} selected=${()=>J(c,f.path)} />`,()=>l`<data-node data-rat="1oqcgw9" label=${()=>f.name} value=${()=>I("d",c,f.path)} expanded=${()=>$||q(c,f.path)}>${()=>w(f,c,$)}</data-node>`)}
        `)}
    `}return n(w,"branch"),l`
    <div.tree data-rat="1oqcgw9">
      ${S(()=>o.value,t=>t,t=>l`
          <div.source>
            <div.head>
              <svg-icon icon="folder" />
              <span.name title=${()=>t.name}>${()=>t.name}</span>
              <btn-icon icon="refresh" label="refresh" disabled=${()=>k.value[t.id]||s.value[t.id]!=="granted"} onclick=${h(()=>r.scan(t.id).catch(()=>{}))} />
              <btn-icon icon="close" label="close" onclick=${h(()=>M(t))} />
            </div>
            ${g(()=>s.value[t.id]!=="granted",()=>l`
                <div.reconnect>
                  <span>${()=>s.value[t.id]==="denied"?"Permission was blocked.":"This folder needs permission again."}</span>
                  <btn-push icon="folder-key" label="Reconnect" onclick=${h(()=>d(t))} />
                  <btn-push icon="folder-search" label="Choose folder" onclick=${h(()=>r.repick(t.id))} />
                </div>
              `,()=>l`
                ${g(()=>k.value[t.id]&&!m.value[t.id],()=>l`<${_} text="scanning …" />`,()=>l`
                    ${g(()=>R(t.id)?.children?.length,()=>l`<data-tree ondata-tree-select=${h(F)} ondata-tree-toggle=${h(C)}>${()=>w(R(t.id),t.id,!!y.value)}</data-tree>`,()=>l`<p.empty>${()=>y.value?e.noMatchText??"No matches":e.emptyText??"This folder is empty"}</p>`)}
                  `)}
              `)}
          </div>
        `,()=>l`<p.hint>${()=>e.noSourcesText??"No folders open yet."}</p>`)}
    </div>
  `}n(Se,"$$FolderTreeRatHtml");const ee=`appearance:${new URL(".",location.href).pathname}`,V={density:O.densities,geometry:O.geometries,mode:O.modes},T=P(ee,{}),Oe=n(()=>O.palettes().catch(()=>[]),"palettes");function Re(e,a){return T[e]=a||null,Y(ee,T),O.set({[e]:a||null})}n(Re,"setAppearance");Object.keys(T).length&&O.set(T);const He=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function Z(e,a){return ze.call({props:e},e,a)}n(Z,"SettingsRatHtml");function ze(e,a){N("177zzh1",He);let r=x({...T}),p=x([]);const u=b(()=>j.value);Oe().then(o=>{p.value=o});function v(o,s){const m=s.detail?.value??s.target.value;r.value={...r.value,[o]:m},Re(o,m)}n(v,"change");async function i(){await de()&&H.success(`${e.name??"the app"} is installed`)}return n(i,"installApp"),l`
    <div.settings data-rat="177zzh1">
      ${a}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>r.value.palette??"zombie"} onchange=${h(o=>v("palette",o))}>
            ${S(()=>p.value,o=>o,o=>l`<input-option value=${()=>o}>${()=>o}</input-option>`)}
          </input-value>
        </label>
        ${S(()=>Object.keys(V),o=>o,o=>l`
            <label>
              <span>${()=>o}</span>
              <input-value look="segments" value=${()=>r.value[o]??""} onchange=${h(s=>v(o,s))}>
                ${S(()=>V[o],s=>s,s=>l`<input-option value=${()=>s}>${()=>s}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${g(()=>!G,()=>l`
          <section>
            <h3>install</h3>
            ${g(()=>u.value,()=>l`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${h(i)} />`,()=>l`
                ${g(()=>se,()=>l`<p.hint>Share, then "Add to Home Screen".</p>`,()=>l`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}n(ze,"$$SettingsRatHtml");function Ee(e,a){return Te.call({props:e},e,a)}n(Ee,"AppRatHtml");function Te(e,a){const r=e.app,p=r.config,u=r.folders;r.hold(u.load()),ue(p.name);const v="notes:open",i=n(()=>{try{return JSON.parse(localStorage.getItem(v))}catch{return null}},"stored");let o=x(""),s=x(i()),m=x(null),k=x(P("notes:textSize",16));Q(()=>Y("notes:textSize",k.value));const y=b(()=>s.value&&u.trees.value[s.value.sourceId]?u.nodeAt(s.value.sourceId,s.value.path):null),I=b(()=>u.sources.value),A=b(()=>y.value?y.value.path:""),L=n(d=>d.name.replace(/\.[^.]+$/,""),"titleOf");function R(d){s.value=d,d?localStorage.setItem(v,JSON.stringify(d)):localStorage.removeItem(v)}n(R,"remember");const q=n(()=>{const d=r.area("menu");d?.isOverlay&&d.hide()},"closeMenu");function J(d,w){R({path:w,sourceId:d}),r.router.go("/note"),q()}n(J,"openNote");function F(d){H("Folder removed"),s.value?.sourceId===d&&(R(null),r.router.go("/"))}n(F,"forget");async function C(){try{await u.add()&&H.success("Folder added")}catch(d){H.error(d.message)}}n(C,"addFolder");const M=[{icon:"folder",label:"folders",onclick:n(()=>r.toggle("menu"),"onclick")},{icon:"notes",label:"note",to:"/note"},{icon:"settings",label:"settings",onclick:n(()=>r.toggle("config"),"onclick")}];return Q(()=>{const d=y.value;if(m.value=null,!d)return;let w=!0;return u.read(d).then(t=>{w&&(m.value=t)},t=>{w&&(m.value=`could not read that note: ${t.message}`)}),()=>{w=!1}}),l`
    <rat-area name="menu" dock="start" open>
      <div.menu>
        <${$e} ...${{get name(){return p.name}}} icon="./app.svg" />
        <input type="search" placeholder="filter notes ..." ref=${ie(o,"value")} />
        <${xe} ...${{get lib(){return u},get filter(){return o.value},get selected(){return s.value},onopen:J,onremove:F,get labelOf(){return L}}} fileIcon="notes" expandedKey="notes:expanded" emptyText="No markdown files here" />
        <div.side-foot><btn-push icon="folder-add" label="Open a folder" onclick=${h(C)} /></div>
      </div>
    </rat-area>
    <rat-view route="/" name="start">
      <${U} />
      ${g(()=>I.value.length,()=>l`<${B} icon="notes" title="No note open" hint="Choose a note to start reading." />`,()=>l`<${B} icon="notes" title="No note open" hint="Open a folder of Markdown files to get started."><btn-push icon="folder-add" label="Open a folder" onclick=${h(C)} /></${B}>`)}
    </rat-view>
    <rat-view route="/note" name="note" transition="slide">
      <${U} ...${{get path(){return A.value}}} />
      ${g(()=>m.value===null,()=>l`<${_} />`,()=>l`
          <output-md id="notes-reader" format="markdown" raw=${()=>m.value} style=${()=>"font-size: "+k.value+"px"} />
          <nav-toc target="#notes-reader" selector="h1, h2, h3" />
        `)}
    </rat-view>
    <rat-area name="dock" dock="bottom" overlay="never" open><${me} ...${{get items(){return M}}} /></rat-area>
    <rat-area name="config" dock="end">
      <${Z} ...${{get name(){return p.name}}}>
        <section>
          <h3>reading</h3>
          <label>
            <span>text size</span>
            <input-number look="slider" min="12" max="24" step="1" value=${()=>k.value} onchange=${h(d=>k.value=Number(d.detail?.value??d.target.value))} />
          </label>
        </section>
      </${Z}>
    </rat-area>
  `}n(Te,"$$AppRatHtml");export{Ee as default};
