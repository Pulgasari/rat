var v=Object.defineProperty;var n=(e,t)=>v(e,"name",{value:t,configurable:!0});import{predicates as S,isPlainObject as _,isString as k}from"https://esm.sh/jsr/@pulgasari/is";import{a as A,t as g,c as x,h as d}from"./index-BW-7BDaL.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const y="fallback",w=n((e,t)=>typeof e=="function"?e(t):e,"valueOf");function f(e={}){const t=new Map;function i(s){if(t.has(s))return t.get(s);const o="is"+s.charAt(0).toUpperCase()+s.slice(1);if(t.has(o))return t.get(o);throw new TypeError(`unknown predicate: ${s}`)}n(i,"predicateOf");function r(...s){const o=s.length<2?s[0]:s[1],c=[];for(const[a,h]of Object.entries(o))a!==y&&c.push([i(a),h]);const u=n(a=>{for(const[h,p]of c)if(h(a))return w(p,a);return w(o[y],a)},"run");return s.length<2?u:u(s[0])}return n(r,"shift"),r.with=s=>{for(const[o,c]of Object.entries(s)){if(typeof c!="function")throw new TypeError(`not a predicate: ${o}`);t.set(o,c)}return r},Object.defineProperty(r,"predicates",{get:n(()=>Object.fromEntries(t),"get")}),r.with(e)}n(f,"createShift");const E=f(S);f();const b={error:"lucide:alert-circle",info:"lucide:info",success:"lucide:check-circle-2",warning:"lucide:alert-triangle"},O=["error","warning","warn","success","info"],$=.35,T=n(e=>e instanceof Error||e!=null&&typeof e=="object"&&k(e.message)&&("stack"in e||"name"in e),"isErrorLike"),P=f(E.predicates).with({isErrorLike:T})({nullish:"",string:n(e=>e,"string"),errorLike:n(e=>e.message,"errorLike"),fallback:String});function L(e,t={}){let i;if(T(e))i={type:"error",message:e,...t};else if(!_(e))i={message:e,...t};else{const r=O.find(s=>s in e);if(r){const{[r]:s,...o}=e;i={type:r,message:s,...o,...t}}else i={...e,...t}}return i.message=P(i.message),i.type==="warn"&&(i.type="warning"),i}n(L,"toToastOptions");const j=`
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
`;class l extends A{static{n(this,"PopToast")}static attr={dismissible:Boolean,duration:4e3,heading:String,icon:String,message:String,type:{default:"info",values:["error","info","success","warning"]}};static shadow=!0;static styles=`
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
  `;static get stack(){let t=document.querySelector("[data-pop-toasts]");return t||(t=document.createElement("section"),g(t,{ariaLive:"polite",dataPopToasts:!0,popover:"manual"}),document.body.append(t)),t}static notify(t,i){const{dismissible:r=!0,duration:s,heading:o,icon:c,message:u,title:a,type:h}=L(t,i),p=document.createElement("pop-toast"),m=this.stack;return g(p,{dismissible:r,duration:s,heading:o??a,icon:c,message:u,type:h}),m.append(p),m.showPopover&&(m.matches(":popover-open")&&m.hidePopover(),m.showPopover()),p}static error(t,i){return this.notify(t,{...i,type:"error"})}static info(t,i){return this.notify(t,{...i,type:"info"})}static success(t,i){return this.notify(t,{...i,type:"success"})}static warning(t,i){return this.notify(t,{...i,type:"warning"})}static warn(t,i){return this.warning(t,i)}onConnected(){x("pop-toast-stack",j),this.on("click",'[part~="close"]',()=>this.dismiss()),this.on("pointerenter",()=>this.stopTimer()),this.on("pointerleave",()=>this.startTimer()),this.on("focusin",()=>this.stopTimer()),this.on("focusout",()=>this.startTimer()),this.onSwipe(),this.startTimer()}onDisconnected(){this.stopTimer()}startTimer(){this._remaining??=this.getAttr("duration"),!(this._timer||this._dismissing||!(this._remaining>0))&&(this._started=Date.now(),this._timer=setTimeout(()=>this.dismiss(),this._remaining))}stopTimer(){this._timer&&(clearTimeout(this._timer),this._timer=null,this._remaining-=Date.now()-this._started)}dismiss(t=1){if(this._dismissing)return this;this._dismissing=!0,this.stopTimer(),this.emit("pop-toast-dismiss");const i=n(()=>this.remove(),"remove");if(!this.animate||matchMedia("(prefers-reduced-motion: reduce)").matches)return i(),this;const r=this.style.translate||"0 0";return this.style.translate="",this.animate([{opacity:1,translate:r},{opacity:0,translate:`${t*100}% 0`}],{duration:200,easing:"ease",fill:"forwards"}).finished.then(i,i),this}onSwipe(){let t=null,i=0;this.on("pointerdown",s=>{!this.getAttr("dismissible")||s.pointerType==="mouse"||s.composedPath().some(o=>o.localName==="button")||this.getAttr("gestures")!=="false"&&(t=s.clientX,i=0,this.stopTimer())}),this.$(window).on("pointermove",s=>{t!=null&&(i=s.clientX-t,this.style.translate=`${i}px 0`,this.style.opacity=String(1-Math.min(Math.abs(i)/this.offsetWidth,1)*.6))},{passive:!0});const r=n(()=>{if(t!=null){if(t=null,this.style.opacity="",Math.abs(i)>this.offsetWidth*$){this.dismiss(Math.sign(i));return}this.style.translate="",this.animate?.([{translate:`${i}px 0`},{translate:"0 0"}],{duration:150,easing:"ease-out"}),this.startTimer()}},"release");this.$(window).on("pointerup pointercancel",r)}render(){const{dismissible:t,heading:i,icon:r,message:s,type:o}=this.getAttr();return d`
      <svg-icon part="icon" icon="${r||b[o]||b.info}"></svg-icon>
      ${i&&d`<strong part="heading">${i}</strong>`}
      <div part="message">${s||d`<slot></slot>`}</div>
      ${t&&d`<button type="button" part="close" aria-label="close"><svg-icon icon="lucide:x"></svg-icon></button>`}
    `}sync(){const t=this.getAttr("type")==="error"?"alert":"status";this.internals?this.internals.role=t:this.setAttribute("role",t)}}const I=Object.assign((e,t)=>l.notify(e,t),{error:n((e,t)=>l.error(e,t),"error"),info:n((e,t)=>l.info(e,t),"info"),success:n((e,t)=>l.success(e,t),"success"),warn:n((e,t)=>l.warning(e,t),"warn"),warning:n((e,t)=>l.warning(e,t),"warning")});l.init();export{l as default,I as notify,L as toToastOptions};
