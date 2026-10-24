const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-BFdBVABv.js","./index-CAN6sJ0x.js","./index-CurnHmyV.css"])))=>i.map(i=>d[i]);
import"./svg-icon-CmK-OipF.js";import{isArray as st}from"https://esm.sh/jsr/@pulgasari/is";import{h as s,_ as K,e as lt,A as ct}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/str";import{a as p}from"./template-CbX1Mzd8.js";import{p as Y}from"./placement-3pTR5Us0.js";import{b as ut,a as pt,p as dt}from"./actions-Dn3InYRx.js";import{d as ft}from"./index-B1xaW8O5.js";import{p as M,f as bt,a as mt,t as gt}from"./index-C41x3u_M.js";import{i as ht}from"./import-D9lz_U--.js";import{l as vt}from"./locale-CxrTcH6i.js";import{r as yt,n as kt}from"./options-rJMj_76y.js";import"https://esm.sh/jsr/@pulgasari/logger";const E=t=>t.kind==="bool",X=t=>{const{icon:e,iconChecked:r}=t.getAttr();return e||r?{off:e||r,on:r||e}:null};function q(t,e,r){const n=t.getAttr("label");return s`
    <button type="button" part="control" ...${p({role:r})}>
      ${e}
      ${X(t)&&s`<svg-icon part="icon"></svg-icon>`}
      ${n&&s`<span part="label">${n}</span>`}
    </button>
  `}const B=(t,e)=>e.on("click",'[part~="control"]',()=>t.toggle());function _(t){const e=t.part("control").node,r=t.checked;e.setAttribute(t.look==="button"?"aria-pressed":"aria-checked",String(r)),e.part.toggle("checked",r);const n=X(t);n&&e.querySelector("svg-icon").setAttribute("icon",r?n.on:n.off)}const xt={fits:E,events:B,update:_,css:`
    [part~="control"] {
      border         : var(--input-line);
      border-radius  : --radius();
      min-block-size : --space(9);
      padding-inline : --space(normal);
    }

    [part~="checked"] { background: var(--color-ink, AccentColor); border-color: transparent; color: var(--color-bg, Canvas); }
  `,render:t=>q(t,"",null),focus:t=>t.part("control").node},wt={fits:E,events:B,update:_,css:`
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
  `,render:t=>q(t,s`<span part="check"><svg-icon part="mark" icon="lucide:check"></svg-icon></span>`,"checkbox"),focus:t=>t.part("control").node},g=`
  [part~="box"] {
    border         : var(--input-line);
    border-radius  : --radius();
    min-block-size : --space(9);
    padding-inline : --space(small);

    &:focus-within { border-color: var(--color-ink, Highlight); }
  }

  [part~="icon"], [part~="action"] { opacity: 0.65; }
  [part~="action"]:hover          { opacity: 1; }
