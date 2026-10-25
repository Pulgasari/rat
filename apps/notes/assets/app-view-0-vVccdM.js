var v=Object.defineProperty;var s=(i,t)=>v(i,"name",{value:t,configurable:!0});import{a as f}from"./index-SpNlg7Y_.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const u=s(()=>globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches,"reducedMotion"),p=s(i=>[...i.parentElement?.children??[]].filter(t=>t.localName===i.localName),"siblingsOf");class m extends f{static{s(this,"AppView")}static attr={active:Boolean,lazy:Boolean,name:String,route:String,transitionOff:String,transitionOn:String};static styles(){return`app-view {
      display: block;

      &:not([active]) {
        content-visibility : hidden;
        position           : absolute;
      }
    }
    ${w}`}get active(){return this.hasAttribute("active")}set active(t){t?this.activate():this.toggleAttribute("active",!1)}get appRoot(){return this.closest("app-root")}onConnected(){this.inert=!this.active,this.active&&this.fill();const t=this.appRoot?.path;t!=null&&!this.active&&this.getAttr("route")===t&&this.activate({history:!1,transition:!1})}onAttributeChanged(t,r,n){if(!(t!=="active"||this._switching)){if(n==null){this.inert=!0;return}this._switching=!0,this.removeAttribute("active"),this._switching=!1,this.activate()}}activate({history:t=!0,transition:r=!0}={}){const n=p(this).find(e=>e!==this&&e.active)??null;if(this.active&&!n)return Promise.resolve();const a=this.appRoot,o=s(()=>{for(const e of p(this))e!==this&&e.hide();this.show()},"swap");t&&this.getAttr("route")&&a?.remember?.(this);const l=r?d({from:n,root:a,swap:o,to:this}):Promise.resolve(o());return a?.emit?.("navigate",{from:n?.getAttr("name")??null,to:this.getAttr("name")??null}),l}show(){this._switching=!0,this.setAttribute("active",""),this._switching=!1,this.inert=!1,this.fill(),this.emit("activate")}hide(){this.active&&(this._switching=!0,this.removeAttribute("active"),this._switching=!1,this.inert=!0,this.emit("deactivate"))}fill(){if(!this.getAttr("lazy")||this._filled)return;const t=this.querySelector(":scope > template");t&&(this._filled=!0,this.append(t.content.cloneNode(!0)))}}const c="app-view-out",h="app-view-in";function d({from:i,root:t,swap:r,to:n}){const a=t?.getAttr?.("transition")??"fade",o=n.getAttr("transitionOn")??a,l=i?.getAttr("transitionOff")??a;if(!document.startViewTransition||u()||o==="none"&&l==="none")return r(),Promise.resolve();const e=document.documentElement;return e.style.setProperty("--app-view-on",o==="none"?"none":o),e.style.setProperty("--app-view-off",l==="none"?"none":l),i&&(i.style.viewTransitionName=c),document.startViewTransition({types:["app-view"],update:s(()=>{i&&(i.style.viewTransitionName=""),n.style.viewTransitionName=h,r()},"update")}).finished.finally(()=>{n.style.viewTransitionName="",e.style.removeProperty("--app-view-on"),e.style.removeProperty("--app-view-off")})}s(d,"runTransition");const w=`
  html:active-view-transition-type(app-view) {
    &::view-transition-old(root),
    &::view-transition-new(root) { animation: none; }

    &::view-transition-group(${h}),
    &::view-transition-group(${c}) { animation-duration: var(--app-view-duration, 0.25s); }

    &::view-transition-new(${h}) {
      --animate-offset : if(style(--app-view-on: glide): 2rem 0; else: 100% 0);
      animation        : var(--app-view-duration, 0.25s) ease both;
      animation-name   : var(--app-view-on, fade);
    }

    &::view-transition-old(${c}) {
      --animate-offset : if(style(--app-view-off: glide): -2rem 0; else: -100% 0);
      animation        : var(--app-view-duration, 0.25s) ease both reverse;
      animation-name   : var(--app-view-off, fade);
    }
  }
`;m.init("app-view");export{m as AppView,m as default,w as transitionStyles};
