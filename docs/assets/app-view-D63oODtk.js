import{a as p}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const v=()=>globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches,h=e=>[...e.parentElement?.children??[]].filter(t=>t.localName===e.localName);class f extends p{static attr={active:Boolean,lazy:Boolean,name:String,route:String,transitionOff:String,transitionOn:String};static styles(){return`app-view {
      display: block;

      &:not([active]) {
        content-visibility : hidden;
        position           : absolute;
      }
    }
    ${m}`}get active(){return this.hasAttribute("active")}set active(t){t?this.activate():this.toggleAttribute("active",!1)}get appRoot(){return this.closest("app-root")}onConnected(){this.inert=!this.active,this.active&&this.fill();const t=this.appRoot?.path;t!=null&&!this.active&&this.getAttr("route")===t&&this.activate({history:!1,transition:!1})}onAttributeChanged(t,o,n){if(!(t!=="active"||this._switching)){if(n==null){this.inert=!0;return}this._switching=!0,this.removeAttribute("active"),this._switching=!1,this.activate()}}activate({history:t=!0,transition:o=!0}={}){const n=h(this).find(i=>i!==this&&i.active)??null;if(this.active&&!n)return Promise.resolve();const s=this.appRoot,a=()=>{for(const i of h(this))i!==this&&i.hide();this.show()};t&&this.getAttr("route")&&s?.remember?.(this);const r=o?u({from:n,root:s,swap:a,to:this}):Promise.resolve(a());return s?.emit?.("navigate",{from:n?.getAttr("name")??null,to:this.getAttr("name")??null}),r}show(){this._switching=!0,this.setAttribute("active",""),this._switching=!1,this.inert=!1,this.fill(),this.emit("activate")}hide(){this.active&&(this._switching=!0,this.removeAttribute("active"),this._switching=!1,this.inert=!0,this.emit("deactivate"))}fill(){if(!this.getAttr("lazy")||this._filled)return;const t=this.querySelector(":scope > template");t&&(this._filled=!0,this.append(t.content.cloneNode(!0)))}}const l="app-view-out",c="app-view-in";function u({from:e,root:t,swap:o,to:n}){const s=t?.getAttr?.("transition")??"fade",a=n.getAttr("transitionOn")??s,r=e?.getAttr("transitionOff")??s;if(!document.startViewTransition||v()||a==="none"&&r==="none")return o(),Promise.resolve();const i=document.documentElement;return i.style.setProperty("--app-view-on",a==="none"?"none":a),i.style.setProperty("--app-view-off",r==="none"?"none":r),e&&(e.style.viewTransitionName=l),document.startViewTransition({types:["app-view"],update:()=>{e&&(e.style.viewTransitionName=""),n.style.viewTransitionName=c,o()}}).finished.finally(()=>{n.style.viewTransitionName="",i.style.removeProperty("--app-view-on"),i.style.removeProperty("--app-view-off")})}const m=`
  html:active-view-transition-type(app-view) {
    &::view-transition-old(root),
    &::view-transition-new(root) { animation: none; }

    &::view-transition-group(${c}),
    &::view-transition-group(${l}) { animation-duration: var(--app-view-duration, 0.25s); }

    &::view-transition-new(${c}) {
      --animate-offset : if(style(--app-view-on: glide): 2rem 0; else: 100% 0);
      animation        : var(--app-view-duration, 0.25s) ease both;
      animation-name   : var(--app-view-on, fade);
    }

    &::view-transition-old(${l}) {
      --animate-offset : if(style(--app-view-off: glide): -2rem 0; else: -100% 0);
      animation        : var(--app-view-duration, 0.25s) ease both reverse;
      animation-name   : var(--app-view-off, fade);
    }
  }
`;f.init("app-view");export{f as AppView,f as default,m as transitionStyles};