`,k=t=>t.iconName&&s`<svg-icon part="icon" icon="${t.iconName}"></svg-icon>`;function v(t,e=0,r={}){const{autocomplete:n,max:i,maxlength:o,min:a,minlength:l,pattern:c,step:h}=t.getAttr(),z=t.placeholder;return s`<input part="input" data-index="${e}" ...${{...p({autocomplete:n,max:i,maxlength:o,min:a,minlength:l,pattern:c,placeholder:z,step:h,type:t.valueType.input}),...r}} />`}function x(t,e){e.on("input","input[data-index]",(r,n)=>t.setPart(Number(n.dataset.index),n.value)),e.on("change","input[data-index]",(r,n)=>t.setPart(Number(n.dataset.index),n.value,{final:!0}))}function w(t){const e=t.values,r=!!t.getAttr("readonly");for(const n of t.root.querySelectorAll("input[data-index]")){if(n.readOnly=r,n===t.focused)continue;const i=e[Number(n.dataset.index)]??"";n.value!==i&&(n.value=i)}}const V=t=>t.root.querySelector("input[data-index]"),$t=t=>s`${(t.suggestionList??[]).map(e=>s`<option value="${e}"></option>`)}`,F=t=>queueMicrotask(()=>t.part("input").focus()),At={fits:t=>t.kind==="free"&&t.count==="multiple",css:`
    ${g}
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
  `,render:t=>s`
    ${k(t)}
    ${t.values.map((e,r)=>s`
      <span part="chip">
        <span part="label">${e}</span>
        <button type="button" part="remove" data-index="${r}" aria-label="${`remove ${e}`}" tabindex="-1"><svg-icon icon="lucide:x"></svg-icon></button>
      </span>
    `)}
    <input part="input" type="${t.valueType.input}" placeholder="${t.placeholder||"add…"}" enterkeyhint="done" ...${p({list:"suggestionList"in t&&"suggestions"})} />
    ${"suggestionList"in t?s`<datalist id="suggestions">${$t(t)}</datalist>`:""}
  `,events(t,e){const r=n=>{n.value.trim()&&(t.add(n.value),F(t))};e.on("click",'[part~="remove"]',(n,i)=>t.removeAt(Number(i.dataset.index))),e.$(t.root).on("input",async n=>{const i=t.part("input").node;if(n.target!==i||(i.setCustomValidity(""),typeof t.suggest!="function"))return;const o=i.value,a=await t.suggest(o);i.value===o&&(t.suggested=Array.isArray(a)?a.map(String):[],t.update())}),e.$(t.root).on("change",n=>{n.target===t.part("input").node&&r(n.target)}),e.$(t.root).on("keydown",n=>{const i=t.part("input").node;n.target===i&&(n.key==="Enter"||n.key===","?(n.preventDefault(),r(i)):n.key==="Backspace"&&!i.value&&t.values.length&&(t.removeAt(t.values.length-1),F(t)))})},update(t){const e=t.part("input").node;e&&(e.readOnly=!!t.getAttr("readonly"))},focus:t=>t.part("input").node},St={ArrowLeft:-1,ArrowRight:1},zt={ArrowDown:1,ArrowUp:-1};function Z(t,e,r,{sideways:n=!0}={}){if(t==="Home")return 0;if(t==="End")return r-1;const i=zt[t]??(n?St[t]:void 0);return i?e<0?0:(e+i+r)%r:null}const m=t=>t.hidden||t.matches(':disabled, [aria-disabled="true"]'),J=t=>t.icon&&s`<svg-icon part="icon" icon="${t.icon}"></svg-icon>`,$=t=>t.label||t.value;function P(t,e,{iconsOnly:r=t.getAttr("iconsOnly"),mark:n=!1}={}){const i=t.count==="multiple"?"checkbox":"radio";return s`${t.options.map(o=>{const a=$(o),l=!(r&&o.icon);return s`
      <button type="button" part="${e}" role="${i}" data-value="${o.value}" tabindex="-1" aria-checked="false"
              ...${p({"aria-label":!l&&a,disabled:o.disabled,title:!l&&a})}>
        ${n&&s`<span part="mark"></span>`}
        ${J(o)}
        ${l&&s`<span part="label">${a}</span>`}
      </button>
    `})}`}function A(t){const e=t.selected,r=[...t.root.querySelectorAll("[data-value]")];for(const n of r){const i=e.has(n.dataset.value);n.setAttribute(n.getAttribute("role")==="option"?"aria-selected":"aria-checked",String(i)),n.part.toggle("selected",i)}return r}function Q(t,e){const r=t.selected,n=e.find(i=>r.has(i.dataset.value)&&!m(i))??e.find(i=>!m(i));for(const i of e)i.tabIndex=i===n?0:-1}function tt(t,e){e.on("click","[data-value]",(r,n)=>{m(n)||t.select(n.dataset.value)}),e.$(t.root).on("keydown",r=>{if(r.target.localName==="input")return;const n=[...t.root.querySelectorAll("[data-value]")].filter(l=>!m(l)),i=n.indexOf(r.target.closest?.("[data-value]")),o=Z(r.key,i,n.length);if(o===null||!n.length)return;r.preventDefault();const a=n[o];a.focus(),t.count!=="multiple"&&t.select(a.dataset.value)})}const D={events:tt,focus:t=>t.root.querySelector('[data-value][tabindex="0"]'),role:t=>t.count==="multiple"?"group":"radiogroup",update:t=>Q(t,A(t))},u=t=>t.root.querySelector("[aria-haspopup]"),b=t=>t.part("listbox").matches(":popover-open"),et=t=>s`
  <div part="listbox" role="listbox" popover="manual" ...${p({"aria-multiselectable":t.count==="multiple"&&"true"})}>
    ${t.options.map(e=>s`
      <div part="option" role="option" data-value="${e.value}" tabindex="-1" aria-selected="false" ...${p({"aria-disabled":e.disabled&&"true"})}>
        ${J(e)}
        <span part="label">${$(e)}</span>
      </div>
    `)}
  </div>
