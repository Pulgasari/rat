var ne=Object.defineProperty;var n=(e,a)=>ne(e,"name",{value:a,configurable:!0});import{G as K,H as U,P as ae,J as le,i as l,K as N,w as m,L as b,g as S,M as x,O,Q as W,T as oe}from"./index-DHji-osE.js";import{p as ie,a as re}from"./keys-CWTtq0D5.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function v(e,{keys:a=null,prevent:r=!1,times:p=0}={}){const u=a?ie(a):null;let h=p;return function(i){if(!(p&&!h)&&!(u&&!re(i,u))){r&&i.preventDefault(),p&&h--;try{const o=(typeof e=="string"?K(e):e).call(this,i);typeof o?.catch=="function"&&o.catch(s=>U(this,s))}catch(o){U(this,o)}}}}n(v,"listener");function P(e,a=null){try{return JSON.parse(localStorage.getItem(e))??a}catch{return a}}n(P,"read");function Y(e,a){a==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(a))}n(Y,"write");const J=n(e=>(a,r)=>ae.notify(a,{...r,type:e}),"notify"),R=Object.assign(J("info"),{error:J("error"),info:J("info"),success:J("success")});let T=null;const I=le(!1),Z=globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone===!0,ce=/iphone|ipad|ipod/i.test(globalThis.navigator?.userAgent??"")&&!Z;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),T=e,I.value=!0});addEventListener("appinstalled",()=>{T=null,I.value=!1});async function se(){if(!T)return!1;const e=T;return T=null,I.value=!1,e.prompt(),(await e.userChoice).outcome==="accepted"}n(se,"install");function de(e){const a=`${e}:install-hint`,r=n(()=>{P(a)||(Y(a,!0),R(`${e} can be installed: see the settings`))},"show");I.value?r():addEventListener("beforeinstallprompt",r,{once:!0})}n(de,"hint");function X(e,a){return ue.call({props:e},e,a)}n(X,"HeaderRatHtml");function ue(e,a){return l`
    <header>
      <btn-icon icon="menu" title="notes" onclick=${K("rat:toggle[menu]")} />
      <nav-crumbs path=${()=>e.path??""} />
      <btn-icon icon="settings" title="settings" onclick=${K("rat:toggle[config]")} />
    </header>
  `}n(ue,"$$HeaderRatHtml");const fe=`@scope (:has(> [data-rat="13l1x85"])) to (:scope > :not([data-rat="13l1x85"])) {
  .brand { align-items: center; display: flex; font-weight: 600; gap: 0.5rem; }
}`;function pe(e,a){return $e.call({props:e},e,a)}n(pe,"BrandRatHtml");function $e(e,a){return N("13l1x85",fe),l`
    <div.brand data-rat="13l1x85">
      ${m(()=>e.icon,()=>l`<svg-icon icon=${()=>e.icon} mode="image" />`)}
      <span>${()=>e.name}</span>
    </div>
  `}n($e,"$$BrandRatHtml");function me(e,a){return ge.call({props:e},e,a)}n(me,"DockRatHtml");function ge(e,a){const r=b(()=>RAT.app?.router.$path.value??"/"),p=n((i,o)=>i==="/"?o==="/":o===i||o.startsWith(`${i}/`),"owns"),u=n(i=>i.to!=null&&[i.to,...i.match??[]].some(o=>p(o,r.value)),"isActive"),h=n(i=>i.onclick?i.onclick():RAT.app.router.go(i.to),"run");return l`
    <nav.dock>
      ${S(()=>e.items??[],i=>i,i=>l`<btn-tap class=${()=>u(i)?"col active":"col"} aria-current=${()=>u(i)?"page":null} icon=${()=>i.icon} label=${()=>i.label} onclick=${v(()=>h(i))} />`)}
    </nav>
  `}n(ge,"$$DockRatHtml");const ve=`@scope (:has(> [data-rat="1p9kgzb"])) to (:scope > :not([data-rat="1p9kgzb"])) {
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
}`;function D(e,a){return he.call({props:e},e,a)}n(D,"EmptyRatHtml");function he(e,a){return N("1p9kgzb",ve),l`
    <div.empty data-rat="1p9kgzb">
      ${m(()=>e.icon,()=>l`<svg-icon icon=${()=>e.icon} />`)}
      ${m(()=>e.title,()=>l`<p.title>${()=>e.title}</p>`)}
      ${m(()=>e.hint,()=>l`<p.hint>${()=>e.hint}</p>`)}
      ${a}
    </div>
  `}n(he,"$$EmptyRatHtml");const be=`@scope (:has(> [data-rat="1pncrfr"])) to (:scope > :not([data-rat="1pncrfr"])) {
  .loading { align-items: center; display: flex; gap: 0.5rem; justify-content: center; padding: 1rem; }
}`;function _(e,a){return ye.call({props:e},e,a)}n(_,"LoadingRatHtml");function ye(e,a){return N("1pncrfr",be),l`
    <div.loading data-rat="1pncrfr">
      <svg-icon icon="loading" />
      ${m(()=>e.text,()=>l`<span>${()=>e.text}</span>`)}
    </div>
  `}n(ye,"$$LoadingRatHtml");const ke=`@scope (:has(> [data-rat="19nr22u"])) to (:scope > :not([data-rat="19nr22u"])) {
  .tree  { display: grid; gap: 0.75rem; }
  .head  { align-items: center; display: flex; gap: 0.25rem; }
  .name  { flex: 1 1 auto; font-weight: 600; min-inline-size: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .reconnect { display: grid; gap: 0.5rem; }
  .empty, .hint { opacity: 0.7; }
}`;function we(e,a){return xe.call({props:e},e,a)}n(we,"FolderTreeRatHtml");function xe(e,a){N("19nr22u",ke);const r=e.lib,p=e.expandedKey??"foldertree:expanded",u=e.labelOf??(t=>t.name);let i=x(n(()=>{try{return JSON.parse(localStorage.getItem(p))??[]}catch{return[]}},"read")());const o=b(()=>r.sources.value),s=b(()=>r.perms.value),g=b(()=>r.trees.value),w=b(()=>r.scanning.value),y=b(()=>String(e.filter??"").trim().toLowerCase()),A=n((t,c,$)=>`${t}:${c}:${$}`,"valueOf");function L(t=""){const c=t.slice(2),$=c.indexOf(":");return{kind:t[0],path:c.slice($+1),sourceId:c.slice(0,$)}}n(L,"parse");function C(t,c){if(t.kind==="file")return t.path.toLowerCase().includes(c)?t:null;const $=(t.children??[]).map(f=>C(f,c)).filter(Boolean);return $.length?{...t,children:$}:null}n(C,"filtered");const H=n(t=>y.value&&g.value[t]?C(g.value[t],y.value):g.value[t],"shown"),j=n((t,c)=>i.value.includes(`${t}:${c}`),"isOpen"),F=n((t,c)=>e.selected?.sourceId===t&&e.selected?.path===c,"isSelected");function M(t){const{kind:c,path:$,sourceId:f}=L(t.detail?.value);c==="f"&&e.onopen?.(f,$)}n(M,"select");function E(t){const{kind:c,path:$,sourceId:f}=L(t.detail?.value);if(c!=="d")return;const G=`${f}:${$}`,Q=i.value.filter(te=>te!==G);i.value=t.detail.expanded?[...Q,G]:Q,localStorage.setItem(p,JSON.stringify(i.value))}n(E,"toggle");async function B(t){confirm(`Close “${t.name}”? Your files are untouched, this only forgets the folder.`)&&(e.onremove?.(t.id),await r.remove(t.id))}n(B,"remove");async function d(t){const c=await r.reconnect(t.id);c.granted||console.warn("[foldertree] reconnect failed",{source:t,...c})}n(d,"reconnect");function k(t,c,$){return l`
      ${S(()=>t.children??[],f=>f,f=>l`
          ${m(()=>f.kind==="file",()=>l`<data-node data-rat="19nr22u" label=${()=>u(f)} value=${()=>A("f",c,f.path)} icon=${()=>e.fileIcon} selected=${()=>F(c,f.path)} />`,()=>l`<data-node data-rat="19nr22u" label=${()=>f.name} value=${()=>A("d",c,f.path)} expanded=${()=>$||j(c,f.path)}>${()=>k(f,c,$)}</data-node>`)}
        `)}
    `}return n(k,"branch"),l`
    <div.tree data-rat="19nr22u">
      ${S(()=>o.value,t=>t,t=>l`
          <div.source>
            <div.head>
              <svg-icon icon="folder" />
              <span.name title=${()=>t.name}>${()=>t.name}</span>
              <btn-icon icon="refresh" label="refresh" disabled=${()=>w.value[t.id]||s.value[t.id]!=="granted"} onclick=${v(()=>r.scan(t.id).catch(()=>{}))} />
              <btn-icon icon="close" label="close" onclick=${v(()=>B(t))} />
            </div>
            ${m(()=>s.value[t.id]!=="granted",()=>l`
                <div.reconnect>
                  <span>${()=>s.value[t.id]==="denied"?"Permission was blocked.":"This folder needs permission again."}</span>
                  <btn-push icon="folder-key" label="Reconnect" onclick=${v(()=>d(t))} />
                  <btn-push icon="folder-search" label="Choose folder" onclick=${v(()=>r.repick(t.id))} />
                </div>
              `,()=>l`
                ${m(()=>w.value[t.id]&&!g.value[t.id],()=>l`<${_} text="scanning …" />`,()=>l`
                    ${m(()=>H(t.id)?.children?.length,()=>l`<data-tree ondata-tree-select=${v(M)} ondata-tree-toggle=${v(E)}>${()=>k(H(t.id),t.id,!!y.value)}</data-tree>`,()=>l`<p.empty>${()=>y.value?e.noMatchText??"No matches":e.emptyText??"This folder is empty"}</p>`)}
                  `)}
              `)}
          </div>
        `,()=>l`<p.hint>${()=>e.noSourcesText??"No folders open yet."}</p>`)}
    </div>
  `}n(xe,"$$FolderTreeRatHtml");const ee=`appearance:${new URL(".",location.href).pathname}`,q={density:O.densities,geometry:O.geometries,mode:O.modes},z=P(ee,{}),Se=n(()=>O.palettes().catch(()=>[]),"palettes");function Oe(e,a){return z[e]=a||null,Y(ee,z),O.set({[e]:a||null})}n(Oe,"setAppearance");Object.keys(z).length&&O.set(z);const He=`@scope (:has(> [data-rat="1y2oflm"])) to (:scope > :not([data-rat="1y2oflm"])) {
  .settings {
    display        : flex;
    flex-direction : column;
    gap            : 1.5rem;
  }
  
  section { display: grid; gap: 0.75rem; }
  h3      { font-size: 0.8rem; letter-spacing: 0.05em; margin: 0; opacity: 0.7; text-transform: uppercase; }
  label   { display: grid; gap: 0.25rem; }
  .hint   { margin: 0; opacity: 0.7; }
}`;function V(e,a){return Re.call({props:e},e,a)}n(V,"SettingsRatHtml");function Re(e,a){N("1y2oflm",He);let r=x({...z}),p=x([]);const u=b(()=>I.value);Se().then(o=>{p.value=o});function h(o,s){const g=s.detail?.value??s.target.value;r.value={...r.value,[o]:g},Oe(o,g)}n(h,"change");async function i(){await se()&&R.success(`${e.name??"the app"} is installed`)}return n(i,"installApp"),l`
    <div.settings data-rat="1y2oflm">
      ${a}
      <section>
        <h3>appearance</h3>
        <label>
          <span>palette</span>
          <input-value look="combobox" value=${()=>r.value.palette??"zombie"} onchange=${v(o=>h("palette",o))}>
            ${S(()=>p.value,o=>o,o=>l`<input-option value=${()=>o}>${()=>o}</input-option>`)}
          </input-value>
        </label>
        ${S(()=>Object.keys(q),o=>o,o=>l`
            <label>
              <span>${()=>o}</span>
              <input-value look="segments" value=${()=>r.value[o]??""} onchange=${v(s=>h(o,s))}>
                ${S(()=>q[o],s=>s,s=>l`<input-option value=${()=>s}>${()=>s}</input-option>`)}
              </input-value>
            </label>
          `)}
      </section>
      ${m(()=>!Z,()=>l`
          <section>
            <h3>install</h3>
            ${m(()=>u.value,()=>l`<btn-push icon="download" label=${()=>"install "+(e.name??"the app")} onclick=${v(i)} />`,()=>l`
                ${m(()=>ce,()=>l`<p.hint>Share, then "Add to Home Screen".</p>`,()=>l`<p.hint>Your browser does not offer installing right now.</p>`)}
              `)}
          </section>
        `)}
    </div>
  `}n(Re,"$$SettingsRatHtml");function Ee(e,a){return Te.call({props:e},e,a)}n(Ee,"AppRatHtml");function Te(e,a){const r=e.app,p=r.config,u=r.folders;r.hold(u.load()),de(p.name);const h="notes:open",i=n(()=>{try{return JSON.parse(localStorage.getItem(h))}catch{return null}},"stored");let o=x(""),s=x(i()),g=x(null),w=x(P("notes:textSize",16));W(()=>Y("notes:textSize",w.value));const y=b(()=>s.value&&u.trees.value[s.value.sourceId]?u.nodeAt(s.value.sourceId,s.value.path):null),A=b(()=>u.sources.value),L=b(()=>y.value?y.value.path:""),C=n(d=>d.name.replace(/\.[^.]+$/,""),"titleOf");function H(d){s.value=d,d?localStorage.setItem(h,JSON.stringify(d)):localStorage.removeItem(h)}n(H,"remember");const j=n(()=>{const d=r.area("menu");d?.isOverlay&&d.hide()},"closeMenu");function F(d,k){H({path:k,sourceId:d}),r.router.go("/note"),j()}n(F,"openNote");function M(d){R("Folder removed"),s.value?.sourceId===d&&(H(null),r.router.go("/"))}n(M,"forget");async function E(){try{await u.add()&&R.success("Folder added")}catch(d){R.error(d.message)}}n(E,"addFolder");const B=[{icon:"folder",label:"folders",onclick:n(()=>r.toggle("menu"),"onclick")},{icon:"notes",label:"note",to:"/note"},{icon:"settings",label:"settings",onclick:n(()=>r.toggle("config"),"onclick")}];return W(()=>{const d=y.value;if(g.value=null,!d)return;let k=!0;return u.read(d).then(t=>{k&&(g.value=t)},t=>{k&&(g.value=`could not read that note: ${t.message}`)}),()=>{k=!1}}),l`
    <rat-area name="menu" dock="start" open>
      <div.menu>
        <${pe} ...${{get name(){return p.name}}} icon="./app.svg" />
        <input type="search" placeholder="filter notes ..." ref=${oe(o,"value")} />
        <${we} ...${{get lib(){return u},get filter(){return o.value},get selected(){return s.value},onopen:F,onremove:M,get labelOf(){return C}}} fileIcon="notes" expandedKey="notes:expanded" emptyText="No markdown files here" />
        <div.side-foot><btn-push icon="folder-add" label="Open a folder" onclick=${v(E)} /></div>
      </div>
    </rat-area>
    <rat-view route="/" name="start">
      <${X} />
      ${m(()=>A.value.length,()=>l`<${D} icon="notes" title="No note open" hint="Choose a note to start reading." />`,()=>l`<${D} icon="notes" title="No note open" hint="Open a folder of Markdown files to get started."><btn-push icon="folder-add" label="Open a folder" onclick=${v(E)} /></${D}>`)}
    </rat-view>
    <rat-view route="/note" name="note" transition="slide">
      <${X} ...${{get path(){return L.value}}} />
      ${m(()=>g.value===null,()=>l`<${_} />`,()=>l`
          <output-md id="notes-reader" format="markdown" raw=${()=>g.value} style=${()=>"font-size: "+w.value+"px"} />
          <nav-toc target="#notes-reader" selector="h1, h2, h3" />
        `)}
    </rat-view>
    <rat-area name="dock" dock="bottom" overlay="never" open><${me} ...${{get items(){return B}}} /></rat-area>
    <rat-area name="config" dock="end">
      <${V} ...${{get name(){return p.name}}}>
        <section>
          <h3>reading</h3>
          <label>
            <span>text size</span>
            <input-number look="slider" min="12" max="24" step="1" value=${()=>w.value} onchange=${v(d=>w.value=Number(d.detail?.value??d.target.value))} />
          </label>
        </section>
      </${V}>
    </rat-area>
  `}n(Te,"$$AppRatHtml");export{Ee as default};
