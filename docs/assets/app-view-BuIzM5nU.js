var f=Object.defineProperty;var d=(i,t,e)=>t in i?f(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var a=(i,t)=>f(i,"name",{value:t,configurable:!0});var u=(i,t,e)=>d(i,typeof t!="symbol"?t+"":t,e);import{a as w}from"./index-CJDrpzke.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const g=a(()=>globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches,"reducedMotion"),m=a(i=>[...i.parentElement?.children??[]].filter(t=>t.localName===i.localName),"siblingsOf"),c=class c extends w{static styles(){return`app-view {
      display: block;

      &:not([active]) {
        content-visibility : hidden;
        position           : absolute;
      }
    }
    ${b}`}get active(){return this.hasAttribute("active")}set active(t){t?this.activate():this.toggleAttribute("active",!1)}get appRoot(){return this.closest("app-root")}onConnected(){this.inert=!this.active,this.active&&this.fill();const t=this.appRoot?.path;t!=null&&!this.active&&this.getAttr("route")===t&&this.activate({history:!1,transition:!1})}onAttributeChanged(t,e,s){if(!(t!=="active"||this._switching)){if(s==null){this.inert=!0;return}this._switching=!0,this.removeAttribute("active"),this._switching=!1,this.activate()}}activate({history:t=!0,transition:e=!0}={}){const s=m(this).find(n=>n!==this&&n.active)??null;if(this.active&&!s)return Promise.resolve();const o=this.appRoot,r=a(()=>{for(const n of m(this))n!==this&&n.hide();this.show()},"swap");t&&this.getAttr("route")&&o?.remember?.(this);const l=e?y({from:s,root:o,swap:r,to:this}):Promise.resolve(r());return o?.emit?.("navigate",{from:s?.getAttr("name")??null,to:this.getAttr("name")??null}),l}show(){this._switching=!0,this.setAttribute("active",""),this._switching=!1,this.inert=!1,this.fill(),this.emit("activate")}hide(){this.active&&(this._switching=!0,this.removeAttribute("active"),this._switching=!1,this.inert=!0,this.emit("deactivate"))}fill(){if(!this.getAttr("lazy")||this._filled)return;const t=this.querySelector(":scope > template");t&&(this._filled=!0,this.append(t.content.cloneNode(!0)))}};a(c,"AppView"),u(c,"attr",{active:Boolean,lazy:Boolean,name:String,route:String,transitionOff:String,transitionOn:String});let h=c;const v="app-view-out",p="app-view-in";function y({from:i,root:t,swap:e,to:s}){const o=t?.getAttr?.("transition")??"fade",r=s.getAttr("transitionOn")??o,l=i?.getAttr("transitionOff")??o;if(!document.startViewTransition||g()||r==="none"&&l==="none")return e(),Promise.resolve();const n=document.documentElement;return n.style.setProperty("--app-view-on",r==="none"?"none":r),n.style.setProperty("--app-view-off",l==="none"?"none":l),i&&(i.style.viewTransitionName=v),document.startViewTransition({types:["app-view"],update:a(()=>{i&&(i.style.viewTransitionName=""),s.style.viewTransitionName=p,e()},"update")}).finished.finally(()=>{s.style.viewTransitionName="",n.style.removeProperty("--app-view-on"),n.style.removeProperty("--app-view-off")})}a(y,"runTransition");const b=`
  html:active-view-transition-type(app-view) {
    &::view-transition-old(root),
    &::view-transition-new(root) { animation: none; }

    &::view-transition-group(${p}),
    &::view-transition-group(${v}) { animation-duration: var(--app-view-duration, 0.25s); }

    &::view-transition-new(${p}) {
      --animate-offset : if(style(--app-view-on: glide): 2rem 0; else: 100% 0);
      animation        : var(--app-view-duration, 0.25s) ease both;
      animation-name   : var(--app-view-on, fade);
    }

    &::view-transition-old(${v}) {
      --animate-offset : if(style(--app-view-off: glide): -2rem 0; else: -100% 0);
      animation        : var(--app-view-duration, 0.25s) ease both reverse;
      animation-name   : var(--app-view-off, fade);
    }
  }
`;h.init("app-view");export{h as AppView,h as default,b as transitionStyles};
