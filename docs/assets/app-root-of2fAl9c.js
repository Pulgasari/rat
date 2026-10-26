var o=Object.defineProperty;var n=(a,t)=>o(a,"name",{value:t,configurable:!0});import"./app-area-BLXBFE8r.js";import"./app-view-CHl1hO0I.js";import{a as l,s as h}from"./index-kAuIywEd.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const d=["density","geometry","palette","scheme"],p=n(()=>globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches,"reducedMotion");class r extends l{static{n(this,"AppRoot")}static attr={base:String,density:String,geometry:String,loading:Boolean,palette:String,routing:{type:String,default:"hash",values:["hash","none","path"]},scheme:String,skin:String,transition:{type:String,default:"fade"}};static styles(){return`app-root {
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
    }`}get views(){return[...this.querySelectorAll("app-view")].filter(t=>t.closest("app-root")===this)}get view(){return this.views.find(t=>t.active)??null}get areas(){return[...this.children].filter(t=>t.localName==="app-area")}area(t){return this.areas.find(e=>e.getAttr("name")===t)??null}show(t,e){return this.views.find(i=>i.getAttr("name")===t)?.activate(e)}ready(){if(!this.hasAttribute("loading"))return Promise.resolve();const t=n(()=>{this.removeAttribute("loading"),this.emit("ready")},"done");return!document.startViewTransition||p()?Promise.resolve(t()):document.startViewTransition(t).finished}onConnected(){this.$(window).on("hashchange",()=>{this.getAttr("routing")==="hash"&&this.follow()}),this.$(window).on("popstate",()=>{this.getAttr("routing")==="path"&&this.follow()}),this.start()}start(){if(!this.views.length){const t=new MutationObserver(()=>{this.views.length&&(t.disconnect(),this.start())});t.observe(this,{childList:!0,subtree:!0}),this.track(()=>t.disconnect());return}this.follow({transition:!1}),this.view||this.views[0]?.activate({history:!1,transition:!1})}onAttributeChanged(t){t==="skin"&&this.applySkin()}sync(){for(const t of d){const e=this.getAttr(t);e?this.dataset[t]=e:delete this.dataset[t]}this._skinApplied||this.applySkin()}applySkin(){this._skinApplied=!0;const t=this.getAttr("skin");t&&(document.documentElement.dataset.skin=t,h(t))}get path(){const t=this.getAttr("routing");if(t==="hash")return location.hash.slice(1)||"/";if(t==="path"){const e=(this.getAttr("base")??"").replace(/\/$/,"");return(location.pathname.startsWith(e)?location.pathname.slice(e.length):location.pathname)||"/"}return null}follow(t={}){const e=this.path;if(e==null)return;const i=this.views.find(s=>s.getAttr("route")===e);i&&!i.active&&i.activate({...t,history:!1})}remember(t){const e=t.getAttr("route"),i=this.getAttr("routing");!e||e===this.path||(i==="hash"&&history.pushState(null,"",`#${e}`),i==="path"&&history.pushState(null,"",`${(this.getAttr("base")??"").replace(/\/$/,"")}${e}`))}}for(const a of Object.keys(r.attr)){const t=a;Object.defineProperty(r.prototype,a,{configurable:!0,get(){return this.getAttr(t)},set(e){e===!1||e==null?this.removeAttribute(t):this.setAttribute(t,e===!0?"":String(e))}})}r.init("app-root");export{r as AppRoot,r as default};