`,rt=`
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
`;function nt(t,e){const r=t.part("listbox").node;r&&b(t)&&(t.dataset.placement=Y(r,e))}function f(t,e,r){const n=t.part("listbox").node;if(!n||t.disabled||e===b(t))return;const i=n.contains(t.focused);n[e?"showPopover":"hidePopover"](),u(t)?.setAttribute("aria-expanded",String(e)),e?(nt(t,r),n.querySelector('[part~="selected"]')?.scrollIntoView({block:"nearest"})):(it(t,""),i&&u(t)?.focus())}function it(t,e){const r=String(e??"").trim().toLowerCase();for(const n of t.part("listbox").$$('[role="option"]'))n.hidden=!!r&&!n.textContent.toLowerCase().includes(r)}const Nt=t=>t.part("listbox").$$("[data-value]").filter(e=>!m(e)).nodes;function ot(t,e,r){const n=()=>f(t,!1,r());e.on("click",'[role="option"]',(o,a)=>{m(a)||(t.select(a.dataset.value),t.count!=="multiple"&&n())}),e.$(document).on("pointerdown",o=>{o.composedPath().includes(t)||n()});const i=()=>nt(t,r());e.$(window).on("resize",i,{passive:!0}),e.$(window).on("scroll",i,{capture:!0,passive:!0}),e.$(t.root).on("keydown",o=>{const{key:a}=o,l=o.target.closest?.("[data-value]");if(a==="Escape"&&b(t)){o.preventDefault(),n();return}if((a==="Enter"||a===" ")&&l){o.preventDefault(),l.click();return}const c=Nt(t),h=c.findIndex(at=>t.selected.has(at.dataset.value)),z=l?c.indexOf(l):h,R=Z(a,z,c.length,{sideways:!1});R!==null&&(o.preventDefault(),b(t)||f(t,!0,r()),c[R]?.focus())})}function U(t){const e=u(t);if(!e||e===t.focused)return;const r=t.selected;e.value=t.options.filter(n=>r.has(n.value)).map($).join(", ")}const Ct={fits:t=>t.kind==="list"&&t.count!=="range",css:`
    ${g}
    ${rt}
    [part~="box"] { cursor: pointer; }

    [part~="input"] {
      cursor        : inherit;
      flex          : 1 1 auto;
      inline-size   : 100%;
      text-overflow : ellipsis;

      &[aria-expanded="true"] ~ [part~="caret"] { rotate: 180deg; }
    }

    [part~="caret"] { opacity: 0.65; transition: rotate 0.15s ease; }
  `,render:t=>s`
    ${k(t)}
    <input type="text" part="input" role="combobox" aria-haspopup="listbox" aria-expanded="false"
           ...${p({placeholder:t.placeholder||"select…",readonly:!t.getAttr("searchable")})} />
    <svg-icon part="caret" icon="lucide:chevron-down"></svg-icon>
    ${et(t)}
  `,events(t,e){ot(t,e,()=>t),e.on("click",r=>{r.composedPath().includes(t.part("listbox").node)||f(t,!b(t),t)}),e.$(t.root).on("input",r=>{r.target===u(t)&&(f(t,!0,t),it(t,r.target.value))}),e.$(t.root).on("focusout",r=>{r.target===u(t)&&!b(t)&&U(t)})},update(t){A(t),U(t)},focus:u},Tt=500,Lt={fits:t=>t.kind==="list"&&t.count==="single",css:`
    ${rt}

    [part~="button"] {
      -webkit-touch-callout : none;
      border                : var(--input-line);
      border-radius         : --radius();
      min-block-size        : --space(9);
      padding-inline        : --space(normal);
      user-select           : none;
    }
  `,render:t=>s`
    <button type="button" part="button" aria-haspopup="listbox" aria-expanded="false">
      <svg-icon part="icon" hidden></svg-icon>
      <span part="label"></span>
    </button>
    ${et(t)}
  `,events(t,e){const r=()=>u(t);ot(t,e,r);let n=null,i=!1;e.on("pointerdown","[aria-haspopup]",a=>{a.button===0&&(i=!1,clearTimeout(n),n=setTimeout(()=>{i=!0,f(t,!0,r())},Tt))});const o=()=>{clearTimeout(n),i&&setTimeout(()=>{i=!1})};e.$(window).on("pointerup pointercancel",o),e.on("click","[aria-haspopup]",()=>{i||(b(t)?f(t,!1,r()):t.cycle(1))}),e.on("contextmenu","[aria-haspopup]",a=>{a.preventDefault(),f(t,!0,r())})},update(t){A(t);const e=u(t),r=t.options.find(a=>a.value===t.value),n=r?$(r):t.placeholder||"select…",i=e.querySelector("svg-icon"),o=e.querySelector('[part~="label"]');i.hidden=!r?.icon,r?.icon&&i.setAttribute("icon",r.icon),o.textContent=n,o.hidden=!!(t.getAttr("iconsOnly")&&r?.icon),e.title=n,e.setAttribute("aria-label",n)},focus:u},Ot={fits:t=>t.kind==="free"&&t.count==="single",css:`
    ${g}
    [part~="input"] { flex: 1 1 auto; inline-size: 100%; }
  `,render:t=>s`
    ${k(t)}
    ${v(t)}
    ${pt(dt(t.actions))}
  `,events(t,e){x(t,e),ut(t,e)},update(t){w(t);const e=t.root.querySelector('[data-action="clear"]');e&&(e.hidden=!t.value)},focus:V},Et={fits:t=>t.kind==="free"&&t.count==="range",css:`
    ${g}
    [part~="input"]     { flex: 1 1 auto; inline-size: 100%; }
    [part~="separator"] { flex: none; opacity: 0.65; }
  `,render:t=>s`
    ${k(t)}
    ${v(t,0,{"aria-label":"from"})}
    <span part="separator">–</span>
    ${v(t,1,{"aria-label":"to"})}
  `,events:x,update:w,focus:V},qt=250,Bt=t=>!!(t.valueType.list?.query||t.getAttr("searchable"));function H(t,e){const r=e.trim().toLowerCase();for(const n of t.part("options").$$("[data-value]")){const i=(n.title||n.textContent).toLowerCase();n.hidden=!!r&&!i.includes(r)}}const _t={fits:t=>t.kind==="list"&&t.count!=="range",css:`
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
  `,render(t){const e=Bt(t)&&s`<input type="search" part="search" placeholder="${t.placeholder||"search…"}" />`;return s`${e}<div part="options">${P(t,"option",{iconsOnly:!0})}</div>`},events(t,e){tt(t,e);const r=ft(n=>t.source.search(n),qt);t.track(r.cancel),e.$(t.root).on("input",n=>{n.target===t.part("search").node&&(t.valueType.list?.query?r(n.target.value):H(t,n.target.value))})},update(t){const e=t.part("options").node,r=t.options.map(n=>n.value).join(`
