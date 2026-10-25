var o=Object.defineProperty;var d=(i,t,e)=>t in i?o(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var r=(i,t)=>o(i,"name",{value:t,configurable:!0});var l=(i,t,e)=>d(i,typeof t!="symbol"?t+"":t,e);import"./app-area-Ozqq4aKH.js";import"./app-view-CgxomItw.js";import{a as c,s as u}from"./index-HgPxnqYB.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const p=["density","geometry","palette","scheme"],g=r(()=>globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches,"reducedMotion"),s=class s extends c{static styles(){return`app-root {
      display: block;

      &:has(> app-area) {
        display       : grid;
        grid-template :
          "start main   end" minmax(0, 1fr)
          "start bottom end" auto
          / auto minmax(0, 1fr) auto;
      }

      &:has(> app-area[dock="bottom"][peek]:state(overlay)) { padding-block-end: var(--area-peek, 1.75rem); }

      &:not([loading]) > [data-loading] { display: none; }

      &[loading] > [data-loading] {
        background : var(--color-bg);
        inset      : 0;
        position   : fixed;
        z-index    : var(--app-loading-z, 1000);
      }

      &[loading]:not(:has(> [data-loading]))::before,
      &[loading]:not(:has(> [data-loading]))::after {
        content  : '';
        position : fixed;
        z-index  : var(--app-loading-z, 1000);
      }

      &[loading]:not(:has(> [data-loading]))::before {
        background : var(--color-bg);
        inset      : 0;
      }

      &[loading]:not(:has(> [data-loading]))::after {
        animation        : spin 0.8s linear infinite;
        block-size       : 2em;
        border           : 2px solid var(--color-ink);
        border-radius    : 50%;
        border-top-color : transparent;
        inline-size      : 2em;
        inset            : calc(50% - 1em) auto auto calc(50% - 1em);
      }
    }`}get views(){return[...this.querySelectorAll("app-view")].filter(t=>t.closest("app-root")===this)}get view(){return this.views.find(t=>t.active)??null}get areas(){return[...this.children].filter(t=>t.localName==="app-area")}area(t){return this.areas.find(e=>e.getAttr("name")===t)??null}show(t,e){return this.views.find(a=>a.getAttr("name")===t)?.activate(e)}ready(){if(!this.hasAttribute("loading"))return Promise.resolve();const t=r(()=>{this.removeAttribute("loading"),this.emit("ready")},"done");return!document.startViewTransition||g()?Promise.resolve(t()):document.startViewTransition(t).finished}onConnected(){this.$(window).on("hashchange",()=>{this.getAttr("routing")==="hash"&&this.follow()}),this.$(window).on("popstate",()=>{this.getAttr("routing")==="path"&&this.follow()}),this.start()}start(){if(!this.views.length){const t=new MutationObserver(()=>{this.views.length&&(t.disconnect(),this.start())});t.observe(this,{childList:!0,subtree:!0}),this.track(()=>t.disconnect());return}this.follow({transition:!1}),this.view||this.views[0]?.activate({history:!1,transition:!1})}onAttributeChanged(t){t==="skin"&&this.applySkin()}sync(){for(const t of p){const e=this.getAttr(t);e?this.dataset[t]=e:delete this.dataset[t]}this._skinApplied||this.applySkin()}applySkin(){this._skinApplied=!0;const t=this.getAttr("skin");t&&(document.documentElement.dataset.skin=t,u(t))}get path(){const t=this.getAttr("routing");if(t==="hash")return location.hash.slice(1)||"/";if(t==="path"){const e=(this.getAttr("base")??"").replace(/\/$/,"");return(location.pathname.startsWith(e)?location.pathname.slice(e.length):location.pathname)||"/"}return null}follow(t={}){const e=this.path;if(e==null)return;const a=this.views.find(h=>h.getAttr("route")===e);a&&!a.active&&a.activate({...t,history:!1})}remember(t){const e=t.getAttr("route"),a=this.getAttr("routing");!e||e===this.path||(a==="hash"&&history.pushState(null,"",`#${e}`),a==="path"&&history.pushState(null,"",`${(this.getAttr("base")??"").replace(/\/$/,"")}${e}`))}};r(s,"AppRoot"),l(s,"attr",{base:String,density:String,geometry:String,loading:Boolean,palette:String,routing:{type:String,default:"hash",values:["hash","none","path"]},scheme:String,skin:String,transition:{type:String,default:"fade"}});let n=s;for(const i of Object.keys(n.attr)){const t=i;Object.defineProperty(n.prototype,i,{configurable:!0,get(){return this.getAttr(t)},set(e){e===!1||e==null?this.removeAttribute(t):this.setAttribute(t,e===!0?"":String(e))}})}n.init("app-root");export{n as AppRoot,n as default};
