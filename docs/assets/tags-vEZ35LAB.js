const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-DHBFU17Q.js","./index-Dic2q7Qi.js","./index-CurnHmyV.css"])))=>i.map(i=>d[i]);
var Y=Object.defineProperty;var mt=(t,e,r)=>e in t?Y(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var a=(t,e)=>Y(t,"name",{value:e,configurable:!0});var f=(t,e,r)=>mt(t,typeof e!="symbol"?e+"":e,r);import"./svg-icon-BzSAM4HS.js";import{isArray as gt}from"https://esm.sh/jsr/@pulgasari/is";import{h as l,_ as rt,e as ht,A as vt}from"./index-Dic2q7Qi.js";import"https://esm.sh/jsr/@pulgasari/str";import{a as d}from"./template-DVBhjnqx.js";import{p as nt}from"./placement-CECKNSni.js";import{b as yt,a as kt,p as xt}from"./actions-eNzxACff.js";import{d as wt}from"./index-CZPONa0e.js";import{p as X,f as $t,a as At,t as St}from"./index-DnIgJ5wD.js";import{i as zt}from"./import-n7zfmJr1.js";import{l as Nt}from"./locale-CyKX5eGQ.js";import{r as Ct,n as Tt}from"./options-B1bWGPfH.js";import"https://esm.sh/jsr/@pulgasari/logger";const j=a(t=>t.kind==="bool","fits"),it=a(t=>{const{icon:e,iconChecked:r}=t.getAttr();return e||r?{off:e||r,on:r||e}:null},"iconsOf");function R(t,e,r){const n=t.getAttr("label");return l`
    <button type="button" part="control" ...${d({role:r})}>
      ${e}
      ${it(t)&&l`<svg-icon part="icon"></svg-icon>`}
      ${n&&l`<span part="label">${n}</span>`}
    </button>
  `}a(R,"control");const M=a((t,e)=>e.on("click",'[part~="control"]',()=>t.toggle()),"events");function F(t){const e=t.part("control").node,r=t.checked;e.setAttribute(t.look==="button"?"aria-pressed":"aria-checked",String(r)),e.part.toggle("checked",r);const n=it(t);n&&e.querySelector("svg-icon").setAttribute("icon",r?n.on:n.off)}a(F,"update");const Lt={fits:j,events:M,update:F,css:`
    [part~="control"] {
      border         : var(--input-line);
      border-radius  : --radius();
      min-block-size : --space(9);
      padding-inline : --space(normal);
    }

    [part~="checked"] { background: var(--color-ink, AccentColor); border-color: transparent; color: var(--color-bg, Canvas); }
  `,render:a(t=>R(t,"",null),"render"),focus:a(t=>t.part("control").node,"focus")},Ot={fits:j,events:M,update:F,css:`
    [part~="check"] {
      align-items     : center;
      block-size      : 1.15em;
      border          : var(--border-width, 1px) solid color-mix(in srgb, currentColor 45%, transparent);
      border-radius   : calc(--radius() * 0.5);
      display         : inline-flex;
      flex            : none;
      inline-size     : 1.15em;
      justify-content : center;
    }

    [part~="mark"] { --icon-size: 0.85em; visibility: hidden; }

    [part~="checked"] [part~="check"] { background: var(--color-ink, AccentColor); border-color: transparent; color: var(--color-bg, Canvas); }
    [part~="checked"] [part~="mark"]  { visibility: visible; }
  `,render:a(t=>R(t,l`<span part="check"><svg-icon part="mark" icon="lucide:check"></svg-icon></span>`,"checkbox"),"render"),focus:a(t=>t.part("control").node,"focus")},y=`
  [part~="box"] {
    border         : var(--input-line);
    border-radius  : --radius();
    min-block-size : --space(9);
    padding-inline : --space(small);

    &:focus-within { border-color: var(--color-ink, Highlight); }
  }

  [part~="icon"], [part~="action"] { opacity: 0.65; }
  [part~="action"]:hover          { opacity: 1; }
`,S=a(t=>t.iconName&&l`<svg-icon part="icon" icon="${t.iconName}"></svg-icon>`,"icon");function x(t,e=0,r={}){const{autocomplete:n,max:i,maxlength:o,min:s,minlength:c,pattern:u,step:k}=t.getAttr(),O=t.placeholder;return l`<input part="input" data-index="${e}" ...${{...d({autocomplete:n,max:i,maxlength:o,min:s,minlength:c,pattern:u,placeholder:O,step:k,type:t.valueType.input}),...r}} />`}a(x,"field$1");function z(t,e){e.on("input","input[data-index]",(r,n)=>t.setPart(Number(n.dataset.index),n.value)),e.on("change","input[data-index]",(r,n)=>t.setPart(Number(n.dataset.index),n.value,{final:!0}))}a(z,"fieldEvents");function N(t){const e=t.values,r=!!t.getAttr("readonly");for(const n of t.root.querySelectorAll("input[data-index]")){if(n.readOnly=r,n===t.focused)continue;const i=e[Number(n.dataset.index)]??"";n.value!==i&&(n.value=i)}}a(N,"updateFields");const I=a(t=>t.root.querySelector("input[data-index]"),"firstField"),Et=a(t=>l`${(t.suggestionList??[]).map(e=>l`<option value="${e}"></option>`)}`,"options"),Z=a(t=>queueMicrotask(()=>t.part("input").focus()),"refocus"),qt={fits:a(t=>t.kind==="free"&&t.count==="multiple","fits"),css:`
    ${y}
    [part~="box"] { flex-wrap: wrap; gap: --space(tiny); padding-block: --space(tiny); }

    [part~="chip"] {
      align-items   : center;
      background    : color-mix(in srgb, currentColor 12%, transparent);
      border-radius : --radius();
      display       : inline-flex;
      gap           : --space(tiny);
      padding       : --space(tiny);
    }

    [part~="remove"] { --icon-size: 0.85em; opacity: 0.65; }
    [part~="input"]  { flex: 1 1 6em; }
  `,render:a(t=>l`
    ${S(t)}
    ${t.values.map((e,r)=>l`
      <span part="chip">
        <span part="label">${e}</span>
        <button type="button" part="remove" data-index="${r}" aria-label="${`remove ${e}`}" tabindex="-1"><svg-icon icon="lucide:x"></svg-icon></button>
      </span>
    `)}
    <input part="input" type="${t.valueType.input}" placeholder="${t.placeholder||"add…"}" enterkeyhint="done" ...${d({list:"suggestionList"in t&&"suggestions"})} />
    ${"suggestionList"in t?l`<datalist id="suggestions">${Et(t)}</datalist>`:""}
  `,"render"),events(t,e){const r=a(n=>{n.value.trim()&&(t.add(n.value),Z(t))},"add");e.on("click",'[part~="remove"]',(n,i)=>t.removeAt(Number(i.dataset.index))),e.$(t.root).on("input",async n=>{const i=t.part("input").node;if(n.target!==i||(i.setCustomValidity(""),typeof t.suggest!="function"))return;const o=i.value,s=await t.suggest(o);i.value===o&&(t.suggested=Array.isArray(s)?s.map(String):[],t.update())}),e.$(t.root).on("change",n=>{n.target===t.part("input").node&&r(n.target)}),e.$(t.root).on("keydown",n=>{const i=t.part("input").node;n.target===i&&(n.key==="Enter"||n.key===","?(n.preventDefault(),r(i)):n.key==="Backspace"&&!i.value&&t.values.length&&(t.removeAt(t.values.length-1),Z(t)))})},update(t){const e=t.part("input").node;e&&(e.readOnly=!!t.getAttr("readonly"))},focus:a(t=>t.part("input").node,"focus")},Bt={ArrowLeft:-1,ArrowRight:1},Vt={ArrowDown:1,ArrowUp:-1};function at(t,e,r,{sideways:n=!0}={}){if(t==="Home")return 0;if(t==="End")return r-1;const i=Vt[t]??(n?Bt[t]:void 0);return i?e<0?0:(e+i+r)%r:null}a(at,"nextIndex");const v=a(t=>t.hidden||t.matches(':disabled, [aria-disabled="true"]'),"isInactive"),ot=a(t=>t.icon&&l`<svg-icon part="icon" icon="${t.icon}"></svg-icon>`,"optionIcon"),C=a(t=>t.label||t.value,"labelOf");function U(t,e,{iconsOnly:r=t.getAttr("iconsOnly"),mark:n=!1}={}){const i=t.count==="multiple"?"checkbox":"radio";return l`${t.options.map(o=>{const s=C(o),c=!(r&&o.icon);return l`
      <button type="button" part="${e}" role="${i}" data-value="${o.value}" tabindex="-1" aria-checked="false"
              ...${d({"aria-label":!c&&s,disabled:o.disabled,title:!c&&s})}>
        ${n&&l`<span part="mark"></span>`}
        ${ot(o)}
        ${c&&l`<span part="label">${s}</span>`}
      </button>
    `})}`}a(U,"optionButtons");function T(t){const e=t.selected,r=[...t.root.querySelectorAll("[data-value]")];for(const n of r){const i=e.has(n.dataset.value);n.setAttribute(n.getAttribute("role")==="option"?"aria-selected":"aria-checked",String(i)),n.part.toggle("selected",i)}return r}a(T,"updateSelected");function st(t,e){const r=t.selected,n=e.find(i=>r.has(i.dataset.value)&&!v(i))??e.find(i=>!v(i));for(const i of e)i.tabIndex=i===n?0:-1}a(st,"updateTabStop");function lt(t,e){e.on("click","[data-value]",(r,n)=>{v(n)||t.select(n.dataset.value)}),e.$(t.root).on("keydown",r=>{if(r.target.localName==="input")return;const n=[...t.root.querySelectorAll("[data-value]")].filter(c=>!v(c)),i=n.indexOf(r.target.closest?.("[data-value]")),o=at(r.key,i,n.length);if(o===null||!n.length)return;r.preventDefault();const s=n[o];s.focus(),t.count!=="multiple"&&t.select(s.dataset.value)})}a(lt,"groupEvents");const H={events:lt,focus:a(t=>t.root.querySelector('[data-value][tabindex="0"]'),"focus"),role:a(t=>t.count==="multiple"?"group":"radiogroup","role"),update:a(t=>st(t,T(t)),"update")},p=a(t=>t.root.querySelector("[aria-haspopup]"),"triggerOf"),h=a(t=>t.part("listbox").matches(":popover-open"),"isOpen"),ct=a(t=>l`
  <div part="listbox" role="listbox" popover="manual" ...${d({"aria-multiselectable":t.count==="multiple"&&"true"})}>
    ${t.options.map(e=>l`
      <div part="option" role="option" data-value="${e.value}" tabindex="-1" aria-selected="false" ...${d({"aria-disabled":e.disabled&&"true"})}>
        ${ot(e)}
        <span part="label">${C(e)}</span>
      </div>
    `)}
  </div>
`,"listbox"),ut=`
  [part~="listbox"] {
    background          : var(--color-bg, Canvas);
    border              : var(--input-line);
    border-radius       : --radius();
    color               : inherit;
    margin              : 0;
    max-block-size      : var(--list-size, 15em);
    overflow-y          : auto;
    overscroll-behavior : contain;
    padding             : --space(tiny);
    position            : fixed;
  }

  [part~="option"] {
    align-items   : center;
    border-radius : calc(--radius() * 0.75);
    cursor        : pointer;
    display       : flex;
    gap           : --space(small);
    padding       : --space(small);

    &:hover, &:focus        { background: color-mix(in srgb, currentColor 10%, transparent); }
    &[part~="selected"]     { color: var(--color-ink, AccentColor); }
    &[aria-disabled="true"] { cursor: not-allowed; opacity: 0.5; }
  }

  [part~="label"] { min-inline-size: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`;function pt(t,e){const r=t.part("listbox").node;r&&h(t)&&(t.dataset.placement=nt(r,e))}a(pt,"reposition");function g(t,e,r){const n=t.part("listbox").node;if(!n||t.disabled||e===h(t))return;const i=n.contains(t.focused);n[e?"showPopover":"hidePopover"](),p(t)?.setAttribute("aria-expanded",String(e)),e?(pt(t,r),n.querySelector('[part~="selected"]')?.scrollIntoView({block:"nearest"})):(dt(t,""),i&&p(t)?.focus())}a(g,"setOpen");function dt(t,e){const r=String(e??"").trim().toLowerCase();for(const n of t.part("listbox").$$('[role="option"]'))n.hidden=!!r&&!n.textContent.toLowerCase().includes(r)}a(dt,"filter$1");const Pt=a(t=>t.part("listbox").$$("[data-value]").filter(e=>!v(e)).nodes,"enabledItems");function ft(t,e,r){const n=a(()=>g(t,!1,r()),"close");e.on("click",'[role="option"]',(o,s)=>{v(s)||(t.select(s.dataset.value),t.count!=="multiple"&&n())}),e.$(document).on("pointerdown",o=>{o.composedPath().includes(t)||n()});const i=a(()=>pt(t,r()),"follow");e.$(window).on("resize",i,{passive:!0}),e.$(window).on("scroll",i,{capture:!0,passive:!0}),e.$(t.root).on("keydown",o=>{const{key:s}=o,c=o.target.closest?.("[data-value]");if(s==="Escape"&&h(t)){o.preventDefault(),n();return}if((s==="Enter"||s===" ")&&c){o.preventDefault(),c.click();return}const u=Pt(t),k=u.findIndex(bt=>t.selected.has(bt.dataset.value)),O=c?u.indexOf(c):k,K=at(s,O,u.length,{sideways:!1});K!==null&&(o.preventDefault(),h(t)||g(t,!0,r()),u[K]?.focus())})}a(ft,"popoverEvents");function J(t){const e=p(t);if(!e||e===t.focused)return;const r=t.selected;e.value=t.options.filter(n=>r.has(n.value)).map(C).join(", ")}a(J,"showSelection");const _t={fits:a(t=>t.kind==="list"&&t.count!=="range","fits"),css:`
    ${y}
    ${ut}
    [part~="box"] { cursor: pointer; }

    [part~="input"] {
      cursor        : inherit;
      flex          : 1 1 auto;
      inline-size   : 100%;
      text-overflow : ellipsis;

      &[aria-expanded="true"] ~ [part~="caret"] { rotate: 180deg; }
    }

    [part~="caret"] { opacity: 0.65; transition: rotate 0.15s ease; }
  `,render:a(t=>l`
    ${S(t)}
    <input type="text" part="input" role="combobox" aria-haspopup="listbox" aria-expanded="false"
           ...${d({placeholder:t.placeholder||"select…",readonly:!t.getAttr("searchable")})} />
    <svg-icon part="caret" icon="lucide:chevron-down"></svg-icon>
    ${ct(t)}
  `,"render"),events(t,e){ft(t,e,()=>t),e.on("click",r=>{r.composedPath().includes(t.part("listbox").node)||g(t,!h(t),t)}),e.$(t.root).on("input",r=>{r.target===p(t)&&(g(t,!0,t),dt(t,r.target.value))}),e.$(t.root).on("focusout",r=>{r.target===p(t)&&!h(t)&&J(t)})},update(t){T(t),J(t)},focus:p},Dt=500,jt={fits:a(t=>t.kind==="list"&&t.count==="single","fits"),css:`
    ${ut}

    [part~="button"] {
      -webkit-touch-callout : none;
      border                : var(--input-line);
      border-radius         : --radius();
      min-block-size        : --space(9);
      padding-inline        : --space(normal);
      user-select           : none;
    }
  `,render:a(t=>l`
    <button type="button" part="button" aria-haspopup="listbox" aria-expanded="false">
      <svg-icon part="icon" hidden></svg-icon>
      <span part="label"></span>
    </button>
    ${ct(t)}
  `,"render"),events(t,e){const r=a(()=>p(t),"button");ft(t,e,r);let n=null,i=!1;e.on("pointerdown","[aria-haspopup]",s=>{s.button===0&&(i=!1,clearTimeout(n),n=setTimeout(()=>{i=!0,g(t,!0,r())},Dt))});const o=a(()=>{clearTimeout(n),i&&setTimeout(()=>{i=!1})},"release");e.$(window).on("pointerup pointercancel",o),e.on("click","[aria-haspopup]",()=>{i||(h(t)?g(t,!1,r()):t.cycle(1))}),e.on("contextmenu","[aria-haspopup]",s=>{s.preventDefault(),g(t,!0,r())})},update(t){T(t);const e=p(t),r=t.options.find(s=>s.value===t.value),n=r?C(r):t.placeholder||"select…",i=e.querySelector("svg-icon"),o=e.querySelector('[part~="label"]');i.hidden=!r?.icon,r?.icon&&i.setAttribute("icon",r.icon),o.textContent=n,o.hidden=!!(t.getAttr("iconsOnly")&&r?.icon),e.title=n,e.setAttribute("aria-label",n)},focus:p},Rt={fits:a(t=>t.kind==="free"&&t.count==="single","fits"),css:`
    ${y}
    [part~="input"] { flex: 1 1 auto; inline-size: 100%; }
  `,render:a(t=>l`
    ${S(t)}
    ${x(t)}
    ${kt(xt(t.actions))}
  `,"render"),events(t,e){z(t,e),yt(t,e)},update(t){N(t);const e=t.root.querySelector('[data-action="clear"]');e&&(e.hidden=!t.value)},focus:I},Mt={fits:a(t=>t.kind==="free"&&t.count==="range","fits"),css:`
    ${y}
    [part~="input"]     { flex: 1 1 auto; inline-size: 100%; }
    [part~="separator"] { flex: none; opacity: 0.65; }
  `,render:a(t=>l`
    ${S(t)}
    ${x(t,0,{"aria-label":"from"})}
    <span part="separator">–</span>
    ${x(t,1,{"aria-label":"to"})}
  `,"render"),events:z,update:N,focus:I},Ft=250,It=a(t=>!!(t.valueType.list?.query||t.getAttr("searchable")),"hasSearch");function Q(t,e){const r=e.trim().toLowerCase();for(const n of t.part("options").$$("[data-value]")){const i=(n.title||n.textContent).toLowerCase();n.hidden=!!r&&!i.includes(r)}}a(Q,"filter");const Ut={fits:a(t=>t.kind==="list"&&t.count!=="range","fits"),css:`
    [part~="box"] { align-items: stretch; flex-direction: column; }

    [part~="search"] {
      border         : var(--input-line);
      border-radius  : --radius();
      min-block-size : --space(9);
      padding-inline : --space(small);

      &:focus { border-color: var(--color-ink, Highlight); }
    }

    [part~="options"] {
      display               : grid;
      gap                   : --space(tiny);
      grid-template-columns : repeat(auto-fill, minmax(var(--grid-size, 2.5em), 1fr));
      max-block-size        : var(--grid-height, 16em);
      overflow-y            : auto;
    }

    [part~="option"] {
      aspect-ratio  : 1;
      border-radius : --radius();
      font-size     : 1.25em;

      &:hover             { background: color-mix(in srgb, currentColor 10%, transparent); }
      &[part~="selected"] { background: var(--color-ink, AccentColor); color: var(--color-bg, Canvas); }
    }
  `,render(t){const e=It(t)&&l`<input type="search" part="search" placeholder="${t.placeholder||"search…"}" />`;return l`${e}<div part="options">${U(t,"option",{iconsOnly:!0})}</div>`},events(t,e){lt(t,e);const r=wt(n=>t.source.search(n),Ft);t.track(r.cancel),e.$(t.root).on("input",n=>{n.target===t.part("search").node&&(t.valueType.list?.query?r(n.target.value):Q(t,n.target.value))})},update(t){const e=t.part("options").node,r=t.options.map(n=>n.value).join(`
`);if(e.dataset.signature!==r){e.dataset.signature=r;const n=t.part("search").node;n?.value&&!t.valueType.list?.query&&Q(t,n.value)}st(t,T(t))},role:H.role,focus:a(t=>t.part("search").node??t.root.querySelector('[data-value][tabindex="0"]'),"focus")},A=a((t,e)=>t.root.querySelector(`[data-color="${e}"]`),"colorOf"),E=a(t=>[...t.root.querySelectorAll('[part~="patterns"] [data-pattern]')],"swatchesOf"),b=a(t=>t.dataset.pattern==="none"?"":t.dataset.pattern,"idOf"),tt=a((t,e,r="swatch")=>l`
  <button type="button" part="${r}" data-pattern="${t}" ...${d({"aria-label":e,title:e})}><span></span></button>
`,"swatch$1");function Ht(t,e){const r=e.map(i=>i.id),n=t.getAttribute("patterns")?.trim();return n?n.split(/\s+/).filter(i=>r.includes(i)):r}a(Ht,"idsOf");async function Gt(t){const{use:e}=await rt(async()=>{const{use:r}=await import("./index-DHBFU17Q.js").then(n=>n.i);return{use:r}},__vite__mapDeps([0,1,2]),import.meta.url);for(const r of t.root.querySelectorAll("[data-pattern] > span")){const n=b(r.parentElement);!n||r.dataset.painted===n||(r.dataset.painted=n,e(n).image().then(i=>{b(r.parentElement)===n&&r.style.setProperty("--swatch",i)}).catch(()=>{}))}}a(Gt,"paint");function q(t,e){const r=t.part("opacity").node,n=t.hasAttribute("colors");t.setValue($t({bg:n?A(t,"bg").value:null,fg:n?A(t,"fg").value:null,id:e,opacity:r?Number(r.value)/100:null}))}a(q,"pick");function Wt(t){t._swatches||(t._swatches=[],rt(async()=>{const{list:e}=await import("./index-DHBFU17Q.js").then(r=>r.i);return{list:e}},__vite__mapDeps([0,1,2]),import.meta.url).then(({list:e})=>{const r=e(),n=Object.fromEntries(r.map(o=>[o.id,o.name])),i=t.hasAttribute("required")?[]:[["none","none"]];t._swatches=[...i,...Ht(t,r).map(o=>[o,n[o]??o])],t.update()}))}a(Wt,"fill");function et(t,e){const r=t.part("patterns").node;e?(r.showPopover(),nt(r,t.part("current").node),r.querySelector('[tabindex="0"]')?.focus()):r.hidePopover()}a(et,"toggle$1");const Kt={fits:a(t=>t.type==="pattern","fits"),css:`
    [part~="box"] { flex-wrap: wrap; }

    [part~="current"], [part~="swatch"] {
      aspect-ratio  : 1;
      border        : var(--input-line);
      border-radius : --radius();
      inline-size   : var(--pattern-swatch-size, 2.75em);
      overflow      : hidden;
      position      : relative;

      > span {
        background-color : currentColor;
        inset            : 0;
        mask-image       : var(--swatch);
        opacity          : 0.7;
        position         : absolute;
      }

      &[data-pattern="none"] > span {
        background : linear-gradient(to top right, transparent calc(50% - 1px), currentColor 0 calc(50% + 1px), transparent 0);
        mask-image : none;
        opacity    : 0.4;
      }
    }

    [part~="swatch"][aria-checked="true"] { outline: 2px solid var(--color-ink, currentColor); outline-offset: 1px; }

    [part~="opacity"] { accent-color: var(--color-ink, AccentColor); flex: 1 1 8em; }

    [part~="colors"] { display: flex; gap: --space(small); }

    [part~="color"] {
      block-size    : 2em;
      border        : var(--input-line);
      border-radius : --radius();
      inline-size   : 2.5em;
      padding       : --space(tiny);
    }

    [part~="patterns"] {
      background            : var(--color-bg, Canvas);
      border                : var(--input-line);
      border-radius         : --radius();
      color                 : inherit;
      gap                   : --space(tiny);
      grid-template-columns : repeat(var(--pattern-columns, 5), var(--pattern-swatch-size, 2.75em));
      margin                : 0;
      padding               : --space(small);
      position              : fixed;

      &:popover-open { display: grid; }
    }
  `,render(t){const e=t.hasAttribute("opacity"),r=t.hasAttribute("colors");return l`
      ${tt("none","pattern","current")}
      ${e&&l`<input type="range" part="opacity" min="0" max="100" step="1" aria-label="opacity" />`}
      ${r&&l`
        <span part="colors">
          <input type="color" part="color" data-color="fg" aria-label="pattern color" />
          <input type="color" part="color" data-color="bg" aria-label="background color" />
        </span>`}
      <div part="patterns" popover="auto" role="radiogroup" aria-label="patterns">${(t._swatches??[]).map(([n,i])=>tt(n,i))}</div>
    `},events(t,e){e.on("click",'[part~="current"]',()=>et(t,!t.part("patterns").matches(":popover-open"))),e.on("click",'[part~="patterns"] [data-pattern]',(n,i)=>{q(t,b(i)),et(t,!1),t.part("current").focus()}),e.$(t.root).on("keydown",n=>{const o={ArrowDown:1,ArrowLeft:-1,ArrowRight:1,ArrowUp:-1}[n.key],s=E(t),c=s.indexOf(n.target);if(!o||c<0)return;n.preventDefault();const u=s[(c+o+s.length)%s.length];u.focus(),q(t,b(u))});const r=a(()=>{const n=E(t).map(b).find(Boolean)??"";q(t,X(t.value).id||n)},"keep");e.$(t.root).on("change",n=>{n.target.matches('[part~="opacity"], [part~="color"]')&&r()})},update(t){Wt(t);const e=X(t.value),r=t.part("current").node;r.dataset.pattern=e.id||"none";const n=t.part("opacity").node;n&&n!==t.focused&&(n.value=String(Math.round((e.opacity??.1)*100))),t.hasAttribute("colors")&&(A(t,"fg").value=e.fg??"#000000",A(t,"bg").value=e.bg??"#ffffff");const i=E(t),o=i.find(s=>b(s)===e.id)??i[0];for(const s of i)s.setAttribute("aria-checked",String(b(s)===e.id)),s.tabIndex=s===o?0:-1;r.title=o?.title??"",Gt(t)},focus:a(t=>t.part("current").node,"focus")},Yt={...H,fits:a(t=>t.kind==="list"&&t.count!=="range","fits"),css:`
    [part~="box"]    { align-items: flex-start; flex-direction: column; gap: --space(tiny); }
    [part~="option"] { gap: --space(small); justify-content: flex-start; }

    [part~="mark"] {
      block-size    : 1em;
      border        : var(--border-width, 1px) solid color-mix(in srgb, currentColor 45%, transparent);
      border-radius : 50%;
      flex          : none;
      inline-size   : 1em;
    }

    [role="checkbox"] [part~="mark"] { border-radius: calc(--radius() * 0.5); }

    [part~="selected"] [part~="mark"] {
      background : var(--color-ink, AccentColor);
      border     : 0.3em solid var(--color-bg, Canvas);
      outline    : var(--border-width, 1px) solid var(--color-ink, AccentColor);
    }
  `,render:a(t=>U(t,"option",{mark:!0}),"render")},Xt={...H,fits:a(t=>t.kind==="list"&&t.count!=="range","fits"),css:`
    [part~="box"] {
      border        : var(--input-line);
      border-radius : --radius();
      gap           : 0;
      overflow      : hidden;
    }

    [part~="segment"] {
      flex           : 1 1 auto;
      min-block-size : --space(9);
      padding-inline : --space(normal);

      & + [part~="segment"] { border-inline-start: var(--input-line); }

      &[part~="selected"] { background: var(--color-ink, AccentColor); color: var(--color-bg, Canvas); }
    }
  `,render:a(t=>U(t,"segment"),"render")},B=a((t,[e,r])=>(t-e)/(r-e||1)*100,"percent");function Zt(t){const[e,r]=t.bounds;return t.values.map((n,i)=>n===""?i===1?r:e:Math.min(r,Math.max(e,t.toNumber(n))))}a(Zt,"positionsOf");const Jt={fits:a(t=>t.kind==="free"&&t.axis&&t.count!=="multiple","fits"),css:`
    :host {
      --slider-thumb : 1.1em;
      --slider-track : 0.35em;
    }

    [part~="track"] {
      align-items     : center;
      block-size      : var(--slider-thumb);
      display         : flex;
      flex            : 1 1 auto;
      min-inline-size : var(--slider-size, 10em);
      position        : relative;

      &::before {
        background    : color-mix(in srgb, currentColor 20%, transparent);
        block-size    : var(--slider-track);
        border-radius : var(--slider-track);
        content       : '';
        inset-inline  : 0;
        position      : absolute;
      }

      &[part~="hue"]::before { background: linear-gradient(to right in hsl longer hue, red, red); }
    }

    [part~="fill"] {
      background         : var(--color-ink, AccentColor);
      block-size         : var(--slider-track);
      border-radius      : var(--slider-track);
      inline-size        : calc((var(--to) - var(--from)) * (100% - var(--slider-thumb)) / 100);
      inset-inline-start : calc(var(--slider-thumb) / 2 + var(--from) * (100% - var(--slider-thumb)) / 100);
      position           : absolute;
    }

    [part~="hue"] > [part~="fill"] { display: none; }

    [part~="thumb"] {
      background         : var(--slider-color, var(--color-fg, currentColor));
      block-size         : var(--slider-thumb);
      border             : 2px solid var(--color-ink, AccentColor);
      border-radius      : 50%;
      inline-size        : var(--slider-thumb);
      inset-inline-start : calc(var(--at) * (100% - var(--slider-thumb)) / 100);
      pointer-events     : none;
      position           : absolute;

      &:has(+ input:focus-visible) { outline: 2px solid var(--color-ink, Highlight); outline-offset: 2px; }
    }

    [part~="input"] {
      appearance  : none;
      block-size  : 100%;
      cursor      : pointer;
      inline-size : 100%;
      inset       : 0;
      opacity     : 0;
      position    : absolute;

      &::-webkit-slider-thumb { appearance: none; block-size: var(--slider-thumb); inline-size: var(--slider-thumb); }
      &::-moz-range-thumb     { block-size: var(--slider-thumb); border: 0; inline-size: var(--slider-thumb); }
    }

    :host([range]) [part~="input"] {
      pointer-events: none;

      &::-webkit-slider-thumb { pointer-events: auto; }
      &::-moz-range-thumb     { pointer-events: auto; }
    }

    [part~="output"] { flex: none; font-variant-numeric: tabular-nums; min-inline-size: 4ch; text-align: end; }
  `,render(t){const e=t.count==="range",[r,n]=t.bounds,i=t.stepSize,o=t.getAttr("unit"),s=a(c=>l`
      <span part="thumb" data-thumb="${c}"></span>
      <input type="range" part="input" data-index="${c}" ...${d({"aria-label":e&&(c?"to":"from"),max:n,min:r,step:i})} />
    `,"handle");return l`
      <span part="${t.typeName==="color"?"track hue":"track"}">
        <span part="fill"></span>
        ${s(0)}
        ${e&&s(1)}
      </span>
      ${t.getAttr("readout")&&l`<output part="output"></output>`}
      ${o&&l`<small part="unit">${o}</small>`}
    `},events(t,e){e.on("input",'input[type="range"]',(r,n)=>t.setNumber(Number(n.dataset.index),Number(n.value),{track:!0}))},update(t){const e=t.bounds,r=Zt(t),n=t.values,i=t.count==="range";for(const u of t.root.querySelectorAll('input[type="range"]'))u.disabled=t.isLocked,u!==t.focused&&(u.value=String(r[Number(u.dataset.index)]));for(const u of t.root.querySelectorAll("[data-thumb]"))u.style.setProperty("--at",B(r[Number(u.dataset.thumb)],e));const o=t.part("track").node;o.style.setProperty("--from",i?B(r[0],e):0),o.style.setProperty("--to",B(r[i?1:0],e));const s=r.map((u,k)=>n[k]||t.fromNumber(u)),c=t.part("output").node;c&&(c.textContent=i?s.join(" – "):s[0]),t.setVar("--slider-color",t.typeName==="color"&&s[0])},focus:a(t=>t.root.querySelector('input[type="range"]'),"focus")},Qt={fits:a(t=>t.kind==="free"&&t.count==="single"&&t.steppable,"fits"),css:`
    ${y}
    [part~="box"] { padding-inline: --space(tiny); }

    [part~="input"] {
      appearance  : textfield;
      flex        : 1 1 auto;
      inline-size : 100%;
      text-align  : center;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button { appearance: none; margin: 0; }
    }

    [part~="button"] {
      block-size    : 1.75em;
      border-radius : --radius();
      inline-size   : 1.75em;

      &:hover { background: color-mix(in srgb, currentColor 10%, transparent); }
    }
  `,render:a(t=>l`
    <button type="button" part="button decrement" data-step="-1" aria-label="less" tabindex="-1"><svg-icon icon="lucide:minus"></svg-icon></button>
    ${x(t)}
    <button type="button" part="button increment" data-step="1" aria-label="more" tabindex="-1"><svg-icon icon="lucide:plus"></svg-icon></button>
  `,"render"),events(t,e){z(t,e),e.on("click","[data-step]",(r,n)=>t.step(Number(n.dataset.step))),e.$(t.root).on("keydown",r=>{r.key!=="ArrowUp"&&r.key!=="ArrowDown"||(r.preventDefault(),t.step(r.key==="ArrowUp"?1:-1))})},update:N,focus:I},te={fits:a(t=>t.kind==="free"&&t.count==="single"&&t.type==="color","fits"),css:`
    ${y}
    [part~="box"] { padding-inline-start: --space(tiny); }

    [part~="swatch"] {
      background    : var(--swatch, transparent);
      block-size    : 1.6em;
      border        : var(--input-line);
      border-radius : calc(--radius() * 0.75);
      flex          : none;
      inline-size   : 1.6em;
      overflow      : hidden;
      position      : relative;

      > input { cursor: pointer; inset: 0; opacity: 0; position: absolute; }
    }

    [part~="input"] { flex: 1 1 auto; font-variant-numeric: tabular-nums; inline-size: 7ch; }
  `,render:a(t=>l`
    <span part="swatch"><input type="color" data-index="0" aria-label="pick a color" /></span>
    ${x(t,0,{spellcheck:!1,type:"text"})}
  `,"render"),events:z,update(t){N(t),t.setVar("--swatch",t.valueType.format(t.value))},focus:a(t=>t.part("input").node,"focus")},ee={fits:j,events:M,update:F,css:`
    :host {
      --switch-size : 1.25em;
      --switch-pad  : 0.15em;
    }

    [part~="track"] {
      background    : color-mix(in srgb, currentColor 25%, transparent);
      block-size    : var(--switch-size);
      border-radius : var(--switch-size);
      flex          : none;
      inline-size   : calc(var(--switch-size) * 1.8);
      position      : relative;
      transition    : background 0.15s ease;
    }

    [part~="thumb"] {
      background         : var(--color-bg, Canvas);
      block-size         : calc(var(--switch-size) - 2 * var(--switch-pad));
      border-radius      : 50%;
      inline-size        : calc(var(--switch-size) - 2 * var(--switch-pad));
      inset-block-start  : var(--switch-pad);
      inset-inline-start : var(--switch-pad);
      position           : absolute;
      transition         : translate 0.15s ease;
    }

    [part~="checked"] [part~="track"] { background: var(--color-ink, AccentColor); }
    [part~="checked"] [part~="thumb"] { translate: calc(var(--switch-size) * 0.8) 0; }
  `,render:a(t=>R(t,l`<span part="track"><span part="thumb"></span></span>`,"switch"),"render"),focus:a(t=>t.part("control").node,"focus")},G={button:Lt,checkbox:Ot,chips:qt,combobox:_t,cycle:jt,field:Rt,fields:Mt,grid:Ut,pattern:Kt,radio:Yt,segments:Xt,slider:Jt,stepper:Qt,swatch:te,switch:ee},re=["field","fields","chips","combobox","switch"];function ne(t,...e){for(const r of[...e,...re])if(r&&G[r]?.fits(t))return r;return"field"}a(ne,"lookFor");const V=new Map;function ie(t){if(!V.has(t)){const e=new CSSStyleSheet;e.replaceSync(ht(G[t].css)),e.isLookSheet=!0,V.set(t,e)}return V.get(t)}a(ie,"sheetOf");const W=class W{constructor(e,r){this.host=e,this.onChange=r,this.query="",this.fetched=[],this.listed=[]}get all(){return[...Ct(this.host),...this.fetched,...this.listed]}refresh(){this.refreshSrc(),this.refreshList()}search(e){this.query=String(e??"").trim(),this.refreshList()}refreshSrc(){const e=this.host.getAttribute("src");if(e===this.src||(this.src=e,this.fetched=[],!e))return;const r=a(n=>{this.src===e&&(this.fetched=n,this.onChange())},"done");zt(e).then(n=>r(Tt(n))).catch(n=>{console.warn(`[${this.host.localName}] could not load options from "${e}":`,n),r([])})}refreshList(){const e=this.host,r=e.valueType;if(!r.list){this.key="",this.listed=[];return}const n=Nt(e),i=[e.typeName,n,this.query];for(const c of r.attributes??[])i.push(e.getAttribute(c));const o=i.join("|");if(o===this.key)return;this.key=o;const s=a(c=>{this.key===o&&(this.listed=c,this.onChange())},"done");Promise.resolve(r.list.entries(e,n,this.query)).then(s).catch(c=>{console.warn(`[${e.localName}] could not build the ${e.typeName} list:`,c),s([])})}};a(W,"OptionSource");let _=W;const D={multiple:",",range:".."};function ae(t,e){const r=t??"";if(e==="single")return[r];const n=r?r.split(D[e]).map(i=>i.trim()):[];return e==="range"?[n[0]??"",n[1]??""]:n.filter(Boolean)}a(ae,"splitValue");function oe(t,e){return e==="single"?t[0]??"":e==="range"?t.some(Boolean)?t.map(r=>r??"").join(D.range):"":t.filter(Boolean).join(D.multiple)}a(oe,"joinValue");const se=`
  :host {
    --input-line    : var(--border-width, 1px) solid color-mix(in srgb, currentColor 25%, transparent);

    box-sizing      : border-box;
    color           : inherit;
    display         : inline-flex;
    font            : inherit;
    min-inline-size : 0;
    vertical-align  : middle;
  }

  :host([hidden])           { display: none; }
  :host(:state(disabled))   { opacity: 0.5; pointer-events: none; }

  *, *::before, *::after    { box-sizing: border-box; }
  [hidden]                  { display: none !important; }
  :focus                    { outline: none; }
  :focus-visible            { outline: 2px solid var(--color-ink, Highlight); outline-offset: 2px; }
  input:focus-visible       { outline: none; }
  svg-icon                  { flex: none; }

  [part~="box"] {
    align-items     : center;
    display         : flex;
    flex            : 1 1 auto;
    gap             : var(--input-gap, --space(small));
    min-inline-size : 0;
  }

  button {
    align-items : center;
    background  : none;
    border      : 0;
    color       : inherit;
    cursor      : pointer;
    display     : inline-flex;
    font        : inherit;
    margin      : 0;
    padding     : 0;
    appearance      : none;
    flex            : none;
    gap             : --space(small);
    justify-content : center;
  }

  input {
    background      : none;
    border          : 0;
    color           : inherit;
    font            : inherit;
    margin          : 0;
    min-inline-size : 0;
    padding         : 0;
    &::-webkit-search-cancel-button { appearance: none; }
  }
`,m=class m extends vt{constructor(){super(),this.source=new _(this,()=>this.update())}get typeName(){return this.constructor.type??this.getAttr("type")??"text"}get valueType(){return St(this.typeName)}get type(){return this.typeName==="bool"?"checkbox":this.typeName}get count(){return this.typeName==="bool"?"single":this.getAttr("multiple")?"multiple":this.getAttr("range")&&!this.isList?"range":"single"}get options(){return this.source.all}get isList(){return!!(this.valueType.list||this.getAttr("src")||this.options.length)}get kind(){return this.typeName==="bool"?"bool":this.isList?"list":"free"}get shape(){const e=this.valueType;return{axis:!!e.axis,count:this.count,kind:this.kind,steppable:!!e.axis&&e.steppable!==!1,type:this.typeName}}get askedLook(){return this._ownLook?null:this.getAttribute("look")}get look(){return ne(this.shape,this.askedLook,this.valueType.look)}get lookModule(){return G[this.look]}reflectAttrs(){if(super.reflectAttrs(),this.getAttribute("look")!==null&&!this._ownLook)return this;const e=this.look;if(this._ownLook=!0,this.getAttribute("look")===e)return this;this._reflecting=!0;try{this.setAttribute("look",e)}finally{this._reflecting=!1}return this}onAttributeChanged(e){e==="look"&&(this._ownLook=!1)}adoptLook(){const e=ie(this.look),r=this.shadowRoot;r.adoptedStyleSheets.includes(e)||(r.adoptedStyleSheets=[...r.adoptedStyleSheets.filter(n=>!n.isLookSheet),e])}bindWhile(e,r,n){const i=this._bound??={};if(i[e]?.key===r)return;i[e]?.controller.abort();const o=new AbortController;i[e]={key:r,controller:o},n?.(this.self.until(o.signal))}get values(){return ae(this.getAttribute("value"),this.count)}parseValue(e){return e==null?"":String(e)}formatValue(e){return gt(e)?oe(e,this.count):e==null?"":String(e)}get typedValue(){const e=this.valueType,r=this.values.map(n=>n===""?null:e.parse(n));return this.count==="single"?r[0]:r}get formValue(){if(this.count!=="multiple")return super.formValue;const e=this.getAttr("name"),r=this.values;if(!r.length)return null;if(!e)return this.value;const n=new FormData;for(const i of r)n.append(e,i);return n}get isLocked(){return this.disabled||!!this.getAttr("readonly")}setValue(e){return this.isLocked?this:this.commit(e)}setPart(e,r,{final:n=!1}={}){const i=this.values;return i[e]=n?this.normalize(r):String(r??""),this.setValue(n&&this.count==="range"?this.order(i):i)}normalize(e){const r=String(e??"").trim();return this.valueType.normalize?.(r)??r}order(e){const[r,n]=e;return r&&n&&this.toNumber(r)>this.toNumber(n)?[n,r]:e}add(e){const r=this.normalize(String(e??"").replaceAll(","," "));return r&&!this.values.includes(r)?this.setValue([...this.values,r]):this}removeAt(e){return this.setValue(this.values.filter((r,n)=>n!==e))}toNumber(e){const r=this.valueType;return r.axis.toNumber(r.parse(e))}fromNumber(e,r){const n=this.valueType;return n.format(n.axis.fromNumber(e,r))}get limits(){const{max:e,min:r}=this.getAttr();return[r===void 0?-1/0:this.toNumber(r),e===void 0?1/0:this.toNumber(e)]}get bounds(){const[e,r]=this.valueType.axis?.bounds??[0,100],{max:n,min:i}=this.getAttr();return[i===void 0?e:this.toNumber(i),n===void 0?r:this.toNumber(n)]}get stepSize(){return this.getAttr("step")||this.valueType.axis?.step||1}setNumber(e,r,{track:n=!1}={}){const[i,o]=n?this.bounds:this.limits,s=this.values;return s[e]=this.fromNumber(Math.min(o,Math.max(i,Number(r)||0)),s[e]),this.count==="range"&&(s[0]||=this.fromNumber(this.bounds[0]),s[1]||=this.fromNumber(this.bounds[1])),this.setValue(this.count==="range"?this.order(s):s)}step(e,r=0){const n=this.values[r]??"",[i]=this.limits,o=n===""?Number.isFinite(i)?i:0:this.toNumber(n);return this.setNumber(r,o+e*this.stepSize)}get selected(){return new Set(this.values.filter(Boolean))}select(e){if(this.count!=="multiple")return this.setValue(e);const r=this.selected;return r.has(e)?r.delete(e):r.add(e),this.setValue([...r])}cycle(e=1){const r=this.options.filter(o=>!o.disabled);if(!r.length)return this;const n=r.findIndex(o=>o.value===this.value),i=n<0?e>0?-1:0:n;return this.select(r[((i+e)%r.length+r.length)%r.length].value)}get checked(){return this.getAttribute("value")==="true"}set checked(e){this.commit(e?"true":"",{notify:!1})}toggle(){return this.setValue(this.checked?"":"true")}get actions(){return this.getAttr("actions")??this.valueType.actions??""}get placeholder(){return this.getAttr("placeholder")??this.valueType.placeholder??""}get iconName(){const e=this.getAttr("icon");return e==="false"?null:e||this.valueType.icon||null}actionText(){return this.value}actionTarget(){return this.isLocked?null:this.focusTarget}revealTarget(){return this.focusTarget}get focusTarget(){return this.lookModule?.focus?.(this)??this.root.querySelector("input, button")}captureDefaults(){return this.typeName==="bool"&&this.hasAttribute("checked")&&!this.hasAttribute("value")&&this.setAttribute("value","true"),super.captureDefaults()}onConnected(){this.$(this.root).on("input beforeinput",r=>r.stopPropagation());const e=new MutationObserver(r=>{r.some(n=>n.target!==this)&&this.update()});if(e.observe(this,{attributes:!0,childList:!0,subtree:!0,attributeFilter:["value","label","icon","disabled","selected"]}),this.track(()=>e.disconnect()),!this.hasAttribute("value")){const r=this.options.filter(n=>n.selected).map(n=>n.value);r.length&&(this.commit(this.count==="multiple"?r:r[0],{notify:!1}),this._defaultValue=this.getAttribute("value")??"")}}onDisconnected(){this._bound=null}update(){return this._mounted&&this.source.refresh(),super.update()}render(){return l`<div part="box">${this.lookModule.render(this)}</div>`}sync(){super.sync();const e=this.lookModule;this.adoptLook(),this.bindWhile("look",this.look,r=>e.events?.(this,r)),this.bindWhile("type",this.typeName,r=>this.valueType.setup?.(this,r)),this.internals&&(this.internals.role=e.role?.(this)??null),e.update?.(this)}};a(m,"Input"),f(m,"shadow",{delegatesFocus:!0}),f(m,"attr",{...At,actions:String,autocomplete:String,icon:String,iconChecked:String,iconsOnly:Boolean,look:String,max:String,maxlength:Number,min:String,minlength:Number,multiple:Boolean,pattern:String,placeholder:String,range:Boolean,readout:{type:Boolean,default:!0},searchable:Boolean,src:String,step:Number,type:String,unit:String}),f(m,"styles",se),f(m,"type",null);let w=m;const le={"input-bool":"bool","input-color":"color","input-country":"country","input-currency":"currency","input-date":"date","input-datetime":"datetime","input-duration":"duration","input-email":"email","input-emoji":"emoji","input-font":"font","input-hotkey":"hotkey","input-icon":"icon","input-language":"language","input-locale":"locale","input-number":"number","input-password":"password","input-pattern":"pattern","input-phone":"phone","input-search":"search","input-slug":"slug","input-text":"text","input-time":"time","input-timezone":"timezone","input-unit":"unit","input-url":"url","input-year":"year"},L={"input-value":w};var P;for(const[t,e]of Object.entries(le))L[t]=(P=class extends w{},f(P,"type",e),P);var $;L["input-chips"]=($=class extends w{accept=null;suggest=null;transform=null;suggested=[];get suggestionList(){const t=String(this.getAttr("suggestions")??"").split(",").map(e=>e.trim()).filter(Boolean);return[...new Set([...t,...this.suggested])].filter(e=>!this.values.includes(e))}verdict(t){const e=this.getAttr("pattern");if(e&&!new RegExp(`^(?:${e})$`,"u").test(t))return"does not match the pattern";const r=this.accept?.(t)??!0;return r===!1?"not accepted":r}add(t){const e=String(t??"").replaceAll(","," ").trim(),r=this.normalize(this.transform?this.transform(e):e);if(!r)return this;const n=this.verdict(r);if(n!==!0){const i=this.part("input").node;return i?.setCustomValidity(String(n)),i?.reportValidity(),this.emit("input-chips-refused",{reason:n,text:r}),this}return super.add(r)}},f($,"attr",{multiple:{type:Boolean,default:!0},suggestions:String}),f($,"type","text"),$);for(const[t,e]of Object.entries(L))e.init(t);const $e=Object.keys(L);export{L as ELEMENTS,$e as TAGS};
