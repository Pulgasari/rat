import{predicates as T,isPlainObject as v,isString as S}from"https://esm.sh/jsr/@pulgasari/is";import{a as _,q as f,c as k,h as u}from"./index-CAN6sJ0x.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const g="fallback",y=(i,t)=>typeof i=="function"?i(t):i;function d(i={}){const t=new Map;function e(s){if(t.has(s))return t.get(s);const r="is"+s.charAt(0).toUpperCase()+s.slice(1);if(t.has(r))return t.get(r);throw new TypeError(`unknown predicate: ${s}`)}function n(...s){const r=s.length<2?s[0]:s[1],a=[];for(const[o,l]of Object.entries(r))o!==g&&a.push([e(o),l]);const m=o=>{for(const[l,h]of a)if(l(o))return y(h,o);return y(r[g],o)};return s.length<2?m:m(s[0])}return n.with=s=>{for(const[r,a]of Object.entries(s)){if(typeof a!="function")throw new TypeError(`not a predicate: ${r}`);t.set(r,a)}return n},Object.defineProperty(n,"predicates",{get:()=>Object.fromEntries(t)}),n.with(i)}const A=d(T);d();const w={error:"lucide:alert-circle",info:"lucide:info",success:"lucide:check-circle-2",warning:"lucide:alert-triangle"},x=["error","warning","warn","success","info"],E=.35,b=i=>i instanceof Error||i!=null&&typeof i=="object"&&S(i.message)&&("stack"in i||"name"in i),O=d(A.predicates).with({isErrorLike:b})({nullish:"",string:i=>i,errorLike:i=>i.message,fallback:String});function $(i,t={}){let e;if(b(i))e={type:"error",message:i,...t};else if(!v(i))e={message:i,...t};else{const n=x.find(s=>s in i);if(n){const{[n]:s,...r}=i;e={type:n,message:s,...r,...t}}else e={...i,...t}}return e.message=O(e.message),e.type==="warn"&&(e.type="warning"),e}const P=`
  [data-pop-toasts] {
    background      : none;
    border          : 0;
    display         : flex;
    flex-direction  : column;
    gap             : --space(small);
    inset           : 1rem 1rem auto auto;
    margin          : 0;
    max-inline-size : min(24rem, calc(100vw - 2rem));
    overflow        : visible;
    padding         : 0;
    pointer-events  : none;
    position        : fixed;
    z-index         : var(--toast-z, 100);
  }
`;class c extends _{static attr={dismissible:Boolean,duration:4e3,heading:String,icon:String,message:String,type:{default:"info",values:["error","info","success","warning"]}};static shadow=!0;static styles=`
    :host {
      align-items           : start;
      column-gap            : --space(small);
      display               : grid;
      grid-template-columns : auto 1fr auto;
      pointer-events        : auto;
    }

    :host([dismissible]) { touch-action: pan-y; }

    [part~="icon"] { grid-row: span 2; line-height: 1.4; }

    [part~="heading"],
    [part~="message"] {
      grid-column     : 2;
      min-inline-size : 0;
      overflow-wrap   : anywhere;
    }

    [part~="heading"] { font-weight: 600; }

    [part~="close"] {
      align-items : center;
      background  : none;
      border      : 0;
      color       : inherit;
      cursor      : pointer;
      display     : inline-flex;
      font        : inherit;
      margin      : 0;
      padding     : 0;
      grid-column : 3;
      grid-row    : 1 / span 2;
    }
  `;static get stack(){let t=document.querySelector("[data-pop-toasts]");return t||(t=document.createElement("section"),f(t,{ariaLive:"polite",dataPopToasts:!0,popover:"manual"}),document.body.append(t)),t}static notify(t,e){const{dismissible:n=!0,duration:s,heading:r,icon:a,message:m,title:o,type:l}=$(t,e),h=document.createElement("pop-toast"),p=this.stack;return f(h,{dismissible:n,duration:s,heading:r??o,icon:a,message:m,type:l}),p.append(h),p.showPopover&&(p.matches(":popover-open")&&p.hidePopover(),p.showPopover()),h}static error(t,e){return this.notify(t,{...e,type:"error"})}static info(t,e){return this.notify(t,{...e,type:"info"})}static success(t,e){return this.notify(t,{...e,type:"success"})}static warning(t,e){return this.notify(t,{...e,type:"warning"})}static warn(t,e){return this.warning(t,e)}onConnected(){k("pop-toast-stack",P),this.on("click",'[part~="close"]',()=>this.dismiss()),this.on("pointerenter",()=>this.stopTimer()),this.on("pointerleave",()=>this.startTimer()),this.on("focusin",()=>this.stopTimer()),this.on("focusout",()=>this.startTimer()),this.onSwipe(),this.startTimer()}onDisconnected(){this.stopTimer()}startTimer(){this._remaining??=this.getAttr("duration"),!(this._timer||this._dismissing||!(this._remaining>0))&&(this._started=Date.now(),this._timer=setTimeout(()=>this.dismiss(),this._remaining))}stopTimer(){this._timer&&(clearTimeout(this._timer),this._timer=null,this._remaining-=Date.now()-this._started)}dismiss(t=1){if(this._dismissing)return this;this._dismissing=!0,this.stopTimer(),this.emit("pop-toast-dismiss");const e=()=>this.remove();if(!this.animate||matchMedia("(prefers-reduced-motion: reduce)").matches)return e(),this;const n=this.style.translate||"0 0";return this.style.translate="",this.animate([{opacity:1,translate:n},{opacity:0,translate:`${t*100}% 0`}],{duration:200,easing:"ease",fill:"forwards"}).finished.then(e,e),this}onSwipe(){let t=null,e=0;this.on("pointerdown",s=>{!this.getAttr("dismissible")||s.pointerType==="mouse"||s.composedPath().some(r=>r.localName==="button")||this.getAttr("gestures")!=="false"&&(t=s.clientX,e=0,this.stopTimer())}),this.$(window).on("pointermove",s=>{t!=null&&(e=s.clientX-t,this.style.translate=`${e}px 0`,this.style.opacity=String(1-Math.min(Math.abs(e)/this.offsetWidth,1)*.6))},{passive:!0});const n=()=>{if(t!=null){if(t=null,this.style.opacity="",Math.abs(e)>this.offsetWidth*E){this.dismiss(Math.sign(e));return}this.style.translate="",this.animate?.([{translate:`${e}px 0`},{translate:"0 0"}],{duration:150,easing:"ease-out"}),this.startTimer()}};this.$(window).on("pointerup pointercancel",n)}render(){const{dismissible:t,heading:e,icon:n,message:s,type:r}=this.getAttr();return u`
      <svg-icon part="icon" icon="${n||w[r]||w.info}"></svg-icon>
      ${e&&u`<strong part="heading">${e}</strong>`}
      <div part="message">${s||u`<slot></slot>`}</div>
      ${t&&u`<button type="button" part="close" aria-label="close"><svg-icon icon="lucide:x"></svg-icon></button>`}
    `}sync(){const t=this.getAttr("type")==="error"?"alert":"status";this.internals?this.internals.role=t:this.setAttribute("role",t)}}const z=Object.assign((i,t)=>c.notify(i,t),{error:(i,t)=>c.error(i,t),info:(i,t)=>c.info(i,t),success:(i,t)=>c.success(i,t),warn:(i,t)=>c.warning(i,t),warning:(i,t)=>c.warning(i,t)});c.init("pop-toast");export{c as default,z as notify,$ as toToastOptions};
