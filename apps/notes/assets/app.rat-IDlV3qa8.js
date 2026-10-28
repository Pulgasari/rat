var _=Object.defineProperty;var n=(e,l)=>_(e,"name",{value:l,configurable:!0});import{V as D,W as P,X as ee,Y as te,i as o,Z as S,w as v,a0 as b,g as k,a1 as ne,a2 as O,a3 as x,a4 as M,a5 as ae,a6 as le}from"./index-CpWqsZ_J.js";import{p as oe,a as ie}from"./keys-CWTtq0D5.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function g(e,{keys:l=null,prevent:r=!1,times:f=0}={}){const u=l?oe(l):null;let h=f;return function(a){if(!(f&&!h)&&!(u&&!ie(a,u))){r&&a.preventDefault(),f&&h--;try{const i=(typeof e=="string"?D(e):e).call(this,a);typeof i?.catch=="function"&&i.catch(s=>P(this,s,"handler"))}catch(i){P(this,i,"handler")}}}}n(g,"listener");const I=n(e=>(l,r)=>ee.notify(l,{...r,type:e}),"notify"),H=Object.assign(I("info"),{error:I("error"),info:I("info"),success:I("success")});let z=null;const j=te(!1),Z=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,re=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Z;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),z=e,j.value=!0});addEventListener("appinstalled",()=>{z=null,j.value=!1});async function ce(){if(!z)return!1;const e=z;return z=null,j.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}n(ce,"install");function se(e){const l=n(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),H(`${e} can be installed: see the settings`))},"show");j.value?l():addEventListener("beforeinstallprompt",l,{once:!0})}n(se,"hint");function W(e,l){return de.call({props:e},e,l)}n(W,"HeaderRatHtml");function de(e,l){return o`
    <header>
      <btn-icon icon="menu" title="notes" onclick=${D("rat:toggle[menu]")} />
      <nav-crumbs path=${()=>e.path??""} />
      <btn-icon icon="settings" title="settings" onclick=${D("rat:toggle[config]")} />
    </header>
  `}n(de,"$$HeaderRatHtml");const ue=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function pe(e,l){return fe.call({props:e},e,l)}n(pe,"BrandRatHtml");function fe(e,l){return S("1npwj96",ue),o`
    <div.brand data-rat="1npwj96">
      ${v(()=>e.icon,()=>o`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}n(fe,"$$BrandRatHtml");function $e(e,l){return ve.call({props:e},e,l)}n($e,"DockRatHtml");function ve(e,l){const r=b(()=>RAT.app?.router.$path.value??"/"),f=n((a,i)=>a==="/"?i==="/":i===a||i.startsWith(`${a}/`),"owns"),u=n(a=>a.to!=null&&[a.to,...a.match??[]].some(i=>f(i,r.value)),"isActive"),h=n(a=>a.onclick?a.onclick():RAT.app.router.go(a.to),"run");return o`
    <nav.dock>
      ${k(()=>e.items??[],a=>a,a=>o`<btn-tap class=${()=>u(a)?"col active":"col"} aria-current=${()=>ne(u(a)?"page":null)} icon=${()=>a.icon} label=${()=>a.label} onclick=${g(()=>h(a))} />`)}
    </nav>
  `}n(ve,"$$DockRatHtml");const ge=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
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
}`;function B(e,l){return he.call({props:e},e,l)}n(B,"EmptyRatHtml");function he(e,l){return S("ihnpco",ge),o`
    <div.empty data-rat="ihnpco">
      ${v(()=>e.icon,()=>o`<svg-icon icon=${()=>e.icon} />`)}
      ${v(()=>e.title,()=>o`<p.title>${()=>e.title}</p>`)}
      ${v(()=>e.hint,()=>o`<p.hint>${()=>e.hint}</p>`)}
      ${l}
    </div>
  `}n(he,"$$EmptyRatHtml");const me=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function G(e,l){return be.call({props:e},e,l)}n(G,"LoadingRatHtml");function be(e,l){return S("1tn1js8",me),o`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${v(()=>e.text,()=>o`<span>${()=>e.text}</span>`)}
    </div>
  `}n(be,"$$LoadingRatHtml");const ye=`@scope (:has(> [data-rat="1oqcgw9"])) to (:scope > :not([data-rat="1oqcgw9"])) {
  .tree  { display: grid; gap: 0.75rem; }
  .head  { align-items: center; display: flex; gap: 0.25rem; }
  .name  { flex: 1 1 auto; font-weight: 600; min-inline-size: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .reconnect { display: grid; gap: 0.5rem; }
  .empty, .hint { opacity: 0.7; }
}`;function we(e,l){return ke.call({props:e},e,l)}n(we,"FolderTreeRatHtml");function ke(e,l){S("1oqcgw9",ye);const r=e.lib,f=e.expandedKey??"foldertree:expanded",u=e.labelOf??(t=>t.name);let a=O(n(()=>{try{return JSON.parse(localStorage.getItem(f))??[]}catch{return[]}},"read")());const i=b(()=>r.sources.value),s=b(()=>r.perms.value),m=b(()=>r.trees.value),A=b(()=>r.scanning.value),w=b(()=>String(e.filter??"").trim().toLowerCase()),N=n((t,c,$)=>`${t}:${c}:${$}`,"valueOf");function C(t=""){const c=t.slice(2),$=c.indexOf(":");return{kind:t[0],path:c.slice($+1),sourceId:c.slice(0,$)}}n(C,"parse");function L(t,c){if(t.kind==="file")return t.path.toLowerCase().includes(c)?t:null;const $=(t.children??[]).map(p=>L(p,c)).filter(Boolean);return $.length?{...t,children:$}:null}n(L,"filtered");const q=n(t=>w.value&&m.value[t]?L(m.value[t],w.value):m.value[t],"shown"),E=n((t,c)=>a.value.includes(`${t}:${c}`),"isOpen"),F=n((t,c)=>e.selected?.sourceId===t&&e.selected?.path===c,"isSelected");function d(t){const{kind:c,path:$,sourceId:p}=C(t.detail?.value);c==="f"&&e.onopen?.(p,$)}n(d,"select");function y(t){const{kind:c,path:$,sourceId:p}=C(t.detail?.value);if(c!=="d")return;const J=`${p}:${$}`,K=a.value.filter(U=>U!==J);a.value=t.detail.expanded?[...K,J]:K,localStorage.setItem(f,JSON.stringify(a.value))}n(y,"toggle");async function R(t){confirm(`Close “${t.name}”? Your files are untouched, this only forgets the folder.`)&&(e.onremove?.(t.id),await r.remove(t.id))}n(R,"remove");async function Q(t){const c=await r.reconnect(t.id);c.granted||console.warn("[foldertree] reconnect failed",{source:t,...c})}n(Q,"reconnect");function Y(t,c,$){return o`
      ${k(()=>t.children??[],p=>p,p=>o`
          ${v(()=>p.kind==="file",()=>o`<data-node data-rat="1oqcgw9" label=${()=>u(p)} value=${()=>N("f",c,p.path)} icon=${()=>e.fileIcon} selected=${()=>F(c,p.path)} />`,()=>o`<data-node data-rat="1oqcgw9" label=${()=>p.name} value=${()=>N("d",c,p.path)} expanded=${()=>$||E(c,p.path)}>${()=>Y(p,c,$)}</data-node>`)}
        `)}
    `}return n(Y,"branch"),o`
    <div.tree data-rat="1oqcgw9">
      ${k(()=>i.value,t=>t,t=>o`
          <div.source>
            <div.head>
              <svg-icon icon="folder" />
              <span.name title=${()=>t.name}>${()=>t.name}</span>
              <btn-icon icon="refresh" label="refresh" disabled=${()=>A.value[t.id]||s.value[t.id]!=="granted"} onclick=${g(()=>r.scan(t.id).catch(()=>{}))} />
              <btn-icon icon="close" label="close" onclick=${g(()=>R(t))} />
            </div>
            ${v(()=>s.value[t.id]!=="granted",()=>o`
                <div.reconnect>
                  <span>${()=>s.value[t.id]==="denied"?"Permission was blocked.":"This folder needs permission again."}</span>
                  <btn-push icon="folder-key" label="Reconnect" onclick=${g(()=>Q(t))} />
                  <btn-push icon="folder-search" label="Choose folder" onclick=${g(()=>r.repick(t.id))} />
                </div>
              `,()=>o`
                ${v(()=>A.value[t.id]&&!m.value[t.id],()=>o`<${G} text="scanning …" />`,()=>o`
                    ${v(()=>q(t.id)?.children?.length,()=>o`<data-tree ondata-tree-select=${g(d)} ondata-tree-toggle=${g(y)}>${()=>Y(q(t.id),t.id,!!w.value)}</data-tree>`,()=>o`<p.empty>${()=>w.value?e.noMatchText??"No matches":e.emptyText??"This folder is empty"}</p>`)}
                  `)}
              `)}
          </div>
        `,()=>o`<p.hint>${()=>e.noSourcesText??"No folders open yet."}</p>`)}
    </div>
  `}n(ke,"$$FolderTreeRatHtml");const T=M("appearance",{}),X={density:x.densities,geometry:x.geometries,mode:x.modes},xe=n(()=>T.value,"appearance"),Re=n(()=>x.palettes().catch(()=>[]),"palettes");function He(e,l){return T.value={...T.value,[e]:l||null},x.set({[e]:l||null})}n(He,"setAppearance");Object.keys(T.value).length&&x.set(T.value);const ze=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function V(e,l){return Oe.call({props:e},e,l)}n(V,"SettingsRatHtml");function Oe(e,l){S("177zzh1",ze);let r=O({...xe()}),f=O([]);const u=b(()=>j.value);Re().then(i=>{f.value=i});function h(i,s){const m=s.detail?.value??s.target.value;r.value={...r.value,[i]:m},He(i,m)}n(h,"change");async function a(){await ce()&&H.success(`${e.name??"the app"} is installed`)}return n(a,"installApp"),o`
    <div.settings data-rat="177zzh1">
      ${l}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>r.value.palette??"zombie"} onchange=${g(i=>h("palette",i))}>
            ${k(()=>f.value,i=>i,i=>o`<input-option value=${()=>i}>${()=>i}</input-option>`)}
          </input-value>
        </label>
        ${k(()=>Object.keys(X),i=>i,i=>o`
            <label>
              <span>${()=>i}</span>
              <input-value look="segments" value=${()=>r.value[i]??""} onchange=${g(s=>h(i,s))}>
                ${k(()=>X[i],s=>s,s=>o`<input-option value=${()=>s}>${()=>s}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${v(()=>!Z,()=>o`
          <section>
            <h3>install</h3>
            ${v(()=>u.value,()=>o`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${g(a)} />`,()=>o`
                ${v(()=>re,()=>o`<p.hint>Share, then "Add to Home Screen".</p>`,()=>o`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}n(Oe,"$$SettingsRatHtml");function qe(e,l){return Te.call({props:e},e,l)}n(qe,"AppRatHtml");function Te(e,l){const r=e.app,f=r.config,u=r.folders;r.hold(u.load()),se(f.name);let h=O(""),a=M("open",null),i=O(null),s=M("textSize",16);const m=b(()=>a.value&&u.trees.value[a.value.sourceId]?u.nodeAt(a.value.sourceId,a.value.path):null),A=b(()=>u.sources.value),w=b(()=>m.value?m.value.path:""),N=n(d=>d.name.replace(/\.[^.]+$/,""),"titleOf"),C=n(()=>{const d=r.area("menu");d?.isOverlay&&d.hide()},"closeMenu");function L(d,y){a.value={path:y,sourceId:d},r.router.go("/note"),C()}n(L,"openNote");function q(d){H("Folder removed"),a.value?.sourceId===d&&(a.value=null,r.router.go("/"))}n(q,"forget");async function E(){try{await u.add()&&H.success("Folder added")}catch(d){H.error(d.message)}}n(E,"addFolder");const F=[{icon:"folder",label:"folders",onclick:n(()=>r.toggle("menu"),"onclick")},{icon:"notes",label:"note",to:"/note"},{icon:"settings",label:"settings",onclick:n(()=>r.toggle("config"),"onclick")}];return ae(()=>{const d=m.value;if(i.value=null,!d)return;let y=!0;return u.read(d).then(R=>{y&&(i.value=R)},R=>{y&&(i.value=`could not read that note: ${R.message}`)}),()=>{y=!1}}),o`
    <rat-area name="menu" dock="start" open>
      <div.menu>
        <${pe} ...${{get name(){return f.name}}} icon="./app.svg" />
        <input type="search" placeholder="filter notes ..." ref=${le(h,"value")} />
        <${we} ...${{get lib(){return u},get filter(){return h.value},get selected(){return a.value},onopen:L,onremove:q,get labelOf(){return N}}} fileIcon="notes" expandedKey="notes:expanded" emptyText="No markdown files here" />
        <div.side-foot><btn-push icon="folder-add" label="Open a folder" onclick=${g(E)} /></div>
      </div>
    </rat-area>
    <rat-view route="/" name="start">
      <${W} />
      ${v(()=>A.value.length,()=>o`<${B} icon="notes" title="No note open" hint="Choose a note to start reading." />`,()=>o`<${B} icon="notes" title="No note open" hint="Open a folder of Markdown files to get started."><btn-push icon="folder-add" label="Open a folder" onclick=${g(E)} /></${B}>`)}
    </rat-view>
    <rat-view route="/note" name="note" transition="slide">
      <${W} ...${{get path(){return w.value}}} />
      ${v(()=>i.value===null,()=>o`<${G} />`,()=>o`
          <output-md id="notes-reader" format="markdown" raw=${()=>i.value} style=${()=>"font-size: "+s.value+"px"} />
          <nav-toc target="#notes-reader" selector="h1, h2, h3" />
        `)}
    </rat-view>
    <rat-area name="dock" dock="bottom" overlay="never" open><${$e} ...${{get items(){return F}}} /></rat-area>
    <rat-area name="config" dock="end">
      <${V} ...${{get name(){return f.name}}}>
        <section>
          <h3>reading</h3>
          <label>
            <span>text size</span>
            <input-number look="slider" min="12" max="24" step="1" value=${()=>s.value} onchange=${g(d=>s.value=Number(d.detail?.value??d.target.value))} />
          </label>
        </section>
      </${V}>
    </rat-area>
  `}n(Te,"$$AppRatHtml");export{qe as default};
