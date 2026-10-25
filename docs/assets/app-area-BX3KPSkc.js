var k=Object.defineProperty;var w=(s,t,e)=>t in s?k(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var i=(s,t)=>k(s,"name",{value:t,configurable:!0});var v=(s,t,e)=>w(s,typeof t!="symbol"?t+"":t,e);import{a as O}from"./index-Ce0Fc_FP.js";import"https://esm.sh/jsr/@pulgasari/is";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const g=64,n=class n extends O{static styles(){return`
    :host {
      --area-border : var(--border, 1px solid color-mix(in oklab, currentColor 20%, transparent));
      --area-peek   : 1.75rem;
      --area-size   : min(20rem, 85vw);
      --area-z      : 100;

      box-sizing     : border-box;
      display        : flex;
      flex-direction : column;
      min-block-size : 0;
      min-inline-size: 0;
    }

    :host([hidden]) { display: none; }

    [part="scrim"]  { display: none; }
    [part="handle"] { display: none; }

    [part="content"] {
      display        : flex;
      flex           : 1 1 auto;
      flex-direction : column;
      min-block-size : 0;
      overflow       : auto;
    }

    :host([dock="none"]) {
      grid-area : main;
      position  : relative;

      [part="sheet"]   { display: contents; }
      [part="content"] { overflow: hidden; }
    }

    ::slotted(app-view[active]) {
      flex           : 1 1 auto;
      min-block-size : 0;
      overflow       : auto;
    }

    :host([dock="start"])  { grid-area: start;  }
    :host([dock="end"])    { grid-area: end;    }
    :host([dock="bottom"]) { grid-area: bottom; }

    :host(:not([dock="none"], [open], [peek])) { display: none; }

    [part="sheet"] {
      background-color : var(--color-bg);
      box-sizing       : border-box;
      display          : flex;
      flex-direction   : column;
      min-block-size   : 0;
      position         : relative;
    }

    :host([dock="start"]:not(:state(overlay))) [part="sheet"] { border-inline-end: var(--area-border); flex: 1 1 auto; inline-size: var(--area-size); }
    :host([dock="end"]:not(:state(overlay)))   [part="sheet"] { border-inline-start: var(--area-border); flex: 1 1 auto; inline-size: var(--area-size); }
    :host([dock="bottom"]:not(:state(overlay))) [part="sheet"] { border-block-start: var(--area-border); max-block-size: var(--area-size); }

    :host([dock="start"]:not(:state(overlay))[expanded]),
    :host([dock="end"]:not(:state(overlay))[expanded]) { --area-size: var(--area-expanded-size, 50vw); }

    :host([dock="bottom"]) { --area-size: 40dvh; }
    :host([dock="bottom"]:not(:state(overlay))[expanded]) { --area-size: var(--area-expanded-size, 70dvh); }

    :host([dock="bottom"]:not([open])[peek]:not(:state(overlay))) [part="content"] { display: none; }

    :host(:state(overlay)) {
      inset          : 0;
      pointer-events : none;
      position       : fixed;
      z-index        : var(--area-z);
    }

    :host(:state(overlay)) [part="scrim"] {
      background-color : var(--area-scrim, rgb(0 0 0 / 0.45));
      display          : block;
      inset            : 0;
      opacity          : 0;
      position         : absolute;
      transition       : opacity 0.25s ease;
    }

    :host(:state(overlay)[open]) { z-index: calc(var(--area-z) + 1); }

    :host(:state(overlay)[open]) [part="scrim"] { opacity: 1; pointer-events: auto; }

    :host(:state(overlay)) [part="sheet"] {
      box-shadow     : 0 0 1.5rem rgb(0 0 0 / 0.25);
      pointer-events : auto;
      position       : absolute;
      transition     : translate 0.25s ease, inline-size 0.25s ease, block-size 0.25s ease;
    }

    :host(:state(dragging)) [part="sheet"] { transition: none; }

    :host(:state(overlay)[dock="start"]) [part="sheet"] { inset-block: 0; inset-inline-start: 0; inline-size: var(--area-size); translate: -100% 0; }
    :host(:state(overlay)[dock="end"])   [part="sheet"] { inset-block: 0; inset-inline-end: 0;   inline-size: var(--area-size); translate:  100% 0; }

    :host(:state(overlay)[dock="bottom"]) [part="sheet"] {
      border-start-end-radius   : var(--radius-surface, 1rem);
      border-start-start-radius : var(--radius-surface, 1rem);
      inset-block-end           : 0;
      inset-inline              : 0;
      max-block-size            : 85dvh;
      translate                 : 0 100%;
    }

    :host(:state(overlay)[dock="bottom"][peek]:not([open])) [part="sheet"] { translate: 0 calc(100% - var(--area-peek)); }

    :host(:state(overlay)[open]) [part="sheet"] { translate: 0 0; }

    :host(:state(overlay)[expanded]:not([dock="bottom"])) [part="sheet"] { inline-size: 100vw; }
    :host(:state(overlay)[expanded][dock="bottom"])       [part="sheet"] { block-size: 100dvh; border-radius: 0; max-block-size: 100dvh; }

    :host(:state(overlay)) [part="handle"],
    :host([dock="bottom"][peek]) [part="handle"] {
      cursor       : grab;
      display      : block;
      flex         : none;
      position     : relative;
      touch-action : none;

      &::after {
        background-color : currentColor;
        border-radius    : 999px;
        content          : '';
        inset            : 50% auto auto 50%;
        opacity          : 0.35;
        position         : absolute;
        translate        : -50% -50%;
      }
    }

    :host([dock="bottom"]) [part="handle"] {
      block-size : var(--area-peek);
      &::after   { block-size: 0.25rem; inline-size: 2.5rem; }
    }

    :host(:state(overlay):not([dock="bottom"])) [part="handle"] {
      inline-size : 1rem;
      inset-block : 0;
      position    : absolute;
      z-index     : 1;
      &::after    { block-size: 2.5rem; inline-size: 0.25rem; }
    }

    :host(:state(overlay)[dock="start"]) [part="handle"] { inset-inline-end: 0; }
    :host(:state(overlay)[dock="end"])   [part="handle"] { inset-inline-start: 0; }

    @media (prefers-reduced-motion: reduce) {
      [part="scrim"], [part="sheet"] { transition: none !important; }
    }
    `}render(){return`
      <div part="scrim"></div>
      <div part="sheet">
        <div part="handle" role="button" tabindex="-1" aria-label="toggle"></div>
        <div part="content"><slot></slot></div>
      </div>
    `}get docked(){return this.getAttr("dock")!=="none"}get isOverlay(){return this.states.has("overlay")}get appRoot(){return this.closest("app-root")}show(){return this.toggle(!0)}hide(){return this.toggle(!1)}toggle(t=!this.open){return!this.docked||!!t===this.open?this:(t&&this.closeOtherDrawers(),this.toggleAttribute("open",!!t),t||this.toggleAttribute("expanded",!1),this)}expand(t=!this.expanded){return this.docked?(t&&!this.open&&this.closeOtherDrawers(),this.toggleAttribute("expanded",!!t),t&&this.toggleAttribute("open",!0),this):this}onConnected(){this.watchBreakpoint(),this.part("scrim").onClick(()=>this.hide()),this.parts("handle").onPointerDown(t=>this.drag(t)),this.$(document).onKeyDown(t=>{t.key==="Escape"&&this.isOverlay&&this.open&&!t.defaultPrevented&&this.hide()})}onDisconnected(){this.setOthersInert(!1)}onAttributeChanged(t){(t==="breakpoint"||t==="dock"||t==="overlay")&&this.watchBreakpoint()}sync(){const t=this.open,e=this.shadowRoot.querySelector('[part="content"]');e&&(e.inert=this.docked&&!t);const o=`${t}:${this.expanded}`;this._state!=null&&this._state!==o&&this.emit("toggle",{expanded:this.expanded,open:t}),this._state=o,this.setOthersInert(this.isOverlay&&t)}watchBreakpoint(){this._media?.();const t=this.getAttr("overlay"),e=i(a=>{this.states.toggle("overlay",a&&this.docked),this.update()},"set");if(t!=="auto"){this._media=null,e(t==="always");return}const o=globalThis.matchMedia?.(`(width < ${this.getAttr("breakpoint")})`),r=i(()=>e(!!o?.matches),"change"),d=i(()=>o?.removeEventListener("change",r),"stop");o?.addEventListener("change",r),this.track(d),this._media=d,e(!!o?.matches)}closeOtherDrawers(){if(this.isOverlay)for(const t of this.appRoot?.areas??[])t!==this&&t.isOverlay&&t.open&&t.hide()}setOthersInert(t){const e=this.appRoot;if(e){if(t&&!this._inerted){this._inerted=[...e.children].filter(o=>o!==this&&!o.inert);for(const o of this._inerted)o.inert=!0}else if(!t&&this._inerted){for(const o of this._inerted)o.inert=!1;this._inerted=null}}}drag(t){const e=this.shadowRoot.querySelector('[part="sheet"]'),o=this.getAttr("dock"),r=o==="bottom"?"y":"x",d=o==="start"?-1:1,a=t.target,y=r==="y"?t.clientY:t.clientX;let c=0;const f=r==="y"?e.offsetHeight:e.offsetWidth,x=o==="bottom"&&this.getAttr("peek")?a.offsetHeight:0,u=(f-x)*d,z=this.open?0:u;a.setPointerCapture(t.pointerId),this.states.add("dragging");const b=i(l=>{if(c=(r==="y"?l.clientY:l.clientX)-y,!this.isOverlay)return;const m=Math.min(Math.max(z+c,Math.min(0,u)),Math.max(0,u));e.style.translate=r==="y"?`0 ${m}px`:`${m}px 0`},"move"),p=i(()=>{a.removeEventListener("pointermove",b),a.removeEventListener("pointerup",p),a.removeEventListener("pointercancel",p),this.states.delete("dragging"),e.style.translate="";const l=c*d;Math.abs(c)<4?this.toggle():l>g?this.expanded?this.expand(!1):this.hide():l<-g&&(this.open&&o==="bottom"?this.expand(!0):this.show())},"end");a.addEventListener("pointermove",b),a.addEventListener("pointerup",p),a.addEventListener("pointercancel",p)}};i(n,"AppArea"),v(n,"shadow",!0),v(n,"attr",{breakpoint:{type:String,default:"48rem"},dock:{type:String,default:"none",values:["bottom","end","none","start"]},expanded:Boolean,name:String,open:Boolean,overlay:{type:String,default:"auto",values:["always","auto","never"]},peek:Boolean}),v(n,"reflect",["dock","overlay"]);let h=n;for(const s of Object.keys(h.attr))Object.defineProperty(h.prototype,s,{configurable:!0,get(){return this.getAttr(s)},set(t){t===!1||t==null?this.removeAttribute(s):this.setAttribute(s,t===!0?"":String(t))}});h.init("app-area");export{h as AppArea,h as default};