`);if(e.dataset.signature!==r){e.dataset.signature=r;const n=t.part("search").node;n?.value&&!t.valueType.list?.query&&H(t,n.value)}Q(t,A(t))},role:D.role,focus:t=>t.part("search").node??t.root.querySelector('[data-value][tabindex="0"]')},y=(t,e)=>t.root.querySelector(`[data-color="${e}"]`),N=t=>[...t.root.querySelectorAll('[part~="patterns"] [data-pattern]')],d=t=>t.dataset.pattern==="none"?"":t.dataset.pattern,G=(t,e,r="swatch")=>s`
  <button type="button" part="${r}" data-pattern="${t}" ...${p({"aria-label":e,title:e})}><span></span></button>
`;function Vt(t,e){const r=e.map(i=>i.id),n=t.getAttribute("patterns")?.trim();return n?n.split(/\s+/).filter(i=>r.includes(i)):r}async function Pt(t){const{use:e}=await K(async()=>{const{use:r}=await import("./index-BFdBVABv.js").then(n=>n.i);return{use:r}},__vite__mapDeps([0,1,2]),import.meta.url);for(const r of t.root.querySelectorAll("[data-pattern] > span")){const n=d(r.parentElement);!n||r.dataset.painted===n||(r.dataset.painted=n,e(n).image().then(i=>{d(r.parentElement)===n&&r.style.setProperty("--swatch",i)}).catch(()=>{}))}}function C(t,e){const r=t.part("opacity").node,n=t.hasAttribute("colors");t.setValue(bt({bg:n?y(t,"bg").value:null,fg:n?y(t,"fg").value:null,id:e,opacity:r?Number(r.value)/100:null}))}function Dt(t){t._swatches||(t._swatches=[],K(async()=>{const{list:e}=await import("./index-BFdBVABv.js").then(r=>r.i);return{list:e}},__vite__mapDeps([0,1,2]),import.meta.url).then(({list:e})=>{const r=e(),n=Object.fromEntries(r.map(o=>[o.id,o.name])),i=t.hasAttribute("required")?[]:[["none","none"]];t._swatches=[...i,...Vt(t,r).map(o=>[o,n[o]??o])],t.update()}))}function W(t,e){const r=t.part("patterns").node;e?(r.showPopover(),Y(r,t.part("current").node),r.querySelector('[tabindex="0"]')?.focus()):r.hidePopover()}const It={fits:t=>t.type==="pattern",css:`
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
  `,render(t){const e=t.hasAttribute("opacity"),r=t.hasAttribute("colors");return s`
      ${G("none","pattern","current")}
      ${e&&s`<input type="range" part="opacity" min="0" max="100" step="1" aria-label="opacity" />`}
      ${r&&s`
        <span part="colors">
          <input type="color" part="color" data-color="fg" aria-label="pattern color" />
          <input type="color" part="color" data-color="bg" aria-label="background color" />
        </span>`}
      <div part="patterns" popover="auto" role="radiogroup" aria-label="patterns">${(t._swatches??[]).map(([n,i])=>G(n,i))}</div>
    `},events(t,e){e.on("click",'[part~="current"]',()=>W(t,!t.part("patterns").matches(":popover-open"))),e.on("click",'[part~="patterns"] [data-pattern]',(n,i)=>{C(t,d(i)),W(t,!1),t.part("current").focus()}),e.$(t.root).on("keydown",n=>{const o={ArrowDown:1,ArrowLeft:-1,ArrowRight:1,ArrowUp:-1}[n.key],a=N(t),l=a.indexOf(n.target);if(!o||l<0)return;n.preventDefault();const c=a[(l+o+a.length)%a.length];c.focus(),C(t,d(c))});const r=()=>{const n=N(t).map(d).find(Boolean)??"";C(t,M(t.value).id||n)};e.$(t.root).on("change",n=>{n.target.matches('[part~="opacity"], [part~="color"]')&&r()})},update(t){Dt(t);const e=M(t.value),r=t.part("current").node;r.dataset.pattern=e.id||"none";const n=t.part("opacity").node;n&&n!==t.focused&&(n.value=String(Math.round((e.opacity??.1)*100))),t.hasAttribute("colors")&&(y(t,"fg").value=e.fg??"#000000",y(t,"bg").value=e.bg??"#ffffff");const i=N(t),o=i.find(a=>d(a)===e.id)??i[0];for(const a of i)a.setAttribute("aria-checked",String(d(a)===e.id)),a.tabIndex=a===o?0:-1;r.title=o?.title??"",Pt(t)},focus:t=>t.part("current").node},jt={...D,fits:t=>t.kind==="list"&&t.count!=="range",css:`
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
  `,render:t=>P(t,"option",{mark:!0})},Rt={...D,fits:t=>t.kind==="list"&&t.count!=="range",css:`
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
  `,render:t=>P(t,"segment")},T=(t,[e,r])=>(t-e)/(r-e||1)*100;function Mt(t){const[e,r]=t.bounds;return t.values.map((n,i)=>n===""?i===1?r:e:Math.min(r,Math.max(e,t.toNumber(n))))}const Ft={fits:t=>t.kind==="free"&&t.axis&&t.count!=="multiple",css:`
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
  `,render(t){const e=t.count==="range",[r,n]=t.bounds,i=t.stepSize,o=t.getAttr("unit"),a=l=>s`
      <span part="thumb" data-thumb="${l}"></span>
      <input type="range" part="input" data-index="${l}" ...${p({"aria-label":e&&(l?"to":"from"),max:n,min:r,step:i})} />
    `;return s`
      <span part="${t.typeName==="color"?"track hue":"track"}">
        <span part="fill"></span>
        ${a(0)}
        ${e&&a(1)}
      </span>
      ${t.getAttr("readout")&&s`<output part="output"></output>`}
      ${o&&s`<small part="unit">${o}</small>`}
    `},events(t,e){e.on("input",'input[type="range"]',(r,n)=>t.setNumber(Number(n.dataset.index),Number(n.value),{track:!0}))},update(t){const e=t.bounds,r=Mt(t),n=t.values,i=t.count==="range";for(const c of t.root.querySelectorAll('input[type="range"]'))c.disabled=t.isLocked,c!==t.focused&&(c.value=String(r[Number(c.dataset.index)]));for(const c of t.root.querySelectorAll("[data-thumb]"))c.style.setProperty("--at",T(r[Number(c.dataset.thumb)],e));const o=t.part("track").node;o.style.setProperty("--from",i?T(r[0],e):0),o.style.setProperty("--to",T(r[i?1:0],e));const a=r.map((c,h)=>n[h]||t.fromNumber(c)),l=t.part("output").node;l&&(l.textContent=i?a.join(" – "):a[0]),t.setVar("--slider-color",t.typeName==="color"&&a[0])},focus:t=>t.root.querySelector('input[type="range"]')},Ut={fits:t=>t.kind==="free"&&t.count==="single"&&t.steppable,css:`
    ${g}
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
  `,render:t=>s`
    <button type="button" part="button decrement" data-step="-1" aria-label="less" tabindex="-1"><svg-icon icon="lucide:minus"></svg-icon></button>
    ${v(t)}
    <button type="button" part="button increment" data-step="1" aria-label="more" tabindex="-1"><svg-icon icon="lucide:plus"></svg-icon></button>
  `,events(t,e){x(t,e),e.on("click","[data-step]",(r,n)=>t.step(Number(n.dataset.step))),e.$(t.root).on("keydown",r=>{r.key!=="ArrowUp"&&r.key!=="ArrowDown"||(r.preventDefault(),t.step(r.key==="ArrowUp"?1:-1))})},update:w,focus:V},Ht={fits:t=>t.kind==="free"&&t.count==="single"&&t.type==="color",css:`
    ${g}
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
  `,render:t=>s`
    <span part="swatch"><input type="color" data-index="0" aria-label="pick a color" /></span>
    ${v(t,0,{spellcheck:!1,type:"text"})}
  `,events:x,update(t){w(t),t.setVar("--swatch",t.valueType.format(t.value))},focus:t=>t.part("input").node},Gt={fits:E,events:B,update:_,css:`
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
  `,render:t=>q(t,s`<span part="track"><span part="thumb"></span></span>`,"switch"),focus:t=>t.part("control").node},I={button:xt,checkbox:wt,chips:At,combobox:Ct,cycle:Lt,field:Ot,fields:Et,grid:_t,pattern:It,radio:jt,segments:Rt,slider:Ft,stepper:Ut,swatch:Ht,switch:Gt},Wt=["field","fields","chips","combobox","switch"];function Kt(t,...e){for(const r of[...e,...Wt])if(r&&I[r]?.fits(t))return r;return"field"}const L=new Map;function Yt(t){if(!L.has(t)){const e=new CSSStyleSheet;e.replaceSync(lt(I[t].css)),e.isLookSheet=!0,L.set(t,e)}return L.get(t)}class Xt{constructor(e,r){this.host=e,this.onChange=r,this.query="",this.fetched=[],this.listed=[]}get all(){return[...yt(this.host),...this.fetched,...this.listed]}refresh(){this.refreshSrc(),this.refreshList()}search(e){this.query=String(e??"").trim(),this.refreshList()}refreshSrc(){const e=this.host.getAttribute("src");if(e===this.src||(this.src=e,this.fetched=[],!e))return;const r=n=>{this.src===e&&(this.fetched=n,this.onChange())};ht(e).then(n=>r(kt(n))).catch(n=>{console.warn(`[${this.host.localName}] could not load options from "${e}":`,n),r([])})}refreshList(){const e=this.host,r=e.valueType;if(!r.list){this.key="",this.listed=[];return}const n=vt(e),i=[e.typeName,n,this.query];for(const l of r.attributes??[])i.push(e.getAttribute(l));const o=i.join("|");if(o===this.key)return;this.key=o;const a=l=>{this.key===o&&(this.listed=l,this.onChange())};Promise.resolve(r.list.entries(e,n,this.query)).then(a).catch(l=>{console.warn(`[${e.localName}] could not build the ${e.typeName} list:`,l),a([])})}}const O={multiple:",",range:".."};function Zt(t,e){const r=t??"";if(e==="single")return[r];const n=r?r.split(O[e]).map(i=>i.trim()):[];return e==="range"?[n[0]??"",n[1]??""]:n.filter(Boolean)}function Jt(t,e){return e==="single"?t[0]??"":e==="range"?t.some(Boolean)?t.map(r=>r??"").join(O.range):"":t.filter(Boolean).join(O.multiple)}const Qt=`
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
`;class j extends ct{static shadow={delegatesFocus:!0};static attr={...mt,actions:String,autocomplete:String,icon:String,iconChecked:String,iconsOnly:Boolean,look:String,max:String,maxlength:Number,min:String,minlength:Number,multiple:Boolean,pattern:String,placeholder:String,range:Boolean,readout:{type:Boolean,default:!0},searchable:Boolean,src:String,step:Number,type:String,unit:String};static styles=Qt;static type=null;constructor(){super(),this.source=new Xt(this,()=>this.update())}get typeName(){return this.constructor.type??this.getAttr("type")??"text"}get valueType(){return gt(this.typeName)}get type(){return this.typeName==="bool"?"checkbox":this.typeName}get count(){return this.typeName==="bool"?"single":this.getAttr("multiple")?"multiple":this.getAttr("range")&&!this.isList?"range":"single"}get options(){return this.source.all}get isList(){return!!(this.valueType.list||this.getAttr("src")||this.options.length)}get kind(){return this.typeName==="bool"?"bool":this.isList?"list":"free"}get shape(){const e=this.valueType;return{axis:!!e.axis,count:this.count,kind:this.kind,steppable:!!e.axis&&e.steppable!==!1,type:this.typeName}}get askedLook(){return this._ownLook?null:this.getAttribute("look")}get look(){return Kt(this.shape,this.askedLook,this.valueType.look)}get lookModule(){return I[this.look]}reflectAttrs(){if(super.reflectAttrs(),this.getAttribute("look")!==null&&!this._ownLook)return this;const e=this.look;if(this._ownLook=!0,this.getAttribute("look")===e)return this;this._reflecting=!0;try{this.setAttribute("look",e)}finally{this._reflecting=!1}return this}onAttributeChanged(e){e==="look"&&(this._ownLook=!1)}adoptLook(){const e=Yt(this.look),r=this.shadowRoot;r.adoptedStyleSheets.includes(e)||(r.adoptedStyleSheets=[...r.adoptedStyleSheets.filter(n=>!n.isLookSheet),e])}bindWhile(e,r,n){const i=this._bound??={};if(i[e]?.key===r)return;i[e]?.controller.abort();const o=new AbortController;i[e]={key:r,controller:o},n?.(this.self.until(o.signal))}get values(){return Zt(this.getAttribute("value"),this.count)}parseValue(e){return e==null?"":String(e)}formatValue(e){return st(e)?Jt(e,this.count):e==null?"":String(e)}get typedValue(){const e=this.valueType,r=this.values.map(n=>n===""?null:e.parse(n));return this.count==="single"?r[0]:r}get formValue(){if(this.count!=="multiple")return super.formValue;const e=this.getAttr("name"),r=this.values;if(!r.length)return null;if(!e)return this.value;const n=new FormData;for(const i of r)n.append(e,i);return n}get isLocked(){return this.disabled||!!this.getAttr("readonly")}setValue(e){return this.isLocked?this:this.commit(e)}setPart(e,r,{final:n=!1}={}){const i=this.values;return i[e]=n?this.normalize(r):String(r??""),this.setValue(n&&this.count==="range"?this.order(i):i)}normalize(e){const r=String(e??"").trim();return this.valueType.normalize?.(r)??r}order(e){const[r,n]=e;return r&&n&&this.toNumber(r)>this.toNumber(n)?[n,r]:e}add(e){const r=this.normalize(String(e??"").replaceAll(","," "));return r&&!this.values.includes(r)?this.setValue([...this.values,r]):this}removeAt(e){return this.setValue(this.values.filter((r,n)=>n!==e))}toNumber(e){const r=this.valueType;return r.axis.toNumber(r.parse(e))}fromNumber(e,r){const n=this.valueType;return n.format(n.axis.fromNumber(e,r))}get limits(){const{max:e,min:r}=this.getAttr();return[r===void 0?-1/0:this.toNumber(r),e===void 0?1/0:this.toNumber(e)]}get bounds(){const[e,r]=this.valueType.axis?.bounds??[0,100],{max:n,min:i}=this.getAttr();return[i===void 0?e:this.toNumber(i),n===void 0?r:this.toNumber(n)]}get stepSize(){return this.getAttr("step")||this.valueType.axis?.step||1}setNumber(e,r,{track:n=!1}={}){const[i,o]=n?this.bounds:this.limits,a=this.values;return a[e]=this.fromNumber(Math.min(o,Math.max(i,Number(r)||0)),a[e]),this.count==="range"&&(a[0]||=this.fromNumber(this.bounds[0]),a[1]||=this.fromNumber(this.bounds[1])),this.setValue(this.count==="range"?this.order(a):a)}step(e,r=0){const n=this.values[r]??"",[i]=this.limits,o=n===""?Number.isFinite(i)?i:0:this.toNumber(n);return this.setNumber(r,o+e*this.stepSize)}get selected(){return new Set(this.values.filter(Boolean))}select(e){if(this.count!=="multiple")return this.setValue(e);const r=this.selected;return r.has(e)?r.delete(e):r.add(e),this.setValue([...r])}cycle(e=1){const r=this.options.filter(o=>!o.disabled);if(!r.length)return this;const n=r.findIndex(o=>o.value===this.value),i=n<0?e>0?-1:0:n;return this.select(r[((i+e)%r.length+r.length)%r.length].value)}get checked(){return this.getAttribute("value")==="true"}set checked(e){this.commit(e?"true":"",{notify:!1})}toggle(){return this.setValue(this.checked?"":"true")}get actions(){return this.getAttr("actions")??this.valueType.actions??""}get placeholder(){return this.getAttr("placeholder")??this.valueType.placeholder??""}get iconName(){const e=this.getAttr("icon");return e==="false"?null:e||this.valueType.icon||null}actionText(){return this.value}actionTarget(){return this.isLocked?null:this.focusTarget}revealTarget(){return this.focusTarget}get focusTarget(){return this.lookModule?.focus?.(this)??this.root.querySelector("input, button")}captureDefaults(){return this.typeName==="bool"&&this.hasAttribute("checked")&&!this.hasAttribute("value")&&this.setAttribute("value","true"),super.captureDefaults()}onConnected(){this.$(this.root).on("input beforeinput",r=>r.stopPropagation());const e=new MutationObserver(r=>{r.some(n=>n.target!==this)&&this.update()});if(e.observe(this,{attributes:!0,childList:!0,subtree:!0,attributeFilter:["value","label","icon","disabled","selected"]}),this.track(()=>e.disconnect()),!this.hasAttribute("value")){const r=this.options.filter(n=>n.selected).map(n=>n.value);r.length&&(this.commit(this.count==="multiple"?r:r[0],{notify:!1}),this._defaultValue=this.getAttribute("value")??"")}}onDisconnected(){this._bound=null}update(){return this._mounted&&this.source.refresh(),super.update()}render(){return s`<div part="box">${this.lookModule.render(this)}</div>`}sync(){super.sync();const e=this.lookModule;this.adoptLook(),this.bindWhile("look",this.look,r=>e.events?.(this,r)),this.bindWhile("type",this.typeName,r=>this.valueType.setup?.(this,r)),this.internals&&(this.internals.role=e.role?.(this)??null),e.update?.(this)}}const te={"input-bool":"bool","input-color":"color","input-country":"country","input-currency":"currency","input-date":"date","input-datetime":"datetime","input-duration":"duration","input-email":"email","input-emoji":"emoji","input-font":"font","input-hotkey":"hotkey","input-icon":"icon","input-language":"language","input-locale":"locale","input-number":"number","input-password":"password","input-pattern":"pattern","input-phone":"phone","input-search":"search","input-slug":"slug","input-text":"text","input-time":"time","input-timezone":"timezone","input-unit":"unit","input-url":"url","input-year":"year"},S={"input-value":j};for(const[t,e]of Object.entries(te))S[t]=class extends j{static type=e};S["input-chips"]=class extends j{static attr={multiple:{type:Boolean,default:!0},suggestions:String};static type="text";accept=null;suggest=null;transform=null;suggested=[];get suggestionList(){const t=String(this.getAttr("suggestions")??"").split(",").map(e=>e.trim()).filter(Boolean);return[...new Set([...t,...this.suggested])].filter(e=>!this.values.includes(e))}verdict(t){const e=this.getAttr("pattern");if(e&&!new RegExp(`^(?:${e})$`,"u").test(t))return"does not match the pattern";const r=this.accept?.(t)??!0;return r===!1?"not accepted":r}add(t){const e=String(t??"").replaceAll(","," ").trim(),r=this.normalize(this.transform?this.transform(e):e);if(!r)return this;const n=this.verdict(r);if(n!==!0){const i=this.part("input").node;return i?.setCustomValidity(String(n)),i?.reportValidity(),this.emit("input-chips-refused",{reason:n,text:r}),this}return super.add(r)}};for(const[t,e]of Object.entries(S))e.init(t);const be=Object.keys(S);export{S as ELEMENTS,be as TAGS};
