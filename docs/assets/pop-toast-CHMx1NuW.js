var w=Object.defineProperty;var A=(e,t,i)=>t in e?w(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var n=(e,t)=>w(e,"name",{value:t,configurable:!0});var f=(e,t,i)=>A(e,typeof t!="symbol"?t+"":t,i);import{predicates as x,isPlainObject as E,isString as O}from"https://esm.sh/jsr/@pulgasari/is";import{a as _,q as b,c as $,h as g}from"./index-BcM9qEFI.js";import"https://esm.sh/jsr/@pulgasari/str";import"https://esm.sh/jsr/@pulgasari/logger";const v="fallback",S=n((e,t)=>typeof e=="function"?e(t):e,"valueOf");function y(e={}){const t=new Map;function i(s){if(t.has(s))return t.get(s);const o="is"+s.charAt(0).toUpperCase()+s.slice(1);if(t.has(o))return t.get(o);throw new TypeError(`unknown predicate: ${s}`)}n(i,"predicateOf");function r(...s){const o=s.length<2?s[0]:s[1],l=[];for(const[c,p]of Object.entries(o))c!==v&&l.push([i(c),p]);const d=n(c=>{for(const[p,m]of l)if(p(c))return S(m,c);return S(o[v],c)},"run");return s.length<2?d:d(s[0])}return n(r,"shift"),r.with=s=>{for(const[o,l]of Object.entries(s)){if(typeof l!="function")throw new TypeError(`not a predicate: ${o}`);t.set(o,l)}return r},Object.defineProperty(r,"predicates",{get:n(()=>Object.fromEntries(t),"get")}),r.with(e)}n(y,"createShift");const L=y(x);y();const T={error:"lucide:alert-circle",info:"lucide:info",success:"lucide:check-circle-2",warning:"lucide:alert-triangle"},j=["error","warning","warn","success","info"],M=.35,k=n(e=>e instanceof Error||e!=null&&typeof e=="object"&&O(e.message)&&("stack"in e||"name"in e),"isErrorLike"),C=y(L.predicates).with({isErrorLike:k})({nullish:"",string:n(e=>e,"string"),errorLike:n(e=>e.message,"errorLike"),fallback:String});function z(e,t={}){let i;if(k(e))i={type:"error",message:e,...t};else if(!E(e))i={message:e,...t};else{const r=j.find(s=>s in e);if(r){const{[r]:s,...o}=e;i={type:r,message:s,...o,...t}}else i={...e,...t}}return i.message=C(i.message),i.type==="warn"&&(i.type="warning"),i}n(z,"toToastOptions");const B=`
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
`,h=class h extends _{static get stack(){let t=document.querySelector("[data-pop-toasts]");return t||(t=document.createElement("section"),b(t,{ariaLive:"polite",dataPopToasts:!0,popover:"manual"}),document.body.append(t)),t}static notify(t,i){const{dismissible:r=!0,duration:s,heading:o,icon:l,message:d,title:c,type:p}=z(t,i),m=document.createElement("pop-toast"),u=this.stack;return b(m,{dismissible:r,duration:s,heading:o??c,icon:l,message:d,type:p}),u.append(m),u.showPopover&&(u.matches(":popover-open")&&u.hidePopover(),u.showPopover()),m}static error(t,i){return this.notify(t,{...i,type:"error"})}static info(t,i){return this.notify(t,{...i,type:"info"})}static success(t,i){return this.notify(t,{...i,type:"success"})}static warning(t,i){return this.notify(t,{...i,type:"warning"})}static warn(t,i){return this.warning(t,i)}onConnected(){$("pop-toast-stack",B),this.on("click",'[part~="close"]',()=>this.dismiss()),this.on("pointerenter",()=>this.stopTimer()),this.on("pointerleave",()=>this.startTimer()),this.on("focusin",()=>this.stopTimer()),this.on("focusout",()=>this.startTimer()),this.onSwipe(),this.startTimer()}onDisconnected(){this.stopTimer()}startTimer(){this._remaining??=this.getAttr("duration"),!(this._timer||this._dismissing||!(this._remaining>0))&&(this._started=Date.now(),this._timer=setTimeout(()=>this.dismiss(),this._remaining))}stopTimer(){this._timer&&(clearTimeout(this._timer),this._timer=null,this._remaining-=Date.now()-this._started)}dismiss(t=1){if(this._dismissing)return this;this._dismissing=!0,this.stopTimer(),this.emit("pop-toast-dismiss");const i=n(()=>this.remove(),"remove");if(!this.animate||matchMedia("(prefers-reduced-motion: reduce)").matches)return i(),this;const r=this.style.translate||"0 0";return this.style.translate="",this.animate([{opacity:1,translate:r},{opacity:0,translate:`${t*100}% 0`}],{duration:200,easing:"ease",fill:"forwards"}).finished.then(i,i),this}onSwipe(){let t=null,i=0;this.on("pointerdown",s=>{!this.getAttr("dismissible")||s.pointerType==="mouse"||s.composedPath().some(o=>o.localName==="button")||this.getAttr("gestures")!=="false"&&(t=s.clientX,i=0,this.stopTimer())}),this.$(window).on("pointermove",s=>{t!=null&&(i=s.clientX-t,this.style.translate=`${i}px 0`,this.style.opacity=String(1-Math.min(Math.abs(i)/this.offsetWidth,1)*.6))},{passive:!0});const r=n(()=>{if(t!=null){if(t=null,this.style.opacity="",Math.abs(i)>this.offsetWidth*M){this.dismiss(Math.sign(i));return}this.style.translate="",this.animate?.([{translate:`${i}px 0`},{translate:"0 0"}],{duration:150,easing:"ease-out"}),this.startTimer()}},"release");this.$(window).on("pointerup pointercancel",r)}render(){const{dismissible:t,heading:i,icon:r,message:s,type:o}=this.getAttr();return g`
      <svg-icon part="icon" icon="${r||T[o]||T.info}"></svg-icon>
      ${i&&g`<strong part="heading">${i}</strong>`}
      <div part="message">${s||g`<slot></slot>`}</div>
      ${t&&g`<button type="button" part="close" aria-label="close"><svg-icon icon="lucide:x"></svg-icon></button>`}
    `}sync(){const t=this.getAttr("type")==="error"?"alert":"status";this.internals?this.internals.role=t:this.setAttribute("role",t)}};n(h,"PopToast"),f(h,"attr",{dismissible:Boolean,duration:4e3,heading:String,icon:String,message:String,type:{default:"info",values:["error","info","success","warning"]}}),f(h,"shadow",!0),f(h,"styles",`
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
  `);let a=h;const K=Object.assign((e,t)=>a.notify(e,t),{error:n((e,t)=>a.error(e,t),"error"),info:n((e,t)=>a.info(e,t),"info"),success:n((e,t)=>a.success(e,t),"success"),warn:n((e,t)=>a.warning(e,t),"warn"),warning:n((e,t)=>a.warning(e,t),"warning")});a.init();export{a as default,K as notify,z as toToastOptions};
