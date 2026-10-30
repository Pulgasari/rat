var ee=Object.defineProperty;var n=(e,a)=>ee(e,"name",{value:a,configurable:!0});import{V as D,W as P,X as te,Y as ne,i as o,Z as A,w as v,a0 as b,g as k,a1 as ae,a2 as O,a3 as R,a4 as M,a5 as le,a6 as oe}from"./index-HXuysn7e.js";import{p as ie,a as re}from"./keys-CWTtq0D5.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function m(e,{keys:a=null,prevent:r=!1,times:d=0}={}){const p=a?ie(a):null;let g=d;return function(l){if(!(d&&!g)&&!(p&&!re(l,p))){r&&l.preventDefault(),d&&g--;try{const i=(typeof e=="string"?D(e):e).call(this,l);typeof i?.catch=="function"&&i.catch(s=>P(this,s,"handler"))}catch(i){P(this,i,"handler")}}}}n(m,"listener");const I=n(e=>(a,r)=>te.notify(a,{...r,type:e}),"notify"),H=Object.assign(I("info"),{error:I("error"),info:I("info"),success:I("success")});let z=null;const S=ne(!1),Z=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,ce=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Z;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),z=e,S.value=!0});addEventListener("appinstalled",()=>{z=null,S.value=!1});async function se(){if(!z)return!1;const e=z;return z=null,S.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}n(se,"install");function de(e){const a=n(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),H(`${e} can be installed: see the settings`))},"show");S.value?a():addEventListener("beforeinstallprompt",a,{once:!0})}n(de,"hint");function W(e,a){return ue.call({props:e},e,a)}n(W,"HeaderRatHtml");function ue(e,a){return o`
    <header>
      <btn-icon icon="menu" title="notes" onclick=${D("rat:toggle[menu]")} />
      <nav-crumbs path=${()=>e.path??""} />
      <btn-icon icon="settings" title="settings" onclick=${D("rat:toggle[config]")} />
    </header>
  `}n(ue,"$$HeaderRatHtml");const pe=`@scope (:has(> [data-rat="1npwj96"])) to (:scope > :not([data-rat="1npwj96"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function fe(e,a){return $e.call({props:e},e,a)}n(fe,"BrandRatHtml");function $e(e,a){return A("1npwj96",pe),o`
    <div.brand data-rat="1npwj96">
      ${v(()=>e.icon,()=>o`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}n($e,"$$BrandRatHtml");function ve(e,a){return me.call({props:e},e,a)}n(ve,"DockRatHtml");function me(e,a){const r=b(()=>RAT.app?.router.$path.value??"/"),d=n((l,i)=>l==="/"?i==="/":i===l||i.startsWith(`${l}/`),"owns"),p=n(l=>l.to!=null&&[l.to,...l.match??[]].some(i=>d(i,r.value)),"isActive"),g=n(l=>l.onclick?l.onclick():RAT.app.router.go(l.to),"run");return o`
    <nav.dock>
      ${k(()=>e.items??[],l=>l,l=>o`<btn-tap class=${()=>p(l)?"col active":"col"} aria-current=${()=>ae(p(l)?"page":null)} icon=${()=>l.icon} label=${()=>l.label} onclick=${m(()=>g(l))} />`)}
    </nav>
  `}n(me,"$$DockRatHtml");const ge=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
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
}`;function B(e,a){return he.call({props:e},e,a)}n(B,"EmptyRatHtml");function he(e,a){return A("ihnpco",ge),o`
    <div.empty data-rat="ihnpco">
      ${v(()=>e.icon,()=>o`<svg-icon icon=${()=>e.icon} />`)}
      ${v(()=>e.title,()=>o`<p.title>${()=>e.title}</p>`)}
      ${v(()=>e.hint,()=>o`<p.hint>${()=>e.hint}</p>`)}
      ${a}
    </div>
  `}n(he,"$$EmptyRatHtml");const be=`@scope (:has(> [data-rat="1tn1js8"])) to (:scope > :not([data-rat="1tn1js8"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function G(e,a){return ye.call({props:e},e,a)}n(G,"LoadingRatHtml");function ye(e,a){return A("1tn1js8",be),o`
    <div.loading data-rat="1tn1js8">
      <svg-icon icon="loading" />
      ${v(()=>e.text,()=>o`<span>${()=>e.text}</span>`)}
    </div>
  `}n(ye,"$$LoadingRatHtml");const we=`@scope (:has(> [data-rat="1oqcgw9"])) to (:scope > :not([data-rat="1oqcgw9"])) {
  .tree  { display: grid; gap: 0.75rem; }
  .head  { align-items: center; display: flex; gap: 0.25rem; }
  .name  { flex: 1 1 auto; font-weight: 600; min-inline-size: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .reconnect { display: grid; gap: 0.5rem; }
  .empty, .hint { opacity: 0.7; }
}`;function ke(e,a){return xe.call({props:e},e,a)}n(ke,"FolderTreeRatHtml");function xe(e,a){A("1oqcgw9",we);const r=e.lib,d=e.expandedKey??"foldertree:expanded",p=e.labelOf??(t=>t.name);let l=O(n(()=>{try{return JSON.parse(localStorage.getItem(d))??[]}catch{return[]}},"read")());const i=b(()=>r.sources.value),s=b(()=>r.perms.value),h=b(()=>r.trees.value),j=b(()=>r.scanning.value),w=b(()=>String(e.filter??"").trim().toLowerCase()),N=n((t,c,$)=>`${t}:${c}:${$}`,"valueOf");function C(t=""){const c=t.slice(2),$=c.indexOf(":");return{kind:t[0],path:c.slice($+1),sourceId:c.slice(0,$)}}n(C,"parse");function L(t,c){if(t.kind==="file")return t.path.toLowerCase().includes(c)?t:null;const $=(t.children??[]).map(f=>L(f,c)).filter(Boolean);return $.length?{...t,children:$}:null}n(L,"filtered");const q=n(t=>w.value&&h.value[t]?L(h.value[t],w.value):h.value[t],"shown"),E=n((t,c)=>l.value.includes(`${t}:${c}`),"isOpen"),F=n((t,c)=>e.selected?.sourceId===t&&e.selected?.path===c,"isSelected");function u(t){const{kind:c,path:$,sourceId:f}=C(t.detail?.value);c==="f"&&e.onopen?.(f,$)}n(u,"select");function y(t){const{kind:c,path:$,sourceId:f}=C(t.detail?.value);if(c!=="d")return;const J=`${f}:${$}`,K=l.value.filter(_=>_!==J);l.value=t.detail.expanded?[...K,J]:K,localStorage.setItem(d,JSON.stringify(l.value))}n(y,"toggle");async function x(t){confirm(`Close “${t.name}”? Your files are untouched, this only forgets the folder.`)&&(e.onremove?.(t.id),await r.remove(t.id))}n(x,"remove");async function U(t){const c=await r.reconnect(t.id);c.granted||console.warn("[foldertree] reconnect failed",{source:t,...c})}n(U,"reconnect");function Y(t,c,$){return o`
      ${k(()=>t.children??[],f=>f,f=>o`
          ${v(()=>f.kind==="file",()=>o`<data-node data-rat="1oqcgw9" label=${()=>p(f)} value=${()=>N("f",c,f.path)} icon=${()=>e.fileIcon} selected=${()=>F(c,f.path)} />`,()=>o`<data-node data-rat="1oqcgw9" label=${()=>f.name} value=${()=>N("d",c,f.path)} expanded=${()=>$||E(c,f.path)}>${()=>Y(f,c,$)}</data-node>`)}
        `)}
    `}return n(Y,"branch"),o`
    <div.tree data-rat="1oqcgw9">
      ${k(()=>i.value,t=>t,t=>o`
          <div.source>
            <div.head>
              <svg-icon icon="folder" />
              <span.name title=${()=>t.name}>${()=>t.name}</span>
              <btn-icon icon="refresh" label="refresh" disabled=${()=>j.value[t.id]||s.value[t.id]!=="granted"} onclick=${m(()=>r.scan(t.id).catch(()=>{}))} />
              <btn-icon icon="close" label="close" onclick=${m(()=>x(t))} />
            </div>
            ${v(()=>s.value[t.id]!=="granted",()=>o`
                <div.reconnect>
                  <span>${()=>s.value[t.id]==="denied"?"Permission was blocked.":"This folder needs permission again."}</span>
                  <btn-push icon="folder-key" label="Reconnect" onclick=${m(()=>U(t))} />
                  <btn-push icon="folder-search" label="Choose folder" onclick=${m(()=>r.repick(t.id))} />
                </div>
              `,()=>o`
                ${v(()=>j.value[t.id]&&!h.value[t.id],()=>o`<${G} text="scanning …" />`,()=>o`
                    ${v(()=>q(t.id)?.children?.length,()=>o`<data-tree ondata-tree-select=${m(u)} ondata-tree-toggle=${m(y)}>${()=>Y(q(t.id),t.id,!!w.value)}</data-tree>`,()=>o`<p.empty>${()=>w.value?e.noMatchText??"No matches":e.emptyText??"This folder is empty"}</p>`)}
                  `)}
              `)}
          </div>
        `,()=>o`<p.hint>${()=>e.noSourcesText??"No folders open yet."}</p>`)}
    </div>
  `}n(xe,"$$FolderTreeRatHtml");const T=M("appearance",{}),X={density:R.densities,geometry:R.geometries,mode:R.modes},Re=n(()=>T.value,"appearance"),He=n(()=>R.palettes().catch(()=>[]),"palettes");function Q(e){const a=document.querySelector("rat-app");for(const[r,d]of Object.entries(e))d?a?.setAttribute(r,d):a?.removeAttribute(r);return R.set(e)}n(Q,"apply");function ze(e,a){return T.value={...T.value,[e]:a||null},Q({[e]:a||null})}n(ze,"setAppearance");Object.keys(T.value).length&&Q(T.value);const Oe=`@scope (:has(> [data-rat="177zzh1"])) to (:scope > :not([data-rat="177zzh1"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function V(e,a){return Te.call({props:e},e,a)}n(V,"SettingsRatHtml");function Te(e,a){A("177zzh1",Oe);let r=O({...Re()}),d=O([]);const p=b(()=>S.value);He().then(i=>{d.value=i});function g(i,s){const h=s.detail?.value??s.target.value;r.value={...r.value,[i]:h},ze(i,h)}n(g,"change");async function l(){await se()&&H.success(`${e.name??"the app"} is installed`)}return n(l,"installApp"),o`
    <div.settings data-rat="177zzh1">
      ${a}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>r.value.palette??"zombie"} onchange=${m(i=>g("palette",i))}>
            ${k(()=>d.value,i=>i,i=>o`<input-option value=${()=>i}>${()=>i}</input-option>`)}
          </input-value>
        </label>
        ${k(()=>Object.keys(X),i=>i,i=>o`
            <label>
              <span>${()=>i}</span>
              <input-value look="segments" value=${()=>r.value[i]??""} onchange=${m(s=>g(i,s))}>
                ${k(()=>X[i],s=>s,s=>o`<input-option value=${()=>s}>${()=>s}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${v(()=>!Z,()=>o`
          <section>
            <h3>install</h3>
            ${v(()=>p.value,()=>o`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${m(l)} />`,()=>o`
                ${v(()=>ce,()=>o`<p.hint>Share, then "Add to Home Screen".</p>`,()=>o`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}n(Te,"$$SettingsRatHtml");function Ee(e,a){return Ae.call({props:e},e,a)}n(Ee,"AppRatHtml");function Ae(e,a){const r=e.app,d=r.config,p=r.folders;r.hold(p.load()),de(d.name);let g=O(""),l=M("open",null),i=O(null),s=M("textSize",16);const h=b(()=>l.value&&p.trees.value[l.value.sourceId]?p.nodeAt(l.value.sourceId,l.value.path):null),j=b(()=>p.sources.value),w=b(()=>h.value?h.value.path:""),N=n(u=>u.name.replace(/\.[^.]+$/,""),"titleOf"),C=n(()=>{const u=r.area("menu");u?.isOverlay&&u.hide()},"closeMenu");function L(u,y){l.value={path:y,sourceId:u},r.router.go("/note"),C()}n(L,"openNote");function q(u){H("Folder removed"),l.value?.sourceId===u&&(l.value=null,r.router.go("/"))}n(q,"forget");async function E(){try{await p.add()&&H.success("Folder added")}catch(u){H.error(u.message)}}n(E,"addFolder");const F=[{icon:"folder",label:"folders",onclick:n(()=>r.toggle("menu"),"onclick")},{icon:"notes",label:"note",to:"/note"},{icon:"settings",label:"settings",onclick:n(()=>r.toggle("config"),"onclick")}];return le(()=>{const u=h.value;if(i.value=null,!u)return;let y=!0;return p.read(u).then(x=>{y&&(i.value=x)},x=>{y&&(i.value=`could not read that note: ${x.message}`)}),()=>{y=!1}}),o`
    <rat-area name="menu" dock="start" open>
      <div.menu>
        <${fe} ...${{get name(){return d.name}}} icon="./app.svg" />
        <input type="search" placeholder="filter notes ..." ref=${oe(g,"value")} />
        <${ke} ...${{get lib(){return p},get filter(){return g.value},get selected(){return l.value},onopen:L,onremove:q,get labelOf(){return N}}} fileIcon="notes" expandedKey="notes:expanded" emptyText="No markdown files here" />
        <div.side-foot><btn-push icon="folder-add" label="Open a folder" onclick=${m(E)} /></div>
      </div>
    </rat-area>
    <rat-view route="/" name="start">
      <${W} />
      ${v(()=>j.value.length,()=>o`<${B} icon="notes" title="No note open" hint="Choose a note to start reading." />`,()=>o`<${B} icon="notes" title="No note open" hint="Open a folder of Markdown files to get started."><btn-push icon="folder-add" label="Open a folder" onclick=${m(E)} /></${B}>`)}
    </rat-view>
    <rat-view route="/note" name="note" transition="slide">
      <${W} ...${{get path(){return w.value}}} />
      ${v(()=>i.value===null,()=>o`<${G} />`,()=>o`
          <output-md id="notes-reader" format="markdown" raw=${()=>i.value} style=${()=>"font-size: "+s.value+"px"} />
          <nav-toc target="#notes-reader" selector="h1, h2, h3" />
        `)}
    </rat-view>
    <rat-area name="dock" dock="bottom" overlay="never" open><${ve} ...${{get items(){return F}}} /></rat-area>
    <rat-area name="config" dock="end">
      <${V} ...${{get name(){return d.name}}}>
        <section>
          <h3>reading</h3>
          <label>
            <span>text size</span>
            <input-number look="slider" min="12" max="24" step="1" value=${()=>s.value} onchange=${m(u=>s.value=Number(u.detail?.value??u.target.value))} />
          </label>
        </section>
      </${V}>
    </rat-area>
  `}n(Ae,"$$AppRatHtml");export{Ee as default};
