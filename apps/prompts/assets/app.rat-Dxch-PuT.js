var q=Object.defineProperty;var a=(e,t)=>q(e,"name",{value:t,configurable:!0});import{P,Q,T as B,V as m,W as V,X as k,Y as W,q as X,Z as Y,w as $,h as c,a0 as Z,a1 as F,f as p,a2 as w}from"./index-DKI93uGD.js";import{p as G,a as J}from"./keys-CWTtq0D5.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/logger";function f(e){let t=!1,l;const i=a(()=>(t||(l=e(),t=!0),l),"source");return{get value(){const o=i();return P(o)?o.value:o},set value(o){const s=i();if(!P(s))throw new TypeError("[rat] an imported reactive variant changes through its methods, it is not reassigned");s.value=o}}}a(f,"imported");function d(e,{keys:t=null,prevent:l=!1,times:i=0}={}){const o=t?G(t):null;let s=i;return function(v){if(!(i&&!s)&&!(o&&!J(v,o))){l&&v.preventDefault(),i&&s--;try{const r=(typeof e=="string"?Q(e):e).call(this,v);typeof r?.catch=="function"&&r.catch(n=>B(this,n,"handler"))}catch(r){B(this,r,"handler")}}}}a(d,"listener");const{database:h,dialogs:K}=RAT.app,x=h.prompts.$items,D=h.tags.$items;let N=m(""),R=m(null),S=V("sortBy","title"),b=m(null),g=m(!1);const _=[["title","Name"],["updatedAt","Updated"],["createdAt","Created"]],y=k(()=>x.find(e=>e.id===b.value)??null),ee=k(()=>x.filter(e=>!R.value||e.tags?.includes(R.value)).filter(e=>`${e.title} ${e.content}`.toLowerCase().includes(N.value.trim().toLowerCase())).toSorted((e,t)=>S.value==="title"?e.title.localeCompare(t.title):(t[S.value]??0)-(e[S.value]??0))),te=a(e=>D.find(t=>t.id===e)??null,"tagOf"),L=a(()=>RAT.app.area("menu"),"menu"),O=a(()=>{L()?.isOverlay&&L().hide()},"picked"),H=a(()=>L()?.show(),"showList");function ae(){b.value=null,g.value=!0,O()}a(ae,"create");function le(e){b.value=e,g.value=!1,O()}a(le,"open");function ne(){g.value=!0}a(ne,"edit");function U(){g.value=!1,y.value||H()}a(U,"cancel");const ie=a(()=>g.value?U():H(),"back");async function ce({content:e,tags:t,title:l}){const i=Date.now(),o=await h.prompts.put({content:e,createdAt:y.value?.createdAt??i,tags:[...t],title:l.trim(),updatedAt:i,...y.value?{id:y.value.id}:{}});b.value=o.id,g.value=!1}a(ce,"save");async function M(e){await K.confirm({message:`Delete “${e.title||"Untitled"}”?`,ok:"Delete",title:"Delete"})&&(await h.prompts.delete(e.id),b.value===e.id&&(b.value=null,g.value=!1))}a(M,"remove");const oe=a((e,t)=>h.tags.add({color:t,name:e.trim()}),"addTag");async function re(e){await h.tags.delete(e);for(const t of x.filter(l=>l.tags?.includes(e)).toArray())await h.prompts.put({...t,tags:t.tags.filter(l=>l!==e)});R.value===e&&(R.value=null)}a(re,"removeTag");RAT.app.commands.set("back",ie);const A=a(e=>(t,l)=>W.notify(t,{...l,type:e}),"notify"),j=Object.assign(A("info"),{error:A("error"),info:A("info"),success:A("success")}),C=X(!1);globalThis.matchMedia?.("(display-mode: standalone)").matches||globalThis.navigator?.standalone;addEventListener("beforeinstallprompt",e=>{e.preventDefault(),C.value=!0});addEventListener("appinstalled",()=>{C.value=!1});function se(e){const t=a(()=>{RAT.app.store.peek("install-hint")||(RAT.app.store.set("install-hint",!0),j(`${e} can be installed: see the settings`))},"show");C.value?t():addEventListener("beforeinstallprompt",t,{once:!0})}a(se,"hint");const ue=`@scope (:has(> [data-rat="ihnpco"])) to (:scope > :not([data-rat="ihnpco"])) {
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
}`;function de(e,t){return ve.call({props:e},e,t)}a(de,"EmptyRatHtml");function ve(e,t){return Y("ihnpco",ue),c`
    <div.empty data-rat="ihnpco">
      ${$(()=>e.icon,()=>c`<svg-icon icon=${()=>e.icon} />`)}
      ${$(()=>e.title,()=>c`<p.title>${()=>e.title}</p>`)}
      ${$(()=>e.hint,()=>c`<p.hint>${()=>e.hint}</p>`)}
      ${t}
    </div>
  `}a(ve,"$$EmptyRatHtml");function z(e,t){return $e.call({props:e},e,t)}a(z,"TagBadgeRatHtml");function $e(e,t){const l=k(()=>te(e.id));return c`
    ${$(()=>l.value,()=>c`
        <span.tag-badge style=${()=>({"--tag-color":l.value.color})}>
          ${()=>l.value.name}
          ${$(()=>e.onremove,()=>c`<btn-icon icon="close" label="remove" onclick=${d(i=>{i.stopPropagation(),e.onremove(e.id)})} />`)}
        </span>
      `)}
  `}a($e,"$$TagBadgeRatHtml");function me(e,t){return ge.call({props:e},e,t)}a(me,"DetailRatHtml");function ge(e,t){const l=f(()=>y),i=f(()=>g);let o=m(""),s=m(!1),v=m([]),r=m("");Z(()=>{if(!i.value)return;const u=F(()=>l.value);r.value=u?.title??"",o.value=u?.content??"",v.value=[...u?.tags??[]]});async function n(u){await navigator.clipboard.writeText(u),s.value=!0,setTimeout(()=>s.value=!1,1500)}a(n,"copy");const T=a(u=>{v.value=v.value.includes(u)?v.value.filter(I=>I!==u):[...v.value,u]},"toggle"),E=a(u=>new Date(u).toLocaleString(),"stamp");return c`
    <div.detail>
      ${$(()=>i.value,()=>c`
          <header.detail-header>
            <input.edit-title-input type="text" placeholder="Prompt title …" ref=${w(r,"value")} />
            <div.detail-header-actions><btn-icon.mobile-only icon="back" label="the list" onclick=${d(H)} /></div>
          </header>
          <main.detail-edit>
            <div.edit-tag-picker>
              ${p(()=>D,u=>u,u=>c`<button.tag-toggle class:active=${()=>v.value.includes(u.id)} style=${()=>({"--tag-color":u.color})} onclick=${d(()=>T(u.id))}><svg-icon icon=${()=>v.value.includes(u.id)?"check":"tag"} /> ${()=>u.name}</button>`,()=>c`<span.empty-hint>No tags: make some in the list</span>`)}
            </div>
            <textarea.edit-content placeholder="Prompt content …" ref=${w(o,"value")} />
            <div.edit-actions>
              <btn-push icon="save" label="Save" disabled=${()=>!o.value.trim()} onclick=${d(()=>ce({content:o.value,tags:v.value,title:r.value}))} />
              <btn-push label="Cancel" onclick=${d(U)} />
              ${$(()=>l.value,()=>c`<btn-push icon="delete" label="Delete" onclick=${d(()=>M(l.value))} />`)}
            </div>
          </main>
        `,()=>$(()=>l.value,()=>c`
            <header.detail-header>
              <h2.detail-title>${()=>l.value.title||"Untitled"}</h2>
              <div.detail-header-actions>
                <btn-icon icon=${()=>s.value?"check":"copy"} label="copy" onclick=${d(()=>n(l.value.content))} />
                <btn-icon icon="edit" label="edit" onclick=${d(ne)} />
                <btn-icon icon="delete" label="delete" onclick=${d(()=>M(l.value))} />
                <btn-icon.mobile-only icon="back" label="the list" onclick=${d(H)} />
              </div>
            </header>
            <main.detail-view>
              ${$(()=>l.value.tags?.length,()=>c`
                  <div.detail-tags>
                    ${p(()=>l.value.tags,u=>u,u=>c`<${z} ...${{get id(){return u}}} />`)}
                  </div>
                `)}
              <div.detail-meta>Created ${()=>E(l.value.createdAt)} · Updated ${()=>E(l.value.updatedAt)}</div>
              <pre.detail-content>${()=>l.value.content}</pre>
            </main>
          `,()=>c`<${de} icon="prompt" title="Select a prompt or make a new one" />`))}
    </div>
  `}a(ge,"$$DetailRatHtml");function fe(e,t){return pe.call({props:e},e,t)}a(fe,"PickerRatHtml");function pe(e,t){const l=a(n=>typeof n=="object"&&n!==null&&!Array.isArray(n),"isObject"),i=e.signal??(P(e.value)?e.value:null),o=a(n=>Array.isArray(n)?{label:String(n[1]??n[0]),title:String(n[1]??n[0]),value:n[0]}:l(n)?{icon:n.icon,label:n.label??(n.icon?"":String(n.value)),title:n.title??n.label??String(n.value),value:n.value}:{label:String(n),title:String(n),value:n},"normalize"),s=k(()=>i?i.value:e.value),v=k(()=>(e.options??i?.values??[]).map(o));function r(n){const T=n.detail?.value??n.target?.value;i&&(i.value=T),e.onchange?.(T)}return a(r,"change"),c`
    <input-value class=${()=>e.class} look=${()=>e.look} placeholder=${()=>e.placeholder} searchable=${()=>e.searchable||null} src=${()=>e.src} value=${()=>s.value} onchange=${d(r)}>
      ${p(()=>v.value,n=>n,n=>c`<input-option icon=${()=>n.icon} label=${()=>n.label} title=${()=>n.title} value=${()=>n.value} />`)}
    </input-value>
  `}a(pe,"$$PickerRatHtml");function he(e,t){return be.call({props:e},e,t)}a(he,"PromptItemRatHtml");function be(e,t){const l=f(()=>b),i=e.prompt;return c`
    <div.prompt-item class:active=${()=>l.value===i.id} onclick=${d(()=>le(i.id))}>
      <div.prompt-item-title>${()=>i.title||"Untitled"}</div>
      ${$(()=>i.tags?.length,()=>c`
          <div.prompt-item-tags>
            ${p(()=>i.tags,o=>o,o=>c`<${z} ...${{get id(){return o}}} />`)}
          </div>
        `)}
      <div.prompt-item-meta>${()=>new Date(i.updatedAt).toLocaleDateString()}</div>
    </div>
  `}a(be,"$$PromptItemRatHtml");function ye(e,t){return ke.call({props:e},e,t)}a(ye,"TagManagerRatHtml");function ke(e,t){let l=m(""),i=m("#457b9d");async function o(){l.value.trim()&&(await oe(l.value,i.value),l.value="")}return a(o,"add"),c`
    <div.TagManager>
      <header>
        <span>Manage tags</span>
        <btn-icon icon="close" label="close" onclick=${d(e.onclose)} />
      </header>
      <div.tag-manager-list>
        ${p(()=>D,s=>s,s=>c`
            <div.tag-manager-row>
              <span.tag-badge style=${()=>({"--tag-color":s.color})}>${()=>s.name}</span>
              <btn-icon icon="delete" label="delete" onclick=${d(()=>re(s.id))} />
            </div>
          `,()=>c`<span.empty-hint>No tags yet</span>`)}
      </div>
      <div.tag-manager-add>
        <input.field.tag-name-input type="text" placeholder="Tag name" ref=${w(l,"value")} onkeydown=${d(o,{keys:"enter"})} />
        <input.tag-color-input type="color" ref=${w(i,"value")} />
        <btn-push icon="add" label="add" disabled=${()=>!l.value.trim()} onclick=${d(o)} />
      </div>
    </div>
  `}a(ke,"$$TagManagerRatHtml");function we(e,t){return Re.call({props:e},e,t)}a(we,"SidebarRatHtml");function Re(e,t){const l=f(()=>N),i=f(()=>ee),o=f(()=>S),s=f(()=>R);let v=m(!1);return c`
    <div.sidebar>
      <div.sidebar-top><btn-push icon="add" label="New prompt" onclick=${d(ae)} /></div>
      <div.search-row>
        <svg-icon.search-icon icon="search" />
        <input.search-input type="text" placeholder="Search …" ref=${w(l,"value")} />
        ${$(()=>l.value,()=>c`<btn-icon icon="close" label="clear" onclick=${d(()=>l.value="")} />`)}
      </div>
      <div.tag-filter>
        <div.tag-filter-header>
          <span.section-label>Tags</span>
          <btn-icon icon="tags" label="manage tags" onclick=${d(()=>v.value=!v.value)} />
        </div>
        ${$(()=>v.value,()=>c`<${ye} ...${{onclose:a(()=>v.value=!1,"onclose")}} />`)}
        <div.tag-filter-list>
          <button.tag-filter-btn class:active=${()=>!s.value} onclick=${d(()=>s.value=null)}>All</button>
          ${p(()=>D,r=>r,r=>c`<button.tag-filter-btn class:active=${()=>s.value===r.id} style=${()=>({"--tag-color":r.color})} onclick=${d(()=>s.value=s.value===r.id?null:r.id)}>${()=>r.name}</button>`)}
        </div>
      </div>
      <div.sort-row>
        <span.section-label>Sort</span>
        <${fe} look="segments" ...${{get options(){return _},get value(){return o.value},onchange:a(r=>o.value=r,"onchange")}} />
      </div>
      <div.prompt-list.zebra>
        ${p(()=>i.value,r=>r,r=>c`<${he} ...${{get prompt(){return r}}} />`,()=>c`<div.empty-hint>No prompts found</div>`)}
      </div>
    </div>
  `}a(Re,"$$SidebarRatHtml");function xe(e,t){return Te.call({props:e},e,t)}a(xe,"AppRatHtml");function Te(e,t){return RAT.app.on("error",j.error),se("Prompts"),c`
    <rat-area name="menu" dock="start" open><${we} /></rat-area>
    <rat-area name="main"><${me} /></rat-area>
  `}a(Te,"$$AppRatHtml");export{xe as default};
